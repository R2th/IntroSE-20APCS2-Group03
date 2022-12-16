### 1. Mở đầu.
Promise là một tính năng để sử lí bất động bộ trong JS để tránh rơi vào tình trạng callback hell. Các tác vụ bất đồng bộ có thể là dùng hàm setTimeout, setInterval, hay các thao tác với Api, …

Ví dụ sau đây là 1 callback hell, nó rất rối rắm, khó hiểu và cũng khó debbug về sau này.

```
api.getUser('chamdev.com', function (err, user) {
    if (err) throw err;
    api.getPostsOfUser(user, function (err, posts) {
        if (err) throw err;
        api.getCommentsOfPosts(posts, function (err, comments) {
            // To do something else.
        });
    });
});
```

Như các bạn có thể thấy ở bên trên đây là 1 trường hợp callback hell mà ta lên tránh và để giải quyết trường hợp này thì ta sẽ phải dùng Promise.

```
api.getUser('chamdev.com')
    .then(user => api.getPostsOfUser(user))
    .then(posts => api.getCommentsOfPosts(posts))
    .catch(err => {
        throw err;
    });
```

### 2. Promise chi tiết.
### Cách tạo Promise.
Để tạo ra 1 Promise mới các bạn có thể dùng Object có sẵn trong JS như sau:

```
const myPromise = new Promise(
    // executor
    function (resolve, reject) {
        // To do call resolve()
        // To do call reject()
    },
);
```

Promise có 3 trạng thái:

* Pedding: Đang chờ sử lý.
* Fulfilled: Đã được giải quyết. Khi này promise sẽ được trả về trong hàm Then (Một Promise.prototype của đối tượng new Promise()).
* Reject: Đã giả quyết nhưng bị lỗi, không thực hiện được. Khi này promise sẽ được trả về trong hàm Catch (Đây cũng là một Promise.prototype của đối tượng new Promise()).
### Promise dùng để Handle API.

```
api.getUser = function (username) {
    // api.getUser() return promise object
    return new Promise((resolve, reject) => {
        // Send AJAX request
        http.get(`/users/${username}`, (err, result) => {
            // If error callback, call `reject()`
            if (err) return reject(err);

            // If success callback, call `resolve()`
            resolve(result);
        });
    });
};
```

Như vậy, ta đã dùng promise để cho tiến trình call này xuống Event loop (Sẽ nói ở bài sau). Nếu hàm call api này thành công thì ta call resolve(), còn nếu nó có lỗi thì ta sẽ call hàm reject().

```
api.getUser('pikalong').then(res => {
    console.log(res);
    // To do something
}, err => {
    console.log(err);
    // To do something
});

// OR

api.getUser('pikalong').then(res => {
    console.log(res);
    // To do something
}).catch(err => {
    console.log(err);
    // To do something
});
```

Như ở phần trên, nếu Promise call resolve thì hàm then sẽ được chạy, còn nếu bên trong Promise call Reject thì hàm Catch sẽ được chạy. Các bạn chắc cũng sẽ đặt câu hỏi, tại sao hàm then lại có đến 2 hàm callback thế kia? Câu trả lời là hàm then là 1 hàm tổng quát và cao cấp hơn hàm catch, bên trong then cũng có thể handle lỗi như hàm catch vậy. ^^

Nhưng chúng ta cũng lên hiểu thêm 1 chút khi dùng catch và khi dùng callback thứ 2 của hàm then. Hàm reject trong .then(resolve, reject) chỉ có thể chụp được lỗi từ những .then() phía trước nó, mà không thể bắt được lỗi xảy ra trong hàm resolve cùng cấp.

```
api.getUser('chamdev.com').then(user => {
        throw new Error('Throw error');
    }, err => {
        /* Nothing happen */
    },
)

api.getUser('chamdev.com')
    .then(user => {
        throw new Error('Throw error');
    })
    .catch(err => console.log(err)) // Throw error
```
Promise cũng sẽ dừng khi mà nó bắt được lỗi.

```
Promise.resolve().then(() => {
    throw 'foo';
}).then(() => {
        throw 'bar';
    },err => {
        console.error('here', err);
    }
).catch(err => console.error('final', err)); // "here bar"
```

Tạo nhanh Promise với Promise.resolve() và Promise.reject()

```
const p = Promise.resolve(12)
    .then(result => console.log(result)) // 12
    .then(res => Promise.reject(new Error('Call reject callback function.')))
    .then(() => 'The error is not logged here')
    .catch(err => console.error(err)) // Call reject callback function.
```

Như các bạn đã thấy, ta cũng có thể dễ dàng tạo thêm Promise rồi call luôn resolve hoặc reject. Mục đích là sẽ cho hàm “p” này vào Event loop ^-^ để nó chạy về cuối của chương trình.

### Promise hỗ trợ “chaining”.
```
var promise = job1();

promise.then(function(data1) {
    console.log('data1', data1);
    return job2();
}).then(function(data2) {
    console.log('data2', data2);
    return job3();
}).then(function(data3) {
    console.log('data3', data3);
});

function job1() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('Result of job 1');
        }, 1000);
    });
}

function job2() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('Result of job 2');
        }, 1000);
    });
}
```
Chú ý ở đây kết quả của hàm then thứ nhất sẽ là phần tiếp theo truyền xuống cho hàm then xử lí. (Nếu return ra là 1 promise thì hàm then tiếp theo sẽ có tham số là Promise, nếu return ra là 1 data thì hàm then tiếp theo sẽ được truyền vào là chính data đó).

### Promise chạy tuần tự với reduce().
```
[promise1, promise2, promise3].reduce(function (currentPromise, promise) {
    return currentPromise.then(promise)
}, Promise.resolve())
```
Như vậy, promise sẽ chạy tuần tự. Khi xong promise1 sẽ chạy tiếp đến promise2, rồi tiếp đó là promise 3.

### Promise chạy cùng lúc với Promise.all()
```
const userIds = [1, 2, 3, 4];

Promise.all(usersIds.map(api.getUser)).then(function (arrayOfResults) {
    const [user1, user2, user3, user4] = arrayOfResults;
});
```
Khi này promise chỉ được chạy xong khi tất cả các promise bên trong đã resolve ^^. Và nếu trong trường hợp 1 Promise reject thì Promise all này sẽ chạy vào hàm catch.

### Hanlde first promise với Promise.race()
```
Promise.race([
    ping('ns1.example.com'),
    ping('ns2.example.com'),
    ping('ns3.example.com'),
    ping('ns4.example.com'),
]).then(result => {})
```
Promise với race() sẽ làm cho Promise resolve luôn khi có 1 trong các Promise kia resolve và reject khi 1 trong các Promise kia reject.

### Hanlde final với Promise.final()
```
showLoadingSpinner();

api.getUser('chamdev.com')
    .then(user => { })
    .catch(err => { })
    .finally(hideLoadingSpinner())
```

Như các bạn có thể thấy, final sẽ chạy khi mà Promise resolve hoặc reject. ^^

### 3. Kết luận.
Hãy để ý Promise nó sẽ là 1 cách để làm placeholder cho 1 data khi nó đang call api lấy dữ liệu.

Trong Promise sẽ là các hàm callback để khi có data nó sẽ được xử lí tiếp.

Trên đây chỉ là 1 phần rất nhỏ của promise nhưng là cơ bản nhất của promise, ngoài ra còn có cái prototype khác của promise như: Promise.all(), Promise.race(), ….

Tuy nhiên khi ta viết quá nhiều hàm Promise lồng nhau thì cũng sẽ có trường hợp xảy ra Promise hell. Nên chúng ta lại có 1 tính năng mới là async/await. Tuy nhiên nó sinh ra là để kế thừa Promise và hỗ trợ Promise, nó không được sinh ra để thay thế Promise ^^.

```
api.getUser('chamdev.com')
    .then(user => {
        api.getPostsOfUser(user)
            .then(posts => {
                api.getCommentsOfPosts(posts)
                    .then(comments => {
                        console.log(comments);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
```

Đây là cách mà ta sẽ làm với async/await.

```
api.getUser('chamdev.com').then(async user => {
    const postsOfUser = await api.getPostsOfUser(user);
    const commentsOfPosts = await api.getPostsOfUser(postsOfUser);
    return commentsOfPosts;
});
```

Code với async/await là dễ hiểu hơn, nhưng bản chất nó vẫn là Promise vì với Promise ta cũng có thể làm cho nó dễ hiểu hơn bằng cách áp dụng Promise chaining ^^.

```
api.getUser('chamdev.com')
    .then(user => api.getPostsOfUser(user))
    .then(posts => api.getCommentsOfPosts(posts))
    .then(comments => {
        console.log(comments);
    })
    .catch(err => console.log(err));
```

Chú ý thêm, đây là 1 phần rất quan trọng là Promise sẽ chạy ngay khi nó được khởi tạo.

```
console.log('before');
const promise = new Promise(function fn(resolve, reject) {
  console.log('hello');
  // ...
});
console.log('after');
// before
// hello
// after
```

Sẽ bị lỗi nếu như trong trường hợp này:

```
const getUsers = new Promise((resolve, reject) => {
    return http.get(`/api`, (err, result) =>
        err ? reject(err) : resolve(result)
    )
})

button.onclick = e => getUsers;
```

Từ đó các lập trình viên lại nghĩ ra 1 thư viện là RxJS nó được giới thiệu là cứu cánh cho nhược điểm này của Promise và thêm được rất nhiều tính năng mới. Tuy nhiên, với trường hợp trên ta cũng có thể giải quyết bằng cách sau.

```
const getUsers = () => new Promise((resolve, reject) => {
    return http.get(`/api`, (err, result) =>
        err ? reject(err) : resolve(result),
    );
});

button.onclick = e => getUsers();
```

### 4 .Bài viết này được tham khảo từ:
[Tất tần tật về Promise và async/await](https://chamdev.com/promise-trong-javascript/)

[SERIES JAVASCRIPT SIDA – PROMISE – HỨA THẬT NHIỀU THẤT HỨA THẬT NHIỀU](https://toidicodedao.com/2016/07/05/javascript-promise/)

[Promise là khỉ gì ?](https://kipalog.com/posts/Promise-la-khi-gi-)