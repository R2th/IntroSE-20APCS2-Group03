**Interrupt testing là gì ?**

* Kiểm tra ngắt là quá trình để sao chép ngắt đột ngột (Không mong muốn) vào ứng dụng. Điều này có thể đạt được theo nhiều cách và kỹ thuật khác nhau tùy thuộc vào ứng dụng được thử nghiệm.

**Tại sao cần sử dụng Interrupt testing ?**

* Điều duy nhất luôn xảy ra khi bạn đang trong một cuộc họp là gì? Bạn bị gián đoạn, phải không? Khi điều đó xảy ra, một số cần một phút để quay lại và một số hoàn toàn mất đi sự suy nghĩ trước đó. Nói một cách đơn giản, kiểm tra "ngắt" cố gắng tìm ra hành vi nào mà ứng dụng của bạn thể hiện.
* Kiểm tra "ngắt" áp dụng cho mọi loại ứng dụng - Web, Mobile, Stand Alone, v.v ... Sự đa dạng của các thiết bị, mạng, cấu hình, v.v ... làm cho nó nổi bật hơn cho các ứng dụng Di động so với các ứng dụng khác.

**Các trường hợp Interrupt thường gặp:**

* Hiển thị pin yếu 
* Hiển thị pin đầy,cắm để sạc,đã cắm sạc 
* SMS,MMS và các cuộc gọi đến, cuộc gọi đi khi ứng dụng đang chạy ở chế độ nền 
* Thông báo đến từ một ứng dụng di động khác 
* Tắt thiết bị 
* Sử dụng nút home, nút nguồn 
* Hiển thị báo thức
* Nhắc nhở cập nhật ứng dụng 
* Mất kết nối mạng 
* Nâng cấp hệ điều hành 
* Chạy nhiều ứng dụng cùng lúc khi sử dụng cùng 1 tài nguyên 

**Một số case cho ứng dụng sử dụng mạng :**

* Kết nối với mạng nhưng xóa kết nối LAN khỏi bộ định tuyến để thiết bị có thể cảm nhận trạng thái wifi trên thiết bị nhưng không thể kết nối với internet
* Kết nối qua VPN và VPN bị ngắt kết nối

**Một số case cho ứng dụng sử dụng dịch vụ:**

* Hủy dịch vụ bằng cách nhấp vào nút gần đây và vuốt ứng dụng để giết ứng dụng và dịch vụ
* Tiêu diệt ứng dụng bằng cách sử dụng Trình diệt ứng dụng của bên thứ ba
* Tiêu diệt các dịch vụ cụ thể khỏi Cài đặt-> Quản lý ứng dụng

Nguồn tham khảo : 

http://www.professionalqa.com/interrupt-testing
http://kratinmobile.com/blog/index.php/interrupt-testing-on-mobile/