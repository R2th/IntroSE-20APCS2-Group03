> Bài viết về `var` và đồng bọn của nó, các kĩ năng của quá khứ..
> 
### Lexical và Dynamic scope
Ngày xưa, khi các cụ trở nên quá mệt mỏi với việc quản lý các pointer, Garbage Collector (GC) ra đời.
Nhiệm vụ của thằng này rất đơn giản, một giá trị mà không đc bất kì biến nào reference tới, thì làm thịt nó!
Tuy nhiên, như vậy thì vẫn chưa thể thoả mãn cái GC này, nó ăn cả những giá trị có biến reference đã hết hạn.
Để đánh giá 1 biến reference đã hết hạn sử dụng hay chưa, ở đây có 2 trường phái:

- lexical scope: scope, hay "phạm vi sống" của biến, được quyết định bởi block code. (gọi là static scope cũng ok)
```
var dog = 'alive'

function foo() {
     var cat = 'alive'
     console.log(dog)  // 'alive'
}
console.log(cat)  // cat giờ đã ko còn nữa vì nó đã đi cùng scope của nó rồi
                                          // scope của cat là function foo()
```

- dynamic scope: phạm vi sống của biến được quyết định bởi callstack, tức nó sẽ không phụ thuộc vào code được viết như nào, mà là được quyết định bởi code chạy ra sao (giống hệt cách mà ta kiểm tra 'this' đang chỉ vào đâu vậy)

### Block scope

Một vấn đề muôn thuở
```
for (var i = 0; i < 3; i++) {
   setTimeout(() => console.log('counting...', i), 0)
}
```
Kết quả nó là
```
counting... 3
counting... 3
counting... 3
```
Oops! Ở đây, có 2 vấn đề, 1 là i nó không tăng dần, 2 là kết quả cuối là 3 chứ chẳng phải là 2.
Nguyên nhân khá đơn giản: "vòng lặp trên không tạo bất kì scope nào cả".
Giải quyết vấn đề này, người ta có 2 phương án xử lý:

- Do JS chỉ tính function làm phạm vi scope, nên ta chỉ việc gói nó vào function, ý là kĩ thuật IIFE ở dưới..
- Đẻ ra thêm cái mới xịn hơn, và nó chính là `let` và `const`, thay `var` bằng các thứ đó và mọi scope giờ sẽ được giới hạn bởi các dấu {}, hệt như các ngôn ngữ thông dụng khác. (đặt tên: Block Scope cho đỡ lẫn với cái "Lexical Scope CỦA JS")

### IIFE

Immediately Invoked Function Expression: tạo 1 function không tên rồi chạy nó luôn (hàng xài 1 lần). Mục đích sau cùng chỉ là tạo 1 scope cho biến i. Như nầy:
```
for (var i = 0; i < 3; i++) {
   (i => {
       setTimeout(() => console.log('counting...', i), 0)
   })(i)
}

counting... 0
counting... 1
counting... 2
```

### Do we talk anymore?

Như đã thấy, cách dùng ES6 phê hơn nhiều, vừa dễ dùng và vừa dễ đau não. Nếu cần 1 lí do để ta sử dụng `var` hay `IIFE`, thì nó chỉ có thể là vấn đề "backward compatible", dù nhiều browser đã support gần đủ các feature của ES6 rồi, nhưng nhỡ đầu ta lại gặp 1 đứa chậm thời đại, như IE chẳng hạn. Tuy nhiên, để giải quyết vấn đề này, ta hoàn toàn có thể dùng Babel để dịch code từ ES6 sang bản legacy cũng được. Cơ mà lười setup Babel thì theo t cứ cách truyền thống mà triển :q  
Chốt, `var` và `IIFE`, we ~~don't~~ should not talk anymore!