Hello xin chào mọi người, lại là mình đây. Hôm nay mình xin chia sẽ với các bạn một tính năng mà khi đi làm sẽ có thể gặp qua, tính năng này mình cũng mới vọc vạch ra, trên google cũng có khá nhiều bài viết về nó, nhưng vài viết này mình sẽ tự code và hy vọng sẽ giúp ích cho các bạn.

Bạn có để ý khi lên shoppe tìm kiếm một sp nào đó nó sẽ có một list dài nhiều sp, khi bạn scroll xuống và click vào một sp bất kì, sau đó back lại nó vẫn giữ được tại ngay vị trí mà mình đã scroll trước đó không?
Sau đây mình sẽ tiến hành làm một ví dụ để bạn có thể hình dung ra dể dàng hơn nhé, nào làm theo mình nhé:

## 1. Tạo một project:
Đầu tiên các bạn chạy lệnh này để khởi tạo một project  bằng **create-react-app** nhé:

```
npx create-react-app keep-scroll-postion
```

Sau khi tạo xong, bạn tiến hành run nó bằng lệnh bên dưới để kiểm tra project của mình đã chạy chưa nhé:

```
yarn start or npm start
```

## 2. Tiến hành install React router:
Để sử dụng React router thì các bạn cài thêm cho mình package **react-router-dom** nhé:

```
yarn add react-router-dom
```


## 3. Tạo các files:
Sau khi cài xong các bạn tiến hành tạo thêm cho mình 2 Page vào Home.js và Product.js vào *./src*
Trong file Home.js và Product.js mình sẽ cho như nhau chỉ khác nên ở tên component nhé:

```
import { useKeepPositionScroll } from './hooks';

export default function Home() { // đổi tên thành Product (trong file Product.js)
  const items = Array.from(new Array(20), (_, i) => i);
  useKeepPositionScroll();
  
  return (
    <>
      <h1>Home</h1> // đây cũng vậy
      <section>
        {items.map((item, index) => (
          <div key={index} className="item">
            {item}
          </div>
        ))}
      </section>
    </>
  );
}
```

Để mình giải thích thêm tí về đoạn code trên, bạn có thể thấy mình đang import thằng *useKeepPositionScroll* (tí mình sẽ giải thích về thằng này nha)
Ở  đây mình mong muốn tạo ra một list có 20 items nên mình đã tạo với `Array.from(new Array(20), (_, i) => i);`
Sau đó là sử dụng map để show nó ra.

Tiếp theo nữa là mình sẽ tiến hành tạo một cái menu để click chuyển trang nhé.
Đầu tiên tạo *components/Navbar/index.js* với đoạn code sau:

```
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">HOME</Link>
      <Link to="/about">ABOUT</Link>
      <Link to="/products">PRODUCTS</Link>
    </nav>
  )
}
```

Đoạn code trên cũng đơn giản nên mình không giải thích thêm nha.

Sau đó vào file App.js để mình cấu hình cho router nhé.

```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './About';
import Home from './Home';
import Products from './Products';

import './App.css';

function App() {
  return (
    <main className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/products" component={Products} />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
```

Nếu bạn chưa hiểu rõ về React router thì bạn có thể đọc thêm tại [đây](https://reactrouter.com/web/guides/quick-start) nhé, dể hiểu lắm :D

Sau đó chạy thử xem ok chưa nha!

Rồi cuối cũng là thằng hook custom *useKeepPositionScroll.js*,  bạn tạo cho mình */hooks/index.js* với đoạn code:

```
export { default as useKeepPositionScroll } from './useKeepPositionScroll';
```

Sau đó tạo thêm */hooks/useKeepPositionScroll.js*:

```
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useKeepPositionScroll() {
  let location = useLocation();
  const [scrollTop, setScrollTop] = useState(0);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    let newScrollPosition = [];

    // get scrollPosition from sessionStorage
    const scrollPosition =
      JSON.parse(sessionStorage.getItem("scroll-position")) || [];

    // get index
    const id = scrollPosition.findIndex(
      (v) => v.pathname === location.pathname
    );

    // check if pathname exist in storage
    if (id !== -1) {
      // if not scroll then default scroll to position available in storage
      if (!isScroll) window.scrollTo(0, scrollPosition[id].position);

      // update sessionStorage
      newScrollPosition = [...scrollPosition];
      newScrollPosition.splice(id, 1, {
        pathname: location.pathname,
        position: scrollTop,
      });

      sessionStorage.setItem(
        "scroll-position",
        JSON.stringify(newScrollPosition)
      );

      return;
    }

    newScrollPosition = [
      ...scrollPosition,
      {
        pathname: location.pathname,
        position: 0,
      },
    ];

    sessionStorage.setItem(
      "scroll-position",
      JSON.stringify(newScrollPosition)
    );
    window.scrollTo(0, 0);
  }, [scrollTop, location.pathname, isScroll]);

  // Get scroll top
  const windowScrollTop = () => {
    const position = window.pageYOffset;
    setIsScroll(true);
    setScrollTop(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", windowScrollTop);
    return () => window.removeEventListener("scroll", windowScrollTop);
  }, []);

  return location;
}
```

Đoạn code trên là mình đang tạo một custom hook, file này có chức năng là kiểm tra xem pathname của page này đã tồn tại trong sessionStorage chưa, nếu chưa thì thêm vào, mà rồi thì sẽ thay thế bằng một giá trị khác. Có nghĩa cấu trúc của nó như này:
```
[{"pathname":"/","position":300},{"pathname":"/about","position":0},{"pathname":"/products","position":0}]
```

Ở đoạn code trên mình đã note cmt nên các bạn đọc sẽ hiểu thôi.

## 4. Hồi kết:
Cũng đã hết rồi, hy vọng sẽ giúp ích được cho các bạn, chúc các bạn cuối tuần vui vẻ nhé, thanks all <3