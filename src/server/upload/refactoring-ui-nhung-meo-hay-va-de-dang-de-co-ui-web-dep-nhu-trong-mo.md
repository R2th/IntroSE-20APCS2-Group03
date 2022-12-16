Đã bao nhiêu lần, bạn gặp phải những website có giao diện người dùng trông tuy đơn giản nhưng rất đẹp, cực "dễ chịu" cho đôi mắt mà không biết thực sự vì sao? Và bao lần bạn thử tự mình design một UI, gặp cảm giác khó nhọc + ức chế, và kết quả cuối cùng thì trông dở thậm tệ? Sau cùng bạn vẫn không thoát khỏi sự lệ thuộc vào các framework như Bootstrap mà đã có cả nghìn trang dùng giống y xì đúc nhau?

Nếu bạn cũng như mình, chỉ là developer backend/frontend và có "zero" kiến thức về design, nhưng vẫn sẽ có một lúc nào đó phải đụng đến design. Có thể lý do là dự án bạn tham gia không may thiếu designer và developer phải tự design, hoặc khi bạn muốn làm pet project - dự án cá nhân cho riêng mình. Đây là những lúc mà một vài mẹo design nhỏ có thể sẽ rất hữu dụng.

Trong quá trình tìm hiểu, mình tình cờ khám phá ra được cuốn **[Refactoring UI](https://refactoringui.com/book/)** bởi 2 tác giả Adam Wathan và Steve Schoger. Được viết dành riêng cho những developer backend hay frontend mà không chuyên design, quyển sách tuy chỉ dài chưa tới 300 trang nhưng tổng hợp những kiến thức - mẹo hay mà bạn có thể áp dụng trong quá trình thiết kế giao diện web của mình *ngay lập tức*, không quá đào sâu nhiều đến lý thuyết (một trong hai tác giả là developer vốn đã từng rất kém về design).

Dưới đây, mình xin chia sẻ một vài tip, trick trong số rất nhiều kiến thức hay mà mình đã khám phá ra được từ cuốn sách.

# 1. Chọn font nào cho hợp lý?
Một giải pháp an toàn nhất là **dùng ngay font chữ của hệ thống**. Đoạn CSS để dùng font chữ hệ thống đơn giản như sau:
```css
html {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
```
Điểm lợi nhất của việc dùng font chữ hệ thống là **vừa "tự động" đẹp, vừa cho hiệu năng tốt**: trình duyệt khỏi cần load thêm font khi tải trang, giúp tăng tốc độ load trang, hạn chế hiện tượng văn bản hiển thị chậm hoặc bị "nháy" font (hiện tượng font chữ bị chuyển từ font fallback sang font custom sau khi được load xong). Đây chính là giải pháp được GitHub và Medium tin dùng.

Tuy nhiên, không phải việc dùng font mặc định của OS lúc nào cũng là ý hay. Đôi khi ta cần dùng font chữ để gây ấn tượng, nhận dạng thương hiệu,... Lúc này, bạn nên tìm một font chữ custom để sử dụng.

Có một vấn đề là, không hề dễ dàng để lựa chọn một font ưng ý, nhất là khi trên **Google Fonts** có đến hàng nghìn font chữ khác nhau. Có một mẹo cực hay: hãy thử **lọc ra các font có ít nhất trên 10 style**, đó thường là các font chữ tốt, đẹp và được làm kỹ lưỡng.

![Google Fonts filter by styles](https://images.viblo.asia/538cc55a-9644-4756-804c-8611fe88ddd1.PNG)

# 2. Nhiều chưa hẳn đã là tốt
## Hạn chế dùng quá nhiều loại cỡ font hay khoảng cách
![Dùng quá nhiều loại font chữ](https://images.viblo.asia/8cdcbe5d-b6fc-4b16-825f-e2b7016e255e.PNG)

![Sử dụng một vài loại font chữ một cách thống nhất](https://images.viblo.asia/39fded03-5de8-4de9-8008-70f7cafc517f.PNG)

Có những lúc, bạn phân vân không biết nên chọn font-size nào: phần tử này nên có font chữ là 13px hay 14px? Tiêu đề ở đây font chữ 20px liệu có to quá không? Điều này nếu cứ lặp đi lặp lại mãi sẽ tốn thời gian không nhỏ và gây ức chế cho chính bạn.

Và cực điểm của điều này chính là **mỗi chỗ bạn lại để font-size một kiểu**: mặc dù các text có độ quan trọng ngang nhau, bạn lại để chỗ thì 12px, chỗ thì 13px, chỗ lại 14px (?) Với các cặp mắt khó tính, khi nhìn vào giao diện của bạn, họ sẽ dễ dàng để ý và cảm giác ức chế là không thể tránh khỏi.

Thực tế, chỉ cần 7-10 loại font-size khác nhau là đã đủ cho nhu cầu xây dựng một website! Vậy thay vào việc chọn font-size mỗi lần tạo một element, hãy cố gắng **định nghĩa trước những kích thước font** mà bạn sẽ dùng xuyên suốt project, đặt cho nó các cái tên dễ nhớ như sm, md, lg, xs,...

Điều này cũng đúng với các khoảng cách padding và margin. Thay vì nghĩ ra số px hay em, rem mỗi lần định nghĩa ra một element, hãy thử định nghĩa ra trước các kích cỡ mà bạn sẽ muốn dùng trong project.
## Hạn chế dùng quá nhiều màu sắc
Các trình soạn thảo editor hay IDE ngày nay khá hiện đại. Khi làm việc với css, khi cần các editor hay IDE có thể mở ra khung color picker giúp bạn dễ dàng chọn màu sắc inline ngay khi cần:

![Color picker trong Visual Studio Code](https://images.viblo.asia/3e69ed2d-7aa2-4b91-b68e-7721512b2340.png)

Dễ dàng thấy là rất nhiều newbie khi code frontend lạm dụng tính năng này nhiều, mỗi lần CSS một phần tử lại chọn ra một kiểu màu sắc khác nhau, thành ra thành quả sau này là **mỗi chỗ màu sắc một kiểu**. Sự kém thống nhất về màu sắc này tiếp tục sẽ là cái gây ức chế không nhỏ với các cặp mắt khó tính.

Giải pháp tiếp tục là **định nghĩa ra trước các loại màu** mà bạn muốn dùng, mỗi loại màu lại có các dải màu tương ứng gồm 10-12 sắc thái khác nhau:

![Color pallete](https://images.viblo.asia/ca8af1dd-a8a3-423f-9b38-9f44fa07efc7.PNG)

Nếu bạn cảm thấy quá khó để lựa chọn, bạn có thể tham khảo bảng màu mặc định của [Tailwind CSS](https://tailwindcss.com/docs/background-color) dùng, rồi sau này tuỳ biến sau theo sở thích cũng được. Chỉ cần tham khảo thôi, bạn không nhất thiết phải ôm cả bộ Tailwind CSS về project nhé.

# 3. Thiết kế các phần tử cho "thoáng đãng" hơn
## Hạn chế dùng border `#BordersAreEvil`
![Hạn chế sử dụng border](https://images.viblo.asia/d0910aa4-11f5-4cc1-8f74-0fe1fb87dda9.jpg)

Ví dụ bằng hình phía trên đủ để bạn thấy được rằng chỉ nhờ việc bỏ bớt border ra, mục bên trên trông "thoáng" ra hơn đến mức nào! Hãy cố gắng thay thế sử dụng border ra khi có thể:
* Với viền bao quanh phần tử nhằm phân cách phần tử với bên ngoài, bạn có thể dùng một **outer shadow** để thay thế.
* Để ngăn cách header/footer với nội dung chính, bạn có thể **đặt màu nền hơi khác** một chút cho header/footer đó.
* Với các khung input nhập liệu, hãy cho nó một **background-color hơi nhạt hơn hoặc đậm hơn** màu nền của phần thử. Đừng quá lo lắng, người dùng vẫn sẽ dễ dàng nhận ra đó là hộp input!

## Cho padding/margin rộng rãi hơn
![Padding hẹp](https://images.viblo.asia/a7dd853a-576d-4a87-9a59-7b5aa5f5ab65.PNG)
![Padding rộng](https://images.viblo.asia/18c49dde-399a-4b2e-9fcb-fb01966c7baa.PNG)

Khả năng cao là bạn đang thiết kế cho các phần tử có margin/padding quá hẹp.

Bây giờ là năm 2020 rồi, hầu hết thiết bị đều có màn hình lớn và khả năng cao là có cảm ứng nữa, tức người dùng thao tác nhiều bằng ngón tay. Như vậy đặt margin/padding rộng rãi sẽ cho độ thoải mái và cảm giác dễ dùng hơn nhiều.

Khi thiết kế ban đầu, hãy **nới rộng padding/margin** của các phần tử ra, đặt kích thước thật thoải mái vào, sau đó mới nghĩ đến thu hẹp lại chỉ khi bạn thấy cần thiết.

(Lưu ý: không phải dành cho mọi trường hợp nhé).

# 4. Cấu trúc và phân tầng lớp UI
Người dùng khi duyệt web rất lười "đọc". Họ chỉ lướt qua nội dung, tìm kiếm những thông tin chính, sau đó mới đọc kỹ hơn nếu cần thiết. Do đó, bạn luôn phải thiết kế một giao diện sao cho **hướng sự chú ý** của người dùng đến nội dung trọng tâm mà bạn muốn. Việc làm nội bật nội dung trọng tâm và làm kém nổi bật nội dung bên lề được gọi là phân tầng lớp cho giao diện (hierarchy).

Ở ví dụ về trang dashboard dưới đây, bạn thấy ngay rằng chỉ sau vài style đơn giản, người dùng khi nhìn vào trang dashboard đã có thể **rà soát ngay đến những nội dung quan trọng** mà không phải mất quá nhiều thời gian.

![dashboard với nội dung chưa được nhấn mạnh](https://images.viblo.asia/1acc3ab2-6691-47b5-85c9-3343472e54ba.PNG)

![dashboard với nội dung được nhấn mạnh đúng cách](https://images.viblo.asia/0e9a2e0a-39dd-4e03-9e7e-bd824a3fefe8.PNG)

Một ví dụ khác nằm ở bài viết [Redesigning Laravel.io](https://medium.com/refactoring-ui/redesigning-laravel-io-c47ac495dff0), cũng của chính hai tác giả đã viết ra Refactoring UI:

![Redesigning Laravel.io](https://images.viblo.asia/f8c86b6e-9597-4c51-a733-d3d8fe4ffb6f.png)

Để ý kỹ sự khác nhau trước và sau khi redesign, bạn sẽ thấy ngay: nội dung trọng tâm (các bài viết của diễn đàn) có màu nền trắng, khác biệt với màu nền của toàn trang là màu xám nhẹ. Ngoài ra, phần sidebar (nút Create thread và mục Tags) kém quan trọng hơn và thay vì để bản thân chúng nó có nền riêng, chúng *được đặt ngay ra ngoài nền xám*, giúp tránh khỏi người đọc bị phân tâm.

**Màu sắc** & **typography** là 2 công cụ cực hữu hiệu giúp bạn phân cấp các nội dung trong UI hiệu quả. Tuy nhiên mình sẽ không đi quá sâu về nó trong bài viết này, nếu không lại thành dịch lậu sách mất :D

# 5. Tìm hiểu thêm ở đâu
Đương nhiên [đặt mua Refactoring UI](https://refactoringui.com/book/) của tác giả là cách tốt nhất, nhưng khả năng cao 99% chúng ta không thể mua được nếu không muốn nói đến tải pirate về, vì giá sách hơi bị chat so với developer các nước đang phát triển như Ấn Độ hay Việt Nam chúng ta :no_mouth: Nhưng vẫn còn rất nhiều nguồn (hợp pháp) khác để học hỏi những kiến thức design này:
* Tham khảo các bài viết trên [Twitter của tác giả](https://twitter.com/steveschoger/), rất nhiều thông tin quý báu ở đó là một phần nội dung từ cuốn sách.
* Đọc các [bài viết trên Medium](https://medium.com/@refactoringui) của bộ đôi tác giả.
* Xem các [video trên youtube của tác giả](https://www.youtube.com/channel/UCxqiDtkXtOCNJdckODHk9YA). Hầu hết đều là các video screencast **cực kỳ hữu ích** mà tác giả refactor lại giao diện của nhiều trang Web quen thuộc.

Ngoài ra, [**Tailwind CSS**](https://tailwindcss.com/) là một **atomic CSS framework** cũng được tạo ra bởi chính hai tác giả của cuốn sách (nhưng hoàn toàn mã nguồn mở và free :D). Framework kiểu như Tailwind giúp bạn style các thành phần UI trên trang web của bạn nhanh, đơn giản, gọn gàng, lại độc nhất vô nhị nên mình hết sức khuyên dùng. Nếu chưa từng biết đến Tailwind, bạn hãy thử qua một lần xem sao nhé.