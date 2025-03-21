# Contém configurações centrais da aplicação, como a URL da base de dados e
# os domnios de origem permitidos para o CORS.
#
# As configurações são carregadas das variáveis de ambiente, com valores padrão definidos.

import os

# dominios permitidos
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")

# Obtem as credenciais da DB do ambiente
DB_USER = os.getenv("DB_USER", "user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "pokedb")

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"