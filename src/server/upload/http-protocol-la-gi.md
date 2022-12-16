- Http Protocol  là gì? Hôm nay chúng ta sẽ đi tìm hiểu. Mình sẽ ko nói lý thuyết siêu văn bản bla bla gì đâu ạ =)). Nay chúng ta tạm quên nó đi. Đọc xong cũng ko hiểu gì đâu ạ. Các bạn cứ đọc bài mình là hiểu là gì ngay thui (lol)
- Phương thức http là cách thức mà website truyền tải qua internet
- Ví dụ bạn mở tab trên trình duyệt và gõ viblo.asia xong ấn enter thì bạn thấy nó show ra trang website cho bạn gồm text và hình ảnh. Như hình ảnh dưới đây
  ![](https://images.viblo.asia/734a37b9-af6d-484b-9950-8e6d1d86331d.png)
    - Nhưng bạn không biết khi bạn gõ vào trình duyệt và ấn enter. Đầu tiên là trình duyệt của bạn sẽ gửi đi một yêu cầu lên máy chủ
    -  Những hình ảnh và text bạn thấy ở website nó được lưu ở ổ cứng trên máy chủ. Khi yêu cầu được gửi lên máy chủ sẽ dựa vào yêu cầu và trả ra mã html. Bạn ấn chuột pải vào viewsource, đó là cái máy chủ trả về cho chúng ta

    ![](https://images.viblo.asia/3d832353-9f8f-41ad-b987-ef99947ec347.png)
    
    - Trình duyệt sẽ đọc mã source code kiểu như compile và trả về cho chúng ta những text và hình ảnh website của trang viblo.asia
    - Các bạn cứ hiểu như là khi các bạn gửi yêu cầu thì máy chủ sẽ vào kho dữ liệu lưu trữ lấy dữ liệu và trả ra dữ liệu mà chúng ta đang cần.
    - Để hiểu rõ hơn bạn ấn chuột phải inspect 
    
        ![](https://images.viblo.asia/5e2facfc-53ce-4692-ae19-58cda7289ab3.png)
        
- Và ấn vào tab network. Sau đó bạn ấn reload lại page. Bạn sẽ thấy rất nhiều request được gửi đi 
- 
![](https://images.viblo.asia/a8aff80c-8cc1-42f7-a8e5-cc49c3877106.png)

        
- Bạn chú ý đến cái request này và ấn vào đó. Để tìm hiểu xem khi ta gửi 1 yêu cầu thì nó sẽ xử lý ra sao và trả về thế nào nhé

![](https://images.viblo.asia/8dbdcf4d-add6-4c18-bb88-daa7f53043af.png)

**General** : bạn thấy ở cái tab đầu tiên là những thông tin cơ bản 

- Request Url : https://viblo.asia/followings cái này là yêu cầu mình vừa gửi ( chính là cái chúng ta gõ)
- Request Method: GET . Phương thức yêu cầu. ở đây bạn hiểu phương thức GET là phương thức lấy dữ liệu
- Status Code:  cái này là thể hiện cho việc lấy dữ liệu của các bạn là thành công hay thất bại. ở đây đầu 200 là thành công
- Remote Address: [2606:4700:3032::ac43:bc9e]:443 cái này là địa chỉ máy chủ của bạn đang được đặt ở trên server 
- .....
 
**Response header**: cái này chỉ hiện khi yêu cầu của bạn dc server trả về dữ liệu thì cái Response header mới có thông tin. 
- Các bạn chú ý đến Response header có dữ liêụ trả về thì tab Response cũng có dữ liệu trả về dạng raw data như hình ảnh dưới đây.
-  Trình duyệt sẽ dựa vào đoạn dữ liệu trả về và đọc nó và render ra giao diện website của chúng ta

![](https://images.viblo.asia/7c7e85e5-3c8e-4d64-85c9-d7fe0c30ef37.png)


**Request header**: cái này là thông tin của yêu cầu gửi đi( Ở đây các bạn hiểu là Headers định nghĩa các tham số dùng cho yêu cầu hoặc đưa ra các thông tin quan trọng trong việc giúp client tạo yêu cầu)

### Request Method 
- Phương thức yêu cầu, một số phương thức yêu cầu.
    - GET: Phương thức này để lấy dữ liệu
    - HEAD: Tương tự như GET, nhưng dữ liệu được truyền tải ở Header.
    - POST: Phương thức gửi dữ liệu lên server. Cái này sử dụng khi các bạn làm các form đăng ký, đăng nhập, thêm sản phẩm ....
    - PUT: Phương thức này để bạn thay đổi dữ liệu.
    - DELETE: Phương thức này để xoá bỏ dữ liệu 

### HTTP Response
- Khi các bạn gửi request lên server thì server sẽ trả về response cho bạn và trình duyệt sẽ phiên dịch nó ra cho các bạn. Dữ liệu trả về cho bạn chỉ là 1 văn bản thuần tuý
ví dụ 1 đoạn dữ liệu được trả về
```
HTTP/1.1 200 OK   =>>> nói về giao thức của chúng ta http, version bao nhiêu. mã phản hồi ở đây là 200 là trả về dữ liệu thành công. và cuối là dạng text 'ok' nghĩa là thành công 
// đoạn này là header
Date: Mon, ngày 23 tháng 5 năm 2005 22:38:34 GMT  
Content-Type: text/html; charset=UTF-8
Content-Encoding: UTF-8
Content-Length: 138
Last-Modified: Wed, 08 Jan 2003 23:11:55 GMT
Server: Apache/1.3.3.7 (Unix) (Red-Hat/Linux)
ETag: "3f80f-1b6-3e1cb03b"
Accept-Ranges: bytes
Connection: close

// đoạn này là phần boby mà trình duyệt sẽ render ra website cho chúng ta
<html>
<head>
  <title>An Example Page</title>
</head>
<body>
  Hello World, this is a very simple HTML document.
</body>
</html>
```

###  HTTP Status Code
- Cái này là mã phản hồi khi nhận dc yêu cầu
- Ở đây mình có các mã phản hồi
    - 1XX: đây là mã phản hồi thông tin. Có nghĩa là server sẽ trả ra cho bạn thông tin để nói cho bạn biết là server có gì đó đang xảy ra
    - 2XX: đây là mã phản hồi thành công.
    - 3XX: Sự điều hướng lại ( Sự chuyển hướng, cache)
    - 4XX: đây là mã phản hồi lỗi về phía client. - Các bạn có thấy khi các bạn gõ link , Thỉnh thoảng sẽ thấy lỗi 400 ở đây có nghĩa là đường link sai, có nghĩa là chúng ta đã gõ link sai. 
    - 5XX : đây là mã phản hồi lỗi về phía server - Các bạn thấy lỗi này có nghĩa là thằng server trang bạn mún truy cập nó đang lỗi. 

   

###  kết luận
- Mình đã giới thiệu sơ qua về http protocol để tìm hiểu kĩ hơn các bạn có thể đọc ở những trang này 
 + https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
 + https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
- Bài viết có gì ko đúng hoặc ko hiểu các bạn có thể comment ở dưới bài viết. Cảm ơn đã đọc bài viết của mình