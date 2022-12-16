### 

Go không phải một ngôn ngữ hướng đối tượng (OOP). Tuy nhiên chúng ta có thể áp dụng một số ưu điểm của hướng đối tượng vào trong Go.

Chúng ta có Struct (tương tự Class), Interface và Method. Để sử dụng thuộc tính "kế thừa" trong Go ta sẽ dùng *embedded type*.

**Embedded Type** là khai báo một type nằm trong một type khác nhưng không khai báo tên, trường mà không khai báo tên còn được gọi là embedded field. Ví dụ như sau: 

```go
type Author struct {
    AuthorName string
    AuthorAge int
}

type Post struct {
    Title string
    Content string
    Author   // Embedded field
}
```

Trong ví dụ trên nếu chúng ta đặt tên cho trường Author như bình thường thì chúng ta sẽ có Struct lồng nhau, còn nếu dùng Embedded field thì chúng ta có thể coi như Struct Post có đầy đủ các trường của cả 2 Struct (tên trường không được phép trùng nhau) 

```go
// Tương tự ví dụ trên
type Post struct {
    Title string
    Content string
    AuthorName string
    AuthorAge int
}
```

Bằng cách này chúng ta sẽ có thể sử dụng cả 2 Struct Post và Author mà không cần khai báo lại các trường trùng lặp.

Khi lấy dữ liệu cũng có thể lấy trực tiếp mà không cần qua Struct trung gian, ví dụ lấy tên tác giả thay vì post.Author.AuthorName thì ta chỉ cần post.AuthorName. Xem ví dụ đầy đủ tại đây.

 
### Ví dụ khác

Với một project có sử dụng database.

- Khi tương tác với database ta sẽ dùng Struct User: 

```go
type User struct {
    Id       int
    Role     int
    Name     string
    Email    string
    Password string
}
```

- Dữ liệu gửi lên có thể là một Struct khác ít thông tin hơn, ví dụ như chức năng Login chỉ cần Email và Password. Lúc này ta có thêm Struct Login chẳng hạn: 

```go
type Login struct {
    Email    string
    Password string
}
``` 

Như vậy 2 trường Email và Password bị trùng lặp và khi cần lấy dữ liệu ta có 2 Struct khác nhau, cần phải gán dữ liệu từng trường. Trong trường hợp này ta có thể dùng `embedded type` để giảm bớt thao tác khai báo và gán dữ liệu.