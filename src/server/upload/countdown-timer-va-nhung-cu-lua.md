Work from home nên mình chăm shopping online hơn hẳn. Hôm trước mình có canh flash sale trên một trang web nọ.
Đợi từng giây để vào mua, thế mà khi đồng hồ đếm ngược về đến 0s ấn vào nút mua ngay thì đã không còn cái nào rồi.
Xem lại thì hóa ra đồng hồ máy mình không hiểu sao chậm mấy phút, đồng hồ đếm ngược kia hóa ra chỉ là một cú lừa 😥.

Nghĩ lại thì hồi mới làm tính năng này lần đầu mình cũng từng phải giải quyết vấn đề này.
Tính năng countdown tưởng đơn giản nhưng lại không hề đơn giản. Mình đoán mọi người nếu mới implement lần đầu chắc cũng
gặp những vấn đề tương tự. Hãy cùng mình tìm hiểu những vấn đề tồn tại và cách giải quyết nhé 😉.

## Chuẩn bị

Trước khi bắt đầu thì mình viết 1 function để format thời gian hiển thị trên đồng hồ đã nhé.
Function `formatTimer` có 1 parameter `time` là số giây còn lại.
Thời gian sẽ được format kiểu *x day(s) HH:mm:ss*.

```js
function toUnit(time, a, b) {
    return String(Math.floor((time % a) / b)).padStart(2, '0');
}

function formatTimer(time) {
    if (Number.isNaN(parseInt(time, 10))) {
        return '';
    }

    const days = Math.floor(time / 86400);
    const hours = toUnit(time, 86400, 3600);
    const minutes = toUnit(time, 3600, 60);
    const seconds = toUnit(time, 60, 1);

    if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'} ${hours}:${minutes}:${seconds}`;
    }

    if (hours > 0) {
        return `${hours}:${minutes}:${seconds}`;
    }

    return `${minutes}:${seconds}`;
}
```

Thường thì với tính năng countdown, bạn sẽ đếm ngược đến một thời điểm định sẵn. Có thể là hardcode sẵn (dịp năm mới,
sinh nhật...) hoặc là được trả về từ server (flash sale, deadline...).

## Cách bình thường

Đầu tiên, cách đơn giản nhất mà mọi người đều có thể nghĩ đến là `setInterval` rồi mỗi giây đếm ngược thời gian còn lại.
Giả sử biến `deadline` là thời gian còn lại của event được trả về từ server. Code của mình sẽ trông như này.

```js
const deadline = new Date('2021/12/31 00:00:00');
let remainingTime = (deadline - new Date) / 1000;

setInterval(function () {
    remainingTime--;
    console.log(formatTimer(remainingTime));
}, 1000);
```

Đây là cách đơn giản nhất rồi. Tuy nhiên, vẫn cần lưu ý là chỗ tính `remainingTime` mình đang *-1* trong mỗi interval.
Logic thì đúng, nhưng mà browser không đảm bảo `setInterval` sẽ chạy đúng mỗi giây 1 lần. Có nhiều thứ có thể ảnh hưởng
đến nó, ví dụ như khi chuyển tab hoặc browser đang chạy gì đó nặng chẳng hạn. Vậy nên trong mỗi interval, hãy tính lại
`remainingTime` cho chắc ăn.

```js
const deadline = new Date('2021/12/31 00:00:00');

setInterval(function () {
    const remainingTime = (deadline - new Date()) / 1000;
    console.log(formatTimer(remainingTime));
}, 1000);
```

Như bạn thấy thì mình đang dùng `new Date` để tính `remainingTime`, nên độ chính xác của timer hoàn toàn phụ thuộc
vào đồng hồ trên máy bạn. Trong các dự án mình từng làm thì số lượng người dùng có đồng hồ lệch giờ cũng không hề nhỏ.
Hoặc hi hữu hơn là giờ trên server bị lệch 🙄. Vậy nên mình bỏ qua cách này nhé.

## Dùng remaining time

Dù thời gian trên máy bạn có lệch như thế nào thì 1 giây vẫn là 1 giây. Nghĩa là thời gian còn lại thực tế thì dù ở
server hay ở máy của người dùng cũng sẽ giống nhau. Vậy nên thay vì dựa vào thời điểm hết hạn để tính countdown thì
mình chỉ cần dựa vào thời gian còn lại thôi.

Thay vì trả về `deadline` thì bây giờ server sẽ trả về `remainingTime` luôn. Giả sử `remainingTime` là số giây còn lại,
code của mình sẽ như này.

```js
const deadline = new Date((new Date()).getTime() + remainingTime * 1000);

setInterval(function () {
    const timerRemainingTime = (deadline - new Date()) / 1000;
    console.log(formatTimer(remainingTime));
}, 1000);
```

Tất nhiên là mình vẫn phải tính `deadline` để tính thời gian còn lại của countdown cho chính xác để tránh `setInterval`
đếm sai như đã nói ở phần trên nhé.

Cách này ổn hơn rất nhiều rồi. Bạn không cần lo khác biệt thời gian giữa client và server nữa. Nhưng countdown bây giờ
lại phụ thuộc vào `remainingTime`, nên bạn phải sử dụng ngay sau khi nhận được từ server thì mới đảm bảo chính xác.
Thường thì countdown của bạn sẽ luôn chậm ít nhất một vài giây vì thời gian gửi request và nhận response từ server,
thời gian tải resource khác như JS, CSS... Hoặc đơn giản hơn là nếu bạn đang viết một static page không có server
thì lấy đâu ra kết quả từ server 😂.

## Đồng bộ thời gian với server

Nếu thời gian ở server là luôn đúng thì mình thử đồng bộ thời gian với server xem sao. Mình sẽ request thời gian từ
server xem nó chênh lệch bao nhiêu so với thời gian trên máy. Sau đó có thể điều chỉnh thời gian sử dụng cho timer
theo độ chênh lệch đó.

Ví dụ thời gian trên máy mình là *05:51:30*, thời gian mình request được từ server là *05:51:40* thì mình sẽ có thời
gian chênh lệch  là 10s.

Tất nhiên bạn vẫn sẽ gặp vấn đề như trên là thời gian bạn nhận được từ server không hẳn là thời gian chính xác, vì nó
sẽ có độ trễ từ thời gian gửi request, nhận response...
Mình sẽ dùng một thuật toán tương tự như SNTP (thuật toán mà máy tính của bạn dùng để đồng bộ thời gian với server) để
tính được thời gian gần chính xác từ server.

Nó cũng khá đơn giản như này thôi. Giả sử mình đang ở máy *C* và gửi request để lấy thời gian từ server *S*.
Thời điểm mình bắt đầu gửi request tới server là *T1*. Lúc server nhận được request, xử lý xong và gửi về cho mình sẽ
là *T2*, đây cũng là thời giam mà mình nhận được từ server. Cuối cùng thời điểm mà mình nhận được response từ server
là *T3*.

Toàn bộ thời gian từ lúc gửi request đến lúc nhận được response là *T3 - T1*. *T2* sẽ nằm đâu đó giữa chỗ này.
Giả sử thời gian gửi và nhận request là bằng nhau cho đơn giản, vậy thì *T2* sẽ nằm chính giữa.
Độ trễ từ lúc *T2* trên server tới lúc nhận được response sẽ là $\frac{(T3 - T1)}{2}$.

Cuối cùng mình sẽ tính được ra thời gian chênh lệch thực tế là

$$
T\scriptstyle diff = T2 + \frac{(T3 - T1)}{2} - T3
$$

Tất cả web server đều return *Date* header nên để request thời gian từ server mình chỉ cần đơn giản gửi một request `HEAD`
tới server bất kì là được. Ví dụ như google.com chẳng hạn. Đây là function lấy độ chênh lệch thời gian từ server theo
thuật toán như trên.

```js
function getDateDiff(serverURL) {
    return new Promise((resolve, reject) => {
        let requestTime;
        let responseTime;
        const req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState === XMLHttpRequest.HEADERS_RECEIVED && req.status === 200) {
                responseTime = Date.now();
            }
        };

        req.onload = () => {
            if (req.status === 200) {
                const serverDateStr = req.getResponseHeader('Date');
                const serverTime = new Date(serverDateStr).getTime();

                const networkLatency = (responseTime - requestTime) / 2;

                resolve(serverTime + networkLatency - responseTime);
            } else {
                reject(new Error({
                    status: req.status,
                    statusText: req.statusText,
                }));
            }
        };

        req.open('HEAD', serverURL);

        req.setRequestHeader('cache-control', 'no-cache');

        requestTime = Date.now();
        req.send();
    });
}
```

Cuối cùng code của mình sẽ như này.

```js
const deadline = new Date('2021/12/31 00:00:00');

getDateDiff('https://google.com').then((timeDiff) => {
    setInterval(function () {
        const now = (new Date()).getTime() + timeDiff * 1000;
        const remainingTime = deadline - now;
        console.log(formatTimer(remainingTime));
    }, 1000);
});
```

Tất nhiên, độ chính xác cũng chỉ là tương đối. Nhưng cách này giải quyết được hầu hết vấn đề mình gặp phải và có thể
sử dụng trong hầu hết trường hợp. Vậy nên đến giờ, đây vẫn là cách tốt nhất với đối với mình 😃.