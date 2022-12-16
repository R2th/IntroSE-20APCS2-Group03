Ờ bài viết này mình sẽ hướng dẫn cách viết http middleware trong 1 ứng dụng go api đơn giản.

Trước hết chúng ta sẽ bắt đầu với 1 api đơn giản.
Ví dụ dưới đây mình sẽ sử dụng 3rd-party cho router. `go-chi`.
Khi chọn library cho router, mình tránh chọn các thư viện không tương thích với standard-library như http-router.

```
package main

import (
	"net/http"
	"github.com/go-chi/chi"
)

func main() {
   	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})
	http.ListenAndServe(":3000", r)
}
```

Với đoạn code trên, khi ta send request đến `localhost:3000` response trả về `welcome`.
Trong các ứng dụng thực tế, ta thường sẽ sử dụng log để ghi lại các request đến server.
Và nhiệm vụ này sẽ rất thích hợp để viết 1 log middleware.

Http middleware trong go hiểu theo 1 cách đơn giản nhất là đoạn code sẽ được chạy trước hoặc sau logic xử lý chính trong endpoint của chúng ta.
Ở ví dụ này. mình sẽ viết 1 http log middleware để log các request đến server.

```
package main
  
import (
     "net/http"
    "log"

     "github.com/go-chi/chi"
)

func main() {
    r := chi.NewRouter()
    r.Use(logRequest)

    r.Get("/path1", path1)
    r.Get("/path2", path2)

    http.ListenAndServe(":3000", r)
}

func path1(w http.ResponseWriter, r *http.Request) {
                w.Write([]byte("path 1"))
}

func path2(w http.ResponseWriter, r *http.Request) {
                w.Write([]byte("path 2"))
}

// Log middleware
func logRequest(h http.Handler) http.Handler {
        fn := func(w http.ResponseWriter, r *http.Request) {
                log.Printf("Request path: %s", r.URL.Path)
                h.ServeHTTP(w, r)
        }

        return http.HandlerFunc(fn)
}
```