# Lời nói đầu: 
![](https://images.viblo.asia/e01bd97c-7dc4-4e3f-a392-b678be893427.png)

Chào mọi người, lại là mình đây !!! Và hôm nay mình sẽ tiếp tục series Vue.js với một khái niệm cơ bản mà rất quan trọng mà mình đã đề cập ở bài trước. Đấy là Component  (chia ứng dụng Vue thành các thành phần).  Và bắt đầu thôi...
- Nhìn hình ảnh đầu bài viết chắc các bạn cũng có thể tưởng tượng ra Component trong Vue nó như thế nào rồi đúng không ? Nếu chưa thì bạn tạm thời hãy hình dung rằng việc phân chia Component trong Vue nó như là  phân chia các thẻ trong HTML  vậy. Có parent Component và child Component tương tự parent tag (thẻ cha) cũng như child tag (thẻ con). Và cụ thể như thế nào thì mình sẽ giải thích ngay dưới đây luôn nhé. 
# 1. Khái niệm
Bắt đầu với khái niệm về Component nhé. Component là gì? 

Trong lập trình mọi người đều biết lặp code là điều cần hạn chế đối với mỗi ứng dụng của chúng ta, cũng như khi có sự thay đổi, muốn thay đổi thành phần nào đấy cho tất cả chúng ta lại cần phải lục tìm tất cả các đoạn code đó. Component sinh ra mục đích một phần cũng là giải quyết vấn đề đó. Một phần giúp cho việc clear code (làm rõ ràng code) hơn.

Với việc chia nhỏ thành phần và đóng gói lại, giúp cho chúng ta tái sử dụng được các Component cho các Module có sử dụng những thành phần giống nhau. Component là một trong những tiện ích mạnh mẽ nhất của Vue.js, khi nó cũng chính là một thành phần để tạo nên một SPA (Single Page Application - Ứng dụng đơn trang) với hệ thống react(phản ứng) mạnh mẽ của Vue.
# 2. Sử dụng
Cách sử dụng của Component trong Vue.js  cơ bản cũng rất đơn giản. Để đăng kí (khai báo) một component, chúng ta sẽ có các cách sử dụng sau đây: 

###  Đăng kí toàn cục

```javascript 
Vue.component('MyComponentName', {
    template: '<a href="google.com"> Google.com  </a> '
})
new Vue({ el: '#app' })
```
```html
<div id="app">
  <MyComponentName></MyComponentName>
</div>
```
![](https://images.viblo.asia/4e3fb627-130d-47e2-aaf7-b879167790b9.png)

Ngoài ra khi cài đặt Vue Extension trên Chrome, bật tab Vue lên và kết quả cho chúng ta một cây Component như hình dưới.
![](https://images.viblo.asia/ade53b88-7f97-452c-85a7-f3e8537c550e.png)


Với kiểu khai báo toàn cục này giúp chúng ta có thể dùng component ở trong template của tất cả các đối tượng Vue được khai báo. hoặc trong template của component con trên cây component đó . 
###  Đăng kí cục bộ
```javascript
var HeaderComponent = { /* ... */ }
var FooterComponent = { /* ... */ }

new Vue({
  el: '#app'
  components: {
    HeaderComponent,
    FooterComponent
  }
}) //sử dụng Component HeaderComponent & FooterComponent bên trong root
```

Như mọi người thấy phía trên, chúng ta có thể sử dụng component con ở trong một đối tượng Vue khi khởi tạo. Ngoài ra chúng ta cũng có thể sử dụng Component con ở trong một component khác: 
```javascript
var HeaderComponent = { /* ... */ }
var FooterComponent = { /* ... */ }

var MainComponent = {
    components: {
        HeaderComponent,
        FooterComponent
    }
} //sử dụng Component HeaderComponent & FooterComponent bên trong MainComponent

```
Tương tự bạn hãy thử tạo component như hướng dẫn trên và thử dùng Component xem kết quả ra sao nhé :D 

### Đăng kí cục bộ trong hệ thống module:
- Trong một dự án, ít khi chúng ta sử dụng hai cách trên, thay vào đó chúng ta sử dụng một hệ thổng quản lí package và tách file riêng lẻ cho từng Component để quản lý. Ở đây mình sử dụng npm (node package manager) . Từng component sẽ tách thành những file riêng lẻ và sử dụng export . Cuối cùng những component nào cần sử dụng chúng ta sẽ import nó vào. và khai báo như kiểu đăng kí cục bộ ở trên. 
- Ở bài viết này mình sử dụng CLI để tạo một khung ứng dụng Vue có sẵn để minh họa cho việc tách file Component riêng chứ không viết chung tất cả Component vào một file .js duy nhất.
- Việc cài đặt vue CLI và init một project Vue đã có sẵn trong doc các bạn vào link này đọc nhé: https://vi.vuejs.org/v2/guide/installation.html#CLI

Okay. Sau khi mình cài đặt xong sẽ có cấu trúc thư mục như thế này: ![](https://images.viblo.asia/86345888-7f04-4f7b-b99b-39f8da9559c7.png)

Để chạy ứng dụng, sử dụng ```npm run dev```

Trong phạm vi bài viết, chúng ta thử xem thư mục components và mở file HelloWorld.vue lên nhé.
```html
<template>
    ...
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

```
Đây chính là cách chúng ta tạo ra một file Component và export để sử dụng lại sau. Ok chắc các b hiểu đoạn code trên rồi chứ nếu chưa hiểu thì đơn giản nó chỉ là **export** ra một **Component** có template được định nghĩa ở trong cặp thẻ ```<template> </template>``` , và có data được khởi tạo với một msg là ```'Welcome to Your Vue.js App'```.

![](https://images.viblo.asia/161f82fc-416b-456f-a859-651f8e5bd5b6.png)

Export thế này vậy import một Component nó sẽ thế nào. Bây giờ chúng ta cùng thử tạo một Component khác bên trong folder components nhé. Chúng ta tạo một file có tên Input.vue ở trong folder components. 
```html
<template>
  <div class="input">
    <input type="email" placeholder="Nhập email"/>
  </div>
</template>
<script>
export default {
  name: 'Input'
}
</script>
```
Đơn giản component này chỉ có nhiệm vụ là tạo ra một ô input. Và chúng ta import vào Helloworld.vue nhé: 

```html
<template>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <Input/> <!-- Sử dụng Component Input  trong Component HelloWorld --> 
    ...
</template>

<script>
import Input from './Input.vue' //dòng này để import từ file Input.vue
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }, 
  components: {Input} //dòng này để khai báo component con của Component Helloworld là Component Input
}
</script>

```

![](https://images.viblo.asia/f00596c9-3997-4d0f-b366-9cc41e06dfed.png)

Chúng ta có 2 cái mới được thêm vào đấy là ô input khi hiển thị ngoài trình duyệt và thêm một node **<Input>**  vào cây **Component** khi mở **Vue Extension** lên . 


Như vậy chúng ta đã biết được những cách cơ bản để đăng kí Component.  Tiếp theo chúng ta sẽ đi vào bên trong một Component có những gì nhé. Vừa rồi chỉ là giới thiệu thôi bây giờ mình sẽ đi vào trong Component :D 


### Đặc trưng cơ bản của Component
   
Bên trong Component có toàn bộ những thứ của một Vue Instance: methods, computed, watchers, .... Một điều lưu ý khi khai báo data ở trong Component có một chút khác với khi  khởi tạo một Vue Instance đấy là khi muốn truyền data vào bên trong chúng ta sẽ sử dụng cú pháp khởi tạo một function
    
```javascript 
Vue.component('MyComponentName', {
    template: '<a href="google.com"> {{ label }}  </a> ',
    data: function () {
        return {
            label: 'Google.com'
        }
    }
})
new Vue({ el: '#app' })
```
 Mục đích để khi trong một page, khi chúng ta sử dụng một component ở nhiều nơi trong trang web  của mình nó sẽ tạo ra một bản sao riêng biệt để khi một đối tượng trong đấy thay đổi sẽ không ảnh hưởng đến những đối tượng còn lại của component.

 **Props**.
    
  Nếu bạn coi mỗi **Component** là một hàm thì **Props** chính là tham số truyền dữ liệu từ bên ngoài vào của hàm đấy. **Props** là thuộc tính giúp cho việc truyền dữ liệu từ bên ngoài hay từ Component cha vào Component con, là một phần rất quan trọng của **Vue Component**. 
    
Giả sử bạn có một Component và trong Component ấy sử dụng một Component khác và bạn muốn gửi dữ liệu  của Component cha vào Component con đấy thì phải làm thế nào. **Props** là công cụ giải quyết vấn đề đó, từ component con sẽ nhận được dữ liệu từ bên ngoài thông qua **props**. Các bạn hãy nhìn đoạn code dưới đây: 
    
```javascript
Vue.component('ChildComponent', {
     props: ['users']
})
```
```javascript
Vue.component('ParentComponent', {
    data () {
        users: [
            {id: 1, name: 'Doraemon'},
            {id: 2, name: 'Conan'}
        ]
    }
    template: '<ChildComponent :users="users" />
})
```
    
Như vậy thông qua **props**, ChildComponent có thể nhận được một Array các ```users``` từ ParentComponent. Thật dễ dàng phải không mọi người? Nhưng bình thưởng để tường minh hơn và khi nhận dữ liệu từ parent. Chúng ta sẽ khai báo thêm kiểu dữ liệu: 
```javascript
Vue.component('ChildComponent', {
    props: {
        users: Array
    }
})
```
    
**Lưu ý:**  **Props** hoạt động theo kiểu truyền dữ liệu một chiều (One-way Data Flow) tức là khi dữ liệu từ bên ngoài Component cha thay đổi thì Component con sẽ thay đổi theo. Nhưng không nên làm ngược lại vì sẽ khiến cho việc luồng thay đổi dữ liệu trong ứng dụng trở nên khó hiểu hơn.
    
**Slot**: 
    
   Tôi có một đoạn mã thế này: 
```html
<WarningComponent> Authentication Failed </WarningComponent> 
```
   
Mọi người nghĩ đoạn mã trên có lỗi không? Câu trả lời là không nếu chúng ta sử dụng slot. 
```javascript
Vue.component('WarningComponent', {
    template: 
        `<div class="alert alert-danger" role="alert">
            <slot> </slot>
        </div>`
})
```
 Đến đoạn này mọi người chắc đã hiểu nhiệm vụ của slot rồi nhỉ. Khi dùng slot chúng ta có thể dùng Component như cặp thẻ html có template sẵn và sẽ lấy thêm nội dung được viết ở giữa cặp thẻ Component (```<WarningComponent></WarningComponent>```) và chèn vào cặp thẻ slot của Component đấy. Mọi người có thể đọc thêm về Slot ở link: https://vi.vuejs.org/v2/guide/components-slots.html.
   
# 3. Tổng kết
 Cuối cùng bài viết cũng tới hồi kết, qua bài viết mình đã giới thiệu những thứ cơ bản nhất của Vue Component. Các bạn có thể dùng đế áp dụng trong dự án của mình một cách linh hoạt. Cảm ơn mọi người đã theo dõi, mong bài viết sẽ giúp ích cho mọi người. Nếu thấy hay thì upvote cho mình nhé.
    

# Tài liệu tham khảo
- https://vuejs.org/