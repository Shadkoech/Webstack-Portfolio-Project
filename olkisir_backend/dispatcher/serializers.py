from rest_framework import serializers
from .models import DispatchChemist, Transporter, Trader, Product, Reason, Order, Return

class DispatchChemistSerializer(serializers.ModelSerializer):
    class Meta:
        model = DispatchChemist
        fields = '__all__'

class TransporterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transporter
        fields = '__all__'

class TraderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trader
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class FetchOrderSerializer(serializers.ModelSerializer):
    # dispatch_chemist = serializers.StringRelatedField()
    # transporter = serializers.StringRelatedField()
    # trader = serializers.StringRelatedField()
    dispatch_chemist = DispatchChemistSerializer()
    transporter = TransporterSerializer()
    trader = TraderSerializer()
    class Meta:
        model = Order
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    dispatch_chemist = DispatchChemistSerializer()
    transporter = TransporterSerializer()
    class Meta:
        model = Order
        fields = '__all__'
    
    def create(self, validated_data):
        dispatch_chemist_data = validated_data.pop('dispatch_chemist')
        transporter_data = validated_data.pop('transporter')

        dispatch_chemist, _ = DispatchChemist.objects.get_or_create(**dispatch_chemist_data)
        transporter, _ = Transporter.objects.get_or_create(**transporter_data)

        order = Order.objects.create(dispatch_chemist=dispatch_chemist, transporter=transporter, **validated_data)
        return order
    
    def update(self, instance, validated_data):
        dispatch_chemist_data = validated_data.pop('dispatch_chemist')
        transporter_data = validated_data.pop('transporter')

        # Update or create the dispatch chemist
        dispatch_chemist, _ = DispatchChemist.objects.update_or_create(id=instance.dispatch_chemist.id, defaults=dispatch_chemist_data)
        instance.dispatch_chemist = dispatch_chemist

        # Update or create the transporter
        transporter, _ = Transporter.objects.update_or_create(id=instance.transporter.id, defaults=transporter_data)
        instance.transporter = transporter

        # Update the remaining fields in the order
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields = '__all__'

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = '__all__'