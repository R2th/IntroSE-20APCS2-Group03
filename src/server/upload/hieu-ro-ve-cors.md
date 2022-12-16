![cors](https://cdn-images-1.medium.com/max/1600/1*AAtbKMYYz5wgxed7Tu6tzw.png)
Nếu bạn đã từng gọi 1 AJAX call thì hẳn bạn sẽ thấy quen thuộc với lỗi được hiển thị trong console của trình duyệt dưới đây:

![ajaxerror](https://cdn-images-1.medium.com/max/1600/1*U2MpZQXPI-RW2JASIoeaFQ.png)
*`Failed to load https://example.com/: No ‘Access-Control-Allow-Origin’ header is present on the requested resource. Origin ‘https://anfo.pl' is therefore not allowed access. If an opaque response serves your needs, set the request’s mode to ‘no-cors’ to fetch the resource with CORS disabled.`*

## Cross-Origin Resource Sharing (CORS)
Thứ bạn đang quan sát là kết quả của việc tích hợp CORS của trình duyệt.

Trước khi CORS trở thành quy chuẩn thì không có một cách nào để gọi đến 1 API endpoint ở một domail khác vì các lý do an ninh. Nó đã từng bị (và hiện tại ở một mức độ nào đó vẫn bị) chặn bởi Same-Origin Policy.

CORS là một cơ chế hướng tới việc cho phép các request của bạn đồng thời chặn các đoạn JS giả mạo, cơ chế này được kích hoạt bất cứ khi nào bạn tạo một HTTP request tới:

* một tên miền khác (ví dụ: trang example.com gọi api.com)
* một tên miền phụ khác (ví dụ: trang ở example.com gọi api.example.com)
* một port khác (ví dụ:  trang ở example.com gọi example.com:3001)
* một protocol khác (ví dụ: trang ở https://example.com gọi http://example.com)

Một cơ chế ngăn chặn những kẻ tấn công có kế hoạch đặt những đoạn script ở nhiều trang web khác nhau (như các quảng cáo được hiển thị qua Google Ads) để tạo những AJAX call tới  www.yourbank.com và trong trường hợp bạn đã đăng nhập thì sẽ dùng chính các thông tin đăng nhập của bạn.

Nếu server không phản hồi với những header riêng với các request GET hoặc POST "simple"— nó vẫn sẽ được gửi, dữ liệu vẫn được nhận nhưng trình duyệt sẽ không cho phép JavaScript truy cập vào reposnse đó.

Nếu trình duyệt của bạn tạo một  “non simple” request (ví dụ như request bao gồm cả cookies, hoặc `Content-type` khác `application/x-ww-form-urlencoded, multipart/form-data or text-plain`, một cơ chế được gọi là `preflight` sẽ được sử dụng và một request OPTIONS sẽ được gửi đến server.

Một ví dụ điển hình của “non simple” request là thêm cookies hoặc custom headers —trình duyệt của bạn gửi một request và server không hề phản hồi, chỉ có `preflight` call được tạo (không có những extra headers)  nhưng request HTTP mà trình duyệt đã tạo sẽ không được gửi.

## Access-Control-Allow-What?
CORS sử dụng một vài HTTP headers --ở cả request và response-- nhưng những cái bạn phải hiểu để làm việc với nó bao gồm:
### Access-Control-Allow-Origin
Header này được trả về bởi server, và chỉ ra những domain nào được phép truy cập đến. Giá trị có thể là :

* * — cho phép tất cả các tên miền
* một tên miền đầy đủ (ví dụ: https://example.com)

Nếu bạn yêu cầu phía client truyền các header xác thực (ví dụ như cookies) thì giá trị không thể là * mà phải là một tên miền đầy đủ!!
### Access-Control-Allow-Credentials
Header này chỉ bị yêu cầu ở response trả về nếu server của bạn hỗ trợ xác thực qua cookies. Giá trị hợp lệ duy nhất trong trường hợp này là `true`.
### Access-Control-Allow-Headers
Cung cấp một danh sách các header mà server sẽ hỗ trợ tách nhau bởi dấu phẩy. Nếu bạn có dùng các custom header (ví dụ: `x-authentication-token`) , bạn phải trả nó về trong ACA headers trong  response của OPTIONS call, nếu không thì request của bạn sẽ bị block.

### Access-Control-Expose-Headers
Tương tự, response này chứa danh sách các header sẽ có trong response. Tất cả các header khác sẽ bị hạn chế.

### Access-Control-Allow-Methods
Một danh sách các HTTP request (GET, POST, ...) được server hỗ trợ, cách nhau bởi dấu phẩy.
### Origin
Header này là một phần của request mà phía client tạo, và sẽ bao gồm tên miền nơi web app của bạn chạy. Vì những lý do an ninh mà mà trình duyệt sẽ không cho bạn ghi đè giá trị này.
## Làm thế nào để sửa CORS “error”?
Bạn phải hiểu rằng CORS không phải là lỗi — nó là một cơ chế mà đang hoạt động như mong đợi để bảo vệ người dùng của bạn, bạn hoặc trang bạn đang gọi đến.
Đôi khi, việc thiếu các header thích hợp là kết quả của việc tích hợp sai phía client (thiếu xác thực ví dụ như API key).

Có vài cách để "sửa lỗi" tùy thuộc vào tình huống mà bạn đang gặp:

**A — Tôi đang lập trình phía frontend và có quyền xử lý hoặc biết người đang lập trình phần backend**

Đây là trường hợp ngon nhất - bạn chỉ cần thêm phần phản hồi CORS cho server mà bạn gọi đến. Nếu đang dùng ExpressJS cho NodeJS thì bạn chỉ cần đơn giản là cài CORS package. Còn nếu muốn trang của bạn thực sự bảo mật thì có thể suy nghĩ đến việc sử dụng whitelist cho Access-Control-Allow-Origin header.

**B — Tôi đang lập trình phía frontend nhưng hiện tại lại không có quyền xử lý backend, cần 1 phương pháp tạm thời**

Trường hợp này thì có thể giải quyết tương tự A, nhưng lại có 1 số hạn chế về thời gian. Để fix tạm thời vấn đề này thì bạn có thể làm cho trình duyệt của bạn bỏ qua cơ chết CORS -- ví dụ như sử dụng  ACAO Chrome extension hoặc tắt nó đi bằng cách chạy Chrome với đoạn flags dưới đây:

```js
chrome --disable-web-security --user-data-dir
```
**Lưu ý cực mạnh** Nhớ rằng điều này sẽ vô hiệu hóa cơ chế cho tất cả các website trong cả phiên làm việc của browser. Lưu ý khi sử dụng.

Một cách thay thế khác đó là xử dụng devServer.proxy (cho rằng bạn đang sử dụng webpack cung cấp app) hoặc sử dụng một giải pháp CORS-as-a-service như  https://cors-anywhere.herokuapp.com/

## Nhiều hơn về CORS
Nếu bạn mong muốn học nhiều hơn về CORS thì có thể đọc thêm bài viết chi tiết hơn ở trang [MDN này](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).