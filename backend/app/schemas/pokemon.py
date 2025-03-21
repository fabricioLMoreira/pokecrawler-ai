# Este ficheiro define os schemas (modelos Pydantic) usados para validar e estruturar
# os dados que entram e saem da API REST.
#
# As classes PokemonCreate e PokemonUpdate herdam de PokemonBase e são separadas
# por convenção e boas práticas, mesmo que atualmente tenham os mesmos campos.
# 
# Isso permite uma distinção clara entre diferentes operações (criação vs. atualização)
# e oferece flexibilidade futura para adaptar os schemas sem afetar o restante da aplicação.
#
# O uso de `pass` indica que essas subclasses não adicionam campos por enquanto,
# mas estão preparadas para evoluir de forma independente.


from pydantic import BaseModel
from typing import Optional

class PokemonBase(BaseModel):
    name: str
    type_primary: str
    type_secondary: Optional[str] = None
    url: str
    sprite: Optional[str] = None

class PokemonCreate(PokemonBase):
    pass # não esta a adicionar nada extra no momento

class PokemonUpdate(PokemonBase):
    pass

class PokemonOut(PokemonBase):
    id: int

    class Config:
        orm_mode = True
