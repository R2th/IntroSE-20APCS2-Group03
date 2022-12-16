Khi làm Frontend, chúng ta luôn phải có yêu cầu request API, hoặc request file từ server, đây đều gọi chung là tạo các HTTP request.

Có nhiều thư viện hỗ trợ cho việc này, đó có thể là `fetch()` hoặc `axios`. Trong bài viết này, chúng ta sẽ cùng tìm hiểu công cụ nào hỗ trợ tốt hơn trong việc này.

## Tổng quan và cú pháp 
### Fetch 

`fetch()` là một hàm của đối tượng `window` trong javascript, cho phép chúng ta lấy dữ liệu từ API một cách bất đồng bộ mà không cần cài đặt thêm thư viện, nghĩa là fetch không phải là một thư viện mà là công cụ có sẵn mà trình duyệt cung cấp thông qua Fetch API 

Cú pháp cơ bản là 

```
fetch(url)
  .then((res) => {
    // handle response
  })
  .catch((error) => {
    // handle error
  });
```

Trong hàm fetch, phải luôn có một tham số bắt buộc, đó là `url`, nó là đường dẫn mà user muốn lấy data. Sau đó `fetch` sẽ trả về một promise mà có thể dùng để xử lý thành đối tượng response hay bắn ra lỗi. 

VD:

```
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));
```

Tham số thứ 2 là options, có thể thêm hoặc không. Nếu user không thêm, thì request sẽ luôn là method GET, nó sẽ lấy nội dùng từ URl được cung cấp và sau đó promise sẽ trả về đối tượng response, và user cần một hàm khác để xử lý body response này thành định dạng mong muốn. 

VD như các định dạng:

```
response.json() // đây là format phổ biến nhất 
response.text()
response.blob()
response.formData()
response.arrayBuffer()
```

Tuy nhiên, hàm `fetch` được tạo sẵn này lại không dùng được trong Node.js, nếu muốn sử dụng thì ta cần cài thêm một polyfill (vd `node-fetch`), nhưng vẫn có một vài sự khác nhau so với bản gốc.

### Axios 

Axios là một thư viện javascript để tạo request HTTP được dùng cho cả Node, XMLHttpRequest hay trên trình duyệt. Đó là một thư viện hiện đại, dựa trên Promise API. 

Axios có một vài ưu điểm là có thể chống lại CSFR (cross-site request forgery)

Để sử dụng Axios, bạn cần cài đặt và import vào project, thông qua CDN, npm, Yarn hay Bower.

Cú pháp cơ bản:

```
axios.get(url)
  .then((response) => console.log(response))
  .catch((error) => console.log(error));
```

Cú pháp trên là cách tọa một request get đơn giản, có một callback cho response hoặc error. Khi user cần tạo request phức tạp hơn, thì cần phải tạo một đối tượng config 

Có nhiều config, bạn có thể xem ở [đây](https://github.com/axios/axios#request-config), phổ biến nhất là url, baseURL, params, auth, headers, responseType, và data.

Trong response, Axios cũng trả lại một promise để xử lý response object hay là một object error. Trong response object sẽ chứa các giá trị :

```
- data: body của response 
- status: mã HTTP status code của response, vd 200 hay 404 
- statusText: đoạn text của HTTP status
- headers: chứ header của request 
- config: cấu hình của request 
- request: đối tượng XMLHttpRequest (XHR)
```

Khi làm việc với `fetch()`, thì ta cần làm việc với 2 promise, và ta có thể tránh được điều đấy và giúp code clean hơn khi dùng với Axios 

Có một vài điểm khác nhau cơ bản có thể thấy ngay là:

- Axios sử dụng thuộc tính `data`, nhưng fetch thì dùng `body` để chứa data.
- Data của axios đã tự động convert sang json, còn data của fetch là ở dạng string 
- Url trong Axios là đối tượng config, còn trong fetch là 1 tham số URL và options 

## Sự khác nhau giữa Axios và Fetch 

### JSON

#### Fetch 
Với fetch, user cần dùng một hàm để convert response data, vì data được nhần từ response là dạng dữ liệu [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response).

```
fetch('url')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

ở trong VD trên, user cần gọi hàm `response.json()` để convert data response. 

#### Axios 

User truyền data vào request hay nhận data từ response thì data luôn tự động convert., do đó không cần phải thêm các method khác. 

```
axios.get('url')
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
```

### Xử lý lỗi 

#### Fetch 

Mỗi khi bạn get data từ response bằng fetch, bạn cần kiểm tra status là thành công hay không, vì dù có lỗi thì response vẫn được trả về 

Trong fetch một promise sẽ không được xử lý nếu và chỉ nếu request không được hoàn thành 

```
fetch('url')
    .then((response)=>{
        if(!response.ok){
            throw Error (response.statusText);
        }
        return response.json();
    })
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error))
```

Fetch cũng không bắn lỗi network, do đó, bạn phải luôn kiểm tra trnajg thái thông qua thuộc tính `response.ok`. Chúng ta có thể tách method riêng để giúp tái sử dụng code.

```
const checkError = response => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  };
  
  fetch("url")
    .then(checkError)
    .then(data => console.log(data))
    .catch(error => console.log("error", error));
```

#### Axios 

Việc xử lý lỗi rất dễ dàng vì Axios cho phép bắn lỗi network. Nếu đó là một bad response như `404`, promise sẽ được bỏ qua và sẽ trả về một error. Do đó, ta cần `catch` error đấy. 

```
axios.get('url')
    .then((response)=> console.log(response))
    .catch((error)=>{
        if(error.response){
        // When response status code is out of 2xxx range
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request){
            //When no response was received after request was made
            console.log(error.request);
        } else {
            // Error
            console.log(error.message);
        }
    })
```

=> Quan điểm cá nhân là Axios giúp code tường minh hơn 

### Tiến trình Download 

Khi cần thực hiện load file lớn, thì việc hiện thị các thành phần thông báo tiến trình xử lý sẽ giúp tăng UX hơn. Với cách xử lý cơ bản, ta có thể dùng `XMLHttpRequest.onprogress` như một callback để thêm loading. Vậy với fetch và axios sẽ xử lý vấn đề này như thế nào 

#### Fetch 

Để theo dõi tiến độ tải, với fetch, bạn có thể sử dụng một trong các thuộc tính của response.body, đó là object `ReadableStream`.. Nó cung cấp dữ liệu body từng phần một và cho phép bạn đếm bao nhiêu data được tải.

```
https://github.com/AnthumChris/fetch-progress-indicators

const element = document.getElementById('progress');

fetch('url')
  .then(response => {

    if (!response.ok) {
      throw Error(response.status+' '+response.statusText)
    }

    // ensure ReadableStream is supported
    if (!response.body) {
      throw Error('ReadableStream not yet supported in this browser.')
    }

    // store the size of the entity-body, in bytes
    const contentLength = response.headers.get('content-length');

    // ensure contentLength is available
    if (!contentLength) {
      throw Error('Content-Length response header unavailable');
    }

    // parse the integer into a base-10 number
    const total = parseInt(contentLength, 10);

    let loaded = 0;

    return new Response(

      // create and return a readable stream
      new ReadableStream({
        start(controller) {
          const reader = response.body.getReader();

          read();
          function read() {
            reader.read().then(({done, value}) => {
              if (done) {
                controller.close();
                return; 
              }
              loaded += value.byteLength;
              progress({loaded, total})
              controller.enqueue(value);
              read();
            }).catch(error => {
              console.error(error);
              controller.error(error)                  
            })
          }
        }
      })
    );
  })
  .then(response => 
    // construct a blob from the data
    response.blob()
  )
  .then(data => {
    // insert the downloaded image into the page
    document.getElementById('img').src = URL.createObjectURL(data);
  })
  .catch(error => {
    console.error(error);
  })

function progress({loaded, total}) {
  element.innerHTML = Math.round(loaded/total*100)+'%';
}
```

Đoạn code trên sử dụng `ReadableStream` để hiển thị phản hồi khi ảnh đang được tải 

#### Axios 

Với Axios, chúng ta cũng dễ dàng thêm tiến trình hoạt động, vì có sẵn thư viện cho việc này, đó là [`Axios Progress Bar`](https://github.com/rikmms/progress-bar-4-axios/)

```
loadProgressBar();

function downloadFile(url) {
    axios.get(url, {responseType: 'blob'})
      .then(response => {
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data); 
        reader.onload = () => {
          document.getElementById('img').setAttribute('src', reader.result);
        }
      })
      .catch(error => {
        console.log(error)
      });
}
```

### Tiến trình Upload 
#### Fetch 
Với Fetch, bạn không thể theo dõi quá trình upload file 

#### Axios 
Axios cho phép theo dõi quá trình upload của bạn. Điều này thật tuyệt vời khi xử lý các chức năng upload video hay file nặng, hỗ trợ việc cải thiện UX 

```
const config = {
    onUploadProgress: event => console.log(event.loaded)
  };

axios.put("/api", data, config);
```

### Ngăn chặn HTTP 

VIệc ngăn chặn sẽ thật quan trọng khi bạn cần kiểm tra hay thay đổi request HTTp từ ứng dụng đến server thông qua quá trình xác thực, log, ...

#### Fetch 
Fetch không cung cấp việc ngăn chặn hay kiểm soát HTTP request mặc định. Chúng ta chỉ có dùng cách ghi đề hàm fetch và định nghĩa các yêu cầu khi trong quá trình gửi request, nhưng điều này sẽ làm tăng số lượng code và phức tạp hơn nhiều so với Axios 

vd

```
fetch = (originalFetch => {
    return (...arguments) => {
      const result = originalFetch.apply(this, arguments);
        return result.then(console.log('Request was sent'));
    };
  })(fetch);
  
fetch('url')
    .then(response => response.json())
    .then(data => {
      console.log(data) 
    });
```

#### Axios 

Đây là một trong các chức năng chính của thư viện này 

```
// request interceptors
axios.interceptors.request.use((config)=>{
    console.log('Request was sent');
    return config;
})

// response interceptors
axios.interceptors.response.use((response) => {
    // do an operation on response
    return response; 
})

axios.get('url')
    .then((response)=>console.log(response))
    .catch((error)=>console.log(error))
````

Các hàm `axios.interceptors.request.use()` và `axios.interceptors.response.use()` cho phép chúng ta định nghĩa code trước khi một request HTTP được gửi 

### Response Timeout
#### Fetch 

Fetch cung cấp chức năng timout thông qua interface `AbortController`

```
const controller = new AbortController();
const signal = controller.signal;
const options = {
  method: 'POST',
  signal: signal,
  body: JSON.stringify({
    firstName: 'Sabesan',
    lastName: 'Sathananthan'
  })
};  
const promise = fetch('/login', options);
const timeoutId = setTimeout(() => controller.abort(), 5000);

promise
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'));
```

Đối tượng AbortController cho phép bạn dừng request. Trong vd trên, nếu server không phản hồi nhiều hơn 5 giây, thì quá trình request sẽ bị dừng lại bằng cách gọi hàm `controller.abort()`

#### Axios 

Chúng ta chỉ cần đơn giản thêm `timeout` vào object config là được

```
axios({
    method: 'post',
    url: '/login',
    timeout: 5000,    // 5 seconds timeout
    data: {
      firstName: 'Sabesan',
      lastName: 'Sathananthan'
    }
  })
  .then(response => {/* handle the response */})
  .catch(error => console.error('timeout exceeded'))
```

Đây là một trong các nguyên nhân mà Axios được chọn dùng nhiều hơn, do việc cài đặt timeout đơn giản hơn nhiều 

### Các request đồng thời 
#### Fetch 

Để tạo các request đồng thời, bạn có thể sử dụng hàm được tạo sẵn , đó là `Promise.all()`, và truyền vào array fetch request, sau đó gọi hàm async để xử lý response.

```
Promise.all([
  fetch('https://api.github.com/users/sabesansathananthan'),
  fetch('https://api.github.com/users/rcvaram')
])
.then(async([res1, res2]) => {
  const a = await res1.json();
  const b = await res2.json();
  console.log(a.login + ' has ' + a.public_repos + ' public repos on GitHub');
  console.log(b.login + ' has ' + b.public_repos + ' public repos on GitHub');
})
.catch(error => {
  console.log(error);
});
```

#### Axios 

Axios cung cấp phương thức cho việc trên thông qua hàm `axios.all()`. Cũng tương tự fetch, bạn cần truyền vào một mảng các request và gán mảng response vào hàm `axios.spread()`

```
axios.all([
  axios.get('https://api.github.com/users/sabesansathananthan'), 
  axios.get('https://api.github.com/users/rcvaram')
])
.then(axios.spread((obj1, obj2) => {
  // Both requests are now complete
  console.log(obj1.data.login + ' has ' + obj1.data.public_repos + ' public repos on GitHub');
  console.log(obj2.data.login + ' has ' + obj2.data.public_repos + ' public repos on GitHub');
}));
```

### Khả năng tương thích
#### Fetch

Fetch chỉ hỗ trợ từ Chrome 42, Safari 10.1, Firefox 39 và Edge 14 trở lên. 

Để sử dụng fetch trong trình duyệt mà không support, bạn có thể sử dụng fetch với một polyfill như `windows.fetch()`

Để sử dụng fetch polyfill, cần cài đặt thông qua npm:

```
npm install whatwg-fetch --save
```

Và sử dụng 

```
import {fetch as fetchPolyfill} from 'whatwg-fetch'

window.fetch(...)   // use native browser version
fetchPolyfill(...)  // use polyfill implementation
```

#### Axios 

Không giống như fetch, Axios hỗ trợ hầu như mọi trình duyệt và version, kể cả các trình duyệt cũ như IE11 cũng có thể chạy Axios mà không có vấn đề gì

### Kết luận

Với hầu hết các yêu cầu cần thiết cho giao tiếp HTTP, Axios đều cung cấp giải pháp dễ dàng cho vấn đề đó. Thư viện này thật sự là một giải pháp tốt nhất khi cần thao tác với các request HTTP mà cần có cơ chế xử lý lỗi chuẩn và thêm các hành động ngăn chặn HTTP.

Tuy nhiên, với các project nhỏ, chỉ yêu cầu gọi các API đơn giản, thì fetch cũng là một giải pháp tốt, vì suy cho cùng, Axios cũng là 1 thư viện bên thứ 3, và cần import vào, như vậy sẽ làm tăng kích thước file JS của chúng ta.