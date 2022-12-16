# Definition
Sử dụng tính năng chia sẻ để hỗ trợ số lượng lớn các đối tượng chi tiết hiệu quả.

Frequency of use (in JavaScript): 5/5 high

# Summary
Mô hình Flyweight tối ưu bộ nhớ bằng cách chia sẻ một số lượng lớn các đối tượng một cách hiệu quả. Các đối tượng flyweight được chia sẻ là không thay đổi (immutable), nghĩa là chúng không thể thay đổi khi chúng đại diện cho các đặc tính được chia sẻ với các đối tượng khác.

# Diagram
![](https://images.viblo.asia/da82ba93-967b-4ff4-becb-fab764270899.jpg)

# Participants
Các đối tượng tham gia vào pattern này gồm có:
- Client -- In sample code: Computer
  - gọi vào FlyweightFactory để có được các flyweight objects
- FlyweightFactory -- In sample code: FlyweightFactory
  - tạo và quản lý các flyweight objects
  - nếu được request, và 1 flyweight không tồn tại, nó sẽ tạo mới 
  - lưu trữ các flyweight object mới tạo cho các yêu cầu trong tương lai
- Flyweight -- In sample code: Flyweight
  - maintains dữ liệu được chia sẻ trên toàn bộ app

# Sample code in JavaScript
```
 
function Flyweight (make, model, processor) {
    this.make = make;
    this.model = model;
    this.processor = processor;
};
 
var FlyWeightFactory = (function () {
    var flyweights = {};
 
    return {
 
        get: function (make, model, processor) {
            if (!flyweights[make + model]) {
                flyweights[make + model] = 
                    new Flyweight(make, model, processor);
            }
            return flyweights[make + model];
        },
 
        getCount: function () {
            var count = 0;
            for (var f in flyweights) count++;
            return count;
        }
    }
})();
 
function ComputerCollection () {
    var computers = {};
    var count = 0;
 
    return {
        add: function (make, model, processor, memory, tag) {
            computers[tag] = 
                new Computer(make, model, processor, memory, tag);
            count++;
        },
 
        get: function (tag) {
            return computers[tag];
        },
 
        getCount: function () {
            return count;
        }
    };
}
 
var Computer = function (make, model, processor, memory, tag) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;
    this.getMake = function () {
        return this.flyweight.make;
    }
    // ...
}
 
// log helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
        show: function () { alert(log); log = ""; }
    }
})();
 
function run() {
    var computers = new ComputerCollection();
    
    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");
 
    log.add("Computers: " + computers.getCount());
    log.add("Flyweights: " + FlyWeightFactory.getCount());
    log.show();
}
```

> http://www.dofactory.com/javascript/flyweight-design-pattern