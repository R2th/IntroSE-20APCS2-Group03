JavaScript chạy đồng bộ, có nghĩa là nó sẽ thực thi đoạn code theo thứ tự. Ví dụ
```JavaScript
console.log(1);
console.log(2);
console.log(3);
```

Kết quả là 
```
1
2
3
```

Các request bất đồng bộ sẽ đợi bộ đếm timter kết thúc hoặc yêu cầu hồi đáp trong khi phần còn lại của đoạn code vẫn tiếp tục được thực hiện, và sau khi thời gian kết thúc một callback sẽ thực hiện các yêu cầu bất động bộ này.
1 ví dụ nhỏ về bất đồng bộ

```JavaScript
console.log('1');
setTimeout(function afterTwoSeconds() {
  console.log('2')
}, 2000)
console.log('3');
```

Kết quả  sẽ log ra theo thứ tự "1 3 2". Do `2` được log ra sau 2s. Nó sẽ không block chờ quá trình mà thay vào đó nó sẽ thực hiện các đoạn code tiếp theo, và sau khi hết timer nó sẽ quay lại `afterTwoSeconds` để thực hiện tiếp đoạn code trong đó. Đến đây chắc có lẽ bạn đã hiểu được 1 chút của cơ chế Async (bất đồng bộ)
Vậy làm thế nào để chạy 1 chuỗi sự kiện bất đồng bộ 1 cách đồng bộ ?? :D. Hãy cùng tôi đi tìm hiểu nhé!
## Đặt vấn đề

- Tìm kiếm user trên GitHub và repository tương ứng của user đó. Nhưng khó khăn là làm sao biết được tên chính xác, vì thế nên phải liệt kê hết user có tên gần giống tương ứng với repository.
- Không quá cao siêu với 1 UI như thế này

![](https://images.viblo.asia/dce54f11-5449-4490-b0da-d3e685bc1161.png)

Trong ví dụ lần này với XMLHttpRequest, hoặc cũng có thể sử dụng jQuery `$.ajax` cũng là một cổng giao tiếp API
Để get được user và repository thì github dev cung cấp cho chúng ta API docs [này] (https://developer.github.com/v3/repos/#list-user-repositories) với params ví dụ như sau để lấy được data
```JavaScript
// Với API: https://api.github.com/users/diep/repos
function request(url) {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;
  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
       // Thực hiên các xử lý sau khi server trả về thành công
      } else {
       // Thực hiên các xử lý sau khi server trả về không thành công
      }
    }
  }
  xhr.ontimeout = function () {
    // Well, it took to long do some code here to handle that
  }
  xhr.open('get', url, true)
  xhr.send();
}
```

Với các ví dụ đưa ra, tôi không hướng tới kết quả của các ví dụ, điều quan trọng là sự khác nhau của các phương pháp và mỗi phương pháp là mỗi cách áp dụng khác nhau tuỳ vào hoàn cảnh trong quá trình phát triển

## Callback
Có thể lưu tham chiếu của một hàm trong một biến khi sử dụng JavaScript. Sau đó có thể sử dụng chúng làm đối số của các hàm khác để thực hiện sau. Nó gọi là callback
Ví dụ

```JavaScript
// Execute hàm doThis với một function  andThenThis là param. doThis sẽ thực thi bất kỳ đoạn code nào bên trong nó và khi kết thúc andThenThis sẽ được thực thi
doThis(andThenThis)
// Bên trong doThis nó có tham chiếu được gọi là callback, nó chỉ là một biến giữ tham chiếu đến chức năng này
function andThenThis() {
  console.log('and then this')
}
// Tên param thì gì cũng được
function doThis(callback) {
  console.log('this first')
  
  // the '()' is when you are telling your code to execute the function reference else it will just log the reference
  // Gọi callback() là thực thi tham chiếu của hàm khác, nó sẽ chỉ log ra tham chiếu
  callback()
}
```

Áp dụng lý thuyết vào bài toán hàm request lấy data
```JavaScript
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
Nó sẽ thực hiện callback khi thành công hoặc khi có lỗi xảy ra
```JavaScript
const userGet = `https://api.github.com/search/users?page=1&q=diep&type=Users`
request(userGet, function handleUsersList(error, users) {
  if (error) throw error
  const list = JSON.parse(users).items
  list.forEach(function(user) {
    request(user.repos_url, function handleReposList(err, repos) {
      if (err) throw err
      // Xử lý list repository
    })
  })
})
```

Để hoàn hảo hơn và có thể xử lý được nhiều error hơn thì sẽ tách callback tách biệt với function request
```JavaScript
try {
  request(userGet, handleUsersList)
} catch (e) {
  console.error('Request fail! ', e)
}
function handleUsersList(error, users) {
  if (error) throw error
  const list = JSON.parse(users).items
  list.forEach(function(user) {
    request(user.repos_url, handleReposList)
  })
}
function handleReposList(err, repos) {
  if (err) throw err
  
  // Xử lý list repositories
  console.log('Repos', repos)
}
```

## Promises
Promises có thể làm code trông clean hơn và dễ đọc hơn. Để tạo 1 promise
```Javascript
const myPromise = new Promise(function(resolve, reject) {
  
  let codeIsFine = true // or false to test reject
  
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

- Một promise được khởi tạo với 2 trạng thái là `resolve` và `reject`
- Viết code cần async bên trong promise với điều kiện để resolve và reject nếu không mong muốn
- Khi `resolve` thì `.then` sẽ thực thi Promise, còn `reject` với `.catch`
Những điều cần lưu ý khi sử dụng Promise
- `resolve` và `reject` chỉ chấp nhận 1 tham số
- Và nếu cố tình truyền 2 param, thì trong `.then` nó sẽ chỉ nhận được param đầu tiên
- Nếu sử dụng nhiều chuỗi `.then`, luôn phải thêm return vào cuỗi mỗi callback, nếu không nó sẽ thực hiện cùng lúc gây ra 1 kết quả sai

Với ví dụ callback bên trên, có thể viết lại với promise
```JavaScript

function request(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
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
    xhr.send();
  })
}

const userGet = `https://api.github.com/search/users?page=1&q=diep&type=Users`
const userRequest = request(userGet)

userRequest
  .then(handleUsersList)
  .then(repoRequest)
  .then(handleReposList)
  .catch(handleErrors)
  
function handleUsersList(users) {
  return JSON.parse(users).items
}

function repoRequest(users) {
  return Promise.all(users.map(function(user) {
    return request(user.repos_url)
  }))
}

function handleReposList(repos) {
  console.log('All users repos in an array', repos)
}

function handleErrors(error) {
  console.error('Something went wrong ', error)
}
```

## Async/Await
Khá đơn giản, chỉ cần cho biết đâu là function  bất đồng bộ và phần nào sẽ phải chờ nó kết thúc. Ví dụ
```Javascript

function afterTwoSeconds(value) {
  return new Promise(resolve => {
    setTimeout(() => { resolve(value) }, 2000);
  });
}

async function sumTwentyAfterTwoSeconds(value) {
  const remainder = afterTwoSeconds(20)
  return value + await remainder
}

sumTwentyAfterTwoSeconds(10)
  .then(result => console.log('after 2 seconds', result))
```
- `sumTwentyAfterTwoSeconds` là function async
- Chờ (await) cho `resolve` hoặc `reject` trong `afterTwoSeconds`
- Nó sẽ chỉ kết thúc trong `.then`khi `await` kết thúc
Với ví dụ về function request, vẫn giữ nguyên Promise trong function request
Áp dụng async await trong các xử lý 
```Javascript
async function list() {
  const userGet = `https://api.github.com/search/users?page=1&q=diep&type=Users`
  
  const users = await request(userGet)
  const usersList = JSON.parse(users).items
  
  usersList.forEach(async function (user) {
    const repos = await request(user.repos_url)
    
    handleRepoList(user, repos)
  })
}

function handleRepoList(user, repos) {
  const userRepos = JSON.parse(repos)
  
  // Xử lý từng repo của user
  console.log(user, userRepos)
}
```

Chúng dễ tiếp cận hơn, dễ đọc, dễ thay đổi hơn. Một nhược điểm của Async/await là chúng không hỗ trợ các trình duyệt cũ. Phải sử dụng Node8. Nhưng đừng lo lắng, ta có [Babel](https://babeljs.io/) mà :D
Cảm ơn bạn đã theo dõi bài viết.! Hãy ủng hộ bằng cách comment xuống bên dưới để giúp mình cải thiện kiến thức


Refs: 
> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
>https://javascript.info/async-await
>https://developer.github.com/v3/repos/
>https://medium.freecodecamp.org/