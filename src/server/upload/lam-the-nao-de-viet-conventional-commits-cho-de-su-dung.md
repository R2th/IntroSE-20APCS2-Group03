## Văn vở

Hôm nay là một ngày mưa tầm tã (mấy hôm rồi chứ không riêng hôm nay, khéo lụt mất). Lại 1 ngày dài trôi qua, hoài niệm về 1 tương lại xa xôi xem mình thành người như thế nào, học hỏi được những gì. Đang mơ tưởng thì chợt nhớ nay phải ngồi ngâm cứu áp dụng convention commit để áp dụng cho chuẩn hơn. Cũng vừa lúc team mình vừa áp dụng chuẩn này cho tất cả các dự án. Vậy là mình lao vào ngâm cứu, và đây là thành quả ngâm cứu của mình, mình chia sẻ lại cho mọi người. 

![](https://images.viblo.asia/973a71b2-e116-4c98-aa58-b4d4c66b26d3.jpg)

Lúc trước, khi còn cắm đầu đi học, có rất nhiều thứ sẽ không được dạy trên trường, nhiều thứ không mấy liên quan nhưng lại khá thực tiễn trong công việc lập trình đó là việc viết commit message git. Từ trước đến giờ mình cũng commit linh tinh lắm, không theo một chuẩn nào cả, chủ yếu theo chức năng của đoạn code đó làm những gì.

![](https://images.viblo.asia/42f9dd8f-ea84-4043-a71f-83f7afe35f4c.png)

Sau này có lúc tìm lại những pull đã từng đẩy mà khó lọc quớ, chịu lun =)). Nhưng do đợt này theo chuẩn nhiều quá, nên cũng học đòi theo chuẩn các thứ cho bằng bạn bằng bè. Ví dụ ngày trước mình hay commit như sau:

```
Ticket: ABC98123
Do: Thêm validate kiểm tra điều kiện thêm mới của A
=> commit message: [ABC98123] Thêm validate kiểm tra điều kiện thêm mới của A
```

## Conventional Commits

Thực ra là không có cách viết nào là đúng và cũng không có cách viết nào là sai cả, bởi nó cũng chỉ là 1 một dung text cho việc thể hiện thôi. Do vậy nếu bạn có commit "abc" thì cũng không có sao hiện tại, nhưng tương lại thì có đấy. Tuy nhiên, nếu trong một project mỗi người viết commit message một kiểu thì khi nhìn vào commit history nó cũng khá giống 1 mớ bùi nhùi, tệ =)). Chưa kể khi cần chúng ta cần tìm kiếm và xem lại commit trong đống commit của vài tháng trước đó thông qua các commit message mà không có bất cứ quy tắc nào:

* Đọc commit message mà không phán đoán được commit đấy sinh ra với mục đích gì.
* Không tóm lược các thay đổi trong code
* Không theo 1 quy tắc nào nên việc tìm kiếm nhanh gần như bất khả thi

## Vậy tại sao cần một tiêu chuẩn chung cho các commit messages

* Các dev trong cùng 1 dự án có thể hình dung được bao quát được nội dung code thay đổi làm công việc chính là gì, tiện coho việc review đánh giá
* Lưu giữ đầy đủ thông tin có thể tìm kiếm và kiểm chứng được trong hệ thống
* Tránh lan man không hiểu mục đích

-Các quy tắc này có tính tương đối tùy từng dự án (dựa trên thuyết tương đối của Albert Einstein =)) ). Với mỗi một dự án ở tùy từng công ty thì việc đặt convension này cũng khác nhau. Do vậy trước khi tham gia vào dự án này các bạn nên hỏi rõ về convension để code cho chuẩn. Tuy nhiên đây là một chuẩn chung có thể áp dụng cho các commit.

-Conventional Commits là một bộ quy tắc viết commit message sinh ra với mục đích để cả người đọc được và các công cụ máy tính có thể tìm kiếm. Nó cung cấp một bộ quy tắc dễ dàng để tạo lịch sử commit rõ ràng. Bộ quy tắc này tương khớp với [SemVer](https://semver.org/) (Semantic Version) bởi cách nó mô tả các feature, fix bugs hay là refactor code, ... 

-Conventional commits được áp dụng rất nhiều trong repository, đặc biệt là những project open source khi có sự đóng góp rất nhiều contributors. Bạn có thể tham khảo việc thực hiện conventional commits trong một số project open trên github vd: [OpenEdx](https://github.com/edx/edx-platform/pulls).

## Các nguyên tắc viết commit message

Dưới đây là những nguyên tắc viết commit message hiệu quả.

* Bắt đầu message title ngắn gọn nhằm tóm tắt được mục đích commit
* Tiếp sau message title bằng một động từ ra lệnh mô tả hành động: Add, Drop, Fix, Refactor, Optimize, v.v…
* Sử dụng tối đa 50 kí tự để mô tả commit message
* Không dùng dấu . để kết thúc
* Phân tách message tittle với message body bằng một dòng trắng
* Sử dụng message body để mô tả thông tin cụ thể hỗ trợ tìm kiếm lại. Nếu mô tả task trong hệ thống quản lý task đã đầy đủ và cụ thể thì chỉ ghi lại các thông tin quan trọng bằng keyword kèm nội dung như (Importance: ..., References: ... , Supersedes: ..., Obsoletes: ..., See-Also: ..., v.v…)

## Cấu trúc của commit message

Dưới đây là cấu trúc chung của một commit message theo conventional:
```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Trong đó:

* Các thành phần type, description là bắt buộc cần có trong commit message, optional là tùy chọn có hoặc không có cũng được
* type: từ khóa để phân loại commit là feature, fix bug, refactor.
* scope: cũng được dùng để phân loại commit, vùng ảnh hưởng của commit, trả lời câu hỏi: commit này refactor|fix cái gì? được đặt trong cặp ngoặc đơn ngay sau type. VD: feat(authentication):, fix(parser):
* description: là mô tả ngắn về những gì sẽ bị sửa đổi trong commit đấy
* body: là mô tả dài và chi tiết hơn, cần thiết khi description chưa thể nói rõ hết được, có thể thêm phần ghi chú bằng các keyword
* footer: một số thông tin mở rộng như số ID của pull request, issue.. được quy định theo conventional

Một số ví dụ ngắn gọn:
```
feat: add validate of A feature

fĩx: fix die dashboard page

feat(feature_a): add validate of A1 feature
```

## Type theo conventional commit

Một số type phổ biến được khuyên sử dụng bao gồm:

* `feat`: thêm một feature
* `fix`: fix bug cho hệ thống, vá lỗi trong codebase
* `refactor`: sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
* `docs`: thêm/thay đổi document
* `chore`: những sửa đổi nhỏ nhặt không liên quan tới code
* `style`: những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
* `perf`: code cải tiến về mặt hiệu năng xử lý
* `vendor`: cập nhật version cho các dependencies, packages.

Ngoài ra, với mỗi dự án type này chúng ta có thể custom thêm được theo ý định (vì cũng chỉ để phân loại thôi), vd: Optimize, Bump, Drop, ...

> Note: Cái này quan trọng, dĩ nhiên phải làm rồi là nội dung của commit phải phù hợp với tương tác và ảnh hưởng của đoạn code được sửa trong commit. Chứ ko phải kiểu fix bug => ghi là feat =)). Rất khó để đọc và hiểu.

## Một số công cụ

* [VSCode Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) Công cụ hỗ trợ việc commit trong VSCode theo chuẩn
* [commitlint](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) Công cụ kiểm tra commit message


-----


## Tổng kết lại

Như trong bài viết đã trình bày, các quy tắc trong Conventional Commits quả thật là rất đơn giản và dễ áp dụng đúng không? Chúc các bạn áp dụng và có những commit dễ đọc và sử dụng nhất để cho chuyên nghiệp. Nếu bạn thấy bài viết này hữu ích, đừng quên nhấn nút Share để chia sẻ tới các bạn bè của mình nhé. Cảm ơn các bạn đã đọc bài viết của mình!