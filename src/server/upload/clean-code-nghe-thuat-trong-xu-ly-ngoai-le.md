Các ngoại lệ xuất hiện cùng lúc với lập trình. Quay trở lại thời mà lập trình được thực hiện trong phần cứng hoặc thông qua các ngôn ngữ lập trình cấp thấp, các ngoại lệ đã được sử dụng để thay đổi luồng xử lý của chương trình và để tránh các lỗi phần cứng. Ngày nay, Wikipedia định nghĩa các ngoại lệ là:
> *điều kiện bất thường hoặc cần xử lý đặc biệt - thường thay đổi luồng bình thường của việc thực hiện chương trình*
> 
Và việc xử lý chúng đòi hỏi:
> *cấu trúc ngôn ngữ lập trình chỉ định rõ ràng hoặc cơ chế phần cứng máy tính phù hợp.*
> 
<br>

Vì vậy, các ngoại lệ cần được xử lý đặc biệt và một ngoại lệ chưa được xử lý có thể gây ra hành vi không mong muốn. Kết quả thường có thể khó kiểm soát. Năm 1996, thất bại trong vụ phóng tên lửa Ariane 5 nổi tiếng được cho là do ngoại lệ tràn (overflow exception) không được xử lý. [History’s Worst Software Bugs](http://archive.wired.com/software/coolapps/news/2005/11/69355) chứa một số bug có thể được quy cho các trường hợp ngoại lệ chưa được xử lý hoặc xử lý sai.<br><br>
Theo thời gian, những lỗi này và vô số lỗi khác (có thể không nghiêm trọng, nhưng vẫn là thảm họa đối với những người liên quan) đã góp phần gây ấn tượng rằng các ngoại lệ là xấu.<br><br>
Nhưng ngoại lệ là một yếu tố cơ bản của lập trình hiện đại; nó tồn tại để làm cho phần mềm của chúng ta tốt hơn. Thay vì sợ ngoại lệ, chúng ta nên nắm lấy chúng và học cách hưởng lợi từ chúng. Trong bài viết này sẽ thảo luận về cách quản lý các ngoại lệ một cách thanh lịch và sử dụng chúng để viết mã sạch dễ bảo trì hơn.

-----
**<h6>Xử lý ngoại lệ: Nó là một điều tốt</h6>**
Với sự phát triển của lập trình hướng đối tượng (OOP), hỗ trợ ngoại lệ đã trở thành một yếu tố quan trọng của ngôn ngữ lập trình hiện đại. Một hệ thống xử lý ngoại lệ mạnh mẽ được tích hợp vào hầu hết các ngôn ngữ, ngày nay. Ví dụ: Ruby cung cấp cho mẫu điển hình sau:
```ruby
begin
  do_something_that_might_not_work!
rescue SpecificError => e
  do_some_specific_error_clean_up
  retry if some_condition_met?
ensure
  this_will_always_be_executed
end
```
Không có gì sai với đoạn code trên. Nhưng việc lạm dụng các mẫu này sẽ gây ra "code smells", và không thực sự có lợi. Đồng thời, việc lạm dụng chúng thực sự có thể gây hại rất nhiều cho code của bạn, làm cho nó dễ bị đổ vỡ hoặc làm mờ đi nguyên nhân gây ra lỗi. <br><br>
Chúng ta thường cho rằng những ngoại lệ phải được xử lý nhanh chóng và dứt khoát. Như chúng ta sẽ thấy, điều này không nhất thiết là đúng. Thay vào đó, chúng ta nên học nghệ thuật xử lý các ngoại lệ một cách duyên dáng, làm cho chúng hài hòa với phần còn lại của trong code của chúng ta.<br><br>
Sau đây là một số điểm cần lưu ý giúp bạn nắm lấy các ngoại lệ, sử dụng chúng và các khả năng của chúng để giữ cho code của bạn có thể dễ bảo trì (**maintainable**), dễ mở rộng (**extensible**) và dễ đọc (**readable**):
* **Khả năng bảo trì**: Cho phép chúng ta dễ dàng tìm và sửa các lỗi mới mà không sợ:
    *  phá vỡ chức năng hiện tại.
    *  vô tình tạo ra thêm các lỗi mới.
    *  hay phải hoàn toàn xóa bỏ nhiều đoạn code do sự phức tạp tăng dần theo thời gian.
*  **Khả năng mở rộng**: Cho phép chúng ta dễ dàng thêm code mới vào code của mình, thực hiện các yêu cầu mới hoặc thay đổi mà không phá vỡ chức năng hiện có. Khả năng mở rộng cung cấp tính linh hoạt và cho phép mức độ tái sử dụng cao cho code hiện tại.
*  **Khả năng đọc**: Cho phép chúng ta dễ dàng đọc code và khám phá mục đích của nó mà không mất quá nhiều thời gian để đào bới. Điều này rất quan trọng để cho việc phát hiện các lỗi mới và phát hiện ra những đoạn code nào chưa được test.
<br><br>

Các yếu tố trên là các yếu tố chính của cái mà chúng ta có thể gọi là **sự sạch sẽ** hoặc **chất lượng**, bản thân nó không phải là thước đo trực tiếp, mà thay vào đó là hiệu ứng kết hợp của các yếu tố khác, ví dụ như được minh họa dưới đây:
![](https://images.viblo.asia/a3ee4b7c-d4ee-4082-87f8-8389f7f0df0b.jpg)
Tiếp theo hãy đi sâu vào một số ví dụ và tìm hiểu ảnh hưởng của từng ví dụ tới 3 yếu tố nêu trên.<br><br>
**Note**: *bài viết sẽ sử dụng ngôn ngữ Ruby, nhưng tất cả các cấu trúc được trình bày ở đây có tương đương trong các ngôn ngữ OOP phổ biến nhất.*

-----
**<h4>Luôn luôn tạo hệ thống phân cấp `ApplicationError` của riêng bạn.</h4>**

Hầu hết các ngôn ngữ đi kèm với một loạt các lớp ngoại lệ, được tổ chức theo hệ thống phân cấp thừa kế, giống như bất kỳ lớp OOP nào khác. Để duy trì khả năng đọc, khả năng duy trì và khả năng mở rộng của code, sẽ là một ý tưởng tốt để tạo ra cây con của riêng chúng ta, mở rộng từ `base exception class`. Đầu tư một chút thời gian vào cấu trúc logic hệ thống phân cấp này có thể cực kỳ có lợi. Ví dụ:
```ruby
class ApplicationError < StandardError; end

# Validation Errors
class ValidationError < ApplicationError; end
class RequiredFieldError < ValidationError; end
class UniqueFieldError < ValidationError; end

# HTTP 4XX Response Errors
class ResponseError < ApplicationError; end
class BadRequestError < ResponseError; end
class UnauthorizedError < ResponseError; end
# ...
```
![](https://images.viblo.asia/abfdf656-0c13-4370-8966-8e565e9abda7.jpg)
<br>
Việc tạo ra package bao quát và dễ mở rộng cho việc xử lý lỗi giúp cho ứng dụng của chúng ta xử lý các tình huống cụ thể sẽ dễ dàng hơn nhiều. Ví dụ: chúng ta có thể quyết định ngoại lệ nào sẽ xử lý theo cách tự nhiên hơn. Điều này không chỉ giúp tăng khả năng đọc của code mà còn tăng khả năng duy trì của các ứng dụng và thư viện (gems).<br><br>
Từ góc độ dễ đọc, như thế này sẽ dễ đọc hơn nhiều:
```ruby
rescue ValidationError => e
```
so với
```ruby
rescue RequiredFieldError, UniqueFieldError, ... => e
```
<br>

Từ góc độ bảo trì, ví dụ cho việc implement JSON API và chúng ta đã xác định ClientError của riêng mình với một số kiểu con, sẽ được sử dụng khi khách hàng gửi 1 bad request. Nếu bất kỳ một trong số này được nêu ra, ứng dụng sẽ trả về JSON thông báo lỗi trong phản hồi của nó. *Sẽ dễ dàng hơn để sửa chữa hoặc thêm logic vào một khối duy nhất xử lý  `ClientErrors` thay vì lặp qua từng lỗi có thể xảy ra và thực hiện cùng một logic xử lý cho mỗi khối. Về khả năng mở rộng, nếu sau này chúng ta phải thực hiện một loại lỗi do phía client khác, chúng ta có thể tin tưởng rằng nó sẽ được xử lý đúng ở đây.*<br><br>
Ngoài ra, điều này không ngăn chúng ta thêm các xử lý đặc biệt cho một `client error` cụ thể trước đó, cũng như chèn thêm chính ngoại lệ đó vào trong luồng xử lý ngoại lệ.
```ruby
# app/controller/pseudo_controller.rb
def authenticate_user!
  fail AuthenticationError if token_invalid? || token_expired?
  User.find_by(authentication_token: token)
rescue AuthenticationError => e
  report_suspicious_activity if token_invalid?
  raise e
end

def show
  authenticate_user!
  show_private_stuff!(params[:id])
rescue ClientError => e
  render_error(e)
end
```
Như bạn có thể thấy, việc raise ngoại lệ cụ thể này đã vẫn cho phép chúng ta có thể xử lý nó ở các cấp độ khác nhau, thay đổi nó, raising lại nó và cho phép lớp cha xử lý nó.<br><br>
> **Có 2 thứ cần lưu ý ở đây:**
> * Không phải tất cả các ngôn ngữ đều hỗ trợ raise ngoại lệ từ bên trong một bộ xử lý ngoại lệ.
> * Trong hầu hết các ngôn ngữ, việc tạo một ngoại lệ mới từ bên trong luồng xử lý ngoại lệ sẽ khiến ngoại lệ ban đầu bị mất vĩnh viễn, vì vậy tốt hơn là nên raise lại cùng một đối tượng ngoại lệ (như trong ví dụ trên) để tránh mất dấu nguyên nhân ban đầu của lỗi. (trừ khi bạn làm việc này có chủ đích).
> 

-----
**<h4>Đừng bao giờ `rescue Exception`</h4>**
Đó là, không bao giờ cố gắng thực hiện một luồng xử lý bắt tất cả cho loại ngoại lệ cơ sở. Đó không bao giờ là một ý tưởng hay trong bất kỳ ngôn ngữ nào. Chúng ta không muốn rescue ngoại lệ vì nó sẽ làm xáo trộn bất cứ điều gì thực sự xảy ra, làm hỏng cả khả năng bảo trì và khả năng mở rộng. Chúng ta có thể lãng phí một lượng lớn thời gian để gỡ lỗi vấn đề thực sự là gì, khi nó có thể đơn giản như một lỗi cú pháp:
```ruby
# main.rb
def bad_example
  i_might_raise_exception!
rescue Exception
  nah_i_will_always_be_here_for_you
end

# elsewhere.rb
def i_might_raise_exception!
  retrun do_a_lot_of_work!
end
```
Bạn có thể đã nhận thấy lỗi trong ví dụ trên, "return" viết sai chính tả. Ví dụ này minh họa việc rescue Exception gây hại cho code của chúng ta. Ta có thể thấy ở đây cũng chưa có gì để xử lý ngoại lệ này (trong trường hợp này là `NoMethodError`), điều này có thể làm ta tốn nhiều thời gian quay mòng mòng tìm lỗi.<br>

-----
**<h4>Đừng bao giờ `rescue` nhiều hơn cần thiết</h4>**
Ví dụ trước là một trường hợp cụ thể của quy tắc này: Chúng ta nên luôn luôn cẩn thận để không khái quát quá mức các xử lý ngoại lệ. Lý do cũng tương tự như trên.<br><br>
Nếu chúng ta cố gắng xử lý các kiểu con ngoại lệ khác nhau trong cùng một khối xử lý ngoại lệ, sẽ xảy ra việc khối đó quá nhiều logic và quá nhiều trách nhiệm. Ví dụ: nếu chúng ta đang xây dựng một thư viện sử dụng API từ xa, việc xử lý một `MethodNotAllowedError`  (HTTP 405), thường khác với việc xử lý một `UnauthorizedError`  (HTTP 401), mặc dù cả hai đều là `ResponseErrors`.<br><br>
> Như chúng ta sẽ thấy, thường tồn tại một phần khác của ứng dụng sẽ phù hợp hơn để xử lý các trường hợp ngoại lệ cụ thể theo cách [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) hơn.
> 
<br>

Vì vậy, hãy xác định trách nhiệm duy nhất của lớp hoặc phương thức của bạn và xử lý tối thiểu các trường hợp ngoại lệ thỏa mãn yêu cầu trách nhiệm này. Ví dụ: nếu một phương thức chịu trách nhiệm lấy thông tin chứng khoán từ một API, thì nó sẽ xử lý các trường hợp ngoại lệ phát sinh từ việc chỉ lấy thông tin đó và để xử lý các lỗi khác cho một phương thức khác được thiết kế riêng cho các trách nhiệm này:
```ruby
def get_info
  begin
    response = HTTP.get(STOCKS_URL + "#{@symbol}/info")

    fail AuthenticationError if response.code == 401
    fail StockNotFoundError, @symbol if response.code == 404
    return JSON.parse response.body
  rescue JSON::ParserError
    retry
  end
end
```
Ở đây chúng ta đã xác định phương thức này để chỉ cung cấp cho chúng ta thông tin về chứng khoán. Nó xử lý các lỗi cụ thể về điểm cuối, chẳng hạn như phản hồi JSON không đầy đủ hoặc không đúng định dạng. Nó **không** xử lý trường hợp khi xác thực thất bại hoặc hết hạn, hoặc nếu cổ phiếu không tồn tại. Đó là trách nhiệm của những phương thức khác.<br>

-----
**<h4>Chống lại sự thôi thúc xử lý ngoại lệ ngay lập tức</h4>**
Một ngoại lệ có thể được xử lý tại bất kỳ điểm nào trong call stack và bất kỳ điểm nào trong hệ thống phân cấp lớp, do đó, biết chính xác nơi để xử lý nó có thể gây khó khăn. Để giải quyết câu hỏi hóc búa này, nhiều người lựa chọn xử lý bất kỳ ngoại lệ nào ngay khi phát sinh, nhưng đầu tư thời gian để suy nghĩ điều này thường sẽ dẫn đến việc tìm một nơi thích hợp hơn để xử lý các ngoại lệ cụ thể.<br><br>
Một ví dụ thường gặp trong Rails là:
```ruby
# app/controllers/client_controller.rb

def create
  @client = Client.new(params[:client])
  if @client.save
    render json: @client
  else
    render json: @client.errors
  end
end
```
*(Lưu ý rằng mặc dù về mặt kỹ thuật đây không phải là một khối xử lý ngoại lệ, nhưng về mặt chức năng, nó phục vụ cho cùng một mục đích, vì @ client.save chỉ trả về false khi gặp ngoại lệ.)*<br><br>
Tuy nhiên, trong trường hợp này, việc lặp lại khối xử lý lỗi trong "`else`" tương tự trong mọi hành động của "`if`" là ngược lại với DRY, và làm hỏng khả năng bảo trì và mở rộng. Thay vào đó, chúng ta có thể sử dụng tính chất đặc biệt của lan truyền ngoại lệ và chỉ xử lý chúng một lần, trong class controller cha, `ApplicationController`
```ruby
# app/controllers/client_controller.rb

def create
  @client = Client.create!(params[:client])
  render json: @client
end
```
```ruby
# app/controller/application_controller.rb

rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

def render_unprocessable_entity(e)
  render \
    json: { errors: e.record.errors },
    status: 422
end
```
Bằng cách này, chúng tacó thể đảm bảo rằng tất cả các lỗi `ActiveRecord :: RecordInvalid` được xử lý đúng cách và được xử lý ở một nơi, ở cấp độ `ApplicationController` cơ sở. Điều này cho phép chúng ta tự do nghịch ngợm với nó nếu chúng ta muốn xử lý các trường hợp cụ thể ở cấp thấp hơn, hoặc đơn giản là để nó `lan ra` một cách duyên dáng :).<br><br>

-----
**<h4>Không phải mọi ngoại lệ đều cần xử lý</h4>**
Khi phát triển gem hoặc thư viện, nhiều nhà người sẽ cố gắng đóng gói chức năng và không cho phép bất kỳ ngoại lệ nào lan truyền ra khỏi thư viện. Nhưng đôi khi, nó là không rõ ràng làm thế nào để xử lý một ngoại lệ cho đến khi ứng dụng cụ thể được triển khai.<br><br>
Lấy ActiveRecord làm ví dụ. Phương thức `save` xử lý các trường hợp ngoại lệ mà không lan truyền chúng, chỉ cần trả về false, trong khi `save!` đưa ra một ngoại lệ khi nó thất bại. Điều này cung cấp cho mọi người cách tùy chọn xử lý các trường hợp lỗi cụ thể khác nhau hoặc đơn giản là xử lý bất kỳ lỗi nào theo cách chung.<br><br>
Nhưng nếu bạn không có thời gian hoặc nguồn lực để cung cấp một thứ hoàn chỉnh như vậy thì sao? Trong trường hợp đó, nếu có bất kỳ sự không chắc chắn nào, tốt nhất là phơi bày ngoại lệ và cứ `thả` nó vào `tự nhiên` :).
![](https://images.viblo.asia/ddac3760-5019-4fe5-bd5e-20c96a2a30c8.jpg)
<br>
> **Đây là lý do**: *Chúng ta luôn làm việc với các yêu cầu bị thay đổi mọi lúc và đưa ra quyết định rằng một ngoại lệ sẽ luôn được xử lý theo cách cụ thể thực sự có thể gây hại cho việc thực hiện của chúng ta, làm hỏng khả năng mở rộng và duy trì và có khả năng xảy ra các lỗi lớn hơn, đặc biệt là khi phát triển thư viện*.
> 
Lấy ví dụ trước về một người sử dụng API về cổ phiếu. Chúng ta đã chọn xử lý phản hồi không đầy đủ và không đúng chỗ ngay tại chỗ và chúng ta đã chọn `retry` yêu cầu tương tự cho đến khi chúng ta nhận được phản hồi hợp lệ. Nhưng sau đó, các `requirement` có thể thay đổi, ví dụ chúng ta phải trả về dữ liệu chứng khoán đã lưu từ trước, thay vì `retry`.
<br><br>
**Tóm lại:** nếu không rõ cách xử lý một ngoại lệ, hãy để nó lan truyền một cách tự nhiên. Có nhiều trường hợp tồn tại một nơi rõ ràng để xử lý ngoại lệ trong nội bộ, nhưng có nhiều trường hợp khác để lộ ngoại lệ là tốt hơn. Vì vậy, trước khi bạn chọn xử lý ngoại lệ, hãy suy nghĩ một lúc. Một nguyên tắc nhỏ là chỉ xử lý ngay các trường hợp ngoại lệ khi bạn tương tác trực tiếp với người dùng cuối.

-----
**<h4>Tuân theo các convention</h4>**
Ví dụ trong Ruby, hay Rails, có một số quy ước đặt tên, chẳng hạn như phân biệt giữa `method_names` và `method_names!` với một **dấu chấm than**. Trong Ruby, **dấu chấm than** chỉ ra rằng phương thức sẽ thay đổi đối tượng đã gọi nó và trong Rails, điều đó có nghĩa là phương thức đó sẽ đưa ra một ngoại lệ nếu nó không thực hiện hành vi dự kiến. Cố gắng tôn trọng quy ước tương tự, đặc biệt nếu bạn định open-source thư viện của mình.

> *Bên cạnh đó, bởi vì tôi sử dụng các ngoại lệ để chỉ ra thất bại, tôi hầu như luôn sử dụng từ khóa `fail` thay vì từ khóa `raise` trong Ruby. Hai từ khóa này có chức năng giống hệt nhau vì vậy không có sự khác biệt nào ngoại trừ việc `fail` truyền đạt rõ ràng hơn rằng phương pháp fail. Tôi chỉ sử dụng `raise` khi tôi bắt được một ngoại lệ và `raise` lại nó, bởi vì ở đây tôi không phải là thất bại, mà là cố tình đưa ra một ngoại lệ.*
> 

-----
**<h4>Logger.log(everything)</h4>**
Tất nhiên, cách này không chỉ áp dụng cho các trường hợp ngoại lệ, nhưng nếu có một điều luôn luôn phải ghi lại, thì đó là một ngoại lệ.<br><br>
Ghi lại log là cực kỳ quan trọng (đủ quan trọng để Ruby có một *logger* với phiên bản tiêu chuẩn của nó). Nó viết nhật ký cho các ứng dụng của chúng ta và ghi lại cách thức và thời điểm chúng bị lỗi thậm chí còn quan trọng hơn việc ghi lại cách các ứng dụng của chúng ta chạy thành công.<br>
<br>

-----
**<h4>Cuối cùng!</h4>**
Ngoại lệ là một phần cơ bản của mọi ngôn ngữ lập trình. Chúng đặc biệt và cực kỳ mạnh mẽ, và chúng ta phải tận dụng sức mạnh của chúng để nâng cao chất lượng code của chúng ta thay vì kiệt sức chiến đấu với chúng.<br><br>
Trong bài viết này, chúng ta đã đi sâu vào một số thực tiễn tốt để cấu trúc các cây ngoại lệ của chúng tavà làm thế nào nó có thể có lợi cho khả năng đọc và chất lượng để cấu trúc logic chúng. Chúng ta đã xem xét các cách tiếp cận khác nhau để xử lý các trường hợp ngoại lệ, ở một nơi hoặc trên nhiều cấp độ.<br><br>
Chún ta đã thấy rằng sẽ là không tốt khi `“catch ‘em all”` :'( , và nên để chúng nổi bọt lên một cách tự nhiên.<br>
<br>
Chúng ta đã xem xét nơi để xử lý các trường hợp ngoại lệ theo cách DRY nhất có thể và biết rằng chúng ta không bắt buộc phải xử lý chúng khi nào hoặc nơi chúng phát sinh lần đầu tiên.<br><br>
Chúng tôi đã thảo luận khi nào chính xác là một ý tưởng tốt để xử lý chúng, khi nào nó là một ý tưởng tồi, và tại sao, khi nào nghi ngờ, tốt nhất nên để nó tự lan truyền.<br><br>
Cuối cùng, chúng ta đã thảo luận về các điểm khác có thể giúp tối đa hóa tính hữu ích của các ngoại lệ, chẳng hạn như các quy ước sau và ghi nhật ký mọi thứ.<br><br>
Với các hướng dẫn cơ bản này, chúng ta có thể cảm thấy thoải mái và tự tin hơn khi xử lý các trường hợp lỗi trong code của chúng ta và làm cho các ngoại lệ của chúng ta thực sự đặc biệt!

-----
**NGUỒN**: https://www.toptal.com/abap/clean-code-and-the-art-of-exception-handling