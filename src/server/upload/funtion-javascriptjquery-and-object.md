![alt](http://kylefdoherty.github.io/images/js_function_anatomy.png)
# Funtion JavaScript : Một số kiến thức quan trọng và kinh nghiệm
>  đây là một cái blog mà có kiến thức khá nông cạn về nó phản ánh năng lực JavaScript cuả mình vì mình cũng mới học nó nên viết blog chỉ để nhớ và ,những người cùng cấp xem thôi , ngoài ra  mình rất hân hạnh các anh lớn tuổi có kinh nghiệm trong JavaSCript nếu có gì đó sai hoặc sao đó thì mong các anh góp ý cho !! 

### Function in Js
- funtion trong Js đc viết như các Function trong các langues khác nên việc học nó cũng không khó lắm nếu các bạn đã nắm chắc kiến thức cũ của các ngôn ngữ lập trình khác , nhưng ngoài những điểm giống basic thì js còn có những function khá khó
- **1**. Function **Return**
đây là một Function khá easy vì nó là một giá trị vì trong Function có **return** nên nó sẽ trả về một giá trị trong câu lệnh ở đây  khi truyền tham số a, b vào function thì nó sẽ trả về là **a * b** = > **console** sẽ nhận giá tri là **a * b** giá trị trả về hay cách xử lý tham số tùy thuộc vào **code** của bạn 


```javascript
 function kiablog(a,b){
 return a * b ;
 }
 console.log(kiablog(3,4));
  ```

> **Console** : 12 
 


- **2** . Funtion Return **kiểu biến** 

> đây là một function khá kì quái mà mình đã nhầm rất nhiều trong code =)) , trong các ngôn ngũ như [java](https://www.tutorialspoint.com/java/index.htm),[C](https://www.w3schools.in/c-tutorial/),[C++](https://www.w3schools.in/cplusplus-tutorial/intro/) mình đã từng học thì nó khá là kì quái ,đây là một tóm tắt của function return nên nó sẽ ngắn gọn hơn chỉ mất một giòng để thực hiện câu lênh return 
  
```javascript
var a = new function ("a","b","a*b");
var x = a(3,4);
```

> ở đây 2 cái "a","b" là tham số truyền ,cái "a*b" thì nó same như câu lệnh return a ^ b vậy nên hãy đơn giản nó ra thì chúng ta sẽ nhìn rõ đc vấn đề ngay đây

- 3 .function prameter(gì gì đó )

>trong hàm này nó là một hàm chống lại sự un Value(không có dũ liệu hay còn goi là undefined)ok !! bắt đầu tìm hiểu nó nào  ? đây là một function khá dễ nên mình sẽ không nói kĩ lưỡng về nó !! =)


```javascript
function myFunction(x, y) {
    if (y === undefined) {
        y = 0;
    }    
    return x * y;
}
```
 - 4 .**this**

```javascript
var car={
    color : "red",
    price : "OneMillionDolas",
    year : "2018",
    people : "8",
    CreateYears : "2000"
    Myfun : function(){
        return this.people;
    }
};
```
> đây là một kiểu dũ liệu Object trong JS nó như kiểu class trong Java,C,C++,.....đấy thấy chưa !! cái m* gì cũng liên quan đến nhau hết nên khi học một cái thì hãy học tử tế vào nhé !! quay lại với nó thì chúng ta thấy car xem như là một class trong này và nó đóng vai trò hướng đôi tượng trong hàm **Myfun()** thì có chữ **this** ok và nó cũng giống như con trỏ trong cáC ngôn ngũ khác thôi nếu log ra thì nó là object ok 

5.call
```javascript
var car = {
    Name : function(){
        return this.color;
    }
};


var car2 = {
    color : "black",
    Year : "2002"
};


var car3 = {
    color : "gray",
    Year : "2003"
};

console.log(car.Name.call(car2));
```

> **Console:  black**


- call function will can make this object acess other object ok ok !!! this is very cool


# Object 
 

 ok this is some ex :for Object like that
 ```javascript
var person = {
    firstname:"John",
    lastname:"Doe",
    age:50,
    eyecolor:"blue"
};
 ```
> var person như là một khai báo của một class , còn fisrtName, bla bla, thì nó có chức năng như biến trong này vậy đó , ok !!
> ngoài ra , dể truy cập đến các biến trong object thì có thể dung con trỏ **this**.tên biến và còn moojt các  nữa để truy cập là person[*tên biến*]
# cách add biến vào class object
> chúng ta có thể dùng câu lệnh sau : person.***tên biến mới***= "" 
> ngoai ra chúng ta còn add thêm thuộc tính bằng cách như vậy nhưng khác một xúy

```javascript
person.ngu = function () {
//code
}
````

# Tổng kết lại
- có rất nhiều kiểu loiaj function khá khó trong Js
- Object làm một class
- cách truy cập,add, biến , function



> chúng ta có thể học Js ở trang web w3School.com ok Bye!