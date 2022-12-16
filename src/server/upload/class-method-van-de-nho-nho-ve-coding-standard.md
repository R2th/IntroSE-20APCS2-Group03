Lần đầu định nghĩa class method theo Rails tutorial, chắc hẳn có nhiều bạn đã viết `def self.method_name` rồi hí hứng push code lên cho trainer review để ăn ngay comment: 
> viết thành `class << self` đi em. Chưa đọc coding standard của Framgia hả? 
> 
Ok viết thì viết, viết nhiều thành quen, cứ class method là lại `class << self`. Ơ nhưng mà tại sao lại phải viết thế nhỉ? Vì là coding convention của công ty? Vì trainer bảo thế? Đã có rất nhiều bài viết giải thích về class method trên viblo rồi nên lần này mình xin phép được viết về vấn đề nhỏ hơn là lý do tại sao chúng ta lại sử dụng `class << self` (không phải do coding standard của công ty bảo thế nhé).
## Style và Style Guides
Rõ ràng trong [Ruby Style Guide](https://github.com/rubocop-hq/ruby-style-guide) viết là nên sử dụng cú pháp `def self.method` khi định nghĩa class method mà. Đây nè:
![](https://images.viblo.asia/637e40d8-870d-4ef6-8f60-1d6f9fe253b6.png)
Style Guide này phê bình tính đơn giản của `def className.method` và nói rằng sử dụng `def self.method` giúp dễ refractor code hơn do nó không lặp lại tên class nhiều lần, nhưng đồng thời cũng ủng hộ thứ cú pháp bí truyền `class << self` khi phải định nghĩa đồng thời nhiều class method. Thêm nữa [Sandi Metz](https://www.sandimetz.com/99bottles/) còn tuyên bố rằng:
> Các lựa chọn về phong cách code thường rất tùy tiện, thậm chí là bắt nguồn từ sở thích cá nhân. Chọn ra một phong cách code chuẩn có nghĩa là bạn đã xây dựng được một nền tảng thống nhất trong một lĩnh vực gây nhiều tranh cãi. Phong cách không quan trọng, quan trọng là sự đơn điệu của phong cách!
> 

Đây là một quan điểm rất có lý. Nhưng ngoài sở thích cá nhân ra thì việc chọn một style hợp lý để mọi người cùng code cũng rất quan trọng. Code cũng như thời trang vậy, chúng đều phản ánh quan điểm, giá trị và niềm tin của người viết code. Để đưa ra lựa chọn về phong cách đúng đắn nhất, bạn cần phải hiểu code. Lập trình viên RoR ai cũng phải viết class method, nhưng liệu có phải tất cả ai cũng hiểu về class method?

## Singleton class

Khái niệm kinh điển trong Ruby: **Singleton class**. Thông thường các method trong Ruby sẽ được định nghĩa trong class còn dữ liệu sẽ thuộc về object. Đi vào ví dụ nhé:

```ruby
an_array = [1, 5, 10]
```
Nếu thử gọi `an_array.average`, chúng ta sẽ dính `NoMethodError` vì class `Array` hay class cha của nó đều không có định nghĩa của method này.
![](https://images.viblo.asia/24037168-c3e7-41ae-b98c-d7e6f440a1f3.png)

Thử monkey-patch method `average` cho class `Array` xem sao (viblo có một bài khá ngắn đọc chắc mất 2' về monkey-patching ở [đây](https://viblo.asia/p/code-tom-1-lam-dung-monkey-patching-WAyK8Mw6ZxX)). Nhưng nếu chúng ta chỉ cần method đó cho mỗi object `an_array` thì có thể làm như sau
```ruby
def an_array.average
  reduce(:+) / count.to_f
end
```
![](https://images.viblo.asia/cf1a3cd7-08e7-4cf1-9ce6-e873062096f8.png)

Tèn ten. Giờ thử chạy method này trên một array khác nhé:
![](https://images.viblo.asia/029071ed-a03d-4297-9b55-7a27a7399bcf.png)

Lại `NoMethodError`. Lý do là Ruby chứa method `average` trong một class đặc biệt mà chỉ có `an_array` mới biết - **class singleton** của nó (tên mỹ miều hơn là **Eigen class**). Mọi instance của mọi class trong Ruby đều có singleton class của riêng chúng để chứa các singleton method như ví dụ trên. **Khi chúng ta gọi một method cho một object, class singleton sẽ là nơi đầu tiên Ruby tìm method đó trước khi tìm kiếm tiếp trong class khởi tạo object và các class khác trong ancestor chain.**

## Class method là Singleton method
Vì trong Ruby **class cũng là object** (câu này nghe quen chưa), class method về bản chất cũng là các method được định nghĩa cho các instance của class `Class`. Không tin hả?
```ruby
class Example
  def self.a_class_method; end
  def an_instance_method; end
end
```
![](https://images.viblo.asia/9a069036-48d7-4bb3-9ee5-a2548d83bc96.png)
Gọi `instance_methods` với tham số `false` sẽ loại bỏ các method class được kế thừa khỏi danh sách các methods của class. 
## Class << self hay self.method?
Tuyệt vời, giờ thì đã hiểu class methods trong Ruby là gì rồi nhé (chưa hiểu thì đọc thêm trên viblo). 

Vấn đề là chốt lại giờ khai báo class method theo kiểu gì? `class << self` hay `self.method`? Chốt lại là `class << self` do coding standard nhé. Lý do nè:

- **Các method nên được định nghĩa trong class nó thuộc về**. Sử dụng `class << self` thể hiện ý tưởng này rõ ràng hơn. Chúng ta đã định nghĩa method trong một scope singleton class của nó. Khi sử dụng `def self.method`, chúng ta định nghĩa một method có thể truy xuất ở nhiều scope khác nhau: xuất hiện ở một scope class thông thường, nhưng cơ chế của Ruby lại cho phép định nghĩa method này trên các instances cụ thể khác ở bất cứ đâu, `self` trong một khai báo class chính là instance của `Class` mà ta đang làm việc (bản thân class đó). Do vậy sử dụng `def self.method` giống như việc nhảy qua lại giữa các scope vậy. Nghe cứ sai sai.  

- Một vấn đề với `def self.method` nữa là **khả năng khai báo các method private và protected**. Ruby có hỗ trợ method `private_class_method` để định nghĩa một class method có quyền kiểm soát truy cập là private. Tuy vậy lại không có method tương tự cho protected. Hơn nữa với các class method private chúng ta sẽ phải định nghĩa mỗi method riêng biệt do không thể chỉ sử dụng mỗi keyword `private` trong class được, vì như vậy sẽ khiến các instance method của class biến thành private method luôn. 

Tóm lại là dùng `class << self` đi.

## Vẫn thích self.method hơn?

Nhưng mà như Sandi Metz đã nói thì style còn liên quan tới một vài vấn đề hay tình cảm cá nhân nữa. Cá nhân tui vẫn thích `self.method` hơn thì cãi nhau với người review code kiểu gì?


- "*Tìm các class methods trong một class lớn khó hơn*": Nếu không may trong đống code của dự án có một class bố đời (google god class đi) dài hơn 450 dòng code, chắc chắn bạn nên refractor lại và chia nhỏ thành các class con và sử dụng `def self.method`. Nếu phải cuộn chuột liên miên trong một file code thì việc bỏ qua chỗ mà scope trong code đã thay đổi là hoàn toàn có thể xảy ra.
- "*Viết thế khó hiểu hơn"* - cái này nghe hơi cảm tính. Như các ví dụ ở trên thì khi bạn đã hiểu ý nghĩa của class method, việc sử dụng `def self.method` thực ra lại rất mơ hồ do sự lẫn lộn các scope của nó gây nên. 
- "*Ai quan tâm chứ? Style guide bảo thế cứ thế thế mà làm"* - với lý do như này thì chịu rồi. Làm ở đâu thì theo coding standard ở đó.

Thực ra việc sử dụng `def self.method` không phải vấn đề kinh khủng nếu bạn có nhiều vấn đề khác phải lo hơn trong code, `def self.method` cũng không phải code thối nhé. Nhưng mà dù sao sử dụng `class << self` cũng tốt hơn một teo, nó sẽ giúp bạn hiểu về Ruby cũng như hướng đối tượng trong Ruby tốt hơn. 

## Tham khảo
> https://medium.com/rubyinside/class-methods-in-ruby-a-thorough-review-and-why-i-define-them-using-class-self-af677ede9596