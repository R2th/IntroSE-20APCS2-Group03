## Đặt vấn đề
Javascript là một ngôn ngữ `đơn luồng` (`single thread`- chỉ thực hiện một việc tại một thời điểm) và đồng bộ (`synchronous`). 
<br/>
Nhưng quả thật khi phát triển một trang web ta luôn phải đối mặt xử lý những tác vụ bất đồng bộ `async` *( xử lý event như click, mouse, scroll, …hay AJAX call để lấy dữ liệu từ backend)* và đôi khi chúng ta cần đa luồng (dữ liệu lớn, ví dụ 10000 items trong một mảng gây ra hiện tượng crash trình duyệt, …).

Như vậy, một ngôn ngữ `sync` thì xử lí tác vụ `async` như thế nào? 
![](https://images.viblo.asia/468607a9-bf00-44ad-8328-96d443b69a96.gif)
<br/>
Thông thường, để xử lý chúng, ta thường dùng các phương pháp như  `callback`, `promise`, `async/await` và `observable`. 

Xử lý bất đồng bộ là một trong những nhiệm vụ tất yếu và không thể tránh khỏi. Vì vậy, chúng ta nên tìm hiểu kỹ về nó.
<br/><br/>
Cùng bắt đầu nhé ! 😺😺
## Callback(ES5)
> Sử dụng một function làm tham số truyền vào cho một function khác. Sau đó một khoảng thời gian, function được truyền vào sẽ thực thi.

![](https://images.viblo.asia/ec3df9a1-52fe-4a6e-9f5c-19f7ff96637c.jpg)

```
$(document).ready(function() {
$('#button').on('click', function(event) {
   $.getJSON('/data.json', function(data) {
     console.log(data);
   });
 });
});
```
Trong ví dụ trên ta có 3 `callback` cho `document ready`, `button click event`, `getJSON`

Nhược điểm của `callback` là 3 KHÓ: khó maintain, khó đọc, khó debug. Hơn nữa, trường hợp gọi lại quá nhiều `callback` như vậy dễ dẫn đến tình trạng **Callback hell** 😭😭

```
getData(function(a) {
 getMoreData(function(b) {
  getMoreData(function(c) {
   getMoreData(function(d) {
    getMoreData(function(e) {
     // do something
    });
   });
  });
 });
});
```
## Promise(ES6/ES2015)
> Promise như là một "lời hứa" cho một dữ liệu, hành động được hoàn thành(hoặc bị lỗi) của một tác vụ bất đồng bộ và trả về kết quả của nó.

<br/>

*Bất đồng bộ có nghĩa là sẽ hoàn thành sau, chứ không phải ngay lập tức và nó sẽ báo cho ta biết khi nó hoàn thành (hoặc bị lỗi).*
<br/><br/>
**Ví dụ**: 
Vào một buổi sáng đẹp trời, bạn đang ngồi uống cafe và tự dưng đói bụng và muốn ăn gì đó. Bạn lên website order một ổ bánh mì tại một cửa hàng nào đó. Cửa hàng thông báo ~10 phút nữa sẽ giao bánh đến cho bạn. 
<br/>
Như vậy, hành động *làm một ổ bánh mì là một tác vụ bất đồng bộ*, vì nó cần thời gian là khoảng 10 phút để hoàn thành. *Cửa hàng đã cho bạn một Promise* là khoảng 10 phút sau sẽ có bánh mì cho bạn. Sau đó, bạn vẫn tiếp tục nhiệm vụ của bạn là uống cà phê và chờ khi nào bành mì giao đến thì bạn sẽ nhận và thưởng thức. 

Bạn có thể thấy *một Promise có 3 trạng thái* sau: *chờ-bạn chờ bánh mì giao đến (**pending**), hoàn thành-giao cho bạn xong (**fulfilled**), từ chối-không thể làm bánh mì cho bạn vì hết bánh mì (**rejected**).*
![](https://images.viblo.asia/173e0d1e-e8f8-4e31-a8b6-f1e46e7a7f7a.png)

```
const promise = new Promise((resolve, reject) => {
  // do async stuff
  resolve('DONE!');
});

promise.then((result) => {
  console.log(result); // result will be 'DONE!'
});
```
```
const promise = new Promise((resolve, reject) => {
  // do async stuff
  reject(new Error('FAIL!'));
});

promise
  .then((result) => {
    // Will not be called
  })
  .catch((error) => {
    console.log(error); // FAIL!
  });
```
Và bài toán callback hell ở mục phía trên được giải quyết như sau:

```
getData()
.then(getMoreData)
.then(getMoreData)
.then(getMoreData)
.then(getMoreData)
.then((result) => {
  //do something
})
.catch((error) => {
  handleError(error)
});
```
Một số điểm đặc trưng của promise là:
* Chỉ trả về một giá trị duy nhất, đó có thể là object, array, number, …
* Không thể cancel được request
* Được khởi tạo ngay lập tức mặc dù chưa có bất kỳ đăng ký nào. Nó không quan tâm bạn đã đăng ký promise hay chưa, miễn là bạn khai báo một promise thì nó sẽ chạy constructor

Tuy nhiên sử dụng Promise trong một vài trường hợp lại làm phát sinh vấn đề "khá" tương tự Callback là **Promise hell** =)) 🤣🤣

```
function wait(ms) { 
    return new Promise(r => setTimeout(r, ms)) 
} 
function main() { 
    console.log('sắp rồi...') 
    wait(2007).then(() => { 
        console.log('chờ tí...') 
        return wait(2007) }).then(() => { 
       console.log('thêm chút nữa thôi...') 
       return wait(2012) }).then(() => { 
           console.log('thêm chút nữa thôi...') 
           return wait(2016) }).then(() => { 
               console.log('xong rồi đấy!') 
           }) 
          }
````

## Async/await(ES7/ES2016)
> Để sử dụng hàm `async`, ta cần khai báo từ khóa `async` ngay trước từ khóa định nghĩa hàm.

<br/>

*Nghĩa là với hàm định nghĩa với từ khóa `function` ta phải khai báo ngay trước `function`, với hàm mũi tên (`arrow function`) ta phải khai báo trước tập tham số đầu vào, với phương thức của lớp `Class` thì ta phải khai báo ngay trước tên hàm.*

```
// regular function 
async function functionName() {
     let ret = await new Google().search('JavaScript') 
 } 
 // arrow function 
 let arr = ['JS', 'node.js'].map(async val => { 
     return await new Google().search(val) 
 }) 
 // Class 
 class Google { 
     constructor() { 
         this.apiKey = '...' 
     } 
     async search(keyword) { 
         return await this.searchApi(keyword) 
     } 
 }
```

Ta chỉ khai báo một `await` chỉ trong một `async function`

```
function wait(ms) {
   return new Promise(r => setTimeout(r, ms))  
}
async function main() {
   console.log('sắp rồi...')
   await wait(2007)
   console.log('chờ tí...')
   await wait(2012)
   console.log('thêm chút nữa thôi...')
   await wait(2016)
   console.log('xong rồi đấy!')
}
```
Kết quả trả ra của hàm `async` luôn là một `Promise` dù bạn có gọi `await` - có xử lý bất đồng bộ hay không. `Promise` này sẽ ở trạng thái thành công với kết quả được trả ra với từ khóa `return` của hàm `async`, hoặc trạng thái thất bại với kết quả được đẩy qua từ khóa `throw` trong hàm `async`.

Ta có thể xử lý ngoại lệ với `catch` khá đơn giản với từ khóa `try - catch` hệt như các thao tác đồng bộ:
```
function wait(ms) { 
    return new Promise(r => setTimeout(r, ms)) 
} 
async function runner() { 
     console.log('sắp rồi...') 
     await wait(2007) console.log('chờ tí...') 
     await wait(2012) console.log('thêm chút nữa thôi...') 
     await wait(2016) 
     throw new Error(2016) 
 } 
 async function main() { 
     try { 
         await runner() console.log('xong rồi đấy!') 
     } 
     catch (e) { 
         console.log(`có vấn đề tại ${ e }`) 
     } 
 }
```
Trong cứ như các lệnh đồng bộ vậy đúng không nào 😄😄
<br/><br/>
![](https://images.viblo.asia/93dcc4b5-00d2-4446-a5ec-d4aa3f24cceb.png)
<br/><br/>
Cho tới nay, các nền tảng và trình duyệt sau đã hỗ trợ hàm `async` là Node.js v7.6, Chrome v5.55, Microsoft Edge v21.10547. 
<br/>
Trường hợp bạn muốn chạy ở các nền tảng/ trình duyệt chưa hỗ trợ thì có thể dùng [babel](https://babeljs.io/docs/en/babel-plugin-transform-async-to-generator/) để chuyển đổi nhé 😽😽
## Observable
Observable cũng có những tính năng của `Promise` và **thêm một số ưu điểm khác**. 
<br/>
Nó như một ống dữ liệu (`data stream`), chúng ta có thể đẩy nhiều dữ liệu qua ống này.
<br/><br/>
`Observable` là một khái niệm từ `Reactive Programming`. *`Reactive` là một nền tảng xử lý những tác vụ bất đồng bộ thông qua những ống dữ liệu(`data stream`). `Reactive` hỗ trợ nhiều ngôn ngữ Java, .NET, … Trong đó có thư viện `RxJS` hỗ trợ `data stream` cho các `async` trong Javascript.*
![](https://images.viblo.asia/30295215-b248-430f-a4db-a63dcf83b92b.png)
<br/><br/>
Một số điểm đặc trưng của Observable là:
* Trả về *một* hoặc *nhiều* giá trị
* Có thể `cancel request`
* Chỉ được khởi tạo khỉ và chỉ khi có đăng ký đến `observable` đó(có `listener`)
* Có thể retry
* Có thể dùng với `event`
* Có các thao tác tiền xử lý dữ liệu như: `filter`, `map`, …
## Kết
Vậy là chúng ta đã điểm qua một vài phương pháp xử lý bất đồng bộ trong `Javascript` với `Callback`, `Promise`, `Async Await` và `Observable`. 
<br/>
Mong rằng bài viết này sẽ mang lại cái nhìn tổng quan nhất cho các bạn. Chúng ta nên tận dụng sự tiện lợi cũng như hạn chế của từng các hàm `async`  để chọn ra phương pháp phù hợp để áp dụng cho dự án của mình này nhằm giảm thiểu việc bảo trì trang web sau này ^^
<br/><br/>
Happy Coding !!!
<br/><br/>

*Reference: [Kipalog](https://kipalog.com/posts/JS--async-await-don-gian), [ThauNguyen](http://thaunguyen.com/javascript/javascript-promise-vs-observable), [Medium](https://medium.com/@benlesh/rxjs-observable-interop-with-promises-and-async-await-bebb05306875)*