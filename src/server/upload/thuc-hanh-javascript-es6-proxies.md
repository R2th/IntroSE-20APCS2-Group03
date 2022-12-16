Javascript Proxy là một loại object được dùng để đóng gói một object hoặc một function khác (thường được gọi là `Target`). Nó được dùng để theo dõi việc access đến object ban đầu. Proxy object có thể được dùng để thay đổi cách access vào property của object, handle trường hợp property không tồn tại hoặc xử lý dynamic property. Ngoài ra Proxy cũng còn dùng để quản lý việc access vào property (chẳng hạn như chặn truy cập một số properties nhất định)

Mỗi `Proxy object` tồn tại một số  `handler` nhất định nhằm xử lý việc access vào Target, còn được gọi là các `traps`. Các traps trong Proxy object giống như các methods được dùng trong `Reflect Api`:

+ `get`
+ `set`
+ `has`
+ `apply`
+ `construct`
+ `defineProperty`
+ `deleteProperty`
+ `getPrototypeOf`
+ `setPrototypeOf`
+ `isExtensible`
+ `getOwnPropertyDescriptor`
+ `preventExtensions`
+ `ownKeys`

Mỗi khi một trong các `trap` được thực thi, chúng ta có thể thực hiện bất kỳ hành động nào ngay cả khi không thể access vào `Target object`. Trong mỗi hành động này, Proxy sẽ quyết định xem nó có cấp quyền access cho chúng ta hoặc chặn và tự nó thực hiện việc xử lý.

Các `traps` được hỗ trợ hiện tại đã có thể giúp chúng ta xử lý phần lớn các trường hợp, tuy nhiên vẫn có một số trường hợp đặc biệt mà các traps hiện tại chưa thể cung cấp giải pháp hợp lý được (có thể là các vấn đề như: đối chiếu object của chúng ta với một giá trị cụ thể, xác định xem object có phải được đóng gói bởi một object khác không...)

## Khởi tạo `Proxy`
Chúng ta có thể khởi tạo một Proxy object như sau:
```
let proxyObject = new Proxy(targetObject, trapObject);
```
ở đây chúng ta đã thực hiện khởi tạo `proxyObject` thông qua class `Proxy`
+ Tham số thứ nhất: `targetObject` đại diện cho một object, function hay class, thường là những giá trị ban đầu, được dùng làm giá trị khởi tạo cho `targetObject`
+ Tham số thứ hai: `trapObject` là một object tập hợp các `traps` mà chúng ta muốn áp dụng cho `targetObject` của mình

Hãy xem thử một ví dụ chi tiết hơn nữa nhé.

Giả sử chúng ta có một class `Student` được dùng để tạo nên các `targetObject`
```
class Student {
    constructor(first, last, scores) {
        this.firstName = first;
        this.lastName = last;
        this.testScores = scores;
    }
    get average() {
        let average = this.testScores.reduce( 
            (a,b) => a + b, 
            0 
        ) / this.testScores.length;
        return average;
    }
}
```
Khởi tạo thêm 1 đối tượng cụ thể từ class bên trên:
```
let john = new Student( 'John', 'Dwan', [60, 80, 80] );
```
Tiếp theo chúng ta sẽ xây dựng một proxyObject dựa trên object đã có `john`
```
let johnProxy = new Proxy( john, {
    get: function( target, key, context ) {
        console.log( `john[${key}] was accessed.` );
    } 
});
```

trap `get` (hay method `get`) sẽ được thực thi mỗi khi chúng ta access vào một property

```
johnProxy.grade
> john[grade] was accessed.
> undefined
```
```
johnProxy.testScores 
> john[testScores] was accessed.
> undefined
```
Để ý kết quả chạy test việc access vào các properties `grade` và `testScores` đều cho ra là `undefined`. 
Rõ ràng property `grade` không tồn tại ở object johnProxy nên undefined là đúng, tuy nhiên  property `testScores` lại tồn tại mà vẫn cho ra `undefined`???

Nguyên nhân bởi vì tại trap `get` bên trên chúng ta đã không return về bất kỳ giá trị nào cả, khi đã quyết định sử dụng trap get thì mọi lời gọi đến một property bất kỳ đều phải thông qua trap này; do đó giá trị trả về khi gọi một property cũng do trap get quyết định. Ở ví dụ này chúng ta không return nên nhận được `undefined`

Xét tiếp một ví dụ khác về việc chặn truy cập đến giá trị của property
```
let johnMethodProxy = new Proxy( john, {
    get: function( target, key, context ) {
        if (key === 'average') {
            return target.average;
        }
    } 
});
 
johnMethodProxy.firstName
undefined
johnMethodProxy.average 
73.33333333333333
```
Ở ví dụ này, trong phần xử lý của trap get ta chỉ return lại giá trị nếu property là `average`, do đó việc gọi đến `firstName` sẽ không trả về kết quả đúng

Qua 2 ví dụ trên chúng ta có thể thấy được một số ứng dụng của `Proxy` như sau:
+ Xây dựng bộ quản lý access cho object
+ Cung cấp cơ chế validation thông qua `public interface` của object

`Target object` của proxy có thể là một function
```
let factorial = n => {
    n <= 1 ? n : n * factorial(n - 1);
}
```
Đối với ví dụ tính giai thừa bên trên, đôi khi chúng ta sẽ đặt ra câu hỏi rằng với việc gọi `factorial(5)` thì hàm `factorial` sẽ được gọi qua bao nhiêu lần?
Trap `apply` sẽ giúp chúng ta trả lời câu hỏi này:
```
let numOfCalls = 0;
factorial = new Proxy(factorial, {
   apply: function(target, thisValue, args) {
        console.log('I am called with', args);
        numOfCalls += 1;
        return target(...args);
   } 
});
```
```
factorial(5);
> I am called with [5]
> I am called with [4]
> I am called with [3]
> I am called with [2]
> I am called with [1]
> 120

numOfCalls
> 5
```

## Revocable proxies
ES6 Proxy cũng cho phép chúng ta thiết lập `revocable proxies` (proxy có thể hủy bỏ) sử dụng `Proxy.revocable`. Tính năng này cần thiết khi chúng ta sử dụng Proxy cho một object những vẫn muốn control bất kỳ khi nào chúng ta muốn hủy bỏ Proxy khỏi object đó
```
let payload = {
    website: 'zsoltnagy.eu',
    article: 'Proxies in Practice',
    viewCount: 15496
}
 
let revocable = Proxy.revocable( payload, {
   get: function( ...args ) {
        console.log( 'Proxy' );
        return Reflect.get( ...args );
   } 
});
 
let proxy = revocable.proxy;
```
```
proxy.website
> Proxy
> "zsoltnagy.eu"
 
revocable.revoke();
 
proxy.website
> Uncaught TypeError: Cannot perform 'get' on a proxy that 
> has been revoked
>    at <anonymous>:3:6
```

Ngoài ra, với ES6 thì ví dụ trên có thể được viết gọn lại thành
```
let {proxy, revoke} = Proxy.revocable( payload, {
   get: function( ...args ) {
        console.log( 'Proxy' );
        return Reflect.get( ...args );
   } 
});
```

## Tổng kết
ES6 Proxy giúp chúng ta xử lý được rất nhiều vấn đề. Bạn có thể dùng nó để tạo một bộ filter, giới hạn việc truy cập đến các thuộc tính của object. Ngoài ra nó còn rất hữu ích nếu bạn muốn tạo một object "trừu tượng" mà trong đó giá trị các property đươc tính toán và trả về thông qua `trap`.
Đối với môi trường development thì Proxy cũng có thể được dùng để fake kết quả trả về của các api. Thay vì thực hiện gọi api thật thì chúng ta có thể thông qua trap get và trả về kết quả fake nào đó.

### Tham khảo
https://medium.com/dailyjs/how-to-use-javascript-proxies-for-fun-and-profit-365579d4a9f8

https://hackernoon.com/introducing-javascript-es6-proxies-1327419ab413

http://www.zsoltnagy.eu/es6-proxies-in-practice/

https://medium.com/@ian.mundy/using-es6-proxies-in-real-life-df8c3dccd19b