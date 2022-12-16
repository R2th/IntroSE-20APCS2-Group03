# Tổng quan
Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.

Việc tạo ra một HTTP request dùng để fetch hay lưu dữ liệu là một trong những nhiệm vụ thường thấy mà một ứng dụng Javascript phía client cần phải làm khi muốn giao tiếp với phía server. Các thư viện bên thứ 3, đặc biệt là jQuery từ xưa đến nay vẫn là một trong những cách phổ biến để giúp cho các browser API tương tác tốt hơn, rõ ràng mạch lạc hơn và xóa đi những điểm khác biệt giữa các browser với nhau.

Khi ngày càng có nhiều developer thích dùng các native DOM API được nâng cấp và cải thiện hơn jQuery, hay các thư viện lập trình front-end UI như React và Vue.js thì việc sử dụng cả một thư viện jQuery chỉ với một giá trị sử dụng đó là tính năng của hàm `$.ajax` đã trở nên bất hợp lý hơn bao giờ hết.

Hãy cùng xem cách để bắt đầu sử dụng **Axios** trong code của bạn, và xem một vài tính năng đã góp phần làm cho nó thêm phổ biến đối với các lập trình viên Javascript.

# Axios Vs Fetch
Có lẽ bạn cũng đã để ý rằng, các browser hiện đại bây giờ thường đi kèm và xây dựng sẵn các tính năng [Fetch API](https://www.sitepoint.com/introduction-to-the-fetch-api/) mới hơn, vậy tạo sao ta lại không dùng nó luôn cho xong? Rất nhiều những sự khác biệt giữa **Axios** và **Fetch** khiến rất nhiều người vẫn lựa chọn **Axios** thay vì **Fetch**.

Một trong những đặc điểm lớn ta có thể thấy đó là cách mà 2 thư viện xử lý với các [HTTP error code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors). Khi sử dụng Fetch, nếu khi server trả về các mã lỗi 4xx hay 5xx, thì hàm `catch()` của bạn sẽ không được gọi đến và người lập trình viên sẽ có nhiệm vụ phải tự kiểm tra trạng thái của mã trả về để xác định xem liệu request đó có thành công hay không. Trong khi đó, **Axios** sẽ reject tất cả các promise của request nếu một trong các mã lỗi trên được trả về.

Một điểm khác biệt nho nhỏ khác, điều mà không ít các lập trình viên mới trong việc xây dựng API gặp phải đó là việc **Fetch** không tự động gủi trả cookies về cho server khi tạo một request. Ta sẽ cần phải truyền một cách trực tiếp các option để cho cookies có thể được include. Còn với **Axios** thì bạn không hề phải lo về vấn đề này.

Sự khác biệt có thể được coi là vô cùng đáng chú ý đối với rất nhiều lập trình viên đó là khả năng cập nhật tiến độ của những lần uploads/downloads. Vì **Axios** được xây dựng dựa trên các XHR API cũ hơn, bạn có thể khai báo các hàm callback cho `onUploadProgress` và `onDownloadProgress` để hiện thị phần trăm thành công tại giao diện cho app của bạn. Và cho đến hiện tại thì `Fetch` vẫn chưa hỗ trợ gì cho việc này.

Cuối cùng, **Axios** có thể được xử dụng ở cả browser và Node.js và chính điều này đã tạo cơ hội cho việc chia sẻ code Javascript giữa các trình duyệt và phần back-end hay việc thực hiện render cho ứng dụng front-end của bạn ở phía server.

# Cài đặt
Có thể bạn đã biết, một trong các cách thường thấy để cài đặt **Axios** đó là thông qua trình quản lý các npm package.

```bash
npm i axios
```

và sau đó include nó vào trong code của bạn ở những nơi bạn cần:

```javascript
// ES2015 style import
import axios from 'axios';

// Node.js style require
const axios = require('axios');
```

Hoặc nếu bạn không sử dụng một loại module bundler nào (ví dụ: webpack), thì bạn vẫn luôn có thể kéo thư viện này từ một CDN như theo cách truyền thống:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## Hỗ trợ trình duyệt
**Axios** có thể hoạt động trong tất các trình duyệt web hiện đại, và Internet Explorer phiên bản 8+

# Tạo một request với Axios
Giống như với hàm `$.ajax` của jQuery, bạn có thể tạo bất kỳ một request HTTP nào bằng cách truyền vào các object option cho Axios:

```javascript
axios({
  method: 'post',
  url: '/login',
  data: {
    user: 'test',
    lastName: 'test1'
  }
});
```

Ở đây chúng ta cung cấp cho **Axios** biết rằng phương thức HTTP nào mà chúng ta muốn dùng (Ví dụ: GET/POST/DELETE...) và URL nào được sử dụng để gửi request lên.

Đồng thời chúng ta cũng cung cấp một số dữ liệu để có thể gửi kèm với request dưới dạng các object Javascript đơn giản gồm các cặp key/value. Mặc định, **Axios** sẽ serialize các object này thành JSON và gắn chúng ở phần body của request.

## Các option cho Request
Có rất nhiều các option thêm mà bạn có thể truyền vào khi tạo một request, nhưng dưới đây là những option phổ biến nhất:
* `baseURL`: nếu bạn chỉ định một base URL, nó sẽ được đính vào trước bất cứ một URL tương đối nào mà bạn sử dụng.
* `headers`: một object gồm các cặp key/value có thể gửi trong header của request.
* `params`: một object gồm các cặp key/value mà sẽ được serialize và đính vào URL dưới dạng một query string.
* `responseType`: nếu bạn mong chờ một format trả về khác ngoài JSON, thì bạn có thể set thuộc tính này thành `arraybuffer`, `blob`, `document`, `text` hay `stream`
* `auth`: truyền vào một object gồm 2 trường `username` và `password` được sử dụng để cung cấp quyền truy cập cho các request yêu cầu HTTP Basic auth.

## Các hàm tiện lợi
Giống như **jQuery**,  **Axios** cũng có những hàm ngắn để thực hiện các kiểu request khác nhau.

Các hàm `get`, `delete`, `head` và `options` đều nhận vào 2 tham số là URL và một object option dùng để config request.

```javascript
axios.get('/products/5');
```

Các hàm `post`, `put` và `patch` nhận một object dữ liệu vào thành tham số thứ 2 của chúng và object option dùng để config là tham số thứ 3.

```javascript
axios.post(
  '/products',
  { name: 'Waffle Iron', price: 21.50 },
  { options }
);
```

# Nhận về một response
Một khi bạn đã tạo ra một request, **Axios** trả về một promises mà sẽ resolve ngay cả khi kết quả trả về là một object response hay một object error.

```javascript
axios.get('/product/9')
  .then(response => console.log(response))
  .catch(error => console.log(error));
```

## Response Object
Khi một request được thực hiện thành công, thì hàm `then()` của bạn sẽ nhận được một response object với các thuộc tính như sau:
* `data`: Payload được trả về từ server. Mặc định, Axios mong chờ JSON và sẽ parse nó trở thành một Javascript Object cho bạn.
* `status`: mã HTTP được trả về từ server.
* `statusText`: message của HTTP status được trả về bởi server.
* `headers`: tất cả các header được gửi về từ server.
* `config`: thiết lập ban đầu của request.
* `request`:  một object `XMLHttpRequest` thực khi request được thực hiện ở trình duyệt.

## Error Object
Nếu có bất kỳ vấn đề gì xảy ra với request, promise sẽ bị reject với một error object chứa những thuộc tính sau đây.
* `message`: message của error ở dạng text.
* `response`: response object được trả về.
* `config`: thiết lập ban đầu của request.
* `request`:  một object `XMLHttpRequest` thực khi request được thực hiện ở trình duyệt.

# Transforms và Interceptors
## Transforms
**Axios** cho phép bạn cung cấp các function để biến đổi dữ liệu đến và đi, dưới dạng 2 config option mà bạn có thể set khi thực hiện một request: `transformRequest` và `transformResponse`. Cả 2 thuộc tính đều là các mảng, giúp bạn có thể tạo một luồng các function mà dữ liệu có thể đi qua.

Bất kỳ function nào được truyền vào `transformRequest` đều được ứng dụng vào cho các request PUT, POST và PATCH. Chúng nhận vào dữ liệu cần request và object header dưới dạng tham số và phải trả về một object đã được chỉnh sửa thay đổi.

```javascript
const options = {
  transformRequest: [
    (data, headers) => {
      // do something with data
      return data;
    }
  ]
}
```

Các function cũng có thể được thêm vào `transformResponse` tương tự như vậy, nhưng chỉ được gọi khi có response data từ server, và trước khi response được truyền qua bất cứ hàm `then()` nào.

Vậy ta có thể sử dụng transform vào mục đích gì? Một trường hợp sử dụng đó là khi API mong chờ dữ liệu trả về dưới format cụ thể khác như XML hay kể cả CSV. Bạn có thể set up một vài hàm transform để convert dữ liệu gửi đi và trả về.
Mặc định, hàm `transformRequest` và `transformResponse` biến đổi dữ liệu thành JSON.

## Interceptors
Trong khi transform cho phép bạn điều chỉnh dữ liệu gửi đi và trả về, **Axios** cũng cho phép bạn thêm các function gọi là interceptors. Giống transform, những function này có thể được đính vào để gọi đến khi một request được tạo ra, hay một response được trả về.

```javascript
// Add a request interceptor
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
  }, (error) => {
    // Do something with response error
    return Promise.reject(error);
  });
```

Như bạn có thể thấy ở ví dụ trên, interceptor có những điểm khác biệt quan trọng so với transforms. Thay vì chỉ nhận dữ liệu hay headers, interceptor nhận vào toàn bộ config của request hay response object.

Khi tạo một interceptor, bạn cũng có thể chọn cung cấp một hàm xử lý error cho phép bạn bắt và xử lý lỗi hợp lý. Request interceptors có thể được sử dụng để thực hiện những điều như: lấy token từ localStorage và gửi kèm các request. Response interceptor có thể được dùng để bắt lỗi 401 và redirect đến trang login trong việc xác thực.

# Third-Party Add-Ons
Là một thư viện phổ biến, **Axios** được hưởng lợi rất nhiều từ một hệ sinh thái các thư viện bên thứ 3 thừa hưởng từ tính năng của Axios.
*  [axios-mock-adaptor](https://github.com/ctimmerm/axios-mock-adapter): cho phép bạn dẽ dàng mock request để thực hiện việc kiểm tra code.
*  [axios-cache-plugin](https://github.com/jin5354/axios-cache-plugin): một wrapper được dùng để lựa chọn lưu Cache các GET request.
*  [redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware): nếu bạn dùng Redux, middleware này cung cấp một cách gọn gàng để dispatch một Ajax request với các actions.
Một danh sách các [add-ons và extensions khác](https://github.com/axios/axios/blob/master/ECOSYSTEM.md) có sẵn trên Github.

# Tổng kết
Có rất nhiều lý do để ta chọn sử dụng Axios. Thư viện này có một API rõ ràng, với các method hữu dụng quen thuộc với bất kì ai đã từng sử dụng jQuery trước đây. Sự phổ biến của nó và việc có sẵn các thư viện bên thứ 3 khiến Axios trở thành lựa chọn chắc chắn cho ứng dụng của bạn cho dù là front-end hay back-end hay cả hai.
## Tham khảo
* https://www.sitepoint.com/axios-beginner-guide/