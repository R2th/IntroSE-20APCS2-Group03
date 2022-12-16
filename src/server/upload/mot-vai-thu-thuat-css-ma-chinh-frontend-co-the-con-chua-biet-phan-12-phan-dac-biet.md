![](https://images.viblo.asia/cffbd299-6a82-4e4b-af69-1846a1ddefe9.jpeg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 12 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. `text-decoration` thì nghe nhiều rồi, nhưng `text-decoration-*` thì mới lắm nha! [Not Cross-Browsers]

Mình nghĩ chắc có rất nhiều bạn viết code CSS và đặc biệt là các bạn làm Frontend, khi viết thuộc tính `text-decoration` thì dường như thường hay gọi tên 3 value sau:

1. `none`: khi bạn muốn bỏ đi underline mặc định của thẻ `a`
2. `underline`: khi bạn muốn thiết lập lại underline cho thẻ `a`, thường là bạn sẽ style cho thẻ a không có underline ngay ban đầu, khi hover vào sẽ có underline
3. `line-through`: hay dùng nhất khi bạn làm trang web về thương mại điện tử, có giá cũ và giá mới của 1 sản phẩm, thì giá cũ bị gạch giữa

Bạn thấy đấy, rõ ràng là các ứng dụng web ta thường gặp, thì hay rơi vào đúng những trường hợp trên của `text-decoration`.

Riêng về value `underline` mà `text-decoration` cung cấp cho chúng ta, nó quá thô sơ, không thể nào thay đổi màu hoặc là thay đổi các kiểu đường viền như thuộc tính `border`, chính vì vậy mà mình vẫn hay dùng `border-bottom` để tạo hiệu ứng `underline` trong những trường hợp như này:

{@codepen: https://codepen.io/tinhh/pen/MdOqWM}

Nhưng mình đâu biết rằng có 1 thuộc tính gọi là `text-decoration-*`,  `*` là gồm các kiểu như `color`, `style`, `skip`, thế thì bạn hãy xem hãy coi cái cách mà `text-decoration-*` tác động vào `underline` như thế nào ở demo dưới đây:

{@codepen: https://codepen.io/tinhh/pen/KLyBYb}

Vẫn work được và cho kết quả giống như nhau! Nhưng `text-decoration-*` lại có thêm thuộc tính gọi là `text-decoration-skip` giúp ta có thêm kiểu style `underline` **trông cool** hơn so với khi dùng `border-bottom` nhỉ?

Thấy thì hay vậy, nhưng sau khi tìm hiểu nó để coi nó có phải là giải pháp tốt nhất cho việc style `underline`, thì mình nhận ra còn vài khuyết điểm:

1. Ở thời điểm hiện tại nó chưa support tốt ở các browser phổ biến, đặc biệt là vẫn IE, xem thêm ở [CanIUse](https://caniuse.com/#search=text-decoration-style)
2. Đâu đó thì `text-decoration-*` chưa cung cấp đủ cho ta option để mà custom được `width` và `position` của `underline`. Trong khi đó 2 cái thiếu này, `border-bottom` lại cover được!

> `text-decoration-*` vẫn đang trong quá trình hoàn thiện để các browsers support đầy đủ, nên cũng có thể nó là giải pháp hứa hẹn sẽ là tốt nhất khi muốn **Style Underline** cho 1 đường link!

#### References:

- https://css-tricks.com/almanac/properties/t/text-decoration-color/
- https://css-tricks.com/almanac/properties/t/text-decoration-line/
- https://css-tricks.com/almanac/properties/t/text-decoration-style/
- https://css-tricks.com/almanac/properties/t/text-decoration-skip/
- https://css-tricks.com/styling-underlines-web/

### 2. Tạo 1 border "nửa trong suốt", tưởng thì dễ nhưng mà ngộ ra nhiều điều hay!!!

Đã bao giờ bạn nhìn thấy 1 design có lớp mờ border như này:

![Image from Internet](https://cdn-images-1.medium.com/max/1600/1*Mom8QHV7fFXS4U1YM51Q-w.jpeg)

Thoạt nhìn, bạn sẽ nghĩ ngay đến việc sử dụng `border` + `rgba()`, tôi đã thử và đây là cái kết

{@codepen: https://codepen.io/tinhh/pen/wbyeQd}

Ơ..sao vậy nhỉ, thật là tiếc rằng với "cơ chế hiểu" của browsers thì nó đúng là như vậy.

Bất chợt trong tôi lại nghĩ ra 1 cách simple hơn, nhìn nó là border, nhưng tại sao không thử `box-shadow` + `rgba()` nhỉ?

{@codepen: https://codepen.io/tinhh/pen/KLQvNG}

Quả nhiên, đúng như mong đợi, nó work ngon lành luôn các bạn ạ!

Nhưng mình vẫn còn quá cay vụ `border` lúc nãy, cứ nghĩ nó làm được cơ, mình lại hì hục tìm hiểu thì thật may, đã tìm ra chân tướng sự việc.

Đơn giản mình chỉ cần thêm `background-clip: padding-box` là cái ý nghĩ ban đầu của mình `border` + `rgba()` nó work được ngay các bạn ạ!

{@codepen: https://codepen.io/tinhh/pen/EzQvba}

Và hãy để ý ở tiêu đề của tip này, mình bảo "nửa trong suốt" tức là không phải trong suốt **(Transparent)** mà là 1 lớp mờ **(Translucent)**. Và **Translucent Border** chính là keyword để mình research ra tip này đấy!!! 😃


#### References:
- https://css-tricks.com/transparent-borders-with-background-clip/
- https://stackoverflow.com/questions/4062001/css3-border-opacity


### 3. Xin cảm ơn tất cả mọi người!

Như mọi khi, thì đây là tip cuối để mình kết thúc 1 phần chia sẻ, nhưng hôm nay quá là đặc biệt khi mình thấy con số **phần 12**.

12 phần cũng đúng vừa tròn 1 năm, vào tháng này của năm ngoái mình chợt có ý tưởng về việc viết bài chia sẻ các Tips & Trick về CSS dành cho tất cả anh em Developer, đặc biệt là các anh em Frontend Developer như mình.

Từ [bài đầu tiên](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-1-3Q75wppeKWb) mình đã nhận được sự ủng hộ nhiệt tình của nhiều bạn dev. Những lượt **vote up**, **clip bài** rồi bạn **follow theo dõi** bài viết của mình, đó là động lực vô cùng to lớn để mình nỗ lực tìm hiểu kỹ và collect lại các tips thành những mục chia sẻ thật xúc tích, với hi vọng giúp anh em dev hiểu thấu những sức mạnh và vẻ đẹp còn tiềm ẩn bên trong cô gái xinh đẹp CSS này.

Thú thật rằng, ngay lúc này, mình vẫn chưa có biết được thêm nhiều tips nữa đâu. Và cũng không chắc rằng mình sẽ tiếp tục viết tiếp về [series này](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8). Đôi khi mình lại bắt đầu 1 series mới, **Một vài thủ thuật HTML mà chính Frontend có thể còn chưa biết** chẳng hạn =))

Một lần nữa, xin cảm ơn tất cả các bạn đã ghé vào Viblo và đọc bài viết của mình. Và như thường lệ

> Nếu thấy thích thì **Upvote**, thấy hay thì **Clip** bài, để nhận được được thông báo bài viết hằng tháng thì hãy bấm **Follow** mình nhé! ^^