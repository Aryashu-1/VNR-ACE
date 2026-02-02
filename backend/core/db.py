from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from core.config import settings

# Base class for all models
Base = declarative_base()

# Async engine for PostgreSQL
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,  # shows SQL queries in terminal, helpful for debugging
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)

# Dependency for FastAPI routes
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
