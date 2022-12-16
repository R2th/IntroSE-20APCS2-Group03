### 1. Asynchronous Javascript

Thực tế : fetch 1 file, access đến DB và trả về kết quả, access 1 video stream từ webcam, hoặc broadcast màn hình hiển thị đến 1 VR headset, .... 
Lấy 1 ví dụ thực tế tại sao với những tình huống này, khó sử dụng synchronous Javascript (Javascript đồng bộ)

```js
let response = fetch('myImage.png'); (1) - asynchronous fetching 
let blob = response.blob(); (2) - hiển thị image blob trên UI
```

Nếu (2) được chạy khi response từ (1) chưa có thì lỗi --> Cách dễ nhất là khắc phục bằng asynchronous Javascript 
Có 2 style viết asynchronous code
+ Old-style callbacks
+ Promise-style code 

### 2. Async callbacks

Async callbacks là các function được chỉ định như là argument gọi đến 1 function khác (function lồng function). Khi chạy xong, có lời gọi trả về success hay fail. Mọi người đang dần thay thế callback bằng promise, nhưng callback vẫn khá phổ biến ở thời điểm hiện tại. 

```js
btn.addEventListener ('click', () => {
    alert ('Clicked!');
    
let pElem = document.createElement('p');
pElem.textContent = 'This is a newly-added paragraph';
document.body.appendChild(pElem);
});
```

Tham số đầu tiên là loại event được listen, tham số thứ 2 là callback function khi event được trigger

VD :

```js
function loadAsset(url, type, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = type;
    
    xhr.onload = function () {
        callback(xhr.response);
    };
    
    xhr.send();
}

function displayImage(blob) {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement('img');
    image.src = objectURL;
    document.body.appendChild(image);
}

loadAsset('coffee.jpg', 'blob', displayImage);
```

### 3. Promises

Promise là 1 modern, efficient version của XMLHttpRequest. Promise là 1 object biểu diễn cho success/ failure của 1 async operation.

VD :

```js
fetch('products.json').then(function(response) {
    return response.json();
}).then (function(json) {
    let products = json;
    initialize(products);
}).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
});
```

### 4. So sánh promise và callback

Promises có 1 số điểm giống với callback. Chúng trả về 1 object, từ đó chúng ta attach callback function, thay vì truyền callback vào 1 function.
Tuy nhiên, có 1 số điểm lợi hơn 

- Có thể chain nhiều async operation sử dụng nhiều **.then()** operations, truyền kết quả của 1 operation này đến operation khác. Nếu thay thế bằng callback thì sẽ phải lồng function trong function, khá là khó nhìn
- Dễ xử lý lỗi hơn- tất cả các error đều được xử lý bằng chỉ 1 **.catch()** block tại cuối block, hơn là phải xử lý nhiều lần 

### 5. Ví dụ về việc sử dụng asynchrous code thuần

Chúng ta cùng tìm hiểu về 1 ví dụ minh hoạ về async code, và vấn đề khi chúng ta không nhận thức đầy đủ về code execution order.

```js
console.log('Starting');
let image;

fetch('coffee.jpg').then((response) => {
  console.log('It worked!');
  return response.blob();
}).then((myBlob) => {
  let objectURL = URL.createObjectURL(myBlob);
  image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}).catch((error) => {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log('All done!');
```

fetch execute 1 cách bất đồng bộ mà không bị blocking, do đó in ra màn hình sẽ là 

```
Starting 
All done!
It worked!
```

Chúng ta expect 
```
Starting 
It worked!
All done!
```

Để fix lỗi đằng trên, chúng ta sửa như sau 

```js
console.log('Starting');
let image;

fetch('coffee.jpg').then((response) => {
  console.log('It worked!');
  return response.blob();
}).then((myBlob) => {
  let objectURL = URL.createObjectURL(myBlob);
  image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
}).then(() => {
    console.log('All done! ' + image.src);
}).catch((error) => {
  console.log('There has been a problem with your fetch operation: ' + error.message);
});

console.log('All done!');
```