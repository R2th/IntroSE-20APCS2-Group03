## Blockchain là gì

Hầu hết mọi người đều biết blockchain là giao thức làm nền tảng cho Bitcoin, nhưng nó còn hơn thế. Về cơ bản, bạn có thể coi đó là sổ cái kỹ thuật số “chỉ thêm không bớt” — tương tự như bản ghi của một spreadsheet được chia sẻ.

Về cơ bản, nó là một cấu trúc dữ liệu tồn tại ở nhiều nơi khác nhau cùng một lúc và rất khó để sửa đổi vì bạn không bao giờ có thể xóa dữ liệu nó khỏi nó. Bạn chỉ có thể thêm vào nó.

Đây là một tính chất rất tuyệt bởi nó thay đổi từ mô hình cấu trúc tập trung thành một mạng lưới phi tập trung của những record keepers độc lập.

Cách làm này hạn chế tối thiểu khả năng xảy ra việc một người không có quyền lại có thể chỉnh sửa các bản ghi. Tiếp theo, điều này giúp cho các bản ghi trở nên bảo mật hơn, cho phép người dùng tin tưởng hơn vào dữ liệu số bên trong blockchain.

## Bạn test Blockchain Application như thế nào?

Tôi cho rằng việc test một Blockchain Application cũng không khác quá nhiều so với việc test các application khác. Những logic và những cách suy nghĩ mà bạn đã sử dụng cho việc test các dự án non-blockchain vẫn có thể được áp dụng.

Tất nhiên, các cá nhân làm việc trên các ứng dụng blockchain cần phải có các kỹ năng toán học và mã hóa tuyệt vời, nhưng khi đi xuống bước tiếp theo thì hầu hết công việc đang được thực hiện chỉ là công việc phát triển bình thường với các tiêu chuẩn kiểm tra bình thường.

Nhiều kỹ thuật thử nghiệm bạn đã biết, như testing at the boundary, performance testing, tuân thủ và đặc biệt là kiểm tra bảo mật, áp dụng cho blockchain. Đôi khi nó chỉ là vấn đề làm quen với một số công cụ kiểm tra blockchain phổ biến.

## Các công cụ test Blockchain

Trong việc test thực hành, có một số công cụ test tương đối tốt  và có một số frameworks đã được xây dựng để giúp ta thuận tiện cho cả việc phát triển và kiểm thử.

Tôi đã tìm kiếm một vài công cụ test blockchain, đây là những gì tôi tìm thấy:

### Ethereum

Ethereum là blockchain nổi tiếng nhất (ngoài Bitcoin), và nó có một số framework tuyệt vời để phát triển các ứng dụng, nhiều trong số đó có các thư viện được đưa vào để kiểm thử khá dễ dàng.

#### Ethereum Tester

Một cách đơn giản, Ethereum Tester cung cấp các công cụ cho việc test các ứng dụng dựa trên Ethereum.

#### Truffle

Truffle chính là framework phổ biến nhất trong việc phát triển Ethereum, và nó có một github repo có tới 4288 stars, rõ ràng là nó rất phổ biến.

Nó là một framework phát triển có tính năng kiểm thử, ví dụ như khả năng cho phép viết automated tests cho các contracts của bạn bằng cả JavaScript hoặc Solidity và cho phép contracts của bạn được phát triển một cách nhanh cho. Nó cũng hoạt động với các test runner phổ biến như Mocha và Chai.

#### Ganache (trước đây là Testrpc)

Trước khi bạn deloy ứng dụng blockchain của mình lên môi trường production, việc bạn test nó ở môi trường local cũng quan trọng không kém.

Ganache là thư viện được sử dụng nhiều nhất cho việc test Ethereum contract ở môi trường local. Nó hoạt động bằng cách chạy một mock blockchain cho phép bạn truy cập vào các tài khoản mà bạn có thể dùng để test.

Tôi cảm nhận rằng nó không để đem lại độ trễ như khi bạn thực hiện trên hệ thống thật, nó không thực sự mô phỏng lại các tình huống trong thế giới thật đối với thời gian nó tốn để thực hiện các công việc. Như nó đủ để cho phép bạn compile một contract, deploy nó, xác định cost của nó và debug nó ở môi trường local.

### Populus

Đối với những người thử nghiệm thích Python, framework Populus cung cấp một số tiện ích mạnh mẽ để kiểm tra các hợp đồng blockchain. Thử nghiệm trong Populus được hỗ trợ bởi testing framework py.test.

### Manticore

Manticore là một biểu tượng của execution tool để phân tích các tệp nhị phân và hợp đồng thông minh. Manticore cho phép phân tích hỗ trợ người và tự động phát hiện các lỗ hổng.

### Hyperledger Composer

Hyperledger Composer là một công cụ phát triển mã nguồn mở có chứa nhiều chức năng để giúp xây dựng các ứng dụng blockchain. Một số tính năng đó cũng giúp ích cho việc test. Cụ thể hơn, nó hỗ trợ ba loại testing: Interactive testing, Automated unit testing và Automated system testing.

Nó có giao diện dòng lệnh cung cấp các lệnh cho phép bạn dễ dàng chạy các "smoke tests" tương tác để đảm bảo triển khai thành công. Điều này cũng giúp dễ dàng thực hiện các thử nghiệm trong hệ thống CI / CD.

System tests cũng có thể được tạo bằng cách sử dụng Docker Compose và Mocha / Chai. Bạn có thể bắt đầu một runtime và triển khai định nghĩa mạng doanh nghiệp của mình, sau đó tạo nội dung theo chương trình, gửi giao dịch và kiểm tra trạng thái đăng ký nội dung.

### Exonum Testkit

Testkit cho Exonum Blockchain là một framework cho phép bạn test hoạt động của toàn bộ dịch vụ. Cụ thể, nó cho phép bạn kiểm tra việc thực thi giao dịch và các API trong môi trường đồng bộ (không có thuật toán consensus) và trong cùng một quy trình hệ thống.

### Embark Framework

Embark là một framework phổ biến khác dành cho việc building, testing và deploying ứng dụng của bạn. Nó là một framework cho phép bạn có thể phát triển và triển khai các ứng dụng phi tập trung một cách dễ dàng (DApps)

### Corda Testing Tools

Corda là một nền tảng sổ kế toán mã nguồn mở, lấy cảm hứng từ blockchain. Nó có tính năng test được tích hợp sẵn để trợ giúp:

1. Writing contract tests
2. Integration testing
3. Writing flow tests
4. Load testing
5. Blockchain testing tools

### BitcoinJ

BitcoinJ là một thư viện để làm việc với giao thức Bitcoin. Nó cho phép bạn tương tác với Bitcoin và kết nối trực tiếp với mạng Bitcoin. Và bằng cách sử dụng các chức năng trong thư viện này, chúng ta có thể gửi và nhận Bitcoin trong thời gian thực.

Các tài liệu BitcoinJ nói rằng nó có thể duy trì một ví, gửi / nhận các giao dịch mà không cần một bản sao địa phương của Bitcoin Core, cùng với nhiều tính năng tiên tiến khác. Nó được thực hiện bằng Java nhưng có thể được sử dụng từ bất kỳ ngôn ngữ tương thích JVM nào; ví dụ trong Python và JavaScript.

Để thử nghiệm, BitcoinJ cung cấp một lớp TestUtils có thể làm những việc như tạo ra các đối tượng giao dịch giả mạo ...

Về ý tưởng trong việc tận dụng TestUtils như thế nào, hãy xem bộ test suite cho chính BitcoinJ.

## Dành cho các testers mới bắt đầu với Blockchain

Nhiều hoạt động test hiện đang được thực hiện các nhà phát triển thực hiện bằng cách thực hiện việc test của riêng họ. Điều này thật tuyệt vời, nhưng vì sự phổ biến của blockchain, những tester cũng sẽ cần phải bắt đầu tham gia.

Nó chỉ đơn giản là vấn đề của một bước đi nhỏ của niềm tin vào một công nghệ hoàn toàn khác với những gì bạn có thể đã thử nghiệm trong quá khứ.

Tôi hy vọng bài viết này sẽ cung cấp cho bạn đủ thông tin để bắt đầu tìm hiểu về testing blockchain của riêng bạn và đặt bạn trên con đường của mình để cảm thấy thoải mái với công nghệ này.

Rhian Lewis là một nguồn thông tin tuyệt vời, vì vậy hãy chắc rằng bạn đã follow cô ấy trên Twitter.

Những tin đồn cho rằng có thể cô ấy đang phát triển một khoá hoặc online tester trên Ethereum... vì vậy hãy theo dõi nhéQ