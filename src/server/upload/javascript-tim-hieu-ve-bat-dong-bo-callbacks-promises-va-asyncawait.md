Hầu hết khi bắt đầu làm việc với JavaScript chúng ta thường lúng túng và khó hiểu với khái niệm asynchronous - bất đồng bộ của JS. Trong bài viết này chúng ta sẽ cùng tìm hiểu về vấn đề này nhé!<br>
### 1. Asynchrony trong JavaScript
> Asynchrony in computer programming refers to the occurrence of events independently of the main program flow and ways to deal with such events.

Không giống như các ngôn ngữ C/C++ hay Java... sử dụng cơ chế đa luồng(**multi-thread**). Nghĩa là các công việc tốn thời gian có thể thực hiện độc lập trên một thread riêng biệt mà không can thiệp vào thread chính. Bạn vẫn có thể thực hiện công việc đó mà vẫn có thể bắt các sự kiện ở thread chính.<br>
Nhưng đối với JavaScript thì lại khác, vì các JavaScript program là **single-thread**, tất cả các tiến trình thực thi một cách tuần tự, không song song. Chính vì vậy không thể xử lí đa luồng trong JavaScript mà phải sử dụng cơ chế xử lý **bất đồng bộ**.
Hiểu một cách nôm na trong bất đồng bộ, khi thực hiện hai công việc A và B. Khi bắt đầu thực hiện công việc A, tiếp tục thực hiện công việc A mà không cần đợi A kết thúc. Thời gian thực hiện AB là thời gian tính từ khi A bắt đầu cho đến khi A, B đều kết thúc. Do đó làm tăng hiệu năng và tăng trải nghiệm người dùng.<br>
    ![](https://images.viblo.asia/7bbf0e99-222c-4bd3-9e49-49d460006dad.png)

Có 3 cơ chế phổ biến giúp bạn thực hiện việc asynchronous trong JavaScript là **Callback**, **Promise** hoặc **Async/await.**
### 2. Callback
Khi thực hiện một công việc cần tiêu tốn một khoảng thời gian nhất định(ví dụ fetch data từ API). Chúng ta thực hiện một function request data và truyền thêm một function khác để xử lý kết quả trả về (**handleResponse()()**). Hàm handleResponse() lúc này được đóng vai trò là hàm callback():
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
Khi việc request API bắt đầu và kết thúc, lúc này *handleResponse()* sẽ được gọi. Tuy nhiên khi ta phải thực hiện 2 request liên tiếp, request 2 chỉ được thực thi khi request 1 kết thúc. Như vậy ta sẽ phải thực hiện request thứ 2 trong kết quả của request 1. Nghe có vẻ rất phức tạp nhưng nó sẽ trông như sau:<br>

```
request('http://www.somepage.com', function (firstError, firstResponse, firstBody) {
    if(firstError){
        // Handle error.
    }
    else {
        request(`http://www.somepage.com/${firstBody.someValue}`, function (secondError, secondResponse, secondBody) {
            if(secondError){
                // Handle error.
            }
            else {
                // Use secondBody for something
            }
        });
    }
});
```
Thử tưởng tượng bạn phải thực hiện thêm vài request khác nữa thì kết quả chắc chắn sẽ còn kinh khủng hơn rất nhiều. Trường hợp này gọi là** Callback Hell.**

Để tránh Callback Hell, bạn có thể sử dụng một cơ chế khác. Đó là Promise.
### 3. Promise
Khác với Callback cần cung cấp một callback function, Promise có sẵn các phương thức để gọi đến khi function thực hiện success hoặc fail đó là then() và catch(). Trông nó sẽ giống như sau:<br>
```
someAsyncOperation(someParams)
.then(function(result){
    // Do something with the result
})
.catch(function(error){
    // Handle error
});
```
Vậy tương tự như Callbacl Hell, thì trong promise sẽ trông ra như thế nào??<br>
```
const axios = require(‘axios’);
axios.get(‘http://www.somepage.com')
.then(function (response) { // Reponse being the result of the first request
    // Returns another promise to the next .then(..) in the chain
    return axios.get(`http://www.somepage.com/${response.someValue}`);
})
.then(function response { // Reponse being the result of the second request
    // Handle response
})
.catch(function (error) {
    // Handle error.
});
```
Rõ ràng lúc này chương trình đã trở nên rõ ràng hơn và không còn nhiều callback function lồng nhau như cơ chế callback nữa
### 4. Async/await
Async/await là một cú pháp đặc biệt giúp bạn khai báo rằng function sẽ thực hiện một hành động bất đồng bộ. **Await** để khai báo việc đợi kết quả của một hoạt động không đồng bộ bên trong một hành động nào đó có từ khóa **async**.<br>
```
async function getSomeAsyncData(value){
    const result = await fetchTheData(someUrl, value);
    return result;
}
```
Và kể cả dù bạn có thực hiện nhiều request đi chăng nữa thì nó cũng đơn giản hơn rất nhiều phải không nào. Và theo mình, đây có lẽ là cách tốt nhất để xử lý bất đồng bộ trong JavaScript, theo quan điểm của bạn thì sao nhỉ?<br>
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
        // Every error thrown in the whole “awaitable” chain will end up here now.
    }
}
```

### Kết luận:
Trên đây là một số kiến thức cơ bản về xử lý bất đồng bộ trong JavaScript với callback, promise và async/await. Bài này không viết chi tiết về Promise hay async/await mà chỉ giúp bạn thấy được cách sử dụng cơ bản, cũng như ưu điểm của chúng so với việc sử dụng callback thông thường.

**Tài liệu tham khảo:**
- https://medium.com/codebuddies/getting-to-know-asynchronous-javascript-callbacks-promises-and-async-await-17e0673281ee
- https://completejavascript.com/xu-ly-bat-dong-bo-callback-promise-async-await