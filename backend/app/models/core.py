from datetime import datetime
from typing import Optional
from pydantic import BaseModel, validator


class CoreModel(BaseModel):
    """
        Any core logic shared by the models
    """


class DateTimeModelMixin(BaseModel):
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    @validator("created_at", "updated_at", pre=True)
    def default_datetime(cls, value: datetime) -> datetime:
        return value or datetime.datetime.now()


class IDModelMixin(BaseModel):
    id: str
