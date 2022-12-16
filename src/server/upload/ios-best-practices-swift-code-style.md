**Coding Convention** là một vấn đề quan trọng trong lập trình, nó giúp mã dễ đọc, dễ hiểu hơn thông qua các phong cách thống nhất và ngắn gọn.

Đây là bài dịch từ của một chia sẻ trên trang [medium.com](https://medium.com), bài viết nguồn mời các bạn xem tại đây: https://medium.com/@vialyx/ios-best-practices-part-2-swift-code-style-d45acd7a028

![](https://images.viblo.asia/a8e8bf9a-1e44-40e9-b4ba-9b57cb371067.jpeg)
#### 1. Chọn đúng *spacing* sẽ giúp cho việc tổ chức mã của bạn rõ ràng hơn.
![](https://images.viblo.asia/18c9174d-73e7-4e20-a8f7-11ecdb64a741.jpeg)
#### 2. Sử dụng ngữ cảnh suy luận (một tính năng tuyệt vời của Swift)
Thay vì viết **comment**, mà hãy viết mã rõ ràng theo nguyên tắc **S.O.L.I.D**
![](https://images.viblo.asia/5e954007-cffb-4b50-a586-ad582f70a533.jpeg)
#### 3. *Protocols* nên được viết trong *Extensions*
**Class** chỉ nên bao gồm mã mô tả chức năng của chính nó.
![](https://images.viblo.asia/9146420c-63f0-46b3-b080-02963f9439f1.jpeg)
#### 4. Không giữ mã không sử dụng.
Bạn luôn có thể khôi phục mã này từ hệ thống kiểm soát phiên bản (version control system)
![](https://images.viblo.asia/88999f01-4408-43b7-9d82-06316bb6dce0.jpeg)
#### 5. *Class* vs *Struct*. Đó là lựa chọn của bạn…
Tuy nhiên, tôi nghĩ chúng ta nên ưu tiên sử dụng **Struct** hơn **Class**. Việc này sẽ có lợi cho việc quản lý bộ nhớ.
Tất nhiên, chúng ta cũng sẽ có rất nhiều trường hợp phải sử dụng **Class**

Hãy sử dụng cú pháp rút gọn cho các thuộc tính tính toán.
![](https://images.viblo.asia/676d3639-bc1a-4ffe-a393-20ed276ad20f.jpeg)
#### 6. Đừng quên sử dụng *final*
![](https://images.viblo.asia/4155b823-f536-43bf-9922-b50ca9aa2f73.jpeg)
#### 7. Gom các giá trị toàn cục vào một file *Constants*
Ví dụ bên dưới sử dụng **enum**, nhưng bạn cũng có thể sử dụng **Struct** với một hàm khởi tạo riêng tư (*private init()*) để thay thế.
Tối ưu hoá điều kiện cho **optional unwrap**, hãy viết tất cả các đối số theo tuần tự trong một điều kiện.
![](https://images.viblo.asia/9f83465c-1472-444c-998c-29febf4355f2.jpeg)
#### 8. Sử dụng **lazy** cho các khởi tạo để tối ưu hoá bộ nhớ
![](https://images.viblo.asia/cd0cb0fd-e9a5-407d-905e-a0d4b2ccfb9c.jpeg)
#### 9. Nghĩ nhiều hơn về quản lý bộ nhớ
Mở rộng vòng đời của đối tượng trong *block* với **[weak self], guard let `self` = self else { return }**
![](https://images.viblo.asia/bf68c862-8358-4720-bd62-3615abf9f465.jpeg)
#### 10. Viết cách điều kiện một cách ngắn gọn
Hãy sử dụng **guard** để check nhiều giá trị **optional**
![](https://images.viblo.asia/decab131-75a6-40dd-ae13-2e96f1363267.jpeg)
#### 11. Không sử dụng dấu chấm phẩy
![](https://images.viblo.asia/a9063c34-a92f-4d66-9930-f212a1489339.jpeg)

Đây chỉ là một hướng dẫn nhỏ về coding convension trong Swift. Hi vọng sẽ giúp cho bạn viết code rõ ràng và dễ đọc hơn.