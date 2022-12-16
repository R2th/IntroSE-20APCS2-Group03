> Xin chào mọi người, hôm nay mình xin chia sẻ một số câu lệnh git hay ho mà không phải ai cũng biết và tận dụng nó. Mình xin bỏ những phần lý thuyết ban đầu về GIT mà đi thằng vào vấn đề chính của bài viết này luôn nhé.

## 1.  Git stash
### Lưu lại thay đổi
Câu lệnh `git stash` sử dụng khi mà bạn muốn lưu lại các thay đổi mà bạn chưa `commit`, sẽ rất hữu dụng nếu bạn đang làm dở `code` ở `branch` hiện tại và muốn `checkout` qua một `branch` khác.

Để lưu toàn bộ code đang làm dở, các bạn có thể sử dụng lệnh như sau:

```js
git stash save "save 1"
```
hoặc 
```js
git stash save "save 2" -u
```
Sự khác biệt giữa 2 câu lệnh `git stash save` ở trên đó là: `stash save` đầu tiên sẽ chỉ lưu lại những file đã tồn tại trước đó, nếu thêm `option -u` sẽ lưu luôn những file mới chưa từng tồn tại trong repo.

Bạn có thể `git stash` bao nhiêu lần tuỳ thích và mỗi lần đó git sẽ lưu toàn bộ lần thay đổi đó như 1 phần tử trong 1 `stack`.
### Lấy lại thay đổi
Để xem danh sách các `stash` bạn đang lưu chúng ta sử dụng câu lệnh:
```js
git stash list
```
Nếu bạn muốn xem nội dung của cả thay đổi thì sử dụng thêm `option -p`:
```js
git stash list -p
```
Hoặc xem nội dung cụ thể của một thay đổi cụ thể nào đó:
```js
git stash show stash@{index}
```
Khi muốn apply lại thay đổi từ stash nào đó:
```js
git stash apply stash@{index}
```
hoặc
```js
git stash pop index
```
### Xoá các thay đổi không cần thiết
Khi bạn muốn lấy lại thay đổi và xoá nội dung thay đổi lưu trong `stack`:
```
git stash apply stash@{index}
git stash drop stash@{index}
```
hoặc
```
git stash pop stash@{index}
```
Hay là khi bạn muốn xoá toàn bộ thay đổi đang lưu:
```
git stash clear
```
**Lưu ý**: `index` là vị trí của `stash`.
Demo thành quả nhé:

![](https://images.viblo.asia/a8b70ce3-825e-4354-a527-bdfecd4cd834.png)
## 2. Git cherry-pick
Vậy câu hỏi `git cherry-pick` được sử dụng lúc nào?

Khi bạn muốn đưa các thay đổi từ các `commit` nằm trên branch khác vào `branch` hiện tại của bạn. Cú pháp đơn giản như sau:
```
git cherry-pick id_commit
```
Nếu `cherry-pick commit` xảy ra `conflict`, bạn chỉ cần fix `conflict` và thêm nó vào `commit` là okay nhé.
Và nếu muốn `cherry-pick` một lần nhiều `commit` chúng ta chỉ cần thêm vào như sau:
```
git cherry-pick id_commit_1 id_commit_2 id_commit_n
```
Sau khi `cherry-pick` xong thì các bạn push code lên như bình thường nhé.
## 3. Git rebase -i HEAD~n
Nếu dự án bạn đang làm yêu cầu 1 `pull request` chỉ được một `commit` duy nhất trong khi bạn `push` nhiều `commit` thì câu lệnh này sẽ giúp bạn làm được điều đó.

Đầu tiên thử log xem hiện tại bạn đang có bao nhiêu commit đã nhé:
```
git log --oneline
```
Sau khi quan sát hiện tại có bao nhiêu commit chúng ta thực hiện bước quan trọng này nhé:
```
git rebase -i HEAD~n // n là số commit mà chúng ta biết được thông qua câu lệnh trên nhé
```
Sau đó nó sẽ hiển thị màn hình như bên dưới:

![](https://images.viblo.asia/6de226ed-e55b-4782-b601-7c7c5f5f2c00.png)

Chúng ta sẽ nhấn phím **insert**, di chuyển đến commit cần gộp, sửa **pick** thành **fixup** sau đó chúng ta nhấn phím **esc**, nhập  :wq để lưu thay đổi. Sau đó tiếp hành push lên là okay nhé.
Thành quả sau khi gộp:

![](https://images.viblo.asia/e08c03e4-f41a-4d23-9bc8-1bcc57d22164.png)

Trên là những chia sẻ của mình, hy vọng sẽ giúp ích cho các bạn. Nếu ai có câu lệnh nào hay ho nữa comment bên dưới để cùng nhau chia sẻ kiến thức nhé. Cảm ơn các bạn.

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)