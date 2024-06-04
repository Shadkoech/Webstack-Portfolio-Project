from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import DispatchChemist

@receiver(post_save, sender=DispatchChemist)
def invalidate_dispatch_chemist_cache(sender, instance, created, **kwargs):
    # Invalidate cache for list view
    cache.delete('dispatch_chemist_list')

    # Invalidate cache for detail view if a new object is created
    if created:
        cache.delete(f'dispatch_chemist_detail_{instance.pk}')
