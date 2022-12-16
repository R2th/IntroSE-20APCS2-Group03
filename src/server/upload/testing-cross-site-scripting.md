Nguồn dịch : https://www.tutorialspoint.com/security_testing/testing_cross_site_scripting.htm
Cross-site Scripting (XSS) xảy ra bất cứ khi nào một ứng dụng lấy những dữ liệu không đáng tin cậy và gửi nó đến client (browser) mà không kiểm tra hay xác thực. Điều này cho phép những kẻ tấn công có cơ hội thực thi các mã lệnh độc hại trong trình duyệt, dẫn đến người dùng có thể bị chiếm quyền điều khiển, website bị phá hoại hoặc chuyển hướng đến các trang web độc hại.
Chúng ta hãy cùng tìm hiểu vể Threat Agents, Attack Vectors, Security Weakness, Technical Impact và Business Impacts : 

![](https://www.tutorialspoint.com/security_testing/images/xss.jpg)

### Các loại XSS

Stored XSS -  còn được gọi là persistent XSS,  xảy ra khi những input của người dùng được lưu trữ trên server, chẳng hạn như database/message forum/comment ... Khi đó, người dùng có thể bị truy xuất những dữ liệu đó từ các ứng dụng web.

Reflected XSS - còn được gọi là non-persistent XSS, xảy ra khi những input của người dùng được trả về ngay lập tức trong kết quả tìm kiếm hay thông báo lỗi, hoặc khi input của người dùng là một phần của request và không được lưu trữ vĩnh viễn.

DOM Based XSS - XSS dựa trên DOM là một dạng XSS khi Source dữ liệu nằm trong DOM, Sink cũng nằm trong DOM và luồng dữ liệu không bao giờ rời khỏi trình duyệt.
### Example

Ứng dụng sử dụng dữ liệu không đáng tin cậy không cần validation. Các ký tự đặc biệt nên được loại bỏ.

`http://www.webpage.org/task/Rule1?query=try`

Kẻ tấn công sẽ chỉnh sửa query param thành : 

`http://www.webpage.org/task/Rule1?query=<h3>Hello from XSS"</h3>`

**Step 1**
Login vào Webgoat and điều hướng đến phần cross-site scripting (XSS). Chúng ta hãy thực hiện một Stored XSS attack. Bên dưới là snapshot của kịch bản test:


![](https://www.tutorialspoint.com/security_testing/images/xss1.jpg)

**Step 2**
Theo như kịch bản, chúng ta sẽ login với tài khoản Tom và password 'tom'. Click 'view profile' và đi tới edit mode. Khi tom là một kẻ tấn công, chúng ra hãy inject Java Script vào trong những edit boxes.
```
<script> 
   alert("HACKED")
</script> 
```

![](https://www.tutorialspoint.com/security_testing/images/xss2.jpg)

**Step 3**
Ngay khi update xong, tom nhận được một dialog thông báo với nội dung 'hacked', có nghĩa là ứng dụng có thể bị tấn công

![](https://www.tutorialspoint.com/security_testing/images/xss3.jpg)

**Step 4**
Bây giờ, với mỗi kịch bản, chúng ra cần login bằng tài khoản Jerry(HR) và kiểm tra xem jerry có bị ảnh hưởng bởi injected script hay không

![](https://www.tutorialspoint.com/security_testing/images/xss4.jpg)


**Step 5**
Sau khi login với tài khoản Jerry, chọn 'Tom' và click 'view profile' như bên dưới:

![](https://www.tutorialspoint.com/security_testing/images/xss5.jpg)

Khi xem thông tin của Tom từ tài khoản của Jerry, anh ta có thể gặp messge 'HACKED' như của Tom

![](https://www.tutorialspoint.com/security_testing/images/xss6.jpg)

**Step 6**
Message box này chỉ là một ví dụ, nhưng những kẻ tấn công thực tế có thể làm nhiều hơn thế, không chỉ là hiển thị một message box đơn giản

### Preventive Mechanisms
Các developers phải chắc chắn rằng họ đã loại bỏ tất cả những dữ liệu không đáng tin cậy ở trong HTML, chẳng hạn ở trong body, attribute, JavaScript, CSS, hay URL, nơi mà các dữ liệu được đặt vào trong đó.
Đối với các ứng dụng cần các ký tự đặc biệt ở trong các input, chúng cần có một cơ chế validation trước khi chúng được chấp nhận là input hợp lệ.