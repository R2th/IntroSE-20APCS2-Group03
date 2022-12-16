# 1. Cách hoạt động 
Tôi có đoạn code như sau: 
```swift
function getLogger(arg) {
  function logger() {
    console.log(arg)
  }
  return logger
}
let fruit = 'raspberry'
const logFruit = getLogger(fruit)
logFruit() // "raspberry"
fruit = 'peach'
logFruit() // "raspberry" Wait what!? Why is this not "peach"?
```
Tôi tạo một biến có tên là *fruit* và gán nó vào một chuỗi 'raspberry', sau đó tôi truyền *fruit* đến một hàm tạo và trả về một hàm được gọi là `logger` hàm này sẽ ghi lại quả khi được gọi.Khi tôi gọi hàm đó, tôi nhận được đầu ra console.log của 'raspberry' như mong đợi.

Tôi có thể thực hiện từng bước này bằng cách gọi lại `getLogger` để nhận trình ghi nhật ký mới:
```shell
const logFruit2 = getLogger(fruit)
logFruit2() // "peach" what a relief
```
Và câu hỏi ở đây là tại sao tôi không thể chỉ thay đổi giá trị của biến và yêu cầu `logger` ghi giá trị mới nhất?
Câu trả lời là thực tế là trong JavaScript, khi bạn gọi một hàm với các đối số, các đối số bạn đang truyền được chuyển theo giá trị, không phải bằng tham chiếu. 
Hãy để tôi mô tả ngắn gọn những gì đang diễn ra ở đây:
```javascript
function getLogger(arg) {
  function logger() {
    console.log(arg)
  }
  return logger
}
// side-note, this could be written like this too
// and it wouldn't make any difference whatsoever:
// const getLogger = arg => () => console.log(arg)
// I just decided to go more verbose to keep it simple
```
Khi `getLogger` được gọi, hàm ghi nhật ký được tạo. Đó là một chức năng hoàn toàn mới. Khi một hàm hoàn toàn mới được tạo, nó sẽ tìm kiếm tất cả các biến mà nó có quyền truy cập và "closes over" chúng để tạo thành cái được gọi là "closure". Điều này có nghĩa là miễn là hàm `logger` này tồn tại, nó sẽ có quyền truy cập vào các biến trong hàm cha của nó và các biến cấp mô-đun khác.
Vì vậy, những biến nào mà `logger` có quyền truy cập vào khi nó được tạo? Nhìn lại ví dụ, nó sẽ có quyền truy cập vào *fruit*, *getLogger*, *arg* và *logger (chính nó)* . Hãy đọc lại danh sách đó, bởi vì điều quan trọng là lý do tại sao mã hoạt động theo cách của nó. Bạn có nhận thấy điều gì đó không? Cả fruit và arg đều được liệt kê, mặc dù chúng có cùng giá trị.
Chỉ vì hai biến được gán cùng một giá trị không có nghĩa là chúng là cùng một biến. Đây là một ví dụ đơn giản về khái niệm đó:
```markdown
let a = 1
let b = a
console.log(a, b) // 1, 1
a = 2
console.log(a, b) // 2, 1 ‼️
```
Lưu ý rằng mặc dù chúng ta làm cho b trỏ tới giá trị của biến `a`, chúng ta vẫn có thể thay đổi biến a và giá trị `b` trỏ tới là không thay đổi.
Tôi thích nghĩ về các biến như những mũi tên nhỏ trỏ đến các vị trí trong bộ nhớ của máy tính.Vì vậy, khi chúng ta nói `let a = 1`, chúng ta đang nói: "Này công cụ JavaScript, tôi muốn bạn tạo một vị trí trong bộ nhớ với giá trị là 1 và sau đó tạo một mũi tên (biến) được gọi là `a` trỏ đến vị trí đó trong bộ nhớ."
Sau đó, khi chúng ta nói: `let b = a`, chúng ta đang nói "Này công cụ JavaScript, tôi muốn bạn tạo một mũi tên (biến) có tên là `b` trỏ đến cùng một nơi mà `a` trỏ đến vào lúc này."
Theo cách tương tự, khi bạn gọi một hàm, công cụ JavaScript sẽ tạo một biến mới cho các đối số của hàm. Trong trường hợp của chúng tôi, chúng tôi gọi là `getLogger (fruit)` và về cơ bản công cụ JavaScript đã thực hiện điều này:
```markdown
let arg = fruit
```
Vì vậy, khi chúng ta thực hiện *fruit = 'peach'*, nó không có tác động đến đối số vì chúng là các biến hoàn toàn khác nhau.
Cho dù bạn nghĩ đây là một hạn chế hay một tính năng, thực tế là đây là cách nó hoạt động.Nếu bạn muốn giữ cho hai biến được cập nhật với nhau, có một cách để làm điều đó. Thay vì thay đổi vị trí các mũi tên (biến) trỏ đến, bạn có thể thay đổi những gì chúng đang trỏ tới.
Ví dụ:
```markdown
let a = {current: 1}
let b = a
console.log(a.current, b.current) // 1, 1
a.current = 2
console.log(a.current, b.current) // 2, 2
```
Trong trường hợp này, tôi không chỉ định lại `a`, mà là thay đổi giá trị mà `a` đang trỏ tới. Và bởi vì `b` được chỉ vào cùng một thứ, cả hai đều nhận được bản cập nhật.
Tôi áp dụng giải pháp này cho vấn đề *logger*. Tôi có đoạn code sau :
```swift
function getLatestLogger(argRef) {
  function logger() {
    console.log(argRef.current)
  }
  return logger
}
const fruitRef = {current: 'raspberry'}
const latestLogger = getLatestLogger(fruitRef)
latestLogger() // "raspberry"
fruitRef.current = 'peach'
latestLogger() // "peach"
```
`Ref` là viết tắt của "reference" có nghĩa là giá trị mà biến trỏ tới chỉ được sử dụng để tham chiếu đến một giá trị khác (trong trường hợp của chúng ta là thuộc tính hiện tại của một object).
# 2.  Kết luận
Tôi rất vui vì đặc tả JavaScript yêu cầu các đối số hàm được chuyển theo giá trị thay vì tham chiếu.Và giải pháp thay thế không quá khó khăn khi bạn có nhu cầu (điều này khá hiếm vì khả năng thay đổi làm cho các chương trình khó hiểu hơn bình thường). Hy vọng rằng sẽ giúp ích cho các bạn. Nếu như còn nhiều thiếu sót, mong nhận được sự góp ý của mọi người.
Xin chân thành cám ơn !

Link tham khảo: https://kentcdodds.com/blog/javascript-pass-by-value-function-parameters?fbclid=IwAR1CCcPBXgxEBA3dzJlIuVTaIJEBKyLohIaIoHdF6JfWdh8g0FA-x8gwKtE