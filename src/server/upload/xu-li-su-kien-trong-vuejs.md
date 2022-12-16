<div align="center">

# Lời mở đầu
</div>
Chào các bạn, mình đã quay trở lại rồi đây.

Trong bài viết hôm nay, mình sẽ đề cập đến một vấn đề mà có lẽ là quan trọng nhất đối với một trang web, đó là "xử lí sự kiện". Trong [bài viết thứ 2 của series](https://viblo.asia/p/tim-hieu-vue-instance-va-vue-template-jvEla47dZkw), mình đã có đề cập đến directive `v-on`, và trong bài hôm nay, chúng ta sẽ tập trung đi sâu vào nó.

Không nói nhiều nữa, bắt đầu thôi nào!

<div align="center">

# Nội dung

## Lắng nghe sự kiện
</div>

Để lắng nghe các sự kiện DOM, chúng ta có thể dùng directive `v-on` và thực thi JavaScript khi những sự kiện này được kích hoạt (như ví dụ trước của mình là mỗi lần click chuột sẽ tăng số lần đếm lên 1), khá đơn giản và dễ hiểu đúng không. Các bạn có thể xem lại bài viết, code và gif kết quả ở [**đây**](https://viblo.asia/p/tim-hieu-vue-instance-va-vue-template-jvEla47dZkw#_directive-7).

<hr>

<div align="center">
    
## Xử lí sự kiện sử dụng method
</div>

```html 
<button v-on:sự-kiện="xử-lí">nút-bấm</button>
```
Ở trong dòng lệnh trên, phần "xử-lí" có thể là một xử lí logic sự kiện đơn giản (giống như ví dụ hôm trước của mình là `counter +=1`).

Nhưng trong một trang web thực tế, không phải lúc nào nó cũng đơn giản như vậy. Cho nên, ngoài viết xử lí logic trực tiếp, chúng ta cũng có thể gọi tên một methods mà ta đã khai báo trong Vue Instance.
```html
<template>
    <div>
        <button v-on:click="count">Count click</button>
        <p>Clicked {{ counter }} times</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            counter: 0
        }
    },
    methods: {
        count: function () {
            this.counter += 1
        }
    }
}
</script>
```

Kết quả trả lại thì cũng giống như việc bạn viết:
```html
<button v-on:click="counter += 1">Count click</button>
```

<hr>

Đối với những xử lí đơn giản như trên thì bạn chắc chắn sẽ lựa chọn viết xử lí ngay trong **v-on**. Nhưng chắc chắn không phải lúc nào bài toàn của bạn cũng toàn những thứ dễ dàng như thế đâu.

![](https://images.viblo.asia/42a76f82-1498-4499-a79e-58902ca0a02a.jpg)

<hr>

<div align="center">
    
## Event modifier
</div>

Trong phần viết về directive mình đã nhắc đến modifier (mong là các bạn còn nhớ ^^) là những hậu tố (**postfix**) dùng cho **directive**. Trong phần này ta chỉ quan tâm đến `Event modifier` thôi nhé, `Form Input Modifier` thì xin phép hẹn các bạn trong một bài viết về **Form Input Bindings** sau nhé.

Một số `event modifier` phổ biến có:
- `.stop`: sự kiện này sẽ không được propagate (mình không chắc dịch ra tiếng Việt thế nào cho sát :P), điều này tương đương với **event.stopPropagation()** 
- `.prevent`: sử dụng khi bạn không muốn ngăn chặn hành vi mặc định của sự kiện (cái này tương đương với **event.preventDefault()** )
- `.capture`: một sự kiện xảy ra với một phần tử bên trong sẽ được xử lí ở đây trước khi được xử lí bởi phần tử đó (tạm hiểu là tiền xử lí, bạn có thể đọc chi tiết hơn [tại đây](https://javascript.info/bubbling-and-capturing))
- `.self`: chỉ kích hoạt phương thức xử lí nếu **event.target** là chính phần thử được thao tác chứ không phải là một phần tử con.
- `.once` (xuất hiện từ phiên bản **2.1.4**): là một giá trị **true-false** để kiểm tra **listener** chỉ gọi nhiều nhất 1 lần sau khi được thêm. Nếu giá trị là **true**, **listener** sẽ tự động loại bỏ khi được gọi.
- `.passive` (xuất hiện từ phiên bản **2.3.0**): hành vi mặc định của sự kiện sẽ xảy ra ngay lập tức, thay vì đợi phần `xử-lí` hoàn tất.

    --> chú ý rằng `.passive` và `.prevent` không được sử dụng cùng nhau nhé. Vì `.passive` làm cho trình duyệt của bạn hiểu là bạn **KHÔNG** muốn chặn hành vi mặc định của sự kiện, tức là `.prevent` sẽ bị loại bỏ. Nếu khai báo xong mà bị loại bỏ thì thôi khai báo làm gì nữa cho mất công :D

--> ngoài ra các modifier còn có thể sử dụng nối tiếp nhau kiểu `.modifier1.modifier2`. Khi này, bạn nên thận trọng vì thứ tự xử lí của modifier sẽ tuân theo thứ tự mà bạn khai báo. **Ví dụ**:

```javascript
v-on:click.prevent.self   //sẽ ngăn toàn bộ click (prevent trước)
v-on:click.selt.prevent   // chỉ ngăn các click trên phần tử được nhắc tới (selft trước)
```

<hr>

<div align="center">
    
## Key modifier
</div>

Nếu bạn từng học về kiến trúc máy tính thì chắc hẳn bạn biết (không quan trọng là nhớ hay không nhé) mỗi phím trên bàn phím ứng với một mã riêng gọi là `keyCode`. Khi bạn ấn 1 phím, máy tính sẽ tra theo `keyCode` đó để hiểu được là bạn ấn phím nào. Và phím phổ biến nhất và là phím duy nhất mình nhớ `keyCode` là phím Enter (mã là 13). Nếu muốn xem chi tiết **`keyCode`** của từng phím khác, bạn có thể thử ở [**ĐÂY**](https://keycode.info/).

Ngoài sự kiện click đối với chuột còn có các sự kiện khi nhấn nút (**key**) thì vue cũng cung cấp những modifier cụ thể riêng cho **v-on**. Và nó được gọi là **Key Modifier** (hiển nhiên quá mà :laughing::laughing:). Và ở phần này chúng ta sẽ tìm hiểu cụ thể về nó.

Cấu trúc sử dụng:
```javascript
v-on:*event*.*keyCode*="method"  //eg: v-on:keyup.13="submit"
v-on:*event*.*alias*="method"  //eg: v-on:keyup.enter="submit"
```

Như mình có nói ở trên thì máy tính hiểu được sự kiện key nào được ấn dựa vào `keyCode`. Cái `keyCode` ấy thì lại rất khó nhớ, cho nên Vue đã cung cấp **alias** (tên phím mà con người hiểu được) cho một số phím thông dụng:

- `.enter`: cả 2 phím enter bên bàn phím chính hay bên bàn phím numlock đều được nhé
- `.delete`: cả 2 phím backspace và delete được hiểu như nhau
- `.tab`:
- `.esc`:
- `.space`:
- `.up`:
- `.down`:
- `.left`:
- `.right`:

Trên đây là một số phím thông dụng mà VueJS đã cung cấp sẵn cho bạn, nếu bạn cảm thấy nó vẫn chưa đủ thì có thể tự khai báo alias cho các phím mà bạn muốn thông qua `config.keyCodes` như sau:
```javascript
Vue.config.keyCodes = {
  key: keyCode,  // keyCode của phím là gì thì bạn thử ở trên nhé
  "alias": keyCode,  //nếu đặt alias thì nhớ cho vào dấu "" và tên phải tuân theo kebab-case chứ KHÔNG được dùng camelCase nhé
  
  //Eg:
  "day-la-phim-enter": 13,
}
```


> Có một điểm cần chú ý là một số phím đặc biệt (như là Esc và các phím điều hướng) sẽ có giá trị không nhất quán trên trình duyệt IE9. Thế nên nếu khách hàng của bạn bắt làm với IE9 :fearful::scream::fearful::scream: thì nhớ check kĩ nha!


<hr>

<div align="center">

## System modifier keys
</div>

- Trên đây là những phím thông dụng trên bàn phím, còn một số phím chuyên biệt (phím hệ thống **Ctrl, Alt, Shift, Meta** và các nút ở trên chuột) sẽ có các modifier riêng. 
    - `.ctrl`:
    - `.alt`:
    - `.shift`:
    - `.meta`: cái phím này trên hầu hết bàn phím sẽ có biểu tượng logo Microsoft, còn trên 1 số bàn phím chuyên biệt thì nó sẽ có biểu tượng khác.

- Những phím hệ thống này thường không được ấn một mình mà sẽ kết hợp thành một tổ hợp phím (đó là lí do vì sao nó trở nên đặc biệt).  Ví dụ:
```
<!-- Alt + C -->
<input @keyup.alt.67="method">

<!-- Ctrl + Click -->
<div @click.ctrl="method">Ctrl click thì mới chạy ^^</div>
```
- Mouse Button
    - `.left`:
    - `.right`:
    - `.middle`:

--> đây là chuột phổ thông nhé, nếu mà mấy con chuột Gaming Gear mà chi chít nút thì mình không rõ đâu, với cả nó cũng nằm ngoài nội dung bài viết này rồi :D

<div align="center">
    
# Lời kết
</div>

Lâu lắm không viết bài rồi, có vấn đề gì mà mình trình bày khó hiểu quá thì các bạn cứ comment cho mình biết nhé. Mình sẽ cố gắng giải  thích  cho các bạn cũng như là cải thiện cách trình bày trong những bài viết sau.

Hy vọng được các bạn đón nhận và ủng hộ!

<div align="center">
    
# Tài liệu tham khảo
</div>

https://javascript.info/bubbling-and-capturing

https://vuejs.org/v2/guide/events.html

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values