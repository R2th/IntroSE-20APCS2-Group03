cd dùng để thay đổi thư mục làm việc hiện tại, là một trong những lệnh được thường xuyên nhất khi sử dụng HĐH Linux, Unix. 
Nhưng câu lệnh dưới đây có thể sẽ giúp bạn tăng năng suất  làm việc và thao tác dễ dàng hơn.

### Sử dụng CD command để điều hướng thư mục làm việc
Nếu bạn đang làm việc với 1 thư mục rất nhiều tầng, việc dùng cd ../../ chuyển đổi  qua lại giữa các thư mục đôi lúc cũng khiến chúng ta cảm thấy ức chế.

Ví dụ thư mục làm  việc của bạn:
```
# mkdir -p
/tmp/very/long/directory/structure/that/is/too/deep
# cd /tmp/very/long/directory/structure/that/is/too/deep
# pwd
/tmp/very/long/directory/structure/that/is/too/deep
# cd ../../../../
# pwd
/tmp/very/long/directory/structure
```
Sử dụng 1 trong những cách dưới đây để cải thiện điều khó chịu trên.

**Cách 1: Điều hướng bằng cách sử dụng "..n"**.
Trong ví dụ dưới, ..4 được sử dụng để đi lên 4 cấp độ của thư mục. ..3 để đi lên 3 cấp của thư mục, ..2 đi lên 2 cấp của thư mục. Hãy add đoạn alias dưới đây vào ~/.bash_profile.
```
alias ..="cd .."
alias ..2="cd ../.."
alias ..3="cd ../../.."
alias ..4="cd ../../../.."
alias ..5="cd ../../../../.."
```
sau đó login lại:
```
#source ~/.bash_profile
# cd /tmp/very/long/directory/structure/that/is/too/deep
# ..4
[Note: use ..4 to go up 4 directory level]
# pwd
/tmp/very/long/directory/structure/
```
**Cách 2: Điều hướng chỉ dùng ".."**
Ở đây chúng ta chỉ dùng .....
add alias vào profile:
```
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."
alias ......="cd ../../../../.."
```
đăng nhập lại bash_profile
```
# cd /tmp/very/long/directory/structure/that/is/too/deep
# .....
[Note: use ..... (five dots) to go up 4 directory level]
# pwd
/tmp/very/long/directory/structure/
```

**Cách 3: Điều hướng bằng cách dùng "cd..."**
sử dụng alias:
```
alias cd..="cd .."
alias cd...="cd ../.."
alias cd....="cd ../../.."
alias cd.....="cd ../../../.."
alias cd......="cd ../../../../.."
```
re-login bashprofile
```
#source ~/.bash_profile
# cd /tmp/very/long/directory/structure/that/is/too/deep
# cd.....
[Note: use cd..... to go up 4 directory level]
# pwd
/tmp/very/long/directory/structure
```
**Cách 4: sử dụng cd với number**
```
alias cd1="cd .."
alias cd2="cd ../.."
alias cd3="cd ../../.."
alias cd4="cd ../../../.."
alias cd5="cd ../../../../.."
```
### Sử dụng mkdir với cd 
thông thường ta phải tạo ra thư mục rồi dùng cd để đi tới thu mục đó
```
# mkdir -p /tmp/subdir1/subdir2/subdir3
# cd /tmp/subdir1/subdir2/subdir3
# pwd
/tmp/subdir1/subdir2/subdir3
```
giờ ta có thể kết hợp cả 2 điều đó, add alias sau vào ~/.bash_profile và re-login
```
# vi .bash_profile
function mkdircd () { mkdir -p "$@" && eval cd "\"\$$#\"";
}
```
### Chuyển đổi giữa 2 thư mục sư dụng cuối cùng
sử dụng cd -:
di chuyển tới thu mục sample:
```
$ cd /usr/local/sample
$ pwd
/usr/local/sample
```
di chuyển tới thu mục khác:
```
$ cd /var/local/logs
$ pwd
/var/local/logs
```
dùng cd - để quay lại ngay thư mục sample:
```
$ cd - 
$ pwd
/usr/local/sample
```

Trên đây là một số tips hi vọng sẽ giúp các bạn nâng cao hiệu suất làm việc.
Cảm ơn các bạn đã đọc bài viết của  mình.

Nguồn: Linux-101-hacks