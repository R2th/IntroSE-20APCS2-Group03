Hook được giới thiệu trong lần ra mắt React vervion 16.8, cho phép nhà phát triển dùng ```state``` và ```Effect``` trong function component thay vì chỉ dùng được  trong class. 

Câu hỏi đặt ra là tại sao ```facebook``` lại làm như vậy? theo các cụ thì lý do là gì

1. Code ngắn hơn, sạch sẽ dễ hiểu, dễ test hơn, test một function bao giờ cũng dễ dàng hơn test môt class đúng không các cụ
2. Dễ dàng chia sẽ logic giữ các component thay vì dùng ```HOC```
3. Giảm dung lượng bundle file
4. Ứng dụng chạy mượt mà hơn khi mà các lifecycle được loại bỏ

Đây là những cái mình rút ra trong quá trình tiếp xúc với hook, cụ thể thế nào mọi người tự tìm hiểu, cuối bài mình sẽ có ví dụ ```Counter``` cho các cụ dễ hình dung.

Theo mình dự đoán trong tương lai gần ```facebook``` sẽ loại bỏ việc dùng class chuyển sang dùng function component 

Dông dài, và nói toàn những thứ cao siêu. Nếu ai chưa clear phần nào thì tự tìm hiểu ```HOOK``` trước đã nhé. Mình không giới thiệu hook là gì, ở bài này mình chỉ tổng hợp các ưu điểm của hook để mọi người có thể nắm được cái gọi là tinh túy của việc dùng ```HOOK``` và tại sao nên dùng

Sau đây chúng ta đi vào một ví dụ rất kinh điển ```Counter``` nhưng dưới cái ```view``` của ```Hook``` thì nó sẽ thế nào nhé. Để các cụ có thể hình dung được tốt hơn

Đầu tiên khởi tạọ 1 project mới bằng một câu thần chú

```
npx create-react-app demo-react-hook
cd demo-react-hook
npm start
```

như kiểu Aladin gọi vừng ơi mở cửa ra ấy nhỉ :D. Đợi build xong project trong vòng một nốt nhạc, khuyên các cụ dùng ```yarn``` build nhanh hơn còn vì sao nhanh hơn thì hỏi anh google nhé :D

Bây giờ chúng ta bắt đầu vào việc chính là sử dụng hook để làm một counter thay vì dùng class kinh điển

Tạo file ```Counter.js``` với nội dung như sau

```
import React, { useState, useEffect } from 'react';

function Counter(startCount) {
  const [ count, setCount ] = useState(startCount);
  useEffect(() => {
    document.title = `clicked ${count} times`;
  });
  return (
    <>
      <Count count={count} />
      <div style={{display: 'flex'}}>
        <button onClick={() => setCount(count + 1)} style={{backgroundColor: '#69b99e'}}> - </button>
        <button onClick={() => setCount(count - 1)} style={{backgroundColor: '#69b99e'}}> + </button>
      </div>
    </>
  )
}
export default Counter;
```

Các cụ đã thấy không có môt ```class``` nào được khai báo đúng không? hook có nhiều loại basic hook, advance hook. Ở đây mình mới chỉ dùng cái basic thôi đấy nhé :D. Muốn tìm hiểu sau xin mời xem document trên [facebook](https://reactjs.org/docs/hooks-intro.html) 

Vì giải thích qua 1 chút đoạn code trên, như các bạn thấy không thể khai báo state trong constructor vì không có ```class```. Để thay đổi state đơn giản chúng ta sử dụng ```useState``` trong đó có 2 đối số 

1. State là gì trong ví dụ trên là ```count``` cái này tương tự như khai báo state trong function constructor đúng không nào
2. function để biển đổi state là ```setCount``` cái này tương tự như function ```setState``` trong class nhỉ :D
3. Nếu muốn set state mặc định 1 giá ban đầu đơn giản chúng ta truyền tham số vào cho function ```useState``` ví dụ như là ```useState(10)```. Điều này có nghĩa là giá trị count ban đầu sẽ bắt đầu từ 10 các cụ nhé

Nó cũng đơn giản phải không nào, khi đã có counter là một function component rồi. Việc đơn giản là import vào file ```App.js```

Code chúng ta sẽ đơn giản thế này 

```
import React from 'react';
import logo from './logo.svg';
import Counter from './Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
      </header>
    </div>
  );
}

export default App;
```

Và kết quả của chúng ta thu được vô cùng tuyệt vời 
![](https://images.viblo.asia/b3d2c703-fc33-4519-94ff-f55ba1992a82.png)


Kết luận cuối cùng là hook react là một cái gì đó rất ra gì nên dùng để code được clear dễ maintain hơn, giảm được dung lượng bundle file, đặc biệt là nó làm cho ứng dụng chúng ta chạy nhanh hơn mượt mà hơn. Mặt khác nó còn share logic giữ các component với nhau mà không phải dùng ```HOC```