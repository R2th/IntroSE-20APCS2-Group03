Trong bài viết này, Tôi sẽ hướng dẫn xây dựng một trang web sử dụng golang và html/css đơn giản. Bạn cần cài đặt golang nếu bạn chưa cài đặt thì có thể cài đặt tại đây https://golang.org/doc/install hoặc xem lại hướng dẫn cài đặt p1

# Bước 1: Thiết lập cấu trúc thư mục
Vào trong thư mục src của go
Tạo một thư mục welcome-app.
`mkdir welcome-app `<br>
`cd welcome-app`<br>
Cấu trúc thư mục của bạn sẽ trông giống như thế này
```
/ home 
  / <your-username> 
    / go 
      bin / 
      src / 
        / welcome-app
```
![](https://images.viblo.asia/6818ea83-2487-4752-b305-ea211cd6cca8.png)
# Bước 2: Xây dựng giao diện người dùng
Tạo một thư mục templates trong ~/go/src/welcome-app để lưu trữ các file html<br>
`mkdir templates`<br>
Tạo một thư mục stylesheets trong ~/go/src/welcome-app/static để lưu trữ các file css, js..<br>
`mkdir -p static/stylesheets`<br>
Tạo file html welcome-template.html trong templates<br>
Tạo file html welcome-template.css trong static/stylesheets<br>

Thư mục của bạn sẽ trông giống như thế này.<br>
![](https://images.viblo.asia/ccaf675d-567c-4152-8695-73c345e5c18d.png)

1. HTML: templates/welcome-template.html

```
<!DOCTYPE html>

<html>
   <head>
         <meta charset="UTF-8">
         <link rel="stylesheet" href="/static/stylesheets/welcome-template.css">
         <title>Welcome {{.Name}}</title>
   </head>
   <body>
      <div class="welcome center">Welcome {{.Name}}, it is {{.Time}}</div>
   </body>
</html>
```

2.CSS: static/stylesheets/welcome-template.css
```
.welcome {
   font-family: 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
   font-size: 3rem;
   color: aliceblue;
}

.center {
   height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center
}
```
# Bước 3: xây dựng Go server
**tạo file main.go**
```
package main
import (
	"fmt"
	"html/template"
	"net/http"
	"time"
)

type Welcome struct {
	Name string
	Time string
}

func main() {
	welcome := Welcome{"Anonymous", time.Now().Format(time.Stamp)}

	templates := template.Must(template.ParseFiles("templates/welcome-template.html"))

	http.Handle("/static/",
		http.StripPrefix("/static/",
			http.FileServer(http.Dir("static"))))

	http.HandleFunc("/" , func(w http.ResponseWriter, r *http.Request) {
		if name := r.FormValue("name"); name != "" {
				welcome.Name = name;
		}
		if err := templates.ExecuteTemplate(w, "welcome-template.html", welcome); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	// Start web server, và sét cổng 8080
	fmt.Println("Listening");
	fmt.Println(http.ListenAndServe(":8080", nil));
}
```

Giải thích chút nhé !
chỗ này là để import các pakages cần thiết
```
import (
	"fmt"
	"html/template"
	"net/http"
	"time"
)
```
Tạo dữ liệu struct với 2 biến là name và time
```
type Welcome struct {
	Name string
	Time string
}
```
 khởi tạo struct welcome với 2 giá trị Name và Time ngẫu nhiên<br>
`welcome := Welcome{"Anonymous", time.Now().Format(time.Stamp)}`

 gọi đến dướng dẫn chứa file html, gọi trong hàm template.Must() khi chương trình lỗi sẽ dừng chương trình lại<br>
`templates := template.Must(template.ParseFiles("templates/welcome-template.html"))`

sử dụng handle để lấy file css trong static
```
 http.Handle("/static/",
	http.StripPrefix("/static/",
		http.FileServer(http.Dir("static"))))
```

phương thức có URL "/" Và trả về ResponseWriter và http request<br>
 `http.HandleFunc("/" , func(w http.ResponseWriter, r *http.Request) {`

lấy tên từ URL
với url http://127.0.0.1:8080/?name=Thinh thì r.FormValue("name") sẽ có giá trị là "Thinh"
```
   if name := r.FormValue("name"); name != "" {
			welcome.Name = name;
	}
```

Nếu lỗi sẽ hiển thị error message, thành công sẽ trả về welcome-template.html
```
if err := templates.ExecuteTemplate(w, "welcome-template.html", welcome); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
}
```

Start web server, và sét cổng 8080
```
fmt.Println(http.ListenAndServe(":8080", nil));
```
# Bước 4: Chạy chương trình
chạy lệnh tại thư mục project<br>
`go run main.go`
bật trình duyệt truy câp vào http://localhost:8080?name=thinh và tận hưởng thành quả
![](https://images.viblo.asia/aa24ac86-fbe0-4c9e-8a30-2de6db4c1d0e.png)
# kết bài
Trên đây là hướng dẫn run 1 web golang cơ bản, bài sau mình sẽ hướng dẫn làm các chức năng đơn giản cho trang web. Cảm ơn các bạn đã đón đọc.