## ■ Mở đầu
Đối với các bạn đã và đang tìm hiểu về `ReactJS`, có lẽ không dưới dăm ba lần nghe qua những cái tên như `Redux`, `MobX`, `Context API` hay gần nhất là `Recoil` khi có ai đó nhắc đến từ khóa `state management`. Mỗi công nghệ đều có cho mình những ưu nhược điểm riêng.

Do đó, câu chuyện lựa chọn công nghệ áp dụng cho một dự án luôn luôn được cân nhắc, cần phù hợp với cả bài toán công nghệ cũng như thế mạnh của team nữa. Chẳng của riêng ai, gần nhất là dự án hiện tại  mình tham gia, quyết định dùng `Apollo Client` cho ứng dụng `ReactJS` kết hợp `GraphQL`.

*Và đây cũng chính là chủ đề của bài viết này, hãy cùng mình tìm hiểu nhé!*

![](https://images.viblo.asia/c0d410ca-3b8d-41c1-b219-571498bfdd4f.png)

## ■ Apollo Client là gì?


*Theo [Official document](https://www.apollographql.com/docs/react):*
> `Apollo Client` is `a comprehensive state management library` for `JavaScript` that enables you to manage `both local and remote data` with `GraphQL`.

<br/>

Là một trong những thư viện giải pháp đối với việc `state management` của một ứng dụng, `Apollo Client` cho phép chúng ta gửi `requests` tới `GraphQL server` thông qua các `Queries` và `Mutations`.

*Bây giờ thì bật máy tính lên và khởi tạo một dự án `ReactJS` với `Apollo Client` nào...*
 
 ![](https://i.imgur.com/JV6dFth.gif)  ![](https://i.imgur.com/JV6dFth.gif)  ![](https://i.imgur.com/JV6dFth.gif) 


## ■ Khởi tạo
Sau khi cài đặt tất cả những `dependencies`:
```js
npm install @apollo/client graphql
// OR
yarn add @apollo/client graphql
```

chúng ta bắt đầu tiến hành khai báo:

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
   uri: GRAPHQL_SERVER_URL,
   cache: new InMemoryCache()
});
```

Xong rồi, sau đó thì kết nối `Apollo Client` với ứng dụng `ReactJS`:
```js
import { ApolloProvider } from '@apollo/client/react';

render(
   <ApolloProvider client={client}>
      <App />
   </ApolloProvider>,
   document.getElementById('root'),
);
```

*Đoạn `code` này có làm bạn thoáng nghĩ ngay tới cú pháp khởi tạo và truyền `store` xuống `<App/>` trong `Redux` không?* 😀😀

Tương tự như *`Context.Provider API` phía `React` hay `Provider API` phía thư viện `react-redux`*, **`ApolloProvider API` gói gọn toàn ứng dụng vào trong `context`, cho phép chúng ta có thể truy cập `client` ở bất kì `components` nào nằm trong `<App/>`**.

*Hmmm...*

***Giống nhau hết như vậy mà chỉ khác cú pháp với tên thôi thì chuyển sang dùng liệu-có-đáng !?!***

![](https://i.imgur.com/x9txHEW.gif) ![](https://i.imgur.com/x9txHEW.gif) ![](https://i.imgur.com/x9txHEW.gif)

*Cùng nhau tìm hiểu các phần tiếp theo để có thể trả lời cho nghi vấn này nhé!*

## ■ Concepts

Nhìn lại các thư viện cung cấp giải pháp `state management` một chút, cho dù là `Redux`, `MobX`, `Context API`, `Recoil` hay `một thư viện nào bạn tự viết` thì chúng đều sẽ có `03 vai trò chính`:
- **Storage** *(Lưu trữ)*.
- **Updation** *(Xử lý thao tác: thêm, xóa, sửa, etc.)*.
- **Reactivity** *(Lắng nghe thay đổi và cập nhật)*.

đồng thời luôn giữ cho `state` của ứng dụng luôn là **[`a single "source of truth"`](https://reactjs.org/docs/lifting-state-up.html#lessons-learned)**.

<br/>

Giả sử, chúng ta phân loại `global states` của một ứng dụng ra làm `02 kiểu`:
- **`Local state`**:
  - Là một số biến trạng thái ở phía `client`.
  - *VD: `isAdmin`, `isSignIn`, `flag`, `device`, etc.*
  
  
- **`Remote state`**:
  - Là một hoặc các bộ dữ liệu được `server` trả về, hoặc liên quan tới các giá trị trên `server`.
  - *VD: `products`, `users`, etc.*

<br/>

`Redux` sẽ quản lý `2 kiểu states này` giống nhau, với `Apollo Client` thì khác chút:
- **Cache** cho `Remote state`.
- **Reactive Variables** cho `Local state` *(được lưu ở ngoài **Cache**)*.

<br/>

*Giờ chúng ta sẽ đi vào trường hợp `Remote state` trước!*

## ■ Remote state

### Common `APIs`

`Apollo Client` cung cấp đa dạng `APIs` hỗ trợ thao tác với dữ liệu. Trong phạm vi bài viết này, cùng tìm hiểu `2 hooks` phổ biến:  `useQuery()` và  `useMutation()` nhé. 😄😄

<br/>

#### 🔗  `useQuery`
Giả sử, với câu truy vấn

```js
import { gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
    }
  }
`;
```

thì thông qua `useQuery`:
```js
import { useQuery, gql } from '@apollo/client';

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) { /* ... */ };
  if (error) { /* ... */ };
  return ( /* data binding */ );
}
```

Qua `API useQuery()`, việc `tracking` dữ liệu trả về *(`data`)*, lỗi *(`error`)* cũng như trạng thái `request`*(`loading`)* trở nên dễ dàng hơn bao giờ hết.
 
 Và một điều tuyệt vời trên *[Trang chủ](https://www.apollographql.com/docs/react/get-started/#request-data)* có đề cập nữa là:
> **`Apollo Client` automatically caches this data when it comes back from the server**, so you won't see a loading indicator if you run the same query again.
 
 <br/>

 
*`Source code` ví dụ phía trên [tại đây](https://codesandbox.io/s/get-started-coinbase-client-73r10).*

*Hãy tham khảo và tự thực hiện cho mình một `project` nhỏ để có thể hiểu rõ mọi thứ hơn nhé* 😉😉))

 <br/>
 
#### 🔗 `useMutation`
Một ví dụ về `useMutation()` trong `Apollo Client`:
```js
function Votes() {
  const [upVote, { count }] = useMutation(UP_VOTE);

  return (
        <button
          type="submit"
          onClick={() => upVote({
            variables: { unit: 1 }
          })}
        >
          Upvote to supporting me
        </button>
    </div>
  );
}
```

Một điểm chú ý:

> `Apollo Client` automatically caches your data and normalizes new data in query responses and after mutation.

<br/>

#### Notes:

Khi giới thiệu về `useQuery()` và `useMutation()`, cuối ví dụ mình có nhắc qua một chút tới `cache`. Vậy thì nó là gì vậy? 🙄🙄

Tạm thời chúng ta có thể hiểu là khi lấy dữ liệu từ `GraphQL server`, nó sẽ được lưu vào `cache`.

`Cache` có dạng tương tự:

```js
{
  "Currency:1": {
    __typename: "Currency",
    id: 1,
    ...
  },
  "Currency:2": {
    __typename: "Currency",
    id: 2,
    ...
  },
  "ROOT_QUERY": {
    __typename: "Query",
    currencies: {…}
    …
  }
  ...
}
```


*Chi tiết về cơ chế hoạt động của `cache`, mình sẽ đề cập ở một bài viết riêng, bạn cũng có thể tham khảo thêm [tại đây](https://www.apollographql.com/blog/demystifying-cache-normalization/).*

<br/>


![](https://i.imgur.com/kmPC1yw.gif) ![](https://i.imgur.com/kmPC1yw.gif) ![](https://i.imgur.com/kmPC1yw.gif)

*`Mutations` dùng để cập nhật dữ liệu.
    Một `mutation` được chạy thành công sẽ làm thay đổi dữ liệu trên `server`. Nghĩa là dữ liệu trong `cache` phía `client` chưa-chắc-giống dữ liệu trên cơ sở dữ liệu phía `server`. Điều này còn tuỳ thuộc vào tuỳ chọn `fetchPolicies` được `config` trong ứng dụng. Những trường hợp nào thì cần cập nhật `cache` sau khi thực thi xong một `mutation`? Chúng ta sẽ bàn luận về chủ đề này trong một bài viết khác.*

Trên đây là tổng quan về `useQuery` và `useMutations`. Ngoài chức năng cơ bản trên,  chúng còn cung cấp rất nhiều `options` đa dạng:
```js
useQuery(
  variables: { /* key: value */ },
  skip: /* Boolean value */,
  fetchPolicy: 'cache-first' // Default
)

useMutation(
  onError() { /* handle on error */ }
  onCompleted() { /* handle on complete */ }
  refetchQueries() { /* ... */ }
  ...
)
```

### Local-only fields

> `Local only fields` is a way we can define client side fields on the `GQL type` that doesn’t need to come from the server.

<br/>

Ngoài một trong các trường đã được định nghĩa trong `GraphQL server's schema`, `response` của một `Apollo Client queries` có thể được định nghĩa thêm một số `local-only fields` khác nếu cần thiết.

Cùng xét một trường hợp cụ thể nhé.

Mình có `query` lấy thông tin chi tiết một sản phẩm:
```js
const GET_PRODUCT_DETAIL = gql`
  query product($id: ID!) {
    product(id: $id) {
       id
       name
       price
    }
  }
`;

const { data, error, loading } = useQuery(GET_PRODUCT_DETAIL);
```

Trong `ProductDetail`, mình muốn hiển thị trạng thái của `product` có đang tồn tại trong giỏ hàng hay không *(giả sử kiểm tra trong `localStorage`)*.

Có phải bạn định xử lý như thế này:
```JS
const ProductDetail = () => {
  const [isInCart, setIsInCart] = useState(false);
  // useQuery: GET_PRODUCT_DETAIL here

  useEffect(() => {
    if (data && localStorage.getItem('CART').includes(data.id)) {
     setIsInCart(!isInCart);
    }
  }, [data])
  
  // return here
};
```

Với `Apollo Client`, thử  tiếp cận theo hướng dùng `local-only fields` xem sao nhé:

```js
const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      fields: {
        isInCart: {
          read(_, { variables }) {
            return localStorage.getItem('CART').includes(
               variables.id
            );
          }
       }
    }
  }
});
```
Thêm `isInCart` vào `query` kèm `@client directive`:
```js
const GET_PRODUCT_DETAIL = gql`
  query product($id: ID!) {
    product(id: $id) {
       ...
       isInCart @client
    }
  }
`;
```

Như vậy, tương tự như  `selectors` phía `Redux`, chúng ta đã có thể truy cập trực tiếp  `product.isInCart` thông qua việc tạo `local-only fields` rồi. 😄😄


*Tiếp theo cùng mình tìm hiểu về `local state` nào...*

## ■ `Local state`

### Reactive Variables

Như đã đề cập ở phần [`Concept`](#), với `Local state` `Apollo Client` cho phép chúng ta tạo ra các `custom values` - được gọi là `Reactive Variables`.

<br/>

`Reactive Variables` được lưu ở bên ngoài `cache` nhưng các `components` trong ứng dụng vẫn có thể dùng chung, thao tác truy cập và thay đổi được.

```js
import { makeVar } from '@apollo/client';

const isLoginVar = makeVar(false);

const client = new ApolloClient({
   uri: GRAPHQL_SERVER_URL,
   cache: new InMemoryCache({
     Query: {
       fields: {
         isLogin: {
            read() {
              return isLoginVar();
            }
         }
       }
     }
   })
});
```


Trên đây, `isLogin` đang được khai báo như một `reactive variables`.

<br/>

Các `components` có thể truy cập hoặc thay đổi giá trị `isLogin` như sau:
```js
import React from 'react';
import { useReactiveVar } from '@apollo/client';

const LoginFrm = () => {
  const isLogin = useReactiveVar(isLoginVar);
  
  const handleClick = () => {
    isLoginVar(!isLogin);
  };
  
  return (
    <button onClick={handleClick}>
      {isLogin ? 'Logout' : 'Login'}
    </button>
  );
}
```

Thật là thuận tiện phải không nào ^^

<br/>

#### Notes:

Một số lưu ý với `reactive variables`:

> - Modifying a reactive variable triggers:
>   -  An update of every active query that depends on that variable
>     - An update of state associated with variable values returned from `useReactiveVar()`.
> 
> - Reactive variables don’t update the cache.



 ## ■ Apollo Client vs. Redux

Ở góc nhìn cá nhân, điều mình cảm thấy tiện khi dùng `Apollo Client` trong dự án có lẽ là dễ dàng `tracking` trạng thái, kết quả của `request`:
```js
const { data, error, loading } = useQuery(GET_PRODUCTS);
```
Với 1 `request` này, anh bạn `Redux` cần có `03 actions` khác nhau:
- `GET_PRODUCTS_REQUEST`
- `GET_PRODUCTS_SUCCESS`
- `GET_PRODUCTS_FAIL`

kèm các `reducers` tương ứng để xử lý.

Song, `Redux` giúp chúng ta dễ `control request thread` của ứng dụng hơn. 😀😀

Một bảng so sánh nhẹ giữa `Apollo Client` vs. `Redux`:

| N/A | **Redux** | **Apollo Client** |
| -------- | -------- | -------- |
| **Storage**     | Plain JS object     | `Normalized cache` & `outer-cache data`     |
| **Updation**   |  Action & Reducers     | `Apollo Client APIs`     |
| **Reactivity**     | Connect     | (Auto) broadcast to `Queries`     |
| **Debugger**     | [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)     | [Apollo Client Devtools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm)     |




*Ý kiến của các bạn như thế nào, hãy cùng chia sẻ phía dưới `comments` nha!*
 


 ## ■ Kết
 
 Yeahhh, vậy là chúng ta đã cùng nhau tìm hiểu về `Apollo Client` từ `Concepts`, `Demos` cho tới câu chuyện quản lý `state` của nó so với thư viện khác rồi nè  🎉🎉

Mình cảm ơn các bạn vì đã đọc bài viết này và hy vọng rằng nó có thể mang lại được giá trị nào đó.

![](https://i.imgur.com/VfMbnjO.gif) ![](https://i.imgur.com/VfMbnjO.gif) ![](https://i.imgur.com/VfMbnjO.gif)


Tặng mình **`1 upvote`** để có thêm động lực cho những bài viết sắp tới nha ❤

<br/>

#### Và trong thời điểm hiện tại thì...

Hãy cùng nhau thực hiện quy tắc  `5K` được `Bộ Y tế` khuyến cáo:
```py
#Coronavirus #5K #BoY Te
Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung - Khai báo y tế
```
để có thể giữ an toàn cho bản thân và mọi người xung quanh nhé 😺😺

*Chúc các bạn cuối tuần vui vẻ ^^*
 
## ■ Credits

- **Resources: [Apollo's Official document](https://www.apollographql.com/docs/react/why-apollo/), [Apollo Blog](https://www.apollographql.com/blog/dispatch-this-using-apollo-client-3-as-a-state-management-solution/),  [Leapgraph](https://leapgraph.com/graphql-redux-apollo/), [Stackoverflow](https://stackoverflow.com/questions/59891325/apollo-client-cache-vs-redux), [khalilstemmler.com](https://khalilstemmler.com/articles/oop-design-principles/command-query-separation/), [DevTo](https://dev.to/kulkarniankita9/oh-hello-apollo-client-goodbye-redux-4dpi/).**
- **Poster & thumbnail: [SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO](https://www.youtube.com/watch?v=xypzmu5mMPY).**
- **Policies:**
    - [**This original article from My Make It Awesome blog**](https://haodev.wordpress.com/2021/05/16/muon-roi-ma-sao-con-chang-dung-apollo-client/).
    - **Use my contents for sharing purpose, please attached resource linked to [my blog](https://haodev.wordpress.com).**
    - **Use my contents for trading purpose, please [contact me](https://haodev.wordpress.com/me/).**
- **Copyright:** **The posts in a spirit of sharing knowledge. If there is anything with regard to copyright of your contents, please [contact me](https://haodev.wordpress.com/me/).**

<br/>


***Happy coding !***