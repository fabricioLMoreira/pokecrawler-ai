# Define a conexão com a base de dados PostgreSQL usando SQLAlchemy com asyncpg (interface library designed specifically for PostgreSQL and Python/asyncio).
# Também cria o engine e a sessão assíncrona (AsyncSession) para ser usada nos endpoints.

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from core.config import DATABASE_URL
from db.models import Base

engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with SessionLocal() as session:
        yield session
