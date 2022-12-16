![](https://images.viblo.asia/2714f079-eeb9-434f-9588-0920f0b5ff7e.png)

#### Bài viết được dịch từ [Best Practices for Spies, Stubs and Mocks in Sinon.js](https://semaphoreci.com/community/tutorials/best-practices-for-spies-stubs-and-mocks-in-sinon-js), có chỉnh sửa bổ sung để cập nhật một số thay đổi trong Sinon.

## 1. Giới thiệu

Kiểm thử mã nguồn với Ajax, timeout, cơ sở dữ liệu hoặc các yếu tố phụ thuộc khác có thể rất khó khăn. Ví dụ: nếu bạn sử dụng Ajax, bạn cần phải chạy server để trả về response cho request . Với cơ sở dữ liệu, bạn cần có một cơ sở dữ liệu thử nghiệm được thiết lập cho các kiểm thử của bạn.

Tất cả điều này có nghĩa là việc viết và chạy các các đoạn test sẽ khó khăn hơn, bởi vì bạn cần phải chạy ứng dụng, thiết lập môi trường, các thứ các thứ.

Ơn giời ! Chúng ta có thể sử dụng Sinon.js để tránh tất cả những rắc rối trên. Chúng ta có thể sử dụng các tính năng của nó để đơn giản hóa các trường hợp cần kiểm thử chỉ với một vài dòng mã.

Tuy nhiên, bắt đầu với Sinon có thể khá khó khăn. Bạn phải làm quen với nhiều khái niệm từ fake, spies đến stub, mock, nhưng có thể khó chọn khi nào nên sử dụng cái gì. Bạn sẽ lúng túng không biết trường hợp này sẽ dùng chức năng gì ? 

Trong bài viết này, chúng tôi sẽ chỉ cho bạn thấy sự khác biệt giữa spies, stub và fake, khi nào và làm thế nào để sử dụng chúng.

## 2. Ví dụ

Chúng ta có hàm sau

```js
function setupNewUser(info, callback) {
  let user = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  try {
    Database.save(user, callback);
  }
  catch(err) {
    callback(err);
  }
}
```

Hàm này có hai tham số - một Object chứa dữ liệu cần lưu và một callback function. Chúng tôi gán các trường dữ liệu từ đối tượng `info` vào biến user và lưu nó vào cơ sở dữ liệu. Với mục đích của ví dụ này, nó có thể gửi yêu cầu Ajax hoặc, nếu đây là mã Node.js, có thể nó sẽ nói chuyện trực tiếp với cơ sở dữ liệu,  vấn đề chi tiết chúng ta sẽ không cần quan tâm đến. Chỉ cần biết nó sẽ thực hiện việc lưu dữ liệu vào cơ sở dữ liệu.

## 3.Spies, Stubs, Mocks và Fake

Cả Spies, Stubs và Mocks thuộc dạng kiểm thử kép (tests doubles). Kiểu như diễn viên đóng thế trong các phim hành động, họ diễn những cảnh nguy hiểm để tránh chấn thương, đảm bảo an toàn cho các diễn viên chính. Kiểm thử kép cũng ná ná như vậy, sẽ không động đến các thành phần trong hệ thống database thật, dữ liệu thật mà sẽ mô phỏng chúng.

## 4. Khi nào thì cần dùng kiểm thử kép

Để hiểu rõ nhất khi sử dụng kiểm thử kép, chúng ta cần hiểu hai loại hàm khác nhau mà chúng ta có thể có. Chúng ta có thể chia các hàm thành hai loại:

- Hàm nội tức (function without side effects)
- Hàm ngoại tức (function with side effects)

Các hàm không có tác dụng phụ rất đơn giản: kết quả của một hàm như vậy chỉ phụ thuộc vào các tham số của nó - hàm luôn trả về cùng một giá trị khi được cung cấp cho cùng các tham số.

Một hàm ngoại tức là một hàm phụ thuộc vào một cái gì đó bên ngoài, chẳng hạn như trạng thái của một đối tượng, thời gian hiện tại, một lời gọi đến cơ sở dữ liệu, v.v trạng thái. Kết quả của một hàm như vậy có thể bị ảnh hưởng bởi nhiều thứ ngoài các tham số của nó.


Nếu chúng ta muốn kiểm tra `setupNewUser`, chúng ta có thể cần phải sử dụng test-double trên `Database.save` vì nó là hàm ngoại tức. Nói cách khác, chúng ta có thể nói rằng chúng ta cần kiểm thử kép với các hàm ngoại tức.

## 5. Khi nào sử dụng Spies

Dúng như tên gọi của nó nghĩa là gián điệp, được sử dụng để lấy thông tin từ các lời gọi hàm. Ví dụ, một spy có thể cho chúng ta biết số lần một hàm được gọi, các đối số mà mỗi lần gọi, giá trị nào được trả về, lỗi nào được đưa ra, v.v.

Như vậy, spy là một lựa chọn tốt khi mục tiêu kiểm thử là để xác minh điều gì đó đã xảy ra. Kết hợp với các assertion của Sinon, chúng ta có thể kiểm tra nhiều kết quả khác nhau bằng cách sử dụng một spy đơn giản.

Các tình huống phổ biến nhất khi sử dụng spy là:
- Kiểm tra xem hàm được gọi bao nhiêu lần
- Kiểm tra tham số nào đã được truyền vào hàm

**Kiểm tra xem hàm được gọi bao nhiêu lần**

```js
it('should call save once', function() {
  var save = sinon.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  save.restore();
  sinon.assert.calledOnce(save);
});
```

**Kiểm tra tham số nào đã được truyền vào hàm**

```js
it('should pass object with correct values to save', function() {
  var save = sinon.spy(Database, 'save');
  var info = { name: 'test' };
  var expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```

## 6. Khi nào sử dụng Stub

Stub giống như spy, ngoại trừ ở chỗ chúng sẽ thay thế luôn hàm cần kiểm thử. Chúng cũng có thể chứa hành vi tùy chỉnh, chẳng hạn như trả về giá trị hoặc throw ra ngoại lệ. Thậm chí  nó còn có thể tự động gọi bất kỳ callback function đã được cung cấp tham số.

Stub có một vài trường hợp sử dụng phổ biến:
- Bạn có thể sử dụng chúng để thay thế các đoạn mã có vấn đề.
- Bạn thiết lập kịch bản trả về của hàm mô phỏng
- Bạn có thể sử dụng chúng để giúp kiểm thử mã nguồn bất đồng bộ dễ dàng hơn.

**Stub có thể được sử dụng để thay thế đoạn mã có vấn đề**, tức là đoạn mã đó làm cho việc viết test khó khăn. Điều này thường liên quan đến các vấn đề bên ngoài như kết nối mạng, cơ sở dữ liệu hoặc các hệ thống không phải JavaScript khác. Vấn đề là chúng thường yêu cầu thiết lập thủ công. Ví dụ: chúng ta sẽ cần điền vào cơ sở dữ liệu với dữ liệu thử nghiệm trước khi chạy thử nghiệm, điều này làm cho việc chạy và viết test cho chúng trở nên phức tạp.

Thay vào đó, nếu chúng ta bỏ tương tác trực tiếp với đoạn mã đấy, chúng ta có thể tránh hoàn toàn vấn đề này. Ví dụ trước đây của chúng ta sử dụng `Database.save` sẽ là một vấn đề nếu chúng ta không thiết lập cơ sở dữ liệu trước khi chạy test. Do đó, nó có thể là một ý tưởng tốt để sử dụng stub , thay vì một spy.

```js
it('should pass object with correct values to save', function() {
  let save = sinon.stub(Database, 'save');
  let info = { name: 'test' };
  let expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };

  setupNewUser(info, function() { });

  save.restore();
  sinon.assert.calledWith(save, expectedUser);
});
```

Bằng cách thay thế chức năng liên quan đến cơ sở dữ liệu bằng một stub, chúng ta không còn cần một cơ sở dữ liệu thực tế cho thử nghiệm của mình. Một cách tiếp cận tương tự có thể được sử dụng trong gần như mọi tình huống liên quan đến mã mà khó kiểm thử.

**Stub thiết lập kịch bản trả về của hàm**. Nếu đoạn test gọi đến một hàm khác, đôi khi chúng ta cần kiểm tra xem nó sẽ hoạt động như thế nào trong các điều kiện bất thường - phổ biến nhất là nếu có lỗi. Chúng ta có thể sử dụng `stub` để cài đặt giá trị trả về của hàm là một lỗi.

```js
it('should pass the error into the callback if save fails', function() {
  let expectedError = new Error('oops');
  let save = sinon.stub(Database, 'save');
  save.throws(expectedError);
  let callback = sinon.spy();

  setupNewUser({ name: 'foo' }, callback);

  save.restore();
  sinon.assert.calledWith(callback, expectedError);
});
```

**Thứ ba, Stub có thể được sử dụng để đơn giản hóa việc test code bất đồng bộ**. 

```js
it('should pass the database result into the callback', function() {
  let expectedResult = { success: true };
  let save = sinon.stub(Database, 'save');
  save.yields(null, expectedResult);
  let callback = sinon.spy();

  setupNewUser({ name: 'foo' }, callback);

  save.restore();
  sinon.assert.calledWith(callback, null, expectedResult);
});
```

## 7. Khi nào sử dụng Mocks

Bạn nên cẩn thận khi sử dụng `mocks` - nó chả cần `spy` và `stub` khi `mocks` có thể làm mọi thứ có thể, nhưng mocks cũng dễ dàng làm cho các bài test của bạn quá cụ thể, chi tiết, dẫn đến việc có thể bị overfit. Một test case có thể bị lỗi khi thay đổi mã nguồn trong code của bạn.

Mocks nên được sử dụng cùng với stubs, nhưng cần xác minh nhiều hành vi cụ thể hơn trên đó.

Ví dụ: ở đây, cách thức chúng ta có thể kiểm thử một kịch bản lưu vào cơ sở dữ liệu cụ thể hơn bằng cách sử dụng mocks.

```js
it('should pass object with correct values to save only once', function() {
  let info = { name: 'test' };
  let expectedUser = {
    name: info.name,
    nameLowercase: info.name.toLowerCase()
  };
  let database = sinon.mock(Database);
  database.expects('save').once().withArgs(expectedUser);

  setupNewUser(info, function() { });

  database.verify();
  database.restore();
});
```


Trong thử nghiệm này, chúng ta sử dụng `once` và `withArss`  định nghĩa một `mocks` kiểm tra cả số lần gọi và đối số được truyền vào. Nếu chúng ta sử dụng stub, việc kiểm tra nhiều điều kiện đòi hỏi cần nhiều assertion.

## 8. Fake trong Sinon

`Fake` là một tính năng được giới thiệu từ bản v5 của Sinon. Nó đơn giản là sự kết hợp giữa 2 khái niệm `stubs` và `spies`.

Không giống như `stubs` và `spies`. API của `fake` chỉ biết cách tạo một instance `fake`, nó không chức năng chọc vào hệ thống để lắng nghe hay thay thế các hàm như `spies` và `stub`. Để cắm `fake` vào hệ thống đang test, bạn có thể sử dụng các phương thức `sinon.replace *`.

### Tạo một Fake

```js
// create a basic fake, with no behavior
let fake = sinon.fake();

fake();

console.log(fake.callCount);
// 1
```
### Thiết lập giá trị trả về cho fake

```js
let fake = sinon.fake.returns('apple pie');

fake();
// apple pie
```

```js
let fake = sinon.fake.throws(new Error('not apple pie'));

fake();
// Error: not apple pie
```

###  sinon.fake.yields

#### `sinon.fake.yields([value1, ..., valueN]);`

`sinon.fake.yields` được dùng để thiếp lập giá trị trả về của callback function cho hàm fake. Ở ví dụ dưới đây chúng ta thiết lập giá trị err và data trong callback của hàm `readFile` lần lượt là null và 'file content'.

```js
let fake = sinon.fake.yields(null, 'file content');
sinon.replace(fs, 'readFile', fake);
fs.readFile('somefile',(err,data)=>{console.log(data);});
console.log('end of this event loop');
// file content
// end of this event loop
```


### Đưa fake vào hệ thống đang cần test

```js
let fake = sinon.fake.returns('42');

sinon.replace(console, 'log', fake);

console.log('apple pie');
// 42
```

### Và khi chạy xong test, đừng nên quên restore

```js
// restores all replaced properties set by sinon methods (replace, spy, stub)
sinon.restore();
```



## 9. Bí kiếp sử dụng

### Sử dụng sinon.test bất cứ khi nào có thể

Khi bạn sử dụng spies, stubs hoặc mocks hãy thay thế callback function của hàm `it`  bằng `sinon-test`. Điều này cho phép bạn sử dụng chức năng dọn dẹp tự động trong Sinon. Không có nó, nếu test của bạn bị fail trước khi kiểm thử kép được dọn sạch, nó có thể gây ra cascading failure  - nhiều test fail do test khởi tạo bị fail. Cascading failure có che dấu nguồn gốc thực sự của vấn đề, vì vậy chúng ta muốn tránh chúng khi có thể.

Sử dụng `sinon.test` giúp loại bỏ cascading failure. Đây là một trong những đoạn mà chúng ta đã xem trước đó:

```js
it('should call save once', function() {
  let save = sinon.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  save.restore();
  sinon.assert.calledOnce(save);
});
```

Nếu `setupNewUser` đã throw một ngoại lệ trong đoạn test này, spy sẽ không được dọn dẹp bằng câu lệnh `save.restore()`, nó có thể đẫn đến lỗi trong các đoạn test phía sau.

Chúng ta có thể tránh điều này bằng cách sử dụng `sinon-test` như sau:

Trước tiên cần cài đặt package `sinon-test`

```bash
npm install sinon-test
```

```js
const sinon = require('sinon');
const test = require('sinon-test')(sinon);


it('should call save once', test(function() {
  let save = this.spy(Database, 'save');

  setupNewUser({ name: 'test' }, function() { });

  sinon.assert.calledOnce(save);
}));
```

### Kiểm thử bất đồng bộ với `sinon-test`

Bạn có thể cần phải vô hiệu hóa timers của `fake` kiểm thử bất đồng bộ khi sử dụng `sinon-test`. Đây là một nguồn gây nhầm lẫn tiềm ẩn khi sử dụng các thử nghiệm không đồng bộ Mocha Hồi cùng với sinon.test.

Để thực hiện kiểm thử bất đồng bộ với Mocha, bạn có thể thêm một tham số phụ vào hàm test:

```js
it('should do something async', function(done) {
```

```js
const sinon = require('sinon');
const test = require('sinon-test')(sinon);

it('should do something async', test(function(done) {
}
```

Sử dụng như trên có thể gặp trường hợp test fail mà không có lý do rõ ràng, nó hiển thị thông báo đã quá timers chạy test case. Điều này được gây ra bởi bộ fake timers của Sinon, được bật theo mặc định cho các test case sử dụng `sinon-test`, do đó, bạn sẽ cần phải vô hiệu hóa chúng.


```js
const test = require('sinon-test')(sinon, {useFakeTimers: false});

it('should do something async', test(function(done) {

}
```

## Tạo Stub trong beforeEach

Nếu bạn cần thay thế một hàm nhất định bằng một stub trong tất cả các test case của mình, hãy xem xét sử dụng `beforeEach`. Ví dụ: tất cả các test case trong ví dụ đều cần gọi đến hàm `Database.save`, vì vậy chúng ta có thể thực hiện như sau:

```js
describe('Something', function() {
  var save;
  beforeEach(function() {
    save = sinon.stub(Database, 'save');
  });

  afterEach(function() {
    save.restore();
  });

  it('should do something', function() {
    //you can use the stub in tests by accessing the variable
    save.yields('something');
  });
});
```

Hãy chắc chắn cũng thêm một `afterEach` và dọn sạch stub sau khi chạy các test case xong. Không có nó, có thể gây ra vấn đề trong các test case  ở các phần khác.

### Kiểm tra thứ tự các lời gọi hàm hoặc giá trị được thiết lập

Nếu bạn cần kiểm thử một hàm nhất định được gọi theo thứ tự, bạn có thể sử dụng `spy` hoặc `stub` cùng với `sinon.assert.callOrder`:

```js
let a = sinon.spy();
let b = sinon.spy();

a();
b();

sinon.assert.callOrder(a, b);
```


Nếu bạn cần kiểm tra xem một giá trị nào đó được gán trước khi hàm được gọi hay chưa ? bạn có thể sử dụng tham số thứ ba của `stub` để thêm một assertion:

```js
let object = { };
let expectedValue = 'something';
let func = sinon.stub(example, 'func', function() {
  assert.equal(object.value, expectedValue);
});

doSomethingWithObject(object);

sinon.assert.calledOnce(func);
```


Assert trong stub đảm bảo giá trị được đặt chính xác trước khi hàm được gọi. Lưu ý cũng nên thêm `sinon.assert.calledOnce` để đảm bảo stub được gọi. Không có nó, test của bạn có thể fail khi stub không được gọi.


## 10.Kết luận

SinonJS là một công cụ mạnh mẽ để kiểm thử Javascript với nhiều tính năng hay ho, có thể sẽ gặp khó khăn ban đầu khi hiểu và phân biệt các khái niệm như `fake`, `stub`, `mock`, `spy` nhưng khi nắm bắt được rồi thì việc viết unit test sẽ đơn giản đi khá nhiều. Nhớ là nên sử dụng package `sinon-test` để đảm bảm không bị cascading failures.