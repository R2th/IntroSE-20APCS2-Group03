# 1.Introduction About GraphQL

![](https://images.viblo.asia/11929d9c-8731-4bd3-8d60-b702f56c013c.png)


 
Chào các bạn vào khoảng thời gian gần đây mình được biết tới GraphQL thông qua các anh làm cùng  và cũng có tò mò về nó, mình cũng đã làm 1 vài dự án nhưng chưa có dự án nào sử dụng GraphQL nào cả nên cũng chưa hiểu mặt mũi ngang dọc nó như thế nào, thì tiện đây mình cùng các bạn làm 1 seri về GraphQL sau đó là kết hợp với Ruby On Rails nhé !

1.1  GraphQL được ra mắt năm 2015 là một Graph Query Language được dành cho API. Nó được phát triển bởi Facebook và hiện tại nó được duy trì bởi rất nhiều công ty lớn, và mọi cá nhân trên khắp thế giới. GraphQL từ khi ra đời đã gần như thay thế hoàn toàn REST bởi sự hiệu quả, mạnh mẽ và linh hoạt hơn rất nhiều và hơn nữa GraphQL là một ngôn ngữ truy vấn cho các API và thời gian chạy để thực hiện các truy vấn đó với dữ liệu hiện có của bạn. GraphQL cung cấp mô tả đầy đủ và dễ hiểu về dữ liệu trong API của bạn, cung cấp cho khách hàng sức mạnh để yêu cầu chính xác những gì họ cần và không cần gì hơn, giúp việc phát triển API dễ dàng hơn theo thời gian và cho phép các công cụ mạnh mẽ dành cho các developer.

1.2  Sự quan tâm của developer tới GraphQL trong vòng 1 năm qua 

Ở đây tôi có 1 thống kê về số lượt tải xuống của GraphQL trong vòng 1 năm qua :

![](https://images.viblo.asia/66ee9c8d-7f2d-4dc1-9428-1ebbb0b986c6.png)


Nhìn qua thôi lượng tải xuống của nó đang tăng gấp đôi thậm trí gấp 3  lần so với các đối thủ của nó, đây là tín hiệu đág mừng khi nó lại được trào đón như vậy.


so ... còn đây là thống kê các công cụ data layer được yêu thích :

![](https://images.viblo.asia/0978be2a-937d-434e-a68e-864b8532a12d.png)

Nếu nhìn vào khảo sát, chúng ta thấy rằng GraphQL hiện là công cụ data layer được yêu thích nhất và Redux đã giảm đáng kể. GraphQL vẫn tiếp tục được ứng dụng rộng rãi.

# 2. Khái Niệm cơ bản

### Queries: sử dụng từ khóa `query`
Client yêu cầu query đưa ra các yêu cầu tương ứng, thì graphql sẽ trả về tương ứng chỉ cần định nghĩa mà không cần quan tâm nó từ resource nào cả.
Ngoài ra, nó còn có:

* Nested khi query


![](https://images.viblo.asia/545561e8-c2ae-4359-96e8-95349bb694a0.png)

* Argument: 

![](https://images.viblo.asia/299ab340-2351-4325-bfaa-3f9ef4d32add.png)


* array — association

### Mutations :

Việc query cũng giống như bạn sử dụng method GET của Rest để lấy dữ liệu. thì ở đây mutation sẽ giống như để cập nhật sự thay đổi bao gồm (CRUD) tương ứng với một số method: POST PUT DELETE với Rest

Ví dụ CRUD product:

```
mutation {
  addCategory(id: 6, name: "TangVinhDuong", products: [8,2,3]) {
    name
      products {
         name
      }
   }
 }
```


```
mutation {
  addCategory(id: 1, name: "TangVinhDuong", products: [7]) {
    name
      products {
         name
      }
   }
 }
```

```
mutation {
  deleteCatrgory(id: 2) {
     name
   }
 }
```

### Subscriptions :

Mỗi khi máy chủ cập nhật và đồng thời client đang được kết nối với máy chủ, nó sẽ lắng nghe sự kiện (realtime, kết nối thời gian thực). Khi có sự kiện cập nhật tương ứng → trả về dữ liệu cập nhật phía client tức thì

![](https://images.viblo.asia/bd2cdc4d-0b9e-478e-b7fb-6417ed980c45.png)


### Resolvers

Khi mỗi request từ client gửi lên, resolers có nhiệm vụ truy vấn query để lấy dữ liệu, hay thêm sửa xóa với mutation

* Truy cập database
* Truy cập endpoint api ngoài
* Truy cập microservice

Example: 
![](https://images.viblo.asia/ff7cde65-a1df-4534-b487-8b50c973ba9b.png)

ví dụ khác về lâys các channel đang có:

![](https://images.viblo.asia/aa539279-defe-4e0b-852b-0d25557a5d67.png)


### Schema:

Nó chỉ đơn giản là tập hợp các type của graphql, định nghĩa các endpoint(query, mutation, subcription)

![](https://images.viblo.asia/a64bd548-86f5-4568-abaf-1a843882ce97.png)


### GraphQL tốt hơn REST?

Trong thập kỷ qua, REST đã trở thành tiêu chuẩn để thiết kế API.
Nó cung cấp một số ý tưởng tuyệt vời, chẳng hạn như các máy chủ phi trạng thái và truy cập có cấu trúc đến tài nguyên.

Tuy nhiên, API REST đã cho thấy sự không linh hoạt để theo kịp các yêu cầu thay đổi nhanh chóng của clients truy cập chúng.

GraphQL được phát triển để đáp ứng nhu cầu linh hoạt và hiệu quả hơn!

Nó giải quyết nhiều thiếu sót và sự kém hiệu quả mà các developers gặp phải khi tương tác với các API REST.

Cá nhân mình thấy rằng việc Graphql sinh ra cũng không có nghĩa là Rest lỗi thời và mất đi vị thế của mình, chỉ là cho ta thêm lựa chọn để công việc và học tập thêm hoàn hảo mà thui.

### Tài liệu tham khảo
### 
https://github.com/hemanth/graphql-demo → demo

https://www.predic8.de/graphql-query-samples.htm → demo mutation

https://techblog.vn/tim-hieu-graphql-xay-dung-1-graphql-server-voi-prisma

https://techblog.vn/tim-hieu-graphql

https://kipalog.com/posts/Single-endpoint-cung-GraphQL--Backend-Go