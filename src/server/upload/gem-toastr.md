**Toastr** là một thư viện Javascript dùng cho việc hiển thị các thông báo một cách độc lập. Để dùng toastr bắt buộc phải có Jquery.
# **1. Cài đặt**

Trong Ruby on the Rails, việc cài đặt gem toastr khá đơn giản:

```Ruby
# Gemfile

gem 'toastr-rails'
```
```
# application.coffee
    
#= require toastr
// application.scss
```
```
@import "toastr";
```

# **2. Cách dùng**

1. Link to toastr.css <link href="toastr.css" rel="stylesheet"/>

2. Link to toastr.js <script src="toastr.js"></script>

3. Toastr hỗ trợ hiển thị các loại thông báo sau: *info, , success, warning hoặc error*

```Ruby

// Hiển thị thông báo thông thường không có title
toastr.info('Are you the 6 fingered man?')

// Hiển thị cảnh báo không có title
toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')

// Hiển thị thông báo thành công có title
toastr.success('Have fun storming the castle!', 'Miracle Max Says')

// Hiển thị thông báo lỗi có title
toastr.error('I do not think that word means what you think it means.', 'Inconceivable!')

// Xóa thông báo ngay lập tức
toastr.remove()

// Xóa nhưng kèm theo hiệu ứng từ từ ẩn đi
toastr.clear()
```

**Tùy chọn hiệu ứng**

 Các hiệu ứng mặc định: 
```Ruby
toastr.options.showEasing = 'swing';
toastr.options.hideEasing = 'linear';
toastr.options.closeEasing = 'linear';
```

Muốn dùng thêm hiệu ứng khác cần cái đặt thêm  jQuery Easing plugin (http://www.gsgd.co.uk/sandbox/jquery/easing/)

```Ruby
toastr.options.showEasing = 'easeOutBounce';
toastr.options.hideEasing = 'easeInBack';
toastr.options.closeEasing = 'easeInBack';
```

**Animation Method**

Bạn có thể chọn một số phương thức hiển thị sau: show/hide, fadeIn/fadeOut, slideDown/slideUp

```Ruby
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';
toastr.options.closeMethod = 'slideUp';
```

**Tránh các thông báo trùng lặp**

Để tránh các thông báo trùng lặp bạn có thể sử dụng:

```
toastr.options.preventDuplicates = true;
```

**Thanh trạng thái (Progress Bar)**
Để hiển thị thanh trạng thái của tin nhắn:

```
toastr.options.progressBar = true;
```
 
Tài liệu dịch: https://github.com/CodeSeven/toastr