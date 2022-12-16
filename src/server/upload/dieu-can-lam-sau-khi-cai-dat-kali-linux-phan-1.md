Mặc định Kali Linux không có đủ toàn bộ các phần mềm cần thiết cho việc tấn công thử nghiệm(penetration test), việc sử dụng công cụ tấn công phù hợp phụ thuộc vào lựa chọn của bạn. Bài viết dưới đây là một số tổng hợp của mình về những vấn đề khi mới cài đặt Kali Linux. Lưu ý bài viết này phù hợp nhất cho các bạn nào mới tìm hiểu về hacking, còn những bạn đã có chuyên môn thì có thể bỏ qua.

**1.	Git**
Chắc hẳn các bạn ai cũng đã nghe đến git, đối với dân lập trình thì không còn gì xa lạ, git là một công cụ quản lý mã nguồn mở, giúp chia sẻ và quản lý sourcode dễ dàng, rất nhiều thư viện của các công cụ trên Kali Linux cũng sử dụng git để lưu trữ. Bạn có thể cài đặt git theo câu lệnh bên dưới.
Sudo apt install git

**2.	Tor**
Thật là thiếu sót nếu không nhắc đến Tor. Một trình duyệt vô cùng tuyệt vời cho những ai muốn tự do thông tin cá nhân. Trong thư viện của Kali Linux vẫn có trình duyệt Tor nhưng để đảm bảo bảo mật và những bản vá bảo mật mới nhất vẫn nên download trực tiếp từ trang web của Tor (torproject.org)

Bạn có thể cài đặt Tor theo câu lệnh bên dưới
echo 'deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main' > /etc/apt/sources.list.d/tor.list

**3.	Cài đặt công cụ lập trình (Code Editor)**
Việc tấn công thử nghiệm đòi hỏi bạn phải nắm được kiến thức nhất định về lập trình, vì vậy bạn cần có các công cụ lập trình. Dưới đây là top 10 công cụ phổ biến nhất và được cung cấp hoàn toàn miễn phí. Mình thường sử dụng Atom.
https://www.ubuntupit.com/best-linux-code-editor-top-10-reviewed-compared/

**4.	 Các công cụ tấn công cần thiết**
Ở những phiên bản trước Kali Linux cung cấp hầu hết các công cụ như metaploit, air-crack,wireshark…. Tuy nhiên ở phiên bản mới cụ thể mình đang sử dụng bản 20.1 các công cụ hầu như đều không có sẵn, hoàn toàn phải tự cài đặt. Dưới đây là một số công cụ mình thường dùng: 
-	Aircrack-ng
-	BeEF
-	Burp Suite
-	Hydra
-	Nikto
-	Maltego
-	Nmap
-	Wireshark