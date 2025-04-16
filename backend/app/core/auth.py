from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import httpx, os

router = APIRouter(tags=["Autenticação"])

# Variáveis de ambiente
KEYCLOAK_URL = os.getenv("KEYCLOAK_URL")
REALM = os.getenv("KEYCLOAK_REALM")
CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID")
JWKS_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"
ISSUER = f"{KEYCLOAK_URL}/realms/{REALM}"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")  # Valor fictício, só para satisfazer a dependência

# Função que verifica e valida o token JWT
async def verify_token(token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        jwks = await client.get(JWKS_URL)
        jwk = jwks.json()["keys"][0]
    try:
        public_key = jwt.construct_rsa_public_key(jwk)
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=CLIENT_ID,
            issuer=ISSUER
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")
