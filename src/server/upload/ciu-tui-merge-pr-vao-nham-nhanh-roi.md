Làm việc với git thì nói chung là cũng dễ. Cho tới khi bạn merge nhầm nhánh :slightly_smiling_face:.

Có thể bạn đã quen với gitflow rồi. Chúng ta có các nhánh chính (master, testing...) và mọi người sẽ làm việc trên
các feature branch. Khi đã xong rồi thì tạo pull request để merge nhánh feature của mình vào nhánh chính.
Và sẽ có một ~~vài~~ lần trong đời bạn merge feature branch vào nhầm nhánh chính (master thay vì testing) chẳng hạn :slightly_smiling_face:.
Đó là trường hợp mình hay thấy xảy ra khi chúng ta dùng gitflow. Ngoài ra trường hợp tương tự là bạn merge feature branch vào nhánh chính
và phát hiện ra có bug và muốn revert cái commit vừa merge. Vậy giờ chúng ta có thể làm những gì.

## `git push -f`

Đừng làm thế nhé :slightly_smiling_face:.
Khi có vấn đề gì đó xảy ra với history của git thì mình thường thấy giải pháp mọi người hay nghĩ tới
là `git reset` và `git rebase`, 2 cái này sẽ làm cho history của git thay đổi và bạn không thể push lên được nữa.
Nên giải pháp mọi người chọn là `git push -f`. Cũng không khó hiểu vì cách này luôn luôn thành công :rofl:.
Nhưng nó sẽ khiến người khác bị lỗi. Giờ thì những ai đã pull nhánh chính về sẽ không thể pull được nữa vì history
đã khác với nhánh chính mà bạn vừa force push lên. Sau đó bạn đi đến bàn từng người và bảo mọi người làm thêm một
thứ nguy hiểm nữa, `git reset --hard` về commit chỗ chưa bị lỗi và pull về :slightly_smiling_face:.

Tóm lại là mình hi vọng bạn sẽ không bao giờ làm như này nhé :slightly_smiling_face:.
Lúc nào cũng có cách xử lý mà, cùng lắm thì viết lại toàn bộ chỗ code cũ thôi.

## Revert commit merge nhầm

Vậy giờ phải làm sao để fix cái này đây.

`git revert` là một tool an toàn hơn nhiều so với `git reset`.
Tác dụng của nó đối với code thì có thể như nhau, nhưng quan trọng là nó không làm thay đổi history và bạn có thể push
lên mà không cần force.

`git revert` sẽ tạo một *revert commit* để đảo ngược toàn bộ thay đổi bạn vừa thực hiện trong một commit.
Ví dụ commit vừa rồi của bạn có nội dung như này (thêm 1 dòng).

```patch
--- a/a.txt
+++ b/a.txt
@@ -2,3 +2,4 @@ a
 b
 c
 d
+a
```

Thì revert commit sẽ có nội dung đúng ngược lại luôn (xóa dòng vừa thêm vào).

```patch
--- b/a.txt
+++ a/a.txt
@@ -2,4 +2,3 @@ a
 b
 c
 d
-a
```

Cách dùng như này

```sh
git revert <commit>
```

Trong đó `<commit>` là ID của commit bạn muốn revert.
Ví dụ bạn vừa merge feature branch vào nhánh chính và có merge commit M như này.
Tưởng tượng là bạn buộc 2 cái nhánh cây lại thì phải có 1 chỗ buộc bọn nó lại với nhau ấy,
và merge commit chính là cái chỗ bạn buộc bọn nó lại với nhau.

```text
 ---o---o---o---M
               /
       ---A---B
```

Merge commit thường có message kiểu `Merge branch ...`.
Merge commit từ PR của Github thì có dạng `Merge pull request #xxx from xxx`.
Bạn có thể dùng `git log` để tìm ID của merge commit mà bạn muốn revert.

Tuy nhiên khi bạn chạy

```sh
git revert M
```

thì sẽ nhận được thông báo kiểu này

```text
error: commit M is a merge but no -m option was given.
fatal: revert failed
```

Đó là vì merge commit khác với commit bình thường, nó có nhiều parent.
Nên giờ nếu bạn muốn revert nó thì nó sẽ cần biết là bạn muốn revert về parent nào (nhánh nào), cái `-o-o-o` hay là `B`.
Vậy nên bạn cần chọn commit mà bạn muốn quay về bằng flag `-m n`. Trong đó n là số thứ tự của parent bạn muốn quay về.
Ở trường hợp merge nhầm của chúng ta thì thường là 1. Vậy nên chúng ta chạy như này

```sh
git revert -m 1 M
```

Bạn sẽ được nhập commit message cho revert commit. Mặc định thì nó là kiểu `Revert "..."` trong đó `...` là commit message của commit bạn muốn revert.

![revert.png](https://i.imgur.com/WrB5hBA.png)

Nói dài vậy thôi chứ nếu bạn vừa merge nhầm pull request trên Github thì Github có tính năng revert luôn commit bạn vừa merge nhầm :smiley:.

![pr-revert.png](https://i.imgur.com/EW2490p.png)

Nó sẽ tạo 1 pull request với 1 revert commit để đảo ngược toàn bộ thay đổi bạn vừa thực hiện trong lần merge pull request
vừa rồi.

Lưu ý là commit bạn merge nhầm vẫn còn đấy, nó chỉ được đảo ngược toàn bộ bởi revert commit mà bạn vừa commit thôi.
Nghĩa là bạn không xóa nó đi mà chỉ viết lại toàn bộ code cho nó quay về như lúc chưa merge thôi.

## Mang commit về lại đúng nhánh cần merge

Sau khi xóa được chỗ commit tội lỗi kia rồi thì việc tiếp theo cần làm là mang code về đúng chỗ của nó, nhánh mà lẽ
ra chúng ta phải merge vào.

Cách đầu tiên mà mình ngây thơ của ngày xưa nghĩ đến là tạo thêm 1 pull request nữa merge vào đúng nhánh :smiley:.
Nhưng như mình đã nói ở trên thì merge commit thật ra chỉ merge 2 nhánh với nhau thôi còn nội dung code hoàn toàn
nằm ở các commit của 2 nhánh. Nên dù bạn có merge bao nhiêu lần thì vẫn chỉ có ngần ấy commit thôi.
Nhưng revert commit thì lại là 1 commit thực sự với nội dung xóa bỏ toàn bộ những commit vừa được merge.
Vì vậy dù bạn có merge lại những commit ở nhánh feature vào nhánh cần merge thì sau khi được merge lại với nhánh có
revert commit thì nó cũng sẽ bị xóa bỏ toàn bộ.

Thêm cái hình cho dễ hình dung.

```text
master  ---o---o---o---M1---R---o---X
                      /            /
feature       ---A---B            /
                      \          /
testing ---x---x---x---M2---x---x
```

Như bạn thấy là dù đã merge nhánh `feature` vào cả `master` và `testing` thì chúng ta vẫn chỉ có `A`, `B` và 2
merge commit `M1`, `M2` thôi.
khi merge nhánh `testing` vào `master` thì revert commit `R` vẫn còn đấy và nó sẽ lại xóa bỏ `A` và `B`.

Vậy giờ chúng ta cần loại bỏ `R` để mang `A` và `B` trở lại.
Nhớ là nhắc đến xóa commit thì đừng có nghĩ đến `git reset --hard` và `git push -f` đấy nhé :angry:.
Từ nãy đến giờ cách xóa commit của chúng ta vẫn là tạo 1 commit mới xóa bỏ toàn bộ thay đổi của commit cần xóa.

Từ đây trở đi chúng ta có rất nhiều cách và nhiều trường hợp để xử lý.

### Ngay sau khi revert

Đầu tiên, ngay tại thời điểm vừa revert merge commit bị nhầm.
Bạn có thể tạo luôn 1 commit mới với nội dung là toàn bộ thay đổi của merge commit vừa rồi bằng cách dùng `cherry-pick`.
Như vậy chúng ta sẽ có 1 commit mới với nội dung ngược lại với revert commit, và sau khi merge vào chúng ta sẽ có lại
`A` và `B` :smiley:. Cách dùng như thế này

```sh
git cherry-pick <commit>
```

Tất nhiên là cũng giống như `revert`, để `cherry-pick` được merge commit thì chúng ta cũng cần chọn parent commit của nó.

```sh
git cherry-pick -m 1 M
```

Bạn có thể thêm `-e` để edit commit message, hoặc nó sẽ dùng luôn message của merge commit.
Nhánh của chúng ta sau đó sẽ trông như này, với `C` là cherry-pick commit vừa được tạo.
Và sau khi merge vào, `master`, `C` sẽ ghi đè lên `R` nên chúng ta sẽ không bị mất code từ `feature`.

```text
master   ---o---o---o---M---R---o---o---MM
                      /                /
feature       ---A---B                /
                                     /
testing  ---x---x---x---x---C---x---x
```

### Sau khi đã merge lại vào nhánh có revert commit

Ví dụ bạn ngây thơ như mình tạo thêm 1 PR nữa vào nhánh cần merge :smiley:.
Hoặc là bạn ở trường hợp 2 như ở đầu bài, cần revert lại branch bị lỗi vừa merge vào.
Thì chúng ta đã có sẵn `A` và `B` ở nhánh cần merge rồi. Và sau khi merge vào nhánh có revert commit `R` thì `R` sẽ
xuất hiện và khiến `A` và `B` bay màu. Vậy chúng ta đơn giản lại xóa bỏ `R` thôi. Bằng cách revert lại `R` :smiley:.

```sh
git revert R
```

Và chúng ta sẽ có commit `RR` :rofl:

```text
Revert "Revert "Merge branch '...'""
```

### Lưu ý nhỏ

Dù git có lỗi đáng sợ đến đâu thì code vẫn là code và chúng ta vẫn có thể fix lại được.
Nhưng như đã lưu ý là revert và cherry-pick đều tạo 1 commit mới và nội dung của commit đấy có thể siêu to, và khiến
chúng ta gặp khó khăn khi muốn tìm xem thay đổi được thêm vào từ commit nào.