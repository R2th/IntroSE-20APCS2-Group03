Javascript là ngôn ngữ lập trình bất đồng bộ và chỉ chạy trên một luồng. Việc bất đồng bộ trong javascript thường xuất hiện khi nó thao tác với các WebAPI (ajax, setTimeout(), … ). Là một phần đơn giản và thường xuyên thao tác hàng ngày nên nhiều khi chúng lại bị coi nhẹ và đôi lúc việc triển khai lại không chuẩn cho lắm.
>Đồng bộ hóa các tác vụ bất đồng bộ trong JavaScript luôn là một vấn đề nghiêm trọng trong một thời gian dài

### Lược sử về JavaScript Asychronous
Giải pháp đầu tiên và cũng là đơn giản nhất đó là sử dụng `Nested function` dưới dạng như một `callback`. Nhưng giải pháp này lại đem đến cho chúng ta một thứ được gọi là `Callback Hell` và việc lạm dụng `callback` khiến code của chúng ta trong giống như một kim tự tháp vậy đó.<br/>
Sau đó là sự ra đời của`Promises`. Việc sử dụng `Promises` cũng chả khá khẩm lên được tý nào cả, ngoài việc khiến code của chúng ta dễ đọc hơn hẳn nhưng thay vào đó lại chưa giải quyết được vấn đề `DRY` (Don’t Repeat Yourself), bởi đơn giản có quá nhiều thứ cần được sử dụng lại trong ứng dụng của mình. Và cuối cùng, chúng ta có `async / await` đã biến những đoạn mà về xử lý bất đồng bộ trở nên dễ đọc, dễ viết hơn như bất kỳ đoạn mã nào khác. <br/>
Dưới đây là những cách và hướng tiếp cận khác nhau để giải quyết bài toán bất đồng bộ trong Javascript để chúng ta cùng nhau tham khảo và chọn cho mình giải pháp thích hợp hơn.<br>
Trước tiên, chúng ta sẽ làm các task sau theo thứ tự lần lượt nhé:
1. Verify username và password.
2. Get role của user.
3. Ghi log(lịch sử đăng nhập) của user đó.

### Callback Hell (Kim tự tháp của sự diệt vong)
Một trong những giải pháp cổ xưa đó là để đồng bộ hóa các tác vụ này chúng ta cần thông qua các `callback`. Đây là một cách tiếp cận khá là phù hợp cho các tác vụ bất đồng bộ trong JavaScript nhưng phải đơn giản nha, bởi chúng ta sẽ không thể mở rộng function do có một vấn đề lớn gặp phải được gọi với cái tên `Callback Hell`.

![](https://images.viblo.asia/a91ef4fc-071d-4f39-8cf3-61fc51b8d818.jpg)

Nếu có triển khai dưới giải pháp này chúng ta sẽ được đoạn code sau:
```javascript
const verifyUser = function(username, password, callback){
   dataBase.verifyUser(username, password, (error, userInfo) => {
       if (error) {
           callback(error)
       }else{
           dataBase.getRoles(username, (error, roles) => {
               if (error){
                   callback(error)
               }else {
                   dataBase.logAccess(username, (error) => {
                       if (error){
                           callback(error);
                       }else{
                           callback(null, userInfo, roles);
                       }
                   })
               }
           })
       }
   })
};

```

Có quá nhiều người khi đọc đoạn code này có cảm giác não mình như bị đóng băng. Đây mới chỉ là vài dòng đơn giản, hãy thử tưởng tượng với hàng trăm, hàng nghìn dòng mã như này thì thử hỏi những ai đang maintain hoặc đơn giản viết ra đoạn mà này thì cũng không phải dạng vừa đâu.<br>
Ví dụ này thậm chí còn phức tạp hơn khi bạn nhận ra rằng `database.getRoles` là một hàm khác có các lệnh gọi lại lồng nhau.
```javascript
const getRoles = function (username, callback){
   database.connect((connection) => {
       connection.query('get roles sql', (result) => {
           callback(null, result);
       })
   });
};
```
Ngoài việc code khó bảo trì ra, thì nguyên tắc DRY hoàn toàn không được quan tâm đến trong trường hợp này. Ví dụ như việc xử lý lỗi được lặp lại trong mỗi hàm.<br>
Với các task bất đồng bộ phức tạp hơn, chẳng hạn như lặp đi lặp lại các tác vụ bất đồng bộ thì sẽ xử lý như thế nào, đó quả là một thách thức không hề nhỏ nha. Thế nên, trên thực tế, sẽ không áp dụng việc này để giải những bài toán khó về bất đồng bộ cả.<br>
Đó cũng chính là lúc `Promises` xuất hiện.
### JavaScript Promises
`Promises` là bước hợp lý tiếp theo trong việc thoát khỏi `Callback Hell`. Phương pháp này không loại bỏ việc sử dụng callback, nhưng nó làm cho chuỗi các hàm trở nên rõ ràng, đơn giản hóa code, và dễ đọc hơn rất nhiều.

![](https://images.viblo.asia/f8f25012-6a3b-40dd-b956-e7b5ccfbc1e3.png)

Với Promises, đoạn mã trong ví dụ trên sẽ trông giống như sau:
```javascript
const verifyUser = function(username, password) {
   database.verifyUser(username, password)
       .then(userInfo => dataBase.getRoles(userInfo))
       .then(rolesInfo => dataBase.logAccess(rolesInfo))
       .then(finalResult => {
           //do whatever the 'callback' would do
       })
       .catch((err) => {
           //do whatever the error handler needs
       });
};
```
Để làm được kiểu đơn giản như thế này thì tất cả các hàm được sử dụng trong ví dụ trên sẽ phải trả về `Promisised`. Hãy cùng xem phương thức `getRoles` sẽ như thế nào để trả về Promise:
```javascript
const getRoles = function (username){
   return new Promise((resolve, reject) => {
       database.connect((connection) => {
           connection.query('get roles sql', (result) => {
               resolve(result);
           })
       });
   });
};
```
Chúng ta đã sửa đổi phương thức để trả về là một `Promise`, với hai callback, và bản thân `Promise` thực hiện các hành động từ phương thức đó. Giờ thì `resolve` và `reject` callback sẽ mapping với `Promise.then` và `Promise.catch` tương ứng. <br>
Bạn có thể vẫn thấy phương thức `getRoles` vẫn có nằm bên trong và gây nên hiện tượng kim tự tháp của sự diệt vong đúng không. Điều này là do các phương thức truy suất database được tạo ra không trả về Promise. Nếu các phương thức truy suát database của chúng ta cũng trả về `Promise` thì phương thức `getRoles` sẽ giống như sau:
```javascript
const getRoles = new function (userInfo) {
   return new Promise((resolve, reject) => {
       database.connect()
           .then((connection) => connection.query('get roles sql'))
           .then((result) => resolve(result))
           .catch(reject)
   });
};
```
###  Async/Await
Vâng, Kim tự tháp của sự diệt vong đã được giảm thiểu đáng kể với sự ra đời của `Promises`. Tuy nhiên, chúng ta vẫn phải dựa vào các callback được chuyển cho các phương thức `.then` và `.catch` của `Promise`. Nhưng phần nào vẫn còn nhiều vấn đề cần giải quyết, để rồi đến `ECMAScript 2017 (ES8)` chúng ta có `async` và `await` cao cấp hơn `promises` và là lựa chọn tối ưu nhất với những bài toán khó.<br>
Nó cho phép chúng ta viết code dựa trên `Promise` như thể nó đồng bộ, nhưng không chặn luồng chính:

```javascript
const verifyUser = async function(username, password){
   try {
       const userInfo = await dataBase.verifyUser(username, password);
       const rolesInfo = await dataBase.getRoles(userInfo);
       const logStatus = await dataBase.logAccess(userInfo);
       return userInfo;
   }catch (e){
       //handle errors as needed
   }
};
```

### ASYNC a long AWAITED resolution of a PROMISE
Các hàm bất đồng bộ là bước hợp lý tiếp theo trong sự phát triển của lập trình bất đồng bộ trong JavaScript. Chúng sẽ làm cho đoạn mã của bạn sạch hơn và dễ bảo trì hơn rất nhiều. Khai báo một hàm là bất đồng bộ sẽ đảm bảo rằng nó luôn trả về một `Promise`, vì vậy bạn không cầnphải lo lắng về điều đó nữa.<br>
Một vài lý do sẽ khiến bạn nên suy nghĩ về việc nên sử dụng `async` trong tương lai chăng:
1. Trả về đoạn mã clean hơn, dễ đọc, dễ maintain.
2. Xử lý lỗi đơn giản hơn nhiều và nó sử dụng `try / catch` giống như trong bất kỳ đoạn mã đồng bộ thông thường.
3. Đơn giản hơn trong việc debug, tìm lỗi.

Nguồn: https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial