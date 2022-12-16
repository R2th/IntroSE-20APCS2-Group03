# What is `responder`
A web framework created by [kennethreitz](https://github.com/kennethreitz), the creator of [requests](http://python-requests.org/) and [pipenv](https://docs.pipenv.org/), which many people know if you are using python. 

Python hasn't had a framework that defines its own until [Django](https://www.djangoproject.com/), [Flask](https://www.palletsprojects.com/p/flask/), etc... appeared, 

And the [responder](https://python-responder.org/en/latest/) suddenly appeared in 2018 was a surprise.

Please refer to the official document for more details, but in short:

* A nice and cool framework for Flask and Falcon
* Supports functions such as GraphQL, async, etc. (as of 2019)
* API easy to use (easy to understand)
* 
 I think this is a top candidate for the Python Web Framework world.
 
 # What is `tortoise-orm`
 You already know the term ORM made by Python [SQLAlchemy](https://www.sqlalchemy.org/). However, since this is also an old stuff (the first release in 2006), I searched for something new, and found the [Tortoise ORM](https://tortoise-orm.readthedocs.io/en/latest/) created by respecting Django's ORM.
 
I personally like Django's design philosophy, and I was able to simplify Model and Scheme in the same code, and support `asyncio`, so I decided to try it once

I think that compatibility with the `responder` feels pretty good for the above reasons.

# Sample
https://github.com/shuto-S/sample-responder-tortoise

# Technique used
* Python 3.7
* pipenv
* responder
* tortoise-orm

# Install and run

Once you have `pipenv` installed, it should work if you hit the command as described in the sample in README file. It seems that `tortoise-orm` doesn't support `pipinv`, so it takes it directly from GitHub, but it works for just fine.

Since `pipenv` can add commands to scripts, it is also good when dealing with products.

```
[scripts]
migrate="python migrate.py"
start="python main.py"
```

# Migration
Prepare the following file and execute it in Python.
```
from tortoise import Tortoise, run_async

async def migrate():
   # connect DB
    await Tortoise.init(
        db_url="sqlite://db.sqlite3",  # DB URL
        modules={"models": ["models"]}  # Set the file that Model is written
    )

    # run migrate
    await Tortoise.generate_schemas()

run_async(migrate())
```

# Main
There are many ways to write, but you can set connect/disconnect as well as DB connection routing, and create `main.py` to launch the application.

When executed in `Python`, the `responder` starts up.
```
import responder
from tortoise import Tortoise
from router import add_routers

api = responder.API()

# Establish a connection to DB at startup
@api.on_event("startup")
async def start_db_connection():
    await Tortoise.init(
        db_url="sqlite://db.sqlite3",
        modules={"models": ["models"]}
    )

# Disconnect DB connection
@api.on_event("shutdown")
async def close_db_connection():
    await Tortoise.close_connections()

# Routing is set in router.py
add_routers(api)

if __name__ == '__main__':
    api.run(debug=True)
```
# Routing
It was fine to write in main, but I created it because I wanted a routing-only file like Django's `urls.py`.

I want to refactor the source code without receiving the `api: responder.API`
```
import responder
from controllers.account import Account

def add_routers(api: responder.API):
    api.add_route("/accounts", Account)
```

# Models
Of course implemented by `tortoise-orm`.

It is quite easy to use if you are used to work with `Django`.
```
from tortoise.models import Model
from tortoise import fields

class User(Model):
    id = fields.IntField(pk=True)
    name = fields.TextField()

    def __str__(self):
        return self.name
```
# Controller
It corresponds to views.py in Django.

I was able to write quite cleanly because I can establish a routing configuration in `router.py` and a DB connection in `main.py`. 

Also, since we only set the response (status code etc.) to `resp`, it is very pleased to the eye.
```
from models import User

class Account:
    async def on_get(self, req, resp):
        # Create a test account (user) for now
        await User.create(name="Test User")

        user = await User.first()
        resp.text = f"Hello, {user.name}"
```        

# Conclusion
An easy-to-use set of APIs that can be reached easily with a `responder`.

`Django` tick and clear `ORM` features from `tortoise-orm`.

It's just coming out (both first released in 2018), so I think it looks rough while using it, but because the compatibility is huge, this combination has the potential to aim for supremacy well enough.

There are a lot of functions that I haven't written about both in terms of samples, so you should try the idea of the Python Web Framework world.