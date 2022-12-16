# 1. Lời nói đầu:
Các bạn có thể tìm thấy bài cũ mình đã giải thích khá chi tiết về **callback function** ở [đây](https://viblo.asia/p/callback-function-trong-javascript-LzD5dgJwljY). Các bạn có thể hiểu đơn giản javascript là một ngôn ngữ bất đồng bộ, vì vậy nó sẽ không hoạt động theo motip của các ngôn ngữ như c, java, php, python (sẽ thực hiện chạy từ trên xuống) vậy để thực hiện một tác vụ đồng bộ, khi mà các bạn đã có giá trị a, có giá trị b ... thì mới thực hiện tác vụ n + 1 thì sao, đó là lý do chúng ta sẽ sử dụng callback function.
# 2. Lý do tại sao lại có Promise và Async Await
Đúng, không phải callback function đã giải quyết được vấn đề đồng bộ rồi sao, tại sao lại cần thêm những cái kia (rõ đau đầu). Thực gia nếu các bạn có một đến hai callback function lồng nhau thì chắc có lẽ sẽ chẳng sảy ra vấn đề gì cả. Nhưng đời đâu như mơ, làm gì có cái project nào cũng chỉ có một hai cái callback là xử lý song. Khi bắt tay vào các bài toán lớn chúng ta sẽ thấy rằng callBack lồng nhau quá nhiều, và các bug trở lên rất dài, khó lắm bắt, code thì khó nhìn dễ mắc các lỗi vặt, hay còn được biết đến với cái tên thân thương là **CallBack Hell**

Để thấy được vấn đề này tường minh hơn nữa thì chúng ta sẽ cùng tiếp tục ví dụ hôm trước. Hôm trước chúng ta đã có ví dụ cộng 2 số, phát triển từ bài toán trên thì bây giờ mình muốn tính diện tích của một hình thang thì sao nhỉ. Sau đây sẽ là đoạn code
```js
let add = (a, b, CallBack) => {
   setTimeout(() => {
       if(typeof a != 'number' || typeof b != 'number') {
           return CallBack(new Error('Tham so phai co kieu number'), undefined);
       }
       CallBack(undefined, a + b);
   }, 1000);
};
let multiply = (a, b, CallBack) => {
   setTimeout(() => {
       if(typeof a != 'number' || typeof b != 'number') {
           return CallBack(new Error('Tham so phai co kieu number'), undefined);
       }
       CallBack(undefined, a * b);
   }, 1000);
};
let divide = (a, b, CallBack) => {
   setTimeout(() => {
       if(typeof a != 'number' || typeof b != 'number') {
           return CallBack(new Error('Tham so phai co kieu number'), undefined);
       }
       if(b == 0) return CallBack(new Error('Chia cho 0'));
       CallBack(undefined, a / b);
   }, 1000);
};
 
//Định nghĩa Hàm Tính diện tích hình thang
 
let dienTichHinhThang = (a, b, h , CallBack) => {
   add(a, b, (err, result) => {
       if(err) return CallBack(err);
       multiply(result, h, (err, result) => {
           if(err) return CallBack(err);
           divide(result, 2, (err, square) => {
               if(err) return CallBack(err);
               CallBack(undefined, square);
           });
       });
   });
};
 
//Gọi hàm
dienTichHinhThang(2, 3, 2, (err, result) => {
   if(err) return console.log(err + '');
   console.log('Dien tich hinh thang la: ', result);
});

```

Như chúng ta đã thấy nếu viết **CallBack** đơn thuần thì tại hàm xử lý `let dienTichHinhThang = (a, b, h , CallBack) => {...`  Chúng ta đang phải viết các CallBack lồng nhau, có thể với trường hợp này các bạn còn thấy tương đối dễ nhìn, nhưng giả xử trường hợp vòng lặp thì sao **"Thật sự là ác mộng"**: rất may tại phiên bản **es6** đã đề cập đến một trong các từ khóa mang tên : **Promise**

# 3. Promise
**Định nghĩa:** Các bạn có thể hiểu đơn giản, **Promise** hay có thể dịch ra đơn giản là lời hứa, và một lời hứa sẽ có 2 trạng thái **resolve** hoàn thành và **reject** không thể hoàn thành vì lý do nào đó.

Cú pháp để tạo ra một **Promise:**
```js
let bPromise = new Promise((resolve, reject) => {
   setTimeout(() => {
       // resolve('Success');
       reject(new Error('Not Defail'));
   }, 2000);
});// Gọi hàm promise ở trên, dùng hàm .then() và nó cũng có 2 đối số là 2 function: tham số đầu tiên là thực thi khi thành công, tham số thứ 2 là trả về khi thất bại. Và đặc biệt nó sẽ luôn trả kết quả là promise

bPromise.then((msg) => console.log('Da thuc thi: ' + msg),// chú ý các bạn k thể truyền vào 2 gtri, nếu muốn truyền 2, n gtri thì cần lén vào một object - {}
(errMsg) => console.log(errMsg + ''));
```

**Lưu ý:** function này được khởi động và thực thi, thậm chí nó còn chạy trước cả câu lên new được thực hiện và trả ra một đối tượng **promise**

**VD**: Quay lại với ví dụ tính S hình thang. Với hàm add mình hứa sẽ cộng 2 số lại và trả về kết quả, tuy nhiên trong lúc thực hiện mình nhận ra số a và b bạn nhập vào không đúng, mình không thể hoàn thành cho bạn và trả về reject(), con nếu tất cả đều đúng thì mình sẽ trả về kết quả resolve() cho bạn. 
Nếu với trường hợp bạn gọi đồng thời cả resolve() và reject() thì chỉ câu lệnh đầu tiên được thực hiện.

Quay lại với vd tính diện tích hình thang, b1 cộng 2 đáy ta sẽ viết lại theo promise như sau:
```js
// Định nghĩa một hàm
let add = (a, b) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           if(typeof a != "number"||typeof b != "number") {
               return reject(new Error('Tham so phai la kiem number'));
           }
           resolve(a + b);
       }, 2000);
   });
};
```
Và giả sử mình muốn (4 + 5) + 6 các bạn có thể gọi hàm này một cách dễ hiểu như sau
```js
add(4, 5).then(res => add(res, 6), 
err => console.log(err + ''))
.then(result => console.log('Ket Qua: ' + result),
err => console.log(err + ''));
```

Nó cũng chẳng khác CallBack nhiều lắm nhỉ: Nếu 4 + 5 mà đúng thì chúng ta sẽ tiến hành + 6, nếu mà sai ở đâu thì bắn về error ở đấy. :D công nhận. Nhưng bây giờ thử cho đầu vào sai đi **('4' + 5) + 6** thì các bạn đoán xem kết quả là gì.  Vâng theo lý thuyết CallBack thì nó sẽ hiển thị: **'Tham so phai la kiem number'** và dừng lại đúng không ạ, nhưng thực tế nó lại hiển thị: **Error: Tham so phai la kiem number Ket Qua: undefined** Là sao nhỉ :D, sao lại có thêm đoạn **Kết Quả: undefined**,  ukm thật ra thì chắc các bạn đã biết hàm **.then()** nó sẽ luôn trả về kết quả luôn có kiểu là **promise** mà hàm **.then()** nhận được **promise** thì tiếp tục chạy thôi vì kết quả này không có gì - Hàm trước trả về một  **reject**. Và để khắc phục điều đó chúng ta có hàm **catch()** và chúng ta sẽ biên dịch lại như sau:

```js
add('4', 5).then(res => add(res, 6))
.then(result => console.log('Ket Qua: ' + result))
.catch(err => console.log('Loi: '+ err));
```

Bây giờ thì hoạt động bình thường rồi. Vậy khi dùng **promise** với **callback** thì khác nhau như thế nào, thực ra như mình thấy về mặt bản chất nó hoàn toàn không khác nhau, **promise** chỉ giúp chúng ta code dễ nhìn, tránh được **CallBack Hell**, dễ debug lỗi hơn thôi, nhưng đó là một điểm cộng lớn rồi, các bạn sẽ không muốn viết tầm vài chục cái **CallBack** và xoá từng cái err, từng cái ngoặc đâu :D.

Ok song phần bản chất và lý tưởng rồi, giờ để hiểu hơn chúng ta cùng nhau làm lại đoạn tính diện tích hình thang nào 

```js
// Định nghĩa hàm
let add = (a, b) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           if(typeof a != "number"||typeof b != "number") {
               return reject(new Error('Tham so phai la kiem number'));
           }
           resolve(a + b);
       }, 1000);
   });
};
let multiply = (a, b) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           if(typeof a != "number"||typeof b != "number") {
               return reject(new Error('Tham so phai la kiem number'));
           }
           resolve(a * b);
       }, 1000);
   });
};
let divide = (a, b) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           if(typeof a != "number"||typeof b != "number") {
               return reject(new Error('Tham so phai la kiem number'));
           }
           if(b === 0) return (new Error('Chia cho so 0'));
           resolve(a / b);
       }, 1000);
   });
};
 
//Định ngĩa hàm tính diện tích
let tinhDienTich = (a, b, h) => {
   return add(a, b)
   .then(res => multiply(res, h))
   .then(result => divide(result, 2))
};
 
// Gọi Hàm
tinhDienTich(6, 4, 5)
.then(square => console.log('Dien Tich Hinh Thang = ' + square))
.catch(err => console.log('Loi '+ err));
```

Nhìn đoạn định nghĩa tính diện tích dễ nhìn hơn nhiều rồi đúng không ạ. Nhưng thường thì các hàm như thế này sẽ được viết trong các **packet** các bạn download về rồi, các bạn đọc **document** của nó thì nó chú ý nhé. Và các bạn biết đấy, nếu trên **document** trả về kiểu **promise** thì các bạn chẳng còn cách nào khác đâu :D.
 Vì vậy thường chúng ta sử dụng thì chỉ có đoạn này thôi:
 
```js
 tinhDienTich(6, 4, 5)
.then(square => console.log('Dien Tich Hinh Thang = ' + square))
.catch(err => console.log('Loi '+ err));
```

Các bạn nhớ chú ý nó cần đầu vào là các tham số gì, kiểu dữ liệu là gì và kết quả nó trả ra nhé. 

### Một số bug nhỏ khi bạn chạy trên web có thể mắc phải: 
Đây là một số bug khi mình bắt đầu tìm hiểu về cái này thấy hơi thốn lên chia sẻ nếu anh em cần:

1, Khi các bạn bật **f12** lên sẽ thấy một **promise**  gồm: **Promise status** và **Promise value**.  **Promise status** thường sẽ có trạng thái **pending** - có thể **.then()** hay **.catch()** để xử lý, **resolve** - kết quả khi thành công, **reject** - kết quả khí thất bại. Nhưng khi các bạn cố gắng cho code chạy vào **.catch(err => 'Error' + err)** mà **Promise status** nó lại báo **resolve**!!!. 

Thực ra khi xảy ra lỗi thì nó đã được xử lý tại một function nào đấy rồi, hay có thể hiểu lỗi này **đã được kiểm soát rồi** lên trạng thái của nó là **resolve** hoàn toàn có thể hiểu được.

2, Khi  bạn viết **.then(square => console.log('Dien Tich Hinh Thanh = ' + square))** nếu bạn chạy bằng host web (**npm start**) thì sẽ báo lỗi **undefined**, thực ra lỗi này là do bạn đang **return** một **console.log**. Các bạn chỉ cần để thẳng giá trị **'Dien Tich Hinh Thanh = '** + square tương đương với viết **return 'Dien Tich Hinh Thanh = '** + square là được.

# 4. Async function - await

Async function và function khác nhau như thế nào:

```js
let addPr = (a, b) => {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           if(typeof a != "number"||typeof b != "number") {
               return reject(new Error('Tham so phai la kiem number phep cong'));
           }
           resolve(a + b);
       }, 1000);
   });
};
let add = async () => {
   let res = await addPr(4, 5);
   console.log(res);
};
 
add();
```
**let a = await aPromise** await nó sẽ dừng **async function** lại và nó sẽ chờ **Promise** trả về kết quả và gán lại cho **a** rồi ms thực hiện các công việc tiếp theo.


vậy **Async function - await** có phải để thay thế **promise** không. Câu trả lời là không và thực chất thì nó được tạo ra để hỗ trợ để viết **promise** tường minh hơn thôi. Nếu đoạn code cũ để tính diện tích hình thang có đoạn code như sau:
```js
let tinhDienTich = (a, b, h) => {
   return add(a, b)
   .then(res =>multiply(res, h))
   .then(result => divide(result, 2))
};
```
Nếu các bạn mới học react mà vào đọc ngay đoạn code này mình đoán các bạn sẽ khó mà hình dung được đoạn code này phục vụ việc gì, và các bạn cũng sẽ đặt câu hỏi thế giới nếu chúng ta sắp xếp thứ tự của đoạn code kia thì sao :D. Vậy các bạn chắc cũng thấy được hạn chế của cách viết trên rồi đúng không ạ

với **async function - await** chúng ta có thể viết lại như sau:

```js
let tinhDienTich = async (a, b, h) => {// chú ý khi sử dụng cái này cần sd try catch để bắt lỗi, nó sẽ tránh th bị thiếu lỗi
   try {
       let ab = await add(a, b);
       let abh = await multiply(ab, h);
       let squere = await divide(abh, 2);
       return Promise.resolve(squere);
   } catch (e) {
       return Promise.reject(e);
   }
};
```
thực chất đoạn code kia tương đối máy móc, vì mình đang cố cho các bạn hiểu nó hoạt động như thế nào.

# 5. Kết Luận

Đọc tới đây chắc các bạn cũng đã hình dung được async-await, promise và callback function là gì cũng như cách sử dụng, hoạt động của nó rồi đúng không ạ :D. Và chắc các bạn cũng đã hiểu và phân biệt được chúng rồi, thực ra với các tác vụ đơn giản thì chúng ta vẫn đang sử dụng callback function và bây giờ là arrow function vì sự ngắn gọn của nó. Và thực ra thì mình thấy hầu như trong một dự án chúng ta vẫn dùng **() => {}** để chạy là chính chỉ có rất ít các tags có độ phức tạp để có thể thi triển **async-await, promise** lên các bạn cố gắng tìm hiểu tất cả chúng nhé. Nếu thấy bài viết hay đừng quên để lại 1 like và comment nhé thank !!!