![](https://images.viblo.asia/92fe3f9d-d166-4568-ab30-7e902d56940b.png)

Ở [bài trước](https://viblo.asia/p/basic-authentication-voi-golang-jvEla0AzZkw) chúng ta đã thiết lập chức năng đăng nhập, đăng ký cơ bản với Golang. Trong bài viết hôm nay, chúng ta sẽ hoàn thiện một webserver cơ bản với Golang bằng việc viết thêm các tính năng thêm, xóa, sửa, đọc (CRUD).

Để tiện theo dõi, chúng ta hãy cùng xem lại cấu trúc thư mục của ứng dụng.

![](https://images.viblo.asia/cf6d6ba0-2475-48aa-82e7-132843b3d02c.png)

Source code đầy đủ các bạn có thể tham khảo trên [Github](https://github.com/conglt10/web-golang)

## 1. Middlewares

Giống như khái niệm `middlewares` ở nhiều nền tảng khác, `middlewares` trong webserver golang là một hàm xử lý, đoạn code nằm giữa việc nhận `request` và trả `response` về cho client. Các công việc mà `middlewares` thường đảm nhận là xác thực người dùng, lọc request (tránh các request độc hại), validate dữ liệu, ....
 
Trong bài viết này, chúng ta sẽ chủ yếu sử dụng `middlewares` xác thực token gửi lên từ client, xác thực người dùng xem họ có được quyền thêm, xóa, sửa hay xem không ?


```go
// middlewares/check-jwt.go
package middlewares

import (
	"errors"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/conglt10/web-golang/auth"
	"github.com/conglt10/web-golang/utils"
)

func CheckJwt(next httprouter.Handle) httprouter.Handle {
	return func(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
		err := jwt.Verify(r)

		if err != nil {
			res.ERROR(w, 401, errors.New("Unauthorized"))
			return
		}

		next(w, r, ps)
	}
}
```

Đoạn code trên hơi phức tạp một chút, chúng ta sẽ dần dần tìm hiểu ngay sau đây.

### httprouter.Handle Method

Chúng ta còn nhớ ở các bài trước, [httprouter](https://godoc.org/github.com/julienschmidt/httprouter) có các phương thức để xử lý các HTTP Method mà client gửi đến server như `GET`, `POST`, ...

```go
// main.go
router := httprouter.New()
	
router.POST("/auth/login", routes.Login)
router.POST("/auth/register", routes.Register)
```

```go
// prototype của cách method
func (r *Router) GET(path string, handle Handle)
func (r *Router) POST(path string, handle Handle)
func (r *Router) PUT(path string, handle Handle)
func (r *Router) DELETE(path string, handle Handle)
func (r *Router) HEAD(path string, handle Handle)
func (r *Router) PATCH(path string, handle Handle)
```

Thật ra, các method trên là cách viết ngắn gọn và tiện lợi hơn của method `Handle`

```go
// Prototype
func (r *Router) Handle(method, path string, handle Handle)

// GET
router.Handle(http.MethodGet, path, handle)
// POST
router.Handle(http.MethodPost, path, handle)
// ...
```

###  Type Handle

Ở phần trên, tham số cuối cùng của các method đều là kiểu dữ liệu `Handle`

```go
// Prototype
type Handle func(http.ResponseWriter, *http.Request, Params)
```

Vậy các hàm có tham số đầu vào theo mẫu trên sẽ được coi là một hàm `Handle`. Bạn biết tại sao tham số `http.Request` lại ở dạng con trỏ không ? Lý do là data của request từ client gửi lên có thể đi được xử lý bởi một chuỗi các hàm `Handle` (chuỗi middlewares chẳng hạn). Do đó, dữ liệu cần được thay đổi trức tiệp qua con trỏ thay vì tạo một bản sao và thay đổi trên đó.

```go
func Login(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
// ...
}

func Register(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
 // ...
}
```

### Tổng kết lại

**Middlewares** `CheckJwt` ở trên sẽ có nhiệm vụ `Verify` token do client gửi lên, nếu token không hợp lệ thì sẽ trả về lỗi. Ngược lại, hàm xử lý tiếp theo (Handle) sẽ được gọi để xử lý request.

Khi muốn dùng middlewares cho routes, ta sẽ thực hiện như sau ví dụ sau:

```go
router.GET("/", middlewares.CheckJwt(routes.Hello))
```

## 2. models/Post.go

Chúng ta sẽ tạo mới models `Post`, mỗi người dùng trên hệ thống sau khi đăng nhập sẽ có quyền thêm, sửa, xóa các post của bản thân. Có quyền xem tất cả các `post` hoặc xem các `post` do mình tạo.

```go
package models


type Post struct {
	id string
	creater string
	title string
}
```

### Kết nối đến db

Tương tự với collection `users`, chúng ta viết hàm connect đến collection `posts`

```go
// database/connect.go
func ConnectPosts() *mongo.Collection {
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGODB_URI"))
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
    	log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
    	log.Fatal(err)
	}

	collection := client.Database("golang").Collection("posts")
	return collection
}
```

### Step routes với middlewares

```go
// main.go
package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/conglt10/web-golang/middlewares"
	"github.com/conglt10/web-golang/routes"
	"github.com/joho/godotenv"
	
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error getting env, %v", err)
	}
	
	router := httprouter.New()
	
	router.POST("/auth/login", routes.Login)
	router.POST("/auth/register", routes.Register)

	router.GET("/posts", middlewares.CheckJwt(routes.GetAllPosts))
	router.GET("/me/posts", middlewares.CheckJwt(routes.GetMyPosts))
	router.POST("/posts", middlewares.CheckJwt(routes.CreatePost))
	router.PUT("/posts/:id", middlewares.CheckJwt(routes.EditPost))
	router.DELETE("/posts/:id", middlewares.CheckJwt(routes.DeletePost))

	fmt.Println("Listening to port 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
```

## 3. Xử lý jsonwebtoken từ client gửi lên

### Trích xuất thông tin ra từ jwt

```go
// auth/jwt.go
func Extract(r *http.Request) string {
	bearerToken := r.Header.Get("Authorization")
	return strings.Split(bearerToken, " ")[1]
}

func ExtractUsernameFromToken(r *http.Request) (string, error) {
	var username string
	tokenString := Extract(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_JWT")), nil
	})

	if err != nil {
		return username, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username = fmt.Sprintf("%v", claims["username"])
	}

	return username, nil
}
```

- Hàm `Extract` có nhiệm vụ lấy giá trị token trong `header request` , loại bỏ phần dư thừa trong header (Chuỗi "Bearer")
- Hàm `ExtractUsernameFromToken` có nhiệm vụ trích xuất ra username từ giá trị của token nhằm mục đích để phân quyền sau này cho các `route` thêm, xóa post.

### Verify jwt

```go
// auth/jwt.go
func Verify(r *http.Request) error {
	tokenString := Extract(r)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET_JWT")), nil
	})

	if err != nil {
		return err
	}
	return nil
}
```

Token sau khi được client gửi lên sẽ được kiểm tra tính hợp lệ, giải mã với `secret_key` lưu trong biến môi trường. Hàm `jwt.Parse` có một chút phức tạp, nếu muốn tìm hiểu kỹ hơn, các bạn có thể đọc thêm tại [GoDocs](https://godoc.org/github.com/dgrijalva/jwt-go#Parse).

## 4. Query posts

### Get all posts

```go
// routes/post.go

func GetAllPosts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	collection := db.ConnectPosts();
	
	var result []bson.M 
	data, err := collection.Find(context.Background(), bson.M{})

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
		return
	}

	defer data.Close(context.Background())
	for data.Next(context.Background()) {
		var elem bson.M
		err := data.Decode(&elem)

		if err != nil {
			res.JSON(w, 500, "Internal Server Error")
			return
		}

		result = append(result, elem)
	}

	
	res.JSON(w, 200, result)
}
```
- Bước đầu là connect đến collection `posts`
- Định nghĩa biến `result` dạng mảng `bson.M` (bson dạng map)
- Dùng hàm `Find` của thư viện mongoDB để truy vấn toàn bộ bản ghi trong collection `posts`
- Handle lỗi
- Do biến `data` lưu giá trị trả về từ hàm `Find` ở dạng con trỏ, nên ta cần chuyển đổi thành dạng `bson` để trả về client. (vd: `&{ 0xc0003c6840 <nil> 0xc0000d8c40 0xc00037cb40 <nil>}`)
Prototype của hàm `Find`:
```go
func (coll *Collection) Find(ctx context.Context, filter interface{},
    opts ...*options.FindOptions) (*Cursor, error)
```
- Ta dùng hàm for duyệt qua `data` và decode từng thành một thành dạng bson

![](https://images.viblo.asia/4018deef-281d-4e44-a74a-10296c5f23d5.png)


### Get my posts

```go
// routes/post.go

func GetMyPosts(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	username, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	collection := db.ConnectPosts();
	
	var result []bson.M 
	data, err := collection.Find(context.Background(), bson.M{"creater": username})

	defer data.Close(context.Background())
	for data.Next(context.Background()) {
		var elem bson.M
		err := data.Decode(&elem)

		if err != nil {
			res.JSON(w, 500, "Internal Server Error")
			return
		}

		result = append(result, elem)
	}

	
	res.JSON(w, 200, result)
}
```

- Tương tự như phần trên, hàm `GetMyPosts` chỉ khác ở chỗ extract username từ token và thêm `filter` với điều kiện các bản ghi có giá trị `creater` là username extract ra ở trên.

## 5. Create post

```go
// routes/post.go

func CreatePost(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	creater, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	title := r.PostFormValue("title")

	if govalidator.IsNull(title) {
        res.JSON(w, 400, "Data can not empty")
        return
    }
	
	title = models.Santize(title)
	uid := uuid.NewV4()
	id := fmt.Sprintf("%x-%x-%x-%x-%x", uid[0:4], uid[4:6], uid[6:8], uid[8:10], uid[10:])
	collection := db.ConnectPosts();

	newPost := bson.M{"id": id, "creater": creater, "title": title}

	_, errs := collection.InsertOne(context.TODO(), newPost)

	if errs != nil {
        res.JSON(w, 500, "Create post has failed")
        return
	}
	
	res.JSON(w, 201, "Create Succesfully")

}
```
- Mỗi `post` sẽ có một `id` duy nhất (dạng uuidv4)
- Sau khi tạo ra 1 uid bất kỳ với hàm `uuid.NewV4()`, chúng ta sử dụng hàm `fmt.Sprintf` để convert id thành dạng `xxxx-xxxx-xxxx-xxx`.
- Phần sau chúng ta cũng đã khá quen thuộc khi connect db và gọi hàm `InsertOne` để them bản ghi vào db.

## 6. Edit post

```go
// routes/post.go

func EditPost(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	title := r.PostFormValue("title")
	username, err := jwt.ExtractUsernameFromToken(r)

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}

	if govalidator.IsNull(title) {
        res.JSON(w, 400, "Data can not empty")
        return
	}

	collection := db.ConnectPosts()
	
	var result bson.M 
	errFind := collection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errFind != nil {
        res.JSON(w, 404, "Post Not Found")
        return
	}

	creater := fmt.Sprintf("%v", result["creater"])

	if username != creater {
		res.JSON(w, 403, "Permission Denied")
        return
	}

	filter := bson.M{"id": id}
	update := bson.M{"$set": bson.M{"title": title}}

	_, errUpdate := collection.UpdateOne(context.TODO(), filter, update)

	if errUpdate != nil {
		res.JSON(w, 500, "Edit has failed")
		return
	}
	
	res.JSON(w, 200, "Edit Successfully")

}
```
- Hàm lấy giá trị `id` ở params và `title` ở request body.
- Validate data
- Kết nối đến db
- TÌm trong db xem có bản ghi nào có giá trị `id` trùng với biến `id` không, nếu không có thì trả về 404.
- Nếu có thì chúng ta so sánh trường `creater` trong bản ghi với giá trị `username` extract từ token ra xem có trùng nhau hay không ? Nếu khác nhau thì trả về 403 cho client.
- Tiếp theo chúng ta dùng hàm `UpdateOne` để cập nhật giá trị. Hàm trả về 2 giá trị, biến đầu tiên ở dạng con trỏ, chúng ta không cần xử lý nó nên sẽ để dấu `_`, chỉ cần check xem quá trình update có lỗi hay không thôi.

```go
func (coll *Collection) UpdateOne(ctx context.Context, filter interface{}, update interface{},
    opts ...*options.UpdateOptions) (*UpdateResult, error)
```


## 7. Delete post

```go
// routes/post.go

func DeletePost(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	id := ps.ByName("id")
	username, err := jwt.ExtractUsernameFromToken(r)
	collection := db.ConnectPosts()

	if err != nil {
		res.JSON(w, 500, "Internal Server Error")
        return
	}
	
	var result bson.M 
	errFind := collection.FindOne(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errFind != nil {
        res.JSON(w, 404, "Post Not Found")
        return
	}

	creater := fmt.Sprintf("%v", result["creater"])

	if username != creater {
		res.JSON(w, 403, "Permission Denied")
        return
	}

	errDelete := collection.FindOneAndDelete(context.TODO(), bson.M{"id": id}).Decode(&result)

	if errDelete != nil {
		res.JSON(w, 500, "Delete has failed")
		return
	}

	res.JSON(w, 200, "Delete Successfully")

}
```

- Hàm `DeletePost` cũng tương tự như hàm edit ở trên, chỉ khác chỗ dùng hàm `FindOneAndDelete`

## Tài liệu tham khảo

https://godoc.org/go.mongodb.org/mongo-driver/mongo
https://godoc.org/github.com/julienschmidt

https://www.alexedwards.net/blog/a-recap-of-request-handling
https://www.alexedwards.net/blog/making-and-using-middleware