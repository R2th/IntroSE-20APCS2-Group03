Các bạn có thể đã biết và sử dụng các elements block và inline-block. Bảng và các elements được thêm style position cũng được coi là một CSS layout mode. Flexbox là viết tắt của flexible box, là một CSS layout mode mới được gọi là flex layout.

### 1. Giới thiệu về Flexbox

Flexbox cung cấp một tập các thuộc tính giúp cho bạn sắp xếp các element trên một dòng mà không cần sử dụng những thuộc tính như là `float` hay `inline-block`. Thực tế, sự "linh hoạt" của flexbox khiến cho những elements bên trong một flex container tự điều chỉnh độ rộng của chúng một cách tự động, giống như chúng ta sử dụng những giá trị phần trăm khi làm một trang web reponsive.

Nhưng việc sử dụng flexbox dễ dàng hơn nhiều so với sử dụng float, và nó có thể cung cấp cùng một layout như vậy. Điểm trừ của flexbox là không phải trình duyệt nào cũng hỗ trợ nó. Chỉ có những trình duyệt từ IE11 trở lên, Chrome, Safari, Opera & Firefox hỗ trợ flexbox, riêng Safari phải sử dụng vendor prefix.

#### Flexbox Basic

Có hai thành phần cơ bản của Flexbox

**Flex container**

Bất kỳ HTML element nào cũng có thể là một flex container, nhưng thường chúng ta sử dụng thẻ `<div>` hoặc một vài thẻ structural HTML. Thẻ HTML bạn sử dụng cho flex container sẽ chứa những phần tử con và những tag tạo nên thành phần thứ hai của flexbox model.

**Flex items**

Những tag là con trực tiếp của flex container element được gọi là flex items. Mọi con trực tiếp của flex container element sẽ tự động trở thành một flex item. Bạn có thể đặt bất cứ thẻ HTML nào vào bên trong flex container. Các thẻ con thậm chí không cần phải cùng một kiểu. Ví dụ, các con trực tiếp của 1 flex container là 1 thẻ `<p>` và 4 thẻ `<div>`, mỗi thẻ đó điều là một flex item.

Flexbox rất dễ dàng để sử dụng, ví dụ, chúng ta có thể tạo 1 dòng chứa các item sử dụng flexbox:

```html
<div class="container">
    <div>A flex item</div>
    <div>Another flex item</div>
    <div>A third flex item</div>
</div>
```

Thẻ `<div>` ngoài cùng là một container, và các thẻ bên trong đó là các element con. Một trình duyệt sẽ hiển thị các `div` bên trong theo block level, lấp đầy chiều rộng của thẻ `div` ngoài cùng và chồng chúng lên nhau như trong hình đầu tiên của HÌnh 1.

Bạn có thể dễ dàng biến đổi thẻ `div` ngoài cùng trở thành một flex container sử dụng `display` và setting giá trị của nó là `flex` như sau: 

```css
.container {
    display: flex;
}
```

{@embed: https://jsfiddle.net/hunguyen170294/L71qxjkd/19/}

*Hình 1. Flexbox khiến việc tạo cột với kích cỡ bằng nhau, và xếp liên tiếp nhau mà không phải khai báo float*

Một setting CSS đơn giản như vậy cho bạn kết quả giống ảnh thứ 2 của Hình 1. Mỗi thẻ `div` bên trong nó được tự động chuyển thành flex items và được xếp cạnh nhau trên một dòng: không có khai báo nào về `float` hay `inline-block`.

Tuy nhiên, nếu muốn sử dụng flexbox với trình duyệt Safari, chúng ta cần thêm vendor prefix vào class đó:

```css
.container {
    display: -webkit-flex;
    display: flex;
}
```

Cuối cùng, bạn có thể khiến những `div` ở bên trong container có cùng một chiều rộng và lấp đầy container bằng cách thêm thuộc tính `flex` với giá trị là `1`:

```
.container div {
    flex: 1;
}
```

Với Safari, chúng ta cần thêm vendor prefix:

```css
.container div {
    -webkit-flex: 1;
    flex: 1;
}
```

Setting này cho kết quả là ảnh thứ 3 của Hình 1. [Autoprefixer](https://github.com/postcss/autoprefixer) là một tool tự động thêm vendor prefix cho CSS. Chỉ cần viết CSS bình thường, chạy qua tool trên, và file CSS của bạn đã có hết tất cả các vendor prefix cần thiết.

Vì flex items tự động sắp xếp liên tiếp nhau và độ rộng của chúng sẽ lấp đầy khoảng trống của flex container, nên chúng ta có thể muốn thêm một vài khoảng trống ngăn cách giữa chúng cách đơn giản nhất là sử dụng `margin` (hình thứ 4 trong Hình 1)

```css
.container div:nth-of-type(1n+2) {
    margin-left: 20px;
}
```



### 2. Flex Container Properties

Cả flex container và flex items đều có những tập thuộc tính CSS riêng kiểm soát cách trình duyệt hiển thị chúng.

Đầu tiên là thuộc tính `display` biến đổi mọi thẻ HTML thành flex container chúng ta đã đề cập đến ở trên. Chú ý là chúng ta là bạn chỉ áp dụng thuộc tính này với container element - element bao ngoài các thẻ khác, sẽ trở thành flex items. Bạn thậm chí có thể biến một flex item thành 1 flex container.

**Flex-flow**

Mặc định, flex items được sắp xếp cạnh nhau trên một dòng. Thêm vào đó, một trình duyệt sẽ hiển thị những flex items đó trên một dòng, mà không wrapping. Nói cách khác, cửa sổ trình duyệt bé thế nào cũng không quan trọng, trình duyệt sẽ giữ chúng xếp cạnh nhau và trên một dòng mà không khiến chúng bị rơi xuống dòng hoặc xếp chồng lên nhau, kể cả khi chúng làm content bên trong flex items tràn ra ngoài

Thuộc tính `flex-flow` sẽ cho phép bạn kiếm soát cả hướng mà items hiển thị và khi nào thì flex item được cho phép xuống dòng. `flex-flow` yêu cầu 2 values. Value đầu tiên là hướng và value thứ hai là khi nào chúng được wrap.

Ví dụ:

```
.container {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: column-reverse nowrap;
    flex-flow: column-reverse nowrap;
}
```

Giá trị đầu tiên có 4 settings như sau:

* `row` là normal settings. Nó hiển thị flex items bên cạnh nhau, item đầu tiên trong code HTML là item ngoài cùng bên trái.
* `row-reverse` cũng hiển thị flex items cạnh nhau trên một dòng, nhưng đảo ngược giá trị của chúng.
* `column` hiển thị flex items theo kiểu cột dọc, item đầu tiên trong code HTML được hiển thị ở trên cùng (giống cách các `div` hiển thị theo từng block và trên một dòng).
* `column-reverse` giống với `column` nhưng hiển thị theo thứ tự ngược lại.

Giá trị thứ 2 kiểm soát khi nào thì flex items được wrap vào một dòng mới (khi sử dụng `row` cho settings về hướng) hoặc vào một cột mới (khi sử dụng `column` cho settings về hướng). Có 3 settings như sau:

* `nowrap` giá trị normal của flex items bên trong một flex container. Trình duyệt sẽ giữ tất cả các flex items trên một dòng bất kể cửa sổ trình duyệt có bé thế nào.
* `wrap` sẽ để những items không vừa với chiều rộng container xuống dòng mới hoặc cột mới nếu items không vừa với chiều cao cột. Để flex items được wrap vào một dòng mới, bạn cũng cần setting một vài giá trị cho flex items sẽ được mô tả trong phần thuộc tính của flex items
* `wrap-reverse` giống với giá trị `wrap`, nhưng wrap item theo thứ tự ngược lại.

*Note: `flex-flow` có thể tách làm 2 settings đó là `flex-direction` và `flex-wrap`*

{@embed: https://jsfiddle.net/hunguyen170294/L71qxjkd/58/}

**Justify-content**

Thuộc tính này xác định trình duyệt sẽ đặt flex item tại vị trí nào trong một dòng. Thuộc tính này chỉ hoạt động khi flex items được set `width` và nếu tổng `width` của các items nhỏ hơn flex container. Nếu bạn sử dụng flex width cho flex items, thì `justify-content` cũng không có tác dụng nữa. Có 5 settings cho thuộc tính này:

* `flex-start` sắp xếp items bắt đầu từ phía trái dòng, nếu bạn set `row-reverse` direction, items vẫn bắt đầu sắp xếp từ phía trái dòng.
* `flex-end` sắp xếp items bắt đầu từ phía phải dòng, nếu bạn set `row-reverse` direction, items bắt đầu sắp xếp từ phía trái.
* `center` sẽ sắp xếp items items ở giữa dòng.
* `space-between` sẽ chia đều khoảng cách giữa các items để lấp đầy khoảng trống của flex container nếu độ rộng container lớn hơn tổng độ rộng của flex items.
* `space-around` cũng giống settings trên nhưng thêm vào khoảng trống vào bên trái item ngoài cũng bên trái, và vào bên phải item ngoài cùng bên phải.

Ví dụ:

```
.container {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
}
.container div {
    width: 200px;
}
```

{@embed: https://jsfiddle.net/hunguyen170294/L71qxjkd/69/}

**Align-items**

Thuộc tính này xác định flex items với chiều cao khác nhau sắp xếp theo chiều dọc như thế nào trong một flex container. Mặc định, flex items được co dãn để vừa với container, để chúng có cũng chiều cao. Ngoài ra còn có một vài settings khác:

* `flex-start` sắp xếp flex items từ top của container.
* `flex-end` sắp xếp flex items từ bottom của container.
* `center` sắp xếp flex items ở giữa theo chiều dọc.
* `baseline` sắp xếp ngang hàng từng items theo baseline của element đầu tiên trong chúng.
* `stretch` là giá trị mặc định, co dãn chiều cao item cho vừa với container.

Nếu sử dụng `flex-direction` là `column` thì thuộc tính này sẽ kiểm soát vị trí của items theo chiều ngang.

Ví dụ:

```
.container {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: flex-end;
    align-items: flex-end;
}
```

{@embed: https://jsfiddle.net/hunguyen170294/L71qxjkd/90/}

**Align-content**

Đây là thuộc tính cuối cùng của flex container. Thuộc tính này chỉ cho trình duyệt cách đặt vị trí cho flex items mà các items đó trải dài trên nhiều dòng. Thuộc tính này hoạt động với hai điều kiện:

* Flex container phải có settings `wrap`
* Flex container phải cao hơn các dòng của flex items.

Thuộc tính này có 6 giá trị:

* `flex-start` đặt các dòng của flex items bắt đầu từ top của container.
* `flex-end` đặt các dòng của flex items bắt đầu từ bottom của container.
* `center` đặt các dòng của items ở giữa theo chiều dọc của container.
* `space-between` thêm vào khoảng cách giữa các dòng khiến chúng lấp đầy container theo chiều dọc.
* `space-around` giống như phía trên nhưng thêm vào khoảng trống xung quanh một dòng.
* `stretch` là giá trị mặc định của một dòng. Chúng co dãn từng item trong một dòng cho lấp đầy khoảng trống của một dòng.


Ví dụ:

```
.container {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-align-content: space-between;
    align-content: space-between;
    height: 600px;
}
```

### 3. Flex Item Properties

Setting thuộc tính cho flex container chỉ là sự bắt đầu. Ngoài ra, còn có rất nhiều thuộc tính hữu ích của flex item kiểm soát thứ tự, cách chúng hiển thị, chiều rộng, và cách chúng được sắp xếp trong container.

**Order**

Đối với từng flex items - con trực tiếp của flex container, chúng ta có thể sắp xếp thứ tự của chúng hiển thị trên màn hình mà không  cần quan tâm thứ tự trong code HTML bằng thuộc tính `order`:

```css
.content {
    display: -webkit-flex;
    display: flex;
}
.sidebar1 {
    -webkit-order: 1;
    order: 1;
}
.main {
    -webkit-order: 2;
    order: 2;
}
.sidebar2 {
    -webkit-order: 3;
    order: 3;
}
```

```
<div class="content">
    <div class="main">
        <!—the main article, the reason people are here, the most important content -->
    </div>
    <div class="sidebar1">
        <!-- navigation and stuff here -->
    </div>
    <div class="sidebar2">
        <!—more (less important) stuff here -->
    </div>
</div>
```

Với đoạn HTML và style setting như trên, không quan trọng 3 thẻ `div` bên trong flex container có viết theo thứ tự nào trong HTML, chúng vẫn hiển thị đúng theo thứ tự đúng trong settings.

*Note: `order` cũng giống như `z-index`, chúng không cần thiết phải đặt giá trị liên tiếp nhau, trình duyệt sẽ tự sắp xếp các giá trị đó và hiển thị theo thứ tự.*

![](https://images.viblo.asia/661dd707-ec2d-4504-a233-64bcdd852321.png)

**Align-self**

Thuộc tính này hoạt động giống như `align-items` sử dụng cho flex container, tuy nhiên nó chỉ áp dụng cho 1 item và sẽ override giá trị settings trong `align-items` của flex container. Các settings cũng giống như `align-item`: `flex-start`, `flex-end`, `center`, `baseline`, `stretch`.

![](https://images.viblo.asia/584c1bf9-7f01-4d7d-905b-e869f7d2aaba.png)

### Tổng kết

Với flexbox, chúng ta có thể đơn giản hóa việc layout cho trang web mà không phải sử dụng quá nhiều thẻ HTML cũng như setting quá nhiều cho CSS. Tuy nhiên, flexbox là layout mode mới và chỉ hỗ trợ cho các trình duyệt mới nên nếu chúng ta làm ở những dự án yêu cầu hỗ trợ trình duyệt cũ thì vẫn phải có fallback setting cho chúng, vì vậy hãy cân nhắc khi sử dụng: [Can I Use](https://caniuse.com/#feat=flexbox)