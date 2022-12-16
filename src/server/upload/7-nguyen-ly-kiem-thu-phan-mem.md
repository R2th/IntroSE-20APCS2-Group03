**Trong bất kỳ một việc gì trong cuộc sống chúng đều có những nguyên tắc riêng để hoạt đông. Kiểm thử phần mềm cũng vậy, chúng cũng có những nguyên tắc riêng của mình để giúp cho những kiểm thử viên tiết kiệm được thời gian công sức trong khi làm việc. Các chuyện gia trong lĩnh vực kiểm thử đã đưa ra 7 nguyên tắc kiểm thử và được áp dụng hầu hết cho tất cả các sản phẩm phần mềm trong suốt 40 năm và chúng vẫn giữ được giá trị của chúng. Vậy hôm nay chúng ta sẽ tìm hiểu về 7 nguyên tắc của kiểm thử.**

## 1. Kiểm thử phần mềm là gì?

Kiểm thử phần mềm là khâu cuối cùng trong giai đoạn phát triển sản phẩm phần mềm. Nó đóng vai trò vô cùng quan trọng nhằm đảm bảo chất lượng của sản phẩm trước khi sản phẩm đến tay khách hàng. Kiểm thử không chỉ là tìm lỗi của phần mềm mà còn là cách để tăng sự thân thiện của sản phẩm đối với người dùng và giúp sản phẩm có sự tương tác tốt nhất.

## 2. Các nguyên tắc kiểm thử

![](https://images.viblo.asia/08ac9256-237e-4299-9d0a-503af7cff5bd.jpg)

### 2.1. Kiểm thử tất cả là điều không thể:
Kiểm thử tất cả là sử dụng tất cả các biến số, tất cả các trường hợp đúng hoặc sai để kiểm thử. Ví dụ, 1 textbox nhận giá trị từ 0-100, không có nghĩa là chúng ta có thể thử mọi trường hợp theo thứ tự 0,1,2,3,…,100. Việc này làm cho việc kiểm thử rất mất thời gian và công sức kéo theo chi phí cho kiểm thử tăng cao. Do đó, thay vì kiểm thử mọi trường hợp, hãy chia các trường hợp theo mức độ ưu tiên và mức độ nghiêm trọng để có thể chọn ra những trường hợp thực sự cần thiết để kiểm thử.

### 2.2. Kiểm thử sớm:

![](https://images.viblo.asia/053f3eeb-f222-4984-8d39-b7e9fc26b831.jpg)Biểu đồ trên thể hiện chi phí sửa lỗi trong trong từng giai đoạn phát triển phần mềm. Dựa vào đó các bạn có thể thấy rằng càng về những giai đoạn cuối chi phí sửa lỗi sẽ tăng vọt, vậy nên việc kiểm thử sớm là điều phải làm. Nhưng tại sao sửa lỗi sớm thì chi phí lại thấp? Đơn giản là vì càng về những giai đoạn cuối của việc phát triển phần mềm, sản phẩm sẽ trở nên phức tạp hơn và module này ghép với nhiều module khác, 1 lỗi tìm thấy sẽ làm ảnh hưởng các module khác, do vậy chi phí sẽ tăng lên nhiều lần. Biểu đồ dưới đây sẽ chỉ rõ chi phí sửa lỗi về các giai đoạn trong vòng đời phát triển phần mềm.

### 2.3. Cụm lỗi:

![](https://images.viblo.asia/79e09a91-c869-4efa-ae26-6bd8934a1df4.jpg)Thông thường lỗi được tìm thấy sẽ thuộc vào một chức năng nào đó của phần mềm. Điều này đúng với nguyên lý 80/20 của Pareto, 80% số lỗi tìm thấy chỉ nằm ở 20% chức năng của phần mềm và 20% số lỗi còn lại thuộc về 80% phần còn lại của sản phẩm. Vậy nên khi tìm được bug ở 1 chức năng vào đó kiểm thử viên nên test kĩ hơn để đảm bảo rằng có thể tìm ra được nhiều bug tiềm ẩn. Để có thể dễ hiểu hơn, ta hãy xem xét nguyên tắc tổ gián: khi ta tìm được 1 con gián (gọi nó là bug) thì có nghĩa là có tổ của nó ở gần đó và điều này đồng nghĩa rằng sẽ còn rất nhiều con gián khác trong đó. Mong rằng ví dụ này sẽ giúp bạn hiểu hơn về nguyên tắc "Cụm lỗi" trong kiểm thử phần mềm.

### 2.4. Nghịch lý thuốc trừ sâu:
![](https://images.viblo.asia/a70e090e-72e7-4cc7-a25a-85512af7a239.jpg)Trong nông nghiệp, khi các bác nhà nông khi muốn loại trừ 1 đám sâu bệnh nào đấy, họ sẽ dùng thuốc trừ sâu, tuy nhiên vẫn dùng cùng 1 loại thuốc trừ sâu đó, sâu bệnh sẽ phát triển hơn và bắt đầu kháng thuốc làm giảm hiệu quả của thuốc diệt. Việc này cũng áp dụng với kiểm thử, khi bạn sử dụng 1 bộ test case nhiều lần và lặp đi lặp lại, bạn sẽ không thể tìm ra được lỗi mới nữa. Để tránh cho điều này xảy ra, các bộ test case cần phải được xem lại, đánh giá và chỉnh sửa. Việc này sẽ làm cho việc kiểm thử có kết quả cao hơn.

### 2.5. Kiểm thử phụ thuộc vào ngữ cảnh:
Ngữ cảnh ở đây có thể hiểu là bản chất của sản phẩm mà bạn đang làm công việc kiểm thử như là 1 trang web, 1 ứng dụng mobile, 1 game hay là 1 chương trình windows. Tùy vào bản chất của sản phẩm mà ta có những kỹ thuật, phương pháp tiếp cận khác nhau. Hoặc 1 ví dụ khác như là sản phẩm phần mềm phục vụ cho ngành y tế thì tester nên kiểm tra các lỗi kỹ thuật kĩ hơn là độ bảo mật do sản phẩm phần mềm này có liên quan tới tính mạng con người.

### 2.6. Kiểm thử phần mềm chứng minh rằng sản phẩm có lỗi:
Sau khi sản phầm phần mềm được hoàn thành, ngay cả khi đã qua việc kiểm thử, nó sẽ không hoàn toàn đảm bảo rằng sản phẩm không có lỗi. Việc kiểm thử chỉ chứng mình rằng sản phẩm có lỗi chứ không thể kết luận vội vàng rằng sản phẩm này không hề có 1 lỗi nào. Khi kiểm thử 1 cách tối đa, sản phẩm đưa ra thị trường sẽ là sản phẩm tối ưu nhất. Tuy nhiên 1 số lỗi chỉ có thể xảy ra do các yếu tố đặc biệt như là thời gian, yếu tố bên ngoài tác động,...

### 2.7. Sự sai lầm về việc không có lỗi:
Sản phẩm phần mềm mặc dù đã đạt tới tỉ lệ 99% là không có lỗi vẫn có thể bị người reject do sản phẩm sai yêu cầu của khách hàng, Kiểm thử phần mềm không chỉ là việc đi tìm lỗi mà còn phải kiểm tra xem sản phẩm có đạt yêu cầu về nghiệp vụ của khách hàng hay tổ chức. Vì vậy, kể cả việc kiểm thử và sửa lỗi cũng không thể làm sản phẩm là hoàn thành nếu như nó không thể sử dụng được do không đáp ứng nổi yêu cầu về mặt nghiệp vụ của khách hàng.

Với 7 nguyên tắc của kiểm thử đã nói trên, mình mong các bạn sẽ có cái nhìn rõ hơn về việc kiểm thử phẩn mềm và sẽ đạt được nhiều thành công trong công việc. Happy Testing :)

Tài liệu tham khảo: https://www.softwaretestingmaterial.com, https://www.guru99.com