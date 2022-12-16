Một trong những yêu cầu phổ biến của ứng dụng web là ngăn những truy cập chưa được xác thực đến trang nhất định nào đó. Ví dụ như chúng ta chỉ cho phép người dùng đã đăng nhập mới vào được trang facebook.com/profile.

Trong bài viết này hãy cùng mình tìm hiểu cách sử dụng Firebase và react-router để tạo proctected routes với react nha.
Để làm được thì yêu cầu bạn biết một ít về react context và react-hooks.

Trước tiên chúng ta cần tạo một Firebase auth provider, sau khi tạo thì chúng ta có thể sử dụng để lấy dữ liệu sau khi đăng nhập ở bất cứ chỗ nào trong ứng dụng.
```javascript
createContext( {userDataPresent:false, user:null} )
```

Ý tưởng ở đây là để cập nhật userDataPresent và user khi trạng thái xác thực thay đổi trong ứng dụng. Để cập nhật state chúng ta sử dụng hook là useState.
Hàm onAuthStateChanged cung cấp bởi Firebase được dùng để lắng nghe sự thay đổi trạng thái xác thực, nghĩa là khi có sự thay đổi về dữ liệu xác thực thì hàm đó sẽ được gọi.

Việc thay đổi state sẽ làm thay đổi giá trị context mà được truyền cho consumers và consumers có thể nhận biết được. Vì component FirebaseAuthContext được đặt ở cấp cao nhất trong cây (tree) component, do đó bất cứ sự thay đổi nào với state thì sẽ re-render các components còn lại. Ví dụ như khi đăng xuất khỏi một trang yêu cầu xác thực thì nó sẽ chuyển hướng.

Chú ý ở đây là chúng ta sẽ lưu giá trị được trả về bởi onAuthStateChanged listener trong state sau khi khởi tạo. Mục đích là cho phép chúng ta unsubcribe khi mà component unmounted.

```javascript
import React, { createContext, useState, useEffect } from 'react';
import { auth } from './firebase';
export const AuthContext = createContext({ userPresent: false, user: null })
export default function FirebaseAuthContext(props) {

  let [state, changeState] = useState({
    userDataPresent: false,
    user: null,
    listener: null
  })

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state, listener: auth.onAuthStateChanged((user) => {
          if (user)
            changeState(oldState => ({ ...oldState, userDataPresent: true, user: user }));
          else
            changeState(oldState => ({ ...oldState, userDataPresent: true, user: null }));
        })
      });
    }
    return () => {
      if (state.listener)
        state.listener()
    }
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {props.children}
    </AuthContext.Provider>
  )
}
```

```javascript
import React, { useContext } from 'react';
import { AuthContext } from './firebaseAuthContext';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {

  const authValue = useContext(AuthContext)
  
  if (authValue.userDataPresent) {
    if (authValue.user == null) {
      return (<Redirect to={props.redirectTo}></Redirect>)
    }
    else {
      return (
        <Route exact path={props.path}>
          {props.children}
        </Route>)
    }
  }
  return null
}
```

Hàm changeState được gọi bất cứ khi nào mà listener nhận được dữ liệu xác thực mới. ``user`` chứa thông tin của người dùng, null khi người dùng đăng xuất.

ProtectedRoute là [consumer](https://reactjs.org/docs/context.html#contextconsumer) của context do chúng ta tạo ra trước đó, dùng để bọc Route component của react-router.
Mục đích là trả về Redirect nếu người dùng chưa đăng nhập, còn không thì trả về Route để có thể truy cập nhưng route được bảo vệ. userDataPresent được dùng để hiển thị các spiner biểu thị việc đang tải. Bây giờ để sử dụng ProtectedRoute, chúng ta có thể làm như sau:

```jsx
<Switch>
  <Route exact path="/login">
    <div>Login</div>
  </Route>

  <ProtectedRoute redirectTo="/login" path="/home">
    <div>Home</div>
  </ProtectedRoute>

  <Route exact path="/">
    <div>Root</div>
  </Route>
</Switch>
```

Đơn giản vậy thôi, cảm ơn bạn đã dành thời gian đọc bài viết :)

*Nguồn nè: https://medium.com/swlh/firebase-authentication-and-react-protecting-your-routes-18d6da04b4c3*