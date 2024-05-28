from .models import DispatchChemist, Transporter, Trader, Product, Reason, Order, Return
from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DispatchChemistSerializer, FetchOrderSerializer, TransporterSerializer, TraderSerializer, ProductSerializer, OrderSerializer, ReasonSerializer, ReturnSerializer


class DispatchChemistViewSet(viewsets.ModelViewSet):
    queryset = DispatchChemist.objects.all()
    serializer_class = DispatchChemistSerializer

    # permission_classes = [permissions.IsAuthenticated]

class TransporterViewSet(viewsets.ModelViewSet):
    queryset = Transporter.objects.all()
    serializer_class = TransporterSerializer

class TraderViewSet(viewsets.ModelViewSet):
    queryset = Trader.objects.all()
    serializer_class = TraderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ReasonViewSet(viewsets.ModelViewSet):
    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    # serializer_class = OrderSerializer
    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return FetchOrderSerializer
        return OrderSerializer

class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer

from django.shortcuts import get_object_or_404
class CustomOrder(APIView):
    """Fetching order details"""

    
    def get(self, request, order_id):
        """Function for returning order details"""
        order = get_object_or_404(Order, id=order_id)
        
        chemist = order.dispatch_chemist
        transporter = order.transporter
        trader = order.trader
        
        order_data = FetchOrderSerializer(order).data
        chemist_data = DispatchChemistSerializer(chemist).data
        transporter_data = TransporterSerializer(transporter).data
        trader_data = TraderSerializer(trader).data
        
        response_data = {
            'loading_id': order_data['loading_id'],
            'destination': order_data['destination'],
            'chemist': chemist_data['chemist_name'],
            'transporter': transporter_data['transporter_name'],
            'trader': trader_data['trader_name']
        }
        
        return Response(response_data, status=status.HTTP_200_OK)