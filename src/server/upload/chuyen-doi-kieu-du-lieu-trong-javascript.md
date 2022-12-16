Mặc dù JavaScript là ngôn ngữ không chặt chẽ về kiểu dữ liệu, tuy nhiên nhiều khi chúng ta vẫn cần chuyển đổi từ kiểu dữ liệu này sang kiểu khác.
JavaScript có các kiểu dữ liệu nguyên thủy  (primitive types):

```
* Number
* String
* Boolean
* Symbol
```
và kiểu đối tượng
```
* Object
(bao gồm cả null và undefined)
```

Bài viết sẽ mô tả các trường hợp phổ biến nhất khi cần chuyển đổi kiểu.
### 1. Chuyển đổi sang String
Có 2 cách để chuyển đổi
- sử dụng phương thức `toString()` của kiểu giá trị đó (`Number, Boolean, Date `đều có phương thức này)
- truyền giá trị vào hàm `String()`

#### Number -> String
Use the String global function, or the Number type toString() method:

```
String(10) //"10"
(10).toString() //"10"
```
#### Boolean -> String
Use the String global function, or the Boolean type toString() method:

```
String(true) //"true"
true.toString() //"true"
String(false) //"false"
false.toString() //"false"
```
#### Date ->  String

```
String(new Date('2019-01-22'))
//"Tue Jan 22 2019 01:00:00 GMT+0100 (Central European Standard Time)"

(new Date('2019-01-22')).toString()
//"Tue Jan 22 2019 01:00:00 GMT+0100 (Central European Standard Time)"
```

#### Trường hợp đặc biệt
```
String(null) //"null"
String(undefined) //"undefined"
String(NaN) //"NaN"
```

### 2. Chuyển đổi sang Number
#### String -> Number
Sử dụng hàm Number

```
Number("1") //1
Number("0") //0
```
String sẽ được trim trước khi chuyển đổi sang dạng số

`Number(" 1 ") //1`

String rỗng sẽ được chuyển thành 0
```
Number("") //0
```
và nó cũng sẽ hoạt động với số thập phân

```
Number("12.2")
```
Nếu string chứ các kí tự không hợp lệ, nó sẽ trả về giá trị `NaN`

Trên đây là cách cơ bản để thực hiện convert sang dạng Number. Ngoài ra, còn có một số cách khác nữa như `parseInt(), parseFloat(), Math.floor()`, hoặc toán tử `+`, toán tử  `*`.  Trong các cách này, thì sử dụng toán tử `*` có tốc độ lý tưởng nhất

![](https://images.viblo.asia/1473142e-5e7b-44b9-90e7-858010b5eeba.png)
Chi tiết hơn bạn có thể xem [ tại đây](https://flaviocopes.com/how-to-convert-string-to-number-javascript/)

#### Boolean -> Number
Tương tự như với string, truyền một giá trị boolean vào `Number()` sẽ trả về giá trị 0 hoặc 1

```
Number(true) //1
Number(false) //0
```

#### Date -> Number
Khi bạn truyền 1 đối tượng Date vào `Number()`, nó sẽ trả về giá trị timestamp tương ứng của date đó

#### Trường hợp đặc biệt
```
Number(null) //0
Number(undefined) //NaN
Number(NaN) //NaN
```

### 3. Chuyển đổi sang Boolean
Mọi giá trị đều có thể chuyển thành dạng boolean khi sử dụng `Boolean()`.

Tất cả sẽ trả về giá trị `true` ngoại trừ các trường hợp sau:

```
Boolean(false) //false
Boolean(0) //false
Boolean(NaN) //false
Boolean("") //false
Boolean(null) //false
Boolean(undefined) //false
```
Bài viết đã tổng hợp một số dạng chuyển đổi thường gặp, hi vọng có thể giúp các bạn phần nào khi giải quyết các bài toán thực tế. Cảm ơn các bạn đã theo dõi bài viết.  
Nguồn: https://flaviocopes.com/javascript-casting/