> Javascript không thực sự "OOP cho lắm", nhưng người ta vẫn có cách để viết nó theo kiểu OOP!
> 

### Encapsulation:

Nhu cầu đầu tiên của OOP là giấu state và để lộ các method ra ngoài, như java thì ta làm kiểu sau:

```
class Greeter {
    private string greetPhrase = "Hello "; // như nầy thì state ko bị lộ thiên ra ngoài
    
    public string greetting(string name) {
        return greetPhrase + name;
    }
}
```

Ở trong javascript, class vốn dĩ không tồn tại, các công cụ để "gói code" gồm:

1. Object
2. Function scope

Trong đó, nếu ta dùng Object để encapsulate, thì cái ta đạt được chỉ là các state có thêm namespace mà thôi:

```
var greeter = {
  greetPhrase: "Hello ",  // cháu này vẫn lộ thiên!
  greeting(name) {
      return this.greetPhrase + name;
  }
};
```

Mà nếu ta dùng Function scope, thì  lại thành ra là ko lối thoát:

```
// Tạo 1 scope mới bằng IIFE, như vầy thì state ko bị lộ ra ngoài
(function () {
    var greetPhrase = "Hello ";  // cháu này được che đậy kĩ càng
     
     function greeting(name) {
          return greetPhrase + name;
     }  // cơ mà cháu này thì vĩnh viễn không thoát ra được!!
})()
```

### Closure

Closure là cách tạo lối thoát cho hàm greeting ở trên, nó kiểu kiểu như sau:

```
var greeter = (function () {
    var greetPhrase = "Hello ";  // cháu này được che đậy kĩ càng
     
     return function greeting(name) {
          return greetPhrase + name;
     };  // cháu này đã được hoà nhập cộng đồng!!
})()

greeter.greeting("Foo");  // "Hello Foo"
```

Ồ vậy hoá ra chỉ cần return nó ra là được, như vậy là ta đã có thể giấu state và lộ các method ra ngoài. Vậy điều kì diệu ở đây là gì?

**Hàm greeting vẫn ghi nhớ greetingPhrase**

Và đây cũng chính là closure, nếu nói cho chuẩn chỉnh thì có thể là: "closure là khả năng ghi nhớ các local state của một hàm, tại nơi mà nó được sinh ra!"

### Kết

Như vậy, thay vì viết state tràn lan (viết thế này maintain tốn máu và nước mắt) hay phải dùng cái class của ES6 (còn viết bằng cái này thi vô cùng tốn giấy mực), thì ta hoàn toàn có thể bao đóng code một cách sạch sẽ với closure. Chúc các bạn có trải nghiệm tốt hơn với javascript với sự giúp sức của closure :)