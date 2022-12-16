### 1. The constructor Pattern
Trong các ngôn ngữ lập trình hướng đối tượng cổ điển,  **constructor** (Hàm khỏi tạo) là một phương thức đặc biệt được sử dụng để khởi tạo đối tượng mới được tạo sau khi nó đã được cấp phát bộ nhớ. Trong **Javascript** hầu hết mọi thứ là một object, chúng ta quan tâm nhất đến hàm khởi tạo đối tượng. Vì các hàm khởi tạo được sử dụng tạo đối tượng cụ thể, ví dụ khi tạo đối tượng ta có thể khởi tạo các thuộc tính của đối tượng hoặc không set giá trị.

![](https://images.viblo.asia/6c322108-f4d4-4889-a9e9-08fc56d20e1e.png)


   Như chúng ta biết  **Javascript** không hỗ trợ khái niệm các lớp vì vậy bên trong hàm khỏi tạo thì **this** đang tham chiếu đến mới đang được tạo. Một hàm khỏi tạo cơ bản như sau: 
```
// Hàm khỏi tạo có  thàm số
function Book(name, author, number_of_page) {
  this.name = name;
  this.author = author;
  this.number_of_page = number_of_page;
}
// Khởi tạo
var book = new Book("Davici code", "Dan Brown", 300);
```

### 2. The module Pattern
   Modules là một phần không thể thiếu của bất kỳ kiến trúc ứng dụng nào nó giúp code dự án được độc lập và có tổ chức rõ ràng.Có một số tùy chọn để triển khai modules bao gồm các:
       
   Object literal notation:
 
> về cơ bản là một mảng cặp key: value một cặp ngăn cách  bởi dấu chấm phẩy ngoại trừ cặp cuối cùng giống như một mảng thông thường các giá trị được tạo bơi hàm ẩn danh của bạn. 
>
ví dụ:
```
var newObject = {
  variableKey: variableValue,
  functionKey: function() {
    //…
  }
};
```
 
   The module Pattern:
>    là phương pháp implement source code  theo các modules riêng biệt với các ưu điểm dễ mở rộng giảm thiểu conflict khi làm việc theo nhóm, quản lý biến local tốt hơn...
> 

   AMD modules:
>  là một đặc tả của ngôn ngữ lập trình Javascript. Nó đinh nghĩa một giao diện lập trình ứng dụng (API)  xác định mã modules và các phụ thuộc của chúng và tải chúng không đồng bộ nếu muốn.

  CommonJS module
  
  ECMAScript Harmony modules
  
  ![](https://images.viblo.asia/614b1491-a842-4ea6-bd18-8c13769deec5.png)

Chúng ta xem xét việc  implement modules băng cách tạo modules độc lập:

```
var testModule = (function() {
  var counter = 0;
  return {
    incrementCounter: function() {
      return ++counter;
    },
    resetCounter: function() {
      counter = 0;
    }
  };
})();

// Usage:
testModule.incrementCounter();
testModule.resetCounter();
```

### 3. The Revealing Module Pattern
 Một điều khi sử dụng module chúng ta có thể tránh được việc lặp tên đối tượng và khí truy cập các method được định nghĩa của modules  khi public hoặc truy cập từ bên ngoài.
 
```
var myRevealingModule = (function() {
  var privateVariable = 'not okay',
    publicVariable = 'okay';
  function privateFun() {
    return privateVariable;
  }

  function publicSetName(strName) {
    privateVariable = strName;
  }

  function publicGetName() {
    privateFun();
  }

  return {
    setName: publicSetName,
    message: publicVariable,
    getName: publicGetName
  };
})();

//Usage:

myRevealingModule.setName('Marvin King');
```

### 4. The Singleton Pattern

Singleton pattern được biết đến vì nó  hạn chế việc tạo  mới đối tượng. Singleton pattern khác với lớp tĩnh vì chúng có thể trì hoãn việc khởi tạo chúng. Nói chung là họ yêu cầu một số thông tin có thể không có sẵn trong thời gian khởi tạo . Chúng ta hay xem cấu trúc  Singleton pattern:
```
var singletonPattern = (function() {
  var instance;
  function init() {
    // Singleton
    function privateMethod() {
      console.log('privateMethod');
    }
    var privateVariable = 'this is private variable';
    var privateRandomNumber = Math.random();
    return {
      publicMethod: function() {
        console.log('publicMethod');
      },
      publicProperty: 'this is public property',
      getRandomNumber: function() {
        return privateRandomNumber;
      }
    };
  }

  return {
    // Get the singleton instance if one exists
    // or create if it doesn't
    getInstance: function() {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

// Usage:
var single = singletonPattern.getInstance();
```

### 5. The Observer Pattern
Là một mẫu thiết kế  trong đó một đối tượng duy trì một danh sách các tượng tùy thuộc vào người quan sát , sẽ tự động thông báo cho chúng biết về bất kỳ sự thay đổi của trạng thái.

![](https://images.viblo.asia/1b2e55b1-a114-4940-b828-5400844954cb.png)


* subject : duy trì một danh sách observer , các cơ sở thêm hoặc xóa đi
* observer: cung cấp interface cập nhật cho đôi tượng cần được thôn báo vệ sự  đổi của đối tượng
* ConcreteSubject:  truyền  thông báo  đến observer  về sự hay đổi của trạng thái , lưu trữ trạn thái của ConcreteObservers
* ConcreteObservers: Lữu trữ một tham chiếu đến ConcreteSubject, triển khái interface cập nhật cho observer để đảm bảo trạng thái phù hợp cho đối tượng 

```
function ObserverList() {
  this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.Empty = function() {
  this.observerList = [];
};

ObserverList.prototype.Count = function() {
  return this.observerList.length;
};

ObserverList.prototype.Get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

//...

```
Khi subject cần thông báo cho observer có điều gì đó đang xảy ra, nó se truyền thông báo  đến observer (Bao gồm cả data lienje quan đên thông báo).

Khi mà chúng ta không mong muốn  một observer thông báo về những  thay đổi của chủ thể mà nó được đăng ký thì chủ thể có thể xóa bỏ nó khỏi danh sách .
### 6. The Mediator Pattern
Nó thường được sử dụng khi mà một hệ thống có nhiều mối quan hệ trực tiếp giữa các components.  Lúc này sẽ có  một trung tâm điều khiển giao tiếp được thay thế . Nó giúp các components giao tiếp với nhau rõ rang và tốt hơn.

![](https://images.viblo.asia/8be7bfee-f58b-432f-9f47-0a2d62781b3c.png)

```
var mediator = (function() {
  var topics = {};
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({ context: this, callback: fn });
    return this;
  };

  // publish/broadcast an event to the rest of the application
  var publish = function(topic) {
    var args;
    if (!topics[topic]) {
      return false;
    }
    args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.content, args);
    }
    return this;
  };
  return {
    publish: publish,
    subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  };
})();
```
### 7. The Prototype Pattern
Một trong nhưng lợi ich của  thiết kế này là chúng ta làm việc các thế mạnh nguyên mẫu của javascript  cung cấp một cách tự nhiên thay vì bawt trước tính năng của ngôn ngữ khác. Hãy xem ví dụ sau:
```
var myCar = {
  name: 'bmw',
  drive: function() {
    console.log('I am driving!');
  },
  panic: function() {
    console.log('wait, how do you stop this thing?');
  }
};

//Usages:

var yourCar = Object.create(myCar);

console.log(yourCar.name); //'bmw'
```

### 8. The Factory Pattern
Factory cung cấp một giao diện chung để tạo đối tượng , trong đó chúng ta có chỉ định loại đối tượng cho factory mà chúng ta muốn. Đây là sơ đồ.

![](https://images.viblo.asia/51510913-e28b-4214-baf9-fe8f91be9a68.png)


```
function Car(options) {
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}
```

### 9. The Mixin Pattern
Đây là một kiểu thiết kế mà các lớp cung cấp kế thừa bởi một lớp con hoặc nhóm các lớp con cho mục đích tái sử dụng.

```
var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = 'male';
};

var clark = new Person('Clark', 'kent');

var Superhero = function(firstName, lastName, powers) {
  Person.call(this.firstName, this.lastName);
  this.powers = powers;
};

SuperHero.prototype = Object.create(Person.prototype);
var superman = new Superhero('Clark', 'Kent', ['flight', 'heat-vision']);

console.log(superman); //output personal attributes as well as power

```

Trong trương howp này thì superhero có thể ghi đè lại bất kỳ cụ thể nào được kể thừa .

![](https://images.viblo.asia/00f901d9-f598-42ae-b903-bc8577f14ff3.png)

### 10. The Decorator Pattern

Là một mẫu  thiết kế nhắm tái sử dụng code. Tương tự như mixins nó là một lựa chọn khả thi khác  cho phân lớp đối tượng . Về mặt cổ điển thì Decorator cung cấp hành vi cho các lớp hiện có trong hệ thống  một cách linh hoạt . Nó không quan tâm lăm đến chức năng cơ bản của lớp . Chúng ta có thể xem ví dụ sau:

```
function MacBook() {
  this.cost = function() {
    return 997;
  };
  this.screenSize = function() {
    return 11.6;
  };
}

// Decorator 1

function Memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// Decorator 2

function Engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  };
}

// Decorator 3

function Insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  };
}

var mb = new MacBook();

Memory(mb);
Engraving(mb);
Insurance(mb);

mb.cost(); // 1522
```

Tất cả các mẫu thiết kế thì không thể trong cùng một dự án . Khi chúng ta hiểu rõ các thiết kế  này và các vấn đề trong quá trình cụ thể thì chúng ta sẽ sử dụng mẫu  thiết kề phù hợp.


Các bạn có thể xem bài gốc tại link: 

https://dev.to/shijiezhou/top-10-javascript-patterns-every-developers-like-168p