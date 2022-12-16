## 1. Mở đầu
<hr>

Chào mừng các bạn đã quay lại với phần 2 của bài viết về `Reconciliation trong React`. Ở bài viết trước đó chúng ta ta tìm hiểu sơ lược về cách mà `React` thực hiện việc so sánh các `Element` trong `Virtual DOM Tree` cũ và mới. Trong bài này chúng ta sẽ tiếp tục nốt những phần còn lại về việc so sánh này. Trước khi bắt đầu với bài viết này các bạn hãy chắc rằng mình đã đọc bài viết phần 1 trước đó, còn nếu chưa thì các bạn có thể đọc ở [đây](https://viblo.asia/p/reconciliation-trong-react-p1-RQqKLOLO57z). Nào chúng ta cùng bắt đầu với phần 2.

## 2. Reconciliation trong React
<hr>

### c. Diff Algorithm (Reonciliation) ([continue](https://viblo.asia/p/reconciliation-trong-react-p1-RQqKLOLO57z#_c-diff-algorithm-reonciliation-4))

Nhắc lại 1 chút kiến thức ở phần trước về việc so sánh 2 `Virtual DOM Tree` là `React` sẽ cần đưa ra quyết định là tái sử dụng một `Element` dự vào `type` của nó như sau:
- `type` bị thay đổi -> tạo mới `Element`
    - Việc tạo mới `Element` sẽ dẫn đến toàn bộ trạng thái của `Element` đó cũng như trạng thái của các thành phần con trong `Element` đó bị loại bỏ và tạo lại mới hoàn toàn.
    - `React` sẽ bỏ qua việc so sánh các thành phần con này nếu `Element` cha bị tạo mới.
 - `type` giữ nguyên -> tái sử dụng `Element
     - Lúc này `Element` sẽ không bị xóa bỏ mà thay vào đó sẽ được tiếp tục sử dụng.
     - `React`sẽ tiếp tục so sánh các `Element` con ở bên trong theo quy tắc tương tự  cho đến khi đi hết toàn bộ phần `children`.
 
 Ngoài ra cách so sánh của `React` là sẽ là đem 2 phần tử có cùng vị trí (giống như index trong mảng) trong `Virtual DOM Tree` đem ra so sánh với nhau cho đến khi đi hết toàn bộ. Nếu `Element` đó có phần con thì sẽ đi vào trong phần con của `Element` này và so sánh giống như cách các phần từ trong mảng hai chiều. Trường hợp nếu `Virtual DOM Tree` cũ hoặc mới có ít `Element` hơn thì các chỗ thiếu đó sẽ được tính là `null`. Đó là toàn bộ những gì mà chúng ta đã nhắc đến trong bài viết trước đó. Để bắt đầu với nội dung của bài viết tiếp theo thì chúng ta sẽ đi đến với một ví dụ như sau:
 ```html
// Old
<div>
     <input />
<div>
    
// New
<div>
    <p>This is p tag</p>
   <input />
<div>
 ```
 Kịch bản đặt ra là mỗi khi chúng ta nhập nội dung vào thẻ `<input />` thì thẻ `<p>` ở phía trên đó sẽ xuất hiện. Bây giờ chúng ta sẽ đem những kiến thức mà ta đã học được ở phần trước đó và áp dụng vào ví dụ này để xem cách `React` so sánh hai `Virtual DOM Tree` cũ và mới này như sau:
 - Ở `Element` cha có `type` từ `div` -> `div` -> không tạo mới.
 - Đi vào trong các `Element` con ta có:
     - Ở vị trí đầu tiên ta có `type` từ `input` -> `p` -> tạo mới thẻ `<p>`.
     - Ở vị trí thứ hai thì trong `Virtual DOM Tree` cũ ít hơn `Virtaul DOM Tree` mới một phần tử nên như mình đã nói ở trên phần thiếu này sẽ được coi là `null` so sánh với `<input />` -> tạo mới thẻ `<input />`.

Như vậy là với những gì chúng ta tìm hiểu ở bài viết trước đó thì như vậy là toàn bộ quá trình `React` so sánh hai `Virtaul DOM Tree` cũ và mới. Tuy nhiên bạn có nhận ra vấn đề ở đây không :D ?. Nếu bạn còn nhớ thì như mình đã nói, khi một `Element` được xóa bỏ và tạo mới thì nó sẽ xảy ra việc `Element` đó sẽ bị mất đi toàn bộ trạng thái, ở đây sẽ bao gồm các trạng thái như việc khi ta `focus` vào ô `<input />` hay nội dung mà ta vừa nhập trong ô `<input />` sẽ bị biến mất và thay vào đó là 1 thẻ `<p>` được tạo ra cùng với một ô `<input />` mới toanh. Tuy nhiên trên thực tế thì cách mà chúng ta viết code trong `React` với trường hợp nói trên sẽ có dạng như sau:
```js
import React, { useState } from 'react;

const Form = () => {
    const [value, setValue] = useState('');

    const handleChange = e => { setValue(e.target.value) }

    return (
        <div>
            {value !== '' && <p>This is p tag</p>}
            <input 
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}

```
Nhìn vào đọan code trên và áo dụng vào ví dụ ngay trước đó bạn có thể thấy rằng khi ta chưa nhập nội dung và ngay sau khi ta bắt đầu nhập nội dung vào ô `<input />` thì `Virtual DOM Tree` cũ và mới sẽ được biểu diễn như sau:
```html
// Trước khi nhập nội dung
<div>
    null
    <input />
</div>


// Sau khi nhập nội dung
<div>
    <p>This is p tag</p>
    <input />
</div>
```
Với trường hợp như trên thì việc so sánh `Virtual DOM Tree` cũ và mới sẽ được diễn ra tương tự như sau:
 - Ở `Element` cha có `type` từ `div` -> `div` -> không tạo mới.
 - Đi vào trong các `Element` con ta có:
     - Ở vị trí đầu tiên ta có `type` từ `null` -> `p` -> tạo mới thẻ `<p>`.
     - Ở vị trí thứ hai ta có `tyoe` từ `input` -> `input` -> không tạo mới.

Vậy là trên thực tế khu chúng ta code thì thẻ `<input />` của chúng ta ở đây không hề bị tạo mới vì thẻ `<p>` bị thiếu trước đó thực chất thì chúng ta thường đặt vào đó một giá trị `null` rồi nên nó sẽ hoàn toàn không ảnh hưởng gì đến việc so sánh bị sai xót trong việc quyết định tạo mới hay tái sử dụng. Đồng thời ở đây toàn bộ trạng thái trên thẻ `<input />` của chúng ta cũng sẽ được bảo toàn. Có một điều tiếp theo mình muốn chia sẽ cho các bạn là có thể đây là mộ trong những lý do mà `React` luôn yêu cầu chúng ta khi code phải có một `Element` cha bọc ngoài nếu có nhiều `Element` con cùng cấp  như sau:
```js
// Cách viết sai
const Demo = () => (
    <p>This is first p tag</p>
    <p>This is second p tag</p>
);

// Cách viết đúng
const Demo = () => (
    <div>
        <p>This is first p tag</p>
        <p>This is second p tag</p>
    </div>
);
```
Với trường hợp bạn code sai như trên thì sẽ nhận được một lỗi như sau:
```
SyntaxError
/src/index.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>? (8:2)
```
Giả sử `React` cho chúng ta viết như cách sai đầu tiên thì áp vào ví dụ trước đó của chúng ta với thẻ `<input />` thì chúng ta sẽ có được đoạn code như sau:
```js
import React, { useState } from 'react;

const Form = () => {
    const [value, setValue] = useState('');

    const handleChange = e => { setValue(e.target.value) }

    return (
        <div>
            {
                value !== '' && (
                    <p>This is first p tag</p>
                    <p>This is second p tag</p>
             }
            <input 
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
```
Thì với đoạn code nói trên thì tương tự `Virtual DOM Tree` cũ và mới sẽ như sau:
```html
<div>
    null
    <input />
</div>


// Sau khi nhập nội dung
<div>
    <p>This is first p tag</p>
    <p>This is second p tag</p>
    <input />
</div>
```
Tuy nhiên bạn có thể dễ dàng nhận thấy quá trình so sánh 2 cây sẽ lại dẫn đến tạo mới thẻ `<input />` vì ở `Virtual DOM Tree` thứ nhất có 2 `Element` con và `Virtual DOM Tree` mới có 3 vì thế nó sẽ là:
-  Ở vị trí đầu tiên thì ta có `type` là `null` -> `p` (`<p>This is first p tag</p>`) -> tạo mới
- Ở vị trí thứ 2 thì sẽ là `input` -> 'p' (`<p>This is second p tag</p>`) -> tạo mới
- Ở vị trí cuối cùng thì vì `Virutal DOM Tree` cũ có ít hơn `Virtual DOM Tree` mới một `Element` nên nó sẽ là `null` -> `input` -> tạo mới

Như vậy với trường hợp này thì `React` sẽ lại phải tạo lại thẻ `<input />` đồng nghĩa với việc ta mất hết toàn bộ trạng thái cũng như nội dung đã nhập. Mặc dù chưa tìm được tài liệu nào chính xác nói về vấn đề này nhưng theo ý kiến cá nhân của mình thì đây **"có thể"** là một trong những lý do mà `React` luôn yêu cầu chúng ta bọc một thẻ ở ngoài cùng. Tiếp theo đây chúng ta sẽ đi đến một ví dụ cuối cùng đó là việc `render` một danh sách như sau:
```js
const List = ({ list }) => (
    <div>
        <h1>ITEM LIST</h1>
       {
            list.map(item => (
                <p>{item.name}</p>
            ));
       }
    </div>
)
```
Và đây là kết quả đầu ra của chúng ta:
```js
const list = ['First item', 'Second item', 'Third tem']
// Kêt quả thu được:
    <div>
        <h1>ITEM LIST</h1>
        <p>Fist item</p>
        <p>Second item</p>
        <p>Third item</p>
    </div>
```
Trong trường hợp danh sách của chúng ta thuộc dạng tĩnh và không bao giờ bị thay đổi về vị trí thì việc so sánh và cập nhật các `Element` sẽ diễn ra như bình thuwofng không có vấn để gì cả. Tuy nhiên đối với trường hợp dạng in ra danh sách như trên thì việc thứ tự bị thay đổi lại thường xuyên gặp phải. Nếu vẫn áp dụng phương pháp so sánh nói trên khi chúng ta thay đổi thứ tự trong danh sách thì như đã nói trước đó thì ở đây `type` của tất cẩ cá `Element` vẫn là `p` nên tất nhiên ở đây sẽ không xảy ra việc tạo lại thẻ `<p>` mà thay vào đó `React` sẽ cập nhật lại toàn bộ phần nội dung nằm trong thẻ `p` vì khi được sắp xếp lại có thể dẫn đến toàn bộ nội dung đổi chỗ cho nhau như sau:
```html
// Old
    <div>
        <h1>ITEM LIST</h1>
        <p>Fist item</p>
        <p>Second item</p>
        <p>Third item</p>
    </div>

// New
    <div>
        <h1>ITEM LIST</h1>
         <p>Third item</p>
        <p>Fist item</p>
        <p>Second item</p>
    </div>
```
Tuy nhiên `React` có thể làm tốt hơn thế bằng cách chúng ta thêm vào cho mỗi phần tử trong danh sách một thuộc tính là `key` như sau:
```js
const List = ({ list }) => (
    <div>
        <h1>ITEM LIST</h1>
       {
            list.map(item => (
                <p key={item.id}>{item.name}</p>
            ));
       }
    </div>
);

const list = [
    {key: 1, name: 'First item'},
    {key: 2, name: 'Second item'},
    {key: 3, name: 'Third tem'}
];
// Kêt quả thu được:
    <div>
        <h1>ITEM LIST</h1>
        <p key="1">Fist item</p>
        <p key="2">Second item</p>
        <p key="3">Third item</p>
    </div>
```
Trong trường hợp `Element` của chúng ta có `key` thì lúc này thay vì so sánh và update nội dung ngay thì `React` sẽ nhìn vào `Virtual DOM Tree` cũ vào tìm cái `key` đó để so tìm cái `key` với giá trị tương ứng rồi mới quyết định có cần update nội dung không hay chỉ cần sắp xếp lại thôi. Vì với 2 `Element` có giá trị `key` tương ứng sẽ được so sánh và quyết định là sắp xếp lại hay cập nhật nội dung. Việc sử dụng `key` như vậy còn hiệu quả hơn khi chúng ta thêm một phần tử mới vào đầu danh sách:
```
// Old
    <div>
        <h1>ITEM LIST</h1>
        <p key="1">Fist item</p>
        <p key="2">Second item</p>
        <p key="3">Third item</p>
    </div>
 
 // New
     <div>
        <h1>ITEM LIST</h1>
        <p key="4">Fourth item</p>
        <p key="1">Fist item</p>
        <p key="2">Second item</p>
        <p key="3">Third item</p>
    </div>
```
Với trường hợp nói trên mà không có `key` thì sẽ dẫn đến việc cập nhật lại toàn bộ 3 phần tử đầu tiên và thêm mới phần tử cuối cùng. Còn khi bạn `Element` đã có `key` thì `React` sẽ chỉ cần sắp xếp lại 3 phần từ đầu tiên và đồng thời thêm 1 phần tử mới vào đầu danh sách. 

## 3. Kết bài
<hr>

Bài viết thứ hai và cũng là bài viết cuối cùng của mình về chủ đề `Reconciliation` trong `React` đến đây là kết thúc. Mong rằng qua bài viết các bạn sẽ có thêm một chút hiểu biết hơn về thư viện `React`. Cảm ơn các bạn đã đọc bài.