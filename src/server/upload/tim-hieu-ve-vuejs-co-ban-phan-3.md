## Mở đầu:
Tiếp theo ở phần này, chúng ta tiếp tục cùng tìm hiểu về:
* **Event handling**
* **Cơ bản về component**
* **Cách sử dụng axios để call api**.

Chúng ta bắt đầu vào tìm hiểu luôn nhé.
## Event handling:
Trong phần này chúng ta sẽ cùng tìm hiểu cách xử lý các sự kiện khi người dùng tương tác như click hay bấm các phím trong **VueJS** nhé.
### 1.Lắng nghe sự kiện:
Chúng ta có thể dùng *directive* `v-on` để lắng nghe các sự kiện **DOM** và thực thi **JavaScript** khi những sự kiện này được kích hoạt. Hoặc các bạn có thể viết ngắn gọn lại thành `@`. 
Ví dụ như:
```js
<template>
  <div id="test-event">
    <button @click="number++">Cộng</button>
    <p>{{ number }} Số</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: 0
    }
  }
}
</script>
```
Trong ví dụ trên, mỗi khi bạn click vào nút cộng thì bên dưới giá trị của `number` lại tăng lên 1 đơn vị.

Hoặc chúng ta cũng có thể gọi đến 1 phương thức khi click:
```js
<template>
  <div id="test-event">
    <button @click="plus(1)">Cộng</button>
    <p>{{ number }} Số</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      number: 0
    }
  },
  methods: {
    plus(number_plus) {
      this.number += number_plus
    }
  }
}
</script>
```
Tiếp theo chúng ta cùng tìm hiểu đến sự kiện `@click.stop` là 1 trong những **event modifier** thường sử dụng nhé.

Chúng ta bắt đầu bằng ví dụ luôn cho dễ hình dung nha các bạn:
```js
<template>
  <div id="test-event">
    <div @click="methodLog3">
      <div @click="methodLog2">
        <button @click="methodLog1">CLick</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      log1: 'click log 1',
      log2: 'click log 2',
      log3: 'click log 3'
    }
  },
  methods: {
    methodLog1() {
      console.log(this.log1)
    },
    methodLog2() {
      console.log(this.log2)
    },
    methodLog3() {
      console.log(this.log3)
    }
  }
}
</script>
```
Ở trên các bạn có thể thấy mình đã lồng 3 sự kiện `click` vào với nhau. Nếu như các bạn giữ nguyên như vậy và nhấn vào nút **Click** thì kết quả sẽ hiển thị như sau:

![](https://images.viblo.asia/2f26fc98-09b5-4e03-b759-cc2d3381cb69.JPG)

Nếu các bạn thay sự kiện `@click` bằng sự kiện `@click.stop` tại nút **Click** thì sao? Dưới đây sẽ là kết quả nhé:

![](https://images.viblo.asia/2fe463b8-73b1-4e9f-969e-556495574e28.JPG)

Vậy khi ta thay thế bằng `@click.stop` thì nó sẽ chỉ xảy ra sự kiện đến thời điểm mà bạn đánh dấu **stop**. Các sự kiện bên ngoài đã bị ngăn chặn không được xảy ra.

Ngoài **event modifier .stop** ra thì còn 1 vài **event modifier** nữa thường được sử dụng như là: 
* **.prevent**
* **.capture**
* **.self**
* **.once**

```
<!--
  sự kiện submit sẽ không reload trang
  điều này tương đương với event.preventDefault()
-->
<form v-on:submit.prevent="onSubmit"></form>

<!-- ta có thể nối modifier với nhau -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- chỉ có modifier, không có phương thức xử lí -->
<form v-on:submit.prevent></form>

<!--
  dùng "capture mode" khi thêm event listener
  nghĩa là một sự kiện xảy ra với một phần tử bên trong sẽ được xử lí ở đây
  trước khi được xử lí bởi phần tử đó
  đọc thêm về event capturing: https://javascript.info/bubbling-and-capturing#capturing
-->
<div v-on:click.capture="doThis">...</div>

<!--
  chỉ kích hoạt phương thức xử lí nếu event.target là chính phần tử được click,
  chứ không phải là một phần tử con
-->
<div v-on:click.self="doThat">...</div>
```
### 2. Key event:
**Key event** dùng để lắng nghe các sự kiện từ bàn phím của chúng ta. Ví dụ như:
```
<!-- chỉ gọi vm.submit() khi keyCode là 13 (phím Enter) -->
<input v-on:keyup.13="submit">

<!-- như trên -->
<input v-on:keyup.enter="submit">

<!-- cũng hoạt động với cách viết tắt của v-on -->
<input @keyup.enter="submit">
```
Ngoài ra còn có các key **modifier** khác như là:
* **.tab**
* **.delete** (dùng cho cả hai phím “Delete” và “←”)
* **.esc**
* **.space**
* **.up**
* **.down**
* **.left**
* **.right**
### 3. Các phím System modifier:
Chúng ta có thể sử dụng các modifier sau để chỉ kích hoạt các event listener khi các phím modifier tương ứng được nhấn:
* **.ctrl**
* **.alt**
* **.shift**
* **.meta**
Ở đây modifier meta trên windows sẽ là nút cửa sổ còn trên Macbook thì meta lại là phím command nha các bạn.
```
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Cmd + Click -->
<div @click.meta="openNewTab">Mở tab mới</div>
```
**Modifier .exact** (chính xác) có thể được sử dụng kết hợp với các **modifier** khác để chỉ rõ rằng hàm xử lí sự kiện chỉ nên được thực thi khi chính xác tổ hợp phím/chuột đó được bấm.
### 4. Modifier cho phím chuột:
Ở đây chúng ta có các **modifier** sau:
* **.left**
* **.right**
* **.middle**

## Cơ bản về component:
### 1. Component là gì?
**Component** là một trong các tính năng mạnh mẽ nhất của **Vue.js**. **Component** trong **vuejs** giúp cho chúng ta gom nhóm các mã **HTML** lại giống như các module, việc module hóa như vậy giúp chúng ta tái sử dụng nhiều lần, giúp *project* của chúng ta được sạch sẽ và gọn gàng và tối ưu hơn dễ dàng bảo trì khi gặp sự cố. 
### 2. Khai báo và sử dụng Component:
Dưới đây là 1 ví dụ cơ bản về khai báo 1 Component:
```js
Vue.component('button-number', {
  data: function () {
    return {
      number: 0
    }
  },
  template: '<button v-on:click="number++">Bạn đã tăng {{ number }} lần.</button>'
})
```
Trong đó `button-number` chính là tên của **component** mà chúng ta vừa khai báo.
Để sử dụng **component** này thì chỉ việc khai báo như sau:

`<button-number></button-number>`
Và ta được kết quả: 

![](https://images.viblo.asia/84574a60-bfda-4013-99b4-c392d5c43e1e.JPG)
 
 Nếu các bạn muốn sử dụng **component** này nhiều lần thì có thể làm như sau:
 ```js
<button-number></button-number>
 <button-number></button-number>
 <button-number></button-number>
```
Và kết quả là ta đã có 3 nút như hình dưới đây:
![](https://images.viblo.asia/10369257-8ba8-4f4a-a6ef-69384bb510e0.JPG)
Ta cũng có thể truyền dữ liệu cho các **component** của mình bằng `props` nhé:
```js
Vue.component('button-number', {
  props: ['content'],
  template: '<button>{{ content }}</button>'
})
```
```js
<button-number content='Đây là nút số 1'></button-number>
<button-number content='Đây là nút số 2'></button-number>
<button-number content='Đây là nút số 3'></button-number>
```
Kết quả cho chúng ta sẽ là:
![](https://images.viblo.asia/da770747-5591-4833-88cb-adb5dac9f398.JPG)
Hoặc là chúng ta có thể tạo 1 file **component** riêng như sau. Đầu tiên các bạn hãy tạo ra 1 file trong folder **components**, ở đây mình tạo file có tên là `DemoComponent.vue`. Trong file này mình có thể viết code module tùy ý, ví dụ như là :
```js
<template>
    <div class="test-component">
        Hello component
    </div>
</template>

<script>
export default {
   name: 'hello-component'
}
</script>
```
Sau đó, để sử dụng **component** này, thì chúng ta có thể sử dụng câu lệnh sau đây:

* Cách 1:

`Vue.component('hello-component', require('./DemoComponent.vue').default)`
* Cách 2:
```js
import HelloComponent from './DemoComponent.vue'
export default {
        components: {
            HelloComponent
        }
    }
```
Tiếp theo là sử dụng nó như các **component** bên trên mình có giới thiệu, và **component** này có tên là `hello-component`.

## Cách sử dụng axios để call api:
Có lẽ các bạn đã quá quen thuộc với **axios** khi nó thường xuyên được sử dụng để *call api* từ phía *client*. Trong Vue thì **axios** cũng rất dễ tích hợp và sử dụng vì nó sử dụng `Promise`, chúng ta có thể kết hợp nó với `async/await`.

Sau đây chúng ta cài đặt nó bằng lệnh này nhé:
`npm install axios --save`
Sau đó, chúng ta import axios và cùng demo thử call 1 api method GET nhé:
```js
<template>
  <div id="test-api">
    <ul v-if="provinces && provinces.length">
      <li v-for="province of provinces">
        <p><strong>{{province.name}}</strong> - Mã: {{province.code}}</p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      provinces: [],
      errors: []
    }
  },
  name: 'hello-component',
  // lấy dữ liệu khi component được tạo thành công
  created() {
    axios.get(`http://127.0.0.1:8000/api/list-province`)
    .then(response => {
      this.provinces = response.data.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
```

Ở đây mình có 1 *api* danh sách tỉnh thành tại **Việt Nam** và kết quả trả về thì đã được hiển thị danh sách ở phía trên.
Và đây là kết quả hiển thị:
![](https://images.viblo.asia/0c3f60d9-9041-4c20-a018-890614b57a3c.JPG)
Bây giờ, chúng ta chuyển sang method `POST` nhé.
```js
<template>
  <div id="test-api">
    <h1>Đăng ký tài khoản</h1>
       <div class="alert alert-danger alert-dismissible" role="alert" v-if="error">
           <b>{{ error.message }}</b>
           <ul>
               <li v-for="(errorName, index) in error.errors" :key="index">
                   {{ errorName[0] }}
               </li>
           </ul>
           <button type="button" class="close" @click="error = null">
               <span aria-hidden="true">&times;</span>
           </button>
       </div>
       <div class="form-group">
           <label>Name</label>
           <input v-model="user.name" type="text" class="form-control" placeholder="Họ và Tên">
       </div>
       <div class="form-group">
           <label>Phone</label>
           <input v-model="user.phone" type="text" class="form-control" placeholder="Số điện thoại">
       </div>
       <div class="form-group">
           <label>Mật khẩu</label>
           <input v-model="user.password" type="password" class="form-control" placeholder="Mật khẩu">
       </div>
       <div class="form-group">
           <label>Xác nhận mật khẩu</label>
           <input v-model="user.password_confirmation" type="password" class="form-control" placeholder="Xác nhận mật khẩu">
       </div>
       <button class="btn btn-primary" @click="registerCustomer">Create</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        name: '',
        phone: '',
        password: '',
        password_confirmation: ''
      },
      errors: null
    }
  },
  name: 'hello-component',
  // lấy dữ liệu khi component được tạo thành công
  methods: {
    async registerCustomer() {
       try {
         this.error = null
         const response = await axios.post('http://127.0.0.1:8000/api/register-customer', {
           name: this.user.name,
           phone: this.user.phone,
           password: this.user.password,
           password_confirmation: this.user.password_confirmation
         })
         console.log(response.data)
       } catch (error) {
           this.error = error.response.data
       }
    },
  }
}
</script>
<style>
.form-group {
  margin: 15px;
}
</style>
```

Ở đây mình có ví dụ 1 api đăng ký tài khoản sử dụng method `POST`, các method khác ví dụ như `PUT`, `PATCH` và `DELETE` cũng tương tự. Cùng kiểm tra kết quả nhé:

![](https://images.viblo.asia/a0290cd8-cc4a-447e-8aa7-db3003bcc902.JPG)

![](https://images.viblo.asia/862b6e55-6744-48f0-9ada-5235c021212d.JPG)
## Tổng kết:
Như vậy trong bài này, mình đã giới thiệu cho các bạn về các **Event handling**, hiểu cơ bản về **component** và cách sử dụng **axios** để *call api* trong **Vue** giúp các bạn nắm được các kiến thức cơ bản về **Vue**. Mình rất mong nhận được sự góp ý của các bạn. Cảm ơn các bạn đã lắng nghe bài chia sẻ của mình. Chúc các bạn thành công!
## Tài liệu tham khảo:
[https://vi.vuejs.org/v2/guide/](https://vi.vuejs.org/v2/guide/)