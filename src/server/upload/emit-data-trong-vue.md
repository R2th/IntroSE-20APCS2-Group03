Trong bài viết này, chúng ta cùng tìm hiểu Emit events  từ các components con trong Vue, cũng như các events từ các components con lồng nhau. Chúng ta sẽ làm tất cả điều này trong khi tránh một mô hình anti-pattern phổ biến mà các nhà phát triển Vue thường làm.

Một khái niệm cốt lõi đằng sau rất nhiều fameworks và thư viện JavaScript là khả năng đóng gói dữ liệu và giao diện người dùng bên trong các thành phần mô-đun có thể tái sử dụng. Điều này thật tuyệt khi giúp nhà phát triển tránh lặp lại các đoạn mã trong toàn bộ ứng dụng. Tuy nhiên, trong khi khả năng chứa chức năng bên trong của một components là tuyệt vời, một components thường sẽ cần các cách để có thể giao tiếp với components bên ngoài hoặc cụ thể hơn là với các components khác.

Chúng ta có thể gửi dữ liệu xuống từ một component chính thông qua các thuộc tính. Đây thường là một khái niệm khá đơn giản để nắm bắt. Nhưng những gì có thể xay ra về việc gửi dữ liệu từ một component con sao lưu đến components cha của nó?

Ở Vue, ban đầu chúng ta gặp một chút khó khăn khi tìm ra cách thực hiện điều này chủ yếu vì chúng ta cảm thấy rằng tài liệu của Vue không bao gồm điều này hoặc có thể giải quyết vấn đề này 1 cách triệt để và Emit data có lẽ có thể giải quyết vấn đề này.

### 1.Thiết lập

Chúng ta sẽ sử dụng Vue CLI để nhanh chóng thiết lập một số mã soạn sẵn, cũng như tất cả những thứ hay ho khác mà nó mang lại, chẳng hạn như tải lại mô-đun, tự động biên dịch, v.v. 

Chúng ta sẽ cố gắng không dành quá nhiều thời gian để thiết lập, vì trọng tâm ở đây là chỉ cho bạn cách phát Emit data, thay vì chỉ cho bạn cách thiết lập từng bước của ứng dụng Giỏ hàng. 
![](https://images.viblo.asia/d1db2e93-26fe-43a6-9fbe-8597e305b106.png)

### 2.Event Emit là gì?
 Trong trường hợp của chúng ta,Emit data mục đích là "phát ra" tín hiệu. Tín hiệu từ một component con để thông báo cho một coponent cha rằng một sự kiện đã diễn ra (ví dụ: một sự kiện nhấp chuột). Thông thường, component cha sau đó sẽ thực hiện một số loại hành động, chẳng hạn như thực thi một chức năng.
 
###  3. Làm thế nào để Emit data từ 1 Child Component
Bất cứ khi nào người dùng nhấp vào nút Thêm vào giỏ hàng , chúng ta muốn mục được đề cập sẽ được thêm vào giỏ hàng của chúng ta. Điều này nghe có vẻ đơn giản. Điều chúng ta cũng cần nhớ là, với một ứng dụng dựa trên component, mỗi mặt hàng trong cửa hàng là thành phần riêng của nó (tên của component ở đây là `Shop-Item`). Khi chúng ta nhấp vào nút bên trong `Shop-Item.vue`, nó cần emit lại dữ liệu về component cha của nó để giỏ hàng được cập nhật.


Trước tiên ta có đoạn code sau:
```js
<!-- Shop-Item.vue -->

<template>
  <div class="Item">
    <img :src="item.imageSrc" :alt="item.name" class="ItemImage">
    <div class="ItemDetails">
      <p><strong>{{item.name}}</strong></p>
      <p>Price: <strong>${{item.price}}</strong></p>
    </div>
    <button class="Button" @click="addToCart(item)">Add To Cart</button>
  </div>
</template>
<script>
  export default {
    name: 'Shop-Item',
    props: ['item'],
    data() {
      return {}
    },
    methods: {
      addToCart(item) {
        this.$emit('update-cart', item)
      }
    }
  }
</script>
<style>
</style>
```

```js
<!-- App-Item.vue -->

<template>
  <div id="app">
    <section class="Header">
      <h1 id="Fruiticious!">Fruiticious!</h1>
      <!-- Cart component -->
      <shop-cart :cart="this.cart" :total="this.total" @empty-cart="emptyCart">
      </shop-cart>
    </section>
    <!-- Item component -->
    <shop-item v-for="item in this.items" :item="item" :key="item.id" @update-cart="updateCart">
    </shop-item>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        items: [
          { id: 205, name: 'Banana', price: 1, imageSrc: Banana },
          { id: 148, name: 'Orange', price: 2, imageSrc: Orange },
          { id: 248, name: 'Apple', price: 1, imageSrc: Apple }
        ],
        cart: [],
        total: 0
      }
    },
    methods: {
      updateCart(e) {
        this.cart.push(e);
        this.total = this.shoppingCartTotal;
      },
      emptyCart() {
        this.cart = [];
        this.total = 0;
      }
    },
  }
</script>
```

Cùng đi chi tiết hơn đến những event được đề cập đến.

 Chúng ta có một Button trong `Shop-Item.vue`:
 
 ```html
<button class="Button" @click="addToCart(item)">Add To Cart</button>
```
 
 Mỗi mặt hàng trong cửa hàng (Banana, Orange, Apple) đều có một nút này. Khi nó được click vào thì sự kiện `@click="addToCart(item)`  của chúng ta được kích hoạt. Bạn có thể thấy rằng nó lấy `item` làm tham số (đây là toàn bộ đối tượng `item` đã được truyền vào `<Shop-Item>`dưới dạng prop.) Khi nhấn `button`, nó sẽ kích hoạt chức năng `addToCart`:
 ```js
 addToCart(item) {
  this.$emit('update-cart', item)
}
 ```
 Chúng ta thấy rằng chức năng này sử dụng `this.$emit`. Điều đó có nghĩa là gì? Vâng, đơn giản chỉ là Emit data là gửi một tín hiệu. Trong trường hợp này, tín hiệu là 'giỏ hàng cập nhật', được gửi dưới dạng một chuỗi. Vì vậy, về cơ bản,` this.$emit` lấy một `string` tham số đầu tiên của nó. Nó cũng có thể chấp nhận một tham số thứ hai, thường sẽ có dạng một số dữ liệu mà chúng ta muốn gửi cùng với nó. Đây có thể là một cái khác` string`, một `integer`, một biến, một` array`, hoặc trong trường hợp của chúng ta, một `object`.
 
 Nhưng sau đó làm thế nào để gửi các `string` "update-cart" thông báo component cha của chúng ta biết rằng rằng shopping cart  được cập nhật?
 
 Khi chúng ta thêm thẻ <shop-item> của mình vào `App.vue`, chúng ta cũng thêm một trình lắng nghe sự kiện tùy chỉnh vào đó để lắng nghe sự kiện `update-cart`. Trên thực tế, nó thực sự trông giống với trình `@click` nghe sự kiện của chúng ta trên các nút `' Thêm vào giỏ hàng '.`
 ```html
 <shop-item v-for="item in this.items"
           :item="item"
           :key="item.id"
           @update-cart="updateCart">
</shop-item>
  ```
 Chúng ta thấy rằng ở đây người nghe sự kiện tùy chỉnh của chúng ta đang chờ đợi `update-cart` được kích hoạt. Và làm thế nào để biết khi nào điều này xảy ra? Khi chuỗi` 'update-cart' `được phát ra từ bên trong `Shop-Item.vue!`

Cuối cùng là bây giờ hãy xem điều gì xảy ra khi trình `@update-cart` lắng nghe sự kiện này và kích hoạt chức năng update cart:
```js
        updateCart(e) {
          this.cart.push(e);
          this.total = this.shoppingCartTotal;
        }
 ```
Điều này chỉ đơn giản là lấy một tham số sự kiện và đẩy nó vào mảng` this.cart`. Sự kiện mà nó mất chỉ đơn giản là mục mà ban đầu chúng ta đặt vào làm tham số thứ hai khi chúng ta gọi `this.$emit`. Bạn cũng có thể thấy rằng `this.totalmm`nó cũng được cập nhật để trả về kết quả của hàm `this.shoppingCartTotal`.
 Như vậy, đó là một cách đơn để chúng ta Emit data từ một component con đến các components cha.
###  Tài liệu tham khảo:
  1. https://www.telerik.com/blogs/how-to-emit-data-in-vue-beyond-the-vuejs-documentation
    2. https://viblo.asia/p/vuejs-giao-tiep-giua-cac-component-Ljy5Vxd3Zra
    3. https://cli.vuejs.org/guide/