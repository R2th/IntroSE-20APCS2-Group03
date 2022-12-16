# 1. Introduction
- `React Hook` là một tính năng mới cho phép bạn sử dụng state và các tính năng khác của React mà không cần phải viết class (functional component).
- Cụ thể trong bài này mình sẽ giới thiệu 2 hook cơ bản đó là `useState` và `useEffect`. React còn giới thiệu rất nhiều hook khác như là `useContext`, `useReducer`, `useCallback`, `useMemo`, `useRef`... Các bạn có thể tìm hiểu thêm ở trang chủ của React: [Hook Reference](https://reactjs.org/docs/hooks-reference.html).

# 2. Content
- Để dễ dàng tìm hiểu về 2 hook ở trên thì mình sẽ cùng làm một ứng dụng note có các chức năng như là thêm mới và xoá note.
- Đầu tiên chúng ta sẽ tạo một ứng dụng react mới, ở đây mình dùng [Create React App](https://github.com/facebook/create-react-app) để tạo ứng dụng react mới

    ```shell
    create-react-app note-demo
    ```

- Đầu tiên mình tạo 1 hook tên là useNoteState để thao tác với danh sách các note, như hiển thị, thêm note và xoá note.

    ```Javascript
    // src/useNoteState.js

    import { useState } from 'react';

    export default initialValue => {
      const [notes, setNotes] = useState(initialValue);

      return {
        notes,
        addNote: note => {
          setNotes([...notes, note]);
        },
      };
    };
    ```
    
 -  Ở trên mình có sử dụng hook state là `useState` do react cung cấp, hook này trả về hai thứ, đó là giá trị của state hiện tại (notes: danh sách note) và hàm để thay đổi state đó (setNotes). Có thể gọi hàm setNotes này ở bất cứ đâu trong component, hàm này hoạt động tương tự như this.setState trong class component. 
 -  Hàm `useState` chỉ nhận vào một tham số duy nhất đó là giá trị khởi tạo của state đó. Tham số này có thể là bất cứ giá trị nào bạn muốn set cho state đó, ở đây nó là danh sách note nên mình sẽ để là một mảng các note. 
 -  Thông thường thì useState hay đặt ngay trong component và ở trên tất cả các hàm khác, ở đây vì mình muốn tách ra cho dễ hiểu nên tạo một file riêng và viết ở trong này, hàm useNoteState này mình đã custom lại ko chỉ trả về danh sách notes và hàm chỉnh sửa danh sách đó như mặc định mà mình đặt tên nó là addNote cho dễ hiểu.
 -  Tiếp theo ở component App mình sẽ import `useNoteState` vào và sử dụng nó tương tự như `useState` như sau:
 
 
    ```Javascript
    // src App.js

    import React from 'react';

    import useNoteState from './useNoteState';

    const App = () => {
      const { notes, addNote } = useNoteState([]);

      return (
        <div className="App">
          <h1>Notes</h1>
        </div>
      );
    };

    export default App;
    ```
    
- Tiếp theo mình sẽ tạo một component tên là `NoteList` để render ra danh sách các notes.

    ```Javascript
    // src/NoteList.js

    import React from 'react';

    const NoteList = ({ notes }) => {
      return (
        <ul>
          {notes.map(note => {
            return <li>{note}</li>;
          })}
        </ul>
      );
    };

    export default NoteList;
    ```
    
- Ở component App mình sẽ sửa lại như sau:

    ```Javascript
    // src/App.js

    import React from 'react';

    import NoteList from './NoteList';

    import useNoteState from './useNoteState';

    const App = () => {
      const { notes, addNote } = useNoteState([]);

      return (
        <div className="App">
          <h1>Notes</h1>

          <NoteList notes={notes} />
        </div>
      );
    };

    export default App;
    ```
    
- Có hiển thị rồi giờ mình sẽ tạo một form để thêm note vào, trước khi tạo form mình sẽ tạo một hook state để sử dụng trong form, bởi ở đây có value của ô input sẽ thay đổi liên tục đòi hỏi mình phải custom lại hook state đó.
- Mình sẽ tạo một custom hook tên là `useInputState` như sau:

    ```Javascript
    // src/useInputState

    import { useState } from 'react';

    export default () => {
      const [value, setValue] = useState('');

      return {
        value,
        onChange: event => {
          setValue(event.target.value);
        },
        reset: () => setValue(''),
      };
    };
    ```

- Ở đây mình đã custom thêm hàm `reset` cũng như `onChange` để trong `NoteForm` mình sẽ sử dụng để map vào hàm onChange của input cũng như sau khi add thêm sẽ reset value về rỗng.
- Tiếp theo mình tạo component `NoteForm` để tạo form thêm note như sau:

    ```Javascript

    import React from 'react';

    import useInputState from './useInputState';

    const NoteForm = ({ saveNote }) => {
      const { value, onChange, reset } = useInputState();

      return (
        <form
          onSubmit={event => {
            event.preventDefault();
            saveNote(value);
            reset();
          }}
        >
          <input placeholder="Add note" onChange={onChange} value={value} />
        </form>
      );
    };

    export default NoteForm;
    ```
    
- Ở đây khi form đc submit thì mình sẽ gọi đến props saveNote  và gửi kèm value của ô input để lưu lại vào danh sách notes, nên ở component App mình sẽ phải khai báo hàm `saveNote` và trong hàm `saveNote` sẽ gọi hàm `addNote` của hook `useNoteState`. Mình sẽ update lại component App như sau:

    ```Javascript

    // src/App.js

    import React from 'react';

    import NoteList from './NoteList';
    import NoteForm from './NoteForm';

    import useNoteState from './useNoteState';

    const App = () => {
      const { notes, addNote } = useNoteState([]);

      return (
        <div className="App">
          <h1>Notes</h1>

          <NoteForm
            saveNote={note => {
              const trimmedText = note.trim();
              if (trimmedText.length > 0) addNote(trimmedText);
            }}
          />

          <NoteList notes={notes} />
        </div>
      );
    };

    export default App;
    ```

- Sau đó sẽ ra đc giao diện như sau:

![](https://images.viblo.asia/a9b09438-6672-4786-8c2d-7ac703eca9e5.png)

- Tiếp đến chúng ta sẽ làm chức năng xoá note. Đầu tiên mình update lại file `useNoteState` để thêm một action `deleteNote` như sau:

    ```Javascript
    // src/useNoteState.js

    import { useState } from 'react';

    export default initialValue => {
      const [notes, setNotes] = useState(initialValue);

      return {
        notes,
        addNote: note => {
          setNotes([...notes, note]);
        },
        deleteNote: noteIndex => {
          const newList = notes.filter((_, index) => index !== noteIndex);
          setNotes(newList);
        },
      };
    };
    ```
    
- Tiếp theo update component App:

    ```Javascript
    // src/App.js

    import React from 'react';

    import NoteList from './NoteList';
    import NoteForm from './NoteForm';

    import useNoteState from './useNoteState';

    const App = () => {
      const { notes, addNote, deleteNote } = useNoteState([]);

      return (
        <div className="App">
          <h1>Notes</h1>

          <NoteForm
            saveNote={note => {
              const trimmedText = note.trim();
              if (trimmedText.length > 0) addNote(trimmedText);
            }}
          />

          <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
      );
    };

    export default App;
    ```
    
- Cuối cùng ta update file `NoteList`:

    ```Javascript
    // src/NoteList.js

    import React from 'react';

    const NoteList = ({ notes, deleteNote }) => {
      return (
        <ul>
          {notes.map((note, index) => {
            return (
              <>
                <li key={index.toString()}>{note}</li>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <button
                  onClick={() => {
                    deleteNote(index);
                  }}
                >
                  Delete
                </button>
              </>
            );
          })}
        </ul>
      );
    };

    export default NoteList;
    ```
    
- Cuối cùng thì ta ra được giao diện như này ![](https://images.viblo.asia/43885a66-87d4-422c-af73-ffd5a8d2304b.png)

- Tiếp theo mình muốn hiển thị số lượng note đang có lên title của tab, mình sử dụng `hook effect`, mình sửa file App.js như sau:

    ```Javascript
    // src/App.js

    import React, { useEffect } from 'react';

    import NoteList from './NoteList';
    import NoteForm from './NoteForm';

    import useNoteState from './useNoteState';

    const App = () => {
      const { notes, addNote, deleteNote } = useNoteState([]);

      useEffect(() => {
        document.title = `You have ${notes.length} notes`;
      });

      return (
        <div className="App">
          <h1>Notes</h1>

          <NoteForm
            saveNote={note => {
              const trimmedText = note.trim();
              if (trimmedText.length > 0) addNote(trimmedText);
            }}
          />

          <NoteList notes={notes} deleteNote={deleteNote} />
        </div>
      );
    };

    export default App;
    ```
    
- Hook `useEffect` sẽ thay thế cho các life cycle method như `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. Nó sẽ được gọi khi có thay đổi trong DOM, ở đây mỗi khi danh sách notes đc add thêm note vào thì hàm `useEffect` sẽ được gọi và cập nhật lên title của tab.
    
- Và ở title tab của trình duyệt sẽ hiển thị như sau: ![](https://images.viblo.asia/bb36a166-7eed-4631-8ac7-b3c7a24dab71.png)

- Ta đã có thể thêm và xoá được note một cách rất đơn giản. Do đây là bài giới thiệu nên giao diện mình làm rất là basic, nếu muốn các bạn có thể thêm css vào cho đẹp mắt :D 
# 3. Conclusion
- Trong bài này mình đã giới thiệu với các bạn hai hook cơ bản của React đó là `useState` và `useEffect`. Ngoài hai hook này thì React vẫn còn khá nhiều hook khác nữa, trong các bài sau mình sẽ tiếp tục tìm hiểu về các hook này và giới thiệu với các bạn thêm.
- Các bạn có thể tham khảo repo của mình: [React hook demo](https://github.com/nguyenminhtu/react-hook-demo)
# 4. References
- https://reactjs.org/docs/hooks-state.html
- https://reactjs.org/docs/hooks-effect.html