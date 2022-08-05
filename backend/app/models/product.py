from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin
from typing import Optional


class ProductBase(CoreModel):
    name: str
    price: float


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    picture: Optional[str]


class ProductInDB(IDModelMixin, ProductBase, DateTimeModelMixin):
    picture: Optional[str]

class ProductPublic(IDModelMixin, ProductBase, DateTimeModelMixin):
    picture: Optional[str]
