# 1. Giới thiệu 
Tiếp tục với series [Học VueJS](https://viblo.asia/s/cung-nhau-tim-hoc-vuejs-nB5pX8dY5PG) này của mình thì trong bài viết lần này mình xin giới thiệu với các bạn một phần khá hay ở trong `Vue` đó chính là `slots`. Nếu ai đã từng làm việc với `component` trong `Vue` thì chắc hẳn đã dùng đến mối quan hệ **cha-con**  của `component` (gọi component con trong component cha). Có bao giờ các bạn khai báo **component con** trong **component cha** rồi thử viết bất cứ một thứ gì đó vào trong `thẻ khai báo component con` xem điều gì xảy ra chưa. Để dễ hình dung hơn với người đọc mình sẽ tạo 2 `components` với `Info.vue` là component cha và `InfoDetail.vue` là component con như dưới đây.

`Info.vue`
```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail card-name="Quang Phu">
          </InfoDetail>
      </div>
    </div>
  </div>
</template>

<script>
import InfoDetail from './components/InfoDetail.vue';

export default {
  components: {
    InfoDetail,
  }
}
</script>
```

`InfoDetail.vue`
```html
<template>
  <div class="children">
    <h2>{{ userName }}</h2>
    <p>This is my profile</p>
  </div>
</template>

<script>
  export default {
    props: ['userName']
  }
</script>

<style scoped>
  div {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, .6);
    padding: 30px;
    margin: 20px auto;
    text-align: center;
  }
</style>
```

Kết quả sương sương sẽ như thế này :
![](https://images.viblo.asia/9c55dfa2-3948-44b9-abd3-e05d860d8adf.png)

# 2. Đi vào tìm hiểu.
OK, dựng cái ví dụ lên cho dễ hiểu giờ chúng ta sẽ bắt đầu tìm hiểu xem vậy **slots** là gì và dùng khi nào.

Theo như ở ví dụ phía trên thì chúng ta có khai báo **component** `InfoDetail` bên trong **component** `Info`.
```html
<InfoDetail card-name="Quang Phu">
</InfoDetail>
```
Vậy điều gì sẽ xảy ra khi chúng ta viết thêm vào bên trong đoạn gọi **component** này một đoạn nào đó giả sử như.
```html
<InfoDetail card-name="Quang Phu">
    <p>Đây là nội dung được thêm vào trong component</p>
</InfoDetail>
```
Các bạn thử chạy lên sẽ không thấy có điều gì xảy ra =)) **đoạn text chúng ta vừa thêm vào KHÔNG được hiển thị.**
Điều đó có nghĩa là chúng ta không thể viết thêm bất cứ các phần tử nào vào trong **component con** được gọi bên trong **component cha**. Đôi khi chúng ta muốn thêm các phần tử vào trong **component con** thì ngoài việc chúng ta phải vào hẳn file khai báo **component con** để sửa ra thì còn cách nào nữa không, thì đây chính là lúc mà chúng ta cần sử dụng đến **Slots**.

Việc dùng **Slots** này có nghĩa là chúng ta sẽ tạo ra **một khoảng trống bên trong component con**, để khi nào mà chúng ta muốn thêm **code** mới thì các đoạn **code** này sẽ **nhảy vào đoạn trống** chúng ta khai báo để **"đứng"**.  

## 2.1. Default slot :
Để sử dụng được **slots** bạn chỉ cần ghi nhớ cặp thẻ **<slot></slot>** để sử dụng (tạo ra khoảng trống để code được thêm vào sẽ tự động thêm vào **slot**).

Tiếp tục sử dụng lại ví dụ trên thì trong file component con `InfoDetail.vue`. Chúng ta viết thêm như sau:

```html
<template>
  <div class="children">
    <h2>{{ userName }}</h2>
    <p>This is my profile</p>
      <slot></slot> <!-- khai báo một khoảng trống, code được thêm sẽ thêm vào ở đây. -->
  </div>
</template>
```
rồi thêm bất cứ đoạn code nào đó trong component cha `Info.vue`.
```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail card-name="Quang Phu">
              <p>Đây là phần tử được thêm mới</p> <!-- thêm mới phần tử -->
          </InfoDetail>
      </div>
    </div>
  </div>
</template>
```
Rồi mở trình duyệt lên các bạn sẽ thầy đoạn code mới thêm vào được **hiển thị**.
![](https://images.viblo.asia/3987f732-a777-4455-818a-3b6f45809d59.png)

Nội dung sau khi được `render` sẽ như sau:
```html
<div id="app">
    <div class="container">
      <div class="row">
        <div class="children">
            <h2>{{ userName }}</h2>
            <p>This is my profile</p>
            <p>Đây là phần tử được thêm mới</p>
        </div>
      </div>
    </div>
  </div>
```

Chúng ta có thể đặt **<slot></slot>** ở bất cứ đâu, khi nào có đoạn code nào được thêm mới nó sẽ tự động nhảy vào vị trí đó.

Vậy là chúng ta đã hình dung sơ sơ được việc sử dụng **slots** rồi đó.

##  2.2. Style CSS với Slot.
Phần này thì rất đơn giản, với việc bạn khai báo **<slot></slot>** thì bạn có thể viết css cho các phần tử được thêm mới ngay cả tại file **component con**, vì với việc khai báo **<slot></slot>** thì các phần tử được thêm vào cũng được coi như là các phần tử được khai báo tại **component con**. Hay chúng ta cũng có thể style cho nó ngay tại file **component cha**.

Ví dụ :

`Info.vue`

```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail card-name="Quang Phu">
              <p class="them">Đây là phần tử được thêm mới</p> <!-- thêm mới phần tử -->
          </InfoDetail>
      </div>
    </div>
  </div>
</template>
```

`InfoDetail.vue`

```html
<template>
  <div class="children">
      <slot></slot>
  </div>
</template>

<style>
    .them {
        color: red;
    }
</style>
```

Kết quả :
![](https://images.viblo.asia/25dde95e-d954-4950-8b7a-5db3b5de637d.png)

## 2.3. Named Slots
Làm việc với **slot** rồi thì đôi khi chúng ta sẽ cần dùng đến **nhiều slots trong component**, để giải quyết vấn đề này thì `Vue` cho phép chúng ta đặt tên định dang cho mỗi **slot** với thuộc tính **name**.

Tại sao phải đặt **tên cho slot**, đơn giản để chúng ta nhận biết được vị trí **"trống"** nào mà chúng muốn được thêm vào thì chúng sẽ thêm vào ở đó. Giả sử nếu chúng ta không khai báo tên cho mỗi slot mà nó sẽ in ra như sau, ví dụ :

`Info.vue` (**component cha**)
```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail userName="Quang Phu">
            <p>Đây là header</p> <!-- muuốn thay thế slot trong class header -->
            <p>Đây là body</p>  <!-- muốn thay thế slot trong class body -->
          </InfoDetail>
      </div>
    </div>
  </div>
</template>
```

`DetailInfo.vue` (**component con**)

```html
<template>
  <div class="children">
    <div class="header">
      <slot></slot>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>
```

Nếu chúng ta chỉ khai báo **slot** mà không đặt tên thì kết quả sẽ bị như thế này 
![](https://images.viblo.asia/16ad21ee-f573-4ef3-bc33-86c5e978f68d.png)

Kết quả ra  không mong muốn khi chúng ta muốn thẻ `<p></p>` thứ nhất vào trong class `header` của **component con**, thẻ `<p></p>` thứ 2 thì vào class `body`. Nếu muốn riêng rẽ từng đoạn code như vậy chúng ta cần phải đặt tên **slot** như sau:

```html
<template>
  <div class="children">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
  </div>
</template>
```

Trong **component cha** khai báo lại như sau:

```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail userName="Quang Phu">
            <p slot="header">Đây là header</p> <!-- muuốn thay thế slot trong class header -->
            <p slot="body">Đây là body</p>  <!-- muốn thay thế slot trong class body -->
          </InfoDetail>
      </div>
    </div>
  </div>
</template>
```

Chạy lại kết quả các bạn sẽ thấy kết quả như ý. Vậy là đã tìm hiểu xong cách dùng thuộc tính **name** trong **slot**.

## 2.4. Scoped Slots
Việc sử dụng **scoped slots** này cho phép bạn có thể truyền dữ liệu từ **component con** lên **component cha** thông qua **slots**, nó cũng hơi tương tự **props** thui :D. Ví dụ đơn giản như sau:

Trong file `InfoDetail.vue`
```html
<template>
  <div class="children">
      <slot :user="user"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          firstName: 'Phu',
          lastName: 'Quang',
        }
      }
    }
  }
</script>

<style scoped>
  div {
    border: 1px solid #ccc;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, .6);
    padding: 30px;
    margin: 20px auto;
    text-align: center;
  }
</style>
```

`Info.vue`

```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <appCard  v-slot:default="slotProps">
            <p>{{ slotProps.user.firstName }}</p>
          </appCard> 
      </div>
    </div>
  </div>
</template>
```

Để truyền `data` từ component con sang component cha chúng ta chỉ cần `bind` dữ liệu rồi sử dụng `v-slot` để nhận dữ liệu chúng ta truyền sang.  

### Cú pháp trong ES6.
Chúng ta cũng có thể nhận dữ liệu truyền sang bằng cú pháp này nhanh gọn hơn rất nhiều.
```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <appCard  v-slot:default="{ user }">
            <p>{{ user.firstName }}</p>
          </appCard> 
      </div>
    </div>
  </div>
</template>
```
## 2.5. Cách gọi named slot khác.
Ở ví dụ trên ở phần `2.2` mình có gọi **name slot** bằng cách sử dụng **name="ten-slot"** như thế này
```html
<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <InfoDetail userName="Quang Phu">
            <p slot="header">Đây là header</p> <!-- muuốn thay thế slot trong class header -->
            <p slot="body">Đây là body</p>  <!-- muốn thay thế slot trong class body -->
          </InfoDetail>
      </div>
    </div>
  </div>
</template>
```
Chúng ta có thêm 1 cách gọi nữa là sử dụng `v-slot:ten-slot`. Nhưng mà **lưu ý** là **v-slot** chỉ được gọi trong thẻ **template**. Chúng ta sẽ viết lại đoạn code trên như sau
```html
<InfoDetail userName="Quang Phu">
      <template v-slot:header><p>Đây là header</p></template> <!-- muuốn thay thế slot trong class header -->
      <template v-slot:body><p>Đây là body</p></template>  <!-- muốn thay thế slot trong class body -->
</InfoDetail>
```
> **Lưu ý :** Default slot là loại slot không được đặt tên chỉ được khai báo như <slot> </slot>. Bất cứ đoạn code nào được viết thêm mà không được khai báo **slot** thì nó sẽ tự động nhảy vào **default slot** này.

Đối với **default slot** chúng ta có hai cách gọi tới như sau.

Cách 1:
```html
<template v-slot><p>Đây là header</p></template>
```

Cách 2:
```html
<template v-slot:default><p>Đây là header</p></template>
```
### Cú pháp ngắn gọn hơn.
Cũng giống như `v-on` hay `v-bind`, thì `v-slot` cũng có cú pháp viết ngắn gọn bằng việc sử dụng ký tự **#**. Viết lại đoạn code trên ta có như sau:
```html
<InfoDetail userName="Quang Phu">
      <template #header><p>Đây là header</p></template> <!-- muuốn thay thế slot trong class header -->
      <template #body><p>Đây là body</p></template>  <!-- muốn thay thế slot trong class body -->
</InfoDetail>
```

## Kết luận
Vậy là trong bài này thì chúng ta đã tìm hiểu thêm được một khái niệm nữa là **slot**. Đây là những kiến thức mà mình tìm hiểu được, nếu có gì sai xót mong các bạn góp ý.

Thanks for reading~