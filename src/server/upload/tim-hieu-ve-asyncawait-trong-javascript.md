# Mở đầu
`async/await`  có từ es7 giúp cho làm việc với xử lý bất đồng boọ trở nên đơn giản hơn. Để hiểu rõ cách dùng, và vì sao lại dùng thì chúng ta cùng lược qua lịch sử xử lý bất đồng bộ của javascript nhé.
# Callbacks
Chúng ta sẽ bắt đầu ví dụ với hàm sau, ý tưởng hàm sẽ là đọc file, lưu nội dung file và gửi ra thông báo là 1 `console.log`
Bạn sẽ thấy callbacks được sử dụng:
```
const fs = require('fs');
fs.readFile('./doc.txt', (err, content) => {
  const formattedContent = content.toString().toUpperCase();
  fs.writeFile('./doc2.txt', formattedContent, (err) => {
    if (!err) {
      console.log('success!!')
    }
  });
});
```
Hàm `readFile` với tham số đầu vào là đường dẫn của file và 1 callbacks function. Sau khi đọc file xong thì `callback function` này sẽ được thực hiện. Mọi xử lý có vẻ khá ok cho đến khi chúng ta gặp trường hợp như xử lý dưới đây, đó là có quá nhiều hàm `callbacks`.
```
getSomeData(() => {
  getMoreData(() => {
    doSomethingWithTheData(() => {
      saveUpdatedData(() => {
        refreshCache(() => {
          logOutput()
        })
      })
    })
  })
});
```
Khi chúng ta muốn làm việc với nhiều hàm callback sẽ dẫn tới hiện tượng [callback hell](http://callbackhell.com/), nó sẽ dẫn tới những dòng code khó hiểu. Vì vậy, `Promises` ra đời để xử lý hiện tượng này.
# Promises
Một `Promises` sẽ có 3 trạng thái:
1. Pending: Khởi tạo 1 hoạt động bất đồng bộ, mà xử lý sẽ trả về resolved(xử lý xong) or rejected(từ chối).
2. Fulfilled: Một hành động bất đồng bộ đúng và xử lý trả về kết quả.
3. Rejected: Một hành động bất đồng bộ sai, và `promises` là `rejected` và trả về thông báo lỗi.
Các thư viện `Promises` chỉ hoạt động với hàm callback.
```
const fs = require('fs');
const readFile = (path) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, (err, content) => {
      if (err) {
        reject(err);
      }
    resolve(content);
    })
  });
};
const writeFile = (path, content) => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, content, (err) => {
      if (err) {
        reject(err);
      }
   resolve();
    })
  });
};
```
Hay là:
```
const Promise = require('bluebird');
const fs      = Promise.promisifyAll(require('fs'));
fs.readFileAsync('./doc.txt')
  .then(content => {
    const formattedContent = content.toString().toUpperCase();
    
    return formattedContent;
  })
  .then(content => {
    return fs.writeFileAsync('./doc2.txt', content);
  })
  .then(() => {
    console.log('success!!');
  })
  .catch(err => {
    console.log(err);
  });
```
Sử dụng `promises`, `then` sẽ dễ sử dụng, dễ mudule hóa hơn vì thế code dễ đọc và dễ bảo trì hơn.
Một vài điểm đáng chú ý của `promises`:
* Một `promises` có một `then` thì function `callbacks` sẽ được thực thi ngay khi `promises` xử lý
* Hàm `then` luôn trả về một `promises`, cho phép chúng ta tạo `then chains`.
* Một `promises` cũng có thể dùng được try catch.
# Async/await
`async/await` thực chất là một `promises`. Dưới đây là ví dụ về `async/await`
```
const Promise = require('bluebird');
const fs      = Promise.promisifyAll(require('fs'));

(async () => {
  try {
    const content          = await fs.readFileAsync('./doc.txt');
    const formattedContent = content.toString().toUpperCase();
    
    await fs.writeFileAsync('./doc2.txt', formattedContent);
    
    console.log('success!!');
  } catch (err) {
    console.log(err);
  }
})();
```
`fs.readFileAsync` sẽ trả về 1 `promise`.  cú pháp `await` sẽ dừng lại thực thi code cho đến khi `promise` trả về thành công hay bị rejected rồi mới tiếp tục thực thi. 
Một vài điểm đáng chú ý của `promises`:
* `await` chỉ được dùng trong `async`
* Một `async function` luôn trả về 1 `promise`
# Tài liệu tham khảo
[Link gốc](https://medium.com/techshots/javascript-understanding-async-await-209fde308d69)