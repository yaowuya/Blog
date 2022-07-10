from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class AbstractBaseModel(models.Model):
    creator = models.IntegerField(verbose_name="创建人", null=True)
    created_at = models.DateTimeField(verbose_name="创建时间", auto_now_add=True)
    modifier = models.IntegerField(verbose_name="修改人", null=True)
    modified_at = models.DateTimeField(verbose_name="修改时间", auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser, AbstractBaseModel):
    avatar = models.CharField('头像', max_length=1000, blank=True)
    nickname = models.CharField('昵称', null=True, blank=True, max_length=200)

    class Meta(AbstractUser.Meta):
        db_table = 'blog_user'
        swappable = 'AUTH_USER_MODEL'
