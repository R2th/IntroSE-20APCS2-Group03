Khi một ứng dụng trở nên lớn hơn và có nhiều states hơn, khi đó cần tạo ra một store duy nhất nhưng phải đủ lớn để quản lý. Một trong các giải pháp được đặt ra là phân cấp các stores để các states trở nên cụ thể hơn khi sử dụng. Và bài viết này sẽ giúp chúng ta làm thế nào để tiếp cận với việc làm thế nào để quản lý các states với multiple stores trong một site react.

### Cài đặt

Để làm việc với Mobx chúng ta cần cài đặt như sau:
```
npm i mobx mobx-react
```

### Tạo stores
Chúng ta sẽ tạo hai store là user store và note store. Trong đó user store sẽ chỉ có username như là một observable và có setup chức năng sửa đổi được name. Còn note store sẽ lưu trữ mảng các note. Để hiển thị liên kết giữa các store, mỗi một note sẽ bao gồm username của người đã tạo note đó. Sau đó, chúng ta có thể sử dụng store trong ứng dụng bằng cách sử dụng hooks.

Để bắt đầu, tạo một folder mới tên stores trong thư mục src:
> /src/stores/

Tạo user store:
Tạo mới file trong folder stores như sau: 
> /src/stores/user.store.js

```
// src/stores/user.store.js

import { makeAutoObservable } from "mobx";

class userStore {
  name = "Example React";

  constructor() {
    makeAutoObservable(this);
  }

  setUserName = (name) => {
    this.name = name;
  };
}

export default userStore;
```

Function *makeAutoObservable* đã được giới thiệu ở bản MobX ver 6.0 mới nhất, tuy nhiên có thể sử dụng *makeObservable* thay thế nếu hiện tại vẫn đang dùng ver MobX cũ.

Tạo note store:

Tạo mới file trong folder stores như sau: 
> /src/stores/note.store.js

```
// src/stores/note.store.js

import { makeAutoObservable } from "mobx";

class noteStore {
    notes = [];

    constructor() {
      makeAutoObservable(this);
    }

    addNote(note) {
        let send_note = { note };

        this.notes.push(send_note);
    }
}

export default noteStore;
```

Kết nối các store lại với nhau:

Với việc sử dụng hooks, chúng ta sẽ tạo một context hooks như một interface để kết nối các stores, đồng thời tạo một file root store để link các store lại với nhau. File root này cũng sẽ được sử dụng làm nơi giao tiếp giữa các store.

Tạo root store:
```
// src/stores/index.js

import UserStore from "./user.store";
import NoteStore from "./note.store";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
    this.noteStore = new NoteStore(this)
  }
```

Lưu ý rằng chúng ta đang pass tới các stores, để mọi store sẽ có quyền truy cập vào các store khác bằng cách truy cập vào các context (ngữ cảnh) mà đã được pass tới các constructor của chúng.

### Giao tiếp giữa các stores

Modify lại note store để với mỗi một note thì sẽ có hiển thị thêm username đã tạo note đó.

```
// src/stores/note.store.js

import { makeAutoObservable } from "mobx";

class noteStore {
    notes = [];

    // `this` từ rootstore được chuyển tới constructor
    // và gán cho nó một biến có thể truy cập được trong class này, gọi là rootStore
    // Sau đó, có thể truy cập đến các store như này
    // truy cập useStore, (vd: this.rootStore.userStore)
    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    addNote(note) {
        let send_note = { note };

        // check nếu name tồn tại trong userStore
        if (this.rootStore.userStore.name) {
          send_note.username = this.rootStore.userStore.name;
        }

        this.notes.push(send_note);
    }
}

export default noteStore;
```

Modify  file */src/stores/index.js* để sử dụng react context trong root store

```
import React from "react";
import UserStore from "./user.store";
import NoteStore from "./note.store";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
    this.noteStore = new NoteStore(this)
  }
}

const StoresContext = React.createContext(new RootStore());

// đây là function có sẵn để app kết nối tới các stores
export const useStores = () => React.useContext(StoresContext);
```

### Sử dụng stores trong app

Sau khi setup xong các store, giờ là lúc bắt đầu sử dụng các store đó vào trong ứng dụng.

Tạo một component trong file *src/App.js* để truy cập vào các stores, component này sẽ có hai input fields. Input field thứ nhất để thay đổi name và name sau khi thay đổi sẽ được hiển thị ở phần text dưới input field. Input field thứ hai để add new note. Note list này cũng sẽ được hiển thị ở dưới input field đó.

```
// src/App.js

import { useState } from "react";
import { useObserver } from "mobx-react";
// đây là hook function được tạo trong file `stores/index.js` để truy cập đến all stores.
import { useStores } from "./stores";

export default function App() {
  // ở đây có thể truy cập đến tất cả các store đã đăng ký trong root store
  const { noteStore, userStore } = useStores();
  const [note, setNote] = useState("");

  // tracking name thay đổi
  const handleNameChange = (e) => {
    e.preventDefault();
    const {
      target: { value }
    } = e;

    userStore.setUserName(value);
  };

  // tracking note thay đổi
  const handleNoteChange = (e) => {
    e.preventDefault();
    const {
      target: { value }
    } = e;

    setNote(value);
  };

  const addNote = () => {
    // add các note vào array
    noteStore.addNote(note);
  };

  // quan sát sự thay đổi của name và note list
  return useObserver(() => (
    <div className="App">
      <h1>hello {userStore.name}</h1>

      <h2>Change your name here</h2>
      <input type="text" value={userStore.name} onChange={handleNameChange} />

      <h2>Insert note</h2>
      <input type="text" value={note} onChange={handleNoteChange} />
      <button type="button" onClick={addNote}>
        Add note
      </button>

      <h2>Note list</h2>
      {noteStore?.notes?.length ? (
        noteStore.notes.map((note, idx) => (
          <div key={idx}>
            <h3>from {note.username}</h3>
            <code>{note.note}</code>
          </div>
        ))
      ) : (
        <p>No note on the list</p>
      )}
    </div>
  ));
}
```

### Kết luận

Trên đây chỉ là một ví dụ cơ bản về việc sử dụng MobX hooks với trường hợp có nhiều store. Sẽ còn nhiều thứ cần cải tiến, hi vọng chúng ta có thể gặp lại sau ở các bài viết sau. Xin cám ơn ^^

Xem ví dụ cụ thể [tại đây](https://codesandbox.io/s/modest-zhukovsky-b7dod)