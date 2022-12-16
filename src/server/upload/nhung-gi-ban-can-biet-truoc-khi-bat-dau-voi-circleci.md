Bài viết gốc: [dnlblog.com](https://www.dnlblog.com/posts/nhung-gi-ban-can-biet-truoc-khi-bat-dau-voi-circleci)

Như đã biết, CircleCI là một nền tảng giúp chúng ta thực hiện CI/CD một cách dễ dàng. Tất cả những gì chúng ta cần làm là tạo một file config, từ đó CircleCI sẽ tự biết mình sẽ phải làm gì để hoàn thành công việc cho bạn. Tuy đơn giản như vậy nhưng nếu không nắm được những kiến thức cơ bản, bạn có thể sẽ gặp khó khăn trong một vài trường hợp. Rồi sau đó, bạn sẽ phải giành cả ngày trên mạng để tìm câu trả lời, tuy nhiên việc chắp vá những thứ trên mạng không phải lúc nào cũng giúp bạn giải quyết được vấn đề. Vì thế, ngày hôm nay chúng ta sẽ đi tìm hiểu về những khái niệm cơ bản nhất trong CircleCI qua đó sẽ giúp bạn tự tin hơn khi sử dụng nó.

## CircleCI Concepts
Trong thư mục root của dự án, bạn tạo ra một thư mục có tên là `.circleci`, trong đó sẽ chứa file `config.yml`. Bạn sẽ giao tiếp với CircleCI thông qua file config này. Dưới đây là hình ảnh về cấu trúc của file `config.yml` , chúng ta sẽ đi lần lượt qua từng mục một để hiểu rõ hơn về chúng nhé:
![](https://images.viblo.asia/bb6530ae-de5e-481f-aa6d-1a298e2dbf26.png)
### `commands`
Trong quá trình thực hiện CI/CD, có thể sẽ phát sinh trường hợp bạn phải làm những công việc lặp lại trong cùng một lần build. Vì thế đây sẽ là nơi bạn gom những công việc đó lại với nhau. Ngoài việc làm cho config của bạn gọn gàng hơn, commands cũng sẽ là nơi bạn định nghĩa những steps để thực hiện các công việc mà sau đó bạn có thể sử dụng nó ở bất cứ đâu.
```yaml
commands:
  sayhello:
    description: "A very simple command for demonstration purposes"
    parameters:
      to:
        type: string
        default: "Hello World"
    steps:
      - run: echo << parameters.to >>
 ```
Trong đó:
* `steps`: Danh sách các bước sẽ thực hiện trong command.
* `parameters`: Một mảng parameters sẽ được sử dụng trong các steps.
* `description`: Mô tả cho chức năng của command.

### `executors`
Để chạy được CI/CD chắc chắn bạn sẽ phải cần đến một môi trường để thực hiện nó. Tùy theo từng yêu cầu mà môi trường đó có thể là `docker`, một máy ảo virtual `machine` chạy Ubuntu, `windows` hay cũng có thể là `macos`. Do đó, executors sẽ là nơi bạn khai báo các cài đặt cho từng môi trường:
```yaml
executors:
  docker-executor:
    - image: circleci/ruby:2.7.1
    - image: mongo:2.6.8-jessie
  machine-executor:
    - image: ubuntu-1604:201903-01

jobs:
  build-with-docker:
    executor: docker-executor
    steps:
      - run: echo "Buiding with docker executor"
  build-with_machine:
    executor: machine-executor
    steps:
      - run: echo "Buiding with machine executor"
```
CircleCI cung cấp một danh sách các images để bạn có thể lựa chọn cho các executor của mình. Để ý trong ví dụ trên, chúng ta đã sử dụng 2 images cho `docker-excutor`, vậy điều này có nghĩa là gì? Trong CircleCI có một khái niệm về [primary container](https://circleci.com/docs/2.0/glossary/#primary-container), theo đó, một primary container chính là instance của image đầu tiên được khai báo trong `config.yml`. Tất cả jobs sẽ được chạy bên trong container này, những container khác sẽ giao tiếp với primary container thông qua local network.

### `jobs`
Đúng như tên gọi của nó, một job trong CircleCI chính là một danh sách các hành động (steps) để hoàn thành một công việc. Những công việc đó có thể là kéo code mới nhất về, run test...Tại đây bạn cũng có thể khai báo môi trường (executors) để thực hiện các hành động đó:
```yaml
jobs:
  build:
    docker:
      - image: circleci/ruby:2.7.1
        environment:
          RAILS_ENV: test
    steps:
      - checkout
      - run: bundle exec rails rspec
  deploy:
    machine: true
    steps:
      - add_ssh_keys:
          fingerprints:
            - $FINGERPRINT
      - run:
          name: Deploy over SSH
          command: ssh -o StrictHostKeyChecking=no -v $SSH_USER@$SSH_HOST "sh ./deploy.sh $CIRCLE_BRANCH"
```
Bạn cũng có thể sử dụng các commands đã được định nghĩa trước đó như là một step, trong trường hợp này chính là `checkout`, đây là một built-in command mà CircleCI cung cấp.

### `workflows`
Trong khi job là một tập hợp các steps để hoàn thành một công việc thì workflow sẽ là tập hợp các jobs để thực hiện một công việc lớn hơn:
```yaml
workflows:
  version: 2
  build_deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
 ```
Trong ví dụ trên chúng ta đã định nghĩa một work flow có tên là `buid_deploy` . Tại đây chúng ta sẽ thực hiện hai công việc tương ứng với hai job là `build` và `deploy`. Hơn nữa, việc deploy sẽ chỉ được thực hiện sau khi đã build thành công và work flow này chỉ được thực thi khi có thay đổi trên branch `master`.

### `pipelines`
Theo định nghĩa của CircleCI thì một pipeline sẽ là tập hợp của tất cả những cấu hình để bạn hoàn thành công việc của mình. Nói cách khác, một `pipeline` sẽ chứa nhiều `workflows`, mỗi workflow sẽ lại có nhiều `jobs` và mỗi job sẽ lại thực thi nhiều `steps` khác nhau. Như vậy, tất cả những gì chúng ta đã tìm hiểu ở trên đều nằm trong một pipeline.

## Variables
CircleCI cung cấp rất nhiều variables để bạn có thể sử dụng trong quá trình chạy job. Chúng được phân ra làm hai loại chính:

### Environment Variables
Đây là các biến môi trường trong những container hay machine. Chúng có thể được sử trong các steps hoặc trong khi quá trình khởi tạo các executor diễn ra. Bạn có thể thêm một biến môi trường trong mục project setting, hay là ngay dưới từ khóa environment:
```yaml
jobs:
  build:
    docker:
      - image: circleci/ruby:2.7.1
        environment:
          ENTRY_VARIABLE: my_environment_variable
    steps:
      - checkout
      - run: echo $ENTRY_VARIABLE           # Wil not print out anything
      - run: echo $PROJECT_SETTING_VARIABLE # Will print out the value you set in project setting
```
Điểm khác biệt giữa các biến môi trường được tạo ra tuơng ứng với hai cách này chính là phạm vi sử dụng của chúng. Với những biến môi trường được tạo trong phần project setting, CircleCI sẽ đưa chúng vào trong primary container vì vậy bạn có thể sử dụng chúng trong các steps. Nhưng với những biến môi trường được định nghĩa trong bằng từ khóa environment thì không, chúng chỉ tồn tại trong quá trình khởi tạo container.

Ngoài các biến môi trường bạn tự thêm vào, CircleCI cũng cung cấp cho bạn rất nhiều biến môi trường khác nữa. Dưới đây là một trong số những biến môi trường thường được sử dụng:

* `CIRCLE_BRANCH`: Tên của git branch đang được built.
* `CIRCLE_BUILD_URL`: Đường dẫn đến bản built đang chạy.
* `CIRCLE_PULL_REQUEST`: Đường dẫn đến pull request.
* `CIRCLE_USERNAME`: Tên của user trigger bản built hiện tại.

Bạn cũng có thể xem thêm những biến môi trường khác tại [đây](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables).

#### Pipeline Variables
Khác với những environment variables, pipeline variables không tồn tại trong các container hay virture machine, nó đơn giản chỉ là các biến chứa giá trị mà bạn có thể dùng được ở bất cứ đâu trong file config. Để dễ hiểu, hãy hình dung file config của bạn giống như một function trong lập trình, khi đó environment variables là các biến môi trường và như thế chúng phụ thuộc vào môi trường sẽ thực thi function đó. Ngược lại pipeline varialbes không phụ thuộc vào môi trường thược thi, nó sẽ chỉ phụ thuộc vào giá trị mà người dùng truyền vào hay gán cho nó mà thôi. Dưới đây là một ví dụ về việc khai báo và sử dụng pipeline variables:
```yaml
parameters:
  image-tag:
    type: string
    default: "latest"
  workingdir:
    type: string
    default: "~/main"

jobs:
  build:
    docker:
      - image: circleci/ruby:<< pipeline.parameters.image-tag >>
    environment:
      IMAGETAG: << pipeline.parameters.image-tag >>
    working_directory: << pipeline.parameters.workingdir >>
    steps:
      - run: echo "Image tag used was ${IMAGETAG}"
      - run: echo "$(pwd) == << pipeline.parameters.workingdir >>"
```
Để truy suất giá trị trong các variables, bạn sẽ chúng thông qua `pipeline.parameters`. Ngoài các pipeline parameters variables bạn tự định nghĩa ở trên, trong một pipeline cũng có sẵn những pipeline variables khác mà CircleCI cung cấp cho chúng ta:

* `pipeline.id`: Đây là ID của một pipeline.
* `pipeline.project.git_url`: Đường dẫn đến nơi project được lưu trữ.
* `pipeline.git.tag`: Tên của git tag đã trigger pipeline.
* `pipeline.git.branch`: Tên của git branch.

Cùng với nhiều variables khác nữa mà bạn có thể xem thêm tại [đây](https://circleci.com/docs/2.0/pipeline-variables/#pipeline-values).

## Orbs
Khi thực hiện CI/CD cho nhiều dự án, chắc chắn sẽ có lúc bạn nhận ra rằng có rất nhiều công việc giống nhau được thực hiện cho những dự án khác nhau. Lúc đó, khi nhìn vào file config của mỗi dự án bạn cũng sẽ thấy điều tuơng tự. Sẽ có những đoạn code mà bạn có thể copy từ config của dự án này sang config cho một dự án khác mà chẳng gặp phải vấn đề gì. Vì vậy, nếu như có một cách nào đó để đóng gói những công việc kia lại rồi sau đó include nó vào nơi nào cần dùng thì sẽ thật thuận tiện. Hơn thế nữa, những giải pháp của bạn sẽ không chỉ hữu ích cho một mình bạn mà nó còn hữu ích cho những người khác nữa. Orbs sinh ra vì một mục đích như vậy.
```yaml
orbs:
  slack: circleci/slack@4.2.0
jobs:
  notify:
    docker:
      - image: cimg/base:stable
    steps:
      - slack/notify:
          custom: |
            {
              "blocks": [
                {
                  "type": "section",
                  "fields": [
                    {
                      "type": "plain_text",
                      "text": "*This is a text notification*",
                      "emoji": true
                    }
                  ]
                }
              ]
            }
          event: always
workflows:
  send-notification:
    jobs:
      - notify:
          context: slack-secrets
```
Trên đây là một ví dụ trong việc sử dụng một orb. Đầu tiên, chúng ta sẽ khai báo orb mà mình muốn sử dụng bằng key word `orbs`, trong trường hợp này là `circleci/slack@4.1`. Ngay sau đó, những công việc như push notification tới Slack sẽ được thực hiện một cách dễ dàng thông qua các job đã được định nghĩa sẵn trong orb. Bạn sẽ không cần phải quan tâm đến những config phức tạp và làm cho công việc của bạn đơn giản hơn rất nhiều.

## Summary
Vừa rồi chúng ta đã tìm hiểu về những khái niệm cơ bản nhất nhưng cũng là quan trọng nhất của CircleCI. Hiểu về chúng sẽ giúp bạn tự tin hơn khi bắt tay vào config CI/CD cho một dự án. Hẹn gặp lại các bạn ở những bài viết lần sau.