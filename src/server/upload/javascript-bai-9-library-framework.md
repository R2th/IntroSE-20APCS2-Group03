Trong bài viết này, chúng ta sẽ được gặp lại khái niệm `framework` và bên cạnh đó chúng ta còn có thêm một khái niệm mới đó là `library` hay thư viện. Hãy mở đầu với khái niệm mới `library`.

## Sử dụng các thư viện `library` JavaScript

Khái niệm `library` hay thư viện trong JavaScript và các ngôn ngữ lập trình nói chung được hiểu là một bộ code cung cấp các công cụ tiện ích giúp chúng ta nhanh chóng thực hiện một thao tác xử lý nào đó với code được viết ngắn gọn hơn, dễ đọc hơn. Chẳng hạn bạn viết một nhóm các hàm xử lý các tác vụ tính toán số học và chia sẻ để mọi người sử dụng. Đó có thể được xem là một `library`.

So với các `framework` thì các `library` được nhận diện là các bộ code tiện ích nhỏ hơn và không cung cấp các thành phần mang kiến trúc cụ thể trong code triển khai phần mềm hay trong giao diện hiển thị của người dùng.

Và ở đây trong môi trường trình duyệt web, chúng ta thường phải viết rất nhiều các dòng code để truy vấn các phần tử HTML và thực hiện thao tác xử lý nào đó. Điều này đã tạo cảm hứng cho các lập trình viên giàu kinh nghiệm tạo ra và chia sẻ các `library` tuyệt vời cho tác vụ này:

[[jQuery] Bài 1 - jQuery Là Cái Gì?](https://viblo.asia/p/V3m5WR1ylO7)

Việc sử dụng các `library` còn một ý nghĩa khác nữa, đó là giúp chúng ta đảm bảo rằng code mà chúng ta viết ra sẽ luôn hoạt động tốt trên tất cả các trình duyệt web. Lý do ở đây là vì các trình duyệt web được phát triển bởi các tổ chức khác nhau, và có tiến trình cập nhật hỗ trợ các tính năng của các ngôn ngữ không đồng đều. Do đó nên khi chúng ta xem tài liệu hướng dẫn tự học của W3schools hay MDN thì đều thấy có một chỉ mục là `Browser Compabilty` (Tính tương thích với các trình duyệt).

Một tính năng mới của JavaScript có thể có cú pháp viết ngắn gọn hơn và dễ đọc hơn so với cách viết đã cung cấp trước đó; Nhưng lại chưa chắc đã được tất cả các trình duyệt web hỗ trợ. Đây cũng là điểm mà các thư viện JavaScript có thể giúp chúng ta để được phép viết code theo những cú pháp mới chưa được hỗ trợ đầy đủ; Và thậm chí là cả những cú pháp đang được phát triển, rất được ưa thích bởi cộng đồng lập trình viên, và sắp được ra mắt chính thức - [**babeljs.io**](https://babeljs.io/)

## Sử dụng thư viện `Babel` trong trình duyệt web

Ở đây mình muốn giới thiệu cách sử dụng thư viện `Babel` ngay với mục đích đơn giản là giúp chúng ta có thể yên tâm sử dụng bất kỳ cú pháp hay công cụ nào trong các bài viết tiếp theo của Series JavaScript. Để sử dụng `Babel` trực tiếp trong môi trường trình duyệt web, chúng ta cần gắn tệp `babel.min.js` được cung cấp bởi `Babel` vào vị trí đứng trước tất cả các thẻ `<script>` khác trong văn bản HTML:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Và tất cả các tệp JavaScript đứng sau sẽ cần được chỉ định thuộc tính `type="text/babel"` để được thông dịch qua thư viện này.

```babel.html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
   const getMessage = () => "Hi Babel !";
   let message = getMessage();
   console.log(message);
</script>
```

Bây giờ thì chắc chắn là các trình duyệt web phiên bản cũ cũng có thể hiểu được phần "ngoại ngữ" trong code JavaScript của chúng ta rồi. Chúng ta đã có thể hoàn toàn yên tâm và tự tin để tìm hiểu thêm những điều mới mẻ của JavaScript. :D

## Trang blog cá nhân của bạn thế nào rồi?

Ở thời điểm hiện tại thì chúng ta đã có khả năng viết code để tạo ra các trang đơn hoàn chỉnh và trình bày nội dung cho người xem. Chúng ta có thể tạo ra một trang đơn `index.html` làm trang chủ cho blog đang xây dựng và tải lên [Github Pages](https://pages.github.com/) để mọi người có thể truy cập; Và rồi tạo ra các trang đơn cho mỗi bài viết blog được đặt trong một thư mục `/post` bên cạnh `index.html` để người xem có thể truy xuất tới với đường dẫn có dạng:

`https://tencuaban.github.io/post/bai-blog-thu-9.html`

Tuy nhiên lúc này sau khi đăng tải xong bài viết thứ 10 trên trang blog cá nhân, chúng ta bỗng nhận ra một vấn đề, đó là:

> "Sẽ thế nào nếu như sau khi chúng ta viết xong bài blog thứ 1001 và muốn cập nhật giao diện của trang web cho phù hợp với xu hướng thiết kế web ở thời điểm đó?"

Chúng ta sẽ mở và chỉnh sửa giao diện của trang chủ `index.html` và bài viết đầu tiên `bai-blog-thu-1.html` (cái index số `0` là của trang chủ nhé, chúng ta vẫn đang đếm từ `0` :D). Sau đó copy/paste những thay đổi cần thiết lần lượt cho từng bài viết trong số 999 bài còn lại... :D Hoặc... là có một cách làm nào đó khác mà chúng ta cần tìm hiểu.

Và như vậy là đã đến thời điểm mà chúng ta cần phải dành một chút băn khoăn cho cái định nghĩa ban đầu về một trang web mà chúng ta đã có.

> Một website có thể được hiểu đơn giản là một tập các trang web đơn cùng được đặt ở một nơi nào đó trên internet mà mọi người có thể mở và xem được.  
> *_Một người sử dụng máy tính*

Cũng không có gì sai cả, nhưng ở thời điểm hiện tại thì đúng là chúng ta thực sự cần suy nghĩ nhiều hơn một chút về công việc tạo ra các trang web đơn.

## Các framework JavaScript

Rõ ràng lúc này chúng ta thấy rằng công việc tạo ra các trang web đơn có nhiều thao tác trùng lặp và có thể được tự động hóa để đem lại tiện ích sử dụng, chỉnh sửa, và cập nhật khi cần thiết. Việc tự động hóa để bày ra một giao diện trang đơn phù hợp với yêu cầu của người sử dụng website có thể được thực hiện xử lý ở 1 trong 2 nơi:

1. Trên thiết bị của người dùng `client-side`
2. Trên máy chủ web `server-side`

Tuy nhiên cho dù là được thực hiện ở đâu thì chúng ta cũng sẽ cần sự hỗ trợ của một `framework` JavaScript cho một công việc như vậy. Và đối với tiến trình học tập hiện tại của chúng ta đang thực hiện, mặc dù `Sub-Series JavaScript` của chúng ta vẫn còn nhiều thứ ở phía trước, nhưng đây thực sự đã là thời điểm rất phù hợp để chúng ta bắt đầu tìm hiểu về việc lập trình logic hiển thị nội dung.

Đối với phương án đầu tiên thì... Hãy cứ tin mình đi. Ở thời điểm hiện tại, chúng ta chưa hẳn là đã thực sự sẵn sàng cho phương án số 1. Vì vậy nên chúng ta sẽ chọn phương án xử lý logic hiển thị (hay logic để tạo ra các trang web đơn) tại `server-side` - tức là phương án số 2. :D

Bạn sẽ không cần phải học thêm một ngôn ngữ lập trình nữa để bắt đầu đâu, vì ở thời điểm hiện tại JavaScript đã rất rất phổ biến ở phía `server-side` và được ưa chuộng bởi rất rất nhiều lập trình viên. Tuy nhiên thì trước khi gặp mặt một `framework` giúp chúng ta nhanh chóng xây dựng một logic hiển thị như vậy ở phía `server-side`, chúng ta cần phải làm quen với môi trường chạy JavaScript ở đó đã.

[[NodeJS] Bài 1 - NodeJS Là Cái Gì?](https://viblo.asia/p/L4x5xANrKBM)

## Tổng kết của một bài viết hơi quá dài

Như vậy là chúng ta đã có một bài viết lan man, tản mạn về 2 khái niệm `library` và `framework` trong JavaScript. Bên cạnh đó là các phần giới thiệu mơ hồ về các thư viện `jQuery`, `Babel`, và môi trường chạy JavaScript ở `server-side` là `NodeJS`. Mặc dù Sub-Series về ngôn ngữ JavaScript nói riêng vẫn còn nhiều thứ ở phía trước, mình thực sự rất mong muốn rằng bạn sẽ tham gia ngay cùng với mình trong 2 `Sub-Series` mới là `jQuery` và `NodeJS` sẽ sớm được bắt đầu sau bài viết này.

Hẹn gặp lại bạn trong các bài viết tiếp theo. :D

[[JavaScript] Bài 10 - Kiểu & Hằng](https://viblo.asia/p/Qbq5QRLwKD8)