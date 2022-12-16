Với sự phổ biến và linh động hiện nay, Cú pháp của **Javascript** không còn xa lạ với các lập trình viên, nhìnn chung đó là một cú pháp rõ ràng và tiện ích, có nhiều điểm tương đồng với các ngôn ngữ khác. Trong những năm qua, cộng đồng JS phát triển không ngừng nghỉ cái tiến và cho ra đời các cú pháp mới. Tróng đó, Cú pháp ES6 hay còn được gọi là ES2015 đều là những chuẩn chung để nói về cú pháp mới trong JavaScript
## Block-Scoped
**Block Scoped** là phạm vi trong một khối, phạm vi chứa tất cả những đoạn code nằm bên trong cặp thẻ **{}**. 
Chúng ta đều biết  phạm vi cơ bản của biến trong JavaScript luôn là **function**. Nếu bạn cần tạo một khối phạm vi, cách phổ biến nhất ngoài việc khai báo hàm thông thường, ta có thể khởi tạo một biểu thức hàm được thực thi ngay lập tức (**IIFE**) - IIFE như là một cái hộp đóng gói code của chính nó. Do đó, những biến trong hộp này là private, bên ngoài (global) không thể truy xuất hay thay đổi được. Và nếu vô tình đặt tên biến giống với global thì cũng không bị ảnh hưởng bên ngoài.   

```js
//VD:
var a = 2;

(function IIFE(){
        var a = 3;
        console.log( a );       // 3
})();

console.log( a );               // 2
```  

> Khi sử dụng ES6 thì bạn nên bật chế độ strict mode, chế độ này tạm gọi là chế độ nghiêm ngặt trong việc sử dụng cú pháp của Javascript.  

## let
Bây giờ chúng ta có thể tạo các khai báo global được sử dụng với bất kỳ khối nào thì không có gì đáng ngạc nhiên. Điều này có nghĩa là tất cả những gì chúng ta cần là một cặp **{ .. }** để tạo ra một phạm vi. Tuy nhiên, thay vì sử dụng **var**, để khai báo các biến được gắn vào phạm vi hàm kèm theo, ta có thể sử dụng **let** :
```js
var a = 2;

{
        let a = 3;
        console.log( a );       // 3
}

console.log( a );               // 2
```

Từ khóa **let** dùng để khởi tạo một biến nhưng biến đó chỉ có tác dụng bên trong khối đang khai báo (**block-scoped**). Với phạm vi hoạt động hẹp như vậy thì **let** thường dùng để khai báo các biến mang tính chất tạm thời, nghĩa là nó chỉ sống trong một phạm vi hoạt động của khối đó thôi, không sử dụng qua vị trí khác  
<br>
Nếu bạn khai báo nhiều biến thì nên sử dụng một **let**. Về cá nhân, mình thích đặt **let** cùng một dòng với phần mở đầu **{**, để làm rõ hơn rằng khối này chỉ nhằm mục đích khai báo phạm vi cho các biến đó.
```js
{       let a = 2, b, c;
        // ..
}
```
*Điều đó sẽ không phù hợp với các convention được đưa ra trong các tài liệu ES6.* 

Nếu ta Truy cập vào một biến **let** trước khi khai báo và khởi tạo sẽ gây ra lỗi, trong khi với các biến **var**, việc đó không thành vấn đề: 
```js
// VD:
{
        console.log( a );       // undefined
        console.log( b );       // ReferenceError!

        var a;
        let b;
}
```

Thông báo  **ReferenceError** từ việc truy cập các biến **let** được khai báo quá sớm, về mặt kỹ thuật được gọi là lỗi "*Vùng tạm thờ*i" (**TDZ**) - bạn đang truy cập vào một biến được khai báo nhưng chưa được khởi tạo. Lỗi **TDZ** - xuất hiện ở một số nơi trong ES6, để tìm hiểu rõ hơn về lỗi TDZ, bạn có thể tham khảo [tại đây](https://dmitripavlutin.com/variables-lifecycle-and-why-let-is-not-hoisted/).  

## let + for
```js
//VD: 
var funcs = [];

for (let i = 0; i < 5; i++) {
        funcs.push( function(){
                console.log( i );
        } );
}

funcs[3]();             // 3
```
Các **let i** trong **for** tuyên bố một **i** không chỉ dành riêng cho các vòng lặp,  nó sẽ khởi tạo lại mới i cho mỗi lần lặp của vòng lặp. 
Nếu bạn thực hiện điều tương tự, nhưng với **var i** trong  vòng lặp for, bạn sẽ nhận được **5** thay vì **3**, bởi vì ta có một **global i** trong phạm vi bên ngoài, thay vì làm mới **i** cho mỗi lần lặp kết thúc. 
```js
var funcs = [];

for (var i = 0; i < 5; i++) {
        funcs.push( function(){
                console.log( i );
        } );
}

funcs[3]();             // 5
``` 
Bạn cũng có thể đã hoàn thành điều tương tự một cách rõ ràng hơn một chút: 
```js
var funcs = [];

for (var i = 0; i < 5; i++) {
        let j = i;
        funcs.push( function(){
                console.log( j );
        } );
}

funcs[3]();             // 3
``` 
Ở đây, chúng ta buộc phải tạo một biến mới **j** cho mỗi lần lặp.  
**let** cũng hoạt động theo cách tương tự với **for..in** và **for..of**.
## const
Có một hình thức khai báo khác: **const** - tạo ra hằng số.  
Chính xác thì hằng số là gì? Đó là một biến chỉ dùng để đọc sau khi set giá trị cho nó. 
```js
//VD:
{
        const a = 2;
        console.log( a );       // 2

        a = 3;                          // TypeError!
}
``` 
Bạn không được phép thay đổi giá trị của nó. Một **const** phải được khởi tạo rõ ràng. Nếu bạn muốn một hằng số có giá trị là  **undefined** , bạn phải khai báo **const a = undefined** để lấy nó. 

Các hằng số không hẳn hạn chế đối với giá trị của nó. Nếu giá trị phức tạp, chẳng hạn như một đối tượng hoặc mảng, nội dung của giá trị vẫn có thể được sửa đổi:
```js
{
        const a = [1,2,3];
        a.push( 4 );
        console.log( a );               // [1,2,3,4]

        a = 42;                                 // TypeError!
}
```
**const** có thể được sử dụng với khai báo biến của **for**, **for..in** và **for..of**. Tuy nhiên, một lỗi sẽ được đưa ra nếu có bất kỳ sự thay đổi giá trị nào, chẳng hạn như mệnh đề **i++** điển hình của vòng lặp **for**. 

## Block-scoped Functions
Bắt đầu với **ES6**, các khai báo hàm xảy ra bên trong các khối sẽ được chỉ định nằm trong phạm vi của khối đó. 
```js
//VD:
{
        foo();                                  // Làm Việc!

        function foo() {
                // ..
        }
}

foo();                                          // ReferenceError
```

## Spread/Rest
**ES6** giới thiệu một toán tử mới thường được gọi là toán tử trải hoặc phần còn lại (dịch ra nghe hơi tù :D), tùy thuộc vào vị trí/cách sử dụng. 
```js
VD:

function foo(x,y,z) {
        console.log( x, y, z );
}

foo( ...[1,2,3] );                              // 1 2 3
```
Khi **…** được sử dụng trước một mảng nó sẽ "*trải*" mảng đó ra thành các giá trị riêng lẻ. 

Trong cách sử dụng như trên, **...** mang đến cho chúng ta một sự thay thế cú pháp đơn giản hơn cho phương thức **apply(..)**:
```js
foo.apply( null, [1,2,3] );             // 1 2 3
``` 
Nhưng **…** cũng có thể được sử dụng để trải rộng/mở rộng một giá trị trong các bối cảnh khác, chẳng hạn như bên trong của một khai báo mảng khác:
```js
var a = [2,3,4];
var b = [ 1, ...a, 5 ];

console.log( b );                                       // [1,2,3,4,5]
```
Trong cách sử dụng này, **…** về cơ bản là thay thế **concat(..)**, vì ở đây nó hoạt động như: **[1].concat( a, [5] )**. 

Cách sử dụng phổ biến khác,  **…** có thể được sử dụng ngược lại thay vì trải rộng một giá trị ra, **...** sẽ gộp một tập hợp các giá trị lại với nhau thành một mảng. 
```js
//VD:

function foo(x, y, ...z) {
        console.log( x, y, z );
}

foo( 1, 2, 3, 4, 5 );                   // 1 2 [3,4,5]
```

**...z** trong đoạn này ta có thẻ hiểu là: "*gom các phần còn lại của các đối số (nếu có) vào một mảng z*." 

Tất nhiên, nếu không có bất kỳ tham số được đặt tên nào, **…** sẽ gom tất cả các đối số:
```js
function foo(...args) {
        console.log( args );
}

foo( 1, 2, 3, 4, 5);                    // [1,2,3,4,5]
```
Điều mình thích nhất ở toán tử này là nó cung cấp một sự thay thế rất chắc chắn cho việc sử dụng đối số mảng  -  **...args** nó không thực sự là một mảng, mà là một đối tượng giống như mảng. Ta có thể tiết kiêm được nhiều công sức. 

<br>
ES6 thêm một đống các hình thức cú pháp mới vào JavaScript, vì vậy có rất nhiều điều để tìm hiểu (To be continue... 👌)!

Tham khảo: https://www.kickstarter.com/projects/getify/you-dont-know-js-book-series