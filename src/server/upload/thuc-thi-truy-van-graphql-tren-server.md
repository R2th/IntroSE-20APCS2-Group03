# 1. Giới thiệu chung 
* Khi Client gọi các câu truy vấn GraphQL, các câu truy vấn này sẽ trải qua quá trình validation dựa vào **Type System** (**Schema**).
* Nếu câu truy vấn là hợp lệ, nó sẽ được thực thi bởi GraphQL Server, sau đó server sẽ trả về kết quả mang "hình dáng" của câu query mà Client yêu cầu, kết quả trả về là kiểu Json.
* GraphQL không thể thực thi Query mà không có Schema. Chúng ta hãy cùng sử dụng ví dụ Schema sau để minh họa việc thực thi một truy vấn.
    ```GraphQL
    type Query {
      human(id: ID!): Human
    }

    type Human {
      name: String
      appearsIn: [Episode]
      starships: [Starship]
    }

    enum Episode {
      NEWHOPE
      EMPIRE
      JEDI
    }

    type Starship {
      name: String
    }

    ```
* Để mô tả điều gì xảy ra khi một query được thực thi, chúng ta hãy thực hiện một câu query phía client như sau
    ```graphql
    {
      human(id: 1002) {
        name
        appearsIn
        starships {
          name
        }
      }
    }
    ```
    
    Kết quả server trả về như sau
    ```json
    {
      "data": {
        "human": {
          "name": "Han Solo",
          "appearsIn": [
            "NEWHOPE",
            "EMPIRE",
            "JEDI"
          ],
          "starships": [
            {
              "name": "Millenium Falcon"
            },
            {
              "name": "Imperial shuttle"
            }
          ]
        }
      }
    }
    ```
* Mỗi một trường trong query như là một function hay method của type cha để trả về type con. Chẳng hạn như `name` là một function của type human để trả về type name của human.
* Mỗi field trên mỗi type có một function chịu trách nhiệm xử lý phía backend gọi là **resolver**. Khi một field được thực thi, resolver tương ứng sẽ được gọi để trả về value cho các filed con tiếp theo.
* Nếu một field là một loại **scalar** như là một string hay một number, thì việc thực thi hoàn thành.
* Còn nếu một field trả về một object value, thì việc thực thi sẽ lại được tiếp tục trên các field của object đó, cứ tiếp tục như vậy cho đến khi đạt được các scalar value. GraphQL Query luôn luôn kết thúc ở các scalar value.
# 2. Root fields & Resolvers
* Ở level cao nhất  của một GraphQL Server chính là **Root type** hay còn gọi **Query type**, nó đại diện cho các entry point của GraphQL API.
* Ở ví dụ dưới đây, Query type định nghĩa một field `human` nhận vào tham số là id. Trên server, định nghĩa một function resolver cho field `human` này, function này đại khái sẽ truy xuất database lấy ra dữ liệu, khởi tạo và trả về một đối tượng `Human`
    ```graphql
    Query: {
      human(obj, args, context, info) {
        return context.db.loadHumanByID(args.id).then(
          userData => new Human(userData)
        )
      }
    }
    ```
    Ví dụ bên trên được viết với ngôn ngữ JavaScript, tuy nhiên bạn có thể xây dựng một GraphQL Server bằng nhiều ngôn ngữ khác. Tuy nhiên dù thế nào thì một resolver function sẽ nhận vào 4 tham số
    * **obj**: Đối tượng trả về từ field cha.
    * **args**: Một object chứa tất cả các tham số GraphQL cung cấp cho field này.
    * **context**: Một object chia sẻ giữa tất cả các resolver bao gồm các thông tin liên quan đến ngữ cảnh như thông tin người dùng đăng nhập, kết nối cơ sở dữ liệu ...
    * **info**
 # 3. Trivial Resolvers (Những hàm resolver "easy to solve")
* Khi object `Human` được trả về cho trường `human`, GraphQL sẽ thực thi tiếp cho những field là field con của field `human`
    ```graphql
    Human: {
      name(obj, args, context, info) {
        return obj.name
      }
    }
    ```
* GraphQL mạnh mẽ với hệ thống type system được định nghĩa trước, được sử dụng để GraphQL quyết định cái gì làm tiếp theo.
* Thậm chí, trước cả khi `human` field return bất cứ cái gì,  GraphQL cũng biết bước tiếp theo là resolve những field của `Human` bởi vì type system sẽ nói cho GraphQL biết rằng fielđ `human` sẽ trả về `Human`
* Việc giải quyết cho trường `name` trong ví dụ bên trước rất là đơn giản, rõ ràng. Function resolver cho trường name được gọi, ở đây `obj` chính là object `new Human` trả về từ field đằng trước (field cha, field `human`). Function sẽ chả về trường name truy vấn trên đối tượng `obj`
* **Lưu ý** : Trong thực tế nhiều thư viện GraphQL sẽ bỏ đi những hàm resolver đơn giản như trên. Nếu hàm resolver được chỉ đinh, GraphQL sẽ thực thi hàm resolver đó, nếu không thì GraphQL sẽ ngầm hiểu để đọc và trả về một trường cùng tên (cụ thể trong ví dụ trên, GraphQL sẽ ngầm hiểu và trả về trường name của object `Human` cho field name là field con của field `Human`).
# 4. Scalar coercion (cưỡng chế vô hướng)
* Trong khi field `name` được resolve, thì các field `appearsIn` và `starships` cũng được thực thi đồng thời. Hàm thực thi của field `appearsIn` có thể cũng là một hàm trivival resolver
    ```graphql
    Human: {
      appearsIn(obj) {
        return obj.appearsIn // returns [ 4, 5, 6 ]
      }
    }
    ```
* Ở đây chú ý rằng, type system đã yêu cầu `appearsIn` phải trả về kiểu Enum `Episode`. Tuy nhiên function resolver lại return về numbers!
* Điều hay ho ở đây là chúng ta hãy xem lại kết quả trả về cho client đã được show ở phần đầu của bài viết, chúng ta sẽ thấy kết quả trả về sẽ tương ứng với các giá trị của Enum
* Đây là một ví dụ về **Scalar Coercion**. Type System sẽ dựa vào schema để biết được cái gì được mong đợi trả về và sẽ convert giá trị trả về bởi resolver để phù hợp với "hợp đồng"
# 5. Kết quả trả về cho client.
* Khi mỗi field được resolve, kết quả sẽ được trả về theo định dạng key-value. Key là tên field hoặc alias, value là giá trị trả về của resolver
* Kết quả sẽ theo đúng cấu trúc mà client yêu cầu trong truy vấn truyền lên.
# 6. Kết luận
* Ở bài viết này mình đã trình bày tổng quan về các mà GraphQL server thực hiện để đáp ứng yêu cầu phía Client. Nói chung GraphQL Server phải định nghĩa các hàm resolver để xử lý trả về dữ liệu cho các **field** (từ **Root field** đến các field con)
* Mong bài viết sẽ truyền đạt được nội dung một cách ngắn gọn nhất đến các bạn và mong nhận được góp ý nếu có chỗ nào chưa chính xác.
* Nguồn tham khảo https://graphql.org/learn/execution/