![](https://images.viblo.asia/fe119628-5fc5-4a80-98be-ab2623aeba1e.png)
# Mở đầu
   **Javascript** là một ngôn ngữ lập trình đơn luồng, có nghĩa là chỉ có thể có một điều có thế xảy ra tại một không đồng bộ (`asynchronous`) ví dụ như `netword request`.
Sử dụng `Promise` chúng ta có thể tránh được `callback hell` khét tiếng và làm cho code  trông sạch hơn dễ đọc và dễ hiểu hơn.
Giả sử chúng ta đang muốn lấy dữ liệu một cách không đồng bộ bằng cách sử dụng `callback` như sau:
```
getData (function (x) { 
    console.log (x); 
    getMoreData (x, function (y) { 
        console.log (y); 
        getSomeMoreData (y, function (z) { 
            console.log (z); 
        }); 
    } ); 
});
```
Ở đây tôi đang yêu cầu một số dữ liệu từ server bằng cách gọi hàm `getData()` , hàm này sẽ nhận dữ liệu bên trong hàm `callback`. Bên trong hàm `callback` tôi đang yêu cầu thêm một số dữ liệu bằng hàm `getMoreData`. Hàm nhận dữ liệu là kết quả trả về của hàm trước đó. 
Đây chính xác là những gì chúng ta gọi là `callback hell`. Nơi mỗi `callback` lại được lồng trong 1 `callback` khác và mỗi `callback` lại phụ thuộc vào cha mẹ nó.
Ta có thể viết lại đoạn code trên như sau:
```
getData () 
  .then ((x) => { 
    console.log (x); 
    return getMoreData (x); 
  }) 
  .then ((y) => { 
    console.log (y); 
    return getSomeMoreData (y); 
  } ) 
  .then ((z) => { 
    console.log (z); 
   });
```
Ta thấy ví dụ này rõ ràng và dễ hiểu hơn hẳn ví dụ sử dụng `callback` ở trước đó.
# What is a Promise ?
**Promise** là một Object chứa giá trị tương lai của hoạt động không đồng bộ. Ví dụ: Nếu ta đang yêu cầu một số dữ liệu từ `server`, `promise` hứa với chúng ta sẽ lấy ra dữ liệu chúng ta có thể sử dụng trong tương lai.
Trước khi vào khi đi vào nội dung kĩ thuật, chúng ta sẽ đi tìm thuật ngữ `promise`.
## States of a Promise
Promise cũng giống như lời hứa trong thực tế có 3 trạng thái: chưa được giải quyết (`unresolved`), đã giải quyết (`resolved`) ,  hoặc bị từ chối (`rejected`). Ví dụ: 

![](https://images.viblo.asia/9c1405f5-3f0d-4117-84e9-cdcf6c2b94ad.png)
 
*  **Unresolved or Pending** - `Promise` đang chờ xử lý nếu kết quả chưa sẵn sàng. Khi đó, nó đang chờ một thứ gì đó kết thúc (Ví dụ hoạt động bất đồng bộ).
* **Resolved or Fulfilled** - `Promise` được giải quyết nếu có kết quả. Đó là một cái gì đó đã hoàn thành (ví dụ: hoạt động không đồng bộ) và tất cả đều diễn ra tốt đẹp.
* **Rejected** - `Promise` bị từ chối nếu xảy ra lỗi.
Bây giờ chúng ta đã biết Promise là gì và thuật ngữ `Promise`, hãy quay trở lại khía cạnh thực tế của `Promise`.
# Creating a Promise
Hầu hết, các bạn sẽ sử dụng những `promise` hơn là tạo ra chúng, nhưng điều quan trọng vẫn là bạn phải biết cách tạo ra chúng.

**Syntax**:
```
const promise = new Promise((resolve, reject) => {
    ...
  });

```

Chúng tôi tạo một `Promise` mới bằng cách khởi tạo hàm khởi tạo `promise`, nó nhận một đối số duy nhất là một hàm `callback`. Đối số này  còn được gọi là hàm thực thi nhận hai `callback` là `resolve` và `reject`.

Hàm thực thi được thực thi ngay lập tức khi một `promise` được tạo. `Promise` được giải quyết bằng cách gọi `resolve()` và từ chối bằng cách gọi `reject()`. 

Ví dụ:
```
const promise = new Promise((resolve, reject) => {
  if(allWentWell) {
    resolve('All things went well!');
  } else {
    reject('Something went wrong');
  }
});
```
 `resolve()` và `reject()` nhận một đối số có thể là một `string`, `number`, `boolean`, `array` hoặc `object`.

Hãy xem một ví dụ khác để hiểu đầy đủ về việc tạo `Promise`.
```
const promise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();
  setTimeout(() => {
    if(randomNumber < 6) {
      resolve('All things went well!');
    } else {
    reject('Something went wrong');
  }
  }, 2000);
});
```

Ở đây tôi đang tạo một lời `promise` bằng cách sử dụng phương thức khởi tạo `Promise`. `Promise` được giải quyết hoặc bị từ chối sau 2 giây kể từ khi tạo. `Promise` được giải quyết nếu `randomNumber` nhỏ hơn 6 và bị từ chối nếu không.

Khi Promise được tạo, nó sẽ ở trạng thái chờ xử lý và giá trị của nó sẽ là `undefined`. Ví dụ:

![](https://images.viblo.asia/141f3f7e-ef96-40ca-b6d9-62153bf8a4ff.png)


Sau khi bộ đếm thời gian 2 giây kết thúc, `promise` được giải quyết hoặc bị từ chối một cách ngẫu nhiên và giá trị của nó sẽ là giá trị được chuyển đến chức năng  `resolved` hoặc `reject`. Ví dụ:

 **Lưu ý**  - Lời hứa chỉ có thể được giải quyết hoặc bị từ chối một lần. Việc gọi thêm `resolve()` hoặc `reject()` không có tác dụng đối với trạng thái  `Promise`. Ví dụ:
```
const promise = new Promise((resolve, reject) => {
  resolve('Promise resolved');  // Promise is resolved
  reject('Promise rejected');   // Promise can't be rejected
});
```

Vì `resolve()` được gọi trước nên `promise` sẽ được giải quyết. Việc gọi `reject()` sau đó sẽ không ảnh hưởng đến trạng thái `Promise`.

# Consuming a Promise
Bây giờ chúng ta đã biết cách tạo một `Promise`, hãy hiểu cách sử dụng một `Promise` đã được tạo. Chúng tôi sử dụng một  `Promise` bằng cách gọi phương thức `then()` và `catch()`  trên `Promise`.

Ví dụ: Yêu cầu dữ liệu từ một API bằng cách sử dụng `Promise`.

`.then()` **Syntax** `:promise.then(successCallback, failureCallback)`

 `successCallbackđược` được gọi khi một `promise` đã được giải quyết. Nó nhận một đối số là giá trị được truyền tới `resolve()`.

 `failureCallback` được gọi khi một `promise` bị từ chối. Nó nhận một đối số là giá trị được truyền tới `reject()`.

Ví dụ:

![](https://images.viblo.asia/afa2ac4c-5d91-4532-b869-b2effa494c3d.png)

```
const promise = new Promise((resolve, reject) => {
  const randomNumber = Math.random();
  
  if(randomNumber < .7) {
    resolve('All things went well!');
  } else {
    reject(new Error('Something went wrong'));
  }
});
promise.then((data) => {
  console.log(data);  // prints 'All things went well!'
  },
  (error) => {
  console.log(error); // prints Error object
  }
);
```
Ở đây nếu `promise` được giải quyết, thì `successCallback` sẽ được gọi với giá trị được chuyển đến `resolve()`. Và nếu lời hứa bị từ chối, thì `failureCallback` được gọi với giá trị được chuyển đến `reject()`.

`.catch()` **Syntax** :`promise.catch(failureCallback)`

Chúng tôi sử dụng `catch()` để xử lý lỗi. Nó dễ đọc hơn là xử lý các lỗi   `failureCallback`  bên trong `then()`. Ví dụ:

```
const Promise = new Promise ((giải quyết, từ chối) => {
  từ chối (Lỗi mới ('Đã xảy ra lỗi'));
});
hứa 
  .then ((data) => { 
     console.log (data); 
   }) 
  .catch ((error) => { 
     console.log (error); // in ra Error object 
  });
```

# Promise Chaining
Các phương thức `then()` và `catch()` cũng có thể trả về một `promise` mới có thể được xử lý bằng cách xâu chuỗi then () khác vào cuối phương thức `then()` trước đó.

Chúng tôi sử dụng chuỗi lời hứa khi chúng tôi muốn giải quyết các `promise` theo một trình tự.

Ví dụ:
```
const promise1 = new Promise((resolve, reject) => {
  resolve('Promise1 resolved');
});
const promise2 = new Promise((resolve, reject) => {
  resolve('Promise2 resolved');
});
const promise3 = new Promise((resolve, reject) => {
  reject('Promise3 rejected');
});
promise1
  .then((data) => {
    console.log(data);  // Promise1 resolved
    return promise2;
  })
  .then((data) => {
    console.log(data);  // Promise2 resolved
    return promise3;
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);  // Promise3 rejected
  });

```

**Vậy điều gì đang xảy ra ở đây?**

* Khi `promise1` được giải quyết, `then()` phương thức được gọi là phương thức trả về `promise2`.
* Tiếp theo `then()` được gọi là khi `promise2` được giải quyết và trả về `promise3`.
* Kể từ khi `promise3` bị từ chối, tiếp theo `then()` không được gọi thay vào đó `catch()` được gọi là xử lý `promise3` từ chối.

**Lưu ý** - Nói chung chỉ một `catch()`là đủ để xử lý việc từ chối bất kỳ `promise` nào trong chuỗi `promise`, nếu nó ở cuối chuỗi.

## Common Mistake

Rất nhiều người mới bắt đầu mắc sai lầm khi lồng những lời hứa vào bên trong một lời `promise`.

Ví dụ:
```
const promise1 = new Promise((resolve, reject) => {
  resolve('Promise1 resolved');
});
const promise2 = new Promise((resolve, reject) => {
  resolve('Promise2 resolved');
});
const promise3 = new Promise((resolve, reject) => {
  reject('Promise3 rejected');
});
promise1.then((data) => {
  console.log(data);  // Promise1 resolved
  promise2.then((data) => {
    console.log(data);  // Promise2 resolved
    
    promise3.then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);  // Promise3 rejected
    });
  }).catch((error) => {
    console.log(error);
  })
}).catch((error) => {
    console.log(error);
  });
```

Mặc dù điều này hoạt động tốt, đây được coi là một phong cách kém sang và làm cho code của chúng tôi khó đọc. Nếu bạn có một chuỗi các `promise` cần giải quyết, tốt hơn là bạn nên xâu chuỗi các `promise` một cách lần lượt hơn là lồng chúng vào bên trong một chuỗi khác.

# Promise.all ()
Phương thức này nhận một mảng các lời hứa làm đầu vào và trả về một lời hứa mới thực hiện khi tất cả các lời hứa bên trong mảng đầu vào đã hoàn thành hoặc từ chối ngay khi một trong các lời hứa trong mảng từ chối. Ví dụ:
```
const Promise1 = new Promise ((giải quyết, từ chối) => { 
setTimeout (() => { 
  giải quyết ('Promise1 đã giải quyết'); 
}, 2000); 
});
const Promise2 = new Promise ((giải quyết, từ chối) => { 
setTimeout (() => { 
  giải quyết ('Promise2 đã giải quyết'); 
}, 1500); 
});
Promise.all ([promise1, promise2]) .then 
  ((data) => console.log (data [0], data [1])) 
  .catch ((error) => console.log (error));
```

* Ở đây, đối số dữ liệu bên trong `then()` phương thức là một mảng chứa các giá trị hứa hẹn theo thứ tự như được định nghĩa trong mảng hứa hẹn được chuyển đến `Promise.all()` (nếu tất cả các `Promise` đều thực hiện).
* `Promise` bị từ chối với lý do từ chối từ lời hứa bị từ chối đầu tiên trong mảng đầu vào. Ví dụ:
```
const promise1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise1 resolved');
 }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('Promise2 rejected');
 }, 1500);
});
Promise.all([promise1, promise2])
  .then((data) => console.log(data[0], data[1]))
  .catch((error) => console.log(error));  // Promise2 rejected
```

* Ở đây chúng tôi có `promise` hứa trong đó một lời hứa được giải quyết sau 2 giây và lời hứa kia bị từ chối sau 1,5 giây.
* Ngay sau khi `promise` thứ hai bị từ chối sau 1,5 giây, lời hứa được trả lại từ `Promise.all()` sẽ bị từ chối mà không cần đợi `promise` đầu tiên được giải quyết.
Phương pháp này có thể hữu ích khi bạn có nhiều lời hứa và bạn muốn biết khi nào ``promise`` các lời hứa đã được giải quyết. Ví dụ: nếu bạn đang yêu cầu dữ liệu từ các API khác nhau và bạn chỉ muốn làm điều gì đó với dữ liệu khi tất cả các yêu cầu đều thành công.

Vì vậy, hãy `Promise.all()` đợi tất cả các `promise` thành công và thất bại nếu bất kỳ ``promise`` nào trong mảng không thành công.

# Promise.race ()
Phương thức này nhận một mảng các `promise` làm đầu vào và trả về một `promise` mới thực hiện ngay khi một trong các`promise` trong mảng đầu vào thực hiện hoặc từ chối ngay khi một trong các `promise` trong mảng đầu vào từ chối. Ví dụ:
```
const promise1 = new Promise((resolve, reject) => {
 setTimeout(() => {
  resolve('Promise1 resolved');
 }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
 setTimeout(() => {
  reject('Promise2 rejected');
 }, 1500);
});
Promise.race([promise1, promise2])
  .then((data) => console.log(data))  // Promise1 resolved
  .catch((error) => console.log(error));
```

* Ở đây chúng ta có hai `promise` trong đó một `promise` được giải quyết sau 1 giây và `promise` kia bị từ chối sau 1,5 giây.
* Ngay sau khi `promise` đầu tiên được giải quyết sau 1 giây, lời hứa trả lại từ `Promise.race()` sẽ được giải quyết mà không cần đợi `promise` thứ hai được giải quyết hoặc bị từ chối.
* Ở đây dữ liệu được truyền cho `then()` phương thức là giá trị của `promise` đầu tiên được giải quyết.
Vì vậy, hãy `Promise.race()` đợi một trong những `promise` trong mảng thành công hay thất bại và thực hiện hoặc từ chối ngay sau khi một trong những `promise` trong mảng được giải quyết hoặc bị từ chối.

# Phần kết luận
Chúng tôi đã tìm hiểu  `promise` là gì và cách sử dụng chúng trong **JavaScript**. Một `promise` có hai phần: 1) Tạo ra `promise` và 2) sử dụng một `promise`. Hầu hết các lần bạn sẽ sử dụng những `promise` hơn là tạo ra chúng, nhưng điều quan trọng vẫn là bạn phải biết cách tạo ra chúng.

**Link tham khảo:** [https://blog.bitsrc.io/understanding-promises-in-javascript-c5248de9ff8f](https://blog.bitsrc.io/understanding-promises-in-javascript-c5248de9ff8f)