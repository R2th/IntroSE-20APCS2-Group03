Là một lập trình viên bạn không thể không biết một trong những tính năng tốt nhất của JavaScript là triển khai các funtions. Không giống như các ngôn ngữ lập trình khác cung cấp các loại hàm khác nhau cho các kịch bản khác nhau, nhưng đối với ngôn ngữ lập trình JavaScript chỉ cung cấp cho chúng ta một loại hàm bao gồm tất cả các kịch bản như (Regular Function, Anonymous Function, Arrow Function...) 

Chúng ta những lập trình viên nói chúng và lập trình viên javascript nói riêng (devjs) thường xem nhẹ vấn đề về function. Xin đừng bị lừa bởi một hàm JavaScript có vẻ đơn giản, nhìn nó đơn giản vậy thôi nhưng ẩn chưa bên trong là một sự phức tạp. Do đó toàn bộ bài viết này sẽ xoay quanh chủ để function và chúng ta cùng khám phá 8 JavaScript Functions mà devjs cần phải hiểu. Hiểu những chi tiết thường bị bỏ qua này không chỉ giúp bạn hiểu ngôn ngữ tốt hơn mà còn giúp bạn rất nhiều trong việc giải quyết các vấn đề cực kỳ phức tạp.



## Function javascript là gì


Đầu tiên như thông lệ của những bài viết khác, chúng ta cần phải hiểu về Function trong javascript cơ bản. Bạn phải hiểu rằng trong javascript mọi thứ đều xảy ra phần lớn từ các functions. Và chính function có thể nói là một code block hay còn gọi là khối mã mà có thể chúng ta viết một lần những chạy bất cứ khi nào và nhiều lần. Và một điều đáng chú ý là các functions đều chấp nhận các kiểu tham số khác nhau và có thể trả về giá trị nếu cần. Và khi bắt đầu học lập trình thì bạn cũng nên cần thống nhất một số thuật ngữ cơ bản. Có thể ở đây theo tips javascript là thế này: Từ giờ trở đi, chúng ta sẽ định nghĩa function (hàm) của khái niệm "thực hiện một hành động cụ thể và cung cấp một khối riêng biệt có thể có một giá trị trả về". 

Dưới đây là danh sách các hàm JavaScript bạn nên xem nếu bạn là một developer muốn up level



## Regular Function


Có thể nói Regular Function là một hàm đơn giản và có thể là đầu tiên bạn phải học khi bước vào ngôn ngư lập trình. Ở đây chúng ta có thể khai báo function keyword, function name, parameters, và body như ví dụ bên dưới

```
function add(one, two) {
    return one + two;
}
```
Trường hợp sử dụng Regular Function là khi bạn tái sử dụng nhiều lần thì nên viết kiểu này.



## Named Function


Named Function nghe nói cho oai vậy thôi chứ thật ra chả khác con m* gì so với Regular Function, chẳng qua là đặt một cái tên cho nó đúng ngữ nghĩa để mấy thằng dev sau nhìn vào dễ hiểu và gọi cho đúng mà thôi.

```
function sayHello(name) {
    console.log('Hello Anonystick.com>>>', name)
}
```
## Anonymous Function


Nghe tên cũng đủ hiểu thằng này rồi, chơi kiểu gì toàn ẩn danh hay éo có tên gì vậy? Nhưng nhìn vậy thôi chứ khi dùng chúng thì nó mang lại cho chúng ta hai mục đích đó là có thể truyền arguments vào trong hàm tương tự như vậy chúng ta cũng có thể sử dụng anonymous function để return về một function. Nhưng ở đây tôi muốn nói thêm là bạn có biết [arguments khác với parameters](https://anonystick.com/blog-developer/default-parameters-trong-javascript-2020042217103544) như thế nào không?

//anonymous function
function(name){
    console.log(`Hello ${name}`)
}
Như ví dụ trên chúng ta có thể thấy, nó éo có tên giữa keyword và dấu ngoặc đơn. Chính vì thế không có ai có thể gọi nó một cách trực tiếp và phải thông qua một biến và chúng ta sẽ gán cho nó. Việc này chúng ta sẽ nói trong phần tiếp theo. 



## Function Expression 
Tiếp theo chúng ta sẽ nói đến sự kết hợp giữa Anonymous Function và Name Function đó chính là Function Expression. Bởi vì sao chúng ta lại nói vậy, bạn mới đọc phần phía trên đó là không thể gọi trực tiếp khi sử dụng anonymous function thì chúng ta có thể gán một biến cho một function , ngoài ra chúng ta cũng có thể làm điều tương tự với name function Xem ví dụ để có thể hiểu hơn những điều chúng ta mới thảo luận xong 

### Named Function Expression.

```
const say = function sayHello(name) {
    console.log('Hello Anonystick.com>>>', name)
}

//Function calling
say('anonystick.com')
```
### Anonymous Function Expression

```
const say = function(name){
    console.log(`Hello ${name}`)
}
//Function calling
say('anonystick.com')
```
## Arrow Function


Arrow function được tips JavaScript nói rất nhiều trong nhiều bài viết, nó được giới thiệu ở ES6, giúp code chúng ta ngắn gọn và xúc tích hơn nhiều, bạn có thể đọc những bài trước, cụ thể [ES6 Arrow Functions Cheatsheet](https://anonystick.com/blog-developer/es6-arrow-functions-cheatsheet-2019061833209083). Ở đó bạn sẽ không những hiểu Arrow function là gì? Mà còn giúp bạn hiểu được syntax và khi nào sử dụng Arrow function ở hoàn cảnh nào.

```
const say = (name) => {
     console.log(`Hello ${name}`)
}
//Function calling
say('anonystick.com')
```

Chú ý: Kể từ khi arrow function ra đời thì nó được sử dụng rất rộng rãi nhưng có một điều tôi phải nhắc cho các bạn phải lưu ý đó là giữa [Regular function và Arrow Function có sự khác biệt](https://anonystick.com/blog-developer/su-khac-nhau-giua-regular-va-arrow-functions-trong-javascript-2020051368991849).



## IIFE


IIFE là viết tắt của [Immediately Invoked Function Expression](https://anonystick.com/blog-developer/javascript-iife-la-gi-2019051740389690), có nghĩa là khởi tạo một function và thực thi nó ngay lập tức. Cú pháp của IIFE là:

```
(function(name){
    console.log(`Hello ${name}`)
})('anonystick'); //Function calling
```
Khi sử dụng IIFE function thì có rất nhiều ưu điểm cho trường hợp này như scope, global... Bởi vậy chúng tôi đã có một bài riêng nói về ["Javascript: IIFE là gì? Vì sao nên sử dụng"](https://anonystick.com/blog-developer/javascript-iife-la-gi-2019051740389690) bạn có thể dành thời gian tìm hiểu thêm nếu bạn thật sự muốn quan tâm.



## Closures


Nếu bạn là một fan cứng của tips javascript thì việc định nghĩa Closures là gì? Thì đó là điều đơn giản nhưng nếu bạn là một dev mới hoặc một seo web thì chúng tôi cũng sẽ giúp bạn hiểu rõ hơn một chút tại đây đó là Closures đại diện cho các hàm lồng nhau. Bạn hiểu khái niệm lồng nhau chứ? Lồng nhau có nghĩa là một hàm này được định nghiwax bên trong hàm khác. Hay nói các khác đó là sử dụng Closures là đang sử dụng hay thực hiện những chức năng lồng nhau. Để hiểu kỹ hơn chúng tôi xin phép lấy một ví dụ ở bài viết ["Javascript closure là gì? Vì sao người phỏng vấn thích hỏi bạn câu hỏi này?"](https://anonystick.com/blog-developer/discuss-about-closures-in-javascript-2019051695927961)

```
function f1()
{
    var N = 0; // N luon duoc khoi tao khoi ham f1 dduowcj thuc thi
    console.log(N);
    function f2() // Ham f2
    {
        N += 1; // cong don cho bien N
        console.log('-->>',N);
    }

    return f2;
}

var result = f1();

result(); // Chay lan 1
result(); // Chay lan 2
result(); // Chay lan 3
```
Theo cách trên, việc sử dụng một hàm bên trong sẽ có quyền truy cập vào các biến và tham số của hàm ngoài. Bạn nhớ tìm hiểu kỹ ví dụ trên trong bài viết mà chúng tôi đã đề cập ở trên.



## Callbacks


Đến đây chúng ta đã thở phào nhẹ nhõm khi callback là một khái niệm quen thuộc trước [ES6](https://anonystick.com/blog-developer/giai-thich-ve-destructuring-rest-parameters-va-spread-syntax-trong-javascript-2020051980035339) ra đời. Có ai đã từng mông lung khi sử dụng callback như tôi không? Khi sử dụng callback function thì có thể chúng ta sẽ đi vào mãi mà không trở ra. Mà thôi để nói về callback là một câu chuyện dài, nếu bạn có thời gian thì có thể đọc bài viết này. Còn ở đây chúng ta thì hiểu về cú pháp mà thôi, thông thường, các callback lại được sử dụng để đạt được các hoạt động không đồng bộ trong JavaScript. Ví dụ dưới dây:

```
function callback(name){
    console.log(`Hello ${name}`)
}
function b(callback){
    callback('anonystick.com')
}
//calling
b(callback)
```
Callbacks được sử dụng rộng rãi vì nhiều tình huống khác nhau trong lập trình như API request, I/O operations, event handling... Đến đây đáng lẽ ra chúng ta nên dừng lại nhưng tôi chợt nghĩ có thêm 2 loại function nữa mà chúng ta chưa khám phá và tìm hiểu đó là constructor function và pure function. Nhưng một khi nói đến constructor function thì chúng ta phải nói đến keyword new. Mà để hiểu vì sao phải sử dụng new thì có lẽ chúng ta sẽ dành riêng cho việc giải thích này một bài viết riêng. 



Tóm lại cho những vấn đề mà chúng ta vừa thảo luận qua thì có thể thấy học javascript không hề đơn giản như nhiều người nghĩ, bởi sự đa dạng trong ngôn ngữ lập trình javascript đã vo tình làm khó chúng ta là những lập trình viên. Mỗi người một ý kiến, mỗi dev một cách làm và qua đây, bạn có thể lựa chọn cho mình một kiến thức riêng tuỳ mỗi người cảm nhân.