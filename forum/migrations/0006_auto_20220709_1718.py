# Generated by Django 3.0.3 on 2022-07-09 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0005_post_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(blank=True, choices=[('SELL', 'SELL'), ('LEASE', 'LEASE')], default=None, max_length=100, null=True),
        ),
    ]
