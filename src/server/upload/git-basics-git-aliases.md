# Git Aliases
**Git Alias** là một tip nhỏ giúp cho trải nghiệm Git của bạn trở đơn giản, dễ dàng và quen thuộc hơn.

Git không tự động suy luận được câu lệnh của bạn mỗi khi bạn gõ nhầm hay chỉ gõ một phần của câu lệnh. Nếu bạn không muốn gõ toàn bộ câu lệnh của Git. Bạn hoàn toàn có thể thiết lập **Git Alias** bằng cách sử dụng `git config`. Dưới đây là một số ví dụ:

```
$ git config --global alias.co checkout
$ git config --global alias.br branch
$ git config --global alias.ci commit
$ git config --global alias.st status
```

Ví dụ trên có nghĩa, thay vì phải gõ `git commit`, bạn chỉ cần gõ `git ci` là có thể add 1 commit message lên feature branch mà bạn đang làm việc . Những câu lệnh còn lại trong thiết lập trên hoàn toàn tương tự.

Kĩ thuật này cũng rất hữu ích trong việc tạo ra những câu lệnh ngắn gọn, ngữ nghĩa, do đó dễ nhớ, dễ thao tác hơn rất nhiều từ những câu lệnh đã có sẵn. Mình ví dụ:

```
$ git config --global alias.last 'log -1 HEAD'
```

Bằng cách này, bạn có thế view commit cuối cùng một cách dễ dàng:

```
$ git last
commit 5fa3039f9216bc64cc29e0ff7f8095c6e4bb37bc (HEAD -> master, origin/master, origin/HEAD)
Author: sydinh <sydinh@gmail.com>
Date:   Wed Apr 18 08:49:40 2018 +0700

        Config http to https for sydinh.com domain
```
Rất dễ nhớ và tiết kiệm thời gian đúng không nào.

Đến đây, có thể bạn sẽ nghĩ, kĩ thuật **Git Alias** chỉ có thể thay thế được những câu lệnh Git thông thường bởi những new command. Tuy nhiên, Git Alias có thể làm được nhiều hơn thế. Mình ví dụ, bạn mong muốn run một lệnh bên ngoài thay vì run một lệnh con của Git. Bạn có thể start một command với kí tự `!` (dấu chấm than). Ví dụ, sử dụng `git visual` để run lệnh `gitk` nhé:
```
$ git config --global alias.visual "!gitk"
```

Work đúng không nào.

# Kết luận
#### Tạo Git Alias

> git config --global alias.YourAlias

#### Sửa và xóa Git Alias

###### Xóa Git Alias:

> git config --global --unset alias.YourAlias

###### Sửa Git Alias:

> vim ~/.gitconfig hoặc git config --global --edit

Sau đó tìm đến **Git Alias** mà bạn muốn sửa -> thực hiên sửa **Git Alias**.

#### Tham khảo

Các bạn có thể tìm thấy các thiết lập **Git Alias** của mình ở đây nhé [handsome-git-aliases](https://github.com/sydinh/handsome-git-aliases)

Hi vọng bài viết giúp ích được các bạn.

Chúc các bạn học tốt !