**1. Giới thiệu chung**

Một test case trong công nghệ phần mềm là một single step hoặc một chuỗi các step để xác nhận đúng các hành vi/chức năng của các tính năng nhất định của ứng dụng. Một testcase về cơ bản xác định liệu ứng dụng hay hệ thống phần mềm có làm việc như yêu cầu hay không. Mục đích của việc viết testcase là để giúp chuẩn hóa quá trình test và giảm thiểu những cách thức test tùy tiện hay ad-hoc. Có thể sẽ mất nhiều testcase để test một hệ thống phần mềm một cách đầy đủ và kỹ lưỡng trước khi nó được release.

Có 2 bước cơ bản khi viết một testcase là bước chuẩn bị và bước viết testcase. Bên dưới sẽ mô tả chi tiết cách thức thực hiện 2 bước này.

**2. Chuẩn bị để viết một testcase**

![](https://images.viblo.asia/29b7eb19-e833-4f50-a499-a82cac10dc7f.png)

**Cân nhắc testcase đó đã có hay chưa**. Trước khi viết một testcase mới cho một module, bạn luôn cần tìm xem đã có testcase nào đã được viết để test cho cùng module đó hay chưa, điều này có thể giúp tiết kiệm nhiều thời gian. Nếu bạn đã tìm được testcase cho module đó thì hãy cân nhắc việc cập nhật nó thay vì viết một cái mới.

![](https://images.viblo.asia/e518f57c-b4e9-4e20-abf7-fd4cbb8cd180.png)

**Biết những đặc điểm của một testcase tốt.** Biết điều gì tạo nên một testcase tốt sẽ giúp bạn viết một testcase tốt hơn và mạnh hơn. Những đặc điểm này bao gồm:
* Tính chính xác: Phải làm rõ được mục đích của việc kiểm thử
* Khả năng của việc kiểm thử là có thể bám sát lại theo các yêu cầu
* Tính lặp lại: test case có thể được sử dụng để thực hiện test nhiều lần nếu cần.
* Tính tái sử dụng: test case có thể được sử dụng lại nếu cần thiết.
* Tính độc lập: Mỗi testcase bạn viết phải có thể được thực hiện theo bất kỳ thứ tự nào, mà không phụ thuộc vào các test case khác.
* Sự can thiệp: Mô tả về một testcase phải đơn giản, rõ ràng và không có các bước hoặc từ không liên quan. Một tester có thể hiểu nó bằng cách đọc nó một lần. Mô tả nên sử dụng các từ hành động, như "do 'x'" và "do 'y'."
	
![](https://images.viblo.asia/4471f1b9-4286-428b-a2ae-4fb3930a3db3.png) 
    
**Xem xét các kịch bản khác nhau trước khi viết.** Tập trung vào điều gì có thể xảy ra với sản phẩm khi được sử dụng bởi khách hàng. Hãy suy nghĩ về điều này một cách cẩn thận và thiết kế các bài test của bạn cho phù hợp.

**Kịch bản nên ngắn gọn**. Mục tiêu của một test case không phải là cung cấp nhiều chi tiết cụ thể, mà thay vào đó là truyền đạt một ý tưởng cụ thể về thử nghiệm một trường hợp cụ thể.

![](https://images.viblo.asia/ecdd6770-f0cc-4368-85c1-5c8e17d9f2ba.png)

**Cho bản thân bạn đủ thời gian viết.** Vì các kịch bản và trường hợp là cơ sở cho các test case và việc test trong tương lai, bạn cần cho mình đủ thời gian để viết một bài test chất lượng cũng như thời gian để quy trình test được xem xét kỹ lưỡng.

**3. Viết một testcase**

![](https://images.viblo.asia/8be2a84b-1010-44d9-923a-9744ce71d1c2.png)

**Chọn một công cụ để viết một test case.** Bảng tính Excel rất được khuyến khích để viết các test case cơ bản và để test chúng theo cách thủ công. Khi bạn có kế hoạch tự động hóa các test case, hãy nghĩ đến việc lấy giấy phép, bản quyền cho các công cụ như Test Director. Ngoài ra còn có một số công cụ có thể được tải xuống miễn phí trên Internet.

![](https://images.viblo.asia/0d9ca753-d2ca-4dcb-8555-f5ec23552e02.png)

**Viết một test case với công cụ bạn chọn.** Điều này sẽ cho phép bạn luôn giữ được sự theo dõi với test case và các dữ liệu liên quan. Một mẫu test case tốt bao gồm:
* **Số serial**: Đây là số đếm đại diện cho test case.
* **ID của bộ test**: Đây là số ID của bộ test mà test case này thuộc về.
* **ID của test case**: ID của test case.
* **Tóm tắt test case**: Mô tả tóm tắt test case hoặc mục tiêu của test case
* **Yêu cầu liên quan**: Số ID của yêu cầu mà test case này trỏ đến.
* **Điều kiện tiên quyết**: Đây là bất kỳ điều kiện tiên quyết nào phải được thực hiện trước khi thực hiện bài test.
* **Phương pháp kiểm thử/Steps**: Đây là phương pháp step-by-step để thực thi việc kiểm thử. Ở phần này, hãy mô tả thật cụ thể và rõ ràng, vì đây là thành phần quan trọng nhất của một test case. Mỗi bước có thể được viết trực tiếp bằng cách sử dụng các từ khóa như "nhập", "xác minh", "nhấp chuột", "đăng nhập", ...
* **Kết quả dự kiến**: Kết quả dự kiến ​​của bài test. Trong khi viết test case, hãy lưu ý trang / màn hình nào bạn muốn xuất hiện sau khi test. Bạn cũng có thể đính kèm ảnh chụp màn hình hoặc tài liệu đặc tả vào bước có liên quan và lưu ý rằng hệ thống nên hoạt động như được phác thảo để giúp đơn giản hóa bước và dự đoán kết quả và thực hiện quá trình dễ dàng hơn để làm theo cho người thử nghiệm.
* **Kết quả thực tế**: Đây là kết quả của bài test sau khi nó được thực hiện.
* **Trạng thái**: Đây là trạng thái sẽ xảy ra trong quá trình test, ví dụ: "Đạt" hoặc "Thất bại / Lỗi". Tình trạng khác cũng có thể được sử dụng, chẳng hạn như "Không được thực hiện" nếu test không được thực hiện và "Bị chặn" nếu test bị chặn.
* **Lưu ý**: Tại đây bạn có thể thêm bất kỳ nhận xét nào về test case hoặc quá trình thực hiện test case.
* **Tạo bởi**: Đây là tên của người tạo ra bài test.
* **Ngày tạo**: Đây là ngày khi bạn thực hiện test.
* **Được thực hiện bởi**: Đây là tên của người thực sự thực hiện bài test.
* **Ngày thực hiện**: Ngày bạn thực hiện test.
* **Môi trường thử nghiệm**: Các hệ thống trong đó các bài test được thực thi. Ví dụ, hệ điều hành và trình duyệt web bạn đã sử dụng.

![](https://images.viblo.asia/705a7dbb-3372-46ca-b303-48a75f45d46f.png)

**Viết một bản tường trình cơ bản**. Có một định dạng điển hình cho bản tường trình này:
* Xác minh [những gì đang được thử nghiệm].
* Sử dụng [tên công cụ, tên thẻ, hộp thoại, ...]. Thay vì "sử dụng", bạn cũng có thể dùng "nhập" hoặc "chọn", tùy thuộc vào tình huống của test case cụ thể của bạn.
* Với [điều kiện của bài test].
* Để [những gì được trả lại, hiển thị, chứng minh]

![](https://images.viblo.asia/37d53136-d2af-4f32-9c2d-62be223ed4b0.png)

**Review test case đã được viết**. Công việc của bạn sẽ chưa hoàn thành sau khi bạn viết test case, bạn sẽ cần xem lại mọi thứ đã được viết và đánh giá rằng tất cả các bước đều rõ ràng và dễ hiểu và kết quả mong đợi phù hợp với các bước đó. Bạn có thể tự xem xét trường hợp và đánh giá bất kỳ khoảng trống hoặc khu vực bị thiếu nào bằng cách đặt mình vào vai trò của người kiểm tra. Bạn cũng có thể xem xét test case của mình bởi những tester ngang hàng (được gọi là việc review đánh giá ngang hàng), bởi người phát triển, bởi chủ sở hữu sản phẩm hoặc bất kỳ bên liên quan nào.

**4. Lời khuyên**

Trong khi viết các test case, hãy đảm bảo rằng tất cả các test case của bạn phải đơn giản và dễ hiểu. Hãy viết thật xúc tích, chính xác và đi vào mục tiêu ngay lập tức. Đừng viết một test case như một bài luận.

Viết test case của bạn đủ chi tiết để có thể đưa cho thành viên nhóm hoặc đồng nghiệp mới, người có thể dễ dàng thực hiện test và sẽ giúp xác định bất kỳ khu vực nào đang có vấn đề.

**5. Liên kết tham khảo**

https://www.wikihow.com/Write-a-Test-Case#_note-1