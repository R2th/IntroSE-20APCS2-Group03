Khi bạn nghĩ đến việc cải thiện tốc độ load trang web, bạn có lẽ sẽ thử việc tối ưu code backend, tối ưu câu truy vấn cơ sở dữ liệu,... Nhưng một trong những cách đơn giản nhất để cải thiện tốc độ load trang là thay đổi một chút cách trang web load các đoạn JavaScript sử dụng thẻ `script` trong trang của mình.

![](https://images.viblo.asia/16cc55da-6f0a-4f4f-bcc1-1ed0541a01b5.png)

# Vấn đề đối với cách Loading JavaScript thông thường
Khi bạn load JavaScript vào trong một trang HTML, có thể bạn thường thêm thẻ `script` vào phần `head` của trang. Tuy nhiên có một vấn đề xảy ra ở đây, để hiểu rõ hơn thì bạn cần phải hiểu cách một website được render.

Khi trình duyệt mở một trang web, nó sẽ bắt đầu render trang theo từng thẻ một và bắt đầu dựng nên DOM. Và bất cứ khi nào bộ render gặp một thẻ cần load ảnh hay css, những request này được sử lý song song với quá trình render.

Nhưng khi bộ render gặp bắt gặp một thẻ script, quá trình render HTML sẽ dừng lại và đợi cho đến khi nào tất cả script được lấy xuống và thực thi xong. Sau đó thì quá trình render mới tiếp tục xử lý những phần tiếp theo. Bạn có thể hiểu quá trình này theo một cách rõ hơn bằng ví dụ dưới đây.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Script in the head tag</title>
    <script src="index.js"></script>
  </head>
  <body>

    <!-- All the HTML content here -->

  </body>
</html>
```

![](https://images.viblo.asia/46242ef0-7117-4b2a-b1c2-2b32bca64f21.png)

Tác động của quá trình load trang khi gặp thẻ script có thể khá lớn và chủ yếu là tác động tới từ quá trình thực thi đoạn script đó. Và lượng content thực tế của trang HTML có thể lớn hơn trong một số trường hợp. Vì thế tất cả thời gian load và render có thể ảnh hưởng tới trải nghiệm của người dùng vì thời gian chờ quá lâu.

Vậy thì chúng ta có thể sử dung một số cách dưới đây để tối ưu hóa quá trình loading JavaScript của trang web.

# 1. Đặt thẻ script ở cuối cùng của trang
Khi đặt thẻ `script` ở cuối cùng của trang - sau tất cả những content chính - sẽ giúp bạn cải thiện được vài phần hiệu suất. Những content chính của trang sẽ được load và render liền mạch và sẽ không bị block vì gặp thẻ `script` ở giữa trừng quá trình render. Quá trình download và thực thi sẽ được tiến hành cuối cùng, khi tất cả content đã được render hoàn chỉnh.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Script at the end of page</title>
  </head>
  <body>

    <!-- All the HTML content here -->

    <script src="index.js"></script>
  </body>
</html>
```

![](https://images.viblo.asia/21249f2e-3cfd-4f4f-aaf7-7e002629682e.png)

Việc đặt thẻ `script` ở cuối cùng cải thiện tốc độ load hơn so với việc đặt owr phần `head` của trang. Ở đây bạn vẫn sẽ có thời gian chờ vì việc download script vẫn sẽ không dừng lại cho đến khi trang được load hết. Tuy nhiên chúng ta sẽ nhận được lợi ích từ việc toàn bộ nội dung của trang web đã được load và hiển thị với người dùng, trong khi đó có thể đợi việc script được download và thực thi sau cùng. Sau đó khi toàn bộ trang HTML được render hoàn chỉnh, script được download và thực thi, và cuối cùng event `document ready` sẽ được thực thi.

# 2. Thêm thuộc tính async vào trong thẻ script
Khi quá trình render gặp một thẻ `script` có attribule `async`, quá trình download script sẽ được tiến hành song song với quá trình render HTML. Và quá trình thực thi script sẽ được tiến hành **ngay sau khi** quá trình download hoàn thành, tạm dừng lập tức quá trình render. Một khi quá trình thực thi script hoàn thành, quá trình render sẽ tiếp tục trở lại.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Script with async attribute</title>
    <script async src="index.js"></script>
  </head>
  <body>

    <!-- All the HTML content here -->

  </body>
</html>
```

![](https://images.viblo.asia/633e5fa3-0f54-4fb1-abb7-912df37ec8aa.png)

Tuy nhiên vì sự khác biệt về kích thước giữa các file script khác nhau và `async` thực thi đoạn script ngay khi chúng được load hoàn chỉnh, sẽ không có gì đảm bảo chúng được thực thi lần lượt từ trên xuống dưới theo thứ tự được viết trong code. Vì thế nếu có bất kì sự phụ thuộc nào giữa các đoạn script, ví dụ nếu một đoạn script cần phải thực thi sau một đoạn khác, thì bạn cần tránh sử dụng attribute này. Trong trường hợp này thì bạn sẽ không thể chắc chắn một thời điểm cụ thể khi nào quá trình render hoàn thành và khi nào event `document ready` được trigger.

# 3. Thêm thuộc tính defer vào trong thẻ script

Khi render gặp một thẻ `script` có chứa thuộc tính `defer`, quá trình download sẽ được thực hiện song song với quá trình render trang HTML. Việc thực thi script sẽ được tiến hành **chỉ** sau khi render HTML được hoàn thành.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Script with defer attribute</title>
    <script defer src="index.js"></script>
  </head>
  <body>

    <!-- All the HTML content here -->

  </body>
</html>
```

![](https://images.viblo.asia/3413f1ea-28b5-4476-b2c6-54214e35903b.png)

Khi bạn sử dụng attribute `defer`, thứ tự thực hiện script sẽ được đảm bảo theo thứ tự đoạn script được khai báo. Thêm thuộc tính này sẽ giúp thực thi các đoạn script sau khi tất cả HTML được render và trước khi `document ready` được trigger.

# Tổng kết
Cùng tổng hợp lại những thứ bên trên:
1. Đặt thẻ `script` ở cuối trang để tránh việc block quá trình render, sau đó mới load script và thực thi từng cái một khi quá trình render đã hoàn tất.
2. Sử dụng thuộc tính `async` trong thẻ `script` để download script song song với quá trình render phần tử HTML và thực thi nó ngay sau khi nó sẵn sàng.
3. Sử dụng thuộc tính `defer` trong thẻ `script` để download script song song với quá trình render phần tử HTML và thực thi nó chỉ chỉ toàn bộ trang HTML đã được render hoàn chỉnh.


<br><br>
Rescouce: https://medium.com/better-programming/improve-page-load-performance-with-these-different-script-loading-techniques-b0d912eae7b1