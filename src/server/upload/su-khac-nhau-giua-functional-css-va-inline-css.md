![](https://images.viblo.asia/6635e00f-08c9-47a3-9347-afe488d64e7c.png)

Hé lô mọi người, đợt trước mình chia sẻ 1 bài về [Atomic CSS](https://viblo.asia/p/atomic-nhung-vien-gach-xay-uoc-mo-lon-oOVlYL3nZ8W), có một số anh em vẫn chưa có sự tin tưởng với cách viết Atomic. Phần lớn là *"Nếu viết hàng loạt class trong cùng 1 element vậy thì khác nào viết inline style đâu... tại sao không viết css inline cho nhanh?".*

Trước đây khi mới xem qua thằng Atomic, mình cũng có suy nghĩ tương tự như vậy. Sau khi làm qua một vài ví dụ mình thấy sự khác nhau cho ở thắc mắc trên. Ở bài viết này mình sẽ chia sẻ sự khác nhau giữa khái niệm **CSS Inline** và **Functional CSS** (thường được gọi là Utility-first CSS hay [Atomic CSS](https://viblo.asia/p/atomic-nhung-vien-gach-xay-uoc-mo-lon-oOVlYL3nZ8W)).

##### *Để mị nói cho mà nghe...*
-----
Về cơ bản, Functional CSS là tập hợp hàng ngàn class nhỏ định nghĩa cho từng chức năng, thuộc tính, quy tắc của CSS.

```scss
// CSS
.profileCard {
  background: #333;
  margin: 20px;
  padding: 10px;
  color: #fff;
  border: 1px solid #555;
}
```
```js
const ProfileCard = ({ className, children }) => (
  <div className={`profileCard ${className}`}>
    {children}
  </div>
);
```
Với Functional CSS
```scss
// CSS
.bg-grey { background: #333 };
.m-20 { margin: 20px; }
.p-10 { padding: 10px; }
.text-white { color: #fff; }
.border { border-width: 1px; }
.border-solid { border-style: solid; }
.border-grey-dark { border-color: #555; }
```
```js
const ProfileCard = ({ className, children }) => (
  <div
    className={`bg-grey m-20 p-10 text-white border border-solid border-grey-dark ${className}`}
  >
    {children}
  </div>
);
```

Thắc mắc ngày xưa của mình là: *"Vậy nó khác gì cách viết style inline nhỉ?"*

```js
const ProfileCard = ({ children, ...refs }) => (
  <div
    style={{
      background: "#333",
      margin: "20px",
      padding: "10px",
      color: "#fff",
      border: "1px solid #555",
      ...refs
    }}
  >
    {children}
  </div>
);
```

## Sự khác nhau giữa Functional CSS và Inline Style

Nhìn vào ví dụ trên bạn có thể nghĩ là cách viết Functional CSS và Inline Style có vẻ giống nhau. Nhưng Functional CSS rất khác với Inline Style về những điểm sau:

- Functional CSS là những classes được định nghĩa trước. Và các classes này được nhất quán với từng classes bạn định nghĩa như về *font, color, margin/padding* nên bạn sẽ dễ dàng sử dụng lại so với kiểu dùng Inline Style

- Functional CSS hỗ trợ `media queries` để bạn có thể xây dựng Responsive.

- Functional CSS có thể sử dụng để hỗ trợ cho từng kiểu in cụ thể bạn muốn với CSS.

- Với [Pseudo-classes](http://tympanus.net/codrops/css_reference/#section_css-pseudo-class) CSS như `::before`, `::after` hay `:hover`. Functional dễ dàng giúp bạn định nghĩa còn Inline Style thì không thể.

## Lợi ích khi dùng Functional CSS
Phần lớn các project mình làm đều sử dụng [Bootstrap](https://getbootstrap.com/). Với những dự án freelancer, đặc biệt để xây dựng landing page mình chuyển sang sử dụng Functional CSS vì tính *"ăn sẵn"* khá tuyệt vời của nó. Hơn nữa Functional CSS cũng có những ưu điểm sau:

- Thời gian xây dựng template nhanh hơn. Tăng lên đáng kể so với cách viết BEM trước đây.
- Classes được nhất quán với từng thuộc tính như về *font, color, margin/padding*.
- Không mất thời gian nghĩ cách đặt tên CSS.
- Dễ dàng maintain và phát triển CSS vì mỗi element là độc lập.
- Tránh được cảnh binh đao anh em tương tàn (override code), performance được tối ưu.
- Dễ dàng xây dựng hầu hết các Component UI mà không cần viết thêm nhiều CSS.

## Một số thư viện Functional CSS và Inline CSS
Trước đây, dù làm việc với BEM mình cũng có 1 file `utility.scss` để dùng cho những trường hợp cần thiết. Nếu dùng độc lập bạn cũng có thể sử dụng một vài thư viện sau:

Ngoài một số thư viện mình đã chia sẻ ở [bài trước](https://viblo.asia/p/atomic-nhung-vien-gach-xay-uoc-mo-lon-oOVlYL3nZ8W), mình xin giới thiệu thêm một thanh niên nữa là dành cho React đó là:
https://www.styletron.org/react/. Thanh niên này dành cho project React muốn sử dụng Atomic. Tuy khá nhẹ nhưng rất lợi hại, anh em có thể tham khảo.

Còn nếu anh em nào đọc đến đây vẫn cay cú Functional CSS mà vẫn muốn dùng Inline CSS thì có thể tham khảo cậu này:
https://formidable.com/open-source/radium/. Nó sẽ render Inline CSS cho từng element, để check demo anh em có thể vào thử trang này https://www.lixibox.com/ và F12 để xem.

## Tổng kết
Bài chia sẻ này tương đối giống với bài Atomic lần trước. Tuy nhiên mình muốn phân tích sự khác nhau giữa Inline CSS và Functional CSS cho mọi người hiểu hơn.

Đây cũng là bài kết thúc trước năm 2019. Chỉ còn hơn 1 tuần nữa là Tết đến, chúc anh em ăn Tết vui khỏe, tạm gác đam mê để về sum họp với gia đình, vợ con và đón một năm mới thật nhiều thuận lợi nhé.