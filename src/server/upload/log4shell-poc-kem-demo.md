![image.png](https://images.viblo.asia/299e1811-52fa-4a79-9ad1-ecea4da207e8.png)

Có lẽ Log4Shell đã được công bố được một khoảng thời gian khá lâu rồi, nhưng hiện tại mức độ ảnh hưởng của nó vẫn không thể phủ nhận nên hãy theo chân mình để tìm hiểu tất tần tật về nó nhé.

## **1. Log4Shell là gì?**
* Log4Shell (LogJam) là lỗ hổng bảo mật ảnh hưởng đến Apache Log4j, thuộc RCE class vulnerability.
* Lỗ hổng này cho phép kẻ tấn công có thể kiểm soát log messenges qua đó thực thi mã tùy ý được tải từ máy chủ do kẻ tấn công kiểm soát.

## **2. Log4Shell xảy ra ở đâu?**
* Log4Shell xảy ra ở những ứng dụng sử dụng thư viện Apache Log4j từ phiên bản 2.0 đến 2.14.1
* Apache Log4j là một phần của Apache Logging Project. Nó là 1 công cụ ghi nhật kí dựa trên Java.
* Hầu hết các ứng dụng được viết bằng Java đều sử dụng nó và đều có thể mắc lỗ hổng này.
* Nhiều công ty phần mềm lớn và dịch vụ trực tuyến sử dụng Log4j bao gồm Amazon, Apple, Twitter, Tesla, Steam, …  đều không thể tránh khỏi.

## **3. Log4Shell xảy ra thế nào?**
* Log4Shell xảy ra từ khi phiên bản Log4j 2.0 đã thêm các lookups,  bao gồm cả JNDI lookups.
* JAVA Naming and Directory Interface (JNDI) là một Java API cho một Directory Service cho phép giao tiếp với LDAP hoặc DNS để tìm kiếm các data và resources.
* LDAP (Lightweight Directory Access Protocol) là một giao thức dạng client-server sử dụng để truy cập một Directory Service.
* Một trong những kiểu dữ liệu trả về ấy có thể là URI trỏ đến 1 class java độc hại mà kẻ tấn công có thể tùy ý sửa đổi và thực thi.

## **4. Khai thác (POC)**
* Giả sử 1 ứng dụng ghi nhật kí thông tin HTTP, cụ thể ở đây là User-Agent:
![image.png](https://images.viblo.asia/9a745a36-cfbc-4ffa-b9ec-abaaf04cdfa9.png)

* Kẻ tấn công có thể thực hiện một cuộc tấn công như sau:
![image.png](https://images.viblo.asia/d48629d6-4045-490a-a2e1-ae6098099e7f.png)

* Kẻ tấn công sẽ tạo 1 jndi đưa nó vào User-Agent
* Bây giờ Log4j sẽ thực hiện 1 truy vấn LDAP tới URI được bao gồm. LDAP server sau đó sẽ phản hồi với thông tin thư mục trong liên kết
* Các giá trị **javaFactory**, **javaCodeBase** giống như địa chỉ để Log4j xác định vị trí chứa class java khai thác.

![image.png](https://images.viblo.asia/2ffa10d2-068e-471f-b4ab-1fc278ea8d2d.png)

* Cuối cùng class Java được tải vào bộ nhớ và được thực thi bởi Log4j.

## **5. Demo rce tạo file trong thư mục tmp**
* Tạo class Java để exploit thử với cmd tạo file mới trong thư mục tmp
![image.png](https://images.viblo.asia/c953676c-68f8-4778-9276-b910aa289f39.png)

* Kiểm tra thư mục tmp hoàn toàn chưa có file pwned
![image.png](https://images.viblo.asia/8d5a69cf-6126-484b-970e-35bd2346255b.png)

* Tạo web server với python3
![image.png](https://images.viblo.asia/5e964959-8d22-4837-9a0e-7e9017f38308.png)

* Khởi chạy LDAP server thực hiện trả về tham chiếu jndi
![image.png](https://images.viblo.asia/81b8a77b-801d-4282-bd05-a3ac49c72df5.png)

* Giả lập cuộc tấn công Log4j trên một java web server
  * Cấu hình server sử dụng log4j chứa lỗ hổng (ở đây mình cấu hình mặc định rằng server đã ghi lại payload của attacker)
![image.png](https://images.viblo.asia/4783cd09-b8ac-4085-a2f4-eaa8fdf07e99.png)

  * Chạy file
![image.png](https://images.viblo.asia/859db1a2-1a82-498d-80ff-970dd69d6deb.png)

* Kết quả
  * LDAP server
![image.png](https://images.viblo.asia/ad07da44-5bd1-4a3e-aba3-595e9c9e0ffb.png)

  * Web server
![image.png](https://images.viblo.asia/a78b41dd-ed55-4b20-836c-afb3b6454816.png)

  * Và file pwned đã được tạo ra, cho thấy class java đã được thực thi
![image.png](https://images.viblo.asia/d6a96aa5-b482-4dc2-ab2e-8fd6dacac244.png)

* Điều này mở ra cách khai thác không giới hạn của một cuộc tấn công RCE mang lại hậu quả vô cùng nghiêm trọng

## **6. Phòng chống**
* Cách tốt nhất để vá lỗ hổng này là update log4j lên phiên bản mới nhất.

![image.png](https://images.viblo.asia/737c2f62-c74d-4f4f-8425-6a353e9a1270.png)