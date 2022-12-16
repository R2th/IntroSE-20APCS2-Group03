## IndexedDB

IndexedDB là một cơ sở dữ liệu tích hợp, mạnh hơn nhiều so với `localStorage`.

* Lưu trữ `key/value`: giá trị có thể chứa bất cứ thứ gì, nhiều loại key.
* Hỗ trợ những công việc có độ tin cậy cao.
* Có thể lưu trữ nhiều dữ liệu hơn `localStorage`.
* Sức mạnh đó thường là quá mức đối với các ứng dụng `client-server` truyền thống. `IndexedDB` dành cho các ứng dụng ngoại tuyến, được kết hợp với `ServiceWorkers` và các công nghệ khác.

### Open database

Để bắt đầu làm việc với `IndexedDB`, đầu tiên chúng ta cần open database:

`let openRequest = indexedDB.open(name, version);`

* `name`: string, tên database.
* `version`: positive integer, mặc định `1`.

Chúng ta có thể có nhiều cơ sở dữ liệu với các tên khác nhau, nhưng tất cả chúng đều nằm trong một nguồn gốc (tên miền / giao thức / cổng). Các trang web khác nhau có thể truy cập cơ sở dữ liệu của nhau.

Sau khi open, chúng ta cần lắng nghe các sự kiện trên đối tượng `openRequest`:

* `success`: cơ sở dữ liệu đã sẵn sàng, có đối tượng cơ sở dữ liệu trong `openRequest.result`, chúng ta nên sử dụng nó cho các hành động tiếp theo.
* `error`: open thất bại.
* `upgradeneeded`: cơ sở dữ liệu đã sẵn sàng, nhưng phiên bản của nó đã lỗi thời (xem bên dưới).

**IndexedDB có một cơ chế tích hợp sẵn của `schema versioning`, thiếu trong cơ sở dữ liệu phía máy chủ.**

Không giống như cơ sở dữ liệu phía máy chủ, `IndexedDB` là phía máy khách, dữ liệu được lưu trữ trong trình duyệt, vì vậy chúng ta, các nhà phát triển, không thể truy cập trực tiếp vào nó. Nhưng khi chúng ta publish phiên bản mới của ứng dụng, chúng ta có thể cần cập nhật cơ sở dữ liệu.

Nếu phiên bản cơ sở dữ liệu cục bộ ít hơn quy định khi `oepn`, thì một sự kiện đặc biệt`upgradeneeded` được kích hoạt và chúng ta có thể so sánh các phiên bản và nâng cấp cấu trúc dữ liệu khi cần.

Sự kiện cũng kích hoạt khi cơ sở dữ liệu chưa tồn tại, vì vậy chúng ta có thể thực hiện khởi tạo.

Khi chúng ta lần đầu tiên publish ứng dụng, chúng ta sẽ mở nó với version 1 và thực hiện khởi tạo trong `upgradeneeded`:

```
let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // ...perform initialization...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue to work with database using db object
};
```

Khi chúng ta publish version 2: 

```
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = function() {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(db.version) { // existing db version
    case 0:
      // version 0 means that the client had no database
      // perform initialization
    case 1:
      // client had version 1
      // update
  }
};
```

Vì vậy, trong `openRequest.onupgradeneeded`, chúng ta cập nhật cơ sở dữ liệu.  Quá trình này sẽ sớm hoàn thành . Và sau đó, chỉ khi trình xử lý của nó kết thúc mà không có lỗi, `openRequest.onsuccess` kích hoạt.

Sau `openRequest.onsuccess`, chúng ta có đối tượng cơ sở dữ liệu trong `openRequest.result`, mà chúng ta sẽ sử dụng cho các hành động tiếp theo.

Để xóa database: 

```
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror tracks the result
```

:warning: **Có thể `open` version cũ hơn ?**

Bây giờ nếu chúng ta cố gắng mở một cơ sở dữ liệu với version thấp hơn version hiện tại thì sao? Ví dụ. phiên bản DB hiện tại là 3 và chúng ta cố gắng `open (... 2)`.

Đó là một lỗi, `openRequest.onerror` kích hoạt.

Điều đó có thể xảy ra nếu khách truy cập tải code đã outdated, ví dụ: từ bộ đệm proxy. Chúng ta nên kiểm tra `db.version`,  đề user  tải lại trang. Và cũng kiểm tra lại các tiêu đề bộ nhớ đệm của chúng ta để đảm bảo rằng user truy cập không bao giờ nhận được mã cũ.

### Parallel update problem

Một user đã mở trang web của chúng ta trong tab trình duyệt, với phiên bản cơ sở dữ liệu 1.

Sau đó, chúng ta đã tung ra một bản cập nhật và cùng một user  truy cập trang web của chúng ta trong một tab khác. Vì vậy, có hai tab, cả hai đều có trang web của chúng ta, nhưng một tab có kết nối mở với DB phiên bản 1, trong khi một tab khác cố gắng cập nhật nó trong `upgradeneeded`.

Vấn đề là một cơ sở dữ liệu được chia sẻ giữa hai tab, vì đó cùng một trang web, cùng một nguồn gốc. Và nó có thể là cả hai phiên bản 1 và 2. Để thực hiện cập nhật lên phiên bản 2, tất cả các kết nối với phiên bản 1 phải được đóng lại.

Để làm được điều đó, sự kiện`versionchange` kích hoạt một đối tượng cơ sở dữ liệu khi cố gắng nâng cấp song song. Chúng ta nên lắng nghe nó, để chúng ta có thể đóng cơ sở dữ liệu (và có thể đề nghị khách truy cập tải lại trang, để tải code được cập nhật).

Nếu chúng ta không đóng, thì kết nối mới sẽ bị chặn với sự kiện `blocked` thay vì `success`.

Đoạn code bên dưới sẽ làm điều này:

```
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  db.onversionchange = function() {
    db.close();
    alert("Database is outdated, please reload the page.")
  };

  // ...the db is ready, use it...
};

openRequest.onblocked = function() {
  // there's another open connection to same database
  // and it wasn't closed after db.onversionchange triggered for them
};
```

Ở đây chúng ta sẽ làm 2 việc: 
1. Thêm `db.onversionchange` listener sau khi mở thành công, để được thông báo về nỗ lực cập nhật song song.
2. Thêm `openRequest.onblocked` listener để xử lý trường hợp khi một kết nối cũ không được đóng. Điều này không xảy ra nếu chúng ta đóng nó trong `db.onversionchange`.

Có các biến thể khác. Ví dụ: chúng ta có thể dành thời gian để đóng mọi thứ trong `db.onversionchange`, nhắc user truy cập lưu dữ liệu trước khi kết nối được đóng lại. Kết nối cập nhật mới sẽ bị chặn ngay lập tức sau khi `db.onversionchange` kết thúc mà không đóng và chúng ta có thể yêu cầu khách truy cập trong tab mới, đóng các tab khác để cập nhật.

Xung đột cập nhật như vậy hiếm khi xảy ra, nhưng ít nhất chúng ta nên có một số xử lý cho nó, ví dụ: xử lý `onblocked`, để script của chúng ta không làm người dùng bất ngờ khi chúng thay đổi.