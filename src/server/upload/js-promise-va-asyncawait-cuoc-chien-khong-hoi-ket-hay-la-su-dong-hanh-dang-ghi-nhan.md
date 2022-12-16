Xin chào các bạn!

Bất đồng bộ là một vấn đề muôn thuở đối với mọi developer khi tìm hiểu và thực hành Javascript. Nó đã từng là một vấn đề thực sự nhức nhói trong quá khứ khi mà ta cần xử lý một số thao tác mang tính đồng bộ hay tuần tự. Nhưng ở thời điểm hiện tại, với những phiên bản, công nghệ mới ra đời của Javascript thì chuyện xử lý đồng bộ trở nên dễ dàng hơn trước kia rất nhiều. 

Ngày trước khi xử lý bất đồng bộ, cách cơ bản và được hầu hết mọi developer sử dụng đó chính là callback function. Khi ra đời, callback đã giải quyết được cơ bản vấn đề khúc mắc đặt ra. Nhưng qua thời gian, callback lại trở thành địa ngục khi mà phải thực hiện quá nhiều tác vụ mang tính tuần tự. Đó chính là <b>callback hell</b>.

![](https://images.viblo.asia/991702d8-28c4-4b8d-a30d-99ec3723774b.jpeg)

Vâng, may thay rằng call back không phải là giải pháp duy nhất tính đến thời điểm hiện tại. Bên cạnh nó còn có những viên ngọc sáng giá hơn, đó chính là những <b>"Lời hứa" (Promise)</b> và những <b>"Lần chờ đợi" (Async/await)</b>. Điều không may ở đây đó chính là có 2 trường phái sinh ra đứng về 2 phía của 2 công nghệ này. Một bên cho rằng "lời hứa" sẽ luôn giữ đúng lời, luôn luôn tốt mà không phải sử dụng bất cứ thứ gì khác, bên kia lại khẳng định rằng đồ mới async/await (được giới thiệu từ ES8) sẽ là thứ ưu việt hơn. Liệu rằng, đây sẽ là cuộc chiến không hồi kết, hay chúng lại là những người bạn đồng hành đáng ghi nhận của nhau. Hãy cùng mình làm rõ trong bài viết này nhé!

<h2>1. Ngó qua về Promise</h2>

Promise là một cơ chế trong JavaScript giúp bạn thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell. Các tác vụ bất đồng bộ có thể là gửi AJAX request, gọi hàm bên trong ```setTimeout```, ```setInterval```, hay thao tác với ```WebSocket```, … Dưới đây là một callback hell điển hình:

```javascript
api.getUser('sun_user', function(err, user) {
  if (err) throw err
  api.getPostsOfUser(user, function(err, posts) {
    if (err) throw err
    api.getCommentsOfPosts(posts, function(err, comments) {
      // bla bla bla...
    });
  });
});
```

Nếu có nhiều nghiệp vụ cần được thực hiện bên trong nữa thì thật là khủng khiếp phải không nào. Code của chúng ta sẽ "sạch sẽ" hơn rất nhiều khi sử dụng Promise:
```javascript
api.getUser('sun_user')
  .then(user => api.getPostsOfUser(user))
  .then(posts => api.getCommentsOfPosts(posts))
  .catch(err => { throw err });
```

Promise là một đối tượng của Javascript, bạn hoàn toàn có thể sử dụng từ khóa ```new``` để khai báo

```javascript
const p = new Promise( 
    /* executor */ 
   function(resolve, reject) {
   // your code will go here
});
```

Trong đó ```executor``` sẽ có 2 tham số nhận vào:
* resolve là hàm được gọi khi promise hoàn thành
* reject là hàm được gọi khi có lỗi xảy ra

```javascript
api.getUser = function(username) {
  // Hàm api.getUser() trả về một promise object
  return new Promise((resolve, reject) => {
    // Gửi AJAX request
    http.get(`/users/${username}`, (err, result) => {

      // Nếu có lỗi bên trong callback, chúng ta gọi đến hàm `reject()`
      if (err) return reject(err)

      // Ngược lại, dùng `resolve()` để trả dữ liệu về cho `.then()`
      resolve(result)

    })
  })
}
```

Như vậy ```api.getUser()``` sẽ trả về một promise object. Chúng ta có thể truy xuất đến kết quả trả về bằng phương thức ```.then()``` như sau:
```javascript
function onSuccess(user) { console.log(user); }
function onError(err) { console.error(error); }

api.getUser('sun_user')
  .then(onSuccess, onError);
```
Phương thức ```.then(onSuccess, onError)``` nhận vào hai hàm: ```onSuccess``` được gọi khi promise hoàn thành và ```onError``` được gọi khi có lỗi xảy ra. Bên trong tham số ```onSuccess``` bạn có thể trả về một giá trị đồng bộ, chẳng hạn như giá trị ```number```, ```string```, ```null```,```undefined```, ```array``` hay ```object```; hoặc một promise object khác. Các giá trị bất đồng bộ sẽ được bọc bên trong một Promise, cho phép bạn kết nối (chaining) nhiều promises lại với nhau.

```javascript
promise()
  .then(() => { return 'foo' })
  .then(result1 => {
     console.log(result1); // 'foo'
     return anotherPromise();
  })
  .then(result2 => console.log(result2)) // `result2` sẽ là kết quả của anotherPromise()
  .catch(err => {});
```

<h2>2. Async/await khác gì với Promise</h2>

Thực ra, bản chất của async/await là sử dụng Promise ở bên dưới, việc cần làm của bạn đó chính là sử dụng 2 từ khóa ```async``` và ```await``` sao cho phù hợp: ```async``` sẽ được sử dụng trước hàm, còn ```await``` sẽ được sử dụng ở trước các thao tác cần đồng bộ. Và điểm lưu ý đó chính là kết quả trả về của async function luôn luôn là một Promise.
```javascript
async function() {
  try {
    const user = await api.getUser('sun_user');
    const posts = await api.getPostsOfUser(user);
    const comments = await api.getCommentsOfPosts(posts);

    console.log(comments;
  } catch (err) {
    console.log(err);
  }
}
```

<h2>3. Promise vs. Async/await</h2>

<h4>3.1 Chạy các Promise tuần tự</h4>

![](https://images.viblo.asia/e716d79d-3c38-4957-a490-c98c4ce147c9.png)

Khi bạn có nhiều Promise và bạn muốn xử lý nó một cách tuần tự, điều đầu tiên bạn nghĩ tới đó là sử dụng ```reduce``` của ```Array```
```javascript
[promise1, promise2, promise3].reduce(function(currentPromise, promise) {
  return currentPromise.then(promise);
}, Promise.resolve());

// Đoạn ở trên khi được viết dài dòng ra
Promise.resolve().then(promise1).then(promise2).then(promise3);
```

Còn nếu sử dụng ```async/await``` thì code của chúng ta sẽ đẹp hơn như sau:

```javascript
async function() {
  const res1 = await promise1();
  const res2 = await promise2(res1);
  const res3 = await promise3(res2);
}
```

<h4>3.2 Chạy các Promise cùng lúc</h4>
Thế còn trong trường hợp các bạn hứa nhiều lần với nhiều người trong cùng một khoảng thời gian thì sao?

![](https://images.viblo.asia/21563dac-e13c-43b5-aab3-a46fff1a8125.png)

Chắc chắn là ```Promise.all()``` rồi phải không nào!
```javascript
const userIds = [1, 2, 3, 4];

Promise.all(usersIds.map(api.getUser))
  .then(function(arrayOfResults) {
    const [user1, user2, user3, user4] = arrayOfResults;
  });
  ```
  
  Thế còn khi sử dụng ``asycn/await``, liệu rằng nó còn đẹp như lần trước chăng?
  ```javascript
  async function() {
  const userIds = [1, 2, 3, 4];
  const [user1, user2, user3, user4] = await Promise.all(usersIds.map(api.getUser));
}
```
<h4>3.3 Truyền dữ liệu giữa các promises với nhau</h4>
Một trong những điểm hạn chế của Promise là không có cơ chế mặc định để bạn truyền dữ liệu giữa các promise objects với nhau. Nghĩa là:

```javascript
api.getUser('sun_user')
  .then(user => api.getPostsByUser(user))
  .then(posts => {
    // Muốn sử dụng biến user ở trên thì làm sao đây?
  });
```

Giải pháp đầu tiên sẽ là ```Promise.all()``` như thường lệ:
```javascript
api.getUser('sun_user')
  .then(user => Promise.all([user, api.getPostsByUser(user)]))
  .then(results => {
     // Dùng kỹ thuật phân rã biến trong ES6. Bạn lưu ý chúng ta dùng 1 dấu , để
     // tách ra phần tử thứ hai của mảng mà thôi
     const [ , posts ] = results;

     // Lại tiếp tục truyền dữ liệu bao gồm [user, posts, comments] xuống promise sau
     return Promise.all([...results, api.getCommentsOfPosts(posts)]);
  });
```

Hoặc, nếu bạn cảm thấy phân tách mảng khó dùng vì phải nhớ thứ tự của các giá trị thì ta có thể dùng object như sau:

```javascript
api.getUser('sun_user')
  .then(user => api.getPostsByUser(user).then(posts => ({ user, posts })))
  .then(results => api.getCommentsOfPosts(results.posts).then(comments => ({ ...results, comments })))
  .then(console.log); // { users, posts, comments }
```

Và lại một lần nữa, async/await lại tỏa sáng vì giúp bạn truy xuất đến kết quả của những promises phía trước.

```javascript
async function() {
  const user = await api.getUser('sun_user');
  const posts = await api.getPostsOfUser(user);
  const comments = await api.getCommentsOfPosts(posts);
}
```

<h4> 3.4 Cuối cùng rồi </h4>

Bên cạnh ```.then()``` và ```.catch()```, chúng ta còn có ```.finally(onFinally)```. Phương thức này nhận vào một hàm và sẽ được kích hoạt dù cho promise trước nó hoàn thành hay xảy ra lỗi.

Với Promise:
```javascript
showLoadingSpinner()
api.getUser('sun_user')
  .then(user => {})
  .catch(err => {})
  .finally(hideLoadingSpinner);
```

Và với ```async/await```:

```javascript
async function() {
  try {
    showLoadingSpinner();
    api.getUser('sun_user');
  } catch(err) {
  } finally {
    hideLoadingSpinner();
  }
}
```

<h2>4. Kết luận</h2>

Thế là quá rõ ràng phải không nào! Qua tìm hiểu và các ví dụ mình đã nêu bên trên thì chúng ta đều có thể thấy được rằng đây không phải là một cuộc chiến căng thằng cam go nào cả. Cả promise và async/await không hoàn toàn có thể thay thế cho nhau, mà nó còn hỗ trợ lẫn nhau. 

Mặc dù chúng ta có thể dùng async/await ở đa số các trường hợp, nhưng Promise vẫn là nền tảng cần thiết khi thực thi các tác vụ bất đồng bộ trong JavaScript. Vì vậy mà tùy vào từng ngữ cảnh cụ thể mà ta nên đưa ra cách sử dụng phù hợp nhất!

Cảm ơn các bạn đã kiên nhẫn đọc đến đây nhé :)))


<h3>***Reference***</h3>

[1] https://ehkoo.com/bai-viet/tat-tan-tat-ve-promise-va-async-await

[2] https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1

[3] https://hackernoon.com/understanding-async-await-in-javascript-1d81bb079b2c