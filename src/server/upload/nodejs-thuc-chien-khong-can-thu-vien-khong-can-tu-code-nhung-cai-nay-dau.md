Khi gặp một vấn đề, nhiều bạn thường tìm kiếm một thư viện giải quyết vấn đề đó hoặc tự phát triển. Dùng thư viện như con dao 2 lưỡi vậy. Nó giúp giải quyết nhanh vấn đề nhưng làm cho dự án nặng nề hơn. Còn tự phát triể lại tốn nhiều công sức. Trong blog nhỏ này mình liệt kê một số cases mà chúng ta không cần thư viện, không cần tự code vì nodejs đã hỗ trợ.

## 1. Gen UUID v4.

UUID - (universally unique identifier) được hiểu là một id nhận dạng duy nhất dài 128bit. UUID được sử dụng rất phổ biến khi bạn cần một id duy nhất cho hệ thống.
UUID v4 là kiểu uuid ngẫu nhiên, được sử dụng phổ biến nhất.
### 1.1 Một số thư viện hỗ trợ:

- [uuid](https://www.npmjs.com/package/uuid) : 
```javascript
const uuid = require('uuid');
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);
``` 

- [nano ID](https://www.npmjs.com/package/nanoid):
```javascript
const Nanoid = require('nanoid');
const NanoidAsync = require('nanoid/async');

console.log(`UUID with Nano ID sync: ${Nanoid.nanoid()}`);

(async function() {
  const nanoId = await NanoidAsync.nanoid();
  console.log(`UUID with Nano ID async: ${nanoId}`);
})();
```

### 1.2 Không dùng thư viện:
Module `cryto` được thêm vào nodejs v14.17.0. Nó đã cung cấp nhiều methods hỗ trợ mã hóa: HMAC, cypher, OpenSSL và cả `randomUUID` để gen UUID.

```javascript
const crypto = require('crypto');
console.log(crypto.randomUUID());
```


## 2. Objects deep comparison

Objects deep comparison là kiểu so sánh `sâu` hai object. So sánh hai object có giá trị giống nhau 100%, bao gồm các các nested objects. Cần phần biệt với kiểu:
- Shadow comparison: So sánh nông: So sáng danh sách properties `Object.keys` và so sánh các giá trị của các properties.
- Referential comprison: So sánh đến tham chiếu của các biến. Vì object là các biến kiểu tham chiếu.

### 2.1 Sử dụng thư vện:

- [lodash _isEqual](https://lodash.com/docs/4.17.15#isEqual)

```javascrit
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.isEqual(object, other);
// => true
 
object === other;
// => false
```

### 2.2 Sử dụng JSON.stringify:

- Chuyển object thành json rồi so sánh như so sánh 2 string.

```javascript
JSON.stringify(object1) === JSON.stringify(object2)
```
- Isues: Là sẽ bị fail khi so sánh các objects giống nhau như các keys không đúng thứ tự:

```javascript
obj1 = {a:2, b:4};
obj2 = {b:4, a:2};
JSON.stringify(obj1); // "{"a":2,"b":4}"
JSON.stringify(obj2); // "{"b":4,"a":2}"
```

### 2.3 Không dùng thư viện, sử dụng [util.isDeepStrictEqual](https://nodejs.org/api/util.html#util_util_isdeepstrictequal_val1_val2)

Util modules là một thư viên nodejs cung cấoc cho developer nhiều method hay sử dụng. `isDeepStrictEqual` là một method để só sánh 2 objects:

```javascript
util.isDeepStrictEqual(val1, val2)
```

## 3. Extract domain name from URL

Extract domain là việc mình cần lấy các thông tin của 1 domain như, subdomain, domain, port.

### 3.1 sử dụng thư viện [extract-domain](https://www.npmjs.com/package/extract-domain)

```javascript
import extractDomain from "extract-domain";
const url = "https://www.npmjs.com/package/extract-domain";
extractDomain(url); // npmjs.com

```

### 3.2 Sử dụng modules [URL](https://nodejs.org/api/url.html)

```javascript
var url = new URL(urlString);
console.log(url.hostname);
```

## 4. API check heath.
Trong hệ thống microservice, đôi khi các service cần MỘT api để hệ thống gọi đến kiểm tra một service còn sống không(Để có thể restart lại ).

### 4.1 Sử dụng [express](https://www.npmjs.com/package/express)

```javascript
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Server is up!')
})

app.listen(3000)

```

- Nhiêu thư viện framwork khác.

### 4.2 Không dùng thực viên, sử dụng [http module](https://nodejs.org/api/http.html)

```javascript
const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(201);
  res.end('Server is up!');
}

const server = http.createServer(requestListener);
server.listen(8080);
```

## 5. Kết luận:
- Đôi khi chú ý reseach một tý giúp hệ thống của chúng ta trở nên nhẹ nhàn hơn.
- Cảm ơn mọi người đã đọc
- Nhiều anh em gặp trường hợp nào tương tự comment để mọi người cùng biết. Happy sharing!!