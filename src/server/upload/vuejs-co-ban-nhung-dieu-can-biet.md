### 1. Giới thiệu

Xin chào mọi người. Sau đây mình xin phép viết 1 bài về VueJS cơ bản. Mình sẽ đề cập đến những nội dung như VueJS là gì, nó có những đặc điểm nào, cú pháp và các đặc trưng cơ bản của VueJS.

![](https://images.viblo.asia/1d437492-d6dc-4f85-9955-194c150a2318.png)

##### VueJS là gì ?
Gọi tắt là **Vue**, là một framework linh động dùng để xây dựng giao diện người dùng. 

Khác với các framework nguyên khối (monolithic), **Vue** được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước.

Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

### 2. Một số kiến thức cơ bản về Vue

#### 2.1. Instance trong VueJS

##### Khởi tạo
Mỗi Instance hay là một đối tượng trong. Để khởi tạo một đối tượng trong Vue ta sử dụng cú pháp:
```
var vm = new Vue({
  // options
})
```
 Trong đó: **options** là nơi các bạn cấu hình các tùy chọn.
 ##### Constructor
Khi khởi tạo một instance Vue, bạn cần có options có thể chứa các tùy chọn cho data, template, element, methods, callback,...

**VD:** 
```
var app = new Vue({
    el: '#app',
    data: {
        message: 'Learn VueJS'
    },
    methods: {
        hello : function () {
            return 'Hello World'
        }
    }
});
```

##### Instance lifecycle hook

**Instance lifecycle hook** là một vòng đời hoạt động của **Vue**, khi **Vue** chạy đến một thời điểm nào đó trên vòng đời hoạt động thì sẽ có các scope event được gọi kèm theo đó, các scope event này đã được định tên sẵn và bạn không thể thay đổi name của nó mà chỉ có thể override nó thôi. 

![](https://images.viblo.asia/f4b1cced-2b49-44e9-8321-9da06bf372c5.png)


Trong **VueJS** có các event sau:

* **beforeCreate()** - được gọi khi chúng ta khởi tạo **Vue** và trước khi thực hiện tiến trình observe Data và init Events.
* **created()** - được gọi khi tiến trình **observe Data** và **init Events** hoàn thành.
* **beforeMount()** - được gọi ngay sau khi tiến trình render function hoàn tất.
* **mounted()** - được gọi khi tiến trình replace el hoàn tất.
* **beforeUpdate()** - được gọi khi data có sự thay đổi, và trước khi visualDOM re-rendered.
* **updated()** - được gọi khi data đã được thay đổi.
* **beforeUnmount()** - được gọi ngay trước khi vue instance được unmount().
* **unmounted()** - được gọi khi vue instance đã unmounted().

#### 2.2. Template Syntax trong VueJS

##### Interpolation.
**Intercalation** là một thuật ngữ trong Vue.js. Đây là quá trình thêm một văn bản, nội dung, attribute ,.. vào các thẻ HTML bằng Vue.js.

**Text**

Để **bind** một đoạn văn bản vào trong một tag HTML thì bạn sử dụng cú pháp sau:
```
    {{ avariable }}
 ```
 
Trong đó, avariable là tên thuộc tính mà chúng ta đã khai báo ở vue instance.

**VD**

```
<div id="app">
    <h1 class="text-red" style="text-align: center">{{ content }}</h1>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            content: 'Learn VueJS'
        },

    });
</script>
```
  
**Raw HTML**
Nếu như bạn muốn hiển thị dữ liệu ra dưới dạng append cả HTML code (như hàm html trong jquery hoặc innerHTML trong javascript) thì bạn có thể sử dụng cú pháp sau:
```
<tag v-html="data"></tag>
 ```
Trong đó:

**tag** là các tag trong HTML.
**data** là dữ liệu mà bạn muốn bind vào tag đó (dữ liệu này thường được khai báo trong data scope của vue.js).

**Attributes**
Để có thể thêm các attribute vào tag HTML bằng dữ liệu trong vue.js thì bạn sử dụng cú pháp sau:
```
<tag v-bind:attributeName="data"></tag>
```
Trong đó:

**attributeName** là tên của attribute mà bạn muốn thực hiện binding.
**data** là data mà bạn đã thiết lập trong vue.js.

**Using JavaScript Expressions**
Như mình đã có nói ở trên là chúng ta có thể sử dụng code javascript trong cặp dấu  {{}}, nhưng các bạn cần chú ý là chúng ta chỉ có thể sử dụng các scope đã được khai báo mặc định trong JavaScript thôi còn các biến hay object,.. mà người dùng tự định nghĩa thì sẽ không thể sử dụng được.

VD: Sử dụng các toán tử và câu lệnh điều kiện trong cặp dấu {{}}.
```
<div id="app">
    <p>Tuổi tiếp theo: {{ age + 1 }}</p>
    <p>Tuổi có là số chẵn: {{ age % 2 == 0 ? 'Chẵn' : 'Lẻ' }}</p>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            age : 22
        },
    });
</script>
```
###### Directives.
**Directives** trong **Vue** là các attribute được thiết lập bằng các tiền tố v-. Giá trị của các attribute này thường là các biểu thức javascript duy nhất, chỉ trừ v-for.

**VD**

```
<div id="app">
    <h1 v-if="publish" v-bind:class="className" v-bind:style="textCenter">Hello World</h1>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            className : "text-red",
            textCenter: "text-align: center",
            publish: true,
        },
    });
</script>
```

**Arguments**
Trong một số các **directives** nó sẽ cho phép các bạn truyền tham số vào. Để truyền tham số vào các **directive** này thì bạn chỉ cần ngăn giữa **directives** và tham số bằng dấu : .

**VD**: 

```
<div id="app">
    <img v-bind:>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            logoUrl : "https://images.com/upload/images/image.png"
        },
    });
</script>
```
Hoặc bạn cũng có thể thêm các event trên DOM bằng **directives** **v-on** trong Vue.

**VD**: Thêm sự kiện click vào button.

```
<div id="app">
    <p>Click button</p>
    <button v-on:click="showAlert">Click</button>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        methods: {
            showAlert : function () {
                alert('Hihihihi');
            }
        }
    });
</script>
```
**Modifiers**
**Directives** dạng này cho phép bạn định nghĩa một hành động đặc biệt khi thực hiện **directives** đó. Các modifiers này được ngăn cách với directives bởi dấu .

**VD**: Thêm sự kiên submit cho form và kèm theo đó là **preventDefault**.

```
<div id="app">
    <form action="https://viblo.asia" v-on:submit.prevent="submitForm">
        <input type="text" name="name" placeholder="Nhập tên">
        <input type="submit" value="Submit">
    </form>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        methods: {
            submitForm: function () {
                alert('Đã nhận được dữ liệu');
            }
        }
    });
</script>
```

Ở trong ví dụ trên, mình đã thêm sự kiện **onsubmit** cho form và đồng thời xác định modifier prevent cho form đó. **Modifier** này sau khi được render thì nó sẽ thành **event.preventDefault()**

##### Shorthands.
Tiền tố **v-** phục vụ như một trực quan để đánh dấu sử dụng **vue** so với các framework khá. Chính vì thế nên **vue** cũng có cung cấp cho chúng ta 2 cách viết ngắn gọn hơn với 2 dạng directive là **v-bind** và **v-on** như sau:

**v-bind**
```
<!-- cú pháp đầy đủ -->
<a v-bind:href="url"></a>
<!-- cú pháp viết tắt -->
<a :href="url"></a>
```
**v-on**
```
<!-- cú pháp đầy đủ -->
<a v-on:click="doSomething"></a>
<!-- cú pháp ngắn gọn -->
<a @click="doSomething"></a>
```
Tuy rằng, viết kiểu ngắn gọn như này nó hơi khác biệt hơn so với bình thường nhưng nhìn chung thì **@** và **:** đều là các ký tự hợp lệ khi đặt tên cho **atrribute** trong HTML và nó cũng được hỗ trợ bởi các trình duyệt. Và khi **Vue** render nó thì nó sẽ không hiển thị hai kí tự này ngoài trình duyệt.

#### 2.3. Methods

Như bạn đã thấy ở ví dụ form ở trên mình đã nhắc tới method vậy trong **Vue** chúng ta dùng như thế nào.

Để khởi tạo một function chúng ta chỉ cần thêm **methods** và viết function ở trong đó là được. Cụ thể:

```
const vm = new Vue({
    el: '#app',
    data() {
        return: {
            number: 0,
        },
        methods: {
            add(value) {
                this.number += value
            },
            subtract(value) {
                this.number -= value
            }
        }
    }
})

<p>{{ number }}</p>
<button @click="add(10)">Add</button>
<button @click="subtract(5)">Subtract</button>
```

Một khi chúng ta click vào button **Add** thì kết quả sẽ tăng  và ngược lại.

#### 2.4. Computed
**Computed properties.**
Để hiểu được về **computed** thì chúng ta làm thử 1 ví dụ trước:

```
 var vm = new Vue({
     el: '#app',
     data() {
         number: 0
     }, 
     methods: {
        add () {
           return this.number++
        }
     }
     computed: {
        add () {
           return this.number++
        }
     }
 })
```

Theo các bạn chúng ta sẽ sử dụng cái nào trong trường hợp trên khi **add** được gọi.

Để biết trường hợp nào được gọi thì chúng ta cần biết khi sử dụng **computed** thì chúng ta sẽ không có tham số đầu vào và khi gọi chúng ta chỉ cần gọi **add** mà không cần **add()**. Đó chính là điểm khác biết giữa computed và method khi sử dụng.

**Computed** có khả năng cache lại dữ liệu khi gọi function này lần đầu tiên để những lần tiếp theo nó sẽ lấy ra dữ liệu ở trong cache đã được xử lý qua computed còn method thì không.

**Computed** thường thực hiện với dữ liệu có trong **instance** để hạn chế việc tính toán và lấy dữ liệu ở trong cache.

#### 2.5. **Watcher**

**watcher** có thể hiểu là người theo dõi. Nó dùng để theo dõi sự thay đổi của dữ liệu của đối tượng. Chúng ta sẽ sử dụng **watcher** giống như **methods** và **computed**. 
Vd
```
const vm = new Vue({
    el: '#app',
    data() {
        return {
            count: 0
        },
        watch: {
            count(value) {
                this.count++
            }
        }
    }
})
```
Cả **methods**, **computed** , **watcher** đều có những ưu điểm riêng nhưng tùy vào mục đích sử dụng cụ thể mà chúng ta sẽ áp dụng chúng một cách tối ưu nhất.
#### 2.6.  Rendering
 ##### v-if
 Trong **Vue** chúng ta sử dụng **v-if** để thực hiện các render có liên quan đến điều kiện.
 ```
 <h1 v-if="check">Hello mọi người</h1>
```
Lúc này, nếu như giá trị bên trong **v-if** trả về là **true** thì sẽ được hiển thị và ngược lại, là false thì sẽ được ẩn. Điều này tương tự như cách hoạt động của câu lệnh **if else** bình thường chỉ có điều khác ở cách trình bày. Và đương nhiên bạn cũng có thể kết hợp với **v-else**.

```
<h1 v-if="show">Hello mọi người</h1>
<h1 v-else >Tạm biệt mọi người</h1>
```
##### v-show
Ngoài cách sử dụng **v-if** ở trên thì bạn cũng có thể sử dụng **v-show** với nguyên lý tương tự. Tức là giá trị bên trong **v-show** trả về **true** thì tag chứa nó sẽ hiển thị và ngược lại giá trị bên trong nó là **false** thì tag chứa nó sẽ ẩn.
```
<h1 v-show="show">Hello mọi người</h1>
```
Tuy nhiên thì các bạn có thể view source của ví dụ trên nên để thấy điều khác biệt giữa **v-if** và **v-show**. 
* Đối với trường hợp dữ liệu thay đổi nhiều trong một lần chạy thì bạn nên chọn **v-show** vì nó chỉ render lần đầu khi chạy.
* Còn đối với dữ liệu không thay đổi trong 1 lần chạy thì lên chọn **v-if** vì nó có tính chất private hơn.
##### v-for
Trong **Vue.js** chúng ta có thể sử dụng **v-for** để hiển thị ra các item có trong mảng với cú pháp

```
v-for="item in list"
```

Trong đó:

* item là biến được gán cho các item có trong mảng.
* list là mảng dữ liệu các bạn cần duyệt.

Mình sẽ render tất cả các name có trong mảng student của ví dụ sau.

```
<div id="app">
    <ul>
        <li v-for="item in people">{{ item }}</li>
    </ul>
</div>
<script  type="text/javascript"></script>
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            people: [
                'Nguyễn Văn A',
                'Nguyễn Văn B',
                'Nguyễn Văn C',
                'Nguyễn Văn D',
            ]
        }
    });
</script>
```

Nếu như bạn muốn lấy ra **index** của phần tử nữa thì bạn sử dụng cú pháp sau:

```
v-for="(item, index) in list"
```
##### Form Input Binding
Đối với việc lập trình web thì làm việc với form sẽ là việc thường xuyên được thực hiện. 
**v-model** dùng để rằng buộc dữ liệu với form. Khi nhập dữ liệu ô input thì nó sẽ được cập nhật vào thuộc tính cùng tên ở data của Vue.
```
const vm = new Vue({
    el: '#app',
    data() {
        message: ''
    }
})
```
```
<input v-model="message" placeholder="Input content">
```
##### Events:
Chúng ta có thể dùng directive **v-on** để lắng nghe các sự kiệnvà thực thi khi những sự kiện này được kích hoạt. 

Ví dụ:

```
<div id="example">
    <button v-on:click="counter += 1">Count</button>
    <p>{{ counter }}</p>
</div>

var example = new Vue({
    el: '#example',
    data: {
        counter: 0
    }
})
```

Ngoài click thì các bạn có thể tìm hiểu thêm về xử lý sự kiện khác.

### 3. Tổng kết
Qua các nội dung ở trên thì mình đã chia sẻ được một số điều cơ bản của **Vue**. Chúng ta có thể nắm được cách tạo một Vue instance, các cú pháp sử dụng, cách render dữ liệu. 

Rất mong bài viết này sẽ giúp ích được cho mọi người. Hẹn gặp lại mọi người trong những bài viết sau của mình.