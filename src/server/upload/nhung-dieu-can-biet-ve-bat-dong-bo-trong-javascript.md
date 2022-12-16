Khi làm lâp trình, chắc hẳn từ khóa "bất đồng bộ" trong javascript chắc hẳn sẽ cần phải biết qua và chắc chắn sẽ rất quan trọng nếu bạn muốn làm việc tốt hơn với nó. Tuy nhiên, việc hiểu và sử dụng nó sao cho đúng, thì đôi khi cũng là một bất cập.

Vì vậy trong bài này, mình xin giới thiệu một vài thứ cơ bản, có thể giúp bạn giải quyết chút khó khăn khi tiếp cận với lập trình bất đồng bộ.

# 1. Khái niệm cơ bản
Trước hết, để giải quyết được bài toán "bất đồng bộ", bạn cần hiểu và biết được 3 phương án giải quyết phổ biến: Callback, promise, async/await. 

Promise sinh ra giải quyết các vấn đề cho callback,  async/await lại giải quyết vấn đề cho promise.
Tuy nhiên thì, tùy từng trường hợp, mình sẽ dùng phương án nào giải quyết cho hợp lí nhé. Hãy cùng mình xem qua các ví dụ sau để hiểu hơn về 3 phương án trên.

# 2. Ví dụ giữa callback và promise
Xét ví dụ: 

Đây là một đoạn code về đọc file 
```
const fs = require('fs');
fs.readFile('/path/to/file', (err, file) => {
  if(err) {
    // handle the error
  }
  else {
    // do something with the file
  }
});
```
Hàm `fs.readFile`  lấy đường dẫn của 1 tệp và trả lại đối số. Hàm callback trả về error hoặc null khi đọc sai và trả về file khi đọc thành công.

Khi chuyển sang Promise thì :
```
fs.readFile('/path/to/file')
.then(file => {
  // do something with the file
})
.catch(err => {
  // handle the error
});
```
Hay viết wrap trong một Promise:
```
const readFileAsync = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, file) => {
      return err ? reject(err) : resolve(file);
    });
  });
};
// usage
readFileAsync('/path/to/file')
.then(file => {
  // do something with the file
})
.catch(err => {
  // handle the error
});
```
Lúc này hàm `readFileAsync ` nhận vào 1 đường dẫn file sau đó thực hiện readFile và trả về một promise. Nếu hàm `readFile` error thì sẽ nhận được thông tin lỗi qua `reject`, còn nếu thành công thì sẽ nhận được thông tin file thông qua `resolve`.

Chúng ta để ý ở đây, promise cũng được viết dựa trên callback. Đây cũng là cách viết promise dựa trên callback.

# 3. Ví dụ giữa promise và async/await

### 1. Một ví dụ khác với `FileReader`:
Đọc tệp trình duyệt và biến nó thành `ArrayBuffer`

Cách viết với callback
```
const toArrayBuffer = blob => {
  const reader = new FileReader();
  reader.onload = e => {
    const buffer = e.target.result;
  };
  reader.onerror = e => {
    // handle the error
  };
  reader.readAsArrayBuffer(blob);
};
```
Cách viết với Promise : 
```
const toArrayBuffer = blob => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e.target.error);
    reader.readAsArrayBuffer(blob);
  });
};
```
Khá clear và dễ hiểu, vì khá giống với ví dụ trước, tuy nhiên thì các viết promise có vẻ ngắn gọn và clear hơn.

Tuy nhiên, hãy xét thêm các ví dụ làm việc với promise và cách giải quyết khi dùng async/await nhé.

Nếu bạn làm việc với promise nhiều, chắc hẳn cũng gặp vấn đề giải quyết chồng chéo then như:
```
const db = openDatabase();
db.getUser(id)
.then(user => db.getOrders(user))
.then(orders => db.getProducts(orders[0]))
.then(products => {
  // cannot access orders here!
})
```
3 hành động: getUser, getOrders, getOrders thực hiện lần lượt nhau.
Tuy nhiên, trong đoạn code trên, sau khi thực hiện hành động `getOrders` thì biến orders của then sau không thể truy cập được, bởi nó xách định trong phạm vi callback của Promise trước đó được trả về từ `db.getOrders()`.

Vì vậy cách giải quyết là: 
```
const db = openDatabase();
let orders;  // initialized in outer scope
db.getUser(id)
.then(user => db.getOrders(user))
.then(response => {
  orders = response;  // orders is assigned here
  return db.getProducts(orders[0]);
})
.then(products => {
  // orders is now accessible here!
})
```
Bây giờ thì oke rồi, tuy nhiên, nếu dưới products lại có hàng loạt các then nữa, thì lúc đó lại có hàng loạt các biến được khởi tạo (haiz). 
Thay vào đó nếu ta sử dụng async/await thì:
```
const db = openDatabase();
const getUserData = async id => {
  const user = await db.getUser(id);
  const orders = await db.getOrders(user);
  const products = await db.getProducts(orders[0]);
  return products;
};

//use
getUserData(123);
```
Wow, ngắn gọn hơn và ta không phải tạo thêm biến sau mỗi promise nữa, tất cả cá biến trong `getUserData` đều có chung phạm vi và có thể truy cập được.

Đặc biệt, bạn có thể viết:
```
const getProducts = async () => {
  const products = await getUserData(123);
};
```
Hay kết hợp promise và async/await:
```
getUserData(123)
.then(products => {
  // use products
})
```
Bởi vì, async  luôn return về một promise.

### 2. Một ví dụ khác khi giải quyết vấn đề call nhiều api cùng 1 lúc.
Gửi email cho  100 khách hàng/ 1 lượt
```
const sendMailForUsers = async (users) => {
  const usersLength = users.length
  
  for (let i = 0; i < usersLength; i += 100) { 
    const requests = users.slice(i, i + 100).map((user) => { 
      // Mỗi đợt 100 email. và xử lý chúng
      return triggerMailForUser(user) 
      // Async function to send the mail.
       .catch(e => console.log(`Error in sending email for ${user} - ${e}`))
    })
    
    // requests sẽ có 100 hoặc ít hơn các promise đang chờ xử lý.
    // Promise.all sẽ đợi cho đến khi tất cả các promise 
    //đã được giải quyết và sau đó thực hiện 100 lần tiếp theo.
    await Promise.all(requests)
     .catch(e => console.log(`Error in sending email for the batch ${i} - ${e}`)) 
    // Catch the error.
  }
}
 
sendMailForUsers(userLists)
```
Tuy nhiên, với promise.all thì không thể biết chính xác khách hàng nào bị gửi mail lỗi, mà chỉ xác định được trong batch nào bị gửi mail lỗi. 

Và đây là sức mạnh của async/await
```
const sendMailForUsers = async (users) => {
        for(item of users){
            item.response = await triggerMailForUser(item) 
        }
}
 
sendMailForUsers(userLists)
```
Giờ thì ở mỗi item sẽ có 1 response, để biết xem item đó đã thực hiện gửi mail thành công hay chưa.

# 4. Kết luận
Trên đây là một vài ví dụ cơ bản khi làm việc với callback, promise, async/await. Tuy nhiên, khi sử dụng, còn có rất nhiều vấn đề khác gặp phải, ( vì javascript sida mà :D), nhưng đây cũng là chút kiến thức cơ bản để chúng ta tiếp cận gần hơn tới "bất đồng bộ", mong là sẽ giúp ích được bạn.

Cám ơn các bạn đã đọc, rất mong có nhiều góp ý để bài viết được tốt hơn.


Nguồn tham khảo: 
https://medium.com/swlh/what-you-need-to-know-about-asynchronous-programming-in-javascript-894f90a97941
https://topdev.vn/blog/promise-all-la-gi/