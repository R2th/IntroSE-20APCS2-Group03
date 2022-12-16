Bài viết này được dịch từ bài [So what’s this GraphQL thing I keep hearing about?](https://medium.freecodecamp.org/so-whats-this-graphql-thing-i-keep-hearing-about-baf4d36c20cf) của tác giả [Sacha Greif](https://medium.freecodecamp.org/@sachagreif).

Phần 1: https://viblo.asia/p/graphql-ma-toi-thuong-nghe-thay-la-thu-gi-phan-1-L4x5x0aB5BM


-----


# Các câu hỏi thường gặp

Hãy nghỉ một chút để trả lời một số câu hỏi thường gặp.

Bạn đó, ở phía dưới. Phải, bạn đấy. Tôi có thể thấy rằng bạn muốn hỏi gì đó. Hãy hỏi đi, đừng ngại!

## Mối quan hệ giữa GraphQL và cơ sở dữ liệu dạng đồ thị (graph database) là gì?

GraphQL không có gì liên quan với các cơ sở dữ liệu dạng đồ thị như [Neo4j](https://en.wikipedia.org/wiki/Neo4j). Từ "graph" xuất phát từ ý tưởng thu thập dữ liệu trên sơ đồ API (API graph) thông qua các trường và trường con, còn "QL" là viết tắt của "query language".

## Tôi cực kỳ hạnh phúc với REST, tại sao tôi nên chuyển sang GraphQL?

Nếu bạn chưa từng biết tới những điều khổ sở khi dùng REST mà GraphQL giải quyết thì tôi cho rằng đó là một điều tốt!

Sử dụng GraphQL thay cho REST có thể sẽ không ảnh hưởng nhiều đến hầu hết các trải nghiệm của những người dùng ứng dụng của bạn, vậy nên chuyển sang dùng GraphQL cũng không phải là vấn đề nghiêm trọng. Do vậy, tôi rất khuyến khích bạn thử dùng GraphQL ở một dự án phụ nhỏ nếu bạn có cơ hội.

## Tôi có thể dùng GraphQL mà không cần React/Relay/\*thư viện nào đó\* không?

Có chứ! Do GraphQL chỉ là một đặc tả, bạn có thể dùng nó với bất cứ thư viện hay nền tảng nào, với client (ví dụ, [Apollo](http://dev.apollodata.com/) có client GraphQL cho web, iOS, Angular, v..v..) hoặc tự gửi truy vấn lên server GraphQL.

## GraphQL được tạo ra bởi Facebook, và tôi không tin tưởng Facebook

Một lần nữa, GraphQL chỉ là một đặc tả, nghĩa là bạn có thể sử dụng một triển khai của GraphQL mà không cần chạy bất cứ dòng code nào được viết bởi Facebook.

Và dù có được sự hỗ trợ của Facebook là một điểm cộng lớn cho hệ sinh thái GraphQL, tại thời điểm này tôi tin là cộng đồng đã đủ lớn để GraphQL phát triển mạnh cho dù Facebook ngừng sử dụng nó.

## Chuyện "để client lấy dữ liệu mà họ cần" có vẻ không an toàn cho lắm đối với tôi...

Vì bạn tự viết các bộ phân giải nên việc xử lý bảo mật sẽ tùy thuộc vào bạn.

Ví dụ, nếu bạn cho phép client chỉ định tham số `limit` để kiểm soát số lượng document họ nhận được, bạn sẽ muốn giới hạn con số đó để tránh kiểu tấn công từ chối dịch vụ (Denial of Service) khi client liên tục yêu cầu trả về hàng triệu document.

## Vậy tôi cần những gì để có thể bắt đầu?

Thông thường, bạn sẽ cần ít nhất 2 thành phần để chạy một ứng dụng hỗ trợ GraphQL:

- Một server GraphQL để xử lý API.
- Một client GraphQL kết nối đến điểm cấp dữ liệu.

Hãy đọc tiếp để tìm hiểu thêm về các lựa chọn hiện có.

![](https://cdn-images-1.medium.com/max/1600/1*zugVY5cAa9KIP6Necc7uCw.png)

Giờ bạn đã biết được cách GraphQL hoạt động, hãy nói về các lựa chọn chính hiện có.

# Server GraphQL

Thành phần đầu tiên mà bạn cần là server GraphQL. [Bản thân GraphQL](http://graphql.org/) chỉ là một đặc tả, nên việc triển khai sẽ mở và bao gồm một số đối thủ cạnh tranh chính.

## [GraphQL-JS](https://github.com/graphql/graphql-js) (Node)

Đây là phiên bản triển khai gốc của GraphQL. Bạn có thể sử dụng nó với [express-graphql](https://github.com/graphql/express-graphql) để [tạo server API của bạn](http://graphql.org/graphql-js/running-an-express-graphql-server/).

## [GraphQL-Server](http://dev.apollodata.com/tools/graphql-server/) (Node)

Team [Apollo](http://apollostack.com/) cũng có triển khai server GraphQL tất-cả-trong-một của mình. Nó chưa phổ biến như bản triển khai gốc, nhưng nó có tài liệu và sự hỗ trợ tốt và việc học cách sử dụng rất nhanh chóng.

## [Các nền tảng khác](http://graphql.org/code/)

GraphQL.org có một [danh sách các triển khai GraphQL của rất nhiều nền tảng khác](http://graphql.org/code/) (PHP, Ruby, v..v..).

# Client GraphQL

Về mặt kỹ thuật thì bạn có thể truy vấn API GraphQL trực tiếp mà không cần đến các thư viện client riêng, tuy nhiên bạn [hoàn toàn có thể giúp cuộc đời của mình trở nên dễ dàng hơn](https://dev-blog.apollodata.com/why-you-might-want-a-graphql-client-e864050f789c).

## [Relay](https://facebook.github.io/relay/)

Relay là một bộ công cụ GraphQL của Facebook. Tôi chưa dùng nó, nhưng theo những gì tôi nghe được thì nó được thiết kế cho nhu cầu riêng của Facebook, và có thể sẽ không phù hợp với đa số các trường hợp sử dụng khác.

## [Apollo Client](http://www.apollodata.com/)

Người mới tham dự trong lĩnh vực này là [Apollo](http://apollostack.com/) và đã nhanh chóng chiếm lĩnh. Client stack thông thường của Apollo được cấu thành từ 2 thành phần chính:

- [Apollo-client](http://dev.apollodata.com/core/) cho phép bạn chạy các truy vấn GraphQL trên trình duyệt và lưu trữ dữ liệu của các truy vấn đó (và có cả [devtools extension](https://github.com/apollographql/apollo-client-devtools) của riêng nó).
- Một thành phần kết nối tới framework front-end của bạn. ([React-Apollo](http://dev.apollodata.com/react/), [Angular-Apollo](http://dev.apollodata.com/angular2/), v..v..).

Chú ý là, mặc định Apollo-client sẽ lưu dữ liệu của nó bằng [Redux](http://redux.js.org/), đó là một điều tuyệt vời do Redux là một thư viện quản lý trạng thái tuyệt vời với một hệ sinh thái rộng lớn.

![](https://cdn-images-1.medium.com/max/1600/1*SLvbmGeU1p3mUfG8qA4cQQ.png)
Apollo Devtools extenstion trên Chrome

# Các ứng dụng mã nguồn mở

Dù GraphQL còn khá mới nhưng đã có một số ứng dụng mã nguồn mở có tiềm năng đang sử dụng nó.

## [VulcanJS](http://vulcanjs.org/)

![](https://cdn-images-1.medium.com/max/1600/1*YoSlSmK3P1CIlpXKyVujCQ.png)

Trước hết, xin thông báo: tôi là người bảo trì chính của [VulcanJS](http://vulcanjs.org/). Tôi tạo ra VulcanJS để mọi người có thể tận dụng được sức mạnh của stack React/GraphQL mà không cần phải viết nhiều bản mẫu. Bạn có thể coi nó là "Rails dành cho hệ sinh thái web hiện đại", nó cho phép bạn tạo các ứng dụng CRUD (ví dụ như một phiên bản sao chép của Instagram) trong vòng vài giờ.

## [Gatsby](https://www.gatsbyjs.org/docs/)

Gatsby là một chương trình sinh trang tĩnh sử dụng React, giờ đã được hỗ trợ bởi GraphQL từ [phiên bản 1.0](https://www.gatsbyjs.org/docs/). Thoạt đầu trông nó có vẻ là một sự kết hợp kỳ cục, nhưng nó thực sự rất mạnh mẽ. Trong quá trình build của mình, Gatsby có thể lấy dữ liệu từ nhiều API GraphQL, và sau đó sử dụng chúng để tạo một ứng dụng client tĩnh sử dụng React.

# Các công cụ GraphQL khác

## [GraphiQL](https://github.com/graphql/graphiql)

GraphiQL là một IDE trên trình duyệt rất tiện lợi để truy vấn tới các điểm cấp dữ liệu GraphQL.

![](https://cdn-images-1.medium.com/max/1600/1*fbeXj5wB383gWsMXn_6JAw.png)

## [DataLoader](https://github.com/facebook/dataloader)

Do đặc tính lồng nhau của các truy vấn GraphQL, một truy vấn có thể dễ dàng phát sinh hàng tá lời gọi tới cơ sở dữ liệu. Để cải thiện hiệu năng, bạn có thể sử dụng một thư viện xử lý theo lô hoặc đệm như DataLoader, được phát triển bởi Facebook.

## [Create GraphQL Server](https://blog.hichroma.com/create-graphql-server-instantly-scaffold-a-graphql-server-1ebad1e71840)

Create GraphQL Server là một tiện ích dòng lệnh cho phép tạo một khung server GraphQL được hỗ trợ bởi một server Node và cơ sở dữ liệu Mongo một cách nhanh chóng và dễ dàng.

## [GraphQL-up](https://www.graph.cool/graphql-up/)

Tương tự như Create GraphQL Server, GraphQL-up cho phép bạn nhanh chóng khởi tạo một backend GraphQL được hỗ trợ bởi dịch vụ của [GraphCool](https://www.graph.cool/).

# Các dịch vụ GraphQL

Cuối cùng, có một số công ty "GraphQL-backend-as-a-service" đảm nhận toàn bộ phần server cho bạn, và có thể là một cách tốt để bạn tham gia vào hệ sinh thái GraphQL.

## [Graphcool](http://graph.cool/)

Một nền tảng backend linh hoạt kết hợp GraphQL với AWS Lambda, với một gói miễn phí cho nhà phát triển.

## [Scaphold](https://scaphold.io/)

Một GraphQL backend as a service khác, cũng có gói miễn phí. Nó cung cấp rất nhiều tính năng tương tự Graphcool.

![](https://cdn-images-1.medium.com/max/1600/1*deLIZh7AfYbAt0u2t7dAKQ.png)

Có khá nhiều nơi mà bạn có thể cái thiện kiến thức về GraphQL.

## [GraphQL.org](http://graphql.org/learn/)

Trang chính thức của GraphQL có các tài liệu tuyệt vời để bạn bắt đầu tìm hiểu.

## [LearnGraphQL](https://learngraphql.com/)

LearnGraphQL là một khóa học tương tác được tạo nên bởi các thành viên của [Kadira](https://kadira.io/).

## [LearnApollo](https://www.learnapollo.com/)

Một phần kế của LearnGraphQL, LearnApollo là một khóa học miễn phí được tạo ra bởi Graphcool.

## [The Apollo Blog](https://dev-blog.apollodata.com/)

Blog của Apollo có rất nhiều bài viết chi tiết và tốt về Apollo và GraphQL nói chung.

## [GraphQL Weekly](https://graphqlweekly.com/)

Một bản tin về tất cả các thứ liên quan đến GraphQL được thực hiện bởi nhóm Graphcool.

## [Hashbang Weekly](http://hashbangweekly.okgrow.com/)

Một bản tin tuyệt vời khác, ngoài GraphQL thì còn thông tin về React và Meteor.

## [Freecom](https://www.graph.cool/freecom/)

Một series hướng dẫn bạn xây dựng một bản sao của Intercom sử dụng GraphQL.

## [Awesome GraphQL](https://github.com/chentsulin/awesome-graphql)

Một danh sách đầy đủ về các liên kết và tài nguyên về GraphQL.

![](https://cdn-images-1.medium.com/max/1600/1*S69N5yYp1VLSSO0GTnrpmw.png)

Vậy làm thế nào để bạn thực hành với kiến thức GraphQL mới học được? Dưới đây là một vài công thức mà bạn có thể thử:

## [Apollo + Graphcool + Next.js](https://github.com/zeit/next.js/tree/master/examples/with-apollo)

Nếu bạn đã quen với Next.js và React, [ví dụ này](https://github.com/zeit/next.js/tree/master/examples/with-apollo) sẽ giúp bạn cài đặt điểm cấp dữ liệu GraphQL sử dụng Graphcool và truy vấn bằng Apollo.

## [VulcanJS](http://docs.vulcanjs.org/)

[Hướng dẫn về Vulcan](http://docs.vulcanjs.org/) này sẽ giúp bạn cài đặt một tầng dữ liệu GraphQL đơn giản, trên cả server và client. Nếu bạn cần giúp đỡ, đừng ngần ngại [ghé thăm kênh Slack của chúng tôi](http://slack.vulcanjs.org/)!

## [GraphQL & React Tutorial]

Blog của Chroma có một [bài hướng dẫn 6 phần](https://blog.hichroma.com/graphql-react-tutorial-part-1-6-d0691af25858#.o54ygcruh) về việc xây dựng một ứng dụng React/GraphQL theo cách thức phát triển hướng thành phần.

![](https://cdn-images-1.medium.com/max/1600/1*uLSaEA8VyrGrU2Nki7LiKg.png)

# Kết luận

Ban đầu GraphQL có vẻ trông phức tạp vì nó là một công nghệ vươn tới nhiều lĩnh vực phát triển hiện đại. Nhưng nếu bạn dành thời gian tìm hiểu các khái niệm bên dưới, tôi nghĩ bạn sẽ hiểu được nhiều thứ về nó.

Vậy nên dù cuối cùng bạn có sử dụng nó hay không, tôi tin rằng việc làm chủ GraphQL sẽ rất đáng. Càng ngày càng có nhiều công ty và framework đang tiếp nhận GraphQL và có thể nó sẽ trở thành một thành phần xây dựng web quan trọng trong một vài năm tới.