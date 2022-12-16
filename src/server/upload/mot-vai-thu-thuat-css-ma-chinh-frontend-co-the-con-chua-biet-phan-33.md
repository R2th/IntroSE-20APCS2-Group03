![](https://images.viblo.asia/4b5cd70b-e909-44b4-ae04-dbca765b968b.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 33 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. `@media (480px <= width <= 768px)` thì trình duyệt có hiểu không?

Đây là 1 trong những tính năng được giới thiệu của **Media Queries Level 4** và nó có tên là `Range Syntax`.

> Nói về **Media Queries Level 4** thì trước đây ở [phần 25, mình có sử dụng `@media (hover: none)`](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-25-YWOZraxpKQ0#_2-thiet-bi-tabletmobile-thi-khong-an-css-hover-duoc-1), đó cũng là tính năng thuộc về **Media Queries Level 4** luôn các bạn nhé!

Quay trở lại với tính năng này, bạn có thể hình dung cách mới là như sau:

**Cách cũ**

```css
@media (min-width: 480px) and (max-width: 768px) {
    ...
}
```

**Cách mới với `Range Syntax`**

```css
@media (480px <= width <= 768px) {
    ...
}
```

Tức là cú pháp mới có những cải tiến:

- Không sử dụng với từ khóa bắt đầu bằng chữ `min-` hoặc `max-` nữa, mà thay vào đó là dấu biểu thức `>`, `<`, `=`, `<=`, `>=`.
- Cho phép gộp điều kiện trong biểu thức, mà không phải dùng thêm từ `and` để nối điều kiện nữa.

Cá nhân mình thấy sự thay đổi này giúp **dễ hiểu** hơn rất nhiều. Vì với kiểu viết hiện tại, mình thường thấy 1 số bạn mới học CSS gặp 2 lỗi là:

1. Hiểu nhầm về `min-width` hay `max-width` rồi, kiểu định nghĩa bị nhầm, bị ngược. Ví dụ: **(max-width: 768px) -> thì bảo là CSS cho những màn hình lớn hơn 768px @@**.
2. Nếu ở màn hình bằng đúng 768px thì không biết có nhận style trong `@media` này hay không?

Chỉ cần chừng đó lý do thôi, cũng đủ thấy tính năng mới này đem lại lợi ích thế nào rồi nhỉ!

Tuy nhiên, tiếc là cho đến thời điểm của bài viết này, nó chưa được hỗ trợ trên nhiều browser.

Nhưng không như mọi khi, chúng ta không cần phải chờ trình duyệt support mới sử dụng được, với thuộc tính này, mình có cách để nó work được trong source code của bạn, có thể áp dụng vào dự án từ hôm nay.

Đó là sử dụng PostCSS có tên là [postcss-media-minmax](https://github.com/postcss/postcss-media-minmax). (nhờ bạn tự tìm hiểu cách cài đặt cho source code của mình và test thử nhé).

Nếu bạn đang dùng Codepen để demo, thì [họ cũng có hỗ trợ sử dụng các plugin của PostCSS](https://blog.codepen.io/2015/07/14/postcss-now-supported-on-codepen/) với cú pháp `@use` đó nhé!

**Co giãn trình duyệt (hoặc khung preview của Codepen) để xem kết quả demo**

{@codepen: https://codepen.io/tinhh/pen/rNjPaoE}

#### Trình duyệt hỗ trợ

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![Safari][safari-image] | ![Edge][edge-image] | ![Opera][opera-image] | ![IE][ie-image] 
:-: | :-: | :-: | :-: | :-: | :-: |
 ❌  | ✅ | ❌  | ❌  | ❌  | ❌  |
 
 >  ⚠ 󠀠 Không hiểu sao mình test trên Firefox vẫn chưa work mọi người ơi, mình sẽ tìm hiểu thêm @@

#### Đọc thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#syntax_improvements_in_level_4
- https://brennaobrien.com/blog/2014/06/media-queries-level-4.html
- https://www.w3.org/TR/mediaqueries-4/#mq-range-context
- https://webplatform.news/issues/2017-08-04

### 2. `CSS counter` dùng trong trường hợp nào?

[`list-style-type`](https://www.w3schools.com/cssref/tryit.asp?filename=trycss_list-style-type_all) mang lại cho bạn 1 vài kiểu định dạng cho **(un)ordered list**, nhưng dường như vẫn chưa đủ nhu cầu mà bạn cần.

**#1. Giả sử như thuộc tính `list-style-type: decimal-leading-zero` sẽ thêm số 0 đằng trước cho các phần tử từ 0 ~> 9, từ số 10 là không còn nữa. Vậy nếu bạn muốn tạo ra được danh sách được đánh số thứ tự như bên dưới thì phải làm sao?**

```markdown
001. Item 1
002. Item 2
003. Item 3
...
010. Item 10
010. Item 11
010. Item 12
...
098. Item 98
099. Item 99
100. Item 100
```

`CSS counter` có thể giúp bạn trong trường hợp này

> Có rất nhiều bài viết chia sẻ hướng dẫn về cách sử dụng `CSS Counter` này, nên mình sẽ đi qua vài ví dụ nữa, để các bạn dễ hình dung nó áp dụng trong trường hợp nào nhé.
>
> Cơ bản là các bạn chú ý các thuộc tính sau phải có thì counter mới chạy được: `counter-reset`, `counter-increment` và `counter(<counter name>)` đặt trong thuộc tính `content` của `:before`, `:after`.

Đây là cách mình giải quyết bài toán trên.

{@codepen: https://codepen.io/tinhh/pen/WNRPgYz}

**#2. Hiển thị danh sách mục lục với chữ "Chapter ..." đằng trước**.

Nếu không dùng `CSS counter` bạn cũng sẽ có vài cách khác trước đây như:

- Thêm thẻ `<span>Chapter {dùng_JS_đếm_số_ở_đây}</span>`
- Hoặc thông qua `data-attr="dùng_JS_đếm_số_ở_đây"`

Nói chung kiểu gì bạn cũng sẽ dùng đến JS, nhưng với `CSS counter` mọi chuyện sẽ trở nên dễ dàng hơn rất nhiều.

{@codepen: https://codepen.io/tinhh/pen/dyNagNv}

> [Trình duyệt support cho thuộc tính này ngon lành rồi](https://caniuse.com/css-counters), các bạn yên tâm sử dụng!

#### Trình duyệt hỗ trợ

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![Safari][safari-image] | ![Edge][edge-image] | ![Opera][opera-image] | ![IE][ie-image] 
:-: | :-: | :-: | :-: | :-: | :-: |
 ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Đọc thêm

- https://www.samanthaming.com/tidbits/53-css-counter/
- https://www.digitalocean.com/community/tutorials/css-css-counters
- https://www.freecodecamp.org/news/numbering-with-css-counters/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters
- https://css-tricks.com/custom-list-number-styling/

### 3. Custom cursor với emoji

Như bạn đã biết CSS cung cấp cho chúng ta 1 số value để style con trỏ chuột (`cursor`) thường thấy như `pointer`, `not-allowed`, `zoom-in`, `zoom-out`, `help`, `move`...Ngoài ra còn cho phép custom bằng hình ảnh, như đoạn code bên dưới:

```css
div {
    cursor: url(assets/image.png), auto;
}
```

Bên cạnh trỏ đến đường dẫn ảnh như trên, còn có thể đặt vào ảnh base 64 với cú pháp:

```css
.div {
  cursor: url("data:image/svg+xml..."), auto;
}
```

Từ cách làm trên, kết hợp với ý tưởng sử dụng các emoji 👍, 🔥, 🌟, 🚀, 💩..như là một image để custom cursor. Việc chúng ta cần làm là convert emoji sang dạng base64 và [đây là trang web](https://www.emojicursor.app/) mà mình thường sử dụng để thực hiện việc đó.

Bạn có thể tìm emoji trên các trang https://emojipedia.org/, https://getemoji.com/, https://www.emojicopy.com/, copy vào ô custom để có nhiều emoji đặc biệt cho trang web của mình thử nhé!

![](https://images.viblo.asia/42be8844-c706-4315-8180-285c1609e67c.PNG)

Nếu như bạn [ghé thăm trang Porfolio của mình](https://hahuutin.js.org/), cũng sẽ thấy hiệu ứng custom cursor như bài hướng dẫn này đó :smiley: 

![](https://images.viblo.asia/9308d031-beac-4e44-960b-f3da7e358100.gif)

#### Trình duyệt hỗ trợ

![Chrome][chrome-image] | ![Firefox][firefox-image] | ![Safari][safari-image] | ![Edge][edge-image] | ![Opera][opera-image] | ![IE][ie-image] 
:-: | :-: | :-: | :-: | :-: | :-: |
 ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

#### Đọc thêm

- https://dev.to/alvarosaburido/use-custom-emoji-as-a-cursor-using-css-3j7

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!

[chrome-image]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png
[firefox-image]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png
[ie-image]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[opera-image]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png
[safari-image]: https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png
[edge-image]:
https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png