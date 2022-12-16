# 1. Arrow Function là gì? 
Arrow Function (hay còn gọi là hàm mũi tên) là một trong những tính năng mới và rất hay của ES6.
Nó thừa hưởng cách viết ngắn gọn bằng cú pháp ES6.
Tuy Arrow Function và Function đều là function, nhưng cách viết và cách tham chiếu tới bối cảnh (context) khác nhau.

# 2. Sự khác nhau ở cú pháp 
Arrow Function sử dụng kí tự => 
```
hello = () => {
console.log('hello')
}
// hello()
```
còn Function thông thường thì : 
```
function hello(){
console.log('hello')
}
// hello()
```

Với TH có tham số :
```
hello = name => {
console.log('hello ', name)
}
```
Ta có thể giản lược được dấu () với trường hợp có 1 tham số truyền vào. 

Ngoài ra, với arrow function ta có thể bỏ qua từ khoá return
```
double = x => x * 2
```
còn với function thì : 
```
function double(x){
return x * 2
}
```

Ngoài ra, ta còn sử dụng được arrow function trong trường hợp: map, filter, forEach,...

Ví dụ: 
```
const numbers = [1,2,3,4]
const newArray = numbers.map(item => item * 2 )
// console.log(newArray)
```
Trông có vẻ tối giản code so với: 
```
const numbers = [1,2,3,4]
const newArray = numbers.map(function(item){
return item => item * 2
})
// console.log(newArray)
```

# 3. Tìm hiểu về 'this' trong javascript
- Để hiểu được phần bối cảnh (context) vừa được giới thiệu trên thì ta phải hiểu qua chút về 'this' trong javascript đã.
- This là một từ khoá khá quen thuộc trong khá nhiều ngôn ngữ, nó dùng để trỏ tới chính object gọi hàm đó và javasrcipt cũng thế.
```
const person = {
    name_person:'hue',
    getNamePerson: function(){
        return this.name
     }
}
person.getNamePerson() // hue
```
Trong một trường hợp khác
```
const name_person = 'hue' // bien nay nam trong object window

function getNamePerson(){
    return this.name_person
}

window.getNamePerson() // hue -> trỏ tới object window
getNamePerson() // hue -> trỏ tới object window
```
Tuy nhiên, nếu cứ thế thì đã dễ hiểu biết bao, nhưng sự khó chịu sẽ dần hiện ra nếu ta sử dụng nó....

***Ví dụ 1:*** Khi nhấn button thì hiện tên 
```
const person = {
  name_person:'hue',
  getNamePerson: function() {
    console.log(this.name_person);
  }
};

//Ở đây this sẽ là object person
person.getNamePerson();

$('button').click(person.getNamePerson); //getNamePerson truyền vào như callback

```
Lúc này, ta sẽ giật mình vì hàm chạy không được như mong muốn.Kiểm tra kĩ, thì lúc này, this không phải là trỏ tới person mà là button mà ta click vào, vì vậy nó k có name_person. 

Để giải quyết vấn đề này, chúng ta cần dùng tới bind
```
$('button').click(person.getNamePerson.bind(person)); 
```
Ta sẽ gặp nhiều vấn đề này hơn trong trường hợp, hàm truyền vào như một callback như setInterval chẳng hạn.

***Ví dụ 2:***
```
const person = {
    name:'hue',
    getName: function(){
        return this.name
     }
}

person.getName() // 'hue'

const getNamePerson = person.getName()
getNamePerson() // sai -> not function -> this trỏ tới object window 
```
Cách giải quyết nó : 
```
const getNamePerson = person.getName.bind(person)
// hue
```
Lúc này, sau khi dùng bind thì con trỏ this sẽ trỏ tới person.

Để tránh tình trạng lỗi như trên, trong một vài trường hợp "mập mờ context" như trên, giải pháp sử lí đó là 'bind'.


Khác với function thông thường, **arrow function không có bind**  vì vậy, không định nghĩa lại this. Do đó, this sẽ tương ứng với ngữ cảnh gần nhất của nó.

Và cũng chính bởi nó không định nghĩa this, nên ***arrow function không phù hợp làm method của object***, vì vậy nếu định nghĩa method của object, function vẫn là sự lựa chọn đúng đắn.

Trong bài chia sẻ [phần trước](https://viblo.asia/p/optimize-performance-react-native-Qpmle2N95rd#_4-bind-som-hon-va-khong-tao-functions-ben-trong-render-3), thì ta cũng không nên dùng arrow function bừa bãi ở mọi nơi, mà cũng nên bind trước rồi gọi function sẽ tránh được việc khi render lại tạo function mới.

# 4. Kết luận 
Trên đây là những điểm mình đúc kết lại trong thời gian tiếp xúc với javascript về function và arrow function. Mình xin tóm tắt lại như sau:

Về định nghĩa, arrow function và function đều là function tuy nhiên: 

Arrow Function:
- Arrow function là một tính năng mới của ES6, giúp viết code ngắn gọn hơn.
-  Arrow function sử dụng khá ok trong các TH dùng: map, filter, reducer,...
- Arrow function không có bind.
- Arrow function không phù hợp là method của object.

Function:
- Cần chú ý thêm về con trỏ được trỏ tới để định nghĩa lại this bằng 'bind'.

Tùy vào từng mục đích sử dụng, mà nên lựa chọn function hay arrow function, chứ trước mắt arrow funtion không thể thay thế function được :D .

Cám ơn các bạn đã đọc!