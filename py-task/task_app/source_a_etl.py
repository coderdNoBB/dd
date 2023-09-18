from celery.result import AsyncResult
from flask import Blueprint
from flask import request

bp = Blueprint("tasks", __name__, url_prefix="/tasks")


@bp.get("/do/a/etl/<date>")
def do_a_etl(date: str) -> dict[str, object]:
    return {
        date: date
    }