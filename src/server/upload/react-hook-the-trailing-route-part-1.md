# `React Hook - The trailing route (Part 1)`
Trong bản React 16.8, React đã chính thức đưa Hooks thành một official feature để cộng động có thể sẵn sàng sử dụng và trải nghiệm với nó. Qua các phiên bản cập nhật update khác nhau, giờ đây React Hook đã update và trở nên mạnh mẽ, nhanh chóng và ổn định hơn. Với Hooks, ta sẽ không còn phải quan tâm đến Class Component và vô số các life cycle hook cần dùng liên quan đến nó nữa. Giờ đây dự án của bạn sẽ có thể chỉ còn là các function, và function programing đang trở lại mạnh mẽ hơn bao giờ hết.
![](https://images.viblo.asia/9602dcc9-03c0-4567-a377-e94c48f5a2c8.jpg)
## Basic usage of useState
Nhìn qua cách sử dụng cơ bản của Hook
```js
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(100)

  const increase = () => setCount(count + 1)

  return (
    <div className="App">
      <h1>Hello, my count is {count}</h1>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```
Trước đây với function component, ta không thể khởi tạo state cho nó được. Nhưng giờ đây, khi sử dụng với useState, function này sẽ nhận giá trị truyền vào là khởi tạo ban đầu cho state hay còn gọi là initial state. Hàm này trả về 2 giá trị trong 1 array. Item thứ nhất chính là state đó, item thứ 2 là function để cập nhật state hay setState mà ta vẫn hay dùng.

Giá trị khởi tạo có thể ở bất kỳ kiểu dữ liệu nào mà ta mong muốn như object, array, string, number ...
```js
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```
## Basic usage of useEffect
Vậy với những trường hợp mà ta vẫn hay dùng như load API, khi component render xong trên màn hình thì xuất hiện modal thông báo, v.v thì với function component như này thi làm như thế nào. Ở đây, react cung cấp cho ta thêm một API mới là useEffect, giúp ta có thể dễ dàng sử lý những bài toán này.
Nhưng trước hết hãy refactor đoạn code trên cho đẹp đã. Ta sẽ tách chúng ra một function riêng nhé.
```js
function useCount() {
  const [count, setCount] = useState(100);
  const increase = () => setCount(count + 1);
  return [count, increase];
}
```
Giờ thử gọi API và render ra danh sánh học sinh nào
```js

function useStudents() {
  const [students, setStudents] = useState([]);
  return [students, setStudents];
}

function fetchStudents() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, name: "David" }, { id: 2, name: "Nguyen" }]), 1000)
  })
}

export default function App() {
  const [count, increase] = useCount();
  const [students, setStudents] = useStudents();

  useEffect(() => {
    fetchStudents().then(result => {
      setStudents(result);
    });
  }, [setStudents]);

  return (
    <div className="App">
      <h1>Hello, my count is {count}</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```
useEffect đàm bảo rằng sẽ được gọi sau khi mà component đó đã được render ra, và được cập nhật gọi lại tương ứng mỗi khi render. Ở đây tôi truyền vào [setStudents] sẽ đảm bảo rằng khi useEffect này sẽ chỉ được gọi một lần duy nhất.
Tôi vừa giả lập gọi API, delay sao 1s thì sẽ xuất hiện kết quả trả về.

## Conclusion
Như vậy qua một số ví dụ cơ bản, t đã giới thiệu cách sử dụng cơ bản và áp dụng nó vào trong dự án thì như thế nào. Ở các phần tiếp theo, tôi sẽ đi sâu hơn vào phân tích và sử dụng useEffect. Cám ơn các bạn đã theo dõi.

## `References`
1. https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
2. https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889