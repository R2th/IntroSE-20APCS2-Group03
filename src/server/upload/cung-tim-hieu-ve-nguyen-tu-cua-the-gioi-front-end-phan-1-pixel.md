![](https://images.viblo.asia/356f907a-e15f-4de7-a14c-e60c6553537b.png)

# 1. Mở đầu

Nếu là một nhà phát triển ứng dụng Web hay Android, thì chắc hẳn bạn đã dùng các đơn vị độ dài như `px`, `dp` để tạo style cho các phần tử trên giao diện.

Có lẽ nhiều người sẽ nghĩ rằng: Màn hình mình FullHD, độ phân giải 1920x1080, thì cứ 1920px mà vã vào css thôi, nghĩ ngợi làm gì nhiều. Nhưng liệu có thật là như vậy không? Chúng ta hãy cùng tìm hiểu.

TL;DR

> 1px = 1/96 inch
>
> 1dp = 1/160 inch

# 2. Pixel - nguyên tử của thế giới Web

**Lưu ý:**
Trước tiên, ta cần phải làm rõ 1 điều: 1px của CSS khác với 1px của thiết bị (độ phân giải). 1px CSS có thể tương ứng với 1 hoặc nhiều px của thiết bị.

Có rất nhiều loại màn hình, độ phân giải, kích thước khác nhau. Nó làm khó lập trình viên trong việc dựng giao diện, được màn hình này thì lại hỏng màn hình kia. Vì vậy w3 đã quy ước 1 đơn vị chuẩn, dùng cho mọi thiết bị: **px**. 

Định nghĩa trên [w3](https://www.w3.org/TR/css-values-4/#px)

> 1px = 1/96th of 1in

Tuy nhiên, khi nhìn xuống dưới một chút, ta có thể thấy thêm

> For a CSS device, these dimensions are anchored either:
>
> ​    i.  by relating the physical units to their physical measurements, or
>
> ​    ii. by relating the pixel unit to the reference pixel.

Nhìn sơ qua thì khá là khó hiểu, nhưng ta có thể hình dung được 1 điều, pixel có thể được tính toán theo 2 cách.

## 2.1 By relating the physical units to their physical measurements

Ý đầu là dành cho các thiết bị đòi hỏi độ chính xác cao về độ dài, ví dụ như máy in. Ta phải sử dụng các đơn vị `inch`, `cm`, ... đúng như độ dài thực tế của chúng. Khi đó, `1px` sẽ tương đương **0.267mm** (25.6/96). Ta sẽ không đề cập đến những loại thiết bị này trong bài.

## 2.2 By relating the pixel unit to the reference pixel

Đối với các thiết bị trình chiếu (bất kể độ phân giải, màn hình Retina hay thứ gì thần thánh khác), các thiết bị mà có khoảng cách nhìn bất thường, **px** sẽ là đơn vị để tính ra `inch`, `cm`, ... 

Và w3 khuyên rằng, nên sử dụng **reference pixel** để tính ra tỉ lệ quy đổi 1px CSS này với số pixel thiết bị (màn hình 4096 × 2160 có thể sẽ không còn là 4096px trong CSS nữa). Hay nói cách khác là tính xem 1px CSS bằng bao nhiêu.

Lại một đơn vị hại não nữa, và w3 định nghĩa nó như sau:

> The reference pixel is the visual angle of one pixel on a device with a pixel density of 96dpi and a distance from the reader of an arm’s length. For a nominal arm’s length of 28 inches, the visual angle is therefore about 0.0213 degrees. For reading at arm’s length, 1px thus corresponds to about 0.26 mm (1/96 inch).

Như vậy, `reference pixel` là một **visual angle** của **1px** trên màn hình **96dpi**. Khoảng cách nhìn là 1 sải tay (khoảng 28in đối với người bình thường) - đây là khoảng cách ngồi PC thông thường.

Từ khái niệm này lại đẻ ra khái niệm khác :v Ta hãy bắt đầu với DPI

**DPI** (Dots Per Inch): tương đương với PPI (Pixels Per Inch), nó cho ta biết 1inch màn hình thiết bị có bao nhiêu pixel thiết bị. 96dpi nghĩa là 1inch có 96 pixel. Như vậy 1px của màn hình 96dpi sẽ là 2.56 / 96 ~ **0.26mm**

DPI càng lớn, màn hình hiển thị càng chi tiết. DPI được tính dựa trên kích thước thiết bị và độ phân giải của thiết bị.

VD màn hình công ty mình dùng là Dell P2319H, 23in (58,42cm), độ phân giải 1920x1080

![](https://images.viblo.asia/c5529984-c033-4c36-abb1-9dd73be39f03.jpg)

Áp dụng Pytago: ta có 

```
(1920x)^2 + (1080x)^2 = 58.42^2 (cm^2)
```

Tính nhanh, ta được x = 0.0265cm. Như vậy, máy mình có chiều rộng là 1920x = 19.89in, và DPI = 1920 / 19.89 = 96.53

**Visual angle** là góc v được biểu thị dưới hình sau:

![](https://images.viblo.asia/835cce17-7a60-43d8-adc0-ead0a1d00de8.jpg)

Áp dụng vào, bấm máy tính:

```
v = 2 x arctan((2.56/96) / (2x28x2.56)) => 0.0213 (độ)
```

Với reference pixel là **0.0213 độ**, khoảng cách nhìn **28in**, 1px CSS luôn có giá trị là **0.26mm**. Vì vậy giữa 2 màn hình PC cùng kích thước, nhưng có độ phân giải khác nhau (ví dụ 1 cái FullHD, 1 cái 4K), 1 element có width 10px sẽ luôn có kích thước vật lý bằng nhau (2.6mm).

![](https://images.viblo.asia/4f52ddec-b90b-42f3-9556-b3cf12e6f4d8.png)

Với màn hình FullHD, 1px CSS sẽ ứng với 1px của thiết bị, còn với màn Retina căng đét, 1px CSS ứng với 2px thiết bị, nhưng kích thước thật của chúng đều là 0.26mm.

Khoảng cách tới màn hình càng cao, độ lớn của 1px càng tăng lên. Ở khoảng cách 3.5m, 1px có giá trị lên tới 1.3mm, và 1in lúc này khoảng 124.8mm (gấp gần 5 lần giá trị thực).

![](https://images.viblo.asia/a666ffa1-d5ba-4e25-9f16-4231d6f0a08a.png)

Loanh quanh một hồi, ta vẫn chưa giải thích được vấn đề ban đầu: Ta có thể coi 1px trên màn hình PC là 1px CSS hay không?

Câu trả lời là có. Bởi vì màn hình PC, laptop hiện nay đa số đều có độ phân giải khoảng 96dpi, nên 1px thiết bị vừa đúng với 1px CSS.

# 3. Pixel trên trình duyệt Mobile

Liệu các bạn có bao giờ thắc mắc: Màn hình điện thoại toàn HD 720x1280, FullHD 1080x1920, ... mà sao khi responsive lại phải sử dụng media query < 576px?

Chắc hẳn các bạn đã tự có câu trả lời cho mình. Vì khi sử dụng **reference pixel**, 1px trên điện thoại sẽ không còn là 1px của CSS nữa.

Do DPI điện thoại cao chăng? Ví dụ điện thoại mình có DPI là 294, độ phân giải 720x1280, vậy thì 1px CSS (0.26mm) = 3px thiết bị (0.087mm). Vậy thì là 240x427?

Không, một phần đúng là do DPI, và 1 lý do nữa là vì ta cầm điện thoại gần hơn nhiều so với khoảng cách ngồi trước màn hình PC, Laptop (khoảng 18in)

![](https://images.viblo.asia/ff59e444-6b0f-430e-85b2-b4afa3494ec9.jpg)

Áp dụng định lý Talet trong tam giác, ta tính được 1px CSS giờ chỉ còn: 

```
18 * 0.26 / 28 = 0.167mm
```

Lại lấy điện thoại 5in, độ phân giải 720x1280 của mình, 1px = 0.087mm

Dễ thấy 1px CSS = 2px thiết bị. Vì thế màn hình rộng 720px của ta giờ chỉ còn 360px trong mắt CSS. Tỉ lệ 2:1 này, gọi là `devicePixelRatio`

Con số này sẽ được nhà sản xuất tính toán và cung cấp khi sản xuất 1 thiết bị nào đó. Với Javascript, ta có thể dùng hàm sau để lấy được `devicePixelRatio`:

```js
window.devicePixelRatio
```

# 4. Kết luận

Thế giới Frontend khá hại não với các loại màn hình khác nhau, nên người ta đã phải quy ước 1 đơn vị chuẩn dùng cho mọi thiết bị trong cùng 1 khoảng cách nhìn. Điều này đã giúp anh em dev chúng ta dễ thở hơn nhiều. 

Hy vọng bài viết này giúp mọi người hiểu thêm về đơn vị px mà mình vẫn sử dụng thường ngày.

Định viết thêm cả về `dp` trong Android mà cảm thấy bài dài quá rồi, có lẽ mình sẽ để kỳ tới, mong các bạn ủng hộ.

# 5. Tham khảo

* [w3](https://www.w3.org/TR/css-values-4/#px)
* [html5rocks](https://www.html5rocks.com/en/mobile/high-dpi/)
* [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

* Hình ảnh thì lấy tùm lum quá mà quên lưu nguồn T.T