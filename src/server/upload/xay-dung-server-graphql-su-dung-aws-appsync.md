# 1. Introduction
> Hôm nay tôi sẽ hướng dẫn các bạn cách tạo và tương tác với GraphQL bằng AWS AppSync. Với AppSync chúng ta sẽ dễ dàng xây dựng một server realtime và cả offline nữa.

> Việc graphql là gì hay nó mạnh mẽ ra sao thì trong bài này tôi sẽ không đề cập, nếu các bạn muốn tìm hiểu sâu hơn hay so sánh nó khác gì với REST API các bạn có thể tìm kiếm ngay trên viblo đây tôi nghĩ khá là đầy đủ rồi.

> Hôm nay chúng ta sẽ thử xây dựng một server đơn giản nhất với appsync bao gồm chức năng CRUD task (thêm sửa xóa và hiển thị).

# 2. Content

- Đầu tiên nếu chưa có account amazon các bạn cần đăng ký 1 cái để có thể truy cập vào console của amazon => [AWS Sign Up](https://portal.aws.amazon.com/billing/signup#/start)
- Nếu các bạn đã có account rồi thì các bạn truy cập vào [Amazon Console](https://console.aws.amazon.com/) và tìm `Mobile Services` 

![](https://images.viblo.asia/622d15b3-bfe9-4445-990f-c43041a01e1f.png)

- Tiếp theo chọn AWS AppSync và giao diện sẽ hiển thị ra như sau:

![](https://images.viblo.asia/29646abf-e7e1-4bf4-9397-1db04b2197ff.png)

- Rồi giờ bạn hãy chọn `Create API` và chọn `Build from scratch`, đặt tên ứng dụng là `TaskCRUD`.
- Sau khi tạo thành công bạn sẽ ra giao diện như này

![](https://images.viblo.asia/173ed7ec-8543-47ff-9bd2-866963c1c4d0.png)

- 

- Tiếp theo bạn chọn `Edit Schema` để tạo ra một schema cho server graphql của chúng ta

    ```Javascript
    type Task {
        id: ID!
        content: String!
    }

    type Query {
        getAllTasks: [Task]
    }

    type schema {
        query: Query
    }
    ```

- Giải thích một chút ở trên thì schema của graphql có các khái niệm cơ bản như là `Query, Mutation, Subscription`, `Query` là thực hiện câu truy vấn lấy dữ liệu ra, `Mutation` để thực hiện mutate(thay đổi) dữ liệu như là thêm sửa xóa, còn subscription để lắng nghe trigger từ database.
- Trong phạm vi bài giới thiệu này của tôi thì chúng ta sẽ chỉ implement `Query` và `Mutation`.
- Schema ở trên ta định nghĩa `Task` như là định nghĩa 1 bảng trong database vậy, có 2 field là id và content vs các kiểu dữ liệu tương ứng là `ID` và `String`, dấu ! để biểu trưng 2 field đó là `required` không được để rỗng khi chúng mutate record.
- `type Query` là định nghĩa tất cả các câu truy vấn ở trong đó, ở đây ta có câu truy vấn `getAllTasks` có kiểu dữ liệu là `[Task]` (tương đương 1 mảng task) để lấy ra tất cả các task trong database.
- Cuối cùng là schema, trong đó ta khai báo các câu query để định nghĩa schema cho server.
- Sau khi ta định nghĩa schema thành công thì bên phải sẽ hiển thị như sau

![](https://images.viblo.asia/c6a6829b-c895-4e54-9894-03f47759b122.png)

- Tiếp theo các bạn chọn `Create Resources` rồi chọn 

![](https://images.viblo.asia/53ac9fc5-016d-44ab-9122-974b254011dc.png)

- Sau đó chọn `Save` để AppSync tạo ra các table trong database cũng như relationship và cả tự động generate query, mutation, subscription vào trong schema của chúng ta nữa.

- Tiếp theo ta vào click vào tab `Queries` để truy vấn thử xem sao
- Ở đây ta gõ vào editor như sau:

    ```Javascript
    query {
      listTasks {
        items {
          id
          content
        }
      }
    }
    ```

- Đây là cú pháp khi truy vấn vs graphql, bạn chỉ ra đây là câu query và ở trong bạn gọi câu query bạn đã định nghĩa bên schema vào đây, ở trong đó là dữ liệu bạn muốn lấy về của từng record (ở đây ta lấy về hết id và content hoặc nếu muốn bạn có thể chỉ lấy về id hoặc chỉ lấy về content).
- Ấn run và kết quả trả về

![](https://images.viblo.asia/3b62a787-071c-4b59-b819-a7a8f60f675d.png)

- Kết quả là mảng rỗng bởi trong database của chúng ta chưa có task nào cả. Giờ ta sẽ thử thêm 1 vài record vào database.
- Quay lại với tab `Queries` ta gõ như sau

    ```Javascript
        mutation {
          createTask(input: {content: "Finish this tutorial"}) {
            id
            content
          }
        }
    ```
- Kết quả trả về sẽ là record bạn vừa tạo mới

![](https://images.viblo.asia/eb1b91e0-f228-423f-932d-fc1c5944dfe0.png)

- Rồi giờ khi query `listTasks` lại như trên ta sẽ thấy record mà ta vừa tạo được hiển thị ra ở đấy.
- Giờ ta thử delete record vừa tạo được

    ```Javascript
        mutation {
          deleteTask(input: {id: "02215c6b-82af-46a1-a79b-6893122544a4"}) {
            id
            content
          }
        }
    ```
- Giờ khi query `listTasks` ta sẽ thấy mảng kết quả lại rỗng.
# 3. Conclusion
- Ở trên là các thao tác cơ bản khi bạn làm việc với AppSync. Hi vọng sẽ giúp ích được với ai đang tìm hiểu GraphQL cũng như muốn xây dựng một server GraphQL realtime cho dự án của mình.
- Ngoài AppSync các bạn cũng có thể sử dụng [Prisma](https://www.prisma.io/).