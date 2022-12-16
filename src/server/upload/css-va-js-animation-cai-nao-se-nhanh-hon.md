Làm thế nào để sử dụng JavaScript-based animation luôn nhanh và nhanh hơn CSS transitions? Và, làm cách nào mà Adobe và Google có thể phát hành liên tục các trang web đa phương tiện trên điện thoại di động có hiệu suất cạnh tranh với các ứng dụng native?
Bài viết này sẽ đóng vai trò là hướng dẫn từng điểm về cách các thư viện DOM animation dựa trên JavaScript, chẳng hạn như Velocity.js và GSAP, có hiệu suất cao hơn các thư viện animation dựa trên jQuery và CSS.

## jQuery

Hãy bắt đầu với những điều cơ bản: JavaScript và jQuery đang được hiểu một cách sai lệch. JavaScript animation nhanh, và jQuery làm chậm nó xuống. Tại sao? Bởi vì - mặc dù jQuery là cực kỳ mạnh mẽ - nhưng mục tiêu thiết kế của jQuery không bao giờ biến nó trở thành một công cụ animation hiệu quả:
- jQuery không thể tránh được [layout thrashing](http://wilsonpage.co.uk/preventing-layout-thrashing/)  do codebase của nó phục vụ nhiều mục đích ngoài animation.
- Hệ thống làm trống bộ nhớ của jQuery thường xuyên kích hoạt các bộ sưu tập rác, khiến các [animation bị đóng băng tạm thời](http://blog.artillery.com/2012/10/browser-garbage-collection-and-framerate.html).
- jQuery sử dụng `setInterval` thay vì `requestAnimationFrame` (RAF) để bảo vệ các sự kiện khỏi [những rắc rối gây ra bởi chính chúng](http://stackoverflow.com/questions/7999680/why-doesnt-jquery-use-requestanimationframe%22%20%5Cl%20%22comment21484794_8995666), điều này khiến những animation bị giới hạn bởi số khung hình thấp.

## Ví dụ

Tránh gặp layout thrashing bao gồm việc ghép các truy vấn DOM và cập nhật DOM một cách đơn giản:

```javascript
var currentTop,
	currentLeft;

/* With layout thrashing. */
currentTop = element.style.top; /* QUERY */
element.style.top = currentTop + 1; /* UPDATE */

currentLeft = element.style.left; /* QUERY */
element.style.left = currentLeft + 1; /* UPDATE */

/* Without layout thrashing. */
currentTop = element.style.top; /* QUERY */
currentLeft = element.style.left; /* QUERY */

element.style.top = currentTop + 1; /* UPDATE */
element.style.left = currentLeft + 1; /* UPDATE */
```

Các truy vấn diễn ra sau khi cập nhật buộc trình duyệt phải tính toán lại dữ liệu thiết kế của trang (trong khi xem xét các hiệu ứng cập nhật mới). Điều này tạo ra chi phí đáng kể cho animation đang chạy trong khoảng thời gian rất nhỏ chỉ 16ms.

Tương tự như vậy, việc triển khai RAF không đòi hỏi phải làm lại đáng kể mã nguồn hiện tại của bạn. Hãy so sánh việc thực hiện cơ bản RAF với setInterval:

```javascript
var startingTop = 0;

/* setInterval: Runs every 16ms to achieve 60fps (1000ms/60 ~= 16ms). */
setInterval(function() {
	/* Since this ticks 60 times a second, we divide the top property's increment of 1 unit per 1 second by 60. */
    element.style.top = (startingTop += 1/60);
}, 16);

/* requestAnimationFrame: Attempts to run at 60fps based on whether the browser is in an optimal state. */
function tick () {
    element.style.top = (startingTop += 1/60);
}

window.requestAnimationFrame(tick);
```

RAF tạo ra mức tăng lớn nhất có thể cho hiệu suất animation mà bạn có thể thực hiện với một thay đổi duy nhất đối với mã của bạn.

## CSS Transitions

CSS transitions làm tốt hơn jQuery bằng cách giảm logic animation cho chính trình duyệt, có hiệu quả tối ưu hóa tương tác DOM và mức tiêu thụ bộ nhớ để tránh nói lắp, tận dụng các nguyên tắc của RAF dưới mui xe và sử dụng GPU để cải thiện hiệu suất animation.

Tuy nhiên, thực tế là các tối ưu hóa này cũng có thể được thực hiện trực tiếp trong JavaScript. [GSAP](http://www.greensock.com/gsap-js/) đã làm điều đó trong nhiều năm. [Velocity.js](http://velocityjs.org/), một công cụ animation mới, không chỉ tận dụng các kỹ thuật tương tự này mà còn đi nhiều bước xa hơn - như chúng ta sẽ khám phá ngay sau đây.

Đến với các thuật ngữ với thực tế là animation JavaScript có thể cạnh tranh với thư viện animation CSS chỉ là một bước trong bài viết của chúng tôi. Bước hai là nhận ra rằng animation JavaScript thực sự có thể nhanh hơn chúng.
Hãy bắt đầu bằng cách kiểm tra các điểm yếu của thư viện CSS animation:

- Transitions bắt buộc phải sử dụng hệ thống tăng tốc phần cứng của GPU, dẫn đến stuttering và banding trong một số tình huống stress ở mức cao.  Những hiệu ứng này càng trầm trọng hơn trên các thiết bị di động. (Cụ thể, stuttering là kết quả của vấn đề trên xảy ra khi dữ liệu được truyền giữa thread chính của trình duyệt và compositor thread của nó. Một số thuộc tính CSS, như transforms và opacity, miễn nhiễm với vấn đề này.) Adobe giải thích về vấn đề này ở [đây](http://blogs.adobe.com/webplatform/2014/03/18/css-animations-and-transitions-performance/).
- Bởi vì transitions không được kiểm soát nguyên bản bởi JavaScript (chúng chỉ được kích hoạt bởi JavaScript), trình duyệt không biết cách tối ưu hóa quá trình transitions với mã JavaScript đang điều khiển chúng.
- Transition không hoạt động trên các phiên bản IE 10 trở xuống. Điều này có thể không đáng lo ngại vì các trình duyệt IE hiện không còn phổ biến.

Ngược lại: các thư viện animation dựa trên JavaScript có thể tự quyết định khi nào để kích hoạt tăng tốc phần cứng, chúng hoạt động trên tất cả các phiên bản của IE và chúng hoàn toàn phù hợp với các tối ưu hóa hoạt ảnh đồng loạt.

## JavaScript Animation

Vậy là Javascript có thể nhanh hơn khi nói đến hiệu suất. Nhưng chính xác JavaScript có thể nhanh hơn bao nhiêu? Vâng - để bắt đầu - đủ nhanh để xây dựng [bản demo 3D animation](http://velocityjs.org/demo.html) cường độ cao mà bạn thường chỉ thấy được xây dựng bằng WebGL. Và đủ nhanh để xây dựng một [quảng cáo đa phương tiện](http://julian.com/research/velocity/playground.html) mà bạn thường chỉ thấy được tạo bằng Flash hoặc After Effects. Và đủ nhanh để xây dựng một [thế giới ảo](http://danielraftery.com/read/Animating-Awesomeness-with-Velocityjs) mà bạn thường chỉ thấy được xây dựng bằng canvas.

Để so sánh trực tiếp hiệu suất của các thư viện animation hàng đầu, bao gồm cả Transit (sử dụng CSS transitions), hãy chuyển sang tài liệu của Velocity tại VelocityJS.org.

Câu hỏi vẫn còn là: JavaScript chính xác đạt mức hiệu suất cao như thế nào? Dưới đây là danh sách ngắn các tối ưu hóa mà animation dựa trên JavaScript có khả năng thực hiện:

- Đồng bộ hóa DOM → giữa ngăn xếp trên toàn bộ chuỗi animation để giảm thiểu việc sắp xếp bố cục.
- Lưu trữ các giá trị thuộc tính trên các chuỗi cuộc gọi để giảm thiểu sự xuất hiện của truy vấn DOM (là nguyên nhân góp phần giảm khả năng thực thi DOM animation).
- Lưu trữ các tỉ lệ chuyển đổi đơn vị (ví dụ: px đến %, em, v.v.) trên các phần tử anh chị em trong cùng một lời gọi.
- Bỏ qua cập nhật giao diện khi cập nhật sẽ không nhìn thấy được.

Xem lại những gì chúng ta đã học trước đó về layout thrashing, Velocity.js tận dụng những thực hành tốt nhất để cache các giá trị kết thúc của một animation được sử dụng lại như là các giá trị bắt đầu của animation tiếp theo - do đó tránh requerying DOM cho các giá trị bắt đầu của phần tử:
```javascript
$element
	/* Slide the element down into view. */
	.velocity({ opacity: 1, top: "50%" })
	/* After a delay of 1000ms, slide the element out of view. */
	.velocity({ opacity: 0, top: "-50%" }, { delay: 1000 });
 ```
 
 Trong ví dụ trên, lời gọi Velocity thứ hai biết rằng nó sẽ tự động bắt đầu với giá trị opacity là 1 và giá trị cao nhất là 50%.
 
 Trình duyệt cuối cùng cũng thực hiện nhiều bản tối ưu hóa tương tự như vậy, nhưng làm như vậy sẽ kéo theo việc thu hẹp các cách thức mà mã animation có thể được tạo bởi nhà phát triển. Theo đó, vì cùng một lý do mà jQuery không sử dụng RAF (xem ở trên), các trình duyệt sẽ không bao giờ áp đặt các tối ưu hóa thậm chí có một cơ hội nhỏ để phá vỡ spec hoặc lệch khỏi hành vi mong đợi.
 
 Cuối cùng, hãy so sánh hai thư viện animation JavaScript (Velocity.js và GSAP) với nhau.
- GSAP là một nền tảng animation nhanh, đa dạng, nổi bật. Velocity là một công cụ nhẹ để cải thiện UI animation performance và workflow.
- GSAP yêu cầu phí cấp phép cho nhiều loại hình doanh nghiệp khác nhau. Velocity là thư viện tự do nguồn mở thông qua giấy phép MIT.
- Về hiệu năng, GSAP và Velocity không thể phân biệt được trong các dự án thực tế.

## Velocity.js

Việc nói rằng GSAP có một bộ phong phú các tính năng không ngụ ý rằng Velocity là có ít các tính năng. Ngược lại. Chỉ trong 7Kb khi được nén, Velocity không chỉ sao chép tất cả chức năng của `$.animate()` của jQuery, mà nó còn chứa các color animation, transforms, vòng lặp, các hình vẽ, class animation và scrolling.
Nói ngắn gọn, Velocity là sự kết hợp tốt nhất của jQuery, jQuery UI, và CSS transitions.

Hơn nữa, từ quan điểm thuận tiện, Velocity sử dụng phương thức `$.queue()` của jQuery ở tầng bên dưới, và do đó làm việc liên tục với các hàm `$.animate()`, `$.fade()` và `$.delay()` của jQuery. Và, vì cú pháp của Velocity giống với `$.animate()`, nên không có mã nào trong trang của bạn cần phải thay đổi.

Chúng ta hãy xem qua Velocity.js. Ở mức cơ bản, Velocity hoạt động giống hệt với `$.animate()`:

```javascript
$element
	.delay(1000)
	/* Use Velocity to animate the element's top property over a duration of 2000ms. */
	.velocity({ top: "50%" }, 2000)
	/* Use a standard jQuery method to fade the element out once Velocity is done animating top. */
	.fadeOut(1000);
```

Ở cấp độ nâng cao hơn, các cảnh cuộn phức tạp với các hoạt ảnh 3D có thể được tạo ra - chỉ với hai dòng mã đơn giản:

```javascript
$element
	/* Scroll the browser to the top of this element over a duration of 1000ms. */
	.velocity("scroll", 1000)
	/* Then rotate the element around its Y axis by 360 degrees. */
	.velocity({ rotateY: "360deg" }, 1000);
```

## Tổng kết

Mục tiêu của Velocity là duy trì vị trí dẫn đầu về hiệu suất hoạt hình DOM và sự tiện lợi. Bài viết này đã tập trung tìm hiểu ở mức cơ bản. Đi đến [VelocityJS.org](http://velocityjs.org/) để tìm hiểu sâu hơn về thư viện này.
Trước khi chúng tôi kết thúc, hãy nhớ rằng thực hiện một giao diện người dùng không chỉ là chọn thư viện animation phù hợp. Phần còn lại của trang của bạn cũng phải được tối ưu hóa. Tìm hiểu thêm từ các cuộc trao đổi tuyệt vời này của Google:

- [Jank Free](http://www.youtube.com/watch?v=n8ep4leoN9A)
- [Rendering Without Lumps](http://www.youtube.com/watch?v=cmZqLzPy0XE)
- [Faster Websites](http://www.devoxx.com/display/DV12/Faster+Websites++Crash+Course+on+Frontend+Performance)

Bài viết được dịch từ: [CSS vs. JS Animation: Which is Faster?](https://davidwalsh.name/css-js-animation)