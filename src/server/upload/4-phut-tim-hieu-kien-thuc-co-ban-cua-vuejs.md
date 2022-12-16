![](https://images.viblo.asia/94f4ac67-bebd-4d2e-9a39-2562525e74c3.jpeg)

Framework Vue js không chỉ nhẹ mà nó còn là 1 framework rất đơn giản, tiện lợi không thể thiếu cho các frontend dev.

Vue 2.0 được release vào năm 2016 và đã tham gia vào một cuộc đua với ReactJS. Nó được chứng minh là nhanh hơn và gọn hơn, so với ReactJs và Angular 2.0. Ngoài ra, thời gian học của nó tương đối ngắn hơn ReactJs và có một trong những tài liệu nổi bật nhất hiện có; bạn có thể sẽ thích nó trước khi đọc xong tài liệu.

Nó cho phép linh hoạt cấu trúc và làm cho việc tái sử dụng các component dễ dàng trong ứng dụng của bạn. Nói tóm lại, bạn có quyền viết và cấu trúc ứng dụng của mình theo cách bạn muốn. Tính năng kỳ dị này làm cho nó phù hợp để xây dựng các ứng dụng web lớn và có khả năng mở rộng cao.

# Vue Instance
Một trong những điều quan trọng nhất bạn cần biết về VueJs trước khi xây dựng ứng dụng VueJs đầu tiên của bạn là Vue Instance. Mỗi ứng dụng Vue có một phiên bản gốc được gọi là Vue. Vue Instance tuân theo Model-view -ViewModel (MVVM patterns).

Một Vue instance có thể được tạo bằng cách phát hành *new Vue()* với các tuỳ chọn có thể chứa template, data, methods và các callbacks và event. 

Nói cách khác, chúng ta có thể xem Vue như một trung gian giữa data và view.

Nếu chúng ta có một đối tượng dữ liệu chứa thông tin chi tiết về "Use A" và HTML view, chúng ta có thể định nghĩa đối tượng người dùng của mình như sau:

```
//User Object
var userA={
            name: "Nguyen Van A",
            post: "4 phút tìm hiểu kiến thức cơ bản của Vuejs"
          }
```

và xem mẫu dưới dạng: 

```
<!----view --->
<div id="app">
    <h1>Name</h1>
    <p>Post title </p>
</div>
<!---Includes VueJs-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.js"></script>
<script src="app.js"></script>
```

Để tạo ra một Vue instance, chúng ta cung cấp dữ liệu của chúng ta, đó là **userA** và id của một phần trong quan điểm của chúng ta. Trong ví dụ này Id của chúng ta là "**app**".

```
var vm = new Vue({
    el:"#app",  //id 

    data:userA, //userA object
    created: function () {
        console.log('Vue instance đã được tạo');
    },
    methods: {
        exampleFunction: function () {
            console.log('Đây là một function ví dụ')
        },
    },
    destroyed: function () {
        console.log('Vue instance đã bị phá huỷ')
    }
})
```

# Data binding trong VueJs
Có hai cách bind data để view trong VueJs: **One-way** data binding và **two-way** data binding. 

**One-way data binding** liên kết data trực tiếp từ code javascript của bạn với DOM. Một ví dụ điển hình cho việc này là hiển thị một thông điệp cảm ơn thân thiện với khách hàng sau khi gửi form phản hồi. 

```
<!---One-way data binding--->
<!----feedback.html-->
<div class="container">
    <div id="app">
        <h1>Feed back form </h1>
        <div class="server-message">{{msg}}</div>
        <form>
            <input type="name" placeholder="Your name"/>
            <input type="email" placeholder="your email">
            <textarea name="message" rows="2" cols="3"></textarea>
            <button type="button" class="btn btn-primary">Send feedback</button>
        </form>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.js"></script>
<script src="app.js"></script>
</html>
```

Để bind message của chúng ta để view, chúng ta cần tạo một Vue instance với một object message và id của một template view mà chúng ta đang binding làm tham số.

```
<!---app.js---->
var data= {
    msg: "Cảm ơn bạn đã phản hồi :)"
}
new Vue({
    data:data, //message object 
    el:'#app' 
})
```

**Two-way data binding** binds data từ code Javascript của bạn để view và từ view lại code để thay đổi data ở một trong hai bên dẫn đến thay đổi global.
*For two-way data binding*, Vue cung cấp một v-model cho mục đích này. Hãy để trở lại form feedback của chúng ta và thực hiện một số thay đổi.

```
<!---feedback.html-->
<div class="container">

    <div id="app">
        <h1>Form feed back  </h1>
        <form>
           <input type="name" placeholder="Your name" v-model="name"/>
           <input type="email" placeholder="your email" v-model="email">              
           <textarea name="message" rows="2" cols="3" v-model="message"></textarea>
           <button type="button" class="btn btn-primary">Send feedback</button>
        </form>
    </div>
</div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.4/vue.js"></script>
<script src="app.js"></script>
</html>
<!----app.js--->
var data={
    name:  " Samuel James",
    email: "example@mail.com",
    message: "Hello there",
}
var vm = new Vue({
    data: data,
    el:'#app'
})
//xem name khi nó thay đổi reactively trong quá trình sửa đổi
vm.$watch('name', function (newName, oldName) {
    console.log(newName); //new name
    console.log(oldName); //old name
})
```

Tại chỗ console, bạn có thể xem field name thay đổi reactively như sửa đổi trong trình duyệt của bạn.

# Directives
Directives là các tính năng mạnh mẽ trong Vue,  chúng là các expressions binding với v- attribute. Trong các ví dụ trước, chúng tôi đã sử dụng directive v-model để reactively bind data với DOM và view. Directives làm việc với view và các nhiệm vụ lặp đi lặp lại một cách dễ dàng. Bên cạnh đó, bạn cũng có thể xác định các directives custom của mình với một vài dòng code. Điều tiếp theo là xử lý cách gửi form feedback và cũng là logic để ngăn chặn việc gửi hai lần bằng directives Vue. 

Đây là directives và phương pháp Vue. Chúng tôi thêm v-on:click và v-bind:disabled directives để submit button trong feedback.html như dưới đây: 

```
<!----feedback.html--->
<input type="name" placeholder="Your name" v-model="name"/>
 <input type="email" placeholder="your email" v-model="email">              
<textarea name="message" rows="2" cols="3" v-model="message"></textarea>
<button type="button" v-on:click="submit" v-bind:disabled="isSubmitted" class="btn btn-primary">Send feedback</button>
```

*app.js* trở thành: 

```
<!----app.js --->
var data={
    name:  " Samuel James",
    email: "example@mail.com",
    message: "Hello there",
    isSubmitted:false //ban đầu chúng tôi đặt thành false để enable button submit
}
new Vue({
    data:data,
    el:"#app",
    methods:{
        submit: function () {
            //Bây giờ gửi feed back qua ajax
       this.isSubmitted=true; // đặt submitted thành true để disable button submit
},    
    }
})
```

*v-bind:disabled* directive disables submit button khi *isSubmitted* được set thành true trong khi *v-on:click* lắng nghe một click event và thực hiện phương thức submit () được xác định trong Vue instance.

Vừa rồi chúng tôi đã đề cập đến 3 nguyên tắc cơ bản của VueJs, bạn có thể truy cập [tài liệu chính thức của VueJs](https://vuejs.org/) và bắt đầu xây dựng các ứng dụng web tiếp theo của mình với VueJs.