Trong bài trước [Getting start với Redux Toolkit](https://viblo.asia/p/getting-start-voi-redux-toolkit-naQZRnRdZvx), chúng ta đã làm quên và làm demo về cách sử dụng cũng như cách hoạt động của Redux Toolkit rồi. Trong bài này, chúng ta sẽ tiếp tục tìm hiểu sâu hơn về cách làm việc với API, cách fetch API sẽ làm như thế nào. 

# Usage
Khi làm việc với API, chúng ta sẽ cần phải chờ đến khi API thực hiện xong, mới tiếp tục thao tác gì đó. Việc như thế này được gọi là **asynchronous**, với Redux chỉ có **synchronous** thôi. Vậy để thực hiện được **synchronous**, chúng ta cần một middleware như  **Redux-Thunk** hoặc **Saga**. Với Redux Toolkit, **Redux-Thunk** là đã tích hợp sẵn rồi. 

### createAsyncThunk(type, payloadCreator)
Hàm này nhận 2 params: 
1. **type**: là string. Nó chính là action type.
2. **payloadCreator**:  là callback. 


 Khi **createAsyncThunk** được dispatch, thunk sẽ thực hiện như sau:
 
*  dispatch action **pending** 
*  gọi callback **payloadCreator** và chờ giá trị promise trả về.
   - Nếu promise trả về thành công, sẽ dispatch action **fulfilled** với giá trị là **action.payload**
   - Nếu promise trả về fail, sẽ dispatch action **rejected** với giá trị **action.error.message**



# Ví dụ mẫu

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Đầu tiên, tạo thunk
export const fetchToDoList = createAsyncThunk(
 'todo/fetchList', 
 async (userId) => {
    const response = await fetchById(userId)
    return response.data
 });

// Tiếp thep xử lý các actions trong reducers.
const todoSlice = createSlice({
  name: 'todo',
  initialState: { todos: [], loading: 'idle' },
  reducers: {
    
  },
  extraReducers: {
    [fetchToDoList.pending]: (state, action) => {
      state.loading = 'pending'
    },
    [fetchToDoList.fulfilled]: (state, action) => {
     state.loading = 'success';
      state.todos.push(action.payload)
    },
    [fetchToDoList.rejected]: (state, action) => {
        state.loading = 'error'
        state.error = action.error
    }
  }
})

// Cuối cùng, dispatch thunk trên
dispatch(fetchToDoList(1))
```

# Áp dụng vào Demo
Bây giờ chúng ta sẽ thay đổi bài demo trước thành **asynchronous** nhé

Sửa `src/features/task/taskSlice.js`

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',
};

// --- Tạo thunk ---
export const addTaskAsync = createAsyncThunk(
  'task/addTask',
  async (taskName) => {
    const response = await new Promise((resolve) =>
    // --- Gọi API ---
      setTimeout(() => resolve({ data: taskName }), 1000)
    );
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ...
  },
  extraReducers: (builder) => {
   // --- Xử lý trong reducer với case pending / fulfilled / rejected ---
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks.push(action.payload);
      });
  }
});

// --- Export addTaskAsync ---
export const { addTaskAsync } = taskSlice.actions;
...

```

Sửa `src/features/task/Task.js`

```js
import {
 ...,
 addTaskAsync,
 ...
} from './taskSlice';

export function Task() {
...
    return(
          <button
            onClick={() => dispatch(addTaskAsync(taskName))}
          >
            Add Task
          </button>
    )      
 ...
}
```

Khi `dispatch(addTaskAsync(taskName))` nó sẽ thực hiện các bước như sau:

1. dispatch action **pending**. Lúc đó mình đã set giá trị status:  "loading". Đây là lúc để mình xử lý sự kiện nào đó trước khi API fetch xong, có thể cho loading, ....
2. Sau khi API đã fetch xong (như trên mình đã delay 1000ms), nếu fetch API thành công, nó sẽ return `response.data` và sẽ dispatch action `fulfilled`. Trong này giá trị action.payload chính là response.data. 
3. Nếu API fetch xong mà fail thì nó dispatch action `rejected`. Trong này mình có thể show errors trên view hoặc alert errors cho người dùng để biết là không fetch được. 

Save và chạy thứ nhé. 

Source Code: https://github.com/yongsokheng/redux-toolkit-demo

# References:

https://soyoung210.github.io/redux-toolkit/api/createAsyncThunk/

https://abhimanyuchauhan-61309.medium.com/createasyncthunk-in-redux-toolkit-4d8d2f0412d3