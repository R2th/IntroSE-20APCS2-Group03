## Lựa chọn giữa các sự khác nhau ##

Ở bài viết trước (https://viblo.asia/p/mocks-khong-phai-la-stubs-phan-1-gAm5yWEDZdb) đã chỉ ra sự khác nhau giữa: xác minh hành vi và xác minh trạng thái, TDD hướng mock và TDD truyền thống. Vậy làm thế nào để lựa chọn giữa chúng? Đầu tiên với sự lựa chọn giữa xác minh hành vi và xác minh trạng thái.

Việc trước tiên cần cân nhắc là ngữ cảnh. Đó là một liên kết dễ thấy như order và warehouse hay một sự kết hợp khó đoán trước như order và mail service.

Nếu là một liên kết dễ thấy thì việc lựa chọn khá đơn giản. Nếu là một người phát triển theo hướng TDD truyền thống thì mock, stub và bất cứ loại double nào sẽ không được sử dụng. Đối tượng thực và xác minh trạng thái được sử dụng. Nếu theo TDD hướng mock thì sẽ sử dụng mock và xác minh hành vi. Không cần lựa chọn gì cả.

Nếu là một liên kết khó đoán trước, thì không cần lựa chọn nếu TDD hướng mock - sẽ sử dụng mocks và xác minh hành vi. Nếu TDD truyền thống thì cần có sự lựa chọn, nhưng việc lựa chọn sử dụng kiểu xác minh nào cũng không đến mức quá quan trọng. Thông thường, những người phát triển theo TDD truyền thống sẽ quyết định dựa trên điều kiện của từng trường hợp, bằng cách sử dụng con đường đơn giản nhất cho mỗi tình huống.

Vậy chúng ta có thể thấy, lựa chọn giữa xác minh hành vi và xác minh trạng thái không phải là một quyết định gì đó quan trọng. Vấn đề cần quan tâm là giữa TDD hướng mock và TDD truyền thống. Vì những đặc tính của xác minh trạng thái và xác minh hành vi tác động đến sự lựa chọn đó, nên chúng ta sẽ tập trung vào yếu tố này.

Trước khi đó, xem xét một trường hợp sau. Đôi khi chúng ta sẽ gặp những thứ rất khó để xác minh trạng thái, ngay cả khi nó không phải là liên kết khó đoán trước. Một ví dụ điển hình là cache. Vấn đề chính của cache là không thể xác định được trạng thái cache đã hit hoặc missed hay không - đây là một trường hợp mà xác minh hành vi sẽ là lựa chọn khôn ngoan ngay cả đối với những người TDD truyền thống. Có những trường hợp ngoại lệ khác ở cả hai hướng.

Như chúng ta đã tìm hiểu về việc lựa chọn giữa truyền thống và hướng mock, có nhiều yếu tố để cân nhắc. Sau đây là các nhóm yếu tố được chia ra:

### Sử dụng TDD ###
Những đối tượng mock sinh ra từ cộng đồng XP, và một trong những đặc tính chính của XP là tập trung vào phát triển hướng kiểm thử - khi mà việc thiết kế hệ thống phát triển theo từng chu kỳ được thúc đẩy bởi việc viết tests.

Do đó sẽ không ngạc nhiên khi những người phát triển theo hướng mock sẽ hay nói về lợi ích của kiểm thử hướng mock trên một bản thiết kế. Đặc biệt, họ còn đề xuất một kiểu mới được gọi là phát triển hướng nhu cầu. Với kiểu phát triển này, chúng ta sẽ bắt đầu một user story bằng việc viết test bên ngoài hệ thống, tạo đối tượng interface nào đó của hệ thống đang được test - SUT. Khi cân nhắc về các kỳ vọng của hệ thống đối với các đối tượng bên ngoài, chúng ta sẽ phát hiện ra sự tương tác giữa SUT và những hệ thống khác - hỗ trợ hiệu quả cho việc thiết kế interface tương tác ra bên ngoài của SUT.

Trong lần chạy test đầu tiên, những kỳ vọng trên các đối tượng mock cung cấp một đặc tả cho bước tiếp theo và một điểm khởi đầu cho các test khác. Chúng ta có thể chuyển mỗi kỳ vọng thành một test trên một đối tượng liên kết và lặp lại công việc xử lý bên trong SUT đồng thời cùng lúc. Kiểu phát triển này còn được gọi là từ ngoài vào trong. Nó phù hợp với những hệ thống theo tầng, theo lớp. Đầu tiên chúng ta bắt đầu lập trình ra UI bằng việc sử dụng những tầng mock phía dưới. Sau đó, viết test cho các tầng thấp hơn, dần dần từng bước đi qua các tầng của hệ thống. Đây là cách tiếp cận có cấu trúc và kiểm soát, điều mà nhiều người tin rằng hữu ích đối với những người mới làm quen với hướng đối tượng và TDD.

TDD truyền thống không đưa ra hướng dẫn giống như trên. Chúng ta có thể thực hiện một cách tiếp cận theo từng bước tương tự bằng việc sử dụng những phương thức đã stub thay vì mocks. Để làm điều này, bất kể khi nào cần thứ gì đó từ một đối tượng liên kết, chúng ta hard-code chính xác những gì mà test yêu cầu để SUT hoạt động. Sau đó, khi test đã thành công thì chúng ta có thể thay thế hard code bằng code thực.

Nhưng TDD truyền thống còn có thể thực hiện những thứ khác nữa. Một kiểu phát triển phổ biến là phát triển từ giữa ra ngoài. Trong kiểu phát triển này, chúng ta nhận một tính năng và quyết định những gì cần thực hiện trong miền ứng dụng để tính năng đó hoạt động được. Chúng ta nhận những đối tượng miền để thực hiện những gì cần và khi đã hoạt động, phần UI sẽ được dựng phía trên. Làm việc này thì chúng ta không bao giờ cần làm giả bất cứ thứ gì. Nhiều người thích điều này vì nó tập trung vào mô hình miền trước tiên, giúp logic miền khỏi lộ ra bên ngoài UI.

Nhấn mạnh rằng phát triển theo hướng mock hay truyền thống đều thực hiện một story cùng lúc. Có những luồng suy nghĩ rằng xây dựng những ứng dụng theo từng tầng, không bắt đầu tầng mới đến khi tầng kia hoàn thành. Cả những người phát triển hướng mock và truyền thông đều có một nền tảng về agile và thường ưu tiên phát triển theo các chu kỳ chuẩn hóa. Do đó họ thường thực hiện theo tính năng hơn là theo từng tầng, từng lớp.

### Thiết lập dữ liệu cố định ###
Với TDD truyền thống, chúng ta không chỉ phải tạo SUT mà còn cả những đối tượng/hệ thống liên kết mà SUT cần trong những phản hồi của test. Trong khi những ví dụ ở bài viết này chỉ có một cặp đối tượng, thì những test thực tế liên quan đến rất nhiều đối tượng khác. Thường những đối tượng này được tạo và xóa bỏ sau mỗi lần chạy test.

Tuy nhiên, trong test hướng mock, chỉ cần tạo SUT và mocks cho đối tượng liên kết trung gian của nó. Điều này có thể tránh một vài tác vụ liên quan đến xây dựng dữ liệu cố định phức tạp.

Thực tế. những tester truyền thống có xu hướng tái sử dụng những dữ liệu cố định nhiều nhất có thể. Trong ví dụ đơn giản nhất chúng ta có thể đặt đoạn code tạo dữ liệu cố định bên trong phương thức setup của xUnit (hay bất cứ test framework nào khác). Trong trường hợp dữ liệu cố định phức tạp hơn và cần được sử dụng bởi nhiều test class hơn thì cần tạo một class để sinh ra dữ liệu cố định. Hầu hết các đối tượng tạo dữ liệu cố định dễ khởi tạo, chúng thường không có ràng buộc lẫn nhau.

Kết quả là những người theo hướng mock cho rằng việc tạo dữ liệu cố định mất nhiều công sức. Trong khi người theo hướng truyền thống lại cho rằng các dữ liệu này có thể sử dụng lại và đánh giá ngược lại bên kia phải tạo mocks mỗi lần test.

### Sự cô lập của test ###

Nếu chúng ta gặp một lỗi trên một hệ thống được phát triển với kiểm thử hướng mock, thông thường chỉ có những test của SUT chứa lỗi mới không chạy được. Tuy nhiên, với cách tiếp cận truyền thống, bất cứ test của đối tượng nào bị lỗi cũng có thể ảnh hưởng tới test của đối tượng khác. Kết quả là dẫn đến lỗi test trên toàn hệ thống.

Những người phát triển theo hướng mock coi đây là một vấn đề lớn vì sẽ mất nhiều công sức debug để tìm ra nguyên nhân gốc rễ của lỗi và sửa chữa nó. Tuy nhiên, những người phát triển hướng truyền thống lại không tỏ ra rằng đó là nguyên nhân của vấn đề. Thông thường thủ phạm tương đối dễ dàng được chỉ ra bằng việc xem test nào lỗi và những lỗi khác phát sinh từ lỗi ban đầu. Hơn thế nữa nếu chúng ta kiểm thử thường xuyên (điều nên làm) thì sẽ không khó để tìm nguyền nhân .

Một yếu tố có thể ảnh hưởng lớn ở đây là độ chi tiết của test. Vì test truyền thống tạo nhiều đối tượng thực nên sẽ có một test ban đầu cho một nhóm những đối tượng, hơn là chỉ cho một đối tượng. Nếu nhóm này mở rộng thêm đối tượng, có thể sẽ khó debug hơn rất nhiều. Hiện trạng này có thể hiểu là test được chia nhỏ chưa tốt.

Những nhà phát triển hướng mock thường ít gặp phải vấn đề này vì nguyên tắc là mock tất cả những đối tượng không phải đối tượng ban đầu. Việc này khiến test được chia nhỏ hợp lý đối với những đối tượng liên kết. Việc chia nhỏ chưa tốt không hẳn là điểm yếu của kỹ thuật test truyền thống, mà đó là triển khai test truyền thống chưa chính xác. Một nguyên tắc quan trọng là đảm bảo chia nhỏ các test với độ chi tiết hợp lý cho mỗi class. Khi những nhóm đối tượng đôi khi là cần thiết, nhưng chúng ta chỉ nên giới hạn một vài đối tượng - không quá 6. Ngoài ra, nếu việc debug gặp vấn đề do sự chia nhỏ test chưa hợp lý thì chúng ta nên debug theo hướng kiểm thử, tạo ra những test nhỏ và chi tiết hơn.

Bản chất của của xunit truyền thống không chỉ là unit tests mà còn là những test tích hợp nhỏ. Kết quả là nhiều người thích thú với việc client test có thể bắt được những lỗi mà main test của một đối tượng có thể bị bỏ sót, đặc biệt xem xét những vùng mà các class tương tác. Phát triển hướng mock không có lợi thế đó. Ngoài ra, chúng ta có thể gặp rủi ro khi những kỳ vọng trong quá trình mock chưa chính xác, dẫn đến unit test chạy được nhưng che lấp đi lỗi vốn có.

Tại lúc này, chúng ta cũng cần phải nhớ rằng, dù chọn kiểu test nào thì bắt buộc phải kết hợp với những acceptance test chưa chia nhỏ - những test đang kiểm tra toàn hệ thống.

### Kết hợp kiểm thử với việc triển khai ###

Khi viết một test hướng mock, chúng ta sẽ test những lời gọi ra bên ngoài của SUT để đảm bảo nó tương tác chính xác với những đối tượng liên kết của SUT. Một test truyền thống chỉ quan tâm tới trạng thái cuối cùng, không quan tâm tới việc trạng thái được tạo ra như nào. Do đó, test hướng mock dễ kết hợp với việc triển khai của một hàm. Thay đổi bản chất lời gọi tới các đối tượng liên kết thường khiến các test hướng mock bị lỗi.

Sự kết kết hợp này dẫn đến một sự liên kết về những vấn đề cần quan tâm. Quan trọng nhất đó chính là tác động nên quy trình phát triển hướng kiểm thử. Với test hướng mock, việc viết test sẽ khiến chúng ta thấy ngay cách triển khai của một hành vi - một lợi ích thực sự của kiểu test này. Tuy nhiên, test truyền thống lại chỉ coi trọng những gì xảy ra từ giao diện bên ngoài và bỏ qua việc triển khai cho đến khi viết test xong.

Sự kết hợp với việc triển khai cũng gặp vấn đề khi refactor vì những thay đổi trong quá trình triển khai gần như phá vỡ các test so với test truyền thống.

Điều này có thể trở nên tồi tệ hơn bởi bản chất của những bộ công cụ test. Thường những công cụ mock sẽ chỉ định rất cụ thể những lời gọi hàm và sự ăn khớp của tham số, ngay cả khi chúng không liên quan đến test đặc thù hiện tại. Một trong những mục đích của bộ công cụ jMock là trở nên linh động hơn trong đặc tả về những kỳ vọng, cho phép những kỳ vọng có thể nới lỏng ở những chỗ không quan trọng.

### Cách thức thiết kế ###

Một trong những khía cạnh quan trọng nhất của kiểu test là cách chúng ảnh hưởng tới cách thức thiết kế. Có vài sự khác nhau về thiết kế mà do việc chọn kiểu test ảnh hướng tới.

Như đã đề cập ở trên về sự khác nhau trong cách giải quyết các tầng ứng dụng. Test hướng mock hỗ trợ cách tiếp cận từ ngoài vào trong, trong khi những người phát triển theo hướng mô hình miền lại ưu tiên chọn test truyền thống.

Ở một mức độ thấp hơn, test hướng mock dễ dàng chuyển đổi hàm trả về dữ liệu thành hàm tương tác với đối tượng đang thu thập. Ví dụ về hành vi thu thập thông tin từ một nhóm đối tượng để tạo một chuỗi báo cáo. Cách phổ biến là gọi những hàm báo cáo trên mỗi đối tượng và ghép kết quả vào một biến tạm. Test hướng mock có thể làm khác đi bằng việc truyền vào một buffer vào nhiều đối tượng và dùng những đối tượng này để thêm các chuỗi báo cáo vào buffer - coi buffer như một tham số thu thập.

Test hướng mock sẽ tránh hiện tượng "đoàn tàu gãy" - những chuỗi các hàm như `getThis().getThat().getTheOther()`. Tránh chuỗi hàm cũng được biết đến trong quy tắc Demeter.

Một trong những điều khó nhất trong thiết kế hướng đối tượng là nguyên tắc "Tell Don't Ask" - có thể hiểu là nên chỉ ra một đối tượng làm nhiệm vụ gì thay vì bóc tách dữ liệu bên trong đối tượng để thực hiện trong client code. Những người kiểm thử theo hướng mock cho rằng test hướng mock giúp tuân theo nguyên tắc này và tránh được các hàm getter xuất hiện quá nhiều trong code hiện này. Những người kiểm thử truyền thống lại tranh luận rằng có nhiều cách khác để thực hiện điều này.

Một vấn đề được biết đến với xác minh trạng thái là nó có thể dẫn đến những phương thức truy vấn chỉ hỗ trợ việc xác minh. Sẽ không hợp lý khi thêm các phương thức vào API của một đối tượng chỉ để kiểm thử thuần túy. Sử dụng xác minh hành vi tránh được điều này.

Test hướng mock thường thúc đẩy việc sử dụng role interfaces vì mỗi đối tượng liên kết được mock độc lập và trở thành một role interface. Trong ví dụ trên sử dụng string buffter cho việc tạo ra báo cáo, một người kiểm thử hướng mock sẽ thường tạo mới một role đặc biệt phù hợp với miền ứng dụng đó và có thể được triển khai bởi một string buffer.

Điều quan trọng cần ghi nhớ là sự khác nhau này trong cách thức thiết kế là một đòn bẩy chính cho hầu hết những người kiểm thử hướng mock. Bản chất của TDD là mong muốn có được kiểm thử hồi quy tự động đủ mạnh để hỗ trợ cho việc phát triển thiết kế. Trong quá trình phát triển, người ta đã phát hiện ra rằng việc viết test từ đầu cải thiện đáng kể quy trình thiết kế. Những người kiểm thử theo hướng mock có một ý tưởng tốt về kiểu thiết kế hợp lý và phát triển những thư việc mock có nhiệm vụ chính là giúp mọi người phát triển cách thức thiết kế.

## Vậy chúng ta nên theo hướng truyền thống hay hướng mock ##

Đây là một câu hỏi khó có thể tự tin trả lời. Theo ý kiến cá nhân của tác giả - một nhà phát triển TDD theo hướng truyền thống, không thấy bất cứ lý do gì phải thay đổi cách đang làm hiện tại. Không có bất cứ lợi ích thuyết phục nào cho TDD hướng mock và cần phải quan tâm tới những hệ quả của việc kết hợp kiểm thử và triển khai.

Việc viết test nên tập trung vào kết quả của hành vi, thay vì cách nó được thực hiện. Một người kiểm thử hướng mock thường liên tục nghĩ về cách mà SUT sẽ được triển khai như nào trong quá trình viết kỳ vọng. Điều này có thể không được tự nhiên cho lắm.

Nhưng cũng sẽ có bất lợi nếu không thử TDD hướng mock. Bài viết này thể hiện sự khác biệt một cách công bằng để độc giả có thể lựa chọn thông minh.

Có hai nguyên nhân chính cho việc nên thử TDD hướng mock. Một là khi mất quá nhiều thời gian trong việc debug khi test bị lỗi vì chúng không được chia nhỏ hợp lý và chỉ ra vấn đề nằm ở đâu (Chúng ta cũng có thể cải thiện điều này ở TDD truyền thống bằng cách chia nhỏ hợp lý). Hai là khi những đối tượng chưa đủ hành vi, kiểm thử hướng mock thúc đẩy nhóm phát triển tạo những đối tượng có nhiều hành vi hơn.

## Lời cuối ##

Liên quan tới unit test, những framework xunit và quy trình phát triển hướng kiểm thử phát triển, càng nhiều người sử dụng những đối tượng mock hơn. Nhiều người mới chỉ tìm hiểu một chút về những framework mock mà không hiểu hoàn toàn về sự phân tách giữa kiểm thử hướng mock và truyền thống, sẽ đánh giá không đúng chúng. Bất kể về phía nào của sự lựa chọn, việc hiểu sự khác nhau theo nhiều chiều sẽ rất hữu ích. Không nhất thiết phải theo hướng mock mới cảm thấy những framework này tiện lợi, sẽ khá hữu dụng khi xem xét các điều trên còn có thể đưa ra nhiều chỉ dẫn trong việc thiết kế phần mềm.

## ** Lược dịch ** ##

**Martin Fowler**, *Mocks Aren't Stubs*, [https://martinfowler.com/articles/mocksArentStubs.html](https://martinfowler.com/articles/mocksArentStubs.html)