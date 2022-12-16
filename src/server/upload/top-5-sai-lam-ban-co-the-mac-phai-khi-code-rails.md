![](https://images.viblo.asia/b97ce263-54ae-4f45-9980-c10b5b1d9b96.jpg)

Chào các bạn, chào các bạn!

Chuyện là một đứa newbie ruby developer kinh nghệm non nớt lên nói về những sai lầm khi code thì có vẻ không thuyết phục lắm nhỉ? 

Đừng vội đóng tab nha. :wink: Những vấn đề mình sắp viết ở đây là những điều mà mình nhận thấy, tích tụ qua thời gian làm dự án cộng với những lời khuyên mình nhận được của leader tốt bụng. Và quan trọng hơn hết là những bạn newbie giống mình có thể tìm hiểu và tránh những sai lầm này.


## 1. Không viết unit test

![](https://images.viblo.asia/6f57bc50-72a8-4ba6-8fff-2059ebe7a4d2.jpg)

Đến hiện tại, khi các dự án hướng đến việc viết test với coverage > 90% đối với các logic viết ra là một tin vui so với trước đây khi việc thiếu unit test là vấn đề phổ biến nhất với các dự án Rails.

Trước đây, khi làm một dự án mới, mình phải viết tất cả code, deadline thì ngắn. Việc đầu tiên nghĩ đến là cong chân lên để code, code, code sao cho chức năng chạy được, mà chẳng nghĩ đến việc viết test. Vì mình không bao giờ cảm thấy cần phải "lãng phí thời gian" để viết unit test cho code của mình. Vì có tester rồi mà. lo gì, có bug thì tester log :v. Đấy một thời mình cũng có cái suy nghĩ đó. :joy::joy:

Rối đến một ngày, dự án mở rộng thêm những tính năng mới, thêm người mới và có những logic cần sửa với các tính năng cũ. Mình vẫn miệt mài code, sửa và chẳng biết nó ảnh hưởng đến chỗ nào hay không. Chức năng chạy ngon là được mà và rồi đống rác ngày một lớn đến mức việc kiểm tra lại cực kỳ khó khăn. Và lúc đó KH request bắt buộc unit test phải > 85%. Vì số lượng code cần phải viết test khá lớn nên khá vất vả cho những ngày đầu. :hankey:

Và khi sang dự án mới, team có một rule là phải viết unit test hết, dù thời gian cũng không có nhiều. Nhưng điều này là bắt buộc, vì không viết test thì không được review, không được review thì không được mợt pull, không được mợt pull thì không hoàn thành xong công việc, không hoàn thành xong công việc bị đánh giá thấp, bạn biết điều gì sẽ xảy đến tiếp theo rồi đấy. =))

Việc viết test nó có thể làm cho dự án khó khăn lúc ban đầu nhưng sẽ là bước đi tuyệt vời về sau, khi mà thêm các chức năng khác, hay thay đổi spec. Người vào sau cũng dễ dàng hơn, vì sẽ biết được phần mình làm ảnh hưởng thế nào đến những chức năng khác. Vì vậy việc viết unit test là cực kỳ cần thiết.

Đối với Rails app, bạn có thể đọc thêm về gem [RSpec](https://github.com/rspec/rspec-rails) và một số gem liên quan khác như: [Faker](https://github.com/faker-ruby/faker), [FactoryBot](https://github.com/thoughtbot/factory_bot), ...

## 2. Controller béo
![](https://images.viblo.asia/47139c41-2db6-46c9-94c5-076a8746fd89.jpg)

"Fat Controllers" là một lỗi cực kỳ phổ biến đối với developer mới như mình của hơn một năm về trước khi vừa làm quen với Rails. Một điều tự nhiên là mình muốn viết tất cả các logic trong một nơi để dễ làm, dễ đọc và đỡ loằng con bà nhoằng nhiều files. Với app nhỏ thì làm vậy chẳng ai comment, nhưng khi logic xử lý phức tạp > 20 dòng hoặc nhiều hơn thì đó là vấn đề rồi và mình được comment là "tách ra đi em, đừng viết mọi thứ vào chung như thế". 

Huhu, làm thế nào bây giờ. :cold_sweat:

## 3. Model mập
![](https://images.viblo.asia/b0267069-9740-40b6-976d-b38ca9a7873c.jpeg)

Có thể giải pháp để giải quyết cho vấn đề "Fat Controller" là viết trong model. Bạn có nhớ câu comment mình vừa viết ở trên khi ném tất cả logic xử lý trong controller không? Mình đã từng nghĩ, không viết trong controller thì viết trong model chắc ổn. Khi mình chuyển tất cả logic vào các mô hình model, controller thì có vẻ ổn áp, nhưng model ngày một béo lên. Đúng như mô hình mình đã từng nghe "Skinny Controller, Fat Model".

Và rồi lại bị comment: "Sao em lại viết trong model thế này? -.- Tìm hiểu services và dùng đi em". Service là gì nhỉ? Rồi mình tìm đọc thì thấy nó là một object khá hay ho, mình có thể cho tất cả các logic của app vào trong đó. Các class này không kế thừa từ ActiveRecord và viết trong thư mục riêng biệt. `app/services`. Nó cho phép mình giữ cho model của mình thon gọn hơn, dễ đọc và quản lý hơn.

Bạn có thể đọc ở đây:  https://blog.appsignal.com/2020/06/17/using-service-objects-in-ruby-on-rails.html

## 4. File README mọc rêu.
![](https://images.viblo.asia/662d6325-eefd-4c72-9d60-e575e85e0d13.jpeg)

Khi dự án ngày càng phát triển và thêm các dependencies hay config, có thể chúng ta sẽ quên cập nhật vào file README, và khi thêm người mới vào, cần cài cắm, setup các thứ sẽ khiến mất thời gian hơn.  Trong README của mình thường bao gồm các thông tin như:

```
I. Source code structure
1. Component
2. Source code tree
II. Install environment
Lệnh chạy thường xuyên, như các lệnh test, rubocop...
III. Development
IV. Cách sử dụng cơ bản
V. Distribution
VI. Settings khác hoặc thông tin cần thiết:
```

Cách tốt nhất, tất cả thông tin này nên được cập nhật khi có sự thay đổi liên quan đến những thứ ở trên, nhưng điều này đôi khi có thể bị quên. 

Có một cách để biết được file README này có chính xác không là bất cứ khi nào một người mới vào dự án, chúng ta có thể yêu cầu họ cố gắng setup dự án chỉ sử dụng file README mà không tương tác với các member khác. Nếu có gặp bất kỳ sự cố nào hoặc cần đặt câu hỏi cho team, mình ngay lập tức cập nhật file README để họ tiếp tục cho đến khi thực hiện được. 

## 5. Không sử dụng partial.

Thông thường khi code HTML chúng ta thường thấy một file gì mà dài quá trời dài, hay những phần có thể dùng chung được mà chúng ta lại không dùng, ví dụ như header, footer thì trang nào mà chẳng có. Có một cách để giúp chia nhỏ các file này và có thể tận dụng những file dùng chung được là sử dụng partial. Trước kia mình cũng thường tạo các file view theo action của REST và viết hết html vào trong các file đó. Nhưng thấy việc tách thành các partial giúp cho chúng ta dễ hiểu hơn nhiều.

Một điều chú ý là khi sử dụng view partials là không bao giờ được truyền biến instance thẳng vào trong nó, mà sẽ gán một biến khác cho biến instance đó. 

Có một cách giúp file HTMl dễ nhìn hơn là sử dụng slim. Bạn sẽ bị nó làm cho nghiện ngay đó =))

*Trên đây là một vài bài học mình rút ra được khi code Rails. Ông đi qua bà đi lại nếu thấy hữu ích cho mình xin 1 ắp vô te nha. Many thanks* :hearteyes: