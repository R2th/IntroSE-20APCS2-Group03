# Recoil

Khi việc chia sẻ data giữa các cấp component trong **React** gặp khó khăn, bạn sẽ nghĩ tới *Redux*. Tuy nhiên, *Redux* hay các thư viện quản lý state khác của react quá phức tạp hoặc chưa thể làm hài lòng bạn. **Recoil** chính là một giải pháp khác.

## 1. Recoil là gì nhỉ?

-------

**Recoil** chính là 1 thư viện dùng để *quản lý state* của **React**, bên cạnh 1 loạt thư viện hầm hố khác như: redux, mobX, flux, … hay thậm chí là *context* của chính React. Chà, thấy nhiều quá cũng hoang mang nhỉ, nhưng đừng lo, hãy cùng mình đánh giá và so sánh giữa *Recoil* với *Redux* nhé (vì thằng *Redux* này nổi tiếng nhất).

### Redux

- Ưu điểm:
  + Quá nổi tiếng, quá phổ biến.
  + Sử dụng *global state* (tức là nguyên app sẽ có 1 cái state bự).
- Nhược điểm:
  - Chính vì nó là *global state* và cơ chế *immutable*, nên mỗi khi có 1 thay đổi nhỏ, nguyên cái *global state* đó sẽ được clone ra, cập nhật thay đổi, thay vào chỗ state cũ, sau đó là xóa state cũ ==> Sẽ có vấn đề về hiệu năng app khi cái *global state* của bạn quá bự và thường xuyên cập nhật.
  - Sử dụng hơi lằng nhằng (khá cần mấy cái *middleware* đi kèm).

### Recoil

* Ưu điểm:
  * Cú pháp gần gũi, dễ sử dụng (do giống với state mặc định trong **React**).
  * Sử dụng các state riêng lẻ (gọi là các *atom* nhé, phân biệt bằng *key*).
  * Hỗ trợ luôn quản lý state *bất đồng bộ* (không cần *middleware* rườm rà như **Redux** nhé).
  * Của *facebook*. :)
* Nhược điểm:
  * Khá mới mẻ, ít người biết và sử dụng.
  * Mới chỉ là *experimental* ==> chưa ổn định ==> sử dụng vào *production* thì nên cân nhắc nhé.



## 2. Các API chính của Recoil

---

#### Recoil Root

* Là thằng bự nhất bọc bên ngoài để có thể sử dụng *Recoil* bên trong. (giống **Context Provider** của **React** hoặc là **Provider** trong **Redux** ấy, nhưng không cần cung cấp *store* lằng nhằng gì đâu nhé).
* Có thể có nhiều root cùng tồn tại, và khi nested thì thằng trong cùng sẽ là thằng có tác dụng nhé.

```jsx
ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
```

#### Atom

* Nó giống như *state* trong **React** ấy. Function này sẽ trả về *recoil state* cho bạn. Và cũng như *react state*, khi *recoil state* thay đổi thì các component đang sử dụng nó cũng sẽ được thay đổi.

```javascript
const listTodoState = atom({
  key: 'listTodo',	// là unique string, bắt buộc phải có nhé.
  default: [],		// giá trị mặc định khi khởi tạo.
});
```

#### Selector

* Cũng trả về *recoil state* luôn nhé. Nhưng điểm khác với *atom* ở đây chính là *selector* sẽ nhận vào pure function và xử lý *state* từ *atom* để tạo ra 1 *state* biến đổi khác (giống như *selector* trong *React-Redux* ấy, nghe có vẻ rắc rối, nhưng đi vào ví dụ là hiểu ngay nè).

```javascript
const newListState = selector({	// newListState này sẽ chứa danh sách các hành động có trạng thái là new.
  key: 'newList',	// cũng là unique string và bắt buộc phải có.
  get: ({ get }) => {	// đây là pure function, cũng bắt buộc phải có.
    const list = get(listTodoState);	// đây là cách để lấy cả list todo đã tạo với atom ở bước trên.
    return list.filter((item) => item.status === 'new');	// chọn và trả về những thằng có status là new.
  }
});
```

* Hỗ trợ cả bất đồng bộ luôn

```javascript
export const pkmIdState = atom({
  key: 'currentPkmId',
  default: 1,
});

export const pkmDetailState = selector({
  key: 'pkmDetail',
  get: async ({ get }) => {
    const id = get(pkmIdState);
    if (!id) {
      return;
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pkm = await res.json();
      return pkm;
    } catch (err) {
      return null;
    }
  },
});
```

#### Hooks

* **useRecoilState**: giống y change *useState* của **React** luôn, nhận vào *recoil state*, trả về giá trị của *state* cùng với hàm để thay đổi giá trị *state*.

```javascript
const [todoList, setTodoList] = useRecoilState(listTodoState);
```

* **useRecoilValue**: cũng nhận vào *recoil state*, nhưng khác cái là chỉ trả về giá trị của *state* - dùng để truy xuất giá trị *state*.

```javascript
const todoList = useRecoilValue(listTodoState);
```

* **useSetRecoilState**: giống cái *useRecoilState*, nhưng chỉ trả về hàm để thay đổi giá trị *state*.

```javascript
const setTodoList = useRecoilValue(listTodoState);
```

* **useResetRecoilState**: trả về hàm để reset *state* về giá trị default.

```javascript
const resetTodoList = useResetRecoilState(newListState);
```



## 3. Code cái Todo-App với Recoil thử nào

---

* Khởi tạo một **React** project với *create-react-app*

```javascript
npx create-react-app recoil-example
```

* Vào trong project vừa khởi tạo và cài **Recoil** thôi nào

```javascript
cd ./recoil-example && yarn add recoil && yarn start
```

* Kế tiếp, mình sẽ tạo thư mục *recoil* trong *src*, để chứa các *recoil state*, dạng thế này

![Cấu trúc thư mục](https://i.imgur.com/SYHEuWi.png)

* Sau đó, mình sẽ tạo file *listState.js* trong folder *recoil* (như hình trên), dùng để chứa list todo state.

```javascript
import { atom } from 'recoil';

const defaultData = [
  {
    id: 1,
    content: 'Action 1',
    status: 'new',
  },
  {
    id: 2,
    content: 'Action 2',
    status: 'inprogress',
  },
];

const listTodoState = atom({
  key: 'listTodo',
  default: defaultData,
});
```

* Tiếp đó là tạo *new list state* để trả về danh sách những action có *status* là *new*

```javascript
export const newListState = selector({	// newListState này sẽ chứa danh sách các action có trạng thái là new.
  key: 'newList',
  get: ({ get }) => {
    const list = get(listTodoState);	// đây là cách để lấy cả list todo đã tạo với atom ở bước trên.
    return list.filter((item) => item.status === 'new');	// chọn và trả về những thằng có status là new.
  }
});
```

* Làm tương tự để tạo *in-progress list* và *completed list* thôi

```javascript
export const inprogressListState = selector({	// inprogressListState này sẽ chứa danh sách các action có trạng thái là inprogress.
  key: 'inprogressList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return list.filter((item) => item.status === 'inprogress');
  }
});
export const completedListState = selector({	// completedListState này sẽ chứa danh sách các action có trạng thái là completed.
  key: 'completedList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return list.filter((item) => item.status === 'completed');
  }
});
```

* Giờ thì tạo 3 components: *NewList*, *InProgressList* và *CompletedList* để hiện 3 danh sách tương ứng ra màn hình

```jsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { newListState } from './recoil/listState';

const NewList = () => {
  const newList = useRecoilValue(newListState);	// ở đây chỉ hiện data, nên useRecoilValue là đủ.
  return (
    <div className='col'>
      <h3>New</h3>
      <ul>
        {newList.map((item) => (
          <li key={item.id}>
            {item.content}
            <button>In-Progress</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewList;
```

```jsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { inprogressListState } from './recoil/listState';

const InProgressList = () => {
  const inProgressList = useRecoilValue(inprogressListState);
  return (
    <div className='col'>
      <h3>In-Progress</h3>
      <ul>
        {inProgressList.map((item) => (
          <li key={item.id}>
            {item.content}
            <button>Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InProgressList;
```

```jsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { completedListState } from './recoil/listState';

const CompletedList = () => {
  const completedList = useRecoilValue(completedListState);
  return (
    <div className='col'>
      <h3>Completed</h3>
      <ul>
        {completedList.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;
```

* Chỉnh *App.js* lại để sử dụng 3 components vừa tạo, và cùng với đó là bọc cái **RecoilRoot** vào vì mình có sử dụng *Recoil* bên trong nhé

```jsx
import React from 'react';
import { RecoilRoot } from 'recoil';
import NewList from './NewList';
import InProgressList from './InProgressList';
import CompletedList from './CompletedList';
import './App.css';

function App() {
  return (
    <RecoilRoot>
      <div className='App'>
        <header className='App-header'>
          <h1>To-do List</h1>
        </header>
        <div className='content'>
          <NewList />
          <InProgressList />
          <CompletedList />
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;
```

* Chà, vậy là đã hiện được cái danh sách lên màn hình rồi. Tiếp tới là phải thêm những hành động mới vào cái list to-do này chứ nhỉ. Đầu tiên là thêm hàm *set* vào *newListState* để thêm 1 hành động vào danh sách

```jsx
export const newListState = selector({
  key: 'newList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return list.filter((item) => item.status === 'new');
  },
  set: ({ get, set }, newValue) => {
    const list = get(listTodoState);
    // tạo 1 cái hành động mới
    const newTodo = {
      id: new Date().getTime(),	// id tạo vậy để khỏi lo bị duplicate
      content: newValue,	// tên hành động được truyền vào
      status: 'new',	// hành động mới nên có status là new
    };

    set(listTodoState, [...list, newTodo]);	// hàm set dùng để thay đổi giá trị của recoil state từ atom
  },
});
```

* Giờ thì tạo 1 cái component để người dùng nhập nội dung hành động thôi

```jsx
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { newListState } from './recoil/listState';

const NewActionInput = () => {
  const addNewTodo = useSetRecoilState(newListState);	// dùng useSetRecoilStat do chỉ set chứ không cần đọc
  const [text, setText] = useState('');	// dùng nội bộ trong component thì xài state của React là đủ

  const handleAddNewAction = () => {
    if (!text) {
      return;
    }
    addNewTodo(text);	// đây là chỗ truyền giá trị cho hàm set ở newListState lúc nãy (cái biến newValue á)
    setText('');
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <div className='action-input'>
      <input
        type='text'
        placeholder='Enter new to-do action'
        value={text}
        onChange={handleChangeText}
      />
      <button onClick={handleAddNewAction}>Add</button>
    </div>
  );
};

export default NewActionInput;
```

* Thêm cái *NewActionInput* vào *App.js* luôn để còn xài chứ

```jsx
<header className='App-header'>
  <h1>To-do List</h1>
</header>
<NewActionInput />
<div className='content'>
  <NewList />
  <InProgressList />
  <CompletedList />
</div>
```

* Giờ mình sẽ thêm chức năng chuyển trạng thái từng hành động từ new -> in-progress -> completed nhé. Nếu bạn để ý thì trong component *NewList* và *InProgressList* đã có tạo sẵn *button* trong đó rồi, nên tiếp theo là tạo hàm *set* cho *inprogressListState* và *completedListState*

```javascript
export const inprogressListState = selector({
  key: 'inprogressList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return list.filter((item) => item.status === 'inprogress');
  },
  set: ({ get, set }, id) => {	// để set 1 cái hành động có id này thành trạng thái inprogress
    const list = get(listTodoState);
    set(
      listTodoState,
      list.map((item) =>
        item.id === id ? { ...item, status: 'inprogress' } : item
      )
    );
  },
});
export const completedListState = selector({
  key: 'completedList',
  get: ({ get }) => {
    const list = get(listTodoState);
    return list.filter((item) => item.status === 'completed');
  },
  set: ({ get, set }, id) => {	// để set 1 cái hành động có id này thành trạng thái completed
    const list = get(listTodoState);
    set(
      listTodoState,
      list.map((item) =>
        item.id === id ? { ...item, status: 'completed' } : item
      )
    );
  },
});
```

* Gắn vào cái button trong 2 cái component NewList và InProgressList

```jsx
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newListState, inprogressListState } from './recoil/listState';

const NewList = () => {
  const newList = useRecoilValue(newListState);
  const setInprogress = useSetRecoilState(inprogressListState);
  const handleClick = (id) => () => {
    setInprogress(id);	// truyền id vào
  };
  return (
    <div className='col'>
      <h3>New</h3>
      <ul>
        {newList.map((item) => (
          <li key={item.id}>
            {item.content}
            <button onClick={handleClick(item.id)}>In-Progress</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewList;
```

```jsx
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { inprogressListState, completedListState } from './recoil/listState';

const InProgressList = () => {
  const inProgressList = useRecoilValue(inprogressListState);
  const setCompleted = useSetRecoilState(completedListState);
  const handleClick = (id) => () => {
    setCompleted(id);	// truyền id vào
  };
  return (
    <div className='col'>
      <h3>In-Progress</h3>
      <ul>
        {inProgressList.map((item) => (
          <li key={item.id}>
            {item.content}
            <button onClick={handleClick(item.id)}>Completed</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InProgressList;
```

* Doneee, vậy là xong to-do app rồi á, chỉnh css lại xíu thì bạn sẽ có thành quả như này

![kết quả](https://i.imgur.com/iHS6Ssh.png)

* Đây là github repo của cái example này nhé: https://github.com/NVTri1010/recoil-example

## 4. Tổng kết

----

*Cú pháp* đơn giản gần gũi, đáp ứng đủ yêu cầu của 1 *thư viện quản lý state*, hỗ trợ cả *bất đồng bộ*, lại còn không có vấn đề về *scalability* nữa chứ. **Recoil** khá là ổn phải không?! Tuy nhiên, mình xin nhắc lại là nó vẫn đang *experimental* nhé, nên hãy *cân nhắc* trước khi đáp luôn nó vào *production* đấy. Còn bạn, bạn nghĩ gì về **Recoil**? Đừng ngại chia sẻ bên dưới *comment* nhé, mình rất mong nhận được sự quan tâm cũng như câu hỏi và góp ý từ mọi người. Cám ơn các bạn đã dành thời gian để đọc bài viết này của mình. 

Bài viết mang ý kiến và suy nghĩ cá nhân của bản thân mình, có tổng hợp từ nhiều nguồn trên mạng.

*P/S*: Nếu bạn muốn biết rõ hơn và tiếng Anh cũng ok thì vào xem trực tiếp video của tác giả **Recoil** - **Dave McCabe** luôn nhé, link đây: https://www.youtube.com/watch?v=_ISAA_Jt9kI