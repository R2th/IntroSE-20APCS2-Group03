Tiếp tục series về bất đồng bộ trong Javascript, ở phần trước, mình có giới thiệu về Callbacks, Listeners cũng như cách sử dụng, ưu, nhược điểm của từng phương pháp đó. Các bạn có thể ngó qua tại [đây](https://viblo.asia/p/javascript-bat-dong-bo-callbacks-listeners-control-flow-libs-and-promises-phan-1-gDVK28PnlLj) Ở phần này, mình sẽ giới thiệu thêm về hai phương pháp chúng ta có thể sử dụng trong khi làm việc với Javascript bất đồng bộ: Control Flow Libs và Promises.

![](https://images.viblo.asia/8404648a-dc12-4e04-a33e-2b96f3e0aad9.jpg)

# Control Flow Libs
Thư viện điều khiển luồng chạy (Control Flow Libs) cũng là một cách rất hay để xử lý những dòng code không đồng bộ. Một trong những điều đặc biệt là [Async.js](https://github.com/caolan/async).
Code sử dụng Async.js sẽ trông sẽ như thế này:
```
async.series([
    function(){ ... },
    function(){ ... }
]);
```

## Setup
Chúng ta sẽ cần một vài hàm sẽ thực hiện công việc, như trong các ví dụ khác, các hàm này có thể sẽ tạo ra một AjAX request và trả về kết quả. Bây giờ, chúng ta hãy sử dụng *timeout*.
```
function finder(records, cb) {
    setTimeout(function () {
        records.push(3, 4);
        cb(null, records);
    }, 1000);
}
function processor(records, cb) {
    setTimeout(function () {
        records.push(5, 6);
        cb(null, records);
    }, 1000);
}
```

## Sử dụng Async
Chúng ta sẽ sử dụng các hàm giống như sau:
```
async.waterfall([
    function(cb){
        finder([1, 2], cb);
    },
    processor,
    function(records, cb) {
        alert(records);
    }
]);
```

Async.js sẽ chú ý đến việc gọi từng chức năng theo thứ tự sau khi chức năng trước đó kết thúc. Lưu ý cách chúng ta có thể chuyển hàm *processor*,  điều này là do chúng ta đang sử dụng [kiểu Node continuation](https://www.quora.com/What-is-continuation-passing-style-in-functional-programming). Như bạn có thể thấy code này là khá tối thiểu và dễ hiểu.

Một ví dụ đầy đủ như sau:
```
// setup
function finder(records, cb) {
    setTimeout(function () {
        records.push(3, 4);
        cb(null, records);
    }, 500);
}
function processor(records, cb) {
    setTimeout(function () {
        records.push(5, 6);
        cb(null, records);
    }, 500);
}

async.waterfall([
    function(cb){
        finder([1, 2], cb);
    },
    processor
    ,
    function(records, cb) {
        alert(records);
    }
]);
```

## Ưu điểm:
Thông thường, code sử dụng thư viện điều khiển luồng dễ hiểu hơn vì nó tuân theo thứ tự tự nhiên (từ trên xuống dưới). Điều này không đúng với [Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) và [Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventListener).
## Nhược điểm:
Nếu chữ ký của các hàm không khớp thì bạn có thể cho rằng thư viện điều khiển luồng cung cấp ít khả năng đọc.

# Promises
Mình xin giới thiệu phương pháp cuối cùng mà chúng ta thường sử dụng khi làm việc với Javascript bất đồng bộ. [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) là một công cụ rất mạnh mẽ, nhưng chúng ít được hiểu nhất.

Codesử dụng *Promises* có thể trông như thế này:

```
finder([1,2])
    .then(function(records) {
      .. do something
    });
```

Điều này sẽ khác nhau tùy thuộc vào thư viện promises bạn sử dụng, trong trường hợp này mình đang sử dụng [when.js](https://github.com/cujojs/when).
## Setup

Các hàm tìm kiếm và xử lý sẽ được sử dụng như sau:

```
function finder(records){
    var deferred = when.defer();
    setTimeout(function () {
        records.push(3, 4);
        deferred.resolve(records);
    }, 500);
    return deferred.promise;
}
function processor(records) {
     var deferred = when.defer();
    setTimeout(function () {
        records.push(5, 6);
        deferred.resolve(records);
    }, 500);
    return deferred.promise;
}
```

Mỗi hàm tạo một đối tượng trì hoãn (deferred object) và trả về một *promise*. Sau đó, nó sẽ xử lý các *deferred object* khi kết quả được trả về.


## Sử dụng

Chúng ta sẽ sử dụng các hàm giống như sau:
```
finder([1,2])
    .then(processor)
    .then(function(records) {
            alert(records);
    });
```

Như bạn thấy, nó là khá tối thiểu và dễ hiểu. Khi được sử dụng như thế này, *promises* mang lại rất nhiều sự rõ ràng cho code của bạn khi chúng tuân theo một luồng tự nhiên. Lưu ý callback đầu tiên, chúng ta chỉ cần truyền hàm *processor*. Điều này là bởi vì function này tự trả về promises, vì vậy mọi thứ sẽ chạy một cách tuyệt vời, mượt mà.

Một ví dụ đầy đủ như sau:
```
// using promises
function finder(records){
    var deferred = when.defer();
    setTimeout(function () {
        records.push(3, 4);
        deferred.resolve(records);
    }, 500);
    return deferred.promise;
}
function processor(records) {
     var deferred = when.defer();
    setTimeout(function () {
        records.push(5, 6);
        deferred.resolve(records);
    }, 500);
    return deferred.promise;
}

finder([1,2])
    .then(processor)
    .then(function(records) {
            alert(records);
    });
```

Có rất nhiều *promises* ở đây:

- chúng có thể được truyền đi xung quanh như các đối tượng thông thường
- tổng hợp thành những promises lớn hơn
- bạn có thể thêm trình xử lý cho các promises không thành công

## Ưu điểm
Công cụ rất mạnh, bạn có thể tổng hợp các promises, chuyển chúng xung quanh hoặc thêm *listeners* khi đã được giải quyết.
## Nhược điểm
- Hơi khó hiểu hơn những công cụ khác
- Chúng có thể gặp khó khăn khi theo dõi khi bạn có nhiều *promises* tổng hợp với những *listeners*  được thêm trên đường đi.
# Conclusion:
Trên đây là 2 công cụ còn lại mà chúng ta sẽ thường xuyên sử dụng khi làm việc với Javascipt bất đồng bộ. Mỗi công cụ có những ưu nhược điểm khác nhau, đồng thời chúng cũng sẽ thích hợp với những hoàn cảnh khác nhau. Điều chúng ta cần làm là tìm hiểu rõ chúng để chọn ra giải pháp tối ưu nhất cho những đoạn code của mình. Chúc các bạn có những dòng code tối ưu và hiệu quả nhất.

# References:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function 
http://sporto.github.io/blog/2012/12/09/callbacks-listeners-promises/