Javascript thật quyễn rũ, càng ngày càng có nhiều người học js cũng như càng ngày càng có nhiêu nguồn tài nguyên giúp cho việc học js dễ dàng hơn. Tuy nhiên Javascript lại hơi đỏng đảnh và đôi khi để hiểu hết hoặc tận dụng tốt các tính năng của js không phải điều dễ dàng.
Hôm nay chúng ta sẽ cùng tìm hiểu về một thứ rất phổ biến và quan trọng trong javascript, đó là `this`

Trong javascript, các hàm callback thường được truyền đi nhiều nơi và thường được thực thi tại một thời điểm cũng như ngữ cảnh khác mà nơi nó được định nghĩa hoặc gọi. Việc biết được chi tiết về ngữ cảnh gọi hàm là điều rất quan trọng. `This` là nơi mà `caller` và `context` được lưu trữ, cung cấp cho chúng ta những thông tin và công cụ để có thể làm việc hiệu quả hơn. Hiểu rõ về `this` giúp chúng ta có cái nhìn toàn diện hơn về javascript và tránh được những rắc rối đến từ những lắt léo về ngữ cảnh trong ngôn ngữ này.

## Quy luật của `this`

`this` là một keyword đặc biệt đại diện cho object mà tại đó phương thức hiện tại được gọi.
Như chúng ta đều biết, function trong js được pass qua lại rất nhiều nơi và tại nhiều thời điểm khác nhau; chính vì thế nên đôi khi bạn sẽ không thể biết được function của mình đang được gọi tại đâu, do `ai` hay gọi vào thời điểm nào. Chính điểm này khiến cho việc làm việc với `this` trở nên vô cùng thú vị (cũng không kém phần khó khăn :D )

Bạn có thể tưởng tượng `this` như là một tham số mở rộng và nó có sẵn tại tất cả các lời gọi `function`, tham số mà bạn không cần phải truyền vào, nó mặc định luôn tồn tại trong hàm (trừ arrow function).

Sự nhầm tưởng rằng `this` bị phụ thuộc vào "where a function lives in the code." khiến chúng ta phải nhìn lại một cách cẩn thận về việc `this` là gì hay tính chất của nó thế nào. Nhiều người khi mới học js thường để ý vào phần implement của function hoặc nhìn vào object để phán đoán xem `this` là gì. Cách làm này gây ra rắc rối bởi vì cách này chỉ cho thấy được cách mà function hoạt động chứ không thể hiện được bản chất và tính chất của `this`. Đôi khi, một object có thể được kế thừa từ một object khác; mặt khác chúng ta cũng thường xuyên làm phép `gán` một action nào đó cho một `object` cho trước. Điều này khiến cho việc có được hình dung bao quát về this không hề dễ.

### Lưu ý một chút về `this`
+ Khi bạn gọi một method được define trên một object, ví dụ `myObject.foo()` thì `this` chính là `myObject`
+ Khi bạn define một function trong global namespace (không có parent object), ví dụ `function foo() {}`. Trong trường hợp này thì thực tế `foo` vẫn có parent object, đó là `window object`. Điều này có nghĩa là khi bạn gọi `foo()` thì giá trị của `this` chính là `window`
+ Cần chú ý thêm về khả năng modify `this` của `call` và `apply`

### Một số ví dụ
chúng ta sẽ define function `foo()` tong global namespace, sau đó sẽ đặt foo trong namespace của object `myObj`, cùng xem giá trị của this sẽ như thế nào nhé
```
function foo(){
    console.log( this );
}

var myObj = {
    myFunc: foo
}

myObj.myFunc();
// => Object {myFunc: function}

foo();
// => Window {top: Window, window: Window, location: Location, ...}
```

![](https://images.viblo.asia/0c0e8bc0-60c4-47b5-ae07-f80ca0f7a874.png)

như bạn có thể thấy từ console, kết quả của `this` trong hai lời gọi hoàn toàn khác nhau, mặc dù nó cùng đến từ một function, lý do ở đây là namespace trong mỗi lần gọi hàm là khác nhau. Nói cách khác thì `caller` của hai lần gọi là khác nhau

## Sử dụng `call` và `apply` để thiết lập `this`

Nếu bạn sử dụng `call` hoặc `apply`. cả 2 functions này sẽ cho phép bạn thay đổi giá trị của this khi gọi hàm.

Như mình đã nói ở trên, chúng ta có thể coi `this` như một tham số mở rộng và luôn có sẵn để dùng trong các hàm (trừ arrow function), tham số này được coi là bị ẩn bởi vì chúng ta không hề truyền tham số này khi gọi hàm, điều này cũng gây ra khó khăn khi chúng ta cần thay đổi hoặc set thủ công giá trị của this. Với `call` và `apply` thì khác, lúc này `this` có thể được định nghĩa bằng cách thiết lập tham số đầu tiên của `call` và `apply`

### Ví dụ:
```
// Không set giá trị để thay đổi `this`
foo.call();
// => Window {top: Window, window: Window, location: Location, external: Object, chrome: Object…}

// apply cho kết quả tương tự
foo.apply();
// => Window {top: Window, window: Window, location: Location, external: Object, chrome: Object…}

// tiếp theo chúng ta sẽ truyền vào tham số để thay đổi giá trị của `this`

var someOtherObj = { "hello": "world" };
foo.call(someOtherObj);
// => Object {hello: "world"}
// lúc này giá trị của `this` đã được đổi thành `Object {hello: "world"}`
```

![](https://images.viblo.asia/69e18162-fcba-4e58-8f0b-287e77e5a158.png)

như bạn đã thấy thì chúng ta có thể dùng `call` và `apply` để thay đổi giá trị của `this`, nói một cách khác thì chúng ta đã "nói với `foo` rằng nó đã được gọi bởi `someOtherObj` (mặc dù thực tế không phải vậy :D ). Bạn có thể thắc mắc rằng tại sao lại phải nói với `foo` rằng nó được gọi bởi `someOtherObj` trong khi thực tế không phải vậy? Điều này liên quan đến việc sử dụng hàm callback trong thực tế, các hàm này thường được gọi bất đồng bộ và trả qua rất nhiều tầng, pass đi khắp nơi trong cả project, lúc đó để xác định được `caller` và `this` là điều không dễ dàng, đôi khi bạn sẽ gặp phải trường hợp cần dùng đến `this`, nhưng tại thời điểm cần dùng thí `this` đó đã không còn là `this` mà bạn tưởng tượng và định nghĩa ngay từ đầu nữa.

## `Call` với `Apply`
trong thực tế, gần như không có sự khác biệt giữa `call` và `apply`, bạn có thể dùng cách nào cũng được. Chỉ có một sự khác biệt nhỏ giữa 2 cách này, đó là ngoài tham số đầu tiên thì`call` nhận vào một danh sách các tham số (phân cách bởi dấu , ) còn `apply` nhận các tham số còn lại từ một mảng

```
foo.call( valueOfThis, arg1, arg2, arg3 ...)
foo.apply( valueOfthis, [ arg1, arg2, arg3 ...] )
```

## ES6 Arrow Functions
Trong Arrow function thì this không còn tồn tại, khi chúng ta dùng `this` trong arrow function thì chính là đang dùng `this` của parent object. Việc loại bỏ đi `this` trong arrow function giúp chúng ta loại bỏ đi phiền toái của việc nhầm lẫn giá trị và cách dùng của `this`

```
let junkBag ={
  junk: [1,"gold",true],
  treasure: [],
  sortJunk: function() {
    this.junk.forEach(function (item, index) {
      if (item == "gold") {
        this.junk.splice(index, 1)
        this.treasure.push(item)
      }
    })
  }
}

junkBag.sortJunk()
console.log(junkBag.treasure)
console.log(junkBag.junk)
```
khi bạn thực thi code trên, bạn sẽ gặp lỗi `TypeError: undefined is not an object (evaluating 'this.junk.splice')`
lý do bởi vì function được pass vào trong `forEach` có context là `global namespace`, `this` khi đó chính là `window` và bạn không thể access được vào `junk` nữa.

Với arrow function thì khác, context bên trong hàm được truyền vào forEach không bị thay đổi nữa, bất kỳ lời gọi đến `this` nào cũng sẽ được dùng từ parent object

```
let junkBag ={
  junk: [1,"gold",true],
  treasure: [],
  sortJunk: function() {
    // Here comes the arrow function.
    // Notice that we need an extra set
    // of parentheses now that we have
    // two arguments.
    this.junk.forEach((item, index) => {
      if (item == "gold") {
        this.junk.splice(index, 1)
        this.treasure.push(item)
      }
    })
  }
}

junkBag.sortJunk()
console.log(junkBag.treasure)
console.log(junkBag.junk)
```

Hiểu thêm về `this` (hay `calling context`) mang lại cho chúng ta một lợi thế không hề nhỏ, chúng ta có thể không biết được chính xác context đã thay đổi thế nào khi code chạy, nhưng chúng ta có thể ngăn cản việc sử dụng sai `this` khi context thay đổi (bằng cách sử dụng `arrow function` hoặc `call`, `apply`)

## Tham khảo
https://zellwk.com/blog/this/
https://github.com/getify/You-Dont-Know-JS/tree/master/this%20%26%20object%20prototypes
https://www.vikingcodeschool.com/falling-in-love-with-javascript/basic-syntax-this