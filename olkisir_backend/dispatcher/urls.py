from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DispatchChemistViewSet, TransporterViewSet, TraderViewSet, ProductViewSet, ReasonViewSet, OrderViewSet, ReturnViewSet

dispatch_router = DefaultRouter()
dispatch_router.register(r'dispatchers', DispatchChemistViewSet)

transporter_router = DefaultRouter()
transporter_router.register(r'transporters', TransporterViewSet)

trader_router = DefaultRouter()
trader_router.register(r'traders', TraderViewSet)

product_router = DefaultRouter()
product_router.register(r'products', ProductViewSet)

reason_router = DefaultRouter()
reason_router.register(r'reasons', ReasonViewSet)

order_router = DefaultRouter()
order_router.register(r'orders', OrderViewSet)

return_router = DefaultRouter()
return_router.register(r'returns', ReturnViewSet)



# Extending routes
router = DefaultRouter()
router.registry.extend(dispatch_router.registry)
router.registry.extend(transporter_router.registry)
router.registry.extend(trader_router.registry)
router.registry.extend(product_router.registry)
router.registry.extend(reason_router.registry)
router.registry.extend(order_router.registry)
router.registry.extend(return_router.registry)


urlpatterns = [
    path('', include(router.urls))
]