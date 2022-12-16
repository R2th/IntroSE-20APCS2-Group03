Có rất nhiều javascript operators như toán tử số học, gán, chuỗi ... Nhưng với các toán tử dưới đây thì có thể làm nhiều bạn còn nhầm lẫn nếu chưa hiểu rõ về chúng.

## **1. Nullish Coalescing Operator (??)**
**Cú pháp: `a ?? b`**
* Nếu a được định nghĩa không phải là Nullish (Null hoặc Undefined)  thì kết quả trả về là a.
* Nếu a là Nullish (Null hoặc Undefined) thì kết quả trả về là b.
``` javascript
let a = null
let b = 10
console.log(a ?? b)  //10
let a = 20
console.log(a ?? b ?? c) //20
```

## **2. Logical Nullish Assignment (??=)**
**Cú pháp: `a ??= b`**

Nhìn tương tự như trên có khác thì chỉ khác thêm dấu "=" thôi và nó sẽ như thế này.
* Nếu a được định nghĩa và không phải là Nullist thì kết quả trả về vẫn là a thôi.
* Nếu a ngược lại điều trên thì a sẽ được gán kết quả của b.
``` javascript
let a = null
let b = 10
console.log(a ??= b) //a = 10
// kết hợp với toán tử ?? xem nó có rất gì và này nọ không.
let a = null
console.log(a ??= null ?? undefined ?? 30) //a = 30
```
## **3. Optional Chaining Operator (?.)**
**Cú pháp: `obj?.prop`**

* Trong quá trình thao tác với object thì sẽ gặp các trường hợp cần phải xác định thuộc tính có tồn tại hay không thì với toán tử  (?.) nó giải quyết vấn đề đó. Với tham chiếu có giá trị Null hoặc Undefined thì kết quả sẽ luôn là Undefined thay vì trả về lỗi giúp code trở nên ngắn gọn hơn.
``` javascript
let obj= {
   person:{
       firstName:"John",
       lastName:"Doe",
       occupation: {
           company:'capscode',
           position:'developer'
       },
   },
   fullName: function(){
       console.log(`Full Name is: ${this.person.firstName} ${this.person.lastName}`)
  }
}

// Bạn đang muốn get ra thông tin thuộc tính nhưng không biết các thuộc tính đó có tồn tại hay không 
// để thực hiện các tiến trình tiếp theo nhưng không log lỗi trong quá trình thực hiện.

// Sử dụng optional chaining với nested object 

obj.person.address.city != undefine ? (làm abc) : (làm xyz)
// Mặc định chạy dòng này sẽ log TypeError: Cannot read property 'city' of undefined 

obj.person?.address.city != undefine ? (làm abc) : (làm xyz) 
// TypeError: Cannot read property 'city' of undefined 
// Đừng làm như này nhé... cái bạn quan tâm là address có exist không mà ? 

obj.person.address?.city != undefine ? (làm abc) : (làm xyz) // Như này ok nhé !

// Sử dụng optional chaining với function
// Tương tự như cách triển khai trên
obj.fullname() //Full Name is: John Doe
obj.detailName() //TypeError: obj.detailName is not a function
obj.detailName?.() //undefined => nhận lại được thứ bạn cần !
```

* Kết hợp tất cả lại ta có thêm một cách dùng mới tùy biến khác thay vì dùng if else hay dùng toán tử 3 ngôi rồi.

``` javascript
let obj = {
    value: {
        number: 10
    }
}
let a = null;

a ??= null ?? undefined ?? obj.coordinates?.x?.number ?? 20 
// a = 20
```

## Kết luận
Các toán tử trên giúp chúng ta giảm bớt đi thời gian thao tác với object hay function.
Nếu bạn vẫn còn chưa rõ về các toán tử trên thì link bên dưới sẽ giúp bạn có cái nhìn tổng quát hơn.

Link: https://capscode.hashnode.dev/javascript-amazing-operators