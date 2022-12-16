Đà Nẵng đã bắt đầu vào những ngày nắng nóng, khiến cho người ta cũng hối hả hơn - nét đặc trưng của sự vội vã rõ rệt khi về hè. Còn bạn mình ở Hà Nội lại đang thất tình, *người ta nói ngày lòng buồn nhất là ngày trời đổ cơn mưa*. Thật lạ lùng, cùng một đất nước xinh đẹp đều vào hạ nhưng mỗi nơi thời tiết lại có những nét riêng. Cũng như, Hà Nội, Sài Gòn có thói quen và cách hành xử rất khác nhau, một phần do môi trường khí hậu, mặt khác do văn hoá. Nơi thì kẻ chợ bốn mùa, giao thoa với đất lề quê thói - ngược lại Sài Gòn hai mùa mưa nắng, cách sống sẽ được giản lượt hoá cho mục đích hoà nhập của dân lập nghiệp. Mỗi nơi có một nét đặc trưng riêng, ai cũng dễ thương và cảnh sắc phong phú đã tạo nên một bức tranh hình chữ S.

![](https://images.viblo.asia/c248af1b-1b6b-4395-9407-7dd3ba3dcca8.jpg)

Đó là cuộc sống, còn với code thì sao... Thật ra code cũng là một phần cuộc sống của developer mà, code cũng có những thứ "nằm chung một mâm" nhưng lại không hề giống nhau đâu nhé. Hôm nay, mình sẽ chia sẻ đến các bạn bài mở đầu của serier về những điểm khác nhau và thú vị đó.

### 1. `style="width: ..."` và `width="..."` 
Chắc hẳn những bạn làm Frontend lâu năm, đôi khi cũng hay nhầm lẫn giữa 2 thuộc tính này.

```html
<!-- Work -->
<img width="200px" />

<!-- Does NOT work -->
<div width="200px">
```

#### - Có gì với `style`
Trước tiên đây là cách để khai báo một `attribute` cho một tag HTML, thường gọi là `CSS inline style`.
```html
<div style="css..."></div>
```

#### Sự khác nhau
##### - HTML Attribute Reference
- Đối với `width`, `height` là thuộc tính có sẵn của HTML, không phải của CSS.
- Chỉ dùng được cho các tag như `canvas`, `img`, `table`, `input`, `iframe` ...

Document: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
##### - Style Attribute
- Cách viết css trong thẻ `style` sẽ có độ **ưu tiên** hơn.
- Sử dụng được nhiều thuộc tính CSS

### 2. `display: none`, `opacity: 0` và `visibility: hidden`
Trong CSS, có 3 thuộc tính để ẩn element là
```css
- display: none;
- opacity: 0;
- visibility: hidden;
```
#### Sự khác nhau
##### - `display: none`
- Là cách sử dụng phổ biến để ẩn một element. Cách này sẽ xoá luôn kích thước của element.
- Không sử dụng cho mục đích làm hiệu ứng như `fade`, `slideToggle`...
- Vì bị mất kích thước thực tế bằng 0 nên các properties liên quan đến size sẽ không sử dụng được: `clientHeight, clientWidth, height, offsetHeight, offsetWidth, scrollHeight, scrollWidth` kể cả là `getBoundingClientRect()`.
##### - `opacity: 0`
- Dùng để ẩn element, tuy nhiên vẫn giữ lại kích thước cho vị trí hiện tại.
- Thường dùng kết hợp với CSS3 cho các trường hợp animation `fade`...
##### - `visibility: hidden`
- Là thuộc tính kết hợp giữa `opacity: 0` và `pointer-events: none`. Cách này thường dùng để vô hình một element tuy nhiên không muốn tác động thông qua việc `hover`, thao tác `tab`...

#### Thủ thuật
Với Chrome hoặc Firefox khi bật F12, trong lúc debug CSS bạn cũng có thể ẩn bất kỳ element nào bằng cách selector đến element đó và ấn `phím h` hoặc chuột phải chọn `hide element`.

![](https://images.viblo.asia/1c78d6fe-2bc2-4844-9d3c-2d2491feab43.png)

### 3. Normalize với Reset CSS
![](https://images.viblo.asia/419bc2c6-5608-424b-bbdf-7c85ad76c7b1.png)
Nhìn chung, `normalize` và `reset` đều là phần định nghĩa chung để thống nhất các trình duyệt có style tương tự nhau. Ví dụ để thống nhất `border` của input, để loại bỏ `margin` mặc định của body...

Tuy nhiên, bạn hãy nhìn 2 thằng mập bên trên hình minh hoạ, cùng là 2 thằng mập nhưng thằng bên trái nhiều răng có sừng còn thằng kia thì hơi ngáo nhưng lạc quan.

Nếu anh em dùng kèm một số thư viện CSS như Bootstrap, Material... thì họ đã có sẵn phần reset CSS rồi. Còn nếu một module riêng của bản thân thì chúng ta phải tự định nghĩa một đoạn reset css / normalize css của riêng mình. Vậy khác nhau giữa 2 cái này là gì?

#### Sự khác nhau
##### - Reset CSS
- Như cái tên của nó, nó sẽ reset lại các style mặc định để thống nhất lại những điểm chung của các trình duyệt (Chrome / Firefox / Safari / IE...).
- Áp dụng cho các tag `h1 -> h6`, `p`, `strong`, `em`
- Loại bỏ spacing mặc định của trình duyệt
- Loại bỏ border space của `table` và bỏ style list mặc định của `ul, li`
##### - Normalize
- Mục đích bổ sung, định nghĩa style common để phù hợp với project của bạn.
- Chia thành modules, phục vụ cho nhiều components khác nhau mà không bị ảnh hưởng như reset
#### Thư viện
Có một vài thư viện định nghĩa sẵn việc này bạn có thể tham khảo.

**Reset CSS**: https://meyerweb.com/eric/tools/css/reset/

**Reseter.css**: https://krishdevdb.github.io/reseter.css/

**Normalize.css**: https://necolas.github.io/normalize.css/


### Tổng kết
Trên đây là một số điểm khác biệt, ban đầu ai cũng nghĩ nó sẽ tương tự nhau. Trong quá trình làm sẽ phát sinh nhiều trường hợp dẫn đến việc sinh ra bug không hiểu vì đâu là do chưa hiểu bản chất mục đích. Hi vọng sau bài này sẽ giúp các bạn trong làng code có thêm kiến thức để tránh những phát sinh không mong muốn. :D