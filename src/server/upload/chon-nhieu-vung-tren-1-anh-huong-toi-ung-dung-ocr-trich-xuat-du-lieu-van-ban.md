![](https://images.viblo.asia/5ca359eb-2db9-4163-924f-fa2a504e06f9.png)

![](https://images.viblo.asia/87ed1844-6b74-43be-a561-958915e8042a.gif)

Để trích dẫn thông tin hóa đơn đưa và cơ sở dữ liệu hay hệ thống của ngân hàng doanh nghiệp, chúng ta cần nhân sự để đọc và điền thông tin này. Nhưng với sự tiến bộ về AI trí tuệ nhân tạo thì việc này được rút ngắn rất nhiều thời gian, cắt giảm chi phí nhân sự và độ chính xác rất cao.
Ở bài viết này mình sẽ mang đến 1 thư viện nhỏ liên quan đến Vuejs hỗ trợ việc lấy tọa độ các box hình chữ nhật về mặt giao diện ngay trên nền web. Còn phần xử lý backend thì có thể sẽ ra bài viết khác trong tương lai gần.

https://github.com/sun-asterisk-research/multi-select-areas-image

https://www.npmjs.com/package/multi-select-areas-image

## Tư tưởng mô hình của package
![](https://images.viblo.asia/7da77814-9e03-4dd2-bb0b-01d4a537e3dd.png)

Như mô hình ở trên chúng ta sẽ có các lớp phủ trên 1 ảnh theo chiều z-index
Xử lý events mousedown mousemove và mouseup để bắt các tọa độ chọn của vùng từ đó sẽ binding các style như width và height để hiển thị đúng thông số như là mình chọn vùng của 1 ảnh
![](https://images.viblo.asia/157e7854-2ef2-4079-b002-ebf4f02c64d4.png)

mỗi vùng chọn đều có tọa độ góc trái (x, y) và (width, height)

![](https://images.viblo.asia/ffeb11e8-16eb-4bd6-a3e3-6d925a71a2f6.png)

trong event của javascript có bắt tọa độ theo vị trí tương đối như clientX, clientY, pageX, pageX

Mục đích chúng ta muốn góc trái bức ảnh là gốc của tọa độ là (0,0) và vị trí này luôn thay đổi nếu sử dụng clientX, clientY vì màn hình chúng ta có cơ chế cuộn lên, xuống, trái, phải. Do đó sẽ sử dụng pageX và pageY để không bị ảnh hưởng.

### Xây dựng các cơ chế xử lý move, resizable, drag, delete
Sau khi đã chọn được nhiều vùng đưa vào mảng rồi, chúng ta sẽ sử dụng chính các `cursor css`

![](https://images.viblo.asia/1612fdb4-84f4-4b9b-80ce-0f43e281156b.png)

![](https://images.viblo.asia/f4e079d1-5290-4556-bc31-456acfa85371.png)

Thực chất vùng chọn được bao gồm 2 cái đè lên nhau
![](https://images.viblo.asia/7d746feb-0f65-4b29-8d1f-b0d8d0f5debc.png)

Vùng này là chứa ảnh sẽ đè thằng outline ở phía trên
![](https://images.viblo.asia/0109c428-37b7-4f47-bf0d-ab58e35f621f.png)

Các cursor để xử lý dấu hiệu nhận biết khi người dùng khi di chuyển con trỏ chuột vào những mỏ neo của 12 vùng nhỏ để kéo các vùng ngay trên `overlay` từ đó `outline area` cũng thay đổi theo.

Các mỏ neo này cũng có cơ chế **binding listen event** của cả document hoặc window để sử lý mousedown, mousemove và mouseup mỗi lần kéo thả và có z-index cao nhất để đè lên các layout hay các outline.

![](https://images.viblo.asia/5dddbb65-9278-40a3-a2a7-107517341929.png)

Mỗi giai đoạn xử lý đều cần tính toán lại width, height và x, y nếu cần thiết khi có sự kiện mousedown, mousemove và mouseup sao cho các vùng không được chạy ra ngoài của vùng ảnh.

Trông nhìn giao diện khá là đơn giản: 
> Cái này có gì đâu chỉ cần bôi chuột chọn vùng là được, nhưng để xử lý chính xác phối hợp nhuần nhuyễn giao tiếp các phần tử với nhau là cả một vấn đề nan giải

Vì tính chất khá là rắc rối của component chuyên về xử lý js ở frontend này nên mình có thư viện đã publish dưới đây.

## Thư viện
## Live Demos

https://demo-multi-select-areas-image.herokuapp.com

## Cách cài đặt

### Với npm hoặc yarn

```bash
yarn add multi-select-areas-image

npm i multi-select-areas-image
```
## Sử dụng cùng với vuejs

Chúng ta sẽ sử dụng `multi-select-areas-image` component:

### Typical use:
``` js
// main.js
import MultiSelectAreasImage from 'multi-select-areas-image'
...
Vue.use(MultiSelectAreasImage)
```
.vue file:
``` html
<template>
  <div>
    <multi-select-areas-image :cropUrl="url" :width="500"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  }
}
</script>
```

### Props
#### cropUrl
Type: `String`<br>
Required: `true`<br>
Default: `null`

Đầu vào đường dẫn Url hoặc base64

#### width
Type: `Number`<br>
Required: `false`<br>
Default: `1000`

đặt độ rộng của bức ảnh

#### opacityOutline
Type: `Number`<br>
Required: `false`<br>
Default: `0.5`

Điều chỉnh độ hiển thị của đường viền xung quanh vùng đã chọn

#### opacityOverlay
Type: `Number`<br>
Required: `false`<br>
Default: `0.5`

Điều chỉnh độ hiển thị lớp phủ toàn bộ ảnh

### $emit

``` html
<template>
  <div>
    <multi-select-areas-image v-on:getListAreas="getListAreas" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      areas: []
    }
  },
  methods: {
    getListAreas(value) {
      // console.log(value)
      this.areas = value
    }
  }
}
</script>
```

#### getListAreas
Params: `Null`<br>
Return: `Array`

Hàm lấy giá trị các vùng được chọn những giá trị này tùy thuộc mục đích sử dụng sẽ gửi lên backend cùng với ảnh có độ rộng được fix sẵn

## Kết luận
Tương lai gần mình sẽ viết thêm package hỗ trợ cho reactJs để xử lý tương tự.
Hi vọng các bạn để lại comment, voteup và share. Mong các bạn đóng góp cho repo này cùng với các ý tưởng để cải thiện thêm, cũng như các repo open source khác của Sun* R&D Lab :kissing_heart:

facebook: https://www.facebook.com/quanghung997