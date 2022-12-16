Hello các bạn, trong bài viết này mình sẽ chia sẻ 5 cách khai báo để code của bạn loại bỏ các câu lệnh if/else không cần thiết.
* Default parameters
* Or (||) operator
* nullish coalescing
* optional chaining
* no-else-returns and guard clauses
#### 1. Default parameters
Chắc hẳn bạn biết cảm giác khi làm việc với API không thống nhất và code của bạn bị error vì một số giá trị không được xác đinh ``undefined``

```
let sumFunctionThatMayBreak = (a, b, inconsistentParameter) => a+b+inconsistentParameter

sumFunctionThatMayBreak(1,39,2) // => 42
sumFunctionThatMayBreak(2,40, undefined) // => NaN
```
Mình thấy rằng nhiều developer sẽ xử lí trường hợp trên bằng câu lệnh if/else
```
 let sumFunctionWithIf = (a, b, inconsistentParameter) => {
    if (inconsistentParameter === undefined){
      return a+b
    } else {
     return a+b+inconsistentParameter
    }
}

sumFunctionWithIf(1,39,2) // => 42
sumFunctionWithIf(2,40, undefined) // => 42
```
Bạn hoàn toàn có thể làm vậy, nhưng hãy đơn giản hoá hàm trên và loại bỏ câu lện if/else để code của bạn trông ``sạch`` hơn.
```
 let simplifiedSumFunction = (a, b, inconsistentParameter = 0) => a+b+inconsistentParameter

simplifiedSumFunction(1, 39, 2) // => 42
simplifiedSumFunction(2, 40, undefined) // => 42
```
#### 2. OR operator
Với ví dụ trên, không phải lúc nào cũng giải quyết được bằng cách truyền tham số mặc định. Đôi khi, bạn sẽ gặp các tình cần sử dụng logic if-else, đặc biệt khi xây dựng tính năng có điều kiện. Trong trường hợp này, vấn đề được giải quyết theo cách sau:
```
let sumFunctionWithIf = (a, b, inconsistentParameter) => {
    if (inconsistentParameter === undefined || inconsistentParameter === null || inconsistentParameter === false){
      return a+b
    } else {
     return a+b+inconsistentParameter
    }
}

sumFunctionWithIf(1, 39, 2) // => 42
sumFunctionWithIf(2, 40, undefined) // => 42
sumFunctionWithIf(2, 40, null) // => 42
sumFunctionWithIf(2, 40, false) // => 42
sumFunctionWithIf(2, 40, 0) // => 42
/// But:
sumFunctionWithIf(1, 39, '') // => "40"
```
hoặc bằng cách này:
```
 let sumFunctionWithTernary = (a, b, inconsistentParameter) => {
    inconsistentParameter = !!inconsistentParameter ? inconsistentParameter : 0
    return a+b+inconsistentParameter
}

sumFunctionWithTernary(1,39,2) // => 42
sumFunctionWithTernary(2, 40, undefined) // => 42
sumFunctionWithTernary(2, 40, null) // => 42
sumFunctionWithTernary(2, 40, false) // => 42
sumFunctionWithTernary(1, 39, '') // => 42
sumFunctionWithTernary(2, 40, 0) // => 42
```
Tuy nhiên, bạn có thể đơn giản hoá nó hơn nữa bằng cách sử dụng toán tử OR (||) theo follow sau:
* Nó sẽ trả về vế bên phải (||) khi vế bên trái (||) là giá trị ``falsey``
* Và trả về vế bên trái (||) nếu nó là ``truthy``
```
  let sumFunctionWithOr = (a, b, inconsistentParameter) => {
    inconsistentParameter = inconsistentParameter ?? 0
    return a+b+inconsistentParameter
}

sumFunctionWithOr(1,39,2) // => 42
sumFunctionWithOr(2,40, undefined) // => 42
sumFunctionWithOr(2,40, null) // => 42
sumFunctionWithOr(2,40, false) // => 42
sumFunctionWithOr(2,40, '') // => 42
sumFunctionWithOr(2, 40, 0) // => 42
```
#### 3. Nullish coalescing
Tuy nhiên, đôi khi bạn muốn giữ số ``0`` hoặc giá trị rỗng ``""`` làm tham số hợp lệ và bạn không thể làm điều đó với toán tử ``||`` như ví dụ trên. May thay, Javascript đã cho chúng ta sử dụng toán tử ``??`` (nullish coalescing) chỉ trả về giá trị bên phải ``??`` khi phía bên trái ``??`` là ``null`` hoặc ``undefined``. Điều đó có nghĩa nếu tham số truyền vào của hàm là ``0`` hoặc ``""`` nó sẽ được thực hiện như vậy.
```
  let sumFunctionWithNullish = (a, b, inconsistentParameter) => {
    inconsistentParameter = inconsistentParameter ?? 0.424242
    return a+b+inconsistentParameter
}

sumFunctionWithNullish(2, 40, undefined) // => 42.424242
sumFunctionWithNullish(2, 40, null) // => 42.424242
///  but:
sumFunctionWithNullish(1, 39, 2) // => 42
sumFunctionWithNullish(2, 40, false) // => 42
sumFunctionWithNullish(2, 40, '') // => "42"
sumFunctionWithNullish(2, 40, 0) // => 42
```
#### 4. Optional chaining
Cuối cùng, khi mà cấu trúc dữ liệu không nhất quán, bạn không chắc rằng có tồn tại ``key`` trong dữ liệu.
```
  let functionThatBreaks = (object) => {
    return object.name.firstName
  }

  functionThatBreaks({name: {firstName: "Sylwia", lasName: "Vargas"}, id:1}) // "Sylwia" 
  functionThatBreaks({id:2}) //  Uncaught TypeError: Cannot read property 'firstName' of undefined 
```
Điều này xảy ra vì ``object.name`` là ``undefined`` nên không thể gọi ``firstname``.
Nhiều người xử lí theo cách sau:
```
 let functionWithIf = (object) => {
    if (object && object.name && object.name.firstName) {
      return object.name.firstName
    }
  }

  functionWithIf({name: {firstName: "Sylwia", lasName: "Vargas"}, id:1) // "Sylwia"
  functionWithIf({name: {lasName: "Vargas"}, id:2}) // undefined
  functionWithIf({id:3}) // undefined
  functionWithIf() // undefined
```
Tuy nhiên, bạn có thể đơn giản hoá điều trên với tính năng mới của ECMA2020 JS : ``optional chaining``. Nó kiểm tra ở mỗi bước xem giá trị trả về có không được xác định hay không và nếu có, nó chỉ trả về giá trị đó thay vì đưa ra lỗi.
```
  let functionWithChaining = (object) => object?.name?.firstName 

  functionWithChaining({name: {firstName: "Sylwia", lasName: "Vargas"}, id:1}) // "Sylwia"
  functionWithChaining({name: {lasName: "Vargas"}, id:2}) // undefined
  functionWithChaining({id:3}) // undefined
  functionWithChaining() // undefined
```
#### 5. No-else-returns and guard clauses
Cách cuối cùng cho các câu lện if-else, đặc biệt là các câu lệnh lồng nhau là ``no-else-return`` và ``guard clause``.
```
  let nestedIfElseHell = (str) => {
    if (typeof str == "string"){
      if (str.length > 1) {
        return str.slice(0,-1)
      } else {
        return null
      }
    } else { 
      return null
    }
  }

nestedIfElseHell("") // => null 
nestedIfElseHell("h") // => null
nestedIfElseHell("hello!") // => "hello"
```
* no-else-return
```
  let noElseReturns = (str) => {
    if (typeof str == "string"){
      if (str.length > 1) {
        return str.slice(0,-1)
      }
    }

    return null
  }

noElseReturns("") // => null 
noElseReturns("h") // => null
```
Lợi ích của câu lệnh ``no-else-return`` là nếu điều kiện không được đáp ứng, hàm sẽ kết thúc việc thực thi if-else và chuyển sang dòng tiếp theo. Bạn thậm chí có thể làm mà không có dòng cuối cùng (trả về null) và sau đó trả về sẽ không được xác định.
* guard clauses
```
let guardClauseFun = (str) => {
    //  first guard: check the type
    if (typeof str !== "string") return null
    // second guard: check for the length
    if (str.length <= 3) console.warn("your string should be at least 3 characters long and its length is", str.length) 
    // otherwise:
    return str.slice(0,-1)
  }

guardClauseFun(5) // => null 
guardClauseFun("h") // => undefined with a warning
guardClauseFun("hello!") // => "hello"
```
Trên đây là bài chia sẽ về 5 cách tối ưu cho câu lệnh if-else trong JS, cảm ơn các bạn đã quan tâm theo dõi. 

Bài viết có tham khảo tại :  [refactor if/else statements in js function](https://dev.to/sylwiavargas/5-ways-to-refactor-if-else-statements-in-js-functions-208e)