from django.db import models
from django.utils import timezone



class DispatchChemist(models.Model):
    """Model representing dispatch details"""

    chemist_name = models.CharField(max_length=100)

class Transporter(models.Model):
    """Model representing the driver for each order"""
    transporter_name = models.CharField(max_length=100)
    representative = models.CharField(max_length=100)
    contact = models.CharField(null=True, max_length=20)

class Trader(models.Model):
    """Model for the customer getting the dispatched goods"""

    trader_name = models.CharField(max_length=100)
    trader_address = models.CharField(max_length=100, null=True)
    contact = models.CharField(null=True, max_length=20)


class Product(models.Model):
    product_type = models.CharField(null=True, max_length=100)
    brand = models.CharField(max_length=50)
    SKU = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    

class Order(models.Model):
    """An associative class that maps a given order to a given stage in the dispatch process"""
    loading_id = models.CharField(max_length=50)
    destination = models.CharField(max_length=100)
    time_dispatched = models.DateTimeField(default=timezone.now)

    dispatch_chemist = models.ForeignKey(DispatchChemist, on_delete=models.CASCADE)
    transporter = models.ForeignKey(Transporter, on_delete=models.CASCADE)
    trader = models.ForeignKey(Trader, on_delete=models.CASCADE)
    product =  models.ForeignKey(Product, on_delete=models.CASCADE)


class Reason(models.Model):
    return_cause = models.TextField(max_length=200)


class Return(models.Model):
    order_id = models.ForeignKey(Order, null=True, on_delete=models.CASCADE)
    product_returned = models.ForeignKey(Product, on_delete=models.CASCADE)
    return_reason = models.ForeignKey(Reason, on_delete=models.CASCADE)
