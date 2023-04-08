

from django import template
from config.settings.base import DEBUG

register = template.Library()


@register.simple_tag
def get_debug():
    """Return whether current environment is production or developing"""
    return bool(DEBUG)

@register.filter
def get_type(value):
    return type(value)

