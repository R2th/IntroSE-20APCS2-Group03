## Giới thiệu 
- Với những người sử dụng Laravel framework, thì accessor và mutator không quá khó hiểu và đôi khi, cũng được sử dụng ở trong thực tế. Ngay cả bản thân tôi cũng sử dụng Accessor và Mutator trong dự án thực tế. Tuy nhiên, cũng như hầu hết các phương thức, cơ chế khác. Accessor và Mutator sẽ hơi có vẻ magic với những người mới sử dụng hoặc chưa quen thuộc với Laravel framework. Nhắc đến "magic", tôi lại nhớ những ngày bắt đầu học lập trình với sự "magic" của ruby on rails. Không thể hiểu thực sự cơ chế bên trong "nó" xử lý như thế nào, không hiểu tại sao ở một cách kỳ lạ nào đó "nó" lại hoạt động, và thực tế là khi có lỗi, cũng không thể thực hiện việc debug để hiểu tại sao nó lỗi. Với những người mới chập chững vào nghề như tôi hồi đó, nó thật khó hiểu vì hai chữ "magic" được nhắc đi nhắc lại nhiều lần. 
- Tuy nhiên, cũng với kinh nghiệm tăng dần, hoặc là khi dần quen thuộc hơn, thì các khái niệm accessor, mutator sẽ dễ dàng hiểu được hơn, nhất là khi đã thực sự đã sử dụng nó. Với laravel, thì accessor và mutator còn có trong document hẳn hoi trên trang chủ, nên thông qua những ví dụ, những giải thích của document, và thực tế sử dụng, thì acessor và mutator không còn quá "magic" như trước nữa. Tuy nhiên, đi dạo một vòng thấy một bài về "một số vấn đề" khi sử dụng "accessor", tôi thấy hay nên quyết định translate nó. Trong bài viết này, chỉ đề cập đến vấn đề của "accessor" thôi nhé, còn mutator sẽ được đề cập trong một nội dung khác. 
- Bài viết gốc các bạn có thể đọc [tại đây](https://laraveldaily.com/the-biggest-problem-with-eloquent-accessors-magic/).  Bài này mình chỉ dịch theo ý hiểu từ bài viết gốc. Không có gì cao siêu cả. 
## Nội dung
### Accessor là gì ? 
- Trên viblo, có nhiều bài viết về accessor và mutator trong laravel. Vì accessor và mutator là 2 chiều lấy dữ liệu/ lưu dữ liệu vào trong cơ sở dữ liệu nên thường viết kèm với nhau. Nếu chưa có khái niệm gì về accessor và mutator, thì bạn có thể tham khảo thêm tại bài viết này[ Laravel Accessor và Mutator](https://viblo.asia/p/laravel-accessors-and-mutators-AQrMJbOzM40E)
- Hiêu nôm na accessor sẽ thông qua một ví dụ đơn giản như sau. Một User có 2 trường `last_name` và `first_name` và tôi muốn hiển thị `full_name` của 1 user. Như vậy, nếu không sử dụng accessor trên file .blade chúng ta có thể sử dụng như sau:
```blade
{{$user->first_name . $user->last_name}}
```
Nếu sử dụng accessor thì chúng ta cần thực hiện ở model user như sau:
```php
namespace Models;
use Illuminate\Database\Eloquent\Model;

class User extend Model
{
        protected $fillable = ['first_name', 'last_name'];
        protected $appends = ['full_name];
        protected getFullNameAttribute()
       {
            return $this->fist_name . $this->last_name;
       }
}
```
Như vậy trên .blade chúng ta có thể sử dụng như sau:
```blade
{{ $user->full_name }}
```
### Những vấn đề của Accessor
#### Vấn đề 1: Trường `full_name` này là trường gì? 
- Với những người mới, hay những người chưa quen thuộc với Laravel, hoặc chưa từng sử dụng accessor (mặc dù có thể họ đã đọc trên document nhưng chưa dùng đến nên quên mất), thì suy nghĩ ban đầu là trường full_name này là một cột trong bảng user trong database.  Đây là một suy nghĩ ban đầu thường được nghĩ đến đầu tiên. Nhưng khi kiểm tra trong database, lại không có cột này trong database. Họ sẽ không thể nhanh chóng đoán được đoạn code này liên quan đến accessor trong model. Nếu có lỗi xảy ra, họ sẽ có thể mất hàng giờ để tìm ra, rốt cục giá trị trường `full_name` được lấy ra ở đâu. Vì `full_name` sẽ được hiểu là một "magic" nào đó, và có khi, họ còn không còn tìm được, và không thể hiểu được tại sao lại có một `user` lại có giá trị `full_name`.  Ngay cả bây giờ, đôi khi đọc code, nếu không nhớ ra accessor, thì tôi vẫn phải cặm cụi debug từng dòng để hiểu dòng, logic của đoạn code đang lỗi. Với một dự án lớn, thì sẽ rất khó để hiểu toàn bộ dự án, bạn sẽ chỉ có khả năng hiểu một phần, và đến khi có lỗi xảy ra ở phần bạn chưa biết, thì cách duy nhất để fix lỗi đó là bạn lại phải debug từng dòng để hiểu đoạn code này làm gì, tại sao lại viết như vậy, ý tưởng của nó là gì. Không phải có thể nhanh chóng phát hiện "chỗ nào có khả năng lỗi nhất" trong khi bạn không thể nắm được chính xác các luồng xử lý bên trong. 
### Vấn đề 2: Có khả năng ẩn bug nếu trong accessor xử lý quá nhiều logic.
- Việc này có thể xảy ra trong trường hợp accessor có một lượng xử lý logic lớn, và chính những xử lý đó tiềm ẩn những bug  mà khó thể phát hiện ra. 
- Khi thực hiện việc xử lý logic trong accessor, nó cũng có nguy cơ như những xử lý logic thông thường khác, logic càng phức tạp, càng khó hiểu, thì nó sẽ càng có nguy cơ có bug cao. Việc viết logic trong accessor tôi không khuyến khích, tuy nhiên, thực tế, để cho "tiện" hoặc đỡ mất effort, thì đôi khi chúng ta lại nhắm bắt làm bừa. 
- Như đã đề cập ở trên, việc tìm ra lỗi do accessor đã là một thời gian khá lâu rồi, thì việc code logic trong accessor phức tạp sẽ dẫn đến việc đọc hiểu sẽ mất nhiều thời gian hơn nhiều so với những gì mà người tạo ra accessor có thể ngờ đến. Nó lại không mang lại khả năng "đọc/hiểu (readable)" của code như kỳ vọng mà lại hoàn toàn ngược lại. Như vậy, khi sử dụng accessor, chúng ta cần cân nhắc vấn đề này, chỉ nên sử dụng những logic đơn giản.
### Vấn đề 3: N+1 query
- Vấn đề này chưa được đề cập ở bài viết gốc, tuy nhiên, vấn đề này thực tế tôi gặp rồi, và cũng là vấn đề khá nhức nhối, nên tôi quyết định viết thêm vào. 
- Bài toán đặt ra là thêm một thuộc tính **status** mỗi khi lấy thông tin của 1 $user, mà thông tin status này được lấy từ một bảng khác, thông qua relationship. Nếu không sử dụng accessor, thì chúng ta có thể sử dụng **with** khi query trong Eloquent query rồi sau đó sử lý logic. Tuy nhiên, đôi khi junior lại có suy nghĩ, tại sao lại không thêm **status** như một accessor, một thuộc tính của mỗi user, khi lấy user ra thì nó đã có **status** rồi. Đó là suy nghĩ không sai, nhưng thực tế, nó sẽ gây ra vấn đề n+1 query. Tại mỗi lần lấy thông tin một $user, nó sẽ mặc định query để lấy thông tin **status** chèn vào mỗi lần trả về giá trị của 1 $user. Số lượng câu query sẽ tăng lên nhiều ít phụ thuộc vào cách lấy **status** và độ phức tạp khi lấy **status**. Tuy nhiên số lượng câu query trong database có thể sẽ tăng mạnh. Điều này cũng không dễ nhận biết tại sao lại có số câu query tăng lên nhiều như vậy trong quá trình refactor, performance.
### Giải pháp 
- Giải pháp được đưa ra là **Hãy sử dụng và chỉ sử dụng Getter method**. 
- Thay vì việc sử dụng accessor như trên và sử dụng *{{ $user->full_name}}* hãy sử dụng **{{$user->getFullName()}}**.
- Việc sử dụng getter, thì bản thân sẽ hiểu được đó là một method trong model, và cụ thể hơn nó có khả năng "clickable" trên các IDE ví dụ như phpStorm. (click vào nó sẽ nhảy đến chỗ cài đặt phương thức), điều này sẽ giảm bớt thời gian tìm hiểu hơn.  
### Tóm lại
- Khi sử dụng accessor chúng ta cần chú ý một số tip như sau:
  + Chỉ sử dụng accessor với những logic đơn giản 
  + Không nên query dữ liêu của accessor sang bảng khác, vì sớm hay muộn nó cũng gây ra vấn đề hiệu năng (performance)
  + Hãy cố gắng sử dụng các **Getter** method thay vì accessor