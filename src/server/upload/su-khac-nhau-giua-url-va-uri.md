# What is the URL?
URL (Uniform Resource Locator) là địa chỉ chung của các documents và giao thức để truy xuất tài nguyên trên mạng máy tính. URL xảy ra thường xuyên nhất khi tham chiếu đến các trang web (HTTP) nhưng cũng có thể được sử dụng để truy cập cơ sở dữ liệu bằng JDBC, email (mailto), truyền tệp (FTP) và nhiều ứng dụng khác.
# Syntax of URL
**http://www.domainname.com/folder-name/web-page-file-name.htm**

Chúng ta có thể chia URL trên thành nhiều phần:
* **Protocol**: Nó là phần đầu tiên của URL. Ở đây, tên giao thức là Hypertext Transfer Protocol (HTTP). 
* **http://www.domainname.com/**: Nó là tên miền của bạn. Nó còn được gọi là id máy chủ hoặc host.
* **/folder-name/**: Nó chỉ ra rằng trang web được tham chiếu trong một thư mục nhất định trên máy chủ web.
* **web-page-file-name.htm**: Nó là một tên tệp trang web. ".Htm" là extension cho tệp HTML, cho thấy rằng nó là một trang web tĩnh. Tên tệp có thể có các phần mở rộng khác nhau hoặc tùy thuộc vào cách bạn thiết lập máy chủ web. Không thể có phần mở rộng nào cả và URL có thể kết thúc bằng một dòng gạch chéo (/).

Ví dụ URL có folder nhưng không có extension
https://sun-asterisk.vn/recruitment/ruby-engineer/

Ví dụ URL không có folder
https://vnexpress.net/covid-19-ngay-21-8-4344309.html

Ví dụ URL không có extension
https://viblo.asia/posts/djeZ1jb55RlWz/edit
# What is URI?
URI (Uniform Resource Identifier) là một chuỗi chứa các ký tự xác định một tài nguyên vật lý hoặc logic. URI tuân theo các quy tắc cú pháp để đảm bảo tính đồng nhất. Hơn nữa, nó cũng duy trì khả năng mở rộng thông qua một lược đồ đặt tên phân cấp.
![image.png](https://images.viblo.asia/fe56dc7d-ee5d-4d62-bdf6-2cefe493a001.png)
Có 2 loại URI:
1. URL: URL chỉ định một vị trí trên mạng máy tính và kỹ thuật để truy xuất nó. 
1. URN: (Uniform Resource Name) là một tài nguyên internet chỉ định lược đồ URN.
# Syntax of URI
**URI = scheme:[//authority]path[?query][#fragment]**

URI bao gồm các phần:
* **Scheme component**: Nó là một thành phần trống, theo sau là dấu hai chấm (:). Scheme chứa một chuỗi các ký tự bắt đầu bằng một chữ cái và theo sau là bất kỳ sự kết hợp nào của chữ số, chữ cái, dấu chấm (.), Dấu gạch ngang (-) hoặc dấu cộng (+).
Ví dụ về các scheme nổi tiếng bao gồm HTTP, HTTPS, mailto, tệp, FTP, v.v. Các scheme URI phải được đăng ký với Cơ quan cấp số được ấn định trên Internet (IANA).
* **Authority component**: Nó là một trường tùy chọn và đứng trước //. 
* **Path**: Đường dẫn chứa một chuỗi các phân đoạn được phân tách bằng dấu gạch chéo.
* **Query component**: Nó là tùy chọn và đặt trước dấu chấm hỏi (?). Thành phần truy vấn chứa một chuỗi truy vấn dữ liệu không phân cấp.
* **Fragment component**: Nó là một trường tùy chọn và được đặt trước bởi một dấu thăng (#). Thành phần phân mảnh bao gồm một mã định danh phân mảnh đưa ra hướng cho tài nguyên thứ cấp.

Ví dụ URI không có protocol
www.sun-asterisk.vn

Ví dụ URI có protocol
```
ldap://[2001:db8::7]/c=GB?objectClass?one
mailto:abc@example.com 
tel:+1-816-555-1212   
telnet://192.0.2.16:80/ 
```

# Ven Diagram of URIs and URL
![image.png](https://images.viblo.asia/38176821-d763-4d59-b099-df35b14fa24b.png)
# URL vs URI


| URL | URI |
| -------- | -------- |
| URL là viết tắt của Uniform Resource Locator.     | URI là viết tắt của Uniform Resource Identity.     |
| URL là một tập hợp con của URI chỉ định nơi tài nguyên tồn tại và cơ chế để truy xuất tài nguyên đó.     | URI là một tập hợp siêu URL xác định tài nguyên bằng URL hoặc URN (Tên tài nguyên thống nhất) hoặc cả hai.     |
| Mục đích chính là lấy vị trí hoặc địa chỉ của tài nguyên.     | Mục đích chính của URI là tìm một tài nguyên và phân biệt nó với các tài nguyên khác bằng cách sử dụng tên hoặc vị trí.     |
| URL chỉ được sử dụng để định vị các trang web | Được sử dụng trong HTML, XML và các tệp khác XSLT (Extensible Stylesheet Language Transformations) và hơn thế nữa. |
| Lược đồ phải là một giao thức như HTTP, FTP, HTTPS, v.v. | Trong URI, lược đồ có thể là bất kỳ thứ gì như giao thức, đặc tả, tên, v.v. |
| Thông tin giao thức được cung cấp trong URL. | Không có thông tin giao thức được cung cấp trong URI. |
| Ví dụ về URL: https://google.com | Ví dụ về URI: urn: isbn: 0-486-27557-4 |
| Nó chứa các thành phần như giao thức, miền, đường dẫn, hash, chuỗi truy vấn, v.v. | Nó chứa các thành phần như lược đồ, quyền hạn, đường dẫn, truy vấn, thành phần phân mảnh, v.v. |
| Tất cả các URL có thể là URI | Không phải tất cả các URI đều là URL vì URI có thể là một name thay vì một locator. |