> Bài viết gốc: https://manhhomienbienthuy.github.io/2018/06/20/javascript-promise.html (đã xin phép tác giả :D)

JavaScript là một ngôn ngữ lập trình phía client, giúp chúng ta có những ứng dụng web đẹp hơn, thao tác dễ hơn, hiệu ứng cool hơn.  Tuy nhiên, cách thức hoạt động của JavaScript hơi đặc thù một chút.  Rất nhiều hoạt động của nó đều ở dạng bất đồng bộ (asynchronous).

Vì vậy, việc kiểm soát code để nó có thể hoạt động trơn tru cũng không phải là việc đơn giản.  Trong bài viết này, chúng ta sẽ tìm hiểu những phương thức mới được giới thiệu từ ECMAScript 2015 trở đi, giúp chúng ta code JavaScript bất đồng bộ được dễ dàng hơn.

# Cách truyền thống: dùng callback

Callback là tên mà chúng ta dùng để gọi các hàm JavaScript trong một trường hợp đặc biệt.  Rất khó để định nghĩa chúng nhưng có thể rất dễ hiểu thông qua ví dụ dưới đây.  Callback chỉ là tên được cộng động dùng, nó không có gì đặc biệt trong ngôn ngữ này cả.

Thuật ngữ bất đồng bộ (asynchronous, hoặc gọi ngắn là async) có thể hiểu rằng "sẽ mất một chút thời gian", "sẽ hoàn thành trong tương lai, không phải bây giờ".  Callback là phương án được sử dụng phổ biến trong những hoạt động bất đồng bộ này.

Hoạt động bất đồng bộ của JavaScript diễn ra rất thường xuyên.  Là một lập trình viên web, chắc hẳn bạn đã rất quen thuộc với những truy vấn kiểu ajax.  Chúng ta có thể xem xét một ví dụ thực tế như sau:

```javascript
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}
```

Mục đích của hàm trên là để load một file JavaScript bằng JavaScript. Sau khi chạy hàm này, nó sẽ chèn thêm một thẻ `<script src="${src}"></script>` vào trong `head`, sau đó trình duyệt sẽ tải file này về và thực thi.

Cách sử dụng nó rất đơn giản:

```javascript
// loads and executes the script
loadScript('/my_script.js');
```

Hàm này hoạt động một cách bất đồng bộ, bởi vì việc tải file script sẽ mất một chút thời gian.  Việc gọi hàm sẽ bất đầu việc load script, việc load này sẽ được trình duyệt thực hiện "ngầm" bởi một tiến trình khác.  Những code phía dưới hàm này sẽ tiếp tục được thực thi mà không cần đợi script được load.  Thâm chí, nó có thể kết thúc trước cả việc script được load xong.

```javascript
loadScript('/my_script.js');
// Code dưới này sẽ được thực thi ngay là không chờ script load xong
```

Việc hoạt động bất đồng bộ này không phải là vấn đề, chúng ta hoàn toàn không cần quan tâm.  Tuy nhiên, có một vài trường hợp, khi load script mới, nó định nghĩa một số hàm và biến, và chúng ta cần sử dụng lại những thứ này.  Điều này thường gặp khi chúng ta sử dụng các thư viện, như jQuery chẳng hạn:

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js');
$("#test").hide();
```

Rất tự nhiên, trình duyệt sẽ cần thời gian để tải thư viện jQuery về. Tuy nhiên, nó lại không chờ cho script được tải về mà sẽ ngay lập tức thực hiện lệnh tiếp theo.

Vì vậy, những code tiếp theo sẽ không thực thi được mà chúng ta sẽ gặp lỗi:

```javascript
Uncaught ReferenceError: $ is not defined
```

Với cách làm như trên, chúng ta chưa có cách nào theo dõi trạng thái của việc load script.  Nhưng nếu chúng ta muốn sử dụng những hàm và biến được định nghĩa trong script, chúng ta cần sử dụng một phương thức khác.  Truyền callback là một cách phổ thông nhất.

```javascript
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.append(script);
}
```

Bây giờ, muốn sử dụng những gì được định nghĩa trong script, chúng ta có thể cho vào callback:

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js', () => {
  // callback được gọi sau khi script load xong
  $("#test").hide();
  ...
});
```

Ý tưởng của việc này rất đơn giản, chúng ta truyền một hàm làm tham số của hàm khác, hàm này gọi là callback.  Và hàm đó sẽ được gọi khi sau khi thực hiện xong một số đoạn code cần thiết.  Đó cũng là phương thức xưa nay vẫn thường được sử dụng.  Bất cứ một hàm nào hoạt động bất đồng bộ cũng cần cung cấp một tham số dành riêng cho việc truyền callback.

## Callback lồng nhau

Việc sử dụng callback như trên rất tốt.  Nhưng mọi việc sẽ phức tạp hơn khi chúng ta cần load nhiều hơn một script.

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js', () => {
    console.log('jQuery loaded');
    loadScript('//cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js', () => {
        console.log('lodash 2 loaded');
        ...
    })
})
```

Với cách gọi callback lồng nhau như trên, sau khi script thứ nhất load xong, callback sẽ gọi việc load script thứ hai.

Code như trên vẫn còn trông rất đẹp, nhưng nếu chúng ta có nhiều script hơn nữa thì sao:

```javascript
loadScript('script1.js', () => {
    loadScript('script2.js', () => {
        loadScript('script3.js', () => {
            loadScript('script4.js', () => {
                ...
            })
        })
    })
})
```

Việc sử dụng callback lồng nhau vẫn ổn nếu chúng ta lồng nhau ít cấp. Nhưng khi mức độ lồng nhau tăng lên, rõ ràng là không thể dùng cách này được.  Mọi việc sẽ còn phức tạp hơn nữa khi các hoạt động bất đồng bộ này không phải lúc nào cũng thành công.

## Xử lý khi gặp lỗi

Trong những ví dụ ở trên, chúng ta hoàn toàn không quan tâm đến trường hợp bị lỗi.  Chúng ta nên nâng cấp code một chút để nó có thể xử lý thêm trường hợp này

```javascript
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error('script not loaded'));
    document.head.append(script);
}
```

Việc sử dụng rất đơn giản, hàm được truyền làm callback cần có hai tham số, tham số thứ nhất là lỗi (nếu không có lỗi thì truyền vào `null`) và tham số thứ hai là script được load.

```javascript
loadScript('my_script.js', (error, script) => {
    if (error) {
        // Có lỗi xảy ra khi load script

    } else {
        // Script đã load xong
    }
});
```

Việc định nghĩa callback như trên là theo phong cách [error-first callback](https://stackoverflow.com/a/40512067).  Convention rất đơn giản: tham số đầu tiên dùng để truyền lỗi khi nó xảy ra.  Những tham số tiếp theo dùng để truyền kết quả cho trường hợp bình thường (khi đó, tham số đầu tiên sẽ là `null`).  Bằng cách này, chúng ta chỉ cần định nghĩa một callback cho cả trường hợp có lỗi và không.

## Callback hell

Những trường hợp ở trên, chúng ta đã xem xét cách sử dụng callback cho các hoạt động bất đồng bộ.  Và trong trường hợp cần thiết, chúng ta cần phải sử dụng callback trong callback, thậm chí lồng nhau vài lớp. Nhưng càng lồng nhau nhiều, nguy cơ mất kiểm soát code sẽ càng tăng lên.

```javascript
loadScript('script1.js', (error, script) => {
    if (error) {
        handleError(error);
    } else {
        loadScript('script2.js', (error, script) => {
            if (error) {
                handleError(error);
            } else {
                loadScript('script3.js', (error, script) => {
                    if (error) {
                        handleError(error);
                    } else {
                        loadScript('script4', (error, script) => {
                            if (error) {
                                handleError(error);
                            } else {
                                // Code sau khi tất cả các hoạt động bất đồng
                                // bộ hoàn thành.
                            }
                        })
                    }
                })
            }
        })
    }
})
```

Vâng, phải nói là trông code rất đẹp.  Mọi việc rất đơn giản theo flow như sau:

- Load `script1.js`, nếu không có lỗi thì tiếp tục.
- Load `script2.js`, nếu không có lỗi thì tiếp tục.
- Load `script3.js`, nếu không có lỗi thì tiếp tục.
- Load `script4.js`, nếu không có lỗi thì bắt đầu xử lý logic chúng ta cần.

Với cách làm như thế này thì code có thể tiếp tục mở rộng thêm nữa mà không gặp vấn đề gì.  Nhưng khi mọi thứ trở nên phức tạp hơn, việc lồng nhau mức độ cao hơn, đặc biệt, khi chúng ta có những code với vòng lặp, các câu lệnh điều kiện, rẽ nhánh, v.v...  việc kiểm soát code sẽ trở nên cực kỳ khó khăn.

Vấn đề này trong lập trình nói chung được gọi là [pyramid of doom](http://calculist.org/blog/2011/12/14/why-coroutines-wont-work-on-the-web/) (do code trông như xây kim tự tháp).  Riêng trong JavaScript nó còn được gọi với tên gọi là khác [callback hell](http://thecodebarbarian.com/2015/03/20/callback-hell-is-a-myth).

Nguyên nhân của callback hell là khi chúng ta cố gắng viết code JavaScript theo kiểu tuần tự như những ngôn ngữ khác.  Nhưng vì đặc thù của hoạt động bất đồng bộ, nên việc tuần tự này không thể thực hiện được.  Callback hell thường xảy ra ở những lập trình viên còn ít kinh nghiệm, tuy nhiên, kể cả người đã đi làm nhiều năm vẫn có thể gặp phải, bởi cấu trúc code lồng nhau thật quá phức tạp.

Ví dụ với code ở trên thì mọi thứ vẫn chạy tốt, nhưng chỉ cần đóng mở ngoặc sai một ly thôi là đi luôn một dặm.  [Trang web này](http://callbackhell.com/) có đưa ra một số phương án để phòng tránh callback hell cũng khá hay, có thể áp dụng được.  Tuy nhiên, trong bài viết này, chúng ta sẽ tìm hiểu một phương án còn hay hơn nữa.

Một cách đơn giản để trông code có vẻ đơn giản hơn, tránh code trông như kim tự tháp kia là định nghĩa các hàm và gọi chúng như sau:

```javascript
loadScript('script1.js', callbackAfterScript1);

callbackAfterScript1 = (error, script) => {
    if (error) {
        handleError(error);
    } else {
        loadScript('script2.js', callbackAfterScript2);
    }
}

callbackAfterScript2 = (error, script) => {
    if (error) {
        handleError(error);
    } else {
        loadScript('script3.js', callbackAfterScript3);
    }
}

callbackAfterScript3 = (error, script) => {
    if (error) {
        handleError(error);
    } else {
        loadScript('script4.js', callbackAfterScript4);
    }
}

callbackAfterScript4 = (error, script) => {
    if (error) {
        handleError(error);
    } else {
        // Code sau khi tất cả các hoạt động bất đồng
        // bộ hoàn thành.
    }
}
```

Bằng cách làm như trên, dù code không thay đổi về bản chất, nhưng kim tự tháp của chúng ta đã thấp đi đáng kể, bằng cách đó, callback hell sẽ khó xảy ra hơn.  Mặc dù vậy, code này lại trở nên khó đọc hơn, để hiểu được hoạt động của nó, chúng ta phải do từ hàm này đến hàm khác. Nếu mức độ lồng nhau nhiều, thì việc làm này cũng tốn không ít thời gian.

May mắn cho chúng ta, từ khi ECMAScript 2015 (ES 6) ra đời, chúng ta đã có phương án tốt hơn rất nhiều để giải quyết.

# Promise

[Promise](https://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) được giới thiệu kể từ ECMAScript 2015.  Đây là một điểm sáng giúp chúng ta giải quyết các logic bất đồng bộ một cách tốt hơn.

Promise (lời hứa) có thể hiểu thế này: bạn hứa với mọi người sẽ làm việc XYZ và sẽ cho họ xem kết quả khi làm xong, nhưng bạn không biết chính xác khi nào thì sẽ xong.  Họ cứ làm việc của họ trong lúc chờ đợi, khi công việc hoàn thành, bạn báo cho họ kết quả.  Nếu chẳng may đại sự bất thành, bạn cũng thông báo cho họ không phải chờ nữa.

Như vậy, lời hứa được đảm bảo, ai nấy đều vui vẻ cả.  Promise cũng được thiết kế với ý tưởng tương tự như vậy.

Một vài hoạt động bất đồng bộ, nó cần thời gian để hoàn thành, như ví dụ, đó là load một script khác.  Rất nhiều code khác đang chờ công việc đó hoàn thành, promise là lời hứa mà loadScript đưa cho họ.  Khi nào loadScript hoàn thành, những ai đang chờ sẽ được thông báo, kể cả load thất bại thì việc thất bại đó cũng được thông báo luôn.

## Tạo promise

Promise được tạo ra như sau:

```javascript
let promise = new Promise((resolve, reject) => {
    // code thực hiện logic
});
```

Hàm được truyền vào để khởi tạo `Promise` được gọi là "executor".  Hàm này sẽ được thực thi khi promise được tạo ra.  Khi executor kết thúc, nó phải gọi một trong số hai hàm `resolve` và `reject`.

- Gọi `resolve` khi code chạy thành công, công việc kết thúc mà không có lỗi gì. Khi đó, `state` của đối tượng promise sẽ là `fulfilled` (trạng thái khởi tạo là `pending`), đồng thời `result` của đối tượng promise sẽ là giá trị của tham số được truyền cho `resolve`.
- Gọi `reject` nếu có lỗi xảy ra, khi đó `state` của đối tượng promise sẽ là `rejected`, đồng thời `result` cũng sẽ là tham số được truyền vào cho `reject`.

Quay lại trường hợp loadScript ở trên, chúng ta sẽ chuyển sang dùng promise như sau, không cần phải truyền callback vào nữa.

```javascript
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error('script not loaded'));
        document.head.append(script);
    });
}
```

Giờ hàm này vẫn gọi như bình thường, còn callback đi đâu chúng ta sẽ tìm hiểu tiếp ở những phần tiếp theo.

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js');
```

Việc thực thi sẽ diễn ra như sau:

- Executor sẽ được thực thi khi khởi tạo promise mới.
- Executor có hai tham số là `resolve` và `reject`, đây chính là hai hàm cần phải được gọi khi hoàn thành. Đây là hàm được cung cấp sẵn, chúng ta không cần quan tâm đến nó, chỉ cần sử dụng là được.
- Executor hoạt động và tuỳ vào kết quả nó sẽ gọi đến một trong hai hàm trên.

Một lưu ý rằng, `resolve` hoặc `reject` chỉ có thể được gọi một lần. Dù chúng ta có gọi nhiều lần thì chỉ lần gọi đầu tiên có tác dụng:

```javascript
new Promise((resolve, reject) => {
    resolve('first resolve');
    reject('error');
    resolve('second resolve')
})
// trả về Promise {<resolved>: "first resolve"}
// gọi resolve, reject tiếp theo cũng không có tác dụng
```

Ngoài ra, các hàm `resolve` và `reject` có thể nhận số lượng tham số tuỳ ý, nhưng sẽ chỉ có tham số đầu tiên được sử dụng làm `result` cho đối tượng promise, những tham số tiếp theo sẽ bị bỏ qua.  Hành động resolve hoạt reject promise này được gọi với thuật ngữ `settle` promise đó.

Vậy là chúng ta đã tạo ra đối tượng promise, công việc bây giờ mà chúng ta cần là tìm cách gọi những code tiếp theo cần thực thi khi công việc bất đồng bộ này thành công.  Đó cũng chính là nội dung của phần tiếp theo

## Sử dụng `then` và `catch`

Promise cho phép chúng ta liên kết các hoạt động bất đồng bộ với những code cần thực thi (những code cần đến kết quả của hoạt động kia) sau đó rất dễ dàng.  Những điều đó có thể thực hiện thông qua `.then` như sau:

```javascript
promise.then(
    result => {
        // Code trong trường hợp thành công
    },
    error => {
        // Code trong trường hợp lỗi
    }
);
```

Tham số đầu tiên được thực thi khi promise được resolve và thành công, còn tham số thứ hai được gọi khi promise bị reject trong trường hợp lỗi.

Với ví dụ `loadScript` ở trên, chúng ta có thể thực hiện đơn giản thế này:

```javascript
    loadScript('//code.jquery.com/jquery-3.3.1.min.js')
        .then(
            () => {
                $("#test").hide();
            },
            error => {
                console.log(error);
            }
        );
```

Nếu chúng ta chỉ cần quan tâm đến trường hợp thành công, còn lỗi thì bỏ qua, chúng ta chỉ cần dùng 1 tham số cho `then` là đủ:

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js').then(() => {
    $("#test").hide();
});
```

Nếu chúng ta chỉ quan tâm đến lỗi, chúng ta có thể dùng `then(null, errorCallback)`.  Và trong trường hợp này, `catch` cho chúng ta cú pháp đẹp hơn:

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js').catch(error => {
    console.log(error);
})
```

Việc gọi `catch` và `then(null, function)` hoàn toàn giống nhau, chúng ta có thể dùng loại nào mình cảm thấy thích.  Những hàm được truyền vào `then` hoặc `catch` luôn luôn được đảm bảo rằng, chúng chỉ được thực thi khi nào promise được resolve hoặc reject mà thôi.  Vì vậy, mọi việc hoạt động bất đồng bộ vẫn luôn được đảm bảo mà không cần lo về lỗi khi code được thực thi khi đang chờ code khác.

Một lưu ý nữa là các đối tượng promise luôn đóng gói `state` và `result`, chúng ta không thể truy cập nó từ bên ngoài, mọi thao tác với promise đều cần phải sử dụng những API được cung cấp, `then`, `catch` là một trong số chúng.

## Cơ chế `try...catch` ngầm

`then` và `catch` của promise có một cơ chế rất hay: Nếu có exception, cho dù promise không bị reject, callback vẫn ngầm hiểu rằng promise này trạng thái là rejected.  Ví dụ:

```javascript
new Promise(() => {
    throw new Error();
}).then(
    result => console.log(result),
    () => console.log('Error occured')
)
// Error occured
```

Nó hoạt động hoàn toàn giống với:

```javascript
new Promise((resolve, reject) => {
    reject(new Error());
}).then(
    result => console.log(result),
    () => console.log('Error occured')
)
```

## Timing

Để không gây trở ngại cũng như khó khăn cho lập trình viên, các hàm truyền qua `then` hay `catch` không bao giờ được gọi đồng bộ.  Chúng cũng hoạt động hoàn toàn bất đồng bộ, sẽ được thực thi sau khi toàn bộ code đồng bộ điược thư thi hết, ngay cả trong trường hợp promise được resolve ngay lập tức.

```javascript
new Promise(resolve => resolve('done')).then(() => console.log('asynchronous'));
console.log('synchronous');
// Kết quả in ra sẽ là
// synchronous
// asynchronous
```

Về mặt kỹ thuật, những hàm được truyền vào `then` hay `catch` sẽ được đưa vào một hàng đợi.  Điều này giúp chúng sẽ được thực thi sau, JavaScript engine của trình duyệt sẽ bắt đầu làm việc với hàng đợi này sau khi các code đã được thực thi xong.  Và tất nhiên, các hàm trong hàng đợi sẽ được lấy ra khi promise của chúng đã được resolve hoặc reject.

```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait().then(() => console.log(3));
new Promise(resolve => resolve())
    .then(() => console.log(2))
console.log(1);
// Kết quả sẽ là
// 1
// 2
// 3
```

Và promise cho chúng ta rất nhiều lợi ích so với cách sử dụng callback truyền thống ở trên:

- Callback truyền vào `then`, `catch` sẽ luôn được đảm bảo là không được thực thi khi mà các code JavaScript tiếp theo vẫn chưa hoàn thành.  Trong phần lớn các trường hợp thì điều này không có nhiều ý nghĩa, tuy nhiên, nó vẫn cần thiết trong một vài trường hợp đặc biệt mà thứ tự code được thực thi sẽ cho kết quả khác nhau.
- Các callback được truyền vào `then` và `catch` luôn được gọi, kể cả trường hợp nó được thêm vào sau khi promise được settle, và sau cả một vài code đồng bộ khác.  Ví dụ:
```javascript
const x = new Promise(resolve => resolve(2));
console.log(1);
x.then(console.log);
// Kết quả:
// 1
// 2
```
- Hoạt động của `then` và `catch` cũng là bất đồng bộ, và kết quả trả về sau khi gọi hai hàm này cũng là một promise, điều đó cho phép chúng ta có thể gọi `then` liên tiếp để thực hiện nhiều công việc bất đồng bộ khác nhau.

# Promise chain

Một nhu cầu rất chính đáng của chúng ta là cần phải thực thi hai hoặc nhiều hơn các hoạt động bất đồng bộ, theo thứ tự lần lượt từng thứ kết thúc một.  Trong nhiều trường hợp, chúng ta còn phải sử dụng kết quả của hành động trước để có thể tiến hành các hoạt động tiếp theo.

Promise có thể giúp chúng ta trong việc này.

```javascript
const promise1 = doSomething();
const promise2 = promise1.then(successCallback, failureCallback);
```

hoặc viết ngắn gọn hơn:

```javascript
const promise2 = doSomething().then(successCallback, failureCallback);
```

Như đã nói ở trên, `then` sẽ trả về một promise, và promise này không chỉ là `doSomething` đã hoàn thành mà cả `successCallback` cũng đã hoàn thành (có thể là `failureCallback` trong trường hợp lỗi).  Nhờ đó, chúng ta có thể tiếp tục sử dụng promise này cho những hành động tiếp theo.  Trong trường hợp đó, những callback được truyền cho `promise2` sẽ cũng se được đưa vào hàng đợi, và đương nhiên, chúng phải xếp hàng ở phía sau.

## Chain đơn giản với giá trị được trả về

Nói đơn giản, sau mỗi bước, một promise sẽ được trả về, và nó đại diện cho kết quả của bước đó.  Cách làm này giúp chúng ta không phải truyền callback, mà sử dụng kết quả của promise để tiến hành các hoạt động tiếp theo.  Lưu ý rằng, nếu muốn sử dụng kết quả của bước trước ở bước tiếp theo, chúng ta cần `return` kết quả đó.  Để dễ hiểu hơn, hãy xem xét một ví dụ sau:

```javascript
new Promise(resolve => resolve(1)).then(result =>  {
    console.log(result);
    return result * 2;
}).then(result => {
    console.log(result);
    return result * 2;
}).then(result => {
    console.log(result);
    return result * 2;
}).then(result => {
    console.log(result);
})
// Kết quả sẽ là
// 1
// 2
// 4
// 8
```

Hơi ngoài lề một chút, nhưng chúng ta có thể sử dụng nhiều `then` với cùng một promise mà không chain.  Điều này là hoàn toàn hợp lệ, về mặt kỹ thuật.  Nhưng khác với chain, tất cả `then` của cùng một promise sẽ có cùng một kết quả.  Trong thực tế thì việc này không được nhiều người sử dụng, mà chain mới là thứ chúng ta cần.

```javascript
const promise = new Promise(resolve => resolve(1));
promise.then(result => {
    console.log(result);
    return result * 2;
})
promise.then(result => {
    console.log(result);
    return result * 2;
})
promise.then(result => {
    console.log(result);
    return result * 2;
})
promise.then(result => {
    console.log(result);
})
// Kết quả:
// 1
// 1
// 1
// 1
```

## Return một promise

Trong ví dụ trên, chúng ta chỉ đơn giản là return một giá trị và giá trị đó được sử dụng trong chain.  Nhưng chúng ta hoàn toàn có thể return một promise khác, trong trường hợp chúng ta muốn thêm hoạt động bất đồng bộ khác.

Nếu promise được return, callback được truyền vào trong `then` sẽ không được thực hiện ngay, mà nó sẽ phải chờ promise đó được resolve hoặc reject thì mới được thực thi.  Khi đó, `result` của promise sẽ được sử dụng.

Quay lại với ví dụ load script của chúng ta, với mỗi hoạt động load script là một promise, và vì mỗi script lại được load bất đồng bộ nên thông thường suy nghĩ của chúng ta sẽ là thế này:

```javascript
loadScript('script1.js').then(() => {
      loadScript('script2.js').then(() => {
            loadScript('script3.js').then(() => {
                  loadScript('script4.js').then(() => {
                      // Code sau khi tất cả các hoạt động bất đồng
                      // bộ hoàn thành.
                  })
              })
        })
  })
```

Về cơ bản thì lại là một kim tự tháp khác thôi mà, đây là trường hợp callback không `return` bất cứ một kết quả gì.  Nhưng với promise, thì chúng ta không cần phải làm như vậy.  JavaScript đã giải quyết vấn đề này giúp chúng ta rồi.  Khi `then` có thể trả về một promise, và khi nó trả về một promise thì promise đó phải hoàn thành thì mới tới bước tiếp theo, nên chúng ta có thể code trông rất đẹp như sau:

```javascript
loadScript('script1.js')
  .then(() => loadScript('script2.js'))
  .then(() => loadScript('script3.js'))
  .then(() => loadScript('script4.js'))
  .then(() => {
      // Code sau khi tất cả các hoạt động bất đồng
      // bộ hoàn thành.
  })
```

Sử dụng promise giúp chúng ta xây dựng được chuỗi các hoạt động bất đồng bộ một cách rất dễ dàng.  Ví dụ load script này có thể không thấy được kết quả ngay nên sẽ khó hình dung.  Để rõ hơn, chúng ta có thể xem ví dụ sau:

```javascript
new Promise(resolve => setTimeout(() => resolve(1), 1000)).then(result => {
    console.log(result);
    return new Promise(resolve => setTimeout(() => resolve(result * 2), 1000));
}).then(result => {
    console.log(result);
    return new Promise(resolve => setTimeout(() => resolve(result * 2), 1000));
}).then(result => {
    console.log(result);
    return new Promise(resolve => setTimeout(() => resolve(result * 2), 1000))
}).then(result => {
    console.log(result);
})
```

Ví dụ này có thể kiểm chứng ngay trong console của trình duyệt.  Khi chạy, sau mỗi giây nó sẽ in ra một số, lần lượt sẽ là

```
1
2
4
8
```

Flow ở đây rất dễ hiểu:

- Khi promise đầu tiên được resolve sau 1 giây, nó trả về kết quả và được callback trong `then` sử dụng.
- Callback này in ra kết quả và trả về một promise mới.
- Vì promise mới này cũng cần 1 giây để hoàn thành, nên callback trong `then` tiếp theo chưa được thực thi ngay.
- Nó đợi đến khi promise được resolve mới bắt đầu thực thi, lúc nào nó in ra kết quả `2` và trả về promise mới.
- Quá trình cứ tiếp tục như vậy cho đến khi hết các callback.

Đây là cách hoạt động của promise chain, nó cho chúng ta code chuỗi các hoạt động bất đồng bộ một cách dễ dàng mà không phải sử dụng code kiểu lồng nhau, nguy cơ rất lớn dẫn đến callback hell.  Có thể thấy đây chính là điểm mấu chốt của promise chain.  Chúng ta cứ tạm hiểu rằng, `return` một giá trị xác định là một biến thể của hình thức này, khi đó JavaScript sẽ "ngầm" tạo ra một promise được resolve ngay với giá trị đó.

## Xử lý khi gặp lỗi

Trong những ví dụ ở trên, chúng ta mới chỉ quan tâm đến việc các hoạt động bất đồng bộ kết thúc thành công.  Tuy nhiên, không thể đảm bảo rằng, tất cả chúng sẽ luôn thành công như vậy.  Trong trường hợp lỗi, tất nhiên là promise sẽ bị reject thay vì resolve.

Và một nhu cầu tất yếu (dù không thường xuyên) là cần phải giải quyết hậu quả khi có lỗi xảy ra.  Promise chain có một cơ chế tuyệt vời giúp chúng ta làm việc đó.

```javascript
doSomething()
    .then(result => doSomethingEles())
    .then(newResult => doOtherThing())
    .then(finalResult => {
      console.log(`I got the final result: ${finalResult}`)
    })
    .catch(failureCallback)
```

Promise chain có một cơ chế rất hay, khi một promise bị reject, ngay lập tức, nó sẽ thực thi code xử lý gần nhất trong chuỗi.  Cách làm này tương tự như cơ chế `try...catch` thông thường.

```javascript
try {
    const result = syncDoSomething();
    const newResult = syncDoSomethingElse(result);
    const finalResult = syncDoOtherThing(newResult);
    console.log(`I got the final result: ${finalResult}`);
} catch(error) {
    failureCallback(error);
}
```

Giờ hãy nhìn lại một chút ví dụ về load script của chúng ta, bạn có thể nhận ra rằng, trong cách làm callback truyền thống, chúng ta phải gọi `failureCallback` tới ba lần, trong khi cơ chế promise chain cho phép chúng ta chỉ cần gọi 1 lần là đủ.

```javascript
loadScript('//code.jquery.com/jquery-3.3.1.min.js')
    .then(() => loadScript('wrong-script-path.js'))
    .then(() => loadScript('//cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js'))
    .then(() => console.log('All scripts loaded'))
    .catch(error => console.log(error))
// Kết quả sẽ là
// Error: script not loaded
//     at HTMLScriptElement.script...
```

Ở phần trước, chúng ta biết rằng, promise có một cơ chế `try...catch` ngầm.  Nhưng đó là cơ chế đối với executor, vậy với các callback trong `then` thì sao?

Thật tuyệt vời là cơ chế đó cũng tồn tại trong promise chain.  Khi một callback nào đó có exception, nó cũng ngay lập tức coi đó là reject một promise và nhảy đến `catch` gần nhất.

```javascript
new Promise(resolve => resolve('ok'))
    .then(result => {
        throw new Error();
    })
    .catch(() => console.log('Error occured'))
```

Lưu ý rằng, `catch` ở đây vẫn là cách viết ngắn gọn của `then(null, function)`.  Chúng ta hoàn toàn có thể dùng cú pháp đầy đủ cũng không vấn đề gì:

```javascript
new Promise(resolve => resolve('ok'))
    .then(result => {
        throw new Error();
    })
    .then(
        result => console.log(result),
        () => console.log('Error occured')
    )
```

Một tác dụng phụ không mong muốn của cơ chế này là bất cứ exception nào (kể cả lỗi cú pháp) cũng bị coi là reject và nhảy đến catch gần nhất.  Do đó, trong quá trình debug, đây có thể là một trở ngại rất lớn.

## Chain tiếp theo `catch`

Chúng ta có thể dùng `catch` ở bất cứ đâu, không nhất thiết là ở cuối cùng.  Đơn giản là `catch` cũng trả về một promise nên nó hoàn toàn có thể tiếp tục chain được.  Chúng ta có thể dùng cách này để thực hiện một số hành động cần phải chạy trong cả trường hợp thành công và lỗi.

```javascript
new Promise(resolve => {
    console.log('Init');
    resolve();
}).then(() => {
    throw new Error();
    console.log('Do this');
}).catch(() => {
    console.log('Do that');
}).then(() => {
    console.log('Do this, no matter when happened')
})
// Kết quả sẽ là
// Init
// Do that
// Do this, no matter what happened
```

Lưu ý rằng, `Do this` không được in ra bởi vì có exeption xảy ra, và nó coi như một promise bị reject.  Hơn nữa, trong trường hợp trên, nếu `catch` không được thực thi (nếu không có lỗi nào xảy ra) thì `then` sau nó vẫn được thực thi như thường:

```javascript
new Promise(resolve => {
    console.log('Init');
    resolve();
}).then(() => {
    console.log('Do this');
}).catch(() => {
    console.log('Do that');
}).then(() => {
    console.log('Do this, no matter when happened')
})
// Kết quả sẽ là
// Init
// Do this
// Do this, no matter what happened
```

Như vậy, chúng ta có thể đặt `catch` ở bất cứ đâu mà chúng ta cần để xử lý lỗi.  Thậm chí chúng ta có thể sử dụng kết hợp nhiều `then` và `catch` để xử lý những lỗi khác nhau ở những giai đoạn khác nhau.  Và mỗi giai đoạn như vậy, nếu là lỗi không xử lý được có thể throw lỗi đó để nhảy đến bước tiếp theo.  Trong một chain nếu có nhiều `catch` thì khi có lỗi xảy ra, JavaScript engine sẽ thực thi code ở `catch` gần nhất.

```javascript
new Promise(resolve => {
    console.log('Init');
    resolve();
}).then(() => {
    throw new Error();
}).catch((error) => {
    if (error instanceof EvalError) {
        console.log('Do this');
    } else {
        throw error;
    }  
}).then(() => {
    console.log('This will run only if error is handled')
}).catch(() => {
    console.log('unhandled error here')
})
// Kết quả
// Init
// Unhandled error here
```

# Promise API

Có 1 phương thức mà Promise cung cấp cho chúng ta, trong phần này, chúng ta sẽ tìm hiểu các phương thức đó.

## `resolve`

Phương thức cho chúng ta cách tắt để tạo một promise được resolve mới.

```javascript
const promise = Promise.resolve(1);
```

Code trên hoàn toàn tương đương với:

```javascript
const promise = new Promise(resolve => resolve(1));
```

Phương thức này cho chúng ta một cách ngắn gọn để tạo promise mà giá trị của nó được xác định sẵn.

## `reject`

Tương tự như `resolve`, `reject` cũng là một phương thức cho chúng ta tạo ra một promise bị reject một cách nhanh chóng:

```javascript
const promise = Promise.reject(new Error());
```

Code trên hoàn toàn tương đương với:

```javascript
const promise = new Promise((resolve, reject) => reject(new Error()));
```

Tuy nhiên, khác với `Promise.resolve`, phương thức này ít được sử dụng trong thực tế.

## `all`

Đây là phương thức cho chúng ta cơ chế thực thi nhiều promise song song với nhau.  Và `Promise.all` chỉ kết thúc và trả về kết quả khi tất cả các promise đã được "settle".

```
const promise = Promise.all(iterable);
```

Tham số `iterable` thường là một array các promise (về mặt kỹ thuật, bất cứ đối tượng iterable nào cũng được).  Và kết quả của phương thức này là một promise, promise này được resolve nếu tất cả các promise trong `iterable` được resolve, và `result` của nó sẽ là một array các `result` của từng promise.

Ví dụ, đoạn code sau sẽ được thự thi và sau 3 giây, một promise mới được resolve với giá trị `[1, 2, 3]` sẽ được trả về:

```javascript
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log);
// Kết quả:
// [1, 2, 3]
```

Giá trị trả về trong `result` của `Promise.all` sẽ tương ứng với thứ tự của các promise trong `iterable`, dù thời gian thực thi của các promise đó có thể nhanh chậm khác nhau.

Trong trường hợp có một promise nào đó bị reject, `Promise.all` sẽ ngay lập tức trả về một promise với lỗi đó.

```javascript
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error()), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).catch(console.log);
// Kết quả:
// Error
//    at setTimeout (<anonymous>:3:62)
```

Trong đoạn code trên, promise thứ hai bị reject sau hai giây, do đó, kết quả trả về của `Promise.all` là một promise bị reject với đúng lỗi đó.  Trong trường hợp có nhiều lỗi thì chỉ có lỗi đầu tiên được ghi nhận:

```javascript
Promise.all([
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).catch(console.log);
// Kết quả
// Error: Error 2
//    at setTimeout (<anonymous>:3:62)
```

Tuy nhiên, cũng cần lưu ý rằng, các promise được chạy song song và dù một promise bị reject thì chúng ta cũng không có cách nào để dừng các promise khác lại được.  Chúng vẫn sẽ tiếp tục chạy cho tới khi "settle" nhưng kết quả sẽ bị bỏ qua.

```javascript
Promise.all([
    new Promise(resolve => setTimeout(() => console.log('this will not stop'), 3000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).catch(console.log);
// Kết quả
// Error: Error 2
//    at setTimeout (<anonymous>:3:62)
// this will not stop
```

Một điều vi diệu là `Promise.all` nhận một iterable thường là một array các promise.  Nhưng thực ra chúng ta có thể dùng bất cứ giá trị nào, trong trường hợp một giá trị được truyền vào, nó sẽ tự động hiểu điều đó tương đương với `Promise.resolve(value)`.

```javascript
Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 1000)),
    2,
    3,
]).then(console.log);
// Kết quả là:
// [1, 2, 3]
```

## `race`

`Promise.race` tương tự như `Promise.all`, cũng nhận một iterable các promise, nhưng thay vì đợi tất cả các promise kết thúc, nó chỉ đợi một promise được "settle" và trả kết quả về chính promise đó.

Ví dụ:

```javascript
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error()), 2000)),
]).then(console.log);
// Kết quả
// 3
```

Kể cả trong trường hợp lỗi thì nó vẫn trả về promise đầu tiên:

```javascript
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(3), 2000)),
    new Promise((resolve, reject) => setTimeout(() => reject(new Error()), 1000)),
]).catch(console.log);
// Kết quả:
// Error
//    at setTimeout (<anonymous>:4:62)
```

Và cũng tương tự như `Promise.all`, khi promise đầu tiên đã "settle", thì những promise khác cũng không được dừng lại, mà nó vẫn tiếp tục chạy cho đến khi đến thúc, tuy nhiên, kết quả của chúng sẽ bị bỏ qua:

```javascript
Promise.race([
    new Promise(resolve => setTimeout(() => console.log('this will not stop'), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000)),
]).then(console.log);
// Kết quả:
// 3
// this will not stop
```

# Kết luận

Promise là một phương án giúp chúng ta code bất đồng bộ trong JavaScript tốt hơn.  Nó cho phép chúng ta phòng tránh callback hell và đóng gói các hoạt động bất đồng bộ, giúp chúng ta có thể code tốt hơn, xử lý lỗi dễ hơn.  Đặc biệt là promise chain cho chúng ta khả năng code một chuỗi các hoạt động bất đồng bộ nối tiếp nhau.