> TL;DR: Không sử dụng `push -f` hay `push --force` ! Thay vào đó nên sử dụng `push --force-with-lease`

### Giải thích:

Git `push --force` rất nguy hiểm, vì theo cơ chế của mình, nó sẽ ghi đè lên remote repo bằng code ở local của mình, mà không cần quan tâm đến việc bên phía remote đang chứa thứ gì. Vì vậy, sẽ rất dễ để làm mất code trên phía remote repo, kể cả các code mà các thành viên khác đã push lên trước đó. Thay vào đó, ta có một công cụ tốt hơn: sử dụng option `--force-with-lease` khi push sẽ giúp ta trong trường hợp cần phải force push code lên remote, nhưng vẫn đảm bảo không làm mất những code đã có trước đó.

![](https://images.viblo.asia/9f24f4d5-ba30-45c5-9fe0-c8a1d1ae4e30.jpg)

### Giải thích kỹ hơn 1 chút:

Cần thiết phải nhắc lại 1 lần nữa: việc sử dụng `git push -f` hay `git push --force` là hoàn toàn không được khuyến khích, vì nó sẽ xóa bỏ hoàn toàn các commit khác đã được push lên một repository chung. (Thực ra thì vẫn có cách khôi phục, nếu như các commit kia vẫn còn ở trong máy của người push chúng).

Một trong những trường hợp dễ gặp nhất ở đây , đó là khi ta cần thực hiện việc rebase một nhánh. Để dễ hiểu, hãy xét ví dụ dưới đây: 

- Giả sử ta có 1 project với một nhánh feature đang làm, tạm gọi là nhánh `feature`.
- 2 người A và B cùng thực hiện công việc trên nhánh này, họ cùng `clone` nhánh về máy mà bắt đầu code.
- A hoàn thành code của mình, push code lên remote.
- B hoàn thành code của mình, nhưng trước khi push code lên, B cũng đã kiểm tra và thấy rằng có gì đó đã được merge lên nhánh `master` từ trước rồi. Vì thế, trước khi push code mình lên, anh ấy thực hiện việc rebase nhánh `feature` của mình với `master`. 
- Đây là lúc vấn đề xảy ra: sau khi rebase xong, B sẽ push lại nhánh `feature` của mình lên, và lúc này git sẽ báo reject, buộc B phải `push --force`. Tuy nhiên, vì không biết rằng A cũng đã push code của mình lên `feature` trước đó, thế nên lúc này việc B `push -f` lên sẽ xóa toàn bộ commit của A trước đó đã đẩy lên.

Nhìn sâu hơn, khi thực hiện `push -f`, B không thực sự biết trước đó vì sao code của mình lại bị reject khi push: trong trường hợp này, B đã nghĩ việc bị reject là do mình rebase, chứ không nghĩ tới việc là do A đã push lên từ trước. 

Thay vào đó, hãy xét tới trường hợp sử dụng option `--force-with-lease` khi push - option này sẽ *phần nào*  bảo vệ bạn khỏi việc lỡ tay làm mất code khi force update :)

Khi sử dụng `push --force-with-lease`, git sẽ từ chối việc update lên branch trừ khi branch đó nằm trong trạng thái "được coi là an toàn" (vd. không có code nào khác được đẩy lên đồng thời trước đó ...). Trong thực tế, việc này được thực hiện bằng cách kiểm tra tới uptream ref.

Bạn có thể bảo `--force-with-lease` là nó cần check cái gì (mình sẽ nói thêm ở dưới); còn nếu không thì mặc định nó sẽ kiểm tra theo tham chiếu (ref) hiện tại phía remote. Nói 1 cách dễ hiểu, đó là khi A udpate code của mình và push nó lên remote repo, tham chiếu đến head của nhánh remote lúc này sẽ được update theo. Bây giờ, khi B push lên remote, thì tham chiếu tại local của B đã bị lỗi thời. Khi B thực hiện `--force-with-lease`, git sẽ kiểm tra local ref với nhánh remote và từ chối thực hiện push.

### Giải thích kỹ hơn nữa - thực sự thì `--force-with-lease` nó làm gì ?

Cùng xét lại quá trình trên từ đầu:

- A code xong phần của mình, và push lên remote repo. Cùng lúc đó, B thực hiện rebase `feature` trong máy mình với `master`:

```
B$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: Dev commit #1
Applying: Dev commit #2
Applying: Dev commit #3
```

- Sau khi rebase, B đẩy code của mình lên, server lúc này sẽ reject:

```
B$ git push
To /tmp/repo
 ! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to '/tmp/repo'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- B cho rằng việc bị reject là do rebase với master trước đó, và thực hiện push `-f` lên:

```
B$ git push --force
To /tmp/repo
 + f82f59e...c27aff1 dev -> dev (forced update)
```

^ Như thế là code của A đã hoàn toàn đi tong :) Thay vào đó, nếu như B thực hiện `push --force-with-lease`, git sẽ kiểm tra xem remote branch có từng được update hay không kể từ lần cuối B fetch nó về:

```
B$ git push -n --force-with-lease
To /tmp/repo
 ! [rejected]        dev -> dev (stale info)
error: failed to push some refs to '/tmp/repo'
```

### `--force-with-lease` có phải đã an toàn ?

Tuy nhiên, việc sử dụng `--force-with-lease` vẫn có thể sót trường hợp, ví dụ như khi git lầm tưởng rằng một remote branch chưa được update, trong khi thực ra là có rồi. Phổ biến nhất là khi B sử dụng `git fetch` thay cho `git  pull` để update local repo của mình. Câu lệnh `fetch` sẽ pull các object và ref từ remote về, nhưng lại không thực hiện việc `merge` để update thứ vừa fetch về với working tree hiện tại. Điều này sẽ làm cho local repo *trông có vẻ* là đã up to date với remote rồi, nhưng thực ra là chưa; lúc này thì đến lượt `--force-with-lease` sẽ override lại remote branch:

```
B$ git push --force-with-lease
To /tmp/repo
 ! [rejected]        dev -> dev (stale info)
error: failed to push some refs to '/tmp/repo'

B$ git fetch
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From /tmp/repo
   1a3a03f..d7cda55  dev        -> origin/dev

B$ git push --force-with-lease
Counting objects: 9, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (9/9), 845 bytes | 0 bytes/s, done.
Total 9 (delta 0), reused 0 (delta 0)
To /tmp/repo
   d7cda55..b57fc84  dev -> dev
```

 Câu trả lời dễ nhất cho vấn đề này, đó là ***"Đừng fetch mà không merge"*** (tốt hơn là thực hiện lệnh `pull` - tương đương với fetch + merge). Nhưng nếu vì lý do gì đó mà bạn muốn thực hiện fetch trước khi `push --force-with-lease`, vẫn có một cách an toàn để thực hiện nó. Nhớ lại rằng *ref chỉ là pointer chỉ tới các object* - ta có thể tự tạo ra chúng. Trong trường hợp này, ta có thể tạo các `save-point` trước khi thực hiện `fetch`. Sau đó, ta sử dụng `--force-with-lease` với các ref `save-point` này thay cho remote ref.
 
- Trước khi thực hiện rebase hay fetch, sử dụng `update-ref` để tạo một tham chiếu mới, lưu lại state remote trong local. Vd. ta lưu state của remote branch vào một ref gọi là `dev-pre-rebase`:

```
B$ git update-ref refs/dev-pre-rebase refs/remotes/origin/dev
```

- Sử dụng ref này khi thực hiện rebase, fetch để bảo vệ remote repo trong trường hợp ai đó đã push code mới lên:

```
B$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: Dev commit #1
Applying: Dev commit #2
Applying: Dev commit #3

B$ git fetch
remote: Counting objects: 3, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0)
Unpacking objects: 100% (3/3), done.
From /tmp/repo
   2203121..a9a35b3  dev        -> origin/dev

B$ git push --force-with-lease=dev:refs/dev-pre-rebase
To /tmp/repo
 ! [rejected]        dev -> dev (stale info)
error: failed to push some refs to '/tmp/repo'
```

### Tóm lại

Như đã thấy, `--force-with-lease` là một công cụ hữu ích cho người dùng git khi cần force update. Nhưng nó không cover hết các risk thay cho sử dụng `push -f`, và tốt nhất là không nên sử dụng `push --force` hay cả `-push --force-with-lease` trước khi thực sự hiểu chúng là gì và các risk khi sử dụng. Tuy nhiên, trong hầu hết các use case hằng ngày, khi mà developer chỉ thực hiện push hay pull như bình thường, thỉnh thoảng có rebase, thì `--force-with-lease` cũng đã cung cấp một mức độ bảo vệ cao hơn đối với code của ta :)

### Nguồn:
https://developer.atlassian.com/blog/2015/04/force-with-lease/