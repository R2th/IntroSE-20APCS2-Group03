Trong thời đại các thiết bị mobile đang ngày càng thông dụng, thì việc làm ra một website/webapp ngày càng phức tạp khi chúng ta phải chú trọng tới nhiều kích cỡ màn hình. Dù đã có nhiều framework CSS hỗ trợ sẵn nhưng việc nắm rõ CSS để không quá lệ thuộc vào framework không bao giờ là thừa. Bên cạnh kỹ thuật hỗ trợ responsive bá đạo như *media queries*, thì có lẽ đơn vị phần trăm là một người bạn đồng hành không thể thiếu nếu bạn muốn cuộc đời dev của mình không bị hành bởi CSS 😀 Bài viết này mình xin tổng hợp và chia sẻ ý nghĩa của **đơn vị phần trăm** cho một số thuộc tính CSS thông dụng để mọi người dễ nắm bắt và áp dụng hơn.

# Phần trăm của cái gì?

Đã là phần trăm thì chúng ta cần phải có một đối tượng cụ thể để đối chiếu. Đa số câu trả lời cho câu hỏi này thường sẽ là **parent block** (phần tử cha). Tuy câu trả lời đó không sai, nhưng chưa thực sự đầy đủ và bao hàm hết tất cả các trường hợp. Đáp án chính xác nhất là **containing block**, tức là phần tử chứa phần tử mà ta đang đặt đơn vị phần trăm.

Để minh họa cụ thể cho đáp án trên, các bạn cùng xem qua ví dụ dưới đây:
{@codepen: https://codepen.io/khangnd/pen/powbjEL}

Trong ví dụ này mình tạo 3 div lồng nhau là 3 ô vuông với các đặc điểm sau:
* Div **ông nội** bọc ngoài cùng, màu xám nhạt, kích thước là **4x4**
* Div **cha** màu xám đậm, kích thước là **2x2**
* Div **con** màu đỏ, kích thước là **50%**

Nếu phần trăm là theo **parent** thì kích thước của **con** lẽ ra phải bằng 1/2 **cha**, nhưng không, kích thước của **con** lúc này là bằng **cha** và lại bằng 1/2 kích thước của **ông nội** như các bạn thấy trong ví dụ. Nguyên nhân là do div **ông nội** mới thực sự là **containing block** chứa div **con**, vì trong div **con** mình có đặt thuộc tính `position: absolute`, ứng với `position: relative` trong div **ông nội**.

Như vậy, việc xác định đâu mới là **containing block** để đơn vị phần trăm đối chiếu hoàn toàn dựa trên thuộc tính `position` của phần tử đó. *Các bạn có thể đọc kĩ hơn trên [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block) (tài liệu tiếng Anh).*

Đối với một số thuộc tính, đối tượng để đối chiếu không phải là *parent block* hay *containing block* mà lại là chính nó - **self element**.

# Các thuộc tính

Dưới đây mình liệt kê một vài thuộc tính thông dụng trong số rất nhiều thuộc tính có thể sử dụng đơn vị phần trăm cùng với ý nghĩa của chúng, đi kèm một vài ví dụ để dễ hình dung hơn.

## `width`/`height`

Đây là 2 thuộc tính phổ biến nhất mà các bạn có thể đã ít nhiều áp dụng đơn vị phần trăm. Không có gì phức tạp, như ví dụ trên, khi bạn đặt phần trăm cho `width` của phần tử thì nó sẽ được đối chiếu với `width` của **containing block** tương ứng, và tương tự, `height` sẽ được đối chiếu với `height` của **containing block**.

## `padding`

Đối với `padding`, cho dù là dọc (`padding-top`/`padding-bottom`) hay ngang (`padding-left`/`padding-right`) thì đơn vị phần trăm đều sẽ đối chiếu với `width` của **containing block**.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/YzQWWRG}

Trong ví dụ này,
* Div **cha** có đặt kích thước là **6x4**
* Div **con** có kích thước là **0**, nhưng với 2 thuộc tính `padding-top` và `padding-left` đều là **50%**

Kết quả là **con** có kích thước bằng 1/2 `width` của **cha**, tức là một hình vuông **3x3**.

## `margin`

Tương tự như `padding`, đơn vị phần trăm của `margin` (cả dọc và ngang) đều đối chiếu với `width` của **containing block**.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/MWoejWd}

Trong ví dụ này,
* Div **cha** có kích thước là **6x4**
* Div **con** với 2 thuộc tính `margin-top` và `margin-left` đều là **50%**

Kết quả là **con** nằm cách cạnh trên và cạnh trái của **cha** một khoảng bằng **3** đơn vị (1/2 `width` của **cha**).

## `top`/`bottom`/`left`/`right`

Đối với các thuộc tính định vị trí của phần tử (thường được kết hợp với `position`), đơn vị phần trăm sẽ đối chiếu `top`/`bottom` với `height` và `left`/`right` với `width` của **containing block**.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/MWoerzw}

Trong ví dụ này
* Div **cha** có kích thước là **6x4**
* Div **con** được đặt `position: absolute` với 2 thuộc tính `top` và `left` đều là **50%**

Kết quả là **con** nằm cách cạnh trên của **cha** một khoảng **2** đơn vị (1/2 `height` của **cha**), và cách cạnh trái của **cha** một khoảng **3** đơn vị (1/2 `width` của **cha**).

## `transform: translate()`

Có lẽ thuộc tính này sẽ ít bạn biết tới hơn, nhưng đây cũng là một thuộc tính cực kỳ lợi hại để định vị trí của phần tử thay cho các thuộc tính trên, thậm chí còn lợi hại hơn về mặt performance khi bạn cần kết hợp với animation hay transition. Tuy nhiên, đối với thuộc tính `transform: translate()` này, đơn vị phần trăm không được đối chiếu với **containing block**, mà sẽ được đối chiếu với **self element** (chính bản thân nó).

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/QWgEQvy}

Trong ví dụ này,
* Div **cha** có kích thước là **6x4**
* Div **con** có kích thước là **2x1** với thuộc tính `transform: translate(50%, 50%)`

Kết quả là **con** nằm cách cạnh trên của **cha** một khoảng **0.5** đơn vị (1/2 `height` của **con**), và cách cạnh trái của **cha** một khoảng **1** đơn vị (1/2 `width` của **con**).

## `background-size`

Đối với `background-size` thì sẽ hơi phức tạp hơn. Đơn vị phần trăm của thuộc tính này sẽ dựa vào **background positioning area** (tạm dịch: phạm vi đặt vị trí ảnh). Hiểu đơn giản thì **background positioning area** cũng chính là **containing block**, nhưng bổ sung 3 yếu tố sau:

* Block chỉ bao gồm content (`content-box`)
* Block bao gồm content và padding (`padding-box`)
* Block bao gồm cả content, padding và border (`border-box`)

3 yếu tố được quy định theo thuộc tính `background-origin`.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/rNwLdMZ}

Trong ví dụ này,
* Div **cha** có kích thước là **6x4**
* Div **con** có kích thước là **3x2**, không `padding`, ko `border`
* Mình dùng [một biểu tượng](https://d2fltix0v2e0sb.cloudfront.net/dev-rainbow.png) (tỉ lệ thật là hình vuông **1:1**) đặt làm `background-image` cho div **con**, với thuộc tính `background-size` là **50% 50%**

Kết quả là ảnh background bị co giãn để có kích thước là **1.5x1**, ứng với 1/2 kích thước của div **con**.

## `background-position`

Tương tự như `background-size`, đơn vị phần trăm của `background-position` cũng dựa vào **background positioning area**.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/JjJKLaP}

Ở ví dụ này, mình dùng hình ảnh và bố cục tương tự như ví dụ `background-size`. Khi thay đổi giá trị của `background-position`, chúng ta có thể quan sát thấy vài điểm sau:
* Khi không đặt giá trị `background-position` (giá trị mặc định là `0 0`), ảnh background sẽ nằm ở góc **trái trên**.
* Khi đặt `background-position: 0 50%`, ảnh background sẽ nằm ở góc **trái giữa**.
* Khi đặt `background-position: 50% 50%`, ảnh background sẽ nằm ở ngay **chính giữa**.
* Khi đặt `background-position: 100% 100%`, ảnh background sẽ nằm ở góc **phải dưới**.

> **Lưu ý**: `background-position: 0 50%` tương đương:
> * `background-position-x: 0`
> * `background-position-y: 50%`

Rõ ràng là có một sự tính toán đằng sau đơn vị phần trăm của thuộc tính này, thay vì chỉ là khoảng cách từ cạnh trên của div **con** đến ảnh. Lấy một trường hợp cụ thể là `background-position: 100% 100%`, nếu tính như `top`/`left` thì lẽ ra ảnh đã phải nằm ra ngoài div **con**, hay nếu tính như `transform: translate()` thì ảnh phải nằm ở góc **giữa dưới**. Vậy tại sao trường hợp này ảnh lại nằm ở góc **phải dưới**? Nguyên nhân là do thuộc tính `background-position` phải tham giao vào công thức sau trước khi trả về vị trí thực của ảnh:

> offset X = (container's width - image's width) * background-position-x
> 
> offset Y = (container's height - image's height) * background-position-y

Trong trường hợp này,
* *container* là div **con**
* *image's width/height* là kích thước của ảnh đã qua xử lý của `background-size`

## `font-size`

Đối với `font-size`, bất kể như thế nào, đơn vị phần trăm chỉ được đối chiếu với **parent block**.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/MWoeXMO}

Ví dụ này mình dùng bố cục tương tự như ví dụ đầu tiên, với các thuộc tính `font-size` được đặt như sau:
* Div **ông nội** là **13px**
* Div **cha** là **26px**
* Div **con** là **50%**

Kết quả như chúng ta có thể thấy, `font-size` của **con** lúc này có vẻ là bằng với **ông nội** và bằng 1/2 của **cha**, mặc dù **ông nội** có thuộc tính `position: relative` còn **cha** thì không.

## `line-height`

Tuy ít phổ biến hơn nhưng mình cũng nhắc đến thuộc tính này vì nó cũng hỗ trợ đơn vị phần trăm. Đơn vị phần trăm của `line-height` sẽ đối chiếu với `font-size` của chính bản thân nó - **self element**. Cách tính là lấy giá trị phần trăm * `font-size` để được giá trị thực của `line-height`.

Ví dụ:
{@codepen: https://codepen.io/khangnd/pen/oNwLMXR}

Trong ví dụ này,
* Đoạn text có **11** dòng
* `font-size` là **20px**
* `line-height` là **150%**

Kết quả `height` thực tế của khối là **~329px**,
* Tính theo cách trên thì kết quả của `line-height` = 20 * 150 / 100 = **30px**.
* Tính theo `line-height` thì `height` = 30 * 11 = **330px**, cũng sấp sỉ kết quả thực tế.

# Kết
Hi vọng bài viết phần nào giúp các bạn dễ hiểu hơn về đơn vị phần trăm, chứ không làm tình hình càng tệ hơn 😅

Dưới đây mình làm 1 bảng tóm sơ lại các đối tượng để đối chiếu phần trăm, để có cái gọi là "takeaway":

| Thuộc tính | Đối tượng để đối chiếu % 
| -------- | -------- 
| `width` | **containing block's `width`**
| `height` | **containing block's `height`**
| `padding` | **containing block's `width`**
| `margin` | **containing block's `width`**
| `left/right` | **containing block's `width`**
| `top/bottom` | **containing block's `height`**
| `transform: translateX()` | **self element's `width`**
| `transform: translateY()` | **self element's `height`**
| `background-size` | **background positioning area**
| `background-position` | **background positioning area** (có công thức tính)
| `font-size` | **parent block's `font-size`**
| `line-height` | **self element's `font-size`** (có công thức tính)

Còn đây là trọn bộ các ví dụ trong bài viết: https://codepen.io/collection/xKwgdW
# Tham khảo

* https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block
* https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
* https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#regarding_percentages
* https://jameshfisher.com/2019/12/29/what-are-css-percentages/
* https://wattenberger.com/blog/css-percents

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)