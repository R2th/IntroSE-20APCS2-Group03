## Tổng quan
Để tạo ra giao diện website chúng ta sẽ phải trải qua nhiều công đoạn trong số đó sử dụng CSS là điều vô cùng quan trọng. Chúng ta sẽ phải xây dựng các thành phần style cho giao diện như header, footer, content, button và đặc biệt là responsive. Để tạo ra giao diện website chúng ta sẽ phải viết  khá nhiều CSS. Có rất nhiều điều chúng ta cần xem xét như khả năng hiển thị, khả năng accessibility và cấu trúc. Đây là lý do tại sao CSS Framework tồn tại, để loại bỏ những gánh nặng đó cho chúng ta! Chúng ta hãy cùngnxem một số CSS Framework hàng đầu nên sử dụng trong năm 2019.

## Các CSS FrameWorks hàng đầu 2019
### 1. Bulma
![](https://images.viblo.asia/a499e3a4-52f9-4821-90a7-e79d39d68ecf.png)
Một trong những lợi ích của Bulma là sử dụng hoàn toàn là CSS, không có JavaScript. Điều này có nghĩa là bạn chỉ cần bao dẫn một tệp .css trong dự án của mình để bắt đầu, không yêu cầu tập tin .js.
Dưới đây là một vài tính năng khác:
- Dựa trên Flexbox
- Được build với Sass để chỉ sử dụng những gì bạn cần
- Hỗ trợ Responsive 
Sử dụng Flexbox để xây dựng bố cục dựa trên grid là một cải tiến đáng kinh ngạc so với float. Mặc dù Bootstrap phổ biến hơn, nhưng phải mất một thời gian để Bootstrap chấp nhận Flexbox với phiên bản 4.0. Điều này đã giúp Bulma có được sự nổi tiếng trong khi Bootstrap 4.0 đang hoạt động.
### 2. Tailwind CSS
![](https://images.viblo.asia/0f6808ba-c839-437f-8e6a-404c6bbc6b81.png)
Tailwind có một chút khác biệt ở chỗ nó tập trung nhiều hơn vào các lớp tiện ích thay vì các thành phần UI được hỗ trợ đầy đủ. Cá nhân tôi thích khái niệm này vì nó cho bạn khả năng xây dựng giao diện của riêng bạn trong khi tận dụng các class của Framework. 
Bằng cách sử dụng các class tiện ích, bạn có thể xây dựng layout của mình một cách nhanh chóng:
```
<button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
  Button
</button>
```
Mặc dù điều này có thể không phải là điều ưu thích đối với một số người, nhưng Framework đã xây dựng các class có sẵn thay vì phải tạo một class mới chỉ để style cho nút này.
### 3. Refactoring UI
![](https://images.viblo.asia/7e76ffda-cc34-40b7-aa84-bc9675543423.png)
Có một sự thật thú vị về Tailwind đó là 2 trong số những người tạo ra Tailwind Adam Watham và Steve Schoger chính là những người tạo ra Refactor UI. Refactor UI là một nền tảng để học cách đưa thiết kế vào tay của bạn và thật không thể tin được!
### 4. Bootstrap 4
![](https://images.viblo.asia/ddfb2d11-27c5-44b1-a1a8-821affd6e78b.png)
Bootstrap luôn là một trong những CSS Framework lớn nhất hiện có. Nó thường được các lập viên Web ưu thích sử dụng. Sau vài năm phát triển đầu năm 2018 phiên bản 4.0 chính thức đã phát hành! Bootstrap 4.0 là một bản cập nhật quan trọng.
- Bộ màu sắc mới
- Các class tiện ích mới
- Dựa trên Flexbox
- Build với SASS và LESS
### 5. Semantic UI
![](https://images.viblo.asia/2bebe962-ff1d-434d-8d96-e6a9c0eaaae7.png)
Sematic UI có một cách tiếp cận độc đáo tập trung vào việc viết "HTML thân thiện với con người". Nói cách khác, các class được đặt tên càng sát càng tốt với cách một người sẽ nói. Điều này làm cho việc viết HTML trực quan đặc biệt đối với các lập trình viên mới. 
Semantic sử dụng Gulp làm công cụ build. Đây là một cái nhìn nhanh chóng về quy trình cài đặt:
- Cài đặt node và gulp
- Cài đặt sematic-ui
- Vào thư mục chứa project và chạy gulp build
### 6. Foundation
![](https://images.viblo.asia/ddd06f8a-e1ff-487c-b00c-206d36142f4c.jpg)
Foundation by Zurb có hầu hết các tính năng mà chúng ta đã nói đến từ trước đến nay: responsive mobile first, tính linh hoạt, v.v. Nó phức tạp hơn một chút so với hầu hết các Framework khác và tự quảng cáo là một lựa chọn "chuyên nghiệp" hơn. Foundation cũng cung cấp một số template mẫu để chúng ta tham khảo.
### 7. Materialize CSS
![](https://images.viblo.asia/648a73cb-c126-4326-a0ad-c0fb70f16788.png)
Như bạn có thể mong đợi, Materialize triển khaiGoogle's Material Design một trong những ngôn ngữ thiết kế phổ biến nhất hiện có. Google đã thực hiện một công việc đáng kinh ngạc với việc thúc đẩy ngôn ngữ thiết kế này và đã tạo ra một giao diện rất phù hợp và thanh lịch trên nền tảng Android. Nếu bạn đang tìm cách xây dựng một trang web với thiết kế Material, đây là con đường phù hợp để đi.

**Tài liệu tham khảo:** https://scotch.io/bar-talk/6-popular-css-frameworks-to-use-in-2019