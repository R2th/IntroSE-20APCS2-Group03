Chào các bạn, bài viết này dành cho các bạn vẫn chưa hiểu chuyện gì sẽ xảy ra khi enter 1 URL ạ :D 
## 1. Tổng quan người dùng 
![image.png](https://images.viblo.asia/7447b645-1859-4f58-8a3f-2941b8aa5783.png)

## 2. Quá trình một phiên làm việc HTTP
![image.png](https://images.viblo.asia/692616b3-efcb-41ea-949e-890f96155ea8.png)

## 3. Tìm hiểu về HTTP Request (Client gửi)
![image.png](https://images.viblo.asia/6754b225-c61a-4d36-bbc0-ddb68db7d35c.png)

  **Gồm 3 phần chính: Request line, Header và Body**
  
**- Request line**: Method, Path, và HTTP version       

     + Method: Get, Post, Head, Put, Delete.
     + Path: hay còn gọi là URL hoặc URI
     + HTTP version: phiên bản HTTP Client đang sử dụng ( thường là HTTP/1.0 hoặc HTTP/1.1)
     
**- Header**: phần này ko bắt buộc: 
  + Client có thể gửi thêm thông tin bổ sung về HTTP request. Một số Header thông dụng: 
           Accept: loại nội dung có thể nhận được từ thông điệp response. Ví dụ: text/plain, text/html
           Accept-Encoding: các kiểu nén được chấp nhận. Ví dụ: gzip, deflate, xz, exi…
           Connection: tùy chọn điều khiển cho kết nối hiện thời. Ví dụ: Keep-Alive, Close…
           Cookie: thông tin HTTP Cookie từ server

**- Body**: dữ liệu gửi từ Client đến Server. 

Sử dụng phương thức GET gửi dữ liệu đến server sử dụng chuỗi truy vấn (query string):
- Thông thường client sẽ không đóng gói dữ liệu trong Body mà sẽ được gửi thẳng ở dòng Header line phía sau trường path theo định dạng các tham số dạng “key=value” như sau: 
  Với : HTTP/1.1

               GET /path?key1=value1&key2=value2&…&keyn=valuen 

## 4. Tìm hiểu về HTTP Reponse (Server trả về cho CLient)
![image.png](https://images.viblo.asia/aed329da-9707-495f-afd0-e628da01d8f1.png)

**Gồm 3 phần chính: Status line, Header và Body**

**- Status line**:       
    + Phiên bản giao thức (HTTP version): phiên bản của giao thức HTTP mà server hỗ trợ, thường là HTTP/1.0 hoặc HTTP/1.1
    + Mã trạng thái (Status code): mô tả trạng thái kết nối dưới dạng số, mỗi trạng thái sẽ được biểu thị bởi một số nguyên. Ví dụ: 200, 404, 302,…
    + Mô tả trạng thái (Status text): mô tả trạng thái kết nối dưới dạng văn bản một cách ngắn gọn, giúp người dùng dễ hiểu hơn so với mã trạng thái. Ví du: 200 OK, 404 Not Found, 403 Forbiden,…
    
**-  Header line** của gói tin response có chức năng tương tự như gói tin request, giúp server có thể truyền thêm các thông tin bổ sung đến client dưới dạng các cặp “Name:Value”.

**- Body** là nơi đóng gói dữ liệu để trả về cho client, thông thường trong duyệt web thì dữ liệu trả về sẽ ở dưới dạng một trang HTML để trình duyệt có thể thông dịch được và hiển thị ra cho người dùng.