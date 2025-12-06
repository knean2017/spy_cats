from rest_framework import serializers
from .models import Mission, Target


class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = "__all__"

    def validate(self, data):
        if self.instance and self.instance.is_completed:
            if 'notes' in data:
                raise serializers.ValidationError("Cannot update notes of a completed target.")
        return data


class MissionSerializer(serializers.ModelSerializer):
    targets = TargetSerializer(many=True, source="target_set")

    class Meta:
        model = Mission
        fields = ["id", "name", "cat", "is_completed", "targets"]

    def create(self, validated_data):
        targets_data = validated_data.pop('targets')
        mission = Mission.objects.create(**validated_data)
        for target_data in targets_data:
            Target.objects.create(mission=mission, **target_data)
        return mission
