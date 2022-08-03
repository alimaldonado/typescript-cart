from fastapi import APIRouter
from app.api.routes.product_routes import router as product_router

router = APIRouter()

router.include_router(product_router, prefix="/products", tags=["products"])
