# `JavaScript Decorator`
Iterators, generators and array comprehensions là những function làm Javascript và Python trở nên tương đồng nhau hơn bao giờ hết. Decorator là một trong những điều thú vị ấy. 

Proposal: `Next Pythonic proposal for ECMAScript — Decorators, by Yehuda Katz.`


![](https://images.viblo.asia/0eb5f869-50a8-4b12-8d97-a56ae17a82a4.png)
<Br/><Br/>
## The Decorator Pattern
Một decorator là một function nhân một function khác làm đầu vào và mở rộng các khả năng của function sau đó mà không chỉnh sửa nó một cách rõ ràng. ES2016 decorator nhận vào các params tarrget, name, property descriptor. Decorator có thể dùng để định nghĩa cho class hay property class

```js
class Cat {
    @readonly
    meow() {
        return ' Says Meow!'
    }
}
```

Tưởng tượng rằng chúng ta đang muốn ép buộc meow chỉ có thể gọi ra mà không thể thay đổi hay replace nó. Decorator @readonly giúp ta làm được điều đó.

```js
function readonly(target, key, descriptor) {
    descriptor.writable = false
}
```

Bây giờ hãy thử kiểm chúng
```js
var cat = new Cat()
cat.meow = () => 'haha'
cat.meow() // kết quả vẫn là Say Meow!
// TypeError: Cannot assign to read only property 'meow' of object '#<Example>'
```

## Tại sao nên sử dụng decorator
Các cách viết trên có thể viết bằng các hàm cơ bản có sẵn mà JavaScript đã cung cấp. Nhưng việc làm như này gây nhiều khó khăn hơn khi sử dụng cùng một kỹ thuật lên code
Decorator có syntax ngắn gọn và dễ hiểu hơn

Hiện tại, decorator chỉ support trên các class và properties, methods của class.
Bây giờ thử với một  decorator thú vị hơn. @log giúp show tất cả các đầu vào, đầu ra của method một class
```js
function log(target, name, descriptor) {
  const original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function(...args) {
      console.log(`Arguments: ${args}`);
      try {
        const result = original.apply(this, args);
        console.log(`Result: ${result}`);
        return result;
      } catch (e) {
        console.log(`Error: ${e}`);
        throw e;
      }
    }
  }
  return descriptor;
}
```

Kết quả. Bạn có thể thấy cũ pháp khá là thú vị. Thay vì việc viết console.log tẻ nhạt thì với decorator, mỗi việc trở nên lạ lẫm, khả năng reuseable cho code cao hơn.
```js
class Example {
  @log
  sum(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2);
// Arguments: 1,2
// Result: 3
```

Bây giờ thử ứng dụng vào với React thì sao? Hàm connext của redux nhận param mapStateToProps, mapDispatchToProps để kết nối store với component, trả về 1 function nhận vào một Component và trả về Component được được kết nối với store.
```js
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);

@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```

## Kết luận
Decorator cung cấp một cách rất tốt để đóng gói mã bên trong một function. Điều này giúp code viết một lần và dùng lại rất nhiều nơi theo cách thể hiện rất rõ ràng và dễ hiểu.

Lưu ý: Decorator chỉ hoạt động khi được hỗ trợ transpilation với `babel-plugin-transform-decorators-legacy`

### `References`
1. https://www.sitepoint.com/javascript-decorators-what-they-are/
1. https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841