Dependency injection (DI) là một chủ đề gây nhiều tranh cãi trong cộng đồng Ruby. Một số người cho rằng DI containers là những thứ phức tạp không cần thiết được lấy từ Java. Một số người cho rằng DI là con đường dẫn đến code sạch hơn, đơn giản hơn, dễ kiểm chứng hơn.

Trong bài viết này, tôi muốn so sánh và đối chiếu hai phương pháp tiếp cận: hard-coded constants so với sử dụng một DI container. Sự khác biệt có thể không lớn như bạn nghĩ!

Hãy bắt đầu với một giải thích nhanh về DI và DI containers.

## Dependency là gì?

Một dependency dịch theo tiếng Việt nghĩa là phụ thuộc, ở đây ám chỉ đến các đối tượng bên ngoài phải dựa vào (phụ thuộc vào) một cái gì đó. Ví dụ với module `RegisterUser` sau:
```
module RegisterUser
  def self.call(params)
    if UserValidator.validate(params)
      UserRepository.save(params)
    else
      nil
    end
  end
end
```

`UserValidator` và `UserRepository` đều là dependency của `RegisterUser`.

## Dependency Injection là gì?

Có một số vấn đề với `module` ở trên:
- Các dependency không thể thay thế được. Điều gì sẽ xảy ra nếu chúng tôi muốn sử dụng lại mã này bằng một `validator` hoặc `repository` khác?
- Đoạn mã trên không thể tự hoạt động. Nếu chúng ta muốn thử nghiệm nó một cách độc lập thì sao? Điều gì sẽ xảy ra nếu chúng ta muốn tách nó thành một `gem` riêng biệt, không có những phụ thuộc của nó?
- Các dependency không được khai báo rõ ràng. Để xác định các dependency, đoạn mã trên phải được đọc toàn bộ.

Sau đây là cùng một đoạn mã, được viết lại như một `class` với DI:
```
class RegisterUser
  attr_reader :validator, :repo

  def initialize(validator:, repo:)
    @validator = validator
    @repo = repo
  end

  def call(params)
    if validator.validate(params)
      repo.save(params)
    else
      nil
    end
  end
end
```

`class` này không còn được kết hợp trực tiếp với các dependency của nó nữa. Các dependency được truyền vào (injected) làm đối số để khởi tạo (hàm `initialize`), và chúng được lưu trữ trong các instance variables.

Như vậy chúng ta đã giải quyết được một số vấn đề:
- Các dependency khác nhau có thể được chuyển vào.
- `class` này hoàn toàn độc lập. Nó có thể được thử nghiệm trong sự cô lập, hoặc tách thành một `gem` riêng biệt.
- Tất cả các dependency được liệt kê rõ ràng như là các đối số truyền vào hàm `initialize`.


> Đây là một ví dụ của `constructor injection`. Có nhiều cách khác để triển khai dependency injection.

## Một DI Container là gì?

Bây giờ `RegisterUser` được tách ra khỏi các dependency của nó, chúng ta sử dụng nó như thế nào?

Một tùy chọn là khởi tạo một đối tượng theo cách thủ công, truyền vào tất cả các dependency bắt buộc:
```
RegisterUser.new(
  validator: UserValidator.new,
  repo: UserRepository.new,
)
```

Tuy nhiên, các dependency thường có các dependency riêng của chúng và các dependency của các dependency cũng có thể có các dependency riêng của chúng. Điều này có thể nhanh chóng trở thành một vòng lặp rắc rối.

Nếu một anh bạn dev viết ra một đoạn code trả về một thực thể cho chúng ta, và chúng ta sẽ yêu cầu anh bạn đó như thế này:
> Hãy cho tôi một đối tượng RegisterUser. Bạn xử lý việc tạo và truyền vào tất cả các dependency. Tôi không quan tâm đến bất kỳ chi tiết nào, chỉ cần cho tôi một đối tượng mà tôi có thể sử dụng.

Đây thực chất là những gì một DI container làm. Nó gói gọn tất cả các công việc liên quan đến việc tạo ra các đối tượng và truyền vào các dependency của chúng. Chúng ta không phải suy nghĩ về cách tạo một đối tượng, chúng ta chỉ cần yêu cầu một đối tượng và container cung cấp một đối tượng.

Ví dụ như thế này:
```
register_user = container.resolve(:register_user)
```

Để DI container thực hiện công việc của nó, nó cần phải được cấu hình. Trong Ruby, điều này thường bao gồm các blocks "registering" với container. Các blocks này sẽ được chạy để tạo các đối tượng cần thiết, khi chúng được yêu cầu từ container.

Để chứng minh điều này trông như thế nào trong code, hãy bắt đầu bằng cách tạo container:
```
container = Container.new
```

Chúng ta có thể khai báo các dependency đầu tiên, với các blocks tạo các đối tượng đó:
```
container.register(:user_validator) do
  UserValidator.new
end

container.register(:user_repository) do
  UserRepository.new
end
```

Sau đó, chúng ta có thể khai báo đối tượng RegisterUser, lấy các dependency của nó từ container thay vì hard-coding chúng:
```
container.register(:register_user) do
  RegisterUser.new(
    validator: container.resolve(:user_validator),
    repo: container.resolve(:user_repository),
  )
end
```

Đây chỉ là một ví dụ thực hiện của một DI container, nhưng sự triển khai trên thực tế được sử dụng theo cách tương tự.

## Testing với Dependency Injection

Nếu chúng ta muốn kiểm tra một lớp dependency injected một cách cô lập, chúng ta có thể truyền vào các dependency giả lập:
```
it "saves if validation passes" do
  validator = double(validate: true)
  repo = spy
  register_user = RegisterUser.new(validator: validator, repo: repo)

  register_user.call(name: 'Tom')

  expect(repo).to have_received(:save).with(name: 'Tom')
end
```

Nếu chúng ta muốn tích hợp kiểm tra lớp, một số dependency có thể được stubbed trong container. Ví dụ: nếu chúng tôi muốn sử dụng validator thực, nhưng chúng tôi không muốn thực sự lưu vào cơ sở dữ liệu, thì chúng tôi có thể chỉ thay thế repository của người dùng.
```
it "saves if validation passes" do
  repo = spy
  params = { email: 'legit.email@example.com' }

  container.while_stubbing(user_repository: repo) do
    register_user = container.resolve(:register_user)
    register_user.call(params)
  end

  expect(repo).to have_received(:save).with(params)
end
```

## Hard-coded Constants

Và bây giờ cho một cái gì đó hoàn toàn khác, hãy xem xét các hằng số được gán cứng trong global namespace của Ruby và cách so sánh nó với một DI container.

Chúng tôi thấy rằng mọi thứ cần phải được khai báo với DI container. Nghĩa là, DI container cần phải được cấu hình. Điều đó tương tự như việc định nghĩa các `module`, tạo các hằng số trong global namespace.

```
module RegisterUser
  # (implementation goes here)
end
```

Chúng ta thấy rằng chúng tôi có thể yêu cầu/giải quyết một đối tượng từ một DI container. Điều đó tương tự như một constant lookup trong global namespace. Tra cứu này xảy ra chỉ bằng cách sử dụng tên của `module`: `RegisterUser`.

Chúng ta thấy rằng các DI container có thể inject dependency đệ quy - tạo ra các dependency và các dependency của các dependency. Tất cả các mã đều có quyền truy cập vào global namespace, vì vậy các dependency được hard-code có thể hard-code các dependency của chúng, theo một kiểu đệ quy.
```
module RegisterUser
  def self.call(params)
    if UserValidator.validate(params)
      UserRepository.save(params)
    else
      nil
    end
  end
end
```

Chúng tôi đã quay trở lại cách thực hiện như ban đầu, từ đầu bài viết này.

## Testing với Hard-coded Constants

Việc thay thế các dependency dễ dàng với DI, nhưng làm thế nào để thay thế các dependency đã bị hard-code? Nếu chúng ta viết C ++ hoặc Go, điều này về cơ bản là không thể. Một khi mã được trình biên dịch chạy, các `class` và các `module` không thể được hoán đổi cho những cái khác nhau.

Nhưng chúng tôi đang viết Ruby - một ngôn ngữ "đáng yêu", "năng động". Chúng ta có thể thay thế bất kỳ hằng số nào trong global namespace bằng cách sử dụng chức năng stubbing của RSpec Mocks.
```
it "saves if validation passes" do
  repo = spy
  stub_const('UserValidator', double(validate: true))
  stub_const('UserRepository', repo)

  RegisterUser.call(name: 'Tom')

  expect(repo).to have_received(:save).with(name: 'Tom')
end
```

Ngay cả việc mock các dependency được hard-coded cũng trông hơi giống với DI equivalent.

## Sự khác nhau giữa hai phương pháp tiếp cận

Sau khi thấy sự giống nhau giữa các DI containers và hard-coded constants, hãy xem xét sự khác biệt giữa hai phương pháp tiếp cận.
1. Các đối tượng DI linh hoạt hơn và có thể sử dụng lại được. Các dependency được hard-code có thể được stub trong quá trình test, nhưng chỉ trong quá trình test. Không thể thay đổi hành vi hoặc sử dụng lại mã bằng cách cung cấp các dependency khác nhau, nếu chúng được hard-code.
2. DI giới thiệu mã, khái niệm và độ phức tạp bổ sung. DI nhắc nhở chúng ta suy nghĩ về các dependency, constructor injection, giải quyết các đối tượng từ một container, cấu hình container bằng cách đăng ký các đối tượng, và như vậy. Những khái niệm này không phải là bản địa của Ruby và cần được học viên phát triển. Những khái niệm phụ này cũng dẫn đến thêm mã soạn sẵn.

    Hằng số được hard-code là một tính năng cơ bản của ngôn ngữ Ruby. Họ hầu như không cần bất kỳ lời giải thích nào, ngay cả đối với các nhà phát triển ít kinh nghiệm.
3. Trong quá trình test, việc loại bỏ các dependency trong các đối tượng DI không yêu cầu bất kỳ điều gì khác ngoài mã Ruby bình thường. Ngược lại, stubbing ra hằng số là ma thuật đen tối. RSpec Mocks thực hiện một công việc tuyệt vời để che giấu phép thuật này, để làm cho constant stubbing cảm giác thật dễ dàng, nhưng có rất nhiều thứ đang diễn ra ẩn sau điều đó.
4. Các đối tượng DI có các dependency rõ ràng, trong khi các hằng số được hard-code có các phụ thuộc ngầm định. Để kiểm tra một đối tượng trong sự cô lập, chúng ta cần phải thay thế tất cả các dependency của nó. Điều này là dễ dàng với DI, bởi vì thông thường tất cả các dependency được khai báo là các đối số cho hàm `initialize`. Để xác định các dependency được hard-code chúng ta cần phải đọc tất cả các mã, và metaprogramming có thể làm cho nhiệm vụ này khá khó khăn.
5. DI là về trừu tượng và vô hướng. Nó không chỉ ra rõ ràng những dependency cụ thể của một đối tượng DI sẽ là gì. Đó là đặc điểm của DI: các dependency được coi là các `interface` đơn thuần, trừu tượng, mà về mặt lý thuyết có thể implemented bởi bất kỳ đối tượng nào.

    Hard-coded constants thì ngược lại - chúng là bê tông và trực tiếp. Chúng tôi luôn biết chính xác phụ thuộc là gì.
6. DI dẫn đến các thiết kế khác nhau, với ít khớp nối hơn. DI nhắc chúng ta suy nghĩ về các phụ thuộc trừu tượng trong khi chúng ta viết mã. Nó làm cho sự kết nối với những dependency đó rõ ràng hơn. Cách suy nghĩ này về mã dẫn đến thiết kế với ít khớp nối hơn - nhiều lớp hơn, với ít dependency hơn cho mỗi lớp.

    Ngược lại, các dependency được hard-code rất dễ bỏ qua. Điều này thường dẫn đến các `class` phát triển lớn hơn theo thời gian, thay vì được phân nhỏ lại. Khi chúng ta có quyền truy cập dễ dàng vào mọi thứ trong global namespace, chúng ta có xu hướng sử dụng các dependency mà không cần suy nghĩ nhiều. Đây là một công thức yêu cầu sự liên kết chặt chẽ, nếu nhà phát triển không cẩn thận.

## Phương pháp tiếp cận lai

Có một cách tiếp cận cố gắng kết hợp các lợi ích của DI và hard-code, mà không cần một container:
```
class RegisterUser
  attr_reader :validator, :repo

  def self.build
    new(
      validator: UserValidator.new,
      repo: UserRepository.new,
    )
  end

  def initialize(validator:, repo:)
    @validator = validator
    @repo = repo
  end

  def call(params)
    if validator.validate(params)
      repo.save(params)
    else
      nil
    end
  end
end
```

Lớp này chính xác giống như phiên bản DI, nhưng nó có một lớp bổ sung được gọi là `build`. Các dependency vẫn được injected, và chúng ta vẫn có thể gọi `RegisterUser.new` với bất kỳ dependency nào mà chúng ta muốn. Tuy nhiên, nếu chúng ta muốn tạo một đối tượng mà không cần suy nghĩ về các dependency của nó, trong cùng một cách mà chúng ta sẽ sử dụng một container, thì chúng ta có thể gọi `RegisterUser.build`.

Cách tiếp cận này giữ lại hầu hết các lợi ích của DI.
- Class vẫn có thể được kiểm tra trong sự cô lập.
- Các dependency vẫn còn rõ ràng - thậm chí còn rõ ràng hơn một phương pháp DI thuần túy.
- Lớp này vẫn chủ yếu tách rời khỏi các dependency của nó, mặc dù một chút liên kết đã được xây dựng.

Thêm một chút liên kết thực sự có thể hữu ích, bởi vì chúng ta có thể thấy những dependency cụ thể nào (có thể), bằng cách đọc phương thức `build`. Trong phương pháp DI thuần túy, thông tin này không tồn tại trong `class` - chúng ta sẽ phải đọc cấu hình container.

Vẫn còn một số bản mẫu, nhưng không có container là bắt buộc. Mỗi class có khả năng cung cấp các dependency mặc định cho chính nó.

## Tổng kết

Các đối tượng phụ thuộc vào các đối tượng khác. Những phụ thuộc này có thể được hard-code hoặc được injected. Các DI containers có thể đóng gói việc tạo ra các đối tượng, truyền các dependency chính xác và đệ quy tạo các dependency đó nếu cần. Các đối tượng có các dependency của chúng được injected thường dễ dàng hơn để kiểm tra, bởi vì các dependency có thể được thay thế dễ dàng bằng các phép kiểm tra đôi.

Global namespace của Ruby hoạt động tương tự như DI container. Các dependency được hard-code có thể được thay thế trong quá trình kiểm tra, sử dụng RSpec Mocks.

Tuy nhiên, có sự khác biệt rõ ràng giữa hai cách tiếp cận. Các đối tượng DI linh hoạt hơn, có thể kiểm tra và tái sử dụng hơn các đối tượng có các dependency được hard-code. Điều này đi kèm với chi phí của sự phức tạp, vô hướng, và bản mẫu. DI cũng nhắc nhở nhà phát triển nghĩ về phụ thuộc trong khi viết mã, dẫn đến thiết kế có ít khớp nối hơn - nhiều lớp hơn với ít phụ thuộc hơn cho mỗi lớp.

Có một phương pháp lai cố gắng kết hợp các lợi ích của DI với hard-code. Nó bắt đầu với thiết kế DI và thêm một phương thức `build` cho class, có chứa các dependency được hard-code. Cách tiếp cận này không yêu cầu một container, bởi vì mỗi lớp có thể cung cấp các dependency riêng của nó.

----------------------------

Bài viết được dịch từ: [https://www.rubypigeon.com/posts/dependency_injection_containers_vs_hardcoded_constants/](https://www.rubypigeon.com/posts/dependency_injection_containers_vs_hardcoded_constants/)