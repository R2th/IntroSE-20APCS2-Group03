![image.png](https://images.viblo.asia/3aea8959-b22e-453e-866d-ea57d8c83b7e.png)

ES2021 hay ES12 cuối cùng cũng được ra mắt, theo đó là các thông số kỹ thuật mới cũng được trình làng. Một số bạn sẽ thắc mắc “thông số kỹ thuật” là sao? Thực chất JavaScript không thực sự là một ngôn ngữ mã nguồn mở. Bản chất JavaScript là một ngôn ngữ được viết tuân theo các thông số kỹ thuật theo tiêu chuẩn của ECMAScript. Do phòng ban TC39 phụ trách thảo luận và thông qua các tính năng mới. Vậy Họ là ai?

“ECMA International’s TC39 là một nhóm các nhà phát triển JavaScript, người triển khai, học giả và hơn thế nữa, cộng tác với cộng đồng để duy trì và phát triển định nghĩa về JavaScript.” – [TC39.es](https://tc39.es/)

Quá trình cho ra mắt những thay đổi của họ bao gồm năm giai đoạn. Kể từ năm 2015, họ đã bắt đầu cho ra mắt những thay đổi mới theo hàng năm. Những lần ra mắt thường diễn ra vào khoảng mùa xuân. Lần ra mắt năm nay được đề xuất phê duyệt vào ngày 9 tháng 6.

Có hai cách để tham khảo bất kỳ phiên bản phát hành ECMAScript nào:

Theo năm: Phiên bản mới được giới thiệu lần này sẽ là ES2021.

Theo số lần lặp: Phiên bản mới được giới thiệu lần này sẽ là lần lặp thứ 12, vì vậy nó có thể được gọi là ES12.

Vậy trong phiên bản lần này có những thay đổi gì mới? Có những tính năng mới đáng giá nào?

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/javascript-es2021/)

## 1. replaceAll:

Một chức năng mới được thêm vào dành cho `String` prototype. Trước phiên bản này, chúng ta không thể thay thế tất cả các trường hợp của một chuỗi con được mà không sử dụng `regex`

Trước ES12:

![image.png](https://images.viblo.asia/1c90c294-f1f7-4f12-b916-021f329e0644.png)

Sau khi ES12 ra mắt:

![image.png](https://images.viblo.asia/b5c353fa-a671-4a9c-a460-13bed1c1af6b.png)

Vậy điều gì sẽ xảy ra nếu đối số truyền vào của chúng ta là một chuỗi rỗng?

Câu trả lời là nó sẽ trả về giá trị được thay thế giữ mọi đơn vị code UCS-2 / UTF-16.7

![image.png](https://images.viblo.asia/aca23d8f-59a1-41d2-900c-9289f257b06a.png)

## 2. Promise.any

`Promise.any` Đây là một cách mới, là một tính năng hữu ích khác. Nó được xem như là một đối số là một lời hứa có thể lặp lại. Khi bất kỳ điều nào trong số đó được đáp ứng, nó sẽ kích hoạt `Promise.any()` gọi lại tham số hoặc trả về phản hồi. Nó phụ thuộc vào việc bạn có đang sử dụng `async/await` hay không.

Nếu tất cả các lời hứa không thành công, phương thức sẽ ném cho bạn một `AggregateError` kết hợp tất cả các lỗi lời hứa khác nhau. Tại sao lại không trả về một mảng đơn giản hơn? Câu trả lời là để tương thích. Nó sẽ là một trường hợp của Error và bạn sẽ nhận được stack trace. Thật tốt khi có được thông tin đó trong những trường hợp cần thiết nhỉ.

Cùng xem một vài ví dụ nào:
Sử dụng `callback` truyền thống.

![image.png](https://images.viblo.asia/b2af2652-1d31-4986-8e0a-8435e3dc6f76.png)

Sử dụng cú pháp `async/await`:

![image.png](https://images.viblo.asia/43b0a63a-fe59-4a44-b333-bfc19585354a.png)

![image.png](https://images.viblo.asia/b7ad9c13-c09b-48f5-95ba-9d5de3cf0cee.png)

Đây là lần bổ sung thứ tư dành cho `Promise` prototype. Dưới đây là tóm tắt những lần thay đổi trước:

* [ES2015] `Promise.race`: Phương thức này sẽ trả về một lời hứa sẽ được thực hiện ngay sau khi một trong những lời hứa bị từ chối hoặc được thực hiện.
* [ES2015] `Promise.all`: Phương thức này trả về một lời hứa chỉ được thực hiện nếu tất cả các lời hứa đích đã được thực hiện.
* [ES2020] `Promise.allSettled`: Phương thức này trả về một lời hứa sẽ giải quyết khi tất cả các lời hứa đã cho đã được thực hiện hoặc bị từ chối. Đối tượng trả về mô tả từng kết quả hứa hẹn riêng lẻ.

## 3. WeakRefs

Trong JavaScript, có một quy trình gọi là automatic garbage collection process hay thu gom rác tự động. Đây là một tính năng có lẽ các bạn mới làm quen với JavaScript sẽ ít nghe đến nó.

Nó chỉ có thể thu thập các `object` không thể truy cập được. Mỗi khi bạn thực hiện một nhiệm vụ cho một object là bạn đang tạo một `strong reference`. Điều này bảo vệ nó khỏi việc JavaScript tự động thu gom rác.

![image.png](https://images.viblo.asia/e47f53f7-a5ad-45b0-9d6b-407b746698d3.png)

`WeakRef` còn được dùng trong một trường hợp khác: để giữ một tham chiếu đến một đối tượng, điều đó không giúp giữ nó khỏi cơ chế garbage collection. Vì việc garbage collection là không mang tính xác định vì thế nó không đảm bảo cho việc một thời điểm một object sẽ được dọn dẹp. `WeakRef` tận dụng lợi thế đó bằng cách cho phép bạn truy cập vào đối tượng đó cho đến khi nó được collect.

Lưu ý: `WeakRef` chỉ có thể lấy một đối tượng làm đối số.

![image.png](https://images.viblo.asia/168006f2-2b0d-4652-9eb4-60eb841774c2.png)

Vậy làm sao chúng ta có thể lấy lại giá trị?

Chúng ta có thể lấy lại giá trị bằng cách sử dụng phương thức `deref()`. Phương thức sẽ trả về một `strong reference` đến object.

![image.png](https://images.viblo.asia/120ab2b7-38f5-4778-8298-bf59c80f7652.png)

Vậy tại sao điều này lại hữu ích?

Nó giúp tăng performance của ứng dụng dựa trên thiết bị của người dùng. Chúng ta có thể sử dụng `WeakRef` để cache các object lớn. Nghĩa là các thiết bị có dung lượng bộ nhớ lớn có thể thấy performance tăng lên rõ ràng. Những thiết bị có dung lượng bộ nhớ thấp vẫn có thể sử dụng ứng dụng một cách bình thường mà không bị chiếm dụng bộ nhớ máy quá nhiều.

https://200lab.io/blog/react-native-su-dung-animated-polyline-googlemap/

## 4. Finalizers

`Finalizers` là một tính năng khác của ES12 trong vùng bộ nhớ. Những gì tính năng này làm là cho bạn biết khi một đối tượng đã được garbage collection. Nó làm như vậy thông qua JavaScript callback.

Tuy nhiên, chúng ta cần lưu ý một số vấn đề sau:

* Nó không được đảm bảo rằng callback sẽ thực thi.
* Object mục tiêu đã được dọn sạch và sẽ không thể truy cập được.
* Thời gian callback sẽ thực thi là không thể xác định. Nó có thể là một phút hoặc một giờ.

![image.png](https://images.viblo.asia/7f0fc6b7-a489-41fa-97b7-a2836fc570db.png)

Tính năng này giúp cho bạn có cơ hội thực hiện các thao tác cleanup sâu hơn giúp tối ưu hóa ứng dụng của mình.

Lưu ý: Những code quan trọng của bạn không nên được chạy ở đây. Nó chỉ là nơi để giúp bạn giảm bớt bộ nhớ cho ứng dụng web của bạn.

## 5. Logical Assignment Operators

Cuối cùng, các thông số kỹ thuật ES12 mới này đã đến với các operators đã được chờ đợi từ lâu. Các operator mới kết hợp các toán tử gán logic với các hoạt động logic &&, ||và ??.

Toán tử &&=

So sánh sự tương đương của nó trong ES11 với ES12.

![image.png](https://images.viblo.asia/0559e47c-acbb-4c19-9714-20e6c9f8d39f.png)

Ví dụ:

![image.png](https://images.viblo.asia/fefaa41e-53ad-4b4b-bb14-ccf7f5f2e005.png)

Toán tử ||=

![image.png](https://images.viblo.asia/eb993c3d-2213-4878-b176-2fb7a74a3851.png)

Ví dụ:

![image.png](https://images.viblo.asia/2e5e0cab-7529-44d2-81f6-d8f09cea3c55.png)

Toán tử ??=

Toán tử ?? là toán tử liên kết rỗng của JavaScript. Hãy tóm tắt lại những gì mà nó có thể làm, vì nó ít phổ biến hơn.

“ Toán tử kết hợp nullish ( ??) là một toán tử logic trả về toán hạng bên phải của nó khi toán hạng bên trái của nó là `null` hoặc `undefined`, và nếu không thì trả về toán hạng bên trái của nó.” – [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

![image.png](https://images.viblo.asia/c7f391bd-7b62-4435-9599-28d38981b59f.png)

Ví dụ:

![image.png](https://images.viblo.asia/c5100b38-5067-4b4c-a0ae-a401a4ff4796.png)

https://200lab.io/blog/reactjs-la-gi/

## 6. Numeric Separators

Nghĩa là dấu cách phân số. Việc bổ sung này có thể ít lạ mắt hơn, nhưng nó giúp cải thiện khả năng đọc code của bạn. Hiện tại, khi lưu trữ một số dài trong một biến có kiểu dữ liệu `var/let/const`, nó có thể không đọc được.

Khai báo một biến có giá trị bằng 1 triệu không đổi. Rõ ràng là việc đọc nó được là 1 triệu thì quả thật khó và đau mắt. ?

![image.png](https://images.viblo.asia/4c9cf5ee-ce19-4d9d-9754-fcf5529afd1c.png)

Đừng quá lo lắng, giờ đây với cú pháp mới của ES12 bạn có thể phân cách giữa các chữ số bằng ký tự “_”!

[image.png](https://images.viblo.asia/2fdeac47-73d7-48ba-8109-aa8339180320.png)

Đấy, giờ dễ đọc hơn rồi. Dưới đây là một vài ví dụ khác.

![image.png](https://images.viblo.asia/b13ad21e-c0f6-43c7-a1c2-03d011ff53d4.png)

Chắc feature này sẽ được các bạn trọng dụng nhiều đây ?

## 7. Tổng kết

Phiên bản mới ra này thật sự khá thú vị với những tính năng mới hữu ích được bổ sung như: `logical assigment operators, replaceAll,` và `numerical separators`. Với những tính năng mới này đã giúp cho các dev và chúng ta giảm thiểu thời gian code lại, code cũng sẽ gọn gàng hơn, giúp giảm thiếu bug cũng như performance cho ứng dụng.

Bạn đã có thể bắt đầu sử dụng chúng và chuyển chúng qua Babel. Nếu bạn sử dụng TypeScript, nó đã có sẵn cho bạn làm việc.

Tuy nhiên, trong các thông số kỹ thuật mới này, một số tính năng nâng cao như `WeakRefs` và `Finalizers` đã được thêm vào. Cũng khá là phức tạp, chúng cần được hiểu rõ trước khi được sử dụng. Nếu không, nó có thể tạo cho ta nhiều vấn đề hơn là giúp ta giải quyết vấn đề hiện tại cho bạn. Chúng sẽ được dùng trong một số tình huống cụ thể và không nên lạm dụng.

Hy vọng qua bài viết này đã giúp bạn biết thêm về những tính năng mới trong phiên bản ES12 mới tinh này. Và bạn có thể ứng dụng nó trong những dự án của bạn sắp tới.

https://200lab.io/blog/so-sanh-su-khac-biet-flutter-vs-react-native/

https://200lab.io/blog/so-sanh-golang-vs-nodejs/