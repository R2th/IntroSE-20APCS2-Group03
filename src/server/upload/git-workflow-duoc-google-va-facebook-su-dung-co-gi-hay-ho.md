Với developer thì Git hẳn là công cụ rất quen thuộc và không thể thiếu rồi. Thế nhưng có mấy ai thực sự hiểu được Git.
Từ khi mới ra đời thì độ phức tạp của nó đã ở một level hơn hẳn các công cụ quản lý source code khác.

Vậy nên mọi người đã cố gắng tạo ra những workflow với Git, để mọi người có thể dễ dàng làm theo mà không cần hiểu quá
rõ về Git. Một vài workflow phổ biến có thể kể đến như Gitflow, GitHub flow, GitLab flow.
Google và Facebook cũng chọn cho mình lối đi riêng với **Trunk-Based Development**.
Hôm nay mình sẽ cùng xem mô hình này có gì hay ho nhé.

Tất nhiên là nghe thì ngầu nhưng mấy thứ mà những công ty siêu to như Google với Facebook sử dụng chưa chắc đã phù hợp
cho bạn. Vì có thể nó được chọn để giải quyết những vấn đề mà với bạn vốn không hề tồn tại. Ví dụ như bạn không hề có
hàng chục nghìn developer cùng nhau làm việc trên một cái monorepo khổng lồ chứa hàng trăm project với hàng tỉ dòng
code chẳng hạn 🤷‍♀️.

## Giải thích

Nhánh là một khái niệm cốt lõi của Git và các workflow của Git cũng xoay quanh việc tạo ra tiêu chuẩn cho cách đặt tên
nhánh, cách tạo nhánh cho release, phát triển... Vậy nên nó còn được gọi là *Git branching model*.

Để ví dụ thì Gitflow xoay quanh 2 nhánh *master* và *develop* và các nhánh *feature*.
GitLab flow thì xoay quanh các nhánh môi trường *production*, *staging*...

Trunk-based development thì lại là một mô hình hoàn toàn ngược lại.
Core concept của nó là *trunk* (thân cây) thay vì nhánh như các mô hình khác.
Trong mô hình này tất cả mọi người sẽ commit vào một nhánh chính duy nhất (trunk) thay vì nhiều nhánh cho các tính năng
hoặc môi trường khác nhau.

![](https://images.viblo.asia/5977e2e4-9a42-478e-ba1d-2cc25b5c8086.png)

Nếu đã từng dùng SVN có thể bạn sẽ thấy mô hình này nghe khá quen.
Trước khi code thì pull code mới nhất về.
Code xong chỗ nào chạy được thì commit luôn.
Không bao giờ phải quan tâm đến mấy vấn đề branch đau đầu.

Có hẳn 1 trang web giải thích về mô hình này ở đây để mọi người đọc nhé:
[https://trunkbaseddevelopment.com](https://trunkbaseddevelopment.com)

## Cách thực hiện

Cơ bản thì trunk-based development khiến bạn không cần quan tâm đến branch nữa nên chả có gì để giải thích giống như
mấy mô hình kia, mọi người đơn giản là code xong rồi thì commit hoặc tạo pull request vào cùng một nhánh thôi ?? 😃 ??.

Thật ra continous integration mới chính là mục tiêu chính của mô hình này.
Project mình từng tham gia hay có những tính năng siêu to làm cả tháng mới xong nên phải làm ở một nhánh riêng.
Hay là kế hoạch release mỗi tuần 1 tính năng nên dự án có cả chục branch cho mỗi ngày release khác nhau.
Lúc làm xong merge nó lại vào nhánh chính là muốn bay não luôn 🤯.
Xong rồi lỡ merge pull request vào nhầm nhánh và phải đi fix nữa 😱.
Và quan trọng là cùng lúc chỉ deploy được 1 nhánh để test nên sau khi merge xong QA test lại ra 1 đống bug nữa và lại
mất thêm cả tuần để fix 🙄.
Câu chuyện đau não kéo dài mãi mãi không bao giờ kết thúc.

Rồi sau khi test xong xuôi merge vào thì khách hàng lại bảo thôi, chưa muốn tính năng đấy nên tạm thời ẩn đi nhé.

**(┛◉Д◉)┛彡┻━┻**

May mà có anh hàng xóm chỉ cho mình về cái này nên mình mới được an ủi chút chút ┬─┬ノ(ಠ_ಠノ)

Mới nghe thì có thể bạn thấy mô hình này sẽ khiến code của mình như một mớ lẫn lộn cả các tính năng đang làm dở,
tính năng đang test dở với code production.
Nhưng thật ra đằng nào thì chỗ code đang làm dở đó cũng cần được tích hợp vào.
Hoặc bạn làm bây giờ khi nó mới có vài (chục) thay đổi, hoặc là đợi đến khi làm xong với mỗi branch hàng trăm thay đổi
và rơi vào cái bẫy như ở trên.

Sẽ không có chuyện code của nhánh này không tương thích với nhánh kia nữa vì chỉ có một nhánh, và mọi vấn đề không tương
thích sẽ được phát hiện và fix từ sớm thay vì đến lúc làm xong xuôi cả rồi tích hợp vào thì mới phát hiện ra.

Bạn cũng không cần lo đau đầu vì merge nhầm branch hay merge xong thấy mấy trăm cái conflict phải đi fix nữa.
Vì chỉ có một nhánh nên QA cũng sẽ dễ cover hơn là cùng lúc test nhiều nhánh hoặc là làm xong xuôi hết rồi mới test.

Mọi vấn đề mình từng gặp phải được giải quyết một cách đơn giản.
Nếu có vấn đề với branch thì không dùng branch nữa là vấn đề trở thành không tồn tại thôi 🙄.

### Feature flag

Mục đích của git branch là để phát triển các tính năng khác nhau cùng lúc mà không ảnh hưởng đến nhau.
Với trunk-based development thì không còn nhánh nữa nên chúng ta sẽ dùng feature flag để bật/tắt các tính năng đang
phát triển dở dang. Hiểu đơn giản là dùng if/else thôi 😃.

Mỗi người sẽ có những flag riêng để bật tính năng mình đang phát triển lên.
Khi đã phát triển xong thì sẽ bật flag đó lên cho tất cả mọi người.
Nếu có vấn đề thì chỉ cần tắt đi là xong, không cần lo làm thế nào để rollback/revert nữa.

### Release

Các git workflow cũng thường định nghĩa cả quy trình và branch cho release nữa.
Đối với trunk-based development thì chúng ta cũng có những branch *release*.

Đến khi code đã ổn và chuẩn bị release, một branch release sẽ được checkout và test có thể được thực hiện trên branch này.
Nếu có vấn đề thì sẽ được fix ở nhánh chính sau đó cherry-pick sang nhánh release.

![](https://images.viblo.asia/4533f57d-716c-48ea-b7c5-68c7f4dbc050.png)

Các vấn đề về môi trường, hotfix... đều được giải quyết khá đơn giản theo cách này.

## Best practices

Nghe thì có vẻ đơn giản hơn các workflow khác vì đã loại bỏ hoàn toàn rắc rối với branch, nhưng thực ra mô hình này
giống như kiểu TDD, vấn đề hoàn toàn không nằm ở quy trình mà ở con người.
Mỗi developer trong team đều cần có kĩ năng và tuân thủ những quy luật nhất định.
Dưới đây là một vài best practice mà team cần tuân theo để đảm bảo mô hình này hoạt động.

### Phát triển từng tính năng nhỏ

Thử tưởng tượng bạn đang làm tính năng của mình và làm xong thì phát hiện ai đó vừa xóa hoặc thay đổi hết hơn chục
cái function mà bạn cần dùng xem 🙄.

Vì bây giờ mọi người đều commit vào cùng một branch nên việc code được update thường xuyên rất quan trọng.
Bạn cần phải chia công việc thành những phần nhỏ hơn.
Mỗi commit có thể không hẳn là một tính năng mà chỉ là một phần của tính năng thôi.

Commit nhỏ sẽ giúp việc review dễ dàng hơn.
Commit thường xuyên sẽ giúp bạn dễ dàng tích hợp code mới, sớm phát hiện vấn đề.

### Review code cẩn thận

Vì code của mọi người giờ đều nằm ở một chỗ nên nếu code của ai đó có lỗi thì tất cả mọi người đều sẽ bị lỗi thay vì chỉ
nằm trong một branch như trước.
Vậy nên code cần được review cẩn thận trước khi merge vào nhánh chính.

Như đã nói ở phần trên thì việc commit từng phần nhỏ và thường xuyên sẽ giúp quá trình review dễ dàng hơn.

### Sử dụng CI

CI chính là phần quan trọng nhất của mô hình này.
Mọi người sẽ commit thường xuyên hơn nên CI pipeline cần đảm bảo chạy trong thời gian đủ ngắn để quá trình phát triển
không bị gián đoạn vì phải ngồi chờ CI chạy.

Sử dụng CI cùng với review code cẩn thận để code trong branch chính luôn hoạt động.