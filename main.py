

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer='CATCH'

@app.get('/answer')
def get_answer():
    return answer

app.mount("/", StaticFiles(directory="static", html=True),name="static")

# class Item(BaseModel):
#     id:int
#     content:str

# items = ['MacBook','appleWatch','iphone','airpot']

# @app.get('/items')
# def read_items():
#     return items


# 특정 인덱스를 지정
# @app.get('/items/{id}')
# def read_id_item(id):
#     return items[int(id)]

# @app.get('/items')
# def read_item(skip:int=0, limit:int=10):
#     return items[skip:skip+limit]

# @app.post("/items")
# def post_items(item:Item):
#     items.append(item.content)
#     return 'seccess!!!'