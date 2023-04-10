from django.db.models import Count, Case, When, IntegerField
from django.db.models import F, Value
from apps.api.treasure_hunt.serializers import (GroupSerializer, TreasureEvidenceSerializer, TreasureRetrieveSerializer,
                                                GroupTreasureHintListSerializer,
                                                GroupTreasureHuntGameSerializer,
                                                TreasureHuntGameListSerializer,
                                                TreasureHuntGameRetrieveSerializer,
                                                GroupTreasureProcessSerializer, TreasureWithHintSerializer)
from apps.treasure_hunt.models import (GroupTreasureHintStatus, Treasure,
                                       TreasureHuntGame,
                                       GroupTreasure,
                                       GroupTreasureHint,
                                       Group,
                                       GroupTreasureStatus,
                                       TreasureHint)
from config.settings.base import MEDIA_URL
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from django.utils import timezone


class StartTreasureHuntGameAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def post(self, request):
        treasure_game_id = request.data.get("treasure_game_id")
        game = TreasureHuntGame.objects.get(id = treasure_game_id)
        game.time_started = timezone.now()
        game.is_started = True
        game.save()
        GroupTreasure.objects.filter(group_id__in = game.groups, treasure_id__in = game.treasures).delete()
        GroupTreasureHint.objects.filter(group_id__in = game.groups, treasure_hint__treasure_id__in = game.treasures).delete()
        all_hints = TreasureHint.objects.filter(treasure_id__in = game.treasures)
        group_treasures = []
        group_treasure_hints = []
        for group in game.groups:
            for treasure in game.treasures:
                new_group_treasure = GroupTreasure(group_id = group, treasure_id = treasure)
                group_treasures.append(new_group_treasure)
            for hint in all_hints:
                new_group_treasure_hint = GroupTreasureHint(group_id = group, treasure_hint = hint)
                group_treasure_hints.append(new_group_treasure_hint)

        GroupTreasure.objects.bulk_create(group_treasures)
        GroupTreasureHint.objects.bulk_create(group_treasure_hints)
      
        return Response()

class TreasureGameRetrieveAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request, pk):
        game = TreasureHuntGame.objects.get(pk = pk)
        groups = Group.objects.filter(pk__in = game.groups)
        treasures = Treasure.objects.filter(pk__in = game.treasures)
        serializer = TreasureHuntGameRetrieveSerializer({"game": game, "groups": groups, "treasures": treasures})
        return Response(serializer.data)
class TreasureGameListAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request):
        games = TreasureHuntGame.objects.order_by("-time_started", "-date_modified")
        data = []
        for game in games:
            groups = Group.objects.filter(pk__in = game.groups)
            serializer = TreasureHuntGameListSerializer({"game": game, "groups": groups})
            data.append(serializer.data)
        return Response(data)
    
class TreasureGameGroupListUpdateAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    def get(self, request):
        
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)
    def post(self, request):
        group_id_list = request.data.getlist("group_id_list[]")
        treasure_hunt_game_id = request.data.get("treasure_hunt_game_id")
        group_id_list = list(map(int, group_id_list))
        game = TreasureHuntGame.objects.get(pk = treasure_hunt_game_id)
        game.groups = group_id_list
        game.save()

        return Response()

class TreasureHuntGameTreasuresAndHintListAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)

    def get(self, request, pk):
        game = TreasureHuntGame.objects.get(pk = pk)

        treasures = Treasure.objects.filter(pk__in = game.treasures)
        serializer = TreasureWithHintSerializer(treasures, many=True)
        return Response(serializer.data)
    def post(self, request, pk):
        action = request.data.get("action")
        if action == "add_treasure":
            game = TreasureHuntGame.objects.get(pk = pk)
            object = request.data.get("object")
            new_treasure = Treasure.objects.create(object = object)
            game.treasures = game.treasures + [new_treasure.id]
            game.save()
        elif action == "add_hint":
            treasure_id = request.data.get("treasure_id")
            requirement = request.data.get("requirement")
            hint = request.data.get("hint")
            hint_img = request.data.get("hint_img")
            data = {
                "treasure": Treasure.objects.get(pk=treasure_id),
                "requirement_for_hint": requirement,
                "hint": hint,
            }
            if hint_img:
                data.update({"hint_img": hint_img})

            new_treasure_hint = TreasureHint.objects.create(**data)
            new_treasure_hint.save()
        return Response()

class GroupTreasureListAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        if game is None: return Response([])

        treasures = GroupTreasure.objects.filter(treasure__pk__in = game.treasures, group = group.id)
        serializer = GroupTreasureHuntGameSerializer({"game": game, "treasures": treasures, "group": group})
        return Response(serializer.data)
    
class TreasureRetrieveAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        group_treasure = GroupTreasure.objects.filter(treasure__pk = pk, group = group)\
            .annotate(object = F("treasure__object")).values("status", "object")
        serializer = TreasureRetrieveSerializer(group_treasure[0])
        return Response(serializer.data)
    


    
class GroupTreasureHintListAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request, pk):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        if game is None: Response([])

        group_treasure_hints = GroupTreasureHint.objects.filter(treasure_hint__treasure = pk, group = group)
        data = []
        for group_hint in group_treasure_hints:
            if group_hint.status == GroupTreasureHintStatus.ACTIVATE:
                hint_img = ""
                if group_hint.treasure_hint.hint_img:
                    hint_img = group_hint.treasure_hint.hint_img.url
                data.append({
                    "id": group_hint.id,
                    "hint_img": hint_img,
                    "hint": group_hint.treasure_hint.hint,
                    "requirement_for_hint": group_hint.treasure_hint.requirement_for_hint,
                    "status": group_hint.status,
                })
                
            else:
                data.append({
                    "id": group_hint.id,
                    "hint_img": "",
                    "hint": "",
                    "requirement_for_hint": group_hint.treasure_hint.requirement_for_hint,
                    "status": group_hint.status,
                })
        
        queryset = GroupTreasureHintListSerializer(data, many=True)
        return Response(queryset.data)
    
class GroupTreasureUpdateAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        treasure_id = request.data.get("treasure")
        evidence_img = request.FILES.get("evidence_img")
        if not (evidence_img and treasure_id):
            return Response("Inforamtion missed")
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        obj = GroupTreasure.objects.get(treasure = treasure_id, group = group)
        obj.found_evidence = evidence_img
        obj.status = GroupTreasureStatus.PROCESSING
        obj.save()
        return Response("status updated")
    
class GroupTreasureHintUpdateAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self,request):
        group_treasure_hint_id = request.data.get("group_treasure_hint_id")
        evidence_img = request.FILES.get("evidence_img")
        print(request.data)
        if not (evidence_img and group_treasure_hint_id):
            return Response("Inforamtion missed")
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        obj = GroupTreasureHint.objects.get(pk=group_treasure_hint_id)
        obj.activate_evidence = evidence_img
        obj.status = GroupTreasureHintStatus.PROCESSING
        obj.save()
        return Response("status updated")
    
class GroupTreasureProcessAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        if game is None: return Response([])
        processes_list = GroupTreasure.objects.filter(treasure__in = game.treasures, group__in = game.groups)\
        .values("group") \
        .annotate(number_completed_treasures = Count(Case(
            When(status=GroupTreasureStatus.FOUND, then=1),
            output_field=IntegerField(),
        )))

        data = []
        for process in processes_list:
            serializer = GroupTreasureProcessSerializer({
                    "group": Group.objects.get(pk = process["group"]),
                    "number_completed_treasures": process["number_completed_treasures"]
                })
            data.append(serializer.data)
        return Response(data)
    

class TreasureEvidencesAPIView(APIView):
    permission_classes = (IsAuthenticated, IsAdminUser)
    def get(self,request, pk):
        game = TreasureHuntGame.objects.get(pk = pk)
        group_treasure = GroupTreasure.objects.filter(treasure_id__in = game.treasures)\
        .annotate(evidence = F("found_evidence"), type = Value("treasure"), object = F("treasure__object"))\
        .values("id", "status", "object", "evidence", "date_modified", "type")
        group_treasure_hint = GroupTreasureHint.objects.filter(treasure_hint__treasure_id__in = game.treasures)\
        .annotate(evidence = F("activate_evidence"), type = Value("hint"), object = F("treasure_hint__requirement_for_hint"))\
        .values("id", "status", "object", "evidence", "date_modified", "type")
        all_evidences = list(group_treasure) + list(group_treasure_hint)
        all_evidences = sorted(all_evidences, key=lambda x: x["date_modified"], reverse=True)
        serializer = TreasureEvidenceSerializer(all_evidences, many=True)
        return Response(serializer.data)
    def post(self, request, pk):
        type_action = request.data.get("type")
        id = request.data.get("id")
        status = request.data.get("status")
        if type_action == "treasure":
            group_treasure = GroupTreasure.objects.get(pk = id)
            group_treasure.status = int(status)
            if int(status) == GroupTreasureStatus.FOUND:
                group_treasure.found_time = timezone.now()
            group_treasure.save()
        elif type_action == "hint":
            group_treasure_hint = GroupTreasureHint.objects.get(pk = id)
            group_treasure_hint.status = int(status)
            if int(status) == GroupTreasureHintStatus.ACTIVATE:
                group_treasure_hint.activate_time = timezone.now()
            group_treasure_hint.save()

        return Response()








    