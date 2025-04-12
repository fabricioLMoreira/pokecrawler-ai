from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import httpx, os
from jose import jwt, JWTError

router = APIRouter(tags=["Autenticação"])

# Variáveis de ambiente
KEYCLOAK_URL = os.getenv("KEYCLOAK_URL")
REALM = os.getenv("KEYCLOAK_REALM")
CLIENT_ID = os.getenv("KEYCLOAK_CLIENT_ID")
CLIENT_SECRET = os.getenv("KEYCLOAK_CLIENT_SECRET")
TOKEN_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/token"
JWKS_URL = f"{KEYCLOAK_URL}/realms/{REALM}/protocol/openid-connect/certs"
ISSUER = f"{KEYCLOAK_URL}/realms/{REALM}"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(data: LoginRequest):
    payload = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "password",
        "username": data.username,
        "password": data.password,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(TOKEN_URL, data=payload)
        if response.status_code != 200:
            raise HTTPException(status_code=401, detail="Credenciais inválidas")
        return response.json()

# Função que vrifica do token
async def verify_token(token: str = Depends(oauth2_scheme)):
    async with httpx.AsyncClient() as client:
        jwks = await client.get(JWKS_URL)
        jwk = jwks.json()["keys"][0]
    try:
        public_key = jwt.construct_rsa_public_key(jwk)
        payload = jwt.decode(token, public_key, algorithms=["RS256"], audience=CLIENT_ID, issuer=ISSUER)
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Token inválido")
