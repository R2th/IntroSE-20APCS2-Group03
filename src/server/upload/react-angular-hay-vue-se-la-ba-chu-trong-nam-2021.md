> Hello mọi người, lần này mình xin chia sẻ lại một bài viết và nếu bạn quan tâm đến nội dung bài chia sẻ này thì hãy đọc hết và chia sẻ cảm nhận hay suy nghĩ của mọi người nhé. :kissing_heart:


**Let's go!!!!**

Bất kỳ ai bắt đầu sự nghiệp `software development` đều có thể phải đối mặt với thách thức trong việc lựa chọn `language`, `framework`, hoặc `toolbox` đầu tiên. Tôi chắc rằng mỗi người trong số các bạn đều quen thuộc với điều này. Câu trả lời cho câu hỏi nên học gì trước không phải quá dễ tìm. Vấn đề là có rất nhiều ngôn ngữ và công cụ trong ngành lập trình. Để tạo điều kiện lựa chọn công cụ cho những `programmers` tập trung vào `front-end development` bằng `JavaScript`, tôi quyết định nói về ba công cụ `JS` phổ biến. Tôi sẽ nói về `Angular`, `React` và `Vue`.

Trước tiên, tôi sẽ cung cấp cho bạn một số nghiên cứu sẽ giúp chúng ta hiểu được “`balance of power`” trong lĩnh vực `web development` hiện đại. Và sau đó tôi sẽ nói về những ưu điểm và nhược điểm của những công cụ này.

### 1. Stack Overflow Research

![](https://images.viblo.asia/6c20a27d-563f-4b53-b8e5-1c6d933ed2da.png)

Theo nghiên cứu trên `Stack Overflow 2019`, bạn có thể tìm thấy thông tin về sự phổ biến của `frameworks` và `libraries`. Ở đây, thư viện `React` và` framework Angular` lần lượt được xếp hạng thứ hai và thứ ba. Trong một nghiên cứu tương tự năm 2018, `Angular` vượt trội hơn so với `React`. Nhưng nếu bạn nhìn vào kết quả của một cuộc khảo sát của các nhà phát triển chuyên nghiệp, thì `Angular` trong năm 2019 cũng sẽ cao hơn `React`. Nhưng `Vue`, mặc dù thực tế là `framework` này đang phát triển tích cực, chỉ đứng ở vị trí thứ bảy trong bảng xếp hạng.

### 2. NPM Trends Project Data

![](https://images.viblo.asia/e1488647-b1ea-4074-a39f-41d135878e8a.png)

Biểu đồ trên được xây dựng bằng khả năng của dự án`NPM Trends` . Điều này cho thấy sự thay đổi về số lượt tải xuống của `packages` tương ứng theo thời gian. Đặc biệt, biểu đồ của chúng tôi hiển thị dữ liệu trong 6 tháng của năm 2020. Ở đây bạn có thể thấy rõ rằng `React`, theo chỉ số đã nghiên cứu, vượt trội hơn đáng kể so với các đối thủ cạnh tranh. Mặt khác, số lượt tải xuống `Vue` đang dần tăng lên và hiện đã ở mức 1,5 triệu.

`NPM Trends` cho phép bạn không chỉ phân tích số lượt tải xuống `package` từ `NPM` mà còn cả dữ liệu của các dự án tương ứng được lấy từ `GitHub`. Hình ảnh dưới đây cho thấy chi tiết kho lưu trữ cho `front-end tools` mà chúng ta quan tâm.

![](https://images.viblo.asia/86eab75d-9d57-466b-bbbd-445b1ee3db92.png)


### 3. State of JavaScript research

Sử dụng kết quả của cuộc [khảo sát](https://2019.stateofjs.com/front-end-frameworks/) `State of JavaScript năm 2019`, chúng tôi có thể tiếp tục so sánh các công cụ mà chúng tôi quan tâm. Hình dưới đây cho thấy một báo cáo cung cấp thông tin về thái độ của người trả lời đối với `React`, `Vue` và `Angular`. Khi đánh giá một `framework` hoặc `library`, họ có thể chọn các câu trả lời khác nhau. Ví dụ, trong số đó có những câu như: “Tôi đã sử dụng và sẽ sử dụng”, “Tôi đã nghe và muốn học”, “Tôi chưa bao giờ nghe nói”.

![](https://images.viblo.asia/25f39d44-9112-4b22-8cf7-c09d39b117c5.png)

Như bạn có thể thấy, `React` và `Vue` bỏ xa `Angular` về câu trả lời  “Tôi đã sử dụng và sẽ sử dụng”.

### 4. Angular

![](https://images.viblo.asia/bebb3b13-16e2-4dad-b113-736713e38e54.png)

Đối với tôi, `Angular` là `framework` mà từ đó tôi bắt đầu cuộc hành trình của mình vào thế giới phát triển phần mềm. Và tôi không hối hận khi chọn `framework` này. `Angular`, so với `tools` khác được thảo luận ở đây, có thể được coi là trưởng thành hơn một chút so với chúng. Một cộng đồng lớn hơn đã hình thành xung quanh nó. Ngoài việc là một phần của `famous MEAN stack`, `framework` này cũng cung cấp cho nhà phát triển rất nhiều tính năng tuyệt vời. Ví dụ: t`wo-way data binding`, `dependency injection`, `MVC`, `Angular CLI`, hỗ trợ `TypeScript`, hỗ trợ `directive`, v.v.

Nhưng trong vài năm qua, khi các đối thủ cạnh tranh như `React` và `Vue` ngày càng trở nên phổ biến, `Angular` đã mất đi phần nào sự nổi tiếng trước đây. Lý do cho điều này là `Angular` là một `framework` khá nặng. Nó không đạt được kỳ vọng của các lập trình viên theo nhiều cách. Đây là những tính năng của việc phát hành các phiên bản mới, và sự hỗ trợ hạn chế cho `SEO` và những khó khăn trong quá trình nghiên cứu. Đây là lý do tại sao `front-end developers` ngày càng chọn `Vue` hoặc `React` ngày càng nhiều. Nhưng `Angular` vẫn được sử dụng trong nhiều dự án `web` phổ biến. Ví dụ: `Guardian`, `Upwork`, `PayPal`, `Sony`. 

`Angular` đáng được lựa chọn trong các trường hợp sau:

* Phát triển các dự án quy mô lớn.
* Sự cần thiết của một kiến trúc có thể mở rộng.
* Quan tâm đến việc sử dụng `TypeScript`.
* Tạo các ứng dụng thời gian thực.

### 5. React

![](https://images.viblo.asia/0343f9de-1fe4-4889-a9d7-2397a42d7580.png)

`React`, theo nghiên cứu của `State of JavaScript`, đã được xếp hạng nhất trong tất cả các bảng xếp hạng trong ba năm liên tiếp. Thư viện `React` được `Facebook` phát hành vào năm 2013. Mục tiêu của `React` là chia giao diện người dùng thành một tập hợp các `components` để đơn giản hóa quá trình phát triển. Một trong những lợi ích của `React` là khả năng sử dụng thư viện này để phát triển các ứng dụng gốc. Các điểm mạnh khác của thư viện này bao gồm một cộng đồng lớn, hỗ trợ từ `Facebook`, một hệ sinh thái lớn, hiệu suất cao, cơ chế tái sử dụng thành phần và hỗ trợ `SEO`.

Đúng là, đôi khi các bản cập nhật `React` có thể gây ra một số bất đồng và tranh cãi giữa các `developers`, vì họ phải thay đổi một số thứ trong công việc của mình để tránh các vấn đề tương thích. Những nhược điểm khác của `React` bao gồm việc sử dụng `JSX` và thiếu tài liệu chi tiết.

Sử dụng `React` khi nào: 

* Xây dựng `single page` hoặc các ứng dụng đa nền tảng.
* Phát triển các ứng dụng cấp doanh nghiệp nhỏ.


### 6. Vue

`Vue` là một dự án tương đối gần đây. Nó đột nhiên biến từ một `framework` bình thường trở thành một trong những công cụ phát triển `web` được yêu thích nhất bởi các lập trình viên.

![](https://images.viblo.asia/8176a8c7-71ac-42d9-ba9a-99c0ad8b6569.png)

Mức độ phổ biến của `framework` này đang tăng lên nhanh chóng do kích thước khiêm tốn, tài liệu chi tiết, hỗ trợ tái sử dụng và phản ứng thành phần, khả năng sử dụng `TypeScript` và dễ học. `Vue` là một `framework` rất đặc biệt, một số tính năng của nó thậm chí có thể trông giống như lỗ hổng. Ví dụ, `Vue` cực kỳ linh hoạt. Nhưng đôi khi, đối với các nhóm có số lượng nhà phát triển lớn, nó có thể quá linh hoạt.

Các chuyên gia trong lĩnh vực này hiện đang rất có nhu cầu tại thị trường châu Á. Nhưng `Vue` cũng có nhược điểm. Ví dụ - không thích ứng tốt lắm để hỗ trợ các dự án quy mô lớn và một cộng đồng nhỏ. 

Nên sử dụng `Vue` trong các tình huống sau:

* Phát triển các ứng dụng nhỏ và nhẹ (như `Grammarly`).
* Tạo ra các dự án thông minh và hiệu suất cao.
* Phát triển các ứng dụng web trong giai đoạn đầu phát hành ra thị trường.


### 7. Kết luận

Nếu chúng ta rút ra kết luận từ những điều trên, thì hóa ra công cụ giao diện người dùng tốt nhất, đáng để học hỏi vào năm 2021, là `React`. Tiếp theo là `Vue`. Nhưng rất có thể thay vì `Vue`, `Angular` có thể được theo sau bởi `React`. `Famework` này đã tồn tại lâu hơn `Vue`. Có vẻ như `Angular` sẽ không biến mất vào năm 2021. Do đó, nếu bạn là một nhà phát triển `Angular`, thì tôi khuyên bạn, khi bạn chuẩn bị cho năm 2021, hãy bắt đầu học `React`.

Bạn nghĩ công cụ `web` nào sẽ có nhu cầu cao vào năm 2021?

**Tài liệu tham khảo**: https://raevskymichail.medium.com/finding-the-best-frontend-tool-of-2021-17369b95c8bb

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)