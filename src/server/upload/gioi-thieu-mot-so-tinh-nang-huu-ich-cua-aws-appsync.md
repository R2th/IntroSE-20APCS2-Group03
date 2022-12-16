AppSync là dịch vụ cho phép developer xây dựng ứng dụng với dữ liệu được đồng bộ thời gian thực hoặc ngoại tuyến.
Bạn có thể tìm hiểu thêm tại:

https://aws.amazon.com/appsync/

### 1.GraphQL Transform

Một GraphQL API thường có 3 phần schema, resolvers và data sources. 3 phần riêng biệt này sẽ được kết nối với nhau, tiến hành cái bắt tay thân thiện để anh thợ code sau đó có thể tạo được record, lấy dữ liệu về …

Thư viện  GraphQL Transform sẽ tự động thực hiện cái bắt tay này dựa trên Định nghĩa (GraphQL Schema Definition Language), sinh ra tất tần tật những thứ cần thiết cho 1 GraphQL API, kiêm luôn phần authentication, quan hệ dữ liệu và data sources.

Với **directive** @model như thế này:

![](https://images.viblo.asia/4dec2f0d-caf5-4a21-9252-a49ed25bbfde.png)

Chỉ đơn giản vậy thôi, GraphQL Transform sẽ tự động tạo ra 1 API với đầy đủ schema, queries, mutations, subscriptions, định dạng input và nhiều hơn thế nữa. Ngoài ra còn có directive để cài đặt authorization, access control và sinh ra quan hệ dữ liệu.


Documentation của GraphQL Transform: 

https://aws-amplify.github.io/docs/cli/graphql?sdk=js


### 2.Resolver utilities

Resolver vừa đóng vai trò kết nối giữa schema và data sources, vừa là một kho lưu trữ khoảng 80 hàm utility hữu dụng để kiểm tra format, xử lí data time, authorization,... Xin được dạo qua một số utility như sau:

**$util.unauthorized**

Hàm này dùng để kiểm tra xác thực, xem user có quyền access data hay không, syntax vô cùng đơn giản

![](https://images.viblo.asia/8bfa69e4-8c28-4e2e-b0ed-3699c3ecabe5.png)

**$util.time**

Đây là tập hợp nhiều hàm xử lí date time mà chúng ta hay gặp, việc gì phải tốn công cài thêm thư viện khác khi mọi thứ đã có sẵn. Thử điểm mặt một số hàm như sau:

![](https://images.viblo.asia/134ff56f-d9b8-444c-8b0c-943000ddedd7.png)

**$util.matches**

Kiểm tra string format khá dễ dàng, giả dụ như kiểm tra xem thử địa chỉ có phải ở New York hay không

![](https://images.viblo.asia/72ee7dbb-3ed8-44a3-9223-7cd673d76dbb.png)


**$util.error**

![](https://images.viblo.asia/06d29aa0-c11a-4dd0-a4bf-da928179027b.png)

Để tìm hiểu thêm về resolver utilities: 
https://docs.aws.amazon.com/appsync/latest/devguide/resolver-util-reference.html


### 3.GraphQL CodeGen

Đây là tính năng tự động sinh code API và type annotation. Điều này đồng nghĩa với việc bạn không phải mò mẫm viết từng dòng code để thay đổi dữ liệu, subscribe hay chạy query. Còn gì tuyệt bằng phải không nào?

Hãy tưởng tượng những năm tháng dành cả tuổi thanh xuân của anh thợ code miệt mài mapping api và viết từng dòng query một, và đây, xin giới thiệu, chỉ với một vài dòng lệnh:

![](https://images.viblo.asia/440bee4e-ee94-427f-90a1-9b9a40739caa.png)

Và đây là thành quả:

![](https://images.viblo.asia/66e0880b-4282-42ea-ab3d-2b2f33faf920.png)

Thêm thông tin về CodeGen:

https://github.com/amazon-archives/aws-appsync-codegen

### 4.Hỗ trợ Offline cho Apollo cache

Trong quá trình build 1 ứng dụng với GraphQL, hẳn chúng ta không ít lần tạo mutation kết nối UI với data. Sau khi đã kết nối thành công, thay đổi trên data đồng thời tạo ra thay đổi tương ứng trên UI. Chẳng hạn, khi tạo một ứng dụng Todo đơn giản, chúng ta thường thực hiện mutation như thế này:

![](https://images.viblo.asia/1647db72-71c0-4d0c-92d6-c26bb411fb91.png)

Có thể bạn chưa biết, chỉ với 1 dòng code thay cho mớ code trên, chúng ta đã có thể đạt hiểu quả mong muốn:

![](https://images.viblo.asia/542f5871-36d9-4338-a7cf-973feb2d0d7c.png)

Để biết thêm về offline helpers vui lòng truy cập:

https://github.com/awslabs/aws-mobile-appsync-sdk-js/blob/master/OFFLINE_HELPERS.md


### Kết luận

Trên đây chỉ là một số tính năng hữu dụng do các công cụ của AWS AppSync mang lại, còn rất nhiều tính năng khác mà tác giả chưa khám phá ra hết, bạn đọc có thể góp ý thêm ở phần bình luận nhé.

Hy vọng bài viết mang đến cho bạn đọc những thông tin hữu ích. Với đam mê, miệt mài lao động và một chút cà phê mang lại sự tỉnh táo, chúng ta đang trên con đường học hỏi và tạo ra thành công cho chính mình.

Chúc bạn đọc thật nhiều sức khỏe.