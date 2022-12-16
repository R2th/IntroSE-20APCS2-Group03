> Hello hello mọi người, hôm nay mình xin chia sẻ một ít kiến thức của bản thân mình về `git` và cụ thể bài viết hôm nay mình sẽ chia sẻ về các lệnh xem lịch sử `commit`. Chúng ta cùng bắt đầu luôn nhé!

### 1. Git log -p -n
Lệnh này giúp chúng ta hiển thị lịch sử thay đổi chi tiết của từng `commit`, trong đó `n` là số `commit` mà chúng ta muốn xem. Hãy xem ví dụ dưới đây để hình dung rõ hơn nhé.

![](https://images.viblo.asia/7549ff7f-3f82-4f2e-938d-23a4d212bad5.png)

### 2. Git log —stat
Lệnh này giúp chúng ta hiển thị lịch sử thay đổi của `file` trong từng `commit`.

![](https://images.viblo.asia/97e0a307-fcdf-4969-8d6e-5d18332c3d18.png)

### 3. Git log —pretty
Ở lệnh này có khá nhiều `option` mà bạn có thể lựa chọn, trong bài viết này mình sẽ chia sẻ về các `option` như sau:

* `git log --pretty=oneline`: Hiện thị lịch sử `commit` gồm nội dung là id `commit` và tên của `commit`.

![](https://images.viblo.asia/b7705f28-142e-40f8-9800-6cf3be873474.png)

* `git log --pretty=format:"%h %an, %ar : %s"`: Hiển thị lịch sử `commit` theo format mà bạn mong muốn (các bạn có thể tham khảo ở [link](https://git-scm.com/docs/pretty-formats) này).

![](https://images.viblo.asia/a1afcba9-01c9-4fb4-87c0-a3d4a246ed56.png)

* ` git log --pretty="%h - %s" --author="nameauthor"  --since="2020-08-20"`: Nếu bạn muốn hiển thị lịch sử của một author nào đó trong thời gian nào thì bạn có thể áp dụng lệnh này nhé. Nó sẽ giúp bạn hiển thị nội dung gồm: hash `commit` - tên `commit`.

![](https://images.viblo.asia/350cab21-cc42-47e1-a29a-ec97a7cee1a1.png)

### 4. git log —since
Giúp chúng ta hiển thị lịch sử `commit` cách đây khoảng bao nhiều thời gian. Ví dụ mình sẽ dùng lệnh `git` như sau:

```js
git log —since=30.weeks // hiển thị thông tin commit trong vòng 30 tuần gần đây.
```

![](https://images.viblo.asia/9b2d7a7c-bc6e-4b66-bf66-cd8cff1114f9.png)

### 5. Tổng kết
Ngoài những lệnh `git` mà mình đã chia sẻ trên thì còn khá là nhiều lệnh khác nữa, nhưng trong bài chia sẻ này mình chỉ chia sẻ những lệnh mới mà mình vừa tìm hiểu được. Nếu bạn có những câu lệnh hay ho khác có thể chia sẻ ở comment để mọi người cùng học hỏi nhé. Cảm ơn các bạn.

![](https://images.viblo.asia/2e26fa15-6d36-4b2a-b0a1-3ac7b93e1eca.jpg)