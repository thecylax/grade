from django.db import models

class Course(models.Model):
    period = models.CharField(max_length=2)
    code = models.CharField(max_length=5)
    name = models.CharField(max_length=200)
    prerequisite = models.CharField(max_length=5, blank=True)
    optative = models.BooleanField()

    def __unicode__(self):
        return self.code
