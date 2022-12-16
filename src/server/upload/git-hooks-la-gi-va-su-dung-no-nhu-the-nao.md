![](https://images.viblo.asia/c6a3731c-a24b-49f5-9ea1-141ec92b1205.png)

Trong quá trình phát triển dự án, quy trình làm việc của một dự án rất dễ vượt khỏi tầm kiểm soát(hoặc đơn giản là quên) cũng như dần bắt đầu xuất hiện nhiều vấn đề dễ gây nhầm lẫn nhau, và việc xung độ - `conflict` giữa các thành viên trong một team là không thể tránh khỏi - đặc biệt là với những dự án có quy mô ngày càng lớn.<br/>
Đã có quá nhiều lần khi chúng ta review code của nhau cũng đều ngao ngán với lỗi hết sức cơ bản như chưa loại bỏ `debugger`, `console.log()`, `binding.pry` hay đơn giản là `thiếu chấm phẩy`, những lỗi syntax cơ bản mà chỉ cần test qua trên trình duyệt cũng sẽ đập vào mặt bạn nhưng nhiều khi chúng ta chưa từng chạy qua trước khi thực hiện đẩy `pull request`.<br/>
Rất may là chúng ta có `tool` giải quyết được vấn đề này, làm cho quy trình làm việc của chúng ta trở nên đơn giản hơn và giúp chúng ta tập trung vào những thứ thực sự quan trọng nhất thay vì chú tâm vào những điều nhỏ nhặt kia.<br/>
Thứ mà chúng ta đang đề cập đến trong bài hôm này chính là `git`, cụ thể hơn là `hooks` - Nó cung cấp cho ta nhiều đoạn mã tự động hóa mà chúng ta có thể thiết lập quy trình phát triển của mình và làm cho cuộc sống trở nên dễ dàng hơn.<br/>
Ở bài viết này, chúng ta sẽ không nói về những vấn đề cơ bản như `đẩy pull`, `commit` hay `rebase` gì hết, thay vào đó chúng ta sẽ tập chung vào việc sử dụng `hooks` và cách sử dụng chúng để đạt được sự hiệu quả trong làm việc nhóm.
### Git Hooks là gì?
`Git hook` là các script được trigger khi các hành động hoặc sự kiện cụ thể được thực hiện trong một `git repository`. Những hành động này là về các phần của `version control workflow`, chẳng hạn như `committing` hay `pushing`. `Hook` có thể thực sự hữu ích bằng cách tự động hóa các tác vụ trên `git workflow`. Ví dụ: Nó có thể giúp chúng ta kiểm tra syntax code dựa trên một số quy tắc cụ thể hoặc chạy `rubocop`, một vài hàm test trước khi chúng ta thực hiện `commit` hay thay đổi gì đó.
### Làm thế nào để sử dụng hook ?
`Git hooks` là một tính năng được tích hợp sẵn, có nghĩa là chúng ta có thể truy cập chúng và bắt đầu sử dụng chúng miễn là project của chúng ta được quản lý bởi `git repository`. Chúng ta hãy thử làm quen với ví dụ đơn giản sau nhé:
<br/>
Trước  tiên hay bật Terminal của bạn lên, tạo một git repository:
```bash
mkdir my-new-repository && cd my-new-repository
git init
ls -la
```
Với những tạo tác trên, chúng ta sẽ thấy rằng một thư mục ẩn mới vừa được tạo. Folder mới có tên là `.git` - đây là 1 folder ẩn, với ubuntu thì dùng tổ hợp phím `Ctrl + H` để hiển thị lên, folder này lưu trữ những thông tin liên quan đến repository, chẳng hạn như `version control hashes`, thông tin về các commit, địa chỉ remote, . . .<br/>
Thứ chúng ta cần quan tâm ở đây chính là folder `.git/hooks/`, nơi mà chúng ta sẽ viết các đoạn script ở đó.
![](https://images.viblo.asia/f387b41c-62e2-461a-a0a7-0bbbf33845d9.png)
Một vài mẫu có thể tìm ở đây:
* **pre-commit.sample**: được gọi ngay trước khi thực hiện commit.
* **commit-msg.sample**: chỉnh sửa tệp tin tại chỗ.
* **post-receive.sample**: được gọi sau khi remote repository đã cập nhật.

### Tổng quan về Hook
`Git hooks` dựa trên sự kiện, vì vậy, miễn là chúng ta thực hiện lệnh git trong luồng phát triển, git sẽ kiểm tra các thư mục hooks để tìm xem có script liên quan nào để chạy hay không. Một số script sẽ chạy trước hoặc sau các hành động của luồng phát triển này.<br/>
Một ví dụ điển hình để chúng ta xem qua và hiểu cụ thể hơn về luồng mà các hooks được trigger là quá trình commit, đây là một trường hợp sử dụng khá quen thuộc.
<br/>
Bất cứ khi nào chúng ta thực hiện bất kỳ thay đổi nào đối với source code của mình, một số hooks có liên quan sẽ được kích hoạt theo thứ tự sau:
1. **`pre-commit`**: Hook này được sử dụng để kiểm tra nội dung các tập tin được commit. Có thể viết script để kiểm tra code convention, run rubocop, test hoặc chạy static analysis trước khi commit. Nếu script trả về kết quả lớn hơn 0. Quá trình commit sẽ bị hủy bỏ. Tuy nhiên có thể bỏ qua hook này bằng cách truyền tham số `--no-verify` vào lệnh commit.
2. **`prepare-commit-msg`**: Hook này cho phép bạn thay đổi message mặc định trước khi chúng ta thấy nó. Rất ít khi sử dụng đến hook này, chỉ trừ trường hợp các commit message được sinh ra tự động như quá trình `squashed` hay `merged` các commit.
3. **`commit-msg`**: Hook này cho phép đặt commit message thành một mẫu. Thích hợp trong việc chuẩn hóa commit message. Chỉ có một tham số được nhận trong hook này, đó là tên file chứa commit message. Nếu script này trả về kết quả lớn hơn 0 thì quá trình commit sẽ bị hủy.
4. **`post-commit`**: Hook này chạy một hành động ngay sau khi commit đã được hoàn thành và gửi một thông báo chẳng hạn. Hook này không thể thay đổi kết quả của quá trình commit. Vì vậy, nó chỉ dùng cho mục đích thông báo đến người dùng. Không nhận tham số và kết quả trả về từ script cũng không tác động đến quá trình commit.

![](https://images.viblo.asia/ab17fba2-cc33-4c38-9390-fe2563af3da6.png)

Bây giờ chúng ta hãy thử và thêm một số `pre-` và `post-commit` scripts để hình dung rõ hơn cách thức hoạt động của git hook thực sự.
```bash
nano .git/hooks/pre-commit
```
Và thêm dòng sau vào script:
```bash
#!/bin/sh
echo Changes are about to be committed
```
Hãy đảm bảo rằng scripts của chúng ta có thể thực thi được:
```bash
chmod +x .git/hooks/pre-commit
```
>  `chmod` là lệnh được sử dụng để thay đổi quyền truy cập của người dùng tới file/folder, thêm quyền thực thì bằng cách cộng mode x

Tương tự, làm lại những thao tác trên với hooks `post-commit`:
```bash
nano .git/hooks/post-commit
```
Thêm dòng sau vào file `post-commit`:
```bash
#!/bin/sh
echo Changes have been committed
```
```bash
chmod +x .git/hooks/post-commit
```
Bây giờ chúng ta có thể thêm một file mới, ví dụ là  `nano index.html` mới với một đoạn mã HTML nhỏ chỉ dành cho mục đích demo thôi.
```html
<h1>Hello world from our new repository!</h1>
```
Giờ thử thêm file vừa tạo rồi thực hiện commit xem có gì lạ không:
```bash
git add .
git commit
```

![](https://images.viblo.asia/c4913de4-5dee-47c4-9a50-b557a7eee0d4.png)

Như mong đợi, git đã trigger các hook trong luồng commit. Các script `pre-commit` và `post-commit` đã được thêm vào đang chạy và sẽ được thực thi theo đúng trình tự (dựa trên thứ tự mà chúng ta đã đề cập trước đó).<br/>
Đây là một minh chứng đơn giản để hiểu cách các `commit workflow scripts` hoạt động và cách chúng được thực thi. Để biết thêm chi tiết về `workflow` này, bạn có thể [đọc thêm trong tài liệu](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks).

Trong ví dụ trên, mình đã chọn viết hai script này bằng bash nhưng sự thật là git hỗ trợ hook có thể được viết bằng bất kỳ ngôn ngữ script nào mà chúng ta muốn. `Ruby`, `Python` hoặc `JavaScript` là những lựa chọn thay thế tuyệt vời, miễn là bạn có thể chạy nó như một file thực thi (executable) bằng cách khai báo môi trường thực thi ở dòng đầu tiên của hook file.<br/>
Ví dụ: chúng ta có thể viết lại hook `pre-commit` dưới dạng script `Node.js` như bên dưới:
```javascript
#!/usr/bin/env node
console.log("Changes are about to be commited")
```
### Local và Remote Hooks
Hooks được phân tách giữa local và remote (hoặc client và server).Trong khi `local hooks` chạy trước hoặc sau các hành động cụ thể trên `local repository`, các `remote hooks` chạy trước hoặc sau khi đẩy tới `server`.
Không thể sử dụng các địa chỉ local để thực thi các `policies` vì bản chất của chúng cho phép các nhà phát triển dễ dàng thay đổi chúng. Chúng chủ yếu được sử dụng để tuân theo một số nguyên tắc cụ thể mà chúng ta muốn áp dụng trong một nhóm. Trong trường hợp chúng ta muốn chặt chẽ hơn và thực thi một số `policies` cho `repository` của mình, chúng ta sẽ đặt tại `remote hooks`.
#### LOCAL HOOKS 
* pre-commit
* prepare-commit-msg
* commit-msg
* post-commit
* **applypatch-msg**: Hook này nhận một tham số là tên file tạm chứa nội dung của `commit message`. Git sẽ bỏ qua quá trình `patch` nếu hook này trả về kết quả lớn hơn 0. Bạn có thể sử dụng hook này với mục đích đảm bảo `commit message` là đúng chuẩn.
* **pre-applypatch**: Hook này không nhận tham số nào và tương đối giống với `pre-commit`. Nó được thực thi sau khi một `patch` được áp dụng. Vì thế bạn có thể sử dụng nó để kiểm tra toàn bộ `source code` trước khi tạo commit.
* **post-applypatch**: Hook này dùng để gửi thông báo tới mọi người trong nhóm hay gửi thông báo cho tác giả về bản `patch` này.
* **pre-rebase**: Hook này được thực thi trước khi câu lệnh git rebase thực hiện việc thay đổi. Sử dụng để đảm bảo không có lỗi gì xảy ra. Hook này nhận 02 tham số là `upstream branch` và `branch sẽ được rebase`. Nếu bạn rebase với branch hiện tại thì có thể bỏ trống tham số thứ 2. Quá trình rebase sẽ bị hủy nếu script trả về kết quả lớn hơn 0.
* post-rewrite
* **post-checkout**: Hook này được chạy sau khi checkout thành công. Bạn có thể sử dụng nó để setup môi trường hay sinh document sau khi checkout. Hook nhận 03 tham số là `ref của HEAD trước`, `ref của HEAD mới` và một `flag` (1 và 0) để thông báo đó là branch hay file. Kết quả trả về từ script sẽ không tác động đến quá trình checkout.
* **post-merge**: Hook này được thực thi sau khi bạn chạy lệnh `git merge` thành công. Bạn có thể sử dụng hook này để khôi phục lại các dữ liệu trong thư mục làm việc mà git không thể kiểm tra như dữ liệu liên quan đến permission.
* pre-push

#### REMOTE HOOKS 
* **pre-receive**: Hook này được chạy khi server nhận được một `push` từ phía client. Hook này nhận một danh sách các `ref sẽ được push` từ stdin và nó sẽ không nhận bất kỳ ref nào nếu như script trả về kết quả lớn hơn 0. Bạn có thể sử dụng hook này để làm những việc như đảm bảo không có bất kỳ ref nào là non-fast-forwards.
* **update**: Hook này tương tự với `pre-receive` ngoại trừ việc nó chỉ chạy các luồng riêng biệt cho mỗi branch mà ta muốn update. Nếu ta muốn update nhiều branch, `pre-receive` chỉ chạy duy nhất một lần, còn update sẽ chạy một lần cho mỗi branch mà chúng được `push`. Hook này không đọc dữ liệu từ `stdin` như 2 hook trên, mà nó nhận vào 3 tham số gồm: tên branch, SHA-1 trỏ đến commit trước khi được `push` và `SHA-1` mà chúng ta muốn push. Nếu script trả về kết quả lớn hơn 0 thì chỉ branch ứng với script bị loại bỏ (`reject`) còn các branch khác vẫn được update bình thường.
* **post-receive**: Hook được chạy sau toàn bộ quá trình được hoàn tất. Nó cũng nhận dữ liệu như `pre-receive` từ `stdin`. Và hook này có thể sử dụng để cập nhật các dịch vụ, để thông báo tới các `user` như việc gửi `email` tới các `developer` liên quan hay là để `update ticket tracking system`. Thậm chí bạn có thể parse một `commit message` để kiểm tra xem có bất kỳ ticket nào cần open, modified hay update không. Kết quả trả về từ hook này không tác động đến quá trình push, nhưng phía client sẽ không đóng kết nối tới server cho đến khi quá trình này kết thúc. Vì vậy, bạn nên cẩn thận khi sử dụng hook này với các task tốn thời gian hoặc nếu muốn, thì cách tốt nhất là sử dụng một `background process` để xử lý các quá trình tốn thời gian này.

### Chia sẻ Hooks như thế nào?
Git hooks là tất cả về việc chia sẻ chúng trong nhóm. Đây là lý do chính để chúng tồn tại: thúc đẩy cộng tác nhóm tốt hơn, tự động hóa các quy trình bất lợi và cho phép chúng ta chỉ tập trung vào các phần quan trọng để phát triển source code. <br/>
Như đã nêu trước đây, `.git/hooks` là thư mục lưu trữ các `hooks` tùy chỉnh của chúng ta, nhưng điều này không thực sự hữu ích khi chúng ta cần chia sẻ các `scripts` này trong nhóm vì thư mục này không được theo dõi bởi git.<br/>
Một cách tiếp cận tốt để giải quyết vấn đề này là thêm tất cả các `custom hooks` của chúng ta vào một thư mục riêng biệt bên trong `repository`. Ví dụ: chúng ta có thể thêm một thư mục `.githooks` và lưu các `executable scripts` ở đó. Sau đó, khi khởi tạo dự án, chúng ta có thể copy chính xác hoặc `symlink` các `scripts` này vào thư mục gốc `.git/hooks` để giữ các hooks của chúng ta.
```bash
find .git/hooks -type l -exec rm {} \\;
find .githooks -type f -exec ln -sf ../../{} .git/hooks/ \\;
```
Ngoài ra, nếu bạn đang sử dụng phiên bản git mới nhất (từ 2.9 trở lên), chúng ta có thể config trực tiếp đường dẫn git hooks đến thư mục tùy chỉnh của chúng ta:
```bash
git config core.hooksPath .githooks
```
### Git Hooks Made Easy (Trường hợp sử dụng JavaScript làm Codebase)
Có những `tool` giúp chúng ta tích hợp thêm git hooks vào nhu cầu của codebase. Đặc biệt đối với `JavaScript codebases`, có [Husky](https://github.com/typicode/husky) mà chúng ta có thể dễ dàng tùy chỉnh các hành động trên các sự kiện git thông qua cấu hình.<br/>
Ví dụ: chúng ta có thể dễ dàng `lint our code` hoặc chạy một số tests trong `pre-commit` sự kiện và tiến hành commit dựa trên việc `linting`, `testing` hoặc cả hai có thành công hay không.<br/>
Điều này có thể được thực hiện bằng cách mở rộng cấu hình file `package.json` đơn giản như:
```json
{
    "scripts": {
        "test": "echo Running tests"
    },
    "devDependencies": {
        "eslint": "5.16.0",
    },
    "husky": {
        "hooks": {
            "pre-commit": "eslint . && npm test",
        }
    }
}
```
### Phần kết
Trong bài viết này, chúng ta đã phát hiện ra rằng các hành động khác nhau được thực hiện trên git repository có thể tùy chọn `trigger custom scripts` để chạy. Các `scripts` đó có thể nằm dưới sự kiểm soát của `developer locally` hoặc được quản lý tập trung hơn cho một nhóm hoặc dự án trên `remote`. Chúng ta cũng đã biết rằng các `scripts` thường được viết bằng `shell script` như `bash`, nhưng thực tế có thể sử dụng hầu hết mọi `scripting language` như `Ruby`, `Python` hay ngay cả `JavaScript`. <br/>
`Git hooks` có thể là một phần thực sự mạnh mẽ của quy trình làm việc được thiết kế tốt và mình khuyên bạn nên dùng thử chúng và xem mình có thể làm gì cho các dự án của riêng mình.