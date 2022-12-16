Postman hẳn không còn xa lạ với bất cứ ai làm trong lĩnh vực công nghệ thông tin. Cũng đã có rất nhiều bài viết liên quan tới postman, đứng trên vai trò là người kiểm thử chất lượng phần mềm, mình sẽ chia sẻ về các hiểu biết mà mình tích luỹ được về postman. 
   
   Để có thể thực hiện được hiển thị kiểm tra dữ liệu thông qua API thì ngoài việc cài đặt môi trường, postman chúng ta cần phải có các thông tin của API cần kiểm thử đối với 1 đối tượng cụ thể. Giả sử, kiểm thử API trang Web hay trong một Project A nào đó. Đối với những người mới bắt đầu tìm hiểu thì khả năng để tạo ra được thông tin API sẽ gặp khá nhiều khó khăn. Vì vậy, mình sẽ giới thiệu tới các bạn về Redmine API, hoàn toàn sử dụng miễn phí và giúp ích cực kỳ lớn.
#    I. Thông tin về API cần có
## 1. Redmine là gì ?
Redmine là công cụ quản lý công việc, được viết bằng mã nguồn mở nên hoàn toàn miễn phí đối với người sử dụng. Vì vậy, ai cũng có thể sử dụng nó mà không cần trả phí.
Link: https://www.redmine.org/
## 2. Redmine API như thế nào ?
Chính vì là mã nguồn mở nên trong Redmine cung cấp Redmine API nhằm mục đích cung cấp quyền truy cập và các hoạt động cơ bản từ đó giúp người dùng có thể tìm hiểu về việc kiểm tra API bằng công cụ Postman.
Link: https://www.redmine.org/projects/redmine/wiki/Rest_api
# II. Tìm hiểu các định nghĩa cơ bản trong API 
## 2.1. Định dạng thường sử dụng
Trong API cung cấp 2 kiểu định dạng là Json và XML.

   + Định nghĩa về Json: https://en.wikipedia.org/wiki/JSON

Example: 
```
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 27,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
```
  
+ Định nghĩa về XML. Link: https://en.wikipedia.org/wiki/XML

Example: 
```
<?xml version="1.0" encoding="ISO-8859-1" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"></xs:schema>
```

## 2.2. Thông tin cơ bản một request tới Redmine cần có
**Important**: Do Redmine là mã nguồn mở nên một cty có thể kéo source code về và build nó trên server của cty. Để sử dụng Redmine API bắt buộc bạn phải enable tính năng này lên.
Sau khi bạn login bằng tài khoản admin Redmine bạn  theo  `Administration -> Settings -> API`. Sau đó check vào checkbox `Enable REST API`.

**URL**: URL address. Request sẽ được đẩy tới địa chỉ. Response trả về sẽ có 2 định dạng `json` hoặc `xml`.  Bạn phải chủ động thêm định dạng này vào url. Ví dụ:
```url
http://demo.redmine.org/projects.json
```

**Method**: Một số phương thức của request. 
- GET: Lấy dữ liệu về từ Redmine
- POST: Tạo dữ liệu trên Redmine. Có thể là tạo project, tạo issue, ...
- PUT: Update dữ liệu trên Redmine. Ví dụ như update subject issue, change dual date ...
- ....
- 
**Header**: Thông tin về headers của một request.

**Status**: Kết quả trả về của request.

**Authentication**: Redmine có 2 cơ chế authen chính: basic auth, api access key. Bạn có thể tham khảo thêm tài liệu [tại đây](https://www.redmine.org/projects/redmine/wiki/Rest_api).

# III. Thực hiện việc tạo request
Sau khi tải và cài đặt cũng như đăng nhập thành công vào Postman. Bạn hãy thực hiện các thao tác sau đây:

### 3.1. Tạo Collection 

Mục đích: Để lưu trữ tất cả các request nhỏ bên trong có thể có liên quan tới nhau trong cùng một chức năng để dễ dàng cho việc quản lý.

Bên tay trái, hãy chọn +New Collection sẽ hiển thị giống hình ảnh phía dưới. Hãy nhập collection name và kèm theo mô tả nếu có. Ở đây, mình sẽ tạo ra 1 collection có tên là Testing. 
![](https://images.viblo.asia/e9b52c8d-cff2-48f0-9fe6-a9c90c88db6c.png)


### 3.2. Tạo một project 
Ở redmine, cung cấp cho bạn 1 trang để thực hiện việc kiểm thử API này. Link:    demo.redmine.org

Hãy vào đây thực hiện đăng ký các thông tin. Đây chính là màn hình của mình sau khi đã thực hiện thành công xong các thao tác. Việc thực hiện khá đơn giản.

![](https://images.viblo.asia/98c2b9a7-4692-4f82-9167-95f3bf9eb9e2.png)

### 3.3. Tạo request
Ở bên trên đã đăng nhập vào tài khoản trên trang demo của Redmine. Đăng nhập theo link này, Redmine sẽ hướng dẫn bạn chi tiết cách kiểm tra bằng API. 

Link: https://www.redmine.org/projects/redmine/wiki/Rest_Projects

3.3.1. Kiểm tra xem hiện tại có bao nhiêu project đã được tạo. Về phía Postman hãy thực hiện tạo request lấy dữ liệu về như sau: 

![](https://images.viblo.asia/09d880bc-f8bd-4c44-ac65-09e97e4be24d.png)

  + Tại góc bên trái tạo mới một request đặt tên với mục đích mà request này cần làm. 
  + Sang phần builder => Nhập phương thức, URL và Gửi request đi. Sau khi nhận được kết quả hãy kiểm tra các thông tin sau: 
    
    + Status: 200 OK là gửi request thành công 
    + Header: Tổng số project hiện tại đang có 
    + Body: Thông tin chi tiết về project