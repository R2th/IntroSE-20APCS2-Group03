### Giới thiệu
Năm 2006 Intel cho ra đời những con chíp dual-core processor đầu tiên. Một năm sau đó - năm 2007, để tận dụng sức mạnh tính toán của những con chíp đa lõi thế hệ mới này, google đã cho xây dựng một ngôn ngữ lập trình mới. Đến năm 2009 thì công bố  một ngôn ngữ có tên là - Golang...bla..bla <br/>

![](https://images.viblo.asia/fe5e7c88-7365-4724-99b8-fe61bf7d2b1b.gif)

Nghe nguy hiểm quá, mình muốn học Golang chẳng qua vì tò mò, hơn nữa cứ nhìn những ngôn ngữ thuộc vào hàng con ông cháu cha như Swift hay Kotlin mà xem... Người ta đua nhau học rần rần và ngày càng khẳng định được chỗ đứng vững chắc, nên mình cũng muốn tìm hiểu cho biết. <br/>
Vì vậy, nay mình hướng dẫn tạo một web api hết sức cơ bản với một số thao tác thêm, sửa, xóa. Để những ai có ý định tiếp cập với Go có thể có được một cái nhìn thoáng qua...<br/>
À, nhân tiện mình học khóa học [này](https://www.udemy.com/go-programming-language/) trên `Udemy`, thấy cũng hay phết nè. Bạn nào ưa có thể mua về xem thử.

### Chuẩn bị
+ Framework: Dạo qua một vòng thấy nhan nhản các thể loại framework. Nhưng xem ra `Gin-Gonic` là được biết đến nhiều nhất, và số lượng star trội nhất và nhìn có cái gì đó giản tiện giống `Express` của `Nodejs`. Nên mình quyết định dùng thử nó. Bởi đằng nào thì các Framework của Go cũng bắt đầu từ `net/http` package cả, nên chắc chúng cũng hao hao nhau thôi. Bạn có thể xem qua `Gin-Gonic` [tại đây](https://github.com/gin-gonic/gin)

+ Ngoài ra, mình cũng dùng một package để làm việc với Mysql tên là `go-sql-driver`. Bạn cũng có thể ngía qua một chút [tại đây](https://github.com/go-sql-driver/mysql/)

+ Tạo cấu trúc thư mục. Mình cũng chả biết thế này có chuẩn không nữa, sau một hồi dạo lòng vòng, tham khảo qua một số project nhỏ trên github. Cóp nhặt một thứ một tí mình tạm tổ chức project thế này. Nói chung, kiểu tổ chức này gần như do mình tự nghĩ ra, nên chỉ mang tính chất tham khảo thôi nhé ^^

![](https://images.viblo.asia/ae4f0886-00f3-44e4-a58e-71a79d8453d9.png)

Và mình sẽ thực hiện các thao tác thêm sửa xóa trên bảng `post` như hình dưới đây, rất đơn giản:

![](https://images.viblo.asia/683a1100-59c5-4830-a6e0-da788363ae94.png)

Với 4 route CURD tương ứng

![](https://images.viblo.asia/93641cc6-1735-479d-9dec-4a3b586132bf.png)
### main.go
Dưới đây là file `main.go` của mình. Ở đây mình tạo các `route` thêm, sửa, xóa tương ứng:
```go
package main

import (
	"github.com/gin-gonic/gin"
	"./controllers"
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.Static("/public", "./public")

	client := r.Group("/api")
	{
		client.GET("/story/:id", controllers.Read)
		client.POST("/story/create", controllers.Create)
		client.PATCH("/story/update/:id", controllers.Update)
		client.DELETE("/story/:id", controllers.Delete)
	}
	
	return r
}

func main() {
	r := setupRouter()
	r.Run(":8080") // Ứng dụng chạy tại cổng 8080
}

```
### Kết nối tới mysql
Mình tách việc kết nối database ra file `connect.go` trong folder `database` ở hình trên. `connect.go` có nội dung như sau :
```go
package database 

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func DBConn() (db *sql.DB) {
    dbDriver := "mysql"
    dbUser := "root"
    dbPass := "789852"
    dbName := "viblo-example"
    db, err := sql.Open(dbDriver, dbUser+":"+dbPass+"@/"+dbName)
    if err != nil {
        panic(err.Error())
    }
    return db
}
```
### Read 

Okie, bây giờ ta bắt tay vào tạo thử api đầu tiên nào, lấy ra bài viết có `id = 2` và trả về dưới dạng json. Trong file `/controllers/client.go` tạo hàm `Read` tương ứng như đã định nghĩa ở `main.go`:
```go
package controllers

import(
	"github.com/gin-gonic/gin"
	"../database"
)

type Post struct {
	Id int `json:"id"`
	Title string `json:"title"`
	Content string `json:"body"`
}

func Read(c * gin.Context){

	db := database.DBConn()
	rows, err := db.Query("SELECT id, title, body FROM posts WHERE id = " + c.Param("id"))
	if err != nil{
		c.JSON(500, gin.H{
			"messages" : "Story not found",
		});
	}

	post := Post{}

	for rows.Next(){
		var id int
		var title, body string

		err = rows.Scan(&id, &title, &body)
		if err != nil {
			panic(err.Error())
		}

		post.Id = id
		post.Title = title
		post.Content = body
	}

	c.JSON(200, post)
	defer db.Close() // Hoãn lại việc close database connect cho đến khi hàm Read() thực hiệc xong
}

```
Buid và chạy lại bằng lệnh `go run main.go`. Và test thử bằng `Postman` ta được như sau:

![](https://images.viblo.asia/a66dddff-ce05-4eea-88a7-a4d93f45bf45.png)

### Create
Vẫn trong file conttrollers trên, ta tạo function Create như dưới đây để thực hiện thêm mới một bài viết:
```go
func Create(c * gin.Context){
	db := database.DBConn()

	type CreatePost struct {
		Title string `form:"title" json:"title" binding:"required"`
		Body string `form:"body" json:"body" binding:"required"`
	}

	var json CreatePost

	if err := c.ShouldBindJSON(&json); err == nil {
		insPost, err := db.Prepare("INSERT INTO posts(title, body) VALUES(?,?)",)
		if err != nil {
			c.JSON(500, gin.H{
				"messages" : err,
			})
		}

		insPost.Exec(json.Title, json.Body) 
		c.JSON(200, gin.H{
			"messages": "inserted",
		})

	} else {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer db.Close()
}
```
Ta test thử bằng post man và thu được kết quả như hình:

![](https://images.viblo.asia/7b2dd8c5-a17f-46d2-ae36-0ecab751874e.png)
### Update

```go
func Update(c * gin.Context){
	db := database.DBConn()
	type UpdatePost struct {
		Title string `form:"title" json:"title" binding:"required"`
		Body string `form:"body" json:"body" binding:"required"`
	}

	var json UpdatePost
	if err := c.ShouldBindJSON(&json); err == nil {
		edit, err := db.Prepare("UPDATE posts SET title=?, body=? WHERE id= " + c.Param("id"))
        if err != nil {
            panic(err.Error())
        }
		edit.Exec(json.Title, json.Body)
		
		c.JSON(200, gin.H{
			"messages": "edited",
		})
	}else{
		c.JSON(500, gin.H{"error": err.Error()})
	}
    defer db.Close()
}
```
Ta test lại với `Postman` nào 
![](https://images.viblo.asia/c391fe07-d0fd-485e-be43-084e83c4d10b.png)
### Delete
```go
func Delete(c * gin.Context){
	db := database.DBConn()

    delete, err := db.Prepare("DELETE FROM posts WHERE id=?")
    if err != nil {
        panic(err.Error())
	}
	
	delete.Exec(c.Param("id"))
	c.JSON(200, gin.H{
		"messages": "deleted",
	})

    defer db.Close()
}
```
Và kết quả:
![](https://images.viblo.asia/6d341681-91a2-43c2-8f33-f187f95179c5.png)

### Kết luận
Vậy là mình đã hoàn thành 4 api CURD cơ bản với Golang và Gin-Gonic
![](https://images.viblo.asia/93641cc6-1735-479d-9dec-4a3b586132bf.png)
Hy vọng bài viết hữu cho những bạn mới tiếp cận với Golang như mình. Nhìn chung, mình thấy khá hứng thú khi đến với Golang. Và không hề hối hận với thời gian mình bỏ ra, vì nó rất nhanh và dễ tiếp cận. Cám ơn bạn vì đã giành thời gian xem bài viết của mình nhé ^^