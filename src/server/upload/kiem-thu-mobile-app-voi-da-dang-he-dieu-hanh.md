![](https://images.viblo.asia/f34896bd-2c9c-4fec-bf38-da4a2497f2dc.jpg)
Chắc hẳn các bạn đã biết, quy trình kiểm thử các ứng dụng mobile rất tốn kém và mất thời gian; nhưng để tạo nên một ứng dụng tốt thì làm sao có thể thiếu đi quy trình kiểm thử đúng không nào. Vả lại, end-user ngày nay rất sáng suốt, tinh tường và bất kỳ trục trặc, sai sót nào họ phát hiện được trong ứng dụng đã được release của bạn đều có thể dẫn đến tổn thất lớn về tiền bạc và danh tiếng.

Thế vì sao lại nói kiểm thử các ứng dụng mobile rất tốn kém và mất thời gian? 
# Thách thức trong phát triển Mobile App
* **Đa dạng môi trường**: 
    * Số lượng thiết bị và hệ điều hành quá lớn là trở ngại rõ ràng nhất ở đây. Mobile app được sử dụng trên nhiều loại thiết bị và hệ điều hành (iOS, Android, Blackberry OS, Windows Phone, v.v.).

    * Tính khả dụng của app trên nhiều độ phân giải màn hình, kích thước bộ nhớ và cấu hình phần cứng,...  cũng một thách thức không nhỏ đối với việc kiểm thử app. Nhà phát triển cần đảm bảo rằng sản phẩm của họ luôn trong trạng thái tốt nhất trên nhiều nền tảng (hoặc 1 số nền tảng quan trọng được chỉ định)
    * Việc cập nhật và nâng cấp liên tục OS buộc các ứng dụng cũng phải cập nhật để đảm bảo tính tương thích.

* **Thiếu device**: Khi tiến hành chúng ta sẽ thường có xu hướng thiếu device thật để kiểm thử.

* **Nhu cầu end-user ngày càng cao**: Bộ test case, phương pháp test cũng cần được cập nhật thường xuyên vì end-user ngày nay liên tục đưa ra những yêu cầu cao hơn, tinh tường phát hiện những bất cập trên các ứng dụng hơn. 
# Những điểm cần lưu ý để đảm bảo ứng dụng đạt chất lượng tốt trên đa dạng nền tảng
## 1. Lựa chọn Test Evironment
### **Trình giả lập**

**Ưu điểm:**
* **Nhanh:** Trong giai đoạn develop, trong tình huống thiếu hụt thiết bị thật team phát triển sẽ có xu hướng sử dụng các trình giả lập vì chúng cho phép kiểm thử nhanh chóng và hiệu quả. 
* **Tiện lợi:** Dễ dàng chọn lựa thiết bị, OS version để test.
 * **Tiết kiệm:** Vì có rất nhiều trình giả lập trên thị trường hiện nay, thậm chí các IDE coding cũng có thể đã tích hợp sẵn một trình giả lập cho riêng nó, developer có thể dễ dàng build trực tiếp trên PC để kiểm thử sau khi hoàn thành 1 đoạn code.
* **Automation Test:**  Đối với kiểm thử các chức năng cơ bản, trình giả lập di động khá hiệu quả và cũng tạo điều kiện thuận lợi cho loại hình test scripts language khi áp dụng uniti test/ automation test.

**Nhược điểm:**
* Không thể đảm bảo được chất lượng trên thiết bị thật. Điều này hoàn toàn rất dễ xảy ra, vì sẽ có rất nhiều vấn đề mà chúng ta khó để thiết lập trình giả lập như đang trải nghiệm trên thiết bị thật (tốc độ mạng, event ngắt như có cuộc gọi,...)
* Hoàn toàn khác với thao tác của user trên thực tế, vì trên trình giả lập chỉ thường thao tác bằng click chuột.
-----

### **Thiết bị thật**
**Ưu điểm:**
- **Chất lượng test:** Trên các thiết bị thật với các hệ điều hành khác nhau, chúng ta có thể kiểm thử bằng các thao tác thực tế mà end-user sẽ tương tác với ứng dụng, thay vì những cú click chuột khi kiểm thử trên trình giả lập.
- **Đa dạng case thực tế:** Đảm bảo được cách app xử lý với ảnh hưởng của việc sử dụng ứng dụng đối với thời lượng pin và hiệu suất OS cũng như các event ngắt trong việc sử dụng mạng , cả mobile data và Wi-Fi, hoặc những event/ alert riêng biệt của OS ....
- **Automation Test:** Có thể apply Automation Test qua các công cụ kiểm thử như Appium, Katalon,....

**Nhược điểm:**
- Khó để đảm bảo về số lượng thiết bị có thể test, nếu không có sẵn thiết bị sẽ tốn thêm chi phí mua thiết bị.
- Các thiết bị đã nâng cấp OS để test tương thích sẽ rất khó để hạ cấp để test tương thích trên các OS version thấp hơn. Không linh hoạt lựa chọn như trình giả lập.

> *Trên quan điểm cá nhân, tôi nghĩ rằng, lý tưởng nhất để quá trình kiểm thử mobile app trở nên hoàn hảo đó chính là sự kết hợp kiểm thử trên trình giả lập ở giai đoạn đầu hoặc chỉ các developer sử dụng nó, kèm theo đó là kết quả kiểm thử thực tế trên các thiết bị thực.*

## 2. Chủ động kiểm thử, nghiên cứu sự tương thích của mobile app trên các version OS, cấu hình/ thiết kế thiết bị mới.
* Gần đây chắc hẳn sự ra đời liên tục của các bản OS beta luôn là một chủ đề khá hot trên các diễn đàn công nghệ. Không chỉ là bàn luận về nó mà các nhà phát triển đều đang âm thầm điều tra nghiên cứu sự tương thích của app đang phát triển với các OS này. 
* Không chỉ về OS, gần đây chẳng phải hình ảnh của những Flip SmartPhone nhiều phiên bản đang trở nên hot dần không ạ? Vậy liệu ứng dụng của mình có support màn hình vuông hay khi điện thoại đang được flip, đây có lẽ cũng là câu hỏi cho nhiều nhà phát triển.

![](https://images.viblo.asia/a25448d2-00b2-4f15-b114-cd09245b4f94.jpg)

Với vai trò là một nhà kiểm thử, trong điều kiện có thể và khả năng cho phép, chúng ta cũng hãy chủ động áp dụng kiểm thử hồi quy khi xuất hiện một bản OS, hay một thiết bị có thiết kế màn hình khác biệt - mà có thể những end-user của app đang sử dụng. 

## 3. Sự cần thiết của Automation Test
* Automation Test chắc chắn có thể giúp cho cuộc sống của chúng ta dễ dàng hơn bao giờ hết, nhưng không có nghĩa là cần phải apply Automation ngay từ lúc bắt đầu dự án. 
* Lý tưởng nhất là chỉ nên áp dụng Automation Test khi chu kỳ phát triển của ứng dụng kéo dài, khi quá trình kiểm tra hồi quy cần được tiến hành thường xuyên và khi ứng dụng vẫn đang liên tục phát triển.
* Automation Test cho phép chúng ta nhanh chóng và dễ dàng xác minh, xác nhận khả năng tương thích của ứng dụng bất cứ khi nào có version mới hoặc cập nhật cho bất kỳ OS nào. Backward compatibility (Khả năng tương thích ngược) cũng có thể dễ dàng đánh giá được bất cứ khi nào thực hiện nâng cấp app hay OS nếu project đang apply Automation Test.

# Lời kết
Ở bài viết này, tôi muốn chia sẻ những thách thức mà chúng ta có thể gặp phải khi kiểm thử với một mobile app, cũng như đem đến những phân tích ưu, nhược điểm các lựa chọn về môi trường test (một trong các yếu tố quan trọng của quá trình kiểm thử), những phân tích này xuất phát trên quan điểm cá nhân và nội dung tham khảo được.<br/><br/>
Với những gì đã chia sẻ, tôi nghĩ rằng, lý tưởng nhất để quá trình kiểm thử mobile app trở nên hoàn hảo đó chính là sự kết hợp kiểm thử trên cả trình giả lập và thiết bị thực, kèm theo đó là sự chủ động tiếp cận các thiết bị, OS mới, cũng như là apply Automation Test nếu có thể để đảm bảo rằng sản phẩm của bạn mỗi lần release đều sẽ đạt được:
* Tiến độ mong muốn
* Chất lượng hoàn hảo trên thực tế 
* Chi phí hợp lý.
 <br/><br/><br/><br/>

*Tham khảo: https://www.cigniti.com/blog/how-to-test-mobile-apps-for-different-operating-systems/*

Cảm ơn mọi người đã đọc bài viết này!