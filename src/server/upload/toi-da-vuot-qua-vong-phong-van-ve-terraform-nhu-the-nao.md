Khi đọc tiêu đề bạn có thể thấy lạ, thông thường nhà tuyển dụng(interviewer) sẽ hỏi các câu hỏi liên quan tới terraform cho ứng viên devops, nhưng mình ứng tuyển vào vị trí backend developer lại bị hỏi về terraform?

Lí do bởi vì mình trình bày và viết trong CV là mình đã có kinh nghiệm làm việc với aws, nodejs, reactjs, typescript, nestjs, seleniums(wdio), **terraform**... Vâng, chính là terraform. Từ đó, interviewer dựa vào CV và những gì mình trình bày rồi hỏi về terraform, mình trả lời thành thật về những gì mình biết và kinh nghiệm làm việc với terraform trong dự án thực tế và..... lần này mình cũng đậu phỏng vấn💐💐🤑. Tất nhiên, mình không chuyên về devops và vị trí mình apply là backend developer, nên các câu hỏi mình gặp phải có thể sẽ rất *easy* với những bạn devops hoặc một số bạn đã cày sâu về terraform. Nhưng đây là những câu hỏi mình gặp, và câu trả lời của mình cũng dựa theo những kinh nghiệm trong quá trình mình làm với terraform. Giờ chúng ta cùng bắt đầu nhé: 

### 1. Terraform là gì?
 Terraform là open source tool cho phép chúng ta tạo ra cơ sở hạ tầng trên nhiều dịch vụ cloud khác nhau như  AWS, Azure, Google Cloud, DigitalOcean... Terraform cho phép developer định nghĩa cơ sở hạ tầng dưới dạng mã code(infrastructure as code). Từ mã code đó, terraform sẽ tự động tạo các infrastructure tương ứng trên cloud một cách tự động thông qua vài lệnh đơn giản. Terraform được sử dụng bởi hàng trăm công ty lớn trên toàn thế giới
 
### 2. Tại sao người ta lại tạo ra terraform hay những IAC(Infrastructure as code) khác?
Cách hỏi khác của câu hỏi này là tại sao lại tạo ra IAC?
Devops có thể lên cloud console dùng tay thao tác vào các service tương ứng, sau đó config, định nghĩa biến môi trường, mối liên kết các service trên cloud. Điều này dẫn đến nhiều bất lợi:
- Mỗi lần deploy hay chỉnh sửa config thì devops phải lên cloud console để nhấn nút deploy hoặc chỉnh sửa config. Rất mất thời gian và công sức
- Khi phát triển phần mềm, chúng ta thường chia thành nhiều môi trường khác nhau như development, stable, staging, production. Các cấu hình trên các môi trường thường giống nhau. Khi tạo một infrastructure mới, devops phải thực hiện bằng tay lặp đi lặp lại tối thiểu bốn lần(development, stable, staging, production), trong lúc làm có thể có nhầm lẫn dẫn tới ứng dụng chạy ổn trên staging, nhưng lại không chạy được trên production.
- Devops là con người, và con người thì sẽ có sai sót. Dù devops làm thuần thục tới đâu nhưng nếu có sai sót trong thao tác bằng tay có thể dẫn tới nhiều hậu quả nghiêm trọng.
- Devops trong quá trình thao tác nếu không áp dụng blue green deployment có thể dẫn tới chết server tạm thời.
- Khó roll back khi phát sinh lỗi liên quan tới cơ sở hạ tầng.
- Để quá trình deploy hạn chế ảnh hưởng tới trải nghiệm người dùng, devops và dev team phải lựa chọn thời gian ít người dùng sử dụng ứng dụng nhất - thường là vào nữa đêm. Mỗi lần deploy thì devops và dev team phải cùng thức, chờ tới giờ *hoàng đạo* rồi deploy. Sau hôm đó devops và dev team có thể được nghỉ bù. Nhưng việc thức đêm nhiều, kéo dài sẽ làm kiệt quệ tinh thần và sức khỏe của cả team.

Từ những vấn đề trên, các nhà phát triển mới tìm cách tối ưu hóa quy trình cấu hình cơ sở hạ tầng, deploy một cách tự động bằng cách tạo ra infrastructure as code. Đối với ứng dụng bạn đang phát triển, bạn chỉ cần code ứng dụng một lần, sau đó mỗi lần deploy lên các môi trường khác nhau bạn chỉ cần đổi biến môi trường là có thể hoạt động được.  Infrastructure as code cũng tương tự, bạn dùng code để định nghĩa cơ sở hạ tầng, mỗi lần tạo cơ sở hạ tầng trên các môi trường khác nhau bạn có thể dùng chung code và chỉ cần đổi biến môi trường là có thể vận hành tốt.
Sử dụng IAC bạn sẽ có các điểm lợi sau:
- Tự động toàn bộ quá trình deployment
- Toàn bộ lịch sử infrastructure đều được ghi lại giúp roll back/debug một cách dễ dàng
- Có thể validate infrastructure trước khi apply bằng cách review code và automated tests
- Có thể sử dụng các library, document có sẵn.

Từ những ưu điểm của IAC đã giải quyết được hầu như tất cả những bất lợi mà mình nêu ở trên. Tuy nhiên, riêng điểm bất cập là devops và dev team phải thức vào giờ *hoàng đạo* để deploy thì một mình IAC không thể giải quyết triệt để. Một cánh én không làm nên mùa xuân. Vậy nên để giải quyết được hoàn toàn thì cần phải có sự kết hợp giữa nhiều công cụ và nhiều thứ khác nhau. Với kinh nghiệm làm việc của mình để việc áp dụng infrastructure một cách tự động chúng ta cần: IAC cụ thể với cái mình làm là terraform sẽ được kết hợp với jenkins, concourse... cùng với integration test, smoke test... Khi chúng ta thay đổi infrastructure bằng việc viết code terraform, sau đó sẽ qua quá trình review code để hạn chế sai sót. Khi code terraform được merge, code sẽ tự động apply vào môi trường development. Ngay sau đó integration test, smoke test... tự động chạy để kiểm tra infrastructure có deploy đúng, đủ các service trên cloud không. Nếu quá trình test tự động hoàn thành, code terraform sẽ được apply vào các môi trường kế tiếp. Sau khi tự động apply code terraform trên môi trường kế tiếp, hệ thống sẽ tự động chạy test. Nếu chạy test thành công thì quá trình này sẽ được lặp lại ở môi trường tiếp theo.  Ngược lại, nếu có phát sinh lỗi, chúng ta có thể roll back lại, hoặc chỉnh sửa code terraform rồi bắt đầu lại từ quá trình review code, merge....
Tuy nhiên việc tự động hóa hoàn toàn này chỉ làm được khi:
- Devops config hệ thống, kết hợp các công cụ và quy trình một cách thích hợp
- Có đủ lượng test để cover hầu hết các trường hợp chính liên quan tới infrastructure

### 3. Dự án đang chạy trên AWS cloud, vậy tại sao không dùng cloudformation của AWS thay vì dùng terraform?
Terraform và cloudformation đều support hầu hết các dịch vụ của AWS. Nhưng Cloudformation là dịch vụ của AWS, và chỉ hỗ trợ cho AWS Cloud. Hãy thử tưởng tượng một ngày nào đó dự án của bạn thấy AWS Cloud không còn phù hợp, không đáp ứng được nhu cầu nữa và muốn chuyển hoàn toàn qua cloud khác như Azure cloud. Lúc đó code cloudformation của bạn coi như bỏ và bạn phải code lại từ đầu trên Azure Resource Manager. Nhưng Terraform hỗ trợ các dịch vụ cloud khác ngoài AWS như Azures, Google cloud... và hỗ trợ các bên thứ 3 khác. Bạn chỉ cần chỉnh sửa đôi chút là có thể chuyển từ AWS cloud sang các cloud khác.

### 4. Tại sao lại dùng terraform mà không dùng những IAC khác?
Lí do sử dụng terraform thay vì các IAC khác bởi vì business hiện tại phù hợp với các điểm lợi sau của terraform:
- IAC có hai loại chính là configuration management(tiêu biểu là Chef, Puppet...) và provisioning(tiêu biểu là terraform và cloudformation). Trong đó configuration management được tạo ra với mục đích chính là cài đặt và quản lí các phần mềm trên server có sẵn. Provisioning tool được tạo ra với mục đích tạo, cung cấp các hạ tầng như lambda, database... Từ định nghĩa hai loại IAC bạn có thể thấy được terraform phù hợp với requirement nào rồi đấy.
- Terraform là immutable infrastructure, khi thay đổi cấu hình nào đó của server, terraform sẽ tạo ra một server mới và bỏ đi server cũ. Điều này giúp tránh gặp lỗi configuration drift mà mutable infrastructure(Chef, Ansible...) gặp phải
- Terraform thuộc loại declarative. Ví dụ bạn dùng terraform để định nghĩa 5 instance dạng micro. Sau đó bạn tăng từ 5 instance lên 7 instance cùng lọai, terraform kiểm tra nhận thấy đã có 5 instance đang chạy, lúc đó nó chỉ khởi tạo thêm 2 instance. Nhưng với Chef thuộc loại procedural sẽ tạo thêm 7 instance mặc kệ trước đó đã có sẵn 5 instance, nên devops sử dụng Chef phải tự tính toán, điểu chỉnh sao cho hợp lí.
- Terraform có cộng đồng đóng góp và hỗ trợ lớn.
- Terraform hỗ trợ quản lí state chung. Điều này giúp cho terraform đáp ứng nhu cầu nhiều developer làm việc cùng một lúc
### 5. Điểm gì làm bạn thấy hay và đặc biệt của terraform?
Điểm mà mình thấy đặc biệt của terraform là hỗ trợ để quản lí state chung. Điều này giúp cho terraform đáp ứng nhu cầu nhiều developer làm việc cùng một lúc. Để mình nói rõ hơn một chút nhé. Khi bạn chạy terraform, nó sẽ tự động tạo ra file terraform.tfstate dạng json để ghi lại thông tin mapping giữa resource trong template(trong code) và resource trên cloud thực.
- Khi một team cùng phát triển sản phẩm, terraform sẽ tạo rà vùng **shared storage for state file** lưu trữ terraform.tfstate thường được để trên s3. Ngoài ra s3 còn lưu trữ các version của state file, chúng ta có thể roll back sang version cũ khi cần thiết.
- Khi hai member chạy terraform cùng một lúc, shared storage sẽ bị thay đổi cùng lúc có thể dẫn tới conflict, thất thoát giữ liệu, sai lệch dữ liệu... Vì vậy terraform hỗ trợ **locking state file** thường được đặt ở dynamoDB dùng để khóa state trong shared storage để giúp đồng nhất dữ liệu.
- Terraform hỗ trợ tạo ra các môi trường độc lập như development, staging, production... với các state file riêng biệt(**isolating state file**). Có hai kiểu isolating state file là Isolation via workspaces(dùng câu lệnh chuyển workplace khi muốn chuyển môi trường) và Isolation via file layout(tạo ra các file có tên khác nhau và gọi tương ứng). Từ đó bạn có thể chuyển từ môi trường này sang môi trường khác một cách dễ dàng

### 6. Tổng kết
Trên đây là những trải nghiệm thực tế của mình. Hi vọng nó có ích với bạn. Ngoài ra bạn có thể coi qua link github(https://github.com/Caophuc799/terraform-demo) về những take notes và các bài tập của mình trong những ngày đầu tự học terraform để chuẩn bị bước chân vào dự án thực tế lớn.
Nếu bạn thấy bài viết hay, ý nghĩa thì hãy cho mình 1 upvote trong viblo và 1 stars trong link github(https://github.com/Caophuc799/terraform-demo) để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác.


# Sau tất cả
**Sau tất cả, mình là [Ryan Cao](https://ryancao.netlify.app/about/)**, là một developer chân chính đang trên đường chém gió. Để ủng hộ mình các bạn có thể upvote bài viết này, follow [Github Caophuc799](https://github.com/Caophuc799) và đón đọc các bài viết trên [Ryan Cao blog](https://ryancao.netlify.app/) chính thức của mình để mình có thêm động lực chia sẽ những bài viết hay, ý nghĩa khác nhé