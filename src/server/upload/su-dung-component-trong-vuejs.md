# 1, Components là gì. 
`Component` là một trong những tính năng quan trọng nhất trong `VueJS`. Nó giúp chúng ta có thể kế thừa các phần tử `HTML` , có thể tái sử dụng code, giúp code chúng ta nhìn ngắn gọn, sạch sẽ hơn. Những đoạn `code` chúng ta có thể khai báo trong một `component` sẽ là `HTML`,  `CSS` hay là cả `Javascript`, chúng được gói gọn vào trong một `component` rồi sau đó chúng ta có thể gọi tới `component` và tái sử dụng chúng.

# 2, Khai báo một Component
Có rất nhiều cách để có thể khai báo một `component`, mình xin giới thiệu cho bạn một vài cách như sau:

**Cách 1:**
Đây là một cách để khai báo một `component`, cách này thường được gọi là `string template`. Các đoạn code html sẽ được khai báo trong `template: ' ... '`
```html
<div id="app">
  <hello-world></hello-world>
</div>
```
```js
// js
Vue.component('hello-world', {
	data: function() {
  	return {
   		name: 'Quang Phu',
    }
  },
  
  template: '<h1>Hello {{ name }}</h1>',
}),

new Vue({
	el: "#app",
});

```
Kết quả 
```
Hello Quang Phu
```
Bạn có thể tái sử dụng `component` bằng cách khai báo nhiều `hello-world`.
```html
<div id="app">
  <hello-world></hello-world>
  <hello-world></hello-world>
  <hello-world></hello-world>
</div>
```
Đối với các đoạn code phức tạp hơn, dài dòng hơn mà bạn muốn viết chúng trong `template` thì hãy sử dụng `template literals`, chúng cho phép bạn viết code trên nhiều dòng và sẽ dễ đọc hơn ví dụ :
```html
template: `
    <div class="blog-post">
      <h3>Hello</h3>
      <div>Cảm ơn các bạn đã đọc bài viết của mình, tặng mình một upvote nehs</div>
    </div>
    `
```
**Cách 2:** Đây là cách có lẽ phổ biến nhất mà mình nghĩ sẽ nhiều người áp dụng hơn cả đó là `single-file component`. Khi chúng ta có một hệ thống lớn kết hợp nhiều files với nhau thì mỗi `component` sẽ được tách tách một file `.vue`, điều này sẽ giúp chúng ta dễ dàng kiểm soát code hơn cũng như là bảo trì hay sạch sẽ code. 
> Cách đặt tên cho các files `component` nên được đặt dưới dạng `PascalCase`(in hoa mỗi chữ cái đầu) hoặc là `kebab-case` (chữ thường toàn bộ và có có gạch nối - giữa các từ)`. Ví dụ 
> 
> `DefaultAvatar.vue` 
<br>or<br>
`default-avatar.vue`


Một file `components` sẽ có 3 phần là `HTML`, `CSS`, `javascript` được viết riêng biệt từng phần giả sử như sau:
```html
<template>
  <div id="binding-data">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```
**Cách 3:** Sử dụng `Inline Templates`, với cách này thì bạn sẽ định nghĩa `template` sau khi đăng ký một `component` bằng cách sử dụng thêm thuộc tính `inline-template`.
```html
<div id="app">
  <my-template inline-template>
    <p>Hello {{ name }}</p>
  </my-template>
</div>
```
```js
Vue.component('my-template', {
  data() {
    return {
   		name: 'Phu',
    }
  },
});

new Vue({
	el: "#app",
});
```

Ngoài ra chúng ta còn có thêm một vài cách khác để khai báo như sử dụng `x-templates`, `render function` hay `JSX`. Các bạn có thể tìm hiểu thêm ở trang chủ của `Vue`.
# 3, Sử dụng phương thức data
`data` trong `component` có hai kiểu là `chia sẻ dữ liệu chung` và `không chia sẻ dữ liệu chung`. Để dễ hiểu hơn mình sẽ đi vào ví dụ luôn. Đầu tiên là với trường hợp `chia sẻ dữ liệu chung`.
```html
<div id="app">
  <hello-world></hello-world>
  <hello-world></hello-world>
  <hello-world></hello-world>
</div>
```
```javascript
var data = {
	name: 'Quang Phu'
}

Vue.component('hello-world', {
	data() {
  	return data
  },
  
  template: '<h1>Hello {{ name }}<br><button @click="change">Change</button></h1>',
  
  methods: {
  	change() {
    	this.name = 'Torres'
    }
  }
}),

new Vue({
	el: "#app",
});
```
Kết quả giao diện sẽ là : 
![](https://images.viblo.asia/b3982a4d-19f5-4110-995c-eae2515662cb.png)


Giải thích một chút là tại sao mình lại xây dựng như thế này, là vì để biết được cái `data` trong `component` có được `chia sẻ chung dữ liệu` hay không thì khi chúng ta click vào một nút `change` bất kì để thay đổi giá trị của `name`, mà ở tất cả các `component` khác đều bị ảnh hưởng thay đổi dữ liệu thì chúng ta có thể hiểu rằng `data` này đang bị chia sẻ chung dữ liệu và dữ liệu này được dùng ở tất cả các `component`. Khi các bạn chạy thử đoạn code trên ắt hẳn các bạn sẽ thấy đồng loạt giá trị của `name` ở các `component` đều bị thay đổi. Như đoạn `gif` phía dưới 
![](https://images.viblo.asia/9b4a38c1-ddff-4ba0-843a-bba2d38773cf.gif)

Như ở trên thì chúng ta trả về dữ liệu được khai báo ở ngoài rồi trả về kết quả đó trong `data`. Bây giờ nếu muốn là khi bạn click vào 1 button nào đó thì chỉ dữ liệu ở `component` đó bị thay đổi thì bạn hãy trả về luôn 1 đối tượng trong `data` như sau:
```js
Vue.component('hello-world', {
	data() {
  	return {
        name: 'Quang Phu',
    }
  },
  
  template: '<h1>Hello {{ name }}<br><button @click="change">Change</button></h1>',
  
  methods: {
  	change() {
    	this.name = 'Torres'
    }
  }
}),

new Vue({
	el: "#app",
});
```
Kết quả :

![](https://images.viblo.asia/add38921-2ade-4ccf-a58d-f45f805788fb.gif)

Các bạn đã thấy là khi chúng ta click vào `button` của `component` nào thì chỉ dữ liệu ở `component` đó thay đổi, đây được tạm gọi là kiểu `không chia sẻ dữ liệu chung`.

**Các bạn chú ý :** Ở ví dụ `chia sẻ dữ liệu chung` thì ở trong `method` `change` thì có `this.name`, `this` này chính là cái biến `data` được khai báo ở ngoài. Còn trong trường hợp `dữ liệu không được chia sẻ chung` thì trong `this.name` thì `this` chính là cái `component` mà bạn đang thực hiện một hành động lên `component` đó nên nó biết là dữ liệu ở `component` nào bị thay đổi. 

> **Chú ý** `data` trong `component` phải là một function và trả về một đối tượng. Đây chính là cách mà `component` kiểm soát được dữ liệu của chính `component` đó, để dữ liệu `không bị chia sẻ chung`. 


Nếu như bạn cố tình khai báo `data` không phải là một `function` như : 
```js
data : {
    name: 'Quang Phu',
  },
```
thì lập tức bạn sẽ nhận được ngay thông báo lỗi là `data property in component must be a function`. Trong `style guide` của `Vue` thì khuyến khích các bạn khai báo như sau
```javascript
Vue.component('some-comp', {
  data: function () {
    return {
      foo: 'bar'
    }
  }
})

//hoặc là
// In a .vue file
export default {
  data () {
    return {
      foo: 'bar'
    }
  }
}
```
# 4, Vùng hoạt động của components.
Có hai kiểu hoạt động của `components` là `global` và `local`. 

**Global Component:**

Đối với `global component` thì chúng ta có thể sử dụng ở bất cứ đâu trong một `Vue instance` nào đó. Lấy lại ví dụ ở trên ta có:
```html
<div id="app">
  <hello-world></hello-world>
  <hello-world></hello-world>
  <hello-world></hello-world>
</div>

<div id="app2">
  <hello-world></hello-world>
  <hello-world></hello-world>
  <hello-world></hello-world>
</div>
```
```javascript
Vue.component('hello-world', {
	data() {
  	return {
    	name: 'Quang Phu',
    }
  },
  
  template: '<h1>Hello {{ name }}</h1>',
  }
}),

new Vue({
	el: "#app",
});

new Vue({
	el: "#app2",
});
```

Kết quả in ra các bạn có thể thấy ở trong `#app2` cũng có thể sử dụng `component` mà chúng ta khai báo mà không gặp bất cứ một vấn đề nào cả.

**Local Component:**

Nếu bây giờ bạn không muốn `component` của bạn dùng được ở tất cả các `Vue instance` mà chỉ dùng được ở trong một `Vue instance` nào đó thôi thì làm cách nào, đây là lúc chúng ta sử dụng đến `local component`.

Khác với ở trên thì chúng ta sẽ không đăng ký trực tiếp `component` bằng cách khai báo `Vue.component` nữa, thay vào đó chúng ta định nghĩa một `component` như là một `object` như sau:
```javascript
var componentdefinded = {
	data() {
  	return {
    	name: 'Quang Phu',
    }
  },
  
  template: '<h1>Hello {{ name }}</h1>',
  }
}),
```
Sau đó để sử dụng được `component` này trong `Vue instance` chúng ta cần phải khai báo như sau:
```javascript
new Vue({
	el: "#app",
    
    components: {
        hello-world: componentdefinded, // đăng ký sử dụng component dưới tên component là hello-world.
    }
});
```
rồi gọi đến như bình thường.
```html
<div id="app">
  <hello-world></hello-world>
  <hello-world></hello-world>
  <hello-world></hello-world>
</div>
```
nếu cố tình khai báo `component` trong một `Vue instance` mà không đăng ký sử dụng `component` đó thì chúng ta sẽ không nhận được kết quả nào đâu =)).

# 5, Giao tiếp giữa các components
Đã bảo giờ bạn đặt câu hỏi, có cách nào để 2 `components` lại có thể tương tác được với nhau không, nếu có hoặc không thì cũng hãy đều đọc tiếp phần này của mình nhé =)). Chắc hẳn nếu ai đã tiếp xúc với `Vue` cũng sẽ đôi lần sử dụng `component` này trong `component` khác nhỉ. Đây được gọi là `subcomponent` và thường thường người ta sẽ nói nó theo một cách dễ hiểu là đây là mối quan hệ `cha-con`. 
![](https://images.viblo.asia/3dc4508d-86d3-46da-87d1-1910153f8401.png)

Hình ảnh trên mô tả cách mà `components` giao tiếp với nhau,  nhìn rất dễ hiểu. Khi mà bạn muốn truyền dữ liệu từ `component cha` xuống cho `component con` thì bạn sẽ sử dụng **props**. Còn nếu bạn muốn truyền dữ liệu từ `component con` lên `component cha` thì sử dụng **events**.

Đầu tiên chúng ta sẽ cùng tìm hiểu cách truyền dữ liệu từ **component cha xuống component con**.

Giả sử chúng ta có 2 `components` như sau:

`Dashboard.vue` (**Component cha**)
```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :message="message"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      message: 'Xin chao tat ca moi nguoi',
    }
  }
}
</script>
```

`HelloWorld.vue` (**Component con**)
```html
<template>
  <div class="hello">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    }
  }
}
</script>
```
Ở trên trong `component` cha là `Dashboard` mình muốn truyền một biến xuống cho `component` con là `HelloWorld` rồi in ra giá trị của `message`. Chúng ta sẽ có hai cách để truyền dữ liệu, 1 là `static props` 2 là `dynamic props`. Nếu đối với `static props` bạn chỉ cần truyền trực tiếp giá trị của biến xuống `component` con và giá trị đó sẽ không đổi chúng ta sẽ làm như sau:
```html
<HelloWorld message="Xin chào tất cả các bạn"/>
```
Còn nếu muốn truyền theo kiểu `dynamic props` thì hãy làm như mình ở trên đó là 
```html
<HelloWorld :message="message"/>
```
với `message` đã được định nghĩa trong `script`, với kiểu truyền này thì sẽ năng động hơn, tức là khi giá trị `message` ở `component cha` được thay đổi thì đồng nghĩa giá trị đó ở `component con` cũng sẽ được cập nhật theo.

Ngoài ra bạn có thể truyền dữ liệu theo nhiều kiểu dữ liệu khác nhau như `string`, `object`, `array`, `number`, `boolean` hay thậm chí là cả `properties` của `object`. Ở đây mình chỉ làm ví dụ đơn giản dễ hiểu để cho những ai vừa học có thể dễ dàng hiểu được luôn.

Tiếp theo là để nhận được dữ liệu của `component cha` xuống `component` con, chúng ta sử dụng `props` để nhận.
Nếu chúng ta đơn giản không muốn định nghĩa kĩ càng kiểu dữ liệu hay giá tri mà `component cha` truyền xuống chúng ta chỉ cần.
```javascript
props: ['message']
```
nếu chúng ta muốn kiểu dữ liệu của `props` nhận là `string` thi chúng ta làm như sau:
```
props: {
    message: {
      type: String,
    }
  }
```
thậm chí chúng ta có thể `validate` được dữ liệu truyền xuống nữa, để tìm hiểu kĩ hơn các bạn có thể vào `document` của Vue để đọc.

**Truyền dữ liệu từ component con lên component cha**

Vào luôn ví dụ cho dễ hiểu nhé, giả sử ta có 2 `component` như sau. Giả sử thì chúng ta có một trang `profile` khi click vào `button` sẽ thay đổi `username`.

`AccountInfo.vue` (**component con**)
```html
<template>
 <div id='account-info'>
   <button @click='changeUsername()'>Change Username</button>
   {{username}}
 </div>
</template>
 
<script>
export default {
 props: {
   username: String
 },
 methods: {
   changeUsername() {
     this.$emit('changeUsername')
   }
 }
}
</script>
```

Đầu tiền khi click vào button để thay đổi `username`, nó sẽ gọi đến hàm `changeUsername()`, ở `method` này chúng ta sẽ sử dụng `$emit` để phát sự kiện với tên sự kiện được dùng ở đây là `changeUsername`.

Tiếp tục thì ở `component cha` sẽ tiếp nhận `sự kiện` ở `component con` truyền đi bằng cú pháp kiểu `@<Tên sự kiện của con gửi lên>=<Hàm xử lý ở cha>`.  

`Account.vue` (**Component cha**)
```html
<template>
 <div>
   <account-info :username="user.username" @changeUsername="user.username = 'new name'"/>
 </div>
</template>
```
Ở đây từ mình vì là ví dụ đơn giản thay đổi tên thôi nên mình xử lý trực tiếp luôn trong đoạn gọi tới `component con` là 
```html
<account-info :username="user.username" @changeUsername="user.username = 'new name'"/>
```
Nếu đoạn xử lí bên trong hơi rắc rối bạn nên cho nó vào một `methods` rồi xử lí, ví dụ :
```html
<account-info :username="user.username" @changeUsername="changeName"/>
```
rồi trong `script` bạn xử lý như sau:
```javascript
methods: {
    changeName() {
        this.name.username = 'Quang Phu'
    }
}
```

# Kết luận
Đây là những gì mà mình muốn chia sẻ với các bạn trong bài viết lần này, nếu có gì sai xót hay góp ý cũng như đặt câu hỏi các bạn có thể bình luận xuống phía dưới để chúng ta cùng trao đổi nhé =))