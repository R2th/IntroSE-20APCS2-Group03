React.js là một UI library khá nổi tiếng trong lập trình web, có hàng trăm hàng ngàn developer đang làm việc với React.js hàng ngày. 
Tất cả trong số đó chắc hẳn ai cũng rất quen thuộc hai khái niệm cơ bản của React là *state* và *props*.
Thế nhưng liệu bạn đã thực sự hiểu cách mà React xử lý chúng? (ở đây mình chỉ nhắc đến Functional component)

Nhắc lại một chút về 2 khái niệm trên. 
State là data được component trực tiếp nắm giữ và quản lý, nó hoàn toàn có quyền thay đổi tùy ý, còn props là data component nhận được từ component cha truyền xuống, nó không có cách nào thay đổi được props nếu như component cha không truyền một hàm làm nhiệm vụ thay đổi giá trị props đó.

Ví dụ: component App đang đóng vai trò là component cha, nắm giữ state count, component Counter là component con, nhận props bao gồm count và hàm setCount.
```
import { useState } from "react";
import Counter from "./Counter";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Counter count={count} setCount={setCount} />
    </div>
  );
}
```

Đây là cách component Counter sử dụng props. Rất dễ hiểu đúng không, button Increase mỗi lần được click sẽ chạy hàm increase, làm tăng count thêm 1 đơn vị.
```
const Counter = ({ count, setCount }) => {
  const increase = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
};

export default Counter;
```

Mình sẽ thêm 1 dòng code vào hàm increase để tạo ra chút vấn đề. Theo bạn, JS sẽ in ra gì ở màn hình console sau mỗi lần button được click?
```
const Counter = ({ count, setCount }) => {
  const increase = () => {
    setCount(count + 1);
    console.log({ count })
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
};

export default Counter;
```

![](https://images.viblo.asia/0085a14e-9af6-4185-bf42-071fff04d69c.PNG)

Rất nhiều bạn sẽ biết trước được sự "delay" này, rằng câu lệnh console.log luôn in ra "chậm hơn 1 nhịp" so với giá trị của biến count. Vấn đề là ở chỗ, đâu là lý do gây ra việc này?
Có người đã từng trả lời mình, hàm setCount là hàm async, nên nó chưa kịp chạy xong thì câu lệnh console.log đã được chạy, dẫn đến sự delay. Vậy chúng ta cùng thử:
 ```
 const Counter = ({ count, setCount }) => {
  const increase = () => {
    setCount(count + 1);
    setTimeout(() => {
      console.log({ count });
    }, 1000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
};

export default Counter;
```

Mình đã setTimeout 1 giây cho câu lệnh console.log, kết quả cũng không khác gì, thậm chí bạn có set 10s, 100s hay 1000s thì kết quả vẫn tương tự.
Điều gì đang xảy ra vậy nhỉ, giống như hàm increase đang nhận cố định một giá trị count vậy?

Thật ra đúng là như vậy, với Functional component, mỗi lần render tất cả các đoạn code sẽ được chạy lại từ trên xuống, nếu như bạn không sử dụng một số hook đặc biệt.
Vậy khi giá trị count = 1 và được truyền vào Counter, code thật sự bên trong Counter sẽ như sau:
```
const Counter = () => {
  const count = 1
  const setCount = setCount // hàm setCount ở component cha

  const increase = () => {
    setCount(count + 1);
    setTimeout(() => {
      console.log({ count });
    }, 1000);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```

Nhìn vào đây thì dễ hiểu hơn rồi, chẳng phải do async function dẫn đến sự delay, mà là do ở trong lần render đó, giá trị count đã được fix cứng là 1, nên không có cách nào để console.log ra được 2, cho dù bạn có setTimeout bao lâu đi chăng nữa.

Vậy lý do gốc lại là do 1 khái niệm khác của JavaScript, đó là closure. Thực chất mỗi lần render của functional component được hiểu đơn giản là 1 function của JavaScript, nó tạo ra 1 closure bao đóng cho tất cả mọi biến và hàm được khai báo bên trong nó, nên không thể dính dáng đến những lần render khác.

Không chỉ với props, state cũng được xử lý hoàn toàn tương tự bên trong functional component, các bạn có thể thử.

Cuối cùng thì, để học tốt và hiểu sâu React, đừng bỏ qua các khái niệm cơ bản và nâng cao của JavaScript nhé, JS mới là ngôn ngữ, React chỉ là 1 thư viện mà thôi.

Hy vọng các bạn ủng hộ bài viết đầu tay của mình, xin cảm ơn.