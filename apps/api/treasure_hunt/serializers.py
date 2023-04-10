from rest_framework import serializers
from apps.treasure_hunt.models import GroupTreasure, Treasure, TreasureHint, Group, TreasureHuntGame
from apps.user.models import User
from apps.api.users.serializers import BasicUserSerializer

class GroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    class Meta:
        model = Group
        fields = ["name", "users"]
    
    def get_users(self, obj):
        users = User.objects.filter(pk__in = obj.users)
        data = BasicUserSerializer(users, many = True).data
        return data

class GroupTreasureListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = GroupTreasure
        fields = ["treasure", "status"]

class TreasureHuntGameSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TreasureHuntGame
        fields = ["id", "time_started", "time_ended", "is_started", "groups", "treasures"]

class GroupTreasureHuntGameSerializer(serializers.Serializer):
    game = TreasureHuntGameSerializer()
    treasures = GroupTreasureListSerializer(many=True)
    group = GroupSerializer()

class TreasureHuntGameListSerializer(serializers.Serializer):
    game = TreasureHuntGameSerializer()
    groups = GroupSerializer(many=True)




class TreasureRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treasure
        fields = ["object"]

class TreasureHintListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    hint_img = serializers.CharField()
    hint = serializers.CharField()
    requirement_for_hint = serializers.CharField()
    is_activate = serializers.BooleanField()




