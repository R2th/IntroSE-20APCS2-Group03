## Giới thiệu 
Phần tử HTML có thể được gán thêm các thuộc tính để phục vụ cho nhiều mục đích khác nhau. 
```
<div class="names" role="region" aria-label="Names"></div>
```
Tuy nhiên không nên tạo ra các thuộc tính của riêng bạn cũng như gán cho những thuộc tính sẵn có giá trị không hợp lý. Nó sẽ không lỗi, chỉ là cũng không chạy.
```
<!-- `highlight` không phải là 1 thuộc tính của HTML -->
<div highlight="true"></div>

<!-- `large` không phải giá trị hợp lệ của `width` -->
<div width="large">
```
Chúng ta có thể tạo ra thuộc tính của riêng mình bằng 1 cách khác, khá là đơn giản, chỉ cần thêm `data-*` làm tiền tố, và bạn có thể muốn làm gì thì làm. Đó cũng chính là data attribute mà mình muốn nói đến trong bài viết này.
## Cú pháp
Cách này khá là hữu dụng khi bạn muốn lưu thông tin vào trong thẻ HTML như sau
```
<!-- có thể không set giá trị -->
<div data-foo></div>

<!-- ...hoặc có set giá trị -->
<div data-size="large"></div>

<!-- nếu nhiều từ thì có thể ngăn cách bằng dấu gạch ngang -->
<aside data-some-long-attribute-name><aside>
```
Data attribute cũng hay được gọi là thuộc tính `data-*` vì cú pháp của nó lúc nào cũng như vậy.
### Có thể chỉ viết mỗi `data` không?
```
<div data=""></div>
```
Cũng không ảnh hưởng gì, những sẽ không dùng được, giống như trong đầu bài viết mình có nói, bạn đang cố gắng tạo ra 1 thuộc tính của riêng mình mà không hợp lệ.
### Điều không nên làm với data attribute
Không nên dùng data attribute để lưu trữ những giá trị không truy cập được, nếu chỉ đơn giản là muốn ẩn đi không cho người dùng thấy, bạn có thể để nó trong 1 thẻ HTML và sử dụng class `visually-hidden`.
```
<!-- nội dung không truy cập được -->
<div data-name="Chris Coyier"></div>

<!-- ẩn đi trên giao diện người dùng -->
<div>
  <span class="visually-hidden">Chris Coyier</span>
</div>
```
## Style với data attribute
Ta có thể viết CSS cho phần tử HTML dựa vào thuộc tính và giá trị của chúng.
```
/* chọn bất cứ phần tử vào với data attribute và giá trị */
[data-size="large"] {
  padding: 2rem;
  font-size: 125%;
}

/* hoặc là thu hẹp phạm vi với phần tử hoặc class cụ thể */
button[data-type="download"] { }
.card[data-pad="extra"] { }

/* chọn tất cả các phần tử có thuộc tính này */
[data-size] { }

/* chọn phần tử có thuộc tính với giá trị cụ thể nào đó */
[data-state="open"],
[aria-expanded="true"] { }

/* giá trị của thuộc tính bắt đầu với 3, có thể là 3 hoặc 3.14,... */
[data-version^="3"] { }

/* giá trị của thuộc tính "có chứa" chữ "google" ở bất cứ đâu  */
[data-company*="google"] { }
```
### Giá trị thuộc tính không phân biệt chữ hoa, chữ thường
Trong trường hợp bạn cần lấy tất cả text đó không phân biệt chữ hoa, chữ thường, thì có thể chọn bằng cách 
```
/* Khớp với
<div data-state="open"></div>
<div data-state="Open"></div>
<div data-state="OPEN"></div>
<div data-state="oPeN"></div>
*/
[data-state="open" i] { }
```
### Sử dụng data attribute trực quan
CSS cho phép bạn lấy giá trị trong data attribute ra và hiển thị nó nếu cần
```
/* <div data-emoji="✅"> */

[data-emoji]::before {
  content: attr(data-emoji); /* Returns '✅' */
  margin-right: 5px;
}
```
### Ví dụ về 1 cách style sử dụng data attribute
Bạn có thể dùng data attribute để chỉ định số lượng cột trong grid
{@embed: https://codepen.io/anon/embed/rNaEvgp?height=550&theme-id=1&slug-hash=rNaEvgp&default-tab=result}
## Truy cập data attribute trong JavaScript
Giống như bất kì attribute nào khác, bạn có thể lấy giá trị của attribute thông qua phương thức `getAttribute`
```
let value = el.getAttribute("data-state");

// Bạn có thể set giá trị cho nó
// trả về giá trị của data-state="collapsed"
el.setAttribute("data-state", "collapsed");
```
Tuy nhiên, data attribute còn có API riêng của chúng. Giả sự bạn có 1 phần tử có nhiều data attribute
```
<span 
  data-info="123" 
  data-index="2" 
  data-prefix="Dr. "
  data-emoji-icon="🏌️‍♀️"
></span>
```
Bạn có thể lấy hoặc set giá trị cho nó bằng cách 
```
// Get
span.dataset.info; // 123
span.dataset.index; // 2

// Set
span.dataset.prefix = "Mr. ";
span.dataset.emojiIcon = "🎪";
```
Lưu ý là với những data attribute dài, thì ta sẽ viết kiểu camelCase thay cho dấu gạch dưới, giống như `data-emoji-icon` thì viết là `dataset.emojiIcon`.

Bạn cũng có thể lấy giá trị data attribute ngay trong HTML
```
<img src="spaceship.png"
  data-ship-id="324" data-shields="72%"
  onclick="pewpew(this.dataset.shipId)">
</img>
```
### Dữ liệu Json trong data attribute
```
<ul>
  <li data-person='
    {
      "name": "Chris Coyier",
      "job": "Web Person"
    }
  '></li>
</ul>
```
Tại sao ko nhỉ? Chỉ cần lưu ý đúng cú phát của Json là được. Tương tự bạn cũng có thể lấy dữ liệu từ nó.
```
const el = document.querySelector("li");

let json = el.dataset.person;
let data = JSON.parse(json);

console.log(data.name); // Chris Coyier
console.log(data.job); // Web Person
```
### Ví dụ trường hợp sử dụng JS
Ví dụ bạn có 1 button Like
```
<button data-id="435432343">♡</button>
```
Button đó sẽ bắt sự kiện click để gọi Ajax tới server tăng lượt thích trong database. Nó sẽ rất đơn giản vì ta có sẵn id trong data attribute.

Tất nhiên là còn nhiều trường hợp khác nữa, mà bạn hãy tự khám phá thêm nhé!

Nguồn: https://css-tricks.com/a-complete-guide-to-data-attributes/