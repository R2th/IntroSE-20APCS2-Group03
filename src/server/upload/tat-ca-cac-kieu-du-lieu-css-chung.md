Giá trị cho các thuộc tính trong CSS có thể ở một số định dạng. Để một tác nhân người dùng có thể xác định xem một giá trị có hợp lệ hay không, nó cần đảm bảo rằng nó phù hợp với một trong các loại giá trị cụ thể. Đây được gọi là kiểu dữ liệu và thường được viết bằng thông số kỹ thuật như `<this>`
Có hai loại kiểu dữ liệu - cụ thể và chung chung. Các kiểu dữ liệu cụ thể có liên quan đến một thuộc tính đơn lẻ hoặc một nhóm nhỏ các thuộc tính. Ví dụ, kiểu dữ liệu <transform-function> được sử dụng như là giá trị cho thuộc tính transform một mình.
Mặt khác, các kiểu dữ liệu chung không liên quan đến bất kỳ thuộc tính cụ thể nào. Ví dụ, chúng ta có thể có một giá trị là 10px, là một kiểu dữ liệu` <length>`, cho margin, font-size hoặc một số các số hợp khác.

Trong bài viết này, tôi sẽ cung cấp một cái nhìn tổng quan về tất cả các kiểu dữ liệu chung chung.

| Category | Name | Type |
| - | - | - |
| Textual | Keywords | `<ident>` |
| | Custom Keywords	|` <custom-ident>` |
| | Quoted Strings	| `<string>` |
| | Resource Locators | `<url>` |
| Basic Numeric |	Integers  |   `<integer>` |
| |Real Numbers |	`<number>` |
| |Ratios|	`<ratio>`|
| |Percentages|	`<percentage>` |
|Dimensions|	Distances|	`<length>` |
| |Angles |`	<angle>` |
| |Duration |	`<duration> `|
| |Frequency	| `<frequency> `|
| |Resolution |	`<resolution>` |
|Other|	Colours |` <color> `|
| |Images|`	<image> `|
| |Position	| `<position> `|

### Textual Data Types
**Keywords**

Loại dữ liệu `<ident>` đề cập đến các từ khóa được xác định trước trong CSS. Điều này bao gồm cả các giá trị duy nhất cho các thuộc tính nhất định, ví dụ `block` cho thuộc tính `display`, cũng như các giá trị trên toàn CSS ban đầu, kế thừa và không được đặt (vd Initial, Inherit, Unset và Revert).

```
.foo {
  border-color: red;
  position: inherit;
}
```

Những từ khóa này không phân biệt chữ hoa chữ thường và phải luôn được viết mà không có dấu ngoặc kép, ít bị hiểu nhầm hơn dưới dạng loại dữ liệu ` <string>`.

**Custom Keywords**

Loại dữ liệu `<custom-ident>` (còn được gọi là `<user-ident>`) đề cập đến các từ khóa đã được xác định bởi tác giả của stylesheet. Có những hạn chế đối với những gì có thể là `<custom-ident>` hợp lệ, ví dụ: nó không thể là một trong các giá trị trên toàn CSS.

Ví dụ phổ biến về từ khóa tùy chỉnh là giá trị cho thuộc tính tên animation-name. Thuộc tính này có thể chấp nhận làm giá trị của nó là tên của một hoạt ảnh tùy chỉnh, như được định nghĩa bởi tác giả của stylesheet.

```
@keyframes hulkify {
  
  from { 
    color: pink; 
    transform: scale(1);
  }
  
  to { 
    color: green; 
    transform: scale(2);
  }

}
.bruce-banner { animation-name: hulkify; }
```

**Quoted Strings**

Loại dữ liệu` <string>` đề cập đến bất kỳ chuỗi được trích dẫn nào. Văn bản trong dấu ngoặc kép có thể là bất kỳ chuỗi ký tự Unicode nào.
```
.foo::after {
  content: "Hello, world!";
}
.foo::before {
  content: "We can add 'quotes' within quotes \A And move to a separate line";
}
```

**Resource Locators**

Kiểu dữ liệu `<url>` được sử dụng để tham chiếu đến tệp hoặc đoạn tài nguyên. Kiểu dữ liệu này thường được viết bằng hàm url (), nhưng có thể được biểu diễn dưới dạng ` <string>` trong một số trường hợp, đặc biệt là với quy tắc `@import`.
Có ba loại URL có thể được sử dụng với loại dữ liệu này -

* Absolute URL là những URL chỉ định giao thức và miền. Tài nguyên mà các URL này hướng đến không nhất thiết phải có cùng tên miền với biểu định kiểu mà chúng được giới thiệu.
* Relative URL  là những URL liên quan đến một tệp sử dụng vị trí của biểu định kiểu giới thiệu làm vị trí cơ sở.
* Fragment URL được sử dụng để chỉ các phần tử trong chính tài liệu lưu trữ. Tham chiếu là ID của phần tử chứ không phải đường dẫn đến tệp.

```
/* Absolute URL */
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400");

 /* Realtive URL */
.foo { background-image: url("../img/bg.png"); }
@import "components/buttons.css";

 /* Fragment URL */
.bar { filter: url("#blurFilter"); }
```

### Basic Numeric Data Types

**Integers**

Một kiểu dữ liệu` <integer> `giống như một số nguyên được định nghĩa bằng toán học. Đó là một số nguyên, tức là không phải là một phần nhỏ và có thể là vị trí hoặc phủ định. Chữ số đầu tiên có thể được đặt trước bởi dấu - hoặc + để biểu thị dấu của nó, mặc dù dấu + được ngụ ý nếu không có gì được chỉ định.

```
.foo { z-index: 10; }
.foo { z-index: +10; }
.bar { z-index: -10; }
```

**Real Numbers**

Loại dữ liệu` <number>` là "số thực". Nó có thể là một `<integer>`, 0 hoặc một phần nhỏ được viết dưới dạng số thập phân. Giống như số nguyên, số thực có thể dương hoặc âm, như được chỉ ra bởi một dấu hiệu đứng trước chữ số đầu tiên.
```
.foo { line-height: 3; }
.bar { line-height: -2.5; }
.foo { line-height: +5.5; }
```

**Ratios**

Loại dữ liệu `<ratio> `chỉ định mối quan hệ giữa hai số, cụ thể là hai số nguyên `<s>`. Mặc dù tỷ lệ có thể được viết theo những cách khác nhau trong toán học, trong CSS chúng luôn được viết dưới dạng` <integer> / <integer>`.
Loại dữ liệu tỷ lệ thường được sử dụng trong các truy vấn phương tiện để nhắm mục tiêu tỷ lệ cỡ ảnh của thiết bị.
```
@media screen and (device-aspect-ratio: 16/9) { /* Wide screen displays, iPhone 5 */ }
@media screen and (device-aspect-ratio: 4/3) { … }
```

**Percentages**

Loại dữ liệu `<percent>` được tạo thành từ một `<number>` theo sau là dấu%. Nó đại diện cho một giá trị là một phần của một số giá trị khác với kiểu dữ liệu riêng của nó. Do đó, chúng tôi có thể có các loại dữ liệu phần trăm khác nhau, tùy thuộc vào loại dữ liệu giá trị.

384/5000
* Loại dữ liệu `<length-percentage>` đại diện cho một phần của giá trị `<length>`.
* Loại dữ liệu `<number-percentage>` đại diện cho một phần nhỏ của giá trị `<number>`.
* Loại dữ liệu `<angle-percentage>` đại diện cho một phần của giá trị` <angle>`.
* Loại dữ liệu `<time-percentage>` đại diện cho một phần nhỏ của giá trị `<time>`.
* Loại dữ liệu `<frequency-percentage>` đại diện cho một phần nhỏ của giá trị `<frequency>`.

```
.foo { 
	width: 50%; /* <length-percentage> */
	line-height: 200% /* <number-percentage> */
	voice-pitch: 25% /* <frequency-percentage> */
} 
```

### Dimensional Data Types

Thứ nguyên là các loại dữ liệu số, cụ thể là `<number>` , nhưng đủ điều kiện theo đơn vị đo lường. Chúng được viết dưới dạng `<number>` theo sau là mã định danh đơn vị. Tuy nhiên, khi `<number>` là 0, nó có thể được viết mà không có đơn vị của nó.

**Distances**

 Loại dữ liệu` <length>` đại diện cho các đơn vị khoảng cách. Có hai loại đơn vị độ dài.
* Các đơn vị tuyệt đối, ví dụ px, cm và pt, được cố định và (chủ yếu) liên quan đến một số phép đo vật lý. Khi chúng được khai báo, kích thước của chúng không thể bị thay đổi bằng cách thay đổi kích thước phông chữ của phần tử chứa.
* Các đơn vị tương đối, ví dụ như em, rem và các đơn vị khung nhìn, không có phép đo khách quan. Thay vào đó, kích thước thực của chúng được xác định bởi kích thước của phần tử cha. Điều này có nghĩa là kích thước của chúng có thể được thay đổi bằng cách thay đổi kích thước của phần tử phụ thuộc đó.

(See CSS Font Sizing)

```
.foo { 
	font-size: 16px; /* absolute */
	width: 50vw; /* relative */
} 
```

**Angles**

Kiểu dữ liệu `<angle>` đại diện cho một góc của một hình tròn. Có bốn đơn vị chúng ta có thể sử dụng để xác định kích thước góc cạnh này.

* Đơn vị deg đại diện cho góc theo Độ. Có 360 độ trong một vòng tròn đầy đủ.
* Đơn vị grad đại diện cho góc trong Gradians. Có 400 học sinh tốt nghiệp trong một vòng tròn đầy đủ.
* Đơn vị rad đại diện cho góc trong Radian. Có 2πrad trong một vòng tròn đầy đủ (khoảng 57,29rad).
* Các đơn vị lần lượt đại diện cho góc trong Turns. Có 1 lượt trong một vòng tròn đầy đủ.

Các đơn vị này có thể là dương hoặc âm, biểu thị nếu lượt này diễn ra theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ. Dưới đây là một ví dụ về cách xoay 90 độ theo chiều kim đồng hồ có thể được viết trong mỗi đơn vị này.

```
.foo { 
    /* Going clockwise */
	transform: rotate(90deg);
	transform: rotate(100grad);
	transform: rotate(0.25turn);
	transform: rotate(1.57rad);
	
	/* Going anti-clockwise */
	transform: rotate(-270deg);
	transform: rotate(-300grad);
	transform: rotate(-1.25turn);
	transform: rotate(-55.72rad);
} 
```

**Duration**

Loại dữ liệu `<time>` đại diện cho một đơn vị thời gian. Có hai đơn vị chúng tôi có thể sử dụng để xác định thời lượng.
* Đơn vị s đại diện cho một giây.
* Các đơn vị ms đại diện cho một phần nghìn giây. Có 1000 mili giây trong một giây.

```
.foo { transition-duration: 1s; } 
.bar { transition-duration: 1000ms; }
```

**Frequency**

Loại dữ liệu `<frequency>` đại diện cho tần số âm thanh. Có hai đơn vị chúng tôi có thể sử dụng để xác định tần số.
* Đơn vị kHz đại diện cho một KiloHertz.
* Các đơn vị Hz đại diện cho một Hertz. Có 1000 KiloHertz trong một Hertz.

```
.foo { voice-pitch: 250Hz; } 
.bar { voice-pitch: 1kHz; } 
```

**Resolution**

Loại dữ liệu <resolution> đại diện cho độ phân giải của thiết bị hiện tại của người dùng. Độ phân giải chính nó là kích thước của một "dot" duy nhất. Kích thước của dot này được tính bằng cách cho biết có bao nhiêu điểm trong số đó sẽ vừa với CSS, centemetre hoặc pixel. Tùy thuộc vào đơn vị CSS nào chúng tôi đang sử dụng, chúng tôi có thể chỉ định độ phân giải theo một trong bốn đơn vị.
    
* Đơn vị dpi đại diện cho số lượng dấu chấm sẽ phù hợp với CSS Inch.
* Đơn vị dpcm đại diện cho số lượng dấu chấm sẽ phù hợp với CSS Centemetre.
* Đơn vị dppx đại diện cho số lượng dấu chấm sẽ phù hợp với CSS Pixel.

```
@media (min-resolution: 100ddpx) { .. }
@media (min-resolution: 100dpcm) { .. }
@media (min-resolution: 300dpi) { /* Retina display */ }
```

### Other Data Types

**Colours**

Kiểu dữ liệu `<color>` được sử dụng để xác định giá trị màu. Kiểu dữ liệu có thể là một trong hai định dạng.
* Từ khóa, có thể là một trong các màu được xác định trước (ví dụ: cornflowerblue), từ khóa trong suốt hoặc từ khóa hiện tại màu sắc.
* Giá trị số sử dụng một trong các ký hiệu màu; # rgb rgb (), rgba (), hsl (), hsla ().

Dưới đây là một ví dụ về cách chúng ta có thể đạt được màu đen bằng cách sử dụng các định dạng khác nhau này.

```
.foo {
   color: black;
   color: #000;
   color: rgb(0,0,0);
   color: rgba(0,0,0,1);
   color: hsl(0,0%,0%);
   color: hsla(0,0%,0%, 1);
}
```

**Images**

Loại dữ liệu` <image>` đại diện cho một hình ảnh 2D. Nó có thể là một trong ba định dạng.
* Tham chiếu URL, được chỉ định bằng cách sử dụng loại dữ liệu` <url>`.
* Một phần tử trong tài liệu, sử dụng hàm element (). (Lưu ý - Chức năng này có hỗ trợ rất hạn chế).
* Một hàm gradient, sử dụng kiểu dữ liệu` <gradient>`.

```
.foo { background-image: url('path/to/bg.png'); }
.bar { background-image: element('#background'); }
.baz { background-image: linear-gradient(white, gray); }
```

**Position**

Kiểu dữ liệu ` <position>` biểu thị vị trí của một phần tử trong một vùng hoặc phần tử có chứa. Nó có thể là một trong ba loại dữ liệu khác.
* Từ khóa ở trên cùng, bên phải, dưới cùng, bên trái hoặc giữa.
* Giá trị độ dài.
* Tỷ lệ phần trăm, cụ thể là <length-percentage>, value.

Dưới đây là ví dụ về cách đạt được hình nền (100x100px) để được đặt ở góc dưới cùng bên phải của vùng chứa (300x300px).

```
.foo { 
  background-position: right bottom;
  background-position: 200px 200px;
  background-position: 100% 100%;
}
```
---
Nguồn: https://bitsofco.de/generic-css-data-types/