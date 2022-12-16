Chắc hẳn mỗi developer khi làm việc với `Javascript` thì  `string` là một trong những kiểu dữ liệu tiếp cận đầu tiên và nhiều nhất. Như là khai báo một biến `string` rồi sau đó alert ra trình duyệt chẳng hạn. Và đến khi chúng ta đi càng sâu vào thì việc thao tác với những `string` sẽ trở nên nhiều và phức tạp hơn. Vì thế trong bài viết hôm nay hãy cùng mình đi qua tìm hiểu một số function hữu ích khi làm việc với kiểu dữ liệu `string` nhé.

# I. Truncate string.
Đầu tiên sẽ là một function dùng để cắt chuỗi theo mong muốn.

Trong quá trình làm việc với javascript thì chắc hẳn chúng ta sẽ rất hay gặp những trường hợp cắt chuỗi, một đoạn văn bản như thế này.

Vấn đề gặp phải là khi chúng ta muốn hiển thị một đoạn văn bản ra ngoài trình duyệt. Thì đối với những trường hợp bình thường (ví dụ như phần dữ liệu khá ít và hiển thị vừa đẹp) thì khi ra trình duyệt nó sẽ hiển thị khá ổn. Nhưng ngược lại chúng ta cũng có thế gặp những trường hợp phần dữ liệu quá lớn làm layout của chúng ta trở nên gồ ghề.

Dưới đây là chúng ta sẽ viết một function dùng để giải quyết việc đó! Đầu vào của function sẽ lần lượt là:
- `value`: Sẽ là chuỗi `string` muốn xử lý.
- `limit`:  Sẽ là giới hạn độ dài mong muốn (sẽ bao gồm cả độ dài của `suffix`).
- `suffix`: Sẽ là hậu tố mong muốn thêm vào (ex: '...', ...).


```javascript
function truncate(value, limit, suffix = '') {
  let preValue = value.trim()
  
  if (!preValue) return ''
  if (value.length <= limit)  return value
  if (limit <= suffix.length) return value

  preValue = preValue.substr(0, limit - suffix.length)
  
  return `${preValue.trim()}${suffix}`
}

const inputValue = 'Hello world'
truncate(inputValue, 5) // => 'Hello'
truncate(inputValue, 5, '...') // => 'He...'

// Trường hợp này khi phần limit độ dài bằng độ dài của chuỗi nối
// thì kết quả trả về sẽ chỉ là '...'
// Vì thế ở đây chúng ta sẽ bắt trường hợp 'limit === suffix.lengh'
// thì trả về giá trị ban đầu
truncate(inputValue, 3, '...') // => Ở đây sẽ trả về 'Hello world'  '...'
```

Function mà chúng ta vừa tìm hiểu ở trên sẽ chỉ là một cách trong vô số cách dùng để `truncate` string thôi. Và nó sẽ tùy vào business của bài toán mà chúng ta gặp phải nữa. Lúc đó chúng ta sẽ cần tùy biến một chút để có được kết quả hợp lý nhất và gần nhất với mong muốn.
# II. Camelize string.
`camelCase` từ khóa đã quá quen thuộc với developer chúng ta??

Thì `camelCase` là một kiểu thực hành cách viết các cụm từ không có dấu cách hoặc dấu câu. Và cho biết sự phân tách giữa các từ bằng một chữ hoa duy nhất.

Và trong lập trình thì chúng ta áp dụng nó như một chuẩn để đặt tên cho biến, function, ...

Vì đây là một cách đặt tên và chúng ta có thể trực tiếp thao tác với những cái tên đó. Nhưng sẽ có một số trường hợp chúng ta sẽ không muốn thao tác bằng tay nữa mà những dòng code sẽ làm điều đó cho chúng ta (vì nó đã theo một chuẩn rồi, chúng ta chỉ đi theo chuẩn đó là được).

Vấn đề của chúng ta là sẽ cần xử lý một chuỗi `string` và trả về một chuỗi `string` mới ở dạng `camelCase`. Ở đây sẽ có nhiều trường hợp có thể xảy ra với chuỗi `string` được truyền vào , có thể là chuỗi `string` đầu vào sẽ ở dạng bất định hoặc có thể sẽ là một chuỗi `string` với định dạng đã được xác định sẵn trước đó (như là kiểu underscore, kebab-case). Hãy cùng giải quyết từng trường hợp một.
```javascript
// Đây là trường hợp khi chuỗi string đầu vào ở dạng bất định
// và chúng ta sẽ cover một số trường hợp của nó
function camelize(value) {
  // Các bước xử lý sẽ như dưới:
  // 1. Xóa những ký tự khác thường, không mong muốn (ví dụ một số ký tự đặc biệt).
  // Phần này chúng ta sẽ tự định nghĩa để có thể điều chỉnh linh hoạt.
  // 2. Tiếp theo là thay thế những ký tự đặc thù của một số định dạng cơ bản
  // bằng space (như là underscore sẽ '_', kebab-case sẽ là '-').
  // 3. Tiếp đến là thay thế ký tự thường đầu tiên sau whitespace
  // thành ký tự hoa (nếu có).
  // 4. Tiếp nữa sẽ là xóa hết những ký tự whitespace còn xót lại.
  // 5. Cuối cùng sẽ là thay thế ký tự hoa ở đầu cụm từ
  // thành ký tự thường (nếu có).
  return value.removeAbnormal(value)
    .replace(/[\_\-]/g, " ")
    .replace(/\s[a-z]/g, val => val.toUpperCase())
    .replace(/\s+/g, "")
    .replace(/^[A-Z]/g, val => val.toLowerCase())
}

// Function này sẽ hỗ trợ cho function ở trên
// dùng để xóa những ký tự mà chúng ta thấy nó khác thường, không mong muốn.
function removeAbnormal(str) {
  return str.replace(/[^0-9a-zA-Z \_\-]/g, "");
}
```
Còn trường hợp đã xác định được dạng của chuỗi `string` (như là underscore hoặc kebab-case) thì chúng ta có thể viết nhanh như dưới.
```javascript
// Tại đây thì chúng ta sẽ bỏ qua các bước thay thế,
// cũng như là tiền xử lý để đi ngay vào xử lý chỉnh luôn.
// Vì chúng ta đã xác định được định dạng của input là
// underscore hoặc kebab-case.
function camelize(value) {
  return value.replace(
    // Regex dùng để xác định phần cần thay thế.
    // Regex này sẽ dùng Capturing group để xác định ký tự
    // và thay thế bằng ký tự hoa.
    /[\-\_](\w)/g, 
    function (_, val) { return val ? val.toUpperCase() : ''; },
  )
}
```
Trong thực tế thì chỉ trong một số trường hợp đặc thù thì chúng ta mới dùng đến function này (như là khi muốn kiểm soát phần đặt tên cho biến, function, ...)! Nhưng nó cũng cho chúng ta một lối xử lý `string` khi gặp những trường hợp đó và có thể tùy biến thêm nữa.
# II. Pad string.
Một function xử lý `string` nữa giúp chuỗi `string` của chúng ta có thể được thêm vào những phần đệm để thỏa mãn một business nào đó.
```javascript
// Function này sẽ đệm thêm ký tự vào bên phải
function rightPad(value, limit, char = ' ') {
  return value.length < limit
    ? `${value}${repeat(char, limit - value.length)}`
    : value
}

// Function này sẽ đệm thêm ký tự vào bên trái
function leftPad(value, limit, char = ' ') {
  return value.length < limit
    ? `${repeat(char, limit - value.length)}${value}`
    : value
}

// Function này dùng để hỗ trợ cho 2 function trên.
// Nó tạo 1 chuỗi ký tự có độ dài như mong muốn.
function repeat(value, length) {
  // Tại đây khi khởi tạo array chúng ta cần cộng thêm 1
  // vì khi dùng 'join' để nối các phần tử trong array thì
  // nó sẽ chỉ nối giữa 2 phần tử với nhau thôi
  // và sẽ không bao gồm 2 phần tử đầu và cuối
  // vì vậy nếu chúng ta khởi tạo array
  // => với chiều dài bằng 1 thì khi 'join' sẽ vô nghĩa (không thể join chính nó)
  // => với chiều dài bằng 2 thì sẽ được 1 lần nối giữa 2 phần tử 1 và 2
  // => với chiều dài bằng 3 thì sẽ là 1 nối với 2 và 2 nối với 3
  return new Array(length + 1).join(value)
}
```
Một function khá thú vị đúng không nào. Sẽ có một lúc nó trở nên rất hữu ích.

Bên trên chúng ta đã cùng đi qua 3 function khi làm việc với `string` trong javascript.Thì `string` là một trong những kiểu dữ liệu mà chúng ta tiếp xúc, làm việc rất nhiều và liên tục. Vì thế khi tạo một số function dùng để xử lý xung quanh nó sẽ giúp chúng ta có thể tái sử dụng lại và liên tục nâng cấp để bổ sung cho business của mình. Nhắm tiết kiệm thời gian tìm hiểu, rủi ro (vì chúng ta đã viết những function này trước đó rồi, test kỹ càng rồi, giời nếu có thêm thì chỉ ráp một ít phần business mới vào và test lại phần mới đó thôi).

Trong 3 function trên thì có lẽ là `truncate` sẽ được sử dụng khá nhiều để xử lý dữ liệu văn bản. Tiếp đến là `pad` sẽ giúp chúng ta có thêm lựa chọn khi muốn đệm ký tự vào dữ liệu văn bản. Cuối cùng là `camelize` sẽ dùng nhiều khi thao tác với biến và function trong javascript.

Vậy là bài viết của mình đến đây là hết rồi! Các bạn cảm thấy thế nào? Dù chỉ là kiểu dữ liệu cơ bản nhất thôi nhưng khi thao tác với nó và đi sâu vào chúng ta sẽ cảm thấy càng phức tạp hơn và cũng thú vị nữa. Vậy thì còn chần chờ gì nữa mà không bắt tay vào viết một số function và áp dụng ngay vào trong những dự án của mình nào. Bài viết đến đây là hết rồi! Mong rằng nó sẽ đem lại những kiến thức hữu ích cho các bạn. Hẹn gặp lại các bạn trong bài viết tiếp theo! Xin chào!