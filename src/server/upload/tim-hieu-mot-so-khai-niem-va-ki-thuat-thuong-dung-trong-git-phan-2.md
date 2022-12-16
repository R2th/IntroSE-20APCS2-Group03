## Giới thiệu
Tiếp theo [phần 1](https://viblo.asia/p/tim-hieu-mot-so-khai-niem-va-ki-thuat-thuong-dung-trong-git-phan-1-naQZR4pP5vx), hôm nay mình sẽ tìm hiểu về một số kĩ thuật thường được dùng khi chúng ta sử dụng Git trong quá trình làm việc nhé.

## Một số kĩ thuật thường sử dụng trong Git
### 1. git stash
Trong khi đang làm việc, sẽ có những lúc chúng ta đang code dở branch A mà có việc gì đó phát sinh cần sửa gấp trên branch B, bạn muốn chuyển sang branch B thì Git yêu cầu bạn phải commit những thứ đang làm dở, hoặc bạn muốn pull code người khác đã push lên về branch hiện tại bạn đang làm, nhưng bạn không pull được vì Git cũng yêu cầu bạn phải commit những thứ đang làm dở.

Vấn đề đặt ra ở đây là chúng ta muốn giải quyết vấn đề đã nêu ra nhưng chúng ta lại không muốn phát sinh một commit dư thừa, chúng ta chỉ muốn lưu lại trạng thái đang làm dang dở và chỉ commit khi cần thiết. `Git stash` sẽ giúp chúng ta giải quyết vấn đề này, lệnh này sẽ giúp bạn lưu lại trạng thái hiện tại để chuyển branch làm việc khác, hoặc pull code rồi sau đó tiếp tục công việc hiện tại.

Dưới đây là list những lệnh với các tính năng liên quan đến khái niệm git stash:
```
1. git stash save
2. git stash list
3. git stash apply
4. git stash pop
5. git stash show
6. git stash branch <branch_name>
7. git stash clear
8. git stash drop
```

Dưới đây mình sẽ trình bày cách đơn giản và ngắn gọn nhất để giải quyết vấn đề đã đặt ra ở trên, mình sẽ nói từng bước và giải thích ý đồ khái quát nhé:
1. `git status` (xem mình đang làm việc trên những file nào (đôi lúc mình bỏ qua bước này))
2. `git stash` (lưu lại trạng thái trên các file đang làm) -> git stash = git stash save. Sau đó các bạn thử `git status` lại sẽ thấy các file đang làm đã trở về trạng thái trước khi các bạn chỉnh sửa (ở commit gần nhất)
3. `git stash apply`. Nghĩa là sau khi chuyển branch, hoặc pull code,... làm xong việc và tiếp theo bạn muốn lấy lại những thay đổi đã lưu trước đó, sử dụng lệnh `git stash apply` => lệnh này sẽ lấy lại những thay đổi đã lưu vừa rồi.

Như vậy là chúng ta đã giải quyết xong vấn đề đã nêu với git stash rồi nhé, tuy nhiên ngoài cách cơ bản nhất là lưu trạng thái đang làm như mình đã trình bày, thì chúng ta hoàn toàn có thể tạo ra 1 list trạng thái cần lưu chứ ko chỉ có duy nhất trạng thái đang làm hiện tại và cũng có thể clear list các trạng thái đã lưu. Các bạn có thể tìm hiểu thêm để nắm rõ chi tiết những lệnh liên quan đến git stash mình đã liệt kê ở trên nhé.

### 2. Reset branch ở local giống như branch ở remote
Để reset branch ở local của mình về trạng thái giống hoàn toàn như branch_name ở remote thì hãy thực hiện như sau:

`git fetch origin`

`git reset --hard origin/branch_name` (nhắc lại origin ở đây là tên của remote repository và đồng thời hầu hết remote repository sẽ có tên là origin)

### 3. Xóa branch
**Xóa branch ở local**
`$ git branch -d branch_name`

`$ git branch -D branch_name`

Option **-d** là một alias cho **--delete**, với option này thì bạn chỉ có thể xóa những branch mà đã được merged với branch khác, nếu chưa merged, bạn sẽ gặp thông báo lỗi như thế này:
```
$ git branch -d test_for_delete_branch
error: The branch 'test-for-git' is not fully merged.
If you are sure you want to delete it, run 'git branch -D test_for_delete_branch'.
```
Còn option **-D** là alias của **--delete --force**, nó sẽ cho phép bạn xóa branch cần xóa mà không quan tâm đến trạng thái merged của nó.

**Xóa branch ở remote**
Để xóa branch ở remote, ta có thể sử dụng các lệnh sau
```$ git push -d <remote_name> <branch_name>```

Hoặc có thể với lệnh
```$ git push <remote_name> :<branch_name>```

Vd:
```
$ git push -d origin branch_test 
To github.com:your_name/project_name.git
 - [deleted]         branch_test
```

### 3. Hủy bỏ những chỉnh sửa đang thực hiện trên file/folder
Tính năng này thường dùng để đưa file/folder về lại trạng thái ban đầu, ta có thể sử dụng những lệnh sau:

Áp dụng cho một vài files được chỉ định cụ thể, chúng ta sử dụng lệnh sau:

`$ git checkout path/filename1 path/filename2`

Hoặc áp dụng cho toàn bộ file đang chỉnh sửa thì chúng ta sử dụng lệnh sau:

`$ git checkout .`


### 4. Reset lại file về trạng thái modified (trước lệnh git add) sau khi đã add
Sẽ có đôi lúc vì một lí do gì đó mà bạn cần sử dụng tính năng này.

Ví dụ như bạn có 2 files đang chỉnh sửa nhưng commit này bạn cần chỉ cần add 1 file trong số đó thôi nhưng bạn đã lỡ add cả 2 files, lúc này chúng ta sử dụng lệnh này:

`$ git reset path/to/file` sẽ hủy bỏ trạng thái đã add của file

Hoặc cũng có thể bạn muốn đưa tất cả những file đã add về lại trạng thái modified trước khi add, chúng ta sẽ sử dụng lệnh sau:

`$ git reset`

### 5. Xóa untracked files hoặc folder (những file/folder mới và những file được tạo tự động bởi IDE)
`$ git clean -f` hoặc `$ git clean -fd`

### 6. Thay đổi nội dụng message vừa commit
Khi trong nội dung commit của bạn có chứa những từ ngữ không hay ho do bức xúc =)), hoặc sai chính tả hay vì một lí do gì đấy mà bạn muốn sửa lại nội dung commit,... thì bạn hoàn toàn có thể làm điều này một cách dễ dàng (dĩ nhiên là chỉ mới commit chứ chưa push). Tính năng này rất đơn giản, chúng ta sẽ thực hiện với lệnh sau:
```
$ git commit --amend
# Sau lệnh này ta có thể thay đổi nội dung commit message một cách tuỳ ý
```

### 7. Commit nhầm sang một branch khác
Có một số bạn(đôi khi mình cũng thế =)) ) thường chọn cách phát triển luôn tính năng ở branch develop hay thậm chí là ở master branch, sau khi làm xong rồi thì mới tạo branch hợp lệ và checkout sang đúng branch đó. Nhưng cuộc sống đôi lúc lại không như chúng ta dự định, làm xong rồi chúng ta lại quên và commit luôn trên branch hiện tại =)). Mình sẽ xử lý trường hợp này theo cách như sau:
```
# Đầu tiên là tạo một branch khác chứa trạng thái mà mình đã commit
$ git branch other-branch

# Đưa HEAD, index của develop về 1 commit trước đó
$ git reset --hard HEAD~

# Check out sang branch có commit trước đó
$ git checkout other-branch
```

### 8. Quay về commit trước đó và vẫn giữ lại những files đã chỉnh sửa
Giả sử bạn đang ở branch A với commit mới nhất, bạn muốn quay về commit trước đó và đưa những files ở commit hiện tại về trạng thái modified
`$ git reset <commit hash>`

Xem ví dụ nhé
Đây là log hiện tại

![](https://images.viblo.asia/e4c8dc5b-a6ac-4ecd-b82a-b27a8fe44696.png)

Sử dụng lệnh: `$ git reset 609aa2b` và sau đó check lại log, chúng ta sẽ thấy kết quả là `commit 5` sẽ không còn nữa nhưng các file đã chỉnh sửa ở commit 5 sẽ không bị revert mà sẽ là ở trạng thái modified như trước khi thực hiện `commit 5` ở trên

![](https://images.viblo.asia/c13e11a4-6825-4b7d-9e9c-314794a84f70.png)


### 9. Revert một commit
Để thực hiện việc này, chúng ta có thể sử dụng những lệnh sau:
```$ git revert <commit hash>```

Lệnh này sẽ tạo ra một commit mới tiếp theo lịch sử commit và đảo ngược lại những thay đổi trong commit được chỉ định. Đồng thời, giả sử commit được chỉ định được tạo ra trước một số commit sau đó thì các commit sau đó vẫn ko thay đổi. Hơi khó hiểu đúng không? =)) Để mình ví dụ cho trực quan:

**Ví dụ:**

Đầu tiên hãy check log: `git log --oneline --graph`và xem history commit, chúng ta thấy như sau:

![](https://images.viblo.asia/40cb1c14-fb57-43e6-aa0d-39f1353ba80e.png)

Sau đó chúng ta sẽ revert commit có msg là "commit 2" với hash là "1bdc17f" : `$ git revert 1bdc17f`

Điều này sẽ sinh ra một commit "revert commit 2", chúng ta check log lại lần nữa và xem kết quả có đúng như vậy không nhé:

![](https://images.viblo.asia/c9b5b519-c3f1-4259-b617-49ffa3bc47b8.png)

Rõ ràng ta thấy commit được tạo ra sẽ nối tiếp theo dòng thời gian(sau `commit 4`) và đồng thời những gì bạn làm ở commit 2 sẽ được revert lại hoàn toàn, còn những gì đã code ở `commit 3, commit 3` vẫn không hề thay đổi. Ok đến đây thôi, hy vọng các bạn hiểu giải thích của mình =))

**NOTE and WARNING :warning::** Đây chỉ là một ví dụ nhỏ của `khái niệm revert` trong Git mà thôi, ngoài ra sẽ còn rất nhiều kĩ thuật đi cùng khả năng "tùy cơ ứng biến" liên quan đến khái niệm này. Theo mình thì đây là một kĩ thuật mà đòi hỏi bạn ngoài việc phải có một sự am hiểu tương đối về Git (để có thể xử lý một cách linh hoạt các sự cố nếu phát sinh sau khi revert) thì đồng thời bạn cần phải am hiểu tường tận về dự án mình đang làm nữa =)) Mình nói thế là vì sử dụng tính năng này thường rất dễ bị conflict, nếu ít thì có thể không vấn đề gì nhưng có quá nhiều conflict thì khả năng là cũng đau đầu lắm đấy =))

## Kết thúc
Trong bài viết này mình đã liệt kê ra một số kĩ thuật của Git đi kèm các tình huống được đặt ra, có thể nói là các kĩ thuật này chúng ta sẽ gặp rất nhiều trong quá trình làm việc. Ngoài ra thì còn khá nhiều kĩ thuật khác mà chúng ta cũng sẽ thường hay gặp và phải vận dụng nhưng vì mình không có nhiều thời gian cho bài viết này nên chưa liệt kê ra thêm được và mình sẽ bổ sung sau. Bài viết này trình bày một số kĩ thuật khá cơ bản nhưng cũng có một số kĩ thuật có thể xem là hơi khó với những bạn mới lần đầu làm quen với Git. Ngoài ra, bài viết này có nêu ra một số khái niệm nhưng chỉ dừng lại ở mức hướng dẫn cơ bản và đơn giản nhất, vì một số khái niệm thì có rất nhiều kĩ thuật liên quan tới khái niệm đó và đối với mỗi người sẽ có mỗi cách vận dụng khác nhau và mình cũng không đủ khả năng để đi sâu tường tận vào những khái niệm đó =)), mong các bạn thông cảm. Cảm ơn các bạn đã đọc!