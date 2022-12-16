![](https://images.viblo.asia/b69f7238-4b0a-4e09-a9f2-0e3e6a996bf6.jpg)

### Xin chào tất cả các bạn, mình là Quân, hôm nay chúng ta sẽ tìm hiểu module events trong node.js là gì, đi sâu một chút về khái niệm như là tại sao nó được tác giả viết ra, khi nào thì cần dùng đến nó, dùng nó thì có ưu điểm gì tốt?… thay vì chỉ tập trung vào mỗi việc học cách sử dụng module nhé.

Những nội dung có trong bài:

*- Tổng quan module Events trong Node.js.*

*- Sử dụng module Events.*

*- Viết một module khác kế thừa module Events.*

*- Đừng nhầm lẫn Events với Socket.io.*

– Bài viết cũng đồng thời được Post trên trang blog cá nhân: [https://trungquandev.com/series-lap-trinh-nodejs/](https://trungquandev.com/series-lap-trinh-nodejs/)

-----

### 1. Tổng quan module Events trong Node.js

*“**Module events** với lớp đối tượng **EventEmitter** bên trong nó chính là cốt lõi của kiến trúc hướng sự kiện không đồng bộ trong Node.js, hầu hết các [core module built-in trong Node.js](https://trungquandev.com/module-trong-nodejs-khai-niem-va-thuc-tien/) đều kế thừa từ module events này.”*

- Vậy chính xác thì module này dùng để làm gì?

Câu trả lời đơn giản là: **“Nó cho phép bạn lắng nghe các sự kiện và gán các hành động để chạy khi những sự kiện đó xảy ra.”**

Nếu bạn đã từng làm việc với **Javascript phía trình duyệt**, bạn chắc sẽ từng biết về các sự kiện chuột hay bàn phím khi người dùng phía client tương tác với ứng dụng như **onclick**, **onkeyup**…vv, dựa vào những sự kiện đó mà chúng ta sẽ viết code xử lý hành động tiếp theo.

**Events** cũng giống như vậy, ngoại trừ việc đó là chúng ta có thể tự định nghĩa sự kiện, phát ra sự kiện khi chúng ta muốn, không cần thiết phải dựa trên tương tác của người dùng.

**“Module Events trong Node.js hỗ trợ cho chúng ta lập trình, viết code theo kiến trúc Event-Driven.”**

- Hỏi thêm câu nữa, vậy tại sao Node.js lại sử dụng mô hình kiến trúc Event-Driven này?

Trả lời: Các bạn xem qua một số điểm mạnh của nó nhé:

– **“Events là một trong những lý do làm cho Node.js được nói là có tốc độ cao**: Vì hầu hết **code core của Node.js** đều dựa trên **mô hình Event-Driven** này nên thay vì đọc tất cả những file cần thiết với mọi request (ví dụ như PHP). Thì thằng Node này lại chỉ khởi động server, khởi tạo hết các biến, khai báo các function mà mình viết rồi cứ thế ngồi đợi một sự kiện nào đó xảy ra và thực thi chức năng.

– **“Khi sử dụng Events thì việc ghép nối các đoạn code của chúng ta lại sẽ khá lỏng lẻo”**: Nghĩa là khi một sự kiện được phát ra, nhưng nếu không có đoạn code nào lắng nghe sự kiện đó, thì cũng không sao hết, nó sẽ chẳng làm gì luôn. Như vậy khi cần xóa code, cụ thể là xóa một **“bên lắng nghe”** hoặc một **“sự kiện không cần dùng đến nữa”** thì cũng không bao giờ bị thông báo lỗi code Javascript gì cả.

– **“Sử dụng Events để thay thế cho Callbacks trong những trường hợp cụ thể"** (không phải là thay thế hoàn toàn): Node.js có rất nhiều phương thức chạy không đồng bộ (**asynchronous**), đồng nghĩa với việc có rất nhiều tác vụ liên quan đến nhau, tác vụ sau cần dữ liệu của tác vụ trước để chạy, nếu dùng callback thì code của bạn sẽ ngày càng trông giống một cái phễu lớn, người ta gọi đó là **[Callback Hell](http://callbackhell.com/)**.

![](https://images.viblo.asia/7a17b1f5-be62-4f66-abe9-d9bf3b81805b.jpeg)

-----

### 2. Sử dụng module Events.

Sau khi đã phân tích khá nhiều lý thuyết ở trên, bây giờ chúng ta sẽ đi vào cách sử dụng module.

Mình sẽ viết ví dụ đơn giản đầu tiên, Viết code để xử lý bài toán: **Khi con mèo chạy, cái chuông trên cổ con mèo sẽ kêu ring ring.**

```javascript
/**
 * Created by trungquandev.com's author on 30/09/2018.
 */
const events = require("events");
let EventEmitter = new events.EventEmitter();
 
let ringBell = () => {
    console.log("ring ring ring...");
}
 
// Lắng nghe sự kiện khi mèo chạy thì gọi tới function ringBell
EventEmitter.on("catRun", ringBell);
 
// Phát sự kiện con mèo chạy.
EventEmitter.emit("catRun");
```

- Đầu tiên là **nạp module events**, đối tượng **events** này có một thuộc tính duy nhất đó là lớp **EventEmitter**.
- Bên trong **EventEmitter** có 2 phương thức chính là **emit** và **on** tương ứng với phát và lắng nghe sự kiện.
- Khi chạy **EventEmitter.emit** sẽ **emit (phát ra)** một sự kiện tên là **“catRun”** do chúng ta đặt, và rồi **EventEmitter.on** sẽ lắng nghe sự kiện **“catRun”** sau đó **chạy function ringBell**. Nếu bỏ đi một trong 2 method **.emit** hay **.on** ở trên thì chương trình cũng không bị lỗi gì cả.

Ngoài ra chúng ta còn có thể **include thêm dữ liệu khi emit sự kiện** như thế này:
```javascript
EventEmitter.emit("catRun", data);
```

Thì ở bên lắng nghe:
```javascript
EventEmitter.on("catRun", (data) => {
   // Làm gì đó với data nhận được ở đây...
});
```

Chúng ta có thể lắng nghe nhiều lần trên cùng một sự kiện như thế này:
```javascript
EventEmitter.on("catRun", (data) => {
  // Sử dụng data cho công việc 1.
});
```

```javascript
EventEmitter.on("catRun", (data) => {
  // Sử dụng data cho công việc 2.
});
```

```javascript
EventEmitter.on("catRun", (data) => {
  // Sử dụng data cho công việc 3.
});
```

**Mặc định Node.js cho phép 10 listeners trên cùng một sự kiện,** có nghĩa là trong sự kiện **“catRun”** ở trên, Tới công việc thứ 11 Node.js sẽ thông báo lỗi. Nhưng không sao cả, chúng ta có thể sử dụng hàm **setMaxListeners** để tăng giới hạn đó.
```javascript
EventEmitter.setMaxListeners(17); // ví dụ mình nâng lên 17 listeners.
```

Còn rất nhiều phương thức hay nữa như `.once();` `.removeListener();` `.removeAllListener();` `.listener();` …vv. Các bạn có thể tham khảo thêm tại [docs của Node.js – Events](https://nodejs.org/api/events.html)

-----

### 3. Viết một module khác kế thừa module Events

Trong thực tế khi viết code, sẽ còn hay hơn nữa khi mà chúng ta có thể **viết một Class khác** mà **kế thừa** các phương thức cũng như thuộc tính của **lớp EventEmitter** trong module **events**. Vì **EventEmitter** cũng là Javascript thông thường và có thể sử dụng trong các module khác.

Nếu từng sử dụng module **http của node.js**, bạn có thể thấy nó cũng có một phương thức là .`on();`

```javascript
/**
 * Created by trungquandev.com's author on 30/09/2018.
 */
var http = require("http");
var server = http.createServer();
 
server.on("request", function (req, res) {
  res.end("This is the response.");
});
 
server.listen(8017);
```

Ví dụ ở trên cho thấy phương thức `.on();` của lớp **EventEmitter** đã trở thành một phần của lớp **http.createServer();**

Khi server nhận được một request từ trình duyệt, nó sẽ **emit** một sự kiện có tên là **“request”**, sau đó một **listener** chính là **server.on();** lắng nghe và hành động. Cụ thể hành động ở đây là trả về một chuỗi text: **“This is the response.”**

**– Bây giờ, bắt đầu ví dụ chính của chúng ta:**

*“Mình sẽ viết một module **UserModel.js kế thừa module events**, sau đó viết một file **index.js** sử dụng chính module **UserModel** này mỗi khi lưu một **user** mới vào **database** thì sẽ **emit** một sự kiện thông báo là đã lưu trữ user thành công.”*

- **UserModel.js**
```javascript
/**
 *** UserModel.js
 * Created by trungquandev.com's author on 30/09/2018.
 */
const EventEmitter = require("events").EventEmitter;
 
// Fake database.
let database = {
    users: [
        {id: 1, name: "Trungquandev01",  occupation: "developer"},
        {id: 2, name: "Trungquandev02",   occupation: "writer"},
        {id: 3, name: "Trungquandev03", occupation: "designer"}
    ]
};
 
class UserModel extends EventEmitter {
    constructor() {
        super(); // Từ khóa super được sử dụng để gọi các hàm trên đối tượng cha, ở đây đối tượng cha là EventEmitter
    }
 
    // Lưu user vào "database fake" ở trên.
    saveUser(user) {
        database.users.push(user);
        this.emit("saved", user); // sử dụng hàm .emit của thằng EventEmitter
    }
 
    // Liệt kê toàn bộ user hiện tại.
    allUser() {
        return database.users;
    }
}
 
module.exports = UserModel;
```

- **index.js**
```javascript
/**
 *** index.js
 * Created by trungquandev.com's author on 30/09/2018.
 */
const UserModel = require("./UserModel");
let User = new UserModel();
 
// Vì đã kế thừa events nên class User có thể sử dụng method .on()
User.on("saved", (user) => {
    console.log(`New user saved: ${user.name} - ${user.occupation}`);
});
 
// Lưu thêm 2 thằng user mới.
let trungquandev04 = {id: 4, name: "Trungquandev04",  occupation: "Code xịn (─‿‿─)"};
let trungquandev05 = {id: 5, name: "Trungquandev05",  occupation: "Code lởm (-.-)"};
User.saveUser(trungquandev04);
User.saveUser(trungquandev05);
 
// Lấy ra toàn bộ users
let allUser = User.allUser();
console.log(allUser);
```

- **Kết quả sau khi chạy:**
![](https://images.viblo.asia/28b6b444-cfc0-44ee-8aec-98ba97e261f2.png)

Như vậy, có thể thấy, module **UserModel** của chúng ta sau khi kế thừa **EventEmitter**, đã có thể **tự phát và tự lắng nghe** các sự kiện. Cool huh? =)) :D

-----

### 4. Đừng nhầm lẫn events với socket.io

Chắc có khá nhiều bạn khi mới làm quen với **node.js** thì cũng từng nghe qua cái tên khá phổ biến đó là **socket.io** để làm các ứng dụng **real-time**. Khi mới tìm hiểu Node.js mình từng cảm thấy chút mâu thuẫn giữa 2 thằng **events và socket.io** này, chắc không ai bị *“dốt”* thế này giống mình đâu 😀

Cả 2 module trên đều có chung một điểm là **emit** phát sự kiện rồi **on** để lắng nghe sự kiện và **gửi – nhận** các tham số dữ liệu từ chúng.

Điểm khác quan trọng giữa 2 thằng này đó là:

- **Socket.io** chỉ cho phép phát và lắng nghe sự kiện **qua lại giữa client và server.**
- **Events** chỉ cho phép phát và lắng nghe sự kiện **trong nội bộ server.**

Còn nếu muốn sử dụng **socket.io phát và nhận sự kiện ngay trên server luôn** thì có một gói module khác là **socket.io-client.**

- *“Ơ thế hỏi ngu tiếp: trên server có events rồi thì ai lại đi tải thêm socket.io-client nữa về dùng cho rối code ra mà sao người ta tải về lắm thế? (hơn 1,4 triệu lượt dowload trong cái tuần mà mình xem).”*

– Câu trả lời nằm trong trường hợp **2 server nodejs cần giao tiếp với nhau**, sẽ không thể sử dụng **events** được nữa, vì nó chỉ sử dụng nội bộ trong 1 sever thôi. Và lúc đó **socket.io-client** đã xuất hiện để giải quyết vấn đề này. Các bạn có thể tham khảo thêm ở đây: [https://www.npmjs.com/package/socket.io-client](https://www.npmjs.com/package/socket.io-client)

-----

Trên đây là chút kiến thức mình **tìm hiểu về Events trong Nodejs**, khi xem bài viết thấy có chỗ nào sai sót hy vọng được các bạn comment góp ý.

Xin chào và hẹn gặp lại các bạn ở những bài viết tiếp theo.

**[Best Regards – Trung Quân – Green Cat](https://trungquandev.com)**

-----

Tài liệu tham khảo:

[https://nodejs.org/api/events.html](https://nodejs.org/api/events.html)

[https://code.tutsplus.com/tutorials/using-nodes-event-module–net-35941](https://code.tutsplus.com/tutorials/using-nodes-event-module–net-35941)

**“Thanks for awesome knowledges.”**