**VueJS** cho phép binding nhiều style và class động vào các elements sử dụng cú pháp **v-bind:style** hoặc **v-bind:class**

# Binding Style

OK giờ chúng ta muốn **increase** hoăc là **decrease** thuộc tính font-size trong 1 thẻ input. Để làm được điều này thì VueJS có cung cấp cho chúng ta 1 thuộc tính để giải quyết đó là **v-bind:style**

Ta sẽ có đoạn code sau:

```js
data() {
  return {
    fontSize: 10
  }
}
```

Hai Button trong template duới tuơng ứng với 2 nhiệm vụ là **increment** và **decrement** biến `fontSize ` bằng sự kiện `click`

```html
<button v-on:click="fontSize++">
  Increase font size
</button>
<button v-on:click="fontSize--">
  Decrease font size
</button>

<p v-bind:style="{ fontSize: fontSize + 'px' }">
  Font size is: {{ fontSize }}
</p>
```

Phía dưới **Buttons** chúng ta có 1 thẻ p và có sử dụng thuộc tính **v-bind:style**, nó đã được liên kết tới biến `fontSize` với thuộc tính `font-size`


 ***Lưu ý:*** cách viết `camelCase` sẽ được chuyển thành cách viết `dash-case` (VD: fontSize to font-size)

Thay vì chúng ta viết tất cả style trên 1 dòng, chúng ta có thể định nghĩa kiểu `style object` rồi sử dụng tuơng tự với **v-bind:style**

Chúng ta cũng có thể thêm nhiều `style object` vào `v-bind:style`. Bạn có thể tham khảo đoạn code dứoi đây:

```css
baseStyles: {
  fontWeight:'800',
  color: 'red'
},
overrideStyles: {
  color:'blue'
},
```

Cách sử dụng đơn giản như sau:

```html
<p v-bind:style="[baseStyles, overrideStyles]">
  baseStyles and overrideStyles
</p>
```

***Lưu ý sự quan trọng của thứ tự element trong mảng, nhưng item sau sẽ ghi đè giá trị của item trước***

Vue sẽ tự động thêm prefix -moz or -webkit để giúp cú pháp trông clean nhất

# Binding Classes

Sử dụng  style sẽ gặp phải trường hợp trùng lặp code và gặp phải những khó khăn khi mà yêu cầu cần thay đổi css.
Để giải quyết vấn đề thì chúng ta chuyển sang  dùng **v-bind:class**


**Ví dụ đơn giản**:  khi item của menu được selected, chúng ta thêm 1 dòng gạch dưới (underline) phần tử đó để nhận biết là Item đang được Active đồng thời thay đổi màu sắc mà font weight của phần tử đó.

Mặc dù điều này có thể được thực hiện với một ràng buộc kiểu, nhưng cách này sẽ sạch hơn khi sử dụng **class** khi phần tử  được chọn thay vì mình css inline tại phần tử đó.

To achieve this, we use a set of menu items and the selected item in the data model. The selected value will be set by default.

Để làm được điều này, chúng ta sử dụng một tập hợp các mục menu và mục đã chọn trong data bên dưới. Giá trị được chọn sẽ được đặt theo mặc định.

```js
data() {
  return {
    selected: 'Home',
    menuItems: ['Home', 'About', 'Contact']
  }
}
```

Khi phần từ đựoc Click, chúng ta có thể đặt giá trị của biến đã chọn bằng với mục hiện tại. Vì thế, chúng ta sử dụng **v-bind:class** để set class cho phần tử nếu mà biết selected == item hiện tại:

```html
<ul>
  <li v-for="item in menuItems"
    v-on:click="selected = item"
    v-bind:class="{ selected: selected == item}">
      {{item}}
  </li>
</ul>
```

### Binding Multiple Classes

Chúng ta có thể sử dụng nhiều class cho 1 phần tử thông qua 1 mảng các class

Mảng class này có thể định nghĩa trong Model như bên dưới:
```js
data() {
  return {
    classArray: ['selected', 'underlined']
  }
}
```

Và trong file template, chúng ta chỉ cần sử dụng như sau:

```html
<p v-bind:class="[classArray]">
  Multiple classes {{ classArray }}
</p>
```

Như vậy là chúng ta có thể sử dụng đồng thời cả 2 class selected và underlined cho phần tử `p`. Chúng ta cũng có thể thay đổi mảng này trong model 1 cách tự động tùy vào mục đính sử dụng của các bạn.

# Tham khảo
https://alligator.io/vuejs/dynamic-styles/