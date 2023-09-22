from task_app import create_app
from task_app import s_etl
from celery.schedules import crontab


flask_app = create_app()
celery_app = flask_app.extensions["celery"]


@celery_app.task(name='S Extraction')
def s_etl_task():
    s_etl.start_etl_s()

# It turns out that periodic tasks are not monitored properly in Flower. 
# I would like to plat with Django and see if Django is the better soulution
@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    print('setup_periodic_tasks')
    # certainly , we should  have a configuration table saved in our database
    sender.add_periodic_task(
        # crontab(hour=21, minute=28),
        10.0,
        s_etl_task.s(),
        name="S Extraction",
    )
    print('s etl task added into celery beat.')


if __name__ == "__main__":
    flask_app.run(host="0.0.0.0", port=5000, debug=True)
