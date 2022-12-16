# Symbol

Kể từ ES6, một primitive type mới đã được thêm vào JavaScript, đó là symbol. Không giống như các primitive type khác, symbol không có literal form.

Đây là cách mà ta tạo ra một symbol:
```
var sym = Symbol("some optional description");

typeof sym; // "symbol"
```

Cần lưu ý rằng:

- Ta không thể và không nên sử dụng `new` với `Symbol(..)`. Nó không phải là một constructor và về cơ bản thì chúng ta không phải đang tạo object.
- Biến truyền vào `Symbol(..)` là optional. Nếu truyền vào, nó nên là một string mô tả mục đích của symbol.
- `typeof` sẽ cho output là "symbol", đây thường là cách để ta xác định một giá trị là symbol.

Nếu ta truyền description vào thì nó sẽ được sử dụng làm string đại diện cho symbol:
```
sym.toString(); // "Symbol(some optional description)"
```

Tương tự như kiểu giá trị primitive string không phải là một instance của String, thì symbol cũng vậy. Nếu vì một lý do nào đó ta cần cấu trúc một boxed wrapper object cho một giá trị symbol, ta có thể làm như sau:
```
sym instanceof Symbol; // false

var symObj = Object(sym);
symObj instanceof Symbol; // true

symObj.valueOf() === sym; // true
```

> `symObj` trong đoạn code trên có thể hoán đổi với `sym`, cả hai dạng đều sử dụng như một symbol bình thường. Thường thì chả có lý do nào để sử dụng object form thay vì primitive form. Sẽ tốt hơn nếu ta giữ ở dạng đơn giản, phức tạp hóa lên làm gì cho mệt. 

Giá trị bên trong của một symbol được tham chiếu đến như tên của nó, nó được ẩn khỏi code và ta cũng không thể lấy giá trị này ra. Bạn có thể hình dung cái giá trị của symbol là một string được auto generated và unique (đối với app của bạn).

Nhưng nếu giá trị bị giấu đi và không thể lấy được thì mọc ra cái symbol này để làm gì?

Mục tiêu chính của symbol là tạo ra một giá trị dạng string mà không thể trùng với bất kì giá trị nào. Ví dụ, xem xét việc sử dụng một symbol như một constant thể hiện một event name như sau:
```
const EVT_LOGIN = Symbol("event.login");
```
Sau đó ta sử dụng `EVT_LOGIN` thay cho một generic string literal dạng "event.login":
```
evthub.listen(EVT_LOGIN, function() {
    // ..
});
```
Lợi ích có được ở đây là `EVT_LOGIN` giữ một giá trị mà không thể bị trùng bởi bất kì một giá trị nào khác, do đó ta sẽ không gặp phải bất cứ sự nhầm lẫn nào với các event đang được dispatch hay handle.

> Trong đoạn code trên, `evthub` được giả sử rằng nó sử dụng EVT_LOGIN để track event. Nếu `evthub` cần thiết phải sử dụng một giá trị String thực thì symbol không xài được đâu nhé. 

Bạn có thể sử dụng symbol trực tiếp như property name/key trong một object, giả dự kiểu một giá trị đặc biệt mà bạn muốn giấu đi khi sử dụng. 
Tuy nhiên điều quan trọng ta cần hiểu đó là nó không thực sự là một property bị ẩn, mà về cơ bản là ta có ý muốn thiết lập như vậy.

Xem xét module dưới implement một singleton pattern:
```
const INSTANCE = Symbol("instance");

function HappyFace() {
    if (HappyFace[INSTANCE]) return HappyFace[INSTANCE]'
    
    function smile() { .. }
    
    return HappyFace[INSTANCE] = {
        smile: smile
    };
}

var me = HappyFace(), you = HappyFace();

me === you;
```
Giá trị symbol INSTANCE ở đây là một property đặc biệt, gần như bị ẩn và được đặt một cách static trong HappyFace() function object.

Nó có thể thay thế là kiểu cũ như dạng `__instance` và behaviour vẫn sẽ giống hệt nhau. Tuy nhiên việc sử dụng symbol giúp cải thiện metaprogramming style, giữ cho `INSTANCE` property tách biệt với các property khác.

## Symbol Registry
Một nhược điểm nhỏ khi sử dụng symbol như trong một vài ví dụ trước là các biến `EVT_LOGIN` và `INSTANCE` phải được lưu ở outer scope (thậm chí có thể là global scope), hoặc bằng cách nào đó được lưu trữ ở một vị trí public và available, sao cho tất cả các phần code có sử dụng symbol có thể truy cập chúng.

Để tổ chức code với quyền truy cập vào các symbol này, bạn có thể tạo các giá trị symbol bằng *global symbol registry*. Ví dụ:
```
const EVT_LOGIN = Symbol.for("event.login");
console.log(EVT_LOGIN); // Symbol(event.login)
```
và
```
function HappyFace() {
    const INSTANCE = Symbol.for("instance");
    
    if (HappyFace[INSTANCE]) return HappyFace[INSTANCE];
    
    // ..
    
    return HappyFace[INSTANCE] = { .. };
}
```
`Symbol.for(..)` sẽ tìm kiếm global symbol registry để xem xem nếu một symbol đã được tạo ra với description tương ứng chưa, nếu chưa thì nó sẽ tạo ra một cái và trả về.

Và thế cũng có nghĩa là bất kỳ phần nào trong app của bạn cũng có thể nhận symbol sử registry `Symbol.for(..)` với chuỗi description đúng là được.

Trớ trêu là, symbol sinh ra nhằm để thay thế *magic string* trong app. Nhưng chính xác thì ta sử dụng `magic` description string để xác định symbol trong global symbol registry.

Để tránh việc trùng vô tình, bạn có thể muốn làm cho các symbol description của mình có tính duy nhất. Một cách khá dễ để làm điều này là thêm vào thông tin prefix/context/namespace vào.

Ví dụ
```
function extractValues(str) {
    var key = Symbol.for("extractValues.parse"),
        re = extractValues[key] || /[^=&]+?=([^&]+?)(?=&|$)/g,
        values = [],
        match;
    
    while (match = re.exec(str)) {
        values.push(match[1]);
    }
    
    return values;
}
```
Ta sử dụng "extractValues.parse" vì nó trông có vẻ như là sẽ chẳng có cái nào khác sẽ trùng.

Nếu ai đó muốn override lại parsing regex, họ có thể sử dụng symbol registry:
```
extractValues[Symbol.for("extractValues.parse")] = /..some pattern../g;
extractValues("..some string..");
```

Ngoài việc có được hỗ trợ từ symbol registry thì ta có thể thấy là chẳng có cái vẹo gì khác ở đây khi ta dùng trực tiếp "extractValues.parse" thay cho symbol. Cái này chủ yếu có lợi cho metaprogramming.

Một vài trường hợp ta có thể sử dụng symbol được lưu trong registry để xem xem description text được lưu kèm là gì. Ví dụ, ta cần báo hiệu cho một phần khác trong app của mình cách để xác định một symbol trong registry vì ta không thể truyền giá trị symbol.

Ta có thể nhận registered symbol's description text sử dụng `Symbol.keyFor(..)`:
```
var s = Symbol.for("something cool");

var desc = Symbol.keyFor(s);
console.log(desc); // "something cool"

// get the symbol from the registry again
var s2 = Symbol.for(desc);

s2 === s; // true
```

## Symbol as Object Properties
Nếu một symbol được sử dụng như một property/key của một object, nó được chứa theo một vài cách đặc biệt làm cho property không show ra khi ta sử dụng dạng enumeration thông thường của object's properties.
```
var o = {
    foo: 42,
    [Symbol("bar")]: "hello world",
    baz: true
};

Object.getOwnPropertyNames(o); // ["foo", "baz"]
```
Để lấy ra object's symbol properties:
```
Object.getOwnPropertySymbols(o); // [Symbol(bar)]
```
Thế nên ta hiểu rằng thực ra symbol không bị ẩn hay không thể truy cập, ta luôn có thể thấy nó trong `Object.getOwnPropertySymbols(..)` enumeration.

### Built-in Symbols
ES6 có một ít predefined built-in symbol cho thấy các hành vi meta của JavaScript object. Và một điều nữa là các built-in symbol này không được register vào global symbol registry.

Thay vào đó, JS lưu chúng ở dạng property của Symbol function object. Ví dụ như:
```
var a = [1, 2, 3];
a[Symbol.iterator]; // native function
```
Trong specs người ta sử dụng prefix là `@@` để tham chiếu đến built-in symbols, thông dụng có là: `@@iterator`, `@@toSringTag`, `@@toPrimitive`. Còn một vài cái nữa nhưng mà ít xài đến.

# Kết
Trên đây là một số kiến thức về Symbol trong ES6, hy vọng sẽ là một nguồn tham khảo hữu ích cho bạn đọc.

-----
*Dịch và tham khảo từ [You Don't Know JS - ES6 & Beyond](https://www.amazon.com/You-Dont-Know-JS-Beyond/dp/1491904240)*