Xin chào tất cả các bạn đến với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn cách sử dụng [Vue-devtool](https://viblo.asia/p/bai-3-su-dung-vue-devtool-de-theo-doi-component-bJzKm00k59N) để theo dõi các component trong ứng dụng, ở bài này, chúng ta sẽ cùng tìm hiểu về `methods` trong Vue, và cách sử dụng `methods` nhé.
# Giới thiệu
Đúng như tên gọi, `methods` là danh sách các phương thức của component, ở trong đây các bạn sẽ viết các phương thức mà từ đó các bạn có thể thực thi ở một nơi nào đó trong component.

Một phương thức có thể trả về một giá trị hoặc cũng có thể không, phương thức có thể nhận tham số đầu vào và xử lý. Phương thức sẽ được gọi mỗi khi component được render (đây là một trong những điểm khác giữa `methods` và `computed` sau này mình sẽ có một bài so sánh giữa chúng)
# Tạo và sử dụng methods
Chúng ta sẽ sử dụng lại ví dụ từ các bài trước, ta có component `MyComponent.vue` với nội dung như sau:
```html
<template>
    <div class="my-component">{{ message }}</div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is my first component using binding data'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Sau đây chúng ta sẽ tạo một phương thức trong `methods` tên là `sayHello`,đồng thời thêm vào đó là một button mỗi lần click sẽ gọi đến phương thức đó với nội dung như sau:
```html
<template>
    <div class="my-component">
        <div>{{ message }}</div>
        <div><button @click="sayHello">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is my first component using binding data'
            }
        },
        methods: {
            sayHello() {
                alert('Hello World')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây các bạn có thể thấy phương thức `sayHello` sẽ alert ra `Hello World`, nhìn lên button các bạn có thể thấy `@click="sayHello"` chắc các bạn sẽ đoán ngay ra là khi click thì phương thức `sayHello` sẽ được gọi. 

Giải thích cho các bạn đó là `@click` là sự kiện khi người dùng click vào element thì sẽ làm một điều gì đó, vì cách sử dụng của nó khá là đơn giản nên mình sẽ không chia ra một bài riêng. Ngoài cách viết kia (gọi là short-hand) thì cách viết đầy đủ của nó là `v-on:click`, các bạn có thể dùng cách nào cũng được nhưng mình thường dùng short-hand.

Sau đó các bạn thử tải lại trang và click vào button sẽ thấy thông báo `Hello World` (nhớ là phải chạy app Laravel và npm trước nhé).

Sau đây chúng ta sẽ thử thay đổi `message` mỗi khi phương click vào button xem sao nhé, sửa lại phương thức `sayHello` như sau:
```js
sayHello() {
    this.message = 'You clicked button'
}
```
Ở đây khi click button sẽ gọi đến `sayHello`, trong đó sẽ xử lý `message` ở trong `data()`, và để truy cập vào `message` chúng ta cần phải viết là `this.message`, từ khoá `this` mục đích tham chiếu đến component hiện tại.
Tải lại trang và thử click vào button, các bạn có thể thấy dòng text hiển thị trên màn hình đã chuyển thành `You clicked button`.

Tiêp theo chúng ta sẽ thử thay đổi `sayHello` một chút để nó trả về một giá trị xem sao nhé. Chúng ta sửa lại như sau:
```html
<template>
    <div class="my-component">
        <div>{{ message }}</div>
        <div><button @click="sayHello">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: this.sayHello()
            }
        },
        methods: {
            sayHello() {
                return 'this function return value'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây phương thức `sayHello` trả về một chuỗi, chúng ta truyền chuỗi đó vào `message` bằng cách gọi `this.sayHello()`. F5 lại trang để xem kết quả nhé các bạn

Một ví dụ khác, chúng ta có thể truyền trực tiếp method vào trong cặp thẻ `{{  }}` để hiện thị nếu như phương thức trả về giá trị:
```html
<template>
    <div class="my-component">
        <div>{{ sayHello() }}</div>
        <div><button @click="sayHello">Click me</button></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: this.sayHello()
            }
        },
        methods: {
            sayHello() {
                return 'this function return value'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây khi F5 lại trang thì các bạn có thể thấy kết quả vẫn tương tự. Nhưng nếu trong phương thức `sayHello` các bạn không return thì các xử lý trong đó vẫn chạy bình thường, chỉ lại ở trong cặp dấu `{{ }}` thì không có giá trị nào được hiển thị trên màn hình.

Cùng xem qua một ví dụ khác ở đây:
```html
<template>
    <div class="my-component">
        <div>{{ sayHello(message) }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'this is text'
            }
        },
        methods: {
            sayHello(text) {
                return text.toUpperCase()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .my-component {
        color: red;
    }
</style>
```
Ở đây phương thức `sayHello` nhận tham số là một đoạn text và sẽ chuyển đoạn text đó thành chữ viết hoa. F5 lại trang các bạn có thể thấy trên màn hình hiển thị dòng chữ `THIS IS TEXT`

Qua bài này mong rằng các bạn đã hiểu được cách sử dụng và tạo các `methods`, từ đó tuỳ biến vào trong dự án của riêng mình.

Ở bài tiếp theo chúng ta sẽ cùng tìm hiểu về `computed` nhé.

Cám ơn các bạn đã theo dõi ^^!