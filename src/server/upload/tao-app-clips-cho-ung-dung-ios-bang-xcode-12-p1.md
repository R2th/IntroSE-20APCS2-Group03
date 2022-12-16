# Giới thiệu App Clips
Mới đây Apple đã công bố chính thức phiên bản iOS 14. Phiên bản cập nhật này có thêm tính năng rất mới mẻ được gọi là App clips. Liệu tính năng này có gì hay và nó có quan trọng với các developer hay không?
Theo như mô tả của phía Apple thì đây là một phiên bản nhỏ gọn của App. Chứa một chức năng đặc thù để người dùng có thể nhanh chóng trải nghiệm sau đó quyết định có tải về bản full hay không. Ưu điểm của nó là nhanh, nhỏ, gọn. Cá nhân mình thì thấy nó giống như một "Trailer" của ứng dụng. Rõ ràng ngoài screen shot hay những nội dung hiển thị cho người dùng biết trước phần nào của giao app hiện nay thì App Clips sẽ là một công cụ hữu hiệu để các nhà phát triển cho phép dùng trước cả một tính năng.
![](https://images.viblo.asia/2658f18d-fc19-4515-b7c8-6b4383403aa0.png)


## App Clips là một phần nhỏ của app
Bởi vì nó là một phần nhỏ của app nên App Clips sẽ được làm ngay trong Xcode, chung project với app full, sử dụng iOS SDK. Và do nhỏ gọn nên có thể được mở ngay cả khi chưa download về. Trên App store connect hiện tại đã cập nhật phần App Clips trong information của app. Như vậy App Clips sẽ được quản lý như 1 phần thông tin của app chính.

## Tải bản full của app
App Clip là cơ hội tốt để chứng minh giá trị của bản full. Trong thời gian trải nghiệm, nhà phát triển hoàn toàn có thể đưa ra đề nghị tải bản full. Và thậm chí những thông tin đã được nhập vào từ user khi sử dụng AppClips cũng có thể chuyển sang bản full để sử dụng tiếp. 
![](https://images.viblo.asia/6deba6ac-8fc1-4b3f-8223-a44e4a27cb19.png)

## Streamlined
Để tạo ra sự nhanh chóng hơn nữa vốn là tôn chỉ của App Clips. Chúng ta có thể thêm những phương thức như Apple Pay, Sign In with Apple để lấy thông tin của user một cách nhanh nhất.

# Làm sao để trải nghiệm App Clips
Có rất nhiều cách thức đã được Apple hỗ trợ để dùng App Clips

## App Clips code
Đây là cách tốt nhất để có thể dùng App Clips - theo như Apple. Cũng dễ hiểu thôi, vì mã này là riêng biệt tạo ra để mở App Clips. Và một phần nữa là vì nhìn nó đẹp và riêng biệt. Nên nó sẽ cho người dùng biết và nhận thấy ứng dụng này có sẵn App Clips hay không. Hãy nhìn ví dụ về App Clips code:
![](https://images.viblo.asia/42aa063f-ecfe-4a6c-8d6a-9ac8e7bcbda5.png)

## Các cách khác để sử dụng App Clips
- NFC tag
- Quét mã QR
- Safari app banner
- Link trong message
- Place Cards in Maps
- Truy cập lại App Clips đã mở trước đó - nó sẽ được lưu vào App Library trên iOS 14

# 8- Hour Notification
App Clips có thể áp dụng một loại Notification mới có thể được hiển thị trong vòng tám giờ sau khi người dùng khởi chạy App Clip. Điều này có thể nhắc người dùng mở lại App Clips trước đó. 

# Multiple App Clip experiences
Một số ứng dụng cung cấp nhiều trải nghiệm khác nhau cho người dùng. Và App Clips có thể cấu hình để thực hiện điều đó. Ví dụ một nhà hàng có thể có nhiều nhà hàng khác nhau. Và  một App Clips duy nhất sẽ có thể đưa đến cho người dùng trải nghiệm độc đáo của từng nhà hàng một.

# Verify vị trí
Apple đã xây dựng API xác minh vị trí mới chỉ dành cho App Clips cho phép bạn kiểm tra một lần để xem liệu mã App Clip,  NFC hoặc mã QR mà người dùng đã quét có đúng với vị trí hay không.

# Tạo App Clips
Để tạo một App Clips, chúng ta phải sử dụng Xcode 12. Mình sẽ hướng dẫn chi tiết ở bài viết tiếp theo. Cám ơn các bạn đã theo dõi bài viết. Hi vọng sau bài viết này các bạn đã có cái nhìn tổng quan về App Clips. See you later!