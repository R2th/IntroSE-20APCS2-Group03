Trong phần trước mình đã nói qua về [Factory Pattern](https://viblo.asia/p/javascript-pattern-factory-pattern-WAyK80XoKxX) , một pattern giúp chúng ta tạo dễ dàng những objects trong khi trừu tượng hóa chi tiết thực hiện của chúng. Trong bài này, chúng ta sẽ làm quen với một loại pattern về hành vi là Publisher/Subscriber pattern.

**Publisher/Subscriber pattern**, hoặc có tên gọi ngắn hơn "**PubSub**" là một pattern giúp chúng ta tạo những module mà có thể giao tiếp với những module khác ngoài nhưng không cần chúng phải phụ thuộc lẫn nhau. Nó là một pattern tuyệt vời để chia tách các thành phần của ứng dụng (decoupling application) và nó khá phổ biến trong JavaScript. 

**Một lưu ý** - Hãy sử dụng mô hình này một cách khôn ngoan vì nó dễ bị lạm dụng. Một số lượng ràng buộc (coupling) là cần thiết để có thể đọc và bảo trì code. Một trong những lỗi dễ phạm phải với những bạn ít kinh nghiệm là vấn đề decoupling, nó có thể tuyệt vời khi bạn bắt đầu code nhưng khi source càng lớn, càng nhiều module sẽ khiến việc đọc và maintain code rất khó khăn.

Ta cùng thử qua một ví dụ dùng **PubSub**.

Đầu tiên tạo một folder **pubsub** và tạo một file **pubsub.js** có code như sau:

```
let subscribers = {};
module.exports = {
    publish() {
        // method to publish an update
    },
    subscribe() {
        // method to subscribe to an update
    }
};
```

Sau đó ta gọi subscribers để lưu giữ đăng ký các subscriber callbacks. Trong đối tượng này, chúng ta sẽ lưu giữ các event bằng các cặp key/ value. Mỗi event sẽ có một key tương ứng với tên của event và một giá trị là một mảng. Trong mảng này, chúng ta sẽ đăng ký/ lưu giữ các subscriber callbacks. Các hàm callbacks này được gọi khi các event nhận được một trigger.

Tiếp theo, pubsub module có 2 function. Một là 'publish' để gọi một update và một là 'subscribe' để đăng ký một update.

Đây là sườn chính của một publisher/subscriber module.

Tập trung vào hàm subscribe trước, hàm này sẽ giúp chúng ta đăng ký một subscriber callback. Nó chấp nhận 2 tham số. Đầu tiên là tên event được subscribed và callback được gọi khi event được kích hoạt.

đây là hàm **subscribe**
```
subscribe(event, callback) {
    if (!subscribers[event]) {
        subscribers[event] = [];
    }
    subscribers[event].push(callback);
}
```

Tiếp theo tới hàm **publish**:

```
publish(event, data) {
    if (!subscribers[event]) return;
    subscribers[event].forEach(subscriberCallback =>
        subscriberCallback(data));
}
```

Trước tiên, chúng ta check nếu ở đây có bất cứ subscribers nào đã được đăng ký cho event truyền vào. Nếu không, chúng ta sẽ return khỏi hàm publish và không có subscribers nào được gọi. Nếu có một subscribers, chúng ta gọi đến tất cả hàm callback của subscriber đó . Chúng ta có thể truyền bất cứ data nào có thể được cung cấp tới mỗi hàm callbacks.

Bây giờ chúng ta tiếp tục tạo những modules khác để để ứng dụng pubsub vừa tạo. Thêm 2 file gọi là moduleA.js và moduleB.js 

Trong ví dụ này thì moduleA sẽ là publisher và moduleB sẽ là subscriber. Như chúng ta thấy, cả 2 module sẽ không có liên hệ gì đến module còn lại và chúng chỉ giao tiếp với nhau qua pubsub module.

**moduleA.js :**

```
const pubSub = require("./pubsub");
module.exports = {
    publishEvent() {
        const data = {
            msg: "TOP SECRET DATA"
        };
        
        pubSub.publish("anEvent", data);
    }
};
```

Ở đây chúng ta require pubSub module và export một đối tượng với một hàm publishEvent. Hàm này có một tham số data và gọi hàm publish của pubSub để truyền tên event và tham số data đó.

**moduleB.js:**

```
const pubSub = require("./pubsub");
pubSub.subscribe("anEvent", data => {
    console.log(
        `"anEvent", was published with this data: "${data.msg}"`
    );
});
```

Subscriber code thì ngắn gọn hơn. Ở đây chúng ta cũng require pubSub module và gọi subscribe để đăng ký một event. Chúng ta truyền tên event và một hàm callback để xử lý event đó.

Bây giờ là phần nhẹ nhàng nhất, kết nối tất cả với nhau để ta có một cái nhìn cơ bản về pubSub nào. Tạo một file index.js

```
const moduleA = require("./moduleA");
const moduleB = require("./moduleB");
// We use moduleA's publishEvent() method
moduleA.publishEvent();
moduleA.publishEvent();
```

compile và chạy file index.js vừa tạo

```
$ node ./pubsub/index.js
```

Ta sẽ thấy in ra màn hình console như sau:
```
"anEvent", was published with this data: "TOP SECRET DATA"
"anEvent", was published with this data: "TOP SECRET DATA"
```

Ta đã biết cơ bản một pubSub là như thế nào. Bây giờ, cùng chỉnh sửa lại một chút pubsub.js.

```
subscribe(event, callback) {
    let index;
    if (!subscribers[event]) {
        subscribers[event] = [];
    }
    index = subscribers[event].push(callback) - 1;
    
    return {
        unsubscribe() {
            subscribers[event].splice(index, 1);
        }
    };
}
```

Chúng ta thêm một biến mới là index và biến index này được gán bằng index của subscriber vừa thêm vào. Sau đó chúng ta trả về một đối tượng chứa hàm unsubscribe, hàm này dùng để remove event khỏi subscribers.

Chúng ta sử dụng hàm unsubscribe trong subscriber ở moduleB.js như sau

```
const pubSub = require("./pubsub");
let subscription;
subscription = pubSub.subscribe("anEvent", data => {
    console.log(
        `"anEvent", was published with this data: "${data.msg}"`
    );
    subscription.unsubscribe();
});
```

Chúng ta thử chạy lại index.js lần nữa thì sẽ thấy ở màn hình console chỉ hiện 1 lần console.log vì chúng ta đã unsubscribe nó sau khi được kích hoạt lần đầu.

Và tất cả ở trên là về **Publisher/Subscriber pattern**.

Như chúng ta đã thấy thì **Publisher/Subscriber pattern** làm chúng ta dễ dàng tách các module và loại bỏ những phụ thuộc giữa chúng. Tuy nhiên, như đã lưu ý ở trên thì chúng ta phải cẩn thận không lạm dụng nó vì có thể dẫn đến những đoạn code tối nghĩa (obscure) khó bảo trì sau này.

Nguồn: https://medium.com/@thebabscraig/javascript-design-patterns-part-2-the-publisher-subscriber-pattern-8fe07e157213