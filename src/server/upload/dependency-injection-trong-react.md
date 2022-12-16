Dependency Injection là một pattern phổ biến được implement trong rất nhiều framework và library. Nhìn sơ qua thì có vẻ React không có. Nhưng thật sự là React đã hỗ trợ built-in dependency injection là JSX, chắc hẳn là bạn đang dùng nó đó. :joy:

## Dependency Injection in short

Dependency Injection giải quyết một bài toán phổ biến: "hardcoded dependencies" - nghĩa là các phần dependency được fix cứng trong code. Khi một object A phụ thuộc vào một object B và sau đó tạo ra một object thứ hai, thì lúc này dependency không thể thay đổi (vì đã bị hardcode).

Ví dụ, class `Calculator` tạo một `logger` service, được fix cứng là `ConsoleLogger`, không thể thay đổi sau này:

```javascript
import ConsoleLogger from "./ConsoleLogger";

class Calculator {
  constructor() {
    this.logger = new ConsoleLogger();
  }

  add(a, b) {
    this.logger.log(`Adding ${a} to ${b}`);
    return a + b;
  }
}
```

Tuy nhiên khi thực hiện test class này, developers muốn "mock" thành phần logger service này (không log ra console nữa chẳng hạn). Hoặc khi chạy production, họ muốn xài SysLogger hoặc một logger khác ví dụ của Sentry (SaaS logger) thì đều không được vì dependency đã được hardcode.

Chúng ta có thể giải quyết vấn đề trên bằng một commit xài Dependency Injection như sau: 

```javascript
-import ConsoleLogger from './ConsoleLogger';

class Calculator {
-   constructor() {
-       this.logger = new ConsoleLogger();
-   }
+   constructor(logger) {
+       this.logger = logger;
+   }

    add(a, b) {
        this.logger.log(`Adding ${a} to ${b}`);
        return a+b;
    }
}
```

Giờ đây dependency không còn phụ thuộc vào lúc object A tạo object B nữa:

```javascript
const logger = new ConsoleLogger();
const calculator = new Calculator(logger);
const result = calculator.add(1, 2); // console hiển thị "Adding 1 to 2"
```

Và như vậy các developers có thể dễ dàng thay đổi dependency sau này:

```javascript
const logger = new NullLogger();
const calculator = new Calculator(logger);
const result = calculator.add(1, 2); // console shows nothing
```

Nhờ vào Dependency Injection, code dường như được clean hơn, modular hoá rõ ràng hơn. [Angular](https://angular.io/guide/dependency-injection) có một buil-in Dependency Injection Container, [Symfony](https://symfony.com/doc/current/components/dependency_injection.html) và [Spring](https://www.tutorialspoint.com/spring/spring_dependency_injection.htm) cũng thế. Nhưng có vẻ như React.js không có?

## JSX hỗ trợ Dependency Injection

React hỗ trợ Dependency Injection mà không cần dependency injection container (như Angular), nhờ vào JSX.

Hãy nhìn vào component render product reviews trong table dưới đây:

![](https://marmelab.com/static/e7fc2e433b6a802520d5e743716549cf/84de7/datagrid.webp)

Đây là đoạn code render table:

```jsx
const ReviewList = props => (
  <List resource="reviews" perPage={50} {...props}>
    <Datagrid rowClick="edit">
      <DateField source="date" />
      <CustomerField source="customer_id" />
      <ProductField source="product_id" />
      <RatingField source="rating" />
      <TextField source="body" label="Comment" />
      <StatusField source="status" />
    </Datagrid>
  </List>
);
```

Component <List> lấy dữ liệu từ route `/review/` trong một REST API và truyền vào thêm một parameter là `perPage`. Nhưng <List> không thực hiện viện render bảng reviews. Thay vào đó, nó để việc render cho các child components làm: <DataGrid>. Điều đó có nghĩa rằng <List> phụ thuộc vào <DataGrid> cho phần render, một paren-child relationship đã được tạo ra ở đây, chính là Dependency Injection.

Và như tất cả các dạng Dependency Injection nào khác, ta có thể đổi phần "dependency" rất dễ dàng. Chẳng hạn trong ví dụ trên, nếu ta muốn đổi thành phần render thành một "simple list" thay vì một "data grid", ta chỉ cần thay thế child của <List> bằng một component khác:

```jsx
import { List, Datagrid, TextField, DateField } from 'react-admin';

const PostList = props => (
    <List resource="posts" perPage={50}>
        <SimpleList
            primaryText={review => <ItemTitle record={review} />}
            secondaryText={review => review.body}
        >
    </List>
)
```

![](https://marmelab.com/static/c60ffbf31bb657d58e362d66ba6d794a/1672d/simplelist.webp)

React thậm chí còn cho phép inject nhiều hơn một dependency trong một element. Đầu tiên, bởi vì một element có thể có nhiều hơn một child. Trong ví dụ trước, <DataGrid> nhận vào một list của các columns cần được hiển thị:

```jsx
const ReviewList = props => (
  <List resource="reviews" perPage={50}>
    <Datagrid rowClick="edit">
      <DateField source="date" />
      <CustomerField source="customer_id" />
      <ProductField source="product_id" />
      <RatingField source="rating" />
      <TextField source="body" label="Comment" />
      <StatusField source="status" />
    </Datagrid>
  </List>
);
```

Ngoài inject bằng các child components, ta còn có thể inject thông qua props, như bên dưới ta cũng có thể inject vào một DataGrid body khác:

```jsx
const ReviewList = props => (
    <List resource="reviews" perPage={50}>
-       <Datagrid rowClick="edit">
+       <Datagrid rowClick="edit" body={<MyDatagridBody />} >
            <DateField source="date" />
            <CustomerField source="customer_id" />
            <ProductField source="product_id" />
            <RatingField source="rating" />
            <TextField source="body" label="Comment"/>
            <StatusField source="status" />
        </Datagrid>
    </List>
)
```

Và vì mỗi dependency là một component, ta cũng có thể inject dependency vào dependency, như vầy:

```jsx
const ReviewList = props => (
    <List resource="reviews" perPage={50}>
        <Datagrid
            rowClick="edit"
-           body={<MyDatagridBody />}
+           body={<MyDatagridBody withBulkActions />}
        >
            <DateField source="date" />
            <CustomerField source="customer_id" />
            <ProductField source="product_id" />
            <RatingField source="rating" />
            <TextField source="body" label="Comment"/>
            <StatusField source="status" />
        </Datagrid>
    </List>
)
```

Như vậy, JSX đã có những tính năng cơ bản của một Dependency Injection Container: cho phép di chuyển, thay thế linh động các dependency và cấu hình chúng.

## React Context

Ở trên ta đã thấy việc dùng JSX để implement Dependency Injection trong JSX Template, vậy còn ở các service function thì sao? React cũng khuyến khích xài components cho các services luôn. Ví dụ, ta có thể truyền một translation service dùng props của component:

```jsx
const englishTranslator = message => {
  if (message == "hello.world") {
    return "Hello, World!";
  }
  return "Not yet translated";
};

const Greeting = ({ translate }) => {
  return <div>{translate("hello.world")}.</div>;
};

const App = () => <Greeting translate={englishTranslator} />;
```

Tuy nhiên các viết này có thể cồng kềnh nếu code nhiều và có các lớp nested. Vì vậy React cung cấp một thành phần khác để khai báo Dependency Injection là `context`:

```jsx
import React, { useContext } from "react";

const englishMessages = message => {
  if (message == "hello.world") {
    return "Hello, World!";
  }
  return "Not yet translated";
};

const TranslationContext = React.createContext();

const Greeting = () => {
  const translate = useContext(TranslationContext);
  return <div>{translate("hello.world")}.</div>;
};

const App = () => (
  <TranslationContext.Provider value={englishMessages}>
    <Greeting />
  </TranslationContext.Provider>
);
```

## Tạm kết

Vì sao React không cung cấp một Dependency Injection Container như Angular? Đơn giản vì không cần thiết, JSX và context đã quá đủ để giúp các React app trở nên modular và testable hơn rồi.

Đây chính là một điểm mạnh của React: ngay cả với các ứng dụng lớn và large-scale, React vẫn làm tốt được mọi thứ mà không đỏi hỏi những framework lớn và cồng kềnh (như Angular :joy:):

### References

- [https://itnext.io/dependency-injection-in-react-6fcdbd2005e6](https://itnext.io/dependency-injection-in-react-6fcdbd2005e6)
- [https://marmelab.com/blog/2019/03/13/react-dependency-injection.html](https://marmelab.com/blog/2019/03/13/react-dependency-injection.html)