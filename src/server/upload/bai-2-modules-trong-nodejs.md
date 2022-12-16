## Built-in Modules và External Modules
Như ở bài trước mình có nói: `mỗi file đều được coi như là một module tách biệt`. Nhưng về cơ bản thì `Modules` trong NodeJS sẽ chia thành 2 loại:
 ### Build-in Modules:
 Đây là nhưng modules được NodeJS tích hợp sẵn, nghĩa là chỉ cần cài đặt NodeJS là bạn có thể gọi ra sử dụng chúng.
 Các bạn có thể xem danh sách các modules đó tại đây: https://www.w3schools.com/nodejs/ref_modules.asp
 
 ### External Modules
 Với danh sách Build-in Modules  thì thật sự quá ít để hỗ trợ cho việc code của các dev. Chính các External Modules mới tạo nên sức mạnh thật sự cho NodeJS. Bạn có thể tìm kiếm danh sách các modules khổng lồ này tại https://www.npmjs.com/ hoặc là https://yarnpkg.com/. Sau đó cái đặt qua các câu lệnh. Ví dụ:
 ```
 npm install --save express
 ```
 
 ## Caching
 
 Khi một module của bạn bị require nhiều lần thì có ảnh hưởng đến hiệu năng không? Câu trả lời là bạn có thể require bao nhiêu lần cũng được nha. Khi app được chạy, lần require đầu tiên sẽ là lần mà module đó được khởi tạo và sẽ cache lại. Những lần require tiếp theo thì sẽ kiểm tra trong cache và dùng luôn chứ sẽ không khởi tạo lại nữa.
 
 Nhưng nếu bạn muốn module được excute nhiều lần thì có thể export ra 1 function và tới lúc gọi thì bạn hãy gọi ra function đó
 
 ## Cycles
 Giờ ta sẽ có file 3 files như sau:
 `step1.js`
 ```javascript
 console.log('step 1 starting');
exports.done = false;
const step = require('./step2.js');
console.log('in step 1, step2.done = %j', step.done);
exports.done = true;
console.log('step 1 done');
```

 `step2.js`
 ```javascript
 console.log('step 1 starting');
exports.done = false;
const step = require('./step2.js');
console.log('in step 1, step2.done = %j', step.done);
exports.done = true;
console.log('step 1 done');
```

`server.js`
```javascript
console.log('progress starting');
const step1 = require('./step1.js');
const step2 = require('./step2.js');
console.log('in main, step1.done = %j, step2.done = %j', step1.done, step2.done);
```
 
 Nếu như theo code thì chúng ta sẽ thấy được rằng, khi `server.js` được chạy sẽ load `step1.js`, trong `step1.js` lại load `step2.js`. Tại thời điểm này `step2.js` lại load `step1.js`. Như vậy, chúng ta sẽ rơi vào một vòng lặp vô tận, đúng không nào? Nhìn có vẻ là vậy nhưng NodeJS bảo là không, chúng tôi không làm thể ở đây. Để tránh cái vòng lặp vô tận này, một bản sao chưa hoàn thiện của `step1.js` sẽ được export ra và return cho `step2.js`. Sau đó, khi mà `step2.js` đã load xong, nó sẽ trả về dữ liệu cho `step.js`. Lúc đó, khi chạy `node server.js`, chúng ta sẽ được kết quả như sau
 ```
 progress starting
step 1 starting
step 2 starting
in step 2, step1.done = false
step 2 done
in step 1, step2.done = true
step 1 done
in main, step1.done = true, step2.done = true
```

Bài viết hôm nay của mình dừng lại ở đây thôi. Mong qua bài viết này, các bạn có thể hiểu thêm phần nào về modules trong NodeJS :D