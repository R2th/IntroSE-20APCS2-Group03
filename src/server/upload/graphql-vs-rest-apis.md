Như chúng ta đã biết, `REST` là cách phổ biến nhất được hầu hết các nhà phát triển sử dụng để gửi dữ liệu thông qua `HTTP`. Và sự ra đời của `GraphQL` được coi như là một công nghệ mang tính cách mạng thay thế cho các legacy `REST APIs`.

## REST 
![](https://images.viblo.asia/e0083486-6d96-4fa7-aaa1-5e504d42867f.png)

### Cái gì?
**REST** là một kiến trúc thiết kế API được sử dụng để triển khai các web services. Các RESTful web services cho phép các hệ thống truy cập và thao tác với các biểu diễn văn bản của tài nguyên web (web resource) bằng cách sử dụng một tập hợp các phương thức không trạng thái được xác định trước như `GET, POST, PUT và DELETE`.

Hơn nữa, việc thực thi server và client thường được thực hiện độc lập, code bên client có thể thay đổi mà không ảnh hưởng đến cách server hoạt động và ngược lại. Bằng cách này, chúng được hướng modular hóa và riêng biệt.

Ý tưởng cốt lõi của REST là mọi thứ đều là tài nguyên được xác định bằng URL. Ở dạng đơn giản nhất, chúng ta sẽ truy xuất tài nguyên bằng một request GET tới URL của tài nguyên và nhận lại một response JSON (hoặc thứ gì đó tương tự tùy thuộc vào API).

Ví dụ, **GET /movies/1**

```json
{
	"title": "Joker",
	"releaseDate": "August 31, 2019",
	"director": {
		"firstName": "Todd",
		"lastName": "Phillips",
		"education": "Tisch School Of The Arts",
		"nominations": "Academy Award"
	}
}
```
Đây là một ***movie endpoint***.

![](https://images.viblo.asia/d4629087-ec9d-44d7-a940-e9185db4bfaa.png)

### Ưu điểm
Một trong những ưu điểm chính của REST là REST có khả năng mở rộng. Kiến trúc tách biệt client và server cho phép các nhà phát triển mở rộng quy mô sản phẩm và ứng dụng vô thời hạn mà không gặp nhiều khó khăn.

Ngoài ra, các REST APIs có tính linh hoạt cao. Trên thực tế, vì dữ liệu không bị ràng buộc với tài nguyên hoặc phương thức, nên REST có thể xử lý các type gọi khác nhau và trả về các định dạng dữ liệu khác nhau. Điều này cho phép xây dựng các APIs đáp ứng nhu cầu cụ thể của người dùng.

### Nhược điểm

Hầu hết các ứng dụng web và thiết bị di động được phát triển ngày nay đều yêu cầu bộ dữ liệu lớn kết hợp các tài nguyên liên quan. Việc truy cập tất cả dữ liệu đó để có được mọi thứ bạn cần bằng cách sử dụng REST API phải yêu cầu nhiều "round trips" (qua lại 2 chiều).

Ví dụ, nếu bạn muốn truy xuất dữ liệu từ hai endpoint khác nhau, bạn phải gửi hai request riêng biệt đến REST API.

Một vấn đề phổ biến khác hay gặp phải với REST `over-fetching` và `under-fetching`. Điều này là do client chỉ có thể lấy dữ liệu bằng cách `hit` vào các endpoints và trả về cấu trúc dữ liệu cố định của endpoint đó. Do đó, chúng không thể có được chính xác những gì cần thiết và gặp phải tình huống fetch thừa hoặc thiếu dữ liệu.

- **Over-fetching** là khi client lấy xuống nhiều thông tin hơn những gì ứng dụng thực sự cần.
- **Under-fetching** là khi endpoint không cung cấp đủ tất cả thông tin được yêu cầu, do đó client phải thực hiện nhiều request để có được mọi thứ mà ứng dụng cần.

## GraphQL
![](https://images.viblo.asia/88efdf45-32d4-4a73-9951-a58ff83ba1cf.png)

### Cái gì?
GraphQL là một kiến trúc thiết kế API có cách tiếp cận khác, linh hoạt hơn. Sự khác biệt chính giữa GraphQL và REST là GraphQL không xử lý các tài nguyên chuyên dụng. Thay vào đó, mọi thứ được coi như một biểu đồ ngụ ý rằng nó được kết nối với nhau.

Điều này có nghĩa là chúng ta có thể sử dụng ngôn ngữ truy vấn GraphQL để điều chỉnh request match chính xác với những gì mình cần. Ngoài ra, nó cho phép kết hợp các entity khác nhau thành một truy vấn duy nhất.

Ví dụ, một truy vấn GraphQL lấy ra list movies:
```json
{
movies (id: 1) {
   title
   releaseDate
   director {
     firstName
     lastName
     education
     nominations
   }
 }
}
```

### Ưu điểm
Mỗi khi bạn sửa đổi giao diện người dùng của ứng dụng, rất có thể các yêu cầu về dữ liệu của bạn cũng sẽ thay đổi, tức là bạn sẽ cần fetch nhiều hơn hoặc ít dữ liệu hơn trước đó. GraphQL hỗ trợ việc lặp này diễn ra nhanh chóng vì nó cho phép các nhà phát triển thực hiện các thay đổi ở phía client mà không làm rối loạn server.

Ngoài ra, với GraphQL, các nhà phát triển có thể hiểu rõ hơn về dữ liệu được yêu cầu ở back-end và cách dữ liệu có sẵn đang được sử dụng vì mỗi client sẽ chỉ định chính xác những thông tin cần thiết. Bằng cách này, chúng ta có thể ngừng sử dụng các trường mà client không còn sử dụng để cải thiện hiệu suất API.

GraphQL xác định các khả năng của API bằng cách sử dụng strong type system, qua đó client biết cách nó có thể truy cập dữ liệu. Lược đồ cho phép cả phía front-end và back-end đều biết được cấu trúc của dữ liệu và do đó, có thể làm việc độc lập với nhau.

### Nhược điểm 
GraphQL sử dụng một endpoint duy nhất thay vì tuân theo đặc tả HTTP cho caching. Caching ở tầng network rất quan trọng vì nó có thể giảm lưu lượng truy cập vào server hoặc giữ cho dữ liệu được truy cập thường xuyên với client thông qua CDN.

Ngoài ra, GraphQL không phải là giải pháp tốt nhất cho các ứng dụng đơn giản vì nó làm tăng thêm độ phức tạp - với các types, queries, resolvers.

## GraphQL vs REST
Hãy xem qua một ví dụ so sánh GraphQL và REST để thấy được những điểm giống và khác nhau của cả hai kiến trúc thiết kế API này.

Giả sử bạn có một cửa hàng trực tuyến và bạn muốn giới thiệu các sản phẩm mới nhất của mình trong danh mục sản phẩm.
Bước đầu tiên cần là fetch dữ liệu về các products:

**GET /api/products**
```json
[
    {
         "title": "Table lamp",
         "desc": "Features a ceramic base and antique brass accents.",
         "price": "$178"
    },
    {
         "title": "Floor lamp",
         "desc": "Geometric floor lamp with ivory linen shade.",
         "price": "$299"
    }
]
```

Bây giờ, ở phần sau chúng ta cần hiển thị các tùy chọn giao hàng của sản phẩm và thời gian giao hàng dự kiến trong danh mục sản phẩm. Có ba giải pháp khả thi những mỗi giải pháp đều có vấn đề riêng cần xem xét:
### 1 - Fetch data từ một tài nguyên khác

**GET /api/products/: id**
```json
{
 "products": {
   ...,
   "delivery": {
     "shipping": "Amazon Prime",
     "expectedDays": "2"
   }
 }
}
```
***Vấn đề:*** theo cách này, chúng ta có thể gặp phải tình huống under-fetching. Để hiển thị thông tin giao hàng, bây giờ bạn phải chạy hai request server thay vì một cái duy nhất. Và nếu các request của bạn thay đổi trong tương lai, hiệu suất sẽ bị ảnh hưởng.

***GraphQL:*** chỉ chạy một truy vấn duy nhất
```json
query {
 products {
   title
   desc
   price
   delivery {
     shipping
     expectedDays
   }
 }
}
```
### 2 - Sửa đổi tài nguyên hiện có để trả về các sản phẩm
**GET /api/products**
```json
[
    {
         ...,
         "delivery": {
           "shipping": "Amazon Prime",
           "expectedDays": "2"
         }
    },
    {
         ...,
         "delivery": {
           "shipping": "Amazon FBA",
           "expectedDays": "6"
         }
    }
]
```
***Vấn đề:*** đây dường như có vẻ là một giải pháp khá gọn. Tuy nhiên, nếu bạn đang hiển thị danh sách sản phẩm ở nơi khác trên store - chẳng hạn như trong các widgets - và dĩ nhiên bạn đang bị over-fetching.

***GraphQL:*** client có thể chỉ fetch dữ liệu cần thiết, không quan tâm cái khác. Do vậy, sẽ ngăn chặn việc bị over data.
```json
query {
 products {
   title
   desc
   price
 }
}
```

### 3 - Tạo tài nguyên mới trả về thông tin chi tiết sản phẩm ban đầu cùng với mã sản phẩm
**GET /api/productsWithDeliveryDetails**
```json
[
     {
           ...,
           "delivery": {
             "shipping": "Amazon Prime",
             "expectedDays": "2"
           }
     },
     {
           ...,
           "delivery": {
             "shipping": "Amazon FBA",
             "expectedDays": "6"
           }
     }
]
```
***Vấn đề:*** Vấn đề chính với cách tiếp cận này là bạn phải xác định một endpoint mới cho mỗi view bạn cần hiển thị trên front-end. Điều này làm chậm quá trình phát triển giao diện người dùng và gây khó khăn cho việc cập nhật UI.

***GraphQL:*** Với GraphQL, client chỉ cần fetch chính xác những gì cần, do đó việc go back và thực hiện cập nhật UI sẽ không thành vấn đề. Tất cả những gì phải làm là thêm một trường mới vào truy vấn.
```json
query {
 products {
   title
   desc
   price
   delivery {
     shipping
     expectedDays
   }
 }
}
```

### Điểm giống 
- Cả GraphQL và REST đều dựa trên khái niệm tài nguyên và có thể chỉ định ID cho tài nguyên.
- Fetch data qua request HTTP.
- Trả về dữ liệu JSON trong response

### Khác nhau

- REST có thể gây ra vấn đề over hoặc under-fetching, còn GraphQl thì không.
- Endpoint gọi trong REST là định danh (identity) của object, trong khi đó, ID của object không liên quan gì đến cách bạn truy xuất nó trong GraphQL. 
Nói cách khác, trong REST bạn xác định đối tượng trên back-end còn trên GraphQL bạn "định nghĩa" đối tượng này trên front-end.
- Với REST, server xác định hình dạng và kích thước của tài nguyên trong khi GraphQL, server chỉ cần khai báo các tài nguyên có sẵn và client có thể yêu cầu chính xác những gì nó cần.
- REST tự động caching trong khi GraphQL không có hệ thống caching tự động.
- Xử lý lỗi trong REST đơn giản hơn nhiều so với GraphQL.

GraphQL và REST chỉ đơn giản là hai cách để gửi dữ liệu thông qua HTTP. Mặc dù GraphQL có nhiều lợi thế hơn REST nhưng không phải lúc nào nó cũng là cách triển khai tốt nhất.

[GraphQL vs REST](https://back4app.medium.com/graphql-vs-rest-62a3d6c2021d)