Sẽ như thế nào nếu `attacker` có thể giả mạo HTTP requests đến trang của bạn, họ có thể lừa người dùng của bạn để đánh cắp thông tin hoặc thực hiện nhiều hành động ngoài ý muốn của người dùng, như 'trôm'  mã giảm giá chẳng hạn, mất mã giảm giá nghĩ mà tức á :))) . Rõ dàng đây là một tin rất xấu cho người dùng, bài viết này sẽ cung cấp cho bạn khái niệm, rủi do, cách hoạt động, cách phòng chống phương thức tấn công này.

# Khái niệm
Mình sẽ đi từ ví dụ trước nhé :) khi tạo 1 website, chúng ta thường có xu hướng code `client-side` và `server-side` cùng nhau. Chúng ta build trang và form cho người dùng có thể tương tác phía `client-side`, sau đó build `server-side` `URLs` trả về dữ liệu khi người dùng thực hiện gửi. Tuy nhiên, requests có thể bị đánh lừa tới `server-side` từ bất nguồn nào, không chỉ là từ `client-side` mà chúng ta tạo ra. Đây là một trong những phần mà internet được thiết kế: "It allows linking between sites". Nhưng nó cũng là nguyên nhân gây ra lỗ hổng bảo mật thường gặp đó là `Cross-site request forgery (CSRF)`.

CSRF xảy ra khi người dùng bị đánh lừa trong quá trình tương tác với page hoặc `script` của bên thứ 3 chứa `malicious request` tới trang của bạn. Server của bạn sẽ bị đánh lừa rằng `HTTP request` được gửi từ người dùng đã xác thực. Tuy nhiên, kẻ tấn công đã chiếm lấy quyền kiểm soát form của dữ liệu được gửi lên.

Tưởng tượng bạn chạy `micro-blogging service` cho phép người dùng `tweep` ý kiến của họ mỗi `140-character-sized chunks`. Như mọi ví dụ trong series, Mal vẫn là nhân vật phản diện, hắn là một hacker và hắn đã cảnh báo rằng bài viết trên `service` của bạn có thể tạo ra bởi `GET requests`. Điều này có nghĩa tất cả thông tin sẽ được show trên thanh URL. Mal chỉnh sửa lại `post-creation` URL để gán thêm payload chứa mã độc `www.tweeper.com/post?message=This+horse+know+karate!+www%2Cbit.ly%2F60138Wawd` .

Bây giờ hắn có thể tìm ra một số cách để đánh lừa nạn nhân truy cập vào url trong trình duyệt của họ. Vic - một thanh niên nhẹ dạ cả tin, và cũng đen hơn nữa lại là người dùng trong cái hệ thống đang tồn tại lỗ hổng `CSRF` của bạn :) Mal có thể phỏng đoán email của Vic và gửi cho Vic 1 email với đường link hấp dẫn với nội dung 'Chú ngựa này biết karate !' ,tò mò quá mà :) , đã ai thấy con ngựa nào biết karate bao giờ đâu, nhấp vào xem sao. Vic đực rựa không chút hoài nghi, nhấp thẳng vào đường link, và rồi server của bạn bắt đầu dịch request như là Vic đã viết ra bài này, và tạo mới nó trên timeline của Vic, rõ dàng đây không phải là hành động của Vic dự định, nhưng Vic có thể không được cảnh báo về chuyện vừa xảy ra (nghe có vẻ nghiêm trọng :)

![](https://images.viblo.asia/208739ce-798c-4b0b-8f22-97d2d77920c9.png)

Bài đăng với nội dung hấp dẫn đủ để những người khác click vào, khi họ click, họ lại tiếp tục bị lừa cùng cách Vic gặp phải. và bây giờ, trang web của bạn có con worm to đùng với đầy bài đăng cùng một nội dung, mà nếu nó là nội dung tuyên truyền ủng hộ Trần Dần thì sao :) bạn không muốn vướng vào rắc rối như thế này đâu.

![](https://images.viblo.asia/d4c712cb-acdf-4a56-b062-1dd5b83b7fe9.png)

Nội dung 
# Rủi do
Hacker có thể dùng làm phương tiện để:

- đánh cắp dữ liệu bí mật.
- phát tán worm lên mạng xã hội.
- cài đặt phần mềm độc hại trên điện thoại.
- khảo sát trực tuyến.

Rất khó để ước tính được mức độ phổ biến của cuộc tấn công `CSRF`. CSRF thường được mô tả là một trong mười lỗ hổng bảo mật hàng đầu của OWASP.

# Bảo vệ
Trang web bao gồm sự kết hợp của `server-side` và `client-side`. Phía client bao gồm HTML và JS được render và thực hiện bởi trình duyệt. Nó cho phép người dùng điều hướng tới url khác trên trang của bạn, gửi form HTML tới server thông qua AJAX request - JS. `Server-side` sẽ chặn dữ liệu từ `HTTP Request`.

Các hành động của `server-side` có thể bị đánh lừa bởi `HTTP request` giả mạo, trừ khi bạn đưa ra được biện pháp bảo vệ rõ dàng.

Để bảo vệ cần yêu cầu 2 điều:

- Đảm bảo `GET request` là `side-effect free`.
- Đảm bảo `GET request` được bắt nguồn từ `client-side` của bạn.

## REST
Bạn có thể tìm hiểu về [REST](https://www.hacksplaining.com/glossary/rest) là 1 series về `design principles`. Làm theo `REST-ful designs`  sẽ giữ cho code của bạn sạch hơn và giúp cho site của bạn scale. Hơn thế nữa, REST khẳng định rằng các `GET request` sẽ chỉ sử dụng để `view resource`, giữ cho `GET requests` của bạn không có tác dụng phụ, hạn chế rủi do, kẻ tấn công sẽ phải làm việc chăm chỉ hơn để tấn công bằng `POST requests`.

## Anti-Forgery Tokens
Ngay cả khi các hành động chỉnh sửa bị hạn chế đối với `non-GET requests`, bạn vẫn không hoàn toàn được bảo vệ. `POST request` vẫn gửi được tới site của bạn từ script và từ trang được lưu trữ trên các tên miền khác nhau. Để đảm bảo rằng bạn chỉ xử lý các yêu cầu hợp lệ thì chúng ta nên thêm token bí mật và `unique` với mỗi `HTTP response`, server sẽ xác thực token và trả về trong các yêu cầu tiếp theo sử dụng phương thức POST (hoặc với mọi method ngoại trừ GET) .

Đây được gọi là mã thông báo chống giả mạo. Mỗi khi máy chủ của bạn hiển thị một trang thực hiện các hành động nhạy cảm, nó sẽ viết ra một mã thông báo chống giả mạo trong trường ẩn. Mã thông báo này phải được bao gồm trong các lần gửi form hoặc các cuộc gọi AJAX. Máy chủ sẽ xác thực mã thông báo khi được trả lại trong các yêu cầu tiếp theo và từ chối mọi cuộc gọi có mã thông báo bị thiếu hoặc không hợp lệ.

`Anti-forgery tokens` thường là các số ngẫu nhiên (mạnh) được lưu trữ trong cookie hoặc trên máy chủ khi chúng được ghi ra trường ẩn. Máy chủ sẽ so sánh `Anti-forgery tokens` được đính kèm với yêu cầu gửi đến với giá trị được lưu trữ trong cookie. Nếu các giá trị giống hệt nhau, máy chủ sẽ chấp nhận yêu cầu HTTP hợp lệ.

Hầu hết các frameworks hiện đại bao gồm các chức năng để thêm `Anti-forgery tokens` khá đơn giản.

## Chắc chắn rằng Cookie được gửi với `SameSite` attribute
Google Chrome aadx thêm attribute mới cho `Set-Cookie` header để giúp ngăn chặn `CSRF`, và nó nhanh chóng được các trình duyệt khác hỗ trợ. `Same-Site` cookie attribute cho phép dev set trình duyệt kiểm soát cookie được gửi bởi các tên miền bên thứ 3 hay không.

Setting `Same-Site` cho cookie khá đơn giản:
```
Set-Cookie: CookieName=CookieValue; SameSite=Lax;
Set-Cookie: CookieName=CookieValue; SameSite=Strict;
```

## Bao gồm xác thực bổ sung cho hành động nhạy cảm :) :)
Nhiều trang yêu cầu xác thực 2 bước hoặc nhập lại mật khẩu khi thực hiện hành động 'nhạy cảm', điều này giúp giảm đáng kể khả năng tấn công `CSRF`

## Code Samples
Với `Laravel` bạn có thể tham khảo tại [đây](https://laravel.com/docs/5.8/csrf)
```html
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

```html
<meta name="csrf-token" content="{{ csrf_token() }}">
```

```js
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
```

Với PHP thuần bạn có thể tham khảo tại [đây](https://www.owasp.org/index.php/PHP_CSRF_Guard) .

# Tổng kết
Trên đây là nội dung giúp bạn có hiểu cơ bản về `CSRF`, hy vọng sẽ giúp ích được cho bạn đọc. Happy coding ! <3