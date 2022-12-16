Chắc hẳn khi bước vào con đường lập trình bạn cũng đã nghe qua design patterns hay nguyên lý SOLID vậy nguyên lý SOLID là gì ? Và giúp ích gì cho bạn trong quá trình phát triển ứng dụng hay phần mềm của bạn hãy đi hết bài viết của mình này nhé.

Thiết kế mô hình là một công việc khó khăn. Thường thì một ứng dụng phát triển theo nhu cầu của người dùng và nếu nó được thiết kế kém, sớm hay muộn chúng ta sẽ phải đối mặt với những rắc rối trong quá trình phát triển. Các nguyên tắc SOLID có thể giúp chúng ta thiết kế các ứng dụng tốt hơn. Chúng cho phép chúng ta phát hiện các điểm yếu và có nhưng phần mềm với dòng code mạnh mẽ, linh hoạt và đặc biệt là khả năng bảo trì. Mặc dù các nguyên tắc SOLID được sinh ra cho các ngôn ngữ OOP cổ điển, chúng cũng có thể được áp dụng cho ngôn ngữ JavaScript.

## Nguyên lý của thiết kế OOP 
Nguyên tắc thiết kế OOP được biết đến bao gồm 4 thành phần chính: Đóng gói, Đa hình, Kế thừa, Trừu tượng. Những nguyên tắc này là nền tảng của bất kỳ ngôn ngữ nào có thể được định nghĩa là hướng đối tượng. Do đó, chúng là những nguyên tắc cơ bản mà chúng ta không thể nói rằng chúng ta đang áp dụng mô hình OOP.

Tuy nhiên, các nguyên tắc đơn giản của OOP không đủ để đảm bảo cho chúng ta tạo ra các ứng dụng chất lượng và dễ bảo trì. Chúng chỉ đơn giản cung cấp cho chúng ta các công cụ cho phép mô hình hóa một vấn đề bằng cách sử dụng các khái niệm trừu tượng mà chúng ta gọi là các đối tượng. Sự mạnh mẽ, khả năng bảo trì và tính linh hoạt của một ứng dụng chủ yếu phụ thuộc vào cách thiết kế,  cách kết hợp các thành phần và sử dụng các nguyên tắc của OOP.

Theo Robert C. Martin, một trong những đồng tác giả của Agile Manifesto, có ba đặc điểm của thiết kế xấu cần tránh:
* **Rigidity**: Đề cập đến là việc khó khăn khi sửa đổi ứng dụng vì mọi thay đổi liên quan đến quá nhiều phần của hệ thống.
* **Fragility**: Đây là sự phát sinh lỗi trong ứng dụng do những thay đổi trong các phần khác.
* **Immobility**: Đây là việc hệ thống không thể sử dụng thêm một thành phần trong phần mềm khác vì nó quá phụ thuộc vào ứng dụng hiện tại.

Việc áp dụng các nguyên tắc này giúp chúng ta ngăn chặn được các tình huống tiềm ẩn trong việc thiết kế xây dựng các ứng dụng của chúng ta dẫn đến rủi ro.

Để tránh những vấn đề này, Martin gợi ý một số nguyên tắc thiết kế được biết đến là SOLID.
Mặc dù, Nhìn chung các nguyên tắc này có liên quan đến bối cảnh của Lập trình hướng đối tượng cổ điển và đề cập đến các classes, types, và interfaces các khái niệm cơ bản cũng có thể áp dụng cho ngôn ngữ dựa trên nguyên mẫu như JavaScript. Hãy bắt đầu phân tích các nguyên tắc này và tìm hiểu cách áp dụng chúng trong việc phát triển các ứng dụng

SOLOD là một từ viết tắt thường dùng để chỉ một bộ năm nguyên tắc cơ bản của một thiết kế mô hình:
* S: Single Responsibility Principle
* O: Open/Closed Principle
* L: Liskov Substitution Principle
* I: Interface Segregation Principle
* D: Dependency Inversion Principle

## 1. Single Responsibility Principle
Nguyên tắc đầu tiên của ngăn xếp SOLID là Nguyên tắc Single Responsibility. Theo định nghĩa của Martin, nguyên tắc nói:

`A class should have only one reason to change`

Trong thực tế, nó thường bị hiểu nhầm là một lớp chỉ nên làm một việc. Tuy nhiên theo định nghĩa của nguyên tắc nói rằng lý do duy nhất để một lớp hoặc đối tượng thay đổi là khi nó đã thay đổi trách nhiệm. Vì vậy thật không đúng khi một đối tượng chỉ có thể làm một việc, thay vào đó nó có thể làm nhiều việc khác nhau thuộc về cùng một trách nhiệm. 

Nói cách khác, các hành động được gán cho một đối tượng phải phù hợp với trách nhiệm duy của nó. Nếu có hai lý do khác nhau để một đối tượng hoặc lớp phải được thay đổi, thì chúng ta phải tách hai trách nhiệm thành nhiều đối tượng hoặc lớp.

Hãy xem xét một ví dụ thực tế của nguyên tắc này bằng cách giới thiệu hàm constructor **Order**:
```javascript
function Order(customerId) {
     this.customerId = customerId;
     this.dateTime = new Date();
     this.items = [];
}
```

Bây giờ hãy xem lớp chịu trách nhiệm quản lý các đơn hàng:
```javascript
var OrderManager = (function () {
    function OrderManager() { }
    OrderManager.prototype.createOrder = function (customerId) {
        this.order = new Order(customerId);
    };
    OrderManager.prototype.addItem = function (item) {
        this.order.items.push(item);
    };
    OrderManager.prototype.sendOrder = function () {
        if (this.isValid(this.order)) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var response = JSON.parse(xhr.responseText);
                    handleResponse(response);
                }
            };
            xhr.open("POST", "/api/orders");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(order));
        }
        else {
            handleError({ message: "Not valid order!" });
        }
    };
    OrderManager.prototype.isValid = function (order) {
        return order.items.length > 0;
    };
    return OrderManager;
}());
```

Hãy cùng phân tích hàm tạo OrderManager, hãy lưu ý rằng trách nhiệm chính của nó là quản lý đơn hàng, như chính tên gọi của nó. Vì vậy, hành động của nó nên liên quan đến vòng đời đặt hàng. 


Tuy nhiên, phương thức sendOrder () chịu một trách nhiệm không liên quan đến quản lý đơn hàng, chúng tôi đang nói về việc gửi đơn đặt hàng thực tế. Trong ví dụ này, phương thức sendOrder () chịu trách nhiệm gửi đơn đặt hàng đến máy chủ thông qua một cuộc gọi Ajax đến một URL cụ thể. Giả sử rằng tại một số điểm, việc đơn đặt hàng đến máy chủ thay đổi, không phải vì lý do liên quan đến lệnh quản lý, mà vì lý do kỹ thuật. Ví dụ: các đặc tả API của máy chủ đã thay đổi hoặc chúng tôi không còn muốn sử dụng XMLHttpRequest để gửi yêu cầu đến máy chủ mà là thư viện của bên thứ ba. Vấn để ở đây đã nảy sinh 1 lý do thứ 2 để thay đổi chức năng xây dựng OrderManager. Vì vậy, Chúng đã phá vỡ Nguyên tắc  Single Responsibility  duy nhất bởi vì, ngoài trách nhiệm quản lý đơn hàng, họ còn có trách nhiệm quản lý các chi tiết kỹ thuật gửi đơn đặt hàng đến máy chủ.

Để áp dụng Nguyên tắc Single Responsibility, nhiệm vụ gửi đơn đặt hàng phải được chỉ định cho một thành phần khác. Vì vậy, chúng tôi xác định một constructor mới sẽ đảm nhận trách nhiệm này:

```javascript
var OrderSender = (function () {
    function OrderSender() { }
    OrderSender.prototype.send = function (order) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                handleResponse(response);
            }
        };
        xhr.open("POST", "/api/orders");
        xhr.setRequestHeader("Content-Type", "application/ json; charset = UTF - 8");
        xhr.send(JSON.stringify(order));
    }
    return OrderSender;
})();
```
Áp dụng Nguyên tắc Single Responsibility, chúng ta tạo ra một ứng dụng có cấu trúc phân lớp rõ ràng cho phép chúng tôi sử dụng lại logic nghiệp vụ trên nhiều ứng dụng và cải thiện khả năng bảo trì và khả năng mở rộng của nó.

## 2. Nguyên tắc Open/Closed

Nguyên tắc SOLID thứ hai liên quan đến khả năng mở rộng của các thành phần và được gọi là nguyên tắc Open/Closed. Trọng tâm của nó là tránh những thay đổi khi chúng ta cần mở rộng tính năng của một thành phần. Nguyên tắc nêu rõ:

`Software entities like classes, modules and functions should be open for extension but closed for modifications.`

Trong thiết kế các thành phần của ứng dụng, chúng ta phải tính đến hai khía cạnh này:
* **Open for extension**: Các thành phần nên có khả năng điều chỉnh theo nhu cầu thay đổi của ứng dụng.
* **Closed for modifications**: Các thay đổi bắt buộc không nên được liên quan đến thành phần chính  ban đầu.

## 3. Nguyên tắc thay thế Liskov

Nguyên tắc SOLID thứ ba, Nguyên tắc thay thế Liskov, bằng cách nào đó nó như một phần mở rộng của nguyên tắc Open/Closed. Trong thực tế, nó liên quan đến khả năng mở rộng một thành phần thông qua kế thừa và áp đặt một ràng buộc đảm bảo khả năng tương tác của các đối tượng trong hệ thống phân cấp thừa kế. Nguyên tắc nói:

`Subtypes must be substitutable for their base type.`

Khi chúng ta sử dụng tính kế thừa, chúng ta mở rộng một thành phần cơ sở để tạo ra các thành phần mới chuyên biệt . Nguyên tắc của Liskov muốn chúng ta cẩn thận không làm gián đoạn chức năng của thành phần lớp cha khi chúng ta xác định thành phần dẫn xuất. Các lớp, đối tượng, hàm và các thực thể phần mềm khác phải làm với các thành phần của hệ thống phân cấp thừa kế phải có khả năng tương tác một cách thống nhất. 

Hãy thử giải thích nguyên tắc này bằng một ví dụ. Hãy xem xét các đối tượng discounter xác định một hàm khởi tạo như đối tượng được hiển thị ở đây:
```javascript
function Discounter(min, max, discountPercentage) {
    this.min = min;
    this.max = max;
    this.discountPercentage = discountPercentage;
}
Discounter.prototype.isApplicable = function (order) {
    var itemsCount = order.items.length;
    return (itemsCount >= this.min && itemsCount < this.max)
};
Discounter.prototype.apply = function (order) {
    order.totalAmount = order.totalAmount - order.totalAmount *
        discountPercentage / 100;
};
```

Bây giờ, nếu chúng tôi muốn xác định loại giảm giá mới dựa trên số lượng đơn đặt hàng chứ không phải số lượng mặt hàng, chúng tôi có thể mở rộng công cụ tạo Discounter bằng cách thay đổi phương thức isApplossible (), như sau:

```javascript
function AmountDiscounter(min, max, discountPercentage) {
    Discounter.apply(this, arguments);
}
AmountDiscounter.prototype.isApplicable = function (order) {
    var orderAmount = order.totalAmount;
    return (orderAmount >= min && orderAmount < max)
}; function AmountDiscounter(min, max, discountPercentage) {
    Discounter.apply(this, arguments);
}
AmountDiscounter.prototype.isApplicable = function (order) {
    var orderAmount = order.totalAmount;
    return (orderAmount >= min && orderAmount < max)
};
```

Thay đổi rất đơn giản, nhưng thay đổi hoàn toàn ngữ nghĩa của hàm tạo cơ sở. Định nghĩa Số tiền phát hiện trái ngược với định nghĩa của Discounter và vi phạm nguyên tắc thay thế Liskov, vì tôi không thể sử dụng một phiên bản của MoneyDiscount, hiện đang sử dụng một phiên bản của Discounter. Nếu chúng ta làm điều đó, kết quả sẽ không thể đoán trước được.

Việc áp dụng nguyên tắc Liskov  không đơn giản. Trên thực tế, việc mở rộng một thành phần khó có thể nằm dưới dưới sự kiểm soát một cách hoàn toàn, đặc biệt nếu mã của bạn sử dụng là thư viện  bên thứ ba. Trong những trường hợp này, người dùng có thể tạo các đối tượng dẫn xuất và xác định lại các chức năng theo ý của mình, với nguy cơ vi phạm nguyên tắc của Liskov.

Một cách để hạn chế vi phạm nguyên tắc này là hạn chế sử dụng quyền thừa kế khi có thể. Đề xuất nổi tiếng của Gang of Four nói rằng ủng hộ thành phần đối tượng hơn là kế thừa. Trên thực tế, ngoài việc vi phạm tiềm nguyên tắc thay thế của Liskov, sự kế thừa tạo ra sự ghép nối giữa cơ sở và các thực thể dẫn xuất và sự lan truyền thay đổi dẫn đến những tác động không phải lúc nào cũng có thể phát hiện ngay. Người ta thường đề xuất định nghĩa interface thay vì sử dụng tính kế thừa.

## 4. Nguyên tắc Interface Segregation 

Khi thiết kế interface của một đối tượng, chúng ta nên xác định những gì thực sự cần thiết, tránh mang theo những thứ không được sử dụng. Tóm lại, Nguyên tắc phân chia interface, nói:
`Clients should not be forced to depend on methods they do not use.`

Mặc dù JavaScript không hỗ trợ các interfaces cũng như các loại abstract. Trong mọi trường hợp, nguyên tắc này không đề cập đến các interface như là một yếu tố cú pháp thuần túy, mà là toàn bộ tập hợp các thuộc tính và phương thức công khai của một đối tượng.

Do đó, trong định nghĩa về interfaces đối tượng, chúng ta nên cẩn thận chỉ xác định những gì thực sự cần thiết. Điều này tránh sự phơi bày có thể tạo ra sự mơ hồ và nhầm lẫn.

Hãy xem xét các ví dụ sau:
```javascipt
function Discounter(min, max, discountPercentage, gadget) {
    this.min = min;
    this.max = max;
    this.discountPercentage = discountPercentage;
    this.gadget = gadget;
}
Discounter.prototype.isApplicable = function (order) {
    var itemsCount = order.items.length;
    return (itemsCount >= this.min && itemsCount < this.max)
};
Discounter.prototype.apply = function (order) {
    order.totalAmount = order.totalAmount - order.totalAmount *
        discountPercentage / 100;
};
Discounter.prototype.addGadget = function (order) {
    order.items.push(this.gadget);
}
```

Chúng tôi đã xác địnhDiscounter thêm quản lý tiện ích. Sử dụng định nghĩa này, tất cả các thể hiện đối tượng sẽ có thuộc tính gadgets và phương thức addGadget (), ngay cả khi hầu hết các đối tượng này sẽ không sử dụng chúng. Để tuân thủ Nguyên tắc phân chia giao diện, sẽ phù hợp để thiết lập một hàm tạo đặc biệt cho các bộ giảm giá quản lý các tiện ích:

```javascript
function GadgetDiscounter(min, max, gadget) {
    this.min = min;
    this.max = max;
    this.gadget = gadget;
}
GadgetDiscounter.prototype.isApplicable = function (order) {
    var itemsCount = order.items.length;
    return (itemsCount >= this.min && itemsCount < this.max)
};
GadgetDiscounter.prototype.addGadget = function (order) {
    order.items.push(this.gadget);
}
```

Trong trường hợp này, chúng tôi đã định nghĩa một hàm xây dựng mới GadgetDiscounter có thuộc tính gadget và phương thức addGadget ().
Một giải pháp tốt hơn dựa trên cách tiếp cận mixin như ở đây:

```javascpit
function Discounter(min, max, discountPercentage) {
    this.min = min;
    this.max = max;
    this.discountPercentage = discountPercentage;
}
Discounter.prototype.isApplicable = function (order) {
    var itemsCount = order.items.length;
    return (itemsCount >= this.min && itemsCount < this.max)
};
Discounter.prototype.apply = function (order) {
    order.totalAmount = order.totalAmount - order.totalAmount *
        discountPercentage / 100;
};
var gadgetMixin = {
    gadget: {},
    addGadget: function (order) {
        order.items.push(this.gadget);
    }
};
var discounter = new Discounter(10, 20, 0);
var gadgetDiscounter = augment(discounter, gadgetMixin);
gadgetDiscounter.gadget = { name: "A nice gadget!" }
```

Cách tiếp cận này cho phép mở rộng chỉ các đối tượng thực sự cần giao diện để làm việc với các gadgets.
Như chúng ta đã thấy, Nguyên tắc Interface Segregation khá giống với Nguyên tắc Single Responsibilityt. Cả hai đều thúc đẩy đơn giản hóa và gắn kết các thành phần; Nhưng trong khi Nguyên tắc Single Responsibility đề cập đến toàn bộ thành phần thì nguyên tắcInterface Segregation chỉ yêu cầu đơn giản hóa ở cấp public interface.

## 5. Nguyên lý Dependency Inversion

Nguyên tắc SOLID cuối cùng liên quan đến sự phụ thuộc giữa các thành phần của ứng dụng và được phát biểu rằng:
```
1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
2. Abstractions should not depend upon details. Details should depend on abstractions.
```

Đây là nguyên tắc Dependency Inversion và nó bao gồm hai khuyến nghị.
+ Liên quan đến kiến trúc phân lớp cổ điển của một ứng dụng, trong đó các thành phần của mức cao phụ thuộc hoàn toàn vào các thành phần ở mức thấp. 
+  Một sự trừu tượng hóa, phải mô tả một hành vi và các chi tiết thực hiện phải tuân theo hành vi được xác định bởi sự trừu tượng hóa.

Để hiểu rõ hơn nguyên lý này hãy đến với ví dụ sau:
```javascript
function Order(customerId) {
    this.customerId = customerId;
    this.dateTime = new Date();
    this.totalAmount = 0;
    this.items = [];
}
var OrderManager = (function () {
    var discounters = [];
    function OrderManager() { }
    OrderManager.prototype.createOrder = function (customerId) {
        this.order = new Order(customerId);
    };
    OrderManager.prototype.sendOrder = function () {
        if (this.isValid(this.order)) {
            this.applyDiscount(this.order);
            var orderSender = new OrderSender();
            orderSender.send(order);
        }
        else {
            handleError({ message: "Not valid order!" });
        }
    };
    OrderManager.prototype.isValid = function (order) {
        return order.items.length > 0;
    };
    OrderManager.prototype.registerDiscounter = function (discounter) {
        discounters.push(discounter);
    };
    OrderManager.prototype.applyDiscount = function (order) {
        var i;
        for (i = 0; i < discounters.length; i++) {
            if (discounters[i].isApplicable(order)) {
                discounters[i].apply(order);
                break
            }
        }
    };
    return OrderManager;
}());
var OrderSender = (function () {
    function OrderSender() { }
    OrderSender.prototype.send = function (order) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                handleResponse(response);
            }
        };
        xhr.open("POST", "/api/orders");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(order));
    }
    return OrderSender;
})();
```

Trong ví dụ này, chúng ta có thể thấy sự phụ thuộc giữa các hàm tạo OrderManager và OrderSender. Mọi thay đổi đối với chế độ phân phối của đơn đặt hàng có thể yêu cầu thay đổi đối với OrderManager. Ví dụ: giả sử ngoài việc gửi đơn đặt hàng qua HTTP, chúng ta cần gửi một số loại đơn đặt hàng nhất định qua e-mail, chúng ta nên thay đổi phương thức sendOrder () để bao gồm khả năng này.

## Dependency inversion, inversion of control, and dependency injection

Thông thường, có sự nhầm lẫn giữa dependency inversion, inversion of control, and dependency injection. Ba khái niệm thực chất có sự kết nối bằng cách nào đó, nhưng chúng không hoàn toàn giống nhau. Chúng ta sẽ đi tìm hiểu để cố gắng để làm cho mọi thứ rõ ràng hơn:

Dependency inversion là một nguyên tắc thiết kế phần mềm, nguyên tắc cuối cùng của ngăn xếp SOLID. Nó đề cập đến cách hai thành phần nên phụ thuộc vào nhau và gợi ý rằng các thành phần cấp cao không nên phụ thuộc vào các thành phần cấp thấp. Nó không nói làm thế nào để làm điều đó hoặc sử dụng kỹ thuật nào.

Một cách tiếp cận khả thi để làm cho các thành phần cấp cao độc lập với các thành phần cấp thấp là inversion of control, đó là một cách để áp dụng Nguyên tắc Dependency Inversion.

Dependency injection là một kỹ thuật để thực hiện inversion of control. Nó injects thực hiện cụ thể của một thành phần cấp thấp vào một thành phần cấp cao. Vì vậy, dependency injection một cách cụ thể áp dụng nguyên tắc Dependency Inversion trong phát triển phần mềm bằng cách di chuyển sự ràng buộc của trừu tượng hóa và triển khai cụ thể ra khỏi thành phần phụ thuộc.

## Phương pháp Dependency injection

Không phụ thuộc vào ngôn ngữ được sử dụng, dependency injection có thể được thực hiện bằng ba phương pháp tiếp cận:
* Constructor injection
* Method injection
* Property injection

Cách tiếp cận phổ biến nhất là constructor injection. Nó dựa trên việc truyền phụ thuộc dưới dạng tham số của hàm tạo. 

```javascript
var httpOrderSender = new HttpOrderSender();
var orderManager = new OrderManager(httpOrderSender);
```

Nếu bạn muốn định nghĩa phụ thuộc thông qua phương thức thì chúng ta sử dụng method injection. Ví dụ: nếu chúng ta muốn chỉ định một cách gửi đơn đặt hàng khác khi gọi phương thức sendOrder (), chúng ta có thể sử dụng Method injection:
```javascipt
var httpOrderSender = new HttpOrderSender();
var orderManager = new OrderManager();
orderManager.sendOrder(httpOrderSender);
```

Phương pháp property injection cho phép chúng ta xác định sự phụ thuộc bằng cách gán nó cho một thuộc tính của đối tượng. Điều này cho phép linh hoạt thay đổi sự phụ thuộc trong suốt vòng đời của đối tượng.

```javascript
var httpOrderSender = new HttpOrderSender();
var orderManager = new OrderManager();
orderManager.sender = httpOrderSender;
orderManager.sendOrder();
```

## Tổng kết

Chúng ta đã phân tích các nguyên tắc SOLID, một bộ năm nguyên tắc Thiết kế OOP giúp tạo ra phần mềm có thể mở rộng và bảo trì hơn. Mặc dù các nguyên tắc này được sinh ra cho các ngôn ngữ OOP cổ điển, nhưng chúng cũng có thể xử dụng với JavaScript.

Chúng ta đã thấy Nguyên tắc Single Responsibility là về thiết kế kiến trúc phần mềm với các thành phần có hành vi rõ ràng và đơn giản.

Nguyên tắc Open/Closed là về thiết kế lớp và các phần mở rộng tính năng.

Nguyên tắc thay thế Liskov là về phân nhóm và kế thừa.

Nguyên tắc Interface Segregation là về định nghĩa interface với clients.

Nguyên tắc Dependency Inversion liên quan đến việc quản lý sự phụ thuộc giữa các thành phần của ứng dụng.