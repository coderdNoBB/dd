from django.http import HttpResponse

def index(request):
    return HttpResponse("ST running and managing in Django. ")