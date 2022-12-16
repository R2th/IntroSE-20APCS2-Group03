# 1. Mở đầu
Là dân lập trình thì việc thường xuyên phải google để tìm tài liệu là điều không còn xa lạ. Và tài liệu thì hầu hết là ngoại ngữ nên việc phải thường xuyên copy/paste văn bản sang các tool dịch là điều đương nhiên. Từ vấn đề này nên mình nảy ra ý tưởng làm một tool giúp dịch tài liệu trực tiếp ngay trên trang mà không cần copy/paste sang các tool khác.(Thật ra thì bạn có thể chọn chế độ dịch cả trang nhưng bản thân mình thì thường chỉ dịch những từ không biết thôi :v).

Về ý tưởng thì mình sẽ thực hiện như sau:
- Highlight văn bản cần dịch.
- Ấn 1 phím để lấy văn bản đã được highlight.
- Dùng api của google để dịch đoạn văn bản trên.
- Hiển thị một modal chứa văn bản đã được dịch dưới đoạn văn bản đã được highlight.

# 2. Thực hiện
Trước tiên thì mình sẽ tạo 1 file html

```
<!DOCTYPE html>
<html>
   <head>
      <title>This is document title</title>
   </head>  
   <body>
      <p>I am a cat</p>
      <p>Hello World!</p>
      <script src = "app.js" type = "text/javascript"/></script>
   </body>
</html>
```

Tiếp theo mình sẽ viết 1 function lấy ra đoạn text đã được highlight sau khi ấn phím `shift`
```
window.onkeyup = (e) => {
  if (e.keyCode === 16) {
    // 16 là mã của phím shift.
    // Bạn có thể tham khảo mã của các phím khác ở đây
    // https://gist.github.com/tylerbuchea/8011573
    alert(getHighlightText());
  }
};

function getHighlightText() {
  return window.getSelection().toString();
}
```

Đây là kết quả khi mình highlight 1 đoạn văn bản và ấn `shift`
![](https://images.viblo.asia/d1374f1a-3844-4ba6-9e95-144bb2f691e4.png)

Tiếp theo là sử dụng api của google để dịch đoạn văn bản vừa lấy được
```
window.onkeyup = (e) => {
  if (e.keyCode === 16) {
    // 16 là mã của phím shift.
    // Bạn có thể tham khảo mã của các phím khác ở đây
    // https://gist.github.com/tylerbuchea/8011573
    translate(getHighlightText(), function () {
      console.log(this.responseText);
    });
  }
};

function getHighlightText() {
  return window.getSelection().toString();
}

function translate(text, callback) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', callback);
  req.open('GET', makeUrl(text));
  req.send();
}

function makeUrl(text) {
  const from = 'en'; // Ngôn ngữ gốc
  const to = 'vi'; // Ngôn ngữ bạn muốn dịch
  return `https://translate.googleapis.com/translate_a/single?client=gtx&sl="${from}&tl=${to}&dt=t&q=${encodeURI(text)}`;
}
```

Và đây là kết quả
![](https://images.viblo.asia/572e2d43-d429-4a1e-ba42-c36714546639.png)

# 3. Kết
Trong phần này mình đã hoàn thành việc lấy văn bản highlight và dùng api của google để dịch, trong phần tiếp theo mình sẽ hiển thị model chứa văn bản đã dịch phía dưới đoạn văn bản highlight và cách cài đoạn js trên vào trình duyệt để tiện sử dụng.