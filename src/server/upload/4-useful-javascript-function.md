## 1. Caching function calculation results

Chúng tôi muốn lưu kết quả của hoạt động hàm vào bộ nhớ cache. Khi nó được gọi sau đó, nếu các tham số giống nhau, hàm sẽ không được thực thi nữa mà kết quả trong cache sẽ được trả về trực tiếp. Chúng ta có thể làm gì?

```
function cached(fn){
  // Create an object to store the results returned after each function execution.
  const cache = Object.create(null);

  // Returns the wrapped function
  return function cachedFn (str) {

    // If the cache is not hit, the function will be executed
    if ( !cache[str] ) {
        let result = fn(str);

        // Store the result of the function execution in the cache
        cache[str] = result;
    }

    return cache[str]
  }
}
```

Cùng xem ví dụ nhé:

![](https://images.viblo.asia/5235d4b6-5e2b-4972-bb75-3d15bbec7dd2.png)

## 2. Curry

Currying là một kỹ thuật đánh giá hàm với nhiều đối số, thành một chuỗi các hàm với một đối số duy nhất.
Nói cách khác, khi một hàm, thay vì nhận tất cả các đối số cùng một lúc, lấy đối số đầu tiên và trả về một hàm mới nhận đối số thứ hai và trả về một hàm mới nhận đối số thứ ba, v.v. cho đến khi tất cả các đối số đều hoàn thành.
Tại sao nó hữu ích?
- Currying giúp bạn tránh chuyển đi chuyển lại cùng một biến.
- Nó giúp tạo ra một hàm bậc cao hơn. Nó cực kỳ hữu ích trong việc xử lý sự kiện.
Các mảnh nhỏ có thể được cấu hình và sử dụng lại một cách dễ dàng.
Hãy xem xét một chức năng thêm đơn giản. Nó chấp nhận ba toán hạng làm đối số và trả về tổng của cả ba là kết quả.

```
function add(a,b,c){
 return a + b + c;
}
```

Bạn có thể gọi nó với quá ít đối số hoặc quá nhiều (đối số dư thừa bị bỏ qua).

```
add(1,2,3) --> 6 
add(1,2) --> NaN
add(1,2,3,4) --> 6 //Extra parameters will be ignored.
```

Sẽ thế nào nếu convert hàm đó sang dạng curry.

```
function curry(fn) {
    if (fn.length <= 1) return fn;
    const generator = (...args) => {
        if (fn.length === args.length) {

            return fn(...args)
        } else {
            return (...args2) => {

                return generator(...args, ...args2)
            }
        }
    }
    return generator
}
```

![](https://images.viblo.asia/96feb79e-572b-472d-b4c3-8bbdc6c20733.png)

## 3. Singleton

Mô hình Singleton giới hạn số lượng phiên bản của một đối tượng cụ thể chỉ là một. Cá thể đơn lẻ này được gọi là một singleton.
Các Singleton rất hữu ích trong các tình huống mà các hành động trên toàn hệ thống cần được phối hợp từ một nơi trung tâm duy nhất. Một ví dụ là một nhóm kết nối cơ sở dữ liệu. Pool quản lý việc tạo, hủy và tồn tại của tất cả các kết nối cơ sở dữ liệu cho toàn bộ ứng dụng, đảm bảo rằng không có kết nối nào bị ‘mất’.
Singletons giảm nhu cầu về các biến toàn cục đặc biệt quan trọng trong JavaScript vì nó hạn chế ô nhiễm không gian tên và nguy cơ xung đột tên liên quan.

```
function proxy(func) {
    let instance;
    let handler = {
        construct(target, args) {
            if (!instance) {
                // Create an instance if there is not exist
                instance = Reflect.construct(func,args)
            }
            return instance
        }
    }
    return new Proxy(func, handler)
}


// example

function Person(name, age) {
    this.name = name
    this.age = age
}

const SingletonPerson = proxy(Person)

let person1 = new SingletonPerson('zhl', 22)

let person2 = new SingletonPerson('cyw', 22)

console.log(person1 === person2) // true
```

Cùng xem ví dụ:

![](https://images.viblo.asia/aefe2f00-3dc9-4794-afc4-7f650e3b3988.png)

## 4. Deep check and get different of 2 objects

Nếu đã làm quen với react, react native chắc hẳn bạn đã quen thuộc với việc kiểm tra sự thay đổi của props, state để cho phép render lại view. Tuy nhiên đối với những dự án lớn, cấu trúc của state, props rất lớn và phức tạp, đây sẽ là function giúp bạn debug xem properties nào đang thay đổi.

```
private difference = (object: any, base: any) => {
    function changes(object: any, base: any) {
        return _.transform(object, function(result: any, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
};
```

Cùng xem ví dụ nhé:

```
let oldObject = {
    p1: 1,
    p2: {
        p2_1: 2,
        p2_2: 3,
    }
}

let newObject = {
    p1: 5,
    p2: {
        p2_1: 4,
        p2_2: 3,
    }
}

difference(newObject, oldObject); // => { p1: 5, p2_1: 4 }
```

Trên đây là 1 số function có thể sẽ hữu ích với bạn, có thể nó sẽ chưa đúng trong 1 số trường hợp, nếu có đóng góp gì để cái tiến chúng, Please comment below!!!