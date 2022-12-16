# Lời mở đầu
Mình cũng không dài dòng nữa, trong [bài viết trước](https://viblo.asia/p/vuejs-la-gi-cai-dat-nhu-the-nao-RQqKLYerZ7z), chúng ta đã tìm hiểu khái niệm về VueJS và cách cài đặt nó thì hôm nay chúng ta sẽ cùng đi tìm hiểu **instance** và **template syntax** ở trong vue.

# Nội dung
## Vue Instance Lifecycle:
### Khởi tạo Vue Instance:
Trong [tài liệu tiếng Việt](https://vi.vuejs.org/v2/guide/instance.html), instance được dịch là "đối tượng" thay vì gọi là "thể hiện", có vẻ hơi khác với nhiều tài liệu chúng ta đã từng quen. Và trong ví dụ dưới đây, thì app là một instance còn Vue là object :
```javascript
var app = new Vue({
    // các tùy chọn 
})
```

Và khi làm việc với VueJS, chắc chắn ta sẽ cần khởi tạo một Vue Instance thường bao gồm các thông tin:
- data: dữ liệu truyền vào 
- methods: phương thức xử lí
```javascript
<script type="text/javascript">
    var app = new Vue({
        el: '#app',
        data: {
            message: 'hello world'
        },
        methods: {
            initialVue : function () {
                return this.message;
            }
        }
    });
</script>
```
### Methods trong Vue Instance:
**Methods** là một trong những thuộc tính cơ bản của Vue Instance và là thuộc tính được sử dụng nhiều nhất. Việc sử dụng các method trong VueJS giúp tạo ra các function Javascript (trong Javascript **function** và **procedure** là một và là **function**). Trong Vue Instance có thể khai báo nhiều phương thức trong thuộc tính **methods**.
- Ví dụ:
```html
<template>
    <div id="app">
        <p>Click A {{ clickA() }} times</p>
        <p>Click B {{ clickB() }} times</p>
        <button v-on:click="a++">Click A</button>
        <button v-on:click="b++">Click B</button>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            a: 0,
            b: 0
        }
    },
    methods: {
        clickA: function () {
            console.log('gọi method clickA')
            return this.a
        },
        clickB: function () {
            console.log('gọi method clickB')
            return this.b
        }
    }
}
</script>
```
Kết quả: 
![](https://images.viblo.asia/e131c4e5-4629-4800-a6a3-d5f7e196e8f1.gif)

Như bạn có thể thấy, dù chỉ click vào 1 button nhưng ở console.log vẫn trả ra cả 2 `gọi method clickA` và `gọi method clickB`. Bạn có thấy nó hơi dư thừa không, khi mà mình chỉ gọi đến một function mà nó vẫn chạy lại cả methods. Liệu có cách nào "tiết kiệm" xử lí hơn không?

Câu trả lời là có, và mình sẽ đề cập đến nó trong bài viết sau, hãy đón đọc nhé.


### Lifecycle Hook:
Sau khi được khởi tạo, một đối tượng Vue sẽ trải qua một số bước như quan sát dữ liệu (data observation), biên dịch template, gắn kết vào DOM, cập nhật DOM khi thay đổi dữ liệu. Và **lifecycle hook** giúp chúng ta có thể thêm các function xử lí vào các giai đoạn cụ thể. 

Sơ đồ vòng đời trong Vue:
![](https://images.viblo.asia/92d2a77c-6efb-47c9-94a8-7b610877f573.png)

Như trong sơ đồ trên, ta thấy có các giai đoạn create, mount, update, destroy thì Vue cũng cung cấp các hàm lifecycle hook tương ứng: 
- **beforeCreate**, 
- **created**, 
- **beforeMount**, 
- **mounted**, 
- **beforeUpdate**, 
- **updated**, 
- **beforeDestroy**, 
- **destroyed**, ...
```javascript
var app = new Vue({
  data: {
    //data
  },
  created: function () {
    // function 
  }
})
```


## Vue Template:
Ở trên chúng ta đã biết cách khởi tạo một instance vue, giờ sẽ cùng tìm hiểu về **template** vue để có thể đẩy được dữ liệu của instance ra màn hình. Vue biên dịch template thành các hàm render **DOM ảo** (**Virtual Document Object  Model**).

Để hiển thị giá, ta chỉ cần sử dụng cú pháp `{{ 'something' }}`, something ở đây có thể là:
- Giá trị thuộc tính trên object data tương ứng (như ở ví dụ trên thì có thể là `{{ message }}`).
    ```html
    <p> This page said {{ message }} </p>
    Kết quả:
        This page said hello world
    ```
- Các biểu thức Javascript: các biểu thức đơn lẻ ví dụ như `{{ number + 1 }}` hay
`{{ ok ? 'YES' : 'NO' }}` với ('number' và 'ok' được khai báo trong data)

### Directive: 

**Directive** là các thuộc tính đặc biệt bắt đầu bằng tiền tố `v-`. Nhiệm vụ của directive là áp dụng các hiệu ứng phụ vào DOM khi giá trị biểu thức thay đổi. Đặc biệt chỉ có **v-bind** và **v-on** là có dạng viết tắt.

Một số directive thông dụng và chức năng của chúng ()
-  **v-bind**(=`:`): dùng để lấy dữ liệu và hiển thị ra template, đây có lẽ sẽ là directive mà bạn sử dụng nhiều nhất.
    ```html
    <template>
        <div class="body">
            <nav>
                <h2>My Profile</h2>
                <div v-bind="user">
                    <img class="avatar" :src="user.avatar">
                    <br>
                    <b>My name:</b><p>{{ user.name }}</p>
                    <br>
                    <b>Date Of Birth:</b><p>{{ user.dob }}</p>
                    <br>
                    <b>Job:</b><p>{{ user.job }}</p>
                </div>
            </nav>
        </div>
    </template>

    <script>
    export default {
        name: 'myprofile',
        data () {
            return {
                user: {
                    name: 'Vương Minh Thái',
                    dob: '',
                    job: 'developer',
                    avatar: 'https://appdata.chatwork.com/avatar/2463/2463977.rsz.jpg'
                }
            }
        }
    }
    </script>
    ```
    Kết quả:
    
    ![](https://images.viblo.asia/b7352034-4774-4bf8-8861-1a25b5675da8.png)
-  **v-on**(=`@`): lắng nghe các sự kiện DOM và thực thi JavaScript khi những sự kiện này được kích hoạt, thường dùng nhất có lẽ là `v-on:click`=`@click` Ví dụ:
    ```html
    <template>
    <div>
        <button v-on:click="counter += 1">Count click</button>
        <p>Clicked {{ counter }} times</p>
    </div>
    </template>

    <script>
    export default {
        name: 'pestool',
        data () {
            return {
                counter: 0
            }
        }
    }
    </script>
    ```
    Kết quả: ![](https://images.viblo.asia/632bde13-1789-4217-adbe-fc8502fffba7.gif)

-  **v-if**:  kiểm tra điều kiện trước khi hiển thị ra
    ```html
    <template>
        <section>
            <div>
                <h3>Your information</h3>
                <p>Name: <input v-model="user.name" type="text" placeholder="name"></p>
                <p>Gender:
                    <select v-model="user.gender" name="gender" id="">
                        <option value="1" selected disabled>---Select your gender---</option>
                        <option value="2">Male</option>
                        <option value="3">Female</option>
                        <option value="4">Other</option>
                    </select>
                </p>
                <h1 v-if="user.name == null && user.gender == null" style="color: orange">Welcome to my app</h1>
                <h1 v-else-if="user.gender == 2 && user.name != null" style="color: green">Hello Sir, {{user.name}}</h1>
                <h1 v-else-if="user.gender == 3 && user.name != null" style="color: red">Hello Madam, {{user.name}}</h1>
                <h1 v-else style="color: black">Hello</h1>
                <br>
                <br>
            </div>
        </section>
    </template>

    <script>
    export default {
        name: 'test v-if',
        data () {
            return {
                user: {}
            }
        }
    }
    </script>
    ```
    Kết quả: 
    
    ![](https://images.viblo.asia/9258407b-8c96-4a55-ab45-a079b4616d8f.gif)
-  **v-show**: cũng gần tương tự như **v-if**, nhưng thay vì thỏa mãn điều kiện mới render ra thì **v-show** sẽ render ra hết, nhưng chỉ hiện thị phần thỏa mãn, những phần còn lại sẽ được đặt thuộc tính `display: none`. Bạn có thể F12 lên và kiểm tra.
-  **v-model**: tạo ra ràng buộc hai chiều (two-way binding) giữa form input và trạng thái sử dụng
    ```html
    <template>
            <div>
                <p>{{ message }}</p>
                <input v-model="message">
            </div>
    </template>

    <script>
    export default {
        name: 'pestool',
        data () {
            return {
                message: ''
            }
        }
    }
    </script>
    ```
    Kết quả: ![](https://images.viblo.asia/4cf61625-18ea-4561-8fda-4030a3f26485.gif)
    
-  **v-for**: thường dùng dùng để render một danh sách các item dựa trên một mảng (v-for khá là mạnh mà một ví dụ này không thể nói hết được, có lẽ mình sẽ nói rõ hơn về v-for trong bài sau)
    ```html
    <template>
        <section class="second-section">
            <div class="row">
                <div class="nation" v-for="nation of nations" :key="nation">
                    <h4>{{ nation.name }}</h4>
                    <img :src="nation.flag">
                </div>
            </div>
        </section>
    </template>

    <script>
    export default {
        name: 'second-section',
        data () {
            return {
                nations: [
                    {name: 'Japan', flag: 'http://flags.fmcdn.net/data/flags/w580/jp.png'},
                    {name: 'Korea', flag: 'http://flags.fmcdn.net/data/flags/w580/kr.png'},
                    {name: 'Vietnam', flag: 'http://flags.fmcdn.net/data/flags/w580/vn.png'}
                ]
            }
        }
    }
    </script>
    ```
    Kết quả: 
    
    ![](https://images.viblo.asia/7049c362-bddc-4a30-93e3-cf5694c2599d.png)
    
### Modifiers
Là hậu tố đặc biệt được đánh dấu bằng một dấu chấm `.`, chỉ rõ rằng một directive phải được ràng buộc theo một cách đặc biệt nào đó. Có rất nhiều modifier tùy vào mục đích của bạn, chắc bạn sẽ cần kha khá thời gian để tìm hiểu là sử dụng chúng.
- [Form input modifiers](https://vuejs.org/v2/guide/forms.html#Modifiers): 
    - `v-model.lazy`: sẽ không cập nhật nội dung cho đến khi bạn click ra ngoài input hoặc ấn phím enter. 
    - `v-model.number`: bắt buộc input nhập vào phải là số, bình thường chỉ dùng `type="number"` thì vẫn có thể nhập string vào được.
- [Event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers): 
    - `.stop`:
    - `.prevent`:
    - ...

# Lời kết
Bài này sẽ dừng ở đây thôi nhé, cho các bạn còn hấp thụ kiến thức.
Hẹn các bạn trong các bài viết sau.
# Tài liệu tham khảo
https://vuejs.org

https://allaravel.com

https://toidicode.com