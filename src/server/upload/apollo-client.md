## 1. Giới thiệu về Apollo Client

`Apollo Client` là một thư viện quản lý `state` toàn diện cho `JavaScript` cho phép bạn quản lý cả dữ liệu `local`(data ở client) và `remote`(data liên quan đến server) với `GraphQL`. Sử dụng nó để `fetch`, `cache` và `modify` dữ liệu ứng dụng, tất cả  tự động cập nhật lại `UI`.

`Apollo Client ` giúp bạn cấu trúc `code` theo cách tiết kiệm, có thể dự đoán và khai báo phù hợp với thực tiễn phát triển hiện đại. Thư viện core `@apollo/client` cung cấp tích hợp sẵn với `React` và cộng đồng `Apollo` lớn hơn duy trì tích hợp cho các lớp chế độ xem phổ biến khác.


### 1.1 Tính năng

* **Declarative data fetching:** Viết truy vấn và nhận dữ liệu mà không  tracking state loading.
* **Excellent developer experience:** Tận hưởng công cụ hữu ích cho `TypeScript`,` Chrome/Firefox devtools` và `VS Code`.
* **Designed for modern React:** Tận dụng các tính năng `React` mới nhất, chẳng hạn như `hook`.
* **Incrementally adoptable:** Thả `Apollo` vào bất kỳ ứng dụng `JavaScript` nào và kết hợp nó theo từng tính năng.
* **Universally compatible:** Sử dụng bất kỳ thiết lập bản dựng nào và bất kỳ `API GraphQL` nào.
* **Community driven:** Chia sẻ kiến thức với hàng nghìn nhà phát triển trong cộng đồng `GraphQL`.

### 1.2 Tài liệu nên đọc



* [Queries](https://www.apollographql.com/docs/react/data/queries/) and [Mutations](https://www.apollographql.com/docs/react/data/mutations/) : Các thao tác đọc, ghi của `GraphQL`.

* [Configuring the cache](https://www.apollographql.com/docs/react/caching/cache-configuration/):  Bộ nhớ đệm của  `Apollo Client` cho phép bạn bỏ qua hoàn toàn các yêu cầu `network` khi  dữ liệu đã có sẵn ở `local`.

* [Managing local state](https://www.apollographql.com/docs/react/local-state/local-state-management/) : `Apollo Client` cung cấp `APIs` trong việc quản lý `data` cả ở `local` và `remote`, cho phép bạn hợp nhất tất cả `state` trong ứng dụng của mình.

* [Basic HTTP networking](https://www.apollographql.com/docs/react/networking/basic-http-networking/): Cách custom headers và các vấn đề về `authentication` trong các query của bạn.

* [Testing React components](https://www.apollographql.com/docs/react/development-testing/testing/) : Kiểm tra các hoạt động của `GraphQL` mà không cần kết nối với server.

### 1.3 Community integrations

Tài liệu này chủ yếu tập trung vào `React`, nhưng `Apollo Client` vẫn hỗ trợ nhiều cho các thư việc và các ngôn ngữ khác như:

* **JavaScript:** Angular, Vue, Svelte, Ember.

* **Web Components:** Apollo Elements.

* **Native mobile:** Native iOS with Swift, Native Android with Java and Kotlin

## 2.  Tại sao lại là Apollo Client?

> Tạo sao lại chọn `Apollo Client` để quản lý data của bạn?

Quản lý dữ liệu không cần phải quá khó khăn! Nếu bạn đang tự hỏi làm thế nào để đơn giản hóa việc quản lý dữ liệu remote và local trong ứng dụng `React` của mình, thì bạn đã đến đúng nơi. Trong suốt tài liệu này, bạn sẽ tìm hiểu cách tiếp cận bộ nhớ đệm và khai báo thông minh của `Apollo` để tìm nạp dữ liệu có thể giúp bạn lặp lại nhanh hơn trong khi viết ít mã hơn. Hãy bắt tay ngay vào.🚀🚀🚀🚀🚀🚀


### 2.1 Declarative data fetching
```js
function Feed() {
  const { loading, error, data } = useQuery(GET_DOGS);
  if (error) return <Error />;
  if (loading || !data) return <Fetching />;

  return <DogList dogs={data.dogs} />;
}
```
Như ví dụ trên thì bạn sẽ không cần phải làm gì quá nhiều, mọi thứ đã có `useQuery Hook` lo từ A đến Z như trả về data, lỗi (error) và cả trạng thái request (loading).  Tất cả những gì bạn cần làm là mô tả những data mà component bạn cần và để những việc nặng nhọc cho `Apollo Client`.

Ngoài ra, khi bạn sử dụng `Apollo Client` bạn sẽ xoá được rất nhiều mã code không cần thiết để quản lý `state`. Khối lượng chính xác sẽ tuỳ thuộc theo từng dự án. Các tính năng nâng cao như tối ưu hoá UI, `refetching` và phân trang một cách dễ dàng thông qua các `option` của `useQuery`.

### 2.2 Zero-config caching

Một trong những tính năng chính giúp `Apollo Client` khác biệt so với các cách quản lý `state` khác đó chính là `normalized cache` (bộ nhớ đệm chuẩn hóa). `Apollo Client` bao gồm một bộ nhớ `cache` thông minh, việc `config` cũng khá là dễ dàng.

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache()
});
```

 Với  `Apollo Client` mặc định khi bạn `request` đến `server` nó sẽ truy xuất ở cache đầu tiên, nếu có `request` trùng thì nó sẽ truy xuất ở đó, còn không nó sẽ gửi một `request` lên `server`.
 
  Bạn có thể cài `Apollo Client devtools` để  dễ dàng quan sát cách lưu data ở cache của `Apollo Client`  nhé.

### 2.3 Combine local & remote data

`Apollo Client` bao gồm các tính năng quản lý `local state`, cho phép bạn sử dụng `Apollo cache` của mình như một nguồn trung thực duy nhất cho dữ liệu trong ứng dụng của bạn.

Quản lý tất cả dữ liệu của bạn với `Apollo Client` cho phép bạn tận dụng `GraphQL` như một giao diện thống nhất cho tất cả dữ liệu của bạn. Điều này cho phép bạn kiểm tra cả `local` and `remote` `schemas` của mình trong `Apollo Client Devtools` thông qua `GraphiQL`.

Bằng cách tận dụng  được chức năng `local state` của `Apollo Client`, bạn có thể thêm các trường phía client vào dữ liệu `remote` của mình một cách liền mạch và truy vấn chúng từ `components` của bạn. 

### 2.4 Vibrant ecosystem

Với sự support lớn của cộng đồng` Apollo Client` tại [đây](https://community.apollographql.com/) thì các bạn có thể chia sẻ những issue cũng đưa ra phương án giải quyết tại những bài viết được chia sẻ trên `blog Apollo`.

Vậy thì còn chần chừ gì nữa mà không thử bắt đầu tìm hiểu `Apollo Client` nhỉ. Hi vọng bài viết này sẽ gây một chút tò mò gì đó để khiến bạn muốn tìm hiểu về `Apollo Client` nhé. Cảm ơn mọi người đã đọc bài viết của mình.

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)