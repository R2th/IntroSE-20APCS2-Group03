JavaScript là ngôn ngữ được gõ lỏng lẻo , có nghĩa là bạn không phải chỉ định loại thông tin nào sẽ được lưu trữ trước một biến. JavaScript tự động nhập một biến dựa trên loại thông tin bạn gán cho nó (ví dụ: `''` hoặc `" "`để chỉ ra các giá trị chuỗi). Nhiều ngôn ngữ khác, như Java, yêu cầu bạn khai báo kiểu của biến, chẳng hạn như int, float, boolean hoặc String.

Hôm nay mình sẽ giới thiệu 3 tips hữu ích để giúp các bạn kiểm tra tính đúng đắn của các biến:

## #1 typeof
Bất cứ ở đâu mà bạn nghi ngờ kiểu biến là dạng gì thì có thể sử dụng toàn tử  **typeof** để kiểm tra:
```
typeof 1 //> “number”
typeof “1” //> “string”
typeof [1,2,3] //> “object”
typeof {name: “john”, country: “usa”} //> “object”

typeof true //> “boolean”
typeof (1 === 1) //> “boolean”
typeof undefined //> “undefined”
typeof null //> “object”
const f = () => 2
typeof f //> “function”
```
## # 2 Double Equals Versus Triple Equals
Sử dụng kiểm tra `==` giúp chúng ta kiểm tra theo giá trị và không cần ép buộc kiểu dữ liệu 
<br>
Còn kiểm tra `===` thì kiểm tra theo giá trị và ép buộc kiểu dữ liệu giống nhau 
Ví dụ: 

```
1 == “1” //> true
1 === “1” //> false
null == undefined //> true
null === undefined //> false
"0" == false //> true
"0" === false //> false
0 == false //> true
0 === false //> false, because they are of a different type
```
**Lưu ý**:  bạn có thể sử dụng` !==`để kiểm tra bất bình đẳng với kiểu ép buộc:

```
1 != "1" //> false
1 !== "1" //> true
```
Luôn sử dụng `===`vì đó là một cách kiểm tra kỹ lưỡng hơn và giúp bạn tránh các lỗi khó chịu.
## #3 Checking for Falsiness
Sử dụng toán tử `! `(được gọi là toán tử `bang `) để kiểm tra false, chúng tôi nhận thấy như sau:
```
![] //> false
!42 //> false
!"hello world" //> false
!null //> true
!undefined //> true
!0 //> true
!"" //> true
!false //> true
```

null, undefined, 0, “” và false tất cả trở thành sự thật khi chúng ta áp dụng các toán tử `!` . Khi chúng tôi áp dụng toán tử `!`cho những thứ tồn tại, chẳng hạn như số 42 hoặc chuỗi, xin chào world world, chúng tôi nhận được giá trị false.
<br>
Điều này cho thấy null, undefined, 0, “”, và false tất cả các đại diện không tồn tại hoặc giá trị false, nhưng không phải trong cùng một cách. 0 là một số và đại diện cho sự không tồn tại của số lượng. “” là một chuỗi và đại diện cho sự không tồn tại của chất trong chuỗi. Và cuối cùng, false là một boolean. Điều này có thể được xác nhận với một đơn giản typeof:

```
typeof 0 //> "number"
typeof "" //> "string"
typeof false //> "boolean"
```
undefined và null khó khăn hơn Như ví dụ dưới đây, chúng là các loại khác nhau, có cùng giá trị, nhưng không `===`so sánh được:
```
typeof undefined //> “undefined”
typeof null //> “object”
undefined == null //> true
undefined === null //> false
```
Bởi vì `null` à một đối tượng, chúng ta có thể thêm một số cho nó, còn underfined thì thêm một số để nó trả về cho bạn giá trị `NaN.`

```
null + //> 1
undefined + 1 //> NaN
```

`null` Đôi khi thêm một số vào có vẻ như nó có thể là một phím tắt đẹp, nhưng đừng làm điều đó

Mặc dù `null` là một đối tượng, bạn nhận được một số khi bạn thêm một số cho nó. Tuy nhiên, khi bạn thêm những thứ khác vào nó, nó cung cấp cho bạn các chuỗi không nhạy cảm:
```
null + [1,2,3]//> "null1,2,3"
null + ["hello", "world"] //> "nullhello,world"
null + {0: "hello", 1: "world"} //> "null[object Object]"
```

## Tóm lại: 
Bạn cần cẩn thận khi kiểm tra với các biến và nên sử dụng `===` thay vì `==`
<br>
Đừng cộng thêm những gì và  `null`
<br>
Cách tốt nhất để kiểm tra falsiness  là sử dụng toán tử `!`
<br>
Bài viết được lược và dịch từ: https://medium.com/dailyjs/3-tips-for-javascripts-type-system-2519ba57f954