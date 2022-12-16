Mỗi ngôn ngữ lập trình đều có cung cấp những kiểu dữ liệu tương ứng. Trong Javascript cũng vậy, chúng ta có hai nhóm lớn là kiểu dữ liệu nguyên thủy và kiểu dữ liệu tham chiếu. Tương ứng chúng ta sẽ có các kiểu dữ liệu nguyên thủy như `string`, `number`, `boolean`, `null`, `undefined`, `symbol` và kiểu dữ liệu tham chiếu như `object`, `array`, `function`. Với mỗi kiểu dữ liệu sẽ có những đặc trưng riêng mà các kiểu khác không có. Vì thế mà nếu chúng ta không kiểm tra kỹ kiểu dữ liệu đầu vào của một hành động nào đó thì có khả năng code của chúng ta sẽ gây bug, thâm chí là làm crash cả hệ thống. Hôm nay chúng ta hãy cùng thử tìm hiểu một số `function` trong Javascript nhằm giảm thiểu việc này, giúp chúng ta luôn xác định được chính xác đầu vào của những xử lý của mình.

# I. Kiểm tra đầu vào đã được khai báo hay chưa?
Khi chúng ta viết một function dùng để xử lý một công việc nào đó. Việc kiểm tra biến đầu vào của function đã được khai báo hay chưa là một việc thực sự cần thiết. Để khi viết code chúng ta sẽ rẽ nhánh tương ứng cho trường hợp đã được khai báo và chưa được khai báo. Đồng thời khi có những dữ liệu đầu vào bất thường thì xử lý của chúng ta vẫn cho output như mong muốn thay vì gây bug hoặc crash.
```javascript
// Tại đây chúng ta định nghĩa một giá trị là được khai báo khi và chỉ khi
// giá trị đó khác `undefined` (được khởi tạo nhưng chưa được khai báo giá trị)
// và `null` (được hiểu là chưa được gán giá trị)

// Function này sẽ nhận tham số đầu vào là `value`
// và trả về một giá trị `boolean` cho biết
// tham số đầu vào `value` đã được khai báo hay chưa
// `true`  => Chưa được khai báo
// `false` => Đã được khai báo
function isUndefined(value) {
    return value === undefined || value === null
}

// Function này tương tự nhưng ngược lại so với function `isUndefined`
// Function này cũng nhận tham số đầu vào là `value`
// và trả về một giá trị `boolean` cho biết
// tham số đầu vào `value` đã được khai báo hay chưa
// `true`  => Đã được khai báo
// `false` => Chưa được khai báo
function isDefined(value) {
    return value !== undefined && value !== null
}

// Ở function này chúng ta sẽ đưa giá trị trả về
// theo hai hướng là `valid` và `invalid`
// Nếu `valid` thì sẽ trả về giá trị (hoặc tiếp tục xử lý)
// Nếu `invalid` thì ngững xử lý và trả về giá trị mặc định (hoặc trả về một cảnh báo)
function greeting(message) {
    const isInvalidMessage = isUndefined(message)
    // const isValidMessage = isDefined(message)

    if (isInvalidMessage) return 'Please define your message before greeting'
    // if (!isValidMessage) return 'Please define your message before greeting'
    
    return `Greetings! ${message}`
}
```
Việc kiểm tra việc khai báo của đầu vào sẽ giúp code của chúng ta hoạt động hiệu quả hơn với những trường hợp dữ liệu đầu vào bất thường. Nó còn giúp chúng ta chia xử lý dễ dàng hơn và khả năng xảy ra bug sẽ ít hơn.

Vì vậy chúng ta hãy chú ý kiểm tra kỹ càng việc khai báo đầu vào. Dù rằng chúng ta sẽ code nhiều hơn nhưng nó sẽ tiết kiệm được thời gian điều tra và xử lý bug sau này (nếu xử lý gặp phải bug).
# II. Kiểm tra kiểu dữ liệu đúng như mong muốn hay chưa?
Ở phần đầu tiên chúng ta đã có bước kiểm tra việc khai báo. Và nó đem lại hiệu quả cho cho đoạn code của chúng ta, giảm bớt bug cũng như là crash không mong muốn. Nhưng bên cạnh đó khi chúng ta viết một đoạn xử lý đều mong muốn nó hoạt động đúng. Vì vậy việc kiểm tra kiểu dữ liệu của đầu vào cũng là điều tiên quyết cần phải có để xử lý chạy đúng.
```javascript
// Đối với những kiểu nguyên thủy chúng ta sẽ cần dùng `typeof` để kiểm tra
// string - 'string'
// number - 'number'
// symbol - 'symbol'
// boolean - 'boolean'
// Đối với những kiểu tham chiếu khi dùng `typeof` kết quả sẽ đều là 'object'
// ngoại trừ function - 'function'

// Function này dùng để kiểm tra đầu vào của chúng ta
// có phải là kiểu nguyên thủy hay không
// `true` nếu giá trị là một trong 4 kiểu:
//  - `string`
//  - `number`
//  - `boolean`
//  - `symbol` (thường dùng để định danh key trong object)
// `false` nếu giá trị không thuộc 4 kiểu trên
// Note: Kiểu dữ liệu `undefined` và `null` sẽ không được đề cập
// vì 2 kiểu dữ liệu này dùng cho giá trị chưa được khai báo, gán giá trị
function isPrimitive (value) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

// Function này kiểm tra đầu vào của chúng ta
// có phải là một object hay không
// Một giá trị được xem là `object` khi:
//   - Kiểu dữ liệu là object
//   - Và cần được khai báo, gán giá trị
function isObject(object) {
  return object !== null && typeof object === 'object'
}

// Function này dùng để thêm một cặp `key, value`
// vào một object vì thế đầu vào `key` sẽ cần là kiểu nguyên thủy.
// và đầu vào `value` sẽ cần được khai báo giá trị
function addObjectKey(object, key, value) {
  if(isObject(object) && isPrimitive(key) && isDefined(value))
    object[key] = value
}
```
Ở trên là một số function dùng để kiểm tra kiểu dữ liệu nguyên thủy và kiểu tham chiếu (object). Tiếp đến hãy cùng đi thêm một số function kiểm tra kiểu dữ liệu khác.
```javascript
// Khai báo biến `toString` để lưu trữ
// function `toString` của Object
// Thường để tránh nhầm lẫn với những `key` khác khi thực thi trong một object
const toString = Object.prototype.toString;

// Function này sẽ trả về chính xác kiểu dữ liệu
// của một giá trị tham chiếu
// Ví dụ như `array` khi chúng ta dùng `typeof` thì sẽ là `object`
// nhưng khi áp dụng function này nó sẽ trả về `Array`
function getRawType(value) {
  return toString.call(value).slice(8, -1)
}

// Function này sẽ kiểm tra chặt chẽ hơn
// việc giá trị đầu vào là một `object` chứ không phải `array`
// hay là một kiểu dữ liệu like object
function isPlainObject (object) {
    return getRawType(object) === 'Object'
}

// Function này dùng để kiểm tra
// việc giá trị đầu vào là một biểu thức chính quy `RegExp`
function isRegExp (value) {
    return getRawType(value) === 'RegExp'
}

// Function này dùng để kiểm tra
// việc giá trị đầu vào là một `Promise`
// `Promise` có đặc điểm sẽ có function `then`, `catch`
function isPromise (value) {
    return (
        isDefined(value) &&
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
    // return getRawType(value) === 'Promise'
}
```
Chúng ta đã đi qua một số function giúp đảm bảo đầu vào của những xử lý được chính xác nhất, tạo hướng xử lý cho hướng trường hợp bất thường, giảm bug cũng như crash gặp phải.

Những hiệu quả nó mạng lại rất ổn vÌ vậy hãy áp dụng nó vào những đoạn code và kết hợp với `Unit test` nó sẽ giúp code của chúng ta được rõ ràng, minh bạch hơn và cover được nhiều nhất có thể các trường hợp bất thường.
# III. Kết luận
Vậy là bài viết của mình đến đây là hết rồi. Mong rằng nó dù ít nhưng cũng giúp các bạn một phần nào đó trong quá trình làm việc của mình. Trong bài sau chúng ta sẽ cùng đi đến một số function hữu ích khi làm việc với array cũng như một số thuật toàn thường dùng trong array. Cảm ơn các bạn đã đón đọc. Hẹn gặp lại trong bài viết tiếp theo. Xin chào!!!