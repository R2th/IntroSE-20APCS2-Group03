Chào mọi người hôm nay mình lại đến tháng đây.

Hôm nay mình sẽ chia sẻ với mọi người về component trong Vue js nhé :) 
Như chúng ta đã biết trong lập trình việc lặp đi lặp lại 1 đoạn code gây ra nhiều rắc rồi như tăng thời gian viết code, khó sử dụng lại, khi có thay đổi gì là lại phải sửa ở tất cả mọi nới có code lặp lại. Như thế rất khó chịu đúng không.
Nhưng đến với Vue Js nó đã cũng cấp cho chúng ta 1 khái niệm mới đó là Component giúp cho code được cấu trúc thành phần cơ bản

Và nó đưa code chúng ta theo hướng module hoá nghĩa là tất cả những đoạn code liên quan đến 1 đối tượng nào đấy sẽ được tập trung lại 1 chỗ. Ví dụ như bạn tạo 1 danh sách sản phẩn thì có phần list, create, edit, và delete vậy. Như bình thường chúng ta sẽ viết tất cả html vào 1 file, rồi js cũng viết tất cả xử lý vào 1 file đúng không. Đến khi sửa lỗi thì sao nhỉ, Lúc đấy mới biết code chúng ta thối như thế nào.

Nhưng đến với Vue js Component thì mọi thứ đã được xử lý và tổ chức 1 cách rất hợp lý rồi nhé
![](https://images.viblo.asia/fe698606-d7aa-430e-b05f-cf200895b2d8.png)
Đấu tiên chúng ta đến với phần đầu tiên nhé
# Tạo và đăng ký component
Để đăng ký 1 component thì chúng ta dùng phương thức toàn cục Vue.component().
Js ta khi báo 1 component có tên là tdc-component và template của nó là 1 thẻ h1 có nội dung là 'Chào mừng bạn đến với Vue Js'

```javascript
 Vue.component('tdc-component',{
        template: '<h1>Chào mừng bạn đến với VUE JS</h1>'
    });
    var app = new Vue({
        el: '#app',
    });
```
Sau đó trong file html ta chỉ cần gọi đến component đấy là mọi thứ đã được giải quyết
```html
<div id="app">
    <tdc-component></tdc-component>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
```

và kết quả nó sẽ như thế này 

[Kết quả](https://jsfiddle.net/tranvanmy/ngr2sbwc/)

Đăng ký 1 Component rất dễ đúng không, chỉ có vài dòng là chúng ta đã có thể tạo được rồi . Nhưng chúng ta hãy đi sâu 1 tý về component và cách hoạt động của nó nhé.
![](https://images.viblo.asia/151de27a-5cef-4c21-8793-a97afd67b2eb.jpg)

Trước khi trở lại phương thức Vue.component() chúng ta cùng tìm hiểu về Vue.extend(). Vue.extend() được sử dụng để tạo ra các “lớp con” (subclass) của contructor của Vue với tham số đầu vào là một đối tượng chứa các tùy chọn của component. 
```html
<body>
    <div id="mount-point"></div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        // Tạo constructor
        var Profile = Vue.extend({
            template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
            data: function () {
                return {
                    firstName: 'Walter',
                    lastName: 'White',
                    alias: 'Heisenberg'
                }
            }
        })
        // Tạo Profile instance và mount nó với thành phần có id là #mount-point
        new Profile().$mount('#mount-point')
    </script>
</body>
```

Tại sao phải nhắc đến Vue.extend() vì bản chất việc tạo và đăng ký component là đầu tiên tạo ra một contructor lớp con của Vue bằng Vue.extend(), sau đó sử dụng phương thức toàn cục Vue.component() để đăng ký phương thức khởi tạo này. Ví dụ bên trên có thể được viết lại như sau:
```html
<body>
    <div class="container" id="app">
        <button-counter></button-counter>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
    <script type="text/javascript">
        var ButtonCounter = Vue.extend({
            data: function () {
                return {
                    count: 0
                }
            },
            template: '<button class="btn btn-success" v-on:click="count++">Bạn đã nhấn {{ count }} lần.</button>'
        })
        Vue.component('button-counter', ButtonCounter)
        new Vue({
            el: '#app'
        });
    </script>
</body>
```
> Chúng ta bàn về sự khác nhau giữa Vue.extend() và Vue.component(). Vue tự bản thân nó là một contructor, Vue.extend() là một lớp kế thừa phương thức (class inheritance method), nhiệm vụ của nó là tạo ra một subclass của Vue. Vue.component() thì khác, nó là một phương thức đăng ký thuộc tính giống như Vue.directive(), Vue.filter(), nhiệm vụ của nó là gắn kết một contructor với một chuỗi id mà Vue.js sử dụng để đưa template này vào khi render.
> 

![](https://images.viblo.asia/cf3e8094-8292-48bd-a153-58c0f8be56c9.jpg)
# Khai báo template trong mã HTML
Với cách tạo một component bằng Vue.component() ở trên, chúng ta khai báo template trong tùy chọn template. Đây là một chuỗi, vậy nếu template này tương đối phức tạp thì sao chẳng lẽ cũng lại tống hết vào một chuỗi duy nhất, chưa kể là code không được định dạng thò ra thụt vào sẽ rất khó đọc cũng như debug lỗi sau này. Vue.js cho phép khai báo template này với một thẻ đặc biệt là thẻ <template>
```javascript
  Vue.component('button-counter',{
            data: function () {
                return {
                    count: 0
                }
            },
            template: '#button-template'
        })
        new Vue({
            el: '#app'
        });
 ```
 Html
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <template id="button-template">
        <div>
            <h1>Ví dụ 1 về component trong Vue.js</h1>
            <button class="btn btn-success" v-on:click="count++">Bạn đã nhấn {{ count }} lần.</button>
        </div>
    </template>
    <div class="container" id="app">
        <button-counter></button-counter>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</body>
```
Và kết quả là: [Kết quả](https://jsfiddle.net/tranvanmy/nmytb5jp/6/)
# Đăng ký component toàn cục và cục bộ
## Đăng ký toàn cục
Khi bạn đăng ký component bằng phương thức Vue.component() thì các component này được đăng ký toàn cục (globally registered), nghĩa là chúng có thể được sử dụng ở bất kỳ đầu trong Vue instance gốc được tạo ra bằng câu lệnh new Vue.
```javascript
 Vue.component('a-component', {
    components: {
    'bcomponent': bcomponent,
    },
    template: `<h1>TRAN VANfdfd A</h1>
        <bcomponent></bcomponent>
      `
    });
 var bcomponent = Vue.component('b-component',{
        template: '<h1>TRAN VAN fdB</h1>'
    });
 Vue.component('c-component',{
        template: '<h1>TRAN VAN C</h1>'
    });
var app = new Vue({
        el: '#app',
    });
```
Html
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <h1>  ĐĂNG KÝ TOÀN CỤC</h1>
        <a-component></a-component>
        <b-component></b-component>
        <c-component></c-component>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</body>
</html>
```
## Đăng ký cục bộ
Đăng ký toàn cục gặp phải một vấn đề khi sử dụng với các hệ thống build code như Webpack, các component toàn cục vẫn được đóng gói vào phiên bản cuối cùng mặc dù có thể nó không được gọi đến, việc này làm cho dung lượng ứng dụng không được tối ưu do có dư thừa code Javascript. Trong trường hợp này, chúng ta cần định nghĩa các component ở dạng các đối tượng đơn thuần trong Javascript:
```javacript
 var acomponent = Vue.component('a-component', {
    template: `<h1>TRAN VAN A</h1>
        <bcomponent></bcomponent>
      `
    });
 var bcomponent = Vue.component('b-component',{
        template: '<h1>TRAN VAN B</h1>'
    });
 var ccomponent = Vue.component('c-component',{
        template: '<h1>TRAN VAN C</h1>'
    });
var app = new Vue({
        el: '#app',
        components: {
          'a-component': acomponent,
          'b-component': bcomponent
        }
    });
```
Html
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
    <div class="container" id="app">
        <h1>  ĐĂNG KÝ CỤC BỘ</h1>
        <a-component></a-component>
        <b-component></b-component>
        <c-component></c-component>
    </div>
    <script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
</body>
</html>
```
KẾT LUẬN
Phần này mình chỉ giới thiệu có bản về component và cách triển khai nó nhé. Cái gì cũng phải học từ từ thì mới ngấm được.
Các bạn theo dõi mình để tiếp tục phần 2 nâng cao về component nhé