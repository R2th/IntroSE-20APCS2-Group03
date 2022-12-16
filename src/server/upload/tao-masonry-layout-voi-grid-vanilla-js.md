Masonry layout thì khá là nổi tiếng rồi, mình không nhắc lại nữa, ví dụ điển hình là pinterest 

![](https://images.viblo.asia/d9855ff3-c2fc-4341-8de6-50193db2c342.jpg)

<br>

Trong article này mình sẽ demo một giải pháp đơn giản và ngắn gọn nhất để tạo layout dạng này, chỉ với một chút css và javascript :bear::bear::bear::bear:

### Starting Point

**1. HTML**

```html
<div class="sun-masonry">
    <img src="https://picsum.photos/id/99/200/300" />
    <img src="https://picsum.photos/id/55/300/400" />
    <img src="https://picsum.photos/id/11/500/300" />
    <img src="https://picsum.photos/id/199/200/250" />
    ...
</div>
```

**2. SCSS**

```scss
$w: Min(10em, 100%);
$s: 10px;

* { margin: 0 }

html { background: #555; padding: 30px 0; }

.sun-masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, $w);
	justify-content: center;
	grid-gap: $s;
	
	> * { width: $w }
}
```

<br>

**RESULT**

{@embed: https://codepen.io/buiduccuong30051989/pen/QWNEjMe}

<br>

*Ở đây chỉ có 1 chú ý nhỏ là mình dùng Scss và sử dụng function Min của scss, nếu dùng min thì bị conflig với function của css. Tức là `grid-template-columns: repeat(auto-fit, $w)` tương đương với tạo một layout auto column, không giới hạn số lượng nếu điều kiện thoả mãn, và điều kiện ở đây chính là `$w: Min(10em, 100%)`, mỗi column có width nhỏ nhất là 10em ~ 160px.
 
 Giải pháp đơn giản là margin top âm cho các items cùng column để lấp đi các khoảng trống hiện tại.
 Và công thức để margin top chính xác sẽ xoay quanh thuộc tính **[getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)**
 
>  Phương thức Element.getBoundingClientRect() returns size và vị trí của element đó, vị trí là vị trí tương đối của element đối với viewport nhé :grinning:.
 
 ![](https://images.viblo.asia/8f5c7c6d-7164-4825-bcdb-ebfc5cce2d22.png)

 <br>

Ý tưởng là dựa vào getBoundingClientRect() ta sẽ lấy được khoảng cách tính từ bottom của item đến top của viewport, chính là giá trị "bottom" ở ảnh trên.
Như vậy ở column đầu tiên, item thứ nhất giả sử lấy dc kết quả là "a", item thứ 2 nằm ngay dưới item thứ nhất có kết quả là "b" thì item thứ 2 sẽ có khoảng margin-top âm 1 đoạn là c = b - a. Và nếu cứ tiếp tục làm như vậy thì layout của mình sẽ được như ý :pig: 

![Mozilla](https://images.viblo.asia/ae67abe3-0811-4ad4-93c8-8b790bf63c3a.png)

Apply lần lượt cho từng item:

![](https://images.viblo.asia/4c6ab875-4bbd-4369-8298-efe706fb6b3c.png)

### Collect tất cả items
```Js
let grids = document.getElementsByClassName('sun-masonry');
grids.gap = parseFloat(getComputedStyle(grids[0]).gridRowGap)
grids.items = [...grids[0].childNodes].filter(c => c.nodeType === 1) 
grids.column = 0
```

* Ta lấy giá trị `gap`, tức là khoảng cách giữa các items, phục vụ cho việc tính toán, h không phải là `b - a` nữa mà là `b - a + gap`
* Array items là tất cả childNodes mà có nodeType = 1, nếu không, giả sử trong layout của bạn có 1 đoạn text, thì nó sẽ return và mảng các text này nữa, nodeType = 1 đảm bảo rằng nó là một [elementNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType), và không lấy thêm child của item nữa.
* column: số lượng column hiện tại, intiatal đặt là 0, sau này layout render ra ta sẽ tính và gán lại giá trị cho nó, bởi vì số lượng column render ra còn tuỳ thuộc vào kích thước màn hình nữa.

### Tính toán
* Lấy số lượng column được render ra:

```Js
console.log(getComputedStyle(grids).gridTemplateColumns)
// Output: "160px 160px 160px 160px 160px 160px"
// Tương đương với layout đang render ra 6 cột, mỗi cột có width là 160px
```

Chỉ có layout dạng grid mới có giá trị của `gridTemplateColumns`, và nó sẽ trả ra cho bạn kiểu sau đây: `XXpx XXpx XXpx XXpx ...`, nếu bạn đã quen làm với grid layout rồi thì "XX" tương ứng với width của column ở vị trí đó, và các column cách nhau 1 dấu cách, từ đây ta có thể hoàn toàn đếm được số lượng column đã được render ra:

```Js
let column = getComputedStyle(grids[0]).gridTemplateColumns.split(' ').length;
```

Và ta gán lại giá trị của `grid.column` đang set là 0 ở trên thành giá trị mới

```Js
grids.column = column;
```

Ta sẽ lấy giá trị a `getBoundingClientRect().bottom` của các items, và giá trị b `getBoundingClientRect().top` của các items ở row thứ 2, do là row thứ nhất thì các items không cần margin gì cả vì đã sát lề top rồi.

Chính vì vậy mà ta sẽ slice array` grids.items` của chúng ta với giá trị slice là row đầu tiên. 
Slice sẽ return ra array mới và bỏ đi n items đầu tiên (bằng với giá trị `grids.column`), ta sẽ loop ở trên nó để lấy giá trị `getBoundingClientRect().bottom` của từng phần tử.

```Js
    grids.items.slice(column).forEach((n, i) => {
      // Với c là các items sau khi grid items đã slice rồi
      // i là index, index được sử dụng ở mảng grids.items gốc, nghĩa là full items, chưa bị slice
      let prevItem = grids.items[i].getBoundingClientRect().bottom; /* bottom edge of item above */
      let nextItem = n.getBoundingClientRect().top; /* top edge of current item */
      console.log(prevItem)
      console.log(nextItem)
      let margin = prevItem - nextItem + grids.gap
      console.log(margin)
      // Apply style cho items thứ grids.item[column + 1] trở đi
      n.style.marginTop = `${margin}px`
    })
```

<br>

Ồ, các giá trị tính toán đều ra 0, nhưng nếu copy và paste nguyên function vào console, nó sẽ console ra các giá trị !== 0, tại sao vậy nhỉ.
Đó là do ảnh chưa load xong, dom chưa render xong, chính vì vậy mà các tính toán của mình nó sẽ không chính xác nữa, mình phải đưa nó vào event `load` để đảm bảo content đã load xong, vị trí đã xác định :hugs::hugs:

<br>

```Js
addEventListener(
  "load",
  function() {
    let column = getComputedStyle(grids[0]).gridTemplateColumns.split(' ').length
    grids.column = column
    grids.items.slice(column).forEach((n, i) => {
     ....
    })
  },
  false
);

```

 <br>

Và đây là kết quả:

{@embed: https://codepen.io/buiduccuong30051989/pen/gOrwwwy}

### Refactor

Có 3 vấn đề cần phải giải quyết, đó là:
- Có nhiều hơn 1 grid layout
- Khi resize thì chúng ta cần update lại tính toán của mình.
    - Reset lại toàn bộ các style margin-top mà ta đã add vào.
    - Khi resize mà không thay đổi số column thì cũng không cần tính toán lại
- Khi chỉ có 1 column thì không cần tính toán

<br>

**1. Lấy tất cả layout**

```Js
let grids = [...document.querySelectorAll('.sun-masonry')];
```

<br>

**2. Check nếu có tồn tại ít nhất một ".sun-masory" selector**

```Js
if(grids.length) {
	grids = grids.map(grid => ({
		container: grid, // định danh riêng cho từng selector
		gap: parseFloat(getComputedStyle(grid).gridRowGap), 
		items: [...grid.childNodes].filter(c => c.nodeType === 1), 
		column: 0
	}));
    ....
```

<br>

**3. Update lại function layout theo các thay đổi trên**

```Js
function layout() {
    grids.forEach(grid => {
      let column = getComputedStyle(grid.container).gridTemplateColumns.split(' ').length
      if(grid.column !== column) { // check nếu resize nhưng số lượng column không thay đổi
        grid.column = column
        // Với c là các items sau khi grid items đã slice rồi
        // i là index, index được sử dụng ở mảng grids.items gốc, nghĩa là full items, chưa bị slice
        grid.items.forEach(c => c.style.removeProperty('margin-top')) // reset lại toàn bộ margin top đã add vào nếu có
        if(grid.column > 1) { // check nếu chỉ có 1 column thì không phải tính toán nữa
			grid.items.slice(column).forEach((n, i) => {
            let prevItem = grid.items[i].getBoundingClientRect().bottom;
            let nextItem = n.getBoundingClientRect().top;
            let margin = prevItem - nextItem + grid.gap
            n.style.marginTop = `${margin}px`
          })
        }
      }
    })
  }
```

**Cuối cùng là add code vào event "load" và "resize"**

```Js
addEventListener('load', e => {
    layout();
    addEventListener('resize', layout, false)
}, false);
```

### Result

Làm màu thêm với một chút style :pig:

{@embed: https://codepen.io/buiduccuong30051989/pen/poyENXQ}

***Resize*** để nhận thấy sự thay đổi nhé! :kissing_heart:

Bài viết được tham khảo từ [css-tricks](https://css-tricks.com/a-lightweight-masonry-solution/), với chủ đề chính là demo khả năng tạo layout masonry với chỉ css, tuy nhiên, tính năng này chưa chính thức, và chỉ mới hoạt động trên firefox mà thôi. Chúng ta cùng đón chờ xem, được thì đỡ phải tính toán mệt đầu :smile::smile::smile: