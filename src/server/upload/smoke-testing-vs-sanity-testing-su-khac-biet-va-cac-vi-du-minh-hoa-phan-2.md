Trong [phần 1](https://viblo.asia/p/smoke-testing-vs-sanity-testing-su-khac-biet-va-cac-vi-du-minh-hoa-phan-1-Eb85o9w6Z2G), chúng ta đã tìm hiểu về khái niệm Sanity Testing và nắm được khi nào chúng ta cần sử dụng nó trong quá trình test. Trong bài viết này, chúng ta sẽ tiếp tục tìm hiểu khái niệm Smoke Testing và so sánh cụ thể những điểm giống và khác nhau so với Sanity Testing, từ đó đưa ra kết luận.

**1. Smoke Testing là gì**

![](https://images.viblo.asia/bb61d036-791c-4b0f-83a7-c484661e1bcb.jpg)

Smoke Testing không phải là một quá trình test toàn diện mà là một nhóm bài test được thực hiện để xác minh xem các chức năng cơ bản của một bản build phần mềm cụ thể đó có hoạt động tốt như mong đợi hay không. Đây là và phải luôn là bài test đầu tiên được thực hiện trên bất kỳ bản build “mới” nào.

Khi nhóm phát triển phát hành một bản build cho QA để thực hiện test, một điều rõ ràng nhận thấy là chúng ta không thể kiểm tra toàn bộ bản build và xác minh ngay lập tức nếu bất kỳ thực thi nào bên trong bản build đó có lỗi hoặc nếu có bất kỳ chức năng đang hoạt động nào đang bị hỏng. Về vấn đề này, làm cách nào để QA đảm bảo rằng các chức năng cơ bản đang hoạt động tốt? Câu trả lời cho điều này sẽ là thực hiện Smoke Testing.

Sau khi các bài test được đánh dấu là bài test Smoke đã pass thì bản build đó mới được QA chấp nhận để thực hiện tiếp việc kiểm tra chuyên sâu hoặc hồi quy. Nếu bất kỳ bài test smoke nào bị lỗi, bản build đó sẽ bị từ chối và nhóm phát triển cần fix lỗi và phát hành bản build mới để test.

Về mặt lý thuyết, Smoke Testing được định nghĩa là các bài test thuộc cấp độ bề mặt để chứng nhận rằng bản build do nhóm phát triển cung cấp cho nhóm QA đã sẵn sàng để thực hiện test thêm. Bài test này cũng được thực hiện bởi nhóm phát triển trước khi phát hành bản build cho nhóm QA.

Bài test này thường được sử dụng trong Kiểm tra tích hợp (Integration Testing), Kiểm tra hệ thống (System Testing) và Kiểm tra mức độ chấp nhận (Acceptance Level Testing). **Chúng ta không bao giờ được coi đây là sự thay thế cho một quá trình test hoàn chỉnh và đầy đủ từ đầu đến cuối**. Bài test này bao gồm cả các bài kiểm tra tích cực và tiêu cực tùy thuộc vào sự thực thi của bản build.

**2. Những ví dụ của Smoke Testing**

Như đã giới thiệu ở phần trên, bài test này thường được sử dụng cho 3 loại test **Tích hợp, Chấp nhận và Kiểm tra hệ thống**. Chúng ta chỉ nên chấp nhận một bản build sau khi chúng ta đã thực hiện xong quá trình smoke test với nó. Vì vậy, chúng ta hãy cùng xem smoke test là gì từ quan điểm của cả 3 loại test này, với một số ví dụ cụ thể.

***2.1. Test chấp nhận (Acceptance Testing)***

Bất cứ khi nào một bản build được release đến cho QA, việc thực hiện smoke test dưới dạng mẫu của một bài test chấp nhận nên được thực hiện. Trong bài test này, bài smoke test đầu tiên và quan trọng nhất là xác minh những thực thi cơ bản nhất của bản build. Như vậy, bạn nên xác minh tất cả các thực thi cho bản build riêng đó.

Chúng hãy cùng lấy ví dụ cho các bài test chấp nhận này cho một bản build cụ thể:

+ Đã triển khai chức năng đăng nhập để cho phép những lái xe đã đăng ký có thể đăng nhập thành công.
+ Đã triển khai chức năng bảng điều khiển để hiển thị các tuyến đường mà lái xe sẽ thực hiện trong ngày.
+ Đã triển khai chức năng để hiển thị thông báo thích hợp nếu không có tuyến đường nào tồn tại trong một ngày nhất định.

Trong bản build trên, ở mức chấp nhận, smoke test sẽ có nghĩa là xác minh rằng ba phương thức triển khai cơ bản ở trên đang hoạt động tốt. Nếu bất kỳ cái nào trong ba cái này bị lỗi, thì QA sẽ từ chối bản build.

***2.2. Test tích hợp (Integration Testing)***

Bài test này thường được thực hiện khi các module riêng lẻ được triển khai và kiểm tra. Ở mức test tích hợp, bài test này được thực hiện để đảm bảo rằng tất cả các chức năng tích hợp cơ bản và đầu cuối đều hoạt động tốt như mong đợi. 

Nó có thể là sự tích hợp của hai module hoặc tất cả các module với nhau, do đó độ phức tạp của bài smoke test sẽ khác nhau tùy thuộc vào mức độ tích hợp.

Chúng ta hãy xem xét các ví dụ sau về việc thực thi sự tích hợp cho kiểu bài test này:

+ Đã thực hiện tích hợp việc định tuyến và những điểm dừng.
+ Đã triển khai tích hợp cập nhật trạng thái đến và thể hiện tương tự trên màn hình của các điểm dừng.
+ Đã triển khai việc tích hợp chức năng nhận hoàn chỉnh đến tận các module chức năng giao hàng.

Trong bản build này, smoke test sẽ không chỉ xác minh ba thực thi cơ bản này mà đối với thực thi thứ ba, một số trường hợp cũng sẽ xác minh cho việc tích hợp hoàn chỉnh. Nó giúp ích rất nhiều cho việc tìm ra những vấn đề được đưa vào trong quá trình tích hợp và những vấn đề mà nhóm phát triển không chú ý.

***2.3. Test hệ thống (System Testing)***

Như chính tên gọi của nó, đối với cấp độ hệ thống, smoke test bao gồm các bài test cho các quy trình công việc quan trọng và thường được sử dụng nhất của hệ thống. Điều này chỉ được thực hiện sau khi toàn bộ hệ thống đã sẵn sàng và đã được kiểm tra, và bài test này cho cấp hệ thống có thể được gọi là smoke testing trước khi thực hiện việc kiểm tra hồi quy.

Trước khi bắt đầu test hồi quy cho một hệ thống hoàn chỉnh, các tính năng cơ bản từ đầu đến cuối được kiểm tra như một phần của smoke test. Một bộ smoke test cho một hệ thống hoàn chỉnh bao gồm các bài test từ đầu đến cuối mà người dùng cuối sẽ sử dụng rất thường xuyên.

Điều này thường được thực hiện với sự trợ giúp của các công cụ tự động hóa.

**3. Smoke Test Cycle**

Lưu đồ dưới đây sẽ giải thích Chu trình của quá trình smoke test. Khi một bản build được triển khai cho QA, chu trình cơ bản tiếp theo là nếu quá trình smoke test đã pass, bản build đó được nhóm QA chấp nhận để kiểm tra thêm nhưng nếu không thành công, bản dựng sẽ bị từ chối cho đến khi các vấn đề được báo cáo được khắc phục.

![](https://images.viblo.asia/b743fc29-05fb-4c72-9b9d-2d3edd92c121.jpg)

**4. Ai là người thực hiện**

![](https://images.viblo.asia/64929bc2-01d3-46c9-b224-e96b90a7774b.jpg)

Không phải toàn bộ nhóm QA đều tham gia vào loại test này để tránh lãng phí thời gian của tất cả các QA. Smoke test được thực hiện một cách lý tưởng bởi người đứng đầu nhóm QA, người sẽ quyết định dựa trên kết quả về việc chuyển bản build cho nhóm để test thêm hay từ chối nó. Hoặc trong trường hợp người đứng đấu nhóm QA vắng mặt thì chính các QA cũng có thể thực hiện bài test này. Đôi khi, khi dự án có quy mô lớn, một nhóm QA cũng có thể thực hiện bài test này.

**5. Ưu điểm và nhược điểm**

Đầu tiên chúng ta hãy xem xét những ưu điểm của nó vì ưu điểm chiếm đa số so với nhược điểm.

***5.1. Ưu điểm***

+ Dễ dàng thực hiện.
+ Giảm rủi ro.
+ Các vấn đề được xác định ở giai đoạn rất sớm.
+ Tiết kiệm công sức, thời gian và tiền bạc.
+ Chạy nhanh nếu tự động.
+ Các vấn đề và rủi ro tích hợp ít nhất.
+ Cải thiện chất lượng tổng thể của hệ thống.

***5.2. Nhược điểm***

+ Việc test này không tương đương hoặc thay thế cho việc chức năng hoàn chỉnh.
+ Ngay cả sau khi smoke test đã pass, bạn có thể vẫn tìm thấy các lỗi nghiêm trọng.
+ Loại test này phù hợp nhất nếu bạn có thể tự động hóa, nếu không sẽ mất nhiều thời gian cho việc thực hiện thủ công các test case, đặc biệt trong các dự án quy mô lớn có khoảng 700-800 test case.

Smoke test chắc chắn nên được thực hiện trên mọi bản build vì nó chỉ ra những lỗi chính và ảnh hưởng đến người dùng ở giai đoạn rất sớm. Điều này không chỉ áp dụng cho các chức năng mới mà còn cho việc tích hợp các module, fix lỗi. Nó là một quá trình rất đơn giản để thực hiện và nhận được kết quả chính xác.

Thử nghiệm này có thể được coi là điểm đầu vào cho quá trình test hoàn chỉnh về chức năng hoặc hệ thống (nói chung). Nhưng trước đó, nhóm QA nên rất rõ ràng về những thử nghiệm nào sẽ được thực hiện trong quá trình smoke test. Việc kiểm tra này có thể giảm thiểu các nỗ lực, tiết kiệm thời gian và nâng cao chất lượng của hệ thống. Nó giữ một vị trí rất quan trọng trong các giai đoạn nước rút vì thời gian trong các giai đoạn nước rút là ít hơn.

Việc test này có thể được thực hiện cả thủ công và cũng có thể nhờ sự trợ giúp của các công cụ tự động hóa. Nhưng cách tốt nhất và được ưu tiên là sử dụng các công cụ tự động hóa để tiết kiệm thời gian.

**6. Sự khác nhau giữa Smoke Testing và Sanity Testing**

Hầu hết chúng ta đều nhầm lẫn giữa ý nghĩa của Sanity test và Smoke Test. Trước hết, hai bài test này “khác nhau” và được thực hiện trong các giai đoạn khác nhau của chu kỳ test.

![](https://images.viblo.asia/41215db2-8ed5-4b99-8cfa-7290eac49593.jpg)

| S. No.    | Smoke Testing | Sanity Testing |
| --------   | -------- | -------- |
| 1        | Smoke Test có nghĩa là xác minh (cơ bản) rằng các thực thi được thực hiện trong một bản build đang hoạt động tốt.     | Sanity có nghĩa là để xác minh các chức năng mới được thêm vào, lỗi, ... đang hoạt động tốt.    |
| 2        | Đây là bài test đầu tiên cho một bản build mới.     | Được thực hiện khi bản build đã tương đối ổn định.    |
| 3        | Được thực hiện với tất cả các bản build.     | Được thực hiện ở các bản build ổn định sau khi đã test hồi quy.    |

**7. Kết luận**

Như vậy sau 2 phần của bài viết chúng ta đã làm rõ khái niệm của Sanity Testing và Smoke Testing và hiểu rõ vai trò của chúng trong quá trình test là khác nhau nhưng đều rất quan trọng và biết cách để áp dụng vào thực tế.

**8. Liên kết tham khảo**

https://www.softwaretestinghelp.com/smoke-testing-and-sanity-testing-difference/