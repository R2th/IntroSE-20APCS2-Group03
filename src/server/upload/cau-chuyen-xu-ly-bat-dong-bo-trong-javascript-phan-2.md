# I. Promise (ES6)
## 1. Định nghĩa

Promise là người em sinh sau đẻ muộn so với callback nên nó có thể khác phục được những vấn đề như *callback hell* hay *pyramid of doom* khá là tốt, giúp code trở nên dễ đọc, gọn gàng hơn.

Promise có nghĩa là một sự hứa hẹn hay lời hứa, mà lời hứa thì sẽ có hai trạng thái là hoàn thành và thất bại.


## 2. Cách sử dụng

Cách tạo ra một promise:
```
let promise = new Promise(/* executor */ (resolve, reject) => {
    // Thực thi các tác vụ bất đồng bộ ở đây
    // Gọi resolve(result) khi các tác vụ hoàn thành
    // Gọi reject(result) khi xảy ra lỗi
})
```

Hàm `executor`  là một hàm sẽ được gọi ngay khi Promise được gọi tới, nó chứa hai tham số:
- resolve: hàm sẽ được gọi khi xử lý thành công.
- reject: hàm được gọi khi xử lý thất bại.

Tại mỗi thời điểm, Promise sẽ  có những trại thái khác nhau, bắt đầu với `pending` hay `unsetted`. Trạng thái này chính là trạng thái ban đầu của Promise khi được khởi tạo và đang chờ kết quả trả về. Khi quá trình xử lý thực hiện xong xuôi, promise sẽ chuyển sang trạng thái `setted`, khi kết quả được trả về, sẽ có hai khả năng có thể xảy ra:
- `fulfilled`: trạng thái xử lý thành công.
- `rejected`: trạng thái xử lý thất bại.

Lấy ví dụ trước hôm thi đại học, mẹ ngồi cạnh bạn và nói "Cố đỗ đại học rồi mẹ sẽ trả cho tiền mừng tuổi mẹ cầm từ bé đến giờ". Khi đó, lời hứa của mẹ bạn sẽ trông như sau:

```
function hua_cho_vui() {
    return Promise((thuc_hien_loi_hua, that_hua) => {
        // Sau khi thi đại học xong
        // Nếu điểm bạn cao
        if (diem_cao) {
            // Lúc này trạng thái lời hứa là fulfilled
            thuc_hien_loi_hua("1000$");
        } else {
            // Lúc này trạng thái của lời hứa là rejected
            that_hua("1$")
        }
    });
}

// Khi vừa được khởi tạo xong, trạng thái của promise sẽ là pendding
// Mẹ vừa hứa với bạn xong, đang chờ điểm thi đại học của bạn
var promise = hua_cho_vui();
promise
    .then((li_xi_nhieu) => {
        ...
    })
    .catch((li_xi_it) => {
        ...
    });
```

Khi một promise được thực hiện, nếu thành công thì sẽ **gọi callback trong hàm then**, nếu thất bại thì promise sẽ **gọi promise trong hàm catch**.

![](https://images.viblo.asia/d3c97aa7-0a13-425e-b39f-5c870ec479da.png)


## 3. Promise chaining
Nếu xử lý các câu lệnh bất đồng bộ liên tiếp nhau với **callback** rất dễ dẫn đến tình trạng *callback hell* như mình đã nói ở phần trước khi mà có quá nhiều hàm callback bị lồng vào nhau làm cho việc đọc hiểu cũng như debug trở nên khó khăn. Promise chaining hay chuỗi promise được sinh tra nhằm khắc phục vấn đề trên.

Giá trị trả về của hàm `then()` sẽ là một promise khác, do đó có thể dùng promise để gọi liên tiếp các hàm bất đồng bộ. Promise thứ hai sẽ được xử lý khi promise thứ nhất trả về `fulfilled` hoặc `reject`.

![](https://images.viblo.asia/a01229c3-3aa5-4b9c-808f-18434b3e59a2.jpeg)


Ví dụ mình có một đoạn callback như sau:
```
api.getUser('user', function(error, user) {
    if (error) throw error
    api.getPostsOfUser(user, function(error, posts) {
        if (error) throw error
        api.getCommentsOfPosts(posts, function(error, comments) {
            if (error) throw error
            // ...
        })
    })
})
```

Đoạn callback trên sau khi được viết lại bằng Promise:
```
api
    .getUser('user')
    .then(user => api.getPostsOfUser(user))
    .then(posts => api.getCommentsOfPosts(posts))
    .catch(error => {
        throw error
    })
```

Trong ví dụ ở trên ta lần lượt gọi đến ba hàm `getUser`, `getPostsOfUser` và `getCommentsOfPosts`. Chỉ cần một trong ba hàm này bị lỗi, promise sẽ chuyển qua trạng thái *reject* và *callback* trong hàm *catch* sẽ được gọi đến, lúc này việc bắt lỗi sẽ trở nên dễ dàng hơn.

Tuy nhiên tiện là như vậy nhưng toàn bộ các hàm `then()` chỉ được tính là một câu lệnh. Điều này sẽ gây khó khăn cho việc debug sau này.

## 4. Promise.all()

`Promise.all()` nhận và là một đối số và thông thường là một mảng các promise. Trạng thái của promise này sẽ là `fulfilled` nếu trạng thái của tất cả các promise được truyền vào là `fulfilled` ngược lại, promise sẽ mang trạng thái `reject`.

```
let promise_1 = new Promise((resolve, reject) => {
    resolve(1);
});

let promise_2 = new Promise((resolve, reject) => {
    resolve(2);
});

let promise_3 = new Promise((resolve, reject) => {
    resolve(3);
});

let promise = Promise.all([promise_1, promise_2, promise_3]);
promise.then((value) => {
    console.log(value[0]); // 1
    console.log(value[1]); // 2
    console.log(value[2]); // 3
});
```

## 5. Promise.race()
Khác với `Promise.all()`, hàm `Promise.race()` sẽ xử lý promise đầu tiên có kết quả trả về không quan tâm kết quả trả về có lỗi hay không.

Ví dụ promise_1 được resolve đầu tiên nên giá trị mà promise trả về se là giá trị của promise_1 và bằng 1.

```
let promise_1 = Promise.resolve(1);

let promise_2 = new Promise((resolve, reject) => {
    resolve(2);
});

let promise_3 = new Promise((resolve, reject) => {
    resolve(3);
});

let promise = Promise.race([promise_1, promise_2, promise_3]);
promise.then((value) => {
    console.log(value); // 1
});
```

# II. Async/await (ES7)
Async/await là cơ chế giúp bạn thực thi các thao tác bất đồng bộ *một cách tuần tự hơn* , giúp đoạn code nhìn qua tưởng như đồng bộ nhưng thực ra lại là chạy bất đồng bộ, giúp chúng ta dễ hình dung hơn.

![](https://images.viblo.asia/e2f5d967-9eab-4aa5-bafd-9e80c50ebd71.jpg)


## 1. Async
Để định nghĩa một hàm bất đồng bộ với async, ta cần khai báo từ khóa **`async`** ngay trước từ khóa định nghĩa hàm. 

Regular function: 

```
async function getUser() {
    return ...
}
```

Function expression 
```
getUser = async function() {
    return ...
}
```

Kết hợp với cú pháp *arrow function* của ES6
```
getUser = async () => { ... }
```

Giá trị trả về của AsyncFunction sẽ luôn là một *Promise* mặc cho bạn có gọi await hay không, nếu trong code không trả về Promise nào thì sẽ có một promise mới được resolve với giá trị lúc đầu (nếu không có giá trị nào trong return kết quả trả về sẽ là undefine). Promise này sẽ ở trạng thái thành công với kết quả được trả về qua từ khóa *return* của  hàm async, hoặc ở trạng thái thất bại với kết quả được đẩy qua từ khóa *throw* trong hàm async.

## 2. Await
Về cơ bản thì `await` giúp cho cú pháp trông dễ hiểu hơn, thay thì phải dùng `then()` nối tiếp nhau thì chỉ cần đặt `await` trước mỗi hàm mà chúng ta muốn đợi kết quả của thao tác bất đồng bộ. Chỉ dùng được `await` trong hàm nào có `async` đứng phía trước.

```
async function getUser() {
    const user = await fetchUser();
}
```


## 3. Tại sao nên dùng async/await

Vì là sinh sau đẻ muộn nên nó có nhiều ưu điểm vượt trội so với các đàn anh đi trước như:
- **Code ngắn và sạch hơn**.
Điều dễ thấy nhất khi dùng async/await số lượng code phải viết giảm đi đáng kể, không phải *then* rồi *catch* gì cả hay là đặt tên cho một biến mà ta không sử dụng, tránh được các khối code lồng nhau, code được viết ra như code chạy tuần tự dễ đọc hơn rất nhiều.
- Công việc debug trở nên dễ dàng hơn vì so với promise, mỗi một lần dùng await sẽ được tính là một dòng code.
- Khi có lỗi, thay vì báo chung chung *un-resolved* như ở promise thì exception sẽ chỉ ra là lỗi xảy ra ở dòng số bao nhiêu.

# III. Kết luận
Như vậy là mình cùng các bạn đã tìm hiểu về callback, promise và async/await trong javascript qua 2 phần vừa rồi. 

Bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. Cảm ơn các bạn đã theo dõi bài viết.
# IV. Tham khảo
https://freelancervietnam.vn/async-await-ho-tro-javascript-code-dong-bo-don-gian/

https://freetuts.net/synchronous-la-gi-asynchronous-la-gi-619.html

https://techmaster.vn/posts/34304/6-ly-do-asyncawait-danh-bai-promises

https://toidicodedao.com/2016/07/05/javascript-promise/