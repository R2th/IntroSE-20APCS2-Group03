# 1.	Giới thiệu
-	Golang là ngôn ngữ được phát triển bới Google vào năm 2007, với tốc độ phát triển chóng mặt vào những năm gần đây kèm theo đó là những framework cho ứng dụng web như : Gin, Iris, Begoo, Revel, … Nhưng ở bài viết này mình chọn Echo.
-	Echo là một framework nhỏ gọn, tuy nó không thể xây dựng những trang web truyền thống, nhưng nó được xây dựng chủ yếu dành cho các API cùng với đó là nhiều thế mạnh riêng với slogan “High performance, minimalist Go web framework”
# 2.	Cài đặt
-	Đầu tiên chúng ta cần có một bảng student trong cơ sở dữ liệu
```sql
DROP TABLE IF EXISTS `student`;
CREATE TABLE ` student ` (
  `id` int unsigned,
  `fullname` varchar(45),
  `age` int ,
  `location` varchar(45), 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

-	Tiếp theo chúng ta cần có gói “github.com/labstack/echo” để định nghĩa router. Để tải gói này chúng ta có thể 
```go
import (
   "github.com/labstack/echo"
)
```
-	Rồi sau đó nhờ IDE goland gợi ý tải về cho :v
# 3.	Xây dựng Service
-	Đầu tiên chúng ta sẽ tạo một file .go trong package service, package này được tạo ra ở trong folder ../go/src. Để hiểu rõ hơn tại sao cần phải tạo file như vậy, bạn nên tìm hiểu về cách thức quản lý package của Golang
 
-	Chúng ta phải định nghĩa struct student dùng để mapping với mỗi record trong cơ sở dữ liệu
```go
type student struct {
   ID int `json:"id"`
   Fullname string `json:"fullname"`
   Age int `json:"age"`
   Location string `json:"location"`
}
```
-	Các metadata `json:..` ở đằng sau dùng để binding dữ liệu dưới dạng json, Golang hỗ trợ rất nhiều kiểu binding dữ liệu như : XML, query,…
-	Tiếp theo chúng ta có một biến db dùng để connect tới bảng mysql 
```go
var (
   db, _ = sql.Open("mysql","root:jerrytran97@tcp(127.0.0.1:3306)/goblog"
)
```
-	Cú pháp khá đơn giản nên mình không giải thích thì thêm
-	Xây dựng các func CRUD :
```go
// tạo mới một student
func CreateStudent(c echo.Context) error {
   s := &student{}
   if err := c.Bind(s); err != nil {
      return err
   }
   insertDB, err := db.Prepare("INSERT INTO student(id, fullname, age, location) values (?,?,?,?)")
   if err != nil {
      panic(err.Error())
   }
   insertDB.Exec(s.ID, s.Fullname, s.Age, s.Location)
   return c.JSON(http.StatusCreated, s)
}

// lấy student dựa vào param id
func GetStudent(c echo.Context) error {
   id, _ := strconv.Atoi(c.Param("id"))
   getDB, err := db.Query("SELECT * FROM student WHERE id=?", id)
   if err!=nil {
      panic(err.Error())
   }
   var s student
   _ = getDB.Scan(&s.ID, &s.Fullname, &s.Age, &s.Location)
   return c.JSON(http.StatusOK, s)
}

// update student
func UpdateStudent(c echo.Context) error {
   s := new(student)
   if err := c.Bind(s); err != nil {
      return err
   }
   id, _ := strconv.Atoi(c.Param("id"))
   updateDB, err := db.Prepare("UPDATE student SET fullname=?, age=?, location=? WHERE id=?")
   if err != nil {
      panic(err.Error())
   }
   updateDB.Exec(s.Fullname, s.Age, s.Location, id)
   return c.JSON(http.StatusOK, s)
}

// xóa một student dựa vào id
func DeleteStudent(c echo.Context) error {
   id, _ := strconv.Atoi(c.Param("id"))
   deleteDB, err := db.Prepare("DELETE FROM student WHERE id=?")
   if err != nil {
      panic(err)
   }
   deleteDB.Exec(id)
   return c.NoContent(http.StatusNoContent)
}

// lấy ra tất cả student
func GetStudents(c echo.Context)  error{
   var sliceUsers []student
   result, _ := db.Query("SELECT * FROM student")
   for result.Next() {
      var s student
      _ = result.Scan(&s.ID, &s.Fullname, &s.Age, &s.Location)
      sliceUsers = append(sliceUsers, s)
   }
   return c.JSON(http.StatusOK, sliceUsers)
}

```



# 4.	Xây dựng Server và định nghĩa Router
-	Tạo file server ở trong package main của src : 
```go
package main

import (
   "github.com/labstack/echo"
   "service"
)

func main() {
   server := echo.New()
   server.POST("/student", service.CreateStudent)
   server.GET("/student/:id", service.GetStudent)
   server.GET("/students", service.GetStudents)
   server.PUT("/student/:id", service.UpdateStudent)
   server.DELETE("/student/:id", service.DeleteStudent)
   server.Logger.Fatal(server.Start(":1323"))
}
```
-	Đến đây chúng ta cơ bản đã hoàn thành một resful API với các chức năng đơn giản thao tác trên MySQL
# 5.	Test
-	Để test chương trình, ở đây mình sẽ dùng Insomnia
-	Đầu tiên sẽ thử với việc tạo một student
>  ![](https://images.viblo.asia/85154845-9893-4593-b6f5-1e6e1e54b471.png)
-	Kiểm tra cơ sở dữ liệu : 
>  ![](https://images.viblo.asia/253fba83-a00e-4619-a8a6-759cf7367df6.png)

-	Như các bạn thấy, việc cấu hình và tạo ra một Resful API khá đơn giản với echo. Các method còn lại mong các bạn test giùm mình :v 
-	Bài viết khá sơ sài vì kiến thức mình tìm hiểu được chưa lâu, mong các bạn thông cảm và góp ý để những bài viết tiếp theo được hoàn thiện hơn.

 Nguồn tham khảo : 
- https://viblo.asia/p/tao-web-api-crud-don-gian-voi-golang-va-echo-framework-Do754kYJlM6
- https://zetcode.com/golang/mysql/