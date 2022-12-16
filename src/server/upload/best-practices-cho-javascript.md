# Giới thiệu
Xin chào, bài viết này mình sẽ tổng hợp lại một số best practices khi làm việc với JS mà mình học được, hy vọng nó sẽ giúp ích cho bạn

## Hạn chế sử dụng `==`
Trong JavaScript có cả `==` và `===` và bạn có thể quen với `==` trong các ngôn ngữ lập trình khác và có thể tiếp tục sử dụng, nhưng sử dụng nó mà không biết cách hoạt động có thể mang lại một số lỗi, khó tracking. Để mình ví dụ nhé
```js
let a=1;
let b='1'; 
console.log(a==b); // output: true

let a=1;
let b=true; 
console.log(a==b); // output: true
```
Hmmm.... ná nì ???? Vì toán tử `==` chỉ xem xét giá trị chứ không phải xét đến loại dữ liệu, Do đó chúng ta nhận được cái output hại não như vậy. Cho nên bạn hãy sử dụng `===` để so sánh:
```js
let a=1;
let b='1'; 
let c=true;
console.log(a===b); // output: false
console.log(a===c); // output: false
```
Mình xin nhắc lại là hạn chế sử dụng toán tử `==` nhé, vậy cho nên bạn hãy áp dụng nó sao cho phù hợp.

## Dùng `let` thay cho `var`
Khi khai báo các biến, bạn có thể gặp `var` và `let`, nhưng `var` không được khuyến khích vì nó mang lại một số vấn đề cùng với nó. Nó sẽ dễ hiểu hơn với một ví dụ.
```js
for(var i=0;i<5;i++){
    console.log(i);
}
console.log(i)

// Output : 0 1 2 3 4 5
```
Lưu ý rằng biến `i` vẫn có thể truy cập được bên ngoài vòng lặp `for`, điều này là không tốt. Mặt khác, hãy viết cùng một đoạn code bằng cách sử dụng `let`
```js
for(let i=0;i<5;i++){
            console.log(i);
        }
        console.log(i)
// Output : i is not defined
```
Output trả ra lỗi vì biến `i` không thể truy cập bên ngoài vòng lặp nhờ `let`. Ở đây bạn có thể thấy rằng cả hai biến đều truy cập cùng một ô nhớ, đó là lý do tại sao việc thay đổi giá trị bên trong một khối cũng sẽ thay đổi giá trị của biến bên ngoài.

`var` cũng dẫn đến Hoisting, bất cứ khi nào bạn muốn khai báo các biến mà dữ liệu có thể thay đổi, hãy sử dụng `let`.

## Dùng Immutable hoặc `const`
Sử dụng `const` để khai báo biến nhiều nhất có thể trừ khi dữ liệu thay đổi trong biến như `i` bên trong vòng lặp for. Đây là một vài ví dụ:
```js
const x = 'SECRET'
x='Hacking'
console.log(x)
// Error: Identifier 'x' has already been declared

// Number 2 
const x;
x="SECRET";
// Error: Missing initializer in const declaration
```
Như bạn thấy thì `const` không thể bị thay đổi, hãy áp dụng nó cho phù hợp nhé.

## Sử dụng Function Expressions
ES6 cung cấp một cách mới để viết các hàm. Đây là một vài ví dụ:
```js
// Method 1  
let sum = function(a, b) {
    return a + b;
  };
  
//Method 2 
let sum = (a, b) => {
    return a + b;
  };
  
// Method 3 
let sum= (a,b) => a+ b ;

//Method 4 (Annonymous Function)
(() =>{
    console.log("annonymous  functions")
  })();
```
Đây được gọi là Function Expression, sử dụng nó thay vì khai báo hàm bình thường cũng tránh được Hoisting.

Giải thích một chút cho ai chưa biết về Hoisting nhé.
```js
exampleFunction(); // function call 

function exampleFunction(){ // function declaration

console.log("Hashnode is awesome")

}
// Output: Hashnode is awesome
```
Bạn có thấy cách gọi exampleFunction () ngay cả trước khi định nghĩa không gây ra bất kỳ lỗi nào chứ ? JavaScript không giống như các ngôn ngữ khác, toàn bộ bản sao của hàm được sao chép ngay cả trước khi thực thi mã. Nhưng làm điều tương tự bằng cách sử dụng các function expressions sẽ gây ra lỗi.

Hãy xem điều gì sẽ xảy ra với các biến được khai báo bằng `var`. Ở đây bộ nhớ được cấp phát ngay cả trước khi thực hiện chương trình nhưng nó sẽ có giá trị `undefined` cho đến khi nó chuyển đến dòng nơi biến được gán giá trị.
```js
console.log("Before Assignment: ",a);

var a=10;

console.log("After assignment: ",a)

/* Output:
 Before Assignment: undefined
 After assignment: 10
*/
```
Ở trên được gọi là variable hoisting. Nhưng quay lại với function expressions.
```js
exampleFunction();

const exampleFunction= () =>{

console.log("Hashnode is awesome");

}

// Output : ReferenceError: exampleFunction is not defined
```
Các giá trị không được sao chép vào bộ nhớ ngay cả trước khi thực thi, dẫn đến lỗi.

Một số developer tận dụng hoisting với định nghĩa hàm bằng cách khai báo tất cả các hàm ở dưới cùng và truy cập nó ở trên cùng nhưng điều đó phụ thuộc vào bạn. Tôi khuyên bạn nên sử dụng  function expressions và gọi hàm sau khi khai báo vì nó có thể dẫn đến ít lỗi hơn và thậm chí việc đọc trở nên dễ dàng hơn.

## Sử dụng Pure Functions
Pure functions là một hàm mà mỗi khi bạn gọi hàm đó, bạn sẽ nhận được cùng một kết quả và nó sẽ không có side effects.

Điều này giúp việc testing hàm và debug trở nên thực sự dễ dàng. Ví dụ:
```js
array=[1,2,3,4,5];
const doubleArrayValuesImpure= (array)=>{

    for (const number in array) { 

   array[number] = array[number] *2 ; 

    }
    return array; 
    }
// changes the values in original array
```
Hãy gọi cùng một hàm 3 lần
```js
console.log(doubleArrayValuesImpure(array)) ;
console.log(doubleArrayValuesImpure(array)) ;
console.log(doubleArrayValuesImpure(array)) ;

/*Output:
[ 2, 4, 6, 8, 10 ]
[ 4, 8, 12, 16, 20 ]
[ 8, 16, 24, 32, 40 ]
*/
```
Chú ý các giá trị thay đổi như thế nào trên mảng ban đầu mỗi khi chúng ta gọi hàm. Hãy viết một pure function với cùng một logic.
```js
const doubleArrayValuesPure= () => array.map(number => number *2) ;

console.log("Pure Function results")
console.log(doubleArrayValuesPure(array));
console.log(doubleArrayValuesPure(array));
console.log(doubleArrayValuesPure(array));

/*Output:
[ 2, 4, 6, 8, 10 ]
[ 2, 4, 6, 8, 10 ]
[ 2, 4, 6, 8, 10 ]
*/
```
Gọi cùng một hàm 3 lần không thay đổi mảng ban đầu. Bất cứ khi nào chúng ta khai báo các hàm, chúng ta nên tập trung vào việc viết các pure functions trừ khi chúng ta thay đổi file hoặc ghi vào DB.

## Đặt tên
Yaaa, đặt tên thôi đôi khi cũng khá tốn thời gian :v thường chúng ta rất lười và thường sử dụng tên ngẫu nhiên cho các biến và phải khóc thét khi chúng ta phải xem lại đoạn code. Bạn thực sự không cần phải comment code của mình quá chi tiết nếu bạn đã đặt tên đúng cách, dễ hiểu.
```js
// BAD
let ad="124 abc";
let c="Hanoi";

// Good
let address="124 abc";
let city="Hanoi";
```

## Sử dụng Destructing
```js
const person= {
    name: "Hrithwik",
    age:20,
    number: 7795628066,
    jobStatus:"Give me a job please",
}
```
Bây giờ nếu bạn muốn access nhiều giá trị bên trong một object, bạn sử dụng tính năng destruction thay vì viết thêm các dòng code theo cách thủ công. Ví dụ:
```js
// bad 
let name = person.name;
let age= person.age;
let phoneNumber= person.number;
let occupation= person.jobStatus

// good 
let { name,age,number, jobStatus} = person ;
```

## Dùng Promises thay vì Call Backs
```js
console.log("before");

getUser(1,(user)=>{
    console.log("username:",user.github);
    getRepo(user.github,(repo)=>{
        console.log("Repositories are " + repo);
        getCommits(repo[0],(commit)=>{
            console.log("Commits")
        })
    })
})


function getUser(id,callback   ){
    setTimeout(()=>{
        console.log("reading user from database")
    callback({ id:id*2,github:'hrithwikbharadwaj'});
},2000)
}

function getRepo(username,callback){
    setTimeout(()=>{
        console.log("reading repo from "+username);
        callback(['repo1','repo2','repo3']);
    },2000)

}
function getCommits(repo,callback){
    setTimeout(()=>{
        callback(repo);
    },300);
}

console.log("After")
```
Callbacks trông có vẻ cool trừ khi có nhiều callbacks  bên trong các callbacks  :v.

Không khó để đọc phải không? Nó còn được gọi là  callback hell. Bạn có thể sửa nó bằng các hàm được khai báo nhưng cách tốt hơn để làm điều đó là sử dụng promises. Đây là cùng một đoạn code sử dụng promises.
```js
console.log("before")

getUser(1)
.then(user=> getRepos(user.github)) // is user available ?
.then(repos=>getCommits(repos[0])) // oh great now find his first repo
.then(commits=>console.log("commit name: ",commits)); // found the repo ? cool now show the commits



function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        console.log("reading user from database")
    resolve({ id:id*2,github:'hrithwikbharadwaj'});
},2000);
    })

}

function getRepos(username){
     return new Promise((resolve,reject)=>{
          setTimeout(()=>{
        console.log("reading repo from "+username);
        resolve(['repo1','repo2','repo3']);
    },2000);
     });


}
function getCommits(repo){
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
        resolve(['commits']);
    },2000);
   });
}

console.log("After")
```

## Write Functions for everything
```js
// Bad code
let number1=2;
let number2=5;

let sum= number1+number2;

// Good
const sum = (number1,number2) =>{
    return number1+number2;
}

console.log(sum(2,3))
```
Hầu hết chúng ta viết chức năng cho nhiều thứ nhưng không đặt tên cho nó. Giữ mọi thứ bên trong một function giúp tìm kiếm một cách dễ dàng, và mỗi hàm chỉ làm 1 nhiệm vụ
```js
// Bad code
let number1=2;
let number2=5;

let sum= number1+number2;

// Good
const sum = (number1,number2) =>{
    return number1+number2;
}

console.log(sum(2,3))
```

## Xóa phần tử trong mảng như một Pro
```js
let numbers=[1,2,3,4];
numbers.length=0;

console.log(numbers); // output: []
```

# Tổng kết
Hầu hết chúng ta nhảy vào một ngôn ngữ mà không biết các nguyên tắc cơ bản của nó nhưng tôi hy vọng với bài viết này, bạn sẽ viết code tốt hơn với những cách mà tôi đã chia sẻ trong bài viết. Happy coding !! <3 <3  <3