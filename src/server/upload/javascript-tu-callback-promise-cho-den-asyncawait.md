Trong số chúng ta ai đã từng tìm hiểu đủ sâu về Javascript đều sẽ biết rằng đây là một ngôn đơn luồng (single thread), có nghĩa rằng nó chỉ có thể thực hiện được một công việc trong một thời điểm. Tuy nhiên, hãy tưởng tượng rằng, khi chúng ta gọi API và trong khi đợi kết quả trả về, luồng chính sẽ bị block khiến cho trang web không thể phản hồi hay tương tác với người dùng, cho đến khi việc gọi API đã hoàn tất. Đó chính là lý do mà khái niệm bất đồng bộ (asynchronous) xuất hiện trong Javascript. Có 3 cách để thực hiện bất đồng bộ trong Javascript, đó là sử dụng callback, Promises và async/await. Cùng tìm hiểu nhé !

## Callback
Trong javascript, chúng ta có thể truyền một hàm vào như là một tham số của hàm khác, đó chính là callback. 
Trước hết, chúng ta sẽ xem xét một ví dụ sử dụng callback sau:
```javascript
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
```

Chúng ta có thể thấy rằng trong hàm ``doHomework`` có truyền tham số thứ 2 làm một hàm khác và sẽ được gọi bên trong hàm bao bọc nó, đó là hàm ```callback```. Đoạn code trên sẽ " bắn " ra 2 alert, đó là ``Starting my math homework.``, sau đó đến ``Finished my homework``. Ví dụ này thì rất là dễ hiểu đúng không. 

Mình sẽ lấy thêm 1 ví dụ về việc sử dụng callback để giải quyết vấn đề gọi request và đợi response trả về như mình đã đề cập ở phần đầu bài nhé :

```javascript
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
       callback(null, xhr.response)
      } else {
       callback(xhr.status, null)
      }
    }
  }
  xhr.ontimeout = function () {
   console.log('Timeout')
  }
  xhr.open('get', url, true)
  xhr.send();
}
```
Hàm ``request`` ở trên có một tham số, đó là hàm callback. Hàm này sẽ được gọi khi request được tạo ra thành công (``callback(null, xhr.response)``)  hoặc thất bại (``callback(xhr.status, null)``). 

Hàm callback rất dễ hiểu và dễ sử dụng, tuy nhiên, để thực hiện các đoạn code phức tạp thì callback lại cho thấy điểm yếu của mình, đó là ``callback hell``, nó sẽ làm đoạn code của chúng ta rất xấu, khó đọc và khó bảo trì. Trong một thời gian rất dài, chúng ta phải dựa vào callbacks để làm việc với các đoạn code bất đồng bộ trong javascript. Kết quả là, rất nhiều người trong chúng ta đã có những trải nghiệm kinh khủng khi phải đối mặt với các hàm trông như thế này :

![](https://images.viblo.asia/47638655-824b-49a9-a882-f06325ec36e0.png)

## Promises

Với promises, bạn có thể viết những đoạn code asynchronous dễ đọc và dễ bảo trì hơn. Để sử dụng promises, chúng ta khai báo với từ khóa``new Promise``:

```javascript
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

Chúng ta hãy cùng phân tích đoạn code trên :

* Một promise được khởi tạo bằng từ khóa ``new``, với ``resolve`` và ``reject`` là 2 tham số truyền vào.
* Bên trong hàm Promise, ``resolve`` sẽ được gọi khi đoạn code được thực thi đúng, còn không thì ``reject`` sẽ được gọi.
* Khi ``resolve`` được gọi, đoạn code bên trong hàm ``.then`` sẽ được thực thi, còn với ``reject`` thì đoạn code bên trong ``.catch`` sẽ được thực thi.

Để sử dụng đúng Promises, chúng ta cần lưu ý những điều sau :

* ``resolve`` và ``reject`` chỉ chấp nhận một tham số kể cả khi bạn truyền vào 2 tham số  ``resolve(‘yey’, ‘works’)`` thì chúng chỉ chấp nhận tham số đầu tiên là 'yey' và gửi tham số đó tới hàm callback trong ``.then``
* Nếu muốn sử dụng ``.then`` nối tiếp ``.then``, cần phải thêm ``return`` nếu không giá trị của lần gọi ``.then`` tiếp theo sẽ là ``undefined``
*  Khi sử dụng ``.then`` nối tiếp nhau, nếu có lỗi xảy ra, đoạn code sẽ bỏ qua không thực thi các hàm ``.then`` tiếp theo cho đến khi ``.catch`` xuất hiện
*  Một Promise có 3 trạng thái : **pending** khi chờ đợi ``resolve`` hoặc ``reject`` được gọi, **resolved** và **rejected**. Một khi Promise đã  ở trạng thái ``resolved`` hoặc ``rejected`` thì nó không thể thay đổi nữa.

## Async/await
Async/await là tính năng để làm việc với các hàm bất đồng bộ cuối cùng mà mình muốn nhắc đến. So với callback và Promises thì async/await sẽ làm cho đoạn code của chúng ta dễ hiểu và thú vị hơn rất nhiều. Async/await được xây dựng dựa trên Promises và tương thích với tất cả các Promise dựa trên API. 

Trước hết, chúng ta hãy tìm hiểu về các khái niệm của async/await :

* **Async**: từ khóa ``async`` tương đương với cách khai báo ``new Promise``  
    * Tự động biến đổi một hàm thông thường thành một Promise.
    * Khi gọi tới hàm async nó sẽ xử lý mọi thứ và được trả về kết quả trong hàm của nó.
    * Async cho phép sử dụng Await.
* **Await**: Đúng như cái tên của nó : " Đợi một chút "
    * Khi đặt trước một Promise, nó sẽ đợi cho đến khi Promise kết thúc và trả về kết quả.
    * Await chỉ làm việc với Promises, nó không hoặt động với callback hoặc hoạt động một mình.
    * Await chỉ có thể được sử dụng bên trong các function async.

Mình sẽ lấy ví dụ việc gửi request như trên nhưng thực hiện bằng async/await nhé :

```javascript
function request(url) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(xhr.status)
        }
      }
    }
    xhr.ontimeout = function () {
      reject('timeout')
    }
    xhr.open('get', url, true)
    xhr.send()
  })
}
```

Chúng ta sẽ thực hiện gửi request :

```javascript
async function list() {
  const userGet = `https://api.github.com/search/users?page=1&q=daspinola&type=Users`
  
  const users = await request(userGet)
  const usersList = JSON.parse(users).items
  
  usersList.forEach(async function (user) {
    const repos = await request(user.repos_url)
    
    handleRepoList(user, repos)
  })
}
function handleRepoList(user, repos) {
  const userRepos = JSON.parse(repos)
  
  // Handle each individual user repo here
  console.log(user, userRepos)
}
```

Trong đoạn code trên, hàm ``request(userGet)`` sẽ được thực thi, khi response trả về thành công, nó sẽ được gán vào biến ``users``, sau đó thì các dòng code phía dưới mới được thực hiện.
Qua ví dụ trên chúng ta có thể thấy rằng việc sử dụng async/await làm cho code của chúng ta nhìn giống như đoạn code đồng bộ bình thường, rất dễ đọc và dễ hiểu so với callback hay Promises.

## Kết luận
Cả 3 phương pháp mình đã giới thiệu ở trên đều có những ưu điểm riêng, chính vì vậy mà chúng ta hãy sử dụng chúng một cách hiệu quả nhất tùy vào mục địch và các ngữ cảnh khác nhau. Sử dụng thành thạo và hiệu quả các phương pháp này sẽ giúp chúng ta bảo trì code một cách dễ dàng hơn rất nhiều.

Tài liệu tham khảo :

https://medium.com/free-code-camp/javascript-from-callbacks-to-async-await-1cc090ddad99

https://topdev.vn/blog/giai-thich-ve-async-await-javascript-trong-10-phut/