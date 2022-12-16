Class và Struct có liên quan gì đến Value type và Reference type không?   Câu trả lời là ***có*** . Bởi vậy đầu tiên chúng ta cùng tìm hiểu về Value type và Reference type trước.

# Value type và Reference type
Trước tiên các bạn nên biểt việc khai báo:
- **let**: hằng số, không thể thay đổi 
- **var**: biến số, có thể thay đổi 

Khi bạn khai báo một biến, ngay tại thời điểm này một ô nhớ đã được tạo ra để lưu property.

***1. Value type*** (kiểu giá trị) (struct, enum, string, int, Double, CGPoint, CGSize, CGFloat, Array, Dictionary): Bản chất là coppy dữ liệu 

- ![](https://images.viblo.asia/a566b696-6b1f-4cd9-a6e3-5237aa1c19c7.png)


Ở ví dụ trên, khi khai báo `let girl1 = Girl()`, ngay lúc này một ô nhớ đã được tạo ra để chứa dữ liệu của ***struct*** và gán cho `girl1`. Ở lần gán thứ 2, tương tự, một ô nhớ nữa được tạo ra, chứa bản coppy dữ liệu của `girl1` và gán cho `girl2`. Lúc này việc ta thay đổi dữ liệu trên `girl2` không liên quan gì đến `girl1` và bạn phải khai báo là ***var*** vì bạn đang thay đổi ***property*** của `girl2`

- ![](https://images.viblo.asia/4fc6eacd-7bf0-41e5-8eec-b8485aebe914.png) 

Method cần khai báo thêm`mutating` vì bản chất của ***Value type*** là coppy, không sửa. Lúc này một `name` mới được tạo ra lưu `property` đã thay đổi và thay vào `name` ban đầu.

***2. Reference type*** (kiểu tham chiếu) (class, UIView, UIViewController, UITableView,..., NSString, NSNumber, NSArray, and NSDictionary ): Bản chất là tham chiếu đến ô nhớ

- ![](https://images.viblo.asia/9be6024c-acf8-47fb-8c44-d647e5fce4db.png)

 Ở ví dụ trên, khi khai báo `let girl1 = Girl()`, một ô nhớ được tạo ra chứa dữ liệu của ***class*** và gán địa trỉ ô nhớ đó cho `girl1`. Ở lần gán thứ 2, địa trỉ ô nhớ chứa dữ liệu của ***class*** tiếp tục được gán cho `girl2`. Phép gán ở đây đơn giản chỉ là ***việc truyền địa trỉ ô nhớ giữa các object***. Nên khi ta thay đổi property của girl2 không cần khai báo ***var***. Việc thay đổi ***property*** diễn ra trực tiếp trên ô nhớ
  
  -  ![](https://images.viblo.asia/1fc6fd89-bf68-402d-a845-cc2832d89fa2.png) 
   
   Method có thể trực tiếp thay đổi property vì là kiểu tham chiếu

Bây giờ hãy thử giải thích 2 ví dụ sau:
1.  Tại sao struct lại lỗi (xem bài https://viblo.asia/p/trong-swift-func-la-gi-closure-la-gi-GrLZDpOBZk0)

 ![](https://images.viblo.asia/6048a842-a256-4b32-a747-b5400f128579.png)
  ![](https://images.viblo.asia/8235ddaf-004f-4497-a91f-6c37a22c0b90.png)
 
  2. Tại sao lại có sự khác nhau này (ở bài viết về ***hàm khởi tạo*** mình sẽ giải thích)

![](https://images.viblo.asia/4a0bc21c-d19c-4109-bf81-8e9d42c64715.png)
![](https://images.viblo.asia/d6cf7625-0dfe-496c-9c3c-1792db9cb334.png)
![](https://images.viblo.asia/250a2e29-0270-4d04-b143-b5199005f241.png)
![](https://images.viblo.asia/e226b1c2-a644-4462-a875-ce7cc97de620.png)

  3. Tại sao lại có sự khác nhau này
  
 ![](https://images.viblo.asia/09a15fbe-0e61-4211-a078-9214d67080a5.png)
![](https://images.viblo.asia/e0d077fe-2a03-49ad-b6d4-d67b9154bba7.png)
![](https://images.viblo.asia/f3d333b0-1eb4-4eef-9d0f-9397b9718f10.png)
![](https://images.viblo.asia/8673e534-84a6-447d-a26d-a6cb1698bbcb.png)

# Class là gì? Struct là gì? Có gì giống nhau và khác nhau?

### 1. Class là gì?, Struct là gì?
* Class là một bản thiết kế, chứa các thuộc tính (property) để lưu giá trị và các phương thức (method) để thực hiện một chức năng nào đó.
* Struct cũng giống class nhưng chủ yếu được sử dụng để cấu trúc cho một nhóm dữ liệu đơn giản.
* Đều có thể extension và conform protocol

### 2. Giống nhau:

- Đều là một bản thiết kế, có thể khai báo property, method, subscript
- Đều sử dụng được bộ khởi tạo (init)
- Đều cho phép conform Protocol, và sử dụng Extension

### 3. Khac nhau:
|  | Class | Struct |
| -------- | -------- | -------- |
| 1     |  Reference type (kiểu tham chiếu)|   Value type (kiểu giá trị)   |
| 2 | Có tính kế thừa: Kế thừa từ class khác, struct, ... |  |
| 3 |Có thêm toán tử đồng nhất thức (===)  để xác định 2 object có tham chiếu đến cùng một ô nhớ không|  |
|4 |Có hàm ***deinit*** | |

Tại sao Class có hàm ***deinit*** còn truct thì không? Mình sẽ giải thích trong bài "Cơ chế quản lý bộ nhớ"

Vậy khi nào thì nên sử dụng Struct:
- Để cấu trúc cho một nhóm dữ liệu đơn giản, liên quan đến nhau
- Bạn muốn dữ liệu sẽ được sao chép rêng biệt, không liên quan đến nhau.

Tham khảo: https://viblo.asia/p/reference-type-class-vs-value-type-enum-struct-ORNZq3e850n