Zones là một cơ chế giúp các lập trình viên xử lý nhiều tác vụ bất đồng bộ (async) có liên kết với nhau về mặt logic. Zones hoạt động bằng cách liên kết mỗi tác vụ bất đồng bộ với một zone. Những lợi ích của việc liên kết này:
- Việc liên kết dữ liệu nào đó với zone, tương tự như thread-local storage ở những ngôn ngữ khác, cho phép truy cập đến bất kể tác vụ bất đồng bộ nào bên trong zone.
- Tự động theo dõi những tác vụ bất đồng bộ chưa hoàn thành bên trong một zone để thực hiện việc cleanup, rendering hoặc các bước test assertion
- Tính tổng thời gian đã trôi qua trong một zone, phục vụ cho việc phân tích hoặc lên hồ sơ theo lĩnh vực (in-the-field profiling).
- Xử lý tất cả những ngoại lệ (exceptions) hoặc promise rejections chưa được xử lý bên trong zone, thay vì để chúng được trả về ở các tầng xử lý đầu.
Zone API liên quan
Chúng ta hay điểm qua những hàm quan trọng nhất khi làm việc với Zones. Class Zone có interface như sau:
```javascript
class Zone {
  constructor(parent: Zone, zoneSpec: ZoneSpec);
  static get current();
  get name();
  get parent();

  fork(zoneSpec: ZoneSpec);
  run(callback, applyThis, applyArgs, source);
  runGuarded(callback, applyThis, applyArgs, source);
  wrap(callback, source);

}
```
Zones có một khái niệm quan trọng là zone hiện tại (current zone). Zone hiện tại là ngữ cảnh bất đồng bộ mà truyền đi tất cả những tác vụ bất đồng bộ. Nó đại diện cho zone mà đã liên kết với stack frame/async task hiện tại đang được thực thi. Zone hiện tại có thể được truy cập thông qua hàm static `Zone.current`

Mỗi zone có thuộc tính `name`, chủ yếu được sử dụng cho mục đích tooling và debug. Zone cũng định nghĩa những hàm để xử lý zones:
 - `z.run(callback, ...)` gọi một hàm trong zone một cách đồng bộ. Nó sẽ đặt current zone về `z` khi thực hiện chạy `callback` và khôi phục về giá trị lúc trước khi `callback` chạy xong. Việc chạy một callback trong zone thường được gọi là truy cập vào zone.
- `z.runGuarded(callback, ...)` cũng giống như `run` nhưng nó sẽ bắt những lỗi runtime và đưa ra cơ chế để can thiệp vào chúng. Nếu một lỗi chưa được xử lý bởi bất kể Zone cha nào thì nó sẽ được trả về một lần nữa.
- `z.wrap(callback)` tạo ra một hàm mới mà bắt giá trị `z` bên trong closure và về bản chất sẽ thực hiện `z.runGuarded(callback, ...)`  khi được thực thi. Nếu một callback được truyền vào hàm `other.run(callback)` thì nó vẫn được chạy bên trong zone `z` , chứ không phải zone `other`. Cơ chế này có ý tưởng tương tự với cách hoạt động của `Function.prototype.bind` trong Javascript.

Hàm `fork` sẽ được đề cập ở phần tiếp theo của bài viết. Ngoài các phương thức kể trên, Zone cũng có một loạt các hàm để chạy, lên lịch và huỷ một task:
```javascript
class Zone {
  runTask(...);
  scheduleTask(...);
  scheduleMicroTask(...);
  scheduleMacroTask(...);
  scheduleEventTask(...);
  cancelTask(...);
```
Đây là những hàm ở tầng thấp mà hiếm khi được sử dụng bởi những lập trình viên thông thường nên chúng sẽ không được đề cập ở bài viết này. 

# Sử dụng zone với call stack
Javascript VM thực thi mỗi hàm trên stack frame.  Xét ví dụ sau:
```javascript
function c() {
    // capturing stack trace
    try {
        new Function('throw new Error()')();
    } catch (e) {
        console.log(e.stack);
    }
}

function b() { c() }
function a() { b() }

a();
```
Bên trong hàm `c` , nó sẽ có call stack như dưới đây:
```
at c (index.js:3)
at b (index.js:10)
at a (index.js:14)
at index.js:17
```
Callstack có thể được mô tả như sau:

![](https://images.viblo.asia/78aacb63-b542-44ef-ba21-455e7e5e81d5.png)

Như vậy sẽ có 3 stack frames cho các lời gọi hàm và một stack cho ngữ cảnh toàn cục (global context).

Trong Javascript, stack frame cho hàm `c` không liên kết với stack frame cho hàm `a` theo bất cứ cách nào. Zone cho phép liên kết mỗi stack frame với một zone cụ thể nào đó. Ví dụ, stack frame của `a` và `c` trong cùng một zone có thể liên kết cùng nhau một cách hiệu quả như mô tả dưới đây:

![](https://images.viblo.asia/cc6112f7-f9f4-4fcf-8b40-8b1c4f91285a.png)
# Tạo một Zone với zone.fork
Một trong những đặc tính được sử dụng nhiều nhất của Zones là tạo một zone mới với phương thức `fork`. Fork một zone có nghĩa là tạo mới một zone con (chid zone) và đặt thuộc tính `parent` đến zone được fork.
```javascript
const c = z.fork({name: 'c'});
console.log(c.parent === z); // true
```
Phương thức `fork` đơn thuần tạo một zone mới sử dụng class như sau:
```javascript
new Zone(targetZone, zoneSpec);
```
Như vậy để thực hiện liên kết các hàm `a` và `c` với nhau trong cùng một zone thì cần phải tạo zone đó trước bằng cách sử dụng phương thức `fork` như sau:
```javascript
const zoneAC = Zone.current.fork({name: 'AC'});
```
Đối tượng truyền vào phương thức `fork` được gọi là đặt tả zone (ZoneSpec) và có những thuộc tính sau:
```javascript
interface ZoneSpec {
    name: string;
    properties?: { [key: string]: any };
    onFork?: ( ... );
    onIntercept?: ( ... );
    onInvoke?: ( ... );
    onHandleError?: ( ... );
    onScheduleTask?: ( ... );
    onInvokeTask?: ( ... );
    onCancelTask?: ( ... );
    onHasTask?: ( ... );
```
`name` định nghĩa tên của zone và `properties` được sử dụng để liên kết dữ liệu với zone. Tất cả những thuộc tính khác là các hooks cho phép parent zone can thiệp vào những tác vụ nhất định của child zones.  Ở phần sau của bài viết, chúng ta sẽ thấy được cách sử dụng `properties` để chia sẻ dữ liệu giữa những tác vụ bất đồng bộ và các hooks, cho phép theo dõi các task.

Tạo một child zone nữa:
```javascript
const zoneB = Zone.current.fork({name: 'B'});
```
Giờ chúng ta có 2 zone mà có thể sử dụng để thực thi các hàm bên trong một zone cụ thể nào đó bằng cách sử dụng phương thức `zone.run()`

# Chuyển zone với zone.run
Để khiến một stack frame cụ thể nào đó liên kết với một zone, chúng ta cần chạy hàm trong zone sử dụng phương thức `run` . Nó sẽ thực thi callback đồng bộ trong một zone cụ thể và khôi phục zone khi đã hoàn thành.

Áp dụng vào ví dụ dưới đây:
```javascript
function c() {
    console.log(Zone.current.name);  // AC
}
function b() {
    console.log(Zone.current.name);  // B
    zoneAC.run(c);
}
function a() {
    console.log(Zone.current.name);  // AC
    zoneB.run(b);
}
zoneAC.run(a);
```
Mỗi call stack được liên kết với một zone:

![](https://images.viblo.asia/87812b83-7930-4291-b58d-d0eb9c469bca.png)

Như ví dụ trên cho thấy mỗi hàm được thực thi sử dụng phương thức `run` mà chỉ định zone nào được sử dụng.  Vậy chuyện gì xảy ra nếu thực thi hàm mà không sử dụng `run`?

**Điều quan trọng cần phải hiểu ở đây là tất cả các lời gọi hàm và những task bất đồng bộ được lên lịch bên trong một hàm sẽ được thực thi ở cùng một zone với hàm đó.**

Môi trường zones luôn có một root zone. Vì vậy, nếu không chuyển zone sử dụng `zone.run`  thì tất cả các hàm sẽ được thực thi ở `root` zone như ví dụ sau:
```javascript
function c() {
    console.log(Zone.current.name);  // <root>
}
function b() {
    console.log(Zone.current.name);  // <root>
    c();
}
function a() {
    console.log(Zone.current.name);  // <root>
    b();
}
a();
```
Đây là biểu đồ tương ứng:

![](https://images.viblo.asia/48bc4a32-882d-4749-befd-8d7bf0c66128.png)

Và nếu chỉ sử dụng `zoneAB.run` một lần ở hàm `a` thì `b` và `c` sẽ được thực thi bên trong zone `AB`:
```javascript
const zoneAB = Zone.current.fork({name: 'AB'});

function c() {
    console.log(Zone.current.name);  // AB
}

function b() {
    console.log(Zone.current.name);  // AB
    c();
}

function a() {
    console.log(Zone.current.name);  // <root>
    zoneAB.run(b);
}

a();
```
![](https://images.viblo.asia/6b276122-cebf-4219-8701-b5529a692799.png)

Hàm `b` được gọi tường minh bên trong zone `AB` . Tuy nhiên, hàm `c` cũng được thực thi bên trong zone này.
# Sử dụng zone trên các task bất đồng bộ
Một trong những đặc tính riêng biệt của việc phát triển Javascript là lập trình bất đồng bộ. Hầu hết những lập trình viên JS mới sẽ trở nên quen thuộc với việc sử dụng hàm `setTimeout` để trì hoãn việc thực thi của một hàm. Zone gọi `setTimeout`  như những task bất đồng bộ. Đặc biệt là macrotask. Một loại task khác là microtask , ví dụ `promise.then`.

Xét ví dụ dưới đây để hiểu cách zone xử lý các hàm bất đồng bộ như `setTimout`. Thay vì gọi trực tiếp hàm `c`, `c` sẽ được truyền như một callback của hàm `setTimeout`. Vì vậy hàm này sẽ được thực thi bên trong một call stack riêng biệt tại một thời điểm nào đó trong tương lai (ở ví dụ này là 2 giây sau):
```javascript
const zoneBC = Zone.current.fork({name: 'BC'});

function c() {
    console.log(Zone.current.name);  // BC
}

function b() {
    console.log(Zone.current.name);  // BC
    setTimeout(c, 2000);
}

function a() {
    console.log(Zone.current.name);  // <root>
    zoneBC.run(b);
}

a();
```
Như chúng ta đã biết thì nếu một hàm được gọi bên trong một zone thì nó sẽ được thi bên chính zone đó. Và điều này cũng áp dụng đối với các hàm bất đồng bộ.
Lịch sử lời gọi hàm có thể được mô tả như hình sau:

![](https://images.viblo.asia/19a05f6d-7596-42c2-84a3-2a48962b0ba1.png)

Sơ đồ trên có vẻ ổn nhưng lại đang giấu đi phần triển khai chi tiết. Ngầm định bên dưới, Zone sẽ phải khôi phục chính xác zone mà mỗi task sẽ thực thi trên đó. Để làm được vậy, nó phải ghi nhớ task này được thực thi trên zone nào và tiếp tục như vậy bằng cách giữ tham chiếu của zone đã liên kết với task. Zone này sau đó sẽ được sử dụng để gọi task từ handler của root zone.

Điều này có nghĩa là mỗi task bất đồng bộ sẽ luôn bắt đầu từ root zone, sử dụng thông tin được liên kết với task để khôi phục lại zone đúng rồi mới thực thi task. Mô hình chính xác hơn cho ví dụ trên như sau:

![](https://images.viblo.asia/42660440-67a4-45c6-918c-c5f000f4fd12.png)
# Lan truyền ngữ cảnh trên những task bất đồng bộ
Một trong những lợi ích khác của Zone là lan truyền ngữ cảnh (context propagation). Hiểu đơn giản là chúng ta có thể gắn dữ liệu ở một zone và truy cập dữ liệu này bên trong bất kỳ task nào được thi thi bên trong zone đó.

Xét ví dụ về việc truyền dữ liệu trên task bất đồng bộ `setTimeout`. Khởi tạo một zone mới với đối tượng zone spect chứa thuộc tính `properties` có liên kết với dữ liệu như sau:
```javascript
const zoneBC = Zone.current.fork({
    name: 'BC',
    properties: {
        data: 'initial'
    }
});
```
Và sau đó dữ liệu này có thể được truy cập bằng việc sử dụng phương thức `zone.get`
```javascript
function a() {
    console.log(Zone.current.get('data')); // 'initial'
}

function b() {
    console.log(Zone.current.get('data')); // 'initial'
    setTimeout(a, 2000);
}

zoneBC.run(b);
```
Đối tượng mà thuộc tính `properties ` trỏ tới là bất biến nông (shallow-immutable), nghĩa là không thể thêm hoặc loại bỏ những thuộc tính đối tượng này. Đây là điều khá phổ biến bởi Zone không cung cấp bất cứ hàm nào để thực hiện điều trên. Vì vậy ở ví dụ trên chúng ta không thể đặt giá trị khác cho `properties.data`.

Tuy nhiên, chúng ta có thể truyền một đối tượng vào `properties.data`  thay vì một giá trị nguyên thuỷ và sau đó có thể chỉnh sửa dữ liệu này.
```javascript
const zoneBC = Zone.current.fork({
    name: 'BC',
    properties: {
        data: {
            value: 'initial'
        }
    }
});

function a() {
    console.log(Zone.current.get('data').value); // 'updated'
}

function b() {
    console.log(Zone.current.get('data').value); // 'initial'
    Zone.current.get('data').value = 'updated';
    setTimeout(a, 2000);
}

zoneBC.run(b);
```
Một điểm thú vị là child zones mà được khởi tạo sử dụng phương thức `fork` sẽ kế thừa những thuộc tính của parent zones.
# Theo dõi những task chưa hoàn hành
Một khả năng hữu ích khác của Zone là theo dõi những task macro và micro chưa hoàn thành. Zone giữ tất cả những task chưa hoàn thành vào trong hàng đợi. Để nhận thông báo bất kể khi nào trạng thái của hàng đợi thay đổi, chúng ta có thể sử dụng hook `onHasTask` của zone spec:
```javascript
onHasTask(delegate, currentZone, targetZone, hasTaskState);
```
Vì parent zones có thể can thiệp vào những sự kiện của child zones nên Zone cung cấp 2 tham số `currentZone` và `targetZone` để phân biệt giữa một zone được thay đổi trong hàng đợi và zone can thiệp vào sự kiện. Ví dụ để nhận biết xem có đang can thiệp vào sự kiện đối với zone hiện tại, chỉ cần so sánh như sau:
```javascript
// Chỉ quan tâm tới những sự kiện được sinh ra bởi zone hiện tại 
if (currentZone === targetZone) { ... }
```
Tham số cuối cùng của hook `hasTaskState` mô tả trạng thái của hàng đợi task:
```javascript
type HasTaskState = {
    microTask: boolean; 
    macroTask: boolean; 
    eventTask: boolean; 
    change: 'microTask'|'macroTask'|'eventTask';
};
```
Vì vậy nếu gọi `setTimeout` bên trong một zone, đối tượng `hasTaskState` sẽ có các giá trị dưới đây:
```javascript
{
    microTask: false; 
    macroTask: true; 
    eventTask: false; 
    change: 'macroTask';
}
```
Thể hiện rằng có một macrotask đang được chờ bên trong hàng đợi và sự thay đổi của hàng đợi đến từ `macrotask`.

Xem xét ví dụ cụ thể sau đây:
```javascript
const z = Zone.current.fork({
    name: 'z',
    onHasTask(delegate, current, target, hasTaskState) {
        console.log(hasTaskState.change);          // "macroTask"
        console.log(hasTaskState.macroTask);       // true
        console.log(JSON.stringify(hasTaskState));
    }
});

function a() {}

function b() {
    // synchronously triggers `onHasTask` event with
    // change === "macroTask" since `setTimeout` is a macrotask
    setTimeout(a, 2000);
}

z.run(b);
```
Output nhận được như sau:
```
macroTask
true
{
    "microTask": false,
    "macroTask": true,
    "eventTask": false,
    "change": "macroTask"
}
```
Trong vòng 2 giây sau khi hoàn thành, `onHasTask` được gọi một lần nữa:
```
macroTask
false
{
    "microTask": false,
    "macroTask": false,
    "eventTask": false,
    "change": "macroTask"
}
```
Tuy nhiên có một điểm cần lưu ý. Hook `onHasTask` chỉ được sử dụng để theo dõi trạng thái `empty/non-empty` của toàn bộ hàng đợi task. Nó không thể theo dõi những task riêng biệt.
Xét ví dụ sau:
```javascript
let timer;

const z = Zone.current.fork({
    name: 'z',
    onHasTask(delegate, current, target, hasTaskState) {
        console.log(Date.now() - timer);
        console.log(hasTaskState.change);
        console.log(hasTaskState.macroTask);
    }
});

function a1() {}
function a2() {}

function b() {
    timer = Date.now();
    setTimeout(a1, 2000);
    setTimeout(a2, 4000);
}

z.run(b);
```
Output tương ứng:
```
1
macroTask
true

4006
macroTask
false
```
Như output ở trên cho thấy, không có sự kiện nào được hoàn thành trong 2 giây đối với task `setTimeout`. Hook `onHasTask` chỉ được chạy một lần khi `setTimeout` lần đầu được lên lịch và trạng thái của hàng đợi task được thay đổi từ `non-empty` sang `empty`  và nó được gọi lần thứ 2 ở giây thứ `4` khi callback của của `setTimout` cuối cùng được hoàn thành.

Nếu muốn theo dõi những task riêng biệt thì cần sử dụng các hook `onSheduleTask ` và `onInvoke`.
# onSheduleTask và onInvokeTask
Zone spec định nghĩa hai hooks mà có thể sử dụng để theo dõi những task riêng biệt:
- onScheduleTask: được thực thi bất kể khi nào tác vụ bất đồng bộ như `setTimeout` được phát hiện.
- onInvokeTask: được thực thi khi một callback được truyền vào một tác vụ bất đồng bộ như `setTimeout(callback)` được chạy.
Xét ví dụ sau:
```javascript
let timer;

const z = Zone.current.fork({
    name: 'z',
    onScheduleTask(delegate, currentZone, targetZone, task) {
      const result = delegate.scheduleTask(targetZone, task);
      const name = task.callback.name;
      console.log(
          Date.now() - timer, 
         `task with callback '${name}' is added to the task queue`
      );
      return result;
    },
    onInvokeTask(delegate, currentZone, targetZone, task, ...args) {
      const result = delegate.invokeTask(targetZone, task, ...args);
      const name = task.callback.name;
      console.log(
        Date.now() - timer, 
       `task with callback '${name}' is removed from the task queue`
     );
     return result;
    }
});

function a1() {}
function a2() {}

function b() {
    timer = Date.now();
    setTimeout(a1, 2000);
    setTimeout(a2, 4000);
}

z.run(b);
```
Output tương ứng:
```
1 “task with callback ‘a1’ is added to the task queue”
2 “task with callback ‘a2’ is added to the task queue”
2001 “task with callback ‘a1’ is removed from the task queue”
4003 “task with callback ‘a2’ is removed from the task queue”
```
# Can thiệp khi thâm nhập vào zone với onInvoke
Một zone có thể được thâm nhập (chuyển zone) tường minh sử dụng `z.run()` hoặc ngầm định bằng cách gọi một task. Ngoài hook `onInvokeTask`, `onInvoke` cũng có thể được sử dụng để nhận thông tháo khi zone được thâm nhập bằng cách sử dụng `z.run()`.

Xét ví dụ sau:
```javascript
const z = Zone.current.fork({
    name: 'z',
    onInvoke(delegate, current, target, callback, ...args) {
        console.log(`entering zone '${target.name}'`);
        return delegate.invoke(target, callback, ...args);
    }
});

function b() {}

z.run(b);
```
Và output tương ứng là:
```
entering zone ‘z’
```
# Cơ chế hoạt động của `Zone.current`
Zone hiện tại được theo dõi bằng việc sử dụng biến `_currentZoneFrame ` và trả về bởi phương thức getter `Zone.current`. Để chuyển zone, đơn giản chỉ cần cập nhật biến `_currentZoneFrame `. Vậy có thể thấy khi chạy `z.run()` hay gọi một task, biến `_currentZoneFrame ` sẽ được thay đổi.

Đây là đoạn code khi phương thức `run` cập nhật biến:
```javascript
class Zone {
   ...
   run(callback, applyThis, applyArgs,source) {
      ...
      _currentZoneFrame = {parent: _currentZoneFrame, zone: this};
```
Khi `runTask` cập nhật biến:
```javascript
class Zone {
   ...
   runTask(task, applyThis, applyArgs) {
      ...
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
```
Phương thức `runTask` được gọi bởi phương thức `invokeTask` mà mỗi task có:
```javascript
class ZoneTask {
    invokeTask() {
         _numberOfNestedTaskFrames++;
      try {
          self.runCount++;
          return self.zone.runTask(self, this, arguments);
```
Mỗi task khi được khởi tạo sẽ lưu zone của nó vào thuộc tính `zone`. Và đây chính là zone được sử dụng để `runTask` bên trong `invokeTask` (ở đây `self` chỉ định thực thể task hiện tại):
```javascript
self.zone.runTask(self, this, arguments);
```

### *Lược dịch:*

**Max NgWizard K**, *I reverse-engineered Zones (zone.js) and here is what I’ve found*, (https://blog.angularindepth.com/i-reverse-engineered-zones-zone-js-and-here-is-what-ive-found-1f48dc87659b)