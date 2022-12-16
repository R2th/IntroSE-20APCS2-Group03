Bài viết đc dịch lại từ: https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c


async/await ra đời giúp chúng ta khỏi cảnh callback hell, nhưng nhiều người lại bắt đầu abuse nó, dẫn tới sự phát sinh ra async/await hell.

Trong bài viết này, tôi sẽ giải thích async/await hell là gì và chia sẻ một số cách để thoát khỏi nó.

### async/await hell là gì?

Khi làm việc với asynchronous javascript, nhiều người viết từng statement tuần tự, rồi sau đó thêm mới await vào trc' function call. Điều này dẫn đến những vấn đề về hiệu năng, vì nhiều khi, một statement ko hề phụ thuộc vào statement khác để có thể chạy, nhưng nó vẫn phải đợi cho statement trc' hoàn thành rồi mới bắt đầu chạy.
### Một ví dụ của async/await hell

Giả sử bạn viết một đoạn code để order pizza và đồ uống. Đoạn code trông thế này:
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
Nhìn qua thì nó có vẻ đúng, và nó chạy. Tuy nhiên đây ko phải là một cách làm hay, bởi vì nó ko tận dùng đc concurrency. Hãy đi vào chi tiết xem nó có vấn đề gì

#### Giải thích

Đoạn code trên chạy theo thứ tự sau:
1. Lấy list những pizza
2. Lấy list đồ uống
3 .Chọn một pizza từ list
4 .Chọn một đồ uống từ list
5. Thêm cái pizza đc chọn vào cart
6. Thêm đồ uống đc chọn vào cart
7. Order những thứ trong cart.

#### Thế thì có vấn đề gì?

Như tôi đã nói ở trên, tất cả các statement chạy từng cái một, ko có một chút concurrency nào cả. Tại sao chúng ta lại phải đợi lấy list pizza trc' khi lấy list đồ uống? Chúng ta nên lấy cả 2 list cùng lúc mới đúng. Tuy nhiên, khi chúng ta chọn một pizza, chúng ta phải cần có list pizza trc'. Tương tự như đối với đồ uống.
Vậy đi đến kết luận là việc liên quan đến pizza và việc liên quan đến đồ uống có thể xảy ra song song, tuy nhiên từng bước cụ thể trong từng việc thì phải xảy ra theo thứ tự trc' sau.

#### Một ví dụ khác
Đoạn code sau sẽ lấy ra tất cả item từ cart và đặt yêu cầu order nó.
```js
async function orderItems() {
  const items = await getCartItems()    // async call
  const noOfItems = items.length
  for(var i = 0; i < noOfItems; i++) {
    await sendRequest(items[i])    // async call
  }
}
```
Trong trường hợp này, vòng lặp for phải đợi cho sendRequest() hoàn thành rồi mới chạy tới vòng lặp tiếp theo. Nhưng chúng ta đâu cần phải đợi như thế. Chúng ta cần gửi tất cả request càng nhanh càng tốt và đợi tất cả chúng đều hoàn thành.
Tôi hy vọng là bạn đã hiểu về async/await hell và tại sao nó lại ảnh hưởng đến hiệu năng của app. Vậy giờ tôi muốn hỏi một câu.

#### Chuyện gì sẽ xảy ra nếu chúng ta quên ko thêm await

Nếu bạn quên thêm await trc' khi gọi async function, function đó vẫn sẽ chạy. Điều này chứng tỏ await ko phải yêu cầu bắt buộc để function nó chạy. Function đó sẽ trả về một promise để bạn dùng về sau.
```js
(async () => {
  const value = doSomeAsyncTask()
  console.log(value) // an unresolved promise
})()
```
Hậu quả của điều này là compiler ko rằng bạn muốn đợi cho function đó chạy xong hoàn toàn. Do vậy compiler sẽ thoát ứng dụng trc' khi hàm async của bạn hoàn thành. Do vậy, chúng ta vẫn cần await.

Một điều thú vị của promise là chúng ta có thể gọi promise ở một chỗ và đợi nó ở chỗ khác. Đây chính là chìa khóa để thoát khỏi async/await hell.

```js
(async () => {
  const promise = doSomeAsyncTask()
  const value = await promise
  console.log(value) // the actual value
})()
```
Như bạn thấy doSomeAsyncTask() trả về một promise. Ở thời điểm này, doSomeAsyncTask() đã bắt đầu chạy. Để lấy đc giá trị đạ resolved của promise, chúng ta dùng keyword await để báo với javascript là đừng chạy xong tiếp theo ngay lập tức, mà hãy đợi cho promise đc resolve rồi hãy chạy.

### Làm sao để thoát khỏi async/await hell ?
Bạn nên làm theo những bước sau để thoát khỏi async/await hell

#### Tìm những statement mà phụ thuộc vào kết quả của những statement khác

Ở ví dụ đầu tiên, chúng ta chọn pizza và đồ uống. Trc' khi chọn đc pizza, chúng ta phải có list pizza, và trc' khi thêm pizza vào cart, chúng ta phải chọn đc pizza. Chúng ta có thể kết luận rằng, 3 bước đó phụ thuộc vào nhau. Chúng ta ko thể làm một bước trc' khi bước trc' đó đc hoàn thành.
Nhưng nếu nhìn rộng hơn, chúng ta có thể thấy rằng việc chọn pizza hoàn toàn chẳng liên quan gì đến chọn đồ uống, và có thể đc thực hiện song song. 
Do vậy, chúng ta tìm ra được một vài statement phụ thuộc vào nhau, một vài thì cái khác thì ko.

#### Nhóm các statement phụ thuộc nhau vào một async function
Việc chọn pizza bao gồm cả những statement phụ thuộc nó như lấy list pizza, chọn một cái và cho vào cart. Chúng ta nên nhóm các statement đó vào một async function. Với cách này, chúng ta có 2 async function selectPizza() và selectDrink()

#### Chạy các function đó một cách đồng thời (concurrent)
Chúng ta tận dụng event loop để chạy những async function đó một cách đồng thời. Hai pattern phổ biến để làm việc này là return promise early và hàm Promise.all

#### Sửa ví dụ trên nào
Áp dụng 3 bước trên vào ví dụ ban đầu.

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

// Hoặc

(async () => {
  Promise.all([selectPizza(), selectDrink()]).then(orderItems)   // async call
})()
```

Hiện giờ, chúng ta đã nhóm những statement đó vào hai function. Trong function, từng statement phụ thuộc vào kết quả của cái trc' nó. Sau đó ta thực hiện selectPizza() và selectDrink() một cách đồng thời.

Trong ví dụ thứ 2, chúng ta cần phải xử lý một lượng promise bất kì. Xử lý trường hợp này lại rất dễ: chỉ việc tạo một mảng các promise, sau đó dùng Promise.all() để chạy chúng.

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

// Hoặc

async function orderItems() {
  const items = await getCartItems()    // async call
  const promises = items.map((item) => sendRequest(item))
  await Promise.all(promises)    // async call
}
```

Tôi hy vọng bài viết này sẽ giúp các bạn có cái nhìn sâu hơn về async/await, và đồng thời giúp cải thiện hiệu năng ứng dụng của các bạn.