Đã bao giờ bạn tự đặt ra câu hỏi là Cookies và localStorage khác nhau ở đâu không, nếu không hãy theo dõi bài viết của mình dưới đây nha.
# 1, Cookies
Vậy cookies là gì?
<br>
Trên thực tế, cookies là một tệp văn bản nhỏ được đặt trên máy của người dùng trên một trang web. Chúng được thiết kế để chứa một lượng dữ liệu của người dùng và trang web có dung lượng tối đa là 4KB. Cookies được sử dụng theo nhiều cách khác nhau chẳng hạn như trong việc lưu trữ các trang được truy cập trong một trang web hoặc chúng ta thường gặp nhất đó là lưu trữ thông tin đăng nhập của người dùng. Cookies bị hạn chế ở một điểm đó là nó chỉ lữu trữ dưới dạng string(chuỗi).

Nhiều trang web bảo mật sử dụng cookies để xác thực danh tính người dùng sau khi đăng nhập để tránh giúp người dùng phải nhập lại thông tin đăng nhập trên trang. Có một cách sử dụng khác cho cookies là tùy chỉnh hoặc điều chỉnh trải nghiệm người dùng dựa trên lịch sử duyệt hạn chế trên trang web.  

### Có 2 loại cookies
<br>
Có hai loại cookies đó là: session cookies và persistent cookies. Vậy chúng khác nhau ở đâu.

Session cookies không chứa ngày hết hạn, thay vào đó chúng được lưu trữ miễn là trình duyệt hoặc tab được mở.

Persistent cookies có ngày hết hạn. Các cookies này được lưu trữ trên đĩa người dùng cho đến ngày hết hạn và sau đó bị xóa vĩnh viễn. Chúng có thể được sử dụng trong việc lưu lại các thói quen của người dùng trên trang web để tùy chỉnh trải nghiệm.

### Sử dụng cookies trong javascript
Set cookies:
`document.cookie = "cookiename=cookievalue"`
<br>
Get cookies, đây là cú pháp lấy tất cả các cookies: 
`var x =  document.cookie`
<br>
Còn nếu muốn lấy một cookies cụ thể: 
```
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while(c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if(c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
```
Xóa cookies, ta có thể xóa cookies bằng cách sau đây: `document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"`


# 2, LocalStorage
Sau khi HTML5 ra đời, nhiều cách sử dụng cookies được thay thế bằng cách sử dụng localStorage, vì có một vài lợi thế đến từ localstorage. Một trong những sự khác biệt quan trọng nhất là dữ liệu không phải gửi qua lại với mỗi yêu cầu HTTP. Chính điều này đã làm giảm lưu lượng tổng thể giữa máy khách và máy chủ và lượng băng thông bị lãng phí. Điều này là do dữ liệu được lưu trữ trên địa cục bộ của người dùng và không bị biến mất khi mất kết nối internet. Và đặc biệt hơn là localstorage có thể lưu trữ tới 5MB thông tin lớn hơn nhiều so với cookies là 4KB.

LocalStorage hoạt động giống với persistent cookies về việc hết hạn. Dữ liệu không tự động bị xóa bỏ trừ khi bị xóa bỏ bởi 1 đoạn mà javascript . Điều này có thể tốt cho các bit dữ liệu lớn cần được lưu trữ trong thời gian dài. Ngoài ra bạn còn có thể lưu trữ cả object lẫn string.

**Sử dụng LocalStorage vượt trội hơn so với cookies khi nào**
<br>
Trong thực tế, người ta thường sử dụng localstorage thay vì sử dụng cookies trong trường hợp là một ứng dụng được sử dụng trong một khu vực mà ít kết nối internet.

### Sử dụng LocalStorage trong javascript
Có 3 cách để set một localstorage
```
localStorage.setItem("key", "value");

//hoặc 

localStorage.key = "value";  

//hoặc

localStorage["key"] = "value";
```

Tôi khuyên các bạn nên dùng setItem thay vì gán trực tiếp vào một thuộc tính trên localStorage vì có thể xảy ra khả năng là xung đột với bất kỳ một phương thức của localStorage.

Tương tự cũng có 3 cách để get một localStorage
```
var x = localStorage.getItem("key");
// hoặc
var x = localStorage.key;  
// hoặc
var x = localStorage["key"]; 
```

Để xóa một localStorage sử dụng removeItem()
Phương thức removeItem () khi được truyền vào key name, sẽ xóa khóa đó khỏi bộ lưu trữ nếu nó tồn tại. Nếu không có mục nào được liên kết với khóa đã cho, phương thức này sẽ không làm gì cả. 
`localStorage.removeItem('name');`

Để xóa tất cả dùng phương thức clear(): `localStorage.clear();`

### Tuy nhiên vẫn còn vài hạn chế của localStorage:
Không lưu trữ thông tin nhạy cảm của người dùng trong localStorage <br>
Nó không thay thế cho cơ sở dữ liệu dựa trên máy chủ vì thông tin chỉ được lưu trữ trên trình duyệt <br>
LocalStorage được giới hạn ở mức 5 MB trên tất cả các trình duyệt chính <br>
LocalStorage khá không an toàn vì nó không có hình thức bảo vệ dữ liệu và có thể được truy cập bởi bất kỳ mã nào trên trang web của bạn <br>
LocalStorage là đồng bộ. Có nghĩa là mỗi hoạt động được gọi sẽ chỉ thực hiện lần lượt <br>

# 3, Khác nhau giữa cookies và localstorage
Cookies và localstorage có các vai trò khác nhau. Cookies dùng để đọc ở phía máy chủ, còn localstorage chỉ để được đọc bên phía khách hàng.  Vì vậy, câu hỏi là, trong ứng dụng của bạn, ai cần dữ liệu này - máy khách hoặc máy chủ?

Nếu đó là máy khách của bạn, thì bằng mọi cách có thể chuyển đổi. Bạn đang lãng phí băng thông bằng cách gửi tất cả dữ liệu trong mỗi tiêu đề HTTP.

Nếu đó là máy chủ của bạn, bộ nhớ cục bộ không hữu ích vì bạn phải chuyển tiếp dữ liệu theo cách nào đó (với Ajax hoặc các trường mẫu ẩn hoặc một cái gì đó). Điều này có thể ổn nếu máy chủ chỉ cần một tập hợp con nhỏ trong tổng số dữ liệu cho mỗi yêu cầu.

## Localstorage
1, Web storage có thể được xem một cách đơn giản như một sự cải tiến về cookie, cung cấp dung lượng lưu trữ lớn hơn nhiều. Kích thước khả dụng là 5MB, không gian để làm việc nhiều hơn đáng kể so với cookie 4KB thông thường. <br>
2, Dữ liệu không được gửi trở lại máy chủ cho mọi yêu cầu HTTP (HTML, hình ảnh, JavaScript, CSS, v.v.) - giảm lượng lưu lượng giữa máy khách và máy chủ.<br>
3, Dữ liệu được lưu trữ trong localStorage vẫn tồn tại cho đến khi bị xóa rõ ràng. Những thay đổi được thực hiện được lưu và có sẵn cho tất cả các lượt truy cập hiện tại và tương lai vào trang web. <br>
## Cookies 
1, Có thể đặt thời gian hết hạn cho mỗi cookies. <br>
2, Giới hạn 4K dành cho toàn bộ cookie, bao gồm tên, giá trị, ngày hết hạn, v.v. Để hỗ trợ hầu hết các trình duyệt, hãy giữ tên dưới 4000 byte và kích thước cookie chung dưới 4093 byte. <br>
3, Dữ liệu được gửi trở lại máy chủ cho mọi yêu cầu HTTP (HTML, hình ảnh, JavaScript, CSS, v.v.) - tăng lượng lưu lượng giữa máy khách và máy chủ.


### Tài liệu tham khảo
https://medium.com/swlh/cookies-vs-localstorage-whats-the-difference-d99f0eb09b44
https://www.quora.com/What-is-the-difference-between-sessionstorage-localstorage-and-Cookies