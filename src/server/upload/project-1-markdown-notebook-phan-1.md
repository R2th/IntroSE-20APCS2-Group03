# Tổng quan
Ứng dụng đầu tiên mình sẽ tạo là một cuốn sổ notebook. Về cơ bản, cuốn sổ mình mong muốn sẽ có hình dạng như thế này:
![](https://images.viblo.asia/ce8be29d-ae72-4686-a43d-c1969a836e19.png)
# A basic note editor
Trong bài viết này, mình sẽ tạo phần cơ bản của cuốn notebook, bao gồm ctrình soạn thảo văn bản ở bên trái và phần được biên dịch ở bên phải. Cụ tỉ:
![](https://images.viblo.asia/134759e4-31f8-4157-b14a-6183157c53f2.png)
## Setup project
Chúng ta cần 3 files:
1. `index.html`
```
<html>
<head>
    <title>Notebook</title>
    <!-- Icons & Stylesheets -->
    <link href="https://fonts.googleapis.com/icon?
           family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
<!-- Include the library in the page -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- Notebook app -->
<div id="notebook">
    <!-- Main pane -->
    <section class="main">
    </section>
</div>
<!-- Some JavaScript -->
<script src="script.js"></script>
</body>
</html>
```
2. `script.js`
```
var app = new Vue({
    // CSS selector of the root DOM element
    el: '#notebook',
})
```
3. `style.css`

https://github.com/anhv-1376/learn-vue/blob/develop/markdown-notebook/style.css
## The note editor
1. Khởi tạo `content` (chứa nội dung của note) trong `data()` :
```
var app = new Vue({
    // CSS selector of the root DOM element
    el: '#notebook',

    data() {
        return {
            content: 'This is a note.',
        }
    },
})
```
2. Thêm đoạn HTML chứa `content` (trình soạn thảo bên trái) và sử dụng directive `v-model` cho việc bind giá trị của `content`:
```
<!-- Main pane -->
<section class="main">
    <textarea v-model="content"></textarea>
</section>
```
Sau khi sử dụng `v-model`, bất cứ khi nào chúng ta thay đổi nội dung của `content`, giá trị của nó sẽ được cập nhật trong `Vue devtools`. Ví dụ:

![](https://images.viblo.asia/72936d6d-28d1-485a-b6df-a8479338a5cc.png)

**TIP:**
> - Vue devtools: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd
> - Thuộc tính `v-model` không giới hạn mỗi `textarea`, chúng ta có thể sử dụng ở các form elements khác như `checkboxes`, `radio buttons`, etc.
## The preview pane
Để có được trình biên dịnh ở bên tay phải, chúng ta cần sử dụng thư viện, ở đây mình chọn `marked` (https://www.npmjs.com/package/marked):

1. Thêm thư viện:
```
<!-- Include the library in the page -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- Add the marked library: -->
<script src="https://unpkg.com/marked"></script>
```
`marked` khá là dễ dùng, chỉ cần gọi là nó tự compile cho mình, không cần config gì cả.

2. Test thử thư viện:
```
const html = marked('**Bold** *Italic* [link] (http://vuejs.org/)')
console.log(html)
```
Kết quả mình mong muốn sau khi bật tab `Console` của trình duyệt:
```
<p><strong>Bold</strong> <em>Italic</em>
<a href="http://vuejs.org/">link</a></p>
```
### Computed property
Vue có một tính năng rất mạnh, được gọi là `computed`. Đúng như cái tên của nó, `computed` có thể hiểu là `tính toán`. Một số điểm hay ho của `computed` có thể kể đến:
- `computed` sẽ cached lại giá trị của biến, tránh việc chạy lại nếu không cần thiết => tránh các tính toán dư thừa. Nó sẽ tự động cập nhật khi có sự thay đổi bên trong thân hàm. 
- `computed` có thể sử dụng lồng nhau. Ví dụ:
```
note() {
    return 'This is my note.';
},

customNote() {
    return this.note.slice();
},
```
- `computed` sẽ không được tính toán cho đến khi nó thực sự được sử dụng ở đâu đó trong ứng dụng.

Ở trong ứng dụng notebook này, computed sẽ cho phép chúng ta chuyển đổi nội dung `content` thành đoạn HTML tương ứng:
```
// Computed properties 
computed: {
     notePreview () {
       // Markdown rendered to HTML
       return marked(this.content);
    }, 
},
```
### Text interpolation escaping
Cái cụm `Text interpolation escaping` dịch sang tiếng Việt củ chuối quá, mình xin phép để ở bản nguyên thuỷ :(
1. Thêm trình biên dịch bên phải, đồng thời in ra phần nội dung được compile thông qua `computed`, ở đây là `notePreview`:
```
<!-- Preview pane -->
<aside class="preview">
    {{ notePreview }}
</aside>
```
2. Thử in một đoạn `**`:
```
I'm in **bold**!
```

Sau khi computed, kết quả chúng ta mong muốn sẽ là: I'm in **bold**! Nhưng thực tế thì đây mới là kết quả nhận được:
```
I'm in <strong>bold</strong>!
```

Text interpolation sẽ tự động in ra các thẻ HTML để tránh các injection attacks, đồng thời cải thiện tính bảo mật của ứng dụng. May mắn là vẫn có cách để hiển thị ra phần **bold** ở trên, sử dụng directive `v-html`. Nhưng, ví dụ, app của bạn có chức năng show all comments, khi đó có một ông tướng nào đấy comment theo kiểu 
```
<a href='send-to-me-your-information'>Xin chào mọi người</a>
```
thì sẽ không được "hay ho" cho lắm => Tốt nhất là xem xét tuỳ trường hợp mới sử dụng directive này.
### Displaying HTML
Thay directive `v-model` bằng `v-html`:
```
<!-- Preview pane -->
<aside class="preview" v-html="notePreview">
</aside>
```
Đây sẽ là kết quả mà bạn mong muốn nhận được:
![](https://images.viblo.asia/134759e4-31f8-4157-b14a-6183157c53f2.png)

**TIP:**

> - Thường thì mình hay sử dụng `v-html` khi tạo `placeholder` hơn.
> - Có một directive tương đương với `v-html` là `v-text`. Bạn có thể tham khảo về sự khác nhau của chúng tại [đây](https://stackoverflow.com/questions/53320289/what-is-the-difference-between-v-html-and-v-text) để cân nhắc nên sử dụng cái nào.
## Saving the note
Ở thời điểm hiện tại, khi chúng ta đóng hoặc refresh trình duyệt, các note của bạn sẽ mất. Sẽ tốt hơn khi người dùng đóng trình duyệt hoặc F5 lại page thì các note họ vẫn được giữ nguyên. Giải pháp ở đây, chúng ta sẽ dùng API `localStorage` được hỗ trợ hầu hết cho các trình duyệt.
### Watching changes
Để lưu lại note bất cứ khi nào `content` của nó thay đổi, chúng ta sẽ cần một property nào đó có thể bắt được sự kiện đó, ở đây mình sẽ dùng **watchers**.
1. Thêm `watch` cho Vue instance.
```
new Vue({
    // ...
    
    // Change watchers 
    watch: {
        // Watching 'content' data property
        content: { // Cái key này phải cùng tên với cái mà mình cần watch nhé 
            handler (val, oldVal) {
                console.log('new note:', val, 'old note:', oldVal)
            }, 
        },
    }, 
})
```
Kiểm tra kết quả ở tab `Console`:
```
new note: This is a **note**! old note: This is a **note**
```
Có 2 options khác cho watch ngoài `handler`:
- `deep` (boolean): dùng để theo dõi các kiểu data lồng nhau (`nested data`) như các `Arrays` hoặc các `Objects`.
- `immediate` (boolean): đúng như tên gọi của nó, `immediate` cho phép ta watch ngay lập tức, không cần phải thay đổi gì cả.

Chi tiết về cách sử dụng `deep` và `immediate`, các bạn khảo thêm tại [đây](https://michaelnthiessen.com/how-to-watch-nested-data-vue) nhé.

**TIP:**

> Giá trị default của `deep` và `immediate` là `false`, nên nếu không dùng chúng ta có thể bỏ qua.
2. Test thử `immediate`:
```
content: {
     handler (val, oldVal) {
       console.log('new note:', val, 'old note:', oldVal);
     },
    immediate: true, // Không thay đổi gì mà bắt watch luôn thì sẽ là 'undefined'
},
```
F5 lại page, chúng ta có được kết quả:
```
new note: This is a **note** old note: undefined
```
3. Viết ngắn `watcher` của chúng ta lại bằng cách xoá đi chữ `handler`:
```
content (val, oldVal) {
    console.log('new note:', val, 'old note:', oldVal);
},
```
4. Giờ là lúc lưu lại note của chúng ta bằng cách sử dụng API `localStorage.setItem()`:
```
content (val, oldVal) {
    console.log('new note:', val, 'old note:', oldVal);
    localStorage.setItem('content', val);
},
```
Để check xem note đã được lưu lại chưa, các bạn bật F12, chọn tab `Application` hoặc `Storage` tab (tuỳ vào từng browser, nếu là Google Chrome thì sẽ là `Application`), kiểm tra phần `Local Storage`, nếu được như hình dưới đây tức là lưu thành công:

![](https://images.viblo.asia/c4688b75-5074-4441-a874-59bade9c5490.png)
### Using a method
Ngoài ra, chúng ta có thể áp dụng coding principle **Don't Repeat Yourself** để làm cho code sạch, đẹp và dễ tái sử dụng hơn thông qua việc sử dụng `method`.
1. Refactor lại code, viết method `saveNote` lưu lại note:
```
new Vue({
    // ...
    methods: { 
        saveNote (val) {
            console.log('saving note:', val);
            localStorage.setItem('content', val);
        },
    }, 
})
```
2. Cho vào `watch`:
```
watch: {
    content: {
        handler: 'saveNote', 
    },
},
```
Như đã nói ở trên, chúng ta có thể viết ngắn lại bằng `short syntax` của `watch`:
```
watch: {
    content: 'saveNote',
},
```
### Accessing the Vue instance
Trong các methods, chúng ta có thể access đến các Vue instances thông qua từ khoá `this`. Ví dụ:
```
 methods: {
     saveNote (val) {
       console.log('saving note:', val);
       localStorage.setItem('content', val);
       this.reportOperation('saving');
    },
    
    reportOperation (oprationName) {
        console.log('The', oprationName, 'operation was completed!');
    }, 
},
```
Chúng ta có thể xoá param truyền vào của method `saveNote` để truyền trực tiếp `content` vào trong thân hàm luôn:
```
methods: {
    saveNote () {
    console.log('saving note:', this.content);
    localStorage.setItem('content', this.content) },
},
```
Trong `watch` cũng có thể làm như vậy:
```
watch: {
    content (val, oldVal) {
        console.log('new note:', val, 'old note:', oldVal);
        console.log('saving note:', this.content);
        localStorage.setItem('content', this.content);
    }, 
},
```
**TIP:**
> Về cơ bản, chúng ta có thể access đến các Vue instance không chỉ ở trong `methods` mà còn ở các `handlers` hoặc các `hooks` khác (`hooks` là gì mình xin được nói rõ ở phần dưới). 
## Loading the saved note
Sau khi lưu xong rồi, ta cần lấy ra các note đó mỗi khi người dùng mở hay refresh lại trang:
```
console.log('restored note:', localStorage.getItem('content'));
```
Các bạn check ở tab `Console` xem đã xuất hiện những note được lưu chưa nhé :)

### Lifecycle hooks
Mỗi khi học một framework mới thì điều đầu tiên mình quan tâm là framework đó thực hiện một action từ đầu tới cuối như thế nào và làm sao mình có thể can thiệp được vào vòng đời đó. Vue.js không nằm ngoại lệ. Trong Vue.js gọi là `lifecycle hooks`. Cụ thể các `hooks` của Vue.js được tóm tắt bằng văn bản như thế này:

- `beforeCreate`: This is called when the Vue instance object is created (for example, with `new Vue({})`), but before Vue has done anything with it.
- `created`: This is called after the instance is ready and fully operating. Note that, at this point, the instance is not in the DOM yet.
- `beforeMount`: This is called just before the instance is added (or mounted) on the web page.
- `mounted`: This is called when the instance is on the page and visible in the DOM.
- `beforeUpdate`: This is called when the instance needs to be updated (generally, when a data or computed property has changed).
- `updated`: This is called after the data changes are applied to the template. Note that the DOM may not be up to date yet.
- `beforeDestroy`: This is called just before the instance is torn down. 
- `destroyed`: This is called when the instance is fully removed.

Qua hình ảnh cho dễ hiểu:
![](https://images.viblo.asia/b68c4c80-89c4-4bc6-ac9f-e208e4e33134.png)
For now, we will only use the created hook to restore the note content. To add a lifecycle hook, just add a function with the corresponding name into the Vue instance options:
Áp dụng vào trong project của chúng ta, để thêm một `lifecycle hook`, chỉ cần thêm một function với tên tương ứng vào Vue instance, ở đây mình sẽ dùng `created`. Hook `created` sẽ được gọi sau khi instance đã hoàn toàn thực hiện xong và chưa load ra DOM. Để lấy ra các note đã được lưu trong `localStorage` mỗi khi người dùng mở hay F5 lại trang, mình sẽ thêm đoạn code này:
```
new Vue({
    // ...
    
    // This will be called when the instance is ready 
    created () {
    // Set the content to the stored value or to a default string if nothing was saved
        this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    },
})
```

**TIP:**
> Trong JavaScript, một giá trị được gọi là **falsy** khi nó bằng false, 0, một chuỗi rỗng, `null`, `undefined` hoặc `NaN` (not a number - không phải là số). Ở đây, hàm `localStorage.getItem ()` sẽ trả về null nếu key `content` không tồn tại.

Kiểm tra kết quả trong tab `Console`:
```
new note: You can write in **markdown** old note: This is a note
saving note: You can write in **markdown**
The saving operation was completed!
```
### Initializing directly in the data
Sửa một chút khi khởi tạo `content`. Nếu không có key `content` trong storage thì trả về một giá trị nào đó, còn không thì chỉ về value của key.
```
new Vue({
    // ...
    data () {
        return {
            content: localStorage.getItem('content') || 'You can write in **markdown**',
        }
    },
    // ... 
})
```
# Multiple notes
Một cuốn notebook chỉ có lưu được một note thì vẫn chưa đủ. Ở phần tới ngoài việc cho phép lưu multiple notes, mình sẽ thêm một vài tính năng khác như hiển thị danh sách các notes, rename lại note, cho note vào danh sách ưa thích, etc.

*To be continued...*
# Source code
https://github.com/anhv-1376/learn-vue/tree/develop/markdown-notebook
# Tham khảo
Chau, G. (2017). Vue.js 2 web development projects. Birmingham, UK: Packt Publishing.