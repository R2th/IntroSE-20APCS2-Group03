![image.png](https://images.viblo.asia/f69f1205-8c3f-4c3f-b0e7-c4b660fc442c.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😉.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😊.

Tìm hiểu cách tận dụng các khái niệm React nâng cao để trở thành Dev React xịn sò.

Custom Hooks
=============

Như bạn đã biết _hook_ là một bổ sung mới trong React 16.8, cho phép bạn sử dụng state và các tính năng khác của _React_ mà không cần viết các **class component**. Xây dựng các **Custom Hooks** của riêng bạn là một cách tuyệt vời để trích xuất logic bên trong component thành các function có thể được tái sử dụng và độc lập.

```javascript
import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json)
      .then(setData)
      .catch(setError)
      .then(() => setLoading(false))
  }, [url]);
  
  return [data, isLoading, error];
};

function Profile() {
  const [data: profile, isLoading, error] = useFetch('/profile');
  return (
    <>
      {loading && <Spinner />}
      {data && <Profile data={data} />}
      {error && <Toast error={error} />}
    </>
  );
}
```

Mặc dù là một ví dụ đơn giản nhưng nó cho bạn thấy logic tìm nạp dữ liệu asynchronous có thể được tái sử dụng như thế nào cho các lệnh gọi API khác nhau trong ứng dụng của bạn.

[Mình đã có một bài viết về cách thức tái sử dụng code và CleanCode với React Hooks.](https://viblo.asia/p/blog39-tai-su-dung-code-va-clean-code-voi-react-hooks-series-reacthayho-phan-1-2oKLn2NXLQO)

Context
==================

React _Context_ là một tính năng cho phép bạn chuyển dữ liệu qua hệ thống phân cấp component mà không cần phải chuyển các `props` xuống từng component theo cách thủ công. **Contexts** đặc biệt hữu ích để chia sẻ dữ liệu được coi là “`global`” trên toàn bộ ứng dụng, chẳng hạn như thông tin đăng nhập của user, theme, ngôn ngữ, v.v.

```js
import { useState, useContext, createContext } from 'react';

const themeContext = createContext();

const useTheme = () => useContext(themeContext);

const ThemeProvider = ({ theme, ...rest }) => {
  const [theme, setTheme] = useState(theme);
  return <ThemeContext.Provider value={[theme, setTheme]} />;
}

const Toolbar = () => {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light' )}
      //...
    </>
  );
}

const App = () => (
  <ThemeProvider theme="light">
    <Toolbar />
    <Routes />
  </ThemeProvider>
);
```

Trong ví dụ đơn giản ở trên, bạn có thể dễ dàng thay đổi theme giữa _“light”_ hoặc _“dark”_ bằng cách sử dụng hook **useTheme** và thay đổi sẽ truyền đến tất cả các component trong cấu trúc phân cấp vì `value` được cung cấp bởi **contexts**.

PortalsReact children
==============

React *Portals* là một cách để đưa các component con vào một nodes trong DOM tồn tại bên ngoài hệ thống phân cấp của các component chính. Mặc dù một **Portals** có thể được gắn ở bất kỳ đâu trong cây DOM, nhưng chúng hoạt động giống như những `React children` bình thường như mọi cách khác. **Contexts** cũng sẽ hoạt động với các **Portals** như với bất kỳ component React nào khác. Các trường hợp sử dụng điển hình cho **Portals** bao gồm hàm, `popup-menus`, `toasts` và các trường hợp tương tự khi bạn cần gắn các component ở mức cao hơn trong `DOM three`.

```javascript
const Modal = ({ title, content }) => {
  const containerDiv = document.getElementById('containerDiv');

  return ReactDOM.createPortal(
    <>
      <h1>{title}</h1>
    <>, 
    containerDiv
  );
}

const App = () => {
  const [loggedIn] = useUser();

  return (
    <>
      <Article />
      {!loggedIn && <Modal title="login">...</Modal>}
    </>
  );
}
```

Higher Order Components
======================

React Higher Order Components (HOC) là một **pattern** mục đích tái sử dụng logic component. **HOC** là các hàm lấy một **component** làm đối số và trả về một **component mới**. Khi các component điển hình chuyển đổi các `props` thành các `nodes` trong `DOM`, thì một Higher Order Components sẽ chuyển đổi một component này thành một component khác.

```javascript
const withSearch = (Component) => ({ list, ...rest }) => {
  const [search, setSearch] = useState('');
  const matches = useMemo(() => (
    list.filter(item => item.indexOf(search) > -1;
  ), [search]);
  
  return (
    <>
      <SearchInput onChange={setSearch} />
      <Component list={matches} {...rest} />
    </>
  );
}

const SearchableMyList = withSearch(MyList);
```

Suspense
=======

Suspense là một tính năng cho phép component của bạn chờ một thứ gì đó được load bằng cách khai báo trước khi nó có thể được hiển thị. Suspense có thể được sử dụng để đợi một số code được load bằng cách sử dụng `React.Lazy` kết hợp với `React.Suspense` hoặc kể từ React 18.0.0, nó cũng có thể được sử dụng để chờ load một số dữ liệu `asynchronous`. Mình sẽ trình bày ngắn gọn về hai trường hợp sử dụng chính này bên dưới;

Lazy Loading Code
---------------

Lazy Loading Code `hay là Code-splitting` là một kỹ thuật trong đó ứng dụng web được “`tách - split`” thành nhiều phần để cải thiện hiệu suất và thời gian load. Ý tưởng là ban đầu bạn chỉ load các tập lệnh và nội dung được `request` ngay lập tức để hiển thị một số trang. Phần còn lại của các tập lệnh và nội dung được `lazily load` bất cứ khi nào cần.

```javascript
const ArticlePage = React.lazy(() => import('./ArticlePage'));

<Suspense fallback={<ArticleSkeleton />}>
  <ArticlePage />
</Suspense>
```

Trong ví dụ trên, tập lệnh và nội dung cho **ArticlePage** không được load cho đến khi nó cần được hiển thị.

Data Fetching with Suspense
---------------------------------------

Tìm nạp dữ liệu với Suspense là một tính năng mới kể từ React 18.0.0, mặc dù được phát hành dưới dạng tính năng thử nghiệm trong các phiên bản trước. Cách tiếp cận điển hình để tìm nạp dữ liệu với React khi bắt đầu rendering các component. Sau đó, sử dụng hook `useEffect`, mỗi component này có thể kích hoạt một số logic tìm nạp dữ liệu, vd. gọi một API, cuối cùng là cập nhật state và hiển thị. Cách tiếp cận này thường dẫn đến "`waterfalls`" trong đó các component lồng nhau chỉ bắt đầu tìm nạp khi các component chính đã sẵn sàng như được mô tả trong code bên dưới.

```javascript
const Article = ({ data }) => {
  const [suggestions, setSuggestions] = useState(null);
  useEffect(() => fetch(`/suggestions/${article.title}`).then(setSuggestions), []);
  return suggestions ? <Suggestions data={suggestions} />
}

const ArticlePage = ({ id }) => {
  const [article, setArticle] = useState(null);
  useEffect(() => fetch(`/article/${id}`).then(setArticle), []);
  return article ? <Article data={article} />
}
```

Thường thì rất nhiều hoạt động như vậy hay thậm chí nó cũng có thể được thực hiện song song.

Với sự Suspense, chúng ta không đợi `response`, mà chỉ khởi động các `request asynchronous` và ngay lập tức bắt đầu **rendering**. Sau đó, React sẽ cố gắng hiển thị cấu trúc phân cấp **component**. Nếu một cái gì đó không thành công do thiếu dữ liệu, nó sẽ chỉ dự phòng cho bất kỳ dự phòng nào được xác định trong trình bao bọc Suspense.

```javascript
const initialArticle = fetchArticle(0);

function Articles() {
  const [article, setArticle] = useState(initialArticle);
  
  return (
    <>
      <button onClick={() => { setArticle(fetchArticle(article.id + 1)) } }>
        Next
      </button>
      <ArticlePage article={article} />
    </>
  );
}

function Article({ article }) {
  return (
    <Suspense fallback={<Spinner />}>
      <ArticleContent article={article} />
      <Suspense fallback={<h1>Loading similar...</h1>}>
        <Similar similar={article} />
      </Suspense>
    </Suspense>
  );
}

function ArticleContent({ article }) {
  const article = article.content.read();
  return (
    <>
      <h1>{article.title}</h1>
      ...
    </>
   );
}
```

Trong ví dụ trên, `Article` sẽ chỉ hiển thị khi được `load` và nếu không thì sẽ là một `spinner component`, trong khi các `Article` tương tự sẽ chỉ hiển thị khi chúng được load.

Roundup
=======
Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
=======
* https://tuan200tokyo.blogspot.com/2022/11/blog40-5-khai-niem-giup-ban-tro-thanh.html