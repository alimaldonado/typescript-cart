"""creates products table
Revision ID: 3e5b17247e86
Revises: 
Create Date: 2022-08-03 22:26:45.780769
"""
from typing import Tuple
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic
revision = '3e5b17247e86'
down_revision = None
branch_labels = None
depends_on = None


def create_updated_at_trigger() -> None:
    op.execute(
        """
        CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS
        $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END;
        $$ language 'plpgsql';
        """
    )


def timestamps(indexed: bool = False) -> Tuple[sa.Column, sa.Column]:
    return (
        sa.Column(
            "created_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
            index=indexed,
        ),
        sa.Column(
            "updated_at",
            sa.TIMESTAMP(timezone=True),
            server_default=sa.func.now(),
            nullable=False,
            index=indexed,
        ),
    )


def upgrade() -> None:
    create_updated_at_trigger()
    op.create_table(
        "products",
        sa.Column("id", sa.CHAR(36), primary_key=True),
        sa.Column("name", sa.String,
                  nullable=False, index=True),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        *timestamps(),
    )
    op.execute(
        """
        CREATE TRIGGER update_product_modtime
            BEFORE UPDATE
            ON products
            FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
        """
    )


def downgrade() -> None:
    op.drop_table("products")
    op.execute("DROP FUNCTION update_updated_at_column")
