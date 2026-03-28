from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from passlib.context import CryptContext

app = FastAPI()

SECRET_KEY = "secret123"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

fake_users_db = {}

def hash_password(password):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

@app.post("/register")
def register(user: dict):
    if user["email"] in fake_users_db:
        raise HTTPException(status_code=400, detail="User exists")

    fake_users_db[user["email"]] = {
        "email": user["email"],
        "password": hash_password(user["password"])
    }
    return {"message": "User registered"}

@app.post("/login")
def login(user: dict):
    db_user = fake_users_db.get(user["email"])

    if not db_user or not verify_password(user["password"], db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"sub": user["email"]})
    return {"access_token": token}

@app.get("/protected")
def protected(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    return {"message": f"Welcome {payload['sub']}"}
