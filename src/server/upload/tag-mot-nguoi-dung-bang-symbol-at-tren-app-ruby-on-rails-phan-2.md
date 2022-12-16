# Giới thiệu
Cá nhân mình thấy tính năng tag người dùng bằng symbol (@) là một trong những tính năng khá phỗ biến. Nó đang được tích hợp trên rất nhiều trang web chúng ta đang dùng hằng ngày như: 
[Viblo](https://viblo.asia/), [Unipos](https://unipos.me/), [Chatwork](https://www.chatwork.com/)... Nó như là một phần không thể thiếu với các tính năng như chat box, comment... 
Trước đây mình đã có viêt một bài viết giới thiệu cách để triển khai tính năng này trên app Ruby On Rails các bạn có xem lại [tại đây](https://viblo.asia/p/tag-mot-nguoi-dung-bang-symbol-at-tren-app-ruby-on-rails-gGJ592o1KX2).

Gần đây thì mình lại có dịp triển khai nó trên một dự án khác. Khi triển khai lại theo bài viết cũ thì gặp 1 vấn đề là k tag người dùng  được khi chuyển đổi bộ gõ sang tiếng việt. Vì vậy hôm nay mình viết tiếp phần 2 để giải quyết vấn đề này và đi vào phần làm thế nào để lấy được những người dùng đã được tag trong đoạn text, sau đó gửi thông báo đến những người dùng này.
# Giải pháp
Phần trước mình đã triển khai được khi gõ @ sẻ hiện ra 1 danh sách tên người dùng, từ đó các bạn có thể chọn một người dùng để tag hoặc gõ tiếp các keyword để hiện ra đúng tên người dùng mình muốn tag. 
Cụ thể thư viện [at.js](https://github.com/ichord/At.js) sẻ xử lý như sau:
1.  bắt các keyword được gõ bằng sự kiện [onKeyup ](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js#L288)
2.  xử lý các keyword bắt  được tại hàm [lookUp ](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js#L484)
3.  lọc và chỉ lấy các keyword phía sau flag (mình setting flag là @) tại hàm [matcher](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js#L44) 
4.  sau đó gọi hàm [fillter](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js#L61) để search và trả về các tên người dùng phù hợp

Nhưng khi bạn sử dụng bộ gõ tiếng việt trên hệ điều hành OSX hoặc Ubuntu thì những keyword bạn gõ xuống thực chất nó vẫn đang nằm trên bộ đệm nên gây ra vấn đề không hiện người dùng có tên giống với những keyword bạn vừa gõ.
Mình đã cố găng debug thì thấy vấn đề xãy ra trong bước thứ 2. [đoạn code này](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js#L489) đã dừng sự kiện khi keyword vừa gõ vẫn còn nằm trong bộ đệm,đến khi bạn sử dụng các ký tự đặc biệt hay phím space, mủi tên qua lại thì mới hoàn thành từ đó thì nó mới  tiếp tục các bước tiếp theo.

Giái pháp của vấn đề là mình tạo ra file **atwho** copy mã nguồn  [file này](https://github.com/ichord/At.js/blob/master/dist/js/jquery.atwho.js) của thự viện và bỏ đoạn code đó đi. sau đó các bạn stub file** jquery.atwho.js** của thư viện và require file **atwho** của mình vào
```
//= stub jquery.atwho/jquery.atwho.js
//= require atwho
```

# Nâng cao
Bởi vì danh sách người dùng sẻ dấu ví dụ như *Nguyễn Văn A*, nên khi các bạn muốn gõ không dấu như *@Nguyen* vẫn hiện ra người dùng này thì các bạn có thể làm như sau


### Bước 1:
Viết thêm một hàm **remove_vietnamese**. Hàm này có chức năng loại bỏ dấu của 1 văn bản  ví dụ *Nguyễn Văn A* sẻ thành *nguyen van a*
```
function remove_vietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,'y');
  str = str.replace(/đ/g,'d');
  return str;
}
```

### Bước 2
Override hàm **beforeSave**, Hàm này có chức năng loại bỏ dấu trong tên danh sách người dùng mà ban đầu ta truyền cho thư viện
```
beforeSave: function(data) {
users = $.map(data, function( user ) {
  return {'id': user[0], 'vi_name': user[1], 'en_name': remove_vietnamese(user[1])};
});
return Controller.arrayToDefaultHash(users);
},
```
### Bước 3

Override hàm **matcher**. Hàm này loại bỏ dấu đoạn văn bản bắt được sau flag ví dụ *@Nguyễn* sẻ thành *@nguyen*
```
  matcher: function(flag, subtext, should_startWithSpace, acceptSpaceBar) {
    var _a, _y, match, regexp, space;
    flag = flag.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    if (should_startWithSpace) {
      flag = '(?:^|\\s)' + flag;
    }
    _a = decodeURI("%C3%80");
    _y = decodeURI("%C3%BF");
    space = acceptSpaceBar ? "\ " : "";
    regexp = new RegExp(flag + "([A-Za-z" + _a + "-" + _y + "0-9_" + space + "\'\.\+\-]*)$|" + flag + "([^\\x00-\\xff]*)$", 'gi');
    match = regexp.exec(subtext);
    if (match) {
      return match[2] || match[1];
    } else {
      return null;
    }
  },
```

### Kết quả
Như vậy lúc này cả đoạn văn bản bạn gõ sau flag và tên người dùng đèo không có dấu nên kết quả tên người dùng sẻ hiện ra

# Gửi thông báo
```
  $('.editable').atwho({
    at: '@',
    data: userList,
    startWithSpace: true,
    searchKey: 'name',
    insertTpl: ('<a class="tag-user-item" href="/users/${id}"><span class="fa fa-address-book-o"></span>&nbsp;${name}</a>'),
    displayTpl: ('<li><a class="tag-user-item" href="/users/${id}"><span class="fa fa-address-book-o"></span>&nbsp;${name}</a></li>')
  });
```
Các bạn chú ý ở key **insertTpl** sẻ  là đoạn html sẻ được chèn vào trong message của bạn khi bạn tag 1 người dùng. Trên Backend các bạn sử lý như sau
```
MARKED_HTML = /tagged-user-\d{1,}/

def tagged_user_ids_from_content
params[:content].scan(MARKED_HTML).map do |matched_html|
  matched_html.slice Settings.position_scan_user_id, matched_html.length
end
```
ở đây mình viết regex **MARKED_HTML** để tìm kiếm đoạn insertTpl đã chèn trong content, sau đó dùng method **slice** để lấy id của người dùng được tag.
Sau khi có id thì các bạn có thể sử dụng đó để làm các công việc khác như gửi thông báo chẳng hạn.

# Kết luận
### Tham khảo
https://github.com/ichord/At.js

https://github.com/ichord/jquery-atwho-rails
### Link phần 1
https://viblo.asia/p/tag-mot-nguoi-dung-bang-symbol-at-tren-app-ruby-on-rails-gGJ592o1KX2