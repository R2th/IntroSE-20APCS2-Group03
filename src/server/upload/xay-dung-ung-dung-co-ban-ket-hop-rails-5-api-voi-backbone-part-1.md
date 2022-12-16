Như chúng ta đã biết, để phát triển một ứng dụng web, chúng ta đều phải tập chung vào phát triển backend, và như hiện nay đã có khá nhiều framework cho backend như, Spring, Truct, Ruby On Rails,...Tuy nhiên, để có được một ứng dụng hoàn thiện và thành công thì không thể thiếu frontend. Vì thế, đã có rất nhiều framework được xây dựng nhằm cải thiện tốc độ phát triển frontend, và Backbone là 1 trong số đó.

Khi kết hợp backbone trong Rails sẽ tạo ra được nhiều lợi thế hơn khi phát triển 1 ứng dụng với Rails. Trong phần này, chúng ta cùng tìm hiểu qua về Backbone trước, sau đó trong phần tiếp theo mình sẽ tích hợp Backbone vào Rails. 

# 1. Giới thiệu về Backbone

Backbone là một javascript framework rất tốt để phát triển các ứng dụng phía client browser, cùng với cộng đồng sử dụng khá lớn và nhiều thư viện hỗ trợ, nó được chú ý đặc biệt bởi cộng đồng phát triển web sử dụng Javascript bởi nó dễ sử dụng và rất dễ áp dụng cho các ứng dụng javascript.

Framework này được xây dựng theo mô hình MV, nó có thể đồng bộ dữ liệu giữa client và server rất rễ dàng qua phương thức save(). Chính điều này đã tạo ra sự nổi bật của Backbone.

# 2. Các thành phần chính trong Backbone

Các thành phần chính của backbone bao gồm Models, Views và Router.

## 1. Models

**Models** Là nơi để định nghĩa object trong Backbone, bao gồm các các thuộc tính và các phương thức liên quan. Một điều đặc biệt trong model là chúng ta không cần thiết phải khai báo trước tất cả các thuộc tính của object này, việc thêm thuộc tính của một object có thể thông qua các phương thức của nó!

Chúng ta cùng đi tìm hiểu vài thành phần cơ bản có trong model:

* Initalization
* Getters and setters
* Listening for changes to your model
* Validation

**Initalization**

Backbone cung cấp một hàm khởi tạo initalize. Hàm này sẽ được gọi khi chúng ta tạo một instance của model.

```
var Product = Backbone.Model.extend({
  initialize: function(){
    console.log('This model has been initialized.');
  }
});
```

Ngoài ra khi bạn muốn khởi tạo và kèm theo giá trị default của các attribute . bạn có thể sủ dụng option defauts

```
var Product = Backbone.Model.extend({
  initialize: function(){
    console.log('This model has been initialized.');
  },
  defaults: {
    name: '',
    price: 0
  }
});
```

**Getters and setters**

Backbone cũng giống với các ngôn ngữ khác, bạn có thể sử dụng 2 phương thức get và set như sau:

```
var cake = new Product({
  name: 'Applesauce cake',
  price: '20'
});
    
console.log(cake.get('name'));     // Print: Applesauce cake

cake.set({name: 'Orange cake'});

console.log(cake.get('name'));     // Print: Orange cake
```

**Listen for changes your model**

Để có thể lắng nghe sự kiện thay đổi toàn bộ model của bạn thì chỉ cần thêm sự kiện `change` và khai báo trong phương thức initialize() như ví dụ bên dưới:

```
initialize: function(){
  console.log('This model has been initialized.');
  this.on('change', function(){
    console.log('Value has changed')
  })
}
```

Còn trong trường hợp mà bạn chỉ muốn lắng nghe sự kiện thay đổi cho một số thuộc tính của object thì chúng ta có câu lệnh sau `change:name`

```
var cake = new Product({name: 'Applesauce cake', price: '30'});

cake.on('change:price', function() {
  console.log('Price changed');
});
```

**Validation**

Backbone hỗ trợ validation bằng function validate(). Nó cho phép kiểm tra giá trị của attribute đó. Mặc định, thì việc validation sẽ diễn ra khi hành động save() và set().

```
var Product = Backbone.Model.extend({
  initialize: function(){
    console.log('This model has been initialized.');
    this.on("change", function() {
      console.log("Value has changed")
    })
  },
  defaults: {
    price: 0
  },
  validate: function(attrs) {
    console.log(attrs);
    if (!attrs.name) {
      return 'I need your name';
    }
  }
});

var cake = new Product({
  name: 'Applesauce cake',
  price: '20'
});

// Remove the name attribute, force validation
cake.unset('name');
```

Khi việc unset('name') được diễn ra thì hàm validate sẽ được gọi đến. Lúc này chắc chắn rằng một invalid even sẽ được gọi đến và giá trị mới được gán vào sẽ không được chỉnh sửa. Giá trị name vẫn được giữ nguyên là "Applesauce cake"

## 2. Collections

Collection như là một danh sách các model object. Nó như là một tập con của Model, giúp chúng ta lấy dữ liệu dạng Json từ các request URL.

```
var Product = Backbone.Model.extend({
  initialize: function(){
  },
  defaults: {
    price: 0
  }
});

const Products = Backbone.Collection.extend({
  model: Product
});
let products = new Products([
  new Product({name: 'Orange cake 1', price: '20'}),
  new Product({name: 'Orange cake 2', price: '30'}),
  new Product({name: 'Orange cake 3', price: '40'})
])
```

## 3. Routers

Routers trong backbone được sử dụng để quản lý trạng thái của trang web và kết nối các ứng sự kiện thông qua Url. Routers sử dụng chính routes của Rails để xác định sẽ khởi tạo và sử dụng các View nào của Backbone.Js. Chúng được sử dụng thông qua pushState và History API của trình duyệt. Để định nghĩa một routers, chúng ta thực hiện như sau:

```
var router_name = Backbone.Router.extend({
  routes: {
    'state': 'method_name',
        '*other': 'defaultRoute'
  },
  method_name: function(){
    //Todo something
  },
  defaultRoute: function(other){
    //Todo something
  },
  start: function(){
    Backbone.history.start();
  },
});
```

Chúng ta cần chú ý tới **Backbone.history**,  `Backbone.history` như là một sự kiện để handle các events trong ứng dụng của bạn. Nó sẽ tự động handle các routes của bạn và sẽ trigger callback đến nó khi mà các router này được gọi đến

## 3. Views

Tuy không phải là một phần trong ứng dụng của chúng ta, nhưng nó hỗ trợ model việc hiển thị dữ liệu cho người dùng thông qua giao diện bằng cách sử dụng các Javascript template. Phương thức `render()` của view có thể được sync với sự kiện change() của model mà không cần refresh toàn bộ trang, đây là một điểm mạnh của backbone.

Trong view bạn cần phải biết đến việc : tạo mới view và một khái niệm đặc biệt el (element)

`el` : là một trong số central property của view. el chỉ một Dom element mà View nào cũng phải có. Có hai cách để tạo el trong View : sử dụng Dom element có sẵn(EX1) và tạo mới element(EX2)

EX1:

```
<ul id="notes" class="container"></ul>

<script type="text/javascript">
  var NotesView = Backbone.View.extend({
    el: '#notes'
  });
    
  var notesView = new NotesView();
</script>
```

EX2:

```
<script type="text/javascript">
  var ProductsView = Backbone.View.extend({
    tagName: 'ul',
    className: 'container',
    id: 'products'
  });

  var productsView = new ProductsView();
</script>
```

**Render** 

Function này tuy không phải là một function mới. Tuy nhiên hãy xem ví dụ dưới đây

```
  var app = {};
  var AppView = Backbone.View.extend({
    el: $('#container'),
    template: _.template('<h1>Hello <%= name %></h1>'),
    initialize: function() {
      this.render();
    },
    event: function() {
        // xử lý sự kiện
    },
    render: function() {
      this.$el.html(this.template({name: 'world'}))
    }
  });

  app.views = new AppView();
```

Chắc hẳn sẽ có một chút khó hiểu tại đây:

```
_.template('<h1>Hello <%= name %></h1>')
```

Đây là một cú pháp được quy định bởi một thư viện được gọi là :

```
<a href="http://underscorejs.org/?utm_source=adrianmejia.com"><i>underscore.js</i></a>
```

Giờ thì hãy chú ý vào render function. Như bạn biết, Backbone.js không sử dụng HTML markup. Thay vì đó nó đã dùng template để thay thế. Tại đây tôi sử dụng Underscore's micro-template

## 4. Templates

Nếu chúng ta giả định Views trong Backbone như một controller trong MVC, thì Templates sẽ là View.

Tại đây chúng ta sẽ viết các thẻ html, và có thể gọi được các biến được truyền từ render function.

```
// /views/apps/index.js

var app = {};
  var AppView = Backbone.View.extend({
    el: $('#container'),
    template: JST['app/index'],
    initialize: function() {
      this.render();
    },
    event: function() {
        // xử lý sự kiện
    },
    render: function() {
      this.$el.html(this.template({name: 'world'}))
    }
  });

  app.views = new AppView();
  
  // /templates/apps/index.js
  
<h1>Hello <%= name %></h1>
```

Trên đây mình đã giới thiệu qua những thành phần cơ bản của backbone, trong bài viết tiếp theo mình sẽ tích hợp Backbone vào trong Rails API

Part 2: https://viblo.asia/p/xay-dung-ung-dung-co-ban-ket-hop-rails-5-api-voi-backbone-part-2-GrLZDQRElk0

Cảm ơn các bạn!

# Tài liệu tham khảo

https://www.upwork.com/hiring/development/backbone-js-an-mv-style-javascript-library/
https://backbonejs.org/