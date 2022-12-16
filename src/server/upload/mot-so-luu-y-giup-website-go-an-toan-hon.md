![](https://images.viblo.asia/e6ac55ef-b2a9-43b5-b2a1-05a9f0877390.png)

Trong các phần trước, chúng ta đã cùng nhau xây dựng một ứng dụng phía Backend tương đối hoàn chỉnh (CRUD, có unit test) với Go. Yếu tố tiếp mà mà chúng ta quan tâm chính là khả năng bảo mật của hệ thống. Trong bài viết này, chúng ta sẽ cùng tìm hiểu những lưu ý cơ bản giúp website an toàn hoàn, tránh được phần nào rủi ro bảo mật, đi cùng với đó là giới thiệu các tools, thư viện giúp hệ thống an toàn hơn trước các lỗ hổng nguy hiểm. 

## 1. Input Validation và Output Encoding
>  Đừng tin những gì người dùng nhập vào.

Các lỗ hổng nghiêm trọng hàng đầu như XSS hay SQL Injection đều xuất phát từ việc sơ xuất trong việc kiểm tra dữ liệu đầu vào. Vì vậy, việc kiểm tra dữ liệu đầu vào thật kỹ sẽ hạn chế được tối đa.

Sơ xuất trong việc kiểm tra dữ liệu đầu vào có thể dẫn đến việc hệ thống bị các lỗi **Injection** (Top 1 theo danh sách của [OWASP](https://owasp.org/www-project-top-ten/) ) 

Dưới đây là một số tips giúp giảm thiểu rủi ro từ dữ liệu người dùng đến từ tổ chức [OWASP](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf) 
- Thực hiện việc xác thực dữ liệu trên một hệ thống đáng tin cậy (ví dụ như Server)
- Xác định tất cả các nguồn dữ liệu và phân loại chúng thành đáng tin cậy và không đáng tin cậy. Xác thực tất cả dữ liệu từ các nguồn không đáng tin cậy (ví dụ: Cơ sở dữ liệu, luồng tệp, v.v.)
- Sử dụng các **characters sets** phù hợp, chẳng hạn như UTF-8, cho tất cả các dữ liệu vào.
- Tất cả đầu vào không hợp lệ sẽ bị reject.
- Xác thực, kiểm tra tất cả dữ liệu từ client cung cấp trước khi xử lý, bao gồm tất cả các **params** , **URL** và **HTTP header**.
- Đảm bảo rằng chỉ các tiêu đề HTTP request và HTTP response chứa các ký tự ASCII.
- Kiểm tra kiểu dữ liệu của dữ liệu đầu vào.
- Kiểm tra độ dài dữ liệu đầu vào.
- Kiểm tra các ký tự nguy hiểm như: **< > " ' % ( ) & + \ \' \"**
- Kiểm tra các ký tự 
     - Null bytes (%00)
     - Xuống dòng (%0d, %0a, \r, \n)
     - Đường dẫn thư mục (../ hay ..\)

### Implement

Go hỗ trợ nhiều package đến từ GoTeam cũng như bên thứ 3 giúp kiểm tra dữ liệu đầu vào.
- [strconv](https://golang.org/pkg/strconv/) chuyển kiểu dữ liệu.
- [string](https://golang.org/pkg/strings/) chứa các hàm định dạng string.
- [utf8](https://golang.org/pkg/unicode/utf8/) thực hiện các chức năng encode, decode, định dạng ký tự dưới chuẩn utf8.
- [form](https://github.com/go-playground/form) Decode và Encode giá trị url
- [validator](https://github.com/go-playground/validator): Xác thực cấu trúc dữ liệu và trường, ví dụ như Cross Field, Cross Struct, Map, Slice hay Array.
- Lọc, encode các ký tự đặc biệt, nguy hiểm có thể dùng các package của bên thứ 3 sau đây. **Lưu ý** package [html](https://pkg.go.dev/html?tab=doc) mặc định có trong Go cũng hỗ trợ lọc, encode các ký tự đặc biệt nhưng chỉ áp dụng với 5 ký tự **< , > , & , ' và "**, chưa thực sự đủ an toàn.
    - [kennygrant/sanitize](https://github.com/kennygrant/sanitize)
    - [maxwells/sanitize](https://github.com/maxwells/sanitize)
    - [bluemonday](https://github.com/microcosm-cc/bluemonday)

### Ví dụ XSS

```go
//main.go

package main

import (
	"io"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	io.WriteString(w, r.URL.Query().Get("param1"))
}
func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
```

- Server listen ở cổng **8080**
- Route **'/'** nhận vào query **param1** và response về nguyên trạng giá trị của query **param1**

=> Không hề validate data truyền vào :persevere:

Thử truyền vào 1 thông điệp bình thường, hello world chẳng hạn. Màn hình sẽ hiển thị nội dung param1 vừa truyền vào.

![](https://images.viblo.asia/2741636b-daed-482a-9766-e88a6c98e1a4.png)

Thử với 1 đoạn HTML, do không validate nên server đã để lọt các ký tự như **< > / ' "**

![](https://images.viblo.asia/d6e563b8-c887-492c-bc79-139de969875d.png)

Chơi thử 1 đoạn script, tèng ten :laughing:

![](https://images.viblo.asia/48f36934-b82f-4ede-a824-e38b5c333523.png)

#### Cách khắc phục

Dùng các thư viện được gợi ý ở trên để kiểm tra, lọc query **param1**

```go
main.go

package main

import (
	"io"
	"net/http"
	"github.com/microcosm-cc/bluemonday"
)

func handler(w http.ResponseWriter, r *http.Request) {
	param1 := r.URL.Query().Get("param1")
	p := bluemonday.UGCPolicy()
	res := p.Sanitize(param1)

	io.WriteString(w, res)
}
func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
```


![](https://images.viblo.asia/16a85a81-de8b-4d4e-a1f5-6ff1049e7b1b.png)

### Ví dụ SQL Injection

Chúng ta có đoạn code sau đây:

```go
ctx := context.Background()
customerId := r.URL.Query().Get("id")
query := "SELECT number, expireDate, cvv FROM creditcards WHERE customerId = " + customerId
row, _ := db.QueryContext(ctx, query)
```

Đoạn code lấy param **id** từ user và dùng phương pháp cộng chuỗi để thực thi câu lệnh SQL Select database. 

Do param **id** không được kiểm tra nên chúng ta sẽ khai thác bằng cách truyền vào **id** có giá trị `1 OR
1=1` 

=> Câu lệnh SQL được thực thi sẽ là 

```sql
SELECT number, expireDate, cvv FROM creditcards WHERE customerId = 1 OR 1=1
```

Toàn bộ dữ liệu trong bảng `creditcards` sẽ được trả về thay vì 1 bản ghi có `customerId = 1` :scream:


#### Cách khắc phục
Không sử dụng cộng chuỗi câu lệnh SQL gọi đến database, sử dụng [Prepare Statements](https://golang.org/pkg/database/sql/#DB.Prepare). **Prepare Statements** sẽ kiểm tra tham số trước khi thực thi trên database, giúp ứng dụng trở nên an toàn hơn.

```go
ctx := context.Background()
customerId := r.URL.Query().Get("id")
query := "SELECT number, expireDate, cvv FROM creditcards WHERE customerId = ?"
stmt, _ := db.QueryContext(ctx, query, customerId)
```

Cú pháp sử dụng **Prepare Statements**  khác nhau ở các hệ quản trị cơ sở dữ liệu khác nhau.

![](https://images.viblo.asia/52bdd9ce-a958-419c-bc4c-f3e0c6d67b17.png)



## 2. Authentication and Password managerment

Dưới đây là các khuyến khi của  [OWASP](https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf)  để giúp hệ thống an toàn hơn khi xác thực và quản lý mật khẩu.

- Yêu cầu xác thực với tất cả các pages và tài nguyên, ngoại trừ những pages hay tài nguyên công khai.
- Việc xác thực phải được thực thi trên một hệ thống đáng tin cậy (ví dụ như server).
- **Triển khai tập trung việc xác thực trên hệ thống, kể cả bao các dịch vụ bên ngoài**.
- Sử dụng các hàm một chiều để mã hóa password, Không sử dụng các hàm băm yếu như MD5 hay SHA-1. OWASP khuyên dùng các hàm băm như : [bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt?tab=doc), [pbkdf2](https://pkg.go.dev/golang.org/x/crypto/pbkdf2?tab=doc), [argon2](https://pkg.go.dev/golang.org/x/crypto/argon2?tab=doc) hay [scrypt](https://pkg.go.dev/golang.org/x/crypto/scrypt?tab=doc). 
- Xác thực hoàn tất khi đã kiểm tất cả dữ liệu đầu vào, đặc biệt đối với việc triển khai xác thực tuần tự.
- Phản hồi lỗi xác thực không được chỉ ra phần nào của dữ liệu xác thực không chính xác. Ví dụ: thay vì "Tên người dùng không hợp lệ" hoặc "Mật khẩu không hợp lệ",  hãy trả về "Tên người dùng và / hoặc mật khẩu không hợp lệ" cho cả hai.
- Sử dụng xác thực với các kết nối từ bên ngoài (như việc gọi API chẳng hạn).
- Chỉ sử dụng HTTP **POST** để submit thông tin cần xác thực.
- Xác thực lại người dùng trước khi thực hiện các thao tác quan trọng

## 3. Session Management

![](https://images.viblo.asia/243c3ae4-25d3-46b9-aa7f-e9f283801d96.png)

- Việc tạo session phải luôn được thực hiện trên một hệ thống đáng tin cậy (ví dụ: Server).
- Quản lý session nên sử dụng các thuật toán đủ tốt để đảm bảo định danh session là ngẫu nhiên.
- Logout người dùng khi session hết hạn hoặc bị xóa.
- Nếu có một session được thiết lập trước khi đăng nhập, hãy đóng session và thiết lập một session mới sau khi đăng nhập thành công.
- Không cho phép đăng nhập đồng thời với cùng một ID người dùng.
- Mã hóa môi trường truyền dữ liệu giữa client với server với [TSL](https://golang.org/pkg/crypto/tls/)
- Set trường "secure" cho cookie.
- Set trường **HttpOnly** trong cookie.

**Set httpOnly**

```go
// Our cookie parameter
cookie := http.Cookie {
    Name: "Auth",
    Value: signedToken,
    Expires: expireCookie,
    HttpOnly: true,
    Path: "/",
    Domain: "127.0.0.1",
    Secure: true
}

http.SetCookie(res, &cookie) //Set the cookie
```

**HTTPS server**

```go
package main

import (
    "log"
    "crypto/tls"
)

func main() {
    log.SetFlags(log.Lshortfile)

    conf := &tls.Config{
         //InsecureSkipVerify: true,
    }

    conn, err := tls.Dial("tcp", "127.0.0.1:443", conf)
    if err != nil {
        log.Println(err)
        return
    }
    defer conn.Close()

    n, err := conn.Write([]byte("hello\n"))
    if err != nil {
        log.Println(n, err)
        return
    }

    buf := make([]byte, 100)
    n, err = conn.Read(buf)
    if err != nil {
        log.Println(n, err)
        return
    }

    println(string(buf[:n]))
}
```

## 4. Một số lưu ý khác

### File Management

Với các form upload file, hệ thống nên giới hạn đuôi file có thể upload lên server (white list) để tránh hacker có thể upload các file độc hại lên server.


**Ví dụ khi upload ảnh**

```go
switch filetype {
    case "image/jpeg", "image/jpg":
        fmt.Println(filetype)
    case "image/gif":
        fmt.Println(filetype)
    case "image/png":
        fmt.Println(filetype)
    default:
        fmt.Println("unknown file type uploaded")
}
```

### Cross-Site Request Forgery 

Cross Site Request Forgery  ( CSRF) là kỹ thuật tấn công bằng cách sử dụng quyền chứng thực của người dùng đối với website. CSRF tấn công vào người dùng, từ đó hacker có thể thực thi những thao tác phải yêu cầu chứng thực. Hiểu một cách nôm na, đây là kỹ thuật tấn công dựa vào mượn quyền trái phép.

#### Ví dụ

Website `foo.com` sử dụng HTTP **GET**, để thay đổi địa chỉ email khôi phục tài khoản

```
GET https://foo.com/account/recover?email=me@somehost.com
```

1. Nạn nhân đăng nhập vào trang web https://foo.com
2. Hacker gửi đường link sau cho người dùng: `https://foo.com/account/recover?email=me@attacker.com`
3. Nếu người dùng nhẹ dạ click vào đường link ở trên thì sẽ địa chỉ email khôi phục tài khoản bị đổi thành email của hacker.

Thay đổi từ HTTP GET sang HTTP POST (hoặc bất phương thức nào khác) sẽ không giải quyết được vấn đề. Sử dụng cookie secret, viết lại URL hoặc HTTPS sẽ cũng không giải quyết được triệt để.

#### Giải pháp

Tạo ra một token tương ứng với mỗi form, token này sẽ là duy nhất đối với mỗi form và thường thì hàm tạo ra token này sẽ nhận đối số là "SESSION" hoặc được lưu thông tin trong SESSION. Khi nhận lệnh HTTP POST về, hệ thống sẽ thực hiên so khớp giá trị token này để quyết định có thực hiện hay không

```html
<form method="post" action="https://foo.com/user/signin" autocomplete="off">
   <input type="hidden" name="csrf" value="CSRF-TOKEN" />
   <label>Username <input type="text" name="username" /></label>
   <label>Password <input type="password" name="password" /></label>
   <input type="submit" value="Submit" />
</form>
```


Trên server ta sẽ dùng package [CSRF](https://github.com/gorilla/csrf) của [Gorilla](https://github.com/gorilla).
```go
package main

import (
    "github.com/gorilla/csrf"
    "github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
    csrfMiddleware := csrf.Protect([]byte("32-byte-long-auth-key"))

    api := r.PathPrefix("/api").Subrouter()
    api.Use(csrfMiddleware)
    api.HandleFunc("/user/{id}", GetUser).Methods("GET")

    http.ListenAndServe(":8000", r)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
    // Authenticate the request, get the id from the route params,
    // and fetch the user from the DB, etc.

    // Get the token and pass it in the CSRF header. Our JSON-speaking client
    // or JavaScript framework can now read the header and return the token in
    // in its own "X-CSRF-Token" request header on the subsequent POST.
    w.Header().Set("X-CSRF-Token", csrf.Token(r))
    b, err := json.Marshal(user)
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }

    w.Write(b)
}
```

## Kết luận

Trên đây chỉ gồm những lưu ý cơ bản giúp phòng tránh, giảm thiểu nguy cơ website trước các cuộc tấn công. Tuy nhiên, không có gì là đảm bảo hệ thống của chúng ta hoàn toàn miễn nhiễm với các cuộc tấn công (Đạo cao 1 thước, Ma cao 1 trượng), ở đâu đó vẫn còn những lỗ hổng chưa được phát hiện, những dòng code đầy lỗi hay cả những lỗi ngay trong phần cứng mà không thể khắc phục ngày 1 ngày 2 bằng các bản vá phần mềm. 


## Tài liệu tham khảo

https://github.com/OWASP/Go-SCP

https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf

https://viblo.asia/p/ky-thuat-tan-cong-csrf-va-cach-phong-chong-amoG84bOGz8P