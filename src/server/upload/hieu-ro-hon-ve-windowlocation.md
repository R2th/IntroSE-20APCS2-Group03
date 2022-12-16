Công dụng của `window.location` là cung cấp cho bạn `properties` để lấy thông tin trên thanh địa chỉ hiện tại hoặc sử dụng những `methods` để điều hướng hoặc reload lại trang. Ai cũng hiểu và nắm rõ được nó, nên trong bài viết này mình sẽ tập trung vào những cái cần chú ý để phục vụ cho việc sử dụng `window.location` tốt hơn nhé !!!

Ví dụ URL cho bài viết này:
> `https://www.viblo.asia/posts/?filter=JS#1`

```javascript
window.location.origin   = 'https://www.viblo.asia/posts'
               .protocol = 'https:'
               .host     = 'www.viblo.asia'
               .hostname = 'www.viblo.asia'
               .port     = ''
               .pathname = '/posts/'
               .search   = '?filter=JS'
               .hash     = '#1'
               .href     = 'https://www.viblo.asia/posts/?filter=JS#1'
```
## 1. Sự khác nhau giữ `host` và `hostname`
Trong ví dụ của tôi, bạn sẽ chú ý rằng `host` và `hostname` đều return về 1 giá trị (`www.viblo.asia`).

Nhưng nếu URL có port 8888 thì sao.

> `https://www.viblo.asia.com:8888/posts/?filter=JS#1`

```javascript
window.location.host; // 'www.viblo.asia.com:8888'
window.location.hostname; // 'www.viblo.asia.com'

window.location.port; // '8888'
```

Qua ví dụ trên ta có thể thấy `host` bao gồm `port number`, `hostname` sẽ chỉ return về tên host thôi nhé.
## 2. Làm thế nào để thay đổi URL properties
Bạn không chỉ sử dụng `properties` để lấy thông tin URL. Bạn có thể sử dụng nó để set `new properties` làm thay đổi URL.

```javascript
// Ban đầu 'www.viblo.asia.com'

window.location.pathname = '/post-detail'; // Thay đổi pathname

// Kết quả 'www.viblo.asia.com/post-detail'
```

Ở đây là danh sách những `properties` bạn có thể thay đổi.

```javascript
window.location.protocol = 'https'
               .host     = 'localhost:8080'
               .hostname = 'localhost'
               .port     = '8080'
               .pathname = 'path'
               .search   = 'query string' // (Bạn không cần truyền ?)
               .hash     = 'hash' // (Bạn không cần truyền #)
               .href     = 'url'
```

Chỉ `window.location.origin` là không thể thay đổi ( vì nó là thuộc tính read-only).
## 3. Location Object
`window.location` return về 1 `Location Object` cho bạn thông tin về `current location`. Nhưng bạn cũng có thể truy cập `Location Object` thông qua những cách sau:
```javascript
window.location          = Location Object
window.document.location = Location Object
document.location        = Location Object
location                 = Location Object
```


Lý do bạn có thể làm được điều này là vì tất cả chúng đều là `global variable` trong `browser`:

![](https://images.viblo.asia/0029bee3-d071-4bc2-a8a4-9f35c6eb44b8.png)

## 4. window.location và location
Có 4 properties để lấy được `Location Object`. Thông thường nên sử dụng `window.location` vì theo kinh nghiệm của mình. Khi code thì có rất nhiều bạn đặt tên biến là `location`. Dẫn tới vấn đề ghi đè thuộc tính `global`, còn nếu bạn cảm thấy mình nắm rõ thì việc sử dụng là không thành vấn đề.
```javascript
// https://www.viblo.asia.com

location.protocol; // 'https'

function localFile() {
  const location = '/files';

  return location.protocol;
  // undefined
  // "location" đã ghi đề biến global variable
}
```
## 5. window.location methods


| `window.location` |  |
| -------- | -------- |
| `.assign()`     | Điều hướng tới một URL     |
| `.replace()`     | Điều hướng tới một URL và xoá `current page` từ `section history`     |
| `.reload()`     | Reload lại trang hiện tại    |
| `.toString()`     | Return về URL  |

-----

Ta có thể thấy được `assign` và `replace` đều điều hướng tới một URL. Khác nhau là `assign` sẽ lưu `current page` trong `history`. Vì vậy user có thể điều hướng bằng nút back về. Còn với `replace` thì không.

#### Assign
```
1. Mở một trang trắng (Không có url)
2. Đi vào www.viblo.asia (current page)

3. Load lại trang mới 👉 `window.location.assign('https://www.w3schools.com')`
4. Nhấn "Back"
5. Trở về 👉 www.viblo.asia
```

#### Replace
```
1. Mở một trang trắng (Không có url)
2. Đi vào www.viblo.asia (current page)

3. Load lại trang mới 👉 `window.location.replace('https://www.w3schools.com')`
4. Nhấn "Back"
5. Trở về 👉 trang trắng (Không có url)
```

## 6. Làm thế nào để điều hướng tới 1 trang khác
```javascript
// href properties
window.location.href = 'https://www.viblo.asia';

// Assign
window.location.assign('https://www.viblo.asia');

// Replace
window.location.replace('https://www.viblo.asia');
```
Sự khác nhau ở những cách trên đó là `browser history`. 

`href` và `assign` giống nhau là lưu `current page` trong `history`, nên có thể back về khi tới một trang mới. Còn `replace` thì lại không thể.