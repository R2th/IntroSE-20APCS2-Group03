# Props
![](https://images.viblo.asia/da136596-0511-4484-b757-3de2f59819ce.png)

Ở dòng 3 của HelloWorld.vue, bạn sẽ nhận thấy cú pháp mẫu dấu ngoặc nhọn chứa khóa thuộc tính `msg` của thành phần.

Trong VueJS, dấu ngoặc nhọn được sử dụng để nội suy các giá trị từ **data() object, props** và các thuộc tính khác của đối tượng Vue của chúng ta.

Khóa thuộc tính `msg` ở đây là một **prop**, có thể được chuyển vào `<HelloWorld />` từ một thành phần mẹ chứa nó. Prop này được khai báo ở dòng 37 của **HelloWorld.vue**, trong đối tượng **props** của thành phần của chúng tôi như sau:

```
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
```

Trong trường hợp này, **HelloWorld's props** bao gồm một **typed object**, chúng ta có thể thấy rằng **msg** được cho là một **String**, không phải là **Object**, **Integer** hoặc **Function**.

Một cách thay thế để khai báo các component props là trong một mảng động:

```
export default {
  name: 'HelloWorld',
  props: ['msg']
}
```

Trong ứng dụng đã tạo, một chuỗi được chuyển qua `msg = ""` prop của `<HelloWorld />` component trên dòng 4 của **src/App.vue**:

```
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

# Reactive Vue Data Properties
Ngay bây giờ, khai báo thành phần **App.vue** bao gồm:

```
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
```

Hiện tại, component trong **App.vue** có tên và các khai báo thành phần đã nhập.

Hãy `add() { }` vào component này bên dưới `components: { }` đã khai báo:

```
// template code omitted
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
      message: 'Hello World!'
    }
  }
}
</script>
```

Khi ứng dụng Vue chạy, ứng dụng này sẽ thêm tất cả các thuộc tính có trong đối tượng dữ liệu này vào **Vue’s reactivity system**, có nghĩa là khi các thuộc tính của đối tượng dữ liệu này thay đổi, Vue sẽ phản ứng và xử lý các thay đổi.

Như bạn có thể thấy, đối tượng dữ liệu được khai báo dưới dạng một **fuction**, `data ()`, trả về một đối tượng `{}`.

Trong đối tượng trên, đang trả về một khóa thuộc tính `message` với giá trị chuỗi là `‘Hello World!’`.

Hãy chuyển thuộc tính dữ liệu này thông qua `<HelloWorld />` component!

# Passing Component Data as Props
Hiện tại, `<HelloWorld />` đang chấp nhận một giá trị chuỗi thông qua `msg = ""`. Chúng tôi muốn chuyển thuộc tính `message` của component của mình thông qua `msg` giống như một biến.

Nếu chúng ta thử `msg = 'message'`, component của chúng ta sẽ hiển thị một chuỗi "message", không phải biến của chúng ta.

Để chuyển một thuộc tính của thành phần mẹ của chúng ta thông qua thành phần con này, hãy đặt dấu hai chấm liên kết dữ liệu ( : ) với phần hỗ trợ của khai báo thành phần đó:

`<HelloWorld: msg = "message" />`

Lưu ý: `:msg` là viết tắt của `v-bind:msg`, liên kết `msg` prop với dữ liệu thành phần của chúng tôi. Chúng tôi cũng có thể chạy một số JavaScript nhất định bên trong các thuộc tính và thuộc tính với `:`, chẳng hạn như các câu lệnh và hàm bậc ba.

**App.vue** bây giờ sẽ trông như thế này:

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="message"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
      message: 'Hello World!'
    }
  }
}
</script>
```

Nếu chúng tôi chạy ứng dụng của mình, sẽ thấy:

![](https://images.viblo.asia/e5f27487-5e02-426d-a1b0-28f896991bea.png)

Tuyệt quá! Bây giờ, hãy làm cho `message` của chúng ta tương tác với **v-model **😎

# Manipulating Component Data with v-model

Thêm tag `<input/>` trên dòng 5 của **App.vue** trong **<HelloWorld />**:

```
<HelloWorld :msg="message" />
<input type="text" />
```

Bây giờ, để chỉnh sửa thuộc tính dữ liệu `message` của chúng ta với kiểu nhập văn bản này, hãy thêm `v-model = "message"` vào đó:

```
<input type="text" v-model="message" />
```

`<template>` của chúng ta bây giờ sẽ giống như sau:

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="message"/>
    <input type="text" v-model="message" />
  </div>
</template>
```

Hãy chạy lại ứng dụng và chỉnh sửa văn bản trong phần input của chúng tôi để xem ứng dụng này hoạt động như thế nào:

![](https://images.viblo.asia/871f8bc6-423b-4bc5-ba44-7ceb85d30ba2.gif)

**NICE!**

# Methods
Để hoàn thành phần giới thiệu của chúng tôi về VueJS, hãy thêm một method thực hiện điều gì đó với giá trị của trường nhập văn bản của chúng tôi.

Các phương thức của component được thêm vào các `method: { }` đối tượng của thành phần Vue, được đăng ký vào Vue component của chúng tôi tương tự như cách chúng tôi đăng ký  `data () { }` và `components: { }`.

Hãy thêm `methods: { }` vào **App.vue**:

```
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data(){
    return {
      message: 'Hello World!'
    }
  },
  methods: {
    // method functions go here 
  }
}
</script>
```

Bây giờ, hãy thêm một hàm có tên `alertMessage ( )` vào các method của chúng tôi để tạo một cảnh báo chứa `message`:

```
data(){
    return {
      message: 'Hello World!'
    }
  },
  methods: {
    alertMessage(){
      alert(this.message)
    }
  }
```

Lưu ý rằng khi chúng tôi truy cập thuộc tính dữ liệu `message` từ các phương thức của cùng một thành phần, chúng tôi thêm **this.**: `this.message`, không phải `message`.

Trong JavaScript, `this.` đề cập đến đối tượng mà hàm, phương thức hoặc lớp thuộc về.

**Lưu ý:** Các trường hợp duy nhất trong đó **this.** không tham chiếu đến chủ sở hữu, toàn cục hoặc đối tượng được tham chiếu là khi nó được gọi trong một hàm ở strict mode  (nơi nó không được xác định), hoặc trong  một **event**, trong trường hợp **this.** đề cập đến phần tử nhận sự kiện đã nói.

Bây giờ, chúng ta có hàm `alertMessage ( )` ở trên - nhưng không có cách nào để gọi nó!

# Calling Methods with Click Events
Hãy thêm một button vào **App.vue** gọi phương thức `alertMessage` của chúng tôi khi nhấp vào dòng dưới `<input />`:

```
<button @click="alertMessage">Alert</button>
```

Cũng giống như `:msg = "message"` là viết tắt của `v-bind:msg = "message"`, `@click = "alertMessage"` là viết tắt của `v-on:click = "alertMessage"`.

```
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="message"/>
    <input type="text" v-model="message" />
    <button @click="alertMessage">Alert</button>
  </div>
</template>
```

Hãy chạy ứng dụng của chúng tôi và xem nó hoạt động:

![](https://images.viblo.asia/132f689f-c7ca-4695-9d42-1fc753bd814d.gif)

Tuyệt quá!
Bạn có thể tưởng tượng rằng trong một ứng dụng web điển hình, chúng tôi có thể có một hàm `onSubmit` trong các phương thức thành phần của chúng tôi để có thể `POST` từ nội dung bên backend hoặc lọc một mảng dữ liệu.

# Tham khảo
https://medium.com/js-dojo/getting-started-with-vuejs-for-web-and-native-285dc64f0f0d