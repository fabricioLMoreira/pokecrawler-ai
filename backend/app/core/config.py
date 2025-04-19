# Contém configurações centrais da aplicação, como a URL da base de dados e
# os domnios de origem permitidos para o CORS.
#
# As configurações são carregadas das variáveis de ambiente, com valores padrão definidos.

import os

# dominios permitidos
ALLOWED_ORIGINS = "http://localhost:3000"

# Obtem as credenciais da DB do ambiente
DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_HOST = os.getenv("POSTGRES_HOST")
DB_PORT = os.getenv("POSTGRES_PORT")
DB_NAME = os.getenv("POSTGRES_DB")

DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
