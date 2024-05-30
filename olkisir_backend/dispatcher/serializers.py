from django.core.exceptions import MultipleObjectsReturned
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
    trader = TraderSerializer()
    class Meta:
        model = Order
        fields = '__all__'
    
    def create(self, validated_data):
        dispatch_chemist_data = validated_data.pop('dispatch_chemist')
        transporter_data = validated_data.pop('transporter')
        trader_data = validated_data.pop('trader')

        dispatch_chemist, _ = DispatchChemist.objects.get_or_create(**dispatch_chemist_data)
        trader, _ = Trader.objects.get_or_create(**trader_data)
        

        try:
            transporter, _ = Transporter.objects.get_or_create(**transporter_data)
        except MultipleObjectsReturned:
            transporter = Transporter.objects.filter(**transporter_data).first()
            

        order = Order.objects.create(dispatch_chemist=dispatch_chemist, transporter=transporter,  trader=trader, **validated_data)
        
        return order
    
    def update(self, instance, validated_data):
        dispatch_chemist_data = validated_data.pop('dispatch_chemist')
        transporter_data = validated_data.pop('transporter')
        trader_data = validated_data.pop('trader')

        # Update or create the dispatch chemist
        dispatch_chemist, _ = DispatchChemist.objects.update_or_create(id=instance.dispatch_chemist.id, defaults=dispatch_chemist_data)
        instance.dispatch_chemist = dispatch_chemist
        
        trader, _ = Trader.objects.update_or_create(id=instance.trader.id, defaults=trader_data)
        instance.trader = trader
        # trader, _ = Trader.objects.get_or_create(**trader_data)


        # Update or create the transporter 
        transporter, _ = Transporter.objects.update_or_create(id=instance.transporter.id, defaults=transporter_data)
        instance.transporter = transporter
        
        trader, _ = Trader.objects.update_or_create(id=instance.trader.id, defaults=trader_data)
        instance.trader = trader

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