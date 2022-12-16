Nếu như bạn đã từng làm việt với HTTP calls trong javascript hay nodejs thì bạn cũng đã từng sử dụng 1 trong 2 thằng này. Ở đây là những ví dụ nhỏ nhỏ về so sánh cách sử dụng giữa Axios và Fetch xem có cái gì đặc biệt hơn không.

### 1 - GET HTTP calls

Using Fetch
```
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
```

Using Axios
```
axios.get("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => console.log("response", response.data))
// {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
```

Nhìn qua chúng ta cũng biết được khi sử dụng Fetch thì phải mất 2 lần promises chúng ta mới nhận được kết quả. Còn khi sử dụng với Axios thì không hề có chuyện đó. Nó lấy trực tiếp khi promise return.

### 2 - POST HTTP calls

Using Fetch
```
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "Title of post",
    body: "Post Body"
  })
})
  .then(res => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.log(error));
```

Using Axios
  ```
axios
  .post("https://jsonplaceholder.typicode.com/posts", {
    title: "Title of post",
    body: "Body of post"
  })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));
```

Tương tự như GET thì khi sử dụng Fetch thì chúng ta phải convert data qua JSON.stringify(), với Axios thì chúng ta có thể bỏ một cách thoải mái.

### 3 - Error handling

Using Fetch
```
fetch("https://jsonplaceholder.typicode.com/todos/100000")
  .then(response => {
    if (!response.ok) throw Error(response.statusText);
    return response.json();
  })
  .then(data => console.log("data", data))
  .catch(error => {
    console.log("error", error);
  });
// error Error: Not Found
```

Using Axios
```
axios
  .get("https://jsonplaceholder.typicode.com/todos/100000")
  .then(response => {
    console.log("response", response);
  })
  .catch(error => {
    console.log("error", error);
  });
// error Error: Not Found
```

Axios network errors một cách trực tiếp còn nếu bạn làm việc với Fetch thì bạn phải check propertie response.ok.

### 4 - Simultaneous requests
Serial and parallel trong promise là một khái niệm quan trọng, bạn cần luôn luôn sử dụng vì nó quyết định tới performance code của bạn. Ở đây chỉ là một ví dụ nhỏ trong các ví dụ mà những bài trước đã trình bày.

Using Fetch
```
Promise.all([
  fetch('https://api.github.com/users/anonystick'),
  fetch('https://api.github.com/users/anonystick')
])
.then(async([res1, res2]) => {
  const a = await res1.json();
  const b = await res2.json();
  console.log(a.login + ' has ' + a.public_repos + ' public repos on GitHub');
  console.log(b.login + ' has ' + b.public_repos + ' public repos on GitHub');
})
.catch(error => {
  console.log(error);
});
```

Using Axios
```
axios.all([
  axios.get('https://api.github.com/users/anonystick'), 
  axios.get('https://api.github.com/users/anonystick')
])
.then(axios.spread((obj1, obj2) => {
  // Both requests are now complete
  console.log(obj1.data.login + ' has ' + obj1.data.public_repos + ' public repos on GitHub');
  console.log(obj2.data.login + ' has ' + obj2.data.public_repos + ' public repos on GitHub');
}));
```

### 5 - Upload
Upload thì toi nghĩ cái quan trọng là làm sao quản lý được monitor the progress khi upload thôi, để làm được điểu đó thì Fetch chưa support. Trong khi đó chúng ta có thể sử dụng Axios trong trường hợp này

```
const config = {
  onUploadProgress: event => console.log(event.loaded)
};
axios.put("/api", data, config);
```
### Kết Luận
Trên đây là những ví dụ về so sánh giữa Axios và Fetch. Trong năm 2020 bạn nên sử dụng gì. Với bạn nào sử dụng Node thì việc sử dụng Axios thì không bàn cãi, nhưng trên browser thì việc sử dụng khi nào thì nên cân nhắc.