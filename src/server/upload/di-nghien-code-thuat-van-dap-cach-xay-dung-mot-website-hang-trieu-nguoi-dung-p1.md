Cave: Chào anh Nghiện đã lâu không gặp, em có chuyện này muốn kể với anh.

Nghiện: Chào em lâu rồi không gặp em kể đi để anh còn trình bày.

Cave: Chả là dạo này em tập tành làm lập trình viên, vua của các nghề, chắc là hơn cái nghề của bọn em, em định làm cái phần mềm đáp ứng nhu cầu cho hàng triệu người dùng.

Nghiện: Nghe cũng có lý thế định làm thế nào?

Cave: Em định làm một website có kiến trúc như thế này:
![](https://images.viblo.asia/aebe1cbb-12c0-4cc4-b77b-eb3153f2220b.png)

Nghiện: Nhìn cũng cơ bản, thế đang gặp vấn đề gì?

Cave: Vấn đề là hệ thống của em không đáp ứng được hàng triệu người dùng.

Nghiện: Mày code có tốt không?

Cave: Thôi cứ giả sử em code tốt đi, mà em code cơ bản thôi chắc là tốt nhưng chạy chưa được với nhiều người dùng

Nghiện: Ai dùng chưa mà biết, đã quảng cáo đâu mà ai dùng?

Cave: Em làm tool tự bắn request thấy nó không tốt thì em đoán vậy.

Nghiện: À ra thế, tưởng gì việc đầu tiên để làm trang web một triệu người dùng là tránh những đứa bắn request bừa bãi như mày bằng Rate Limit.

Cave: Nó là cái gì thế anh?

Nghiện: Nó là cái giới hạn không cho một user request quá nhiều lên làm chết hệ thống như  mày làm đấy.

Cave: Ok để về em ốp luôn.

Nghiện: Ừ về làm đi, khi nào có một triệu người dùng thật thì sang bảo anh nhé!

![](https://images.viblo.asia/8eba512c-ab2d-4494-807f-99115d58d24d.jpg)

Cave: Anh Nghiện ơi cứu cứu.

Nghiện: Sao thế dạo này đông khách quá chịu không nổi chạy sang đây à?

Cave: Không anh ơi, khách vẫn thế nhưng mà hệ thống hôm trước em bảo anh số lượng người dùng tăng đột biết đơ hết máy em rồi!!

Nghiện: Giỏi nhỉ mới có mấy năm mà đã lên người dùng nhanh thế? Nguyên nhân là gì để anh còn giải quyết

Cave: Chả là em mới thêm vào đó chương trình đi chơi Golf trúng G63 thế chị em vào cháy cả máy luôn.

Nghiện: Có phải là không vào được trang chủ luôn đúng không?

Cave: Anh nói như thần, đúng thế!!

Nghiện: Các file tĩnh như ảnh, js, css... em đang để ở đâu đấy?

Cave: Em đang để ở server của em có vấn đề gì hả anh.

Nghiện: Vấn đề là nhiều người vào quá load một đống file tĩnh đó làm chết server của em.

Cave: Vậy là em nên  bế các file đó ra chỗ khác hả anh.

Nghiện: Đúng rồi, em nên bế các file đó ra chỗ khác, như một con server khác, nhưng con server đó cũng có thể chết, em có thể cho lên một dịch vụ lưu trữ trên đám mây gọi là BLOB storage như Azure Blob storage, AMZ S3...Và sau đó để hệ thống của em an toàn ổn định hơn em nên dùng một dịch vụ CDN (content delivery network) như  Cloudflare, Google Cloud CDN để giảm tải, như hình dưới.

![](https://images.viblo.asia/7a955467-7c63-45d7-b5b4-065881c1d731.png)
Cave: Ồ vậy là những file tĩnh sẽ đi qua cái con CDN kia chứ không vào server của em nữa đúng không?

Nghiện: Đúng thế!

Cave: Để em về ốp luôn không đồng nghiệp chờ mất con G63 thì chết anh ạ! (Xong chạy về luôn quên cả váy)

Nghiện: Mẹ con này làm gì cũng nhanh tý lại sang bây giờ, thôi đi làm bi đã.

![](https://images.viblo.asia/a8bee86a-2e38-4f79-a0cc-a4be2d9c8651.jpg)

Cave: Anh nghiện ơi cứu em, mất G63 rồi!

Nghiện: Cái gì thằng nào lấy đấy, mà mày làm 1 củ một cuốc, cả đời không có G63, mất làm sao được.

Cave: Cái website ấy nó chạy được file tĩnh rồi, nhưng mà API của em không chạy được vẫn treo anh ơi.

Nghiện: À cái này tao biết trước mà, mày chạy về nhanh quá không kịp gọi.

Cave: Em thấy server hết tài nguyên em đã nâng cấp rồi, lên RAM, CPU mà vẫn không trụ được anh ạ. Bao nhiêu đồng nghiệp đang gọi em khướu nại, bao nhiêu khách hàng đang đợi còn tặng ô tô kia kìa.

Nghiện: Có vẻ nâng cấp theo chiều dọc (Vertical Scaling) không đủ, lúc này em cần nâng cấp theo chiều ngang  (horizontal scaling).

Cave: Nghĩa là thế nào anh? nói rõ đi tý xem nào? nói xong em cho anh xem rõ body em luôn, dọc ngang gì cũng được.

Nghiện :(Đang ngại) thôi anh cần gì thứ đó, lên mây  với anh là quan trọng, đại loại là nâng cấp theo chiều dọc là nâng cấp cấu hình độ loa, độ mũi gọt cằm (Nâng cấp cấu hình RAM,CPU, DISK) như em đang làm, còn nâng cấp theo chiều ngang là kiếm thêm mấy em trẻ đẹp (Thêm các máy chủ phục vụ cân bằng tải) phục vụ khi nhu cầu khách hàng tăng lên.

Cave: Nghe cũng được, nhưng mà request đến biết vào em nào chứ, em mua domain nó trỏ vào mỗi một IP thôi mà?

Nghiện: Có thể cân bằng tải (Load balancing)  ở mức DNS (Domain Name System)  nhưng hệ thống của em chắc không cần mức đấy mà em cần một con Reverse Proxy để thực hiện điều này?

Cave: Reverse Proxy, nghe quen quen, nó giống như là cái con proxy mình cấu hình ở mạng công ty xưa mình làm để vào internet đúng không?

Nghiện: Giống nhưng không phải, cái proxy điền để vào mạng nó là cái Forward Proxy có thể gọi tắt là proxy, còn cái Reverse proxy là cái để từ mạng vào hệ thống của mày,

Cave: Nghe anh nghiện trình bày em chả hiểu gì, biết thế không hỏi còn hơn.

Nghiện: Con này láo ông lại lột quần mày ra bây giờ? Cái Forward Proxy như thằng trông cửa thỉnh thoảng mày nhờ nó chạy ra ngoài  mua cái nọ cái kia, nghĩa là từ client muốn ra internet cần qua cái Forward Proxy. Còn cái Reverse Proxy như cái thằng điều khách, nó bảo khách A gặp em Mai, khách B gặp em Thúy ấy. Nghĩa là từ internet cần qua Reverse proxy để được chỉ định vào máy nào? Xem hình dưới đi.

![](https://images.viblo.asia/362f677a-5d83-46a6-ac53-62816dff0d20.PNG)

Cave: OK em hiểu rồi, em sẽ thêm vào con Reverse proxy và mấy con máy chủ nữa để load balancing thì khách hàng không bị treo do một em bị quá tải nữa, ngon luôn. Vậy mô hình của em sẽ là như thế này. nhỉ?
![](https://images.viblo.asia/914b5a08-df7b-4c11-97a3-ee05082e9906.png)


Nghiện: Đúng rồi? Về chạy xem ngon không? Tý lấy G63 xong cho anh xả đồ phát nhé!

Cave: OK thôi anh. Có gì em lại nhờ anh nhé!

Một số khái niệm cần lưu ý: Rate Limit, DNS, Proxy,  Reverse proxy, Load Balancing, CDN, Blob storage,Vertical Scaling,horizontal scaling

[Phần sau](https://viblo.asia/p/di-nghien-code-thuat-van-dap-cach-xay-dung-mot-website-hang-trieu-nguoi-dung-p2-Az45bR4O5xY)