## 1)  GraphQL là gì?
- Được Facebook giới thiệu cùng với Relay tại React.js Conf 2015, GraphQL là một ngôn ngữ query cho API dùng để viết các câu API một cách uyển chuyển chính xác những gì cần có, trong các application hiện đại nhiều lớp với nhiều thành phần phụ thuộc được sử dụng ngày càng phổ biến hiện nay. Trên thực tế GraphQL đã được sử dụng từ vài năm trước trong ứng dụng trên mobile của Facebook.

## 2)  Đặc điểm của GraphQL

- Client truy vấn đến máy chủ GraphQL bằng các truy vấn với đặc điểm: format của dữ liệu trả về được mô tả trong câu truy vấn và được định nghĩa ở phía client thay vì ở server. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client mà chỉ cần dùng duy nhất 1 endpoint.
![](https://images.viblo.asia/8e8334d9-fccb-453f-a336-0c39fa548db2.png)

## 3) Lợi ích GraphQL
- Lấy Facebook làm ví dụ. Facebook phải quản lí vô số data source và API clients mà REST API lại lộ khuyết điểm thiếu linh hoạt do tính chất dựa trên tài nguyên cố định, dẫn đến trường hợp “nghẽn cổ chai” thường thấy. Chính vì vậy, thay vì có đến hàng tá “endpoint” dư thừa, Facebook đã nghĩ đến giải pháp chỉ dùng một “endpoint” thông minh với khả năng tiếp thu những Query phức tạp rồi đưa ra output data với loại type tùy theo yêu cầu của client. Nói đơn giản hơn, đây là truy vấn hướng client, cấu trúc dữ liệu không khô cứng 1 khuôn mẫu từ server (REST API) mà thay đổi theo từng ngữ cảnh sao cho hiệu quả nhất đối với client Ngoài ra, GraphQL hoàn toàn có thể create, update, delete, nhưng với cấu trúc sáng sủa và cấu trúc phân tầng nên lại càng thuận lợi cho lập trình viên phía client.
![](https://images.viblo.asia/73e7cfbe-f614-4caa-bd1a-651341fc059a.jpg)
 - Ví dụ: 
   + REST model cũ giống y như việc bạn đặt cái bánh Pizza, rồi gọi ship hàng online và kêu bên tiệm giặt ủi đem đồ đến cho bạn. Tất cả diễn ra với 3 cuộc gọi và 3 cửa hàng.
![](https://images.viblo.asia/47958860-99fc-4eba-a14e-3e4b761af7a5.png)
   + GraphQL mặt khác lại giống như là thư kí riêng của bạn vậy: Sau khi bạn đưa địa chỉ của 3 cửa hàng và nói yêu cầu của bạn thì GraphQL sẽ làm hết mọi chuyện còn lại trong khi bạn chỉ việc chờ chúng được chuyển đến cho mình. 
![](https://images.viblo.asia/b6705b2d-0c77-42ef-863b-843724c03b7e.png)

## 4) Tổng quan
- GraphQL API được tạo ra từ 3 phần chính: **schema**, **queries/mutations**, và **resolvers** ngoài ra còn có ***subscriptions***
### 4.1) Queries, mutations và subscription
#### 4.1.1) Queries
- Những yêu cầu cung cấp thông tin bạn đặt ra cho thư ký của mình - GraphQL, nó sẽ có cú pháp giống như thế này:
``` 
query {
  stuff
}
```
- Chúng ta tuyên bố một ‘query’ mới sử dụng keyword query , và đặt tên cho field đó là stuff. Điều thú vị của GraphQL query là có support các nested fields. Thế nên chúng ta có thể đi sâu vào hơn:
```
query {
  stuff {
    eggs
    shirt
    pizza
  }
}
```
- Như bạn thấy đấy, client khi đưa ra những yêu cầu và tạo ra query sẽ không cần lo data đến từ source nào. Chỉ việc hỏi và GraphQL server  sẽ lo hết mọi thứ khác.
Cũng đáng lưu ý là việc các query field còn có khả năng chỉ đến các array  - association
```
query {
  posts { # this is an array
    title
    body
    author { # we can go deeper!
      name
      avatarUrl
      profileUrl
    }
  }
}
```


- Query field còn support cả argument. Nếu bạn muốn đưa ra một post riêng, thì chỉ cần thêm id argument cho post field.
```
query {
  post(id: "123foo"){
    title
    body
    author{
      name
      avatarUrl
      profileUrl
    }
  }
}
```

- Cuối cùng, nếu bạn còn muốn id argument đó đặc biệt hơn, bạn có thể tạo ra một variable và tái sử dụng chúng bên trong query (nhớ là ta phải đặt tên cái query đó luôn)


```
query getMyPost($id: String) {
  post(id: $id){
    title
    body
    author{
      name
      avatarUrl
      profileUrl
    }
  }
}
```

#### 4.1.2) Mutations
- Thực ra cũng là các phiên bản đồng bộ của *query* nó cho phép thay đổi database tương tự như bạn đặt ra các yêu cầu thay đổi lịch làm việc hay gì đó cho thư ký của mình.
- Nói 1 cách khác thì các hoạt động với dữ liệu là `CRUD` thì query là truy vấn (R) thì mulation sẽ gánh các vai tròn (C), (U), (D)
- Các Mutations có cấu trúc cú pháp như giống với Queries, nhưng chúng luôn bắt đầu bằng từ khóa `mutation`.(Mặc định nếu không có từ khóa thì sẽ là `query`) 
```
mutation{
createPost(title: "new post", body: "this is new post"){
    id
    title
  }
}
```

#### 4.1.3) Subscriptions
- Một yêu cầu quan trọng khác đối với nhiều ứng dụng ngày nay là có một kết nối thời gian thực với máy chủ để nhận thông báo ngay lập tức về các sự kiện quan trọng.
- Đối với trường hợp sử dụng này, GraphQL cung cấp khái niệm Subscriptions.
- Khi một client subscribes một sự kiện, nó sẽ khởi tạo và giữ kết nối ổn định với máy chủ.
- Bất cứ khi nào sự kiện cụ thể đó thực sự xảy ra, máy chủ sẽ đẩy dữ liệu tương ứng đến máy khách.
- Subscriptions được viết bằng cú pháp giống như queries và mutations.
- Subscriptions có thể hiểu tương tự như trigger của SQL.

### 4.2) Schema
- Đến đây bạn đã hiểu cơ bản về các queries, mutations và subscriptions trông như thế nào, hãy tập hợp tất cả lại với nhau và tìm hiểu cách bạn có thể viết schema cho phép bạn thực hiện các ví dụ bạn đã thấy cho đến thời điểm này.

- Schema là một trong những khái niệm quan trọng nhất khi làm việc với một API GraphQL.

- Nó chỉ định các khả năng của API và xác định cách client có thể yêu cầu dữ liệu. Nó thường được xem như là một hợp đồng giữa server và client.

- Nói chung, một schema chỉ đơn giản là một tập hợp các types của GraphQL. Tuy nhiên, khi viết schema cho một API, có một số loại gốc đặc biệt:
  -  type Query { ... }
  -  Mutation { ... }
  -  type Subscription { ... }

- Với các type, query và mutation, chúng ta định nghĩa GraphQL schema, đó là endpoint của GraphQL exposes:
```
type RootQuery {
  author(id: Int!): Author
}
  
schema {
  query: RootQuery
}
```

### 4.3) Resolvers
- Bây giờ chúng ta có public schema, đã đến lúc phải nói cho GraphQL biết phải làm gì khi mỗi queries/mutations được request. Resolvers có thể làm những việc khó khăn; ví dụ:

  - Truy cập một internal REST endpoint
  -  Gọi một microservice
  -  Truy cập database để CRUD operations

- Chúng ta đang chọn tùy chọn thứ ba trong app ví dụ. Chúng ta hãy xem các [file esolvers](https://github.com/amaurymartiny/graphql-example/blob/master/graphql/resolvers.js):
```
const models = sequelize.models;

RootQuery: {
  user (root, { id }, context) {
    return models.User.findById(id, context);
  },
  users (root, args, context) {
    return models.User.findAll({}, context);
  },
  // Resolvers for Project and Task go here
},
    
/* For reminder, our RootQuery type was:
type RootQuery {
  user(id: ID): User
  users: [User]
 
  # Other queries
}
```
Điều này có nghĩa là, nếu truy vấn user (id: ID!)được request trên GraphQL, thì chúng ta sẽ trả về User.findById (), là một Sequelize ORM function , từ database.

Còn về việc join các model khác trong request? Vâng, chúng ta cần phải định nghĩa nhiều resolvers hơn:
```
User: {
  projects (user) {
    return user.getProjects(); // getProjects is a function managed by Sequelize ORM
  }
},
    
/* For reminder, our User type was:
type User {
  projects: [Project] # We defined a resolver above for this field
  # ...other fields
}
*/
```

- Vì vậy, khi chúng ta request projects field trong một User type ở GraphQL, join này sẽ được append vào database query.

- Cuối cùng, resolvers cho mutation:

```
RootMutation: {
  createUser (root, { input }, context) {
    return models.User.create(input, context);    
  },
  updateUser (root, { id, input }, context) {
    return models.User.update(input, { ...context, where: { id } });
  },
  removeUser (root, { id }, context) {
    return models.User.destroy(input, { ...context, where: { id } });
  },
  // ... Resolvers for Project and Task go here
}
```
- Để giữ data trên server clean, ta disable các resolver cho các mutation, có nghĩa là các mutation sẽ không create, update hoặc delete các operations trong cơ sở dữ liệu (và do đó sẽ trả về null).

 Nguồn :
-  https://www.bravebits.co/bat-dau-voi-graphql-api/
- https://topdev.vn/blog/nhung-dieu-ban-can-phai-biet-ve-graphql-cong-nghe-moi-cho-web-developer/ 
- https://viblo.asia/p/graphql-vs-rest-a-graphql-tutorial-YWOZryrpKQ0
- medium.com
- grapql.org