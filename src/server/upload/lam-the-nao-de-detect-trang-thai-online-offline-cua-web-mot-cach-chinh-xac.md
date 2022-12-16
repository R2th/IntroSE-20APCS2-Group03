Xin chào các bạn, trước đây, mình có viết một vài bài về service worker để web có thể chạy được dù khi không có mạng. Mình cũng đã có một vài bài viết về vấn đề này, các bạn có thể tìm đọc lại nếu quan tâm nha :D

[Cách giúp cho người dùng truy cập website ngay cả khi không có mạng](https://viblo.asia/p/service-worker-va-cach-giup-cho-nguoi-dung-truy-cap-website-ngay-ca-khi-khong-co-mang-1Je5EDMylnL)

[Chạy offline website với workbox](https://viblo.asia/p/chay-offline-website-voi-workbox-maGK7bLe5j2)

[Lưu dữ liệu khi offline với IndexDB](https://viblo.asia/p/luu-du-lieu-khi-offline-voi-indexdb-1VgZvP975Aw)

Ở trên là những kiến thức cơ bản để website của bạn có thể hoạt động được khi offline. Nhưng để chạy được một cách hoàn thiện thì chắc chắn là chưa rồi. Giờ mình sẽ lấy ví dụ của chính dự án mình đang làm. Ngoài yêu cầu hiển thị được offline thì dự án của mình còn yêu cầu khả năng update dữ liệu lúc offline, nghĩa là khi người dùng đang ở trạng thái offline thì sẽ submit dữ liệu vào cache và dữ liệu hiển thị bên phía người dùng. Sau khi người dùng có lại kết nối mạng thì dữ liệu sẽ tự động submit vào database mà không cần refresh (dự án mình dùng reactjs). Với yêu cầu này thì với kiến thức trên kia sẽ có khá nhiều điểm khác biệt. Đầu tiên là vấn đề ở việc dữ liệu thay đổi lúc offline. Vì hình thức mình đang sử dụng là cache lại những api data nên việc submit dữ liệu vào indexDB sẽ không làm thay đổi api trong cache. Do đó mình sẽ phải ghi đè lại các api được cache bằng workbox. Và mình sẽ lấy được data user submit bên trong request và tạo ra một request mới rồi cache lại chính request đó vào api được cache cũ. Cái này nghe thì đơn giản nhưng mình cũng mất mấy ngày để nghiên cứu và hỏi han khắp nơi để có thể hoàn thiện được :( Và đây là code đoạn đó

```javascript
function reWriteCache(response, checkIsUpdateGpaApi, urlApi, data, client) {
    const reader = new FileReader();
    response.blob().then((res) => {
        reader.readAsText(res);
        const editResponse = (e) => {
            const text = e.srcElement.result;
            let dataReCache = [];
            const dataStudents = JSON.parse(text);

            const dataUpload = data.upload;
            dataReCache = getDataStudentsOfflineAttendance(dataUpload, dataStudents); //Cái này các bạn sẽ phải tự viết 1 hàm để lấy được data cache lại

            const myBlob = new Blob([JSON.stringify(dataReCache, null, 2)], {type: 'application/json'});
            const init = {status: 200, statusText: 'OK'};
            const myResponse = new Response(myBlob, init);
            caches.open('view-caches').then(cache => cache.delete(`/api/${urlApi}/${data.Id}`));
            caches.open('view-caches').then(cache => cache.put(`/api/${urlApi}/${data.Id}`, myResponse))
        }
        reader.addEventListener('loadend', editResponse);
    });
}
```
Vì một vài lí do, đây sẽ chỉ là đoạn code tham khảo để các bạn sẽ có 1 phương hướng nào đó chứ không hoàn toàn là code mình sử dụng 

Sau khi qua ải này mình cứ ngỡ là mọi thứ ổn rồi, nhưng cuộc đời bảo không. Thứ làm mình thật sự mất thời gian lại chính là việc detect trạng thái online offline của ngườ dùng.

## Vấn đề gặp phải
Như mình nói ở trên, yêu cầu của dự án sẽ là web có thể tự động submit dữ liệu khi có mạng trở lại mà không cần refresh lại. Vậy là lúc đó ở trong function upload data của mình sẽ phải detect khi nào web quay trở lại online để submit dữ liệu. Mình đã sử dụng `navigator.onLine` để check. Nhưng lại gặp trường hợp với trình duyệt chrome: có những máy sẽ không nhận biết được sự thay đổi khi online. Và sau một thời gian điều tra thì mình đã quyết định không sử dụng `navigator.onLine` nữa

## Hướng giải quyết
Vậy thì cách làm sẽ là như thế nào. Từ việc tham khảo nhiều ý kiến, mình đã quyết định sử dụng socketio để check việc này. Tại sao ư? Như các bạn đã biết, socketio là một công cụ giúp xử lý realtime. Ý tưởng ở đây là chúng ta sẽ mở một kết nối và kiểm tra xem kết nối đó có đang hoạt động hay không. Nếu có thì nghĩa là người dùng đang có kết nối tới server của chúng ta

## Cài đặt
Vì project của mình sử dựng laravel và reacjts nên mình sẽ sử dụng laravel echo nha. Trước tiên là sẽ cài đặt một số packet cần thiết
```
yarn add dotenv
yarn add laravel-echo
yarn add laravel-echo-server
yarn add socket.io-client
```

Ở trong file `channels.php` chúng ta sẽ tạo ra một channel tên là `check-internet-connection`
```php
Broadcast::channel('check-internet-connection', function () {
    return true;
});
```

config `.env`
```
ECHO_HOST=
ECHO_URL=http://localhost:6001
ECHO_AUTH_HOST=http://localhost
ECHO_AUTH_ENDPOINT="/broadcasting/auth"
ECHO_DATABASE=redis
ECHO_SQLITE_PATH="/database/laravel-echo-server.sqlite"
ECHO_DEV_MODE=true
ECHO_PROTOCOL=http
ECHO_PORT="6001"
ECHO_SSL_CERT_PATH=
ECHO_SSL_KEY_PATH=
ECHO_SSL_CERT_CHAIN_PATH=
ECHO_SSL_PASS_PHRASE=
```

Giờ chúng ta sẽ phải config cho cho file run echo server `server\admin.js`
```javascript
const dotenv = require('dotenv');
const path = require('path');
const EchoServer = require('laravel-echo-server');

dotenv.config({path: path.resolve(__dirname, '../.env')});
/**
 * The Laravel Echo Server options.
 */
let options = {
    authHost: process.env.ECHO_AUTH_HOST,
    authEndpoint: process.env.ECHO_AUTH_ENDPOINT,
    database: process.env.ECHO_DATABASE,
    databaseConfig: {
        redis: {
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST
        },
        sqlite: {}
    },
    devMode: process.env.ECHO_DEV_MODE,
    host: process.env.ECHO_HOST,
    port: process.env.ECHO_PORT,
    protocol: process.env.ECHO_PROTOCOL,
    sslCertPath: process.env.ECHO_SSL_CERT_PATH,
    sslKeyPath: process.env.ECHO_SSL_KEY_PATH,
    sslCertChainPath: process.env.ECHO_SSL_CERT_CHAIN_PATH,
    sslPassphrase: process.env.ECHO_SSL_PASS_PHRASE
};

/**
 * Run the Laravel Echo Server.
 */
EchoServer.run(options);
```

Giờ tới việc xử lý upload khi có mạng

```javaScript
import Echo from 'laravel-echo';

window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: process.env.ECHO_URL
});

window.Echo.channel('check-internet-connection');

function uploadDataWhenOnline() {
      // Đoạn này sẽ để xử lý dữ liệu
}

window.Echo.connector.socket.on('connect', () => {
    uploadDataWhenOnline();
    console.log('co mang');
});

window.Echo.connector.socket.on('disconnect', () => {
    console.log('mat mang');
});
```

giờ hãy cài thêm packet `pm2` để run echo server
```
yarn global add pm2
```

Sau khi cài đặt xong, các bạn hãy chạy câu lệnh
```
pm2 start server/admin.js
```

Giờ thì mỗi khi online thì dữ liệu của người dùng sẽ được submit.

Cảm ơn các bạn đã đọc. Đây chỉ là một cách mà mình nghĩ là hiệu quả. Nếu các bạn có cách nào hay hơn thì hãy chia sẻ nhé :D