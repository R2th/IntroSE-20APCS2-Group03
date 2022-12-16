Bài viết này sẽ nói về ORM (Object Relational Mapping) in Golang. Golang hỗ trợ package ` gorm ` . Để run `gorm` với `MySQL` ta add các package sau vào vào project:
```
gorm.io/gorm
gorm.io/driver/mysql
github.com/gorilla/mux
```
Bắt đầu với việc setup database

**database/db.go**
```
package database

import (
   "fmt"
   "gorm.io/driver/mysql"
   "gorm.io/gorm"
)

const DB_USERNAME = "root"
const DB_PASSWORD = "root"
const DB_NAME = "my_db"
const DB_HOST = "localhost"
const DB_PORT = "3306"

var Db *gorm.DB
func InitDb() *gorm.DB {
   Db = connectDB()
   return Db
}

func connectDB() (*gorm.DB) {
   var err error
   dsn := DB_USERNAME +":"+ DB_PASSWORD +"@tcp"+ "(" + DB_HOST + ":" + DB_PORT +")/" + DB_NAME + "?" + "parseTime=true&loc=Local"
   
   db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

   if err != nil {
      fmt.Println("Error connecting to database : error=%v", err)
      return nil
   }
   
   db.AutoMigrate(&models.User{})

   return db
}
```

>  **parseTime=true** sẽ scan tự động **DATE
DATETIME** và **DATE
DATETIME** sang **time**.**Time
loc=Local** đặt múi giờ hệ thống, bạn có thể đặt múi giờ bắt buộc thay vì Local.

Tiếp theo chúng ta sẽ thực thi các tương tác của **gorm** với các **Table**. Dưới đây là **CRUD** của bảng **users**

**models/users.go**
```
package models

import (
   "gorm.io/gorm"
)

type User struct {
    ID        uint32    `gorm:"primary_key;auto_increment" json:"id"`
	Nickname  string    `gorm:"size:255;not null;unique" json:"nickname"`
	Email     string    `gorm:"size:100;not null;unique" json:"email"`
	Password  string    `gorm:"size:100;not null;" json:"password"`
	CreatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt time.Time `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

//create a user
func CreateUser(db *gorm.DB, User *User) (err error) {
   err = db.Create(User).Error
   if err != nil {
      return err
   }
   return nil
}

//get users
func GetUsers(db *gorm.DB, User *[]User) (err error) {
   err = db.Find(User).Error
   if err != nil {
      return err
   }
   return nil
}

//get user by id
func GetUser(db *gorm.DB, User *User, id string) (err error) {
   err = db.Where("id = ?", id).First(User).Error
   if err != nil {
      return err
   }
   return nil
}

//update user
func UpdateUser(db *gorm.DB, User *User) (err error) {
   db.Save(User)
   return nil
}

//delete user
func DeleteUser(db *gorm.DB, User *User, id string) (err error) {
   db.Where("id = ?", id).Delete(User)
   return nil
}
```

**CreatedAt** — sử dụng để lưu trữ records created time

**UpdatedAt** — sử dụng để lưu trữ records updated time

**DeletedAt** —sử dụng để lưu trữ deleted time.Nó sẽ không xoá records mà set value cuủa trường DeletedAt’s là the current time và bạn sẽ không thể tìm thấy record khi truy vấn (xoá mềm)

Một trong những lợi thế lớn nhất của ORM là chúng ta không cần phải viết các câu truy vấn. Bạn có tìm hiểu sâu hơn về các quan hệ và cách ta truy vấn đế database [tại đây  ](https://gorm.io/docs/index.html)

Chúng ta sẽ tạo 1 package responses để xứ lý JSON và ERROR

**responses/json**
```
package responses

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func JSON(w http.ResponseWriter, statusCode int, data interface{}) {
	w.WriteHeader(statusCode)
	err := json.NewEncoder(w).Encode(data)
	if err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func ERROR(w http.ResponseWriter, statusCode int, err error) {
	if err != nil {
		JSON(w, statusCode, struct {
			Error string `json:"error"`
		}{
			err.Error(),
		})
		return
	}
	JSON(w, http.StatusBadRequest, nil)
}

```

Tiếp đến chúng ta tạo 1 controller để làm việc đến model

**controllers/user.go**
```
package controllers

import (
    "encoding/json"
    "io/ioutil"
    "strconv"
    "errors"
    "gorm-test/database"
    "gorm-test/models"
    "gorm.io/gorm"
    "net/http"
    "github.com/gorilla/mux"
)

type Server struct {
   Db *gorm.DB
   Router *mux.Router
}

func Init() *Server {
    var server = Server{}
   server.Db = database.InitDb()
   server.Db.AutoMigrate(&models.User{})
   server.Router = mux.NewRouter()
   server.initializeRoutes()
   server.Run("8080")
   return 
}

//create user
func (server *Server) CreateUser(c *gin.Context) {
   var user models.User
   body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
    
   err = json.Unmarshal(body, &user)
   if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
    
   err := models.CreateUser(server.Db, &user)
   if err != nil {
            responses.ERROR(w, http.StatusInternalServerError, err)
      return
   }
   
   responses.JSON(w, http.StatusCreated, user)
}

//get users
func (server *Server) GetUsers(w http.ResponseWriter, r *http.Request) {
    var user []models.User
    err := models.GetUsers(server.Db, &user)
    
    responses.JSON(w, http.StatusOK, users)
}

//get user by id
func (server *Server) GetUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
	uid, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
    var user models.User
    err := models.GetUser(server.Db, &user, uid)
    if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
    
    responses.JSON(w, http.StatusOK, user)
}

// update user
func (server *Server) UpdateUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
	uid, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
    var user models.User
     
    err = json.Unmarshal(body, &user)
	if err != nil {
		responses.ERROR(w, http.StatusUnprocessableEntity, err)
		return
	}
    
    err := models.GetUser(server.Db, &user, uid)
    if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
    user.id = uid
    err = models.UpdateUser(repository.Db, &user)
    if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
    
    responses.JSON(w, http.StatusOK, user)
}

// delete user
func (server *Server) DeleteUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
	uid, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		responses.ERROR(w, http.StatusBadRequest, err)
		return
	}
    err := models.DeleteUser(repository.Db, &user, id)
    if err != nil {
		responses.ERROR(w, http.StatusInternalServerError, err)
		return
	}
    data := struct {
		Message string `json:"message"`
	}{
		"User deleted successfully",
	}
    responses.JSON(w, http.StatusOK, data)
}


func (server *Server) initializeRoutes() {
    
	server.Router.HandleFunc("/users",server.CreateUser).Methods("POST")
	server.Router.HandleFunc("/users",server.GetUsers).Methods("GET")
	server.Router.HandleFunc("/users/{id}",server.GetUser).Methods("GET")
	server.Router.HandleFunc("/users/{id}",server.UpdateUser).Methods("PUT")
	server.Router.HandleFunc("/users/{id}",server.DeleteUser).Methods("DELETE")
}

func (server *Server) Run(addr string) {
	fmt.Println("Listening to port " + addr)
	log.Fatal(http.ListenAndServe(addr, server.Router))
}
```

> **db.AutoMigrate ()** tự động di chuyển schema để giữ schema được cập nhật.
> 
> Hãy nhớ rằng **AutoMigrate ()** sẽ chỉ tạo bảng, sửa các cột bị thiếu và chỉ mục bị thiếu và sẽ không thao tác dữ liệu hoặc loại cột hiện có.

Cuối cùng ta có file **main.go** trông sẽ như thế này

```
package main

import (
   "gorm-test/controllers"
)

func main() {
   controller.Init()
}

```