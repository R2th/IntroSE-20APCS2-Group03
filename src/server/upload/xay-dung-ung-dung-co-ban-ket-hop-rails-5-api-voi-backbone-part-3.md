Ở bài viết trước, chúng ta đã cùng nhau khởi tạo, cấu hình được project và đã hiển thị được danh sách **Post** bằng backbone rồi, và để hiểu kỹ hơn thì các bạn có thể xem lại bài viết trước của mình [tại đây](https://viblo.asia/p/xay-dung-ung-dung-co-ban-ket-hop-rails-5-api-voi-backbone-part-2-GrLZDQRElk0).

Trong bài này, chúng ta cùng đi xây dựng tiếp các phương thức: `show`, `create` và `update` cho **Post** để cho project của chúng ta được hoàn thiện hơn nhé.

# 1. Routers

Chúng ta sẽ cập nhật lại file `posts_router.js` như sau:

```
# /javacripts/routers/post_router.js

MyPost.Routers.Posts = Backbone.Router.extend({
  routes: {
    '': 'index',
    ':id': 'show'
    'new': 'new',
    ':id/edit': 'edit'
  },
  
  initialize: function() {
    this.collection = new MyPost.Collections.Posts();
    this.collection.fetch({reset: true});
  },

  index: function() {
    this.postIndexView = new MyPost.Views.PostsIndex({el: '#container', collection: this.collection});
  },
  
  show: function(id) {
    var model = this.collection.get('id');
    var currentView = new new MyPost.Views.PostsShow({el: '#container', model: model});
    currentView.render();
  },
  
  new: function() {
    this.postIndexView = new MyPost.Views.PostsNew({el: '#container', collection: this.collection});
  },

  edit: function(id) {
    var model = this.collection.get('id');
    var currentView = new new MyPost.Views.PostsEdit({el: '#container', model: model});
    currentView.render();
  },

  start: function() {
    Backbone.history.start();
  }
});
```

Trong đoạn code trên thì chúng ta đã định nghĩa ra các routes cần khởi tạo, và bên dưới sẽ là các phương thức tương ứng với từng routes.

# 2. Views

Từ `Routers` trong files `post_router.js`  chúng ta sẽ định nghĩa ra các view tương ứng như sau. Và mình cũng muốn lưu ý một chút là view trong backbone sẽ tương tự như controller trong MVC vậy, mình cũng đã giải thích phần view này ở các bài trước rồi, nếu các bạn muốn hiểu kỹ hơn thì có thể đọc lại bài trước của mình.

## 2.1 Show

Trong phần file này chúng ta sẽ hiển thị 1 post trong phần template được define như bên dưới đây:

```
# /views/posts/show.js

MyPost.Views.PostsShow = Backbone.View.extend({
  template: JST['posts/show'],

  render: function() {
    return this.$el.html(this.template(model: this.model));
  }
});
```

## 2.2 New

Tiếp theo là form tạo mới 1 post. chúng ta sẽ xây dựng như sau

```
# /views/posts/new.js

MyPost.Views.PostsNew = Backbone.View.extend({
  template: JST['posts/new'],
  
  initialize: function() {
    this.model = new this.collection.model();
  },
  
  event: function() {
    'submit #new-post': 'save'
  },
  
  save: function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    this.collection.create(this.model.toJSON(), {
      success: (function(_this) {
        return function(post) {
          _this.model = post;
          return window.location.hash = "/" + _this.model.id;
        };
      })(this),
      error: (function(_this) {
        return function(post, jqXHR) {
          return _this.model.set({
            errors: $.parseJSON(jqXHR.responseText)
          });
        };
      })(this)
    });
  },

  render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$("form").backboneLink(this.model);
      return this;
  }
});
```

## 2.3 Edit

Để cập nhật lại 1 **post** thì chúng thực hiện như sau:

```
# /views/posts/new.js

MyPost.Views.PostsEdit = Backbone.View.extend({
  template: JST['posts/edit'],
  
   event: function() {
    'submit #edit-post': 'update'
  },

  update: function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this.model.save(null, {
      success: (function(_this) {
        return function(post) {
          _this.model = post;
          return window.location.hash = '/' + _this.model.id;
        };
      })(this)
    });
  },
    
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$("form").backboneLink(this.model);
    return this;
  },  
    
  render: function() {
    return this.$el.html(this.template(model: this.model));
  }
});
```

Bây giờ chúng ta cần hiển thị các đoạn code html trong templates tương ứng với từng file view chúng ta vừa tạo ở trên

# 3. Templates

## 3.1 Show

```
# /templates/posts/show.js

<p>
  <b>Title:</b>
  <%= model.title %>
</p>

<p>
  <b>Body:</b>
  <%= model.body %>
</p>


<a href="#/index">Back</a>
```


## 3.2 New


```
# /templates/posts/new.js

<h1>New post</h1>

<form id="new-post" name="post">
  <div class="field">
    <label for="title"> title:</label>
    <input type="text" name="title" id="title" value="<%= title %>" >
  </div>

  <div class="field">
    <label for="body"> body:</label>
    <input type="text" name="body" id="body" value="<%= body %>" >
  </div>

  <div class="actions">
    <input type="submit" value="Create Post" />
  </div>

</form>

<a href="#/index">Back</a>
```

## 3.3 Edit

```
# /templates/posts/edit.js

<h1>Edit Post</h1>

<form id="edit-post" name="post">
  <div class="field">
    <label for="title"> title:</label>
    <input type="text" name="title" id="title" value="<%= title %>" >
  </div>

  <div class="field">
    <label for="post"> post:</label>
    <input type="text" name="post" id="post" value="<%= post %>" >
  </div>

  <div class="actions">
    <input type="submit" value="Update Post" />
  </div>

</form>

<a href="#/index">Back</a>
```

Vậy là  chúng ta đã hoàn thành việc tạo 1 resource cho **Post** rồi. Trên đây là những phần mình tìm hiểu được, nếu có phần nào chưa đúng thì rất mong được sự góp ý của các bạn. Xin cảm ơn!

# Tài liệu tham khảo
http://blog.magmalabs.io/2012/08/28/backbone-js-basic-rails-example.html

https://backbonejs.org/

http://blog.magmalabs.io/2012/08/28/backbone-js-basic-rails-example.html