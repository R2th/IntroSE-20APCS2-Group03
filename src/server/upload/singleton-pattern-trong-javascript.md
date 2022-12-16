## Giới thiệu - Design Pattern
Design Pattern là các mẫu thiết kế có sẵn, dùng để giải quyết một vấn đề - những mẫu này có thể được sử dụng trong khá nhiều tình huống khác nhau.
Các lợi ích mà Design Patterns đem lại:
* Các Pattern là các giải pháp đã được chứng minh: Bằng cách sử dụng lại các thiết kế tốt khác, Pattern cung cấp phương pháp vững chắc để giải quyết vấn đề.
* Dễ dàng tái sử dụng: Một Pattern thường phản ánh một giải pháp vượt trội có thể điều chỉnh sao cho phù hợp với nhu cầu của chúng ta. 
* Cấu trúc của Pattern dễ hiểu: Khi nhìn vào một Pattern, cấu trúc và từ ngữ được đặt cho giải pháp diễn đạt khá dễ hiểu.

Trong phát triển phần mềm, kiến trúc là process của việc xây dựng một ứng dựng nhanh, mạnh và dễ maintain - và Pattern cung cấp các giải pháp cho các vấn đề phổ biến này. Các giải pháp này có thể bao gồm abstract rõ ràng và kỹ thuật cho phép developers giao tiếp hiệu quả với nhau.
Nếu 2 hoặc nhiều developers trong một team có kiến thức về Patterns, thì việc giải quyết vấn đề trở nên hiệu quả hơn. Còn nếu chỉ có một developer hiểu về patterns, việc giải thích cho các thành viên còn lại cũng thường dễ dàng.
Sau đây mình sẽ giới thiệu cho các bạn về vài mẫu Desing Patterns được sử dụng đáng kể trong các projects  JavaScript hiện nay.

## Singleton pattern
Đây là Pattern được sử dụng rộng rãi nhất và dễ dàng nắm bắt. Mẫu Singleton Pattern bắt nguồn từ khái niệm toán học:
> Trong toán học, 1 singleton còn được gọi là một tập đơn vị, là một tập hợp có đúng một phần tử. Ví dụ: tập {null} là 1 singleton.

Design Pattern này được dùng khi ta muốn đảm bảo chỉ có duy nhất một object được sinh ra trong toàn hệ thống. Tức là chúng ta giới hạn việc khởi tạo một class đối với một object. Lần đầu tiên một object của một class implementing Singleton pattern được khởi tạo. Bất kỳ lần thử nào tiếp theo cũng sẽ chỉ trả về instance đầu tiên. 

![](https://images.viblo.asia/bb102705-a642-4d46-9521-44d3f79cd596.png)

### Tại sao là Singleton Pattern?
Ngoài việc cho phép chúng ta chỉ có một SuperHero, vậy tại sao chúng ta lại sử dụng Singleton Pattern?

Điều đáng chú ý ở đây là khởi tạo object. Bạn có thể chỉ muốn một phiên bản cấu hình cho ứng dụng của mình, trừ khi một feature của ứng dụng của bạn đang cung cấp nhiều cấu hình.

Angular's services là một ví dụ điển hình mà mẫu Singleton pattern đang được sử dụng trong Framework phổ biến hiện nay. Có một trang dành riêng trong [Angular's document](https://angular.io/guide/singleton-services), giải thích  cách đảm bảo rằng service luôn cung cấp dưới dạng singleton.

Các services là singletons rất có ý nghĩa, vì các services được sử dụng như một nơi để store state, configuration và cho phép giao tiếp giữa các components.

### Ví dụ
Chúng ta có thể implement một  Singleton như sau:

```
var mySingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
 
    var privateVariable = "Im also private";
 
    var privateRandomNumber = Math.random();
 
    return {
 
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
 
      publicProperty: "I am also public",
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
 
  };
 
})();
 
var myBadSingleton = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {
 
    // Singleton
 
    var privateRandomNumber = Math.random();
 
    return {
 
      getRandomNumber: function() {
        return privateRandomNumber;
      }
 
    };
 
  };
 
  return {
 
    // Always create a new Singleton instance
    getInstance: function () {
 
      instance = init();
 
      return instance;
    }
 
  };
 
})();
 
 
// Usage:
 
var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true
 
var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log( badSingleA.getRandomNumber() !== badSingleB.getRandomNumber() ); // true
 
```
Singleton cung cấp một global access point đến instance (thường thông qua **MySingleton.getInstance()**) vì chúng ta không tạo **new MySigleton()**. Điều này tuy nhiên có thể có trong JavaScript.

Trong cuốn GoF, khả năng ứng dụng của Singleton pattern được mô tả như sau:
* Phải đảm bảo chính xác có một instance của một class, và nó phải được truy cập bởi các clients từ một access point nổi bật.
* Khi có một instance duy nhất nên được extend bằng cách subclassing, và client có thể sử dụng một extended instance mà không cần modifying code của họ.

Ngoài ra, trường hợp chia ra nhiều case, ta cần code như sau:
```
mySingleton.getInstance = function(){
  if ( this._instance == null ) {
    if ( isFoo() ) {
       this._instance = new FooSingleton();
    } else {
       this._instance = new BasicSingleton();
    }
  }
  return this._instance;
};
```
Ở đây, **getInstance()** trở nên giống như một [Factory method](https://www.dofactory.com/javascript/factory-method-design-pattern) và chúng ta không cần update từng điểm trong code của mình mỗi khi truy cập nó. **FooSingleton** sẽ là một subclass của **BasicSingleton**  và implement cùng một interface.

Điều quan trọng cần lưu ý về sự khác biệt giữa Singleton với static instance của class (object): trong khi Sigleton có thể implament một static instance, nó có thể construced lazily, mà không cần tài nguyên cũng như memory cho đến khi thực sự cần thiết. 

Nếu chúng ta có một static object được khởi tạo trực tiếp, cần đảm bảo code luôn được thực thi theo cùng một thứ tự (ví dụ trường hợp objCar cần objWheel trong suốt quá trình khởi tạo) và điều này không mở rộng khi có số lượng lớn file sources.

Cả Singletons và static object đều rất hữu ích nhưng chúng ta không nên quá lạm dụng nó - cũng như với các pattern khác.
Trên thực tế, Singleton pattern rất hữu ích chỉ khi cần chính xác một object để kết hợp với các object khác trong hệ thống. Dưới đây là và ví dụ minh hoạ cho trường hợp này: 

```
var SingletonTester = (function () {
 
  // options: an object containing configuration options for the singleton
  // e.g var options = { name: "test", pointX: 5};
  function Singleton( options ) {
 
    // set options to the options supplied
    // or an empty object if none are provided
    options = options || {};
 
    // set some properties for our singleton
    this.name = "SingletonTester";
 
    this.pointX = options.pointX || 6;
 
    this.pointY = options.pointY || 10;
 
  }
 
  // our instance holder
  var instance;
 
  // an emulation of static variables and methods
  var _static = {
 
    name: "SingletonTester",
 
    // Method for getting an instance. It returns
    // a singleton instance of a singleton object
    getInstance: function( options ) {
      if( instance === undefined ) {
        instance = new Singleton( options );
      }
 
      return instance;
 
    }
  };
 
  return _static;
 
})();
 
var singletonTest = SingletonTester.getInstance({
  pointX: 5
});
 
// Log the output of pointX just to verify it is correct
// Outputs: 5
console.log( singletonTest.pointX );
```

Mặc dù Singleton có những cách sử dụng hợp lệ, nhưng khi chúng ta thấy cần nó trong JavaScript thì đó là một dấu hiệu cho thấy chúng ta cần phải xem xét lại design của mình.

Chúng thừơng là một dấu hiệu cho thấy các modules trong hệ thống liên quan chặc chẽ, logic với nhau trong nhiều phần của một codebase.

Vậy ưu - nhược điểm của Singleton pattern là gì?

### Ưu - nhược điểm
1. Ưu điểm:

    * Bạn có thể chắc chắn class chỉ có duy nhất một single instance.
    * Bạn có một global access point đến instance.
    * Singleton object chỉ được khởi tạo khi nó được requested lần đầu.

2. Nhược điểm:

    * Vi phạm *Single Responsibility Principle*. Các pattern giải quyết 2 vấn đề tại một thời điểm.
    * Singleton pattern có thể che giấu những bad design , khi các components của program biết quá nhiều về nhau.
    * Pattern yêu cầu treatment đặc biệt trong môi trường multithreaded vì thế multiple threads tạo ra singleton object nhiều lần.

Trên đây là phần giới thiệu của mình về Singleton pattern trong JavaScript được mình tham khảo từ bài [https://levelup.gitconnected.com/design-patterns-in-modern-javascript-development-ec84d8be06ca?fbclid=IwAR01Kn3reFAV3gVm_ZKRPgXD7DO7gWWPpl-FICw85kAWMsseB3XVQe2eeg](https://levelup.gitconnected.com/design-patterns-in-modern-javascript-development-ec84d8be06ca?fbclid=IwAR01Kn3reFAV3gVmZKRPgXD7DO7gWWPpl-FICw85kAWMsseB3XVQe2eeg) của *Kristian Poslek* và cuốn [Learning JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/) của tác giả *Addy Osmani*.