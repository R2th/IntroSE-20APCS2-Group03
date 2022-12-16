Nhu cầu phổ biến đối với liên kết dữ liệu là thao tác danh sách lớp của một phần tử và các kiểu nội tuyến của nó. Vì cả hai đều là thuộc tính nên chúng ta có thể sử dụng v-bind để xử lý chúng: chúng ta chỉ cần tính toán một chuỗi cuối cùng với các biểu thức của chúng ta. Tuy nhiên, việc can thiệp vào việc nối chuỗi rất khó chịu và dễ xảy ra lỗi. Vì lý do này, Vue cung cấp các cải tiến đặc biệt khi v-bind được sử dụng với class và style. Ngoài chuỗi, các biểu thức cũng có thể đánh giá các đối tượng hoặc mảng.

## Binding HTML Classes
Trong quá trình phát triển  bạn muốn thêm một class vào trong một thẻ HTML với một điều kiện nào đó xảy ra. Khi đó Vue có thể giúp bạn làm điều này rất dễ dàng.
### Cú pháp dạng đối tượng
BẠn có thể chuyển một đối tượng tới v-bind: class để sử dụng động các lớp:
```
<template>
  <div>
    <h3>Class Style Binding</h3>
  <div class="default" v-bind:class="{ active: isActive }">This is text</div>
  </div>
</template>

<script>
export default {
  name: "class-style",
  data() {
    return {
      isActive: true,
    };
  },
};
</script>
<style scoped>
.active {
  color: red;
}
</style>
```
Ta thu được
```
<div class="default active">This is text</div>

```
Ở ví dụ trên ta thấy được class `active` được thêm vào, do ta dùng v-bind:class  khai báo biến isActive giá trị mặc định là true với điều kiện dùng mặc định là true `{ active: isActive }` hoăc ta cũng có thể dùng `{ active: isActive == true }` . Ở phần HTML ta có đoạn text trên sẽ hiển thị  màu đỏ do có class active . 

Khi cần bind nhiều class thì các bạn làm như sau nhé
```
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-bold': hasBold }"
></div>
```
Data: 
```
data: {
  isActive: true,
  hasBold: true
}
```
Ta Thu được
```
<div class="default active text-bold">This is text</div>
```
Ta có thể truyền một object vào :class như sau:
```
<template>
  <div>
    <div class="default" :class="classObject">
      This is text
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classObject: {
        active: true,
        'text-bold': true,
        center: true
      }
    };
  }
};
</script>
<style scoped></style>
```
Kết quả đạt được
```
<div class="default active text-bold center">This is text</div>
```
Các class được bind khi có giá trị true
### Cú pháp dạng mảng
Chúng ta có thể truyền một mảng cho v-bind: class để áp dụng một danh sách các lớp:
```
<div v-bind:class="[activeClass, errorClass]"></div>
```
data
```
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```
Kết quả thu được
```
<div class="active text-danger"></div>
```
* Bạn có chuyển đổi một lớp trong danh sách một cách có điều kiện, bạn có thể làm điều đó với biểu thức bậc ba:
```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```
* Bạn cũng có thể dùng
```
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```
data
```
data: {
 isActive:true,
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

Kết quả thu được
```
<div class="active text-danger"></div>
```
## Binding Inline Styles
### Cú pháp đối tượng
html
``` html
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">This is text</div>
```
Js
```js
data: {
  activeColor: 'red',
  fontSize: 30
}
```

Ta dùng với 1 đối tượng để gọn gàng hơn
```html
<div v-bind:style="styleObject"></div>
```
JS
```js
data: {
  styleObject: {
    color: "red",
    fontSize: "30px"
  }
}
```
Kết quả thu được đều như nhau
```html
<div  style="color: red; font-size: 30px;">This is text</div>
```
### Cú pháp dạng mảng
Ta có thể dùng pháp mảng cho v-bind: style cho phép bạn áp dụng nhiều đối tượng kiểu cho cùng một phần tử:
html
```html
<div v-bind:style="[colorRed, bgBlack]">This is text</div>
```
Js
```js
data:{
   colorRed:{
    color:'red'
  },
  bgBlack:{
    background:'black'
  }
}
```
Bài này khá đơn giản  giúp  bạn có thể bind các thẻ HTML khi render tuỳ vào các điều kiện nhất định. Mong rằng các bạn có thể hiểu được sau đó tự mình bind theo các cách riêng của mỗi mục địch khác nhau.