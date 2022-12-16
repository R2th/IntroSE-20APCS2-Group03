# DOM Range là gì?
`Range` là một interface trong `DOM` (Document Object Model), đại diện cho một phần nội dung của văn bản bao gồm các node và text nodes. Mỗi node có một điểm đầu `start` và một điểm cuối `end` được gọi là các điểm biên (boundary points). Một điểm biên bao gồm một node và một giá trị offset không âm. Nói cách khác, range đại diện cho một phần văn bản của cây node (node tree) nằm giữa 2 điểm biên.

Range thường được sử dụng cho việc chỉnh sửa các nội dụng đang được bôi đen và copy.
# Cách tạo một Range cơ bản
```html
<p>
    <img src="insanity-wolf" alt="Little-endian BOM; decode as big-endian!">
    CSS 2.1 syndata is 
    <em>awesome</em> ! 
</p>
```
Trong node tree ở ví dụ trên, range có thể đại diện cho đoạn "**syndata is awes**". Giả sử `p` được gán cho element **p** và `em` được gán cho element **em**. Range được tạo như sau:
```javasript
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)
// range now stringifies to the aforementioned quote
```
**Lưu ý:** Những thuộc tính như `src` và `alt` trong node tree bên trên không thể được đại diện bởi một range. Khái niệm range chỉ hữu dụng đối đối với các node. 
Ngoài cách sử dụng hàm khởi tạo Range(), Range có thể được tạo bởi hàm `getRangeAt()` của `Selection` object, hàm `createRange` hoặc `caretRangeFromPoint` của `Document` object.
# Các thuộc tính và một số phương thức của Range
## Thuộc tính:
- `startContainer` : node đầu tiên của range
- `startOffset`: giá trị số không âm thể hiện vị trị bắt đầu của range bên trong `startContainer`
- `endContainer`: node cuối cùng của range
- `endOffset`: giá trị số không âm thể hiện vị trí kết thúc của range bên trong `endContainer`.
- `commonAncestorContainer`: node gần nhất chứa cả `startContainer` và `endContainer`.
- `collapsed`: trả về giá trị kiểu `Boolean`, xác định 2 điểm đầu và cuối của range có trùng nhau hay không.
## Phương thức:
- `setStart(Node node, Number offset)`: khởi tạo điểm biên bắt đầu của range.
- `setEnd(Node node, Number offset)`: khởi tạo điểm biên kết thúc của range.
- `setStartBefore(Node node)`: khởi tạo điểm biên bắt đầu của range ngay phía trước node được chỉ định.
- `setStartAfter(Node node)`: khởi tạo điểm biên bắt đầu của range ngay phía sau node được chỉ định.
- `setEndBefore(Node node)`: khởi tạo điểm biên kết thúc của range ngay phía trước node được chỉ định.
- `setEndAfter(Node node)`: khởi tạo điểm biên kết thúc của range ngay phía sau node được chỉ định.
- `selectNode(Node node)`: di chuyển 2 điểm biên của range bao quanh node được chỉ định. Khi này `startContainer` và `endContainer` đều trỏ tới `parentNode` của node hiện tại. Giả sử `i` là giá trị index của node bên trong parent của nó, thì `startOffset` có giá trị là `i` và `endOffset` có giá trị là `i + 1`

    Ví dụ, cho đoạn HTML dưới đây :
    ```html
    <p>Watford's all-time top scorer is <b id="luther">Luther Blissett</b> with 186 goals.</p>
    ```
    Một range có thể được tạo và bao quanh element `<b`> như sau:
    ```
    var range = rangy.createRange();
    var b = document.getElementById("luther");
    range.selectNode(b);
    ```
    `startContainer` và `endContainer` sẽ cùng trỏ đến element `p`. `startOffset` là 1 và `endOffset` là 2.
- `selectNodeContents(Node node)`: di chuyển range bao quanh nội dung của node được chỉ định.

    Trong mọi trường hợp, `startContainer` và `endContainer` đều trỏ đến node hiện tại.
    
    Trường hợp node được chỉ định (`node`) có child nodes (ví dụ một element) thì điểm biên bắt đầu được đặt ngay trước child node đầu tiên của `node` và điểm biên kết thúc được đặt ngay sau child node cuối cùng của `node`. Đồng nghĩa là `startOffset` có giá trị 0 và `endOffset` có giá trị bằng `node.childNodes.length`.
    
    Đối với `node` không có child node (ví dụ một text node), điểm biên bắt đầu nằm ở vị trí bắt đầu của text và điểm biên cuối nằm ở vị trí kết thúc của text. `startOffset` có giá trị 0 và `endOffset` có giá trị bằng `node.length`
    
    Ví dụ:
    ```html
    <p>Watford's all-time top scorer is <b id="luther">Luther Blissett</b> with 186 goals.</p>
    ```
    ```javascript
    var range = new Range();
    var b = document.getElementById("luther");
    range.selectNodeContents(b);
    ```
    `startContainer` và `endContainer` đều trỏ tới element `<b>`. `startOffset` là 0 và `endOffset` là 1.
    Nếu gọi hàm `selectNodeContents()` với text node bên trong element `<b>` như sau:
    ```javascript
    range.selectNodeContents(b.firstChild);
    ```
    `startContainer` và `endContainer` đều trỏ tới text node. `startOffset` là 0 và `endOffset` là 15.
- `collapse(Boolean toStart)`: gộp range về điểm biên bắt đầu (`toStart` = `true`) hoặc điểm biên kết thúc (toStart = false).
-  `cloneContents()`: trả về một `DocumentFragment` chứa nội dung đã copy từ range hiện tại
- `extractContents()`: tách nội dung hiện tại của range thành một `DocumentFragment` và trả về fragment đó.
- `deleteContents()`: xóa nội dung hiện tại của range.
- `surroundContents(Node node)`: di chuyển nội dung của range vào bên trong của node chỉ định. Node này sẽ được chèn vào document ở vị trí của range. Hàm này sẽ trả về lỗi nếu range chỉ nằm trên một phần của một node (node chỉ chứa một điểm biên của range).
- `cloneRange()`: trả về một range mới có các điểm biên giống với range hiện tại.
- `toString()`: trả về nội dung text của range.
- `compareBoundaryPoints(Number comparisonType, Range range)`: so sánh biên của range hiện tại với biên của range chỉ định. Trả về lần lượt các giá trị -1, 0, 1 nếu biên của range hiện tại đứng trước, trùng và đứng sau biên của range chỉ định. Điểm biên được so sánh dựa trên giá trị `comparisonType`:
    + `START_TO_START`: so sánh điểm biên bắt đầu của 2 range.
    + `START_TO_END`: so sánh điểm cuối của range hiện tại với điểm đầu của range chỉ định.
    + `END_TO_START`: so sánh điểm đầu của range hiện tại với điểm cuối của range chỉ định.
    + `END_TO_END`: so sánh điểm cuối của 2 range.
# Những lưu ý khi sử dụng Range
- Các đối tượng Range không cập nhật theo khi DOM thay đổi (ngoại trừ khi việc thay đổi này xuất phát từ các hàm của Range).
- Không một thuộc tính nào của range trả về exception khi chúng được gán trực tiếp.
- Những thuộc tính của một detached range sẽ trả về exception khi được truy cập.
Do đó nên tuân thủ những quy tắc sau:
- Tạo một range mới bất kể khi nào văn bản bị thay đổi bởi người dùng hoặc những đoạn code khác.
- Không gán trực tiếp giá trị vào các thuộc tính của range (`startContainer`, `endContainer`, `startOffset`, `endOffset`, `commonAncestorContainer` và `collapsed`). Sẽ không có thông báo lỗi trả về nhưng mọi thứ về sau có thể hoạt động không đúng nếu thực hiện việc gán này.

### *Tham khảo*
- **Tim Down**, [Range objects in Rangy](https://github.com/timdown/rangy/wiki/Rangy-Range).
- **W3C**, [W3C DOM4](https://www.w3.org/TR/dom/#range).
- **MDN Web Docs**, [Range](https://developer.mozilla.org/en-US/docs/Web/API/Range).