Khi làm việc với React thì việc chia sẻ state giữa các component là các vấn đề thường gặp mà chúng ta phải xử lý. Khi chúng ta xây dựng ứng dụng React với một component cha duy nhất và chứa nhiều các cấp độ component con bên trong. Khi chúng ta muốn truyền dữ liệu đến component cuối cùng. Theo cách thông thường chúng ta sẽ truyền qua props và chúng ta phải truyền qua các components cho đến component cuối cùng. Việc này sẽ làm chúng ta cảm thấy mệt mỏi và có thể xảy ra sai sót. Đây là lúc chúng ta sử dụng Context. 

Với Context React giúp chúng ta dễ dàng truyền dữ liệu trong toàn bộ ứng dụng của chúng ta mà không cần phải truyền props. Context giúp ta có một lựa chọn đơn giản thay thế Redux khi dữ liệu của chúng ta đơn giản hoặc với ứng dụng nhỏ

# Sử dụng consumer
Với `consumer` chúng ta triển context như sau:
```js
import React from "react";

// Tạo context 
const ExampleContext = React.createContext();

function Display() {
  // Sử dụng Consumer để đọc value từ Context
  return (
    <ExampleContext.Consumer>
      {value => <div>Say {value}</div>}
    </ExampleContext.Consumer>
  );
}

function App() {
  // Sử dụng Provider để tạo một value
  return (
    <ExampleContext.Provider value="hello">
      <div>
        <Display />
      </div>
    </ExampleContext.Provider>
  );
}

export default App
```

Như ví dụ ở trên thì để sử dụng Context thì đầu tiên chúng ta tạo một Context mới, ở đây là ExampleContext. Context cung cấp hai thuộc tính là Provider và Consumer. Với Provider sẽ tạo sẵn value cho các component con cháu của nó. Còn với Consumer thì các component con sử dụng nó để đọc value từ Context

Như ở ví dụ trên thì chúng ta tạo một ExampleContext với value="hello". Ở component con Display dùng Consumer đọc value và hiển thị kết quả
# Sử dụng useContext
useContext cung cấp tất cả các chức năng giống như Context Api. Nó đơn giản được đóng lại thành một hook đơn giản để sử dụng bên trong các functional components 
Với useContext thì trông code của chúng ta sẽ ngắn gọn và dễ đọc hơn.

Với ví dụ ở trên chúng ta viết lại component `Display` như sau:
```js
import React, { useContext } from "react";
...
function Display() {
  const value = useContext(ExampleContext);
  return <div>Say {value}</div>;
}
...
```

Sử dụng `useContext` đơn giản chúng ta import hook này vào và truyền vào một đối tượng Context và trả về giá trị Context hiện tại. Giá trị của Context hiện tại được xác định bởi giá trị của <ExampleContext.Provider> gần nhất phía trên component đang được gọi.

Khi <ExampleContext.Provider> gần nhất phía trên component được cập nhật thì hook này sẽ render lại với giá trị Context mới nhất được cập nhật truyền tới Provider. 

# Nested
Trong nhiều trường hợp thì các component của chúng ta nhận dữ liệu từ nhiều Context khác nhau. Thì chúng ta sẽ xử lý thế nào:
## Consumer
Với cách sử dụng với consumer thì sẽ như sau:
```js
function App() {
    return (
        <UserContext.Consumer>
          {user => 
            <PostContext.Consumer>
              {posts =>
                <div>
                  Hi {user.name},
                  You have {posts.length} post.
                </div>
              }
            </PostContext.Consumer>
          }
        </UserContext.Consumer>
    );
}
```
Với chỉ 2 giá trị mà chúng ta nhận từ Context khác thì đã thấy code rất dài dòng và có vẻ phức tạp. Với useContext sẽ như thế nào
## useContext
```js
function App() {
    const user = useContext(UserContext);
    const posts = useContext(PostContext);
    return (
        <div>
            Hi {user.name},
              You have {posts.length} post.
        </div>
    );
}
```
Nhìn vào chúng ta có thể thấy đơn giản hơn nhiều khi sử dụng useContext, ngắn gọn và việc bảo trì sẽ dễ dàng hơn.
# Kết luận
Trong bài viết này chúng ta đã thấy useContext rất đơn giản để sử dụng và ngắn gọn. Trong nhiều trường hợp các bạn có thể cân nhắc và sử dụng Context và useContext. Cảm ơn các bạn đã theo dõi bài viết :D