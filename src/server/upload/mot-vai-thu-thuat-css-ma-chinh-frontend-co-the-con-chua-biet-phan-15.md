![](https://images.viblo.asia/818299aa-e30f-430a-8102-7e89736caa09.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 15 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. `:empty` selector giúp xử lý nhiều trường hợp không cần động đến JS

Đây là 1 thuộc tính rất hay mà có lẽ nhiều dev Frontend đã đọc qua, nhưng trường hợp nào để mà nó trở nên hữu dụng thì không gặp thường xuyên và đấy cũng là lý do khiến nhiều dev bỏ quên nó.

Để rồi khi gặp phải những tình huống xử lý giao diện hơi khó chút, lại phải dùng đến JS, mà quên bén đi rằng,  trong CSS có `:empty` selector hoàn toàn có thể xử lý được, mà còn rất là đơn giản nữa!

Không những thế, selector này dễ dàng áp dụng vào rất nhiều dự án, bởi nó đã được support ở hầu hết các trình duyệt phổ biến.

Hãy cùng mình tái hiện 1 tình huống xử lý giao diện sau, để biết `:empty` làm việc hiệu quả đến như nào nhé!

**App của bạn cần tạo ra vùng nhập nội dung cho user (kiểu như ô gõ status của facebook vậy!)**

**Và cần làm được 2 yêu cầu dưới:**

**1. Hiển thị chữ "Nhập nội dung ở đây" khi vùng nhập đang trống**

**2. Vùng nhập đó khi giãn tới 1 độ cao nhất định sẽ xuất hiện thanh scrollbar**

Nói đến đây, nhiều dev nghĩ rằng đơn giản dùng `textarea` thôi mà! Nhưng không đơn giản thế, textarea có rất nhiều giới hạn bởi behavior mặc định của nó.

> Bạn cũng thử inspect element khu vực gõ status của facebook lên mà xem, hoàn toàn không có chút `textarea` nào cả!

Với yêu cầu thứ 1, nếu là `textarea` thì mình đơn giản sử dụng thuộc tính `placeholder` ở đây là xong.

Nhưng với yêu cầu thứ 2, nếu là `textarea` thì buộc phải dùng đến JS thôi!

Vậy thì với chỉ bằng CSS, đây là cách của mình:

- Tạo 1 `div` sử dụng thuộc tính `contenteditable="true"` của HTML5 cung cấp, cho phép user được gõ nội dung vào trong đó.
- Dùng selector `:empty` để style CSS cho pseudo element `:before` thêm đoạn text là "Nhập nội dung ở đây".
- Và đương nhiên, khi nội dung được nhập vào, chữ "Nhập nội dung ở đây" sẽ biến mất (cách làm như như là đang giả lập hành vi của một `textarea` vậy).

Bạn hãy xem code và kết quả của demo bên dưới:

{@codepen: https://codepen.io/tinhh/pen/WNeoOdX}

`:empty` selector nó sẽ chọn đến những elements nào mà **không chứa gì cả** hoặc **chứa ở trong chỉ là HTML comment** các bạn nhé!

**Đây sẽ là match**

```html
<div></div>

<div><!-- test --></div>
```

**Đây sẽ là không match**

```html
<div> </div>

<div>
  <!-- test -->
</div>

<div>
</div>
```

Không chỉ giải quyết được mỗi tình huống trên, `:empty` còn có thể được dùng để xử lý nhiều tình huống khác nữa.

Hãy đọc thêm các nguồn tài liệu mà mình đính kèm bên dưới, để biết đâu bạn gặp được tình huống tương tự như trong dự án mình đang làm.

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/:empty
-  https://twitter.com/samantha_ming/status/1157782908364451840
-  https://css-tricks.com/almanac/selectors/e/empty/
-  https://medium.com/@samanthaming/css-empty-selector-607ac55d4e
-  https://tympanus.net/codrops/css_reference/empty/

### 2. Tạo hiệu ứng phủ mờ, một thương hiệu của iOS [Not Cross-Browsers]

Có ai đã hình dung được hiệu ứng này là gì chưa ạ?

![](https://images.viblo.asia/dbbc8e5e-6557-4c57-a96b-79cc2bd7a76f.png)

**Đây được gọi là Blurry các bạn nhé!**

Là 1 dev Frontend thì rất có thể một dự án nào đó của khách hàng, họ thích hiệu ứng trên và muốn đưa vào app của họ.

Thật là may mắn khi chính CSS đã cung cấp cho chúng ta 1 thuộc tính làm được điều này, đó là `backdrop-filter: blur(...)`.

Bạn hãy xem code và kết quả của demo bên dưới:

{@codepen: https://codepen.io/tinhh/pen/OJLbZGa}

Chỉ có 1 điều hơi tiếc chút là nó chỉ đang support 1 số version mới nhất của những trình duyệt như Chrome, Safari và Edge.

Cho nên hãy cân nhắc trước khi sử dụng nó cho dự án của bạn nhé!

#### Đọc hiểu thêm

- https://css-tricks.com/the-backdrop-filter-css-property/
- https://caniuse.com/#feat=css-backdrop-filter
- https://twitter.com/eriksen_dk/status/1156848253515816960

### 3. CSS cũng có thể `onClick()` được, thật khó tin!

Dựa vào khả năng `focusable` của các elements trong HTML như `button`, `a`, chúng ta dễ dàng làm giả sự kiện click mà không cần đến JS.

Đầu tiên là cần element HTML mà có trang bị hành vi `focusable` mặc định, mới dễ dàng làm được, bởi vì chúng ta sẽ dùng pseudo classes là `:active` để dựa vào đấy mà ẩn hiện nội dung nhé mọi người.

Hãy xem code và demo bên dưới (mình đang click toggle đóng mở 1 cái Dropdown Memu chỉ bằng CSS thôi đấy!)

{@codepen: https://codepen.io/tinhh/pen/NWKbZbd}

Mặc dù tính chất chỉ áp dụng được cho các element có `focusable`, nhưng có 1 tip để biến các thành phần khác có thể có được`focusable`, đó là thêm attribute `tabindex="-1"` vào.

Hãy xem code và demo bên dưới

{@codepen: https://codepen.io/tinhh/pen/Rwbozyr}

#### Đọc hiểu thêm

- https://www.simonewebdesign.it/pure-css-onclick-context-menu/
- https://stackoverflow.com/questions/13630229/can-i-have-an-onclick-effect-in-css

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!