## Preface
In [Part III](https://viblo.asia/p/putting-together-a-golang-app-iii-V3m5Wo985O7) we have implemented a bunch of things like middleware, making model and migration, how to use query scope, wrote some common utility functions and well as introduce api endpoint to list and show manga. In this part we will add support for creating and updating manga to our api as well as take a look at how to validate and bind request payload in golang.

## Handler Functions
As usual lets start by working on the end goal that we want. We want to add support for create/update manga so here is our handler function for these endpoints.

```Go
// controllers/mangas/router.go
func init() {
    {
        // rest of code

        g.POST("", CreateHandler)
        g.PUT("/:mangaId", UpdateHandler)
        g.PATCH("/:mangaId", UpdateHandler)
    }
}
```

Now lets take a look at the actual implementation of these handler function. I've limited logic in these functions to the minimum and delegate most of the work to other packages, but there are a couple of things to note here. First is that to get request payload we binding it to our custom struct, I called it `form` struct because in web development request payload usually come from submitting form data(and JSON as well) so you get the gist. Another thing is we use that `form` struct to do validation as well. I like to put validation logic away from `model` struct because it tend to grow and become messy.

```Go
import (
    // rest of import

    "github.com/PrinceNorin/monga/utils/messages"
	"github.com/PrinceNorin/monga/utils/validators"
)

func CreateHandler(c *gin.Context) {
	var f validators.MangaForm
	validators.Bind(&f, c)

	msg := messages.GetMessages(c)
	if err := validators.Validate(&f, msg); err != nil {
		c.Error(msg)
		return
	}

	manga, err := mangas.Create(&f, c)
	if err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"data": manga,
	})
}

func UpdateHandler(c *gin.Context) {
	id := utils.GetIntParam("mangaId", c)
	manga, err := mangas.Find(id)
	if err != nil {
		c.Error(err)
		return
	}

	var f validators.MangaForm
	validators.Bind(&f, c)

	msg := messages.GetMessages(c)
	if err := validators.Validate(&f, msg); err != nil {
		c.Error(msg)
		return
	}

	if err := mangas.Update(manga, &f, c); err != nil {
		c.Error(err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": manga,
	})
}
```

## Form, Validation & Binding
To bind payload to struct fields we use `form` and `json` tag for that. The former is for `form-data` and the later is for `json` request. For validation we use `validate` tag that `go-validator` package will look for to validate against back in `handler` function. `required` and `oneof` are built-in tags as for `date` is a custom validator that we will write in the section. Notice that I use pointer for `PublishedAt`? This indicate that this field can be `null` in our database.

```Go
package validators

import "time"

type MangaForm struct {
    Title       string     `form:"title" json:"title" validate:"required"`
	Desc        string     `form:"desc" json:"desc"`
	Status      string     `form:"status" json:"status" validate:"required,oneof=ongoing finished"`
	PublishedAt *time.Time `form:"publishedAt" json:"publishedAt" validate:"omitempty,date"`
}
```

Next lets take a look at our custom `date` validator. This is the signature that `go-validator` expected. It takes `FieldLevel` as an argument, return `true` if validation pass or `false` otherwise.

```Go
package validators

import (
	"time"

	validator "gopkg.in/go-playground/validator.v9"
)

func DateValidatorFunc(fl validator.FieldLevel) bool {
	v := fl.Field().Interface()
	if v == nil {
		return false
	}
	d, ok := v.(time.Time)
	if !ok {
		return false
	}
	if d.Format("2006-01-02") == "0001-01-01" {
		return false
	}
	return true
}
```

To register our custom validator we do this.

```Go
package validators

func init() {
    validate = validator.New()
    // register `date` tag to `DateValidatorFunc`
	validate.RegisterValidation("date", DateValidatorFunc)
}
```

Ok now that we have `form`, and `validation` function in place lets take a look at how we bind & validate it. For validation part we already implement a function to handle that in Part II, what's left is to implement form binding so here it is. This helper function is just a wrap around on `gin.Context` to use appropriate binding based on `content type`. If it is `form-data` then we use multipart form binding, otherwise use json.

```Go
func Bind(v interface{}, c *gin.Context) error {
	contentType := c.ContentType()
	if strings.Contains(contentType, "multipart/form-data") {
		return c.ShouldBindWith(v, binding.FormMultipart)
	} else {
		return c.ShouldBindWith(v, binding.JSON)
	}
}
```

## Save to Database
Now it's time to save our valid form data to our database. Lets take a look at the following functions. The reason I move the assignment of struct field to a separate function, `assignAttributes`, is because in the next part we'll add fileupload support into our api endpoint and the logic for both `Update` and `Create` is the same so it make sense to DRY thing up right?

```Go
package mangas

import (
	"github.com/PrinceNorin/monga/models"
	"github.com/PrinceNorin/monga/utils"
	"github.com/PrinceNorin/monga/utils/validators"
	"github.com/gin-gonic/gin"
)

func Create(f *validators.MangaForm, c *gin.Context) (*models.Manga, error) {
	var manga models.Manga
	if err := assignAttributes(&manga, f, c); err != nil {
		return nil, err
	}

	if err := models.ORM.Create(&manga).Error; err != nil {
		return nil, err
	}
	return &manga, nil
}

func Update(manga *models.Manga, f *validators.MangaForm, c *gin.Context) error {
	if err := assignAttributes(manga, f, c); err != nil {
		return err
	}

	if err := models.ORM.Save(manga).Error; err != nil {
		return err
	}
	return nil
}

func assignAttributes(manga *models.Manga, f *validators.MangaForm, c *gin.Context) error {
	manga.Title = f.Title
	manga.Desc = f.Desc
	manga.PublishedAt = f.PublishedAt
	manga.Status = f.Status
	return nil
}
```

## Conclusion
We didn't do much in this part, but we did learned a few important techniques to work with request data and how we approach it. I hope you find this useful.