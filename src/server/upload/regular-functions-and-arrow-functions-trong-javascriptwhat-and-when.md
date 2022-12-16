Trước đây khi mới làm việc với javascript mình rất hay bị nhầm lẫn giữa 2 khái niêm này,dùng lung tung cả.
Bây giờ chúng ta cùng đi tìm hiểu xem 2 kiều function này khác nhau như nào để tránh nhầm lẫn trong khi sử dụng nhé !

# 1.Khai báo
###     Regular function
```ts
function A(params){
  // Code
}
```
### Arrow function
```ts
const A = (params) => {
 // Code
}
```
Về cách khai báo thì arrow function sẽ cho ta cú pháp nhanh gọn hơn,không cần phải sử dụng keyword **function**.

# 2.Từ khoá this
Cùng xem ví dụ sau đây
```ts
var person = {
  firstname : 'firstname',
  lastname:'lastname',
  showFullNameWithRegular:function(){
    return this.firstname + this.lastname;
  },
  showFullNameWithArrow:()=>{
    return this.firstname + this.lastname;
  }
}
```
Chúng ta khai báo object person có 2 property firstname và lastname.Bây giờ chúng ta xem kết quả của 2 function **showFullNameWithRegular** và **showFullNameWithArrow** xem như nào nhé !

**showFullNameWithRegular**
``` ts
var person = {
  firstname : 'firstname',
  lastname:'lastname',
  showFullNameWithRegular:function(){
    return this.firstname + ' ' + this.lastname;
  },
  showFullNameWithArrow:()=>{
    return this.firstname + ' ' + this.lastname;
  }
}
var fullname = person.showFullNameWithRegular();
console.log(fullname);
```
Kết quả :
```ts
firstname lastname

```
Kết quả đúng như mong đợi ,cùng xem **showFullNameWithArrow** thì sao nhé.

**showFullNameWithArrow**
```ts

var person = {
  firstname : 'firstname',
  lastname:'lastname',
  showFullNameWithRegular:function(){
    return this.firstname + ' ' + this.lastname;
  },
  showFullNameWithArrow:()=>{
    return this.firstname + ' ' + this.lastname;
  }
}
var fullname = person.showFullNameWithArrow();
console.log(fullname);
```
Kết quả
```
undefined undefined
```
Ồ không.Sao lại undefined thể nàỳ.đây chính là sự khác biệt giữa arrow function và regular function.
Cả 2 function showFullNameWithRegular và showFullNameWithArrow đều được khai báo như 1 property của object person và thực hiện
1 đoạn code như nhau.Nhưng với showFullNameWithRegular thì chúng ta thu được kết quả như mong muốn còn showFullNameWithArrow thì không bới vì
 
1.Regular function sẽ có từ khoá **this** của chính nó  còn arrow function thì không.
2.Regular function sẽ có **bind** còn arrow function thì không

3.Khi chúng ta thực hiện đoạn code
``` ts
var fullname = person.showFullNameWithArrow();
```
thì function showFullNameWithArrow   **implict binding** - ngầm chỉ định từ khoá this của nó là object **person** tương đương với:
```ts
showFullNameWithRegular.bind(person)();
```
Còn với **arrow function** thì không,nó sẽ không hiểu được ! 

Cùng xét tiếp ví dụ tiếp theo chúng ta có đoạn code sau:

```ts
var person = {
  firstname: "firstname",
  lastname: "lastname",
  showFullNameWithRegular: function() {
    setTimeout(function() {
      console.log('callback with regular function ' + this.firstname + " " + this.lastname);
    }, 1000);
  },
  showFullNameWithArrow: function() {
    setTimeout(() => {
      console.log('callback with arrow function ' + this.firstname + " " + this.lastname);
    }, 1000);
  }
};
person.showFullNameWithRegular();
person.showFullNameWithArrow();

```
Kết quả :
```
callback with regular function undefined undefined
callback with arrow function firstname lastname
```
Khi chúng ta khai báo function như là 1 callback function .Với **regular function**  từ khoá **this** vẫn sẽ là **context** của nó.Còn arrow function thì từ khoá **this** sẽ là **scope** của nó !
# Tổng kết
**Nên sử dụng Arrow function khi** : 
- Callback function
- Pure function

**Nên sử dụng Regular function khi** : 
- Protype function
- Property object function