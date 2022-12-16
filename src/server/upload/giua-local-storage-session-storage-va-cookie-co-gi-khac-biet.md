Như các bạn đã biết thì chúng ta có thể lưu trữ dữ liệu của người dùng thông qua các hệ quản trị cơ sở dữ liệu, session... bên phía server.
Nhưng hôm nay mình sẽ giới thiệu với mọi ngưới cách lưu trữ dữ liệu dưới browser thông qua 3 dạng phổ biến **Local Storage**, **Session Storage** và **Cookie** thông qua sự khác nhau và cách sử dụng của từng loại.

# 1. Local Storage
## Giới thiệu
- Dữ liệu được lưu trữ vô thời hạn, nghĩa là dữ liệu sẽ không bị mất đi trừ khi bạn dùng chức năng xóa dữ liệu của trình duyệt hoặc sử sụng localStorage API để xóa. Trong trường hợp người dùng sử dụng chức năng "ẩn danh" thì nó sẽ bị xóa sau khi tab ẩn danh cuối cùng bị đóng lại.
- Khả năng lưu trữ: 5MB
- Dữ liệu không được gửi đi đến server thông qua các request header.
- Được lưu trữ trên trình duyệt của người dùng nên việc sử dụng sẽ không ảnh hưởng đến hiệu suất của trang web nhưng sẽ làm nặng trình duyệt (rất nhỏ gần như không đáng kể).
- Dữ liệu được chia sẽ giữa các tab, các cửa sổ cùng lúc nếu nó có chung nguồn gốc hay còn gọi là "same origin" (bao gồm 3 thành phần domain/port/protocol).

Sự tương thích đối với một số trình duyệt web phổ biến:

| Máy tính |  | Điện thoại |  |
| -------- | -------- | -------- | -------- |
| Chrome     |  ≥ 4.0   | Chrome for Android     |   ≥ 18  |
| Edge     | ≥ 12.0     |  Android webview     | ≤ 37     |
| Firefox     | ≥ 3.5     | Firefox for Android     | ≥ 4 |
| Internet Explorer  | ≥ 8   | Samsung Internet     | ≥ 1.0  | 
| Opera     | ≥ 10.5     |  Opera for Android     | ≥ 11.0     |
| Safari     | ≥ 4.0     | Safari on iOS     | ≥ 3.2  |

Kiểm tra xem trình duyệt đang sử dụng có hỗ trợ Local Storage không bằng cách:
```
if (typeof(localStorage) !== "undefined") {
    console.info("Trình duyệt của bạn có hỗ trợ Local Storage");
} else {
    console.info("Trình duyệt của bạn không hỗ trợ Local Storage");
}
```

## Sử dụng
Để thao tác với dữ liệu được lưu trong Local Storage, ta sử dụng 3 hàm sau đây:

### setItem(key, value)
Hàm này giúp lưu dữ liệu vào trong localStorage, nó nhận vào hai tham số là `key` và `value`.
```
    localStorage.setItem("domain", "viblo.asia");
    
    // Một số cách khác
    localStorage.domain = "viblo.asia";
    localStorage["domain"] = "viblo.asia";
```
Lưu ý rằng Local Storage chỉ cho lưu value dưới dạng `string` thế nên khi muốn lưu dữ liệu dưới dạng `array` hoặc `object` bạn cần phải chuyển nó sang `string` với hàm `JSON.stringify()` trước khi lưu và chuyển lại với `JSON.parse()` khi lấy ra.
```
const person = {
    name: 'Nam',
    job: 'student',
}

localStorage.setItem('user', JSON.stringify(person));
```
### getItem(key)
Lấy ra dữ liệu trong localStorage với key và trả về value tương ứng
```
const user = localStorage.getItem('user');

// Một số cách khác
const user = localStorage.user;
const user = localStorage['user'];
```
Nếu dùng `JSON.stringify()` trước khi lưu thì value lấy ra sẽ có dạng:
```
"{"name":"Nam","job":"student"}"
```
Để sử dụng, cần phải đưa nó trở lại về dạng object với `JSON.parse()`
```
const user = JSON.parse(window.localStorage.getItem('user'));
```

### removeItem(key)
Loại bỏ dữ kiệu ra khỏi localStorage với tham số `key` được truyền vào.
```
localStorage.removeItem('user');
```

### clear()
Xóa toàn bộ dữ liệu trong Local Storage.
```
localStorage.clear();
```

### length()
Lấy ra số lượng Local Storage đã lưu.
```
const length = localStorage.length();
```

### key(index)
Lấy về tên của key trong local storage với chỉ mục nhất định, có ích nếu cần chạy vòng lặp để thao tác với dữ liệu. Giống như stack, dữ liệu được đưa vào sau cùng sẽ được đẩy lên trên đầu, tương ứng với index là `0`;
```
const key = localStorage.key(0);
```

Ví dụ: vì dữ liệu được lưu trong Local Storage sẽ không bị mất đi khi trình duyệt bị đóng nên có thể dùng để đếm số lượt truy cập vào trang web. 

{@embed: https://codepen.io/nam-dng-the-animator/pen/abNNRqz}

Mặc dù là dễ sử dụng cũng như có thời gian lưu trữ lâu như vậy nhưng không nên lạm dụng Local Storage quá vì những lý do sau:
- Tính bảo mật chưa được cao bới vì bất kỳ code Javascript nào cũng có thể truy cập vào Local Storage mà không cần qua bất kỳ lớp bảo vệ nào cả. Chính vì vậy không nên dùng nó để lưu trữ những thông tin nhạy cảm của người dùng để tránh những tai nạn ngoài ý muốn.
- Bị giới hạn kích thước lưu trữ là 5MB ở trên tất cả các trình duyệt hiện có và chỉ cho phép lưu trữ dữ liệu dưới dạng `string`.
- Local Storage là đồng bộ, điều đó có nghĩa là các thao tác liên quan đến dữ liệu sẽ chỉ thực thi một cách lần lượt.

# 2. Session Storage
## Giới thiệu
- Session Storage cũng giống như Local Storage như việc lưu dữ liệu được lưu trong trình duyệt của client, cùng kích thước lưu trữ, điểm khác biệt duy nhất là nó chỉ tồn tại cho đến khi người dùng đóng tab, đóng trình duyệt.
- Khả năng lưu trữ: 5MB
- Dữ liệu không được gửi đi đến server thông qua các request header.
- Dữ liệu chỉ tồn tại trong tab trình duyệt hiện tại, một tab khác dù mở cùng một trang nhưng nó sẽ có bộ nhớ khác.
- Dữ liệu vẫn tồn tại khi tải lại trang miễn là bạn chưa đóng tab đó.

Sự tương thích đối với một số trình duyệt web phổ biến:

| Máy tính |  | Điện thoại |  |
| -------- | -------- | -------- | -------- |
| Chrome     |  ≥ 5.0   | Chrome for Android     |   ≥ 18  |
| Edge     | ≥ 12.0     |  Android webview     | ≤ 37     |
| Firefox     | ≥ 2.0     | Firefox for Android     | ≥ 4.0 |
| Internet Explorer  | ≥ 8.0   | Samsung Internet     | ≥ 1.0  | 
| Opera     | ≥ 10.5     |  Opera for Android     | ≥ 11.0     |
| Safari     | ≥ 4.0     | Safari on iOS     | ≥ 3.2  |

Cách để kiểm tra xem trình duyệt có hỗ trợ hay không cũng giống với Local Storage :
```
if (typeof(sessionStorage) !== "undefined") {
    console.info("Trình duyệt của bạn có hỗ trợ Session Storage");
} else {
    console.info("Trình duyệt của bạn không hỗ trợ Session Storage");
}
```
## Sử dụng
Về mặt sử dụng thì Session Storage cũng có các hàm để thao tác với dữ liệu giống hệt như Local Storage:
```
if (typeof(sessionStorage) !== "undefined") {
    // Lưu dữ liệu
    sessionStorage.setItem('domain', 'viblo.asia');
    // sessionStorage.domain = 'viblo.asia';
    // sessionStorage['domain'] = 'viblo.asia';
    
    // Lấy dữ liệu
    const domain = sessionStorage.getItem('domain');
    // const domain = sessionStorage.domain;
    // const domain = sessionStorage['domain'];
    
    // Xóa dữ liệu
    sessionStorage.removeItem('domain');
    
    // Xóa tất cả dữ liệu
    sessionStorage.clear();
    
    // Lấy ra số lượng session storage đã lưu
    const length = sessionStorage.length();
    
    // Lấy ra tên key trong session storage với index chỉ định
    const key = sessionStorage.key(0); // Key của dữ liệu được thêm gần nhất tương ứng với index = 0
    
} else {
    console.info("Trình duyệt của bạn không hỗ trợ Session Storage");
}
```
# 3. Cookie
## Giới thiệu
- Khả năng lưu trữ: thông thường là 4KB (IE là 4KB - 10KB) và khoảng vài chục cookie cho một domain (Chrome và Safari không giới hạn).
- Thông tin được gửi lên server.
- Có thể đọc ở phía máy chủ khác với Local/Session Storage chỉ đọc được ở phía máy khách.
- Có hạn sử dụng: mỗi cookie thường có một khoảng thời gian sống nhất định và tùy vào mục đích sử dụng sẽ có khoảng thời gian sử dụng khác nhau, ngoài hạn sử dụng cookie còn có thời gian sống (*max-age*).
- Có các trường như: name, value, domain, path, expire/max-age, size, secure flag, priority... thay vì 2 trường đơn thuần key, value.

## Các thuộc tính
 - **name**:
Tên dùng để định danh cookie. Tên của cookie không phân biệt chữ hoa hay chữ thường vậy nên ý nghĩa giữa `cookie` và `cOocKiE` là giống nhau. Tuy nhiên, trong quá trình sử dụng chúng ta nên phân biệt hoa thường cho cookie để dễ xử lý cũng như tránh sai sót trong quá trình xử lý bên phía server.
- **value**:
Giá trị được lưu trữ trong cookie.
- **path**
Đường dẫn được chỉ định đi kèm domain, nơi mà cookie sẽ được gửi tới mặc định sẽ là đường dẫn hiện tại.
Ví dụ nếu giá trị của `path` là `/admin` thì cookie đó sẽ chỉ hiển thị trên các trang `/admin` và `/admin/users` nhưng không hiển thị tại `/user`, `/home`.
Thông thường, chúng ta nên đặt **path** = `/` để cookie có thể được truy cập từ mọi nơi trên trang web.
- **domain**:
Domain hợp lệ có thể truy cập và sử dụng cookie, nếu **domain** = `viblo.asia` thì cookie đó sẽ không thể truy cập được từ `topblog.com`. Có một hạn chế là cookie không truy cập được từ subdomain ví dụ như `code.viblo.asia`.
- **expires**: thời gian hết hạn của cookie, khi đến hạn trình duyệt sẽ loại bỏ nó ra khỏi bộ nhớ. Nếu trường *expire* không được thiết lập,
thì cookie sẽ bị loại bỏ khi trình duyệt bị đóng. Còn trong trường hợp *expire* được thiết lập vào một ngày trong quá khứ, cookie sẽ bị xóa ngay lập tức. Ngoài *expire* chúng ta còn có một tùy chọn khác để thiết lập thời gian sử dụng cho cookie đó là **max-age**,  lượng thời gian mà cookie có thể tồn tại (tính bằng giây). Nếu khoảng thời gian đó bằng 0 hoặc âm, cookie cũng sẽ bị xóa.
- **secure flag**: sử dụng với mục đích bảo vệ thông tin, chỉ gửi cookie nếu kết nối SSL được sử dụng.

## Sử dụng
Có nhiều cách để thao tác với cookie, trong bài viết này mình sẽ chỉ đề cập tới thao tác qua `document.cookie` trong javascript.

Để tạo ra một cookie, ta dùng cú pháp sau:
```
document.cookie = 'domain=viblo.asia; expires=Mon, 17 Aug 2020 7:00:00 UTC;';
```
Hoặc có thể thay `expires` bằng `max-age` (tính bằng giây), `expries` sẽ được tính lại dựa trên `max-age`:
```
document.cookie = 'domain=viblo.asia; max-age=10';
```
Lưu ý là định dạng của `expires` truyền vào phải dưới định dạng UTC String.

Để lấy ra thông tin cookie đã lưu:
```
let cookies = document.cookie;
```
Giá trị trả về sẽ là một chuỗi chứa thông tin của tất cả cookie. Ví dụ `username=namdh; email=google@namdh.com; domain=viblo.asia;"`

Để đơn giản hơn trong việc lấy ra giá trị của cookie, thử viết một hàm như sau:
```
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```
Bây giờ muốn lấy ra giá trị của cookie có `name` là `domain` thì chỉ cần gọi đến hàm `getCookie('domain')`, giá trị trả về sẽ là `value` của cookie có tên đó.

![](https://images.viblo.asia/df85ff42-0ba9-4f46-b800-fef9b05eeb44.PNG)

Để thay đổi giá trị của cookie, đơn giản chỉ việc ghi đè giá trị mới lên cookie đã có:
```
document.cookie = 'domain=code.viblo.asia; expires=Mon, 17 Aug 2020 7:00:00 UTC;';
```

Để xóa một cookie, chỉ cần gán giá trị `expries` bằng một khoảng thời gian nào đó trong quá khứ hoặc đơn giản hơn là gán `max-age` bằng 0 hoặc một giá trị âm tùy ý.
```
document.cookie = 'domain=code.viblo.asia; max-age=-1;';
```


Như vậy là mình cùng các bạn đã tìm hiểu sơ qua về những điểm khác nhau cơ bản giữa Local Storage, Session Storage và Cookie qua phần vừa rồi.

Bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. 

Nếu bạn đã đọc đến đây thì tiếc gì 1 click upvote để giúp mình lấy động lực hoàn thiện các bài sau ngày một chất lượng hơn <3.

Cảm ơn các bạn đã theo dõi bài viết.