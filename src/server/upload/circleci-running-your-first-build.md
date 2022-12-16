CI/CD là một bộ đôi công việc liên quan đến việc tự động làm những công việc lặp đi lặp lại của developers, bao gồm CI (Continuous Integration) và CD (Continuous Delivery), ý nói là quá trình tích hợp (integration) thường xuyên, nhanh chóng hơn khi code cũng như thường xuyên cập nhật phiên bản mới (delivery). 

**CircleCI** là một sản phẩm thực hiện cả CI/CD, cụ thể nó build, kiểm thử các script bạn cài đặt và tests (unit test) chẳng hạn và tự động deploy ứng dụng - Continuous Deploy.

> **CircleCI** automates your software builds, tests, and deployments.

![](https://circleci.com/docs/assets/img/docs/arch.png)

**CircleCI** chạy gần 1 triệu jobs mỗi ngày, hỗ trợ  30.000 tổ chức. Các tổ chức này chọn CircloCI bởi vì jobs chạy nhanh và việc builds ứng dụng có thể được tối ưu xử lý về tốc độ. **CircleCI** có thể được cấu hình để chạy nhiều pipelines phức tạp một cách hiệu quả.

Với một developer cũng có thể sử dụng **SSH into any joib** để debug các vấn đề khi build, cài đặt song song các jobs để chạy nhanh hơn, và config caching với 1 vài từ khóa đơn giản để có thể sử dụng lại dữ liệu từ jobs trước đó qua workflow.

Đối với người điều hành và quản trị viên, sử dụng CircleCI cài đặt trên server chung, CircleCI cung cấp giao diện trực quan theo dõi việc build của bạn.

Tài liệu cung cấp hướng dẫn từng bước để bạn build thành công lần đầu trên **Circle 2.0**

# 0. Yêu cầu trước khi chạy build lần đầu
- Các kiến thức cơ bản về Git, có tài khoản GitHub.com, GitHub repository
- Có kiến thức cơ bản về `terminal` hoặc `bash` để sử dụng command line một cách hữu ích

# 1. Createting a Repository
Bước 1: Chọn repositories và nhấn New hoặc vào trực tiếp trang này https://github.com/new

![](https://circleci.com/docs/assets/img/docs/GH_Repo-New-Banner.png)

Bước 2: Chọn **Initialize this repository with a README** và click **Create repository** button:

![](https://circleci.com/docs/assets/img/docs/create-repo-circle-101-initialise-readme.png)

# 2. Thêm một `.yml` file
**Circle** sử dụng 1file YAML để xác định làm sao bạn muốn test môi trường và test những thứ bạn muốn chạy. Trong **Circle 2.0**, file này phải được gọi là `config.yml` và phải được trong thư mục ẩn `.circleci`. Trên Mac, Linux và Windows, tên files và folders bắt đầu với dấu chấm sẽ bị ấn đi theo cài đặt mặc định.
```bash
mkdir .circleci
touch .circleci/config.yml
```
Và nội dung của file `config.yml`
```:config.yml
 version: 2
 jobs:
   build:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A first hello"
```

sau đó commit và push lên repo như thông thường nhé
```bash
git add .circleci/config.yml
git commit -m "Create circle-ci config"
git push origin master
```
Hoặc bạn cũng có thể tạo với giao diện 

# 3. Setting up Your Build on CircleCI
* Bước 1: Trước khi thực hiện bước này bạn cần tạo một tài khoản CircleCI. Sau đó vào trang [Dashboard](https://circleci.com/dashboard).

* Bước 2: Tiếp theo bạn sẽ nhận được tùy chọn danh sách các projects bạn có thể truy cập và building CircleCI. Ở màn hình tiếp theo, bạn có thể thêm repo bạn đã tạp như 1 project mới trên CircleCI
 
* Bước 3: Để thêm repo mới của bạn, nhấn **Set Up project**

![](https://circleci.com/docs/assets/img/docs/CircleCI-add-new-project-list.png)

* Bước 4: Ở màn hình tiếp theo, bạn sẽ nhận được 1 vài tùy chọn cấu hình cho project của bạn trên CircleCI. Lựa chọn phù hợp và nhấn **Start building**

![](https://circleci.com/docs/assets/img/docs/CircleCI-2.0-setup-project-circle101.png)

![](https://circleci.com/docs/assets/img/docs/CircleCI-2.0-start-building.png)

# 4. Running Your First CircleCI Build!
Bạn nên xem lần build chạy tự động và pass! Vậy, cái gì đang diễn ra? Nhấn vào nút **Success** xanh trên Dashboard để xem xét các phần chạy.

![](https://images.viblo.asia/06e25cc3-cf6f-4059-9787-aaec26d23358.png)

- **Spin up environment**: CircleCI đã sử dụng circleci/ruby:2.4.1. Docker image to launch a virtual computing environment.
- **Checkout code**: CircleCI checked out your GitHub repository và "cloned" vào vào the virtual environment launched in Step 1.
- **echo**: Đây là các lệnh khác trong file `config.yml`: CircleCI chạy lệnh echo với inpuit "A first hello".
Mặc dù thực chất không có source code trên repo của bạn và thực tế không được cấu hình tests trong file config.yml, CircleCI vẫn xem xét build của bạn đã "succeeded" vì tất cả các bước đã thành công (đã được trả về 0). Thực chất nhiều projects phức tạp hơn rất nhiều, thông thường sẽ có nhiều Docker images và nhiều bước, bao gồm số lượng test rất lớn.

# 5. Breaking Your Build!
Chỉnh sửa file config.yml trên GitHub và tạo commit mới để thực hiệnlần build mới. Nếu build lỗi, sẽ có nút đỏ Failed và CircleCI sẽ gửi cho bạn 1 email để thông báo lỗi.

# 6. Using the Workflows Functionality
Hướng dẫn tiếp theo sẽ hướng dẫn bạn sử dụng workflow, một điểm mạnh của CircleCI giúp build các jobs song song hoặc cần phụ thuộc vào nhau.

* Bước 1: Để xem luồng làm việc, chỉnh sửa file `.circleci/config.yml`
```
 version: 2
 jobs:
   build:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A first hello"
   build:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A first hello"
```
* Bước 2: Tiếp theo, đổi tên 2 jobs để chúng khác tên. Trong ví dụ này chúng tôi sẽ đặt tên chúng là **one** và **two**. Thay đổi nội dung `echo` khác nhau nữa. Để có thời gian giữa csac lần build trước, chúng ta có thể thêm lệnh `sleep`.
* Bước 3: Thêm phần `workflows` vào file `config.yml`. Phần này có thể được đặt ở bất cứ đâu trong file. Nhưng nó thường được đặt ở đầu hoặc cuối file:
```
 version: 2
 jobs:
   one:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A first hello"
       - run: sleep 25
   two:
     docker:
       - image: circleci/ruby:2.4.1
     steps:
       - checkout
       - run: echo "A more familiar hi"
       - run: sleep 15
 workflows:
   version: 2
   one_and_two:
     jobs:
       - one
       - two
```
* Bước 4: Commit sự thay đổi này, đẩy lên repository của bạn và nhìn lại **CircleCI** dashboard

![](https://circleci.com/docs/assets/img/docs/workflows-circle-101-running.png)

* Bước 5: Click vào link để xem `workflow` 2 jobs chạy song song

![](https://circleci.com/docs/assets/img/docs/inside-workflows-circle-101-running.png)
Xem thêm workflow tại: https://circleci.com/docs/2.0/workflows/#overview

# 7. Adding Some Changes to use the Workspaces Functionality
Mỗi workflow cần liên kết không gian làm việc, cái mà có thể dùng để chuyển file từ jobs trên xuống xác workflow đang xử lý. Bạn có thể sử dụng workflow để làm việc này.
```
version: 2
jobs:
  one:
    docker:
      - image: circleci/ruby:2.4.1
    steps:
      - checkout
      - run: echo "A first hello"
      - run: mkdir -p my_workspace
      - run: echo "Trying out workspaces" > my_workspace/echo-output
      - persist_to_workspace:
          # Must be an absolute path, or relative path from working_directory
          root: my_workspace
          # Must be relative path from root
          paths:
            - echo-output      
  two:
    docker:
      - image: circleci/ruby:2.4.1
    steps:
      - checkout
      - run: echo "A more familiar hi"  
      - attach_workspace:
          # Must be absolute path or relative path from working_directory
          at: my_workspace

      - run: |
          if [[ $(cat my_workspace/echo-output) == "Trying out workspaces" ]]; then
            echo "It worked!";
          else
            echo "Nope!"; exit 1
          fi
workflows:
  version: 2
  one_and_two:
    jobs:
      - one
      - two:
          requires:
            - one
```

# 8. SSH into Your Build
Nếu bạn cảm thấy thoải mái hơn với terminal, bạn có thể sử dụng SSH trực tiếp tới jobs **CircleCI** để xử lý vấn đề với builds bằng cách chạy lại build với SSH enabled option.

Sử dụng cách này cũng rất thuận tiện để bạn debug các jobs của mình, tuyệt vời phải không nào.

> Note that you will need to add your SSH keys to your GitHub account: https://help.github.com/articles/connecting-to-github-with-ssh/.
> 
![](https://circleci.com/docs/assets/img/docs/rebuild-with-SSH.png)
![](https://circleci.com/docs/assets/img/docs/SSH-build-terminal-string.png)
OK rồi đó, bạn có thể copy lệnh shh sinh ra và truy cập thôi
```
ssh -p 64539 54.146.195.254
```
Như vậy bạn đang thực thi jobs này dưới dạng command line. Bạn có thể sử dụng các lệnh trong workspace thôi:
```
pwd     #  print what directory, find out where you are in the file system
ls -al   # list what files and directories are in the current directory
cd <directory_name>    # change directory to the <directory_name> directory
cat <file_name>    # show me the contents of the file <file_name>
```
# Tổng kết
* Để tích hợp CircleCI ứng dụng, cũng đơn giản, tạo file cấu hình `.circleci/config.yml` và cấu hình trên Dashboard là được https://circleci.com/dashboard
* Nếu bạn chỉ cần chạy 1 jobs đơn giản như check convention, unit test, không cần setting quá nhiều thứ nội dung file này sẽ khá đơn giản, bao gồm các `run` trong `steps` là được
```
version: 2.1
jobs:
  build:
    docker:
      - image: circleci/php:7.2-node-browsers

    steps:
      - checkout

      - run:
          name: Install Composer
          command: |
            php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
            php -r "if (hash_file('SHA384', 'composer-setup.php') === trim(file_get_contents('https://composer.github.io/installer.sig'))) { echo 'Installer verified'; } else { echo 'Installer invalid'; unlink('composer-setup.php'); } echo PHP_EOL;"
            php composer-setup.php
            php -r "unlink('composer-setup.php');"
      - run:
          name: Running PHPCS
          command: |
            cd ./vendor/squizlabs/php_codesniffer/src/Standards
            git clone git@github.com:wataridori/framgia-php-codesniffer.git Framgia
            cd ../../../../../
            ./vendor/bin/phpcs -n
```
* Nếu có nhiều jobs hơn, hãy xem xét sử dụng `jobs` và `workflows` (ví dụ như bạn vừa muốn check các tests và muốn deploy chẳng hạn)
* Sử dụng SSH để debug các jobs, truy cập vào container để kiểm tra.
* Các lệnh trong CircleCI hoàn toàn có thể tham chiếu tới các biến môi trường, cho phép bạn làm việc có thể mở rộng hơn!
# Tài liệu tham khảo
[CircleCI - Get started](https://circleci.com/docs/2.0/getting-started/#section=getting-started)