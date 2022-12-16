Bạn đã bao giờ nghĩ tới việc: Thời đại viết code Frontend cho màn hình quản lý sẽ kết thúc?
Trong bài viết này, tôi sẽ giới thiệu tới các bạn 1 tool mới, có tên: VIRON
Có Viron, bạn chỉ thực hiện định nghĩa và implement API bằng OpenApi(Swagger) là đã có thể hoàn tất màn hình quản lý.
Ngoài ra, vì đây là Open Source  nên mọi người đều có thể tùy ý sử dụng.
![](https://images.viblo.asia/29258e45-74d9-4a66-ad37-ffa56e1da230.png)

### Khái quát

Viron là 1 Console Management tool quản lý, được thiết kế để giúp người dùng có thể quản lý được nhiều màn hình quản lý.
Các bạn chỉ cần tạp API Server và file  OAS2.0 json là đã làm xong 1 màn hình quản lý rồi.

### Chi tiết

Hiện tại, chúng tôi đang sử dụng Viron để phát triển, vận hành các Service quy mô từ lớn tới nhỏ trong nội bộ công ty.
Với mỗi service, site chúng tôi đều tạo ra một màn hình quản lý. Tuy nhiên, nó cũng có những hạn chế. Tôi chỉ là  lập trình viên quèn. Do đó, để tạo ra một trang màn hình quản lý, tôi lại phải đợi có design và làm API. Việc đợi chờ này khá là tốn effort.
Một vấn đề nữa là: Tùy thuộc vào producer, yêu cầu của admin page  mà UI, UX của màn hình quản lý cũng sẽ khác nhau. Vì vậy, chi phí học để tìm hiểu các behavior khá cao.
Ngoài ra còn có 1 bất tiện là: Khi ra ngoài, lúc tôi muốn xem, chỉnh sửa màn hình quản lý, thì không xem trên smartphone được => Qủa thực là rất khó khăn khi cần đối ứng gấp cho các trường hợp này.
Chính vì những nguyên nhân kể trên, anh CTO của công ty chúng tôi đã quan tâm đến tính linh hoạt của việc: Cần phải định nghĩa API theo OAS và tự động tạo màn hình quản lý. Vì vậy, chúng tôi đã bắt tay vào phát triển dự án này.

### ƯU ĐIỂM

Đối với Frontend Engineer
Với Viron, bạn không cần nhờ tới Frontend Engineer để tạo màn hình quản lý.
Toàn bộ phần Front sẽ được viron dựng lên.

**Đối với Server Side Engineer**

Server Side Engineer chỉ cần sử dụng API Server đã làm trên OpenAPI(Swagger).
Với việc sử dụng Open API, các bạn chỉ cần viết tài liệu là chương trình đã được tạo rồi. Bạn cứ hình dung là: Ngay khi bạn tạo xong tài liệu định nghĩa, thì đồng thời màn hình quản lý cũng được dựng xong. Sau đó, các bạn chỉ cần viết Logic theo tài liệu định nghĩa Swagger.
Ngoài ra, có thể sử dụng Viron trên các ngôn ngữ lập trình như: java, Node, PHP , nên nhiều lập trình viên, nhiều service có thể sử dụng ứng dụng này.

**Với Pruducer, người quản lý vận hành hệ thống.**

Bạn không cần ghi nhớ hành vi (behavior) của trang màn hình quản lý theo từng service riêng biệt. Với Console có tên Viron,  bạn có thể quản lý các “màn hình quản lý” khác nhau.
Một ưu điểm nữa của Viron, đó là: Viron là Responsive Design nên có thể sử dụng, thao tác với màn hình quản lý trên điện thoại Smartphone.

### Demo

Đầu tiên, các bạn mở[ Viron](https://cam-inc.github.io/viron/latest/#/) ra.

![](https://images.viblo.asia/d8de80ba-94d6-4e48-941b-1bf4020f9bc2.png)
Đây là màn hình Home. Bạn có thể tùy ý sắp xếp các Card của mỗi Endpoint. Bấm button  **追加**/Add, bạn đã thêm một màn hình quản lý.

![](https://images.viblo.asia/90b7933e-7313-4bb2-8b4b-917abf170ea0.png)

Chúng tôi cũng đã phát triển và public API Server dùng để test. Bất cứ ai cũng có thể vào page này để test.
Các bạn thử  nhập URL dưới đây rồi bấm vào button **追加**/Add.

https://viron.camplat.com/swagger.json

![](https://images.viblo.asia/c40a2991-a849-4ace-a849-8af99cf486aa.png)

Vậy là bạn đã tạo được 1 page màn hình quản lý. Bạn có thể chuyển tới màn hình Login bằng cách click vào Card. 

![](https://images.viblo.asia/790eeb52-d35b-486d-839a-acc4d7550c26.png)
Khi dựng Server, bạn có thể tùy chỉnh: login bằng ID or email/password hoặc login bằng cách chứng thực Google.
API Server lần này là bằng mail/password nên các bạn hãy nhập thông tin dưới đây và login vào.

| mail | password | 
| -------- | -------- | 
| viron@example.com    | Ev4PNxRrls4U     | 


Vậy là các bạn đã có thể login và vào được Dashboard. Như vậy là bạn hoàn tất việc tạo màn hình quản lý.

![](https://images.viblo.asia/01657e1a-921e-4553-9fb9-5fc4d3a605f6.png)

Bạn có thể xem được rất nhiều Sample từ màn hình bên trái.
Hãy tham khảo các sample đó nhé!

### Chức năng

Trên màn hình quản lý, bạn có thể kết hợp việc chuẩn bị chức năng CRUD (create, read, update, delete) với việc tự động tạo Component bằng cách định nghĩa trên Swagger

**Component Output**

Để hiển thị, chúng tôi đang dùng các Component dưới đây. Trong link này có kèm Sample code.
* [Component cho number value](https://cam-inc.github.io/viron-doc/docs/dev_component_number.html)

* [Table Component](https://cam-inc.github.io/viron-doc/docs/dev_component_table.html)

* [Chat Component](https://cam-inc.github.io/viron-doc/docs/dev_component_chart.html)

**Input Component**

Viron giúp bạn tạo ra nhiều loại Input Component, thông qua việc định nghĩa Format nhập dữ liệu bằng Swagger. 

[Form nhập text (1 dòng duy nhất)](https://cam-inc.github.io/viron-doc/docs/dev_form_textinput.html)

[Form nhập text (nhiều dòng)](https://cam-inc.github.io/viron-doc/docs/dev_form_textarea.html)

[Form nhập số](https://cam-inc.github.io/viron-doc/docs/dev_form_numberinput.html)

[Form nhập Pulldown](https://cam-inc.github.io/viron-doc/docs/dev_form_select.html)

[Form nhập checkbox](https://cam-inc.github.io/viron-doc/docs/dev_form_checkbox.html)

[Form nhập WYSWYG  ](https://cam-inc.github.io/viron-doc/docs/dev_form_wyswyg.html)

[Form nhập có kèm Auto Complete](https://cam-inc.github.io/viron-doc/docs/dev_form_autocomplete.html)

[File Uploader](https://cam-inc.github.io/viron-doc/docs/dev_form_uploader.html)

### Tóm tắt

Tôi vừa giới thiệu tới các bạn chức năng của Viron. 
Nhưng nên định nghĩa Swagger như thế nào, nên tạo trang như thế nào cho dễ...v.v. tôi đã trình bày  chi tiết trong Document dưới đây. 
Ngoài ra, khi tạo trang quản lý trong thực tế, boilerplate dùng để implement chức năng chứng thực bằng example-email, example-google trên Responsitory cũng sẽ được tạo ra. Vì vậy, bạn có thể thực hiện thêm các chức năng mở rộng (expand function)
Cuối cùng, vì Viron là OSS (Open Source Software) nên tôi đã tập hợp các pull request lại, để các bạn dễ tìm hiểu.

**Dưới đây là phần giải thích khi implement API.**

### Link

[Viron](https://cam-inc.github.io/viron/latest/#/)

[GitHub](https://github.com/cam-inc/viron)

[viron-doc](https://cam-inc.github.io/viron-doc/)

   - Document

[node-vironlib](https://github.com/cam-inc/node-vironlib)

[Library đơn giản để dựng API Server](https://github.com/cam-inc/node-vironlib)

[npmSite](https://www.npmjs.com/package/node-vironlib)

[Tài liệu chi tiết](https://cam-inc.github.io/viron-doc/docs/adv_vironlib.html)

~~~~~~~~~~~~~~~~~~~~~~~~~~~
The End

Link bài gốc: https://qiita.com/tosaka07/items/87ef283db4b2ee19b636
Dịch bài: Thanh Thảo