Hello, xin chào mọi người hôm nay mình sẽ nói về useMemo trong Reactjs nhé xem nó có gì hay ho nào.

À mình có một blog bạn nào quan tâm thì có thể ghé thăm tại https://nxv109.com

Nói đến lập trình viên Reactjs thì có thể các bạn đã từng sử dụng đến React hooks, cụ thể ở đây là useMemo, nó khá quen thuộc nhưng không hẳn là ai cũng hiểu và sử dụng nó đúng cách nên...
Hôm nay mình sẽ tìm hiểu xem   **useMemo là gì ? khi nào nên sử dụng ?** nhé.

## 1. useMemo là gì?
useMemo nó nằm trong collections hooks của Reactjs ( useState, useEffect, useCallback, useReducer, useRef, useContect,... ) được bổ sung ở version 16.8, thì nói đến hooks thì các bạn hay sử dụng phổ biến như là **useState**, **useEffect**, còn nâng cao hơn tí là **useMemo**.
**Vậy useMemo là gì ?** nó thực ra cũng là một hàm, mà hàm này có tác dụng là giúp performance của app được tốt lên.
Có 2 tham số đó là function và một list dependencies, nó sẽ memorizes value output của một function và chỉ recomputed memoried value này khi mà một trong các dependencies thay đổi. Nói cách khác thì useMemo sẽ lưu giá trị trả về của function và nó sẽ kiểm tra xem phụ thuộc thay đổi thì nó mới chạy hàm phía trong, còn không thì sẽ trả về value đã cached trước đó. Mình thêm một ví dụ cho dể hiểu nhé.

**Khi không sử dụng useMemo:**

```js
import React, {useState} from 'react';

function App() {
  const [length, set_length] = useState(3);
  const [name, set_name] = useState('John Doe');

  return (
    <>
      <input value={name} onChange={e => set_name(e.target.value)} />
      <NameDisplay name={name}/>
      <hr />
      <input value={length} onChange={e => set_length(Number(e.target.value))} />
      <FibDisplay length={length} />
    </>
  );
}

function FibDisplay({length}) {
  console.log('Calculating numbers & rerendering...');
  const numbers = [1, 1];
  for (let i = 2; i < length; i++) {
    numbers[i] = numbers[i - 1] + numbers[i - 2];
  }

  return <p>{length} numbers of the fibonacci sequence: {numbers.join(', ')}</p>;
}

function NameDisplay({name}) {
  console.log('Rerendering name...');
  return <p>Your name is {name}</p>;
}

export default App;
```

Ở đoạn code trên bạn có thể thấy hàm **FibDisplay** và **NameDisplay** sẽ render lại nếu một trong 2 state name và length bị thay đổi, tới đây bạn có thể thấy có sự rerender không cần thiết phải không ạ. Đó là khi chỉ thay đổi *name* nhưng funtion **FibDisplay** cũng bị rerender. Tiếp theo mình sẽ sử dụng useMemo nhé!

```js
import React, {useState, useMemo} from 'react';

function App() {
  const [length, set_length] = useState(3);
  const [name, set_name] = useState('John Doe');

  return (
    <>
      <input value={name} onChange={e => set_name(e.target.value)} />
      <NameDisplay name={name}/>
      <hr />
      <input value={length} onChange={e => set_length(Number(e.target.value))} />
      <FibDisplay length={length} />
    </>
  );
}

function FibDisplay({length}) {
  const numbers = useMemo(() => {
    console.log('Calculating numbers...');
    const result = [1, 1];
    for (let i = 2; i < length; i++) {
      result[i] = result[i - 1] + result[i - 2];
    }
    return result;
  }, [length]);

  return <p>{length} numbers of the fibonacci sequence: {numbers.join(', ')}</p>;
}

const NameDisplay = React.memo(function ({name}) {
  console.log('Rerendering name...');
  return <p>Your name is {name}</p>;
});

export default App;
```

Bạn có thể thấy hàm **FibDisplay** chỉ rerender khi *length* thay đổi thôi. Và mình có sử dụng thêm **React.memo** nó có tác dụng chỉ render lại khi props thay đổi.

À mình cũng so sánh thêm một tí về **useMemo** và **useEffect** để các bạn hiểu hơn, sự khác nhau đó là useEffect có *side-effects* còn useMemo thì không nó chỉ là một pure function thôi. Còn *side-effects* là thì thì các bạn tìm hiểu thêm nhé.

## 2. Khi nào nên sử dụng useMemo?
useMemo giúp performance của app trở nên rất tốt, nhưng các bạn cũng đừng nên lạm dụng nó quá. Chỉ sử dụng khi những *really expensive computation* thôi, còn không thì không dùng thì app bạn vẫn tốt thôi.

## 3. Kết luận:
Hy vọng bài viết này sẽ giúp các bạn hiểu rõ hơn về useMemo và giúp ích được cho các bạn trong các dự án thực tế. Cảm ơn các bạn đã ghé thăm bài viết của mình <3