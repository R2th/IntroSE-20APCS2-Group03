Xây dựng các trang web động bằng JavaScript có thể là một công việc phức tạp. Các framework như jQuery, MoTools, và nhiều frameworks khác giúp cho việc tương tác với trình duyệt dễ dàng hơn nhiều. Tuy nhiên các DOM frameworks chỉ giải  quyết một vấn đề.
Khi xây dựng một ứng dụng có nhiều dữ liệu được cập nhật và bất kỳ thông tin nào được thể hiện trên page thì cần phải đảm bảo giao diện hiển thị chính xác dữ liệu tại bất kỳ thời điểm nào.
Có các application frameworks có thể xử lý vấn đề này như SproutCore, Cappuccino và ExtJs. Những tools này có thể bất tiện khi tích hợp vào một dự án hiện có. Các công cụ nhẹ như Backbone và Spine cung cấp các giải pháp dễ  hơn.
## MVVM Solution
KnockoutJs sử dụng mô hình MVVM (Model-View-ViewModel), nó là một biến thể của MVC. Mô hình MVVM gồm 3 phần chính là: Model, View, ViewModel. View và Model có chức năng vai trò như trong mô hình MVC. ViewModel trong MVVM như là một controller đặc biệt, nó cung cấp các hoạt động, logic cần thiết để view có thể lấy được dữ liệu thuận tiện. ViewModel được coi là một view trừu tượng, nó chứa trạng thái và các bihavior của view. Tuy nhiên ViewModel không chứa các tham chiếu đến thành phần của UI và không biết gì về các thành phần nhìn thấy của View. Do đó có sự tách biệt rõ ràng giữa View và ViewModel. Hay nói một cách khác là View layer là sự ánh xạ của ViewModel

Ví dụ:

HTML:
```
My name is
<span data-bind="text: name"></span>
```
Javascript:
```
var viewModel = {
  name: "Tu Anh"
}

ko.applyBindings(viewModel)
```
[Run code](https://jsfiddle.net/tuanhnt1712/eq1s9fuy/)

Trong ví dụ tạo một View trong HTML. Chúng ta cung cấp cho span một thuộc tính ràng buộc dữ liệu `data-bind` xác định nội dung của nó sẽ được xác định theo `name`.

Trong JavaScript chúng ta tạo một viewModel đơn giản như một đối tượng javascript bình thường và khởi tạo `name` có giá trị "Tu Anh". Trong ví dụ này, "Tu Anh" là một Model mặc dù một Model có thể là một đối tượng phức tạp hơn.

Khi chúng ta gọi ko.applyBindings() và truyền cho nó viewModel. View lấy dữ liệu và set `text` cho thẻ span giá trị của `name` trong viewModel.
## Observables
Ví dụ trên cho thấy cách mà Knockout có thể thực hiện thay thế text đớn giản nhưng điều gì xảy ra khi tôi gọi `viewModel.name = "Tu Em"`?

ViewModel sẽ update Model, nhưng view HTML sẽ không thay đổi giá trị `name`. Điều này là do không có cách nào để Knockout thông báo trực tiếp nằng dữ liệu trong ViewModel đã thay đổi.

Knockout cung cấp một đối tượng đặc biệt gọi là Observable để giải quyết vấn đề này. Một observable wraps một giá trị, hoặc Model và khi bạn thay đổi giá trị của chúng Knockout thông báo cho tất cả Views mà nó thay đổi. Bằng cách này View có thể tự cập nhật giá trị mới.
Hãy xem một ví dụ về cách sử dụng Observable

HTML:
```
My name is
<span data-bind="text: name"></span>
```
Javascript:
```
var viewModel = {
    name: ko.observable("Tu Anh")
}

setTimeout(function() {
    viewModel.name("Tu Em");
}, 2000);

ko.applyBindings(viewModel);
```
[run code](https://jsfiddle.net/tuanhnt1712/hfcswpg7/14/)

Code xem là giống nhau. Tuy nhiên, trong đối tượng viewModel, thay vì gán một chuỗi cho `name` thay vào đó chúng ta sử dụng `ko.observable("Tu Anh"). Đây là cách tạo ra một đối tượng Observable. Khi khỏi tạo, chúng ta có thể set giá trị khởi tạo, trong ví dụ là "Tu Anh".

Để truy cập và quan sát thay đổi giá trị của đối tượng, chúng ta cần xem nó như một function. Nếu gọi viewModel.name() sẽ trả về giá trị hiện tại. Để thiết lập trá trị, ta truyền cho nó một giá trị mới `viewModel.name("TuEm")`. Lúc này sẽ thay đổi giá trị và thông báo cho View rằng biến đó đã thay đổi.
## Bindings
Làm thế nào View biết để xem giá trị `name` và làm thế nào để nó biết phải làm gì khi nó thay đổi?

Cú pháp này tương tự như JSON, `key:value`. Một khóa là một kiểu ràng buộc,trong đó `text` thể hiện nội dung của thẻ, `value` là giá trị của đầu vào. 
## Sample Code
Mình sẽ lấy dữ liệu từ api mẫu về các posts. Dùng knockoutjs để sửa, xóa các post
HTML:
```
<h2>All posts</h2>
<div class="content">
    <div class="float-left">
    <ul id="update-posts" data-bind="foreach: posts">
        <li>
            <div>
                <div class="item">Post ID</div> <span data-bind="text: $data.id"></span>
            </div>
            <div>
                <div class="item">Title</div> 
                <input type="text" style="width: 1500px;" data-bind="value: $data.title"/>
            </div> 
            <div>
                <div class="item">Body</div> 
                <input type="text" style="width: 1500px;" data-bind="value: $data.body"/>
            </div>
            <div>
                <div class="item">User Id</div> 
                <input type="text" style="width: 1500px;" data-bind="value: $data.userId"/>
            </div>
            <div>
                <input type="button" value="Update" data-bind="click: $root.update"/>
                <input type="button" value="Delete Item" data-bind="click: $root.remove"/>
            </div>
        </li>
    </ul>
    </div>
</div>
```

Javascript:
```
function ProductsViewModel() {
          var self = this;
          self.posts = ko.observableArray();

          var baseUri = "https://jsonplaceholder.typicode.com/posts";

          self.create = function (formElement) {
              // If valid, post the serialized form data to the web api
              $(formElement).validate();
              if ($(formElement).valid()) {
                  $.post(baseUri, $(formElement).serialize(), null, "json")
                      .done(function (o) { self.posts.push(o); });
              }
          }

          self.update = function (post) {
              $.ajax({ type: "PUT", url: baseUri + '/' + post.id, data: post });
          }

          self.remove = function (post) {
              // First remove from the server, then from the UI
              $.ajax({ type: "DELETE", url: baseUri + '/' + post.id })
                  .done(function () { self.posts.remove(post); });
          }

          $.getJSON(baseUri, self.posts);
      }

      $(document).ready(function () {
          ko.applyBindings(new ProductsViewModel());
      })
```

[run code](https://jsfiddle.net/tuanhnt1712/75fsh6u4/6/)

Cảm ơn các bạn đã theo dõi

References: https://blog.teamtreehouse.com/build-dynamic-pages-with-knockout-js