Trong một lần nhận task phải format lại toàn bộ số nhập vào trong ô input là trường số như thêm dấu phẩy vào để thể hiện số hoặc số tiền. Ban đầu mình nghĩ ngay đến việc dùng  javascript để thêm dấu phẩy, ký hiệu đô la, v.v.. Mặc dù javascript xử lý khá ổn cho việc này, nhưng thật không may, rails không nhận dấu phẩy hoặc ký hiệu đô la trong các trường số, vì thế params mình gửi đi toàn nhận các trường vừa nhập là string, và dĩ nhiên nó trả về lỗi.

   Sau đó, mình thử đổi kiểu dữ liệu cho các trường số đó thành dạng text, nếu có tính toán thì mình sẽ ép kiểu cho chúng bằng parseInt hoặc parseFloat. Sau một hồi rất trâu bò để xử lý tất cả các phép tính và format lại từng ô input; thật perfect, mình cũng đã xử lý xong.
   
   Nhưng khi anh leader của mình nói cách này không ổn; mình đã đổi kiểu dữ liệu số thành text( là sai về mặt lý thuyết ), hơn nữa mình phải xử lý tất cả các ô input nhập số. Nghĩ tới phải format cả trăm, thậm chí nếu dự án có cả nghìn trường cần format số như này thì....Chắc mình không dám nghĩ nữa.
    
   Cuối cùng, với sự hỗ trợ của team, mình đã xử lý được tất cả vấn đề trên như một nốt nhạc với gem  autonumeric-rails. Nó có thể được tìm thấy trên github hoặc trên rubygems.org. Gem này sử dụng plugin jquery autoNumeric để định dạng đầu vào số bằng dấu phẩy, ký hiệu đô la hoặc bất cứ thứ gì bạn muốn. Nguyên lý của nó là khi người dùng nhập vào một số, nó sẽ format số đó theo mong muốn đàu vào mà ta đặt

## ĐÂY LÀ CÁCH NÓ HOẠT ĐỘNG:
Nguyên lý của gem này là khi người dùng nhập vào một số, nó sẽ format số đó theo yêu cầu đầu vào mà ta set trong form bằng javascript. sau đó cũng bằng cách tuơng tiự, nó dùng js để tước bỏ hết các kí tự vừa thêm, gửi params với kiểu dữ liệu Int(hay float) ban đầu. Chính vì vậy; đối với những trường mà hiển thị kết quả tionhs toán từ các trường nhập vào ta vẫ phải ép kiểu cho nó và tính toán bằng js.

## VẬY LÀM THẾ NÀO ĐỂ SỬ DỤNG NÓ?
Việc triển khai gem rất đơn giản và nó có thể được sử dụng với hầu hết các tùy chọn từ plugin jquery autoNumeric. Đây là cách thực hiện:

**1. Add gem này vào Gemfile và chạy bundle lại**
```
gem "autonumeric-rails"
```
**2. Đảm bảo rằng jquery phải có trong ứng dụng của bạn và thêm tệp javascript của automeric**
```
//= require jquery
//= require autonumeric
```

**3. Thêm thuộc tính dữ liệu cần thiết vào trường đầu vào của bạn** 

Đây là nơi trang web plugin jquery autoNumeric có ích, có giao diện tương tác để xây dựng thuộc tính dữ liệu phù hợp dựa trên nhu cầu của bạn. Dưới đây là một vài ví dụ.
```
<%= form_for @model do |f| %>
  <%= f.text_field :decimal, label: "Just a number with commas and 2 decimal places", data: {autonumeric: true} %>
  <%= f.text_field :dollaz, label: "Standard monitary input", data: {autonumeric: {aSign: '$ ', mDec: 2}} %>
  <%= f.text_field :integer, label: "Just an integer with commas", data: {autonumeric: {mDec: 0}} %>
  <%= f.text_field :posInt, label: "Positive integer with commas", data: {autonumeric: {vMin: 0}} %>
  <%= f.text_field :posDec, label: "Positive decimal with commas and two decimal places", data: {autonumeric: {vMin: 0.00}} %>
<% end %>
```
Vậy là xong với việc format các trường nhập số.

Nhưng với các trường động, đôi khi chúng ta muốn thêm các trường động (khi trang đã được tải). Gem autoNumeric cần được làm mới khi thêm bất kỳ trường nào để chúng được định dạng tương ứng. Cũng cần chỉ ra rằng chúng ta phải sử dụng các lệnh gọi javascript của GEM chứ không phải các cuộc gọi của plugin jQuery.

Vì vậy, đối với một số trường lồng nhau trong cocoon:
```
$('div#dynamic').on('cocoon:after-insert', function(e, insertedItem) {
	$(document).trigger('refresh_autonumeric');
});
```

chúng ta thêm javascript sau.

```
<div class="nested-fields">
  <%= form_for @model do |f| %>
    <%= f.text_field :decimal, label: "Just a number with commas and 2 decimal places", data: {autonumeric: true} %>
    <%= f.text_field :dollaz, label: "Standard monitary input", data: {autonumeric: {aSign: '$ ', mDec: 2}} %>
    <%= f.text_field :integer, label: "Just an integer with commas", data: {autonumeric: {mDec: 0}} %>
    <%= f.text_field :posInt, label: "Positive integer with commas", data: {autonumeric: {vMin: 0}} %>
    <%= f.text_field :posDec, label: "Positive decimal with commas and two decimal places", data: {autonumeric: {vMin: 0.00}} %>
  <% end %>
</div>
```
**4. Javascript DOM manipulation**

 Khi một hàm Javascript tạo và thêm vào các trường mới DOM với các thuộc tính tự động, bạn phải làm mới thủ công để khởi tạo các trường mới đó.

Để làm như vậy, bạn phải kích hoạt sự kiện `refresh_autonumeric` trên tài liệu sau khi bạn sửa đổi DOM:
```
$(document).trigger('refresh_autonumeric');
```
Như vậy trên đây mình đã giới thiệu đến các bạn một gem rất hữ ích để format số. Nếu các bạn muốn tìm hiểu sâu hơn có thể [xem chi tiết gem này trên github.](https://github.com/randoum/autonumeric-rails)

*Link tham khảo*

[gem atonumeric-rails](https://github.com/randoum/autonumeric-rails)