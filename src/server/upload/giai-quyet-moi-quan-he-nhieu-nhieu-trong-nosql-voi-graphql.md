### I. Lời mở đầu
NoSQL và GraphQL chắc không còn xa lạ gì với mọi người nữa. Nói một cách đơn giản thì:
 - NoSQL là No Structured Query Language hay còn gọi là truy vấn không có quan hệ (no relationship).
 - GraphQL là ngôn ngữ hỗ trợ chúng ta quản lý việc quản lý việc trả về của dữ liệu, vì sao lại cần quản lý việc trả về, ví dụ đơn giản, khi làm việc với REST API, việc bạn gửi một URL request server trả về dữ liệu của một group trong đó chứa sẵn users mà user đó đã tham gia, nhưng bạn chỉ cần tên, id hay avatar của user là được, nhưng bên phía server lại trả về hết tất cả những giá trị có trong user đó, như vậy sẽ gây nặng dữ liệu trả về, gây giảm hiệu năng của ứng dụng. GraphQL sinh ra để giải quyết các vấn đề này, vẫn còn rất nhiều vấn đề mà bên REST API không thể giải quyết được thì GraphQL sẽ hỗ trợ.
### II. Bài toán
- Ta có 2 bảng là users và groups. Ta có mối quan hệ của chúng là một user có thể tham gia nhiều group và một group có thể có nhiều user
- Nếu dùng SQL thì ta sẽ tạo thêm một bảng trung gian để đưa mối quan hệ nhiều nhiều này thành quan hệ 1 nhiều
- Nhưng trong NoSQL ta không cần phải tạo thêm một bảng như vậy, ta chỉ việc lưu nó dưới dạng attribute của một object, ví dụ
    ```
    // Group
    group {
        id: 1,
        name: "Group",
        description: "Group Description",
        users: [
            {
                id: 1,
                name: "Trung",
                email: "abc@xyz.com",
                avatar: "Avatar.jpg",
                role: "Superman"
            },
            {
            id: 1,
                name: "Linh",
                email: "xyz@abc.com",
                avatar: "Picture.jpg",
                role: "Louis Lane"
            }
        ],        
    }
    
    // User
    user {
        id: 1,
        name: "Trung",
        email: "abc@xyz.com",
        avatar: "Avatar.jpg",
        role: "Superman",
        groups: [
        {
            id: 1,
            name: "Group",
            description: "Group Description",
        },
        ],
    }
    ```
    - Làm như trên thì việc truy vấn để lấy các groups trong user hay users trong group trở nên dễ dàng hơn
    - Tưởng chừng bài toán tới đây đã được giả quyết, nhưng KHÔNG! Nó lại sinh ra 2 vấn đề mới:
        - Nếu như lưu dữ liệu như trên thì việc phình data là chuyện tất yếu, và việc sau này một group có thể chứa tới 1.000, 10.000 hay 100.000 là rất dễ xảy ra, nếu ta lưu như trên thì việc record này sẽ trở lên rất nặng và chậm chạm
        - Vậy ta chuyển qua cách lưu theo ID, nhưng lưu theo ID thì ta lại phải viết thêm một hàm query tách biệt để có thể lấy ra những users trong group hay groups trong user. Lắc nhắc và cực kỳ phiền phức (các bạn làm một app nhỏ thử là sẽ thấy :v)
        - Vì vậy GraphQL hỗ trợ ta việc này
### III. Giải quyết bài toán với GraphQL
- Nếu bạn có tìm hiểu về GraphQL thì sẽ biết rằng trong GraphQL có 2 phần là
    - ĐỊnh nghĩa (gồm Type, Query, Mutation)
    - Trả về (gồm Resolver)
- Đầu tiên trong phần Type của GraphQL ta định nghĩa như sau
    ```
    type Group {
        id:String! # Chấm than có nghĩa là bắt buộc phải có giá trị này
        name:String!
        desciption:String
        userIds:[String] # Ở đây định nghĩa để lưu những giá trị id của users
        
        users:[User] # Đây là giá trị trả về cho Client, không lưu dữ liệu, chức năng chỉ có trả về mảng user
    }
    
    type User {
        id:String!
        email:String!
        name:String!
        avatar:String
        role:String
        groupIds:[String]
        groups:[Group]
    }
    ```
- Ở resolver ta định query các giá trị để trả về
    ```
    Group: {
        users: (obj, args, context, info) => // function query dữ liệu users theo group
    }
    
    User: {
        groups: (obj, args, context, info) => // function query dữ liệu groups theo user
    }
    ```
### IV. Kết
Như vậy dữ liệu vẫn được trả về như cách ta mong muốn là khi get user hay group, nếu ta muốn thì nó vẫn trả về được list các user hoặc group. Mong rằng bài viết này giúp ích được phần nào cho mọi người về việc kết hợp giữa NoSQL với GraphQL và có thêm một cách để giải quyết vấn đề quan hệ nhiều nhiều trong NoSQL :D