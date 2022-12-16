# Tổng quan
Trước khi ES6 ra đời, khi muốn xử lý bất đồng bộ chúng ta chỉ có thể sử dụng callback. Điều này vô tình làm cho code của chúng ta có thể lồng nhau và khó bảo trì. OMG, callback hell. Và thật may, ES6 ra đời cũng chấm dứt tình trạng này. Promise: hứa hay thất hứa.

# Nội dung
Promise là gì? Promise được ra đời từ ES6 và nó giúp ae code js xử lý tình trạng callback hell. Để tìm hiểu về Promise, chúng ta hãy hiểu nó như là một lời hứa. Và đương nhiên là lời hứa thì có thể sẽ thực hiện được và đôi khi sẽ thất hứa.

## 1. Thực thi (gọi) một promise
Cấu trúc cơ bản khi xử lý của một promise

``` js
asyncFunction()
  .then((data) => {
    // code xử lý khi thực hiện lời hứa
  })
  .catch((err) => {
    // code xử lý khi thất hứa
  })
  .finally(() => {
      // code xử lý sau cùng không quan tâm đến thực hiện được lời hứa thay thất hứa.
  });

```

Để ý vào đoạn code trên bạn sẽ thấy, Promise có 4 phần:
* Hàm **async** (xử lý bất đồng bộ) - đây coi là lời hứa
* Các hàm **then()** - đây là các hàm khi thực hiện được lời hứa.
* Hàm **catch()** - tất nhiên đây hàm được gọi khi thất hứa
* Hàm **finally()** - Hàm này luôn luôn được gọi sau cùng của một tiến trình xử lý promise (nghĩa là không quan tâm trước đó Promise có thực hiện được lời hứa hay không)

Đặc biệt là cái hay của promise là khi các hàm then trước đó trả về một data (gọi là kết quả khi thực hiện được lời hứa) được bao bởi một promise và bạn muốn xử dụng data đó cho một hàm khác thì ta có thể sử dụng hàm **then** để lấy data đó. 
``` js
asyncFunc()
    .then(() => Promise.resolve('thành công'))
    .then((data) => {
        // kết quả khi log ra: thành công
        console.log(data);
    });
```

Vậy nếu trường hợp mà trong hàm **then** trả về một Promise mà promise bị reject (thất hứa) thì sao ? Khi bị reject, promise sẽ bỏ qua các hàm **then** phía sau gọi ngay đến hàm **catch**
``` js
asyncFunc()
    .then(() => Promise.reject('lỗi')) // promise bị reject tại đây
    .then(() => Promise.resolve()) // hàm then này bị bỏ qua
    .then(() => Promise.resolve()) // hàm then này bị bỏ qua
    .catch((err) => {
        // Kết quả in ra sẽ là: lỗi
        console.log(err);
    });
```

## 2. Cách tạo ra một promise
Ở trên, mình đã giúp các bạn thực thi một promise. Ơ thế không có promise thì xử lý như thế nào ? Làm sao để tạo ra một promise ? Nếu để ý kỹ thì trong các ví dụ trên, mình đã có sử dụng cú pháp để tạo ra một promise. Còn bạn vẫn chưa nhìn ra, không sao vì ngay dưới đây mình sẽ giới thiệu.
Ví dụ mình tạo ra một hàm có tên **asyncFunc** trả về một promise.
``` js
function asyncFunc(){
    return new Promise((resolve, reject) => {
         resolve("thực hiện lời hứa");

        // reject("thất hứa");
    });
}
```

Để khởi tạo một promise, chúng ta dùng new Promise(exec: (resolve, reject) => void) : PromiseConstructor, trong đó hàm **exec** có 2 tham số:
* **resolve**: là một hàm khi gọi hàm này sẽ trả về một Promise.resolve() - thực hiện lời hứa
* **reject**: là một hàm khi gọi hàm này sẽ trả về một Promise.reject() - thất hứa

Ngoài cách tạo một promise bằng khởi tạo một đối tượng thông qua constructor, chúng ta có thể sử dụng:
* **Promise.resolve()** - khi cần trả về một promise chắc chắn thực hiện lời hứa
* **Promise.reject()** - khi cần trả về một promise bị reject (thất hứa)

# Tổng kết
Promise sinh ra đã giúp cho ae lập trình js nói chung bớt khổ giúp js bớt sida và trông có vẻ dễ nhìn hơn. Với ES7, js đã ra đời async/await giúp code của chúng ta clean và giống với lập trình các ngôn ngữ đồng bộ hơn.
Tham khảo: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?retiredLocale=vi