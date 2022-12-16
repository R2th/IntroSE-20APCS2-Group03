Cái này có thể làm được bằng CSS không? Có cần phải dùng Javascript để giải quyết nó không? Tôi biết rất nhiều người trong chúng ta sẽ hỏi những câu hỏi này khi nhìn vào design. Gần đây tôi quyết định đào sâu vào CSS và tìm hiểu tất cả các thuộc tính. Tôi đã dành rất nhiều thời gian để đọc tài liệu tham khảo, code và tìm giải pháp mới cho các vấn đề cũ với kiến thức mới phát hiện của mình.

Trong suốt hành trình của mình, tôi nghĩ rằng tôi sẽ ghi lại và giới thiệu 50 thuộc tính và giá trị thú vị nhất mà tôi tìm thấy. Tôi đã tạo các trường hợp sử dụng cho nhiều người trong số chúng, với các bài code mẫu đơn giản mà bạn có thể xem, tham khảo và luyện tập với nó. Tôi cũng bao gồm một số thuộc tính vẫn đang thử nghiệm, nhưng có thể sẽ sớm được sử dụng. Tôi cũng bao gồm một số thuộc tính nổi tiếng nhưng với các giá trị ít được biết đến, vì vậy bạn có thể đào sâu kiến thức về chúng ngay cả khi bạn đã nghe nói về chúng. Ngoài ra còn có một số điều cụ thể của trình duyệt ở đây.
Bắt đầu thôi.

### 1. all
Thuộc tính all trong CSS sẽ đặt lại(reset) tất cả các thuộc tính khác (ngoài trừ `unicode-pricei` và `direction`) về trạng thái ban đầu hoặc trạng thái kế thừa của chúng. Nó chấp nhận các giá trị sau:

1. **initial**: thay đổi tất cả các thuộc tính của `element` hoặc kế thừa giá trị khởi tạo từ `element` cha của nó.
2. **inherit**: thay đổi tất cả các thuộc tính của  `element` hoặc  `element` cha của nó thành giá trị cha của chúng.
3. **unset**: thay đổi tất cả các thuộc tính của `element` hoặc `element`  cha của nó thành giá trị của chúng nếu chúng có thể kế thừa hoặc thành giá trị riêng của chúng nếu không thể, gân giống như inherit vậy.

{@embed: https://codepen.io/gregh/pen/MJWpeb?__cf_chl_captcha_tk__=28f61c147014211946138acc62833b701baaefae-1587436329-0-AWLJXNmX0ni8veQpGYWVJsOniqr5VT_LgxmUYIhxxSjc-EAsjwbnHiSf-gQaC105fEmT5yavI8_D6sRXjScGdLWmUD0VVKF_1H-hMhPG5q3B4zmzpjceYETG6TaofxEuGAPSRh439enom_tuwUEp94KfmKUrta7o4Ek6fjr2PS4xc104KLlz3amQhWEr2a7lOixqkXdYcn3GXUQmpYOTsfJR7hiOPmLhwoHwCs9whxW9PZEvjuMeptpSX83GL3txUXYsYJhou5wU70gnir-qj-XFO335M_hgUUyOD7DAVmMgHVtuH1MJZYlZBLESD0aD4C3nGwJTDNtJn9Q-CB3QgM5MIn8VPFWmP1_okwup3cxpC_ijisgokjFGq5vDYnfhOtCwzSjgGfEXZbD4Jvt8MB_VbzH7EcHvRKGpazRPRSUhjQ2QdlcUhiKODdMEXwvycYcHCuJi_qshKr_Gh8w7J_n2CtBXTPsSkvEXpwNEbQ-d0k5bzsgdUsSwQbeJWFC1Z7vN9gzAUSvnjy6lNnG-8EvxtAXre2DxRhpKKZ0SOPcA5KSbItpjM4bqHbOFCsnbFQ}
### 2. angle
Angle(góc quay) là giá trị chỉ hợp lệ với một vài thuộc tính trong CSS. Nó thường sử dụng với **transform**, ví dụ như `transform: rotate(180deg)`,`transform:skew(10deg,10deg);`. Ngoài `deg` thì còn có thể sử dụng `grad`, `rad` hoặc `turn`.
{@embed: https://codepen.io/gregh/pen/zNOKNW}
### 3. animation-fill-mode
Thuộc tính này chỉ định style nào được áp dụng cho `element` khi `animation` không thực thi. Hãy tưởng tượng một `@keyframe` làm mờ dần một `element`  (`opacity: 1;` đến `opacity: 0;`). Theo mặc định, sau khi `animation` hoàn tất, nó sẽ quay trở lại trạng thái ban đầu.
{@embed: https://codepen.io/gregh/pen/xgKRbo}
Bằng cách sử dụng chế độ `animation-fill-mode: forwards;` chúng ta có thể làm cho `element`  bị mờ dần bằng cách giữ lại các kiểu trong khung hình chính cuối cùng:
{@embed: https://codepen.io/gregh/pen/EZYNjJ}
Nó bao gồm các thuộc tính sau:
1.**none**: (default) `element`  sẽ có style ban đầu khi animation không được thực thi.
2. **forwards**:`element`  sẽ áp dụng các giá trị được thiết lập bởi khung hình chính cuối cùng khi animation được thực thi.
3. **backwards**: `element`  sẽ áp dụng các giá trị thuộc tính được xác định trong khung hình chính ở đầu animation.
4. **both**: animation sẽ tuân theo các quy tắc của cả `forwards` và `backwards`.
5. **initial**: đặt animation-fill-mode thành giá trị mặc định của nó.
6. **inherit**: kế thừa animation-fill-mode từ `element` cha.
### 4. animation-iteration-count
Thuộc tính này xác định số lần lặp lại `animation @keyframe`. Nó cũng có thể là một giá trị không nguyên, như `animation-iteration-count: 1.5;`, sẽ tạo ra một chu kỳ `animation` đầy đủ cộng với một nửa chu kỳ.
{@embed: https://codepen.io/gregh/pen/JEPbqR}
### 5. backface-visibility
Thuộc tính này xác định xem mặt “phía sau” của`element`  có hiển thị khi `element` được xoay hay không. Nó được sử dụng với các thuộc tính `transform 3D`. Chấp nhận các giá trị sau:
1. **visible**: (mặc định) mặt sau của `element` sẽ hiển thị, khi được xoay
2. **hidden**: mặt sau của `element` sẽ bị ẩn khi xoay.
3. **initial**: đặt thuộc tính thành giá trị mặc định (hiển thị).
4. **inherit**: kế thừa thuộc tính từ `element` cha.

{@embed: https://codepen.io/gregh/pen/jyOrdO}
{@embed: https://codepen.io/gregh/pen/PWozML}
### 6. background-attachment
Thuộc tính này chỉ định nếu hình nền được cố định trong màn hình khi bạn cuộn trang hoặc cuộn cùng với trang.

1. **Scroll**: (mặc định) hình nền được cố định với `element` và không cuộn với nội dung.
2. **Fixed**: hình nền vẫn cố định khi bạn cuộn trang (hoặc `element`)
3. **Local**: cuộn cùng với nội dung `element` nếu `element` có thể cuộn.

{@embed: https://codepen.io/gregh/pen/ZLEBNZ}
### 7. background-blend-mode
Thuộc tính này chỉ định cách `background images`, `gradients`, và `colors` của `element` hòa trộn với nhau. Ví dụ: bạn có thể thêm `background-image` và `background-color`, sau đó đặt `blend-mode` thành `“lighten”`. Bên dưới là các chế độ hòa trộn mà bạn có thể được sử dụng:
1. color
2. color-burn
3. color-dodge
4. darken
5. difference
6. exclusion
7. hard-light
8. hue
9. lighten
10. luminosity
11. multiply
12. overlay
13. saturation
14. screen
15. soft-light

{@embed: https://codepen.io/gregh/pen/xgxqWz}
### 8. background-clip
Thuộc tính `background-clip` xác định khu vực của thành phần nơi  `background` được áp dụng. Bạn có thể làm cho nền đi bên dưới `border` của nó hoặc chỉ điền vào khu vực nội dung của nó.

1. **border-box**: (default) cho phép phạm vi nền đến cạnh ngoài của (border).
2. **content-box**: nền được cắt vào hộp nội dung của `element`
3. **padding-box**: nền được cắt vào cạnh ngoài của `padding`, vì vậy nó được áp dụng cho nội dung và `padding`, nhưng không nằm dưới `border`
4. **text**: nền được cắt thành văn bản nền trước.

{@embed: https://codepen.io/gregh/pen/dNyWRP}
### 9. background-origin
Thuộc tính này xác định nếu nền chỉ được áp dụng cho khu vực nội dung của `element`, hoặc `padding` và`border`. Sự khác biệt giữa cái này và `background-clip` là `background-clip` cắt xén `background` và `background-origin` thay đổi kích thước của `background`.
### 10. box-decoration-break
Thuộc tính này chỉ định `background`, `padding`, `border`, `box-shadow`, `margin`,  và `clip` của `element` được áp dụng khi nó được hiển thị trên nhiều dòng. Nếu chúng ta có văn bản hiển thị trên nhiều dòng, thông thường sẽ tăng chiều cao của `element`, tuy nhiên, `box-decoration-break` có thể áp dụng style cho từng dòng riêng biệt, thay vì toàn bộ `element`.

1. **clone**: mỗi phần của `element` có `style`, `box shadows` và `padding` được áp dụng  riêng lẻ
2. **slice**: `element` được hiển thị như thể nó không bị phân mảnh.

Note: Bạn chỉ có thể sử dụng `box-decoration-break` trên các `inline element`. Theo **MDN**, bạn chỉ có thể sử dụng nó trên các `inline element` của **Firefox** và **Chrome**, nhưng tôi đã thử nghiệm nó và các trình duyệt hiện tại cho thấy các kết quả khác nhau. Nó hoạt động trên **Firefox** và **Chrome 54**, **Opera 41** và **Safari 10** với tiền tố **-webkit**.
{@embed: https://codepen.io/gregh/pen/oBNVzY}
### Tham khảo 
* [CSS-Tricks](https://css-tricks.com/lets-look-50-interesting-css-properties-values/)