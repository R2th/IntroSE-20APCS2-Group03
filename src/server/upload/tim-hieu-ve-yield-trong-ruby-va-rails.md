Để tìm hiểu về Yield là gì?

Trước hết chúng ta cần biết đến block trong Ruby

## Block là gì?
Block là  đơn giản là đặt code vào bên trong do..end

Bạn có thể viết bằng 2 cách: 

Nhiều dòng,  viết nằm giữa do và end

Một dòng, viết trong {}

Cả hai cách đều cho ra một kết quả giống nhau, nhưng khi dòng code của bạn quá dài thì nên lựa chọn cách viết thứ 2, bởi nó giúp code của dễ đọc hơn
```
[1, 2, 3].each do |n|
  puts "Number #{n}"
end
```
giống như 
```
[1, 2, 3].each {|n| puts "Number #{n}"}
```
## Đối với Yield trong Ruby: 
Yield được gọi trong phần thân của 1 method.

Tác dụng của nó là khi gọi Yield bên trong 1 method, nó sẽ thực thi code mà truyền vào method đó thông qua 1 block


Ví dụ: 

```
def rb_block
  puts 'Start' yield puts 'End'
end

rb_block {puts "We're in the block"} 
```
Kết quả: 
```
Start We're in the block End
```

## Đối với Yield trong Ruby On Rails:
Trong nội dung của 1 layout, yield sẽ xác định các phần nơi mà nội dung từ view có thể được thêm vào.

Cách đơn giản nhất là dùng từ khóa yield, nó sẽ thêm toàn bộ nội dung hiện tại của view mà đang được render

Yield chèn đc nội dung nhờ vào các symbol truyền vào nó

```
<%= yield :sidebar %>, <%= yield :header %>, <%= yield :footer %>
```
Có thể sử dụng nhiều phần yield với tên khác nhau trong 1 layout
Ví dụ: `<%= yield :header %>` 
Khi cần sử dụng thì dùng content_for để thay đổi nội dung các yield đó 
```
<% content_for :header do %>
  <title>A simple page</title>
<% end %>
```
Content_for rất có lợi khi sử dụng các layout chứa các phần riêng biệt như header, footer hoặc các sidebar.

Trong Rails thì code để thực thi trong block chính là template của controller/action hiện tại.

Ví dụ: 
Nếu ta có **StaticPagesController** với **index** action, với route đc cấu hình đúng. 

Khi vào trang index đó Rails sẽ load layout của application là **views/layouts/application.html.erb**.

Khi nó đi đến câu lệnh yield, nó sẽ truyền vào block ở đây là view của index action là **views/static_pages/index.html.erb** tại vị trí mà yield đang ở trong **views/layouts/application.html.erb** .

Sau đó nó sẽ tải nốt phần còn lại của layout.