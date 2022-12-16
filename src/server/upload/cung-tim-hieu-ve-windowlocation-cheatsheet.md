Khi các bạn làm việc với jquery thì đến một đoạn nào đấy bài toán cần lấy thông tin URL của một trang web, thì phương thức **window.location** object sẽ được bạn nghĩ tới để sử dụng. Với phương thức này thì các thuộc tính sẽ dùng để lấy thông tin của url page hiện tại, các methods của nó thì sẽ dùng để redirect page hoặc refresh page. Vậy giờ cùng vào tìm hiểu rõ hơn về nó nào :upside_down_face:

## window.location Properties

| window.location | Description |
| -------- | -------- |
|  .origin     | Sẽ trả về một URL cơ bản (**Protocal + hostname + port**).   |
| .protocol     | Trả về Protocal Schema (**http** hoặc **https**).     |
| .host     | Bao gồm domain name + port.    |
| .hostname     | Trả về domain name của URL.     |
| .port     | Port trên URL, nếu URL không chứa số cổng rõ ràng nó sẽ là `''`.     |
| .pathname     | Trả về bắt đầu là `/` theo sau là đường dẫn của URL (hoặc là 1 string rỗng nếu không có đường dẫn).     |
| .search     | Trả về một chuỗi tìm kiếm hay còn gọi là một chuỗi truy vấn bao gồm chứa một dấu `?` theo sau là các tham số của URL.  Một số trình duyệt sẽ cung cấp [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get#examples) và [URL.searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams#examples) Object giúp dễ dàng phân tích các tham số từ chỗ truy vấn.  |
| .hash     |    Trả về phần liên kết của một URL  bắt đầu bằng dấu `#`,  ID này trên page là nơi URL tìm đến. |
| .href     | Trả về một URL đầy đủ.    |

Để dễ hình dung hơn thì mình có thể nhìn vào ví dụ dưới đây nhé, cú pháp sẽ là `window.location. + properties`. Khi đó kết quả sẽ trả về như bên phải tương ứng cho từng property.

> https://locahost:3000/code/?filter=js#windowlocation

```js
window.location.origin   → 'https://localhost:3000'
               .protocol → 'https:'
               .host     → 'locahost:3000'
               .hostname → 'locahost'
               .port     → '3000'
               .pathname → '/code/'
               .search   → '?filter=js'
               .hash     → '#windowlocation'
               .href     → 'https://example.com/code/?filter=js#windowlocation'
```

Như ví dụ trên thì có thể thấy `host` và `hostname` chỉ khác biệt với nhau liên quan tới port. `Host` sẽ bao gồm cả port trong giá trị trả về, trong khi `hostname` sẽ chỉ trả về domain name.

Bây giờ, mình đã biết các lấy ra các thông tin của URL rồi, bài toán lại muốn thay đổi một số thông tin của URL thì mình sẽ làm như nào?
Thật tốt là mình đều có thể sử dụng các property trên để gán lại các giá trị muốn thay đổi. Tuy nhiên là duy nhất property `origin` sẽ không thể đổi giá trị vì thuộc tính này chỉ dùng để đọc.

## window.location Methods

| window.location |  |
| -------- | -------- |
| .assign()     | window sẽ load và hiển thị url được chỉ định. Sau khi điều hướng xảy ra thì người dùng có thể điều hướng trở về page đã gọi trước đó bằng nút back.     |
| .replace()     | Điều hướng đến URL nhất định và xóa trang hiện tại khỏi lịch sử đăng nhập hiện tại, có nghĩa là người dùng sẽ không thể sử dụng nút back để chuyển đến trang trước đó.     |
| .reload()     | Như đúng tên gọi của method thì nó sẽ thực hiện tải lại trang hiện tại.     |
| .toString()     | Trả về một string URL. Đây là phiên bản chỉ đọc của Location.href     |

Cú pháp gọi các method của window.location sẽ như bên dưới:
```js
window.location.assign('url')
               .replace('url')
               .reload()
               .toString()
```

### assign vs replace
Về cơ bản thì cả 2 phương pháp này sẽ giúp chúng ra chuyển hướng hoặc điều hướng đến một URL khác. Sự khác biệt nằm ở chỗ `assign` sẽ lưu lại **trang hiện tại** của mình trong history, vì vậy mình có thể sự dụng nút `back` trên trình duyệt để điều hướng đến trang đó. Trong khi với `replace` nó không lưu lại. Lưu ý, trang hiện tại ở đây chính là trang trước khi mình gọi một trong 2 method trên.
Để hiểu hơn thì mình cũng xem ví dụ sau:

```js
1. Mở một tab mới
2. Go to www.developer.mozilla.org
3. Go to www..w3schools.com 👈 Đây là trang hiện tại

4. window.location.assign('https://www.google.com'); // Nhấn button back sẽ chuyển về page ở vị trí #3
4. window.location.replace('https://www.google.com'); // Nhấn button back sẽ chuyển về page ở vị trí #2
```

### Redirect page

Như bên trên thì chúng ta đã biết đã biết thay đổi giá trị các thuộc tính bằng các sử dụng `=`. Tương tự, các method cũng sẽ vậy. Vì vậy để chuyển page đến một page khác sẽ có 3 cách.

```js
// Gán bằng href properties
window.location.href = 'https://www.w3schools.com';

// Sử dụng Assign method
window.location.assign('https://www.w3schools.com');

// Sử dụng Replace method
window.location.replace('https://www.w3schools.com');
```

Cả 3 cách đều dùng để chuyển hướng, sự khác biệt liên quan đến lịch sử trình duyệt. `href` và `assign` ở đây nó sẽ lưu trang hiện tại (trước khi thực hiện chuyển page) vào trong lịch sử, ngược lại `replace` thì không.

Vậy giữa `href` và `assign` thì sao, nên sử dụng cái nào? Cái này mình nghĩ sẽ theo sở thích cá nhân của từng người. Tuy nhiên là việc sử dụng assign method có ý kiến cho rằng nó có gì đấy là cảm giác đang thực hiện một hành động nào đó, chắc sau bài này mình cũng sẽ thay đổi lại cách viết này :satisfied:. Ngoài ra thì nếu phải thực hiện viết test cho đoạn code js của bạn thì assign sẽ dễ dàng hơn rất nhiều.

## window.location vs location

Hiện tại có 4 cách để có thể truy cập location object như sau
```js
window.location          → Location
window.document.location → Location
document.location        → Location
location                 → Location
```

Về việc nên sử dụng thuộc tính nào thì cũng sẽ theo cá nhân của mỗi người. Bản thân mình thì hay sử dụng window.location hơn. Có ý kiến cho rằng nên thực sự tránh sử dụng `location` vì khi code ai đó sẽ có thể vô tình đặt làm tên biến của họ, điều này sẽ ghi đè lên biến global dẫn tới lỗi trong code của bạn. Mình thấy ý kiến này khá đúng, vì hầu hết ai cũng biết `window` là một biến global hơn là `location` - bạn sẽ tránh được nhầm lẫn.

Trong ví dụ sau sẽ gây lỗi nếu vô tình đặt biến là location:
```js
location.protocol; // 'https'

function localFile() {
  const location = '/viethihi';

  return location.protocol;
  // ❌ undefined
  //    b/c local "location" has override the global variable
}
```
Mình thấy có một ví dụ về ưu tiên cách sử dụng của 4 thuộc tính trên như sau, bạn cũng có thể tham khảo chúng nhé =))
```js
// ✅
1. window.location   // perfect
2. document.location

// ❌
3. window.document.location //  why not just use #1 or #2 😅
4. location // feels too ambiguous 😵 =))
```

-----

Như vậy qua bài viết này mình cũng đã nói về các properties cũng như là method khi thao tác với URL bằng jquery. Hi vọng bài viết này sẽ giúp ích cho các bạn mới học code cũng như chưa hiểu rõ về vấn đề này. Chào mừng các bạn đến với sự ma giáo của js =))

**Tài liệu tham khảo**

https://developer.mozilla.org/en-US/docs/Web/API/Location

https://www.w3schools.com/jsref/obj_location.asp

https://stackoverflow.com/questions/10302905/location-href-property-vs-location-assign-method

https://stackoverflow.com/questions/4505798/difference-between-window-location-assign-and-window-location-replace