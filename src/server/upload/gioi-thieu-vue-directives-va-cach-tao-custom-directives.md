Khi nói đến VueJS, chúng ta thường chỉ nói đến Component, cách tạo và import component,...Thế nhưng Component không phải là thứ tuyệt vời duy nhất bạn có thể làm với Vue. Trong trường hợp nếu bạn muốn áp dụng một vài chỉnh sửa cho các component của mình, một vài thuộc tính cho các component của mình,...đó là khi Vue Directives được nhắc tới. 

Vue Directives là một đoạn lệnh nhỏ mà các bạn có thể chèn chúng vào các phần tử DOM. Tên của các đoạn lệnh đó được bắt đầu bằng tiền tố `v-` dùng để Vue có thể biết được rằng bạn đang sử dụng một chút đánh dấu đặc biệt và để cho cú pháp được nhất quán. Chắc bạn đã quen dùng với một số Directives như `v-model`, `v-for`, `v-if`. Hôm nay mình sẽ hướng dẫn các bạn cách để tạo ra các Directives của riêng mình, phục vụ cho các mục đích khác nhau của dự án.

# Hiểu rõ về Vue Directives
Trong bài này chúng ta sẽ áp dụng Vue Directives cho sự kiện `scroll` khi người dùng lăn chuột trên màn hình từ trên xuống dưới nhé.

Đầu tiên chúng ta cùng tạo một `directives` đơn giản, đặt tên là `scroll` nhé:
```vue
Vue.directive('scroll');
```

Và để sử dụng các bạn có thể gắn chúng vào các element trong DOM chúng ta chỉ cần làm như sau:
``` html
<div v-scroll></div>
```
Có một số sự kiện Vue cung cấp khi sử dụng `directives` như sau: 
* **bind**: được gọi khi `directives` được gắn vào element.
* **inserted**: được gọi khi component hoặc element có `directives` được insert vào node cha của chúng. Nhưng có thể vẫn chưa được đưa vào trong DOM.
* **updated**: được gọi khi các thành phần của component/element có `directives` đã được cập nhật, nhưng nhiều khả năng là sẽ xảy ra trước khi các component/element con của chúng.
* **componentUpdated**: được gọi khi các thành phần của component/element có `directives` và con của chúng đã được cập nhật.
* **unbind**: được gọi khi `directives` bị huỷ bỏ.

![](https://images.viblo.asia/01da3893-8a19-4016-9f4a-4f46d624198e.png)

# Tự tạo Custom Directives
Bây giờ chúng ta sẽ cùng nhau tạo custom directives nhé. Ta tạo một `directives` global như sau, các bạn có thể viết đoạn code dưới đây vào file mà các bạn khai báo sử dụng vue (như Laravel là `resources/assets/js/app.js, các frameworks khác tương tự nhé)`:
```vue
Vue.directive('scroll', {
    bind(el, binding, vnode) {
        el.style.position = 'fixed'
    }
});
```
Sau đó chúng ta gắn `directives` này vào phần tử mong muốn.
```html
<p v-scroll>I will now be tacked onto the page</p>
```
Các bạn có thể thấy khi lăn chuột trên màn hình thì dòng text bên trên được đã được fixed sau khi thêm `directives: v-scoll`.
Sau đây chúng ta sẽ thay đổi code một chút để có thể truyền data vào `directives`, mục đích ở đây là truyền khoảng cách từ đoạn text bên trên lên phần `top` của cửa sổ trình duyệt.
```vue
Vue.directive('scroll', {
    bind(el, binding, vnode) {
        el.style.position = 'fixed'
        el.style.top = binding.value + 'px'
    }
});
```
Sau đó chúng ta sửa lại phần gắn `v-scroll` ở element nhé:
```html
<p v-scroll="70">Stick me 70px from the top of the page</p>
```
Và đây là kết quả( các bạn có thể sửa `70` thành giá trị nào đó bạn thích và chờ xem kết quả nhé)
{@codepen: https://codepen.io/maitrungduc1410/pen/jxKRXX}

Như các bạn thấy phần tử `p` sau khi được gắn `directives` thì có vị trí đã được `fixed` với top là 70px.

Bên trên chúng ta mới chỉ set được `fixed top` cho element, nếu chúng ta muốn thêm một option nữa là `fixed left` thì làm thế nào được nhỉ?
Đừng lo, chúng ta chỉ cần sửa code một chút thôi:
```vue
Vue.directive('scroll', {
    bind(el, binding, vnode) {
        el.style.position = 'fixed';
        const s = (binding.arg == 'left' ? 'left' : 'top');
        el.style[s] = binding.value + 'px';
    }
});
```
Sau đó sửa lại ở element HTML
```html
<p v-scroll:left="70">I'll now be offset from the left instead of the top</p>
```

Cùng xem kết quả thế nào nhé:
{@codepen: https://codepen.io/maitrungduc1410/pen/MGXdrK}
Bạn thử thay đổi từ `left` thành `top` và xem kết quả ra sao? :)

Bạn cũng có thể truyền nhiều hơn một giá trị vào `directives` bằng cách làm như sau:

`HTML Element`
```html
<p v-scroll="{ top: '40', left: '100' }">Stick me 40px from the top of the page and 100px from the left of the page</p>
```
Và sửa lại một chút code `Vue`
```vue
Vue.directive('scroll', {
    bind(el, binding, vnode) {
        el.style.position = 'fixed';
        el.style.top = binding.value.top + 'px';
        el.style.left = binding.value.left + 'px';
    }
}); 
```
Các bạn có thể xem kết quả và thử thay đổi một vài thứ xem sao nhé:
{@codepen: https://codepen.io/maitrungduc1410/pen/BxVePe}

Sau đây chúng ta cùng thử một chút phức tạp hơn với `directives` nhé. Chúng ta sẽ truyền một `function` vào `directives` và xử lý nhé.
```vue
Vue.directive("scroll", {
    inserted: function(el, binding) {
        let f = function(evt) {
            if (binding.value(evt, el)) {
                alert('Hello')
            }
        };
        window.addEventListener("scroll", f);
    }
});

// main app
new Vue({
    el: "#app",
    methods: {
        handleScroll: function(evt, el) {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if(scrollTop == 800) {
                return true
            }
            return false;
        }
    }
});
```

and code for HTML element
```html
<div class="box" v-scroll="handleScroll">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A atque amet harum aut ab veritatis earum porro praesentium ut corporis. Quasi provident dolorem officia iure fugiat, eius mollitia sequi quisquam.</p>
</div>
```

Ở đây chúng ta kiểm tra khi nào scroll cửa số đến 800px tính từ `top` thì `alert('Hello')`.

Qua bài này mình mong rằng các bạn có thể hiểu hơn về `Vue Directives` từ đó vận dụng nó một cách linh hoạt phục vụ cho mục đích riêng của các bạn.
Cám ơn các bạn đã dành thời gian đọc bài của mình, nếu có gì thắc mắc các bạn cứ comment nhiệt tình nhé.
Bài post của mình có sử dụng một số tư liệu lấy từ: 

[The Power of Custom Directives in Vue](https://css-tricks.com/power-custom-directives-vue/)

[Writing Custom Vue.js Directives](https://alligator.io/vuejs/custom-directives/)