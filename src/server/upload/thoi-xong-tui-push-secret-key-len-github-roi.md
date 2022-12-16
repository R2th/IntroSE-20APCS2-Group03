![](https://images.viblo.asia/ce07c51d-f56f-4976-bad2-7c713b2196b8.jpg)

## Câu chuyện 1

Một ngày đẹp trời, bạn hăng say cột dự án, công việc hoàn thành suôn sẻ, bạn gửi Pull Request và ra về.

Đang sửa soạn đi về, bỗng có tiếng kêu thất thanh từ phía leader: "dờ heo, đứa nào push secret key lên github thế này ???????"

Từ git log, bạn hốt hoảng nhận ra chính mình chính là hung thủ, thôi xong, giờ làm sao đây ? 

## Câu chuyện 2

Dự án của công ty X lưu trữ trên một private repo, mọi người chỉ được phép fork về và tạo pull request. Mọi thông tin đều được giữ bí mật.

Một ngày nọ dev A xin nghỉ việc.

Để giữ lại những công sức code của mình, dev A âm thầm copy code của project về repo public của mình.

Cuối tháng công ty X bỗng thấy bị AWS charged 50 ngàn đô :scream:

Công ty ráo riết đi tìm nguyên nhân, cuối cùng phát hiện ra key AWS nằm trong repo public của nhân viên A đã nghỉ kia. Cạn lời.

## Bình luận

Không biết bạn có thấy thấp thoáng hình bóng của mình trong những câu chuyện trên đây hay không :smile: trong cuộc đời lập trình, có lẽ chúng ta ai cũng đã đôi lần mắc lỗi.

Và không phải ai cũng may mắn.

Có rất nhiều trường hợp những sản phẩm đang phát triển hay thậm chí đang chạy rồi bị lộ secret key, password, api key, private key, mnemonic hay nhiều thông tin nhạy cảm khác đã dẫn tới những thiệt hại hàng ngàn, thậm chí hàng triệu đô.

> Team mình cũng đã từng bị lộ, và thiệt hại khá lớn, xin phép không tiết lộ con số :sweat_smile: 

Có thể bạn chưa biết, nhưng trên internet luôn có những tool chạy 24/24 chỉ để scan những vụ lộ key như vậy trên các nền tảng lưu trữ thông tin như github hay gitlab, bitbucket...
Nhanh tới mức ta có thể mất tiền sau **chưa đầy 1 phút** khi bị lộ key.

Kể cả khi repo của chúng ta là private, thì nguy cơ vẫn còn từ chính yếu tố con người (câu chuyện 2).

Và việc bảo vệ key an toàn luôn là việc phải đặt lên hàng đầu, từ _suy nghĩ_ (mindset) cho tới _hành động_ (actions).

## Giải pháp

> Thế giờ làm thế nào để _không bị lộ secret key_ ?

Câu trả lời rất đơn giản: _không đưa secret key_ lên github hay bất kì nơi nào khác.

> Thế giờ ta lỡ đưa secret key lên rồi thì xử lý thế nào bây giờ?

Câu trả lời là _vô hiệu hóa_ và _xóa triệt để_ nó đi.

### Vô hiệu hóa

Nếu bạn đang dùng secret key, api key, hay password này ở bất cứ đâu, hãy ngay lập tức đổi password, vô hiệu hóa api key tại toàn bộ những service đang dùng.

Sinh ra cho mình một key/password mới, tuyệt đối không dùng cái cũ nữa.

### Xóa triệt để

Hồi mới lập trình và làm quen với git, ta rất hay gặp cách xử lý thế này: Nhanh chóng xóa file secret đi, làm một commit mới rồi push lên ? coi như chưa có gì xảy ra cả.

Đây là cách xử lý hoàn toàn sai lầm :joy: khi ta vào lịch sử commit, ta sẽ thấy file secret vẫn nằm nguyên trong commit cũ. Hi vọng là không còn ai trong chúng ta mắc lỗi sơ đẳng đó nữa. :joy:

Khi đã quen và có kinh nghiệm với git, ta biết rằng git lưu trữ lịch sử dạng cây, commit sau nối tiếp commit trước, có nghĩa là để thay đổi nội dung một commit, ta sẽ phải build lại toàn bộ lịch sử từ commit đó trở đi (nghe giống blockchain nhỉ).

Khi này ta có cách hiệu quả hơn lúc trước: Sử dụng các tool để build lại lịch sử commit, đảm bảo rằng file secret không chứa trong bất kì commit nào, rồi push force lên repo.

Có vài thứ hỗ trợ ta điều này: lệnh `git filter-branch` hoặc sử dụng một tool open source có tên là `BFG Repo-Cleaner`.

> Có một chú ý là do commit bị viết lại, nên toàn bộ các hash của chúng bị thay đổi. Điều này có thể gây ảnh hưởng tới những pull request hiện đang open trên repo. Vì thế ta nên merge hoặc close toàn bộ các pull request trên repo trước khi tiến hành remove file để thay đổi lịch sử commit.

## Xóa một file khỏi lịch sử commit

### 1.1 Sử dụng `BFG Repo-Cleaner`

Chúng ta sẽ tiến hành download và cài đặt theo trang chủ tại đây: [https://rtyley.github.io/bfg-repo-cleaner/](https://rtyley.github.io/bfg-repo-cleaner/).

`BFG Repo-Cleaner` là một tool được xây dựng và maintain bởi cộng đồng open sources. `BFG Repo-Cleaner` cung cấp một cách xóa các file không mong muốn một cách nhanh chóng, đơn giản với nhiều tùy chọn.

Ví dụ ta có thể xóa những file không mong muốn (chứa các thông tin nhạy cảm) mà vẫn giữ lại được commit cuối cùng như sau:

```sh
java -jar bfg --delete-files YOUR-FILE-WITH-SENSITIVE-DATA
```

Hoặc để replace text bên trong file `password.txt` chẳng hạn, ta có thể sử dụng lệnh sau:

```sh
java -jar bfg --replace-text passwords.txt
```

`BFG Repo-Cleaner` cung cấp cho ta rất nhiều tùy chọn khác nữa, có thể tham khảo thêm tại [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)

### 1.2 Sử dụng `git filter-branch`

Để minh họa về cách hoạt động của `git filter-branch`, ta sẽ làm một ví dụ xóa file chứa dữ liệu nhạy cảm trên một repo của chúng ta.

- clone repo về

```sh
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Initialized empty Git repository in /Users/YOUR-FILE-PATH/YOUR-REPOSITORY/.git/
> remote: Counting objects: 1301, done.
> remote: Compressing objects: 100% (769/769), done.
> remote: Total 1301 (delta 724), reused 910 (delta 522)
> Receiving objects: 100% (1301/1301), 164.39 KiB, done.
> Resolving deltas: 100% (724/724), done.
```

- vào trong repo

```sh
$ cd YOUR-REPOSITORY
```

- tiến hành xóa file trong lịch sử commit, nhớ thay `PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA` bằng file secret ta muốn xóa

```sh
$ git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch PATH-TO-YOUR-FILE-WITH-SENSITIVE-DATA" \
  --prune-empty --tag-name-filter cat -- --all
  > Rewrite 48dc599c80e20527ed902928085e7861e6b3cbe6 (266/266)
  > Ref 'refs/heads/master' was rewritten
```

- kiểm tra lại một lần nữa file đã bị xóa hoàn toàn tại tất cả các commit
- push force lại lịch sử commit

```sh
$ git push origin --force --all
> Counting objects: 1074, done.
> Delta compression using 2 threads.
> Compressing objects: 100% (677/677), done.
> Writing objects: 100% (1058/1058), 148.85 KiB, done.
> Total 1058 (delta 590), reused 602 (delta 378)
> To https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
>  + 48dc599...051452f master -> master (forced update)
```

- push force lại toàn bộ git tags để tránh lộ thông tin tại những [phiên bản release](https://help.github.com/en/articles/about-releases) của repo

```sh
$ git push origin --force --tags
> Counting objects: 321, done.
> Delta compression using up to 8 threads.
> Compressing objects: 100% (166/166), done.
> Writing objects: 100% (321/321), 331.74 KiB | 0 bytes/s, done.
> Total 321 (delta 124), reused 269 (delta 108)
> To https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
>  + 48dc599...051452f master -> master (forced update)
```

### 2. Đưa file secret vào gitignore

Sau khi đã xóa file secret khỏi repo, ta cần add file đó vào `.gitignore` để đảm bảo rằng sẽ không xảy ra việc lỡ commit một lần nữa.

```sh
$ echo "YOUR-FILE-WITH-SENSITIVE-DATA" >> .gitignore
$ git add .gitignore
$ git commit -m "Add YOUR-FILE-WITH-SENSITIVE-DATA to .gitignore"
> [master 051452f] Add YOUR-FILE-WITH-SENSITIVE-DATA to .gitignore
>  1 files changed, 1 insertions(+), 0 deletions(-)
```

### 3. Xóa github cached view

Ta đã xóa commit cũ, build lại lịch sử commit, file secret không còn tồn tại nữa, như vậy đã an toàn chưa?

Câu trả lời là CHƯA.

Thực tế github có một cơ chế, đó chính là `cached views`, dù trên repo không còn commit đó nữa, nhưng **nếu có commit hash, ta vẫn có thể xem được như thường**. Hoặc thông qua forks và pull request cũ ta vẫn có thể xem được toàn bộ thông tin của commit cũ, bao gồm cả file secret chúng ta đã push lên :astonished:

Bạn đọc có thể tự kiểm chứng lại điều này bằng cách như sau:

- mở commit cuối cùng của repo trên trình duyệt
- tại local xóa commit cũ đi (bằng git reset hoặc check out về commit trước)
- push force lên repo, đảm bảo trên repo không còn commit ở bước 1 nữa
- refresh trình duyệt tại bước 1, ta sẽ thấy nội dung commit vẫn còn nguyên vẹn như chưa từng có sự tẩy xóa nào ở đây.

Toang!!!

Xử lý đống này thế nào ? Github suggest cho chúng ta phương án cuối cùng, đó chính là liên hệ với [GitHub Support](https://support.github.com/contact) và [GitHub Premium Support](https://premium.githubsupport.com)  để họ tiến hành xóa cached views cũng như toàn bộ những tham chiếu tới dữ liệu nhạy cảm trong các pull request trên github.

Khi này code cũ mới thật sự biến mất khỏi repo của chúng ta.

> _Nhưng nó còn tồn tại trong database của github hay không thì....chỉ có github mới biết._

### 4. Collaborator tiến hành rebase code

Lúc này với team, hãy đảm bảo rằng những member khác (collaborators) sẽ update code mới nhất bằng `rebase`, chứ không phải bằng `merge`. Vì nếu dùng merge thì lịch sử cũ chứa commit có secret (trên máy của collaborators) sẽ được merge với lịch sử mới ta vừa build lại. Vậy là khi đưa lên mọi chuyện ta làm lúc trước sẽ thành công cốc.

Khi dùng `rebase`, lịch sử commit sẽ được đảm bảo là lịch sử mới bắt đầu từ commit ta build lại.

### 5. Xóa rác

Cuối cùng, khi đảm bảo mọi thứ chạy ổn định, ta sẽ remove tất cả những object backup mà ta tạo ra bởi `git filter-branch` ở trên, làm sạch git của chúng ta:

```sh
$ git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
$ git reflog expire --expire=now --all
$ git gc --prune=now
> Counting objects: 2437, done.
> Delta compression using up to 4 threads.
> Compressing objects: 100% (1378/1378), done.
> Writing objects: 100% (2437/2437), done.
> Total 2437 (delta 1461), reused 1802 (delta 1048)
```

## Kết luận

Tổng kết lại các bước xử lý như sau:

- Vô hiệu hóa toàn bộ các key, đổi password (đồng thời thông báo cho các bên liên quan cũng làm tương tự).
- Build lại lịch sử commit kể từ commit bị lộ secret.
- Đưa file secret vào `.gitignore`.
- Tiến hành `push force` để update lịch sử repo.
- Nhắn các collaborators hãy tiến hành rebase lại.
- Contact với [GitHub Support](https://support.github.com/contact) và [GitHub Premium Support](https://premium.githubsupport.com/) để xóa cached views cũng như toàn bộ references.
- Xóa rác để làm sạch git.

Hãy cẩn thận và luôn giữ key/password/mnemonic của mình an toàn. :smile:

Hãy coi mỗi commit của mình đáng giá hàng ngàn đô. :smile:

## Tham khảo

- https://help.github.com/en/articles/removing-files-from-a-repository-s-history
- https://help.github.com/en/github/authenticating-to-github/removing-sensitive-data-from-a-repository
- https://git-scm.com/docs/git-filter-branch
- https://git-scm.com/book/en/Git-Tools-Rewriting-History