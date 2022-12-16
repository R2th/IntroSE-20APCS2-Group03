Với việc Javascript phát hành ES6, hai cách khai báo biến mới đã được giới thiệu. Những cách khai báo mới này sử dụng hai từ khóa **let** và **const**.Về cơ bản, đây là những cách khai báo cải tiến hơn với cách khai báo biến cũ bằng **var**. 

Và để hiểu hơn về 3 cách khai báo biến này, chúng ta cần phải hiểu về hai khái niệm quan trọng trong JavaScript - **Scope** và **Hoisting**. Điều này sẽ giúp chúng ta hiểu rõ hơn về lý do tại sao lại cần khai báo biến theo những cách khai báo mới này và  sự khác biệt giữa việc khai báo **var**, **let** và **const** là gì.

# Scope :
Trong lập trình, **scope** của một biến là nơi mà biến có thể được truy cập. Chúng ta có **function scope** and **block scope** . **Function scope** có nghĩa là một biến được khai báo bên trong một hàm và chỉ có thể truy cập được trong hàm đó. **Block scope** là một đoạn code nằm trong hai dấu `{}`. Bất kỳ đoạn code nào được viết trong {} đều là một block. Do đó, trong phạm vi block, bất kỳ biến nào được khai báo trong một block sẽ chỉ được truy cập bên trong block đó chứ không truy cập được ở nơi nào khác.

# Hoisting :
**Hoisting** là một cơ chế trong JavaScript, nó giúp cho các biến và hàm khi được khai báo đều được chuyển lên đầu trước khi các câu lệnh code được thực hiện.

```
console.log(name);
var name = 'Ky';
```
 Ok , nhìn đoạn code này rất là kì đúng ko ? vì chúng ta đang thấy biến 'name' đang được sử dụng trước khi nó được khai báo. Nhưng do **hositing** , nên nó sẽ chạy theo thứ tự sau :
```
var name;
console.log(name);
name = 'Ky';
```

Vậy là bây giờ chúng ta đã hiểu sơ sơ qua về hai khái niệm **scope** và **hoisting** rồi đúng không, giờ thì đến **var**, **let** và **const** nhé : 

# var :
Các biến được khai báo bằng từ khóa **var** có phạm vi function có nghĩa là những biến này chỉ có thể được truy cập trong hàm mà chúng được khai báo.

```
function displayNameOfAnimal(){
    var animal = 'lion';
    console.log(animal);
}

console.log(animal);
```

Chắc chắn là sẽ lỗi. Trong đoạn code trên, ta thấy biến 'animal' đã được khai báo bên trong hàm displayNameOfAnimal (). Do đó, nó chỉ có thể được truy cập bên trong hàm displayNameOfAnimal () chứ không  thể truy cập bên ngoài nó. 

Ngoài ra, các biến được khai báo bằng cách sử dụng từ khóa **var** sẽ được **hoisted**.

Các biến sử dụng từ khóa **var**  còn có thể được khai báo lại và cập nhật trong phạm vi của chúng :

```
// Re-declaration
var name = 'ky';
var name = 'name';

//Updation
var name = 'ky';
name = 'nam';
```
Khi sử dụng **var** để khai báo các biến, nếu một biến được sử dụng trước khi khai báo, thì biến đó sẽ được gán giá trị là **undefined**.

# let :

Các biến được khai báo bằng **let** có phạm vi block có nghĩa là các biến đó sẽ chỉ có thể truy cập được bên trong block mà chúng được khai báo chứ không phải bên ngoài block đó.

```
let first_name = 'ky';
if( name === 'ky') { 
    let second_name = 'nam';
}
console.log(second_name);
```

Đoạn code trên sẽ trả ra lỗi sau: 'error: Uncaught ReferenceError: second_name is not defined'.

Lý do là do chúng ta đang cố gắng truy cập biến 'second_name' từ bên ngoài block mà nó đã được khai báo.

Ngoài ra, các biến được khai báo bằng **let** có thể được cập nhật nhưng không thể khai báo lại trong phạm vi của chúng.

```
// Được cho phép
let animal = 'lion';
animal = 'cat';

// Không được đâu nha :
let animal = 'lion';
let animal = 'cat';
```

Việc khai báo lại sẽ tạo ra lỗi ‘error: Uncaught ReferenceError: second_name is not defined’.
 
**Note**:  Tuy chúng ta không được phép khai báo lại trong **scope**. Nhưng bên ngoài **scope**, chúng ta lại được phép khai báo lại vì khi đó biến được khai báo lại được coi như một biến mới.

```
let first_name = 'ky';
let weight = 0;
if( name === 'ky') { 
    let second_name = 'nam';
    let weight = 100000;
    console.log(weight);
}
console.log(weight);

Kết quả sẽ trả ra như sau :
100000
0
```

Điều này là do biến 'weight' được xác định bên trong block 'if' được coi như là một biến khác và phạm vi của nó bị giới hạn trong block 'if'.

Khi sử dụng từ khóa **let** để khai báo biến, trong quá trình hoisting, nếu một biến được sử dụng trước khi khai báo thì biến đó sẽ không bị gán giá trị 'undefined' như khai báo với **var**.

```
console.log(name);
let name = 'Hoang Ky';
```

Đoạn mã trên sẽ trả ra lỗi sau: error: Uncaught ReferenceError: Cannot access ‘season’ before initialization.

Mặc dù biến 'name' đã được di chuyển lên đầu phạm vi nhưng nó vẫn không được gán cho bất kỳ giá trị nào.

# const :

Các biến được khai báo bằng **const** có phạm vi **block** giống như **let**.

Các biến được khai báo bằng **const** không thể được cập nhật hoặc khai báo lại. Do đó, nên gán giá trị cho biến trong quá trình khởi tạo. 

Ví dụ: const age = 22;

Hoisting cũng diễn ra với **const**. Nó tuân theo quy tắc tương tự như **let**, các khai báo biến được chuyển lên đầu phạm vi và chúng không bị gán giá trị 'undefined'.

# Kết bài :

Okk đó là những gì mà mình muốn chia sẻ với mọi người trong bài viết ngày hôm nay .
Nếu thấy hay , **like**, **share** và quan trọng là **upvote**  để mình có động lực viết thêm nhiều bài viết mới nhé.

Many thankssssss  :100::100::100: