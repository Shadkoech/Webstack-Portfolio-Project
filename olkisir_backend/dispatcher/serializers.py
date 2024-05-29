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
    

class ReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reason
        fields = '__all__'

class ReturnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Return
        fields = '__all__'