## JavaScript series

Chương này nói về những vấn đề vụn vặt, linh tinh trong JavaScript mà mình không biết xếp nó vào đâu cả :sweat_smile:

Bài viết này là một phần của series [JavaScript dành cho người không mới](https://viblo.asia/s/javascript-danh-cho-nguoi-khong-moi-yEZkg8LgZQ0), giúp các bạn đã có kinh nghiệm code trong các ngôn ngữ khác nhanh chóng làm quen với JS.

Nếu được rất mong nhận được sự ủng hộ và đóng góp ý kiến của mọi người để hoàn thiện series.

## A. Math object

Math là một object có sẵn trong JS, chứa một số các hằng số và các hàm tính toán trong toán học. Bạn có thể sử dụng trực tiếp đối tượng Math mà không cần tạo nó.

### 1. Math constants

Bên trong Math có các hằng số toán học dưới dạng thuộc tính.

```script.js
Math.E;
Math.PI;
Math.SQRT2;
Math.SQRT1_2;
Math.LN2;
Math.LN10;
Math.LOG2E;
Math.LOG10E;
```

Tên các hằng số được viết in hoa toàn bộ, và chúng không thể được thay đổi.

### 2. Math methods

Một số method quan trọng của Math như sau.

```script.js
Math.abs(number);
Math.pow(base, exp);
Math.exp(number);  // e^x
Math.sqrt(number);
Math.cbrt(number);  // Cubic root - căn bậc 3
```

Các hàm làm tròn số

```script.js
Math.round(number);
Math.floor(number);
    // Làm tròn xuống, kể cả số âm
Math.ceil(number);
    // Làm tròn lên, kể cả số âm
Math.trunc(number);
    // Làm tròn về số nguyên, cắt bỏ phần thập phân
```

Hàm random một số thực từ 0 tới 1.

```script.js
Math.random();
```

Hàm tìm max, min của một số lượng số bất kì.

```script.js
Math.max(n1, n2, n3,...);
Math.min(n1, n2, n3,...);
```

Đối với max, min một dãy số, thì sử dụng method `apply()` để truyền array vào như sau.

```script.js
let a = [2, 5, 2, 9];
let max = Math.max.apply(null, a);
```

Tìm hiểu thêm về `apply()` tại chương JavaScript function.

## B. Error handling

Khi code chạy, có thể có những lỗi không mong muốn xảy ra. Một số lỗi có thể tìm và sửa được, như trường hợp code sai, người dùng không nhập dữ liệu, chia cho 0,... thì có thể nhanh chóng sửa được. Tuy nhiên, có một số lỗi không mong muốn như lỗi mạng, lỗi phần cứng, server từ chối,... thì không thể nào kiểm tra hết được.

Những lỗi như vậy càng lúc càng nhiều lên và không thể lường trước được, do đó cách bắt lỗi bằng cách dự đoán các trường hợp và sửa như trước đây không còn hiệu quả. Vì vậy, người ta đưa ra khái niệm exception (ngoại lệ) và exception handling (xử lý ngoại lệ).

Trong JS, thì exception gọi là error (lỗi), khái niệm này tương đương với exception trong các ngôn ngữ khác.

### 1. Try catch finally

```script.js
try {
    ...
} catch(err) {
    ...
} finally {
    ...
}
```

Cấu trúc bắt lỗi `try catch finally` được đưa ra để bắt mọi loại lỗi phát sinh khi chạy đoạn code nào đó. Cấu trúc gồm 3 phần như trên, trong đó phần finally có thể bỏ qua:

* Khối `try`: chứa những đoạn code có thể gây lỗi.
* Khối `catch`: khi có lỗi thì code hiện tại bị dừng và khối này được thực thi để xử lý lỗi nhận được (ví dụ thông báo cho user chẳng hạn). `catch` thường nhận một tham số tên là `e` hoặc `err`, đại diện cho lỗi được ném ra (không có cũng không sao).
* Khối `finally`: luôn được thực hiện, dù có lỗi hay không có lỗi.

Luồng chạy của `try catch finally` từ trên xuống. Nếu code trong `try` có lỗi, thì nhảy ngay vào `catch` để xử lý. Nếu `try` không có lỗi thì khối `catch` sẽ bị bỏ qua. Cuối cùng, nếu khối `finally` tồn tại thì sẽ thực hiện code trong khối này.

### 2. Throw an error

Dùng để ném ra một lỗi tùy chỉnh, lỗi này có thể là bất cứ thứ gì, ví dụ như một số (error code), một string (error message) hoặc một error object (sẽ bàn sau).

```script.js
throw 'Input is not valid';
throw 404;
```

Throw thường được dùng trong hàm, để ném ra một error. Và nếu hàm này được gọi trong khối `try` bên trên, thì nếu có lỗi được hàm ném ra thì `catch` sẽ bắt được nó.

Thêm một ví dụ.

```script.js
function checkAge(age) {
    if (age < 18)
        throw 'You must be at least 18 years old :D');
}
...
try {
    // Input age
    checkAge(16);  // :)
    console.log('Oh, welcome to X');
} catch (e) {
    console.log('Chưa đủ tuổi thì biến đi nha, ahihi');
    console.log(e);  // You must be at least 18 years old :D
}
```

Code trên dùng nhập tuổi của user, và dùng `checkAge()` để kiểm tra. Thay vì trước đây kiểm tra hàm sẽ trả về boolean, true thì ok và false thì không được, nhưng ở đây chúng ta sẽ dùng error thay thế.

Nếu `age` nhỏ hơn 18 thì `checkAge()` sẽ ném ra một error, là dòng chữ `You must be...`. Khối `try` khi phát hiện error thì sẽ dừng lại ngay, và nhảy qua `catch`. Khối này nhận lỗi vào tham số `e`, và in ra màn hình console.

Ngược lại, `age` lớn hơn 18 thì không có lỗi ném ra, các lệnh trong `try` được đi tiếp và cuối cùng được thông báo `Oh, welcome to X`.

### 3. Nested try catch

Khối `try catch finally` có thể được lồng nhau (nested) như sau. Và nên hạn chế viết lồng nhau như vậy.

```script.js
try {
     try {
         checkAge(16);
         // Các trò XYZ bình thường
     } catch(e1) {
         console.log(e1);
     }
     // Những trò ABC, XYZ khác ở đây :)
} catch(e2) {
    console.log(e2);
}
```

Điều này làm một vấn đề khác phát sinh, là khi `checkAge()` có lỗi thì khối `catch` nào sẽ bắt lỗi đó. Như code trên thì chỉ có khối `catch(e1)` mới nhận và xử lý lỗi. Vậy thì chỉ chặn được user truy cập `những trò XYZ bình thường` nhưng vẫn có thể tiếp tục với `những trò ABC, XYZ khác`.

Như vậy, nếu muốn cả hai khối đều nhận được lỗi thì làm sao. Nghĩa là nếu `try` bên trong bị lỗi, thì `try` bên ngoài cũng nhận được lỗi và dừng luôn. Như vậy mới đảm bảo an toàn.

Lúc này, lệnh `throw` sẽ phát huy tác dụng thứ 2 của nó, là chuyển tiếp lỗi tới khối bắt lỗi tiếp theo. Sửa lại code như sau.

```script.js
try {
     try {
         checkAge(16);
         // Các trò XYZ bình thường
     } catch(e1) {
         console.log(e1);
         throw e1;  // Hereeeee
     }
     // Những trò ABC, XYZ khác ở đây :)
} catch(e2) {
    console.log(e2);
}
```

Lỗi khi được xử lý trong `catch(e1)` xong sẽ được ném (chuyển tiếp) trở lên cho khối `try catch` lớn bên ngoài biết, và từ đó `catch(e2)` sẽ nhận được và xử lý.

### 4. Error object

JS có một số error object có sẵn, mỗi error gồm 2 thuộc tính name và message kiểu chuỗi để mô tả một error. Các hàm có sẵn trong JS sẽ ném ra error object mỗi khi có lỗi.

```script.js
try {
    abc(10);
} catch(e) {
    console.log(e.name, e.message);
}
```

Đoạn code trên bị lỗi "abc không tồn tại", và lỗi được JS ném ra có tên là `ReferenceError` và message là `abc is not defined`.

Một số error object có sẵn thông dụng:

* `RangeError`: vượt quá phạm vi cho phép
* `TypeError`: kiểu sai, hoặc truy cập vào null (tương tự NullPointerException bên Java)
* `SyntaxError`: cú pháp sai
* `ReferenceError`: biến chưa định nghĩa, chưa khai báo

Ngoài ra còn một số loại error object khác nữa. Các lỗi trên là những lỗi tiêu chuẩn trong JS, ngoài ra còn có các lỗi không tiêu chuẩn (non-standard) tùy vào loại trình duyệt.

## C. JSON

### 1. JSON introduction

JSON (JavaScript Object Notation) là một bộ cú pháp định dạng dữ liệu, thường dùng trong lưu trữ và trao đổi dữ liệu giữa client và server tương tự XML.

JSON có các đặc điểm sau:

* Gọn nhẹ (light-weight)
* Self describle: tự nó nói lên nội dung của nó, hiểu đơn giản là đọc vào là hiểu liền :D
* Tương thích cao, không phụ thuộc ngôn ngữ

**JSON and JS**

JSON có cú pháp tương tự JS object, nhưng bản chất JSON chỉ là đọan text, do đó ngoài JS thì có các ngôn ngữ khác cũng có thể sử dụng được JSON (trực tiếp hoặc thông qua các thư viện).

Vì cấu trúc tương tự JS object, nên việc xử lý JSON trong JS dễ dàng hơn nhiều.

**JSON vs XML**

**Cross domain policy & JSONP**

### 2. JSON syntax

JSON tuân theo một số quy tắc viết nhất định, chỉ cần đúng quy tắc thì hoàn toàn có thể xử lý được và không có lỗi.

**Data pair**

Dữ liệu được lưu trong JSON có dạng cặp (pair) gồm key và value tương tự như property và value trong JS. Giữa key và value là hai chấm, giữa các pair vớ nhau là dấu phẩy.

JSON không cho phép trailing comma, nghĩa là dấu phẩy nằm cuối cùng, trong khi JS vẫn được.

```api.json
[
    1, 2, 3,  // Sai
]
```

Điểm khác với cú pháp object trong JS là tên key JSON luôn phải dùng cặp `""` bao lại (phải là nháy đôi, không chấp nhận nháy đơn hay gì gì khác).

**Data types**

JSON chấp nhận các value thuộc các kiểu:

* Null
* Number
* Boolean
* String: cần dùng cặp nháy đôi "" bao lại
* Object: đặt trong cặp {}, trong cặp đó gồm nhiều cặp `key: value` viết tương tự
* Array: đặt trong cặp [], mỗi phần tử cách nhau bởi dấu phẩy

Khác với object, JSON là thuần chứa dữ liệu nên nó không cho phép các kiểu:

* Function
* Date
* Undefined

```api.json
[
    {
        "name":"John",
        "age":20
    },
    {
        "name":"Vu",
        "age":18
    }
]
```

Đoạn JSON mẫu trên là một mảng gồm 2 object con, mỗi object có hai thuộc tính `name` và `value`.

**Nested**

Các data pair có thể được lồng vào bên trong array hoặc object. Chú ý khi lồng vào trong object thì phải thuộc về một key nào đó mới hợp lệ, như ví dụ sau.

```api.json
// Không hợp lệ
{
    10,  // Sai
    [1, 2, 3]  // Sai
}

// Hợp lệ
{
    "age":10,
    "data": [1, 2, 3]
}
```

**JSON minify**

JSON nhiều lúc bạn sẽ thấy nó không được viết trên nhiều dòng như trên, chỉ có một dòng, không có tab hay khoảng trắng gì cả, đó là JSON được minify để giảm dung lượng xuống.

```api.json
// Chưa minify
{
    "name": "John",
    "age": 20
}

// Đã minify
{"name":"John","age":20}
```

Dù là đoạn nào thì cũng hợp lệ vì đúng với cấu trúc JSON, tuy nhiên đoạn được minify thì dung lượng nhỏ hơn và giúp đỡ tốn băng thông khi truyền, do đó hay được sử dụng.

Ngược lại với minify là pretty print, giúp biến đoạn JSON đã rút gọn trở nên đẹp hơn.

### 3. JSON handling

Xử lý JSON trong JS cực dễ, chỉ gồm hai thao tác:

* Parse: từ chuỗi JSON thành một object trong JS
* Stringify: từ object thành chuỗi JSON

Hai thao tác trên tương ứng với hai method của đối tượng JSON.

**JSON.parse method**

```script.js
let json = '{"name":"John","age":20}';
let obj = JSON.parse(json);
```

Phân tích chuỗi JSON thành một object. Chuỗi JSON dạng minify hay không cũng được, chỉ cần đúng cú pháp là parse thành công.

**JSON.stringify method**

Tạo chuỗi JSON từ object.

```script.js
let obj = {
    name: 'John',
    age: 20
};
let json = JSON.stringify(obj);
```

Chú ý nếu object chứa các thuộc tính Date, undefined hoặc method thì chúng sẽ không được thêm vào chuỗi JSON.

Mặc định chuỗi JSON tạo ra đã được minify, sửa code lại như sau để làm chuỗi JSON đẹp và dễ đọc hơn.

```script.js
let json = JSON.stringify(obj, null, 2);
```

Tham số thứ 3 ở trên là số space dùng để indent (thụt tab) vào. Tham số thứ 2 là một replacer nhưng thường ít dùng nên đặt là null.

## D. Regex

### 1. Regex introduction

Regex (biểu thức chính quy - regular expression - regexp) là một đoạn text ngắn dùng mô tả một mẫu (pattern) để tìm kiếm trong văn bản. Thay vì tìm kiếm chính xác một chuỗi, thì tìm kiếm bằng regex sẽ cho ra kết quả những phần nào khớp với những quy tắc mà regex định nghĩa.

Ví dụ như việc tìm tất cả số điện thoại trong một văn bản dài. Rõ ràng tìm kiếm bình thường không thực hiện được vì không biết chính xác số nào, chỉ biết được cấu trúc của SĐT gồm một số 10 chữ số. Do đó, chúng ta sử dụng regex `/\d{10}/g` để tìm.

Tất nhiên, để tìm được chính xác thì cần biết cách viết các kí hiệu của regex đúng theo yêu cầu. Phần này sẽ được bàn kĩ hơn trong một post khác, các bạn có thể tìm hiểu thêm.

### 2. Regex trong JS

**Chuỗi regex**

Regex chỉ là một chuỗi text có quy tắc nhất định, nên trong JS nó cũng là một string. Và chuỗi regex này được viết hơi khác so với string bình thường.

```script.js
let regex = /\d{10}/g;
```

Chuỗi regex trong JS gồm 2 phần:

* Phần pattern (trong cặp `//`): định nghĩa cấu trúc regex
* Phần flags( phía sau bên ngoài cặp `//`): các tùy chọn bổ sung cho regex.

Khi tìm kiếm với regex xong, thì thường kết quả trả về một mảng các chuỗi con khớp với regex, mỗi chuỗi con khớp gọi là một match.

**Kiểm tra match**

Dùng method `.test()` để kiểm tra một chuỗi có match với một regex không.

```script.js
let regex = /\d{10}/g;
regex.test('So dien thoai cua 23412 la 0234321345');  // true
```

Chỉ cần một phần regex match là được. Nếu muốn cả chuỗi phải khớp, không có phần nào dư thừa thì dùng thêm chỉ thị neo điểm đầu `^` và điểm cuối `$` cho regex.

Thường dùng method này trong việc check xem input người dùng có đúng hay không (validate). Ví dụ như check một chuỗi có phải email, đúng khi nó khớp với chuỗi regex mô tả email (tìm trên google :D).

**Lấy danh sách match**

Dùng method `.match()` để lấy danh sách các match regex trong một chuỗi.

```script.js
let s = 'Hello, I am 234 and my name is 334';
let a = s.match(/\d/g);
    // a = ['234', '334']
```

Regex `/\d/g` tìm tất cả (flag `g`) các số `\d` trong chuỗi s đã cho. Kết quả trả về là một mảng a gồm 2 phần tử như trên.

**Regex in functions**

Một số hàm, method trong JS có hỗ trợ regex, đơn cử như method `split()` của string dùng để cắt chuỗi thành nhiều chuỗi con, phân tách nhau bởi dấu phân tách (separator).

Ví dụ như tách các từ trong chuỗi như sau.

```script.js
let s = 'Toi yeu   Viet  Nam';
let a = s.split(' ');  // Cách cũ, separator là khoảng trắng
    // a = ['Toi', 'yeu', '', '', 'Viet', '', 'Nam']
```

Sử dụng cách cũ sẽ chỉ cắt theo 1 khoảng trắng duy nhất, nên kết quả cho ra không đúng với mong muốn. Lúc này là lúc regex phát huy tác dụng, vì hàm `split()` có hỗ trợ regex làm separator. Chúng ta sửa code lại như sau.

```script.js
let s = 'Toi yeu   Viet  Nam';
let a = s.split(/\s+/);  // Cách mới
    // a = ['Toi', 'yeu', 'Viet', 'Nam']
```

Kết quả cho ra đúng với mong muốn, mặc dù các từ có bao nhiêu khoảng cách đi chăng nữa.

Giải thích regex `/\s+/` bên trên một chút:

* Token `\s` là chỉ khoảng trắng (space)
* Dấu `+` là chỉ kí tự phía trước có thể lặp lại 1 hoặc nhiều lần.

Ngoài hàm `split()` như trên, thì JS còn nhiều hàm, method khác hỗ trợ regex làm tham số như `.search()`, `replace()`,... có thể tìm hiểu thêm.