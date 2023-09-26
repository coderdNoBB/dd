from celery import shared_task
import json
import os
import time
from celery import app as celery_app


@shared_task(ignore_result=False, name='S ETL', bind=True)
def start_etl_s(self):
    print(self)
    s = extract()
    s = tranform(s)
    load(s)


def extract():
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "../data", "s.json")
    f = open(json_url, "r")
    s = json.load(f)
    f.close()
    time.sleep(30)
    print(f'Extraction of s is done.')
    return s


def tranform(s):
    print(s)
    time.sleep(30)
    print('Tranform is good.')
    return s


def load(s):
    print(s)
    time.sleep(10)
    print('All done.')
