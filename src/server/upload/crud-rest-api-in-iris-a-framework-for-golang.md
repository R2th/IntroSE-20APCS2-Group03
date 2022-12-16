# Why should I use Iris?
1. Nó là 1 golang framework. Ngôn ngữ lập trình nhanh nhất tại thời điểm hiện tại được phát triển bới Google.
2. Cross platform. Viết một lần, gọi ở bất cứ đâu.
3. Service oriented. Dễ dàng build microservices với Iris.
> Install Iris framework tại [link này](https://github.com/kataras/iris)
# Let's go
1. Trước tiên chúng ta import các packages và định nghĩa model cho Database
```go
package main

import (
	"fmt"
	"time"

	"github.com/kataras/iris"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"github.com/kataras/iris/context"
	"github.com/kataras/iris/middleware/logger"
	"github.com/kataras/iris/middleware/recover"
)

type User struct {
	ID         bson.ObjectId `bson:"_id,omitempty"`
	Firstname  string        `json:"firstname"`
	Lastname   string        `json:"lastname"`
	Age        int           `json:"age"`
	Msisdn     string        `json:"msisdn"`
	InsertedAt time.Time     `json:"inserted_at" bson:"inserted_at"`
	LastUpdate time.Time     `json:"last_update" bson:"last_update"`
}
```
> mgo: là mongodb package cho golang

2. Kết nối với mongodb và tạo HTTP server
```go

func main() {
	app := iris.New()
	app.Logger().SetLevel("debug")
	// Optionally, add two built'n handlers
	// that can recover from any http-relative panics
	// and log the requests to the terminal.
	app.Use(recover.New())
	app.Use(logger.New())

	session, err := mgo.Dial("127.0.0.1")
	if nil != err {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)

	c := session.DB("usergo").C("profiles")

	// Index
	index := mgo.Index{
		Key:        []string{"msisdn"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}

	err = c.EnsureIndex(index)
	if err != nil {
		panic(err)
	}
app.Run(iris.Addr(":8080"), iris.WithoutServerError(iris.ErrServerClosed))
}
```

3. Kết quả trả về
```go

// Method:   GET Default Endpoint
	// Resource: http://localhost:8080
	app.Handle("GET", "/", func(ctx context.Context) {
		ctx.JSON(context.Map{"message": "Welcome User Micro Service"})
	})
```

Run code và xem kết quả bằng Postman

![](https://images.viblo.asia/e71e2bfa-ea9c-4766-b246-1539497765fb.png)

Ok! Bây giờ CRUD thôi. :rofl::rofl::rofl:

```go
// Gets all users
	// Method:   GET
	// Resource: this to get all all users
	app.Handle("GET", "/users", func(ctx context.Context) {
		results := []User{}

		err := c.Find(nil).All(&results)
		if err != nil {
			// TODO: Do something about the error
		} else {
			fmt.Println("Results All: ", results)
		}
		ctx.JSON(context.Map{"response": results})
	})

	// Gets a single user
	// Method:   GET
	// Resource: this to get a user by msisdn
	app.Handle("GET", "/users/{msisdn: string}", func(ctx context.Context) {
		msisdn := ctx.Params().Get("msisdn")
		fmt.Println(msisdn)
		if msisdn == "" {
			ctx.JSON(context.Map{"response": "please pass a valid msisdn"})
		}
		result := User{}
		err = c.Find(bson.M{"msisdn": msisdn}).One(&result)
		if err != nil {
			ctx.JSON(context.Map{"response": err.Error()})
		}
		ctx.JSON(context.Map{"response": result})
	})

	// Method:   POST
	// Resource: This is to create a new user
	app.Handle("POST", "/users", func(ctx context.Context) {
		params := &User{}
		err := ctx.ReadJSON(params)
		if err != nil {
			ctx.JSON(context.Map{"response": err.Error()})
		} else {
			params.LastUpdate = time.Now()
			err := c.Insert(params)
			if err != nil {
				ctx.JSON(context.Map{"response": err.Error()})
			} else {
				fmt.Println("Successfully inserted into database")
				result := User{}
				err = c.Find(bson.M{"msisdn": params.Msisdn}).One(&result)
				if err != nil {
					ctx.JSON(context.Map{"response": err.Error()})
				}
				ctx.JSON(context.Map{"response": "User succesfully created", "message": result})
			}
		}

	})

	// Method:   PATCH
	// Resource: This is to update a user record
	app.Handle("PATCH", "/users/{msisdn: string}", func(ctx context.Context) {
		msisdn := ctx.Params().Get("msisdn")
		fmt.Println(msisdn)
		if msisdn == "" {
			ctx.JSON(context.Map{"response": "please pass a valid msisdn"})
		}
		params := &User{}
		err := ctx.ReadJSON(params)
		if err != nil {
			ctx.JSON(context.Map{"response": err.Error()})
		} else {
			params.InsertedAt = time.Now()
			query := bson.M{"msisdn": msisdn}
			err = c.Update(query, params)
			if err != nil {
				ctx.JSON(context.Map{"response": err.Error()})
			} else {
				result := User{}
				err = c.Find(bson.M{"msisdn": params.Msisdn}).One(&result)
				if err != nil {
					ctx.JSON(context.Map{"response": err.Error()})
				}
				ctx.JSON(context.Map{"response": "user record successfully updated", "data": result})
			}
		}

	})

	// Method:   DELETE
	// Resource: This is to delete a user record
	app.Handle("DELETE", "/users/{msisdn: string}", func(ctx context.Context) {
		msisdn := ctx.Params().Get("msisdn")
		fmt.Println(msisdn)
		if msisdn == "" {
			ctx.JSON(context.Map{"response": "please pass a valid msisdn"})
		}
		params := &User{}
		err := ctx.ReadJSON(params)
		if err != nil {
			ctx.JSON(context.Map{"response": err.Error()})
		} else {
			params.InsertedAt = time.Now()
			query := bson.M{"msisdn": msisdn}
			err = c.Remove(query)
			if err != nil {
				ctx.JSON(context.Map{"response": err.Error()})
			} else {
				ctx.JSON(context.Map{"response": "user record successfully deleted"})
			}
		}

	})
```

### Kết quả
1. Show all users
![](https://images.viblo.asia/28c59821-6c01-411b-a28b-c98d24049ac7.png)
2. Show an user
![](https://images.viblo.asia/10b94d65-e544-4a58-b435-99baf59518d8.png)
3. Create an user
![](https://images.viblo.asia/3bfecc70-24a9-472b-9f33-f5b7e85c82db.png)
4. Update an user
![](https://images.viblo.asia/c57e4719-eb30-4ad3-ae6c-b9f1a6bf17db.png)
5. Delete an user
![](https://images.viblo.asia/39f39b2a-396a-4804-ad7c-b9429fcb8e5f.png)