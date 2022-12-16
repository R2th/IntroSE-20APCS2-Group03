## Preface
In [Part I](https://viblo.asia/p/putting-together-a-golang-app-part-i-Qbq5QLJXlD8) we've already setup some basic routing and directory layout for our code base. In this part we will focusing on configure our app for different environment, setup database connection as well as write some utility packages that we will be using throughout the whole app.

## Configuration
First lets grab neccessary library by run the following command. Again to add dependency we use `dep ensure -add`.

```SH
$ dep ensure -add github.com/jinzhu/configor
```

Next is to decide where the code should go. I've put in into `config` directory and it will also serve as a package namespace as well. Our `config` package will expose two things, one is a `Config` struct which contain various application settings for different environment, another one is a function named `Get` which is a factory function. Again we use `sync.Once` to ensure that `Config` struct instance initialze only once. This is a trick to do lazy initialzation.

```Go
// config/config.go

var (
	once sync.Once
	conf *Config
)

func Get() *Config {
	once.Do(func() {
		env := os.Getenv("APP_ENV")
		if env == "" {
			env = "development"
		}

		conf = &Config{Env: env}
        // loading order config/config.yml, config/config.{env}.yml
		configor.New(&configor.Config{Environment: env}).Load(conf, "config/config.yml")
	})
	return conf
}
```

In `Get` function we load settings from YAML file by calling `configor.Load`, pass in a pointer to struct instance and a path to YAML file. By default configor will load base configuration file `config/config.yml` then it will look for `CONFIGOR_ENV` environment variable, load file that match this pattern `config/config.{env}.yml` and merge it together. Because we want to use different variable name we need to create a new configor instance. This is done by calling `configor.New` and pass in an option like this `configor.Config{Environment: env}`.

```Go
// config/struct.go

type Config struct {
	Env    string
	Name   string       `yaml:"name"`
	DB     dbStruct     `yaml:"db"`
	Time   timeStruct   `yaml:"time"`
	Logger loggerStruct `yaml:"logger"`
}

type dbStruct struct {
	Type    string `yaml:"type"`
	Params  string `yaml:"params"`
	MaxIdle int    `yaml:"max_idle"`
	MaxOpen int    `yaml:"max_open"`
}

type timeStruct struct {
	Zone string `yaml:"zone"`
}

type loggerStruct struct {
	Enabled  bool   `yaml:"enabled"`
	Filename string `yaml:"filename,omitempty"`
}

func (c *Config) GetLocation() *time.Location {
	loc, err := time.LoadLocation(c.Time.Zone)
	if err != nil {
		panic(err)
	}
	return loc
}
```

We tagged each field in `Config` struct with `yaml` this will tell `configor` to look for corresponding key in YAML and assign its value to that field. To load nested key just create an inner struct and follow the same convention. This is what the YAML file looks like. In addtion we also want to ignore envrionment specific config file.

```YAML
# config/config.yml

name: Monga

db:
  type:
  params:
  max_idle:
  max_open:

logger:
  enabled:
  filename:

time:
  zone: UTC
```

```
# .gitignore
.....

.DS_Store
config/*.yml
!config/config.yml
```

## Database
Now that application configuration is in place lets move on to database connection. To ease development process we will be using [gorm](https://github.com/jinzhu/gorm) which is an ORM library for golang. A couple of things to note are custom `gorm.NowFunc` and `LogMode`. `gorm` will call `NowFunc` to get value for `CreatedAt`, `UpdatedAt` or `DeletedAt`. Default implementaion for this function is current server time, but we don't want that so what we do here is override it to return current time in a specific zone based on our application config. As for `LogMode`, `gorm` will log every thing to standard output unless we specify one.
```SH
$ dep ensure -add github.com/jinzhu/gorm
```

```Go
// models/gorm.go

var ORM *gorm.DB

func InitGorm() error {
	c := config.Get()
    
    // CreatedAt, UpdatedAt, DeletedAt with config timezone
	gorm.NowFunc = func() time.Time {
		return time.Now().In(c.GetLocation())
	}

	db, err := gorm.Open(c.DB.Type, c.DB.Params)
	if err != nil {
		return err
	}

	if err := db.DB().Ping(); err != nil {
		return err
	}

	db.DB().SetMaxIdleConns(c.DB.MaxIdle)
	db.DB().SetMaxOpenConns(c.DB.MaxOpen)

    db.LogMode(c.Logger.Enabled)
	if c.Logger.Enabled && c.Logger.Filename != "" {
		f, err := os.Create(c.Logger.Filename)
		if err != nil {
			return err
		}
        // file logger adapter with line feed suffic
        db.SetLogger(log.New(f, "\r\n", 0))
	}
	return nil
}
```

Back to our `main.go` lets test for db connection by paste in the following code. We want to print out error message and terminate the program early on if we can't connect to db.

```Go
// main.go

func main() {
    // initialize database connection
	if err := models.InitGorm(); err != nil {
		panic(err)
        return
	}

    ...
}
```

## Validation & Error Handling
One common thing of software development is dealing with input validation and error handling. The early on we work on this house keeping stuff the better so lets get start.

### Message Bag
The purpose of this package is to provider a tool to work with error message when doing form input validation. We set it into `gin.Context` so that we can pass it round between function handler and still retain previous error in the same request session. You will see it being used extensively in conjuction with `validators` package that I will show you in the next section. The following code is pretty self explainatory. In `GetMessages` function we first check to see if `Messages` struct's instance already exist within context we return that instance back to the caller, if it doesn't exist then we initialize it set it into context and return it's reference back to the caller. Everytime we add/remove an error in message bag we re-set it back into context to make sure it available in the next call to `GetMessages`.

```Go
// utils/messages/message.go

type Messages struct {
	c      *gin.Context
	errors map[string][]string
}

const messageKey = "monga.messages"

func GetMessages(c *gin.Context) *Messages {
    // get from context if already exist
	if m, ok := c.Get(messageKey); ok {
		msg := m.(*Messages)
		msg.c = c
		return msg
	}
	msg := &Messages{c, make(map[string][]string)}
	c.Set(messageKey, msg)
	return msg
}

func (msg *Messages) AddError(key, message string) {
	msg.errors[key] = append(msg.errors[key], message)
	msg.setInContext()
}

func (msg *Messages) Error(key string, err error) {
	msg.AddError(key, err.Error())
}

func (msg *Messages) GetAllErrors() map[string][]string {
	return msg.errors
}

func (msg *Messages) GetError(key string) []string {
	if errs, ok := msg.errors[key]; ok {
		return errs
	}
	return nil
}

func (msg *Messages) HasErrors() bool {
	return len(msg.errors) > 0
}

func (msg *Messages) HasError(key string) bool {
	return len(msg.GetError(key)) > 0
}

func (msg *Messages) Clear() {
	msg.errors = make(map[string][]string)
}

func (msg *Messages) ClearError(key string) {
	msg.errors[key] = nil
    msg.setInContext()
}

func (msg *Messages) setInContext() {
	msg.c.Set(messageKey, msg)
}
```

## Validation
`go-playground` validator has extensive list of built-in validation functions and we will be using this package and build on top of it. `Validate` function take in an empty `interface` and a pointer to `messages.Messages` struct that we created earlier. An empty `interface` can hold values of any type so we can pass in any reference to struct to validate. `validate.Struct` will look for any fields in that struct that has `validate` tag and validate it accordingly. If validation failed it will return an `error` that hold a reference to `validator.ValidationErrors` so in order to get more information about error we need to cast it, loop through it and add it to `messages.Messages` struct. See the connection here?. By the way we will leave `init` for now, but we will get back to it later when we have a needed to write custom validation rules.

```Go
// utils/validators/validator.go

import (
    ...
    validator "gopkg.in/go-playground/validator.v9"
)

var validate *validator.Validate

func init() {
	validate = validator.New()
}

func Validate(f interface{}, msg *messages.Messages) error {
	err := validate.Struct(f)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			fieldName := strcase.ToLowerCamel(err.Field())
			} if err.Param() != "" {
				msg.AddError(fieldName, fmt.Sprintf("errors_%s: %s", err.Tag(), err.Param()))
			} else {
				msg.AddError(fieldName, fmt.Sprintf("errors_%s", err.Tag()))
			}
		}
		return err
	}
	return nil
}
```

## Next
In the next part we will start working on creating database tables, setting models and begin writing api endpoint.