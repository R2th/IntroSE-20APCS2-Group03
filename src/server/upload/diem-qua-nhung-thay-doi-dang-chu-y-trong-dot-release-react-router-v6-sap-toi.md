Trong lúc các anh em đang chờ đợi sự kiện unleashed của Apple vào 00:00 ngày mai 19/10 thì anh em FE chúng ta cũng có một sự kiện khá hot đó là `react-router` v6 chuẩn bị release 👍

Bây giờ chúng hãy cùng điểm qua một vài thay đổi đáng chú ý của `react-router` v6 nhé.

Tóm gọn lại thì đây là cách mà mình sẽ sử dụng trong bản sắp tới

Xem full: https://stackblitz.com/edit/github-5kknft?file=src%2FApp.tsx (ở đây mình chỉnh sửa một xíu từ ví dụ gốc https://github.com/remix-run/react-router/blob/main/examples/auth/README.md)


```jsx
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
...
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
...
```

## Một vài điểm cập nhật

### `Navigate` thay cho `Redirect`

Và bổ sung thêm hook `useNavigate`

Tham khảo: https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb

### `Route`

Không còn các props như là `component`, `render` mà thay vào đó là `element`. Và dùng chung với `Routes` (xem tiếp bên dưới)

### `Routes` thay cho `Switch`

Ở version 6 này chúng ta sẽ không thể viết các component wrapper như thế này nữa
```jsx
function PrivateRoute({ path, children, redirectTo }) {
  let isAuthenticated = getAuth();
  return (
    <Route
      path={path}
      render={() => (
        isAuthenticated ? children : <Redirect to={redirectTo} />
      )}
    />
  );
}
```
mà chúng ta phải đưa nó vào trong element
```jsx
<Routes>
  <Route path="/" element={<PublicPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route
    path="/protected"
    element={
      <RequireAuth>
        <ProtectedPage />
      </RequireAuth>
    }
  />
</Routes>
```
hoặc viết component wrapper theo kiểu này (như ví dụ ở đầu)
```jsx
<Route element={<RequireAuth />}>
  <Route path="/protected" element={<ProtectedPage />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```
Thậm chí chúng ta có thể dùng thẻ `div` thay cho `Route` 🙄

Bản chất là `Routes` nó sẽ sử dụng `useRoutes(createRoutesFromChildren(children), location);` , `createRoutesFromChildren` nó sẽ chỉ lấy các `prop` của `children` mà thôi

Tham khảo: https://github.com/remix-run/react-router/blob/main/packages/react-router/index.tsx#L335

Chúng ta có thể dùng `useRoutes` thay vì dùng `Routes` và `Route` như trên

Tham khảo: https://github.com/remix-run/react-router/blob/main/examples/use-routes/README.md

### `Outlet`

Component này kiểu như là component `children` ấy mn, ko có gì đặc biệt. Nó dùng để render các child `Routes`

### `useSearchParams`

Sẽ trả về một `URLSearchParams` từ `location.search`

Tham khảo: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx#L380

### Một số cập nhật khác

Tham khảo: https://github.com/remix-run/react-router/blob/main/packages/react-router-dom/index.tsx

## Kết

Bài viết đến đây thôi, hy vọng sẽ giúp ích được cho anh em trong chặng đường sắp tới <3