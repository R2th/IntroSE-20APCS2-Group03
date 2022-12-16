Xin chào các bạn, như chúng ta đã biết thì hiện nay Vue.js là một trong những framework JavaScript tốt nhất và hôm nay chúng ta cùng tìm hiểu về xử lý sự kiện trên DOM bằng Vuejs. Bắt đầu nào!!!

# 1. Listen to Events.
Trong Vue.js chúng ta có thể dùng directive `v-on` để lắng nghe các sự kiện DOM và thực thi JavaScript khi những sự kiện này được kích hoạt. Mình sẽ làm các ví dụ của bài viết trên https://jsfiddle.net/ 

Ví dụ: Lắng nghe sự kiện click trên DOM.
```
<div id="app">
    <button v-on:click="counter += 1">Click</button>
    <p>Bạn vừa click vào button lần thứ {{ counter }}</p>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        }
    });
</script>
```

Kết quả: Khi ta click vào button thì kết quả sẽ được tăng lên

![](https://images.viblo.asia/2d3ff3f3-903c-430b-a69b-a2431c9516e2.png)

`v-on:click` trong đoạn code phía trên tương đương với `onClick` attribute trên HTML tag.
# 2. Method Event Handlers
Thông thường ở các bài toán thực tế thì code xử lý sự kiện sẽ không đơn giản là một dòng như trên, mà nó sẽ rất phức tạp. Chính vì thế nên Vue.js cũng hỗ trợ chúng ta tách phần code xử lý vào hàm và gọi hàm đó ở trên sự kiện như javascript thuần.

Ví dụ:
```
<div id="app">
    <!-- `greet` là tên của phương thức bạn muốn gọi -->
    <button v-on:click="greet">Chào mừng</button>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            name: 'Vue.js'
        },
        // định nghĩa phương thức trong object `methods`
        methods: {
            greet: function (event) {
                    // bên trong một phương thức, `this` trỏ đến đối tượng Vue
                    alert('Xin chào ' + this.name + '!')
                    // `event` là sự kiện DOM native
                if (event) {
                    alert(event.target.tagName)
                }
            }
        }
    });
</script>
```

Và bạn cũng có thể chuyền thêm tham số vào hàm khi gọi chúng ở DOM (như javascript thuần).
```
<div id="app">
    <button v-on:click="say('Hello')">Hãy nói Hello</button>
    <button v-on:click="say('Viettel')">Hãy nói theo cách của bạn</button>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        methods: {
            say: function (message) {
                alert(message)
            }
        }
    });
</script>
```

Và nếu như bạn muốn sử dụng các thông số mặc định của sự kiện thì trong Vue.js cũng hỗ trợ bạn luôn, bằng cách các bạn truyền thêm vào hàm biến `$event`.
```
<div id="app">
    <button v-on:click="warn('Chưa submit được form', $event)">
        Submit
    </button>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        methods: {
            warn: function (message, event) {
                // bây giờ chúng ta có thể truy xuất đến sự kiện DOM native
                if (event) event.preventDefault()
                alert(message  + '!');
            }
        }
    });
</script>
```
Còn nếu như bạn nào chưa biết trong tham số `event` này chứa gì thì có thể console.log nó ra để xem.
# 3. Event Modifiers
Trong javascript thuần các bạn thường sử dụng các event modifiles để tác động đến cách xử lý của sự kiện như: `event.preventDefault()`, `event.stopPropagation()`,... Và những cách này bạn vẫn có thể sử dụng được đối với Vue.js, nhưng ngoài cách đó thì Vue.js còn hỗ trợ chúng ta khai báo nó ngay ở trên directive bằng cách thêm chúng vào đằng sau directive và ngăn cách giữa chúng bằng dấu chấm.

Ví dụ:

```
<div id="app">
    <form action="" v-on:submit.prevent="warn">
        <input type="text" placeholder="nhập vào tên...">
        <button type="submit">Click</button>
    </form>
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        },
        methods: {
            warn: function () {
                alert('Bạn vừa thực hiện submit form, nhưng đã bị prevent');
            }
        }
    });
</script>
```

Và dưới đây là danh sách các modifier được hỗ trợ:

`.stop`

`.prevent`

`.capture`

`.self`

`.once`

# 4. Key Modifiers
Đối với javascript thông thường thì khi muốn bắt sự nhấn phím của một phím nào đó thì chúng ta cần phải biết được mã code của phím đó rồi đem đi so sánh. Và trong Vue.js chúng ta cũng có thể sử dụng như thế, nhưng ngoài ra thì nó còn hỗ trợ chúng ta khai báo luôn sự kiện nhấn phím luôn khi khai báo directive. Bằng cách thêm mã code của phím đó vào sau directive `v-on:keyup` và ngăn cách giữa chúng bời dấu chấm.

Ví dụ: Bắt sự kiện nhấn phím enter.
```
<div id="app">
    <input type="text" v-on:keyup.13="warn">
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        },
        methods: {
            warn: function () {
                alert('Bạn vừa ấn phím enter');
            }
        }
    });
</script>
```

Nhưng để nhớ được hết mã code của từng phím thì không phải là điều đơn giản, nên Vue.js đã thêm sẵn cho chúng ta các phím hay dùng thay thế cho key của các phím đó.

Và đây là danh sách các phím mà Vue.js đã thêm sẵn cho chúng ta:

`.enter`

`.tab`

`.delete` (Phím này dùng được cho cả phím delete và backspace)

`.esc`

`.space`

`.up`

`.down`

`.left`

`.right`

`.ctrl`

`.alt`

`.shift`

`.meta` (Trên bàn phím window thì nó là phím window, còn trên bàn phím mac thì nó là phím command).

Ví dụ: Thay thế keycode của phím enter ở ví dụ trên bằng key mà Vue.js đã hỗ trợ sẵn.
```
<div id="app">
    <input type="text" v-on:keyup.enter="warn">
</div>
<script src="https://unpkg.com/vue@2.4.2" type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            counter: 0,
        },
        methods: {
            warn: function () {
                alert('Bạn vừa ấn phím enter');
            }
        }
    });
</script>
```
Và Vue.js cũng cho phép các bạn định nghĩa thêm các key Code mới thông qua `config.keyCodes`.

Ví dụ:
  ```
  Vue.config.keyCodes.f1 = 112;
  ```
# 5. Why Listener in HTML
Vue.js hoặt động theo mô hình ViewModel và nó ràng buộc rất chặt chẽ các hàm này nên bạn hoàn toàn có thể yên tâm khi lắng nghe sự kiện ở trên HTML mà không hề ảnh hưởng đến nguyên lý `"separation of concerns"` và nó cũng không hề gây khó khăn gì cho việc bảo trì. Mà ngược lại thì chúng ta sẽ có được rất nhiều lợi ích khi sử dụng `v-on` trên HTML, như:

* Dễ dàng hơn trong việc xác định vị trí gọi hàm xử lý sự kiên bằng cách lướt qua các template HTML.
* Vì không phải attach các hàm xử lý sự kiện trong code JS, mà được vào mô hình ViewModel nên code của bạn sẽ logic, trong sáng và dễ test hơn.
* Và khi một ViewModel được destroy thì tất cả các hàm xử lý sự kiện cũng bị loại bỏ luôn, nên bạn sẽ không phải lo nghĩ về việc bỏ sót 1 event nào.
# 6. Kết Luận
Vue.js quả thật hỗ trợ chúng ta rất mạnh về event và để sử dụng cũng như tiếp cận nó cũng đơn giản và dễ dàng, chúc các bạn học tập thật tốt. Hẹn gặp lại các bạn ở các bài viết tiếp theo.

Tham khảo:

* https://vi.vuejs.org/v2/guide/events.html
* https://alligator.io/vuejs/events/