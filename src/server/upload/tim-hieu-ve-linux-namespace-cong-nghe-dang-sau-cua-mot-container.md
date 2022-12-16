Để thực hiện được một hệ thống chấm thi đòi hỏi hệ thống đó phải có khả năng chạy các bài thi lập trình khi được gửi lên và cho ra kết quả để so sánh với đáp án. Tuy nhiên để xây dựng được một hệ thống như vậy thì lại không hề đơn giản, trong đó vấn đề quan trọng và cấp thiết hơn cả là tính bảo mật của hệ thống khi chạy một chương trình từ một nguồn không tin cậy. Giả sử người dùng gửi một đoạn code thực thi một câu lệnh hệ thống như `rm -rf /*` và server thực thi đoạn chương trình đó thì điều gì sẽ sảy ra, hay khi hacker gửi một đoạn code có chứa tấn công DDOS vào một máy chủ khác, đoạn code này được thực thi ngay chính trên máy chấm, khi đó máy chấm đã biến thành một thành phần trong mạng lưới botnet, đây chính là vấn đề đầu tiên cũng là vấn đề trọng tâm mình muốn nói đến trong bài này.
### Một số hệ thống chấm thi lập trình trực tuyến phổ biến
Một số hệ thống chấm thi lập trình trực tuyến phổ biến hiện nay có thể kể đến như SPOJ, DOMjudge, CodeChef, Codewars, Viblo Code,...<br>
Trong mục này mình sẽ tập trung chủ yếu vào VibloCode nhé.<br>
Trước đây đã có những suy đoán rằng Viblo Code sử dụng docker để chạy các đoạn chương trình mà client gửi lên, mình có đọc và thấy rất hay các bạn có thể xem qua ở đây ([Hệ thống Viblo Code Challenge được xây dựng như thế nào](https://viblo.asia/p/he-thong-viblo-code-challenge-duoc-xay-dung-nhu-the-nao-WAyK8d39KxX)), tuy nhiên đó cũng chỉ là suy đoán, để thêm phần chắc chắc thì cùng nghịch thử viblo code một chút nhé !!!<br>
Trong một bài thi trên Viblo Code, không chỉ cung cấp cho user các testcase trong hệ thống mà Viblo Code còn cung cấp cho người dùng chắc năng custom testcase
![](https://images.viblo.asia/4ffcd727-fce4-4dd1-a788-575735d9a275.png)
Lợi dùng điểm này chúng ta mày mò thêm chút để xem có gì khai thác được không nhé.


-----
Bắt đầu nào, ở đây mình sử dụng ngôn ngữ ruby nhé  :v: 
Thử list ra các file trên server xem thế nào
![](https://images.viblo.asia/5f426283-3bc6-449a-9c1c-80c733f5ccd5.png)<br>
Chạy thử với custom input tùy ý ta được:
![](https://images.viblo.asia/d9d3ad44-0ffb-4800-b420-680cc44f40c1.png)<br>
Ố ồ, vậy là output đang có thể xem được list các file trên server rồi này =))<br>
Thử xem mình đang đứng ở thư mục nào trong hệ thống nhé.
![](https://images.viblo.asia/ffb1e643-0656-4233-9dd7-6a36ee1ece6e.png)
![](https://images.viblo.asia/b3df5970-c373-4432-85d5-70cbaf194b4f.png)<br>
Vậy là mình đang ở thư mục `runner` có thể suy đoán rằng code của mình đẩy lên được lưu vào file `main` trong thư mục `runner` trên hệ thống. 
Bây giờ thử back ra một thư mục xem sao nè.
![](https://images.viblo.asia/a56b1ae7-9d38-4be3-934f-2a6facfc17ec.png)
![](https://images.viblo.asia/7b150ce3-12cf-45ca-b894-ba46e056ae01.png)

Sau khi back ra một thư mục thì chúng ta thu được danh sách các file như hình trên, ở đây ta chú ý đến file `.dockerenv` và file `entrypoint.sh` nhé.<br>
Thử đọc file `.dockerenv` xem có thu được gì không.
![](https://images.viblo.asia/8361349e-2baf-4616-b356-3975b562aa30.png)
![](https://images.viblo.asia/938106c4-8969-4f61-86aa-cc29c35d80f0.png)<br>
Đương nhiên là phải không đọc được gì rồi. Mình cũng không bất ngờ lắm, đọc được biến môi trường có mà chết :)<br>
Tiếp theo kiểm tra nội dung của file `entrypoint.sh`
![](https://images.viblo.asia/5beffb85-2876-42e8-b1f8-bca9aad3834f.png)
![](https://images.viblo.asia/39c21294-07d2-4659-838c-b743107921ea.png)<br>
Lần này thì đọc được rồi nhé. Nội dung của file này có thể hiểu đơn giản là chạy file mã nguồn `main` với ngôn ngữ ruby và đầu vào là file `/tests.json`. Mạnh dạn đoán file `tests.json` này sẽ chứa dữ liệu đầu vào và dữ liệu đầu ra mong muốn ứng với đề bài.<br>
Vậy thì cái `runner` kia là gì vậy, tò mò ghê, kiểm tra thử một chút.
![](https://images.viblo.asia/49ba3afa-175e-41eb-987e-597cdc41f915.png)
![](https://images.viblo.asia/215a76d8-196f-4ea1-9722-0743d6c06870.png)<br>
Có vẻ như `runner` là một thư viện được phát triển riêng và tích hợp sẵn bởi nhà phát triển. Ngịch thêm một chút nữa xem có thể đọc được mã nguồn hay không =)).
![](https://images.viblo.asia/0be927ef-18bc-4976-9c8a-96c9a32fdecd.png)
![](https://images.viblo.asia/16daa4ae-247d-40e3-ab5e-5141b0d0dfb2.png)<br>
:( có vẻ như đã được chuyển thành file binary rồi, với kiến thức hạn hẹp của mình thì chịu, không đọc được. Dừng lại ở chỗ này thôi, như vậy là quá đủ để kết luận rồi.

-----
Đọc đến đây thì có thể chắc chắn rằng hệ thống viblocode đang sử dụng docker để chạy các bài giải mà người dùng gửi lên. Như vậy thì suy đoán của bài viết [Hệ thống Viblo Code Challenge được xây dựng như thế nào](https://viblo.asia/p/he-thong-viblo-code-challenge-duoc-xay-dung-nhu-the-nao-WAyK8d39KxX) là hoàn toàn chính xác.

### Tìm hiểu về Linux Namespace
Từ ví dụ ở trên chúng ta có thể thấy container của docker đã chạy được một cách an toàn các chương trình không tin cậy từ user. Vậy công nghệ đằng sau để đạt được điều đó của docker thực sự là gì liệu có phải là ảo hóa =)).<br>
Hãy khoan nói về ảo hóa, trong bài viết này chúng ta sẽ tìm hiểu về cái trước cả ảo hóa đã nhé.<br>
<br>
##### Khái niệm
Linux namespaces là một công nghệ cở bản ở phía sau hấu hết các hệ thống triển khai Container hiện đại. 
Ở một mức cao hơn, linux namespaces cho phép chúng ta cách ly tài nguyên hệ thống giữa các tiến trình một cách độc lập. Ví dụ PID namespace cô lập không gian số PID của tiến trình. Điều này có nghĩa là hai tiến trình đang chạy trên cùng một máy chủ có thể có cùng một PID<br>
<br>
##### Chức năng
Sự cô lập rõ ràng rất hữu ích trong mạng lưới container. Nếu không có namespaces, một tiến trình chạy trong container A, có thể tác động đến một tập tin hệ thống trong container B, hoặc có thể thay đổi tên máy chủ của container C, hoặc có thể xóa đi network interface của container D. Bằng cách đặt tên cho các loại tài nguyên này, tiến trình trong container A không thể biết được rằng các tiến trình trong container B, C và D đang tồn tại. Lúc này tiến trình trong container A không thể can thiệp được vào tiến trình trong container B, C, D vì các tiến trình trong B, C, D không được hiển thị so với A. Đây chính là cách mà Linux namespaces cách li một tiến trình, làm cho tiến trình đó xuất hiện như thể nó là một tiến trình duy nhất chạy trên máy chủ.<br>
Chú ý: Namespaces không hạn chế quyền truy cập vào tài nguyên vật lý như CPU, memory, disk. Các quyền truy cập này được đo và giới hạn bởi một tính năng của kernel được goi là "cgroups" như đã trình bày ở trên.<br>
<br>
##### Phân loại
Hiện tại Linux cung cấp sẵn cho người dùng 7 namespases:
1. Mount: Cô lập các điểm gắn kết tập tin hệ thống
2. UTS: Cô lập hostname và domainname
3. IPC: Cô lập tài nguyên liên tiến trình (Interprocess Communication)
4. PID: Cô lập không gian số PID
5. Network: Cô lập network interface
6. User: Cô lập không gian số UID/GID
7. Cgroup: cô lập về thư mục root của tính năng cgroups, chỉ mới xuất hiện từ Linux Kernel phiên bản 4.6 trở đi<br>

Hầu hết các triển khai Container đều sử dụng các namespace ở trên để cung cấp mức cách ly cao nhất giữa các tiến trình riêng biệt, trong số đó namespace cgroups gần đây được sử dụng phổ biến và rộng rãi hơn.

----
### Kết luận
Bài viết đến đây là hết, trong phần sau mình sẽ trình bày về cgroups trong linux và giải pháp giới hạn tài nguyên trong máy chấm thi lập trình trực tuyến, nếu quan tâm các bạn có thể theo dõi tiếp series này.<br>
Bài viết còn nhiều thiếu sót và hạn chế. Rất mong nhận được đóng góp tích cực từ phía các bạn <3