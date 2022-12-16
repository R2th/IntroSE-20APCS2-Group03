Pattern mình giới thiệu là một pattern cung cấp cho chúng ta một cái nhìn tổng quan, một interface để tạo Object. Pattern này gọi là **Factory Pattern** và nó giúp việc tạo một Object trong javascript dễ dàng hơn.

Đầu tiên, cùng tạo một folder gọi là **factory**.

**Factory Pattern** bao đóng một hàm dựng cho nhiều dạng Object và trả về một thể hiện của Object qua một API đơn giản. Nó làm việc tạo nhiều dạng Object trở nên dễ dàng bởi việc gọi một API đơn giản trả về Object dạng đó.

Cùng bắt đầu tạo hàm dựng nào. Những functions sau sẽ trả về một Object mới của một dạng cụ thể khi được tạo

Trong factory folder, cùng tạo một file laptop.js

```
const Laptop = function({ ram, hdd, name }) {
  this.ram = ram || 0;
  this.hdd = hdd || 0;
  this.name = name || "";
};
module.exports = Laptop;
```

Chúng ta tạo một hàm dựng của Laptop. Nó chấp nhận một tham số là Object chứa các thuộc tính của Object cần tạo, trong trường hợp này là RAM size, HDD size và tên của laptop.

Sau đó, chúng ta export function này như một module.

Tiếp tục ta tạo một file gọi là tablet.js

```
const Tablet = function({ ram, hdd, name, network }) {
    this.ram = ram || 0;
    this.hdd = hdd || 0;
    this.network = network || 0;
    this.name = name || "";
};
module.exports = Tablet;
```
Bây giờ ta đã xây dựng xong 2 hàm dựng cơ bản. Tiếp tục ta tạo một factory function để  cũng cấp một API cho tạo những Object trên. 

```
const Laptop = require("./laptop");
const Tablet = require("./tablet");
const gadget = { Laptop, Tablet };
module.exports = {
    createGadget(type, attributes) {
        const GadgetType = gadget[type];
        return new GadgetType(attributes);
    }
};
```
Ở đây, chúng ta sẽ import hàm dựng để tạo Laptop và Tablet, sau đó ta tạo một object gọi là gadget sử dụng các tên hàm dựng như những keys. Nó giúp ta có thể truy xuất vào những hàm dựng chúng ta muốn bởi sử dụng gadget[type]. Cuối cùng, chúng ta export một object từ module này bằng cách khai báo một hàm createGadget. Hàm này chấp nhận 2 parameter là dạng gadget và thuộc tính của dạng gadget đó.

Bạn nên lưu ý là khi chúng ta gọi một function với từ khóa new trong JS thì chúng ta nhận một object rỗng (empty object) trả về với một this được binding đến các function xử lý. 

Tiếp theo, ta xử dụng factory pattern API của chúng ta như sau :
```
const gadgetFactory = require("./gadgetFactory");
const myLaptop = gadgetFactory.createGadget("Laptop", {
    ram: 8,
    ssd: 256,
    name: "Bab's MacBook Pro"
});
const myTablet = gadgetFactory.createGadget("Tablet", {
    ram: 4,
    hdd: 128,
    name: "Bab's iPad",
    network: '4G'
});
console.log(myLaptop);
console.log(myTablet);
```

Như chúng ta thấy, chúng ta đã tạo một object dạng Laptop và một object dạng Tablet, mỗi chúng có các đặc tả riêng. Và đây gọi là factory pattern. 

Việc sử dụng và triển khai những pattern thì thường rất đơn giản, nhưng những gì nó mang lại thì rất tuyệt vời. Pattern giúp việc code trở nên dễ dàng hơn, sạch sẽ hơn, giúp chúng ta không bị rối rắm khi gặp những bài toán phức tạp. Có thể ở một mức độ đơn giản nhất thì việc áp dụng pattern có thể sẽ hơi mất thời gian nhưng khi mọi thứ đi xa hơn, phình to hơn thì Pattern là một cứu cánh tuyệt vời.

Bài viết được dịch và chỉnh sửa từ  https://medium.com/@thebabscraig/javascript-design-patterns-part-1-the-factory-pattern-5f135e881192