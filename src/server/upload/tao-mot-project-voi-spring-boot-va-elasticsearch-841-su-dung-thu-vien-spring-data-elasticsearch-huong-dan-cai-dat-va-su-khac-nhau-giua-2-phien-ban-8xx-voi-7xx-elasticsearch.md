Trong bài viết này, tôi sẽ hướng dẫn các bạn 2 phần:

+ Cấu hình Elasticsearch

+ Tạo project với spring boot sử dụng thư viện spring data elasticsearch

Công cụ và thư viện được sử dụng trong bài viết:

+ Spring tool suite 4
+ Spring boot 2.7.3
+ Spring data elasticsearch 4.4.2
+ Maven 3
+ Java 8
+ Elasticsearh 8.4.1
+ Elasticsearch 7.17.6
+ Postman
+ Elasticsearch head extension

## 1. Cài đặt Elasticsearch:

Đầu tiên các bạn truy cập đường dẫn bên dưới để tải về Elasticsearch mới nhất:

Link: https://www.elastic.co/downloads/elasticsearch

Nếu muốn tải về Elasticsearch phiên bản thấp hơn thì truy cập link bên dưới:

Link: https://www.elastic.co/downloads/past-releases

Trong bài viết này tôi tải về Elasticsearch zip file. Sau khi tải về tiến hành giải nén ta được thư mục như hình:

![image.png](https://images.viblo.asia/2dba9138-21ab-4bee-8863-3f3f1c795e03.png)

Cấu trúc thư mục:

![image.png](https://images.viblo.asia/3f85d657-3615-4ea1-b024-4522158bb0d3.png)

Vào folder "config" và mở file "elasticsearch.yml":

![image.png](https://images.viblo.asia/7504ed0e-230e-4ce5-9bca-4b269cab88ce.png)

Nội dung config file:

![image.png](https://images.viblo.asia/b081358c-6560-41cf-ba7b-36d2681dda8c.png)

Thực sự không cần chỉnh sửa giá trị nào trong config file nhưng có 2 giá trị chúng ta cần quan tâm

+ cluster.name -> thiếp lập tên cho cluster. Tại đây tôi sẽ delete ký tự "#" và sửa tên thành "employee-cluster"

+ path.data -> thiếp lập đường dẫn lưu data. Tại đây tôi sẽ thiết lập lại đường dẫn thành "G:/elasticsearch-8.4.1/data"

![image.png](https://images.viblo.asia/a5cdf96e-967e-4116-ba36-6fca85614352.png)

Mặc định trong thư mục Elasticsearch vừa giải nén sẽ không có folder "data" nên tôi sẽ tự tạo 1 folder name là "data":

![image.png](https://images.viblo.asia/e63a76c7-06b5-474b-87c1-15c7ff22f2b3.png)

Tiếp theo để khởi động elasticsearch, tôi mở folder name là "bin" và run script file "elasticsearch.bat":

![image.png](https://images.viblo.asia/dbc49afb-7bc8-45ea-99fa-ae37de9a7603.png)

![image.png](https://images.viblo.asia/0e6ab772-4e5d-4615-9b58-5a8c60c76775.png)

Sau khi khởi chạy thành công, truy cập đường dẫn "localhost:9200" để kiểm tra xem trạng thái Elasticsearch:

![image.png](https://images.viblo.asia/4de5ff20-03e3-4fd7-992b-975db133c2a0.png)

Như các bạn thấy, elasticsearch vẫn chưa hoạt động, check màn hình cmd thấy một vài lỗi về kết nối:

![image.png](https://images.viblo.asia/c99cae32-7b4a-458f-9906-05070d1bc235.png)

Lỗi này xảy ra trên phiên bản Elasticsearch 8 và để xử lý lỗi này, tôi sẽ mở file "elasticsearch.yml" trong folder "config" để sửa một vài thông tin:

![image.png](https://images.viblo.asia/71d5a116-6a48-4043-870d-0784387ae5b4.png)

Có 4 giá trị cần phải thay đổi, mặc định là "true" nên tôi sẽ chuyển thành "false":

+ xpack.security.enabled: true -> xpack.security.enabled: false

+ xpack.security.enrollment.enabled: true -> xpack.security.enrollment.enabled: false

+ xpack.security.http.ssl:
        enabled: true
=> xpack.security.http.ssl:
          enabled: false
          
+ xpack.security.transport.ssl:
        enabled: true       => xpack.security.transport.ssl: enabled: false
          
![image.png](https://images.viblo.asia/f7c62485-36c5-4f2c-908d-4c09387fe667.png)

Sau khi cập nhật lại 4 giá trị, vào folder "../bin" và khởi chạy script file "elasticsearch.bat":

Sau khi khởi chạy thành công, tiếp tục thử lại truy cập đường dẫn "localhost:9200":

![image.png](https://images.viblo.asia/d4c847b8-a05d-44cf-9bf6-59260d4da871.png)

Ta thấy elasticsearch đã khởi chạy thành công

Tiếp theo tôi giới thiệu các bạn 1 extension trên chrome hỗ trợ việc kiểm tra data trên elasticsearch gọi là "elasticsearch head":

Link: https://chrome.google.com/webstore/detail/multi-elasticsearch-head/cpmmilfkofbeimbmgiclohpodggeheim

Sau khi cài đặt extension ở trên thành công, click icon extension:

![image.png](https://images.viblo.asia/1e7d1d44-c611-4059-a3b8-c5bc3f982333.png)

Chọn "Multi Elasticsearch Head" và đây là giao diện:

![image.png](https://images.viblo.asia/f31b597e-83a7-43ac-af05-36f65d67d6f7.png)

Các bạn click chọn tab "Structured Query" sẽ thấy hiện chưa có bất kỳ document nào:

![image.png](https://images.viblo.asia/e66fe2d8-1f1c-47ef-ab47-5affa67262d1.png)

Vậy là cơ bản đã xong phần cài đặt và cấu hình Elasticsearch. Tiếp theo tôi sẽ tạo một project với Spring boot và Spring data elasticsearch.

## 2. Cấu trúc thư mục:


![image.png](https://images.viblo.asia/de3dabc3-b459-4cdb-922a-4389a2c807e3.png)


## 3. Nội dung file pom:

![image.png](https://images.viblo.asia/f6ca5fac-42f5-4092-9ed4-d33fb8994520.png)


## 4. Tạo class "Employee" trong package "com.example.elasticsearch.model":

![image.png](https://images.viblo.asia/059a5a85-cbc6-420a-8e3b-d7febeb393b5.png)

Trong class "Employee" có 2 annotation, tôi sẽ phân tích từng cái:

+ @Document: Nếu các bạn đã từng làm việc với Hibernate thì sẽ biết "@Table" -> "@Document" cũng tương tự như "@Table", nó sẽ thực hiện ánh xạ class "Employee" này với index name là "employee"

+ @Id: Annotation dùng để đánh dấu cho biết giá trị biến "id" này là khoá chính

Và có 1 lưu ý, với phiên bản Elasticsearch 8.x.x thì đã bỏ thuộc tính "type". Các bạn có thể tham khảo thông tin này trang chủ elastic:

![image.png](https://images.viblo.asia/60ce5129-e11b-4541-89aa-e46e39a8add8.png)

Link: https://www.elastic.co/guide/en/elasticsearch/reference/current/removal-of-types.html

Tiếp tục, khi tạo xong class "Employee", tôi tiến hành start project và lên giao diện "Elasticsearch head" để kiểm tra xem "document" đã được tạo chưa:

![image.png](https://images.viblo.asia/4c35139d-8e97-4928-abcf-58dcf06605db.png)

Click vào icon được khoanh đỏ để reset lại trạng thái:

![image.png](https://images.viblo.asia/360360c7-9fb5-44a9-8fa1-6f3f60810831.png)

Sau khi reset thành công sẽ thấy từ "Green" chuyển thành "Yellow" và đã có "document" với index name là "employee"

Tôi click chọn tab "Structured Query" thấy "document" với index name là "employee" được tạo nhưng hiện tại chưa có data nào:

![image.png](https://images.viblo.asia/78f84b8a-9bef-44a3-84df-467c78038c17.png)


## 5. Tạo 1 interface "EmployeeRepository" trong package "com.example.elasticsearch.repository":

![image.png](https://images.viblo.asia/4c2d5cc7-808b-406f-a390-8203e428b181.png)

Trong interface "EmployeeRepository" tôi cho kế thừa "ElasticsearchRepository" và khai báo 1 method "findByName", thực sự mặc định "ElasticsearchRepository" đã hỗ trợ 1 số method như "findAll()"; "findById()";"findByName()";...

Cần khai báo package chứa những repository trong class khởi động "ElasticSearchApplication", dùng annotation "@EnableElasticsearchRepositories":

![image.png](https://images.viblo.asia/c5685589-d5f8-452e-8a16-33c4166dc631.png)

## 6. Tạo 1 class "EmployeeController" trong package "com.example.elasticsearch.controller":


![image.png](https://images.viblo.asia/7bb3fed1-437e-4781-95e5-ba39c3940510.png)

Trong class controller tôi cần sử dụng những method "findAll()"; "findById()";"findByName()" được hỗ trợ bởi "ElasticsearchRepository", vì vậy tôi sẽ dùng annotation "@AutoWired" để khai báo "EmployeeRepository"

Tôi tiến hành test với Postman:

+ Call api tạo mới employee với data body là 1 list:

        [
        {
            "id":"11",
            "name":"A",
            "title":"SE",
            "age": 31
        },
        {
            "id":"12",
            "name":"C",
            "title":"BA",
            "age": 22
        }]

![image.png](https://images.viblo.asia/3d34b07c-fc4f-4d1c-b54a-e88d35e1e01e.png)

Kết quả test:

![image.png](https://images.viblo.asia/562c1342-c765-403d-a5de-fbece38ef084.png)

Kiểm tra lỗi:

![image.png](https://images.viblo.asia/a303bcb4-08e2-46c7-9c46-40c121f3ac69.png)

![image.png](https://images.viblo.asia/79687dab-8e79-4a57-85ab-655764dea49c.png)

Đầu tiên, tôi sẽ lên Elasticsearch head và kiểm tra xem dữ liệu đã được thêm mới thành công hay chưa:

![image.png](https://images.viblo.asia/28a53d65-aab6-4001-ac38-9eb5af799721.png)

Các bạn có thể thấy index name "employee" hiện đang có 2 docs -> dữ liệu đã được thêm thành công và tại mục "Results:" đang để mặc định là "Table" tôi sẽ chọn lại thành "JSON" và click "Search" để thấy tất cả dữ liệu đang có:

![image.png](https://images.viblo.asia/2540ee17-d3eb-4e8b-bf52-cdaa462be873.png)

Kết quả cho thấy dữ liệu được tạo thành công, vậy tại sao lại báo lỗi? thực sự lỗi này gặp ở phiên bản Elasticsearch 8.x.x bởi vì tôi có nói ở đầu bài viết là với phiên bản Elasticsearch 8.x.x thì thuộc tính "type" đã bị xoá và chỉ có những phiên bản cũ hơn mới có thuộc tính "type"

Đây là nguyên nhân văng ra lỗi, các bạn thấy lỗi tôi khoanh đỏ ở trên tại class "DocWriteResponse", trong class này tại constructor khi gán giá trị cho thuộc tính "type" nó yêu cầu thuộc tính "type" không được null:

![image.png](https://images.viblo.asia/d352e84b-0edb-4009-82d5-e4cf2057427f.png)

Và vì thế khi thấy "type" null -> văng lỗi

Thực sự dữ liệu đã được thêm thành công nhưng làm thế nào để không văng lỗi, tôi có 2 giải pháp:

+ Giải pháp thứ 1(khuyên dùng): Tại về phiên bản elasticsearch 7.x.x trở về trước -> sẽ không có lỗi xảy ra

+ Giải pháp thứ 2: Bọc "try{}catch()". 

Tôi sẽ thử cả 2 giải pháp ở trên:

+ Giải pháp thứ 2:

![image.png](https://images.viblo.asia/22a1aafa-4398-4671-b8d5-8d7d891d0180.png)

Kết quả khi call api tạo mới employee:

![image.png](https://images.viblo.asia/a19b0682-fe32-4385-8b98-9ffe00b2b109.png)

Kết quả khi call api delete employee by id:

![image.png](https://images.viblo.asia/73fcc7a0-b274-40c5-94c0-8a66eee177ee.png)

![image.png](https://images.viblo.asia/3e52f9db-1777-4011-8728-6b3a70510e7c.png)

Kết quả khi call api cập nhật thông tin employee by id:

![image.png](https://images.viblo.asia/952472ee-12c8-4cd4-b0ef-5df677750be1.png)

![image.png](https://images.viblo.asia/e5d1ae9f-4b6f-4e71-9b8b-3c20d7225f8d.png)

Kết quả khi trích xuất thông tin employee by id:

![image.png](https://images.viblo.asia/76f78cef-5698-4a7c-9092-d1d6f0db9012.png)



=> Dữ liệu được xử lý thành công nhưng giải pháp này không hiệu quả bởi vì có thể sẽ bị bỏ qua những lỗi khác và nếu bạn muốn khoanh vùng những lỗi nào cho qua hoặc không thì cần phải lấy ra tên lỗi và loại trừ ra. Có thể dùng "{exeption}.getClass().getSimpleName()" để lấy ra tên lỗi

Tôi sẽ dùng giải pháp thứ 1, dùng phiên bản Elasticsearch cũ hơn, ở đây tôi dùng phiên bản 7.17.6(phiên bản cuối cùng của 7.x.x). Cấu hình cũng tương tự như tôi đã giải thích ở đầu bài viết

Kiểm tra thông tin phiên bản:

![image.png](https://images.viblo.asia/9de01201-e769-4a11-a4bf-f619791ae653.png)

Kiểm tra Elasticsearch head:

![image.png](https://images.viblo.asia/10c26613-4a1f-4317-af47-9d7d70159b8c.png)

Chưa có document nào

Start project:

Kiểm tra lại Elasticsearch head:

![image.png](https://images.viblo.asia/c7d4f0b9-d441-4dce-b011-c71f90d02dcc.png)

![image.png](https://images.viblo.asia/3511f547-7771-46dd-95d7-0804dc3091e9.png)

Chưa có bất kỳ data nào

Cập nhật lại "EmployeeControler", bỏ "try{}catch()":

![image.png](https://images.viblo.asia/bfebd794-c1ff-4d88-a981-86d9ce51d7a9.png)

Tiến hành test:

Kết quả khi call api tạo mới employee:

![image.png](https://images.viblo.asia/e36dbadc-d149-4e99-b14c-e0b411e25c2d.png)

![image.png](https://images.viblo.asia/0991d49f-a5a4-443d-aa7e-beda5ea38643.png)

Kết quả khi call api delete employee by id:

![image.png](https://images.viblo.asia/b26c2502-ee85-407c-865d-6167577ba187.png)

![image.png](https://images.viblo.asia/86192acc-008f-49b7-a7a6-47bdb8fce380.png)

Kết quả khi call api cập nhật thông tin employee by id:

![image.png](https://images.viblo.asia/76592aff-22bd-479b-be4c-5c7935084413.png)

![image.png](https://images.viblo.asia/6e58701f-578a-4005-ba5c-bb59afa33cdf.png)

Kết quả khi trích xuất thông tin employee by id:

![image.png](https://images.viblo.asia/530bc667-7ea7-411a-a707-bc3e4851c5d1.png)

=> Các bạn thấy với phiên bản Elasticsearch 7.x.x vẫn có thuộc tính "type" và quá trình call api không có bất kỳ lỗi nào xảy ra

Bài viết khá dài nên tôi sẽ dừng tại đây và trong bài viết sau tôi sẽ tạo 1 project Spring boot với thymeleaf và spring data elasticsearch.