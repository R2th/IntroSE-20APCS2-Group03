RoR cung cấp cho chúng ta 1 form helper khá hay ho là: `collection_select `
## Giới thiệu chung 
Cấu tạo cơ bản của form_helper này là:<br>
 `collection_select(object, method, collection, value_method, text_method)`
 <br>Khi chuyển sang HTML nó sẽ có dạng:<br>
 ```HTML
<select name="object[method]" id="object_method">
  <option value="value_method">text_method</option>
  <option value="value_method">text_method</option>
  
  ...
```
<br>Với mỗi đối tượng trong mảng `collection` tương ứng với 1 thẻ `option`
## <br>Chi tiết
<br>Ví dụ , chúng ta muốn tạo mới 1 bài hát và muốn chọn nhiều thể loại cho bài hát đó. Và chúng ta có:<br>
```ruby
<%= form_for @song do |f| %>
  <%= collection_select(object, method, collection, value_method, text_method) %>
  <%= f.submit %>
<% end %>
```
### <br>1. Object và Method
<br>Chính 2 đối số này quyết định `name` và` id` của thẻ select:
Và trong trường hợp này: <br>
```ruby
<%= form_for @song do |f| %>
  <%= f.collection_select :genre_id, collection, value_method, text_method %>
  <%= f.submit %>
<% end %>
```
HTML:
```html
<select name="song[genre_id]" id="song_genre_id">
  <option value="value_method">text_method</option>
  <option value="value_method">text_method</option>
...
```
### 2. Collection
Là một mảng các lựa chọn (options). ví dụ trong hợp này chúng ta sẽ lấy `Genre.all`, lấy ra 1 mảng gồm tất cả các đối tượng của bảng Genre để lựa chọn
```ruby
<%= form_for @song do |f| %>
  <%= f.collection_select :genre_name, Genre.all, value_method, text_method %>
  <%= f.submit %>
<% end %>
```
### 3. Value_method
Chính là giá trị chúng ta nhận được khi chọn các option có trong collection trên
```ruby
<%= form_for @song do |f| %>
  <%= f.collection_select :genre_id, Genre.all, :id, text_method %>
  <%= f.submit %>
<% end %>
```
HTML:
```html
<select name="song[genre_id]" id="song_genre_id">
  <option value="1">text_method</option>
  <option value="2">text_method</option>
  <option value="3">text_method</option>
  <option value="4">text_method</option>
  <option value="5">text_method</option>
...
```
### 4. Text_method
Là giá trị hiển thị của mỗi option trong form. Ví dụ chúng ta muốn hiện tên thể loại nhưng khi chọn thì nhận được params chỉ là id:
```
<%= form_for @song do |f| %>
  <%= f.collection_select :genre_id, Genre.all, :id, :name %>
  <%= f.submit %>
<% end %>
```
HTML: 
```html
<select name="song[genre_id]" id="song_genre_id">
  <option value="1">Blues</option>
  <option value="2">Classic Rock</option>
  <option value="3">Country</option>
  <option value="4">Dance</option>
  <option value="5">Disco</option>
...
```
### Kết Luận 
Vừa rồi là bài chia sẻ những kiến thức của em về collection_select và chắc chắn nó vẫn còn xấu và phải chọn nhiều option = cách giữ Ctrl vì thiếu CSS và Javascript . Em sẽ cố gắng chia sẻ tiếp ở bài viết sau.<br>
Tài liệu tham khảo: [https://medium.com/@theresamorelli/collection-select-what-the-heck-4e1cabc4be4b](https://medium.com/@theresamorelli/collection-select-what-the-heck-4e1cabc4be4b)