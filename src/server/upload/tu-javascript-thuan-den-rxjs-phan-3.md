![](https://images.viblo.asia/deef3140-0378-4a05-9f0a-31ce25519a49.png)

Phần tiếp theo này chúng ta sẽ tiến hóa code đã viết để học một cách viết code đẹp hơn, ngắn gọn dễ hiểu hơn. Đây là phần cuối và cũng là phần thú vị nhất trong 3 bài viết. Qua bài này bạn sẽ hiểu được cách code của Reactive Programming, hiểu về cách hoạt động của Observables, Stream...

Qua 2 phần trước chúng ta đã biết là cách viết theo Callback dẫn đến cách viết theo Promises. Nhưng rồi Promises vẫn khó đọc, khó debug. Vì phải viết quá nhiều hàm .then() lồng nhau. Lúc này Async/Await ra đời.

# Async/Await
Hãy xem lại ví dụ sử dụng Promises trước đó

```js

function request(url) {
  return new Promise((resolve, reject) => { //Chỗ này mới, sử dụng Promise thay vì Callback
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function Success() {
      if (this.readyState === xhr.DONE) {
        resolve(JSON.parse(xhr.responseText));  //Chỗ này không có callback nữa để gọi. Ta dùng hàm resolve() để trả về kết quả.
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onerror = function(error) {
      reject("Error");
    };
  });
}

request("https://api.github.com/search/users?q=location:delhi")
  .then(data1 => {
    console.log(data1);
    return request("https://jsonplaceholder.typicode.com/posts/1");
  })
  .then(data2 => {
    console.log(data2);
    return request("https://api.icndb.com/jokes/random/1");
  })
  .then(data3 => {
    console.log(data3);
    return request("https://jsonplaceholder.typicode.com/posts/2");
  })
  .then(data4 => {
    console.log(data4);
  })
  .catch(error => {
    console.log(error);
  });
  ```
  
 Chúng ta cần quá nhiều then(). Hãy thử viết lại theo kiểu Async/Await như sau:
  
  ```js
async function request(url) {               //Chỗ này có thêm chữ async
  return new Promise((resolve, reject) => {   //Mọi thứ còn lại giữ nguyên
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function Success() {
      if (this.readyState === xhr.DONE) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onerror = function(error) {
      reject("Error");
    };
  });
}
console.log(request("https://api.github.com/search/users?q=location:delhi"));
console.log(request("https://jsonplaceholder.typicode.com/posts/1"));
console.log(request("https://api.icndb.com/jokes/random/1"));
console.log(request("https://jsonplaceholder.typicode.com/posts/2"));
```

**Hỏi ngu** `Ớ nó có chạy ra kết quả đâu? Nó trả về một cục Promise gì đó.`

![](https://images.viblo.asia/96dbe921-bbe9-4c91-bb0e-d0a7a089c18c.jpg)

Đúng vậy. khi viết 1 hàm có thêm chữ async đằng trước. Ta biến hàm đó thành hàm Asynchronous (bất đồng bộ). Lúc này ta không hề viết gì đến Promises nữa. Nhưng `async function request(url)` lại trả về cho ta một cái Promises như là bình thường. Nhưng lúc này ta không cần đến hàm resolve() nữa để có thể đón nhận được kết quả.

**Hỏi ngu** `Vậy làm thế nào để lấy được kết quả thay vì chỉ hiện ra cục Promise kia?.`

Lúc này quá đơn giản. Ta viết như sau:

```js
async function request(url) {                           
 return new Promise((resolve, reject) => {   //Để ý rằng hàm request vẫn trả về một Promise.
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function Success() {   
    if (this.readyState === xhr.DONE) {
      resolve (JSON.parse(xhr.responseText));       //Vẫn Resolve như bình thường
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onerror = function(error) {
    reject("Error");
  };
});
}
//await là lệnh đợi một hàm async chạy xong. Viết như dưới đây nghĩa là gọi hàm async như gọi hàm sync, chạy lần lượt
console.log(await request("https://api.github.com/search/users?q=location:delhi")); 
console.log(await request("https://jsonplaceholder.typicode.com/posts/1"));
console.log(await request("https://api.icndb.com/jokes/random/1"));
console.log(await request("https://jsonplaceholder.typicode.com/posts/2"));
```

Xong con ong! Code của chúng ta giờ đẹp như một thiên thần.

![](https://images.viblo.asia/f4f3db3c-cc31-454f-9295-55a54176be7b.gif)


Async/Await là bộ đôi dựa dẫm vào Promises để kiếm ăn. Và chúng cũng mới xuất hiện từ phiên bản ES8 của Javascript. Nghĩa là trình duyệt cũ thì sẽ không chạy được. Thực tế thì hiện nay nhiều coder đang viết Promises thuần thay vì viết theo kiểu Async/Await. 

Dưới đây là bảng tổng sắp của các phiên bản trình duyệt hỗ trợ hàm Async

![](https://images.viblo.asia/5e36c8d1-7d27-4f08-b66b-bec59763dd18.png)


Và như thế là một vị anh hùng cứu nhân độ thế mới đã ra đời. Nhưng núi cao vẫn có núi cao hơn. Ở một vùng trời khác, có thể là một hành tinh khác, hành tinh Reactive Programming một siêu anh hùng đang thống trị. Đó là cách code theo kiểu Observables.

# Observable

Nói đến Observables tức là lúc này ta đã phải viết code theo kiểu Reactive Programming (Lập trình đa luồng dữ liệu) chứ không còn code OOP (Lập trình hướng đối tượng) hoặc Functional Programming (Lập trình hàm) nữa. Lúc này ta cần đến một thư viện để lấy được các Observable (Luồng dữ liệu).

Chúng ta sẽ cần đến thư viện RxJS, một thư viện rất nổi tiếng để giúp ta sử dụng được Observable.

![](https://images.viblo.asia/daba9e7a-fe81-4c83-8069-a9346d486e5a.jpg)

Vì tôi không muốn bạn phải cài cắm gì khi học bài này. chúng ta muốn chạy code ngay ở TAB Console trên trình duyệt. May thay, ta có thể dùng trực tiếp RxJS từ trình duyệt mà không cần cài, sử dụng trang chủ của ReactiveX.

Các bạn vào trang http://reactivex.io/rxjs/. Bật F12 vào developer tool và vào tab Console là bắt đầu có thể sử dụng biến `Rx.` được rồi. Các bạn hãy paste code bên dưới vào để chạy.

![](https://images.viblo.asia/0b90a85a-0eb2-4e1a-9b23-0ef42db10a96.jpg)

Trước hết hãy thử viết lại ví dụ của chúng ta dưới dạng RxJS, sử dụng Observable.

```js
function request(url) {
  return Rx.Observable.fromPromise(    //Chúng ta lấy một cái Promise và vứt vào một luồng Observable
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function Success() {
        if (this.readyState === xhr.DONE) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onerror = function(error) {
        reject("Error");
      };
    })
  );
}

request("https://api.github.com/search/users?q=location:delhi") //Chúng ta lấy ra được một mảng
  .map(res => res.items)                     //Cắt
  .reduce(item => item.id > 1327050)         //Lọc
  .subscribe(res => console.log(res));       //Hiển thị

```

Sức mạnh của Observable như ta thấy lúc này đó là nó cho phép trực tiếp thao tác cắt gọt mảng dữ liệu ngay khi vừa nhận được, ta sẽ không cần phải dùng vòng lặp, không cần tạo ra biến tạm để chứa dữ liệu.

Điểm mạnh `kinh hồn` nữa của Observable đó là khả năng quản lý đa luồng dữ liệu chỉ với một lần gọi, sử dụng FolkJoin. 

```js
var myPromise = val =>
  new Promise(resolve =>
    setTimeout(() => resolve(`Promise Resolved: ${val}`), 5000);  //Delay Promise này trong 5 giây để chạy thử
  );

var source = Rx.Observable.of([1, 2, 3, 4, 5])  //Tạo ra 5 request với mảng này, ở đây các con số có thể hiểu là các URL

source
  .pipe(Rx.operators.mergeMap(q => Rx.Observable.forkJoin(...q.map(myPromise)))) //Lúc này ta sẽ cần dùng đến forkJoin để join toàn bộ các luồng gọi dữ liệu. 
  .subscribe(val => console.log(val)); //In lần lượt các kết quả trả về bởi mảng Source.
```

> Kết quả trả về:

![](https://images.viblo.asia/c0ba7d40-70cb-477a-9c87-9c1bc630880e.jpg)


Sau 5 giây thì đồng loạt 5 luồng được trả về kết quả, và thứ tự hiện kết quả vẫn đúng theo sync.  Các luồng sẽ được chạy song và việc quản lý lần lượt trả về các kết quả theo đúng thứ tự sẽ do Rx đảm nhiệm.

![](https://images.viblo.asia/d39eec24-cdc9-4f85-b978-3429640f92a9.gif)

Đối với lập trình đa luồng nhằm tăng tốc hệ thống, không phải hiện chữ `Loading` quá nhiều, thì đây đúng là Super Hero. Ngoài việc quản lý luồng, đa luồng, nhào nặn dữ liệu của các luồng, Observale còn quản lý luôn được cả "sự kiện" đối với mỗi luồng dữ liệu. Cách viết của nó rất ngắn gọn và dễ hiểu. 

Hiện nay RxJS gần như được sử dụng mặc định trong nhiều Framework lớn, đơn cử như AngularJS 4, ReactJS, VueJS. Các ngôn ngữ lập trình như Java hoặc C#, PHP cũng đã có các thư viện Rx tương ứng để lập trình viên thích có thể code đa luồng theo kiểu Reactive này.

Để học thêm về cách quản lý luồng dữ liệu theo RxJS, hãy sử dụng trang web sau đây:  https://www.learnrxjs.io/


# Kết luận

Vậy là loạt bài về "Lập trình Javascript hiện đại" đã khép lại. Hi vọng bài viết nhỏ này đã giúp cho bạn có cái nhìn tổng quan và có sự so sánh được các công nghệ, các cách code hiện đại của Javascript, từ phiên bản ES5 đến ES8.

Javascript là ngôn ngữ tôi khuyên bạn nên học nghiêm túc và thực sự hiểu về nó. Vì chúng ta dùng nó được trong cả Mobile và Web, thậm chí là IoT.  Hơn cả là vì nó dễ học và dễ tiếp cận.

Xin chào và hẹn gặp lại các bạn trong các bài viết tiếp theo về Javascript.

![](https://images.viblo.asia/ab1474c6-5850-4587-8ae2-fb1058c7bdad.gif)