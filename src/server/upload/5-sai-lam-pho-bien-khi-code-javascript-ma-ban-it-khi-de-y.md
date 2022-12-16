Bài viết hôm nay mình giới thiệu đến các bạn 5 lỗi lập trình thường gặp trong JavaScript. Tất nhiên mình sẽ không nói về các syntax error, hoặc những lỗi quá bình thường. Đây là những sai lầm rút ra từ thực tế, mà khi học và code ít để ý, cứ nghĩ là đúng nhưng kết quả cho ra khác với những gì chúng ta mong đợi.

Và đó là những lỗi gì, cách khắc phục chúng ra sao, mình sẽ trình bày hết trong bài viết hôm nay nhé.

Phần hai đã có rồi nhé cả nhà, xem ngay tại đây https://viblo.asia/p/5-sai-lam-pho-bien-khi-code-javascript-ma-ban-it-khi-de-y-phan-2-1VgZvVxpZAw.

## 1. Switch sử dụng strict comparison

Như hồi tháng 3 mình có code một thư viện đọc số thành chữ trong JavaScript. Bạn nào quan tâm có thể xem qua GitHub và cho mình một sao nhé :heart_eyes: https://github.com/tonghoangvu/read-vietnamese-number.

Một phần trong thuật toán là mình phải thực hiện parse từng chữ số ra, và đọc từng chữ số đó. Do chữ số có nhiều case để xét nên mình dùng switch case để so sánh từng case.

Và chả hiểu ra làm sao, chữ số nào nó cũng cho vào default case. Sau một hồi lâu dò bug mà không ra, mình tức quá nên bỏ không code nữa. Khoảng 1 ngày sau mới mở ra và chợt nhớ ra gì đó, mình thêm type casting vào và kết quả là chương trình chạy ổn :joy:

> Switch statement luôn sử dụng strict comparison (===) để so sánh các case.

Bực nhất là mình đã biết điều này từ trước rồi, mà khi áp dụng vào thực tế lại không nghĩ tới.  Vì vậy, mỗi khi dùng `switch case` các bạn nên kiểm tra kiểu dữ liệu của chúng phải khớp với nhau nhé.

## 2. Giá trị return ở trên dòng mới

Đây là lỗi gây ra do cách xử lý hơi "cồng kềnh" của JavaScript, mà bạn nào không biết có thể sẽ mắc phải.

> JavaScript tự động thêm dấu chấm phẩy vào cuối dòng cần thiết.

![](https://images.viblo.asia/13689de1-f9bc-4d1e-aa87-9d2ccd599946.jpg)

Và lỗi xuất hiện khi một hàm dùng `return value ` trả về một giá trị, nếu giá trị đó nằm ở dòng mới như này.
 
 ```js
 function returnObject() {
     return
     {
         name: 'Vũ',
         age: 20
     };
 }
 ```

Trong trường hợp này JavaScript sẽ tự động thêm chấm phẩy ở cuối dòng return như sau.

```js
return;  // Tự động chèn chấm phẩy
{
    name: 'Vũ',
    age: 20
}
```

Do đó đoạn code cho ra kết quả `undefined` thay vì giá trị muốn trả về. Fix cũng dễ thôi, đừng để `return` nằm một mình, thay vào đó viết dấu mở ngoặc `{` ở cuối dòng trên thay vì xuống dòng mới.

```js
return {
    name: 'Vũ',
    age: 20
}
```

## 3. Check falsy thay vì nullish

Lỗi này thường thấy ở các đoạn code để **validate** các tham số function và lấy default value. Các bạn hay dùng check falsy và gán default value như sau.

```js
function inc(a, b) {
    // Dùng if với falsy
    if (!b)
        b = 1;
        
    // Hoặc cách khác dùng OR, nhưng ngầm định cũng là check falsy
    b = b || 1;
    
    return a + b;
}
```

Và dành cho các bạn chưa rõ, thì falsy và nullish khác nhau như sau:

* **Falsy value:** các giá trị rỗng như `undefined`, `null`, `0`, `''`, `false`,...
* **Nullish value:** chỉ có `null` và `undefined`

Do đó, các số hợp lệ như 0, chuỗi rỗng,... lại không được chấp nhận và sử dụng giá trị mặc định. Ví dụ như hàm trên, kết quả của `inc(10, 0)` sẽ là 11 thay vì 10 :scream: (do số 0 là falsy nên `b` sẽ lấy giá trị mặc định là 1).

Cũng do sự nhập nhằng này nên cộng đồng JavaScript mới đòi thêm toán tử nullish vào chuẩn như bên dưới.

![](https://images.viblo.asia/1a8bd041-c4b8-4f5c-b419-592c157dbd64.png)

Giải pháp cho việc này là dùng if check rõ ràng với `null` hoặc `undefined`. Ngoài ra thì JavaScript gần đây có toán tử nullish khá hay như sau.

```js
// Check rõ ràng
if (b === undefined || b === null)
    b = 1;

// Dùng toán tử nullish
b = b ?? 1;  // Nullish coalescing operator
b ??= 1;  // Nulling assignment
```

## 4. Dùng `for...in` cho mảng

Chà trong JavaScript thì có hai vòng lặp khá tương tự nhau là `for...in` và `for...of`. Cả hai đều có thể dùng để duyệt qua một mảng, tuy nhiên chúng có sự khác biệt:

* `for...of` mỗi lần lặp biến sẽ có **giá trị** của từng phần tử
* `for...in` mỗi lần lặp biến sẽ có **chỉ mục (index)** của từng phần tử

![](https://images.viblo.asia/25f221d6-3d3c-429e-aa35-9692ab1cf0af.png)

Nếu bạn chưa hiểu thì không sao, xem qua ví dụ dưới đây là hiểu ngay ý mà.

```js
const arr = [2, 3, 5, 7];
for (let e of arr)
    console.log(e);  // 2, 3, 5, 7
for (let i in arr)
    console.log(i);  // 0, 1, 2, 3
```

Lỗi này do nhầm lẫn tác dụng giữa hai loại vòng lặp trên. Chỉ cần các bạn chú ý ghi nhớ và thực hiện code nhiều sẽ quen tay thôi.

## 5. Không lưu lại DOM element

Mình thường thấy các bạn mới tìm hiểu về DOM code kiểu như vầy.

```js
document.getElementById('email').innerText = 'user@example.com';
document.getElementById('email').addEventListener('click', function (event) { ... });
```

Viết như trên không sai, nhưng nó không tối ưu. Trên trường thì dạy cơ bản chỉ có thể, chỉ dùng `document.getElementById()` mà chưa để ý tới việc tối ưu nó. Nhiều bạn còn chưa biết kết quả của `document.getElementById()` có thể được lưu vào biến để dùng lại. Việc query element với DOM khá là chậm, nếu query nhiều lần như trên thì không hay.

Mình sẽ viết lại đoạn code trên như sau.

```js
const emailInput = document.getElementById('email');
emailInput.innerText = 'user@example.com';
emailInput.addEventListener('click', function (event) { ... });
```

Đấy, chúng ta đã lưu lại DOM element vào biến `emailInput` (biến này nên là const). Nhờ vậy đỡ được việc truy vấn element nhiều lần (như đã nói ở trên, việc này **siêu** chậm).

---

Okay và trên đây là 5 sai lầm phổ biến khi code JavaScript. Hi vọng sau khi đọc bài viết này mọi người có thể quan tâm và khắc phục nó, để viết ra những dòng code tốt hơn, chất lượng hơn.

Và đừng quên upvote hay clip bài viết của tớ nếu thấy hữu ích bạn nhé. Thank you :heart: