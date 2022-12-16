Như đã biết `Redux` là thư viện dùng để quản lý `state` cho `React`.  Nhưng để config redux vào react của mình thì khá phức tạp và mất nhiều thời gian, và code cũng cần viết nhiều. Để giải quyết các vấn đề này thì Redux Team đã tạo một package khác là **Redux Toolkit**.  Sau khi generate project xong, nó đã có đầy đủ thư viện và config sẵn cũng như các helper để mình có thể dùng redux một cách hiệu qủa và ngắn gọn hơn.

Tuy nhiên bạn cần biết về cơ bản của `Redux` trước khi bắt đầu với Redux toolkit.  Nó sẽ cho bạn hiểu nhanh hơn. 

# Cài đặt
**Requirement**: Đã cài đặt xong `Nodejs` và `npm` version mới nhất 

Tạo project mới:
```bash
npx create-react-app redux-toolkit-demo --template redux
```

Hoặc nếu muốn cài đặt vào  existing App của mình: 

```bash
# NPM
npm install @reduxjs/toolkit

hoặc

# Yarn
yarn add @reduxjs/toolkit
```

Cài đặt xong, chạy `yarn start` để start server. 

![](https://images.viblo.asia/399d62dc-15b5-4f2b-8a1b-7089bca4488a.png)

#  Usage và Demo
Redux toolkit đã có sẵn một demo để mình có thể thảm khảo về hoạt động và cách sử dụng của nó. 
Bây giờ mình sẽ viết một demo khác để chúng ta càng hiểu rõ hơn. Demo này chỉ đơn giản là : 
+  Input để nhập task name
+ Button để Add task 
+ List các tasks đã Add

### Tạo Redux State Slice
 Tạo file mới `src/features/task/taskSlice.js`
 ```jsx
 import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    }
  }
});

export const { addTask } = taskSlice.actions;
export const selectTask = (state) => state.task;
export default taskSlice.reducer;
```

`createSlice` cần params như sau:
+ name: là string, dùng để đặt tên cho slice. 
+ initialState: dùng để init value cho reducer.
+ reducers: là các method để update value của state  trong reducer.

Như trên, thì mình có slice tên là "task". `initialState` = const initialState, và method `addTask` sẽ add thêm task vào array tasks.
 
 Khi slice này đã tạo xong, mình có thể export các `redux action creators` và `reducer state `của slice này.
 
###  Thêm Slice Reducers vào Store

 Tiếp theo mình cần import reducer trên và add nó vào store. 
 
 Modify file `app/store.js`
 
```jsx
...
import taskReducer from '../features/task/taskSlice'; // Thêm vào
...

export const store = configureStore({
  reducer: {
    ..
    task: taskReducer // Thêm vào
  },
});
```

### Sử dụng Redux State và Actions trong React Component 
Ở trên mình đã tạo các action và reducer xong rồi, bây giờ mình có thể dùng React-Redux hooks  để cho React component thao tác với Redux store.
+ `useSelector` dùng để đọc data từ store.
+ `useDispatch` dùng để dispatch actions.

Tạo file mới `src/features/task/Task.js`

```jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  selectTask
} from './taskSlice';

export function Task() {
  const taskData = useSelector(selectTask);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");

  return (
    <div>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <button
        onClick={() => dispatch(addTask(taskName))}
      >
        Add Task
      </button>

      <ul>
        {taskData.tasks.map((task, index) => (
            <li key={index}>{task}</li>
          )
        )}
      </ul>
    </div>
  );
}
```

Khi click button Add Task:
+ Action `addTask` sẽ được dispatch tới store
+ Task slice reducer sẽ nhận thấy action này và update state của nó
+ `<Task>` component trên sẽ nhận thấy state mới từ store và sẽ re-render view với data mới.

Đến đây là xong, mình đã hoàn thành demo cơ bản nhất về cách sử dụng Redux Toolkit rồi. 

![](https://images.viblo.asia/605a3110-7375-4f0e-9586-a179f5316064.png)


Source Code: https://github.com/yongsokheng/redux-toolkit-demo