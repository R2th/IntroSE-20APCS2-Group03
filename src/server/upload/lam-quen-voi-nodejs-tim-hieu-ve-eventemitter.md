Xin chào các bạn!
Mình lại dẫn người bạn Nodejs đến để giới thiệu với các bạn đây.<br/>
Lần này, chúng ta sẽ cùng tìm hiểu về một trong những đối tượng cơ bản trong thư viện Events là EventEmitter, của bạn Node.js nhé.<br/>

# 1. Tìm hiểu EventEmitter:
## 1.1. Cơ chế hoạt động cơ bản của EventEmitter:
Cơ chế hoạt động cơ bản của EventEmitter trong Nodejs có thể được thể hiện qua ví dụ sau:<br/>
Trước tiên, mình tạo file *emitter.js* như sau:
```javascript
function Emitter() {
  this.events = {};
}

Emitter.prototype.on = function (type, listener) {
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

Emitter.prototype.emit = function (type) {
  if (this.events[type]) {
    this.events[type].forEach(function(listener) {
      listener();
    });
  }
};

module.exports = Emitter;
```

Module *Emitter* gồm một literal object events để lưu giữ tất cả các sự kiện; 2 phương thức prototype là *on* và *emit* để có thể sử dụng khi kế thừa prototype. Phương thức *on* sẽ lưu giữ theo từng kiểu sự kiện, mỗi kiểu sự kiện có một mảng các sự kiện khác nhau và các listener của mỗi kiểu sự kiện sẽ được lưu giữ trong mảng riêng của nó. Phương thức *emit* được dùng để kiểm tra xem trong object lưu giữ sự kiện đã có sự kiện đó chưa, nếu có sẽ thực hiện *phát* các listener trong sự kiện đó ra.<br/>
Để mô tả cho Emitter này mình minh họa qua đoạn mã sau trong *app.js*:
```javascript
var Emitter = require("./emitter");
var emitter = new Emitter();

emitter.on("denvang", function tocdo() {
  console.log("Giảm tốc độ");
});

emitter.on("denvang", function dunglai() {
  console.log("Dừng lại trước vạch giới hạn");
});

var tinhieu = [3, 2, 1];//1: đèn đỏ, 2: đèn vàng, 3: đèn xanh
for (var th of tinhieu) {
  if (th == 2) {
    emitter.emit("denvang");
  }
}
```
Chương trình mô tả việc nếu tín hiệu giao thông là *đèn vàng* sẽ phát ra hiệu lệnh trong sự kiện *denvang*. Trong emitter, mình đã thêm vào object sự kiện, kiểu sự kiện là *denvang*. Trong kiểu sự kiện đèn vàng có 2 listener là *tocdo* và *dunglai*. Khi đèn tín hiệu rơi vào đèn vàng sẽ phát ra các listener đã lưu trong sự kiện với kiểu là *denvang*. Và kết quả chúng ta nhận được khi gặp đèn vàng sẽ là:
```sql
Giảm tốc độ
Dừng lại trước vạch giới hạn
```
## 1.2. Kế thừa EventEmitter
### 1.2.1. Sử dụng hàm có sẵn trong thư viện Events (Node.js)
Như mình có giới thiệu qua EventEmitter là một class trong thư việc Events (Node.js) với cơ chế hoạt động được mô phỏng ở phần trên. Trong thực tế, mình không nhất thiết phải viết một module tương tự như ở trên để thực thi các sự kiện lắng nghe mà sử dụng trực tiếp các hàm có sẵn trong thư viện Events (Node.js). Để mô phỏng cho điều này, cũng với ví dụ ở phần trước, mình sẽ minh họa cách sử dụng hàm *on* và *emit* sẵn có trong thư viện Events:
```javascript
var Emitter = require("events");
var emitter = new Emitter();

emitter.on("denvang", function tocdo() {
  console.log("Giảm tốc độ");
});

emitter.on("denvang", function dunglai() {
  console.log("Dừng lại trước vạch giới hạn");
});

var tinhieu = [3, 2, 1];//1: đèn đỏ, 2: đèn vàng, 3: đèn xanh
for (var th of tinhieu) {
  if (th == 2) {
    emitter.emit("denvang");
  }
}
```
Thay vì require đến module *emitter.js* do mình tự tạo, mình sử require đến thư viện *events*, và thông qua kế thừa prototype các hàm sẵn có trong thư viện này. Cuối cùng, mình vẫn nhận được kết quả tương tự cho ví dụ minh họa trên.
### 1.2.2. Kế thừa và tái sử dụng EventEmitter
Để kế thừa và tái sử dụng EventEmitter, ở đây, mình giới thiệu phương pháp sử dụng *hàm inherits* trong thư viện *util* (Node.js). <br/>
Để minh họa, mình tạo *apptinhieu.js* như sau:
```javascript
var EventEmitter = require("events");
var util = require("util");

function DenTinHieu(typeOfLight) {
  this.type = typeOfLight;
}

util.inherits(DenTinHieu, EventEmitter);

DenTinHieu.prototype.hieuLenh = function () {
  switch(this.type) {
    case "dendo":
      this.emit("dunglai");
      break;
    case "denvang":
      this.emit("tocdo");
      this.emit("dunglai");
      break;
    case "denxanh":
      this.emit("duocphepdi");
      break;
    default:
      khongCoHieuLenh();
  }

};

var dendo = new DenTinHieu("dendo");

dendo.on("dunglai", dungLai);

var denvang = new DenTinHieu("denvang");

denvang.on("tocdo", tocDo);

denvang.on("dunglai", dungLai);

var denxanh = new DenTinHieu("denxanh");

denxanh.on("duocphepdi", duocPhepDi);

var tinhieu = {1: "dendo", 2: "denvang", 3: "denxanh"};
var tinhieuden = [1, 3, 2, 1];

for(var th of tinhieuden) {
  console.log("Tín hiệu đèn giao thông: ", tinhieu[th]);
  switch(tinhieu[th]) {
    case "dendo":
      dendo.hieuLenh();
      break;
    case "denvang":
      denvang.hieuLenh();
      break;
    case "denxanh":
      denxanh.hieuLenh();
      break;
    default:
      khongCoHieuLenh();
   }
  }

function dungLai() {
  console.log("Dừng lại trước vạch giới hạn");
}

function tocDo() {
  console.log("Giảm tốc độ");
}

function duocPhepDi() {
  console.log("Được phép đi");
}

function khongCoHieuLenh() {
  console.log("Không có hiệu lệnh cho loại đèn tín hiệu này.");
}
```
Ở đây mình có một đối tượng là *DenTinHieu*. Đối tượng này sẽ kế thừa các phương thức của EventEmitter trong thư viện *events* (Node.js). Mình mở rộng đối tượng này thông qua prototype bằng hàm *hieuLenh* để thực thi hiệu lệnh của loại đèn tín hiệu.<br/>
Từ đối tượng *DenTinHieu* này mình tạo ra 3 đối tượng *dendo*, *denvang*, *denxanh* là thể hiện của *DenTinHieu*. Vì đối tượng *DenTinHieu* đã được thừa kế từ EventEmitter nên các thể hiện của nó có thể sử dụng các phương thức của EventEmitter mà không cần phải kế thừa lại. Chính vì vậy các phương thức này đã được tái sử dụng. Bằng cách này, mình thiết lập các sự kiện thông qua phương thức *on* cho các đối tượng *DenTinHieu* và phát các sự kiện này ra thông qua phương thức *emit*.<br/>
Thực thi *apptinhieu.js* trên terminal *nodejs apptinhieu.js*, mình được kết quả như sau:
```sql
Tin hieu đèn giao thông: dendo
Dừng lại trước vạch giới hạn
Tin hieu đèn giao thông: denxanh
Được phép đi
Tin hieu đèn giao thông: denvang
Giảm tốc độ
Dừng lại trước vạch giới hạn
Tin hieu đèn giao thông: dendo
Dừng lại trước vạch giới hạn
```
Một cách khác, mình sẽ không tạo ra 3 thể hiện của *DenTinHieu* như trên nữa mà sử dụng một thể hiện chung cho cả 3 loại trên. Lúc này, mình xem 3 loại đèn tín hiện là một data đầu vào cho phương thức *on* và *emit*. 
```javascript
DenTinHieu.prototype.hieuLenh = function (loaiDen) {
  console.log(`Tin hieu ${this.type}: ${loaiDen}`);
  this.emit("canhbao", loaiDen);
};

var denGiaoThong = new DenTinHieu("đèn giao thông");

denGiaoThong.on("canhbao", function(loaiDen) {
  switch(loaiDen) {
    case "dendo":
      dungLai();
      break;
    case "denvang":
      tocDo();
      dungLai();
      break;
    case "denxanh":
      duocPhepDi();
      break;
    default:
      khongCoHieuLenh();
  }
});
```
Ở đây, thể hiện *denGiaoThong* được tạo ra từ *DenTinHieu* sẽ đại diện chung cho các loại đèn tín hiệu. Khi thiết lập sự kiện *canhbao* cho *denGiaoThong* mình truyền data là *loaiden* vào phương thức thực thi để xử lý khi *emit* sự kiện *canhbao* trên *denGiaoThong*.<br/>
Hoặc mình có thể thực hiện thiết lập sự kiện trên EventEmitter, sau đó, đối tượng *DenTinHieu* sẽ kế thừa từ EventEmitter. Lúc này thể hiện *denGiaoThong* cũng đã có sự kiện *canhbao* được kế thừa, và chỉ cần phát sự kiện ra thông qua phương thức *emit*.
```javascript
EventEmitter.on("canhbao", function(loaiDen) {
  switch(loaiDen) {
    case "dendo":
      dungLai();
      break;
    case "denvang":
      tocDo();
      dungLai();
      break;
    case "denxanh":
      duocPhepDi();
      break;
    default:
      khongCoHieuLenh();
  }
});

util.inherits(DenTinHieu, EventEmitter);

DenTinHieu.prototype.hieuLenh = function (loaiDen) {
  console.log(`Tin hieu ${this.type}: ${loaiDen}`);
  this.emit("canhbao", loaiDen);
};
```
# 2. Lời kết:
Bằng cách vận dụng linh hoạt sự kế thừa từ EventEmitter, chúng ta có thể chọn được cách giải quyết bài toán một cách tối ưu nhất, tận dụng được các đoạn code có sẵn.<br/>
Tuy nhiên các phương thức trên EventEmitter không chỉ dừng lại ở *on* và *emit* mà còn các phương thức khác như: *once, prependListener, prependOnceListenr, removeListner,...*<br/>
Các bạn có thể tìm hiểu thêm về EventEmitter trong thư viện *events* (Node.js) tại [mục tài liệu](https://nodejs.org/docs/latest-v11.x/api/events.html) trên trang chủ nodejs.org.<br/>
Cảm ơn các bạn đã theo dõi bài viết.<br/>
*Bài viết không tránh khỏi được những thiếu xót, mong được sự thông cảm và góp ý của các bạn.*