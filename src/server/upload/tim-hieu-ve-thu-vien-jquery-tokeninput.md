Khi bạn tham gia vào một dự án đang phát triển thì việc phải đọc code đã có để fix bug hay chỉnh sửa tính năng là điều không thể tránh khỏi. Bản thân mình cũng thế, và vừa rồi khi làm task, phải nghiên cứu code đã có sẵn, mình cảm thấy rất hứng thú với thư viện jQuery TokenInput mà người đi trước đã sử dụng. Vậy nên, mình muốn tìm hiểu thêm về thư viện này và chia sẻ với mọi người. Cùng bắt đầu nhé!

# Giới thiệu
Tokeninput là một jQuery plugin cho phép người sử dụng có thể chọn nhiều mục từ một danh sách được định nghĩa từ trước, sử dụng tính năng auto complete ngay khi họ gõ phím để tìm kiếm từng mục tương ứng. Bạn có thể đã thấy một kiểu tương tự như thế khi nhập vào trường người nhận trong khung gửi tin nhắn trên facebook
![](https://images.viblo.asia/d019eacc-9d6e-4add-8a8f-f40bcaee5dd4.PNG)

# Các tính năng
Tokeninput cung cấp cho chúng ta khá là nhiều thứ như:

- Giao diện người dùng trực quan cho phép chọn nhiều mục từ một danh sách lớn.
- Dễ dàng tuỳ chỉnh CSS.
- Hỗ trợ bất kì ngôn ngữ phía backend nào mà cho phép tạo JSON, ví dụ như: PHP, Rails, Django, ASP.net, ...
- Animation mượt mà khi load kết quả.
- Có thể chọn, xóa và điều hướng các mục bằng chuột hoặc bàn phím.
- Cache kết quả ở phía client nhằm giảm tải việc truy vấn lên server.
- Hỗ trợ crossdomain thông qua JSONP.
- Hỗ trợ callback khi các mục được thêm hoặc xóa khỏi danh sách chọn.
- Có thể xử lý kết quả nhận được từ server trước khi hiển thị bằng callback onResult.
- Có thể dễ dàng thêm mới, loại bỏ, xoá sạch hay lấy mục được chọn bằng các phương thức có sẵn.
- Dễ dàng tuỳ chỉnh cách hiển thị của các kết quả tìm kiếm và các mục được chọn.

# Cài đặt
Trước tiên bạn hãy download file js và css của thư viện từ github https://github.com/loopj/jquery-tokeninput nhé.

Vì đây là một thư viện mở rộng jQuery nên bạn phải nhúng thêm thư viện jquery trước khi nhúng thư viện Tokeninput.

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.tokeninput.js"></script>
<link rel="stylesheet" type="text/css" href="token-input.css" />
```

# Sử dụng
Để sử dụng Tokeninput, trước tiên, cần chuẩn bị 1 thẻ input:
```html
<input type="text" id="demo-input">
```

Có 2 cách load dữ liệu đầu vào để tìm kiếm, cách thứ nhất là dùng các object JS ở local, ví dụ:
```javascript
$("#demo-input").tokenInput([
  {id: 7, name: "Ruby"},
  {id: 11, name: "Python"},
  {id: 13, name: "JavaScript"},
  {id: 17, name: "ActionScript"},
  {id: 19, name: "Scheme"},
  {id: 23, name: "Lisp"},
  {id: 29, name: "C#"},
  {id: 31, name: "Fortran"},
  {id: 37, name: "Visual Basic"},
  {id: 41, name: "C"},
  {id: 43, name: "C++"},
  {id: 47, name: "Java"}
], {
  // các options
});
```
Cách thứ 2 là load dữ liệu thông qua truy vấn AJAX:
```javascript
$("#demo-input").tokenInput("json.php", {
  // các options
});
```
Tham số thứ 2 của phương thức `tokenInput()` gọi ra ở trên chính là các tuỳ chọn được cung cấp như sau:
* Cài đặt tìm kiếm
    * *method*: phương thức HTTP để gửi truy vấn lên server, mặc định là `GET`
    * *queryParam*: tên params chứa các thông tin tìm kiếm mà bạn muốn server nhận được, mặc định là `q`
    * *searchDelay*: Khoảng thời gian trễ để gửi request lên server sau khi người dùng nhập phím xong, tính bằng mili giây, mặc định là `300`
    * *minChars*: Số ký tự tối thiểu mà người dùng phải nhập trước khi việc tìm kiếm được thực hiện, mặc định là `1`
    * *propertyToSearch*: Thuộc tính đối tượng javascript / json được dùng để tìm kiếm, mặc định là `name`
    * *jsonContainer*: Tên của đối tượng json trong response của kết quả tìm kiếm. Tuỳ chọn này thường được sử dụng khi server của bạn trả về thêm các dữ liệu khác ngoài kết quả tìm kiếm. Để là `null` để sử dụng đối tượng response mức ngoài cùng, mặc định là `null`
    * *crossDomain*: Ép dùng giao tiếp JSONP tới server thay vì gửi truy vấn ajax bình thường. Lưu ý: JSONP được bật tự động nếu phát hiện yêu cầu tìm kiếm là truy vấn cross-domain, mặc định là `false`
* Cài đặt sẵn giá trị
    * *prePopulate*: Đặt trước tokeninput với dữ liệu có sẵn. Giá trị phải là một mảng các đối tượng JSON như: `[{id: 3, name: "test"}, {id: 5, name: "awesome"}]`, mặc định là `null`
* Cài đặt hiển thị
    * *hintText*: Văn bản hiển thị trong dropdown xuất hiện khi bạn focus vào trường tìm kiếm, mặc định là `"Type in a search term"`
    * *noResultsText*: Văn bản hiển thị trong dropdown khi không tìm thấy kết quả nào khớp với từ khoá vừa nhập, mặc định là `"No results"`
    * *searchingText*: Văn bản hiển thị trong dropdown khi tìm kiếm đang được xử lý, mặc định là `"Searching..."`
    * *deleteText*: Văn bản hiển thị trên mỗi tokeninput mà sẽ xóa tokeninput khi được click vào. Nếu bạn muốn ẩn nút xóa thì hãy truyền vào đây 1 chuỗi rỗng. Ngoài ra, bạn có thể cung cấp chuỗi html tại đây nếu bạn muốn hiển thị hình ảnh để xóa toleninput, mặc định là `"×"`
    * *animateDropdown*: Tuỳ chọn bật tắt animation của dropdown, mặc định là `true`
    * *theme*: Đặt giá trị chuỗi cho thuộc tính này, ví dụ: “facebook” khi nhúng theme css để đặt hậu tố cho các class trong css, mặc định là `null`
    * *resultsLimit*: Số lượng kết quả tối đa được hiển thị trong dropdown. Đặt là `null` để hiển thị tất cả các kết quả phù hợp, mặc đinh là `null`
    * *resultsFormatter*: Một hàm trả về một chuỗi HTML nội suy cho mỗi kết quả. Có thể sử dụng thuộc tính này khi bạn muốn hiển thị hình ảnh hoặc kết quả được định dạng nhiều dòng, mặc định là `function(item){ return "<li>" + item.propertyToSearch + "</li>" }`
    * *tokenFormatter*: Một hàm trả về một chuỗi HTML nội suy cho mỗi tokeninput được chọn. Có thể sử dụng thuộc tính này khi bạn muốn hiển thị hình ảnh hoặc kết quả được định dạng nhiều dòng, mặc định là `function(item){ return "<li><p>" + item.propertyToSearch + "</p></li>" }`
* Cài đặt cho token
    * *tokenLimit*: Số lượng kết quả tối đa được phép chọn bởi người dùng. Sử dụng `null` để cho phép lựa chọn không giới hạn, mặc định là `null`
    * *tokenDelimiter*: Dấu phân tách để sử dụng khi submit form gửi kết quả trở lại server, mặc định là `","`
    * *preventDuplicates*: Ngăn người dùng chọn các giá trị trùng lặp bằng cách đặt giá trị này thành `true`, mặc định là `false`
    * *tokenValue*: Thuộc tính của đầu vào của tokeninput khi đầu vào được gửi. Đặt nó thành `id` để có được một dãy các id của các token được chọn, hoặc để `name` để có được một dãy kết nối của `name`, mặc định là `"id"`
* Callback
    * *onResult*: Một hàm được gọi bất cứ khi nào nhận được response từ server. Bạn có thể sử dụng chức năng này để xử lý trước các kết quả từ server trước khi chúng được hiển thị ra cho người dùng, mặc định là `null`
    * *onAdd*: Một hàm được gọi bất cứ khi nào người dùng chọn thêm 1 tokeninput, mặc định là `null`
    * *onDelete*: Một hàm được gọi bất cứ khi nào người dùng loại bỏ 1 tokeninput khỏi danh sách đã chọn, mặc định là `null`
    * *onReady*: Một hàm được gọi sau khi khởi tạo xong và tokeninput đã sẵn sàng để sử dụng, mặc định là `null`

Ngoài các options trên, thư viện còn cung cấp cho chúng ta 1 số phương thức để thao tác trực tiếp với các giá trị của trường input như sau:
* `selector.tokenInput("add", {id: x, name: y});`: Thêm token mới có `id` là `x` và `name` là `y` vào danh sách tokeninput được chọn
* `selector.tokenInput("remove", {id: x});`: Loại bỏ token có `id` là `x` từ danh sách tokeninput được chọn
* `selector.tokenInput("remove", {name: y})`: Loại bỏ token có `name` là `y` từ danh sách tokeninput được chọn
* `selector.tokenInput("clear")`: Xoá bỏ toàn bộ tokeninput được chọn
* `selector.tokenInput("get")`: Lấy ra mảng các token đã được chọn

# Kết luận
Trên đây là một số điều mình tìm hiểu được về thư viện jquery Tokeninput, mọi người có thể đọc thêm về thư viện này ở trang gốc http://loopj.com/jquery-tokeninput/

Cảm ơn đã quan tâm đến bài viết của mình!