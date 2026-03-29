from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------- PRODUCTS ---------------- #

@app.get("/products")
def get_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@app.post("/products")
def create_product(product: dict, db: Session = Depends(get_db)):
    new_product = models.Product(**product)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.get("/products/{id}")
def get_product(id: int, db: Session = Depends(get_db)):
    return db.query(models.Product).filter(models.Product.id == id).first()

# ---------------- CART ---------------- #

@app.get("/cart")
def get_cart(db: Session = Depends(get_db)):
    return db.query(models.Cart).all()

@app.post("/cart")
def add_to_cart(item: dict, db: Session = Depends(get_db)):
    new_item = models.Cart(**item)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.delete("/cart/{id}")
def remove_cart(id: int, db: Session = Depends(get_db)):
    item = db.query(models.Cart).filter(models.Cart.id == id).first()
    db.delete(item)
    db.commit()
    return {"message": "Deleted"}
