Vue là một progressive JavaScript framework đơn giản và nhỏ gọn có thể được sử dụng để tạo ra những ứng dụng web mạnh mẽ.

Vue là một sự thay thế nhẹ cho các JavaScript framework khác như AngularJS. Với một hiểu biết vừa đủ về HTML, CSS và JS, bạn có thể bắt đầu sử dụng Vue.

Trong bài viết này, chúng ta sẽ tạo ra một ứng dụng To-Do với Vue đồng thời cũng sẽ làm nổi bật một loạt những điểm tuyệt vời và Vue có thể cung cấp.

Hãy cùng bắt đầu nào!

## Bạn cần gì để bắt đầu?

Chúng ta cần có Vue CLI để bắt đầu. CLI này cung cấp một khung sườn cho Single Page Applications và bạn có thể có một ứng dụng chạy được ngay tức khắc, đi kèm với hot-reload, lint-on-save và sẵn sàng cho việc build production.

Bạn sẽ cần phải đưa ra nhiều quyết định dựa trên quy mô của ứng dụng của bạn trong tương lai. Vue CLI đi kèm với một loạt template cung cấp cho bạn một package đầy đủ và và sẵn sàng sử dụng. Các template hiện tại sẵn sàng bao gồm:

```
webpack - A full-featured Webpack + Vue-loader setup with hot reload, linting, testing & CSS extraction.

webpack-simple - A simple Webpack + Vue-loader setup for quick prototyping.

browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.

browserify-simple - A simple Browserify + vueify setup for quick prototyping.

simple - The simplest possible Vue setup in a single HTML file
```

Nói một cách đơn giản, Vue CLI là một cách nhanh nhất để bạn có một ứng dụng hoàn thành và chạy được.

```
# install vue-cli
$ npm install --global vue-cli
```

Trong bài viết này, tôi sẽ tập trung vào việc sử dụng các single file component thay vì các instance. Tôi cũng sẽ đề cập đến cách sử dụng các thành phần cha và con và trao đổi dữ liệu giữa chúng. Learning curve của Vue đặc biệt nhẹ nhàng khi bạn sử dụng các Single file components. Ngoài ra, chúng cho phép bạn đặt mọi thứ liên quan đến một component ở một nơi. Khi bạn bắt đầu làm việc trên các ứng dụng lớn, khả năng viết các thành phần có thể tái sử dụng sẽ giúp ích cho bạn rất nhiều.

## Tạo một Vue 2 Application

Tiếp theo chúng ta sẽ setup app Vue với Vue CLI

```
# create a new project using the "webpack" template
$ vue init webpack todo-app
````

Bạn sẽ được nhắc nhập tên dự án, mô tả, tác giả và bản dựng Vue. Chúng tôi sẽ không cài đặt Vue-router cho ứng dụng của chúng tôi. Bạn cũng sẽ được yêu cầu kích hoạt các tùy chọn linting và thử nghiệm hoặc ứng dụng. Bạn có thể làm theo ví dụ của tôi dưới đây.

![](https://scotch-res.cloudinary.com/image/upload/w_650,q_auto:good,f_auto/media/15341/vvx46QEcQEuJ4pp0Szxo_vuesetup.mp4)

Sau khi đã khởi tạo app, chúng ta cần cài đặt các dependencies bắt buộc.

```
# install dependencies and go!
$ cd todo-app
$ npm install
```

Để chạy app, hãy thực hiện command sau:

```
npm run dev
```

Sau khi chạy, browser sẽ ngay lập tức được mở và dẫn bạn đến trang http://localhost:8080. Trang web sẽ nhìn giống như sau.

![](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/media/15341/yllZypE4Tq2biKub2vWp_Screen%20Shot%202017-02-12%20at%2012.24.59%20AM.png)

Để tạo style cho ứng dụng của chúng ta, tôi sẽ sử dụng Semantic. Semantic là một khung phát triển giúp tạo ra các bố cục đẹp, responsive bằng cách sử dụng HTML. Tôi cũng sẽ sử dụng Sweetalert để nhắc người dùng xác nhận hành động. Sweetalert là một thư viện cung cấp các lựa chọn thay thế tuyệt đẹp cho cảnh báo JavaScript mặc định. Thêm các tập lệnh và liên kết JavaScript và CSS đã rút gọn vào tệp index.html của bạn được tìm thấy ở thư mục gốc của cấu trúc thư mục của bạn.

```
<!-- ./index.html -->
<head>
  <meta charset="utf-8">
  <title>todo-app</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.7/semantic.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>
</head>
```

### Cấu trúc component

Mỗi ứng dụng Vue, cần phải có một component cấp cao nhất đóng vai trò là khung cho toàn bộ ứng dụng. Đối với ứng dụng của chúng ta, tôi sẽ có một component chính và được lồng trong đó sẽ là Component TodoList. Trong phạm vi này sẽ có các component phụ.

### Main app component 

Hãy đi sâu vào việc xây dựng ứng dụng của chúng ta. Đầu tiên, chúng ta sẽ bắt đầu với component cấp cao nhất. CLI Vue đã tạo ra một component chính có thể được tìm thấy trong src / App.vue. Chúng ta sẽ xây dựng các thành phần cần thiết khác.

### Tạo ra một component

Vue CLI tạo ra một component Hello trong quá trình thiết lập có thể được tìm thấy trong src / component / Hello.vue. Chúng ta sẽ tạo component riêng của mình được gọi là TodoList.vue và sẽ không cần component Hello này nữa.

Bên trong file Todolist.vue, hãy viết như sau:

```
<template>
  <div>
    <ul>
        <li> Todo A </li> 
        <li> Todo B </li> 
        <li> Todo C </li> 
    </ul> 
  </div>
</template>

<script type = "text/javascript" >

export default {
};
</script>
<style>
</style>
```

Một tập file component bao gồm ba phần; template, component class và các style sections. Vùng Template là phần trực quan của một component. Hành vi, sự kiện và lưu trữ dữ liệu cho template được xử lý bởi class. Phần style section sử dụng để cải thiện hơn nữa sự xuất hiện của template.

### Import các components

Để sử dụng thành phần chúng ta vừa tạo, chúng ta cần nhập nó vào thành phần chính. Bên trong src / App.vue thực hiện các thay đổi sau ngay phía trên phần tập lệnh và bên dưới thẻ đóng mẫu.

```
// add this line
import TodoList from './components/TodoList'  
// remove this line
import Hello from './components/Hello'  
```

Chúng ta cũng sẽ cần tham chiếu thành phần TodoList trong thuộc tính thành phần và xóa tham chiếu trước đó đến Thành phần Hello. Sau khi thay đổi, kịch bản của chúng ta sẽ trông như thế này.

```
<script>
import TodoList from './components/TodoList';

export default {
  components: {
    // Add a reference to the TodoList component in the components property
    TodoList,
  },
};
</script>
```

Để kết xuất thành phần, chúng tôi gọi nó như một phần tử HTML. Các từ thành phần được phân tách bằng dấu gạch ngang như bên dưới thay vì trường hợp lạc đà.

```
<template>
  <div>
    // Render the TodoList component
    // TodoList becomes
    <todo-list></todo-list>
  </div>
</template>
```

Khi chúng tôi đã lưu các thay đổi của mình, ứng dụng thô sơ của chúng tôi sẽ trông như thế này.

![](https://scotch-res.cloudinary.com/image/upload/dpr_1,w_800,q_auto:good,f_auto/media/15341/1CKHKpiGRe6xc6s4cANs_Screen%20Shot%202017-02-12%20at%207.44.04%20AM.png)

### Bổ sung Component Data

Chúng ta sẽ cần cung cấp dữ liệu cho thành phần chính sẽ được sử dụng để hiển thị danh sách các mã thông báo. Mã thông báo của chúng ta sẽ có ba thuộc tính; Tiêu đề, dự án và được thực hiện (để cho biết việc cần làm đã hoàn thành hay chưa). Các thành phần tận dụng dữ liệu cho các mẫu tương ứng bằng cách sử dụng chức năng dữ liệu. Hàm này trả về một đối tượng với các thuộc tính dành cho mẫu. Hãy thêm một số dữ liệu vào thành phần của chúng ta.

```
export default {
  name: 'app',
  components: {
    TodoList,
  },
  // data function avails data to the template
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
    };
  },
};
```

Chúng ta sẽ cần truyền dữ liệu từ thành phần chính sang thành phần TodoList. Đối với điều này, chúng tôi sẽ sử dụng chỉ thị v-bind. Lệnh này lấy một đối số được chỉ định bởi dấu hai chấm sau tên lệnh. Đối số của chúng ta sẽ là các mã thông báo cho chỉ thị v-bind liên kết thuộc tính phần tử todos với giá trị của các mã thông báo biểu thức.

```
<todo-list v-bind:todos="todos"></todo-list>
```

Các todos bây giờ sẽ có sẵn trong thành phần TodoList dưới dạng todos. Chúng tôi sẽ phải sửa đổi thành phần TodoList của chúng tôi để truy cập dữ liệu này. Thành phần TodoList phải khai báo các thuộc tính mà nó sẽ chấp nhận khi sử dụng nó. Chúng tôi làm điều này bằng cách thêm một thuộc tính vào lớp thành phần.

```
export default {  
    props: ['todos'],
}
```

## Tham khảo
https://scotch.io/tutorials/build-a-to-do-app-with-vue-js-2