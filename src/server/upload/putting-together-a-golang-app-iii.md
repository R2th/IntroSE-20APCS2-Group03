## Preface
In [Part II](https://viblo.asia/p/putting-together-a-golang-app-part-ii-ORNZqgk350n) we have configured our app for different environment, setup database connection as well as written some utility packages. In this part we will start by implement get manga api endpoint, create database tables, write a few more utility functions as well as create a middleware to catch and respond to error in general.

## Handler Functions
Lets start off by register our handler functions for `index` and `show` endpoint. We create a package called `mangasController` and register all our handler functions in an `init` function. We then imported this package into our main application's router entry point to hook it up.
```Go
// controllers/mangas/router.go
package mangasController

import "github.com/PrinceNorin/monga/controllers/router"

func init() {
    r := router.Get()
    g := r.Group("/api/mangas")
    {
        g.GET("", IndexHandler)
        g.GET("/:mangaId", ShowHandler)
    }
}

// controllers/router.go
package controllers

import (
    ...
    _ "github.com/PrinceNorin/monga/controllers/mangas"
    ...
)
```

For `index` endpoint, we want to be able to handle `ordering` and `pagging` a response, we'll tackle `filtering` in later part. There are some new packages that we used in this handler and we will take a look at their implementation in the next section. For now just focus on how we handled the error. If there is an error we add it to `gin.Context` and just return from the function otherwise respond with json format. The error will be catch and handle in the middleware function, which we will implement in a bit.
```Go
// controllers/mangas/handler.go
package mangasController

import (
	"net/http"

	"github.com/PrinceNorin/monga/models/mangas"
	"github.com/PrinceNorin/monga/utils"
	"github.com/gin-gonic/gin"
)

func IndexHandler(c *gin.Context) {
	orderBy := utils.GetOrderParam(c)
	page, limit := utils.GetPageParam(c)

	mangas, err := mangas.FindAll(page, limit, orderBy)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, mangas)
}
```

For `show` endpoint, we want to be able to find a manga by its `id`. Notice how we handle the error the same as `index` handler. This style of error handling will be used throughout the whole series.
```Go
// controllers/mangas/handler.go
...

func ShowHandler(c *gin.Context) {
	id := utils.GetIntParam("mangaId", c)
	manga, err := mangas.Find(id)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, manga)
}
```

## Model & Migration
In the handler function we used `FindAll` and `Find` functions to get result from database, but we didn't see that they look like, so lets take a look shall we? Lets start by define models.
```Go
// models/model.go
package models

import "time"

type Model struct {
	ID        uint      `json:"id" gorm:"type:bigserial;primary_key"`
	CreatedAt time.Time `json:"createdAt" gorm:"type:timestamp"`
	UpdatedAt time.Time `json:"updatedAt" gorm:"type:timestamp"`
}
```

The `Model` struct will be a common struct that we will embed into others model to provide common columns. Now lets move on to `Manga` model.
```Go
// models/manga.go
package models

import "time"

type Manga struct {
	Model

	Themes []Theme `json:"themes" gorm:"many2many:manga_themes"`

	Title       string     `json:"title" gorm:"not null"`
	Desc        string     `json:"desc"`
	Cover       string     `json:"cover"`
	Wallpaper   string     `json:"wallpaper"`
	Status      string     `json:"status"`
	PublishedAt *time.Time `json:"publishedAt"`
}

// models/theme.go

type Theme struct {
	Model

	Mangas []Manga `json:"mangas" gorm:"many2many:manga_themes"`

	Name string `json:"name" gorm:"unique;not null"`
}
```
Each fields are pretty self explanatory, but one thing to note is the use of `gorm` tag. Gorm will use these tags to setup relationships between models and pass it to generated SQL statement when create a database schema. You can visit this [link](http://gorm.io/docs/models.html) for more information about these tags. Next step is to create database tables from these models. `Gorm` provides `AutoMigrate` for this purpose, for readability I've move thses migration logic into a separate file called `migration.go`.
```Go
// models/gorm.go
func InitGorm() error {
    ...
    if err := runMigrate(db); err != nil {
		return err
	}
    ...
}

// models/migration.go
package models

import "github.com/jinzhu/gorm"

func runMigrate(db *gorm.DB) error {
	if err := db.AutoMigrate(&Manga{}, &Theme{}).Error; err != nil {
		return err
	}
	return nil
}

```

## Query Functions
Now that all the models and tables are in place, lets move on to query functions. Here is what `FindAll` and `Find` function look like.

```Go
// models/mangas/finder.go
package mangas

import (
	"github.com/PrinceNorin/monga/models"
	"github.com/PrinceNorin/monga/utils/paginations"
)

func FindAll(page, limit int, orderBy []string) (*paginations.Pagination, error) {
	var mangas []models.Manga
	p := &paginations.Param{
		DB:      models.ORM,
		Page:    page,
		Limit:   limit,
		OrderBy: orderBy,
	}
	return paginations.Pagging(p, &mangas)
}

func Find(id uint) (*models.Manga, error) {
	var manga models.Manga
	if err := models.ORM.Find(&manga, id).Error; err != nil {
		return nil, err
	}
	return &manga, nil
}
```
`Find` is pretty generic. It finds a record based on `id`, return a reference to a struct if found otherwise return an error. This style of returning two results is one of `Go`'s idiom and coding convention that you will see a lot of in the `Go` community so you should probably get used to it. The interesting part in `FindAll` is a used of `models.ORM` as query `scope`. Each `gorm.DB`'s method, beside the ones that execute the query like `Find`, `First`, `Take` and `Last`, will return a new `gorm.DB` instance where you can chain methods to build a complext `SELECT` query. In our function we just passed in a blank slate db instance, but should the opportunity arise where we will need to implement filtering, we can change it to any query scope we want.

## Utility Functions
It's time to write some common functions that we can re-use. First lets take a look at `paginations` package. This package will expose two struct types, one is a pagination `Param` that used to paginate our query result. And another one is `Pagination` that will be pass into `gin.Context` to produce json output.
```Go
// utils/paginations/struct.go
package paginations

import "github.com/jinzhu/gorm"

type Param struct {
	DB      *gorm.DB
	Page    int
	Limit   int
	OrderBy []string
	ShowSQL bool
}

type Pagination struct {
	Count    int         `json:"count"`
	Pages    int         `json:"pages"`
	Records  interface{} `json:"records"`
	Offset   int         `json:"offset"`
	Limit    int         `json:"limit"`
	Page     int         `json:"page"`
	PrevPage int         `json:"prevPage"`
	NextPage int         `json:"nextPage"`
}
```

This package also expose a function to actually do the pagination. Most of the logic in this function is to calculate page count, total records and so on, but to speed thing up we make use of `Go Channel` to get records count. Also notice how we chain the query `scope`(db).
```Go
// utils/paginations/pagging.go
package paginations

import (
	"math"

	"github.com/jinzhu/gorm"
)

func Pagging(p *Param, data interface{}) (*Pagination, error) {
	db := p.DB

	if p.ShowSQL {
		db = db.Debug()
	}
	if p.Page < 1 {
		p.Page = 1
	}
	if p.Limit == 0 {
		p.Limit = 30
	}
	if len(p.OrderBy) > 0 {
		for _, order := range p.OrderBy {
			db = db.Order(order)
		}
	}

	done := make(chan bool, 1)
	var pagination Pagination
	var count int
	var offset int

	go countRecords(db, data, done, &count)

	if p.Page == 1 {
		offset = 0
	} else {
		offset = (p.Page - 1) * p.Limit
	}

	if err := db.Limit(p.Limit).Offset(offset).Find(data).Error; err != nil {
		<-done
		return nil, err
	}
	<-done

	pagination.Count = count
	pagination.Records = data
	pagination.Page = p.Page

	pagination.Offset = offset
	pagination.Limit = p.Limit
	pagination.Pages = int(math.Ceil(float64(count) / float64(p.Limit)))

	if p.Page > 1 {
		pagination.PrevPage = p.Page - 1
	} else {
		pagination.PrevPage = p.Page
	}

	if p.Page >= pagination.Pages {
		pagination.NextPage = p.Page
	} else {
		pagination.NextPage = p.Page + 1
	}
	return &pagination, nil
}

func countRecords(db *gorm.DB, data interface{}, done chan bool, count *int) {
	db.Model(data).Count(count)
	done <- true
}
```

To making thing easier we will also write common functions to get `order`, `page` and `id` param from url. Here are what they look like. `GetPageParam` expects to find query string named `page` and `limit` and parse it to `int`. In case these params are not present we will use a default value `1` and `30` respectively. `GetOrderParam` expects to find query string named `order` and will default to order by `id ASC`. To change sorting direction just prefix the field name with `-` signed for example `order=-title` will sort by `title DESC` order.
```Go
// utils/param.go
package utils

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func GetOrderParam(c *gin.Context) []string {
	var orderBy []string
	orders := c.DefaultQuery("order", "id")
	for _, order := range strings.Split(orders, ",") {
		order = strings.TrimSpace(order)
		if strings.Contains(order, "-") {
			order = strings.Replace(order, "-", "", -1)
			orderBy = append(orderBy, fmt.Sprintf("%s DESC", order))
		} else {
			orderBy = append(orderBy, fmt.Sprintf("%s ASC", order))
		}
	}
	return orderBy
}

func GetPageParam(c *gin.Context) (int, int) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "30"))
	return page, limit
}

func GetIntParam(key string, c *gin.Context) uint {
	val := c.Param(key)
	id, err := strconv.Atoi(val)
	if err != nil {
		return 0
	}
	return uint(id)
}
```

## Error Middleware
Last but not least is to implement an error `middleware`. The idea behind error middleware is simple, we check if a request context has errors or not. If there is at least one error then we generate appropriate response's body and status for that error.
```Go
// controllers/middlewares/error.go
package middlewares

import (
	"net/http"
	"strings"

	"github.com/PrinceNorin/monga/utils/errors"
	"github.com/PrinceNorin/monga/utils/messages"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		for _, ginerr := range c.Errors {
			err := ginerr.Err
			if strings.Contains(err.Error(), "violates unique constraint") {
				err = errors.ErrNotUnique
			}
			status := getStatus(err)
			payload := gin.H{"status": status}

			if msg, ok := err.(*messages.Messages); ok {
				payload["messages"] = msg.GetAllErrors()
			}
			if status == http.StatusInternalServerError ||
				status == http.StatusBadRequest {
				// TODO: send to error logging service, sentry maybe?
				// captureError(err)
			} else {
				if err == gorm.ErrRecordNotFound {
					err = errors.ErrRecordNotFound
				}
				payload["code"] = err.Error()
			}
			c.JSON(status, payload)
		}
	}
}

func getStatus(err error) int {
	switch err {
	case errors.ErrRecordNotFound,
		gorm.ErrRecordNotFound:
		return http.StatusNotFound
	case errors.ErrBadRequest:
		return http.StatusBadRequest
	case errors.ErrValidation, errors.ErrNotUnique:
		return http.StatusUnprocessableEntity
	case errors.ErrUnauthorized:
		return http.StatusUnauthorized
	default:
		if _, ok := err.(*messages.Messages); ok {
			return http.StatusUnprocessableEntity
		}
		return http.StatusInternalServerError
	}
}
```

It is recommended that we define our own error variables, so that we can use it to check which type of error it is, just like in this case.
```Go
// utils/errors/error.go
package errors

import gerrors "errors"

var (
	ErrNotUnique      = gerrors.New("104")
	ErrValidation     = gerrors.New("103")
	ErrBadRequest     = gerrors.New("102")
	ErrRecordNotFound = gerrors.New("101")
	ErrUnauthorized   = gerrors.New("100")
)
```
We are building API so the errors should be represented as a series of codes instead of raw string. It is easier to work with error code on client that raw string, but be sure to document this well.

## Conclusion
We've done a lot in this part. In the next part we will deal with form binding, request validation as well as how to persist data into our database.