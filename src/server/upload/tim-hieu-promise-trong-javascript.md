Thế hệ 9x chắc ai cũng biết bài *hit* đình đám của *Ưng Hoàng Phúc* - **Hứa thật nhiều, thất hứa thì cũng thật nhiều**? Không biết có phải vì quá nổi tiếng không mà ở phiên bản **ES6**(ES2015), khái niệm *lời hứa*(promise) đã được đưa vào ECMAScript?

Ở bài viết này chúng ta cùng tìm hiểu về **Promise**. Tại sao chúng ta phải dùng promise? Và nó có lợi ích gì về *lập trình bất đồng bộ* (asynchronous) trong JavaScript? Bạn sẽ hiểu được chúng là gì, cách sử dụng và nó được dùng để thay thế cho _callbacks_ như thế nào?

## Promise là gì?

>**promise**  là một đối tượng  _sẽ trả về một giá trị trong tương lai_.

Chúng ta cùng tìm hiểu về một ví dụ thực tế để hiểu rõ hơn khái niệm về promise.

Dù cho bạn đang *FA* thì cũng hãy tưởng tượng rằng tuần sau sẽ là sinh nhật bạn gái của bạn. Tất nhiên bạn sẽ dành cho cô ấy một món quà đặt biệt, và không gì thích hợp hơn là một chiếc bánh sinh nhật. Vâng, bạn đưa ra một lời hứa *mua bánh sinh nhật*.

Trong JavaScript, một *promise* cũng tương tự vậy, nó được tạo ra như sau:

```js
// duthahoBuysCake là một lời hứa
const promise = duthahoBuysCake('bánh sinh nhật')
```
(Đừng lo lắng nếu bạn không biết tạo ra hàm `duthahoBuysCake` như thế nào, chúng ta sẽ tìm hiểu bên dưới).

Lúc đưa ra lời hứa, chúng ta chưa thực hiện nó, lúc đó lời hứa đang ở trạng thái chờ, hay `pending` trong Javascript. Bạn có thể  `console.log`  một đối tượng Promise lúc tạo ra để kiểm chứng.

![The promise is pending.](https://i.imgur.com/UqQ17oH.png)

Bạn bắt đầu lên kế hoạch, đầu tiên là nhịn ăn sáng để dành tiền, tới ngày đó thì ra tiệm bánh để chọn màu, chọn kiểu...*vân vân* *mây mây*

Nếu đến đúng ngày, bạn có đủ tiền, ra tiệm có đúng loại bánh bạn chọn, bạn quyết định mua nó, lúc này lời hứa ở trạng thái đã thực hiện, hay  `resolved`  trong Javascript. Khi promise ở trạng thái `resolved`, một hành động `.then` được gọi (quẩy thôi):

```js
duthahoBuysCake('bánh sinh nhật')
  .then(quẩy như dự định) // 123zooo! 🎉🎉🎉
```
Nhưng cuộc sống không bao giờ cũng màu hồng như thế, bạn muốn chơi lớn cho sinh nhật người yêu và làm vài con lô, thế là bay sạch cmn tiền. Cuối cùng không mua được bánh. Lúc này bạn đã thất hứa, lời hứa không thực hiện được. Trong Javascript, chúng ta gọi Promise đang ở trạng thái  `rejected`.

Khi đó, bạn thực hiện một kế hoạch dự phòng, một hành động  `.catch`  được gọi.

```js
duthahoBuysCake('bánh sinh nhật')
  .then(quẩy như dự định)
  .catch(kế hoạch dự phòng)
```

Trong Javascript thì chúng ta thường dùng Promise để `get` hoặc `update` dữ liệu. Khi promise ở trạng thái thành công `resolved`, chúng ta xử lý dự liệu với data trả về. Ngược lại khi promise thất bại `rejected`, chúng ta xử lý lỗi:

```js
getSomethingWithPromise()
  .then(data => {/* xử lý data */})
  .catch(err => {/* xử lý lỗi */})
```

Đến đây thì bạn đã hiểu promise là gì, các trạng thái của nó và cách nó hoạt động. Hãy cùng tìm hiểu cách tạo ra nó nào.

## Tạo một promise như thế nào?

Tạo một promise khá đơn giản, chỉ cần tạo mới đối tượng Promise `new Promise`. Và hàm constructor của Promise nhận 2 tham số là 2 hàm —  `resolve`  và  `reject`.

```js
const promise = new Promise((resolve, reject) => {
  /* Do something here */
})
```

Nếu hàm  `resolve`  được gọi, trạng thái của promise sẽ là thành công và hành động `.then` được gọi. Tham số bạn truyền vào hàm  `resolve`  sẽ được chuyển đến  `then`:

```js
const promise = new Promise((resolve, reject) => {
  // Note: resolve chỉ cho phép truyền đúng 1 param
  return resolve(27)
})

// Tham số  từ resolve sẽ được chuyển đến then.
promise.then(number => console.log(number)) // 27
```

Ngược lại nếu hàm  `reject`  được gọi, trạng thái của promise sẽ là thất bại và hành động  `catch` được gọi. Tương tự như `resolved` tham số được truyền vào `reject` sẽ được chuyển đến `catch`.

```js
const promise = new Promise((resolve, reject) => {
  // Note: reject chỉ cho phép truyền đúng 1 param
  return reject('💩💩💩')
})

promise.catch(err => console.log(err)) // 💩💩💩
```

Bắt đầu code thôi nào, đầu tiên tạo một promise cho `duthahoBuysCake` ở trên:

```js
const duthahoBuysCake = cakeType => {
  return new Promise((resolve, reject) => {
    // Do something here
  })
}
```

Tiếp theo, lên kế hoạch cho 1 tuần để thực hiện lời hứa. Chúng ta sẽ dùng hàm `setTimeout` để giả sử cho việc chờ đợi và lên kế hoạch:

```js
const duthahoBuysCake = cakeType => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      // mua hay không mua nói 1 lời
    }, 1000)
  })
}
```
**Note**: ở đây `setTimeout` cho 1000ms (1 giây) thôi chớ chờ 1 tuần thì người yêu nó kiếm thèn khác cmnr :cry:

Nếu sau 1 tuần bạn có đủ tiền để mua bánh, promise sẽ gọi `resolved` và trả dữ liệu `bánh sinh nhật` về cho  `then`.

Ngược lại, bạn không đủ tiền để mua bánh, promise sẽ gọi `reject` và trả dữ liệu `không đủ tiền` về cho  `catch`.

```js
let money = 1000
const duthahoBuysCake = cakeType => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      if (money > 1000) {
        resolve(cakeType)
      } else {
        reject('không đủ tiền 😢')
      }
    }, 1000)
  })
}
```

Nếu bạn thử  `console.log`  với promise dưới đây, kết quả của nó là trạng thái `pending`.

```js
const promise = duthahoBuysCake('bánh sinh nhật')
console.log(promise)
```

![The promise is pending.](https://i.imgur.com/gVh4UlD.png)


Giờ bạn hãy thử sử dụng `then` và `cactch` vào promise trên, bạn sẽ thấy kết quả là `bánh sinh nhật` hoặc `không đủ tiền` phụ thuộc vào số tiền bạn có.

Trường hợp `then`:
```js
money = 1001
const promiseSuccess = duthahoBuysCake('bánh sinh nhật')
  .then(cake => console.log(cake))
  .catch(nocake => console.log(nocake))
```

![Then case.](https://i.imgur.com/2V9ZWlF.png)

Trường hợp `catch`:

![Catch case.](https://i.imgur.com/6zy25IL.png)

Bây giờ thì bạn có thấy không khó để tạo một promise phải không? 😉.

Nhiệm vụ tiếp theo của chúng ta là trả lời câu hỏi — Tại sao promise được dùng để thay thế **callback** trong lập trình bất đồng bộ (*asynchronous JavaScript*)?

## Promises vs. Callbacks

Coder đa số là những thèn làm biếng, tôi cũng thế và chắc bạn cũng vậy. Cái gì nhanh, gọn, nhẹ thì chọn vậy thôi :). Sau đây là 3 lý do mà promise được dùng nhiều hơn là callback:

1.  Ít code lồng (nested) hơn
2.  Đọc code dễ hiểu hơn
3.  Xử lý lỗi dễ dàng hơn với `catch`

Nói nhiều làm gì, hãy đi vào ví dụ để so sánh.

Bài toán ở đây là bạn đang là chủ 1 cửa hàng bán đồ online, nghề đang hot :cry:. Khi ai đó đặt mua hàng, bạn sẽ lưu lại thông tin của họ vào database. Cuối cùng gửi email cho họ về đơn hàng thanh toán:

1.  Khách hàng đặt mua hàng
2.  Lưu lại thông tin khách hàng
3.  Gửi mail

Chúng ta lần lượt đi qua từng bước. Đầu tiên, khi khách đặt mua hàng, frontend sẽ gửi 1 request mua hàng đến backend kèm theo thông tin của khách hàng, thông thường ở đây là post request.

Ví dụ dưới đây được viết bằng Express - NodeJS framework. Nếu bạn chưa biết cũng không sao, chỉ cần quan tâm nó được viết bằng Javascript :smiley::

```js
// API dùng để frontend gửi request mua hàng đến backend.
app.post('/buy-thing', (req, res) => {
  const customer = req.body // lấy thông tin khách hàng
})
```

Ở đây bạn muốn lấy dữ liệu khách hàng, nếu thành công, bạn lưu lại thông tin vào database, và sẽ văng ra exception nếu có lỗi.

Ví dụ về sử dụng callback:

```js
// Callback based code
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  // lấy dữ liệu khách hàng
  getCustumerInfo(customer, (err, info) => {
    if (err) throw err

    // lưu thông tin xuống database
  })
})
```

Ví dụ về sử dụng promise:

```js
// Promised based code
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  getCustomerInfo(customer)
    .then(info)
    .catch(err => throw err)
})
```

Bước thứ 2 là lưu dữ liệu khách hàng xuống database, sau khi lưu thành công, bạn sẽ gửi email cho khách hàng, ngược lại, văng ra exception nếu có lỗi.

Ví dụ về sử dụng callback:

```js
// Callback based code
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  getCustomerInfo(customer, (err, info) => {
    if (err) throw err

    // lưu thông tin xuống database
    addToDatabase(info, (err, document) => {
      if (err) throw err

      // gửi email
    })
  })
})
```

Ví dụ về sử dụng promise:

```js
// Promised based code
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  getCustomerInfo(customer)
    .then(info => addToDatabase(info))
    .then(/* gửi email */)
    .catch(err => throw err)
})
```

Bước cuối cùng, khi bạn gửi email cho khách hàng thành công, bạn sẽ hiển thị thông báo cho người dùng, ngược lại, văng ra exception nếu gửi email thất bại:

Ví dụ về sử dụng callback:

```js
// Callback based code
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  getCustomerInfo(customer, (err, info) => {
    if (err) throw err

    // lưu thông tin xuống database
    addToDatabase(info, (err, document) => {
      if (err) throw err

      // gửi email
      sendEmail(customer, (err, result) => {
        if (err) throw err

        // thông báo thành công.
        res.send('success!')
      })
    })
  })
})
```

Ví dụ về sử dụng promise:

```js
app.post('/buy-thing', (req, res) => {
  const customer = req.body

  getCustomerInfo(customer)
    .then(info => addToDatabase(info))
    .then(_ => sendEmail(customer) )
    .then(result => res.send('success!')))
    .catch(err => throw err)
})
```

Chắc hẳn qua ví dụ trên thì chúng ta đã hình dung được những ưu điểm của việc dùng promise so với callback? Code ngắn gọn, flow dễ hiểu, xử lý lỗi dễ dàng hơn, và quan trọng là tránh phải `callback hell` khi dùng callback 😂.

## Xử lý nhiều lời hứa cùng lúc?

Một điểm cộng nữa của promise là chúng ta có thể thực hiện nhiều promise cùng 1 lúc mà các hoạt động của chúng ko liên quan gì với nhau, nhưng kết quả của những lời hứa đó cần thiết cho 1 hoạt động sau cùng.

Để làm được điều đó, chúng ta sử dụng hàm `Promise.all`, tham số truyền vào là 1 mảng các lời hứa (promise) cần thực hiện. Khi đó, tham số của `then` chính là 1 mảng chứa các kết quả từ các promise.

Hãy tưởng tượng bạn muốn ăn bữa tối sau khi nấu đủ 3 món: cơm, canh cá. Các hoạt động này thực hiện cùng lúc và không phụ thuộc lẫn nhau, thế nhưng bạn phải chờ cho tất cả nấu xong thì bạn mới ăn tối được:

```js
const nauComPromise = nauCom()
const nauCanhPromise = nauCanh()
const khoCaPromise = khoCa()

const anToi = Promise.all([
  nauComPromise,
  nauCanhPromise,
  khoCaPromise
])
  .then([com, canh, ca] => {
    console.log(`${com} tuyệt vời! 🍔`)
    console.log(`${canh} ngon quá! 🍟`)
    console.log(`${ca} bị cháy 🤢 `)
  })
```

(Note: ở đây còn 1 hàm `Promise.race`, nhưng hiếm khi được sử dụng, bạn có thể đọc thêm tại [đây](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

Cuối cùng, vì **promise** là tính năng mới của ES6, nên không phải tất cả browser đều hỗ trợ?

## Browser hỗ trợ Promise

Không sao, tin tốt là [promise đã được hỗ trợ hầu hết trên tất cả trình duyệt](https://kangax.github.io/compat-table/es6/)!

Nếu bạn còn xài đồ củ chuối IE11 hoặc nhỏ hơn, [Promise Polyfill](https://www.npmjs.com/package/promise-polyfill) là một sự lựa chọn thay thế!

## Túm lại

Bạn đã được học tất cả những gì về promise trong bài viết này, nó giúp chúng ta viết code 1 cách ngắn gọn và dễ hiểu hơn trong lập trình bất đồng bộ và khỏi đau đầu với `callback hell`.

Mặc dù trong bài viết chúng ta nên sử dụng **promise** để thay thế cho **callback** nhưng trong 1 số trường hợp cụ thể, callback nắm giữ 1 vai trò quan trọng. Vì thế mình sẽ viết 1 bài về callback trong thời gian tới. Mong mọi người đón đọc 😉.

Nếu bạn có câu hỏi nào hoặc ý kiến đóng ghóp, comment bên dưới! Đừng quên sharing dùm mình nhé :+1: 

Ghé [blog](http://duthaho.com) của mình để đọc thêm nhiều bài khác!