![image.png](https://images.viblo.asia/85ae6f00-88d3-44d4-acc5-94ae8b6146e6.png)

Trong bài viết này mình sẽ từng bước hướng dẫn các bạn lập trình REST API với ngôn ngữ [Go](https://200lab.io/blog/tim-hieu-ngon-ngu-lap-trinh-golang/) (Golang) và MySQL.

## 1. Phân tích giao diện và thiết lập User Story cơ bản

Để ví dụ thêm phần trực quan, mình sẽ sử dụng một UI rất đơn giản về TODO List:

![Giao diện TODO List cơ bản](https://200lab-blog.imgix.net/2022/05/golang-rest-api-todo-list-1.png)

Giao diện TODO List cơ bản

Nếu dùng trong một câu đơn giản thì giao diện trên chỉ bao gồm "danh sách, thêm, xoá, sửa, tạo mới TODO Item". Tuy nhiên mình sẽ đề xuất các bạn nên viết cụ thể thành từng dòng như sau:

1.  Service không yêu cầu đăng nhập hay phân biệt người dùng với nhau.
2.  Người dùng có thể tạo mới một TODO Item.
3.  Người dùng có thể edit tiêu đề bất kỳ một TODO Item.
4.  Người dùng có thể xoá bất kỳ một TODO Item.
5.  Người dùng có thể edit TODO Item giữa Doing và Finished.
6.  Người dùng có thể xem được toàn bộ các TODO Item (thường sẽ có phân trang).

Theo mình, việc thiết lập User Story càng chi tiết thì sẽ càng có lợi, tránh được rủi ro lớn nhất là bị sót tính năng. Hãy nhớ in đậm các danh từ và động từ trong danh sách trên nhé!

> Lưu ý rằng hầu hết các backend developer trong các công ty sẽ không cần phải làm công việc này. Nhưng vì đây là một tutorial đầy đủ để các bạn hiểu rõ từ phân tích đến triển khai nên mình đã bổ sung vào.

## 2. Thiết kế cơ sở dữ liệu từ User Story

Trong thực tế đây là một quá trình yêu cầu nhiều kỹ năng và kinh nghiệm lẫn tư duy nghiệp vụ. Nhưng với ví dụ trong bài này thì nó đơn giản thôi.

Trong toàn bộ User Story trên chúng ta chỉ có 3 danh từ: "Service", "Người dùng" và "TODO Item". Trong ví dụ này, chúng ta không yêu cầu đăng nhập, vì thế "Người dùng" có thể bỏ qua. Tương tự với "Service", chúng ta cũng không cần quan tâm đến nó trong ví dụ này.

Đối với TODO Item (gọi là Item cho tiện) ta chỉ cần chứa tiêu đề và trạng thái doing/finished. Từ đó nếu các bạn dùng database là SQL thì chỉ cần một table "todo_items" bao gồm các column sau:

1.  Id (Primary Key, Auto Increment): định danh (Identifier) cho từng Item, vì là PK nên sẽ không trùng lặp, không thể NULL. Ngoài ra để đơn giản thì chúng ta set Auto Increment để DB tự tăng và gán ID mới cho tiện.
2.  Title: tiêu đề cho Item. Cột này chắc chắn sẽ chứa giá trị text. Cụ thể trong MySQL thì nó là varchar.
3.  Status: trạng thái của  Item. Vì chỉ có 2 giá trị các bạn có thể dùng 0 và 1. Tuy nhiên mình vẫn thích dùng kiểu Enum để rõ ràng và dễ mở rộng về sau hơn.
4.  Created At: Thời gian Item được tạo trên hệ thống. Cột này chỉ là một tuỳ chọn thêm. Theo mình mỗi table nên có cột này để tiện quản lý về sau.
5.  Updated At: Thời gian Item được update lần cuối trên hệ thống. Cột này cũng để quản lý thêm mà thôi.

> Bản thân mình đang sử dụng convention với MySQL: tên table là danh từ số nhiều, tên column mình đặt như tên biến trong lập trình, phân cách bằng dấu "_" (snake case).

Và đây là code tạo table trong MySQL:

```
CREATE TABLE `todo_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) CHARACTER SET utf8 NOT NULL,
  `status` enum('Doing','Finished') DEFAULT 'Doing',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

> Kinh nghiệm cá nhân của mình với MySQL là mỗi table nên có created_at và updated_at, thậm chí có thể có deleted_at nếu cần. Kiểu dữ liệu là Timestamp hoặc DateTime.

## 3. Thiết kế các REST API cho TODO List service

Đây là một bước mình thấy rất rất nhiều bạn thường hay bỏ qua dù nó rất quan trọng. Nếu bạn vẫn chưa rõ REST API nên được thiết kế như thế nào thì có thể xem lại bài này:

https://200lab.io/blog/rest-api-la-gi-cach-thiet-ke-rest-api/

Như vậy từ User Story ở bước 1 và các quy ước thiết kế REST API mình đã giới thiệu, ta sẽ thiết kế các CRUD (Creat-Read-Update-Delete) API được như sau:

1.  POST /v1/items tạo mới một Item với dữ liệu chỉ cần có title là đủ. Thuộc tính trạng thái chúng ta nên để mặc định là "Doing". API này sẽ trả về ID của Item sau khi tạo thành công. Ràng buộc đơn giản là "title không rỗng hoặc toàn khoảng trắng" là được.
2.  GET /v1/items/:id lấy toàn bộ thông tin chi tiết của một Item thông qua ID của nó. Theo giao diện demo thì chúng ta không cần API này, tuy nhiên mình để vào cho đủ bộ CRUD nha.
3.  GET /v1/items lấy danh sách các Items. Nếu có phân trang thì có thể dùng thêm query string ?page=2&limit=10. Tức là giới hạn mỗi trang 10 items tối đa. Mặc định page là 1 và limit là 10.
4.  PUT /v1/items/:id update tiêu đề hoặc trạng thái của một Item thông qua ID của nó. Vì API này chúng ta có thể truyền lên cả 2 thông tin hoặc chỉ một trong 2 nên các bạn có thể dùng method PATCH sẽ chuẩn chỉ hơn. Vì PUT thông dụng hơn cho các API update nên mình chọn trong ví dụ này.
5.  DELETE /v1/items/:id xoá một Item thông qua ID của nó. Trong ví dụ này mình sẽ xoá luôn trong table (hard delete). Trong thực tế, hầu hết các trường hợp là không nên xoá mà chỉ đánh dấu trạng thái deleted mà thôi.

Các API trên sẽ trả về dữ liệu với định dạng JSON.

## 4. Xây dựng REST API service với Golang

Chúng ta đã hoàn tất phần chuẩn bị, tiếp theo sẽ là phần coding service Golang.

Để phát triển các service REST API một cách nhanh chóng và tiện lợi, mình đề xuất sử dụng các thư viện sau:

1.  [GIN](https://github.com/gin-gonic/gin) là một web framework cho Golang. Gin có thể giúp chúng ta xây dựng nhanh các web/api service Golang với cú pháp rất gọn (giống với Express bên NodeJS). Một sự lựa chọn khác cũng khá thú vị là [Echo](https://echo.labstack.com/).
2.  [GORM](https://gorm.io/) là một thư viện ORM (Object-relational Mapping) dành cho Golang. Thư viện này giúp các developer Golang đỡ phải thực hiện các câu lệnh SQL thuần tuý. Đương nhiên sự tiện lợi sẽ đánh đổi bằng hiệu năng. Nếu các bạn yêu thích SQL và muốn service mình chạy nhanh hơn nữa thì cân nhắc dùng [sqlx](https://github.com/jmoiron/sqlx).

Trong bài viết này mình sẽ dùng GIN và GORM.

### 4.1 Import các thư viện GIN và GORM

Các bạn sử dụng Terminal của chính Visual Studio Code đang mở project hiện tại. Mở tab Terminal và nhập vào lần lượt các câu lệnh sau:

```
go get -u github.com/gin-gonic/gin
go get -u gorm.io/gorm
go get -u gorm.io/driver/mysql
```

### 4.2 Thực hiện kết nối MySQL bằng Golang với thư viện GORM

Ở bước này mình giả định các bạn đã có MySQL đang chạy trên máy tính ở port 3306. Nếu các bạn chưa có MySQL thì có thể dùng Docker để chạy một container MySQL với lệnh sau:

```
docker run -d --name demo-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-root-pass -e MYSQL_DATABASE=todo_db mysql:8.0
```

Nếu đây là lần đầu bạn nghe tới Docker thì hãy tham khảo bài viết này nhé:

https://200lab.io/blog/docker-la-gi-khi-nao-nen-dung-docker/

OK! Sau khi MySQL đã sẵn sàng thì chúng ta thay đổi code ở file main.go như sau:

```
package main

import (
	"log"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	dsn := "root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("Cannot connect to MySQL:", err)
	}

	log.Println("Connected:", db)
}
```

Khi run đoạn code trên nếu không có vấn đề gì thì chắc chắn sẽ có dòng "*Connected: <...>*". Nếu có lỗi "*Cannot connect to MySQL*", khả năng là các bạn cần xem lại service MySQL cũng như password và tên DB đã đúng hay chưa.

> Lưu ý: "root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local" là connection string của GORM. Các bạn có thể tham khảo thêm tại [đây](https://gorm.io/docs/connecting_to_the_database.html).

Nếu bạn chưa biết cách thiết lập môi trường để build và run code Golang thì tham khảo lại bài này nhé:

https://200lab.io/blog/huong-dan-setup-moi-truong-lap-trinh-golang/

### 4.3 Viết các hàm xử lý các REST API với thư viện GIN Golang

Tổng service TODO List này chúng ta sẽ có 5 API, mỗi API sẽ là một hàm xử lý (handler method) riêng biệt. Vì là code demo nên để thuận tiện mình sẽ để hết vào trong một file main.go:

```
package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type ToDoItem struct {
	Id        int        `json:"id" gorm:"column:id;"`
	Title     string     `json:"title" gorm:"column:title;"`
	Status    string     `json:"status" gorm:"column:status;"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at;"`
	UpdatedAt *time.Time `json:"updated_at" gorm:"column:updated_at;"`
}

func (ToDoItem) TableName() string { return "todo_items" }

func main() {
	dsn := "root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("Cannot connect to MySQL:", err)
	}

	log.Println("Connected to MySQL:", db)

	router := gin.Default()

	v1 := router.Group("/v1")
	{
		v1.POST("/items", createItem(db))           // create item
		v1.GET("/items", getListOfItems(db))        // list items
		v1.GET("/items/:id", readItemById(db))      // get an item by ID
		v1.PUT("/items/:id", editItemById(db))      // edit an item by ID
		v1.DELETE("/items/:id", deleteItemById(db)) // delete an item by ID
	}

	router.Run()
}

func createItem(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var dataItem ToDoItem

		if err := c.ShouldBind(&dataItem); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// preprocess title - trim all spaces
		dataItem.Title = strings.TrimSpace(dataItem.Title)

		if dataItem.Title == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "title cannot be blank"})
			return
		}

		// do not allow "finished" status when creating a new task
		dataItem.Status = "Doing" // set to default

		if err := db.Create(&dataItem).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": dataItem.Id})
	}
}

func readItemById(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var dataItem ToDoItem

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Where("id = ?", id).First(&dataItem).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": dataItem})
	}
}

func getListOfItems(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		type DataPaging struct {
			Page  int   `json:"page" form:"page"`
			Limit int   `json:"limit" form:"limit"`
			Total int64 `json:"total" form:"-"`
		}

		var paging DataPaging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if paging.Page <= 0 {
			paging.Page = 1
		}

		if paging.Limit <= 0 {
			paging.Limit = 10
		}

		offset := (paging.Page - 1) * paging.Limit

		var result []ToDoItem

		if err := db.Table(ToDoItem{}.TableName()).
			Count(&paging.Total).
			Offset(offset).
			Order("id desc").
			Find(&result).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": result})
	}
}

func editItemById(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		var dataItem ToDoItem

		if err := c.ShouldBind(&dataItem); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Where("id = ?", id).Updates(&dataItem).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": true})
	}
}

func deleteItemById(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := db.Table(ToDoItem{}.TableName()).
			Where("id = ?", id).
			Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": true})
	}
}

```

### 4.5 Chạy thử service và sử dụng API với POSTMAN:

Chúng ta sẽ dùng Terminal chạy service trên với lệnh `go run main.go`. Nếu mọi thứ suông sẻ thì service sẽ bắt đầu vận hành ở port `8080`.

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.40.57.png)


Tiếp theo chúng ta dùng [POSTMAN](https://www.postman.com/) để test từng API nhé:

API tạo mới một Item:

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.19.39.png)

API trả về một Item thông qua ID:

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.19.53.png)

API trả về danh sách các Items đang có trong TODO List

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.29.42.png)

API edit tiêu đề của một Item thông qua ID, các bạn có thể sử dụng `"status": "Doing/Finished"` để thay đổi cột status của Item nhé.

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.42.00.png)

API xoá một item thông qua ID

![](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-18-at-17.42.24.png)

## Lời kết

Như vậy là chúng ta đã hoàn tất một REST API TODO List đơn giản với Golang. Đây là một ví dụ minh hoạ nên phần code mình tạm để hết tại file main.go, vì thế sẽ không phải là một best practice trong thực tế.

Mình sẽ còn một số bài viết tiếp theo để giúp các bạn phát triển tiếp service này nhé.

Nếu các bạn thực sự cảm thấy khó khăn trong việc tự học. Thậm chí đã làm được những service cơ bản nhưng vẫn chưa tự tin cho những phần nâng cao thì có thể tham khảo [khoá học Golang for Scalable Backend](https://200lab.io/khoa-hoc/khoa-hoc-golang-food-delivery-backend) của mình nha!!

Full sourcecode các bạn có thể tìm thấy trên Github: <https://github.com/200lab-Education/tutorial-golang-rest-api-todo-list>

Xem bài viết gốc tại: https://200lab.io/blog/lap-trinh-rest-api-todo-list-voi-golang/