from app.models.core import CoreModel, DateTimeModelMixin, IDModelMixin


class ProductBase(CoreModel):
    name: str
    price: float


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductInDB(IDModelMixin, ProductBase, DateTimeModelMixin):
    pass


class ProductPublic(IDModelMixin, ProductBase, DateTimeModelMixin):
    pass
