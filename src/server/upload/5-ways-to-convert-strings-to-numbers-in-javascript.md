Convert từ `string` sang `số`, việc này các bạn đã làm không ít lần phải không?
Có khá là nhiều cách để convert như:
- parseInt(x)
- parseFloat(x)
- Number(x)
- +x
- ~~x

Bạn có thể quen thuộc với `parseInt`, `parseFloat`, `Number` và tên của họ cho thấy khá rõ những gì họ làm. Toán tử `unary plus` và toán tử `Bitwise NOT` (dấu ngã kép `~~`) ít khi được chúng ta dùng.

Hãy cùng tìm hiểu về sự khác biệt khi `convert` string thành số của 5 cách trên nhé

## 1. Type of the conversion
*Kiểu convert*
```js
parseInt("1.3")
// 1

parseInt("1")
// 1
```
Sự khác biệt rõ ràng nhất là loại kết quả trả về của mỗi cách. `parseInt` sẽ luôn chuyển đổi thành một `Integer`.

Sử dụng `~~` cũng sẽ luôn trả về 1 `Integer`
```js
~~"1.0"
// 1

~~"1.3"
// 1
```

`parseFloat`, `+` và function `Number` sẽ trả về `Integer` nếu có thể, và sẽ trả về `Float` trong các trường hợp còn lại

```js
Number("1.0")
// 1
Number("1.4"')
// 1.4

parseFloat("1.0")
// 1
ParseFloat("1.4")
// 1.4

+"1.0"
// 1

+"1.4"
// 1.4
```

## 2. Type of the operand
Tất cả các cách trên đều có thể nhận đầu vào là một string. Tuy nhiên nếu đầu vào của nó không phải là một string thì sao?

`parseInt` và `parseFloat` sẽ luôn trả về `NaN` cho mọi input không phải `string`
```js
parseInt(true);
// NaN

parseInt({});
// NaN

parseInt(null);
// NaN

parseInt(undefined);
// NaN
```

`Number`, `+` và `~~` có thể `convert` các giá trị `boolean`, trả về 1 nếu đầu vào là `true`, 0 nếu đầu vào là `false`

```js
Number(true)
// 1
+true
// 1

Number(false)
// 0
+false
// 0

~~true
// 1
~~false
//0
```
và chúng sẽ trả về `0` cho giá trị đầu vào là `null`
```js
Number(null)
// 0
+null
// 0
~~null
// 0
```

Khi giá trị đầu vào là `undefined` thì `Number` và `+` sẽ trả về `NaN` còn `~~` sẽ tả về 0

## 3. Invalid conversions
Khi mà dữ liệu đầu vào không đúng (định dạng sai) thì chúng ta sẽ thấy nhiều hơn sự khá biệt giữa cách cách trên.

parseInt và parseFloat sẽ convert nhiều nhất có thể, cho đến khi chúng tìm thấy một phần tử không thể conver.
```js
parseInt("2.3test45")
// 2

parseFloat("2.3test45")
// 2.34
```

`Number` và `+` sẽ trả về `NaN` nếu đầu vào không thể chuyển đổi. Như mọi khi, `~~` trả về một số nguyên - `0`.

Cách mỗi thao tác xử lý với một chuỗi rỗng cũng thú vị. Tất cả đều trả về 0 ngoại trừ parseInt và parseFloat trả về NaN
Có 1 điều khá là thú vị, khi convert một chuỗi trống. `parseInt` và `parseFloat` sẽ trả về `NaN` còn lại sẽ trả về 0

```js
Number('')
// 0
+''
// 0
~~""
// 0

parseInt("")
// NaN
```

## 4. Exponents, hex and other bases
`parseInt` có tính năng khá là hay, khi bạn có thể truyền thêm tham số về `hệ` (base) như tham số thứ 2. Mặc định là hệ cơ số 10
```js
parseInt('a', 16)
// 10

parseInt('11', 2)
// 3
```


Còn với `Number`, `+` và `~~ `: thì nó không hoạt động
```js
Number('a', 16)
// NaN
+"a"
// NaN
~~"a"
// NaN
```

Mặt khác, `parseInt` không thể chuyển đổi string với ký hiệu số mũ, trong khi tất cả những cách khác thì có thể. Chính xác hơn, `parseInt` sẽ dừng ở ký tự không phải là số đầu tiên, trả về kết quả không mong muốn:
```js
+"2e3"
// 2000
~~"2e3"
// 2000
Number("2e3")
// 2000
parseInt("2e3")
// 2
```

Không giống với số mũ, `parseInt` hoạt động đúng với hệ cơ số 8:
```js
Number("0xa")
// 10
+"0xa"
// 10
~~"0xa"
// 10
parseInt("0xa")
// 10
```

## Tổng kết
![sum up](https://i.imgur.com/laUqkRr.png)