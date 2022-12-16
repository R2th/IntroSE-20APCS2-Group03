**Bài mình viết tham khảo trên trang** : http://www.mbtest.org/ 
-  Trong quá trình kiểm thử nói chung thì cần phải tích hợp hệ thống với bên thứ 3, bên thứ 3 thường nhiều môi trường khác nhau và cấu trúc khác nhau, 
-  Để giải quyết vấn đề này cần tạo service mock, service mock là giả lập các service hoặc bên hệ thống thứ 3, bạn cần tạo ra service trả về các data cụ thể. 
-  Ứng dụng sẽ gọi tới services ảo, services ảo  thường là tool mã nguồn mở. 
-  Mình xin giới thiệu các bạn tới tool => Mountebank  cho phép giải quyết vấn đề trên, nó hỗ trợ  nhiều giao thức khác nhau:
    + http, https, tcp (text and binary), smtp, ldap, grpc ,websockets, graphql, soap
    
* **Cài đặt môi trường**
- Install: npm install -g mountebank
- ngoài ra có thể download file cài về cài trên trang : http://www.mbtest.org/releases/v2.2.1
- Note: Ngoài ra có thể thực hiện bằng docker
       + download mountebank : docker pull bbyars/mountebank:2.6.0
        + thực hiện bật mb bằng docker:
             docker run --rm -p 2525:2525 -p 8080:8080 bbyars/mountebank:2.6.0 mb start --configfile imposters.ejs
             
**Cấu tạo của MounteBank**
![](https://images.viblo.asia/c856dfdf-326b-4d2a-8413-f8e2183f68c6.png)
- Test (automated or manual ) : hệ thống được sử dụng giả lập test ( ví dụ: bạn có thể giả lập script test bằng robot framework, postman, hoặc thao tác bằng tay )
- System under test: thuộc mountebank cần thiết để cấu hình các URL hoặc các file importer ( cái này thì bạn ko cần để tâm với nhé, vì khi làm việc bạn sẽ ko phải động tới system under test)
- importer: là 1 importer network server: sử dụng matching request trả về response, nó sẽ phân tách các thành phần protocol của request gửi đến, importer sẽ ràng buộc tới 1 port cụ thể ( trong mountebank có thể định nghĩa ra các file importer này )
- Mountebank: thành phần cho phép các truy cập, nó phối hợp với các port và protocol được định nghĩa trong các file importer, nó sẽ gọi vào config để trả về response request, mountebank hỗ trợ các giao thức HTTP/S, TCP, và SMTP

**importer**: sử dụng để matching request để trả về response
thành phần của importer:

![](https://images.viblo.asia/7a9a90d7-50a8-467e-bafc-42fa2e425893.png)
- 1 stub gồm 2 thành phần : predicate và response
- predicate là các dự đoán  tương ứng với predicate sẽ có response tương ứng
ví dụ :
```js
{   "responses": [{
        "inject": "<%- stringify(filename, 'irs/transaction.js') %>"
    }],
    "predicates": [{
        "equals": {
            "method": "GET"
        }
    }
    ]
}
```

- request thỏa mãn điều kiện ở predicate sẽ response tương ứng  response
- ở ví dụ Mountebank nhận request phương thức Get thì inject tới file irs/transaction.js
- 
**Run và sử dụng MounteBank**
- Để chạy MB cd vào folder chứa mb gõ : mb
- mặc định mb sẽ run trên port 2525 
===> Mình chạy trên Mac sẽ ra như ở dưới nhé: 
![](https://images.viblo.asia/61123c05-0399-467d-9162-3b98cb4bd59d.png)

**Giờ chúng ta sẽ đi đến cách sử dụng mountebank nhé:**
- Để sử dụng được mountebank thì bạn phải define ra importers
- Tạo importers thì có 2 cách: 
    + 1 là call API vào mountebank để tạo importers
    + 2 là bạn define 1 file tĩnh importer trong mountebank
    
****   Dùng API để tạo imposters:****
- Bạn có thể gọi API của Mountebank để tạo 
- Giả sử mình cần giả lập service trả về response trên port 4545, sử dụng giao thức http 
- Request gửi tới MB sử dụng http, phương thức post, content-type là "Content-Type": "application/json"
- nếu body gửi lên chứa trường requiredField thì sẽ trả về 200 còn ko chứa trường requiredField sẽ trả về 400
với bài toán này bạn có thể tạo API gọi tới MB qua cổng 2525/imposters như sau nhé
```
curl --location --request POST 'http://localhost:2525/imposters' \
--header 'authorization: 328mM0Xtda7u3XetNsi8qZxlBTQ=' \
--header 'Content-Type: application/json' \
--data-raw '{
   "port": 4545,
   "protocol": "http",
   "stubs": [
       {
           "responses": [
               {
                   "is": {
                       "statusCode": 400
                   }
               }
           ],
"predicates": [
               {
                   "and": [
                       {
                           "equals": {
                               "path": "/test",
                               "method": "POST",
                               "headers": {
                                   "Content-Type": "application/json"
                               }
                           }
                       },
                       {
                           "not": {
                               "contains": {
                                   "body": "requiredField"
                               },
                               "caseSensitive": true
                           }
                       }
                   ]
               }
           ]
       }
   ]
}'
```
**Mình giải thích các tham số cho ví dụ ở trên nhé:**

"port": 4545 ===> MB sẽ tạo port 4545 để lắng nghe request giả lập của bạn

 "protocol": "http" ===> Giao thức sử dụng là dạng http
 
"stubs": Cho phép các bạn định nghĩa predicate và response tương ứng với nhau

**predicate: **

điều kiện thứ nhất: 
```js
        {
          "equals": {
            "path": "/test",
            "method": "POST",
            "headers": { "Content-Type": "application/json" }
          }
        }
```
request có path bằng /test, method gửi lên Post, header phải có chứa tham số Content-Type=> Application/json

điều kiện thứ 2:
```js
{
          "not": {
            "contains": { "body": "requiredField" },
            "caseSensitive": true
          }
```
Request ko có body chứa requiredField và caseSensitive = true là phân biệt chữ hoa chữ thường.

- And nếu thỏa mãn điều kiện thứ nhất và điều kiện thứ 2 thì sẽ trả về respon được định nghĩa phần response
Respone được define đơn giản
```js
responses": [
      { "is": { "statusCode": 400 }}
    ],
```
⇒ đơn giản trả về respone có http status là 400 

===> như vậy là bạn đã define xong imposter sử dụng để nhận request và trả về response trên MB rồi đó

sau khi gọi API tạo imposter xong bạn có thể kiểm tra bằng cách gọi postman tới http://localhost:4545/test sẽ có được kết quả như ở dưới nhé:

![](https://images.viblo.asia/3dd9548b-57d8-4463-b7b5-a6e2520e7fa8.png)
nếu request gửi lên ko thảo mãn thì MB mặc định sẽ trả về 200 như ở dưới

![](https://images.viblo.asia/3fbef48c-d478-42de-b173-0b4cd9cd6ee4.png)

**Cách 2 định nghĩa file importers tĩnh**

bạn download thư mục source code của MounteBank trên github bằng link sau
https://github.com/bbyars/mountebank.git

- Sau khi download và giải nén bạn sẽ thấy khá nhiều thư mục có sẵn ⇒ các thư mục này bạn cứ kệ thôi

- Tạo 1 folder Response => mục đích để define ra response cần trả về ( các bạn có thể trả về luôn trên file imposters.ejs cũng được, nhưng mình khuyên là cho ra file để control được tốt hơn, và bạn có thể define ra được nhiều trường hợp trả về nữa )
- Tạo file response1.js trong folder Response:  trong file response1.js mình code như sau nhé
```js:response1.js
function (request, state, logger) {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "Message": "Call API Success"
        })
    }
}
```
- Tạo file  imposters.ejs ( bạn có thể đặt tên khác cũng được nhưng đuôi là .ejs)
```js:imposters.ejs
{
   "port": 9906,
   "protocol": "http",
   "recordRequests": true,
   "stubs": [
       {
           "responses": [
               {
                   "inject": "<%- stringify(filename, 'response/response1.js') %>"
               }
           ],
           "predicates": [
               {
                   "equals": {
                       "method": "POST"
                   }
               },
               {
                   "matches": {
                       "path": "/test"
                   }
               }
           ]
       }
   ]
}
```
- sau đó run lại Mb bằng file ejs  với command sau:  mb --configfile imposters.ejs --allowInjection

kết quả khi mình gọi postman nhé

![](https://images.viblo.asia/abe12c06-e32f-4ae0-a511-7f015a1567fd.png)

Chúc Mọi người thành công