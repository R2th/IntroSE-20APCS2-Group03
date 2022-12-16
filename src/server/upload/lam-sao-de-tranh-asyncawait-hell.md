Ai đã/đang là Javascript developer chắc ko còn lạ gì các khái niệm `Callback Hell`, `Promise Hell` khi phải xử lý các vấn đề liên quan đến đồng bộ/bất đồng bộ. Với việc `Async/Await` được giới thiệu ở ES7, liệu có tồn tại 1 thứ gọi là `Async/Await Hell` hay không, hãy cùng tham khảo bài viết sau nhé.

![async_await_hell_1](https://images.viblo.asia/8082bd40-6fa2-40f4-9d11-782ccc107727.png)

## Async/Await Hell là gì ?

Trong lúc làm việc với Asynchronous JavaScript, nhiều người thường xuyên viết rất nhiều statements liên tiếp và quăng `await` ở mỗi lần gọi function.

Sự lạm dụng này khiến performance bị ảnh hưởng, khi có nhiều statement ko phụ thuộc vào cái khác nhưng vẫn cứ phải đợi cái kia xong xuôi mới được thực thi.

## Ví dụ về Async/Await Hell

Giờ chúng ta sẽ viết code để đặt pizza và đồ uống cho tối nay, sử dụng `async/await`:

```js
(async () => {
  const pizzaData = await getPizzaData()    // async call
  const drinkData = await getDrinkData()    // async call
  const chosenPizza = choosePizza()    // sync call
  const chosenDrink = chooseDrink()    // sync call
  await addPizzaToCart(chosenPizza)    // async call
  await addDrinkToCart(chosenDrink)    // async call
  orderItems()    // async call
})()
```

Code hoạt động bình thường, không có lỗi gì cả. Tuy vậy, việc loại bỏ hoàn toàn tính đồng bộ như đoạn code trên, liệu có thực sự hợp lý hay không?

### Giải thích code

Các công việc sẽ được thực hiện theo đúng thứ tự sau:

1. Lấy danh sách các loại pizza.
2. Lấy danh sách các loại đồ uống.
3. Chọn 1 loại pizza từ danh sách đã lấy ra ở bước 1.
4. Chọn 1 loại đồ uống từ danh sách đã lấy ra ở bước 2.
5. Đưa pizza đã chọn ở bước 3 vào giỏ hàng.
6. Đưa đồ uống đã chọn ở bước 4 vào giỏ hàng.
7. Thực hiện đặt hàng với các đồ trong giỏ.

### Vấn đề ở đâu

Mặc dù mọi thứ có vẻ như đang rất hợp logic với cách thực hiện tuần tự từng công việc một, nhưng nếu chúng ta nghĩ kỹ hơn sẽ thấy có vài vấn đề trong đó.

Tại sao chúng ta phải đợi có danh sách các loại pizza rồi mới lấy danh sách các loại đồ uống? 

Tại sao chúng ta phải đợi chọn xong đồ uống mới có thể đưa pizza vào giỏ hàng?

Rõ ràng chúng ta chỉ có thể chọn được pizza sau khi có được danh sách các loại pizza, tuy nhiên những công việc liên quan đến đồ uống thì chả hề phụ thuộc vào pizza, và chúng nên được thực hiện song song thì tốt hơn.

### Tiếp tục lạm dụng async/await nào

Giờ chúng ta sẽ lấy các đồ trong giỏ ra và thực hiện request để đặt hàng.

```js
async function orderItems() {
  const items = await getCartItems()    // async call
  const noOfItems = items.length
  for(var i = 0; i < noOfItems; i++) {
    await sendRequest(items[i])    // async call
  }
}
```

Ở đoạn code trên, để vòng tiếp theo có thể chạy tiếp thì `sendRequest()` phải được hoàn thành. Tuy nhiên, chúng ta có thể gửi tất cả các requests càng nhanh càng tốt và đợi tất cả chúng kết thúc, chứ không cần phải đợi từng request một làm gì.

Đến đây mọi người chắc cũng hiểu được `Async/Await Hell` mà tôi nhắc đến là gì rồi. Đó là việc sử dụng `async/await` bừa bãi khiến performance của chương trình bị ảnh hưởng.

## Điều gì xảy ra khi quên sử dụng Await

Nếu chúng ta quên ko sử dụng `await` khi gọi 1 async function thì function đấy sẽ được thực thi ngay. Lúc này, async function sẽ trả về 1 promise để bạn sử dụng.

```javascript
(async () => {
  const value = doSomeAsyncTask()
  console.log(value) // an unresolved promise
})()
```

Ngoài ra, compiler sẽ không biết được việc bạn cần đợi các async tasks kết thúc hoàn toàn, nên sẽ exit chương trình mà ko để ý đến điều đó. Vì vậy, chúng ta cần sử dụng `await`.

Một trong những điều thú vị của `promise` là bạn có thể get promise ở 1 dòng, và đợi nó hoàn thành ở dòng khác. Đây là chìa khoá để thoát khỏi `Async/Await Hell`.

```js
(async () => {
  const promise = doSomeAsyncTask()
  const value = await promise
  console.log(value) // the actual value
})()
```

Như các bạn thấy, `doSomeAsyncTask()` trả lại 1 promise. Ở thời điểm đó, `doSomeAsyncTask()` mới bắt đầu được thực thi. Để lấy được dữ liệu đã được xử lý của promise, chúng ta sử dụng `await` ở dòng tiếp theo, để Javascript ko chạy `console.log()` trước khi có được value từ promise.

## Tránh Async/Await Hell bằng cách nào?

Hãy thực hiện những bước sau đây:

### Tìm các statements phụ thuộc vào statements khác

Quay lại với ví dụ đầu tiên, chúng ta cần đặt hàng pizza và đồ uống.

Trước khi chọn pizza, chúng ta phải có danh sách các pizzas. Và trước khi đưa pizza vào giỏ hàng, chúng ta cần phải chọn pizza rồi. Vậy 3 hành động trên có phụ thuộc với nhau, chúng ta không thể bắt đầu cái sau nếu chưa hoàn thành cái trước.

Tuy vậy,  việc chọn đồ uống lại không phụ thuộc vào việc chọn pizza, thế nên cần được thực hiện song song. Đây chính là sức mạnh đặc trưng của máy tính mà chúng ta có thể khai thác.

### Gộp các statements phụ thuộc nhau vào các async functions

Như trên, chúng ta sẽ gộp 3 việc: lấy danh sách các pizzas, chọn pizza, đưa pizza vào giỏ hàng vào một async function, ví dụ là `selectPizza()`.

Tương tự với đồ uống, chúng ta có `selectDrink()`.

### Thực thi song song các async functions

Bây giờ, chúng ta chỉ việc thực thi các async functions một cách song song để có được performance tốt nhất.

Thông thường có 2 cách, đó là `trả lại Promises sớm` và `sử dụng hàm Promise.all()`.

Thử áp dụng với ví dụ đầu tiên:

**Trả lại Promises sớm**

```js
async function selectPizza() {
  const pizzaData = await getPizzaData()    // async call
  const chosenPizza = choosePizza()    // sync call
  await addPizzaToCart(chosenPizza)    // async call
}

async function selectDrink() {
  const drinkData = await getDrinkData()    // async call
  const chosenDrink = chooseDrink()    // sync call
  await addDrinkToCart(chosenDrink)    // async call
}

(async () => {
  const pizzaPromise = selectPizza()
  const drinkPromise = selectDrink()
  await pizzaPromise
  await drinkPromise
  orderItems()    // async call
})()
```

**Sử dụng hàm Promise.all()**

```javascript
Promise.all([selectPizza(), selectDrink()]).then(orderItems)   // async call
```

Với ví dụ thứ hai, gửi request đặt hàng, chúng ta phải xử lý với vấn đề không biết số lượng promises là bao nhiêu. Tạo 1 array rồi push các promises vào đó, sau đó sử dụng `Promise.all()` là 1 trong những phương pháp dễ hiểu nhất.

```js
async function orderItems() {
  const items = await getCartItems()    // async call
  const noOfItems = items.length
  const promises = []
  for(var i = 0; i < noOfItems; i++) {
    const orderPromise = sendRequest(items[i])    // async call
    promises.push(orderPromise)    // sync call
  }
  await Promise.all(promises)    // async call
}
```

hoặc

```javascript
async function orderItems() {
  const items = await getCartItems()    // async call
  const promises = items.map((item) => sendRequest(item))
  await Promise.all(promises)    // async call
}
```

Done. Từ giờ đừng để `Async/Await Hell` có thể khiến performance chương trình của bạn bị ảnh hưởng nữa nhé !!

***
**Source**: *[How to escape async/await hell](https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c)*