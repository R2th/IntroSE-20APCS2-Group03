Nhân câu chuyện vừa rồi dự án mình có phát triển chức năng login hệ thống thông qua LINE, và phát sinh bug liên quan đến việc trên thiết bị Android không hiển thị popup xác thực, mình xin chia sẻ cùng các bạn cách khắc phục lỗi này nhé.

*Bài viết gốc: [LambdaにBasic認証を追加する方法とLINEからAndroidで開けない問題の対応方法](https://qiita.com/kazuooooo/items/e582b932c29cbd1f7f6f)*

Trước hết, chúng ta cùng tìm hiểu về cách thêm Basic Authentication cho Lambda.

## Cách thêm Basic Authentication cho Lambda

Rất đơn giản, các bạn chỉ cần refer code dưới này là đã có thể thêm Basic Authentication.

```basic_auth.js
'use strict';

exports.handler = (event, context, callback) => {
    // Get request header
    const request = event.Records[0].cf.request;
    const headers = request.headers;

    // ID and password
    const basicAuthId = 'id' // ID
    const basicAuthPath = 'password' // password
    // Construct the Basic Auth string
    const authString = 'Basic ' + new Buffer(basicAuthId + ':' + basicAuthPath).toString('base64');

    // basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
            const body = 'Unauthorized';
            const response = {
                status: '401',
                statusDescription: 'Unauthorized',
                body: body,
                headers: {
                    'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
                },
            };
            callback(null, response);
    }
    // Continue processing
    callback(null, request);
};
```
## Vấn đề không hiển thị popup xác thực trên Android khi đăng nhập bằng LINE

Thoạt nhìn thì đoạn code trên này không vấn đề gì đúng không các bạn?! 

Tuy nhiên, thực tế khi làm như vậy, nếu mở bằng LINE trên Android sẽ kết thúc bằng "Unauthorized" và không hiển thị bất cứ màn hình basic authentication nào.

Rõ ràng điều này là do trình duyệt trong ứng dụng của LINE đã chặn cửa sổ bật lên, trong khi trên iOS không hề xảy ra hiện tượng đó.

Vậy đâu sẽ là cách để xử lý được vấn đề này? Mình cùng đi tiếp nhé.

## Cách khắc phục lỗi không hiển thị Authentication popup trên thiết bị Android khi đăng nhập bằng LINE

Câu trả lời là với Lambda trên Android, hãy implement để cho phép thiết bị mở trên Chrome.
```
exports.handler = (event, context, callback) => {
    // Get request header
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const userAgent = headers['user-agent'][0].value

    if(userAgent.match("Android") && userAgent.match('LINE')) { // userAgent check
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: 'googlechrome://navigate?url=https://' + request.uri, // open in googlechrome
                }],
            },
        };
        callback(null, response);
    }
    ...
}
```
Ở đây có 2 điểm:

・Trước hết, cần check xem Browser có phải là Android không và có đang được mở bằng LINE hay không.

Lý do là bởi vì sau đó sẽ mở trên Chrome nên nếu không check có đang mở bằng LINE hay không sẽ thành vòng lặp vô hạn.

```
if(userAgent.match("Android") && userAgent.match('Line')) { ... }
```

・Thứ hai, sẽ viết như sau ở chỗ cho mở bằng Chrome, mục đích để có thể mở được thiết bị trên Chrome bằng urlscheme.
```
googlechrome://navigate?url=https://google.co.jp // Open https://google.co.jp in chrome
```
Chỉ bằng thao tác đơn giản này, chúng ta có thể cho phép thiết bị Android có thể mở trên chrome rồi.

Ngược lại, nếu không có Chrome thì từ đây sẽ chuyển đến trang download Chrome.


Nhân tiện thì, với iOS sẽ là như thế này nhé.
```
googlechromes://apple.co.jp
```

## Lời kết

Vậy là chúng ta đã hoàn thiện Basic Authentication đối ứng cho cả browser của LINE.

Và, code sau cùng sẽ thành như thế này.

```
'use strict';

exports.handler = (event, context, callback) => {
    // Get request header
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    const userAgent = headers['user-agent'][0].value
    const domain = 'awsome.app'
    if(userAgent.match("Android") && userAgent.match('Line')) {
        const response = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: `googlechrome://navigate?url=https:${domain}//refe.love${request.uri}`, // googlechromeで開く
                }],
            },
        };
        callback(null, response);
    }

    // ID and password
    const basicAuthId = 'id' // ID
    const basicAuthPath = 'password' // password
    // Construct the Basic Auth string
    const authString = 'Basic ' + new Buffer(basicAuthId + ':' + basicAuthPath).toString('base64');


    // basic authentication
    if (typeof headers.authorization == 'undefined' || headers.authorization[0].value != authString) {
            const body = 'Unauthorized';
            const response = {
                status: '401',
                statusDescription: 'Unauthorized',
                body: body,
                headers: {
                    'www-authenticate': [{key: 'WWW-Authenticate', value:'Basic'}]
                },
            };
            callback(null, response);
    }
    // Continue processing
    callback(null, request);
};
```
P/S: Nếu gửi Header tương tự đến các trình duyệt khác ngoài LINE, chúng ta có thể đối ứng bằng cách viết lại logic của userAgent.