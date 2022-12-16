### Mở đầu
Là nhà phát triển React, tất cả chúng ta đều muốn viết code sạch hơn, đơn giản hơn và dễ đọc hơn. 

Trong bài này, chúng ta hãy cùng xem xét 7 cách mà bạn có thể bắt đầu viết code React sạch hơn để giúp việc xây dựng các dự án React và xem lại code của bạn dễ dàng hơn nhiều. 

### 1. Sử dụng JSX shorthands
Làm cách nào để bạn truyền giá trị true đến prop cho trước ?

Ví dụ dưới đây, chúng ta đang sử dụng prop `showTitle` để hiển thị tiêu đề app trong component Navbar.

```js
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle={true} />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>}
    </div>
  )
}
```
Ở đây, chúng ta không cần thiết phải đặt `showTitle` rõ ràng là Boolean `true`.

Một cách viết nhanh cần nhớ là bất kỳ `prop provided` trên một component đều có giá trị mặc định là `true`.

Vì vậy, chúng ta chỉ cần thêm prop `showTitle` trên Navbar, phần tử tiêu đề sẽ được hiển thị.

```js
// src/App.js

export default function App() {
  return (
    <main>
      <Navbar showTitle />
    </main>
  );
}

function Navbar({ showTitle }) {
  return (
    <div>
      {showTitle && <h1>My Special App</h1>} // title shown!
    </div>
  )
```
Một cách viết tắt hữu ích khác là khi bạn truyền một giá trị prop là một chuỗi, bạn không cần phải đặt nó trong dấu ngoặc nhọn.
Ví dụ bạn đặt tiêu đề của Navbar, với prop `title` thì bạn chỉ cần đặt giá trị của nó vào dấu ngoặc kép.
```js
// src/App.js

export default function App() {
  return (
    <main>
      // shouldn't
      <Navbar title={"My Special App"} />
      
       // should
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
```

### 2. Di chuyển code không liên quan vào một component riêng biệt

Cách dễ nhất và quan trọng nhất để viết code React sạch hơn là làm tốt việc "abstract" code của chúng ta thành những component React riêng biệt.

Hãy cùng xem ví dụ dưới đây

Ứng dụng của chúng ta đang hiển thị một component Navbar. Chúng ta lặp qua các Posts với method `map() `và hiển thị tiêu đề của chúng trên trang.

```js
// src/App.js

export default function App() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <main>
      <Navbar title="My Special App" />
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

Vậy có cách nào để thực hiện việc này clean hơn không ?

Tại sao ta không đưa đoạn code mà chúng ta đang lặp lại ( Để hiển thị các posts ) ra thành một component riêng biệt, và sẽ gọi là `FeaturedPosts`

```js
// src/App.js

export default function App() {
 return (
    <main>
      <Navbar title="My Special App" />
      <FeaturedPosts />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}

function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Như bạn có thể thấy, bây giờ chúng ta chỉ cần xem xét các components bên trong App là Navbar và FeaturesPost. 

Chúng ta có thể hiểu ngay những gì mà ứng dụng chúng ta đang hiển thị.

###  3. Tạo file riêng biệt cho từng component

Tiếp tục với ví dụ phía trên, hiện tại thì chúng ta đang để tất cả component trong 1 file app.js

Tương tự với cách mà bạn abstract code thành những components riêng biệt để giúp ứng dụng của chúng ta dễ đọc hơn.

Vậy để khiến các file trong ứng dụng dễ đọc hơn thì ta cũng sẽ đặt từng compoent vào một file riêng biệt. 

Việc này sẽ giúp mỗi file chỉ chịu trách nghiệm cho 1 component nên giúp ta tránh nhầm lẫn khi sử dụng và sẽễ dàng tái sử dụng lại component trong ứng dụng của mình.

```js
// src/App.js
import Navbar from './components/Navbar.js';
import FeaturedPosts from './components/FeaturedPosts.js';

export default function App() {
  return (
    <main>
      <Navbar title="My Special App" />
      <FeaturedPosts />
    </main>
  );
}
```

```js
// src/components/Navbar.js

export default function Navbar({ title }) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

```js
// src/components/FeaturedPosts.js

export default function FeaturedPosts() {
  const posts = [
    {
      id: 1,
      title: "How to Build YouTube with React"
    },
    {
      id: 2,
      title: "How to Write Your First React Hook"
    }
  ];

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Ngoài ra, bằng cách tách từng  thành phần riêng lẻ trong file riêng của nó, chúng ta sẽ tránh được việc 1 file quá cồng kềnh.

###  4. Chuyển shared functionality vào trong React hooks

Xem xét component `FeaturedPosts`, giả sử thay vì hiển thị dữ liệu posts tĩnh, chúng ta muốn fetch dữ liệu posts từ một `API`

```js
// src/components/FeaturedPosts.js

import React from 'react';

export default function FeaturedPosts() {
  const [posts, setPosts] = React.useState([]);     

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta muốn thực hiện request này đối với dữ liệu trên nhiều component ?

Giả sử ngoài một component `FeaturedPosts`, chúng ta muốn tạo một component `Posts` với cùng một dữ liệu. 

Chúng ta sẽ phải copy logic đã sử dụng để fetch dữ liệu của mình và paste nó vào trong component đó.

VÀ để tránh phải làm điều đó, tại sao chúng ta không sử dụng một` React Hook` mới và có thể gọi là `useFetchPosts`:

```js
// src/hooks/useFetchPosts.js

import React from 'react';

export default function useFetchPosts() {
  const [posts, setPosts] = React.useState([]);     

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return posts;
}
```

Khi chúng ta đã tạo hook này, giờ ta có thể sử dụng lại nó trong bất kỳ component nào chúng ta muốn.

```js
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```


###  5. Hạn chế tối đa code JavaScript trong JSX

Xóa càng nhiều code Javascript trong Jsx càng tốt.

Ví dụ 
```js
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={event => {
          console.log(event.target, 'clicked!');
        }} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Ở đây, chúng ta đang xử lý sự kiện Click trên một `Post` . Bạn có thể thấy rằng Jsx trở nên khó đọc hơn nhiều.

Để khắc phục điều này, chúng ta có thể tách hàm trong `onclick ` ra một handler riêng biệt và sẽ đặt tên là `handlePostClick`

```js
// src/components/FeaturedPosts.js

import useFetchPosts from '../hooks/useFetchPosts.js';

export default function FeaturedPosts() {
  const posts = useFetchPosts()

  function handlePostClick(event) {
    console.log(event.target, 'clicked!');   
  }

  return (
    <ul>
      {posts.map((post) => (
        <li onClick={handlePostClick} key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```
Bây giờ, code đã rõ ràng hơn rất nhiều.

### 6. Format inline styles để giảm bloated code
Một pattern phổ biến của nhiều React developers là viết inline styles ngay trong JSX.

Nhưng một lần nữa, nó lại làm cho code của chúng ta khó đọc hơn.
```js
// src/App.js

export default function App() {
  return (
    <main style={{ textAlign: 'center' }}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h1 style={{ fontWeight: 'bold' }}>{title}</h1>
    </div>
  )
}
```

Chúng ta nên chuyển inline styles thành CSS stylesheet. Sau đó, ta có thể import nó vào bất kỳ component nào ta muốn.

Và có một cách đơn giản để viết lại các kiểu inline styles của bạn là tổ chức chúng thành các Object.

Ví dụ

```js
// src/App.js

export default function App() {
  const styles = {
    main: { textAlign: "center" }
  };

  return (
    <main style={styles.main}>
      <Navbar title="My Special App" />
    </main>
  );
}

function Navbar({ title }) {
  const styles = {
    div: { marginTop: "20px" },
    h1: { fontWeight: "bold" }
  };

  return (
    <div style={styles.div}>
      <h1 style={styles.h1}>{title}</h1>
    </div>
  );
}
```

### 7. Giảm prop drilling với React context
Một pattern thiết yếu khác để sử dụng cho các dự án React của bạn, đặc biệt nếu 

Thông thường, khi chúng ta có những thuộc tính chung mà muốn sử dụng lại ở nhiều component thì sẽ phải viết rất nhiều props trùng lặp để truyền props từ Parent component đến Child Component.

Ví dụ, nếu bạn muốn share userData trên nhiều component, thay vì phải lặp lại nhiều props ( pattern này được gọi là `props drilling`), thì bạn có thể sử dụng `React Context` ( một tính nằng được tích hợp trong React )

Vẫn với ví dụ trên, nếu chúng ta muốn sử dụng lại user data trên các component `Navbar` và `FeaturesPosts`,  đầu tiên chúng ta cần phải bao bọc toàn bộ ứng dụng của mình trong một `component provider`.

Tiếp đó là chuyển user data xuống value prop và sử dụng context đó trong các component riêng lẻ với `hook useContext`

```js
// src/App.js

import React from "react";

const UserContext = React.createContext();

export default function App() {
  const user = { name: "Reed" };

  return (
    <UserContext.Provider value={user}>
      <main>
        <Navbar title="My Special App" />
        <FeaturedPosts />
      </main>
    </UserContext.Provider>
  );
}

// src/components/Navbar.js

function Navbar({ title }) {
  const user = React.useContext(UserContext);

  return (
    <div>
      <h1>{title}</h1>
      {user && <a href="/logout">Logout</a>}
    </div>
  );
}

// src/components/FeaturedPosts.js

function FeaturedPosts() {
  const posts = useFetchPosts();
  const user = React.useContext(UserContext);

  if (user) return null;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Tham khảo
Cảm ơn mọi người đã theo dõi bài viết ^^

Mọi người có thể đọc bài gốc của tác giả ở đây ạ !

https://dev.to/reedbarger/7-ways-to-write-cleaner-react-code-today-16do