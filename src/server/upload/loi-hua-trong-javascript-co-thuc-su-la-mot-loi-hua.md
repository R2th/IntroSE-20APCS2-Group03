# Mở đầu
Vừa rồi, mình có vô tình tìm hiểu và đọc về **Promise** - một khái niệm tuy không quá mới nhưng đối với một Android developer như mình thì các khái niệm về Javascript rất hạn hẹp và ít ỏi. Vậy nên, đôi lúc mình dành chút thời gian rãnh để tìm hiểu thêm về Javascript. Vậy **promise** là gì?

# Khái niệm
Một cách nôm na, theo mình hiểu được thì **promise** là một cơ chế trong JavaScript giúp chúng ta tránh không rơi vào *callback hell* khi thực thi các tác vụ bất đồng bộ. Các tác vụ bất đồng bộ có thể là gọi API, hàm bên trong *setTimeout*, *setInterval*... Dưới đây là một callback hell điển hình.

```
getData(function(a){
  getMoreData(a, function(b){
    getMoreData(b, function(c){
      ...
    });
  });
});
```

Để tạo một **promise** chúng ta cần truyền vào một **callback** như một đối số, gồm hai tham số là **resolve** và **reject**. Sau khi mọi xử lý trong **promise** thành công tốt đẹp, hãy gọi **resolve** và bạn có thể truyền vào đó một chuỗi như một tin nhắn, một mảng hay bất kì gì, để xử lý tiếp. Trường hợp ngược lại, nếu có bất kì lỗi nào trong quá trình xử lý, bạn có thể gọi **reject**.

```
new Promise( /* executor */ function(resolve, reject) { ... } );
```

Ví dụ:

```
getData = function() {
  return new Promise((resolve, reject) => {
    // Gọi API
    http.get(API_URL, (err, result) => {
      // Nếu có lỗi bên trong callback, chúng ta gọi đến hàm `reject()`
      if (err) return reject(err);
      // Ngược lại, dùng `resolve()` để trả dữ liệu về cho `.then()`
      resolve(result);
    });
  })
};
```

![](https://images.viblo.asia/3bf5a31c-f019-4149-93d9-96d4d4249278.png)

Trên đây là mô tả về cách thức hoạt động của **promise**. Như đã thấy, trạng thái của một **promise** có thể sẽ rơi vào một trong ba trạng thái sau:
1. *pending*: đây là trạng thái khi chúng ta vừa khởi tạo một **promise**.
2. *fulfilled*: khi các xử lý trong **promise** thành công.
3. *rejected*: khi có xử lý thất bại.

Khi một **promise** đang ở trạng thái *pending*, trạng thái tiếp theo của nó có thể sẽ là *fulfilled* nếu như mọi xử lý của chúng ta thành công hoặc cũng có thể sẽ là *rejected* khi có xử lý thất bại. Vậy làm sao để truy xuất kết quả của một **promise**?

Để truy xuất kết quả, chúng ta có thể sử dụng phương thức *.then()* và *.catch()*

```
getData()
  .then(function(success) {
    // do something
  })
  .catch(function(errors) {
    // do something
  });
```

*Callback* trong hàm *then()* sẽ được gọi khi **promise** hoàn thành và ngược lại, nếu có bất kì lỗi xảy ra, *callback* trong hàm *catch()* sẽ được gọi.

Vậy tại sao lại cần đến **promise**?

# Vai trò
Với ví dụ về việc giải quyết một *hell callback* ở trên, nhìn qua thì cũng không khác gì việc lồng các *callback* vào với nhau đúng không nào? Thế nhưng **promise** có các vai trò khá quan trọng như:

**1. Hỗ trợ "chaining"**

```
getData(function(a){
  getMoreData(a, function(b){
    getMoreData(b, function(c){
      ...
    });
  });
});
```

Xem lại ví dụ ở trên về việc sử dụng *callback hell* để xử lý dữ liệu. Nhìn có vẻ quá rườm rà rắc rối đúng không nào? Vậy tại sao chúng ta không sử dụng **promise** trong trường hợp này? Giá trị trả về của hàm *then()* là một **promise** khác, do vậy ta có thể dùng **promise** để gọi liên tiếp các hàm bất đồng bộ, và đây là đoạn code cho trường hợp trên, khi dùng **promise**:

```
getData
  .then(getMoreData)
  .then(getMoreData)
  .then(function() {
    ...
  })
  .catch(function() {
    ...
  });
```


**2. Bắt lỗi ngoại lệ**

Ngoài ra, việc bắt lỗi khi sử dụng **promise** cũng khá thuận tiện. Nếu như khi có bất kì lỗi xảy ra, **promise** sẽ chuyển sang trạng thái *rejected* (như mình đã nói ở trên) và *callback* trong hàm *catch()* sẽ được gọi.

**3. Xử lý bất đồng bộ**

Và một trong những vai trò không kém phần quan trọng của **promise** chính là khả năng xử lý bất đồng bộ - một vấn đề khá nan giải trong Javascript đúng k nào? Promise cho phép chúng ta kết hợp các phương thức bất đồng bộ lại với nhau và cho phép các phương thức này trả về các giá trị như các phương thức đồng bộ. Thay vì trả về kết quả ngay lập tức, các phương thức này sẽ trả về một **promise**.

Giả sử bạn có một vài request API đến server, nhưng phải cần kết quả của những request này mới tiếp tục xử lý tiếp. Vậy thì làm sao? Với **promise**, điều này có vẻ rất dễ dàng khi sử dụng hàm *all()* của **promise**.

```
var promise_1 = new Promise((resolve, reject) => {
    resolve('Done request 1');
});

var promise_2 = new Promise((resolve, reject) => {
    resolve('Done request 2');
});
var promise_3 = new Promise((resolve, reject) => {
    resolve('Done request 3');
});

Promise.all([promise_1, promise_2, promise_3])
  .then(function(result) {
    console.log(result); // ['Done request 1', 'Done request 2', 'Done request 3']
  })
```

Hàm *all()* này nhận vào tham số là một mảng các **promise**, và trả về một mảng các kết quả tương ứng với mỗi **promise**.

Thật tiện đúng không nào?

# Kết
Đối với các ưu điểm của **promise**, việc thay các *callback* bằng cách sử dụng các **promise** là điều không quá khó hiểu đúng không nào? Tuy nhiên, theo cảm nhận của mình, mặc dù không thể phủ nhận các ưu điểm của **promise**, nhưng đôi lúc, việc sử dụng **promise** thay cho *callback* không phải lúc nào cũng tốt. Đối với các hàm đơn giản, đôi khi sử dụng **promise** lại dài dòng và khó để hiểu được hơn so với *callback*.

Vì kiến thức về Javascript của mình có hạn, nên việc trình bày sẽ có đôi chút khó hiểu và có thể sẽ không chính xác, các bạn cũng nên tham khảo các bài viết liên quan đến **promise** nếu như muốn đi sâu và nắm vững kiến thức về **promise** nhé.

## Tham khảo
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8