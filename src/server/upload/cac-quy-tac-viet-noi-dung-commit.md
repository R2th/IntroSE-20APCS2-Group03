![](https://imgs.xkcd.com/comics/git_commit_2x.png)


-----


## Giới thiệu: Tầm quan trọng của nội dung commit
Nếu thử lướt qua ngẫu nhiên một số Git repository, bạn chắc chắn sẽ thấy nội dung commit của những repository này không khác gì một mớ lộn xộn. Thử so sánh hai ví dụ sau:

[Spring Framwork GitHub Log 1](https://github.com/spring-projects/spring-framework/commits/e5f4b49?author=cbeams)
```
$ git log --oneline -5 --author cbeams --before "Fri Mar 26 2009"

e5f4b49 Re-adding ConfigurationPostProcessorTests after its brief removal in r814. @Ignore-ing the testCglibClassesAreLoadedJustInTimeForEnhancement() method as it turns out this was one of the culprits in the recent build breakage. The classloader hacking causes subtle downstream effects, breaking unrelated tests. The test method is still useful, but should only be run on a manual basis to ensure CGLIB is not prematurely classloaded, and should not be run as part of the automated build.
2db0f12 fixed two build-breaking issues: + reverted ClassMetadataReadingVisitor to revision 794 + eliminated ConfigurationPostProcessorTests until further investigation determines why it causes downstream tests to fail (such as the seemingly unrelated ClassPathXmlApplicationContextTests)
147709f Tweaks to package-info.java files
22b25e0 Consolidated Util and MutableAnnotationUtils classes into existing AsmUtils
7f96f57 polishing
```

[Spring Framwork GitHub Log 2](https://github.com/spring-projects/spring-framework/commits/5ba3db?author=philwebb)
```
$ git log --oneline -5 --author pwebb --before "Sat Aug 30 2014"

5ba3db6 Fix failing CompositePropertySourceTests
84564a0 Rework @PropertySource early parsing logic
e142fd1 Add tests for ImportSelector meta-data
887815f Update docbook dependency and generate epub
ac8326d Polish mockito usage
```

Bạn sẽ muốn đọc nội dung của ví dụ nào hơn?

Nội dung các commit của ví dụ đầu khác nhau về độ dài và cách thức thể hiện; Trong khi ở ví dụ sau thì lại ngắn gọn và nhất quán.

Những gì xảy ra ở ví dụ đầu tiên hoàn toàn là tự nhiên; Trong khi ở ví dụ sau là có chủ đích.

Dù nhiều repository có log giống với ví dụ đầu thì cũng có những trường hợp ngoại lệ. [`Linux kernel`](https://github.com/torvalds/linux/commits/master) và [`Git itself`](https://github.com/git/git/commits/master) là những ví dụ điển hình. Ngoài ra có thể kể đến [`Spring Boot`](https://github.com/spring-projects/spring-boot/commits/master) hay các repository được quản lý bởi [`Tim Pope`](https://github.com/tpope/vim-pathogen/commits/master).

Những người đóng góp cho các repository này hiểu được rằng một commit có nội dung với cấu trúc hợp lý sẽ là cách tốt nhất để truyền tải ngữ cảnh về các thay đổi đối với những lập trình viên khác (và tất nhiên là với chính họ trong tương lai). Câu lệnh diff có thể chỉ ra những thay đổi nhưng chỉ có nội dung commit mới trả lời được câu hỏi tại sao. Peter Hutterer có đưa ra một quan điểm khá hay như sau:

> Re-establishing the context of a piece of code is wasteful. We can’t avoid it completely, so our efforts should go to reducing it [as much] as possible. Commit messages can do exactly that and as a result, a commit message shows whether a developer is a good collaborator.

> Tạm dịch: Việc thể hiện lại ngữ cảnh của một đoạn code là lãng phí công sức và thời gian. Chúng ta không thể tránh khỏi điều này một cách hoàn toàn được. Vì vậy, nỗ lực của chúng ta là giảm thiểu nó ở mức có thể (càng nhiều càng tốt). Nội dung commit có thể thực hiện chính xác điều này và như một kết quả tất yếu, nội dung commit sẽ thể hiện lập trình viên đó có phải là một cộng sự tốt hay không.

Nếu chưa quan tâm tới việc làm thế nào để tạo nên một nội dung Git commit hợp lý, thì có thể do bạn chưa dành nhiều thời gian sử dụng `git log` và những công cụ liên quan. Có một vòng luẩn quẩn ở đây: bởi lịch sử commit không có cấu trúc và thiếu nhất quán, người ta sẽ không dành nhiều thời gian để sử dụng và quan tâm đến nó. Và bởi vì nó không được sử dụng và quan tâm một cách chính đáng nên nó tiếp tục trở nên không có cấu trúc và thiếu nhất quán.

Log được chăm chút sẽ nhìn rất thuận mắt và hữu ích. `git blame`, `revert`, `rebase`, `log`, `shortlog` và những câu lệnh phụ khác khi đó sẽ được sử dụng nhiều hơn. Việc nhìn lại commit và pull request của người khác sẽ đáng để làm hơn và vô tình có thể được thực hiện một cách độc lập. Việc hiểu tại sao một điều gì đó đã xảy ra cách đây hàng tháng hoặc hàng năm không chỉ là không thể mà còn đầy đủ và hữu ích.

Sự thành công lâu dài của một dự án phụ thuộc một phần vào khả năng bảo trì. Và một người bảo trì có những công cụ hữu hiệu hơn là log của dự án. Việc dành thời gian để tìm hiểu các công cụ này là rất đáng để làm. Điều có thể rắc rối lúc ban đầu sẽ sớm trở thành một thói quen và thậm chí là khởi nguồn của sự tự hào và hiệu suất của mọi điều liên quan.

Bài viết này sẽ chỉ ra yếu tố cơ bản nhất để giữ cho lịch sử commit luôn được hợp lý: đó là cách viết nội dung của một commit đơn thuần.

Hầu hết các ngôn ngữ lập trình đều có những quy tắc được đề ra như là đối với việc cấu thành nên phong cách ngữ nghĩa thông qua việc đặt tên, định dạng,... . Có sự khác nhau giữa những quy tắc này, tuy nhiên, hầu hết các lập trình viên sẽ thống nhất một quy tắc và gắn bó với nó thay vì sự hỗn loạn xảy ra khi mỗi người làm một kiểu.

Cách tiếp cận của một team đối với commit log cũng như vậy. Để tạo nên một lịch sử revision hữu ích, các team nên thống nhất một quy tắc viết nội dung commit được định nghĩa gồm ba điều sau:

**Phong cách viết** : Cú pháp đánh dấu, căn lề, ngữ pháp, hoa thường, chính tả. Làm rõ ràng những điều này, loại bỏ sự suy đoán và khiển nó trở nên đơn giản nhất có thể. Kết quả cuối cùng là một bản log không chỉ dễ đọc mà còn có thể đọc thường xuyên.

**Nội dung**: Loại thông tin gì sẽ nên được thể hiện trong phần thân của nội dung commit? Loại thông tin gì thì không nên được thể hiện?

**Metadata**: Các thông tin như tracking IDs, số hiệu pull request,... sẽ được tham chiếu như nào?

Thật may là có những quy tắc được đề ra để cấu thành nên một nội dung Git commit có ngữ nghĩa. Hẳn là vậy khi nhiều trong số chúng được sử dụng trong các hàm câu lệnh của Git. Dưới đây là bảy quy tắc khi viết nội dung commit.

## Bảy quy tắc để viết nội dung Git commit một cách hợp lý

> Hãy nhớ rằng: những điều này đã được đề cập từ trước rồi (ở phần tham khảo cuối bài viết)

1. Tách tiêu đề với phần thân của nội dung commit bằng một dòng trắng
2. Tiêu đề giới hạn 50 ký tự
3. Viết hoa chữ cái đầu ở dòng tiêu đề
4. Không kết thúc tiêu đề bằng dấu chấm
5. Sử dụng câu mệnh lệnh trong tiêu đề
6. Giới hạn 72 ký tự mỗi dòng ở phần thân của nội dung commit 
7. Trả lời câu hỏi điều gì, tại sao và như thế nào ở phần thân của nội dung commit

Ví dụ:

```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
```

### 1. Tách tiêu đề với phần thân của nội dung commit bằng một dòng trắng

Trích dẫn từ [`manpage`](https://www.kernel.org/pub/software/scm/git/docs/git-commit.html#_discussion)  của `git commit`

> Though not required, it’s a good idea to begin the commit message with a single short (less than 50 character) line summarizing the change, followed by a blank line and then a more thorough description. The text up to the first blank line in a commit message is treated as the commit title, and that title is used throughout Git. For example, Git-format-patch(1) turns a commit into email, and it uses the title on the Subject line and the rest of the commit in the body.

> Tạm dịch: mặc dùng không bắt buộc nhưng nên bắt đầu nội dung commit với một dòng ngắn (dưới 50 ký tự) mô tả ngắn gọn về sự thay đổi, theo sau là một dòng trắng và cuối cùng là phần mô tả chi tiết. Phần nội dung bên trên dòng trắng đầu tiên của nội dung commit được coi là tiêu đề của commit và tiêu đề đó được sử dụng xuyên suốt trong Git. Ví dụ, Git-format-patch(1) chuyển một commit thành email và sử dụng tiêu đề của commit làm tiêu đề email và phần còn lại của commit làm nội dung email.

Không phải tất cả commit đề yêu cầu cả phần tiêu đề và phần thân. Đôi khi chỉ cần một dòng là đủ, đặc biệt khi thay đổi là đơn giản tới mức không cần nội dung chi tiết. Ví dụ:

```
Fix typo in introduction to user guide
```

Không cần đề cập gì thêm nữa. Nếu người đọc băn khoăn typo là gì, họ có thể đơn giản chỉ cần xem thay đổi đó là gì sử dụng `git show` hay `git diff` hoặc `git log -p`

Nếu chỉ commit những điều giống như trên, đơn giản có thể sử dụng `-m` trong `git commit`:
```
$ git commit -m"Fix typo in introduction to user guide"
```

Tuy nhiên, khi một commit cần một chút giải thích và ngữ cảnh cụ thể, bạn cần viết thêm phần thân của commit. Ví dụ:

```
Derezz the master control program

MCP turned out to be evil and had become intent on world domination.
This commit throws Tron's disc into MCP (causing its deresolution)
and turns it back into a chess game.

```

Nội dung commit với phần thân không dễ để viết tới tùy chọn `-m`. Khi đó, tốt hơn hết là dùng trình soạn thảo tương phù hợp. Đọc hướng dẫn sau để thiết lập trình soạn thảo cho Git ([Git Configuration](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration)).

Trong bất kể trường hợp nào, dấu phân cách giữa tiêu đề và phần thân của nội dung commit sẽ được thể hiện khi duyệt commit log. 

```
$ git log
commit 42e769bdf4894310333942ffc5a15151222a87be
Author: Kevin Flynn <kevin@flynnsarcade.com>
Date:   Fri Jan 01 00:00:00 1982 -0200

 Derezz the master control program

 MCP turned out to be evil and had become intent on world domination.
 This commit throws Tron's disc into MCP (causing its deresolution)
 and turns it back into a chess game.
```

Khi sử dụng tùy chọn `--oneline`, sẽ chỉ hiện thị dòng tiêu đề

```
$ git log --oneline
42e769 Derezz the master control program
```
Hay khi sử dụng `git shortlog`, sẽ nhóm commit bởi người dùng và cũng chị hiển thị tiêu đề.
```
$ git shortlog
Kevin Flynn (1):
      Derezz the master control program

Alan Bradley (1):
      Introduce security program "Tron"

Ed Dillinger (3):
      Rename chess program to "MCP"
      Modify chess program
      Upgrade chess program

Walter Gibbs (1):
      Introduce protoype chess program
```
Có một số ngữ cảnh trong Git xảy ra sự phân biệt giữa tiêu đề và phần thân. Tuy nhiên không có trường hợp nào hoạt động chính xác nếu thiếu dòng trắng ở giữa.

### 2. Tiêu đề giới hạn 50 ký tự

50 ký tự là một giới hạn không quá khắt khe, chỉ là một quy tắc dựa trên thực tế. Việc giữ tiêu đề trong khoảng giới hạn này giúp commit trở nên dễ đọc hơn và yêu cầu người commit phải dành một chút thời gian để suy nghĩ về cách thể hiện ngắn gọn nhất có thể cho việc giải thích điều gì đang xảy ra.

> Mẹo: Nếu gặp khó khăn trong việc tổng hợp ngắn gọn, có thể bạn đang commit quá nhiều thay đổi trong một lần. Chia nhỏ thành những commit nhỏ hơn. [atomic commits](https://www.freshconsulting.com/atomic-commits/)

Giao diện người dùng của GitHub sẽ có những cảnh báo về quy tắc này. Như cảnh báo dưới đây khi vượt quá 50 ký tự:

![GitHub-warning](https://i.imgur.com/zyBU2l6.png)
Tiêu đề dài hơn 72 ký tự sẽ bị cắt bỏ và thay thế bằng dấu ba chấm.
![GitHub-truncation](https://i.imgur.com/27n9O8y.png)
Vì vậy 50 ký tự là hợp lý, tuy nhiên cân nhắc rằng 72 mới là giới hạn cứng.


### 3. Viết hoa chữ cái đầu ở dòng tiêu đề
Điều này có vẻ đơn giản như nội dung của nó vậy. Bắt đầu mọi dòng tiêu đề bằng chữ cái viết hoa.

Ví dụ:

* Accelerate to 88 miles per hour

Thay vì

* accelerate to 88 miles per hour

### 4. . Không kết thúc tiêu đề bằng dấu chấm

Việc bỏ dấu câu là không cần thiết trong các dòng tiêu đề. Bên cạnh đó, dấu cách cũng khá quý giá khi giới hạn của tiêu đề là từ 50 ký tự trở xuống.

Ví dụ:

* Open the pod bay doors

Thay vì

* Open the pod bay doors.

### 5. Sử dụng câu mệnh lệnh trong tiêu đề

Câu mệnh lệnh nghĩa là những câu nói hoặc câu viết khi đưa ra một mệnh lệnh hoặc chỉ dẫn. Ví dụ:

- Dọn phòng đi
- Đóng cửa lại
- Đi đổ rác đi

Mỗi quy tắc trong bài viết này cũng đang được viết dưới dạng câu mệnh lệnh.

Từ mệnh lệnh có thể nghe hơi thô lỗ. Đó là lý do tại sao chúng ta không thường sử dụng nó. Nhưng nó lại hữu dụng đối với tiêu đề của Git commit. Một trong những lý do đó là **bản thân Git sử dụng từ mệnh lệnh bất kể khi nào nó tạo một commit đại diện cho bạn**.

Ví dụ, nội dung mặc định được tạo khi sử dụng `git merge`:

```
Merge branch 'myfeature'
```

Khi sử dụng `git revert`:

```
Revert "Add the thing with the stuff"

This reverts commit cc87791524aedd593cff5a74532befe7ab69ce9d.
```

Khi sử dụng nút `Merge` ở trang GitHub pull request:

```
Merge pull request #123 from someuser/somebranch
```

Vì vậy, khi sử dụng các từ mệnh lệnh trong nội dung commit là bạn đang tuân theo quy tắc tích hợp sẵn của Git. Ví dụ:

* Refactor subsystem X for readability
* Update getting started documentation
* Remove deprecated methods
* Release version 1.0.0

Viết theo cách này có vẻ hơi kỳ cục lúc ban đầu. Chúng ta thường sử dụng các từ chỉ thị trong khi nói, điều mà được sử dụng trong việc báo cáo các sự việc. Ví dụ:

* Fixed bug with Y
* Changing behavior of X

Đôi khi nội dung commit được viết theo kiểu mô tả thừa thãi như sau:

* More fixes for broken stuff
* Sweet new API methods

Để loại bỏ các nhầm lẫn, đây là một quy tắc đơn giản để việc viết tiều đề commit hợp lý.

Một tiêu đề commit hợp lý sẽ luôn hoàn thành mệnh đề sau:

* If applied, this commit will *your subject line here*

Ví dụ:
* If applied, this commit will *refactor subsystem X for readability*
* If applied, this commit will *update getting started documentation*
* If applied, this commit will *remove deprecated methods*
* If applied, this commit will *release version 1.0.0*
* If applied, this commit will *merge pull request #123 from user/branch*

Khi sử dụng các từ không phải mệnh lệnh, mệnh đề trên sẽ không được hoàn thiện:

* If applied, this commit will *fixed bug with Y*
* If applied, this commit will *changing behavior of X*
* If applied, this commit will *more fixes for broken stuff*
* If applied, this commit will *sweet new API methods*

> Nhớ rằng: Chỉ sử dụng câu mệnh lệnh trong phần tiêu đề. Quy tắc này không nhất thiết phải áp dụng với phần thân của nội dung commit

### 6. Giới hạn 72 ký tự mỗi dòng ở phần thân của nội dung commit

Git không bao giờ tự động xuống dòng. Khi viết phần thân của nội dung commit, bạn phải tự căn lề và xuống dòng.

Con số khuyến cáo là 72 ký tự, vì vậy Git có thể còn nhiều chỗ để căn lề trong khi vẫn giữ mọi thứ dưới 80 ký tự.

Các trình soạn thảo văn bản hay IDE đều có thể thiết lập để việc xuống dòng này là tự động.

### 7. Trả lời câu hỏi điều gì, tại sao và như thế nào ở phần thân của nội dung commit

Commit từ [`Bitcoin Core`](https://github.com/bitcoin/bitcoin/commit/eb0b56b19017ab5c16c745e6da39c53126924ed6) dưới đây là một ví dụ điển hình về việc giải thích điều gì đã thay đổi và tại sao:

```
commit eb0b56b19017ab5c16c745e6da39c53126924ed6
Author: Pieter Wuille <pieter.wuille@gmail.com>
Date:   Fri Aug 1 22:57:55 2014 +0200

   Simplify serialize.h's exception handling

   Remove the 'state' and 'exceptmask' from serialize.h's stream
   implementations, as well as related methods.

   As exceptmask always included 'failbit', and setstate was always
   called with bits = failbit, all it did was immediately raise an
   exception. Get rid of those variables, and replace the setstate
   with direct exception throwing (which also removes some dead
   code).

   As a result, good() is never reached after a failure (there are
   only 2 calls, one of which is in tests), and can just be replaced
   by !eof().

   fail(), clear(n) and exceptions() are just never called. Delete
   them.
```

Xem những thay đổi ở commit này bằng `git diff` và sẽ thấy rằng tác giả đã tiết kiệm thời gian đáng kể cho những người đóng góp và đồng nghiệp như thế nào khi gặp phải ngữ cảnh như trên. Nếu không có điều này, có thể ngữ cảnh trên chắc chắn sẽ bị lãng quên mãi mãi.

Trong hầu hết các trường hợp, bạn hoàn toàn có thể bỏ qua chi tiết về những thay đổi đã được tạo. Bản thân code đã tự giải thích cho chính nó rồi (và nếu code quá phức tạp đến mức cần giải thích bằng văn bản thì cũng đã có source comment). Chỉ cần tập trung vào việc làm rõ lý do tạo sao cần có những thay đổi này ngay từ đầu - tình trạng trước khi thay đổi (và có điều gì không ổn với tình trạng này), tình trạng hiện tại và tại sao bạn lại giải quyết điều này theo cách mà bạn đã làm.

Bạn có thể sẽ cảm ơn chính bản thân mình trong quá trình bảo trì về sau !

## Tham khảo
* **Tim Pope**, *A Note About Git Commit Messages*, [tbaggery](https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
* **Git**, *Commit Guidelines*, [www.git-scm.com](https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#_commit_guidelines)
* **Linus Torvalds**, *Subsurface*, [GitHub](https://github.com/torvalds/subsurface-for-dirk/blob/master/README.md#contributing)
* **Peter Hutterer**, *On commit messages*, [who-t.blogspot.com](https://who-t.blogspot.com/2009/12/on-commit-messages.html)
* **Dylan C. Kendal**, *Writing good commit messages*, [GitHub](https://github.com/erlang/otp/wiki/writing-good-commit-messages)
* **Chris Beams**, *Spring framework*, [GitHub](https://github.com/spring-projects/spring-framework/blob/30bce7/CONTRIBUTING.md#format-commit-messages)
* **Scott Chacon, Ben Straub**, *Pro Git*, [www.git-scm.com](https://git-scm.com/book/en/v2)

### ** Lược dịch **

**Chris Beams**, *How to Write a Git Commit Message*, [chris.beams.io](https://chris.beams.io/posts/git-commit)