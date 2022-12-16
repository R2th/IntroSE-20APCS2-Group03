Bạn đã từng bao giờ tự hỏi tại sao với các dự án khác nhau thì các nhánh mặc định trong dự án của bạn lại khác nhau chưa ? Tại sao có dự án thì nhánh mặc định là `master`, nhưng có dự án nhánh mặc định là `develop`? Tại sao mọi người thường phải làm như vậy ? Trong bài viết này, mình sẽ giới thiệu về cách chia nhánh hiệu quả với Git trong các dự án thực tế. 
![](https://images.viblo.asia/92f9848e-a1a0-44b7-a757-50de1f574847.png)

# Chiến lược nhánh là gì ?
![](https://images.viblo.asia/bad6aab2-e12b-4a7d-ac79-dfe58b357204.png)

Muốn trả lời được câu hỏi này, bạn cần trả lời những câu hỏi sau:

* Từ nhánh nào bạn tách ra cho 1 nhánh để dựng feature ?
* Sau khi code xong, tại nhánh nào bạn sẽ tạo 1 MR(Merge Request)/PR(Pull Request) cho việc review code và test ?
* Sau khi code review xong, thì nên merge vào nhánh nào ?

Sau đây là 1 vài lời khuyên trong chiến lược  nhánh :
* Nhánh mà nên cắt để dựng feature nên là nhành ổn định của sản phầm của ban
*  Bạn không nên merge code chưa đươc review, test bug
*  Trong khi merge code, có thể bạn sẽ găp conflict, như vậy nên preview conflict trước khi merge

Mục đích của chiến lược nhánh đó là việc tăng tính ổn định của code, năng suất làm việc của dev và không để xảy ra những conflict không cần thiết. 

Thông thường các nhánh `master`, `develop`, `feature` sẽ được sử dụng nhiều nhất. 

## master
* Chúng ta có thể gọi đây là nhánh sản phẩm. Những code được test kĩ và ổn định nhất sẽ nằm trên nhánh này. 
* Đây là nhánh mà bản release trước đó đã ở đó, và bản release sẽ ở đây
* Chúng ta có thể quy trình dựng sẵn để release nhánh này ( Ví dụ khi branch này merge 1 commit mới việc tự động build, release sản phẩm )
* Nhánh này nên chỉ chấp nhận merge từ nhánh `develop`

## develop
* Là nhánh ở level thấp hơn so với `master`
* 1 dev khi bắt đầu 1 feature thường chia nhánh ra từ nhánh này
*  Ờ thời điểm release, 1 merge sẽ đi từ branch này đến branch master. Nhánh master là nhánh được release.

## feature
* Nhánh được tách ra từ nhánh `develop`, để dựng feature cho đợt release tiếp theo
* Thông thường 1 dev sẽ làm việc trên 1 feature branch

## QA testing
Có vẻ chúng ta đã bỏ lỡ 1 điều, đó là việc QA test. QA test nên diễn ra ở nhánh nào ? Hay nói cách khác, nhánh nào sẽ được deploy cho việc test của QA ?
Cách tiếp cân đơn giản nhất là có 1 môi trường cho QA test từ nhánh dev.
![](https://images.viblo.asia/fd50a119-ddfa-4232-87a1-3eeceddbfa88.jpeg)

 **Pros**n
*  Trước mỗi bản release, mọi sự thay đổi có thế thông qua 1 lần build/deploy
*  Kiểm thử sau feature, đây là nhánh tốt nhất để có thể có 1 regession test, cũng như sự thay đổi của nhánh này được lên dkế hoach cho những đợt release sắp tới. 

 **Cons**
 Nếu có bug ở 1 trong những nhánh feaure, sẽ dẫn đến việc QA test bị khóa lại ảnh hưởng đến tiến độ của cả team
 
 ## Giải pháp
 
### Giải pháp số 1: 
Chờ người làm feature đó fix bug, merge nó tới nhánh develop, deploy lại cho bên QA và tiếp tục việc test. Nhưng điều này không hợp lí vì chúng ta không biết khi nào bug sẽ được fix xong. 

* Tất nhiên tiến độ bên QA cũng sẽ bị giảm đi

### Giải pháp số 2:
Revert lại phần thay đổi từ feature và tiếp tục việc test. Cách này có thể làm tiến độ cả team tốt hơn nhưng có thể gây khó khăn cho người làm feature. Do revert lại sự thay đổi nên sẽ sinh ra 1 revert commit revert tất cả thay đổi trong nhánh đó. Nếu họ cố gắng merge lại sau khi fix lỗi, git sẽ xem đó là 1 commit fix được merge cho nhánh `develop`, vì các commit cũ đã có trong lịch sử commit. Để giải quyết vấn đề này, dev cần revert của revert commit. 

### Giải pháp số 3:
Cách đơn giản nhất là `force-push` từ nhánh `master` -> `develop`. Và deploy các feature khác cho bên QA cho việc test

## Cách tiếp cận tốt nhất 
Có thêm 1 nhánh cho việc QA testing. Như vậy có nhiều bước được thêm vào trong trường hợp này, và chu trình tổng thể như sau:

* Chia nhành từ `develop`
* Sau khi phát triển raise lên 1 MR/PR cho việc review code và testing
* Sau khi review code, merge nó tới nhánh QA
* QA thực hiện 1 feature test và raise lên 1 MR/PR tới `develop`
* Như vậy có 1 vòng thứ hai cho việc review và test 
* Khi nhánh `develop`, QA thực hiện 1 regression testing

![](https://images.viblo.asia/7c091a68-df06-4bbd-93ab-415f313d645c.jpeg)

**Lợi ích của cách này**
Mặc dù cách này trông giống 1 cách trước và việc chia nhánh có vẻ không có lợi, nhưng nó sẽ giúp tăng hiệu suất cả team như sau: 
* Bạn có feature testing từ môi trường QA, và 1 regression testing từ nhánh develop
* Nhánh `develop` luôn ổn định mà developer có thể chia nhánh từ đó bắt cứ lúc nào
* Bạn sẽ không bị spam trong commit history của nhánh `develop`
* Hotfix: Trong trường hợp có lỗi, chia nhánh từ `master` và fix nó


Chúc các bạn có cách làm việc hiệu quả với nhánh trong Git

# Tham khảo
https://www.atlassian.com/git/tutorials/using-branches
https://medium.com/better-programming/efficient-git-branching-strategy-every-developer-should-know-f1034b1ba041