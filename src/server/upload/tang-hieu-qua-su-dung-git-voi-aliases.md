Khi làm việc với Git CLI, chúng ta thường gõ rất nhiều lệnh dài dòng và lặp đi lặp lại. Tuy nhiên, Git có hỗ trợ Alias nên nó rất hữu ích và tiết kiệm thời gian gõ giúp chúng ta tăng năng suất cũng như hiệu quả công việc.

![](https://images.viblo.asia/e456e751-68d3-4684-8773-1c41a6313872.jpg)

### Git Alias là gì ?
> alias (noun): bí danh, tên hiệu, biệt hiệu.


Về cơ bản Git Alias cung cấp khả năng lưu một lệnh với một tên khác (có thể ngắn hơn hay dài hơn)

### Cách thêm Git Alias
Có 2 cách để thêm:

1/ Thêm vào file git config:
`git config --global --edit`

```
[alias]
  co = checkout
```
  
2/ Sử dụng Git CLI: 
`git config --global alias.co checkout`

### Sử dụng Git Alias như thế nào ?
Sau khi chạy một trong 2 lệnh ở trên, bây giờ chúng ta có thể sử dụng Git Alias cho lệnh checkout.
Thay vì gõ `git checkout` thì lúc này chỉ cần gõ `git co`.

Tham số với lệnh vẫn sử dụng như bình thường, ví dụ để tạo một nhánh mới thì sẽ là:
`git co -b new-branch`

### Danh sách các ``alias`` thường dùng:
```
# ...

[aliases]
  # basic commands
  co = checkout
  br = branch
  st = status
  ci = commit

  # quick --fixup commit
  # ex: git fixup [hash]
  fixup = commit --fixup

  # quick --amend commit
  # ex: git amend [hash]
  amend = commit --amend

  # quick rebase on top of latest remote master
  # ex: git rom
  rom = rebase origin/master

  # safe force push if no one else pushed yet
  # ex: git pf
  # note: suggestion to use whenever "git rom"
  pf = push --force-with-lease

  # safe switch to another branch
  # ex: "git switch another-branch"
  # note: it will stage all changes and save to stash before checkout
  switch = !git add . && git stash save WIP && git co

  # compact commit history flat view
  # ex: "git ls"
  # ex: "git ls -5" - show last 5 commits
  # see: https://git-scm.com/docs/pretty-formats for more details
  ls = log --pretty=format:'%C(yellow)%h %C(green) %cr%C(red) %d%C(reset) %s%C(bold blue) <%an>%C(reset)' --abbrev-commit

  # compact commit history graph view
  # ex: "git lg"
  # see: https://git-scm.com/docs/pretty-formats for more details
  lg = log --pretty=format:'%C(yellow)%h %C(green) %cr%C(red) %d%C(reset) %s%C(bold blue) <%an>%C(reset)' --abbrev-commit --graph

  # compact statistics for certain commit
  # ex: "git stat [hash]"
  stat = show --stat --oneline
```

Trên đây là cách sử dụng Git Alias mình vừa học được, qua quá trình sử dụng thì mình thấy khá hiệu quá. Hy vọng nó cũng hữu ích với bạn. :kissing_heart:

*Nguồn nè: https://towardsdev.com/speed-up-your-git-workflow-with-aliases-2d9e69ff5535*