## 0. Giới thiệu
[Hackthebox](https://hackthebox.eu) không còn xa lạ với những người yêu thích Security, các Pentester hay Researcher. Đây là một Website được tạo dựng với mục đích cung cấp môi trường "hackthebox" thực sự. Với việc cung cấp các "machine" - hay đúng hơn là các Web Sever, công việc của người chơi là bằng mọi cách thức và kỹ năng có thể, lấy được **Flag** trong folder **/home/** và **/root/**.

Muốn có một Machine - một Web Server chứa sẵn những lỗ hổng để tìm kiếm và khai thác, nhưng không cần phải lên [Vulnhub.com](https://vulnhub.com) tải những file hàng GB về tự setup môi trường. Hackthebox chính là sự lựa chọn cho bạn.

Bài viết này không mang thiên hướng kỹ thuật mà sẽ như là một bài tổng quan về một trong những "sân chơi" phổ biến và được ưa thích hàng đầu để tập luyện. Let's start!<br><br>
![](https://images.viblo.asia/bc7423d9-a969-4722-8de4-1785deb6d2ff.png)



## 1. Làm sao để bắt đầu?

Để đăng ký tài khoản hackthebox, và dùng OpenVPN để connect tới các Machine, các bạn có thể đọc bài viết của một đồng nghiệp của mình tại [đây](https://viblo.asia/p/hackthebox-san-tap-cho-ai-muon-tro-thanh-hacker-1Je5EvEYKnL). 

Sau khi connect vào OpenVPN, các bạn sẽ có 1 IP cùng dải IP với các machine. Hiện tại có tổng cộng 142 machine và có 20 machine Free, mỗi tuần sẽ có 2 machine trong số 20 machine Free này được "retired", và 2 trong số 122 machine đang "retired" được "comeback" phục vụ người chơi.

Các bạn có thể đăng ký VIP với chi phí khoảng 10 Euro / month để có thể thoải mái chơi các retired machine.

## 2. Các kỹ năng cần có

Việc chơi machine hackthebox sẽ yêu cầu một số kỹ năng để có thể dễ dàng tiếp cận hơn và có được flag, từ đó tạo được hứng thú khi chơi, các kỹ năng cơ bản theo mình bao gồm: <br>
* Đã có thời gian và nền tảng chơi CTF mảng WEB, tuy nhiên điều này **không** đồng nghĩa với việc chơi CTF dễ hơn chơi Hackthebox.
* Sử dụng cơ bản một số tools: Burp Suite, Nmap, Metasploit Framework, Netcat, John the Ripper, Curl, Gobuster, Hydra, ...
* Programing cơ bản với Python, Ruby, Java...
* Quen thuộc command line của Linux hoặc Windows.
* Kiến thức về Reverse Shell, bin bash trong Linux.
* Kiến thức về Privilege Escalation.<br><br>
![](https://images.viblo.asia/445ab3a2-9291-4cee-b4a9-457c88ce2cee.gif)

## 3. Machine on Hackthebox
### 3.1. Tổng quan

![](https://images.viblo.asia/ffbe6956-52b7-4286-b4df-a5350620a552.png)
<br><br>
Từ hình trên chúng ta có thể thấy những thông tin cơ bản của 1 machine bao gồm: <br><br>
* **Active Machines:** Các machine đang sẵn sàng để chúng ta chơi.
* **Retired Machines:** Các machine chỉ VIP mới có thể truy cập và chơi.
* **Name:** Tên Machine.
* **Difficulty:** Độ khó tính theo 10 mốc.
* **Rating:** Đánh giá của người chơi về machine.
* **Owns:** Số người đã có được User Flag và Root Flag.
* **Last Reset:** Thời gian gần nhất machine được khởi động lại.
* **Action:** Thêm machine vào danh sách ưa thích, request để restart machine và submit flag.<br>
### 3.2 Cụ thể hơn về machine
Khi truy cập vào 1 machine, bạn sẽ thấy những thông tin sau:
![](https://images.viblo.asia/0a9841e1-965c-4033-ab61-73a88ba60d9e.png)

<br>Chúng ta có thể thấy một số thông tin về machine trên như sau:
* **Tên machine:** Postman
* **OS:** Linux
* **Base-Point:** 20, machine càng khó điểm càng cao. Khi machine bị đưa vào retired, điểm của bạn về machine đó sẽ bị reset về 0
* **Số người đã có User Flag:** 4511 và số người có **Root Flag**: 4422
* **Độ khó:** 4.2/10
* **User Rating:** 4/5 Sao
* **Nếu đã có flag User hoặc Root:** Ô *Own User* hoặc *Own Root* sẽ có màu xanh lá cây như hình
* **Info card:** Hiển thị thông tin cơ bản về machine dạng Card
* **Rate Matrix:** Khi Root thành công, các bạn có thể rating từ 1 - 10 cho machine theo một số các tiêu chí ở phía dưới, bao gồm:
    1. **Enumeration:** Liệt kê, hay nói cách khác là thu thập thông tin về machine. Càng phải Recon nhiều để có thông tin về port, service, url,... thì rating càng cao. 
    2. **Real-Life:** Khả năng áp dụng trong thực tế của machine.
    3. **CVE:** Machine liên quan tới các CVE tới mức độ nào.
    4. **Custom Exploitation:** Liên quan tới việc tự custom PoC hoặc tự viết PoC khai thác.
    5. **CTF-Like:** Có giống như chơi CTF thể thức Jeopardy thông thường?
    6. **Trong ô ngũ giác kia:** Màu xanh dương thể hiện Rate Matrix của User Flag, màu xanh lá cây thể hiện Rate Matrix của Root Flag.
* **IP của machine:** 10.10.10.160, để truy cập được bạn phải kết nối OpenVPN để có IP cùng dải IP với machine trước.
* Ngoài ra chúng ta sẽ có thêm thông tin về "**Machine Maker(s)**": Người đã tạo ra machine và số ngày machine được publish, ở đây là 45 ngày.

**Lưu ý:** Rate Matrix **không** thể hiện độ khó của machine, nó chỉ thể hiện độ liên quan của machine tới các tiêu chí trên !
### 3.3 Root this box !
![](https://images.viblo.asia/67ce5ad4-54fb-467f-b931-656fdf99901d.png)<br><br>

Nếu đọc đến đây, các bạn hãy thử tham gia và thực hành tìm kiếm Flag trong những "box" như vậy. Biết đâu bạn sẽ hứng thú và chuyển từ developer, coder sang làm Security / Pentester thì sao? :clap::clap::clap: