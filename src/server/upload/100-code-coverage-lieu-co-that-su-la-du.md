![](https://images.viblo.asia/44d13eac-21e6-48f7-9764-9eaf314bfa56.jpg)

Hiện nay đã và đang tồn tại những ý kiến trái chiều về sự cần thiết của việc hệ thống của bạn nên đạt được 100% Code Coverage (độ bao phủ). Một số người cho rằng việc này sẽ đảm bảo cho một hệ thống sẽ sạch bug 100% nhờ việc unit test đã bao phủ tất cả các dòng code trong hệ thống, một số người khác lại cho rằng việc này chỉ làm mất thời gian mà không hoàn toàn đạt được mục đích thật sự của việc viết Unit test. Ruby là một ngôn ngữ động (dynamic language), cho nên mình tin rằng  Code Coverage là một thứ hết sức cần thiết tuy nhiên chưa thật sự là đủ. 

## 100%

Code Coverage là con số thống kê rằng bao nhiêu dòng code đã được thực thi trong thời gian chạy test trên tổng số dòng code của hệ thống (hoặc trên tổng các file được quy định trong một phiên test) và con số này được biểu thị dưới dạng %. Nếu mình tiến hành chạy test cho hệ thống và trình thông dịch của Ruby (Ruby interpreter) không chạy vào một nhánh điều kiện của - ví dụ - một action trong controller của Rails thì tỷ lệ coverage chắc chắn sẽ dưới 100%.

Thường thì 100% Code Coverage chỉ nhằm thể hiện rằng hệ thống đã được đảm bảo 100% không có bug và nghe cũng khá là xịn xò đấy chứ, tuy nhiên trong thực tế thì việc này chỉ bảo vệ hệ thống của bạn khỏi các lỗi runtime thôi.

Rspec vẫn sẽ pass, Unit Test vẫn sẽ ngon lành, nhưng ở Production thì khác, sẽ có các data hay trạng thái được sự dụng mà đến bạn còn chả ngờ tới, test case cũng không có case đấy, cho nên mặc dù code Production đã đạt 100% coverage nhưng incident thì vẫn xảy ra đều đều (dab).

Ruby không phải là ngôn ngữ biên dịch, nó không có một trình biên dịch nào cả (compiler) và thiếu đi những bước kiểm tra hệ thống mà các ngôn ngữ khác được tích hợp sẵn. Khi bạn thực thi một file Ruby, có kha khá cách để khiến trình thông dịch của Ruby fail và ngừng thực thi, tuy nhiên những exceptions gặp nhiều nhất trong khi code Ruby (on Rails) là các runtime exceptions.

Việc đảm bảo độ bao phủ cho hệ thống đã đóng phần nào vai trò của một trình biên dịch, đó là đảm bảo cho code ít nhất là sẽ **CHẠY ĐƯỢC!** 

Những exception mà trình thông dịch sẽ bắt được ngay và luôn bao gồm `MethodMissing`, `ArgumentError`, `NameError`, và một số exception khác như  `Hash#KeyMissing` từ  lỗi liên quan đến các thư viện hay lỗi do gem từ bên thứ 3.

Tưởng tượng thế này nhé:  Bạn code xong một chức năng, nhưng chưa đẩy Pull vì tự nhiên bạn quyết định đổi tên một hàm của trong hệ thống để dùng cho chức năng đó.

Rspec của chức năng pass ngon lành, code review êm xuôi, QA test không có bug (ngon). Nhưng đùng một cái, một ngày đẹp dời. một vài user trên Production không vào được một màn nào đấy, lỗi 500 to lù lù, điều tra ra thì thấy server báo lỗi `MethodMissing` 
(sohai). 

Bùm! **INCIDENT!!!**

Bạn gãi đầu gãi tai vì lỗi ấy đang báo đến tên method cũ mà trước đấy bạn đã đổi, tuy nhiên nó lại được dùng **Ở MỘT CHỖ KHÁC**. Khi đổi tên, bạn đã miss một case mà chỉ dành cho một số User, tuy nhiên lại không có unit test cho phần này. Bug như thế này cực kì dễ để lên được Production.

 Việc đảm bảo 100% coverage sẽ dễ dàng bắt được trường hợp này và bắt buộc bạn phải đổi tên thêm cả ở những chỗ bị miss. Tuy nhiên bỏ qua (hay cố tình bỏ qua)  việc thêm Rspec cho một case dị và nhỏ là điều không phải quá hiếm gặp. 

Nếu bạn config cho CI sẽ fail nếu không được 100% coverage thì bạn hoàn toàn có cơ hội để viết thêm unit test cho những trường hợp ở trên.

Thiếu đi việc kiểm tra những thứ cơ bản như thế này thì những việc như thêm bớt tham số của hàm, đổi tên biến hay refactor code sẽ trở nên vô cùng nguy hiểm cho các Dev khác hay cho chính bản thân các bạn trong tương lai.

Chỉ cần sau một vài tuần đầu của một project mới thì hệ thống đã có thể trở nên quá lớn để maintain đối với một Dev, do đó nếu bạn để trống ở một vài phần trong test coverage thì tin mình đi, bạn đang để một quả bom nổ chậm trong code đó. *Tick tock tick tock*. Là một thằng Junior trong một hệ thống lớn, mình không hề muốn phải luôn luôn lo sợ rằng vì việc không hiểu phần lớn hệ thống hay không nắm được luồng của hệ thống sẽ gây ra lỗi ở Production. Lo sợ cũng dễ hiểu thôi vì mình rất hay code sai cú pháp với đặt tên biến sai chính tả, nên runtime exceptions xảy ra có khi còn nhiều hơn cả số dòng code được (dab).

Với một project mới, mình khuyên là nên bắt đầu với việc bắt buộc phải đạt 100% coverage, việc này hoàn toàn có thể kiểm soát được bằng gem [SimpleCov](https://github.com/colszowka/simplecov) và config cho CI fail khi coverage ở dưới một ngưỡng nhất định. Với SimpleCov, bạn có thể mở file `coverage/index.html` ở root của hệ thống để có thể nắm được covered và missed lines của hệ thống

![](https://images.viblo.asia/f8aeda31-079d-4e68-9765-c049510466a1.jpg)

Với những project đã tồn tại từ lâu và thiếu coverage thì việc cover được toàn bộ code cũ (có khi của những người không còn ở trong dự án) là vô cùng khó, và đôi khi không dám sửa đến những đoạn code cũ do nó đã tồn tại từ lâu và không thật sự hiểu được nó có ảnh hưởng như thế nào đến các chức năng cũ. Tuy nhiên dựa vào coverage hiện tại thì bạn có thể phân tích được mức độ ảnh hưởng và nguy cơ của việc thay đổi code. Sau đó có thể báo lại với các bên để mọi người hiểu được nguy cơ đó. Chúng ta cũng có thể sử dụng thêm các tool từ bên thứ 3 như [Coveralls](https://coveralls.io/), [CodeCov](https://codecov.io/), hay [CodeClimate](https://codeclimate.com) để kiểm soát coverage theo thời gian và hiểu rõ hơn về phần nào đang bị thiếu cũng như sự nghiêm trọng của chúng.

Tuy nhiên sự khác biệt về hiểu quả của việc đạt 100% coverage với việc đạt được tý lệ thấp hơn không thể tính toán một cách rõ ràng được. Bạn nên nhớ rằng, 100% coverage **KHÔNG PHẢI** có nghĩa là code của bạn không có bug, điều này chỉ có ý nghĩa là hệ thống chỉ pass được những bài test cơ bản nhất: có thể thực thi và không có lỗi runtime. Tuy nhiên phòng cháy còn hơn chữa cháy mà.

## 100% có thật sự là đủ ?

**Đạt được 100% coverage không có nghĩa là code của bạn đã được test một cách đầy đủ - ý nghĩa thật sự của việc này là tất cả các dòng code đã được test, không có nghĩa chúng được test với mọi trường hợp.**

```ruby
def sum a, b
    if a.present? && b.present?
        a + b
    else
        "nothing happened"
    end
end
```

Ví dụ bạn viết test cho đoạn code bên trên đi. chỉ cần test 2 case là `a`, `b` đều tồn tại và `a` hoặc `b` không tồn tại (hoặc rỗng) là bạn đã có thể đạt 100% coverage cho hàm này. Tuy nhiên nếu `a` hay `b` là String thì sao nhỉ ? Chẳng phải 100% coverage rồi mà, sao hàm vẫn chết (confused) ? Đơn giản là unit test chúng ta đã viết chỉ có mục đích là chạy qua tất cả các dòng code mà lại quên đi kiểu giá trị của tham số. Thiếu sót này chính là nguy cơ tiềm ẩn của những bug không đáng có trong tương lai. 

Việc viết Unit Test không chỉ nên hoàn toàn chú trọng đến số dòng đã cover mà có khá nhiều tiêu chí cần phải được cover để thật sự đạt được hiệu quả tối đa, bạn có thể đọc bài [này](https://viblo.asia/p/gioi-thieu-khai-niem-test-coverage-c0c1c2-ORNZqgyq50n) để hiểu thêm về C0, C1, C2 test coverage. Mình có thể liệt kê ra một số tiêu chí như:

**1, Condition coverage:** Tất cả biểu thức boolean cần được test với cả 2 giá trị `true` và `false`.

**2, Decision coverage:** Không chỉ cover các biểu thức boolean mà với mỗi giá trị của biểu thức cần cover được các block `if-elseif-else`.

**3, Loop Coverage:** có nghĩa là mỗi vòng lặp cần được chạy 1 lần, nhiều hơn 1 lần, không chạy lần nào. Tuy nhiên nếu có giới hạn vòng lặp thì phải test cả trường hợp giới hạn cũng như là nhiều hơn giới hạn cho phép.

**4, Entry và Exit Coverage:** Test tất cả các trường hợp gọi hàm có thể thực hiện được và mọi kết quả trả về của hàm.

**5, Parameter Value Coverage (PVC):** Kiểm tra toàn bộ giá trị khả thi của một tham số. Ví dụ một string có thể có bất cứ giá trị là `nil`, `""`, `whitespace (space, tabs, new line)`,`chuỗi hợp lệ`, `chuỗi không hợp lệ`, `single-byte`,`multi-byte`, ... một giá trị nào đó của tham số gây fail test thì có thể nó sớm muộn sẽ gây bug nếu không được xử lý ngay và luôn. Nếu chỉ tính code coverage thì dễ dàng có thể đạt được 100%, tuy nhiên nếu chỉ test 1 trong 7 giá trị trên thì chỉ đạt được 14.2% coverage của giá trị tham số.

**6, Inheritance Coverage:** Trong trường hợp dùng OOP, chúng ta cũng phải cover các trường hợp sử dụng hàm hay object kế thừa.

Về cơ bản thì 100% Code Coverage không có nghĩa là code bạn đã hoàn hảo. Hãy dùng nó để làm sườn và viết thêm những unit test phức tạp hơn, cover rộng hơn những gì có thể xảy đến với code của hệ thống.

## Kết

**Đừng viết Unit Test cho có, đừng vì cái con số 100% xanh lè mà cố viết cho có lệ**. Hãy cố gắng để chăm chút cho phần Unit Test, đảm bảo rằng nó đã cover **TẤT CẢ** các case , ngay cả khi sắp đến deadline. Có thể bạn sẽ viết ra một đồng bùng nhùng toàn test case và có thể sẽ có cả những case trên trời nhưng điều đó hoàn toàn OK. Làm tốt việc này thì không chỉ giúp hệ thống chạy ngon lành hơn mà còn giúp cho việc refactor sau này dễ dàng hơn rất nhiều.

Thank you and stay fresh !

*Nguồn:*  
* [What is code coverage and how do YOU measure it?](https://stackoverflow.com/questions/195008/what-is-code-coverage-and-how-do-you-measure-it#targetText=Code%20coverage%20is%20a%20measurement,tests%20against%20the%20instrumented%20product.)
* [Ruby: The misconceptions of 100% Code Coverage](https://www.codementor.io/theundefined/ruby-the-misconceptions-of-100-code-coverage-keituk3qc)