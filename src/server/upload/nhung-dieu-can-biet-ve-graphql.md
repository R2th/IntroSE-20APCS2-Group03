### I. GraphQL vs REST
- Những điểm tương đồng của GraphQL và REST là đều được sử dụng để tạo API, và được quản lý qua HTTP
- Về sự khác biệt thì REST chủ yếu tập vào độ cố định của một API (API’s durability), tức là gọi thì trả về dữ liệu, không có sự tùy biến nên nó không quan tâm nhiều về vấn đề performance
- Còn GraphQL thì là một ngôn ngữ truy vấn được tạo ra để hoạt động trên một endpoint duy nhất, tùy biến để phù hợp ngữ cảnh nên nó khá tốt cho vụ quản lý performance trả về

### II. Data Fetching
- đây là một trong những điều hấp dẫn mà GraphQL có
- Không cần request tới nhiều endpoint, chỉ cần một endpoint để kết nối tới data có sẵn trên server
```
query {
  books {
    id
    title
    author
    isbn
    price
  } 
}
```

### III. Over or Under Data Fetching
- Trong REST thì việc tìm và nạp dữ liệu đơn giản hơn nhiều trong GraphQL, vì nó đã định sẵn đầu vào và đầu cuối nhưng cũng có một bất cập là khi cần một yêu cầu bổ sung thì nó phải tạo ra một endpoint mới
- Còn GraphQL thì ngược lại, để có thể sử dụng, lập trình viên phải biết cách truy vấn theo ngôn ngữ này, và cũng chỉ cần thiết lấy những cái cần trong ngữ cảnh mà mình muốn, nên việc trả về những dữ liệu dư thừa là không thể xảy ra
```
query {
 books {
   title
   price
 } 
}
```

### IV. Error Management
- Trong việc quản lý lỗi ở REST thì nó khá là đơn giản, chỉ việc kiểm tra HTTP headers để biết lỗi là gì
- Nhưng trong GraphQL thì nó lại luôn chỉ trả về trạng thái 200 OK, vì vậy phải tự thiết hoặc dùng tool thứ 3 khá là mất công, may mắn là một số framwork có hỗ trợ sẵn luôn bên trong như nestjs, ...
```
Request: query { books { error_field } }
Response:
Request Method:POST
Status Code: 200 OK
{“errors”:[{“message”:”Cannot query field \”error_field\” on type \”Book\”.”,”category”:”graphql”,”locations”:[{“line”:3,”column”:3}]}]}
```

### V. Caching
- REST được thực thi bằng cách sử dụng HTTP đã được put caching vào, nên có thể sử dụng để ngăn chặn việc lấy resources
- Còn GraphQL thì không có hệ thống lưu vào bộ nhớ đệm, do đó mọi việc đều phải sử lý bằng tay

### VI. Versioning
- Khi thay đổi một api nào đó trong REST thì nó có thể sẽ ảnh hưởng đến các cấu trúc cũ nếu người dùng không cập nhật mới, vì vậy việc tạo ra version để quản lý giữa việc những user sử dụng api cũ và api mới để tránh gây ra lỗi
- Trong khi đó, GraphQL thì chỉ lấy dữ liệu cần thiết nên dev nếu biết cách sử lý thì việc thay đổi API trong GraphQL cũng không ảnh hưởng giữa những người dùng cũ hay mới cả

### VII. Performance Optimization
- Trong REST việc chỉ lấy một số trường nhưng lại trả về hết là một điều bình thường, ví dụ: khi bạn chỉ cần lấy trường name và email, thì bạn gọi api account, nó sẽ trả về hết cho bạn các trường name, email, sđt, address, ...
- Còn GraphQL thì nó sẽ tùy theo ngữ cảnh mà bạn muốn để chỉ trả về những trường cần thiết, tránh giảm performance
```
‘author_name’ => [
  ‘type’ => Type::string(),
  ‘deprecationReason’ => ‘Deprecated. Use author field’,
 ],
```

### VIII. Bất cập với việc caching
- Không giống với REST như nói ở trên, GraphQL kêu gọi cách tiếp cận hoàn toàn khác, như đã giải thích rõ bởi graphql.org
> “In an endpoint-based API, clients can use HTTP caching to easily avoid refetching resources, and for identifying when two resources are the same. The URL in these APIs is a globally unique identifier that the client can leverage to build a cache. In GraphQL, though, there’s no URL-like primitive that provides this globally unique identifier for a given object. It’s hence a best practice for the API to expose such an identifier for clients to use.”

### IX. Vấn đề về Authorization
- Hãy coi GraphQL như là một ngôn ngữ dành riêng cho domain, nó chỉ có một lớp duy nhất để đặt giữa server và client. Ủy quyền hoàn toàn là một layer riêng biệt và bản thân ngôn ngữ sẽ không có hỗ trợ hay việc sử dụng xác minh, xác thực
- Tuy nhiên bạn vẫn có thể sử dụng tạo token để truy cập giữa client và server, điều này thì lại giống REST đang làm trước giờ

### X. Vấn đề về query n + 1
- Khi bạn làm với GraphQL bạn dễ bị dính phải việc query n + 1
- ví dụ: bạn có 2 bảng là users và addresses (users 1 - n addresses), khi truy vấn GraphQL bạn sẽ có đoạn code như này
```
query {
 users {
    name
    education {
      degree
      year
    }
    age
    address {
      country
      city
      street
    }
  }
}
```
- Như GraphQL có cái gọi là resolver con, thì khi address được gọi trong user, thông thường ta sẽ thiết kế cấu trúc như sau
```
  const addresses = await this.address.find({ user_id: id });
```
- Nếu chỉ gọi 1 user thì câu trên không sao cả, nhưng nếu mà gọi như cầu đầu tiên thì nó sẽ bị query n + 1
- Vấn đề này cũng có nhiều cách giải quyết khác nhau như:
  - gọi left join từ user rồi truyền address đã get từ user truyền vào lại resolver con
  - hoặc chia 2 luồng check việc gọi riêng và gọi nhiều
  - ...

### XI. Kết
Đây là một số vấn đề từ kinh nghiệm cũng như tìm hiểu của mình khi làm về GraphQL, mong nó sẽ giúp được bạn phần nào hiểu rõ hơn về GraphQL