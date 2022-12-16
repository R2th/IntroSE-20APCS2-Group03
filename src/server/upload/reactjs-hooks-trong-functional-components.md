Chào các bạn, bài trước trong loạt bài ReacJS của mình đã đề cập và nói qua về LifeCycle Components với các method tương ứng với các giai đoạn trong vòng đời của ReactJS. Và  ở đây chắc mọi nguời đều nhận ra các method này chỉ sử dụng được với class Components trong ReactJS. Như vậy liệu khi dùng với Function Component, có cách nào chúng ta có thể tận dụng được luồng hoạt động trong vòng đời của Component để custom lại theo ý mình không phải với class Components mà là với functional components hay không. Câu trả lời là có thể khi chúng ta sử dụng hooks. Mời các bạn đọc tiếp bài viết của mình nhé.

![](https://images.viblo.asia/a5b9728d-d2ad-4775-8bd4-ac5d005406d5.png)



# 1. Khởi đầu
> React 16.8.0 is the first release to support Hooks. When upgrading, don’t forget to update all packages, including React DOM. React Native supports Hooks since the 0.59 release of React Native. (reacjs.org)

Theo tài liệu ReactJS, từ phiên bản 16.8.0 trở đi chúng ta sẽ có một công cụ mới thay thể cho việc sử dụng các method life-cycle hay có thể thay đổi cách nhìn mới về Functional Component được biết đến như stateless component khi có thể dùng được state trong cách dùng Component này. Đấy là Hooks.
Với Stateful Component (Class Component) các method như componentDidMount, hay componentDidUpdate nhiều khi chúng ta cần gọi chung một phương thức để call API ở trong cả 2 method này gây ra sự trùng lặp. Hooks cũng giải quyết được vấn đề này khi không còn sử dụng "một đống" life-cycle methods trong Component như vậy, code của chúng ta một phần được rõ rànghơn.
Tóm lại : 

**Ưu điểm khi sử dụng hooks:**

- Chúng ta có thể sử dụng state được trong Functional Component.
- Loại bỏ những phức tạp hay code khá rối rắm khi sử dụng với Class Component như phải bind methods, hay bắt buộc khởi tạo constructor khi dùng props...
- Không cần quan tâm những lúc không biết phải dùng method life-cycle nào khi có hooks clear hơn.


=> Từ đó việc sử dụng  Functional Components hoàn toàn có thể thay thế cho Class Components. Và hiện tại xu hướng developer sử dụng ReactJS với Functional Components hơn là Class Components. 
# 2. Sử dụng hooks
### useState()
Và cái đầu tiên khi kể đến hooks  đấy chính là useState(). Với useState() chúng ta đã giải quyết được vấn đề sử dụng state trong Functional Component. Tương đương với việc sử dụng this.state 
```js
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Với đoạn code trên chúng ta thấy thay vì sử dụng this.state chúng ta khai báo ```useState(0)```; như vậy chính là khởi tạo cho count bằng 0 mỗi khi render lại Component. Ngoài ra chúng ta có thể truyền vào một đối tượng hay một mảng nếu muốn vào bên trong useState(). Chúng ta cũng không cần phải sử dụng this.setState mà có thể gọi thẳng setCount hoặc tùy chỉnh bạn định nghĩa trong ```const [count, setCount]```
### useEffect()

Với useEffect() hooks này cho phép thay thế componentDidMount, componentDidUpdate tùy theo từng trường hợp bạn muốn.
```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, [count]); 

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

Với useEffect() ở trên chúng ta sẽ truyền vào 2 tham số, đầu tiên chính là function thực hiện effect,  và khi truyền vào tham số thứ 2 chính là tham số mà useEffect() phụ thuộc vào. Tức là mỗi khi có thay đổi ở count thì function này sẽ được thực thi và re-render lại Component. Như vậy nó giống với componentDidUpdate ở trong ClassComponent. 
```js
    useEffect(() => {
      document.title = `You clicked ${count} times`;
    }, []); 
```
Còn khi không truyền vào tham số thứ 2 như thế này thì việc render sẽ không xảy ra khi có thay đổi vì tham số là mảng rỗng. Như vậy nó giống với việc sử dụng componentDidMount. Chúng ta có thể áp dụng vào việc fetch api và cập nhật lại api khi có thay đổi. 
# 3. Kết luận:
Qua bài này chúng ta có thể hiểu qua về việc sử dụng hooks và một phần nguyên nhân tại sao Functional Components được sử dụng phổ biến hơn. Bài viết chỉ mới giới thiệu qua về 2 function hooks cơ bản đấy là useState() và useEffect() tuy nhiên còn một số function hooks khác được hướng dẫn ngay tại trang chủ của reactjs.org, mọi người lên để tham khảo thêm nhé. Cảm ơn mọi người đã theo dõi bài viết. Chào mọi người và hẹn gặp lại ở những bài viết sau!