Tạo CSS nhất quán, ngắn gọn và hiệu quả có thể là khá nhiều công việc. Có rất nhiều điều cần xem xét như khả năng đáp ứng, khả năng tiếp cận và cấu trúc. Đây chính xác là lý do tại sao CSS Framework tồn tại để loại bỏ gánh nặng đó cho bạn! 
Chúng ta hãy xem một số CSS Framework hàng đầu năm 2019.

## **Mục Lục:**

- Bulma
- Tailwind CSS
- Bootstrap 4
- Semantic UI
- Foundation
- Materialize CSS


## **Bulma**

![](https://images.viblo.asia/423c8b81-185b-46fb-86f6-071bdcc3f16e.png)

Hãy bắt đầu với CSS Framework được Scotch sử dụng và yêu thích. Một trong những lợi ích của Bulma là * hoàn toàn là CSS, không có JavaScript. Điều này có nghĩa là bạn chỉ cần bao gồm một tệp .css trong dự án của mình để bắt đầu, không yêu cầu .js.
Dưới đây là một vài tính năng khác.
* **Dựa trên Flexbox**
* **Được xây dựng với Sass để chỉ sử dụng những gì bạn cần**
* **Đầy đủ responsive và mobile-first**

Flexbox để xây dựng bố cục dựa trên grid-based là một cải tiến đáng kinh ngạc khi sử dụng floats. Điều đó nói rằng, mặc dù Bootstrap phổ biến hơn, nhưng phải mất một thời gian để Bootstrap chấp nhận Flexbox với phiên bản 4.0. Điều này đã giúp Bulma có được sự nổi tiếng trong khi Bootstrap 4.0 đang hoạt động.

Tìm hiểu chi tiết Bulma tại [đây](https://scotch.io/bar-talk/get-to-know-bulma-my-current-favorite-css-framework)


## **Tailwind CSS**

![](https://images.viblo.asia/1571bd51-7f35-46e9-8e68-a8a955e0c0e4.png)

Tailwind có một chút khác biệt ở chỗ nó tập trung nhiều hơn vào các **utility classes** thay vì các components UI hoàn chỉnh.
Bằng cách có một loạt các utility classes, bạn có thể tạo markup của mình một cách nhanh chóng:

```
<button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

Mặc dù điều này có thể trông xấu đối với một số người, thật tốt khi có các class sẵn sàng thay vì phải tạo một class mới chỉ cho button này và tạo style với một vài thuộc tính CSS.

Tìm hiểu chi tiết Tailwind tại [đây](https://tailwindcss.com/docs/what-is-tailwind/)

Thật dễ dàng custom Tailwind để tạo ra những thứ như alert boxes:
![](https://images.viblo.asia/cc1eeaf7-ff66-46af-9afc-4409faeec14f.png)
![](https://images.viblo.asia/dd9f7d82-b7c3-452c-95ae-e6a6496ce285.png)


 **Refactoring UI**

![](https://images.viblo.asia/84bdec45-2e2f-4b7c-9357-1934faa0bc51.png)

Sự thật thú vị về Tailwind. Hai trong số những người tạo ra Tailwind Adam Watham và Steve Schoger, những người đằng sau Tái cấu trúc UI. Tái cấu trúc UI là một nền tảng để học cách đưa thiết kế vào tay của bạn và thật không thể tin được! Họ chỉ phát hành cuốn sách / khóa học của họ với một số mẹo và mẹo thiết kế tốt nhất mà bạn có thể tìm thấy.

Tìm hiểu chi tiết tại [đây](https://refactoringui.com/book/) 


## **Bootstrap 4**

![](https://images.viblo.asia/3b7adc1c-2d47-4fba-8e24-fdd049e4e607.png)

Bootstrap luôn là một trong những CSS Framework lớn nhất hiện có. Nó thường là framework thực tế, đặc biệt là cho các nhà phát triển web. Sau vài năm làm việc, đầu năm 2018, phiên bản 4.0 chính thức đã phát hành! Bootstrap 4.0 là một bản cập nhật quan trọng.
* phối màu mới
* các class tiện ích mới
* được xây dựng trên flexbox
* được xây dựng với SASS vs LESS


## **Semantic UI**

![](https://images.viblo.asia/26f40d8c-47af-4880-9a2a-cba0bfb01da3.png)

Semantic UI có một cách tiếp cận độc đáo tập trung vào việc viết "HTML thân thiện với con người". Nói cách khác, các classes được đặt tên càng sát càng tốt với cách một người sẽ nói. Điều này làm cho việc viết HTML trực quan đặc biệt đối với các newer developers.
Semantic sử dụng Gulp làm công cụ build của nó. Nhiều quy trình công việc đã chuyển khỏi Grunt / Gulp theo hướng có lợi cho Webpack, vì vậy Gulp có thể là tích cực hoặc tiêu cực đối với bạn tùy thuộc vào quan điểm của bạn. Đây là một cái nhìn nhanh chóng về quy trình làm việc.
* install node và gulp
* install semantic-ui (bạn sẽ được nhắc nhập configuration)
* thay đổi vào thư mục của bạn và chạy gulp build


## **Foundation**

![](https://images.viblo.asia/68c4bcb4-42cc-48db-9690-4b7d7932bd19.png)

Foundation by Zurb kiểm tra hầu hết các tính năng mà chúng ta đã nói đến từ trước đến nay: responsive, mobile-first, acessibility, v.v...
Nó phức tạp hơn một chút so với hầu hết các tùy chọn khác và tự quảng cáo là một lựa chọn "chuyên nghiệp" hơn. Zurb rất vui khi cung cấp các lớp đào tạo với chi phí có vẻ giống như một giải pháp doanh nghiệp.

Foundation có thể được sử dụng để tạo email HTML tìm kiếm tuyệt vời!

Foundation cũng có thể được sử dụng để tạo các email HTML tuyệt vời. Tạo email HTML trong historically khá khó khăn (bạn không có quyền truy cập vào tất cả các tính năng HTML và CSS mà bạn đã sử dụng), vì vậy điều này có thể cực kỳ hữu ích cho những người đang gửi email.

**Starter Templates**
Foundation cũng cung cấp một sốresponsive starter templates để giúp bạn. xem thêm chi tiết tại [đây](https://foundation.zurb.com/templates.html).

![](https://images.viblo.asia/f9814fed-2852-41d7-a757-45d8b8bd046c.png)

Điều đáng chú ý là có một số công ty lớn đang sử dụng Foundation, vì vậy hãy coi đó là một dấu hiệu tốt.

Những công ty sử dụng Foundation:
![](https://images.viblo.asia/22947ed9-f5b3-4c29-be37-0749b12e43f1.png)


## **Materialize CSS**

![](https://images.viblo.asia/36aed60c-1afc-4085-a27c-e80c1ee9b8fb.png)

Như bạn có thể mong đợi, Materialize implements ** Google's Material Design, ** một trong những ngôn ngữ thiết kế phổ biến nhất hiện có.
Google đã thực hiện một công việc đáng kinh ngạc với việc thúc đẩy ngôn ngữ thiết kế này và đã tạo ra một giao diện rất phù hợp và thanh lịch trên nền tảng Android.
Nếu bạn đang tìm cách xây dựng một trang web với material design, đây là con đường phù hợp để đi.

Một trong những sự thật thú vị thực sự về Materialize là nó được tạo ra bởi bốn sinh viên khác nhau tại Carnegie Melon. Điều này không liên quan đến kỹ thuật, nhưng đáng nói là một chút cảm hứng mà mọi người có thể đóng góp bất kể tuổi tác, kinh nghiệm, vv!