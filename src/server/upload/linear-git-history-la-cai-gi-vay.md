Nếu bạn đã từng vào chỗ cài đặt protected branch của Github thì có thể bạn đã thấy qua cái setting này.

![github-settings.png](https://i.imgur.com/cGYGRNA.png)

Bạn có giống mình cũng từng hỏi cái này là gì vậy không :thinking:.
Thật ra hầu hết các workflow của git đều không khuyến khích nó nên chắc chẳng mấy ai để ý đến.
Nhưng dù sao cũng đã thấy nó rồi, vậy mình cùng tìm hiểu xem sao :smiley_cat:.

## Định nghĩa

Theo mình hiểu đơn giản thì nó là 1 commit history không có merge commit.
Nghĩa là mỗi commit chỉ có 1 parent và 1 child. Trông nó sẽ giống như một đường thẳng.

Ví dụ như này

```text
---o---o---o---o---o
```

Còn như này là không phải linear history

```text
 ---o---o---o---M---o---o
               /
       ---x---x
```

## Làm thế nào để có linear history

Trước hết thì khi nào chúng ta có merge commit đã. Merge commit được sinh ra khi chúng ta merge 2 branch mà không thể
dùng strategy *fast forward* thì git sẽ tạo một merge commit để merge 2 branch.
Ví dụ chúng ta có 2 branch như này.

```text
master  ---o---o---o
                    \
testing              A---B
```

Khi `testing` đang có history giống với `master`, chỉ thêm 2 commit `A` và `B` thì chúng ta có thể *fast forward*.
Nghĩa là chỉ cần apply thay đổi của `A` và `B` là xong.

```text
master  ---o---o---o---A---B
```

Nhưng nếu chúng ta có 2 branch như này.

```text
master  ---o---o---o---C---D
                    \
testing              A---B
```

Thì sẽ không thế dùng *fast forward* mà phải tạo thêm 1 merge commit. Merge 2 branch sẽ trông như này.

```text
master  ---o---o---o---C---D---M
                    \         /
testing              A-------B
```

Nếu bạn dùng `git merge` với flag `--no-ff` thì dù branch có thể *fast forward*, merge commit vẫn sẽ được tạo.

```text
master  ---o---o---o-------M---
                    \     /
testing              A---B
```

Vậy để có linear history, chúng ta cần đảm bảo mỗi lần merge, branch được merge vào phải có history *up-to-date* với
base branch để có thể sử dùng *fast forward* strategy.
Để update branch với base branch, chúng ta dùng `git rebase`. Rebase sẽ apply lại toàn bộ commit của branch hiện tại
lên base branch.

Ví dụ branch hiện tại như này. Branch `feature` được checkout từ master tại commit `A`.

```text
master  ---A---B---C
            \
feature      D---E
```

Nếu merge 2 branch bây giờ thì sẽ tạo ra merge commit. Giờ từ branch `feature` mình dùng `git rebase` như này.

```sh
git rebase master
```

Thì sẽ giống như là `feature` sẽ được checkout lại từ commit `C`, sau đó commit `D` và `E` sẽ được apply lại lên `feature`.
Giờ branch sẽ trông như này.

```text
master  ---A---B---C
                    \
feature              D---E
```

Bây giờ `feature` có thể được merge vào `master` với *fast forward* strategy.

Lưu ý là rebase sẽ làm thay đổi history như bạn thấy ở trên. Nên bạn chỉ dùng rebase trên branch hiện tại mình đang
làm (chưa push lên repo chung) thôi.
Nếu bạn làm việc với một feature lớn, tốn nhiều thời gian (làm một mình, không share branch với ai) thì thường xuyên
rebase với base branch sẽ giúp code của bạn update với code mới nhất từ base branch và đến lúc merge giảm khả năng
conflict cũng như bug chưa phát hiện ra.

## Linear history để làm gì

Vậy tại sao người ta lại muốn có linear history. Có vài ưu điểm như sau

- Dễ dàng xác định thứ tự commit.
  Có thể bạn đã biết rồi là merge commit thực ra là kết hợp 2 branch với nhau và mỗi branch có thể có history độc lập
  với nhau. Khi dùng `git log`, bạn thấy commit được sắp xếp trông như là một đường thẳng. Nhưng thực ra nó hiện vậy cho
  dễ đọc thôi. Còn thực sự nó trông giống như hình trên. Vậy nên sẽ khó xác định được cái nào trước cái nào sau,
  khó biết được commit nào thực sự gây ra lỗi.
- Commit history gọn gàng hơn.
  Sẽ không có merge commit làm rối mắt bạn nữa.
  Và bạn thử chạy `git log --graph` với một repo không có linear history thử xem :smiley:, sẽ hiểu được điều này.
- Dễ dàng revert commit.
  Vì mỗi commit chỉ có 1 parent, không như merge commit, nên việc revert commit hay cherry-pick đỡ đau đầu hơn nhiều.

Nhược điểm:

- Cần người dùng hiểu rõ về git.
  `git rebase` thực ra là câu lệnh khá khó sử dụng và dễ dàng làm lỗi commit history.
- Fix conflict với `git rebase` khổ hơn nhiều so với `git merge`.
  Với `merge` thì chúng ta chỉ cần fix conflict trong một commit.
  Trong khi đó với `rebase`, có thể mỗi commit đều có conflict :slightly_smiling_face:.
- Thật ra chưa chắc bạn đã cần history đẹp :rofl: mọi người đều ổn với `git merge`.

## Require linear history trên Github

Nếu tính năng này được bật trên Github thì bạn sẽ không thể merge pull request bằng cách tạo merge commit được nữa.

![github-merge-linear.png](https://i.imgur.com/FmSXaMI.png)

Bạn chỉ còn 2 lựa chọn là *Squash and merge* và *Rebase and merge*.
*Squash and merge* sẽ squash tất cả commit trong pull request, rebase và merge.
*Rebase and merge* thì cũng gần như rebase chúng ta thấy ở trên.
Cả hai đều dùng *fast forward* strategy để không tạo thêm merge commit và giữ commit history linear.

Nếu bạn merge bằng *Rebase and merge* thì lúc revert PR, Github sẽ tạo cho mỗi commit trong PR một revert commit
thay vì chỉ một commit to như với merge commit.

![github-revert-rebase.png](https://i.imgur.com/q40VJKd.png)