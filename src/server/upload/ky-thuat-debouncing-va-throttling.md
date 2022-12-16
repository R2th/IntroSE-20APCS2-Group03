Có một số những chức năng trong một website yêu cầu tính toán rất tốn thời gian. Nếu như một method được gọi thường xuyên, nó có thể ảnh hưởng rất nhiều tới `performance` của `browser`. Vì vậy để tránh tình trạng này, chúng ta sử dụng kỹ thuật `debouncing` và `throttling`. Cả 2 kỹ thuật này được sử dụng cho việc tối ưu `performance` và giới hạn số lần gọi những `functions`. 

### 1. Trường hợp 1
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <input type="text" name="search" id="search" placeholder="Search">
    <script src="index.js" type="text/javascript"></script>
</body>
</html>
```

```javascript
//Case 1 : Without Optimization
let textField = document.querySelector('#search');
textField.addEventListener('input', () => {
    console.count("search action without optimization!!")
})
```

Khi chạy code lên bạn sẽ thấy. chúng ta lắng nghe sự kiện khi input thay đổi giá trị. Mỗi lần bạn nhật vào nó sẽ gọi một function

Việc làm trên không được tối ưu và dẫn tới việc gọi function nhiều lần

Nếu giả sử chúng gia tạo một function được gọi khi user ngừng nhập giá trị và lấy giá trị cuối cùng trong một khoảng thời gian nhất định. Hãy xem cách mình tối ưu nó như thế nào ?
### 2. Kỹ thuật Debouncing

> Trong kỹ thuật debouncing, bất kể user bắn event bao nhiều lần, function được đính kèm sẽ được thực thi sau một thời gian nhất định khi user ngừng bắn event.

Hãy xem mình chỉnh sửa lại code:
```javascript
//Case 2: With Debouncing
const debounce = (func, delay) => {
    let timerId;
    return function () {
        clearTimeout(timerId)
        timerId = setTimeout(() => func.apply(this, arguments), delay)
    };
};

function handleButtonClick() {
     callbackFn();
}

function handleConsole() {
    console.count("debounce function executed!!")
}

let callbackFn = debounce(handleConsole, 1000);

let textField = document.querySelector('#search');
textField.addEventListener('input', handleButtonClick);
```

`debouncing` buộc một function đợi một thời gian nhất định sau đó mới chạy. function được tạo ra nhằm giới hạn số lần một function được gọi mỗi một lần trong một khoảng thời gian nhất định

### 3. Kỹ thuật Throttling

> Throttling là một kỹ thuât mà bất kể user bắn event bao nhiều lần, function được đính kèm sẽ được thực thi chỉ một lần trong một khoảng thời gian nhất định
```javascript
//Case 3: With Throttling
const throttle = (func, delay) => {
    let toThrottle = false;
    return function () {
        if (!toThrottle) {
            toThrottle = true;
            func.apply(this, arguments)
            setTimeout(() => {
                toThrottle = false
            }, delay);
        }
    };
};

function handleButtonClick() {
     callbackFn();
}

function handleConsole() {
    console.count("throttle function executed!!")
}

let callbackFn = throttle(handleConsole, 1000);

let textField = document.querySelector('#search');
textField.addEventListener('input', handleButtonClick);
```

`Throttling` lấy một function và giới hạn delay và return về một function mà function này được gọi chỉ sau giời hạn delay.

Nếu user tiếp tục nhập thì function sẽ được thực thi sau 1000ms ngoài trừ lần đầu tiên nhập đầu tiên. Nó ngăn chặn việc gọi hàm thường xuyên.

### 4. Sự khác nhau giữa Debouncing và Throttling
* `Debouncing` hoãn thực thi cho đến khi không có thay đổi đầu vào nào trong khoảng thời gian delay.
* `Throttling` cho phép thực thi ngay nếu `toThrottle` = `false`. Sau khi thực thi, hàm này sẽ không được gọi cho đến hết khoảng thời gian delay

Ứng dụng thực thế:
- Lấy giá trị cuối cùng của phần tử nào đó khi resize window
- Không gọi API lấy dữ liệu khi người dùng ngừng nhập input
- Lấy dữ liệu tiếp theo khi scroll xuống cuối trang.
- Đo vi trí scroll sau một thời gian nhất định

------------------------------

Nếu thấy không hiểu hoặc có những góp ý cho bài viết thì mong các bạn để lại comment nhé !@#$%^&*