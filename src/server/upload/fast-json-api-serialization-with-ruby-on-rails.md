Fast JSON API serialization with Ruby on Rails
Fast JSON API cung cấp tất cả các chức năng chính mà Active Model Serializer (AMS) cung cấp, cùng với  mạnh mẽ về tốc độ và hiệu suất bằng cách đáp ứng yêu cầu của chuẩn và nhanh gấp 25 lần so với AMS. 
AMS là một gem tuyệt vời và fast_jsonapi được lấy cảm hứng từ nó khi nói đến cú pháp khai báo và các tính năng. AMS bắt đầu chậm lại, tuy nhiên, khi một mô hình có một hoặc nhiều mối quan hệ. Các tài liệu phức hợp, AKA sideloading, trên những mô hình này khiến AMS chậm lại.
Tại sao phải tối ưu serialization?
Việc tuần tự API của JSON thường là một trong những phần chậm nhất của nhiều API Rails được triển khai tốt. Tại sao không cung cấp tất cả các chức năng chính mà AMS cung cấp với tốc độ cao hơn?
Features:
* Cú pháp tương tự  Active Model Serializer
* Hỗ trợ  belongs_to, has_many and has_one
* Hỗ trợ compound documents (included)
* Tối ưu serialization of compound documents
* Caching
* Instrumentation with Skylight integration (optional)
Implement:
Cú pháp khai báo của fast_jsonapi tương tự như AMS.
```
class MovieSerializer
     include FastJsonapi::ObjectSerializer
     
     attributes :name, :year
     has_many :actors
     belongs_to :owner, record_type: :user
     belongs_to :movie_type
end
```
So sánh tốc độ với Active Model Serializers
Các bài kiểm tra hiệu suất cho thấy tốc độ đạt được 25-40x so với AMS, chủ yếu là làm cho thời gian serialization không đáng kể trên các mô hình thậm chí khá phức tạp. Hiệu suất đạt được là đáng kể khi số lượng các hồ sơ tuần tự tăng lên.
![](https://images.viblo.asia/ec92a43f-8ab4-43fe-9c47-89f9fff88683.png)