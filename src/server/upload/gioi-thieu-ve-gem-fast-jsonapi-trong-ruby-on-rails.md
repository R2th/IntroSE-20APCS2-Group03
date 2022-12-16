## Giới thiệu
Đây là bài viết cơ bản giới thiệu sơ qua về gem fast_jsonapi
JSONAPI là một gem được phát hành và cung cấp tất cả các chức năng chính của Active Model Serializer (AMS), và vượt trội hơn AMS về tốc độ và hiệu suất đến 25 lần.
fast_jsonapi được xây dựng dựa trên ý tưởng của AMS, nó được kế thừa các cú pháp khai báo và các tính năng của AMS và được ra đời nhằm khắc phục một nhược ddierm của AMS đó là chậm, khi AMS làm việc với nhiều liên kết các bảng, hay AKA sideloading. Và khi người dùng trải nghiệm trình load more scroll thì tình trạng load chậm sẽ ảnh hưởng rất nhiều đến trải nghiệm của  người dùng.
## Tại sao lại sinh ra Fast JSONAPI?
JSON API là một trong những phần có thể coi là chậm nhất trong hệ thống Rails APIs. Vậy tại sao chúng ta không cung cấp tất cả những chức năng của AMS nhưng với tốt độ cao hơn?
Các đặc điểm thuận lợi của nó
- Cung cấp toàn bộ các cú pháp tương tự Active Model Serializer
- Hỗ trợ cho các thuộc tính relationship như belongs_to, has_many và has_one
- Hỗ trợ cho các compound document
- Tối ưu cho compound document
- Caching
- Hỗ trợ đo đạc
## Làm sao để viết ứng dụng cho Fast JSONAPI?
fast_jsonapi sử dụng các cú pháp quen thuộc như của Active Model Serializers.
```rb
class MovieSerializer
 include FastJsonapi::ObjectSerializer
 attributes :name, :year
 has_many :actors
 belongs_to :owner, record_type: :user
 belongs_to :movie_type
end
```
## Hãy so sánh tốc độ được cái thiện của Fast JSONAPI và Active Model Serializers?

Dưới đây là biểu đồ cho thấy sự cải thiện tốc độ của fast_jsonapi so với AMS từ 30 đến 40 lần, đối với dữ liệu ít thì thời gian cải thiện sẽ khó nhìn thấy, nhưng khi số lượng record tăng lên, chúng ta sẽ dễ dàng nhận ra sự khác biệt của nó
![](https://images.viblo.asia/5ab72f1a-2936-4bf9-be18-4095e76ccb42.png)
![](https://images.viblo.asia/306fb4db-5bd0-40eb-a7a4-f79724189dac.png)

Các bạn có thể tự test để tự trải nghiệm nó, xin hãy tham khảo theo link này [readme

## Kết luận:
Qua một vài giới thiệu nho nhỏ trên đây đã đủ để chúng ta động lòng và thử trải nghiệm nó và tôi tin chắc rằng đây là một gem tuyệt vời
Hiện tại về các ví dụ cụ thể hầu như chúng ta có thể tự build được nên mình sẽ không thêm vào trong bài viết này. 
Nếu có bạn nào có suggest hay thảo luận gì xin hãy bổ sung giúp mình comment ở phía dưới, mình sẽ cập nhật thêm vào để bài viết tốt hơn.
Xin cám ơn các bạn

Tài liệu được dịch từ:
https://medium.com/netflix-techblog/fast-json-api-serialization-with-ruby-on-rails-7c06578ad17f