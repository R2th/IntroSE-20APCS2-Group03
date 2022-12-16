Để tích hợp Circle CI vào một project Rails thì đầu tiên chúng ta cùng đi qua các khái niệm về CI, CircleCI là gì . Từ đó chúng ta có thể hiểu được về mục địch, ý nghĩa và lí do chúng ta nên áp dụng CI vào một project.

# CI là gì ?
CI (Continuous Integration) : tạm dịch là tích hợp liên tục , nghe có vẻ cao siêu nhưng thật chất nó chỉ là một phương pháp để các team phát triển phần mềm có thể áp dụng vào để đảm bảo những phần code bị thay đổi luôn build được và luôn pass toàn bộ các Unit test.
Giả sử chúng ta không sử dụng CI, một developer sau khi hoàn thành task của mình , anh ta commit code của mình lên, phần code của anh ta chưa được đảm bảo sẽ build được, và đã pass tất cả các Unit test hay chưa , việc đó sẽ gây khó khăn trong việc truy tìm lỗi, tốn nhiều thời gian để có thể tích hợp phần code mới vào một cách chuẩn xác, từ đó ảnh hưởng đến chất lượng công việc làm giảm tiến độ của dự án.

# Circle CI là gì ?
Đơn giản nó là 1 tool để giúp ta hiện thực hóa CI. Giả sử khi chúng ta push code của mình lên repo , chúng ta cần một môi trường để quá trình CI được diễn ra, thì CircleCI chính là một công cụ để giúp ta thực hiện điều đó.
 * **CircleCi nó hoạt động như thế nào ? **
 
Bản chất Circle CI là sử dụng docker, chúng ta sẽ cấu hình docker image cần với project của chúng ta, và sẽ định nghĩa các job , trong các job sẽ có các command, từ đó CircleCI có thể thực hiện tuần tự các yêu cầu theo như mong muốn của chúng ta

Mô tả quá trình run 1 job trên Circle CI:
 * Khi chúng ta push hoặc merge vào 1 branch, CircleCI sẽ biết được event đó và nó có thể tiến hành quá trình CI
 * Ban đầu nó sẽ pull các docker image tương ứng mà chúng ta config để run trên môi trường cloud của nó
 * Sau đó nó sẽ lấy source code của chúng ta, và thực hiện các câu lệnh ta định nghĩa trong job
 * Sau khi các step ta định nghĩa kết thúc , nó sẽ thông báo kết quả fail hay pass , từ đó ta có thể nắm được thông tin và điều chỉnh cho phù hợp

# Áp dụng CircleCi vào Rails app
Bây giờ chúng ta sẽ tiến hành áp dụng nó vào project nhé
Đầu tiên, ta đăng nhập vào trang [CircleCI](https://circleci.com/vcs-authorize/) , và login bằng tài khoản github (đảm bảo rằng bạn đã tạo một repo và đẩy lên github rồi nhé )

![](https://images.viblo.asia/1fb1deda-f06c-49c9-a13f-f183f750c675.png)

Sau khi đăng nhập vào tài khoản github , nó sẽ load toàn bộ các repo của github account chúng ta
Tiếp theo, ta sẽ chọn vào repo mà ta muốn sử dụng CI bằng cách nhấn vào nút Set Up Project, sau khi nhấn vào:

![Screenshot from 2021-09-19 16-08-38.png](https://images.viblo.asia/3e33cb60-5934-4c36-a26d-dacebf42099f.png)

Ta thấy rằng nó sẽ cho ta một đoạn code example , ở hình ảnh là ruby , bạn có thể tham khảo đoạn code mẫu của ngôn ngữ khác bằng cách Change config sang ngôn ngữ khác ở góc trái màn hình
Điều lưu ý ở đây đoạn code này sẽ để ở đâu, thì chúng ta sẽ để nó ở đường dẫn sau .circleci/config.yml trong repo của chúng ta. CircleCI sẽ đọc file này và run các command tương ứng do ta định nghĩa ở đây.
Sau đó chúng 

Giờ thì ta sẽ config các command tương ứng để một project rails có thể run được trên môi trường CircleCI: 
Ở trong file .circleci/config.yml ở repo ta sẽ định nghĩa như sau: 
```
version: 2.1
orbs:
  ruby: circleci/ruby@1.1.2

jobs:
  build:
    docker:
      - image: circleci/ruby:3.0.0
      - image: mysql:5.7
        environment:
          MYSQL_ROOT_PASSWORD: "12345678"
    steps:
      - checkout
      - ruby/install-deps
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://127.0.0.1:3306 -timeout 1m
      - run:
          name: set up db
          command: bundle exec rails db:create db:migrate
      - run:
          name: run rspec
          command: bundle exec rspec

```
Đây là đoạn code mình viết cho một rails app, chúng ta cùng xem qua ý nghĩa của từng dòng lệnh trên nhé
 * Version: Nó là version của CircleCI, ở đây chúng ta đang sử dụng version 2.1
 * orbs: nó là một packages được chia sẽ rộng rãi, nó giúp cho quá trình config được đơn giản hóa, bao gồm các job , command cơ bản, install các dependencies cần thiết để chạy được một ứng dụng , ở đây chúng ta dùng rails nên mình sẽ sử dụng orb rails . Có thể tìm thêm các orb khác ở đây https://circleci.com/developer/orbs
 * jobs: Nó định nghĩa tập hợp các công việc để chạy, ở trong jobs có build ( là công việc mà job sẽ chạy, ta có thể đặt tên bất kì cho phù hợp) , trong build thì có docker image ( nó chỉ định docker sẽ dùng cho job này, vì chúng ta sử dụng rails nên sẽ chọn docker image là ruby)
 * step: Nó sẽ thực hiện các command của chúng ta theo thứ tự từ trên xuống 

Bây giờ, chúng ta có thể vào trang circel ci để xem kết quả mỗi lần push code lên nha

# Tài liệu tham khảo
* [Circle CI document](https://circleci.com/docs/)