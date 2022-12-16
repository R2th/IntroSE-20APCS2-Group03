## Giới thiệu


![](https://images.viblo.asia/097f59df-4a7c-4c4e-acbd-21499d8e56fb.png)

Node.js đã hỗ trợ async/await kể từ phiên bản 7.6 và hiện nay đã được hỗ trợ trên hầu hết các trình duyệt hiện đại. Nếu bạn chưa sử dụng chúng, bài viết này sẽ liệt kê 7 lí do tại sao bạn nên sử dụng nó. 


## Async/await 101

Với những ai chưa hề nghe về `Async/await` thì bên dưới sẽ giới thiệu 1 cách ngắn gọn :
* Async/await là một cách mới để viết code bất đồng bộ. Trước đây, việc xử lý bất đồng bộ thường sử dụng callback và promise.
* Async/await thực chất chỉ là cú pháp được xây dựng dựa trên `promises`. Nó không thể sử dụng với callback thuần.
* Async/await cũng tương tự như promise : `non-blocking`.
* Async/await giúp ta viết code trông có vẻ đồng bộ, nhưng thật ra là bất đồng bộ :laughing: 

## Cú pháp

Giả sử ta có function `getJson` trả về một promise, và promise đó chứa một vài JSON object. Ta thực hiện gọi hàm và log JSON đó ra, sau đó return `done`.

Đoạn code bên dưới chỉ ra cách bạn implement nó bằng promise :

~~~javascript
const makeRequest = () =>
  getJSON()
    .then(data => {
      console.log(data)
      return "done"
    })

makeRequest()
~~~

Với async/await, nó trông như này : 

~~~javascript

const makeRequest = async () => {
  console.log(await getJSON())
  return "done"
}
~~~

Có 1 vài điểm khác biệt ở đây bạn cần biết:

1. Hàm có thêm từ khóa `async` phía trước. Từ khóa `await` chỉ được sử dụng bên trong hàm được xác định bởi async. Bất kì hàm `async` nào cũng trả về 1 promise  ngầm, và giá trị của promise là bất cứ cái gì bạn return ( trong trường hợp này là chuỗi "done")

2. Nhận xét trên cũng đồng nghĩa với việc ta không thể sử dụng `await` phía trước đoạn code chứa từ khóa async.

~~~javascript
// this will not work in top level
// await makeRequest()

// this will work
makeRequest().then((result) => {
  // do something
})
~~~

3. Cụm `await getJSON()` có nghĩa là lời gọi `console.log` sẽ chờ đến khi `getJSON()` được xử lý và trả về giá trị.

## Tại sao async/await tốt hơn ?

#### 1. Code ngắn gọn và clean hơn

Rõ ràng bạn đã tiết kiệm đi đáng kể số lượng code cần phải viết. Trong ví dụ trên, ta không cần viết `.then`, tạo 1 anonymous function để xử lý response, hay  đặt tên data cho một biến mà không sử dụng. Ta tránh được các khối code lồng nhau. Những lợi ích nho nhỏ này sẽ tích dần khi dự án scale lên, nó sẽ trở nên rất đáng giá.

#### 2. Xử lý lỗi
Async/await giúp ta xử lý cả error đồng bộ lẫn error bất đồng bộ theo cùng 1 cấu trúc. Say goodbye với `try/catch`. Với đoạn code dưới dùng promise, try/catch sẽ không bắt được lỗi nếu hàm `JSON.parse()` lỗi, do xảy ra bên trong promise. Ta cần gọi `.catch` bên trong promise và lặp lại code xử lý error, điều mà chắc chắn sẽ trở nên rắc rối hơn cả console.log trong đoạn code production.
~~~javascript
const makeRequest = () => {
  try {
    getJSON()
      .then(result => {
        // this parse may fail
        const data = JSON.parse(result)
        console.log(data)
      })
      // uncomment this block to handle asynchronous errors
      // .catch((err) => {
      //   console.log(err)
      // })
  } catch (err) {
    console.log(err)
  }
}
~~~

Giờ hãy cùng nhìn xem cách mà async/await xử lý :
~~~javascript
const makeRequest = async () => {
        try {
                // this parse may fail
                const data = JSON.parse(await getJSON())
                console.log(data)
        } catch (err) {
                console.log(err)
        }
}
~~~

#### 3. Câu lệnh điều kiện

Đoạn code bên dưới sẽ fetch dữ liệu và quyết định trả về dữ liệu hay lấy thêm dữ liệu :

~~~javascript
const makeRequest = () => {
  return getJSON()
    .then(data => {
      if (data.needsAnotherRequest) {
        return makeAnotherRequest(data)
          .then(moreData => {
            console.log(moreData)
            return moreData
          })
      } else {
        console.log(data)
        return data
      }
    })
}
~~~

Chỉ nhìn thôi đã thấy đau đầu rồi, Nó rất dễ bị rối nếu lồng quá nhiều. Giờ khi sử dụng async/await :

~~~javascript

const makeRequest = async () => {
  const data = await getJSON()
  if (data.needsAnotherRequest) {
    const moreData = await makeAnotherRequest(data);
    console.log(moreData)
    return moreData
  } else {
    console.log(data)
    return data    
  }
}
~~~
Clear hơn rất nhiều phải không nào :+1:

#### 4. Các giá trị trung gian

Chắc hẳn bạn đã từng gặp case khi call một `Promise1` sau đó sử dụng kết quả của nó để call `Promise2`, rồi lại sử dụng kết quả của cả 2 promise để call `Promise3`. Nó sẽ trông như này :

~~~javascript
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return promise2(value1)
        .then(value2 => {
          // do something          
          return promise3(value1, value2)
        })
    })
}
~~~
Nếu promise3 không yêu cầu tham số value1, promise sẽ bớt lồng đi 1 chút. Để tránh các lớp lồng như trường hợp trên, bạn có thể wrap cả 2 giá trị value1 và value2 bằng `Promise.all` :

~~~javascript
const makeRequest = () => {
  return promise1()
    .then(value1 => {
      // do something
      return Promise.all([value1, promise2(value1)])
    })
    .then(([value1, value2]) => {
      // do something          
      return promise3(value1, value2)
    })
}
~~~
Cách tiếp cận này hi sinh ngữ nghĩa vì mục đích dễ đọc. Không có lý do gì value1 và value2 đặt chung vào 1 mảng cả, ngoại trừ việc tránh nest promise.

Logic tương tự này trở nên vô cùng đơn giản và trực quan hơn với async/await.
~~~javascript
const makeRequest = async () => {
  const value1 = await promise1()
  const value2 = await promise2(value1)
  return promise3(value1, value2)
}
~~~

#### 5. Error Stack

Hãy tưởng tượng một đoạn code call nhiều Promise theo một chain, và ở đâu đó trong chuỗi một error được thrown.

~~~javascript

const makeRequest = () => {
  return callAPromise()
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => callAPromise())
    .then(() => {
      throw new Error("oops");
    })
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at callAPromise.then.then.then.then.then (index.js:8:13)
  })
  ~~~
Error stack trả về từ promise chain không cho phép ta xác định error xảy ra từ đâu. Tệ hơn, nó còn khiến ta hiểu lầm rằng lỗi nằm ở hàm `callAPromise`.

Với async/await, error stack sẽ chỉ ra được hàm nào chứa lỗi 

~~~javascript
const makeRequest = async () => {
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  await callAPromise()
  throw new Error("oops");
}

makeRequest()
  .catch(err => {
    console.log(err);
    // output
    // Error: oops at makeRequest (index.js:7:9)
  })
  ~~~
  
Khi phát triển trên môi trường local, điều này có vẻ không có quá nhiều tác dụng, nhưng trên môi trường production, nó tỏ ra rất có ích với error log. Khi đó bạn sẽ biết được error xảy ra trong  `makeRequest` sẽ tốt hơn nhiều khi được báo rằng lỗi đén từ `.then.then.then....`

#### 6. Debug

Khi làm việc với async/await, debug trở nên rất đơn giản. Với promise, việc debug sẽ khá khó khăn bởi 2 lý do sau :

* Bạn không thể đặt breakpoint trong arrow function trả về expression.
![](https://images.viblo.asia/0b1e3a83-4486-4697-bc09-877e81ac5768.png)

* Nếu bạn đặt breakpoint bên trong khối `.then` và sử dụng debug như `step-over`, trình debug sẽ không chuyển đến khối `.then` kế tiếp vì nó chỉ `"step"` ở các đoạn code đồng bộ. Với async/await, bạn không cần sử dụng arror function quá nhiều, hoàn toàn có thể `"step"` qua lời gọi await y như code đồng bộ.
![](https://images.viblo.asia/77f1122b-7973-4e91-8e30-0350688868e4.png)

#### 7. Await bất cứ thứ gì

Await có thể sử dụng cho cả biểu thức đồng bộ và bất đồng bộ. Ví dụ, bạn có thể viết :
~~~javascript
await 5
// equivalent with
Promise.resolve(5)
~~~
Nhìn có vẻ không có ích gì nhưng đây là một lợi thế lớn khi viết các library hoặc các utility funcion mà bạn không biết input đầu vào là đồng bộ hay bất đồng bộ. 

Hãy tưởng tượng bạn muốn record lại thời gian thực hiện 1 số API call trong app, và bạn quyết định tạo một generic function để giải quyết vấn đề này. Với promise, nó sẽ trông như bên dưới :

~~~javascript
const recordTime = (makeRequest) => {
  const timeStart = Date.now();
  makeRequest().then(() => { // throws error for sync functions (.then is not a function)
    const timeEnd = Date.now();
    console.log('time take:', timeEnd - timeStart);
  })
}
~~~

Ta đều biết rằng API call sẽ trả về các promise, nhưng chuyện gì xảy ra nếu bạn sử dụng cùng function để record thời gian trong function đồng bộ hóa ? Nó sẽ ném ra một error bởi function đồng bộ không trả về 1 promise.  Cách thông thường để tránh điều này là wrap makeRequest() vào Promise.resolve().
Nếu sử dụng async/await. Bạn sẽ không phỉa lo về những vấn đề này bởi await cho phép bạn thực hiện công việc an toàn với bất kì value nào dù là promise hay không :+1:

~~~javascript
const recordTime = async (makeRequest) => {
  const timeStart = Date.now();
  await makeRequest(); // works for any sync or async function
  const timeEnd = Date.now();
  console.log('time take:', timeEnd - timeStart);
}
~~~

## Kết luận

Async/await là một trong những tính năng nổi bật được thêm vào Javascript trong vài năm qua. Hi vọng qua bài viết này mọi người có thể thấy được sức mạnh của nó và tận dụng một cách đúng đắn. 

Happy coding :+1:

Reference : https://dev.to/gafi/7-reasons-to-always-use-async-await-over-plain-promises-tutorial-4ej9