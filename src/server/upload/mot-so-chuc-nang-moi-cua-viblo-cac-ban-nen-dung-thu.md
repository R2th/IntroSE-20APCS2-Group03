Trong thời gian vừa qua, bên cạnh việc phát triển những tính năng lớn, đưa vào ứng dụng Machine Learning để nâng cao trải nghiệm người dùng, Viblo cũng có những thay đổi nhỏ, mà có thể nếu không để ý, bạn sẽ khó nhận ra :D Hầu hết những sự thay đổi đó đến từ những góp ý mà Viblo Team vẫn đang nhận được từ các bạn hàng ngày :) Một lần nữa, xin được cảm ơn các bạn rất nhiều, vì những feedback đã gửi về cho Viblo ;)

Và trong bài viết này, Viblo Team xin trân trọng được giới thiệu với các bạn một vài những tính năng, thay đổi nhỏ, mà các bạn nên dùng thử để có được những trải nghiệm tốt hơn trên Viblo.

## 1. Chức năng căn lề text
Hiện tại, Viblo đã hỗ trợ thuộc tính `align` trong các thẻ `<div>`, và bạn có thể dùng thuộc tính này để căn lề cho đoạn text của mình ;) 

Ví dụ như 
```html:html:html
<div align="center">

*This text will be centered, and display in italic*

</div>
```

sẽ cho kết quả 

<div align="center">

*This text will be centered, and display in italic*

</div>

hay bạn hoàn toàn cũng có thể canh giữa cả tiêu đề nữa đấy :D 

```html:html:html
<div align="center">

### This header will be centered

</div>
```

P/S: Để render markdown bên trong thẻ `<div>`, bạn cần có một dòng trắng sau thẻ `<div>` đó (như ở trên)

## 2. Đổi theme highlight code

Hiện tại, theo mặc định, Viblo sẽ highlight code theo theme màu sáng, chẳng hạn như 

```ruby
[1, 2, 3].map { |x| [x, x ** 2] }.to_h 
#=> {1=>1, 2=>4, 3=>9}

[1, 2, 3].each_with_object({}) { |x, h| h[x] = x ** 2 }
#=> {1=>1, 2=>4, 3=>9}
```

Nếu như bạn thích và thấy nhớ dark theme của Viblo ngày trước hơn, bạn có thể thay đổi tuỳ chọn này ở trong [trang setting của mình](/settings/appearances) đấy :D

## 3. Cú pháp embed mới

Viblo hỗ trợ rất nhiều [cú pháp Markdown mở rộng](https://viblo.asia/helps/cach-su-dung-markdown-bxjvZYnwkJZ), trong đó có chức năng embed các link **Youtube, Vimeo, Slideshare, Codepen, JSFiddle, Gist, Google Slide**. Trước đây bạn có thể sử dụng các cú pháp 

```markdown
{@youtube: Youtube ID or URL}
{@vimeo: Vimeo ID or URL}
{@slideshare: Slideshare ID or URL}
{@codepen: Codepen ID or URL}
{@gist: Gist ID or URL}
{@jsfiddle: JSFiddle URL}
{@googleslide: URL}
```

hiện tại, bên cạnh cách làm cũ, các bạn sẽ có thêm phương án dùng `{@embed: URL}` để embed những document từ các dịch vụ mà Viblo support. Một cú pháp dùng cho tất cả ;)

## 4. Xem danh sách Emoticons

Viblo có hỗ trợ chèn các emoticons thú vị vào bài viết, hay comment. Tuy nhiên, không phải ai cũng có thể nhớ được tên gọi đôi lúc rất dài và phức tạp của những emoticons này :joy: 

Hiện bạn đã có thể click vào icon emoticons để xem danh sách, và chèn vào nội dung bài viết của mình nhé ;)

![](https://images.viblo.asia/08913810-b024-439a-8c8d-7103f700cc61.png)

<div align="center">

*Click vào icon emoticons, popup sẽ hiện ra, cho phép bạn lựa chọn icon phù hợp*

</div>

P/S: Ngoài ra, các bạn cũng có thể gõ trực tiếp tên emoticons, bắt đầu với ký tự `:`, thì sẽ có popup hiện ra để gợi ý về danh sách emoticons nữa đấy ![](https://images.viblo.asia/7f756a52-c568-413c-ab47-66abff869bb1.png)

## 5. Check lịch sử Reputation trong thời gian gần đây

Tại trang profile của từng users, đã có thêm một tab mới là **Reputations** (cách thức tính Reputation của người dùng trên Viblo, các bạn có thể xem thêm tại [đây](https://viblo.asia/helps/he-thong-tinh-reputation-tren-viblo-6J3ZgkdxZmB)). Trong tab mới **Reputations** này, các bạn có thể theo dõi được lịch sử biến động về chỉ số Reputation của mình, cũng như của users khác. Hãy thử check ngay biểu đồ của mình, xem gần đây mình có nhận được nhiều sự quan tâm, đánh giá tích cực từ mọi người không nhé ;)

![](https://images.viblo.asia/a8c7288b-aff5-4e5a-a21f-bac5a8964fa8.png)

<div align="center">

*Biểu đồ hiển thị sự thay đổi về Reputation trong 30 ngày gần nhất*

</div>

<hr>

Vẫn còn rất nhiều những tính năng mới thú vị khác, rất nhiều những điều điều bất ngờ khác sẽ sớm được gửi đến các bạn trong thời gian tới, hãy cùng dõi theo và ủng hộ Viblo nhé. Nếu có bất kỳ vấn đề hay ý tưởng gì, hy vọng các bạn có thể gửi về cho Viblo Team thông qua chức năng [Feedback](/feedback), hoặc gửi email về địa chỉ contact@viblo.asia, hoặc thậm chí để lại ngay comment trong bài viết này nhé ;) 

**Viblo Team.**