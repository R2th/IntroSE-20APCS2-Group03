### Introduction
Khi làm việc với git, việc phải gõ toàn bộ câu lệnh đặc biệt là những câu lệnh dài nhiều lần có thể gây khó chịu một chút khi sử dụng. Nếu bạn không muốn gõ toàn bộ text thì bạn có thể cài đặt cho mỗi câu lệnh một alias. Khi đó chỉ cần sử dụng alias đó thay cho toàn bộ text.

### Setup
Để cài đặt alias, có thể sử dụng câu lệnh `git config`. Ví dụ:

```
git config --global alias.co checkout
git config --global alias.cm commit
```
Khi đó để thực hiện lệnh `checkout`, thay vì gõ 

`git checkout master`

thì chỉ cần gõ là:

`git co master`

Ngoài ra có thể vào trực tiếp trong file `.gitconfig` để sửa luôn trong đó, nằm phía dưới mục `[alias]`
Một số alias mình hay sử dụng :

```
[alias]
	aa = add -A
	cmam = commit -a -m
	cmm = commit -m
	cane = commit --amend --no-edit
	cam = commit --amend -m
	co = checkout
	cob = checkout -b
	cof = checkout -f
	br = branch
	lg = "!sh -c 'if [ $0 = sh ]; then git log --oneline; else git log --oneline -$0; fi'"
	lgg = log --oneline --graph
	rh = reset --hard
	rs = reset
	didetrove = "!sh -c 'git checkout $1; git pull $0 $1; git checkout -'"
```

Nếu đặt alias bằng mấy chữ viết tắt như trên mà khó nhớ thì có thể đặt theo ý nghĩa cho dễ hiểu, ví dụ:

`delete = push upstream --delete develop`

**Chúc mọi người dùng git vui vẻ :3**
### Thanks for reading