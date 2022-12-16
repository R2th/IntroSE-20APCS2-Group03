Go là một ngôn ngữ lập trình mới do Google thiết kế và phát triển. Nó được kỳ vọng sẽ giúp ngành công nghiệp phần mềm khai thác nền tảng đa lõi của bộ vi xử lý và hoạt động đa nhiệm tốt hơn. Chính vì vậy performance của Go rất tốt và là lựa chọn hàng đầu cho backend.
![](https://images.viblo.asia/80cd9d98-e16c-4c73-82e0-d45182de9a80.png)
Ở bài viết này, hãy cũng mình tìm hiểu cách xây dựng một CRUD RESTful API đơn giản, sử dụng Go và MongoDB nhé.

## 1. Build và run một ứng dụng Go

Đầu tiên hãy khởi tạo thư mục cho dự án của bạn:
```
$ mkdir go-rest-api
$ cd go-rest-api
```

Sau đó khởi tạo file `main.go` với nội dung như sau:
```
package main

import "fmt"

func main() {
	fmt.Println("Hello World!")
}
```

Để build và run ứng dụng này bạn chạy câu lệnh sau:
```
$ go build
$ ./go-rest-api
```

Và nhận kết quả:
```
$ Hello World
```

Khá đơn giản phải không nào? Hãy cùng đến các bước tiếp theo nhé!

## 2. Tạo HTTP server sử dụng Gorilla Mux

[Gorilla Mux](https://github.com/gorilla/mux) là một Go framework hỗ trợ http router. Chúng ta sẽ sử dụng framework này để tạo một HTTP server

Đầu tiên, cài đặt nó bằng lệnh:
```
$ go get -u github.com/gorilla/mux
```

Trong `main.go`  chúng ta tạo home page với `/` endpoint :
```
package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func homeLink(response http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(response, "Welcome home!")
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	log.Fatal(http.ListenAndServe(":8080", router))
}
```

build lại ứng dụng của bạn và thử truy cập `http://localhost:8080` nhé!

![](https://images.viblo.asia/65efceba-a364-41f8-bb8b-461f571092d8.png)

## 3. Kết hợp với Mongo Go Driver

Chúng ta hãy thử tạo một POST api sử dụng [mongo-go-driver](https://github.com/mongodb/mongo-go-driver)

Đầu tiên hãy install package này:
```
go get -u go.mongodb.org/mongo-driver/mongo
```

Chúng ta sẽ khai báo một biến `collection` đại diện cho collection mà chúng ta truy cập trên `mongoDB`:
```
var collection *mongo.Collection
```

Connect đến mongoDB ở trong `main` funtion:

```
func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, _ := mongo.Connect(ctx, clientOptions)
	collection = client.Database("example").Collection("people")
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	log.Fatal(http.ListenAndServe(":8080", router))
}
```

Sau đó hãy khởi tạo một `model` tương ứng với `document` trên mongoDB:
```
// Person represents a person document in MongoDB
type Person struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Age         int                `json:"age,omitempty" bson:"age,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
}
```

Insert funtion của chúng ta sẽ như sau:
```
func createPerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	json.NewDecoder(request.Body).Decode(&person)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, _ := collection.InsertOne(ctx, person)
	id := result.InsertedID
	person.ID = id.(primitive.ObjectID)
	json.NewEncoder(response).Encode(person)
}
```

Đừng quên lắng nghe POST api ở `main` function nhé:
```
router.HandleFunc("/people", createPerson).Methods("POST")
```

Kết quả của chúng ta như sau:

![](https://images.viblo.asia/7b51f948-6f9b-4897-8241-55a0f27d26e3.png)


## 4. Xử nốt các API còn lại nào!

##### [GET] /people/{id}

```
func getPersonByID(response http.ResponseWriter, request *http.Request) {
    response.Header().Set("content-type", "application/json")
	var person Person
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, Person{ID: id}).Decode(&person)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(person)
}
```

Expected result:

![](https://images.viblo.asia/7c31cff4-fa34-46ad-80c1-5c1b5147dd09.png)

##### [GET] /people

```
func getPeople(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var people []Person
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var person Person
		cursor.Decode(&person)
		people = append(people, person)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(people)
}
```

Expected result:

![](https://images.viblo.asia/87ba2308-d0b1-4424-898c-66147221f122.png)

##### [PUT] /people/{id}

```
func updatePerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	json.NewDecoder(request.Body).Decode(&person)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.UpdateOne(ctx, Person{ID: id}, bson.M{"$set": person})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}
```

Expected result:

![](https://images.viblo.asia/9d50a069-13c7-4d2e-98c3-3501a26a0eba.png)

##### [DELETE] /people/{id}

```
func deletePerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.DeleteOne(ctx, Person{ID: id})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}
```

Expected result:

![](https://images.viblo.asia/4f2614bf-385c-42eb-8dbe-25847eaf897c.png)

Cuối cùng file `main.go` của chúng ta sẽ như sau:
```
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var collection *mongo.Collection

// Person represents a person document in MongoDB
type Person struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Age         int                `json:"age,omitempty" bson:"age,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
}

func createPerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	json.NewDecoder(request.Body).Decode(&person)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, _ := collection.InsertOne(ctx, person)
	id := result.InsertedID
	person.ID = id.(primitive.ObjectID)
	json.NewEncoder(response).Encode(person)
}

func getPersonByID(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, Person{ID: id}).Decode(&person)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(person)
}

func getPeople(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var people []Person
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var person Person
		cursor.Decode(&person)
		people = append(people, person)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(people)
}

func updatePerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var person Person
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	json.NewDecoder(request.Body).Decode(&person)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.UpdateOne(ctx, Person{ID: id}, bson.M{"$set": person})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}

func deletePerson(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	id, _ := primitive.ObjectIDFromHex(mux.Vars(request)["id"])
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.DeleteOne(ctx, Person{ID: id})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}

func homeLink(response http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(response, "Welcome home!")
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, _ := mongo.Connect(ctx, clientOptions)
	collection = client.Database("example").Collection("people")
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/people", getPeople).Methods("GET")
	router.HandleFunc("/people/{id}", getPersonByID).Methods("GET")
	router.HandleFunc("/people", createPerson).Methods("POST")
	router.HandleFunc("/people/{id}", updatePerson).Methods("PUT")
	router.HandleFunc("/people/{id}", deletePerson).Methods("DELETE")
	log.Fatal(http.ListenAndServe(":8080", router))
}
```

Và nhớ đừng quên test lại các API mà các bạn vừa xây dựng nhé!