##  I. Prototype. 
   + Là khái niệm rất riêng của JavaScript, một JavaScript Object luôn có sẵn ít nhất một thuộc tính bên trong nó, là prototype. Và prototype cũng chính là một object. Khi một object gọi đến một thuộc tính mà nó không có thì nó sẽ tìm trong prototype. Hãy xem ví dụ sau:
   
![image.png](https://images.viblo.asia/499aed81-a040-4431-8af1-fa87881ca2f3.png)

   + Rõ ràng là chỉ khai báo empty là một object mà không định nghĩa thêm thuộc tính nào. Tuy nhiên, ví dụ trên chỉ ra rằng thuộc tính toString tồn tại trong object empty. Đó là vì: toString là một thuộc tính của prototype mà một object thì luôn chứa thuộc tính prototype.
   
## II. Constructor.
   + Hàm khởi tạo constructor sẽ chứa từ khoá this để biểu thị object được tạo ra từ nó. Thông thường, constructor sẽ được bắt đầu bằng chữ cái viết hoa - dùng để phân biệt nó với các function khác. Bạn sẽ phải sử dụng từ khoá new đứng trước tên function để tạo ra một đối tượng mới từ hàm constructor này. Sau đây là một ví dụ đơn giản về constructor:
   
 ![image.png](https://images.viblo.asia/7104cb37-569b-4e59-9f93-c624ae8872d0.png)
 
   + Lúc này, mỗi đối tượng được tạo ra từ constructor Rabbit sẽ có hai thuộc tính type và greeting. Tuy nhiên, bạn vẫn có thể tạo thêm thuộc tính cho nó thông qua Object.prototype như sau:
   
![image.png](https://images.viblo.asia/94bb2a08-f4f0-42c6-9af7-3a22a3b75649.png)

## III. Call, apply và bind.
  + Là các prototype của function. Nên chỉ có Function mới có thể gọi được 3 hàm này. Sở dĩ, một Function có thể gọi function khác vì trong JavaScript, Function cũng là một loại Object, mà đã là Object thì sẽ có prototype, hay nói cách khác là gọi được phương thức của nó.
     Call: Gọi hàm và cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy (Comma).
     Apply: Gọi hàm và cho phép bạn truyền vào một object và các đối số thông qua mảng (Array).
     Bind: Trả về một hàm số mới, cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy.

 + Khi gọi 3 hàm này, tham số đầu tiên chính là giá trị của con trỏ this.
 
 ![image.png](https://images.viblo.asia/82dc9d23-baf5-4b80-bce8-0cf26dc76c00.png)
 
Nguồn tham khảo: https://eloquentjavascript.net/