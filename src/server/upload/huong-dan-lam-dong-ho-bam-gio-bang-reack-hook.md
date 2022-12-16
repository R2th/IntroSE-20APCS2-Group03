- Để thực sự hiểu mọi thứ hoạt động như thế nào, chúng ta nên chia nó thành nhiều phần nhỏ hơn, đây là những gì chúng ta đang làm ở đây.
-  Mục tiêu cuối cùng của chúng tôi là  xây dựng đồng hồ bấm giờ để hiểu cách setInterval và clearInterval hoạt động như thế nào trong Reack Hook

## Bắt đầu

- Trước tiên, hãy chia nhỏ mọi thứ. 

```js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)

  const handleStart = () => {
    // start button logic here
  }

  const handlePause = () => {
    // Pause button logic here
  }

  const handleResume = () => {
    // Resume button logic here
  }

  const handleReset = () => {
    // Reset button logic here
  }

  return (
    <div className="app">
      <h3>React Stopwatch</h3>
      <div className='stopwatch-card'>
        <p>{timer}</p> {/* here we will show timer */}
        <div className='buttons'>
          <button onClick={handleStart}>Start</button>
          <button onClick={handlePause}>Pause</button>
          <button onClick={handleResume}>Resume</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;

```

- Bộ đếm thời gian sẽ bắt đầu từ 0 trở đi bằng cách nhấp vào nút bắt đầu (Start)

- isActive được xác định để xem bộ đếm thời gian có hoạt động hay không.

- isPaused được xác định để xem bộ hẹn giờ có bị tạm dừng hay không.

- Ban đầu, cả hai giá trị sẽ là false. Chúng ta sẽ xác định các giá trị này để hiển thị các nút Bắt đầu (Start) , Tạm dừng(Pause)  và Tiếp tục (Resume).

## UseRef hook

- useRef giúp chúng ta lấy hoặc kiểm soát tham chiếu của bất kỳ phần tử nào.

- Nó cũng giống như chúng ta lấy tham chiếu trong vanilla javascript bằng cách sử dụng document.getElementById ("demo") có nghĩa là chúng ta đã bỏ qua DOM ảo và xử lý trực tiếp với các trình duyệt

- Nếu chúng ta chạy đoạn code này, chúng ta sẽ thấy kết quả như hình ảnh dưới đây.

- Bây giờ chúng ta có ba nhiệm vụ phải làm: 

- Viết function cho các nút(start, pause, resume, reset)
- Định dạng bộ đếm thời gian như trong đồng hồ bấm giờ (00: 00: 00)
- Hiển thị có điều kiện các nút

### Viết function cho các nút

#### Hàm Start
- Hàm start là bắt đầu đếm thời gian và tiếp tục tăng lên cho đến khi chúng ta ấn nút tạm dừng nó.

- Ở đây, chúng tôi sẽ sử dụng phương thức setInterval. setInterval chạy miễn là chúng ta không dừng nó lại. Nó có hai tham số truyền vào. Một là callback, 2 là thời gian tính bằng mili giây.

```js
setInterval(func, time)

1000 ms = 1 second
```

```js
const handleStart = () => {
  setIsActive(true)
  setIsPaused(true)
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000)
}
```

- Ngay sau khi chúng ta nhấn nút bắt đầu, isActive và isPaused sẽ trở thành true và 1 sẽ được thêm vào các giá trị thời gian sau mỗi giây.

- Chúng tôi đặt thuộc tính hiện tại countRef cho hàm setInterval, có nghĩa là chúng tôi đặt timerId trong biến countRef, bây giờ chúng tôi có thể sử dụng nó trong các hàm khác.

- Chúng tôi đã sử dụng countRef.current để lấy giá trị hiện tại của tham chiếu.

#### Hàm Pause
- setInterval tiếp tục chạy chính nó cho đến khi  clearInterval nó sẽ dừng

- Để dừng hoặc tạm dừng bộ đếm, chúng ta cần sử dụng chức năng clearInterval. clearInterval cần một tham số là id. Chúng ta sẽ truyền countRef.current như đối số trong phương thức clearInterval.

```js
const handlePause = () => {
  clearInterval(countRef.current)
  setIsPaused(false)
}
```
- khi nhấn nút Tạm dừng, chúng tôi sẽ dừng (not reset) đếm thời gian và thay đổi trạng thái isPaused từ true thành false

####  Hàm Resume

```js
const handleResume = () => {
  setIsPaused(true)
  countRef.current = setInterval(() => {
    setTimer((timer) => timer + 1)
  }, 1000)
}
```
- Khi ấn nút tiếp tục , chúng tôi sẽ bắt đầu set lại hẹn giờ từ vị trí nó bị tạm dừng và thay đổi isPaused từ false thành true.

#### Hàm Reset

```js
const handleReset = () => {
  clearInterval(countRef.current)
  setIsActive(false)
  setIsPaused(false)
  setTimer(0)
}
```

- Reset Function sẽ đặt lại mọi thứ về các giá trị ban đầu. Nút reset này sẽ không chỉ dừng đếm thời gian mà còn đặt lại giá trị của nó về 0.

#### Logic các nút button

- Khi thời gian bắt đầu chạy, nút start sẽ chuyển thành nút Pause nếu chúng ta ấn nút Pause , chúng ta sẽ thấy nút Resume. Đây là cách đồng hồ bấm giờ hoạt động.

- Làm thế nào để chúng ta biết nút nào để hiển thị?

- Đối với điều đó, chúng tôi đã sử dụng 2 trạng thái là isActive và isPaused

- Cả isAcitive và isPause ban đầu khởi tạo đều là false
- Nêú cả isAcitive và isPause đều là false thì chúng ta hiện ô bắt đầu.

### Điều gì xảy ra trong trường hợp tạm dừng?

- isActive sẽ là true, isPaused sẽ là false

- Trái lại, chúng ta sẽ hiển thị nút Resume

- Chúng ta cần viết điều kiện if else lồng nhau. Để hiển thị nút start hoặc pause / Resume


###  Định dạng hẹn giờ

Một phần khó khăn khác của ứng dụng là hiển thị đồng hồ theo cách này 00:00:00

  #### Giây
  
```js
const getSeconds = `0${(timer % 60)}`.slice(-2)
```

  #### Phút
  
 ```js
const minutes = `${Math.floor(timer / 60)}`
 const getMinutes = `0${minutes % 60}`.slice(-2)
```

#### Giờ
```js
const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)
```

- Chúng tôi đã dựng hàm formatTime , hàm này trả về giây, phút và giờ.

```js
const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

```
### Kết luận
- Tôi đã hướng dẫn xong cách làm đồng hồ bấm giờ bằng React Hook. Hãy nêu cảm nhận bài viết ở cmt, xin cảm ơn.
-  **Link demo:** https://codepen.io/ovuthiyen/pen/rNWzgLa