Ở [bài viết trước](https://viblo.asia/p/tao-website-aspnet-mvc-don-gian-p2-OeVKBAAM5kW), mình đã giới thiệu cách *Tạo mới Controller và View theo mô hình MVC*. Bài viết này, mình sẽ viết về cách *Tạo mới Model* và một chút giới thiệu về Razor View nha.
Model thể hiện sơ đồ dữ liệu và các nguyên tắc hoạt động để kết nối dữ liệu trong kiến trúc MVC. Model duy trì dữ liệu của ứng dụng và chứa các đối tượng cho phép truy xuất và lưu trữ dữ liệu trong cơ sở dự liệu. Các lớp trong Model cũng lưu trữ dữ liệu mô tả về thuộc tính của các đối tượng ở trong thư mục Model.
Bây giờ cùng tìm hiểu cách tạo Model, cách nó hoạt động nào 
# Tạo mới Model
Để tạo mới một Model, trong cửa sổ Solution Explorer,hãy nhấp chuột phải lên thư mục *Model* rồi chọn **Add** -> **Class** rồi đặt tên Model là *BookModel,cs*.
![](https://images.viblo.asia/6c66f05e-1b9f-440d-af03-b7ac00a37c6b.PNG)

Đây là source code BookModel của  mình:
```
namespace MyBook.Models
{
    public class BookModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
    }
}
```
Mình sẽ giải thích một chút về đoạn code trên. 
- Tên bảng trong database sẽ là Book.  
- Các thuộc tính trong class như ID, Title, Category, Author hay Language tương ứng với các cột của table trong database.
- Các kiểu dữ liệu của thuộc tính cũng giống với kiểu dữ liệu của các cột trong bảng.

# Lấy dữ liệu để đưa ra View
Ở đây, mình đang giới thiệu cách sử dụng lớp mô hình đơn giản không có cơ sở dữ liệu. Nên chúng ta sẽ  trực tiếp tạo một số dữ liệu tạm thời trong Controller và tìm hiểu cách đưa các dữ liệu đó sang View nha,
Ta sẽ chỉnh sửa Index method trong BookController lưu trữ một danh sách các Book:

```
        public ActionResult Index()
        {
            List<BookModel> Books = new List<BookModel>()
            {
                new BookModel {ID=1, Title="Cinder", Author="Meyer" },
                new BookModel {ID=2, Title="Scarlet", Author="Meyer" },
                new BookModel {ID=3, Title="Cress", Author="Meyer" },
                new BookModel {ID=4, Title="Winter", Author="Meyer" },
            };
            return View(Books);
        }
```

Bước tiếp theo, chúng ta sẽ làm hiển thị list Book ra View: 
```
<h1>My Book Store</h1>
@foreach (var book in Model)
{
    <b>ID : </b> @book.ID
    <br />
    <b>Name : </b> @book.Title
    <br />
    <b>Category : </b> @book.Author
    <br />
    <hr />
}
```

Rồi, chạy thử xem kết quả dư lào nào:
![](https://images.viblo.asia/5c8932c0-d44b-4186-9bd1-90af9d5f9509.PNG)

Như vậy là chúng ta đã có thể in ra được list books rồi. Nhưng, các bạn có thắc mắc kí hiệu **@** trong code đó là gì không?? Đó chính là cú pháp Razor đó. Vậy cú pháp Razor là gì, chúng ta cùng tìm hiểu sau đây.

# Cú pháp Razor
Razor View là một trong những View engine được hỗ trợ trong ASP.NET MVC. Razor View cho phép bạn kết hợp giữa HTML là C#. Và phần mở rộng của nó là **.cshtml**.
Vậy làm thế nào để viết mã Razor?
## Cú pháp Razor cho biểu thức một dòng
Bắt đầu bằng kí hiệu **@** chẳng hạn, `@Variable_name`  để hiển thị giá trị của biến. 
Như ví dụ bên trên, chúng ta có một biến `book`, để gọi đến biến này, ta sử dụng cú pháp `@book`.
Hoặc ví dụ, khi viết code `@DateTime.now.ToShortDateString()` thì kết quả sẽ trả về một chuỗi có dạng `MM-DD-YYYY`. 
Bạn hãy thử nhé.

## Cú pháp razor cho khối mã nhiều câu lệnh
Nếu bạn viết một khối lệnh liền nhau thì có thể sử dụng cú pháp 
```
@{ 
<Khối lệnh ở đây> 
}
```
Ta có ví dụ như sau: 
```
@{
    var date = DateTime.Now.ToShortDateString();
    string message = "Hello World!";
    <text>Today's date is:</text> @date <br />
    @message                               
}
```
## Cú pháp Razor cho biểu thức điều kiện if-else
```
@if (DateTime.IsLeapYear(DateTime.Now.Year))
{
    @DateTime.Now.Year @:is a leap year.
}
else 
{ 
    @DateTime.Now.Year @:is not a leap year.
}
```
## Cú pháp Razor cho vòng lặp
```
@for (int i = 0; i < 5; i++) { 
    @i.ToString() <br />
}
```
## Cú pháp Razor cho Model 
Người ta sử dụng @model để khai báo lớp model sử dụng trong Razor View.
```
@model Student

<h2>Student Detail:</h2>
<ul>
    <li>Student Id: @Model.StudentId</li>
    <li>Student Name: @Model.StudentName</li>
    <li>Age: @Model.Age</li>
</ul>
```

Các bạn hãy thử tự code và xem kết quả sẽ như thế nào nha.

Như vậy, trong bài viết này mình đã viết về cách *Tạo mới Model* và một chút giới thiệu về Razor View.
Hẹn gặp lại các bạn trong những bài viết tới về .NET MVC web nha