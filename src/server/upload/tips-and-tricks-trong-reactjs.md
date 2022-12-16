Dưới đây sẽ là một số thủ thuật tuyệt vời mà bạn có thể áp dụng để cải thiện chất lương project React của mình.

Những thủ thuật này sẽ không chỉ làm cho code của bạn sạch sẽ và đáng tin tưởng hơn, mà còn mục đích là làm việc trải nghiệm và phát triển ứng dụng React của bạn trở nên đơn giản và thú vị hơn.

Hãy áp dụng những thủ thuật này trong project React của bạn ngay hôm nay thôi nào

## **Thay thế redux bằng React query**

Khi ứng dụng của chúng ta trở nên lớn hơn, việc quản lí các state trên các component của chúng ta đương nhiên sẽ trở nên rắc rối hơn nhiều, chúng ta có thể tìm đến các thư viện quản lí state như redux.

Nếu như dữ liệu của chúng ta nhận đầu vào dữ liệu từ API, thường thường thì chúng ra sẽ sử dụng redux để fetch state server và sau đó cập nhật state vào ứng dụng của mình.

Đây có thể là một quá trình đầy khó khăn, ban không chỉ phải tìm và fetch dữ liệu mà còn phải xử lí các state khác nhau, tùy thuộc vào dữ liệu hoặc ở trạng thái loading, error ...

Thay vì sử dụng redux để quản lí dữ liệu lấy từ server, bạn có thể dử dụng React Query.

React Query không chỉ cho phép bạn kiểm soát tốt hơn việc thực hiện các yêu cầu HTTP trong ứng dụng của bạn thông qua các hooks sẵn có mà còn cho phép quản lí các state liền mạch trên các component, không phải tự cập nhật trạng thái theo cách thủ công.

Đây là cách sử dụng React Query trong tệp index.js:

```
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactDOM from "react-dom";

import App from "./App";

const queryClient = new QueryClient()

const rootElement = document.getElementById("root");
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  rootElement
);
```

Ở đây chúng ta đang thiết lập một query client mà nó sẽ thiết lập cache để chúng ta dễ dàng quản lí bất kì một requests nào mà đã được thực hiện trong quá khứ, cộng với một component để chuyển nó xuống toàn bộ tree component.

Làm thế nào để bạn bắt đầu thực hiện các request tới React Query ?

Bạn có thể làm như vậy với hook useQuery, lấy một số nhận dạng cho query (trong trường hợp này vì chúng ta đang nạp dữ liệu user, vì vậy sẽ để là 'user'). cộng với một fucntion sử dụng để tìm và fetch dữ liệu.

```
import { useQuery } from "react-query";

export default function App() {
  const { isLoading, isError, data } = useQuery("user", () =>
    fetch("https://randomuser.me/api").then((res) => res.json())
  );

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  const user = data.results[0];
  return user.email;
}
```

Như bạn có thể thấy, React Query đảm nhận việc quản lí các states khác nhau này có thể diễn ra khi chúng ta tìm và fetch data. Chúng ta không cần phải quản lí các state này thủ công nữa, chúng ta cũng có thể hủy chúng từ những gì trả về qua useQuery.

Bây giờ chúng ta đã fetch dữ liệu user và lưu trữ nó ở trong bộ nhớ cache, tất cả những gì chúng ta cần làm để có thể sử dụng nó trên bất kì component nào khác là gọi useQuery() với từ khóa 'user' mà chúng ta đã liên kết với nó.

```
import { useQuery } from "react-query";

export default function OtherComponent() {
  const { data } = useQuery('user');
    
  console.log(data);
}
```

## **Làm cho React context trở nên dễ dàng hơn thông qua việc sử dụng custom hooks.**

Bạn có thể theo dõi lại bài viết cũ của tôi [tại đây](https://viblo.asia/p/reactjs-custom-hooks-4P856Q4OlY3) để hiểu rõ hơn

## **Quản lí context providers trong một Custom component.**

Hầu hết trong mọi ứng dụng react js, bạn sẽ cần một số trình Context providers.

Sau khi làm việc với React một thời gian, đây là xu hướng hầu hết của mọi người:

```
ReactDOM.render(
  <Provider3>
    <Provider2>
      <Provider1>
        <App />
      </Provider1>
    </Provider2>
  </Provider3>,
  rootElement
);
```

Chúng ta có thể làm gì với sự lộn xộn này ?

Thay vì đặt tất cả các context providers vào file, chúng ta có thể tạo ra một component có tên là ContextProviders.

Điều này cho phép chúng ta sử dụng các children prop, sau đó chúng ta cần làm là đặt tất cả các providers vào component này:

```
src/context/ContextProviders.js

export default function ContextProviders({ children }) {
  return (
    <Provider3>
      <Provider2>
        <Provider1>
          {children}
        </Provider1>
      </Provider2>
    </Provider3>
  );
}
```

Sau đó bọc Context Providers ngoài App:

```
src/index.js

import ReactDOM from "react-dom";
import ContextProviders from './context/ContextProviders'
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ContextProviders>
    <App />
  </ContextProviders>,
  rootElement
);
```

## **Sử dụng map với React fragment**

Hàm map() trong React cho phép chúng ta lấy 1 mảng và lặp nó, sau đó hiển thị ra từng phần tử dữ liệu qua Jsx

Tuy nhiên trong một số trường hợp, chúng ta muốn lặp lại dữ liệu đó mà không muốn trả nó trong phần từ Jsx. 

Một mẹo ít được biết đến có thể lặp lại một tập dữ liệu là React fragment

```
import React from 'react'

export default function App() {
  const users = [
    {
      id: 1,
      name: "Reed"
    },
    {
      id: 2,
      name: "John"
    },
    {
      id: 3,
      name: "Jane"
    }
  ];

  return users.map((user) => (
    <React.Fragment key={user.id}>{user.name}</React.Fragment>
  ));
}
```