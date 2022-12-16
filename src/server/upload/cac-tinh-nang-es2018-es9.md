# 1. Rest/Spread Properties
ES2015 đã mang đến khái niệm về **phần tử rest** khi thực hiện **destructuring mảng**:
```javascript
const numbers = [1, 2, 3, 4, 5]
[first, second, ...others] = numbers
```

và **phần tử spread**:
```javascript
const numbers = [1, 2, 3, 4, 5]
const sum = (a, b, c, d, e) => a + b + c + d + e
const sum = sum(...numbers)
```

ES2018 cũng mang đến thứ tương tự cho object.
<br>

**Thuộc tính rest**:
```javascript
const { first, second, ...others } = { first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }
first  // 1
second // 2
others // { third: 3, fourth: 4, fifth: 5 }
```

# 2. Lặp không đồng bộ
Cấu trúc mới `for-await-of` cho phép bạn lặp một đối tượng không đồng bộ:
```javascript
for await (const line of readLines(filePath)) {
  console.log(line)
}
```

Vì sử dụng `await` nên bạn chỉ có thể dùng nó trong hàm `async`.

# 3. Promise.prototype.finally()
Khi một promise được hoàn thành, nếu thành công nó sẽ gọi các phương thức `then()`. Nếu thất bại thì method `then()`  sẽ bị bỏ qua và method `catch()` sẽ được thực thi.
<br>

Method `finally()` sẽ cho phép bạn chạy một đoạn code nào đó bất kể việc promise được thực hiện thành công hay không:
```javascript
fetch('file.json')
  .then(data => data.json())
  .catch(error => console.error(error))
  .finally(() => console.log('finished'))
```

# 4. Cải tiến Regular Expression
ES2018 có thêm một số cải tiến liên quan đến Regular Expression.

### lookbehind: match string dựa theo string đi trước nó
Trước đây chúng ta đã có **lookahead**: dùng `?=` để match một string mà nó được nối tiếp bởi một string do bạn chỉ định:
```javascript
/Roger(?= Waters)/

/Roger(?= Waters)/.test('Roger is my dog') //false
/Roger(?= Waters)/.test('Roger is my dog and Roger Waters is a famous musician') //true
```

Còn `?!` là dạng phủ định của lookahead, dùng để match một chỗi mà nó **không** được nối tiếp bởi một string do bạn chỉ định:
```javascript
/Roger(?! Waters)/

/Roger(?! Waters)/.test('Roger is my dog') //true
/Roger(?! Waters)/.test('Roger Waters is a famous musician') //false
```

Từ ES2018 chúng ta có thêm tính năng `lookbehind` (`?<=`).
```javascript
/(?<=Roger) Waters/

/(?<=Roger) Waters/.test('Pink Waters is my dog') //false
/(?<=Roger) Waters/.test('Roger is my dog and Roger Waters is a famous musician') //true
```

Dùng lookbehind ở dạng phủ định bằng `?<!`:
```javascript
/(?<!Roger) Waters/

/(?<!Roger) Waters/.test('Pink Waters is my dog') //true
/(?<!Roger) Waters/.test('Roger is my dog and Roger Waters is a famous musician') //false
```

### escape thuộc tính Unicode bằng `\p{...}` và `\P{...}`
Trong một regular expression, bạn có thể dùng `\d` để match bất kì chữ số nào, dùng `\s` để match bất kì kí tự nào không phải là khoảng trắng, `\w` để match bất kì ký tự chữ và số nào, v.v...
<br>

Tín năng mới này mở rộng khái niệm trên sang tới các kí tự Unicode bằng `p{}` và thể phủ định `\P{}`.
<br>

Bất kì kí tự unicode nào cũng đều có các thuộc tính. Ví dụ, thuộc tính `Script` thể hiện language family của kí tự, `ASCII` là một thuộc tính có giá trị kiểu boolean thể hiện kí tự có phải là kí tự ASCII hay không v.v... Bạn có thể đặt thuộc tính `ASCII` vào trong ngoặc nhọn và regex sẽ check xem có có đúng hay không:
```javascript
/^\p{ASCII}+$/u.test('abc')   //✅
/^\p{ASCII}+$/u.test('ABC@')  //✅
/^\p{ASCII}+$/u.test('ABC🙃') //❌
```

`ASCII_Hex_Digit` là một thuộc tính boolean khác dùng để check xem một string có chứa chữ số thập lục phân hay không:
```javascript
/^\p{ASCII_Hex_Digit}+$/u.test('0123456789ABCDEF') //✅
/^\p{ASCII_Hex_Digit}+$/u.test('h')                //❌
```

Còn rất nhiều thuộc tính boolean khác mà bạn có thể dùng để check bằng cách thêm tên chúng vào trong ngoặc nhọn ví dụ như `Uppercase`, `Lowercase`, `White_Space`, `Alphabetic`, `Emoji` v.v...:
```javascript
/^\p{Lowercase}$/u.test('h') //✅
/^\p{Uppercase}$/u.test('H') //✅

/^\p{Emoji}+$/u.test('H')   //❌
/^\p{Emoji}+$/u.test('🙃🙃') //✅
```

Bên cạnh các thuộc tính boolean, bạn có thể check bất kì một thuôc tính nào khác của các kì tự unicode xem nó có bằng với một giá trị nhất định nào đó hay không. Trong ví dụ sau, mình đã check xem string được viết bằng chữ Hy Lạp hay chữ Latinh:
```javascript
/^\p{Script=Greek}+$/u.test('ελληνικά') //✅
/^\p{Script=Latin}+$/u.test('hey') //✅
```

Bạn có thể tham khảo danh sách các thuộc tính của Unicode characters tại [đây](https://unicode.org/reports/tr44/#Property_Index).

### Đặt tên cho nhóm
Trong ES2018, nhóm RegEx có thể được gán tên thay vì chỉ được gán bằng số trong mảng trả về như trước đây:
```javascript
const re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
const result = re.exec('2015-01-02')

// result.groups.year === '2015';
// result.groups.month === '01';
// result.groups.day === '02';
```

### `s` flag
`s` flag, viết tắt của *single line*, khiến cho `.` có thể match được cả kí tự newline (`.` match tất cả các kí tự trừ kì tự newline):
```javascript
/hi.welcome/.test('hi\nwelcome') // false
/hi.welcome/s.test('hi\nwelcome') // true
```

---

Các bạn có thể đọc tiếp về ES2019 ở bài viết tiếp theo.