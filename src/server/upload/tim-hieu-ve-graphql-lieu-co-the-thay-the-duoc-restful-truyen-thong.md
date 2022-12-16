# GraphQL là gì?
GraphQL là một trong những phương pháp hiện đại nhất để xây dựng và truy vấn các API. Đây là là một cú pháp mô tả cách yêu cầu dữ liệu và thường được sử dụng để tải dữ liệu từ server đến client, 
Trên thực tế GraphQL đã được sử dụng từ vài năm trước trong ứng dụng trên mobile của Facebook. GraphQL có ba đặc điểm chính:

1. Cho phép client chỉ định chính xác dữ liệu mà họ cần, từ đó giảm dữ liệu dư thừa và tối ưu băng thông.
2. Giúp việc tổng hợp dữ liệu từ nhiều nguồn trở nên dễ dàng hơn.
3. Sử dụng một hệ thống kiểu để mô tả dữ liệu.

Với GraphQL , người dùng có thể thực hiện một cuộc gọi duy nhất để tìm nạp thông tin được yêu cầu thay vì xây dựng một số yêu cầu REST để tìm nạp giống nhau.
Lại bàn chuyện về REST, chúng ta đã khá quen thuộc với với những bất tiện mà chúng mang lại. Đáng nói nhất do số lượng API endpoint quá nhiều, đôi lúc để update được 1 dữ liệu sẽ phải tổng hợp từ nhiều cuộc gọi api (GET), sau đó cần gọi thêm 1 api update nữa thực sự hoàn tất (PUT). Ngoài ra, sử dụng REST cũng rất khó để define ra được một chuẩn chung của dữ liệu trả về, vì đôi lúc với một model, client có thể tại mỗi 1 thời điểm sẽ cần dữ liệu ở những field khác nhau.

Vì vậy GraphQL đã ra đời để khắc phục gần như tất cả những thứ mà REST chưa làm đc.

# Writing code
Nghe tới đây, dường như bạn đã thấy GraphQL có nhiều điểm thú vị hơn RESTful api truyền thống rồi đúng ko, bây giờ chúng ta sẽ bắt đầu đi vào ví dụ thực tế :D

Việc đầu tiên cần làm, là khởi tạo project và cài đặt GraphQL package. Tiếp đó tạo 1 file `server.js`
```
npm init
npm install express express-graphql graphql --save
touch server.js
```

Để xử lý các truy vấn GraphQL, cần một schema định nghĩa Query type, type sẽ giúp chúng ta định dạng kiểu dữ liệu cho từng field của kết quả từ truy vấn, ví dụ kiểu string, int.
Ở đây mình sẽ define một Query cho model tên là `Car` 

```
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Car {
    color: String
    brand: String
  }
  type Query {
    car: Car
  }
`);
```

Tiếp đó, ta cần một API root function gọi là "resolver", dùng để xử lý dữ liệu cho Query trước đó.
```

// The root provides a resolver function for each API endpoint
var root = {
  car: () => ({
    color: 'White',
    brand: 'Audi'
  })
};
```

Cuối cùng, expose endpoint này để client có thể sử dụng.
```
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
```

Chạy GraphQL server với câu lệnh:
```
node server.js
```

Vì mình đã định nghĩa cấu hình graphqlHTTP với `graphiql: true`, nên bạn có thể sử dụng công cụ GraphiQL để đưa ra các truy vấn GraphQL theo cách thủ công. Nếu bạn điều hướng trình duyệt web tới địa chỉ http://localhost:4000/graphql sẽ thấy ngay một giao diện cho phép thực hiện các truy vấn. 
Nó sẽ giống như sau:
![image.png](https://images.viblo.asia/55eeaafd-61d4-40c8-a67f-8c4599e4ad34.png)

Ở đây mình sẽ thực hiện truy vấn các thông tin của "Car" mà trước đó đã định nghĩa. Car có 2 thuộc tính là color và brand, nhưng mình hoàn toàn có thể chỉ truy vấn 1 trong 2 giá trị đó:
![image.png](https://images.viblo.asia/439ef32a-bcf4-4af5-a4bb-3def80230cc4.png)

Hoặc là cả 2, bạn có thể lấy bất kỳ giá trị nào mình muốn mà trong schema có định nghĩa.
![image.png](https://images.viblo.asia/88dffb52-6898-4ecc-9c09-f2b7ec3f381f.png)

Trên đây là ví dụ nho nhỏ để các bạn bắt đầu làm quen với GraphQL, mặc dù rất dễ hiểu và ko có gì phức tạp nhưng từ những ưu điểm vượt trội mà chúng mang lại, có thể nói công nghệ này chắc chắn sẽ thay thế những hệ thống RESTful API truyền thống trong tương lai.
Cảm ơn các bạn đã theo dõi bài viết của mình!!!