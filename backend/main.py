from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.middleware.cors import CORSMiddleware
from firebase_admin import credentials, initialize_app, auth
import firebase_admin
from pydantic import BaseModel
import requests

app = FastAPI()

# Configurar CORS
origins = [
    "http://127.0.0.1:5500",  # Aquí agregas la URL de tu frontend
    "http://localhost:5500",  # También puedes agregar localhost si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar Firebase Admin SDK
cred = credentials.Certificate("./serviceAccountKey.json")
initialize_app(cred)

FIREBASE_WEB_API_KEY = "AIzaSyCmNJMG9QkA3bzwe4BZwdFHk5ZRsGInSc8"


@app.get("/")
def read_root():
    return {"message": "Bienvenido al backend de FastAPI con Firebase"}


class DataLogin(BaseModel):
    email: str
    password: str


class Verify_token(BaseModel):
    token: str


@app.post("/login/")
async def login(data: DataLogin):
    payload = {
        "email": data.email,
        "password": data.password,
        "returnSecureToken": True
    }

    # Hacemos la solicitud a Firebase Authentication REST API para validar las credenciales
    response = requests.post(
        f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={
            FIREBASE_WEB_API_KEY}",
        json=payload
    )

    if response.status_code == 200:
        id_token = response.json()["idToken"]
        return {"id_token": id_token}
    else:
        raise HTTPException(
            status_code=400, detail="Correo o contraseña incorrectos")


@app.post("/register/")
async def signup(data: DataLogin):
    try:
        user = auth.create_user(
            email=data.email,
            password=data.password
        )
        return {"uid": user.uid, "email": user.email}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/verify-token/")
async def verify_token(data: Verify_token):
    try:
        token = data.token

        print(token)

        if not token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Token no proporcionado")

        # Verificar el token con Firebase Admin SDK
        decoded_token = auth.verify_id_token(token, check_revoked=True)
        # Podés devolver datos del usuario o simplemente un estado de éxito
        return {"valid": True, "uid": decoded_token["uid"], "email": decoded_token["firebase"]["identities"]["email"]}

    except firebase_admin.exceptions.FirebaseError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")
