# Define os modelos (tabelas) da DB com SQLAlchemy.
# Cada classe representa uma tabela e os seus atributos representam colunas.
#
# Neste projeto, a tabela 'pokemons' armazena os dados principais dos Pokémon.

from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type_primary = Column(String, nullable=False)
    type_secondary = Column(String, nullable=True)
    url = Column(String, nullable=False)
    sprite = Column(String, nullable=True)
