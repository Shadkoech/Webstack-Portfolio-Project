from .models import DispatchChemist, Transporter, Trader, Product, Reason, Order, Return
from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .serializers import DispatchChemistSerializer, FetchOrderSerializer, TransporterSerializer, TraderSerializer, ProductSerializer, OrderSerializer, ReasonSerializer, ReturnSerializer


class DispatchChemistViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for DispatchChemist.
    """
    queryset = DispatchChemist.objects.all()
    serializer_class = DispatchChemistSerializer

    # Uncomment the following line to enforce authentication
    # permission_classes = [permissions.IsAuthenticated]

class TransporterViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Transporter.
    """
    queryset = Transporter.objects.all()
    serializer_class = TransporterSerializer
    
    @action(detail=False, methods=['get'], url_path='by-username')
    def get_transporter_id_by_username(self, request):
        """
        Custom action to get a Transporter's ID by their username.
        
        Args:
            request (Request): The request object containing query parameters.
        
        Returns:
            Response: A Response object containing the transporter's ID or an error message.
        """
        username = request.query_params.get('username')
        if not username:
            return Response({"error": "Username query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            transporter = Transporter.objects.get(username=username)
            return Response({"transporter_id": transporter.id}, status=status.HTTP_200_OK)
        except Transporter.DoesNotExist:
            return Response({"error": "Transporter not found"}, status=status.HTTP_404_NOT_FOUND)

class TraderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Trader.
    """
    queryset = Trader.objects.all()
    serializer_class = TraderSerializer
    
    @action(detail=False, methods=['get'], url_path='by-username')
    def get_trader_id_by_username(self, request):
        """
        Custom action to get a Trader's ID by their username.
        
        Args:
            request (Request): The request object containing query parameters.
        
        Returns:
            Response: A Response object containing the trader's ID or an error message.
        """
        username = request.query_params.get('username')
        if not username:
            return Response({"error": "Username query parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            trader = Trader.objects.get(username=username)
            return Response({"trader_id": trader.id}, status=status.HTTP_200_OK)
        except Trader.DoesNotExist:
            return Response({"error": "Trader not found"}, status=status.HTTP_404_NOT_FOUND)

class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ReasonViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Reason.
    """
    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer

class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Order.
    """
    queryset = Order.objects.all()
    
    # Dynamically select the serializer class based on the action
    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return FetchOrderSerializer
        return OrderSerializer
    
    @action(detail=True, methods=['get'])
    def trader_orders(self, request, pk=None):
        """
        Custom action to get orders for a specific trader.
        
        Args:
            request (Request): The request object.
            pk (int): The primary key of the trader.
        
        Returns:
            Response: A Response object containing the trader's orders or an error message.
        """
        try:
            trader = Trader.objects.get(pk=pk)
        except Trader.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        orders = Order.objects.filter(trader=trader)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def transporter_orders(self, request, pk=None):
        """
        Custom action to get orders for a specific transporter.
        
        Args:
            request (Request): The request object.
            pk (int): The primary key of the transporter.
        
        Returns:
            Response: A Response object containing the transporter's orders or an error message.
        """
        try:
            transporter = Transporter.objects.get(pk=pk)
        except Transporter.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        orders = Order.objects.filter(transporter=transporter)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class ReturnViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Return.
    """
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer

class CustomOrder(APIView):
    """
    API view to fetch custom order details including associated chemist, transporter, and trader.
    """
    
    def get(self, request, order_id):
        """
        Handle GET request to return order details.
        
        Args:
            request (Request): The request object.
            order_id (int): The ID of the order.
        
        Returns:
            Response: A Response object containing the order details and associated data.
        """
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