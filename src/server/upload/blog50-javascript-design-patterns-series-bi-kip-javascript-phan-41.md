![image.png](https://images.viblo.asia/41be93a3-1087-4f59-84a5-e5ec5c98712f.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

### Singleton Pattern | Factory Pattern | Constructor Pattern

Topics
------
*   Singleton Pattern
*   Factory Pattern
*   Factory Pattern vs Constructor Pattern

Singleton Pattern (Sử dụng Redux hoặc React Context)
----------------------------------------------------

*   **Singleton Design Patterns** để control một instance duy nhất có thể được sử dụng bởi nhiều component.
*   **Singleton Pattern** có thể được coi là cốt lõi của các thư viện quản lý global state như **Redux hay React Context** .
*   Là một **Pattern** nhằm hạn chế một Class chỉ được tạo một instance.
*   Chúng có thể được truy cập trên global và hoạt động như một điểm truy cập duy nhất khi cần truy cập đến các global state.

Ví dụ:

```javascript
let instance;
let globalState = {
  color: ""
};

class StateUtility {
  constructor() {
    if (instance) {
      throw new Error("New instance cannot be created!!");
    }
    instance = this;
  }
  getPropertyByName(propertyName) {
    return globalState[propertyName];
  }
  setPropertyValue(propertyName, propertyValue) {
    globalState[propertyName] = propertyValue;
  }
}
let stateUtilityInstance = Object.freeze(new StateUtility());
export default stateUtilityInstance;
```

*   Đảm bảo rằng `globalState` là private. Bằng cách sử dụng các hàm của `StateUtility` để truy cập chúng. Bằng cách này, bảo vệ `global state` không bị thay đổi hoặc truy cập trực tiếp.
*   Cuối cùng, tạo instance của `StateUtility` như sau: `let stateUtilityInstance = Object.freeze(new StateUtility());`.
*   Sử dụng `Object.freeze` để không có `class/component/module` nào khác có thể sửa đổi tệp `stateUtilityInstance`.

Factory Pattern (Factory pattern vs Constructors) 
-------------------------------------------------

*   Một Factory là một `Object/Function/Class` trong[ mô hình lập trình hướng function](https://viblo.asia/p/blog3-mot-so-mo-hinh-lap-trinh-pho-bien-kem-vi-du-cho-nguoi-moi-bat-dau-programming-paradigms-series-bi-kip-javascript-phan-3-y37LdAnmVov) dùng để tạo các đối tượng.
*   **Factory Method tạo các đối tượng mới** theo một hướng dẫn hoặc điều kiện đã được chỉ định từ trước. Thay vì sử dụng cách thông thường để tạo các đối tượng trong JavaScript là gọi một hàm khởi tạo với toán tử `new`.
*   **Factory design pattern** được sử dụng **khi có một superclass với nhiều sub-classes và dựa trên input, sẽ trả về một trong các class con tương ứng** . Pattern này đảm nhận trách nhiệm khởi tạo một Class thông qua các Factory Method.
*   **Factory Methods** thường được sử dụng trong các ứng dụng **quản lý, maintenance hoặc thao tác với các tập hợp đối tượng khác nhau nhưng đồng thời có nhiều đặc điểm chung (tức là các Function và Properties)** .
*   **Factory pattern** có thể sử dụng constructor hoặc class bên trong. Nhưng **Factory pattern** được ưu tiên hơn trong trường hợp quá trình tạo đối tượng phụ thuộc vào các yếu tố linh động — chẳng hạn như khi muốn tạo linh động các `sub-classes`.
*  **Factory pattern** cung cấp cho một cơ chế tạo đối tượng vừa **linh hoạt vừa có thể tái sử dụng.**

OK liệt kê một loạt các định nghĩa của **Factory pattern** chắc ae cũng chuẩn bị tẩu hỏa nhập ma rồi đúng ko.
Vào ví dụ thôi nào:

```javascript
// creates factory function
function vehicleFactory (manufacturer, plateNO) {
    return  {
        manufacturer,
        plateNO,
        startEngine () {
            console.log("reving engine")
        },
        drive () {
            console.log("driving car...")
        }
    }
}
 
const Vehicle1 = vehicleFactory("Toyota", 12345);
console.log(Vehicle1) 
// prints 
//{
//  manufacturer: 'Toyota',
//  plateNO: 12345,
//  startEngine: [Function: startEngine],
//  drive: [Function: drive]
//}
  
const Vehicle2 = vehicleFactory("Ford", 13345);
console.log(Vehicle2) 
// prints 
// {
//  manufacturer: 'Ford',
//  plateNO: 13345,
//  startEngine: [Function: startEngine],
//  drive: [Function: drive]
// }
```

*   **Factory pattern** tăng khả năng tái sử dụng code bằng cách tái sử dụng các hàm `StartEngine`, `driveVehicle` và `stopEngine`.

```javascript
class Car {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || "silver"; 
    }
}

class Truck {
    constructor(options) {
        this.wheels = options.wheels || 6;
        this.doors = options.doors || 2;
        this.color = options.color || "red"; 
    }
}


class Factory {

    create = (options, vehicleType) => {

        if(!vehicleType) {
            return "unable to make vehicle. Please specify a vehicle type and tryagain!"
        }

        let vehicle;
        
        if (vehicleType === "car") {
            vehicle = new Car(options);
        } else if (vehicleType === "truck") {
            vehicle = new Truck(options);
        } 

  
        vehicle.vehicleType = vehicleType;

        vehicle.startEngine = ()=> console.log(`Reving ${vehicleType} engine`);

        vehicle.driveVehicle = ()=> console.log(`Driving ${vehicleType}...`);

        vehicle.stopEngine = ()=> console.log(`Stop ${vehicleType} engine`);

        return vehicle;
    }
 
};

const vehicleFactory = new Factory();

const car = vehicleFactory.create({
    wheels: 4,
    doors: 2,
    color: "black",
}, "car");

console.log(car)
console.log(car.startEngine())
console.log(car.driveVehicle())

// prints:
//Car {
//  wheels: 4,
//  doors: 4,
//  color: 'silver',
//  vehicleType: 'car',
//  startEngine: [Function],
//  driveVehicle: [Function],
//  stopEngine: [Function]
//}

// Reving car engine
// Driving car...

const truck = vehicleFactory.create({
    wheels: 4,
 doors: 2,
 color: "yellow",
}, "truck")

console.log(truck)
console.log(truck.startEngine())
console.log(truck.stopEngine())
// prints
//Truck {
//  wheels: 4,
//  doors: 2,
//  color: 'yellow',
//  vehicleType: 'truck',
//  startEngine: [Function],
//  driveVehicle: [Function],
//  stopEngine: [Function]
//}

// Reving truck engine
// Stop truck engine
```

*   **Bằng cách sử dụng Factory pattern, code của chúng ta cũng có thể dễ dàng maintenance**, vì vậy nếu sau này dự án có mở rộng và các nhà máy bắt đầu sản xuất các loại phương tiện mới, có thể dễ dàng implement để xử lý vấn đề này như bên dưới:

```javascript
class Car {
    constructor(options) {
        this.wheels = options.wheels || 4;
        this.doors = options.doors || 4;
        this.color = options.color || "silver"; 
    }
}

class Truck {
    constructor(options) {
        this.wheels = options.wheels || 6;
        this.doors = options.doors || 2;
        this.color = options.color || "red"; 
    }
}


class Factory {

    create = (options, vehicleType) => {

        if(!vehicleType) {
            return "unable to make vehicle. Please specify a vehicle type and tryagain!"
        }

        let vehicle;
        
        if (vehicleType === "car") {
            vehicle = new Car(options);
        } else if (vehicleType === "truck") {
            vehicle = new Truck(options);
        } 

  
        vehicle.vehicleType = vehicleType;

        vehicle.startEngine = ()=> console.log(`Reving ${vehicleType} engine`);

        vehicle.driveVehicle = ()=> console.log(`Driving ${vehicleType}...`);

        vehicle.stopEngine = ()=> console.log(`Stop ${vehicleType} engine`);

        return vehicle;
    }
 
};

const vehicleFactory = new Factory();

const car = vehicleFactory.create({
    wheels: 4,
    doors: 2,
    color: "black",
}, "car");

console.log(car)
console.log(car.startEngine())
console.log(car.driveVehicle())

// prints:
//Car {
//  wheels: 4,
//  doors: 4,
//  color: 'silver',
//  vehicleType: 'car',
//  startEngine: [Function],
//  driveVehicle: [Function],
//  stopEngine: [Function]
//}

// Reving car engine
// Driving car...

const truck = vehicleFactory.create({
    wheels: 4,
 doors: 2,
 color: "yellow",
}, "truck")

console.log(truck)
console.log(truck.startEngine())
console.log(truck.stopEngine())
// prints
//Truck {
//  wheels: 4,
//  doors: 2,
//  color: 'yellow',
//  vehicleType: 'truck',
//  startEngine: [Function],
//  driveVehicle: [Function],
//  stopEngine: [Function]
//}

// Reving truck engine
// Stop truck engine
```

*   Tất nhiên **Factory pattern** vì nó là một **Design Pattern** chuẩn `HÀNG AUTH` => Các bạn hoàn toàn có thể apply nó bằng cách dùng Function thay vì dùng Class. Tùy thuộc vào ngôn ngữ lập trình thì cách apply nó sẽ khác nhau nhưng về tư tưởng thì **Factory pattern** sẽ gần như là giống nhau.

```javascript
var Factory = function () {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        employee.say = function () {
            console.log(this.type + ": rate " + this.hourly + "/hour");
        }

        return employee;
    }
}

var FullTime = function () {
    this.hourly = "$12";
};

var PartTime = function () {
    this.hourly = "$11";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

function run() {

    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("parttime"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    for (var i = 0, len = employees.length; i < len; i++) {
        employees[i].say();
    }
}
```

Factory pattern vs Constructors
------

*   **Constructor pattern** và **Factory pattern** tương tự nhau vì **chúng là các Pattern dùng để tạo đối tượng trả về một đối tượng mới**
*   **Factory method có thể trả về một đối tượng đã được tạo**, không giống như constructor luôn tạo một instance mới.
*   Các **Factory method** có ý tưởng lập trình bằng cách sử dụng Interface, sau đó implement, điều này dẫn đến code linh hoạt hơn, trong khi đó **constructor pattern** liên kết code với một implement cụ thể.
*   **Lý do sử dụng constructor:** sử dụng **constructor để khởi tạo đối tượng với state mặc định hoặc initial state**. Các value mặc định của các thuộc tính primitives (number, string, bollean...) có thể không phải là những gì bạn đang tìm kiếm. Một lý do khác để sử dụng constructor là nó sẽ show cho chúng ta về các phụ thuộc (dependencies) của nó.
*   **Lý do sử dụng Factory:** Factory Method Pattern **cho phép các `sub-classes` chọn loại đối tượng để tạo**. Nó có liên kết lỏng lẻo bằng cách loại bỏ nhu cầu liên kết các lớp dành riêng cho từng feature.

Lại tiếp tục xem ví dụ để hiểu rõ hơn phần giải thích ở trên:

```javascript
const vehicleOptions = {type: "cars", color: "white", doors: 4, wheels: 4}

// factory pattern
function Factory(options) {
  let factory = {};
  factory.type = options.type;
  factory.color = options.color;
  factory.wheels = options.wheels;
  factory.doors = options.doors;
  
  return factory;
}

const vehicle = Factory(vehicleOptions);

// constructor pattern
function ConstructorPattern(options) {
  this.type = options.type;
  this.color = options.color
  this.doors = options.doors;
  this.wheels = options.wheels;
}

const vehicle2 = new ConstructorPattern(vehicleOptions);

console.log("factory car", vehicle)
// prints { type: 'cars', color: 'white', wheels: 4, doors: 4 }

console.log("constructor car", vehicle2)
// prints { type: 'cars', color: 'white', wheels: 4, doors: 4 }
```

Khi nào nên sử dụng Factory Pattern
------

**Factory Pattern** có thể đặc biệt hữu ích khi áp dụng cho các tình huống sau:

*   Khi thiết lập **đối tượng** hoặc **component** của liên quan đến mức độ phức tạp cao.
*   Khi cần dễ dàng tạo các instance khác nhau của các đối tượng tùy thuộc vào môi trường hiện tại hoặc một điều kiện nào đó.
*   Khi đang làm việc với nhiều đối tượng hoặc component nhỏ có chung Properties.
*   Khi kết hợp các đối tượng với các instance của các đối tượng khác chỉ cần đáp ứng `API contract` (a.k.a., duck typing) để hoạt động. Điều này rất hữu ích cho việc tách rời mọi thứ và giảm sự phụ thuộc.

Phần giải thích ở trên có thể khá khô khan các bạn cố gắng xem kỹ ví dụ sẽ giễ dàng hiểu chúng hơn.
Trong dự án hiện tại của mình thì sử dụng rất nhiều **Factory Design Pattern** này. Một khi các bạn nắm được nó sẽ thấy nó thật là đơn giản nhưng ko kém phần mạnh mẽ.

Roundup
------
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
------

* https://tuan200tokyo.blogspot.com/2022/11/blog50-javascript-design-patterns.html