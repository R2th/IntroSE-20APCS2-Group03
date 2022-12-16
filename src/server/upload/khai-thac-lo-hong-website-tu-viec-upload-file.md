Trong nhiều cách để khai thác lổ hổng của một website nhằm mục đích tiêm mã độc vào ứng dụng thì chức năng "Upload file" là mục tiêu ưa thích của tin tặc bởi vì những file được Upload lên sẽ lưu trực tiếp trên server. Điều này cho phép kẻ tấn công có cơ hội đưa các tệp(file) độc hại  lên máy chủ của bạn. Sau đó họ có thể tìm cách thực thi các câu lệnh và nắm toàn bộ hệ thống của bạn.

Do đó, chức năng "Upload file" của mọi ứng dụng nên được xử lý một cách thận trọng - chúng đại diện cho một cách dễ dàng để kẻ tấn công tiêm mã độc vào ứng dụng.

**Đa số vấn đề phát sinh từ việc developer đã quên không validate file type trong code backend.**

Ví dụ về lỗ hổng từ chức năng Upload ảnh đại diện được trình bày sau đây sẽ giúp các bạn hiểu rõ hơn về cách mà hacker khai thác lỗ hổng này.
![](https://images.viblo.asia/ed42517d-4e0e-4749-b1a4-0f5d56c761d5.png)

# Mô tả kịch bản

Lấy ví dụ về một victim.
Đầu tiên. Chúng ta sẽ thử Upload 1 file ảnh làm avatar. Chúng ta nhận thấy: 

**Thứ nhất:** Tệp ảnh đã tải lên không được đổi tên sau khi tải lên. Chúng vẫn được giữ tên file như ở local. Tên tệp xuất hiện trong URL của hình ảnh hồ sơ khi tải lên thành công

**Thứ 2:**

Hệ thống có validate định dạng file ảnh (Chỉ chấp nhận .jpg, .png .gif) bằng javascript.(Khi chọn thử 1 file không phải file ảnh thì có thông báo, đồng thời form được reset).

**Thứ 3**: (Lỗ hổng), developer đã quên bắt validate ở phía server. Nên khi lách được các validate từ frontend. File vẫn được tải lên server mặc dù khác định dạng.

![](https://images.viblo.asia/6e6d4e2a-9831-483a-a4bb-0b13ac88b973.png)

**Tiến hành:**

Xác định website sử dụng ngôn ngữ PHP. Chúng ta viết một tập lệnh đơn giản có tên **hack.php**. File shell này có tác dụng khi được PHP thực thi, nó sẽ chạy bất kỳ lệnh nào thông qua tham số (param) "cmd" truyền lên
 
 ![](https://images.viblo.asia/3c3329cb-e912-4f0d-af02-fe27c72280ba.png)
         
 Mặc dù developer của victim đã bắt validate không cho tải file khác file ảnh. Tuy nhiên chúng ta có thể vô hiệu hóa JavaScript trong trình duyệt của mình và tải lên **hack.php** như là file hình ảnh avatar Vì JavaScript bị vô hiệu hóa, loại tệp không còn được kiểm tra. Form lúc đó có thể submit bình thường
 
![](https://images.viblo.asia/28942a7b-9f94-4773-a88a-c24c7384de1e.png)
 
Không có gì đáng ngạc nhiên, quá trình tải lên diễn ra bình thường, và thông báo thành công. Tuy chỉ có duy nhất phần hiển thị avatar trông có vẻ bị hỏng - bởi tập tin tải lên không phải là một hình ảnh hợp lệ. Tuy nhiên, tệp file **hack.php** hiện tồn tại trên máy chủ. 

![](https://images.viblo.asia/c84bcd84-0ff0-41a5-bf70-79ca5c002264.png)

Sao chép URL của "avatar" vào thanh địa chỉ trình duyệt. Ta nhận thấy rằng code của file **hack.php** đã được thực thi.
         ![](https://images.viblo.asia/bb856104-b2eb-4d1c-9696-01e304c43af9.png)
         
Trong thực tế, bất kỳ lệnh nào được truyền trong tham số "**cmd**" sẽ được thực thi trên máy chủ.

Do đó, chúng ta có thể dựa vào điều này để có quyền truy cập vào dữ liệu nhạy cảm trên máy chủ. VD: Truyền vào lệnh **locate my.cnf** để tìm cấu hình cơ sở dữ liệu. Khi đã có được cấu hình dữ liệu, xem như hệ thống đang nằm gọn trọng tay bạn
![](https://images.viblo.asia/0ec52d24-c801-4c23-ba0a-102e7ea3bd12.png)
# Cách khắc phục
Đây là lỗi chủ quan khi developer chỉ validate ở phía client. Cách khắc phục đơn giản chính là luôn ghi nhớ phải xử lý code bắt validate phía backend. 
Không chấp nhận tải lên các file thực thi. Nếu là file ảnh thì chỉ chấp nhận các định dạng .jpg, .png, .gif. Nếu là file tài liệu (document) thì chỉ chấp nhận .doc, .xls, .pdf ..

*Tham khảo : hacksplaining*