### I. Giới Thiệu
**The decorator design pattern…**
Decorator pattern là gì? và làm thế nào để chúng ta có thể sử dụng nó trong project ruby của mình?
**Decorator** là gì?
>  In object-oriented programming, the decorator pattern is a design pattern that allows behavior to be added to an individual object, 
either statically or dynamically, without affecting the behavior of other objects from the same class.


Decorator pattern làm việc bằng cách đóng gói đối tượng gốc vào trong một đối tượng "trang trí" mới,
thường đạt được bằng cách truyền đối tượng gốc như một tham số tới hàm khởi tạo của decorator,
decorator sẽ thực thi các chức năng mới. Giao diện của đối tượng gốc cần được duy trì qua decorator.
**Decorator** thường được dùng khi ta muốn thêm chức năng cho một đối tượng đã tồn tại trước đó, mà không muốn ảnh hưởng đến các đối tượng khác
### II. Logging & Performance
Chúng ta sẽ thực hiện tạo 1 http request sử dụng gem [rest-client](https://github.com/rest-client/rest-client).
```
require 'restclient'
 
data = RestClient.get("www.example.com")
```

Giả sử giờ chúng ta muốn add logging vào request trên và không muốn thay đổi cấu trúc của restclient
Chúng ta có thể sử dụng decorator pattern như sau
```
module LogRequest
  def get(url)
    puts "Sending Request For #{url}"
    super
  end
end
```
Ở đây sẽ in ra thông tin chúng ta muốn show ra màn hình sau đó sẽ gọi phương thức **get** từ RestClient
Chúng ta có thể add logging capabilities từ 1 request bằng cách sử dụng extend method như sau:
```

class HTTPClient
  def initialize(client = RestClient)
    @client = client
  end
 
  def get(*args)
    @client.get(*args)
  end
end
 
client = HTTPClient.new
client.extend(LogRequest)
 
client.get("example.com")
```
Ban sẽ tạo mới 1 Class HTTPClient bởi vì RestClient là 1 module và bạn không thể khởi tạo objects từ modules
### III. Intent
Decorator pattern được design 1 class decorator mới bao bọc lẫy orignal class. Và nó được thực hiện bằng các bước sau
1. Đưa lớp con (subclass) tư original Component Class vào 1 Decorator class
2. Trong Decorator class thêm 1 Component pointer như là 1 trường
3. Trong Decorator class chuyển 1 Component đến Decorator Constructor để init Component pointer
4. Trong Decorator class chuyển tiếp tất cả các phương thức của component từ component pointer
5. Trong ConcreteDecorator class ghi đề bất kỳ 1  Component method(s) nào cần chỉnh sửa

![](https://images.viblo.asia/31401a69-0d11-453a-abe7-c41483370ba3.png)
### IV. Tổng Kết
Decorator Pattern là pattern khá hay trong việc mở rộng tính năng một class mà không thay đổi gì các class đang có
Áp dụng Decorator Pattern trong lập trình hướng đối tượng làm cho code trở nên uyển chuyển và đẹp hơn rất nhiều