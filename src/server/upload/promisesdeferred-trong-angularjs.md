Promises là một tính năng chính (a core feature) của AngularJS. Có thể bạn chưa biết hoặc chưa hiểu về promise, nhưng nếu bạn làm việc với AngularJS thì gần như chắc chắn rằng bạn sẽ làm việc với promise. Trong bài viết này, chúng ta sẽ tìm hiểu vậy Promise là gì, chúng được sử dụng ở đâu? Cách thức nó làm việc như thế nào?

# Promise là gì?
Promise là một cơ chế cho phép bạn trì hoãn một hành động hoặc một chuỗi các hành động đã được nêu ra. Một promise đại diện cho kết quả sau cùng của một hành động. Chúng ta có thể sử dụng một promise để xác định phải làm gì khi hành động cho dù kết quả cuối cùng của promise là thành công hay thất bại. Và promise sử dụng để xử lý các sự kiện không đồng bộ.
## Promise làm việc như thế nào?
Khái niệm dưới đây về Promise khá đơn giản, nó có 2 thành phần:
* Deferred: đại diện cho một công việc chưa được thực hiện, và
* Promise: thể hiện cho kết quả từ công việc đó (Deferred).
![](https://images.viblo.asia/851a5f47-4f2d-47ad-bb0a-e05b31a63fe8.png)

Về cơ bản, chúng ta sử dụng Deferred như là một đối tượng thông tin liên lạc để báo hiệu sự bắt đầu, tiến trình xử lý và hoàn thành công việc.

Một Promise lần lượt là một đối tượng đầu ra chứa kết quả từ Deferred. Nó có một trạng thái (State) nhất định (đang chờ xử lý - pending, hoàn thành - fulfilled, bị từ chối - rejected) và bộ xử lý (Handlers) hoặc các hàm gọi lại (callback functions) sẽ được gọi một lần khi một promise được giải quyết, bị từ chối hoặc cập nhật tiến trình xử lý.

Trong Angular, các promises được tạo ra bằng $q service. Lý do dịch vụ được đặt tên là $q là do việc thực hiện promises trong AngularJS dựa trên cơ chế promise của Kris Kowal có tên là thư viện Q. Bạn có thể xem thêm thông tin về thư viện Q tại https://github.com/kriskowal/q. Promises cũng được trả lại từ vài dịch vụ khác nữa của AngularJS như $http, $timeout, $route, $resoure.

$q thực thi tất cả các phương thức Deferred/Promise được mô tả ở trên, cộng thêm một số phương thức của của riêng nó: $q.defer() - tạo mới một đối tượng Deferred , $q.all() - cho phép bạn chờ nhiều promises để giải quyết, và phương thức $q.when(), $q.reject().

$q.defer() trả lại một đối tượng Deferred, bao gồm các phương thức resolve(), reject(), notify(). Deferred có một thuộc tính promise, thuộc tính này là một đối tượng promise có thể được truyền khắp ứng dụng.

Đối tượng promise có 3 phương thức khác: then(), catch(), finally()

* then(successCallback, errorCallback, notifyCallback): lấy 3 callbacks làm tham số, một cho khi promise thành công, một cho khi promise thất bại, một cho thông báo của promise.
* catch(errorCallback): đây là cách viết tắt của phương thức promise.then(null, errorCallback), có thể được sử dụng để có một chức năng tập trung, được gọi khi bất kì promise trong chuỗi promise thất bại.
* finally(callback): phương thức này luôn luôn được gọi, bất kể promise thành công hay thất bại. Nó rất hữu ích để giải phóng tài nguyên hoặc dọn dẹp một số thứ không cần thiết (giống như đóng kết nối tới database, shutting server down). Xem bản [mô tả chi tiết kỹ thuật](https://github.com/kriskowal/q/wiki/API-Reference#promisefinallycallback) đầy đủ để có thêm thông tin.

Ví dụ:

Trong ví dụ này, chúng ta sẽ tạo ra một dịch vụ để lấy tên người dùng. Trong service, chúng ta thiết lập rằng lần đầu tiên chúng ta lấy tên từ server, các lần sau chúng ta sẽ trả lại từ bộ nhớ cache. Điều này có nghĩa là chúng ta phải xử lý với trường hợp không đồng bộ (lấy dữ liệu từ server) và trường hợp đồng bộ thông thường (lấy dữ liệu từ cache).

Đầu tiên, chúng ta tạo ra một service, nó có một trường name, giá trị ban đầu là null.

```javascript
app.factory('NameService', function($http, $q) {
  //  Create a class that represents our name service.

  function NameService() {

    var self = this;

    //  Initially the name is unknown....

    self.name = null;
```
Bây giờ, trong hàm getName(), chúng ta tạo một đối tượng deferred sử dụng $q service. Đối tượng này chứa promise mà chúng ta sẽ trả về.

```javascript
self.getName = function () {
  // Create a deferred operation.

  var deferred = $q.defer();
```

Nếu chúng ta đã có name, chúng ta có thể resolve đối tượng deferred ngay lập tức:
```javascript
if(self.name !== null) {
  deferred.resolve(self.name + " (from Cache!)");

}
```

Tiếp đó, chúng ta sẽ xử lý trường hợp khi chưa có name:

```javascript
else {
  //  Get the name from the server.

  $http.get('/api/my/name/')

     .success(function(name) {

       self.name = name;

       deferred.resolve(name + " (from Server!)");

     })

     .error(function(response) {

       deferred.reject(response);

     });

 }
```
Ở đây, chúng ta sử dụng $http service, và success, error là 2 function đặc biệt được thêm vào promise do $http cung cấp - thông thường chúng ta sử dụng hàm then với promise.

Do đó, nếu chúng ta nhận được dữ liệu từ server, chúng ta có thể resolve promise với giá trị trả về. Ngược lại, nếu request bị lỗi, chúng ta sẽ reject promise.

Cuối cùng, chúng ta trả lại promise mà chúng ta đã khởi tạo với deferred:
```javascript
return deferred.promise;
}
```
# Chaining Promise
Phương thức then trả lại một promise. Điều tuyệt vời của Promise API đó là chúng ta có thể đính kèm nhiều bộ xử lý (then()) cho một promise. Nói cách khác, chúng ta có thể xâu chuỗi các promise thành một khối logic ngắn gọn được thực thi tại các thời điểm thích hợp mà không cần sử dụng lồng nhau.
```javascript
promise
  .then(doSomething)

  .then(doSomethingElse)

  .then(doSomethingMore)

  .catch(logError);
```
Ví dụ, chúng ta cần lấy ra tên của user từ phía backend, nhưng chúng ta phải sử dụng các request độc lập để lấy ra thông tin của user và sau đó lấy ra quyền hạn truy cập trên ứng dụng của user:
```javascript
var details {  
   username: null,

   profile: null,

   permissions: null

};

$http.get('/api/user/name')

  .then(function(response) {

     // Store the username, get the profile.

     details.username = response.data;

     return $http.get('/api/profile/' + details.username);

  })

  .then(function(response) {

      //  Store the profile, now get the permissions.

    details.profile = response.data;

    return $http.get('/api/security/' + details.username);

  })

  .then(function(response) {

      //  Store the permissions

    details.permissions = response.data;

    console.log("The full user details are: " + JSON.stringify(details);

  })

  .catch(function(error) {

    console.log("An error occured: " + error);

  });
```
Như vậy, chúng ta có một chuỗi các lời gọi không đồng bộ được phối hợp với nhau mà không cần sử dụng các callbacks lồng nhau.
* Chuỗi các promises (promise chains) sẽ gọi hàm then tiếp theo trong chuỗi với giá trị được trả lại của hàmthen trước đó (hoặc undefined nếu không có giá trị trả về).
* Nếu một hàm then trả lại một promise thì hàm then tiếp theo sẽ chỉ thực thi khi promise đó được giải quyết (resolve).
* Hàm catch được đặt ở cuối chuỗi sẽ cung cấp một điểm xử lý lỗi duy nhất cho toàn bộ chuỗi.
* Hàm finally ở cuối chuỗi sẽ luôn được thực hiện cho dù promise được giải quyết (resolve) hoặc bị từ chối (reject), để phục vụ mục đích dọn dẹp các promises.

# Parallel Promises
Một phương thức chúng ta đề cập tiếp theo đây đó là $q.all(), nó được sử dụng để tạo ra một promise từ một tập các promises. Và promise duy nhất này được giải quyết (resolve) khi tất cả các promises bên trong nó được giải quyết. Trong Angular, phương thức này có thể được gọi bằng 2 cách: với một mảng (Array) hoặc một đối tượng (Object).

* Array:
```javascript
$q.all([promiseOne, promiseTwo, promiseThree])
  .then(function(results) {

    console.log(results[0], results[1], results[2]);

  });
```
* Object:

```javascript
$q.all({ first: promiseOne, second: promiseTwo, third: promiseThree })
  .then(function(results) {

    console.log(results.first, results.second, results.third);

  });
```

Thêm một phương thức nữa đó là $q.when() - hàm này hữu ích khi chúng ta đang sử dụng một function mà kết quả trả về có thể là một promise nhưng cũng có thể trả về một giá trị (lúc này chúng ta không cần phải trì hoãn - defer). Chúng ta có thể xem ví dụ dưới đây (bạn click vào tab Result để xem kết quả khi chạy: ban đầu sẽ hiển thị Ready. , 1 giây sau hiển thị noPromise, 3 giây sau hiển thị promise )

Hy vọng qua những điều hướng dẫn cơ bản đã nêu ra, các bạn đã có thể hiểu được promise là gì, làm thế nào để sử dụng cũng như áp dụng promise vào các trường hợp thực tế.