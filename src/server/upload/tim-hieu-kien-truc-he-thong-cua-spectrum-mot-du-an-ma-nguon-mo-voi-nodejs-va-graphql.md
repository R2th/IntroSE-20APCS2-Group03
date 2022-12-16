Bạn đã biết về GraphQL, đã làm các ví dụ demo về nó rồi và đang cần tìm kiếm cách để xây dựng một ứng dụng thực sự với GraphQL.

Bài viết này sẽ có câu trả lời cho bạn. :)

Tôi xin dịch 1 bài viết trên Medium phân tích kiến trúc của của Spectrum:
https://medium.com/@iwilsonq/learn-to-architect-and-test-graphql-servers-by-observing-spectrum-c693561f9e8c
https://github.com/withspectrum/spectrum

*******
Gần đây, tôi đã tìm thấy một công nghệ rất thú vị, một cách tốt hơn để xây dựng và kiểm thử các ứng dụng Javascript, đó là GraphQL.
* Tôi đang cần viết một server NodeJS sử dụng GraphQL. Làm thế nào để tôi sắp xếp cấu trúc folder? Tôi nên để các file schema và resolvers ở đâu?, và đặt các định nghĩ type ở đâu.  (schema, resolvers, types là những thứ rất cơ bản trong GraphQL. Bạn có thể tham khảo ở đây: https://www.howtographql.com/)
* Đâu là cách tốt nhất để test graphql, cho các queries và mutations?

Spectrum.chat đã open source dự án nền tảng trao đổi thời gian thực của họ :). Có nghĩa là bạn và tôi có thể xem và nghiên cứu từ mã nguồn trên Github. Kế hoạch của tôi là quan sát họ kiến trúc ứng dụng Javascript của họ và áp dụng một vài ý tưởng cho các ứng dụng của tôi. Hi vọng tôi sẽ có thể trả lời 2 câu hỏi tôi viết ở phía trên.


Bằng việc vọc dự án open source này, bạn cũng có thể  biết được thêm các nghệ cực chất khác (tham khảo README trên Github):

* RethinkDB: Cơ sở dữ liệu
* Redis: Xử  lý các công việc chạy ngầm và bộ nhớ đệm.
* GraphQL: API, được tạo ra bởi Apollo toolchain
* Flowtype: Định nghĩa các kiểu dữ liệu cho JavaScript
* PassportJS: Xác thực người dùng
* React: Frontend and ứng dụng mobile
* Expo: Viết ứng dụng cho mobile (với React Native)
* DraftJS: phát triển từ WYSIWYG, bộ gõ văn bản trên nền web


Tôi sẽ bắt đầu với GraphQL API. 

## Cấu trúc folder với GraphQL

Điều đầu tiên chúng ta thấy, đó là cấu trúc folder của Spectrum và chúng hoạt như thế nào:

```
server/
├── loaders
├── migrations
├── models
├── mutations
├── queries
├── routes
├── subscriptions
├── test
├── types
│   └── scalars.js
├── README.md
├── index.js       # file chính để chạy server
└── schema.js
```


Giờ tôi sẽ giải thích từng phần một, mỗi folder là một phần của ứng dụng phía backend, làm các chức năng riêng. Bạn cũng sẽ thấy cách họ đặt tên cho chúng nữa.


* Loaders sử dụng DataLoader, một công nghệ được viết bởi Facebook, cho mỗi tài nguyên của Spectrum với 2 tính năng rất quan trọng là batch và cache. Giúp tối ưu các queries vào database, giảm tải cho server của bạn, vì chúng ta mới chỉ bắt đầu nên sẽ tạm hiểu như vậy đã :).
* Migrations bao gồm các thao tác để thay đổi cấu trúc dữ liệu và dữ liệu của database. 
* Seeds giúp các developer tạo ra các dữ liệu để test trong quá trình xây dụng, sử dụng thư viện faker, cho phép bạn tự động tạo ra các dự liệu như: users, channels, và message threads ...
* Models mô tả  giao diện API giúp giao tiếp với database. Bao gồm các hàm có thể sử dụng để truy vấn dữ liệu hoặc thay đổi dữ liệu trong database cho các tài nguyên như (users, channels, thread ..)
* Queries bao gồm các hàm xử lý, mô tả cách thức lấy danh sách, một dữ liệu, hoặc theo các options để lọc ra các dữ liệu. Dữ liệu bao gồm các phần tử, các trường và cách thứ để phân trang chúng.
* Mutations bao gồm các hàm xử lý, mô tả cách thức để tạo ra dữ liệu mới, xóa hoặc sửa các dữ liệu đã tồn tại.

Resolvers là một cách rất gọn gàng để mô tả các hàm gọi các service, lấy các dữ liệu theo yêu cầu từ phía client. Ví dụ, như một query dưới đây: 

```
query GetChannelsByUser {
  user(id: "some-user-id") {
    channels {
      members
    }
  }
}
```

Được dùng để lấy về thông tin của user được tìm kiếm bằng ID, lấy về danh sách tất cả các channels và danh sách members cho mỗi channel.  


In this case, there are 3 resolver functions: one to get the user, one to fetch that user’s channels, and another to fetch all of the members for each of the channels fetched. That last resolver function may even get run n-times for each channel.

Các bạn có thể để ý thấy đó là query này có thể trở lên rất nặng. Điều gì xảy ra nếu có hàng nghìn members cho mỗi channels? Đó là lí do của các xử lý trong folder loaders. Nhưng chúng ta sẽ xử lý vấn đề này sau. 

* Subscriptions cho phép server gửi các messages và notifications để các users trên mobile hoặc các clients sử dụng websocket server.
* Test bao gồm các tests cho các queries và mutations bẳng việc thử  query tới database thực sự. Chúng ta sẽ tìm hiểu chi tiết sau.
* Types chính là các GraphQl schema types, các trường bạn có thể query đến và các mối quan hệ giữa chúng. Khi nào thì server bắt đầu, thì schema được tạo ra để merge các types đó với nhau.
* Routes bao gồm các hàm xử lý route và các middleware giống như của RESTful. Ví dụ như kết nối với Slack và đăng ký email.


Ở cùng mức của các folder phía trên còn có file schema.js, nó merge tất cả các định nghĩa type và các resolvers xử lý được xử dụng cho GraphQL schema.


Cuối cùng, đó là file index.js, đó là file chính chạy server cho backend API của chúng ta, thêm vào đó là websocket và sử lý realtime. Đó không phải là file cuối cùng thú vị với tôi. Tôi thực sự đã biết cách để cài đặt NodeJs server với các middleware rồi.


## Bắt đầu từ Schema


Hãy xem file schema.js, nơi tất cả các queries, mutations và các types định nghĩa được import vào project.

```
type Query {
  dummy: String
}

type Mutation {
  dummy: String
}

type Subscription {
  dummy: String
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```


Chúng ta sẽ không định nghĩa chi tiết ở root queries mà chỉ import chúng thôi, và các tham số truyền vào cũng được định nghĩa type ! Đó thực sự rất tuyệt vời, bởi vì cho tới khi xem project này, tôi luôn làm như thế này:

```
type Query {
  contents(offset: Int = 0, limit: Int = 10): [Content]
  tags(offset: Int = 0, limit: Int = 10): [Tag]
  users(offset: Int = 0, limit: Int = 20, field: String): [User]
  # And many more queries...
}

type Mutation {
  createContent(text: String): Content
  updateContent(id: ID!, text: String): Content
  deleteContent(id: ID!): Content
  createUser(username: String!): User
  updateUser(id: ID!, username: String!): User
  # I don't want to write all of these here...
}
```


```
extend type Query {
  channel(id: ID, channelSlug: String, communitySlug: String): Channel @cost(complexity: 1)
}

extend type Mutation {
  createChannel(input: CreateChannelInput!): Channel
  editChannel(input: EditChannelInput!): Channel
  deleteChannel(channelId: ID!): Boolean

  # ...more Channel mutations
}
```


## Định nghĩa các Types cho tham số truyền vào


Khác với tôi, bạn có thể nhận thấy ở trên các Type cho tham số truyền vào không liệt kê ra tất cả các trường được yêu cầu (như tôi đã làm ở trên 😮).

Thay vào đó, chúng tạo ra các Type cụ thể cho mỗi tham số truyền vào khác nhau, có nhiều tham số hơn một ID duy nhất. Các kiểu này được định nghĩa trong schema GraphQL:

```
input CreateChannelInput {
  name: String!
  slug: String!
  description: String
  communityId: ID!
  isPrivate: Boolean
  isDefault: Boolean
}

input EditChannelInput {
  name: String
  slug: String
  description: String
  isPrivate: Boolean
  channelId: ID!
}
```



Nó được áp dụng rất nhiều khi chúng ta phát triển phần mềm. Chúng ta luôn cần phải khái quát dữ liệu, định nghĩa chúng một cách khoa học để trách việc lặp lại và làm cho code của chúng ta sẽ đọc và cải tiến hơn rất nhiều 😅


### Connections và Edges


Một GraphQL APIs tốt là giao diện giao diện có thể sắp xếp được dữ liệu, có thể phân trang khi lấy dữ liệu. Ví dụ, chúng ta có thể lấy ra một phần các members trong danh sách tất cả các members của channel:

```
type Channel {
  id: ID!
  createdAt: Date!
  modifiedAt: Date
  name: String!
  description: String!
  slug: String!
  memberConnection(first: Int = 10, after: String): ChannelMembersConnection! @cost(complexity: 1, multiplier: "first")
  memberCount: Int!

  # other fields omitted for brevity
}
```


Định nghĩa Type cho ChannelMembersConnection như thế này:

```
type ChannelMembersConnection {
  pageInfo: PageInfo!
  edges: [ChannelMemberEdge!]
}

type ChannelMemberEdge {
  cursor: String!
  node: User!
}
```





### Ví dụ query: membersConnection

```
export default (
  { id }: DBChannel,
  { first, after }: PaginationOptions,
  { loaders }: GraphQLContext
) => {
  const cursor = decode(after);

  const lastDigits = cursor.match(/-(\d+)$/);
  const lastUserIndex = lastDigits && lastDigits.length > 0 && parseInt(lastDigits[1], 10);

  return getMembersInChannel(id, { first, after: lastUserIndex })
    .then(users => loaders.user.loadMany(users))
    .then(result => ({
      pageInfo: {
        hasNextPage: result && result.length >= first,
      },
      edges: result.filter(Boolean).map((user, index) => ({
        cursor: encode(`${user.id}-${lastUserIndex + index + 1}`),
        node: user,
      })),
    }));
};
```




## Testing cho các GraphQL Queries

Gần đây tôi hay suy nghĩ: tôi có nên viết các unit test cho GraphQL server của tôi không? Tôi có nenen viết unit test cho các hàm resolvers không? Spectrum, họ thực sự đã viết các unit test các truy vấn của họ bằng cách gọi trực tiếp từ database test. 

> Trước khi chạy các test, thì nó sẽ cài đặt RethinkDB ở phía local với tên là "testing". Nó sẽ chạy các migrations và thêm vào các dữ liệu fake (dữ liệu tạo ra để test). Điều này rất quan trọng vì chúng ta test các GraphQL với các database thực sự, chúng ta không làm giả bất cứ điều gì, để chắc chắn mọi thứ hoạt động 100%. 


```
// @flow
import { graphql } from 'graphql';
import createLoaders from '../loaders';

import schema from '../schema';

type Options = {
  context?: {
    user?: ?Object,
  },
  variables?: ?Object,
};

// Thêm một vài hàm helper để  viết test DRY hơn.
export const request = (query: mixed, { context, variables }: Options = {}) =>
  graphql(
    schema,
    query,
    undefined,
    { loaders: createLoaders(), ...context },
    variables
  );
```


Chúng ta có thể thực hiện tự động các queries test để server. Đây là một ví dụ về query để test query memberConnection, chúng ta đã viết ở phía trên.

```
import { request } from '../../utils';
import { SPECTRUM_GENERAL_CHANNEL_ID } from '../../../migrations/seed/default/constants';

it('should fetch a channels member connection', async () => {
  const query = /* GraphQL */ `
    {
      channel(id: "${SPECTRUM_GENERAL_CHANNEL_ID}") {
        id
        memberConnection(after: null) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              name
              contextPermissions {
                communityId
                reputation
              }
            }
          }
        }
      }
    }
  `;

  expect.assertions(1);
  const result = await request(query);

  expect(result).toMatchSnapshot();
});
```

Đảm bảo các dữ liệu test của chúng ta là giống nhau giữa các lần thực thi, chúng ta có thể tự động ghi lại. Tôi nghĩ đó thực sự là một use case rất hay. Truyền vào dữ liệu mặc định, bạn sẽ luôn mong đợi các query trả về kết quả theo đúng như mong đợi.

Nếu một hàm resolver thay đổi hoặc liên quan tới query thay đổi, Jest sẽ thông báo ngay cho chúng ta. Rất gọn gàng phải không? 


Đó là những điều tôi đã học được, tôi thực sự đã học được rất nhiều về việc xây dụng các GraphQL server tốt hơn thông qua API của Spectrum. Có một số thứ khác tôi không nói đến như: subscriptions, directives, hay authenticate.


## Tóm lược

Chúc các bạn học được cách xây dựng một sản phẩm thực sự với Node.js. :D

https://github.com/withspectrum/spectrum