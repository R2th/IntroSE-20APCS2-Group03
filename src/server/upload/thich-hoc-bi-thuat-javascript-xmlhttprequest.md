{@embed: https://www.youtube.com/watch?v=TqmN-UO64Q4}
# Giới thiệu
Từ ngàn xưa, để thực hiện HTTP requests trong Javascript, người ta đã thực hiện một phương thức cổ đại được truyền lại từ ai đó. Phương thức đó là `XMLHttpRequest`. Đây là một phương thức được tích hợp sẵn trong trình duyệt để thực hiện những HTTP requests để lấy dữ liệu từ đâu đó đến Javascript. Hiện tại, phương thức này đã cũ kĩ và đang dần rơi vào quên lãng vì bây giờ, đã có phương thức mới hơn, xịn hơn, đó là `fetch`. Tuy nhiên, đâu đó, một số nơi vẫn dùng phương thức cổ đại này với 3 lí do:
1. Hỗ trợ những script cũ được viết từ thời xa xưa, khi mà chỉ có `XMLHttpRequest`
2. Cần support trình duyệt cũ
3. Hỗ trợ những thứ mà `fetch` không có như là theo dõi quá trình lấy dữ liệu
# Căn bản
XMLHttpRequest có hai chế độ để thực thi câu lệnh: đồng bộ và bất đồng bộ. Hãy cùng tìm hiểu về bất đồng bộ trước. Để có thể gọi và lấy dữ liệu từ request, chúng ta có 3 bước cần thực hiện:
1. Tạo ra instance của XMLHttpRequest
```
let xhr = new XMLHttpRequest();
```
2. Config nó, trong này dùng phương thức open chứ nó không open cái gì cả nha :D. Kiểu vừng ơi mở cửa ra cho vui xong phải lấy chìa khóa để mở cửa. 
```
xhr.open(method, URL, [async, user, password])
```
Giải thích những tham số như sau:
- method: HTTP method như "GET", "POST"
- URL: URL của request, có thể là chuỗi hoạc URL object
- async: quyết định request bất đồng bộ hay đồng bộ, false là đồng bộ còn true hoặc không set thì là bất đồng bộ
- user, password: HTTP auth nếu có
3. Gửi request về phương xa và nhận về tin mật
```
xhr.send([body])
```
Tham số `body` là tùy chọn, sẽ chứa request body, thường được dùng với phương thức POST để gửi dữ liệu. Đây sẽ là phương thức để mở kết nối và bắt đầu gửi request đến server.
4. Cuối cùng là lót dép hóng drama (sự kiện)
Thường thì có 3 loại sự kiện chính:
- load: đây là trạng thái khi mà request xong xuôi rồi và response đã được trả về
- error: đây là trạng thái khi mà không thể gửi request như là URL không đúng, server đi nghỉ mát
- progress: theo dõi quá trình response được tải về, show cho mifnnh thấy là bao nhiêu phần đã được tải xuống rồi
```
xhr.onload = function() {
    alert(`Loaded: ${xhr.status} ${xhr.response}`);
};

xhr.onerror = function() {
    alert(`Network Error`);
};

xhr.onprogress = function(event) {
    alert(`Received ${event.loaded} of ${event.total}`);
};
```
# Thực hành
Lí thuyết thật là nhiều, giờ chúng ta cùng đi vào thực hành nào. Trong ví dụ này, mình sẽ viết một chương trình để có thể lấy dữ liệu của mấy con pokemon. Đầu tiên, các bạn truy cập vào trang `https://pokeapi.co/`. Sau khi vào trang này thì chuột phải chọn inspect. Sau khi xong thì chúng ta bắt đầu code thôi. 
Đầu tiên là khởi tạo instance của XMLHttpRequest:
```
let xhr = new XMLHttpRequest()
```
Tiếp theo là config:
``` 
xhr.open('GET', '/api/v2/pokemon/ditto')
```
Sau đó, viết một vài phương thức để hóng hớt drama. Trong ví dụ này mình sẽ viết cả 3 và mô tả cả 3, nhưng mà giờ mình sẽ ưu tiên onload trước đã.
```
xhr.onload = function() {
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
};
```
Nôm na, khi gọi về phương xa và nhận được hồi âm thì phương thức này sẽ nhận hồi âm đó và bắt đầu hoạt động. Trong code, đầu tiên mình check xem status của hồi âm này là gì, nếu là 200 tức là thành công thì alert ra cái response, nếu không thành công thì in ra lỗi cùng với status và status text. Status text là text của status như status 200 thì text của nó sẽ là `OK` nhưng không có con dê, còn status `404` thì text của nó sẽ là `Not Found`,.... Cuối cùng là send request và nhận về response.
- status: HTTP status code: 200, 400, 404, ..., có thể là 0
- statusText: HTTP status message là message tương ứng cho status như 200 là `OK`, 404 là `Not Found`
- response: kết quả trả về từ phương xa
```
xhr.send()
```
Kết quả bạn thấy Pokemon sẽ nói hãy like, share và subscribe kênh thích học của mình :D. Đùa thôi, pokemon nói như thế này: 

![image.png](https://images.viblo.asia/025db205-6369-4834-bb5a-92f39253bc20.png)

Giờ mình muốn gọi lại lần nữa thì sao? Thì send lại lần nữa, tuy nhiên state hiện tại của xhr đã không còn open nữa vì chúng ta đã thực hiện xong request rồi. Để thực hiện lần nữa thì chúng ta lại cần config lại rồi gọi lại lệnh send:
```
xhr.open('GET', '/api/v2/pokemon/ditto')
xhr.send
```
Và Pokemon lại nói:
![image.png](https://images.viblo.asia/025db205-6369-4834-bb5a-92f39253bc20.png)

Về Response Type:
- "": mặc định dạng chuỗi
- "text": dạng chuỗi
- "arraybuffer": dạng ArrayBuffer
- "blob": dạng Blob cho dữ liệu nhị phân
- "document": dạng XML hoặc HTML document
- "json": tự parse sang kiểu JSON

Thiệt là ngầu, giờ tiếp tục tìm hiểu onprogress với onerror nhé. Các bạn thêm function onprogress và onerror vào như sau:
```
xhr.onprogress = function(event) {
    console.log(`Received ${event.loaded} of ${event.total}`);
}

xhr.onerror = function() {
    alert('Netwwokr Error');
}
```
Với `onprogress` khi lấy dữ liệu, các bạn sẽ thấy browser log ra dữ liệu đang được truyền. Còn với `onerror` thì các bạn thử tắt mạng xem mọi người có trầm trồ, sau đó gọi lại thử thì sẽ được nhận alert `Network Error`.

Để thêm param cho URL thì chúng thể dùng string hoặc dùng URL object trong javascript. Để gọi lấy dữ liệu từ endpoint này `pokemon?limit=100000&offset=0` thì với cách dùng string 
```
xhr.open('GET', '/api/v2/pokemon?limit=1000$offset=0');
xhr.send();
```
Còn với cách dùng URL object:
```
let url = new URL('https://pokeapi.co/api/v2/pokemon');
url.searchParams.set('limit', 100);
url.searchParams.set('offset', 1);
xhr.open('GET', url);
xhr.send();
```
Các bạn lưu ý là nãy giờ chúng ta không có `https://pokeapi.co` vì mình đang ở ngay trong trang `https://pokeapi.co` và mình bật console trong inspect lên để viết code nên nó sẽ tự hiểu domain là `https://pokeapi.co`. Còn với URL thì mình phải set `https://pokeapi.co` vì nếu không set thì nó sẽ không valid và không dùng được URL. 

Thử gọi lại với kiểu JSON nhé, nhớ là phải config xhr vì bạn sẽ không set được response type khi trạng thái là LOADING hoặc DONE. Nhớ chỉnh lại onload event nhé
```
xhr.onload = function() {
    if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
        console.log(xhr.response);
    }
}

xhr.open('GET', url);
xhr.responseType = 'json';
xhr.send();
```
Chạy cái này thì các bạn để ý console của browser sẽ thấy log ra kết quả lấy được của pokemons :D.
# Chuyện bên lề
## Ready states
Nãy giờ nghe state LOADING, DONE đồ, nó là cái gì vậy, câu trả lời nó là state :D. Quay trở về thời xa xưa của thời xa xưa, lúc đó cũng có XMLHttpRequest rồi, mà chưa có event load, error và mấy cái event khác. Lúc bấy giờ, người ta dùng Ready states, chúng ta có những state như sau: 
- UNSENT = 0
- OPENED = 1
- HEADERS_RECEIVED = 2
- LOADING = 3
- DONE = 4 

Flow thường chạy như sau: 0->1->2->3, đến bước thì 3 thì vô điệp khúc tức là sẽ ở state 3 again again and again trong khoản thời gian nhận packet từ mạng cho đến khi nhận xong thì chuyển qua state 4. Để theo dõi những state này thì chúng ta có thể dùng sự kiện readystatechange:
```
xhr.onreadystatechange = function() {
  if (xhr.readyState == 0) {
    // unsent
  }
  if (xhr.readyState == 1) {
    // opened
  }
  if (xhr.readyState == 2) {
    // headers received
  }
  if (xhr.readyState == 3) {
    // loading
  }
  if (xhr.readyState == 4) {
    // request finished
  }
};
```
## Timeout
Ngoài ra mình có thể set timeout, timeout tức là trong khoảng thời gian đó, nếu request không thành công thì nghỉ phẻ và gọi event timeout ra. 
```
xhr.timeout = 1000; // timeout được tính bởi ms, 1000ms là 1s, ví dụ này sẽ timeout sau 1s
```
## Aborting request
Để hủy bỏ lời gọi đến phương xa, ví dụ trường hợp đang gọi đến server pokemon để lấy dữ liệu về thì mẹ gọi về kêu ăn cơm thì dùng 
```
xhr.abort()
```
Để hủy bỏ request. Với phương thức này sẽ gọi đến event tên abort và xhr.status lúc này sẽ là 0
## Synchronous requests
Để gọi request một cách đồng bộ thì thêm false vào ở tham số thứ ba khi dùng phương thức open. 
```
let xhr = new XMLHttpRequest();

xhr.open('GET', '/api/v2/pokemon?offset=101&limit=10', false);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { 
  alert("Request failed");
}
```
Mà cái này dùng khá ít vì nó có thể làm đứng browser khi chờ dữ liệu trả về với không dùng những tính năng nâng cao như timeout, request từ domain khác,...
## HTTP headers
Trong XMLHttpRequest, chúng ta có thể gửi custom headers cũng như là đọc headers từ dữ liệu trả về. 

Để set header chúng ta làm như sau:
```
xhr.setRequestHeader(name, value);
```
Ví dụ:
```
xhr.setRequestHeader('Content-Type', 'application/json');
```

Để lấy header trả về:
```
xhr.getRessponseHeader(name);
```
Ví dụ:
```
xhr.getResponseHeader('Content-Type');
```

Để lấy tất cả header trả về:
```
xhr.getAllResponseHeaders()
```
Kết quả trả về có thể như thế này: 
```
Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: application/json
Date: Sat, 30 Jul 2022 00:53:16 GMT
```
## Cross-origin requests 
```
let xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.open('POST', 'http://www.example.com/endpoint');
```
## Ứng dụng pokemon
Các bạn xem video để có thể tập luyện cách sử dụng XMLHttpRequest để gọi API, lấy dữ liệu từ pokemon api và render ra browser nhé.
# Kết luận
Mong là sau bài này, các bạn sẽ hiểu hơn cũng như là biết cách sử dụng XMLHttpRequest.