Chính sách "Same origin " (cùng một trang web) giới hạn quyền truy cập của các cửa sổ và khung với nhau.

Ý tưởng là nếu một người dùng mở hai trang: một từ `other.com` và một trang khác là `gmail.com`, thì họ sẽ không muốn một tập lệnh từ `other.com` đọc thư của chúng ta từ `gmail.com`.  Vì vậy, mục đích của chính sách của `Same Origin` là để bảo vệ người dùng khỏi bị đánh cắp thông tin.

## Same Origin

Những URL có cùng `same origin`  nếu cúng có cùng protocol, domain, port.

Những URLs có cùng `same origin`: 
* http://site.com
* http://site.com/
* http://site.com/index.html

Những URLs không cùng `same origin`: 
* http://www.site.com (khác domain: `www.` )
* http://site.org (khác domain: `.org` )
* https://site.com (khác protocol: `https`)
* http://site.com:8080 (khác port: `8080`)

`Same origin` policy: 

Nếu chúng ta có một tham chiếu đến một cửa sổ khác, ví dụ: một cửa sổ bật lên được tạo bởi `window.open` hoặc một cửa sổ bên trong `<iframe>` và cửa sổ đó đến từ cùng một `same origin`,  thì chúng ta có quyền truy cập đầy đủ vào cửa sổ đó.
mặt khác, nếu nó đến từ một `same origin` khác, thì chúng ta không thể truy cập nội dung của cửa sổ đó: `variables`, `document`, bất cứ thứ gì. Ngoại lệ duy nhất là `location`: chúng ta có thể thay đổi nó (do đó chuyển hướng người dùng). Nhưng chúng ta không thể đọc `location` ( vì vậy chúng ta không thể thấy người dùng hiện đang ở đâu, không có thông tin rò rỉ).

### iframe

Thẻ `<iframe>` lưu trữ một đường dẫn được nhúng, được chia ra thành 2 đối tượng: `document` và `windown`.

Có thể truy cập chúng bằng thuộc tính: 

*  `iframe.contentWindow` để nhận về đối tượng `window` trong `<iframe>`.
* `iframe.contentDocument` để nhận về đối tượng `document` trong `<iframe>`,  hoặc có thể viết `iframe.contentWindow.document`.

Khi chúng ta truy cập một cái gì đó bên trong một cửa sổ, trình duyệt sẽ kiểm tra xem` iframe`  có cùng nguồn gốc hay không. Nếu không thì quyền truy cập bị từ chối (ghi vào `location` là một ngoại lệ, nó vẫn được phép).

Chẳng hạn, hãy thử đọc và viết vào `<iframe>` từ `same origin` khác:

```
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // we can get the reference to the inner window
    let iframeWindow = iframe.contentWindow; // OK
    try {
      // ...but not to the document inside it
      let doc = iframe.contentDocument; // ERROR
    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
      let href = iframe.contentWindow.location.href; // ERROR
    } catch(e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
    iframe.contentWindow.location = '/'; // OK

    iframe.onload = null; // clear the handler, not to run it after the location change
  };
</script>
```

Đoạn code trên hiển thị lỗi cho mọi thao tác ngoại trừ:

* Lấy tham chiếu đến cửa sổ bên trong `iframe.contentWindow`.
* ghi `location`.

Trái với điều đó, nếu `<iframe>` có cùng `same origin`, chúng ta có thể làm bất cứ điều gì với nó:

```
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // just do anything
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

:information_source:` iframe.onload` và `iframe.contentWindow.onload`:

Sự kiện `iframe.onload` (trên thẻ `<iframe>`) về cơ bản giống như `iframe.contentWindow.onload` (trên đối tượng đường dẫn nhúng). Nó kích hoạt khi đường dẫn nhúng tải đầy đủ tất cả tài nguyên.

Nhưng chúng ta có thể truy cập `iframe.contentWindow.onload` cho `iframe` từ một `same origin` khác, vì vậy sử dụng `iframe.onload`.

## Subdomains(tên miền phụ): document.domain

Theo định nghĩa, hai URL với các `domain` khác nhau có `same origin` khác nhau.

Nhưng nếu các cửa sổ chia sẻ cùng một tên miền cấp hai, chẳng hạn như `one.site.com`, `two.site.com` và `site.com` (tên miền cấp hai chung của chúng là `site.com`), chúng ta có thể làm cho trình duyệt bỏ qua sự khác nhau đó, do đó chúng có thể được coi là đến từ cùng một `same origin` cho mục đích giao tiếp qua cửa sổ(cross-window communication).

Để làm cho nó hoạt động, mỗi cửa sổ như vậy nên chạy code:

```
document.domain = 'site.com';
```

Đó là tất cả. Bây giờ chúng ta có thể tương tác mà không bị giới hạn. Một lần nữa, điều đó chỉ có thể đối với các trang có cùng tên miền cấp hai.

## Iframe: wrong document pitfall

Khi một `iframe` đến từ cùng một `same origin` và chúng ta có thể truy cập vào `document` của nó, thì đó là một cạm bẫy. Nó không liên quan đến những thứ có `same origin` chéo, nhưng quan trọng là phải biết.

Khi tạo ra một` iframe` ngay lập tức có một `document`. Nhưng `document` đó khác với một `document` bên trong nó!

Vì vậy, nếu chúng ta làm một cái gì đó với `document` ngay lập tức, nó có thể sẽ bị mất.

example: 

```
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
    // the loaded document is not the same as initial!
    alert(oldDoc == newDoc); // false
  };
</script>
```

Chúng ta không nên làm việc với `document` của `iframe` chưa được tải, bởi vì đó là `document` sai. Nếu chúng ta đặt bất kỳ trình xử lý sự kiện nào trên đó, chúng sẽ bị bỏ qua.

Làm thế nào để phát hiện khoảnh khắc khi `document` xuất hiện?

`document` phù hợp chắc chắn có tại chỗ khi `iframe.onload` kích hoạt. Nhưng nó chỉ kích hoạt khi toàn bộ i`frame` với tất cả các tài nguyên được tải.

Chúng ta có thể cố gắng nắm bắt khoảnh khắc sớm hơn bằng cách sử dụng kiểm tra trong `setInterval`:

```
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // every 100 ms check if the document is the new one
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // cancel setInterval, don't need it any more
  }, 100);
</script>
```

Thank for you reading...
to be continue.