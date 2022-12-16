Bash scripting là một phần cực kỳ  mạnh mẽ và hữu ích của phát triển và quản trị  hệ thống. Lần đâu tiên làm việc với nó có thể gây cho bạn cảm giác sợ hải và phức tạp, mình hy vọng hướng dẫn này sẽ giúp có những hiểu biết cơ bản về bash script để không bị bở ngở khi làm việc với nó.

Bash là một Unix shell, là giao diện dòng lệnh (command line interface - CLI) để tương tác với một hệ điều hành (HĐH). Bất kỳ lệnh nào bạn có thể chạy từ command line đều có thể được sử dụng trong file bash. Bash Script  được sử dụng để chạy một loạt các lệnh.

Bash Script có sẵn theo mặc định trên các hệ điều hành Linux và macOS.

## Mục tiêu của bài viết
Trong hướng dẫn này, Chúng ta sẽ:

Tạo một file bash có thể chạy từ bất kỳ thư mục nào trên máy tính.

Tìm hiểu về các biến, điều kiện, vòng lặp và đầu vào trong bash script.

Tạo một file bash script để push code từ repo local lên repo github.

## 1.Tạo một file script và thực thi nó
Mở của sổ terminal lên và duy chuyển đến Destop, sau đó tạo thư mục tên Mybash bằng lệnh sau:
```
~$cd ~/Destop
~$mkdir Mybash
```
Trong thư mục Mybash vừa tạo ở trên ta chạy lênh sau để tạo một file có tên là hello-world.sh
```
~$touch hello-world.sh
```
Mở file hello-world vừa tạo ở trên bằng một editor bất kỳ và edit lại thành
```
#!/bin/bash
echo Hello, World!
```
Một file bash script phải luôn bắt đầu bằng *#!/bin/bash* để biểu thị rằng tập lệnh sẽ chạy với bash script chứ không phải bất kỳ shell nào khác.  *#!/bin/bash* được gọi là "shebang". Để biết được bash script của bạn được thực thi ở đâu bằng cách chạy lệnh
```
~$which bash
```
Bây giờ, Chúng ta có thể thử chạy file hello-world.sh bằng lệnh
```
~$hello-world.sh
```
Nhưng nó sẽ không hoạt động với tin nhắn
```
-$bash: hello-world: command not found
```
Chúng ta phải cấp quyền thực thi cho file hello-world.sh bằng lệnh
```
~$ chmod u+x hello-world.sh
```
Bây giờ khi chúng ta chạy lệnh, nó sẽ xuất nội dung của lệnh *echo*.
```
~$hello-world.sh
Hello, World!
```
Xin chúc mừng, Chúc ta vừa có fiel bash script đầu tiên và đã chạy thành công. Bạn cũng có thể chạy tập lệnh này từ bất cứ đâu trên máy tính của bạn.
## 2.Biến
Một biến trong bash script được khai báo không có $, nhưng có phải có $ khi được gọi. Edit nội dung file hello-world.sh ở trên thành
```
#!/bin/bash

who="World" #gắn "World" vào biến who

echo Hello, $who! #gọi biến whow bằng cú pháp $who
```
Sau khi edit và thực thi sẽ cho ra kết quả
```
~$ hello-world.sh
Hello, World!
```
Lưu ý rằng who = "World"không hợp lệ - không được có khoảng cách giữa biến và giá trị.
## 3. Input data
Chúng ta đã khai báo một biến tên *who* trong ví dụ trước, nhưng chúng ta cũng có thể nhận được data từ người dùng nhập vào. Ví dụ, thay vì chỉ in ra *Hello, World!*, chúng ta có thể yêu cầu người dùng nhập tên khác, sau đó xuất tên đó. Chúng tôi sẽ làm điều đó bằng cách sử dụng lệnh read.
```
#!/bin/bash

echo Who are you?

read who

echo Hello, $who!
```
Save lại và thực thi file hello-world.sh
```
~$ hello-world
Who are you?
Mickey
Hello, Mickey!
```
## 4. Conditionals
Câu lệnh *if* sử dụng các từ khóa if, then, else và fi. Condition sẽ được đặt trong ngoặc vuông []
Xem ví dụ sau:
```
#!/bin/bash

echo How old are you?

read age

if [ "$age" -gt 20 ]
then
    echo You can drink.
else
    echo You are too young to drink.
fi
```
Thực thì file hello-world.sh
```
~$ check-id
How old are you?
28
You can drink.
```
Các toán tử logic trong bash script hơi khác so với các ngôn ngử khác. Bạn có thể tham khảo bảng sau:
![](https://images.viblo.asia/2ff36c39-8d23-4301-b101-5cc789585033.png)
## 5.Vòng lặp
Trong bash script  sử dụng các vòng lặp for, while và until. Trong ví dụ này, chúng ta sẽ sử dụng for...in để lấy tất cả các tệp trong một thư mục và liệt kê chúng.
```
#!/bin/bash

FILES=/Users/tania/dev/*

for file in $FILES
do
    echo $(basename $file)
done
```
## 6. Ví dụ dung bash script để push commit lên github
Tạo một file có tên *git-deploy.sh* trong repo local, sữa lại các dòng lệnh bên dưới cho đúng với repo của bạn và chạy file *git-deploy.sh* để push commit lên github.
```
#!/bin/bash

read -r -p 'Commit message: ' desc  # prompt user for commit message
git add .                           # track all files
git add -u                          # track deletes
git commit -m "$desc"               # commit with message
git push origin master
```
Mình hy vọng bài viết này hữu ích cho bạn để bắt đầu với bash scripting.
Bài viết được dịch từ https://www.taniarascia.com/how-to-create-and-use-bash-scripts