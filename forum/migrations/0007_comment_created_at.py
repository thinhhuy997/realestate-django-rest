# Generated by Django 3.0.3 on 2022-07-30 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0006_auto_20220709_1718'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
