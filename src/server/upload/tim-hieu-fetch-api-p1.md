# Fetch là gì???

Fetch API là một API đơn giản cho việc gửi và nhận requesst bằng js. Với fetch thì việc thực hiện các yêu cầu web và xử lý phản hồi dễ dàng hơn so với XMLHttpRequest cũ.

Bạn có thể kiểm tra trình duyệt đang sử dụng của mình có hỗ trợ "fetch" không. Ví dụ: 

```js
if (!('fetch' in window)) {
  console.log('Fetch API not found, try including the polyfill');
  return;
}
// We can safely use fetch from now on
```

Phương thức fetch () nhận đầu vào là url để truy vấn rồi trả về  response của request đó.

# **Tạo một request**

Hãy xem một ví dụ đơn giản về fetch một file JSON:

```js
fetch('examples/example.json')
.then(function(response) {
  // Do stuff with the response
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
```

Chúng ta thêm url cho truy xuất dưới dạng parameter để fetch. Trong trường hợp này, đây url là `examples/example.json`. Phương thức fetch() trả về  một promise có trạng thái resolves với giá trị là response cho request đó.

Khi promise resolves, response được truyền tới `.then`. Đây là nơi mà  có thể  sử dụng response. Nếu request không thành công, thì sẽ chuyển tới `.catch` với  tham số là lỗi tương ứng.

Response trả về của request chứa kết quả và các thuộc tính, phương thức hữu ích. Ví dụ, `response.ok`, `response.status` và `response.statusText ` đều có thể được sử dụng để đánh giá trạng thái của response.

Đánh giá sự thành công của các response là đặc biệt quan trọng khi sử dụng fetch bởi vì các bad response (như 404) vẫn được resolve. Chỉ có duy nhất một trường hợp promise sẽ bị reject là nếu request không thể thực hiện (không có kết nối mạng). Nếu code trước đó đã được update validate cho responses, giống như sau:

```js
fetch('examples/example.json')
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Do stuff with the response
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
```

Bây giờ nếu thuộc tính `ok` của object trả về là false thì function sẽ gửi về lỗi gồm `response.statusText`.

# **Đọc response trả về**

Responses có phương thức truy cập vào nội dung trả về. Ví dụ, Response.json() trả về  một promise resolves dạng JSON. Thêm bước này vào ví dụ hiện tại sẽ cập nhật code thành:

```js
fetch('examples/example.json')
.then(function(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  // Read the response as json.
  return response.json();
})
.then(function(responseAsJson) {
  // Do stuff with the JSON
  console.log(responseAsJson);
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});
```

Dễ hiểu hơn:

```js
function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem: \n', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}

function fetchJSON(pathToResource) {
  fetch(pathToResource) // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(logResult) // 4
  .catch(logError);
}

fetchJSON('examples/example.json');
```

**Tóm tắt lại:**

Bước 1. Fetch một url `example/example.json`. Fetch trả về  một promise, promise sẽ được resolves, giá trị trả về  sẽ được truyền tới hàm validateResponse.

Bước 2. validateResponse sẽ nhận đầu vào là response và kiểm tra xem có hợp lệ không (status là 2xx không?). Nếu không, sẽ có lỗi và chuyển đến hàm .catch thực thi. Bước này rất quan trọng nếu không có thì responses chứa lỗi  này được sẽ truyền xuống code tiếp theo. Nếu responses là valid, nó được chuyển tới hàm readResponseAsJSON.

Bước 3. readResponseAsJSON sẽ đọc nội dung của response bằng phương thức Response.json(). Phương thức này trả về một promise resolves dạng JSON. Khi promise được resolves, dữ liệu JSON được chuyển tới hàm logResult.

Bước 4. Cuối cùng, dữ liệu JSON từ request ban đầu tới `examples/example.json` được ghi lại bởi logResult.


_Tài liệu dịch_: https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api