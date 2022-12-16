# Giới thiệu
Vue.js là framework Javascript dùng để xây dựng giao diện SPA (Single Page App) người dùng được ra đời năm 2014. Nó có cấu trúc khá giống với Angular và React và tương đối dễ học cho người mới, hôm nay chúng ta cùng tìm hiểu cơ bản về vue.js nhé.
# Cấu trúc 
Cấu trúc cơ bản trong 1 file vue sẽ có 3 phần:
- `teamplate`: là nơi chứa các code HTML cho component, ở đây chúng ta có thể thoải mái thực hiện việc binding dữ liệu, các sự kiện, ....
- `script`: là nơi viết các code javascript, ở đây ta có thể import các thư viện, component, nhận các props, xây dựng các method, xử lý các event lifecycel (created, mounted, destroyed,...).
- `style`: phần là để các bạn thực hiện style cho component, có thể sử dụng scss để viết code css gọn gàng hơn.

# Cú pháp cơ bản
Cốt lõi của vue.js rất đơn giản như sau 
```html
<div id="myApp">
    <p v-on:click="clickedElement">
        {{ message }}
    </p>
</div>
```
```javascript
var myApp = new Vue({
   el: '#myApp',
   data: {
       message: 'Hello world!'
   },
   methods: {
       clickedElement() {
           alert('Clicked...');
       }
   }
})
```
-  `el: '#myApp'` : dùng để chỉ định DOM nơi mà vue sẽ được render lên đó 
-  `data`: là nơi khai báo tất cả dữ liệu được sử dụng trong ứng dụng, nó giống như state trong React vậy, mỗi khi giá trị được khai báo trong `data` thay đổi thì UI cũng được render theo.
-  `{{ message }}` : là cách để binding dữ liệu khai báo trong `data` thành code HTML.
- ` v-on` : dùng để thực hiện binding một sự kiện vào element, và sẽ sử dụng một funtion được khai báo trong menthods để thực thi.

# Directives
Khái niệm tiếp theo mà bạn cần biết đó là directives, directive là các thuộc tính đặc biệt có tiền tố là v-. 
### `v-if`
   Nếu như chúng ta muốn chỉ render ra từng block ở những điều kiện nhất định, khi đó chúng ta có thể sử dụng `v-if `để quản lý việc render
```javascript
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == false">
            This is block 1
        </div>
        <div class="block-2" v-if="isActive == true">
            This is block 2
        </div>
        <div>
            <button @click="toggleActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },
        methods: {
            toggleActive() {
                if(this.isActive == true) {
                    this.isActive = false
                }
                else {
                    this.isActive = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây block 1 chỉ được render khi isActive có giá trị false và ngược lại thì block 2 sẽ được render. Chúng ta tạo một button để toggle giá trị của isActive bằng cách mỗi lần click button thì sẽ gọi đến hàm toggleActive. (`@click` là cách viết tắt của `v-on:click`)

### `v-else`, `v-else-if`: 
Với ví dụ trên luồng xử lý của chúng ta có performance chưa tốt, vì mỗi lần component này render, đến block 1 nó sẽ kiểm tra giá trị isActive, sau đó đến block 2 nó lại kiểm tra giá trị isActive một lần nữa. Thay vì phải kiểm tra 2 lần như thế chúng ta có thể sử dụng v-else để Vue bỏ qua kiểm tra biểu thức còn lại nếu như một trong 2 biểu thức đã đúng, được mô tả như trong đoạn code sau:
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == false">
            This is block 1
        </div>
        <div class="block-2" v-else>
            This is block 2
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
### v-show
v-show thì cũng tương tự như v-if, các bạn muốn tìm hiều kỹ hơn thì vào trang chủ của [vue.js](https://vuejs.org/v2/guide/syntax.html#Directives) nhé

### v-for
Giúp các bạn có thể thực hiện nhiều công việc tương tự nhau chỉ với đoạn code gọn gàng hơn rất nhiều so với trước đây.
```html
<template>
    <div class="list-rendering">
        <ul>
            <li v-for="food in foods">{{ food.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                foods: [
                    { name: 'Hamburger' },
                    { name: 'Sandwich' },
                    { name: 'Chicken chop' },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Thay vì phải viết hẳn 3 thẻ li với 3 giá trị là 3 object trong mảng thì giờ đây Vue giúp chúng ta chỉ cần viết một lần.

# Vòng đời của Vue instance
![](https://images.viblo.asia/d4f2f42c-12cc-47c3-92be-ea192b9fafd2.png)
Mặc dù Vue cung cấp cho chúng ta khá nhiều hooks trong toàn bộ vòng đời của 1 component, nhưng thực tế thì chúng ta hầu như chỉ sử dụng một số hooks như sau:

- `created`: thường dùng để gọi API lấy dữ liệu từ server, khởi tạo websocket, lắng nghe event Laravel Echo,... miễn là ta không động gì vào DOM thật là được
- `mounted`: thường dùng khi ta muốn sử dụng JQuery hoặc truy vấn tới 1 phần tử HTML cụ thể, ví dụ: document.getElementById('id'),...
- `beforeDestroy`: thường dùng khi ta muốn huỷ lắng nghe các sự kiện: như sự kiện onscroll, hay các sự kiện lắng nghe socket.io, larave-echo,...

# Tổng kết
Bài viết đã khá dài rồi, còn rất nhiều kiến thức về Vue khác nữa, các bạn có thể lên trên trang chủ của vue.js để tìm hiều thêm nhé, cảm ơn các bạn đã theo dõi :heart_eyes:
Bài viết tham khảo của anh [Mai Trung Đức](https://viblo.asia/u/maitrungduc1410)