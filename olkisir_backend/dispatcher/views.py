from .models import DispatchChemist, Transporter, Trader, Product, Reason, Order, Return
from rest_framework import permissions, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from .serializers import DispatchChemistSerializer, FetchOrderSerializer, TransporterSerializer, TraderSerializer, ProductSerializer, OrderSerializer, ReasonSerializer, ReturnSerializer
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .config.utils import delete_cache

class DispatchChemistViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for DispatchChemist.
    """

    CACHE_KEY_PREFIX = "chemist-view"
    # permission_classes = [IsAuthenticated]

    queryset = DispatchChemist.objects.all()
    serializer_class = DispatchChemistSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

class TransporterViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Transporter.
    """

    CACHE_KEY_PREFIX = "transport-view"

    permission_classes = [IsAuthenticated]

    queryset = Transporter.objects.all()
    serializer_class = TransporterSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
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

    CACHE_KEY_PREFIX = "Trader-view"

    permission_classes = [IsAuthenticated]

    queryset = Trader.objects.all()
    serializer_class = TraderSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

    @method_decorator(cache_page(settings.CACHE_TTL))
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

    CACHE_KEY_PREFIX = "product-view"

    permission_classes = [IsAuthenticated]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response


class ReasonViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Reason.
    """

    CACHE_KEY_PREFIX = "reason-view"

    permission_classes = [IsAuthenticated]

    queryset = Reason.objects.all()
    serializer_class = ReasonSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling CRUD operations for Order.
    """

    CACHE_KEY_PREFIX = "order-view"

    permission_classes = [IsAuthenticated]

    queryset = Order.objects.all()
    
    # Dynamically select the serializer class based on the action
    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return FetchOrderSerializer
        return OrderSerializer
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    @cache_page(settings.CACHE_TTL)
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
    
    @cache_page(settings.CACHE_TTL)
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

    CACHE_KEY_PREFIX = "return-view"

    permission_classes = [IsAuthenticated]

    queryset = Return.objects.all()
    serializer_class = ReturnSerializer

    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    @method_decorator(cache_page(settings.CACHE_TTL, key_prefix=CACHE_KEY_PREFIX))
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response
    
    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        delete_cache(self.CACHE_KEY_PREFIX)
        return response

