from .models import DispatchChemist, Transporter, Trader, Product, Reason, Order, Return
from rest_framework import permissions, viewsets, status
from .serializers import DispatchChemistSerializer, TransporterSerializer, TraderSerializer, ProductSerializer, OrderSerializer, ReasonSerializer, ReturnSerializer


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
    serializer_class = OrderSerializer

class ReturnViewSet(viewsets.ModelViewSet):
    queryset = Return.objects.all()
    serializer_class = ReturnSerializer
