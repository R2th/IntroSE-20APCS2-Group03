# 1. Giới thiệu

- Hooks là một tính năng mới được thêm vào React 16.8. Nó cho phép bạn có thể sử dụng state và các chứ năng khác của React mà không cần khởi tạo Class, điều đó có nghĩa là có thể sử dụng state trong functional component.
- Effect Hook cho phép thực hiện side effect bên trong các *function component*

Nếu mọi người chưa biết về hook thì nên đọc qua bài viết về cách sử dụng hook cũng như hàm ***useState*** tại [trang chủ của reactjs](https://reactjs.org/docs/hooks-state.html). Bài viết này sẽ tìm hiểu cơ bản khái niệm cũng như cách sử dụng ***useEffect***.

# 2. React hook và useEffect() là gì?

Khi tham khảo tài liệu trên ReactJS offical và tìm kiếm về ***useEffect***, chúng ta sẽ có 1 típs như này:
> If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined. 


Điều đó có nghĩa là: mục đích ***useEffect*** để quản lý vòng đời của của một component và nó phục vụ chúng ta sử dụng trong *function component* thay vì các *lifecycle* như trước đây trong *class component.*

Lifecycle method trong *class component* thực sự rất quan trọng, đôi khi chúng ta muốn fetch dữ liệu từ API khi rendering 1 component, đôi khi chúng ta muốn thực hiện những action cụ thể khi component update,... 2 Methods được cho là quan trọng nhất chính là **componentDidMount** và **componentDidUpdate**. 

***useState*** cho phép chúng ta sử dụng state trong functional components. ***useEffect*** cho phép chúng ta sử lý logic trong lifecycle methods. Từ cái tên ***useEffect*** chắc chúng ta cũng hiểu được hàm sẽ được gọi mỗi khi có gì đó ảnh hưởng đến components của bạn. Và thực sự nó giống với  định nghĩa của  **componentDidMount** và **componentDidUpdate**.

# 3. Cách sử dụng useEffect() trong nhiều trường hợp

Hãy thử viết một vài đoạn code để tìm hiểu **useEffect()**. Chẳng hạn chúng ta muốn khai báo thuộc tính trong state của 1 object, và 2 thuộc tính đó là name và familyName. Initial state sẽ là "name" và "family" và sau khi rendering, component sẽ thay đổi.

First step: Khởi tạo states

```javascript
import React, {useState} from 'react';

export const EffectDemo = () => {
    //State
    const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
    const [title,setTitle] = useState('useEffect() in Hooks');
    
    
    return(
        <div>
            <h1>Title: {title}</h1>
            <h3>Name: {fullName.name}</h3>
            <h3>Family Name: {fullName.familyName}</h3>
        </div>
    );
};
```

Second Step: khai báo **useEffect()**

```javascript
import React, {useEffect, useState} from 'react';

export const EffectDemo = () => {
    //State
    const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
    const [title,setTitle] = useState('useEffect() in Hooks');

    //useEffect
    useEffect(() => {
        setFullName({name:'TrungHC',familyName: 'HCT'});
    });

    return(
        <div>
            <h1>Title: {title}</h1>
            <h3>Name: {fullName.name}</h3>
            <h3>Family Name: {fullName.familyName}</h3>
        </div>
    );
};
```

như mọi người đã thấy, đối số của useEffect() là một hàm xử lý khi có gì thay đổi components. Sau đây là kết quả:

![](https://images.viblo.asia/375d1753-f79e-4fa9-8dac-468d1a628960.png)


Như vậy kết quả đã như chúng ta mong muốn :) Tuy nhiên check log đã, xem hàm useEffect này được gọi bao nhiêu lần 

```javascript
import React, {useEffect, useState} from 'react';

export const EffectDemo = () => {
    //State
    const [fullName, setFullName] = useState({name: 'name', familyName: 'family'});
    const [title,setTitle] = useState('useEffect() in Hooks');

    //useEffect
    useEffect(() => {
        console.log('useEffect has been called!');
        setFullName({name:'TrungHC',familyName: 'HCT'});
    });

    return(
        <div>
            <h1>Title: {title}</h1>
            <h3>Name: {fullName.name}</h3>
            <h3>Family Name: {fullName.familyName}</h3>
        </div>
    );
};
```

Và đây là kết quả:

![](https://images.viblo.asia/c5b1e75d-4785-4958-815e-178b8be96161.png)

Như vậy đúng như những gì chúng ta hiểu, ***useEffect*** sẽ được gọi mỗi khi components thay đổi, tuy nhiên ở đây thì đó không phải là thứ mà chúng ta mong muốn, hiện tại useEffect đang là một method giống như hàm **componentDidUpdate** vậy. Để cho giống với **componentDidUpdate** thực sự thì chúng ta cũng có thể điều khiển hàm ***useEffect*** bằng câu lệnh điều kiện, nó chính là tham số thứ 2 của hàm ***useEffect().***   Tham số thứ 2 của useEffect là một mảng, mảng này cho biết rõ chỉ gọi ***useEffect()*** khi giá trị phần tử trong mảng thay đổi.
Chẳng hạn:

```js
useEffect(() => {
  console.log('useEffect has been called!');
  setFullName({ name: 'TrungHC', familyName: 'HCT' });
}, [fullName.name]);
```

![](https://images.viblo.asia/81cf46a6-7c58-497d-8769-d370dfd51385.png)

Như vậy hàm ***useEffect()*** chỉ được gọi 2 lần: 1 lần khi render components, 1 lần khi set name thành "TrungHC".

Vậy nếu chúng ta muốn hàm useEffect() chỉ gọi 1 lần khi render components (tương đương với **componentDidMount**) thì như thế nào? Trong trường hợp này ta chỉ cần truyền tham số thứ 2 của ***useEffect()*** là 1 hàm rỗng []

```js
useEffect(() => {
  console.log('useEffect has been called!');
  setFullName({ name: 'TrungHC', familyName: 'HCT' });
}, []);
```

Với hàm này thì ***useEffect()*** sẽ giống hệt với **componentDidMount**

![](https://images.viblo.asia/64f838f9-3931-4562-8bea-fa70f66a2872.png)

Và Lifecycle cuối cùng cũng hay sử dụng nữa là hàm componentWillUnmount, chúng ta cũng có thể sử dụng useEffect() định nghĩa hàm componentWillUnmount.

Như chúng ta đã biết thì **componentWillUnmount** sẽ chạy mỗi khi một component chuẩn bị remove khỏi tree DOM, cùng xét 1 ví dụ:

```js
() => {
  useEffect(() => {
    const clickWindow = () => console.log('1')
    window.addEventListener('click', clickWindow)

    // return 1 function, sẽ được gọi ngay trước khi componentWillUnmount
    return () => {
      window.removeEventListener('click', clicked)
    }
  }, [])

  return <div>F12 check log của trình duyệt!</div>
}
```

Thực tế thì ***useEffect*** cho phép chúng ta return 1 function, function này sẽ thực thi trước khi mà component đó được Unmount.

# 4. Tổng kết

Như vậy với ReactHooks thì chúng ta gần như đã xử lý được state trong functional components, những method cơ bản trong lifecycle đã được giải quyết với **useEffect()**. Hy vọng qua bài viết này mọi người đã hiểu qua được cách sử dụng ***useEffect()***

# 5. Tư liệu tham khảo

- [https://reactjs.org/docs/hooks-effect.html](https://reactjs.org/docs/hooks-effect.html)
- [React Hooks: How to use useEffect()](https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f)