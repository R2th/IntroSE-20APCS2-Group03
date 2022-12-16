> Phỏng vấn thì muôn hình vạn trạng, nhưng kiểu gì thì khả năng cao vẫn sẽ hỏi mấy câu này (chắc vậy :v)
> 
> Tuỳ sở thích từng người, mà có thể hỏi kiểu khó trước - dễ sau, hay từ dễ đến khó. Còn bài viết này thì sắp xếp tuỳ hứng, chả theo thứ tự nào cả!*

### bạn có biết xài IIFE?
```
Tip: nếu câu trả lời là "không, tôi chưa dùng bao giờ" hay "biết! nhưng tôi ít khi dùng", thì 9/10 là cái ông này code JS kiểu ăn xổi.

Answer: JS nó chẳng thích tính scope của variable theo block {}, mà nó tính theo từng function. Ví dụ:
if (true) {
     var foo = 'foo'
}
console.log(foo) // 'foo' => oops, foo lẽ ra ko nên tồn tại ngoài block if

Vì lí do vậy, ta rất dễ làm bẩn scope bên ngoài do ko giới hạn đc scope của variable. Và khi nó tòi ra ngoài, một vùng code khác cũng gọi/sửa cái biến foo trời đánh kia mà không nghĩ nó tồn tại, thì có chúa mới biết output là gì.
Vậy nên ta có 3 option (ủa tưởng là 2 :v?):
- đặt tên biến ko thể trùng lặp :v...
- dùng let/const thay vì var.
- bọc nó vào 1 function, cơ mà cần cục code phải chạy luôn, và cũng ko muốn đặt tên cho function.
(() => {
    var foo = 'foo'
})() // đây là cái IIFE
console.log(foo) // undefined => tuyệt!
```

### bạn biết xài callback chứ?
```
Tip: câu trả lời nên là "đơn giản thôi anh!"

Answer: do cơ chế hoạt động của JS engine (cái hoạt động khá phức tạp mà có lẽ cần hẳn 1 bài viết để phân tích về nó), code viết sau chưa chắc đã chạy sau, dí dụ quen thuộc với JQuery:
var response = $.ajax('link/to/resource')
do_something(response) // tọi luôn vì response là undefined

Đợi có kết quả mới chạy code tiếp? đơn giản là truyền logic vào callback:
$.ajax('link.to/resource/', do_something)
```

### promise là cái chi?
```
Tip: hay một cách hỏi khác là thằng callback có những vấn đề gì?

Answer: bạn hãy
- than vãn về callback hell khiến code khó maintain
- cằn nhằn về việc catch error chuẩn xác với callback là điều bất khả thi
```

### closure là cái gì?
```
Tip: đây là một khái niệm khá mông lung, nhiều người dùng JS lâu năm mà hỏi chưa chắc có thể cắt rõ nghĩa cho người khác hiểu được

Answer: là khả năng ghi nhớ, của một function, về scope nơi nó được tạo ra. Thí dụ:
function counter() {
    var count = 0
    return {
        getCount: function() { return count },
        increase: function() { count++ }
    }
 }
 myCounter = counter()
 myCounter.increase()
 myCounter.getCount() // 1
 
 Đến đây bạn vẫn chưa hiểu ý đồ lắm đúng ko, vậy thì mình sẽ thêm vài dòng code sau:
 yourCounter = counter()
 yourCOunter.getCount() // 0
 
 => Ồ, getCount, increase, bọn nó nhớ về thằng count ở scope nó được tạo ra.
 Ờ vậy thế thì sao? Thì ta có thể dùng cái kĩ thuật này để giấu state, vì JS thì méo có class rồi thì public/private như java. Nói chung, đây là chìa khoá để thực hiện encapsulation, một trong những khái niệm trụ cột của OOP.
```

### undefined khác vẹo gì null?
```
Tip: thường là câu hỏi để làm nóng buổi phỏng vấn, còn nếu người ta hỏi câu này ở cuối buổi thì có lẽ là khá tuyệt vọng rồi ==!

Answer: undefined là chưa đc khởi tạo, null là khởi tạo rồi, có giá trị rồi, và giá trị ấy là null. (à vậy thì kết luận luôn null là một giá trị chứ ko phải là ko là gì nhé)
```

### khi nào dùng call và khi nào dùng apply?
```
Tip: thực ra 2 cái hàm này nó chỉ khác nhau cái API, câu này chủ yếu để dẫn mở cho chủ đề về "this"

Answer:
- call là để hard binding cái this vào 1 context cụ thể.
- apply cũng vậy, nhưng đống parameters được truyền vào là array thay vì là các optional parameter như call. Giả dụ như sau:
myFunction.call(myContext, param1, param2)
myFunction.apply(myContext, [param1, param2])
```

### cần lưu ý gì khi dùng giá trị falsy
```
Tip: chủ yếu là mang tính hỏi mẹo, nhưng cũng đủ để đoán ra được thời gian bạn làm việc với JS.

Answer:
- array cũng đc coi là falsy, nên nếu có array thì lại phải check cả độ dài của array nữa.
- object rỗng thì lại coi là truthy, nên check object thì lại nên viết thêm hàm để check cho tiện.
```

### this là gì?
```
Tip: cái này là một trong những phần trọng tâm của buổi phỏng vấn

Answer: là gì thì bài sau chúng ta bàn tiếp, vài dòng có lẽ không đủ cho e nó :v
```

### so sánh var, let và const?
```
```

### arrow function khác gì so với function?
```
Tip: cũng chỉ là một công cụ dẫn nhập sang chủ đề "this", không trả lời được cũng không sau, vì kiểu gì thì người ta vẫn sẽ đề cập đến "this" bằng cách này hay cách khác. Ngoài ra thì đây cũng có thể làm nhiên liệu để hỏi về hoisting

Answer: do cách implement của nó, nên khi xài với một số lib/framework, nó sẽ làm mất binding của this. Như là React hoặc JQuery, có cơ số chủ đề trên mạng về lưu ý này.
```

### function declaration và function expression khác nhau ở điểm nào, và như vậy thì sao?
```
Tip: thực chất là hỏi về hoising.

Answer: có 2 hiểu syntax như nầy
fooStyle() // chạy ngon
barStyle() // tọi luôn

function fooStyle() { ... }
var barStyle = function() { ... }
thằng barStyle thì chỉ đc hoist mỗi cái biến "barStyle", còn fooStyle đc hoist cả tên lẫn block
```

### khi nào thì cần "use strict"?
```
Tip: basic!

Answer: JS khá linh hoạt, bạn có thể khai báo biến mà ko cần dùng var, có thể đặt tên biến bằng một số reversed-word, có thể lặp tên param của một hàm, có thể hoisting, etc.
Nói chung những "tính năng" này khiến code khá đau đầu. "use strict" để disable hết mấy cái "tính năng" sida này đi, vi phạm thì raise lỗi.
```

### kế thừa trong Javascript liệu có giống với OOP như các ngôn ngữ khác? Prototype là cái khỉ gì?
```
Tip: hẳn một topic ngang tầm với "this" luôn

Answer: ồ và chúng ta cần hẳn 1 bài viết nữa để phân tích luôn :v
```

### Kết

Các chủ đề mà mình muốn liệt kê tiếp nhưng có vẻ sẽ tốn khả nhiều giấy mực, nên xin tổng kết bằng mấy gạch đầu dòng sau, cảm ơn các bạn đã theo dõi:
- về lexical scope và cái cách JS compile
- về event loop và lí giải cho cơ chế bất đồng bộ
- về các thể loại kĩ thuật fake OOP
- về cách mổ xẻ object và nền móng cho functional programming.