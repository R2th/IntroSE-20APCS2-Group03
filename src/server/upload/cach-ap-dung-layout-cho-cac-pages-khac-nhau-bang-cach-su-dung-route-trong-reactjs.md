# Hướng dẫn cơ bản về Route trong ReactJS
Hôm nay tôi sẽ chia sẻ anh em cách sử dụng Layout cho các trang trong ReactJS. Tôi cũng tìm khá lâu nhưng không
có hướng dẫn cụ thể nên tôi đã từng tạo 1 component <Layout></Layout> là component cha của tất cả các component con. Cách này thật
stupid. Sau khi phát hiện <Outlet> trong <Route> tôi đã có cách giải quyết khác cho vấn đề này.
###     Cài đặt React Route
    npm i -D react-router-dom
###     Cấu trúc folder trong react app
```
src\pages\:

Layout.js
Home.js
Blogs.js
Contact.js
NoPage.js
```
###     Tạo component Layout.js
```
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
```
   Trong component Layout thêm     <Outlet /> tại nơi mà bạn muốn đặt nội dung. Cái này tương tự  với children trong props.
###     Tạo các components ví dụ
1. Home.js
```
const Home = () => {
  return <h1>Home</h1>;
};

export default Home;
```
2. Blogs.js
```
const Blogs = () => {
  return <h1>Blog Articles</h1>;
};

export default Blogs;
```
3. NoPage.js
```
const NoPage = () => {
  return <h1>404</h1>;
};

export default NoPage;
```
### File Index.js
```
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
Chúng ta có thể thấy các trang Home, Blogs đã được thêm Layout khi đặt Route bên trong Route của Layout component.