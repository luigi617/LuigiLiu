
from apps.api.treasure_hunt.serializers import (TreasureRetrieveSerializer,
                                                TreasureHintListSerializer,
                                                GroupTreasureHuntGameSerializer,
                                                TreasureHuntGameListSerializer)
from apps.treasure_hunt.models import (Treasure,
                                       TreasureHuntGame,
                                       GroupTreasure,
                                       GroupTreasureHint,
                                       Group,
                                       GroupTreasureStatus)
from config.settings.base import MEDIA_URL
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView


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
    
class GroupTreasureListAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        if game is None: return Response([])

        treasures = GroupTreasure.objects.filter(treasure__pk__in = game.treasures, group = group.id)
        serializer = GroupTreasureHuntGameSerializer({"game": game, "treasures": treasures, "group": group})
        return Response(serializer.data)
    
class TreasureRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Treasure.objects.all()
    serializer_class = TreasureRetrieveSerializer


    
class GroupTreasureHintListAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request, pk):
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        if game is None: Response([])

        group_treasure_hints = GroupTreasureHint.objects.filter(treasure_hint__treasure = pk, group = group)
        data = []
        for group_hint in group_treasure_hints:
            if group_hint.is_activate:
                hint_img = group_hint.treasure_hint.hint_img.url
                data.append({
                    "id": group_hint.id,
                    "hint_img": hint_img,
                    "hint": group_hint.treasure_hint.hint,
                    "requirement_for_hint": group_hint.treasure_hint.requirement_for_hint,
                    "is_activate": group_hint.is_activate,
                })
            else:
                data.append({
                    "id": group_hint.id,
                    "hint_img": "",
                    "hint": "",
                    "requirement_for_hint": group_hint.treasure_hint.requirement_for_hint,
                    "is_activate": group_hint.is_activate,
                })
        
        queryset = TreasureHintListSerializer(data, many=True)
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
        treasure_hint_id = request.data.get("treasure_hint_id")
        evidence_img = request.FILES.get("evidence_img")
        if not (evidence_img and treasure_hint_id):
            return Response("Inforamtion missed")
        game, group = TreasureHuntGame.objects.get_current_game_and_group_by_user(self.request.user)
        obj = GroupTreasureHint.objects.get(treasure_hint = treasure_hint_id, group = group)
        obj.activate_evidence = evidence_img
        obj.save()
        return Response("status updated")








    