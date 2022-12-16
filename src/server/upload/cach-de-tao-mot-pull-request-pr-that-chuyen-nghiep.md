# Tại sao chúng ta cần một pull request "tuyệt vời"
Nếu PR của bạn được mô tả chính xác, người đánh giá sẽ dễ dàng hơn trong việc đọc và hiểu. Việc đánh giá thực sự khá khó, vì vậy sẽ thực sự hữu ích nếu PR của bạn rõ ràng.

Ok, nhưng bạn có thể hỏi: Tại sao tôi phải quan tâm? Chà, các PR đầy đủ có lợi cho nhóm, dự án và cả chính bạn. Đây là lý do tại sao:
* Bạn nhận được đánh giá lại nhanh hơn. 
* Ít có khả năng PR của bạn bị từ chối hoặc đơn giản là bị "trôi đi". 
* Nhiều khả năng sẽ phát hiện được bất kỳ vấn đề nào, giúp bạn tránh khỏi các lỗi đến từ tester một vài ngày sau đó.

Các PR tuyệt vời giúp tiết kiệm thời gian và có tác động tích cực đến code tổng thể và chất lượng sản phẩm. 

Ok, vậy làm thế nào để tạo ra các PR tuyệt vời? Bắt đầu bằng cách làm cho chúng nhỏ hơn!

# Tạo những pull request nhỏ
Tại sao? Câu trả lời rất đơn giản: Các PR nhỏ được xem xét nhanh chóng. Các PR lớn khó đánh giá hơn vì chúng thường bao gồm nhiều bản sửa lỗi hoặc kết hợp các bản sửa lỗi với tối ưu code hoặc thay đổi code style.

Xử lý một đống những đoạn code phức tạp là một việc khó khăn. Nguời đánh giá phải xem xét càng lâu thì khả năng bỏ sót điều gì đó càng cao. Bởi vì năng lực nhận thức và thời gian của người đánh giá là có hạn, chất lượng đánh giá sẽ giảm đi cùng với sự gia tăng của kích thước PR. Điều này thường dẫn đến việc các PR lớn được lướt qua thay vì được xem xét đúng cách.

Vấn đề trở nên rõ ràng hơn nhiều trên các dự án lớn hơn và đặc biệt là trong các dự án mã nguồn mở với nhiều người làm. Hầu hết những người bảo trì có công việc khác và có thể không có thời gian để đáp ứng các PR lớn hoặc phức tạp. Vì vậy, PR lớn của bạn có thể bị từ chối thẳng thừng hoặc chỉ ở đó, bị lãng quên mãi mãi.

Vì vậy, hãy thực hiện các PR nhỏ để đảm bảo rằng chúng không đòi hỏi người đánh giá phải mất nhiều thời gian và sự chú ý. Nhưng một PR nhỏ phải nhỏ đến mức nào? Một nguyên tắc nhỏ là thực hiện một PR về một việc duy nhất.

# Giải quyết từng việc một
Nếu một PR chứa một số bản sửa lỗi và thậm chí cả những thay đổi không liên quan khác như tối ưu code, thì việc đánh giá không chỉ phức tạp mà còn khó kiểm tra. 

Nhưng điều gì sẽ xảy ra nếu tôi đã sửa một lỗi, tối ưu lại một số code và khắc phục một số vấn đề về code style? Có thể bạn sẽ hỏi như vậy.

Hmm. Tốt nhất vẫn nên chia PR quái dị này thành nhiều PR nhỏ hơn. Một PR chỉ để sửa lỗi, một PR khác bao gồm tối ưu code và cuối cùng là PR thứ ba chỉ với những thay đổi về code style.

Nghe có vẻ như rất nhiều việc phải làm, nhưng nó thực sự có hiệu quả, một khi bạn đã xử lý xong quy trình. Khi bạn tách các PR của mình một vài lần, bạn sẽ bắt đầu nghĩ về nó khi code. Cuối cùng, bạn sẽ hình thành thói quen đưa ra các PR nhỏ hơn, ngắn gọn hơn. Điều này sẽ làm cho công việc của mọi người trong team trở nên dễ dàng hơn rất nhiều.

# Hãy mô tả
Một PR bắt đầu bằng một tiêu đề. Làm cho tiêu đề rõ ràng. Nó phải ngắn gọn và bao quát. Một người mới tham gia dự án nên hiểu được PR là gì. 

Ví dụ: “Fixed navigation panel not being visible on a user’s profile page” là một tiêu đề hay. Tuy nhiên, nhiều lúc nó lại như thế này:
* “Fix: UI1-123”
* “UI Fixes”
* “Profile fix”
* “Navigation fix”

Bên cạnh một tiêu đề, một mô tả đầy đủ cũng rất quan trong. Mục đích của mô tả là để hỗ trợ người đánh giá. Với tư cách là người đánh giá, tôi muốn biết nội dung của PR là gì, tại sao bạn gửi nó và cách nó thực hiện những gì nó phải làm. Vì vậy, tôi có thể hiểu ý nghĩa của việc merge PR này và cách xác minh xem nó có hoạt động như mong đợi hay không.

Vì vậy, một mô tả cần có đủ cá yếu tố sau:
* what: PR nói về cái gì 
* why: tại sao bạn làm nó 
* how: cách nó thực hiện những gì nó phải làm, nêu chi tiết về thiết kế, cách nó có thể được kiểm tra hoặc xác minh.

Xem chi tiết hơn về **what, why** và **how** ở bên dưới.

# What, Why and How
Trong phần **What**, chúng ta có thể chỉ định PR làm gì. Nó không cần phải quá chi tiết nhưng phải cho biết đây có phải là một tính năng mới, sửa lỗi, refactor hay thứ gì khác hay không. 

Việc cung cấp tổng quan chung về phạm vi thay đổi cũng rất hữu ích. Những thứ như phần nào của giao diện người dùng mà nó thay đổi, nó có thay đổi logic nghiệp vụ theo bất kỳ cách nào không, giới thiệu các API hoặc cấu trúc dữ liệu mới.

Phần **Why** phải giải thích lý do tại sao bạn thực hiện PR này. Nếu đó là một bản sửa lỗi thì rất có thể đó là điều hiển nhiên, nhưng sẽ không có hại gì khi đề cập đến cách điều này phù hợp với một bức tranh lớn hơn. Ví dụ: cải tiến hiệu suất hoặc thay đổi cấu trúc có thể làm cho một tính năng mới khả thi hoặc giúp giải quyết các lỗi khác. 

**How** là tất cả các chi tiết rõ ràng trong PR của bạn. Về cơ bản, bất cứ điều gì có thể giúp người đọc hiểu quá trình suy nghĩ của bạn khi thực hiện một thay đổi cụ thể đều hữu ích. Điều này bao gồm giải thích về bất kỳ quyết định hoặc thỏa hiệp nào mà bạn đã thực hiện, cũng như bất kỳ điều gì giúp người đánh giá xác minh xem thay đổi đã được thực hiện đúng hay chưa hoặc thậm chí kiểm tra thủ công PR của bạn nếu cần. Vì lý do tương tự, khi thực hiện các thay đổi có ảnh hưởng đến giao diện người dùng, sẽ hữu ích khi bao gồm ảnh chụp màn hình “trước” và “sau”.

Lý thuyết vậy là đủ! Bây giờ chúng ta đã biết những gì chúng ta có thể viết trong mỗi PR. Hãy tạo một mẫu cho nó để có thể sử dụng lại mỗi khi chúng ta gửi PR mới.

# Tạo mẫu pull request
Github cho phép chúng ta tạo mẫu PR, mẫu này sẽ điền trước mô tả PR mới với cấu trúc của chúng ta và bất kỳ chi tiết bổ sung nào để hướng dẫn tác giả PR viết mô tả. 

Điều tuyệt vời về các mẫu PR là chúng được lưu trữ, vì vậy bất kỳ ai tạo PR sẽ nhận được mô tả được điền sẵn từ cùng một mẫu. Hoàn hảo cho các nhóm và các dự án mã nguồn mở.

Vì vậy, để giúp công việc của mọi người trở nên dễ dàng hơn, hãy cố gắng tạo một mẫu PR. Chúng ta sẽ viết mẫu của mình trong tệp Markdown và đưa vào kho lưu trữ. Bạn có thể đặt nó vào thư mục gốc nhưng tôi thích thêm nó vào một thư mục .github ẩn:
```
├── .github
│   └── pull_request_template.md
└── ...
```
Xem [Github docs](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/creating-a-pull-request-template-for-your-repository) để biết thêm chi tiết và các tùy chọn về cách tạo mẫu PR. 

Trên thực tế, **what**, **why** và **how** mang lại cho chúng ta một cấu trúc đẹp cho mẫu mô tả PR. Một trong số chúng có thể là một tiêu đề, giống như:
```
## What

## Why

## How
```
Tôi sẽ chia sẻ một mẫu PR mà tôi sử dụng. Nó cũng chứa một tiêu đề "Missed anything?" ở dưới cùng để các tác giả PR kiểm tra xem họ có bỏ sót điều gì quan trọng hay không, như cập nhật các kiểm thử, đính kèm ảnh chụp màn hình, v.v.
```
## What

What does the PR do?
Is it a bug fix, new feature, refactor, or something else?

## Why

Why this PR is needed?

## How

How is it doing what it does?
How to test, how to integrate, any relevant compromises, etc.?

### Changes details

- Detail one
- Detail two
  ...

## Missed anything?

- [ ] Explained the purpose of this PR.
- [ ] Self reviewed the PR.
- [ ] Added or updated test cases.
- [ ] Informed of breaking changes, testing and migrations (if applicable).
- [ ] Updated documentation (if applicable).
- [ ] Attached screenshots (if applicable).
```
Đó là tất cả! Sau khi bạn đẩy tệp mẫu .github / pull_request_template.md vào kho lưu trữ Github, mỗi lần bạn thực hiện một PR mới, mô tả của nó sẽ được điền sẵn với mẫu đó:

![](https://images.viblo.asia/ebfc5e00-b658-4c49-976b-13f3e2b2577e.png)
Và đây là kết quả:

![](https://images.viblo.asia/2c51ff9d-44e8-4046-84e9-56fd794c08a7.png)

Tóm lại. Nếu bạn thường tạo những PR lớn, hãy ghi nhớ điều này:
* PRs nhỏ là tốt hơn
* PR chỉ nên làm 1 việc
* Rõ ràng, phù hợp và chi tiết là rất quan trọng cho 1 PR

Nó thực sự tạo nên sự khác biệt 😁 Cách viết PR này giúp công việc của tôi dễ dàng hơn, cả khi đưa ra PR cũng như khi xem lại PR của người khác.