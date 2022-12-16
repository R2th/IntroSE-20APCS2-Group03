## 1. Giới Thiệu 
Bài viết này mình xin giới thiệu với các bạn cách tạo 1 ứng dụng CRUD đơn giản sử dụng Echo để viết API. Mục tiêu của bài viết chỉ để giới thiệu cho những người mới làm quen với Go và Echo về cách hoạt động cũng như sự đơn giản của ngôn ngữ và framework này. 
## 2. Cài đặt
Điều kiện tiên quyết ở đây là máy các bạn đã được cài đặt Go (Ở đây mình đang sử dụng Go 1.12.1) và biến môi trường $GOPATH.
Ta cần tạo Go project trong GOPATH:
```
$ cd $GOPATH/src
$ mkdir echo-example-crud
```
Bây giờ chúng ta sẽ cài đặt Echo framework:
- Sử dụng go get:
```
$ go get -u github.com/labstack/echo/...
```
- Đối với go dep:
```
$ cd <PROJECT IN $GOPATH>
$ dep ensure -add github.com/labstack/echo@^3.1
```
## 3. Xây dựng service
Đầu tiên, trong service>user_service.go ta cần định nghĩa struct **user** và các phương thức CRUD của nó.
- Struct **user**
```
package service

import (
	"github.com/labstack/echo"
	"net/http"
	"strconv"
)

type (
	user struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	}
)
```
- Xây dựng các function CRUD
```
var (
	users = map[int]*user{}
	seq   = 1
)

//----------
// Handlers
//---------

func CreateUser(c echo.Context) error {
	u := &user{
		ID: seq,
	}
	if err := c.Bind(u); err != nil {
		return err
	}
	users[u.ID] = u
	seq++
	return c.JSON(http.StatusCreated, u)
}

func GetUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	return c.JSON(http.StatusOK, users[id])
}

func UpdateUser(c echo.Context) error {
	u := new(user)
	if err := c.Bind(u); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Param("id"))
	users[id].Name = u.Name
	return c.JSON(http.StatusOK, users[id])
}

func DeleteUser(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	delete(users, id)
	return c.NoContent(http.StatusNoContent)
}
```
## 4. Khởi tạo server  và định nghĩa router
Tạo file server>server.go:
```
package main

import (
	"github.com/labstack/echo"
	service "echo-example-crud"
)

func main() {
	e := echo.New()
    
	// Routes
	e.POST("/users", service.CreateUser)
	e.GET("/users/:id", service.GetUser)
	e.PUT("/users/:id", service.UpdateUser)
	e.DELETE("/users/:id", service.DeleteUser)

	// Start server at localhost:1323
	e.Logger.Fatal(e.Start(":1323"))
}
```
Các bạn có nhận thấy rằng trông server vô cùng đơn giản phải không, đây cũng chính là một trong những ưu điểm của Go mà đa số lập trình viên đều hứng thú, đó là nhanh, đơn giản và hiệu quả :grinning:<br/>
Việc cuối cùng là deploy server này lên localhost:
```
$ go run server/server.go
```
## 5. Test service
Chúng ta sẽ lần lượt test từng service đã viết trước đó sử dụng **curl**.<br/>
Create User
```
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"Joe Smith"}' \
  localhost:1323/users
```
- *Response*
```
{
  "id": 1,
  "name": "Joe Smith"
}
```
Get User
```
curl localhost:1323/users/1
```
- *Response*
```
{
  "id": 1,
  "name": "Joe Smith"
}
```
Update User
```
curl -X PUT \
  -H 'Content-Type: application/json' \
  -d '{"name":"Joe"}' \
  localhost:1323/users/1
```
- *Response*
```
{
  "id": 1,
  "name": "Joe"
}
```
Delete User
```
curl -X DELETE localhost:1323/users/1
```
- *Response* <br/>
```
NoContent - 204
```