# I. Giới thiệu
Vue.js là gì? Vue.js khác gì so với jQuery? Tôi có nên khoan hãy đụng đến jQuery nếu đã biết Vue.js? Có thể sử dụng Vue.js ngoài Laravel không? Nếu mới bắt đầu hoặc chỉ vừa mới học Vue.js, nhiều khả năng bạn sẽ gặp những thắc mắc tương tư hoặc bị rối về những trường hợp nên sử dụng Vue.js. Hy vọng bài viết này sẽ giải đáp thắc mắc của bạn, hiểu rõ hơn về framework đang khá nổi này, khi nào thì nên sử dụng và liệu có nên ngừng dùng jQuery vì Vue.js không.
# II. jQuery là gì
jQuery đã xuất hiện được hơn 10 năm và được sử dụng phổ biến, từ những dự án nhỏ, vui vui đến các công ty lớn tiêu tốn hàng triệu USD mỗi tháng.

jQuery (viết ít hơn, hiệu quả hơn) là 1 thư viện Javascript nhỏ, nhanh gọn, nhiều tính năng, hoạt động trên nhiều hệ điều hành và góp phần giúp quá trình viết vanilla Javascript dễ dàng hơn. jQuery hỗ trợ DOM/CSS manipulation, event handling, animation và tạo các truy vấn Ajax.

## 1. Nên dùng jQuery khi nào?
jQuery có thể được sử dụng trong nhiều trường hợp. Rất nhiều thư viện và plugins yêu cầu có jQuery, nhờ đó có thể làm được nhiều thứ đơn giản như chỉnh sửa giá trị của input hoặc lấy content cảu div để tạo các slideshows/ galleries và animations đẹp, ấn tượng.

Khi đã quen với việc viết code jQuery, bạn hoàn toàn có thể viết mọi thứ bằng Javascript bằng jQuery. Dưới đây là 1 số ví dụ cho thấy jQuery không khó:

Nếu muốn lấy giá trị của 1 input:
```php
$(‘#input-id’).val
```
Lưu ý: Không nhất thiết là ID của element, bạn có thể sử dụng tất cả các CSS selectors quen thuộc như:  tag name, class name, attribute, first-child, last-child.

Thêm 1 class vào 1 element
```php
$(‘#element-id’).addClass(‘some-class’);
```
Submit 1 truy vấn get đến API:
```php
$.get(‘http://your-site.com/api/endpoint’, function(data){
    console.log(data);
});
```
Bạn có thể dễ dàng nhận ra: so với sử dụng vanilla Javascript, thì việc manipulate DOM hoặc tạo Ajax calls sử dụng jQuery rất dễ.

Chính vì vậy mà nhiều dev còn quên luôn cách viết code với vanilla Javascript. Bạn có thể tham khảo hình dưới:

![](https://images.viblo.asia/efd42486-b149-4ad5-96a1-33519d51c001.gif)
## 2. Cài đặt
Bạn có thể sử dụng jQuery bằng cách tham chiếu CDN như bên dưới:
```php
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
```
Hoặc có thể cài đặt bằng NPM:
```php
$ npm install jquery
```
# III. Vue.js là gì?
Khác với jQuery, Vue.js là 1 framework MVC – được truyền cảm hứng bởi Angular. Trên thực tế, người sáng lập Evan You đã khởi tạo dự án này sau khi làm Angular cho Google. Ông quyết định trích những ưu điểm về Angular và tạo ra 1 framework nhẹ, dễ học, dễ sử dụng. Vue ra mắt vào tháng 2/2014 và được cộng đồng Laravel ủng hộ mạnh mẽ. Khi tôi viết bài này, Vue đã có 4,933,779 NPM lượt tải và 65,422 Github Stars.

## 1. Nên dùng Vue.js khi nào?
Vue phù hợp với các dự án nhỏ như chỉ cần thêm 1 ít reactivitity, submit form với AJAX, hiển thị cho user 1 modal, hiển thị giá trị của 1 input khi user đang gõ.. Vuejs scalable và cũng là lựa chọn tuyệt hảo cho dự án lớn. Chính vì vậy mà Vue.js được gọi là progressive framework.

Bạn có thể tìm thấy 1 số code mẫu trong documentation chính thức với nhiều ngôn ngữ khác nhau.

* [GitHub Commits](https://vuejs.org/v2/examples/commits.html)
* [Todo App](https://vuejs.org/v2/examples/todomvc.html)
* [Model Component](https://vuejs.org/v2/examples/modal.html)
* [Elastic Header](https://vuejs.org/v2/examples/elastic-header.html)

[.. Xem thêm các ví dụ tại đây.](https://vuejs.org/v2/examples/index.html)

Nhờ vào các core component Router and Vuex, Vue được thiết kế gần như hoàn hảo dành cho các ứng dụng single app lớn. Chúng ta có thể giải quyết nhiều vấn đề nâng cao (Components, Filters, Router, Events, Vuex… ) của framework sau đó trên Scoth.io này. Nếu bạn thích nghiên cứu code của những người khác thì tôi đề xuất ví dụ này: HackerNews Clone.
## 2. Cài đặt
Bạn có thể sử dụng Vue bằng cách tham chiếu đơn giản CDN như thế này:
```php
<script src="https://unpkg.com/vue"></script>
```
Hoặc cài đặt qua NPM:
```php
$ npm install vue
```

# IV Examples
Trong phần này, chúng ta sẽ đi qua nhiều ví dụ về cách thực hiện các tasks khó với jQuery và Vue.js:

## 1 Events
Nhận tín hiệu khi có 1 element được click vào:

jQuery: https://jsfiddle.net/4x445r2r/
```php
<button id="button">Click me!</button>
```
```php
(function() {
    $('#button').click(function() {
        alert('Clicked!');
    });
})();
```

Vue: https://jsfiddle.net/jwfqtutc/
```php
<div id="app">
  <button @click="doSomething">Click me!</button>
</div>
```
```php
new Vue({
    el: '#app',

    methods: {
        doSomething() {
            alert('Clicked!');
        }
    }
});
```

Nhận tín hiệu khi có 1 input thay đổi:

jQuery: https://jsfiddle.net/5zdcLdLy/
```php
<input id="input" type="text" placeholder="Enter your name">
```
```php
(function() {
    $('#input').change(function() {
        alert('Hello '+ $(this).val());
    });
})();
```

Vue: https://jsfiddle.net/as65e4nt/

```php
<div id="app">
  <input @change="doSomething" v-model="name" type="text" placeholder="Enter your name">
</div>
```

```php
new Vue({
    el: '#app',

    data: {
        name: ''
    },

    methods: {
        doSomething() {
        alert('Hello '+ this.name);
    }
    }
});
```
## 2. Binding classes
jQuery: https://jsfiddle.net/o65nvke2/
```php
<div id="content">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, modi. Similique amet aliquam magni obcaecati placeat, iusto ipsum enim, perferendis earum modi debitis praesentium, consequatur dolor soluta deserunt. Saepe, laborum.
</div>
```
```php
(function() {
    var className = 'red-text';

    $('#content').addClass(className);
})();
```

Vue: https://jsfiddle.net/a203pyqf/
```php
<div id="app">
  <div id="content" :class="className">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, modi. Similique amet aliquam magni obcaecati placeat, iusto ipsum enim, perferendis earum modi debitis praesentium, consequatur dolor soluta deserunt. Saepe, laborum.
  </div>
</div>
```
```php
new Vue({
    el: '#app',

    data: {
        className: 'red-text'
    }
});
```

## 3. Toggle khả năng hiển thị của 1 element
jQuery: https://jsfiddle.net/4LcL5pco/
```php
<div id="content">
  BooHoo!
</div>

<button id="button">Toogle</button>
```
```php
(function() {

    $('#button').click(function() {
        $('#content').toggle();
    });

})();
```
Vue: https://jsfiddle.net/a8xoaoqy/
```php
<div id="app">
  <div id="content" v-if="visible">
    BooHoo!
  </div>

  <button @click="visible = !visible">Toogle</button>
</div>
```
```php
new Vue({

    el: '#app',

    data: {
        visible: true
    }

});
```
## 4. Xây dựng 1 select input từ 1 array
jQuery: https://jsfiddle.net/9f4pcakt/
```php
<span>Social Networks:</span>

<select id="networks"></select>
```
```php
(function() {

    var socialNetworks = ['Facebook', 'Twitter', 'YouTube', 'Instagram', 'LinkedIn'];
    var list;

    $.each(socialNetworks, function (index, value) {
        list += `<option value="${index}">${value}</option>`;
    });

    $('#networks').html(list);

})();
```
Vue: https://jsfiddle.net/gktr062m/
```php
<div id="app">
  <span>Social Networks:</span>

  <select id="networks">
    <option v-for="(network, index) in socialNetworks" :value="index">{{ network }}</option>
  </select>
</div>
```
```php
new Vue({

    el: '#app',

    data: {
        socialNetworks: ['Facebook', 'Twitter', 'YouTube', 'Instagram', 'LinkedIn']
    }

});
```
## 5. Tạo các truy vấn Ajax
jQuery: https://jsfiddle.net/t3qef00y/
```php
<span>List of users:</span>

<ul id="users"></ul>
```
```php
(function() {

  var list = '';

    $.get('https://reqres.in/api/users', function(response) {

        $.each(response.data, function (index, user) {
            list += `<li>${user.first_name}</li>`;
        });

        $('#users').html(list);

  });

})();
```
Vue: https://jsfiddle.net/gbjthb3q/

Bạn không thể tạo các AJAX calls với chính Vue, nhưng team đã ra mắt 1 package tương ứng: GitHub – pagekit/vue-resource: The HTTP client for Vue.js
```php
<div id="app">
<span>List of users:</span>

  <ul id="users">
    <li v-for="user in users">{{ user.first_name }}</li>
  </ul>
</div>
```
```php
new Vue({

    el: '#app',

    data: {
        users: null
    },

    mounted: function() {
        this.$http.get('https://reqres.in/api/users').then(response => {
            this.users = response.body.data;
        });
    }

});
```

# V. Tổng kết
Sau khi đọc bài này, hy vọng bạn đã rõ về sự khác nhau giữa jQuery và Vue, ưu điểm cũng như những trường hợp nào nên sử dụng jQuery hoặc Vue.

link bài viết: https://scotch.io/bar-talk/vuejs-vs-jquery-use-cases-and-comparison-with-examples