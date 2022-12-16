Để bắt đầu, hãy xem đoạn code sau:
```
result1 = doSomething1();
result2 = doSomething2(result1);
```

Hầu hết ngôn ngữ lập trình đều xử lý từng dòng một cách đồng bộ. Dòng đầu tiên chạy và trả về kết quả, sau đó dòng thứ 2 chỉ chạy khi dòng thứ 1 chạy xong (và cho ra kết quả). 

JavaScript chạy trên một thread. Khi trình duyệt thực thi một sự kiện nào đó thì mọi thứ khác bị ngừng lại, người dùng sẽ khó mà phát hiện vì quá trình xử lý cực kỳ nhanh. Chẳng hạn JavaScript detect một click vào button, tính toán, update DOM. Mỗi khi xong thì trình duyệt sẽ xử lý item kế tiếp trong hàng đợi.

### Callbacks
Vậy vấn đề ở đây là gì? Tưởng tượng khi JavaScript gọi một process mất cực kỳ nhiều thời gian như Ajax hoặc xử lý database? Thao tác này có thể mất nhiều giây, hoặc thậm chí cả phút. Và trình duyệt sẽ bị khóa khi nó đang chờ `response`, tức là không thể xử lý thêm request của người dùng trong khoảng thời gian đó.

Giải pháp ở đây là xử lý bất đồng bộ. Trong JavaScript, khi một thao tác bất đồng bộ có kết quả (kết quả này có thể là dữ liệu trả về hoặc lỗi xảy ra khi thao tác), nó sẽ gọi một function mỗi khi kết quả sẵn sàng, function này được gọi là "callback". Trong khi đó JavaScript tiếp tục thực thi bình thường. Bạn có thể thấy các framework thường có APIs mà bạn có thể thêm callback function để thực thi sau khi gọi. Đăng ký một `event listener` trong browser với `addEventListener`, đọc nội dung file với `fs.readFile` hoặc đăng ký middleware trong express web server với `server.use` là ví dụ của những APIs mà sử dụng callback.

Đây là ví dụ lấy dữ liệu từ một URL sử dụng module `request`:

```
const request = require(‘request’);
request('https://www.somepage.com', function (error, response, body) {
  if(error){
    // Handle error.
  }
  else {
    // Successful, do something with the result.
  }
});
```

Ta có thể viết lại nó như sau:
```
const request = require(‘request’);
function handleResponse(error, response, body){
    if(error){
        // Handle error.
    }
    else {
        // Successful, do something with the result.
    }
}
request('https://www.somepage.com', handleResponse);
```

Như bạn thấy, `request` lấy function `handleResponse` làm tham số cuối cùng. Function này không được thực thi ngay. Nó được lưu lại và sẽ thực thi khi thao tác lấy dữ liệu từ url hoàn thành. 


### Callback hell
Xem đoạn code sau:
```
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

Khi ta có `callback` lồng trong `callback` như thế này, đoạn code trở nên khó đọc và rất loạn, nó được gọi là `callback hell`. Điều này xảy ra khi nhiều người muốn viết JavaScript theo cách xử lý tuần tự từ trên xuống dưới, tuy nhiên đó lại là sai lầm dẫn đến đoạn code rất rối.

### Promises

Vậy làm sao để xử lý khi gặp `callback hell`? ES2015 (ES6) giới thiệu Promises. Callbacks vẫn được sử dụng, nhưng Promises cung cấp một cú pháp rõ ràng hơn để `chain` các câu lệnh bất đồng bộ.

Để tạo một Promise, ta dùng đoạn code sau:
```
const myPromise = new Promise(function(resolve, reject) {
  
  // code here
  
  if (codeIsFine) {
    resolve('fine')
  } else {
    reject('error')
  }
})
myPromise
  .then(function whenOk(response) {
    console.log(response)
    return response
  })
  .catch(function notOk(err) {
    console.error(err)
  })
```
Hãy phân tích đoạn code trên:
- Một promise được khởi tạo với một function có câu lệnh `resolve` hoặc `reject`
- Đặt đoạn code bất đồng bộ trong function Promise
`resolve` khi mọi thứ xảy ra như mong muốn
Nếu không thì `reject`
- Khi `resolve` được chạy thì đoạn code trong `.then` sẽ thực thi
Khi `reject` được chạy thì `.catch` sẽ được trigger

### Asynchronous Chaining
Thay vì lồng `callback` trong `callback` như trên (`callback hell`), bạn có thể dùng `.then` để chain, tạo thành đoạn code dễ đọc và dễ follow hơn. Mỗi `.then` nên trả về một Promise. Và một điều quan trọng cần nhớ là dù chúng ta gọi nhiều request bất đồng bộ thì cũng chỉ có một `.catch` để xử lý toàn bộ error. Lý do là nếu một lỗi xảy ra thì đoạn Promise chain sẽ ngừng thực thi và nhảy vào `.catch`.

Xem đoạn code sau:
```
asyncDBconnect('http://localhost:1234')
  .then(asyncGetSession)      // passed result of asyncDBconnect
  .then(asyncGetUser)         // passed result of asyncGetSession
  .then(asyncLogAccess)       // passed result of asyncGetUser
  .then(result => {           // non-asynchronous function
    console.log('complete');  //   (passed result of asyncLogAccess)
    return result;            //   (result passed to next .then())
  })
  .catch(err => {             // called on any reject
    console.log('error', err);
  });
```

Một lưu ý là dù trông dễ đọc hơn thì bản chất của nó vẫn là thao tác bất đồng bộ. Đoạn code được thực thi khi request hoàn thành - tức là đoạn gọi `.then()` tuần tự ấy - được đặt trong vòng lặp sự kiện cũng giống như `callback`. Tóm lại nghĩa là bạn không thể truy xuất biến được truyền hoặc khai báo trong Promise chain ngoài phạm vi Promise. Điều này cũng đúng cho `error handling`. Bạn phải có ít nhất một `.catch()` ở cuối Promise chain để bắt lỗi. Nếu không thì bất kỳ lỗi nào xảy ra đều sẽ bị bỏ qua.

Hơi khó hiểu nhỉ, hãy xem đoạn code sau nhé, bắt lỗi kiểu này là sai:

```
try{
    axios.get(‘http://www.somepage.com')
    .then(function response {
        // Handle response
    })
} catch (error){
    // Dù đoạn Promise chain ở phía trên có lỗi thì cũng không bao giờ vào đây
}
```

### Async/Await
Promises có thể hơi khó nhằn, nên ES2017 giới thiệu `async` và `await`, nó giúp Promise trông đơn giản hơn, tránh được chain `.then()` dài dằng dặc.

Async/Await là bước kế tiếp trong công cuộc xử lý thao tác bất đông bộ trong JavaScript. Nó cho bạn 2 từ khóa mới là: `async` và `await`. `Async` sẽ thông báo rằng function sẽ xử lý bất đồng bộ, và `await` sẽ được dùng để báo chúng ta muốn đợi kết quả của thao tác bất đồng bộ trong một function có đánh dấu `async`.

Ví dụ cơ bản:
```
async function getSomeAsyncData(value){
    const result = await fetchTheData(someUrl, value);
    return result;
}
```
Lưu ý là chỉ dùng được `await` trong function có từ khóa `async` ở phía trước:

```
function justANormalFunction(value){
    // function này sẽ sinh lỗi cú pháp vì thiếu khai báo từ khóa `async`
    const result = await fetchTheData(someUrl, value);
    return result;
}
```

Ta chỉ await được những function trả về một Promise hoặc nó có khai báo `async`. 

```
function fetchTheData(someValue){
    return new Promise(function(resolve, reject){
        getData(someValue, function(error, result){
            if(error){
                reject(error);
            }
            else{
                resolve(resutl);
            }
        })
    });
}
async function getSomeAsyncData(value){
    const result = await fetchTheData(value);
    return result;
}
```

Và giờ đây, ta có thể dùng await để viết code trông dễ đọc hơn. Thay vì
```
function printAll(){
  printString("A")
  .then(() => printString("B"))
  .then(() => printString("C"))
}
printAll()
```
ta có thể tận dụng await như sau:
```
async function printAll(){
  await printString("A")
  await printString("B")
  await printString("C")
}
printAll()
```
Nhớ là phải khai báo `async` trước function `printAll()`.

### Error handling với async/await
Bạn còn nhớ đoạn code mà tôi bảo là không trong phạm vi của Promise chain thì ta không thể bắt lỗi không? Với `async/await` thì trong phạm vi của function được khai báo `async`, bạn có thể dùng `try/catch` để bắt lỗi.

```
async function getSomeData(value){
    try {
        const result = await fetchTheData(value);
        return result;
    }
    catch(error){
        // Handle error
    }
}
```
Và cũng lưu ý luôn là chỉ cần một `.catch()` là đủ, dù bạn có gọi nhiều `await` trong block `try` đi chăng nữa, chẳng hạn:

```
async function fetchTheFirstData(value){
    return await get("someUrl", value);
}
async function fetchTheSecondData(value){
    return await getFromDatabase(value);
}
async function getSomeData(value){
    try {
    const firstResult = await fetchTheFirstData(value);
        const result = await fetchTheSecondData(firstResult.someValue);
        return result;
    }
    catch(error){
        // error của bất cứ await nào cũng sẽ vào đây
    }
}
```

### Tổng kết
Async/await có thể giúp đoạn code bất đồng bộ trông có vẻ như là "đồng bộ", nhưng thực tế nó vẫn thực thi tương tự như cách ta sử dụng `callback` hay `promise`. Đó là vì `async` và `await` chỉ là cách viết gọn hơn để tạo, trả về và resolve Promise mà thôi. Thế nên trước khi sử dụng async/await, hãy tìm hiểu về `callback` và `promise` trước đã thì tốt hơn.

Tham khảo:
- [https://medium.freecodecamp.org/javascript-from-callbacks-to-async-await-1cc090ddad99](https://medium.freecodecamp.org/javascript-from-callbacks-to-async-await-1cc090ddad99)
- [https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee](https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee)
- [Callback Hell](http://callbackhell.com)
- [https://www.sitepoint.com/flow-control-callbacks-promises-async-await/](https://www.sitepoint.com/flow-control-callbacks-promises-async-await/)