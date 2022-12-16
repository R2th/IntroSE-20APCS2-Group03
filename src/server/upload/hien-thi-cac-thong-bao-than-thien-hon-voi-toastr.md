Có thể bạn thấy việc hiển thị thông báo với bosstrap là khá nhàm chán, bạn cần một thư việc khác hiển thị thông báo một cách sinh động hơn. `Toastr` là một lựa chọn rất tốt bạn có thể thử và trải nghiệm. `toastr` là một thư viện Javascript dùng cho việc hiển thị các thông báo một cách độc lập. Để sự dụng `toastr` việc đầu tiên trang web của bạn cần có Jquery.

Việc cài đặt `toastr` khá đơn giản

Nếu bạn dùng bower bạn chỉ cần cài thêm gói `toastr` là đủ

```
bower install toastr
```

Tương tự với npm

```
npm install --save toastr
```

Nếu bạn dùng Rails bạn có thể dùng gem `toastr-rails` cũng khá đơn giản
```ruby
# Gemfile

gem 'toastr-rails'
```
```javascript
# application.coffee

#= require toastr
```
```
// application.scss

@import "toastr";
```

#### Sử dụng toastr

Như vậy ta đã xong việc cài đặt. Giờ ta đi vào việc sử dụng toastr

Toastr hỗ trợ bạn hiển thị 4 loại message thông báo thông thường là Success, Info, Warning và Error

Ví dụ
```javascript
// Hiển thị thông báo loại warning không có tiêu đề (title)
toastr.warning('Nội dung thông báo')

// Hiển thị thông báo loại success không có tiêu đề (title)
toastr.success('Nội dung thông báo', 'title')

// Hiển thị thông báo loại error
toastr.error('Nội dung lỗi.', 'Gặp lỗi!')

// Hiển thị thông báo thành công với một số tùy chọn khác
toastr.info('Nội dung thông báo thông tin', '', {timeOut: 5000})
```

toastr cũng hỗ trợ bạn việc xóa/ẩn thông báo thông qua phương thức remove và clear
```javascript
// Thông báo sẽ được xóa ngay lập tức
toastr.remove()

// Thông báo được xóa nhưng kèm theo hiệu ứng từ từ ẩn đi
toastr.clear()
```

Qua một số ví dụ trên ta có thể thấy việc sử dụng `toastr` để hiển thị thông báo có cấu trúc chung sau

```javascript
toastr.<tên phương thức>(<nội dung thông báo>, <tiêu đề của thông báo>, <các tùy chọn khác>)
```

Một số tùy chọn cấu hình của `toastr`

#### Tránh các ký tự đặc biệt, thẻ HTML (Escape HTML characters)

Để tránh trang web bị tấn công qua các thông báo dưới dạng html bạn có thể sử dụng options excape HTML để trang web của bạn an toàn hơn
Ví dụ
Thông báo không an toàn
```javascript
toastr.info("<script>alert('Script chứa mã độc')</script>")
```

Thông báo an toàn
```javascript
toastr.options.escapeHtml = true;
// sau khi escapeHtml thì đoạn script trong nội dung thông báo sẽ không thể chạy được
toastr.info("<script>alert('Script chứa mã độc')</script>")
hoặc
toastr.info("<script>alert('Script chứa mã độc')</script>", undefined, {escapeHtml: true})
```

Nút đống thông báo (close button)

Bạn có thể hiển thị nút đóng thông báo như sau
```javascript
toastr.options.closeButton = true;
```
Hoặc bạn có thể thay đổi nút đóng thông báo tùy ý như sau

```javascript
toastr.options.closeHtml = '<button><i class="icon-off"></i></button>';
```

hoặc các khác bạn không muốn thay đổi html thì bạn có thể css lại cho nút đóng thông báo thông qua class sau `#toast-container .toast-close-button`

#### Thay đổi hiệu ứng đóng thông báo

```javascript
toastr.options.closeMethod = 'fadeOut';
toastr.options.closeDuration = 300;
toastr.options.closeEasing = 'swing';
```

Hiển thị theo thứ tự ưu tiên
Theo mặc định thì thông báo mới nhất sẽ hiển thị ở trên, tuy nhiên bạn có thể cho thông báo mới nhất hiển thị ở dưới như sau
```javascript
toastr.options.newestOnTop = false;
```

#### Một số  callbacks

```javascript
toastr.options.onShown = function() { console.log('show callback'); }
toastr.options.onHidden = function() { console.log('hide callback'); }
toastr.options.onclick = function() { console.log('click callback'); }
toastr.options.onCloseClick = function() { console.log('close click callback'); }
```

#### Tùy chỉnh một số hiệu ứng

Toastr có hỗ trợ mặc định một số hiệu ứng. Tuy nhiên bạn vẫn có thể thay đổi các hiệu ứng theo ý thích của mình

#### Hiệu ứng chuyển động (Easings)

Theo mặc định các hiệu ứng hiển thị hoặc ẩn thông báo như sau (swing và linear đều được hỗ trợ sẵn bởi Jquery)
```javascript
toastr.options.showEasing = 'swing';
toastr.options.hideEasing = 'linear';
toastr.options.closeEasing = 'linear';
```
Tuy nhiên bạn có thể thay đổi một số hiệu ứng khác bạn có thể thêm một plugin mới [Jquery plugin](http://www.gsgd.co.uk/sandbox/jquery/easing/)

```javascript
toastr.options.showEasing = 'easeOutBounce';
toastr.options.hideEasing = 'easeInBack';
toastr.options.closeEasing = 'easeInBack';
```

#### Cách thức hiện thị (Animation Method)

Bạn có thể chọn một số phương thức hiển thị sau `show/hide`, `fadeIn/fadeOut`, `slideDown/slideUp`. Tất cả các phương thức này đều được hỗ trợ bởi Jquery. Mặc định toastr dùng phương thức `fadeIn/fadeOut`
```javascript
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';
toastr.options.closeMethod = 'slideUp';
```
#### Tránh các thông báo trùng lặp

Để tránh các thông báo trùng lặp bạn có thể dùng tùy chọn sau
```javascript
toastr.options.preventDuplicates = true;
```

#### Thanh trạng thái (Progress Bar)

Bạn có thể hiện thị thanh trạng thái của tin nhắn như sau

```javascript
toastr.options.progressBar = true;
```

Tham khảo

1. [github-toastr](https://github.com/CodeSeven/toastr)
2. [examples](http://codeseven.github.io/toastr/demo.html)