<div align="center" style="color: blue;">
    Thanh xuân như mẫu `ri gệc` =)) <br>
    Viết xong một mẫu thanh xuân không còn
</div>
<br>

Regular Expressions hay Regex thì chắc cũng không xa lạ gì với các anh em dev. Nhưng với mình, cái này khá là đau đầu. Thực sự mỗi lần làm regex là như mò kim đáy bể vậy :(. Hôm vừa rồi  nghịch ngợm, mình có tìm được một vài cái hay hay nên mình viết bài viết này. Hi vọng có thể giúp đỡ anh em cũng bị bệnh "đau đầu" giống mình có thể viết regex dễ dàng hơn xíu ahihi =))
## 1. Giới thiệu về Regex
Nói qua một chút nhé, Regex (Regular Expressions), tạm dịch là "biểu thức chính quy" là một cách hiệu quả để làm việc với dữ liệu dạng chuối (string). Bằng cách tạo một regex, bạn có thể làm một số việc như:
- Tìm kiếm một đoạn văn bản
- Trích rút một đoạn văn bản
- Thay thế một đoạn văn bản bằng một đoạn văn bản khác

Hầu hết các ngôn ngữ lập trình đều sử dụng được regex. Nhưng trong bài hôm nay, mình sẽ nói về regex với ngôn ngữ cụ thể là javascript.

### Cú pháp chung
```js
/pattern/modifiers
```
trong đó: 
- pattern là chuỗi regex
- modifiers (có thể có hoặc không) là options so khớp, bao gồm:

![](https://images.viblo.asia/ce534f86-d061-4ced-9ad4-652d7b64a69f.png)

###  Ví dụ

Để tạo một regex trong js thì bạn có thể dùng 2 cách
- Cách 1: tạo 1 object RegExp

```js
const reg = new RegExp('hello', 'i')
```
- Cách 2:  sử dụng cú pháp `//`
```js
const reg = /hello/i
```

Đây là một ví dụ đơn giản. Biểu thức `reg` được định nghĩa dùng để tìm kiếm các đoạn văn bản có chứa chuỗi `hello`, không phân biệt chữ hoa chữ thường. Bạn có thể dùng hàm `RegExp.test(String)` để kiểm tra xem đoạn văn bản đang xét có chứa `reg` mà bạn định nghĩa hay không. 
```js
reg.test('Hello')             // true
reg.test('haiha hello you')   // true

reg.test('he')                // false
reg.test('haiha')             // false
```
## 2. Một vài systax cần nhớ

-----
### **Brackets**

-----
![](https://images.viblo.asia/45c806e7-2612-4b02-b164-92f8557ec4db.png)

-----
### **Metacharacters**

-----
![](https://images.viblo.asia/7f496f24-2e99-4e18-98d6-01f98637bd78.png)

-----
### **Quantifiers**

-----
![](https://images.viblo.asia/d0702fd9-6fe5-4b2a-9626-09aca6167bda.png)

### Ví dụ
- Kí hiệu `^`, khớp chuỗi bắt đầu bằng `hello`
```js
/^hello/.test('hello')             // true
/^hello/.test('ahihi hello ahihi') // false
```
- Kí hiệu `$`, khớp chuỗi kết thúc bằng `hello`
```js
/hello$/.test('hey, guy ... hello')     // true
/hello$/.test('hello you')              // false
```
- Và khi chúng ta kết hợp `^` và `$` chúng ta sẽ có 1 yêu cầu khớp chuỗi chính xác với từ `hello`:
```js
/^hello$/.test('hello') // true
```
- Kí hiệu `*`, dùng để khớp với bất kì kí tự nào xuất hiện 0 lần trở lên ???
```js
/^hey.*joe$/.test('hey joe')             // true (khớp dấu cách)
/^hey.*joe$/.test('heyjoe')              // true (khớp với trường hợp 0 có kí tự nào)
/^hey.*joe$/.test('hey how are you joe') // true (khớp với chuỗi văn bản con)
/^hey.*joe$/.test('hey joe!')            // false (kết thúc chuỗi là `!`)
```
- Kí hiệu `|`, dùng để khớp với 2 hoặc nhiều chuỗi khác nhau
```js
/hey|ho/.test('hey') // true
/hey|ho/.test('ho')  // true
```
- Kí hiệu `+`, so khớp 1 kí tự xuất hiện nhiều hơn 1 lần
```js
/^\d+$/.test('144343') //true (các chữ số xuất hiện nhiều lần)
/^\d+$/.test('ahihi')  //false (không có chữ số nào trong chuỗi)
```
nhưng nếu là `*`, ta sẽ có true, true nhé
```js
/^\d+$/.test('144343') //true
/^\d+$/.test('ahihi')  //true
```
- KÍ hiệu `?`, lại so khớp cho kí hiệu không xuất hiện hoặc xuất hiện duy nhất 1 lần
```js
/^\d{3}\w?$/.test('123')   // true (chứa 0 chữ cái)
/^\d{3}\w?$/.test('123a')  // true (chứa 1 chữ cái)
/^\d{3}\w?$/.test('123ab') // false (chứa 2 chữ cái)
```
- `{n}`, khớp chuỗi có kí tự xuất hiện đúng `n` lần:
```js
/^\d{3}$/.test('123')  // true
/^\d{3}$/.test('12')   // false
/^\d{3}$/.test('1234') // false

/^[A-Za-z0-9]{3}$/.test('Abc') // true
```
- `{m, n}`, cái này thì là xuất hiện từ `m` đến `n` lần, không ít hơn `m` lần và không nhiều quá `n` lần
```js
/^\d{3,5}$/.test('123')    // true
/^\d{3,5}$/.test('1234')   // true
/^\d{3,5}$/.test('12345')  // true
/^\d{3,5}$/.test('123456') // false
```
- Dấu ngoặc tròn `(...)`, để tạo các nhóm kí tự. Bằng cách này bạn có thể quy ước số lần lặp lại của một chuỗi thay vì một kí tự.
```js
/^(\d{2})+$/.test('12')   // true
/^(\d{2})+$/.test('123')  // false
/^(\d{2})+$/.test('1234') // true
```

## 3. Các hàm js regex bạn nên biết 

![](https://images.viblo.asia/11863664-7cd0-4ae9-a44c-4d083af84f42.png)

### Ví dụ

- `String.match(RegExp)` và `RegExp.exec(String)`

Hai hàm khớp chuỗi này sẽ trả về mảng (Array) các chuỗi con khớp với mẫu regex. Trường hợp không có chuỗi khớp, hàm sẽ trả về kết quả `null`
```js
'123s'.match(/^(\d{3})(\w+)$/)
//Array [ "123s", "123", "s" ]

/^(\d{3})(\w+)$/.exec('123s')
//Array [ "123s", "123", "s" ]

'hey'.match(/(hey|ho)/)
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('hey')
//Array [ "hey", "hey" ]

/(hey|ho)/.exec('ha!')
//null
```
- `String.replace(RegExp, closure)`: Đây là một hàm khá hay ho nè.

Bình thường bạn có hay dùng `String.replace(String s1, String s2)`? và truyền vào 2 `string` để thay thế những đoạn văn bản `s1` xuất hiện trong chuỗi bằng đoạn văn bản `s2`
```js
"Hello world!".replace('world', 'you') //Hello you!
"My dog is a good dog!".replace('dog', 'cat') //My cat is a good dog!
```

nhưng bạn cũng có thể truyền regex để thay thế cácđoạn văn bản có cấu trúc như regex bạn định nghĩa, để thay thế các các đoạn văn bản đó bằng một chuỗi khác.
```js
"My dog is a good dog!".replace(/dog/g, 'cat') //My cat is a good cat!
```

hoặc truyền 1 closure để xử lý tại mỗi vị trí có đoạn văn bản cần sửa đổi. Hàm này cho phép bạn kết hợp hàm `match()` và `replace()`. 

```js
"Hello, world!".replace(/(\w+), (\w+)!/, (matchedString, first, second) => {
  console.log(first);
  console.log(second);

  return `${second.toUpperCase()}: ${first}!!!`
})
//"WORLD: Hello!!!"
```

Trên đây là một số điều mình mới tìm hiểu được về Regular Expressions. Hi vọng bài viết của mình giúp ích một chút cho các bạn :)
Cảm ơn đã bạn đọc bài viết của mình. Hẹn gặp lại bạn ở những bài viết tiếp theo.

Tài liệu tham khảo:

[A guide to JavaScript Regular Expressions](https://flaviocopes.com/javascript-regular-expressions/)

[Bảng biểu thức Regular Expression trong Javascript](https://freetuts.net/bang-bieu-thuc-regular-expression-trong-javascript-418.html)