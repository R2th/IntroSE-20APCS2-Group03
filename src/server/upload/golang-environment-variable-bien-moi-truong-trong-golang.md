![image.png](https://images.viblo.asia/b163972d-5225-468b-ab41-ed7dd01251a0.png)

Trong bài viết này, mình sẽ giới thiệu biến môi trường trong Golang, lý do và cách sử dụng nó trong việc xây dựng các service Golang.

## Golang Environment Variable là gì?

Golang Environment Variable là biến môi trường trong Golang. Chúng là các cặp key-value được sử dụng xuyên suốt hệ thống. Môi trường ở đây có thể được hiểu là DEV, STAGING, PRODUCTION,... Mỗi môi trường sẽ cần các thiết lập và cấu hình (configuration) riêng.

Việc lưu trữ các thiết lập này độc lập với source code Golang là một trong [12 nguyên tắc](https://12factor.net/) rất quan trọng để với một source code có thể deploy nhiều nơi.

## Vì sao nên dùng biến môi trường Golang?

1.  Đảm bảo tính chất "*một source code có thể deploy nhiều nơi*": Trong thực tế khi xây dựng các hệ thống với Golang, source code có thể run trên rất nhiều môi trường khác nhau. Nếu không sử dụng các biến môi trường, chúng ta sẽ phải sửa đổi code cho từng môi trường cụ thể. Điều này sẽ vi phạm nguyên tắc trên.
2.  Bảo mật các thông tin quan trọng: Trong source code không nên khai báo trực tiếp các kết nối DB, secret keys, credentials,... Những thông tin này thường sẽ được quản lý thông qua các biến môi trường.
3.  Quản lý tập trung các thiết lập trong toàn hệ thống: Việc sử dụng biến môi trường cũng giúp tập trung được tất cả key-value vào một nơi duy nhất, tránh khai báo nhiều nơi dẫn đến khó bảo trì.

> Lưu ý rằng những file chứa các thiết lập biến môi trường cần phải được đưa vào .gitignore nếu bạn đang dùng git.

## Cách sử dụng biến môi trường trong Golang

Bản thân ngôn ngữ Golang đã có các thư viện built-in ( `os` package) để quản lý các môi trường một cách rất dễ dàng thông qua 2 hàm phổ biến là `os.Setenv()` và `os.Getenv()`

-   `os.Setenv()`: là một hàm rất hữu dụng khi chúng ta muốn gán (set) giá trị một biến môi trường nào đó cho toàn bộ hệ thống. Nó sẽ hữu dụng khi thay thế cho biến toàn cục (global variable).
-   `os.Getenv()`: là hàm đọc một biến môi trường bất kỳ. Hàm này luôn trả về một `string`. Nếu biến môi trường không tồn tại thì hàm sẽ về một `empty string`.
-   Trong trường hợp nếu cần phân biệt một biến môi trường có giá trị empty string hay chưa thiết lập thì cần dùng hàm `os.LookupEnv()`.

Sau đây là một ví dụ cho tất cả trường hợp trên với một file `main.go` đơn giản như sau:

```
package main

import (
	"fmt"
	"os"
)

func main() {
	// Set Environment Variables
	os.Setenv("SERVICE_NAME", "200Lab Service")

	// Get value from an Environment Variable
	srvName := os.Getenv("SERVICE_NAME")
	fmt.Printf("Service name: %s\n", srvName)

	// Unset an Environment Variable
	os.Unsetenv("SERVICE_NAME")
	fmt.Printf("After unset, Service name: '%s'\n", os.Getenv("SERVICE_NAME"))

	// Checking that an environment variable is present or not.
	mysqlConnStr, ok := os.LookupEnv("MYSQL_CONNECTION")
	if !ok {
		fmt.Println("MySQL connection string is not present")
	} else {
		fmt.Printf("MySQL connection string: %s\n", mysqlConnStr)
	}
}

```

Kết quả chạy chương trình với câu lệnh `go run main.go`:

```
Service name: 200Lab Service
After unset, Service name: ''
MySQL connection string is not present
```

## Ứng dụng biến môi trường vào trường hợp thực tế

Quay trở lại với ứng dụng [TODO List REST API đơn giản với Golang](https://200lab.io/blog/lap-trinh-rest-api-todo-list-voi-golang/), trong source code chúng ta có khai báo trực tiếp thông tin kết nối MySQL:

```
dsn := "root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"
```

Ứng dụng biến môi trường Golang, chúng ta sẽ thay đổi lại một chút:

```
package main

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	// Checking that an environment variable is present or not.
	mysqlConnStr, ok := os.LookupEnv("MYSQL_CONNECTION")

	if !ok {
		log.Fatalln("Missing MySQL connection string")
	}

	dsn := mysqlConnStr
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("Cannot connect to MySQL:", err)
	}

	log.Println("Connected to MySQL:", db)
}
```

Tại đây nếu các bạn run chương trình sẽ báo lỗi: "Missing MySQL connection string" do biến môi trường `MYSQL_CONNECTION` chưa được thiết lập.

Chúng ta sẽ có vài cách để thiết lập giá trị cho các biến môi trường từ bên ngoài:

### Sử dụng câu lệnh export (dành cho Linux/Mac) trong Terminal:

```
export MYSQL_CONNECTION="root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"
go run main.go
```

### Set trực tiếp biến môi trường ngay trong câu lệnh chạy chương trình:

```
MYSQL_CONNECTION="root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local" go run main.go
```

### Thiết lập biến môi trường để chạy debug trong Visual Studio Code:

Nếu bạn đang sử dụng Visual Studio Code thì mở đến tab Run & Debug, chọn tiếp create a launch.json file rồi chọn Go:

![Tạo file launch.json trong Visual Studio Code](https://200lab-blog.imgix.net/2022/05/Screen-Shot-2022-05-27-at-11.28.02.png)

Tạo file launch.json trong Visual Studio Code

File `launch.json` sẽ có nội dung như sau:

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Package",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "env": {
                "MYSQL_CONNECTION": "root:my-root-pass@tcp(127.0.0.1:3306)/todo_db?charset=utf8mb4&parseTime=True&loc=Local"
            }
        }
    ]
}
```

Các bạn lưu ý file mình cung cấp có 2 thay đổi là: `"program"` sẽ có giá trị `"${workspaceFolder}"` và thêm key `"env"` để chứa tất cả các biến môi trường cần thiết.

OK tới đây chúng ta đã có thể Run Debug được chương trình bình thường.

Vì file `launch.json` bây giờ có chứa các biến môi trường nên chúng ta nên đưa vào `.gitignore` để đảm bảo không public chúng:

```
# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib
app

# Test binary, built with `go test -c`
*.test

# Output of the go coverage tool, specifically when used with LiteIDE
*.out

# Dependency directories (remove the comment below to include it)
# vendor/

.vscode
```

Các bạn có thể tham khảo toàn bộ source code của TODO List REST API sau khi đã dùng biến môi trường tại [đây](https://github.com/200lab-Education/tutorial-golang-rest-api-todo-list/tree/feature/demo-environment-variable).

Xem bài viết gốc tại: https://200lab.io/blog/golang-environment-variable-bien-moi-truong-trong-golang/