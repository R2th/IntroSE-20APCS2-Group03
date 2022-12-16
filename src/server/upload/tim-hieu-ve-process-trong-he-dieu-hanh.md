I. Process là gì

Theo định nghĩa thì process là chương trình đang thực thi. Process không chỉ là những đoạn text. Nó bao gồm các hoạt động hiện tai, được đại diên thông qua các giá trị của các bộ đếm chương trình và nội dung của các register. Ngoài ra 1 process cũng bao gồm process stack để lưu các dữ liệu tạm và vùng dữ liệu, nơi chứa các biến toàn cục. Process cũng còn có heap, là 1 bộ nhớ động hoạt động khi process đang chạy

![](https://images.viblo.asia/d0f72d25-1942-46e9-9954-1870ddeed7ec.PNG)

II. Các trạng thái trong process

Khi 1 process chạy, nó thay đổi trạng thái. Trạng thái của process được định nghĩa là 1 phần của hoạt động hiện tại. Process sẽ có 1 trong những trạng thái sau:
1. New - Process được khởi tạo
2. Running - các đoạn code được chạy
3. Waiting- Process đang đợi các sự kiện như I/O...
4. Ready - Process đang đợi để được gán vào processor
5. Terminated - Process kết thúc
 
III. Process Control Block

Mỗi process được biểu diễn trong hệ điều hành bởi các khối điều khiển process (process control block) (PCB). Nó bao gỗm các thông tin liên kết với các process nhất định bao gồm:
1. Process state: Trạng thái có thể là new, running, waiting, ready và terminated.
2. Program counter: bộ đếm xác định địa chỉ của các chỉ dẫn được thực hiện bởi process
3. CPU Registers: Các thanh ghi khác nhau về số lượng và loại , tùy thuộc vào kiến trúc của máy tính
4. CPU Scheduling information: Thông tin bao gồm các process ưu tiên 
5. Memory - management information: Thông tin này bao gồm các mục như giá trị cơ sở, page tables, segment tables
![](https://images.viblo.asia/dd9e1497-ff1b-46a0-aea5-fd714baea86d.PNG)

6. Accounting information: Thông tin bao gôm số lượng CPU và thời gian sử dụng....
7. I/O status information: Các thông tin về input output của thiết bị được lưu trừ trên process...

[Dịch từ cuốn Operating System Concepts](https://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz-ebook/dp/B00APSZCEQ)