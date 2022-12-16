Trong bài viết này, mình sẽ hướng dẫn cách cài đặt Git Hooks cho ứng dụng Rails của bạn để đảm bảo chất lượng code của mọi người tốt hơn. Nếu mọi người đã và đang làm Rails chắc sẽ không còn lạ lẫm vỡi những khái niệm như `Rubocop`, `Breakman` và `Rspec` nữa. Trước khi `push` code lên Git mọi người thường hay chạy những câu lệnh như `rubocop` hoặc `rspec`. Có vẻ hơi mất công "gõ phím" khi bạn phải chạy lần lượt 3 câu lệnh `rubocop`, `rspec` sau đó là `git push ...`. Mình sẽ hướng dẫn các bạn chạy lần lượt 3 câu lệnh trên chỉ trong 1 lần "gõ phím".

Đầu tiên tạo 1 thư mục có tên là `scripts ` trong dự án của bạn.
```
$ cd rails-app
$ mkdir scripts
```

Sau đó, chúng ta sẽ tạo thêm 3 file bash vào trong thư mục `scripts` cho mỗi lệnh chúng ta muốn chạy. Trong trường hợp này 3 file bash dùng để chạy `Rubocop`, `Breakman` và `Rspec`. 
#### 1. scripts/run-rubocop.bash
```
#!/usr/bin/env bash

set -e

cd "${0%/*}/.."

echo "Running rubocop"
bundle exec rubocop
```

#### 2. scripts/run-brakeman.bash
```
#!/usr/bin/env bash

set -e

cd "${0%/*}/.."

echo "Running brakeman"
bundle exec brakeman
```
#### 3. scripts/run-tests.bash
```
#!/usr/bin/env bash

set -e

cd "${0%/*}/.."

echo "Running tests"
bundle exec rspec
```
Chúng ta cũng có thể tạo thêm các file bash khác để chạy những câu lệnh mình mong muốn, tùy theo nhu cầu sử dụng.

Tiếp theo, chúng ta sẽ tạo thêm 2 file bash là `pre-commit` và `pre-push`

#### 1. scripts/pre-commit.bash
```
#!/usr/bin/env bash

echo "Running pre-commit hook"
./scripts/run-rubocop.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Code must be clean before commiting"
 exit 1
fi
```

#### 2. scripts/pre-push.bash
```
#!/usr/bin/env bash

echo "Running pre-push hook"
./scripts/run-brakeman.bash
./scripts/run-tests.bash

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Brakeman and Tests must pass before pushing!"
 exit 1
fi
```

Tiếp đến, chúng ta sẽ tạo 1 file bash để liên kết các file bash vừa tạo.

#### scripts/install-hooks.bash
```
#!/usr/bin/env bash

GIT_DIR=$(git rev-parse --git-dir)

echo "Installing hooks..."
# this command creates symlink to our pre-commit script
ln -s ../../scripts/pre-commit.bash $GIT_DIR/hooks/pre-commit
ln -s ../../scripts/pre-push.bash $GIT_DIR/hooks/pre-push
echo "Done!"
```

Tất cả các file cần thiết đã được tạo, trước khi chạy file `scripts/install-hooks.bash` chúng ta cần cấp quyền truy cập cho nó bằng cách chạy câu lệnh: 
```
$ chmod +x scripts/*.bash
```

Cuối cùng, chúng ta chạy file `install-hooks.bash`

```
$ ./scripts/install-hooks.bash
```
Màn hình Terminal sẽ hiển thị 
```
Installing hooks...
Done!
```
Như vậy, bây giờ mỗi khi bạn thực hiện `commit` code thì câu lệnh `rubocop` sẽ tự động chạy và khi bạn thực hiện `push` code thì 2 câu lệnh `breakeman` và `rspec` cũng sẽ được tự động chạy. Sẽ tiết kiệm được một chút thời gian giữa các lần `commit` và `push` code của bạn. Chúc các bạn thành công.