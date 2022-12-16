Trong [**bài viết JavaScript số 11**](https://viblo.asia/p/63vKjAaR52R), chúng ta đã có một phần thảo luận ngắn về các hàm có chứa các thao tác xử lý được thực thi không đồng bộ `asynchronous`, và giải pháp sử dụng hàm gọi lại `callback` để tiếp nhận kết quả và xử lý công việc liên quan sau khi một hàm `asynchronous` được thực thi xong. Trong bài viết này, chúng ta sẽ cùng thảo luận chi tiết hơn về những cách thức làm việc với các thao tác xử lý được thực thi không đồng bộ.

## Làm lại ví dụ về hàm `asynchronous`

Ở đây chúng ta sẽ giả lập một hàm `requestData` gửi yêu cầu truy vấn thêm dữ liệu tới máy chủ web được thực thi không đồng bộ và có độ trễ để nhận được kết quả phản hồi từ máy chủ web là khoảng một vài giây sau khi hàm được gọi.

Kết quả trả về từ máy chủ có thể là dữ liệu `data` ở dạng chuỗi nếu máy chủ web xử lý thành công yêu cầu truy vấn thêm dữ liệu. Hoặc, một tín hiệu thông báo lỗi từ máy chủ web được phiên dịch thành một object `Error`.

Lúc này chúng ta cần thực hiện một công việc tiếp theo là cập nhật giao diện người dùng và được thực hiện bởi một hàm `updateView`. Do hàm `requestData` được thực hiện trên một tiến trình riêng, chúng ta sẽ không thể gán giá trị trả về của `requestData` vào một biến. Rồi sau đó truyền vào một lời gọi hàm `updateView` được viết song song như trong code ví dụ dưới đây.

```request.js
const requestData = function() {
   var error, data;

   const mockRequest = function() {
      // --- nhận được dữ liệu
      data = 'Dữ liệu trả về từ máy chủ.'
   };
   setTimeout(mockRequest, 2.7 * 1000);
   
   // --- trả về kết quả ở vị trí hàm được gọi
   return [ error, data ];
}; // requestData

const updateView = function(error, data) {
   if (error instanceof Error)
      console.error(error);
   else
      console.log(data);
}; // updateView

var [ error, data ] = requestData();
updateView(error, data);   // 'undefined'
```

Lý do để dẫn tới kết quả hoạt động như trên thì chúng ta đã biết rồi. Ngay sau khi phát động lời gọi hàm `requestData()`, trình thực thi code không chờ đợi thao tác gửi yêu cầu đến máy chủ được thực hiện xong, mà sẽ chuyển ngay tới lời gọi hàm tiếp theo `updateView()`. Và bởi vì lúc này máy chủ web vẫn chưa gửi phản hồi lại nên biến `data` không có chứa dữ liệu `undefined`.

## Sử dụng hàm gọi lại `callback`

Để hàm `updateView` có thể hoạt động nối tiếp với hàm `requestData` thì chúng ta có thể viết lại hàm `requestData` nhận vào một hàm gọi lại `callback` để tiếp nhận dữ liệu trả về từ máy chủ và thực hiện công việc tiếp theo. Sau đó truyền hàm `updateView` vào vị trí `callback` để được thực thi trên cùng tiến trình riêng của hàm `requestData`.

```request.js
const requestData = function(callback) {
   const mockRequest = function() {
      // --- nhận được dữ liệu
      var data = 'Dữ liệu trả về từ máy chủ.';
      // --- gọi hàm xử lý tiếp theo
      callback(null, data);
   };
   setTimeout(mockRequest, 2.7 * 1000);
}; // requestData

const updateView = function(error, data) {
   if (error instanceof Error)
      console.error(error);
   else
      console.log(data);
}; // updateView

requestData(updateView);
// ...trễ 2.7s
// 'Dữ liệu trả về từ máy chủ.'
```

Bây giờ thì mọi thứ đã hoạt động như chúng ta dự kiến. Tuy nhiên chúng ta lại có một câu hỏi khác xuất hiện lúc này - Sẽ thế nào nếu như bên trong hàm `updateView` cũng có một thao tác xử lý khác được thực thi bất đồng bộ và chúng ta cũng cần nối tiếp thêm một hành động khác sau kết quả hoạt động của `updateView`?

Bởi vì lúc này hàm `updateView` cũng sẽ tạo ra một tiến trình thực thi riêng khác nữa; Nếu như chúng ta muốn thực hiện thêm một hành động khác nối tiếp kết quả hoạt động của `updateView` thì chúng ta sẽ lại phải định nghĩa lại hàm `updateView` ở dạng thức tiếp nhận một hàm `callback` khác. 

Và cứ như thế đối với trường hợp chúng ta có khoảng dăm cái thao tác xử lý bất đồng bộ cần chuyển tiếp kết quả hoạt động thì chúng ta sẽ có một mô hình các hàm `callback` xếp chồng trông giống như một tác phẩm nghệ thuật. Và việc theo dõi logic hoạt động của code cũng không khác lắm với chương trình đuổi hình bắt chữ. :D

## Sử dụng `Promise`

Để logic vận hành của trường hợp có nhiều thao tác bất đồng bộ nối tiếp được thể hiện trên bề mặt code gọn gàng, ngay ngắn, và dễ theo dõi hơn. JavaScript có cung cấp một công cụ mới để chúng ta sử dụng trong tình huống này, đó là các object `Promise` - [**Tài liệu về `class Promise` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description)

```promise.js
new Promise(requestData)
   .then(updateView)
   .then(doNextTask)
   .then(doAnotherTask)
   .catch(handleError)
   .finally(cleanUpResource);
```

Sau khi thực hiện lời gọi hàm `requestData` và nhận được dữ liệu phản hồi, phương thức `.then` của `Promise` sẽ truyền dữ liệu cho hàm thực hiện thao tác xử lý tiếp theo là `updateView`; Kết quả hoạt động của `updateView` lại tiếp tục được truyền cho hàm thực hiện công việc kế tiếp `doNextTask`; Rồi sau đó kết quả hoạt động của `doNextTask` lại được chuyển tiếp cho hàm thực hiện công việc nối tiếp sau đó `doAnotherTask`.

Ở bất kỳ giai đoạn nào của chuỗi thao tác bất đồng bộ liên tiếp, nếu có ngoại lệ phát sinh thì tiến trình xử lý sẽ chuyển tới hàm xử lý `handleError` ở phương thức `.catch`. Sau cùng thì dù có ngoại lệ phát sinh hay không thì hàm dọn dẹp tài nguyên `cleanUpResources` ở phương thức `.finally` cũng sẽ được thực hiện.

Trong phương cách xử lý này, JavaScript đã định nghĩa một dạng thức chung cho các hàm truyền vào để khởi tạo `Promise` và có thể được nối tiếp bởi `.then` như sau:

```promise.js
const requestData = function(resolve, reject) {
   // ---
   resolve('Dữ liệu trả về từ máy chủ.');
}; // requestData
```

Trong đó `resolve` là một hàm thực hiện chuyển tiếp dữ liệu `data` tới các khối `.then` tiếp theo khi `requestData` hoàn thành công việc; Và `reject` là một hàm chuyển tiếp ngoại lệ `error` tới khối `.catch` khi `requestData` không hoàn thành được công việc và thông báo ngoại lệ. 

Các hàm thực hiện thao tác xử lý nối tiếp trong `.then` sau đó sẽ có dạng thức chung là tiếp nhận dữ liệu từ  `resolve()` của `Promise` đứng liền kề phía trên để xử lý công việc. Và tiếp tục tạo ra `Promise` mới để `resolve()` chuyển cho tác vụ `.then` kế tiếp.

```promise.js
const requestData = function(resolve, reject) {
   const mockRequest = function() {
      var data = 'Dữ liệu trả về từ máy chủ.';
      resolve(data);
   };
   setTimeout(mockRequest, 2.7 * 1000);
}; // requestData

const updateView = function(data) {
   return new Promise(function(resolve, reject) {
      const mockUpdate = function() {
         console.log(data);
         var viewData = 'Dữ liệu kết quả hoạt động của View.';
         resolve(viewData);
      };
      setTimeout(mockUpdate, 1.8 * 1000);
   }); // Promise
}; // updateView

const doNextTask = function(viewData) {
   return new Promise(function(resolve, reject) {
      const mockDo = function() {
         console.log(viewData);
         var nextData = 'Dữ liệu kết quả hoạt động của Next.';
         resolve(nextData);
      };
      setTimeout(mockDo, 1.8 * 1000);
   }); // Promise
}; // doNextTask

const doAnotherTask = function(nextData) {
   return new Promise(function(resolve, reject) {
      const mockDo = function() {
         console.log(nextData);
         resolve();
      };
      setTimeout(mockDo, 1.8 * 1000);
   }); // Promise
}; // doAnotherTask

const handleError = function(error) {
   console.error(error);
}; // handleError

const cleaarnUpResources = function(_) {
   console.log('Dọn dẹp tài nguyên.');
}; // cleaarnUpResources

new Promise(requestData)
   .then(updateView)
   .then(doNextTask)
   .then(doAnotherTask)
   .catch(handleError)
   .finally(cleaarnUpResources);

// kết quả:
// ...trễ 2.7s
// 'Dữ liệu trả về từ máy chủ.'
// ...trễ 1.8s
// 'Dữ liệu kết quả hoạt động của View.'
// ...trễ 1.8s
// 'Dữ liệu kết quả hoạt động của Next.'
// 'Dọn dẹp tài nguyên.'
```

Ở đây chúng ta cần lưu ý là tất cả những thao tác này đều đang được thực hiện trên tiến trình riêng tạo ra cho `requestData` và không làm trì trệ các đoạn code phía sau trong chương trình chính. 

Và bởi vì các thao tác nối tiếp `updateView`, `doNextTask`, và `doAnotherTask`, đều là các `Promise` và chờ đợi thao tác liền kề phía trước `resolve` xong rồi mới bắt đầu được thực thi; Chúng ta vẫn còn một lựa chọn cú pháp khác giúp thể hiển sự nối tiếp của các thao tác này trong code một cách tự nhiên hơn, trông gần giống với các thao tác xử lý đồng bộ thông thường.

## Các từ khóa `async` và `await`

Từ khóa `await` sẽ giúp chúng ta tạm dừng một tiến trình thực thi code ở vị trí một `Promise` cho đến khi nó được `resolve` và đồng thời trả về giá trị được `resolve` cho tiến trình code hiện tại.

Tuy nhiên chúng ta cần lưu ý, tiến trình thực thi mà `await` được phép tạm dừng chỉ có 2 trường hợp - hoặc là sử dụng bên trong một hàm được đánh dấu là `async` - hoặc là có thể được sử dụng ở scope lớn nhất bên trong các `module`.

- [**Tài liệu về `async` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [**Tài liệu về `await` của MDN**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

```promise.js
const requestData = function() {
   const mockRequest = async function() {
      try {
         var data = 'Dữ liệu trả về từ máy chủ.';
         var viewData = await updateView(data);
         var nextData = await doNextTask(viewData);
         await doAnotherTask(nextData);
      }
      catch (error) {
         handleError(error);
      }
      finally {
         cleaarnUpResources();
      }
   }; // mockRequest
   setTimeout(mockRequest, 2.7 * 1000);
}; // requestData

/* 
 * const updateView = ...
 * const doNextTask = ...
 * const doAnotherTask = ...
 * const cleanUpResources = ...
 */
 
 requestData();
 
// kết quả:
// ...trễ 2.7s
// 'Dữ liệu trả về từ máy chủ.'
// ...trễ 1.8s
// 'Dữ liệu kết quả hoạt động của View.'
// ...trễ 1.8s
// 'Dữ liệu kết quả hoạt động của Next.'
// 'Dọn dẹp tài nguyên.'
```

Bây giờ chúng ta thấy rằng các câu lệnh gọi các hàm xử lý tiếp theo đã có thể được viết giống như các câu lệnh thông thường. Và từ khóa `await` cũng có tính mô tả rất tốt - đó là tiến trình chạy code cần phải chờ lời gọi hàm này thực thi xong đã, rồi mới được thực hiện phép gán giá trị sang biến ở bên trái và đi tới câu lệnh tiếp theo bên dưới. :D

Trên thực tế thì `await` không chỉ có hiệu lực với các `object Promise` mà còn có thể được sử dụng với bất kỳ `object` nào `có thể .then`. Trong trường hợp này, chúng ta sẽ thấy `await` giống với một phép thực thi `operator` hơn là một từ khóa chỉ thị `directive`. Phương thức `.then` của object chứa nó sẽ được tự động kích hoạt khi chúng ta đặt từ khóa `await` đứng trước `object`.

```thenable.js
void async function() {
   var thenable = {
      then: function(resolve, _reject) {
         resolve('resolved')
      }
   }; // thenable
   
   console.log(await thenable);   // 'resolved'
} ();
```

Trong trường hợp muốn xử lý ngoại lệ của các `Promise` mà không sử dụng cú pháp `try .. catch` thì chúng ta vẫn có thể `.catch` ngay tại vị trí của `Promise`.

```catch.js
// `response` sẽ nhận giá trị `null` nếu có `error`
var response = await promisedFunction()
   .catch((error) => console.error(err));
```

Và cuối cùng là trường hợp sử dụng `await` ở `scope` lớn nhất của `module`.

```module.js
const weatherData = fetch('data-from-server.json')
   .then((response) => response.json());

export default await weatherData;
```

Trong trường hợp này, bất kỳ `module` nào sử dụng `weatherData` sẽ phải chờ hàm `fetch` được `resolve` xong rồi mới có thể tiếp tục tiến trình thực thi code.

## Kết thúc bài viết

Như vậy là chúng ta đã hoàn thành xong bài viết về bộ công cụ mới, hỗ trợ chúng ta làm việc thuận tiện hơn với các tác vụ được xử lý không đồng bộ `asynchronous`. Tính tới thời điểm hiện tại, chúng ta đã biết tất cả các kiểu dữ liệu và các cú pháp lệnh phổ biến của JavaScript; Và mình đã dự định sẽ kết thúc `Sub-Series JavaScript` của [**Tự Học Lập Trình Web Một Cách Thật Tự Nhiên**](https://viblo.asia/s/Wj53OQQP56m) tại đây.

Tuy nhiên, sau khi quan sát tổng quan lại danh sách các bài viết thì mình phát hiện ra rằng chúng ta còn thiếu 2 thứ rất quan trọng. Đó là các bài viết tập trung nội dung cho các kiểu dữ liệu cơ bản có tần suất sử dụng nhiều như `Number`, `String`, `Date`, ... và  các bài viết giới thiệu về các mô hình lập trình phổ biến.

Do đó nên chúng ta sẽ thực hiện thêm một vài bài viết nữa về 2 nhóm nội dung này. Mình rất hy vọng rằng bạn sẽ tiếp tục đồng hành cùng với mình trong những bài viết bổ sung của `Sub-Series` này. Hẹn gặp lại bạn trong bài viết tiếp theo. :D

[**[JavaScript] Bài 19 - Number & Math**](https://viblo.asia/p/GrLZDrve5k0)