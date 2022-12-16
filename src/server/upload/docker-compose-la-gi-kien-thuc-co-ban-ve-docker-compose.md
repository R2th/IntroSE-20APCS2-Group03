### I. Docker compose là gì ? ### 
Docker compose là công cụ dùng để định nghĩa và run multi-container cho Docker application. Với compose bạn sử dụng file YAML để config các services cho application của bạn. Sau đó dùng command để create và run từ những config đó.
Sử dụng cũng khá đơn giản chỉ với ba bước:
* Khai báo app’s environment trong Dockerfile.
* Khai báo các services cần thiết để chạy application trong file docker-compose.yml.
* Run docker-compose up để start và run app.

### II. Đặc điểm

![](https://images.viblo.asia/997828e9-4dd9-4193-94bc-a7c7886b78f9.png)

Không giống như Dockerfile (build các image). Docker compose dùng để build và run các container. Các thao tác của docker-compose tương tự như lệnh: docker run.

Docker compose cho phép tạo nhiều service(container) giống nhau bằng lệnh:

```
$ docker-compose scale <tên service> = <số lượng>
```

### III. Demo
Thiết lập **web** :

**npm**
```
npm init react-app <tên app>
```

hoặc **yarn**
```
yarn create react-app <tên app>
```

trong demo là web React js

Thay đổi file **App.js**
```
import React, { useState } from 'react';
import './App.css';

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

const getFoodDetail = (foodId) => {

  return fetch(
    "http://localhost:8080/api/v1/foods?id=" + foodId, 
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    }
  )
  .then(status)
  .then(json)
  .then(res => (new Promise((resolve, reject) => resolve(res.data))))
  .catch(err => {
    alert("err: ", err);
    return undefined;
  })
};

function App() {

  const [foodId, setFoodId]  = useState(0);
  const [dataFood, setDataFood] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h3 color="while">App tìm món ăn theo id</h3>
        <div>
          <input className="input" name="id" placehodler="Nhập id" onChange={(e) => setFoodId(e.target.value)}/>
          <button 
            className="btnSearch"
            onClick={() => {
              getFoodDetail(foodId).then(data => setDataFood(data))
            }}
          >
            Tìm kiếm
          </button>
          <p style={{textAlign: "left"}}>Kết quả: {dataFood}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
```

**App.css**
```
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.input {
  padding: 10px;
  width: 200px;
  border: 0;
  box-shadow: 0px 2px 30px 0px rgba(255,255,15,1);
  margin-right: 10px;
}

.btnSearch {
  padding: 10px 50px;
  color: white;
  background: blueviolet;
  border: 0;
  border-radius: 20px;
}
.btnSearch:hover {
  background: #c837de;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

Phần **server**:

**main.go**
```
package main

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Options(c *gin.Context) {
	if c.Request.Method != "OPTIONS" {
		c.Next()
	} else {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "authorization, origin, content-type, accept")
		c.Header("Allow", "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS")
		c.Header("Content-Type", "application/json")
		c.AbortWithStatus(200)
	}
}

func Secure(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
}

type Foods map[int]string

var foods = Foods{1: "Gà kho xả ớt", 2: "Cá lóc kho", 3: "Thịt xào măng", 4: "Bún chả cá"}

func getFoodById(c *gin.Context) {
	id, err := strconv.Atoi(c.Query("id"))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"error": err.Error()})
	}
	if len(foods[id]) > 0 {
		c.JSON(http.StatusOK, gin.H{"data": foods[id]})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": "Không tìm thấy"})
	}
}

func main() {

	r := gin.Default()
	r.Use(Options)
	r.Use(Secure)
	v1 := r.Group("/api/v1")
	{
		v1.GET("/foods", getFoodById)
	}
	r.Run(":8080")
}
```

Config trong Dockerfile. Nếu bạn chưa biết về các lệnh để config Dockerfile. Đừng lo lắng hãy xem lại phần 1: **[tại đây](https://viblo.asia/p/docker-la-gi-kien-thuc-co-ban-ve-docker-maGK7qeelj2)**

```
FROM node:carbon-alpine AS node_builder

WORKDIR /app/webreactjs
COPY /webreactjs/package.json .
RUN npm install
COPY /webreactjs .
LABEL name="webreactjs" version="1.0"
EXPOSE 3000
CMD ["npm", "start"]

FROM golang:1.11 AS go_builder
ADD . /app
WORKDIR /app
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o /main .
LABEL name="server" version="1.0"

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=go_builder /main ./
RUN chmod +x ./main
EXPOSE 8080
CMD ./main
```

Tiến hành build Dockerfile
![](https://images.viblo.asia/b6566912-4728-4950-ac69-af66dbfc92d7.png)

Config services cần start và run trong file **docker-compose.yml**
```
version: '2.1'

services:
  webreactjs:
    image: af1205224676
    build: .
    ports:
      - 3000:3000
    restart: always
  servergo:
    image: cef5deda0834
    build: .
    ports:
      - 8080:8080
    restart: always
```

* **version**: chỉ ra phiên bản docker-compose đã sử dụng.
* **services**: thiết lập các services(containers) muốn cài đặt và chạy.
* **image**: chỉ ra image được sử dụng trong lúc tạo ra container.
* **build**: dùng để tạo container.
* **ports**: thiết lập ports chạy tại máy host và trong container.
* **restart**: tự động khởi chạy khi container bị tắt.

Ngoài ra còn có một số lệnh config khác:

**environment**: thiết lập biến môi trường ( thường sử dụng trong lúc config các thông số của db).

**depends_on**: chỉ ra sự phụ thuộc. Tức là services nào phải được cài đặt và chạy trước thì service được config tại đó mới được chạy.

**volumes**: dùng để mount hai thư mục trên host và container với nhau.

Run command như bên dưới:
```
$ docker-compose up
```

Sau khi run xong chúng ta thấy docker-compose đã start và run hai service mà chúng ta đã config trong file **docker-compose.yml** ở trên
![](https://images.viblo.asia/012b27d7-6fd6-489f-b4dd-38756b4e240c.png)

Giờ là lúc chúng ta chiêm ngưỡng thành quả thôi nào :D

**Web**: Được run tại : http://localhost:3000

**Server**: Được run tại: http://localhost:8080

![](https://images.viblo.asia/ca63170d-2dcb-428c-839d-dc8fea74387d.png)

![](https://images.viblo.asia/afb29549-7173-42b3-9006-4d37c68d7d02.png)

![](https://images.viblo.asia/ed9cf64e-f6d0-40c2-9652-351306a4a708.png)

***Mẹo nhỏ*** : Dành cho bạn nào dùng **Visual Studio Code** giống mình đó là bạn có thể tạo nhanh các config cho Dockerfile và **docker-compose.yml** chỉ bằng một vài thao tác nhỏ. Trên Visual Studio Code bạn cài thêm extension Docker
![](https://images.viblo.asia/1fa172c7-925c-4874-8d72-5d2e985e99a9.png)

Sau khi cài xong nhấn **F1** => gõ **docker: add** => chọn temp có sẵn + config port lúc này **Visual Studio Code** sẽ tự động generate các fileDockerfile, docker-compose.yml, docker-compose.debug.yml, và.dockerignore cho bạn.

Ngoài ra nó còn suggest lệnh cho chúng ta cũng như là cảnh báo trong lúc chúng ta tự config các file của docker rất tiện.