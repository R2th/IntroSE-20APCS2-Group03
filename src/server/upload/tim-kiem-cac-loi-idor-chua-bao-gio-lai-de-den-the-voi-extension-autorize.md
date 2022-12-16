Chắc hẳn việc tìm lỗi IDOR luôn là công việc thường xuyên của những pentester hay các hunters. Nhưng mà lỗi IDOR ở đây là gì nhỉ :-?
## What is an IDOR vulnerability?
Vào một ngày đẹp trời, bạn tự nhiên thấy dữ liệu cá nhân của mình bị thay đổi. Bạn nghi ngờ quản trị viên nào đã chọc ngoáy vào dữ liệu cá nhân của mình. Hay là 1 hacker nào đấy đang thử chức năng =)). Rất có thể website đó đã dính lỗi IDOR. Vậy lỗi IDOR là gì và nó hoạt động như thế nào.

![](https://images.viblo.asia/cdb658d3-7e5a-4b0f-947b-c7142a8d1c22.png)

**IDOR** (INSECURE DIRECT OBJECT REFERENCE) là một lỗ hổng bảo mật mà trong đó người dùng có thể truy cập và thay đổi dữ liệu của bất kỳ người dùng nào khác có trong hệ thống. Nó được xếp thứ 4 trong danh sách OWASP Top 10 lỗ hổng bảo mật web từ năm 2013. Tấn công này có thể xảy ra khi không có bất kỳ cơ chế xác thực nào cho phép attacker có thể sử dụng các tham chiếu này để đọc, thay đổi hay sử dụng dữ liệu trái phép.

Ví dụ: Website của bạn có chức năng xem thông tin người dùng qua định danh ID

Request: 
```
GET /account/123 HTTP 1.1
Host: example.com
Cookie: ...
```

Response:
```
{id: 123, username: MinhTuan, Address: 13F Keangnam, ... }
```

Đây là những dữ liệu cá nhân mà thông thường chỉ có tài khoản của người dùng đó mới có thể xem được. Nhưng Attacker có thể thay đổi giá trị `id` để có thể xem được thông tin của người dùng khác.
```
GET /account/124 HTTP 1.1
Host: example.com
```

Response:
```
{id: 124, username: Nghia, Address: Trieu Khuc, ... }
```

Hay cả đối với chức năng thêm, sửa, xóa thông tin mà người dùng này có thể thực hiện được đối với tài khoản người dùng khác thì cũng gọi là lỗi IDOR.
## How to test IDOR vulnerability
Để kiểm tra lỗi IDOR trên 1 website, ta sử dụng 2 tài khoản khác nhau, đăng nhập 2 tài khoản trên 2 trình duyệt khác nhau. Rồi sử dụng các chức năng của tài khoản này, thử thay đổi các param truyền vào nhưng lại ứng với tài khoản kia xem có được không. 

Thông thường đối với mình thì mình bắt các request của 1 tài khoản qua BurpSuite, sau đó chuyển request đó sang tab Repeater. Thử thay đổi các giá trị truyền vào, các param trên URL ứng với tài khoản thứ 2 kia. Kiểm tra response trả về và sang tài khoản 2 kiểm tra xem có dữ liệu nào bị thay đổi hay không. Công việc này khá mất thời gian. Nếu 1 website mà có nhiều chức năng thì đối với 1 pentester phải test hết toàn bộ để tránh "lọt lưới" =)). 

Để giảm thiểu thời gian test IDOR, mình cần các công cụ để có thể test nhanh hơn, đỡ mất thời gian vào việc này hơn. Gần đây mình cũng đang sử dụng 1 vài extension của Burp khá hay để test lỗi IDOR.
### Autorize
Bạn có thể cài đặt Autorize từ BApp Store trong Burp. 
![](https://images.viblo.asia/0b167c6c-60dd-450f-a205-8302488490d6.png)

Để biết thêm về các option khác trong extension này, bạn có thể vào trang chủ cập nhật thêm [Autorize](https://github.com/Quitten/Autorize?source=post_page-----2b3dbe9fa0b8----------------------)

Automation - Đối với mỗi Request bạn thực hiện, extension này sẽ thực hiện thêm 2 request nữa, 1 là có sử dụng Cookie của tài khoản thứ 2 mà bạn config, 2 là request không sử dụng Cookie, tức là người dùng chưa thực hiện đăng nhập.

Ta có thể sử dụng 2 tài khoản: 
Người dùng A: Quản trị viên
Người dùng B: Người dùng bình thường

Duyệt ứng dụng web với người dùng A và thêm cookie của người dùng B trong chế độ tự động của Autorize.
![](https://images.viblo.asia/f9394d44-d69a-4cac-b581-b2f9f794a753.png)
> Autorize update thêm tính năng Fetch Authorization header, các bạn có thể kiểm tra xem website của mình đang sử dụng loại xác thực nào mà có thể sử dụng chức năng tương ứng nhé
> ![image.png](https://images.viblo.asia/98e4eb65-bf01-4feb-8f61-c35b33ddd0cc.png)

Chúng ta có thể thêm bộ filter để mình có thể nhận được các kết quả mong muốn, tránh các kết quả rác và ảnh hưởng đến thông tin mình nhận được.

Nhấp vào nút Autorize in on để extension hoạt động, và bắt đầu duyệt web bình thường với tư cách quản trị viên (người dùng A).

![](https://images.viblo.asia/e152229c-54ee-4c32-a2f9-0d18b79a24a3.png)

Như hình trên, bạn có thể thấy được độ dài của response trả về của người dùng A và người dùng B là bằng nhau. Rất có thể ở đây dính lỗi IDOR, bạn nên kiểm tra lại 1 lần nữa cho chắc. Còn nếu mã lỗi trả về của người dùng B là 403 thì lỗi về IDOR là không có. 

> Chỉ cần duyệt website và thử các chức năng đặc quyền của quản trị viên và người dùng thông thường. Nếu request của người dùng thông thường mà trả về 200 ứng với chức năng của quản trị viên thì bạn cần phải kiểm tra lại ngay. Rất có thể đấy chính là lỗi IDOR. Tương tự đối với các chức năng của người dùng thông thường với nhau. Xem rằng người này có thể cập nhật hay xóa thông tin của người kia đi hay không.

> Rất nhiều tính năng khác đang chờ bạn khám phá với extension này. Việc sử dụng nó giúp mình đỡ rất nhiều thời gian và công sức khi kiểm tra các lỗi IDOR, và nó có thể bao quát hết các khả năng mà mình có thể bỏ qua.

## Reference
- https://medium.com/cyberverse/automating-burp-to-find-idors-2b3dbe9fa0b8
- https://blog.detectify.com/2016/05/25/owasp-top-10-insecure-direct-object-reference-4/
- https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/