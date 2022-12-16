## Đặt vấn đề
Chẳng khó gì với các `developers JS`  để biết rằng việc cập nhật `DOM` của đại đa số các `front-end frameworks/library` hiện nay sẽ được thực hiện mỗi khi có một `model` nào đó thay đổi. Và dĩ nhiên, `Angular` cũng không phải trường hợp ngoại lệ 😄😄.

<br/>
Cụ thể, giả sử chúng ta có đoạn code như thế này:

```html
<span>Hello {{name}}</span>
// hay
<span [textContent]="'Hello ' + name"></span>
```
và bằng một cách kì diệu nào đó, `Angular` sẽ update `DOM` mỗi khi *`name`* *property* thay đổi giá trị. Điều này nghiễm như hiển nhiên nếu quan sát bên ngoài nhưng thật sự nó là cả một quá trình phức tạp ở bên trong. `DOM updates` là một trong những bước trong các cơ chế **`change detection`** của `Angular`.

`Change detection` thường có 3 giai đoạn chính:
1. Cập nhật `DOM`
2. Các components con cập nhật `@Input()` bindings
3. Cập nhật các truy vấn

Trong bài viết này, chúng ta sẽ tìm hiểu `DOM updates` trong cơ chế `change detection` nhé.

![](https://i.pinimg.com/originals/00/11/62/0011622ff5834b5490ea6634f2710182.gif)

## Application internal representation
Trước khi bắt đầu tìm hiểu vào vấn đề chính, đầu tiên chúng ta cần phải hiểu cách một app `Angular` được thể hiện cơ bản như thế nào. 

Cùng nhau điểm qua:

### View
Mỗi `component` được sử dụng trong App được trình biên dịch của `Angular` (`Angular compiler`) tạo ra một `factory` dạng:
```ts
const factory = r.resolveComponentFactory(AComponent);
factory.create(injector);
```
`Angular` sẽ sử dụng `factory` này để khởi tạo `View Definition` - cái được dùng để tạo ra `View` cho `component`.

> Mỗi `view` của `component` có duy nhất một `instance` cho các `view definition`. Ngoại trừ các `component` được nằm ở một `view` riêng biệt.

### Factory
`Factory` chủ yếu bao gồm tập hợp các `view nodes` được `generate` bởi trình biên dịch sau khi qua quá trình **`template parsing`**.

Giả sử rằng `component` của bạn có `template` như này:
```html
<span>I am {{name}}</span>
```
Từ đoạn `template` trên, `compiler` sẽ `generate` ra `factory` :
```ts
function View_AComponent_0(l) {
    return jit_viewDef1(0,
        [
          jit_elementDef2(0,null,null,1,'span',...),
          jit_textDef3(null,['I am ',...])
        ], 
        null,
        function(_ck,_v) {
            var _co = _v.component;
            var currVal_0 = _co.name;
            _ck(_v,1,0,currVal_0);
```
Bình tĩnh và lướt mắt qua đoạn `code` trên một lần nữa nếu bạn đang cảm thấy hơi rối một chút nhé. `View_AComponent_0()` mô tả cấu trúc của `component view` và được dùng khi khởi tạo `component`. `jit_viewDef1` là một tham chiếu tới `viewDef` - một hàm tạo ra `view definition`.


>  `View definition` sẽ nhận được một `params` các `view definition nodes`  - một dạng tương tự với cấu trúc trong các `DOM nodes` nhưng chứa thêm một số các đặc tả thêm của `Angular`.

<br/>

Trong ví dụ trên, node `jit_elementDef2`*(node đầu tiên)* là dạng **`element definition`** và node `jit_textDef3`*(node thứ hai)* là dạng **`text definition`**.
`Angular compiler` `generate` nhiều `node definitions` khác nhau cùng với loại `node` (được đặt trong `NodeFlags`).

`NodeFlags` được mô tả đơn giản hóa như thế này:

```js
export const enum NodeFlags {
    TypeElement = 1 << 0, 
    TypeText = 1 << 1
```
Ta sẽ tìm hiểu thêm về 2 loại `node`: **`Element node`** vs. **`Text node`** 

#### Element definition
`Element definition` được định nghĩa như sau:
<br/>

> `Element definition` is a node that `Angular` generates for every `html` element.

<br/>

Loại `element` này cũng được `generate` cho các `components`. Một `element node` có thể chứa các  `element nodes` hoặc một `text definition nodes` khác (`node` lúc này có thêm một `property` là `childCount`).

Tất cả các `element definitions` được `generate` bởi  `elementDef()` nên `jit_elementDef2()` được dùng trong `factory` tham chiếu tới hàm này.

Các tham số mà `element definition` có thể nhận *(trong khuôn khổ bài viết này chúng ta chỉ cần chú ý tới bindings param)*:

| Name | Description |
| -------- | -------- |
| `childCount`     | node có bao nhiêu node con     |
| `namespaceAndName`     | tên của phần tử html    |
| `fixedAttrs`     | các attributes được định nghĩa trong element     |
| `matchedQueriesDsl`     | dùng khi truy vẫn các node con |
| `ngContentIndex` | used for node projection |
| **`bindings`** | **dùng cho DOM và cập nhật các properties liên quan** |
| `outputs`, `handleEvent` | dùng cho các `event propagation`  |

#### Text definition
`Text definition` được định nghĩa như sau:
<br/>
> `Text definition` is a `node definition` that `Angular` compiler generates for every text node

<br/>

Theo ví dụ trên, `node definition` được `generate` bởi `textDef()`. Ở tham số thứ 2, nó nhận một dạng `parsed expressions` kiểu hằng số (`constance`).

Cùng xét một ví dụ khác:
```html
<h1>Hello {{name}} and another {{prop}}</h1>
```
sẽ được chuyển thành một mảng:
```ts
["Hello ", " and another ", ""]
```

sau đó, `Angular compiler` sẽ `generate` thành các `bindings` :
```json
{
  text: 'Hello',
  bindings: [
    {
      name: 'name',
      suffix: ' and another '
    },
    {
      name: 'prop',
      suffix: ''
    }
  ]
}
```

và các tính toán chẳng hạn như văn bản từ trường nhập đã `dirty`,...:
```ts
text
+ context[bindings[0][property]] + context[bindings[0][suffix]]
+ context[bindings[1][property]] + context[bindings[1][suffix]]
```

### Node definition bindings
`Angular` dùng các phương thức `binding` để định nghĩa các `dependencies` của mỗi `node` thông qua `properties` của `components` đó.

Trong quá trình `change detection`, mỗi `binding` xác định một kiểu `operation` mà `Angular` thường dùng để `update nodes` kèm một `context information` tương ứng.

Việc `Angular` sử dụng kiểu `operation` nào được xác định qua `binding flags`:
| Name | Trong template |
| -------- | -------- |
| `TypeElementAttribute`       | attr.name      |
| `TypeElementClass`     | class.name    |
| `TypeElementStyle`       | style.name  |
<br/>


`Element/Text definitions` tạo các `binding` nội trong `component` dựa trên `binding flags` này. Mỗi node có một logic riêng biệt để có những thay đổi khác nhau 😃😃
## Update renderer
Điều đáng thú vị là hàm phía cuối `factory` - `View_AComponent_0()`:
```ts
// update renderer
function(_ck,_v) {
    var _co = _v.component;
    var currVal_0 = _co.name;
    _ck(_v,1,0,currVal_0);
```

`View_AComponent_0()` nhận 2 tham số `(_ck, _v)`:
-  `_ck`: kiểm tra và tham chiếu tới `prodCheckAndUpdate()`
-  `_v`: view của components


Hàm `updateRenderer` này sẽ được thực thi mỗi khi `Angular` phát hiện ra `change detection` đối với một `component` và `params` truyền vào hàm được thực hiện bởi `change detection mechanism`.


> Chức năng chính của `updateRenderer()` là lấy được giá trị hiện tại của giá trị `property` của `component instance` và gọi hàm `_ck` được truyền theo `view`, `node index` và giá trị vừa nhận được. 
> 
<br/>

`Angular` thực hiện cập nhật `DOM` cho mỗi `view node` một cách độc lập -  lý do mà tham số  `node index` yêu cầu bắt buộc trong `_ck()`:
```ts
function prodCheckAndUpdateNode(
    view: ViewData, 
    nodeIndex: number, 
    argStyle: ArgumentType, 
    v0?: any, 
    v1?: any, 
    v2?: any,
 ```

Tham số `nodeIndex` là thứ tự của `view node` mà `change detection` phát hiện ra.

Giả sử bạn có nhiều `expressions` trong `template`:
```html
<h1>Hello {{name}}</h1>
<h1>Hello {{age}}</h1>
```
`Compiler` sẽ `generate` theo nội dung của hàm `updateRenderer()`:
```ts
var _co = _v.component;

// here node index is 1 and property is `name`
var currVal_0 = _co.name;
_ck(_v,1,0,currVal_0);

// here node index is 4 and bound property is `age`
var currVal_1 = _co.age;
_ck(_v,4,0,currVal_1);
```

## Updating the DOM
Chúng ta đã biết tất cả các kiểu đối tượng cụ thể mà trình `Angular compiler` tạo ra, từ đó có thể khám phá cách cập nhật `actual DOM` được thực hiện bằng cách dùng các đối tượng này.

Ở phía trên, `updateRenderer()` được truyền hàm `_ck` khi `change detection` xảy ra và tham số này sẽ tham chiếu tới `prodCheckAndUpdate()`. Cuối cùng thì hàm đó sẽ thực thi `checkAndUpdateNodeInline()`.

Hàm `checkAndUpdateNode()` chỉ là một bộ định tuyến phân biệt giữa các loại view nodes, sau đó kiểm tra và cập nhật các hàm tương ứng:

```js
case NodeFlags.TypeElement   -> checkAndUpdateElementInline
case NodeFlags.TypeText      -> checkAndUpdateTextInline
case NodeFlags.TypeDirective -> checkAndUpdateDirectiveInline
```

### Type Element
Hàm `CheckAndUpdateElement()` thường kiểm tra xem các `binding-events` `[attr.name, class.name, style.some]`  hay một vài cái properties đặc biệt.
```js
case BindingFlags.TypeElementAttribute -> setElementAttribute
case BindingFlags.TypeElementClass     -> setElementClass
case BindingFlags.TypeElementStyle     -> setElementStyle
case BindingFlags.TypeProperty         -> setElementProperty;
```

Sau đó nó chỉ đơn giản thực hiện phương thức `render()` để thay đổi các `nodes`.

### Type Text
Hàm `CheckAndUpdateText()` được sử dụng trong đa số các trường hợp, nội dung hàm này về cơ bản:
```js
if (checkAndUpdateBinding(view, nodeDef, bindingIndex, newValue)) {
    value = text + _addInterpolationPart(...);
    view.renderer.setValue(DOMNode, value);
}
```

Về cơ bản, `CheckAndUpdateText()` lấy giá trị hiện tại được truyền từ  `updateRenderer()` và so sánh nó với giá trị trước đó. `View` sẽ giữ các giá trị cũ trong thuộc tính `oldValues`. Nếu giá trị thay đổi, `Angular` sử dụng giá trị được cập nhật để tạo nên một chuỗi và cập nhật `DOM` qua `renderer()`.
## Kết luận
Chủ đề `Angular compiler` update `DOM` có thể khá rối một chút nhưng cá nhân mình nghĩ nó vô cùng cần thiết đối với một `developer` "hịn" đúng không nào 😺😺 nên chúng mình cố gắng đào sâu nhé 😸😸. Có thể sẽ dễ hiểu hơn khi bạn mở laptop lên, thực hành tạo ngay một `application` đơn giản theo `logic` bài viết, sau đó thì hãy `debug` lên và cảm nhận nó :D  :D 

Cảm ơn các bạn đã đọc bài viết của mình. Ủng hộ mình một `upvote` để có động lực cho bài viết tiếp theo nhé ! <br/>
Xem thêm các bài viết về Technical tại [đây](https://haodev.wordpress.com/)  ^^ 

Chúc bạn một ngày làm việc hiệu quả !

![](https://media1.tenor.com/images/71ac9021fbdb5f2929adb2485d1bb814/tenor.gif?itemid=5616715)

*Reference: [Angular In Depth](https://blog.angularindepth.com/the-mechanics-of-dom-updates-in-angular-3b2970d5c03d)*