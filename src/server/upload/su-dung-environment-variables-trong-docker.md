# Lời mở đầu

Xin chào, hôm nay mình lại tiếp tục viết về docker với chủ đề config env cho docker như đã nhắc đến ở bài trước. Đây cũng là một chủ đề mà mình rất là quan tâm bởi vì rằng thì là không có gì khác ngoài việc bảo mật, điều mà mình đã nói ở [bài viết trước](https://viblo.asia/p/tim-hieu-docker-compose-qua-cac-vi-du-cu-the-yMnKMvQEZ7P), và việc sử dụng các biến môi trường (environment variables) là điều cần thiết khi khởi chạy các service. Chẳng hạn như config connection string, setting dev, test, prod environment... và để che dấu các thông tin này để nhỡ ai có vô tình lấy được compose file của mình thì cũng chẳng thể khai thác được gì.

Cùng tìm hiểu nào

# environment variables

Khi tạo một service bất kì, thì việc sử dụng các environment variables là cần thiết, điều này giúp cho các service được khởi tạo theo cách mà chúng ta muốn. Chẳng hạn như config database connection với các thông tin như database name, user, hay thiết lập môi trường làm việc của service đó là dev, test hay prod, hoặc các config khác như port, base url... thì việc dùng các biến hệ thống là rất cần thiết để chỉ định trong các config service của bạn. Và tất nhiên bạn cũng muốn sử dụng các environment variables khi chạy service trong docker container. Để định nghĩa environment variables docker cho phép chúng ra khai báo ở command line. Ví dụ như:

```
sudo docker run -d -t -i 
-e DB_NAME='foo' \
-e DB_USER_NAME='bar' \
-e DB_PASSWORD='hidden' \
...
```

* `-e` : option để định nghĩa environment variables

nhìn sơ qua thì hẳn bạn cũng nhìn rõ được ưu nhược điểm khi thực hiện bằng cách này. Điều này giúp cho việc bảo mật các thông tin quan trọng thông qua việc chỉ khai báo nó bằng command. Nhưng command dài với nhiều biến như thế này để mà nhớ thì khá là khoai, hẳn là một ý tưởng không tốt cho lắm. Chính vì thế, docker cũng cung cấp các option để chúng ta dễ dàng định nghĩa các variable cần thiết. Đó là `arg` và `environment` (với dockerfile thì là `ARG` và `ENV`). Tuy nhiên thì có sự khác nhau rất lớn giữa `arg` và `environment` đó chính là scope của chúng. `arg` định nghĩa các biến dùng khi build image và `environment` dùng cho lúc khởi chạy container. Chính vì thế, mình thường sử dụng `ARG` trong dockerfile (thưởng để chỉ định local, test, prod..) và `environment` trong docker compose. Và tất nhiên, nơi quản lý các image chính là docker compose nên bài viết này sẽ chỉ phân tích về option `environment` thôi nhé.

`environment`: tạo các biến môi trường trong container.

Sử dụng `environment` trong docker compose, lợi ích thứ nhất có thể nhìn thấy là chúng ta không cần nhớ cái đống dài ngoằng trên. Bạn chỉ cần định nghĩa nó như thế này

```
environment:
  - DB_NAME=mysite_staging
  - DB_USER_NAME=bar
  - DB_PASSWORD=foo
```

hoặc

```
environment:
  DB_NAME: mysite_staging
  DB_USER_NAME: bar
  DB_PASSWORD: foo
```

Tuy nhiên việc đặt password ở đây nó khác là risk nên docker cho phép chúng ta không cần chỉ định value cho nó. Điều này rất hữu ích cho việc bảo mật những thông tin quan trọng. Với những gì không cần thiết, chúng ta cứ set value còn những gì quan trọng, chúng ta sẽ giấu đi. Ví dụ như ẩn user, password:

```
environment:
  - DB_NAME=mysite_staging
  - DB_USER_NAME
  - DB_PASSWORD
```

Với việc setting như thế này, thì nếu ai có được docker compose file của bạn cũng chẳng thể connect tới DB vì thiếu thông tin user và password. Nhưng vậy lúc này compose sẽ lấy giá trị từ các key `DB_USER_NAME` và `DB_PASSWORD` như thế nào. Các bạn có thể hình dung việc dùng option environment nó sẽ tương tự như việc dùng command line, như các ví dụ mình đã chỉ ra, option trên nó sẽ tương tự như command

`docker run -e DB_USER_NAME DB_PASSWORD ...`

và cách Docker CLI lấy value được giải thích từ docker doc như sau

`When running the command, the Docker CLI client checks the value the variable has in your local environment and passes it to the container`

chính vì thế cơ chế mà compose file sẽ lấy giá trị từ các key cũng giống như cách command lấy value, đó chính là lấy từ host variable cùng tên. Rất dễ hiểu đúng hông nào. Và lưu ý là nếu dùng theo cách này bạn cần phải thiết lập local environment trước, nếu không thì compose sẽ không pass value cho container được vì nó không tồn tại.

Mà tiện thể nhắc đến host variable thì docker cung cấp cho chúng ta một syntax đễ dễ dàng chỉ định nó trong compose file hơn. Đó là `${VARIABLE_NAME}`. Bạn cũng có thể dùng như thế này `$VARIABLE_NAME` tuy nhiên mình không thích dùng systax này vì nó không rõ ràng, nếu không chú ý rõ thì mình cứ tưởng nó là value nên việc sử dụng syntax với cặp dấu `{ }` trông nó giống việc pass variable trong code hơn nên mình hay sử dụng cách này hơn. Lúc này config nó sẽ trông như thế này

```
environment:
  - DB_NAME=mysite_staging
  - DB_USER_NAME=${USER_NAME}
  - DB_PASSWORD=${PASSWORD}
```

và bạn có thể chỉ định bất cứ host variable nào mà không cần phải sử dụng biến cùng tên nữa (như trong ví dụ trên). Ngoài ra bạn cũng có thể dùng cách này để tăng tính linh động một số config khác, chẳng hạn như image version

```
db:
  image: "postgres:${POSTGRES_VERSION}"
```

Chuyên nghiệp hơn hẳn có phải không.


# .env file

Việc sử dụng environment option là rất tuyệt, tuy nhiên bạn không muốn tạo host variable để lưu các giá trị cần thiết. Lí do cũng đơn giản là nó rườm rà nè, qua máy khác muốn dùng lại phải ngồi setting các thứ nè. May mắn thay, docker cung cấp cho chúng ta một cách setting dễ dàng hơn. Đó là sử dụng `.env` file để thay thế cho host variable. Docker compose mặc định sẽ tự động tìm kiếm thông tin trong file `.env` ở cùng thư mục với compose file. Ví dụ về `.env` file:

```
DATABASE=mydatabasename
USERNAME=root
PASSWORD=password
KEY=value
```

Các biến này sẽ được sử dụng trong compose file thông qua syntax `${VARIABLE}` như đã đề cập ở trên

```
 environment:
      - MONGO_INITDB_DATABASE=${DATABASE}
      - MONGODB_USER=${USERNAME}
      - MONGODB_PASS=${PASSWORD}
```

Chú ý khi tạo các biến trong `.env` file

* Mỗi biến sẽ tương ứng với 1 dòng và phải theo format `KEY=value`
* Sẽ không có một khoảng space nào giữa `=` và value. Nếu có thì dấu space sẽ là một phần của value. Tương tự sẽ không có xử lý đặc biệt nào cho quote mark `'` hay double quotes `"`. Nó cũng sẽ được tính là một phần của value
* Nếu muốn thêm comment thì hãy tạo dòng mới bắt đầu bằng dấu `#`. Dòng trống sẽ tự động bỏ qua

```

# Set Rails/Rack environment
RACK_ENV=development
```

* Ngoài ra thì KEY không bắt buộc phải ghi hoa. Nên hãy ghi hoa cho trường hợp bạn muốn hiểu biến đó là một constant


Và vì mặc định, docker compose sẽ chỉ đọc thông tin từ file `.env` ở cùng thư mục với compose file. Cho nên nếu bạn có các nhiều file environment như `.env.ci`, `.env.dev`, `.env.prod` hay `db.env`, `microservices.env` thì phải làm như thế nào đây. Đâu thể nào dùng chung một `.env` file cho nhiều môi trường được. Nhận ra điều này, docker đã cung cấp option env_file để chỉ định các file environment cần sử dụng. Rất xịn xò phải không nào. Bạn có thể dùng nó ở command như:

`docker-compose --env-file ./config/.env.dev up `

hay dùng hẳn trong file

```
env_file:
  - ./common.env
  - ./apps/web.env
  - /opt/runtime_opts.env
```

Rất đơn giản đúng không nào

# Một số lưu ý

Mình cũng đã đề cập đến nhiều cách để mà bạn có thể sử dụng environment ở phần trên, và đây là phần các bạn cần lưu ý khi sử dụng.

1. Sử dụng kết hợp nhiều cách cùng một lúc

Đây là phần đáng lưu ý nhất khi sử dụng environment variables. Các biến này có thể khai báo ở host, ở compose file với option environment, ở file `.env` và ở command. Vậy nếu dùng tất cả cùng một lúc, thì docker compose sẽ lấy data ở phần nào. Thì độ ưu tiên sẽ là

```
Compose file
Shell (host) environment variables
Environment file
Dockerfile
Variable is not defined
```

Hãy nhớ rõ điều này, vì khi mà bạn thấy docker compose không lấy giá trị bạn mong muốn, có lẽ bạn đã setting nó ở trong phần có độ ưu tiên thấp hơn. Ví dụ: ta có .env file để chỉ định NODE_ENV

```
$ cat ./Docker/api/api.env
NODE_ENV=test
```

và config NODE_ENV với environment option

```
    env_file:
     - ./Docker/api/api.env
    environment:
     - NODE_ENV=production
```

thì khi compose khởi chạy container. Giá trị của NODE_ENV nhận được sẽ là `production` vì giá trị trong compose file là ưu tiên số 1. Cứ nghĩ là test mà đang chạy mà nhận ra mình đang update data trên prod thì hẳn là đứng tim chứ chả chơi. 

2. Sử dụng nhiều `.env` file cùng một lúc

Việc dùng nhiều `.env` file với option `env_file` thật tiện lợi. Tuy nhiên nếu các file này bị trùng biến nào đó với các giá trị khác nhau, thì rõ ràng, bạn cần xác định đâu là giá trị được sử dụng. Chẳng hạn như:

```

env_file:
    - a.env
    - b.env
```

Với 

```
# a.env
NODE_ENV=test
```

```
# b.env
NODE_ENV=production
```

thì NODE_ENV sẽ nhận giá trị nào. Nếu không xác định rõ, lỡ mà nó chạy prod thật thì toang. Thì hãy nhớ thật kĩ rằng docker compose sẽ xử lý theo thứ tự từ trên xuống, tức là nó sẽ lấy giá trị từ file dưới cùng. Nên việc sắp xếp các file environment là rất quan trọng. Hãy nhớ để đừng mắc sai lầm nhé. Và với ví dụ trên chắc chắn NODE_ENV sẽ có giá trị là `production`. Lơ tơ mơ là toang thật sự đấy.


# Lời kết


Hi vọng qua bài này, các bạn có cho mình đủ cái nhìn về sử dụng biến môi trường cho docker. Đặc biệt là các nội dung mình note ở phần lưu ý. Nếu sử dụng hiệu quả, các bạn có thể giúp tăng tính bảo mật cho hệ thống docker của bạn. Bằng việc setting các thứ tầng tầng lớp lớp, lúc ấn lúc hiện, nếu anh hacker nào mà chicken về docker thì chẳng biết giá trị bạn setting lấy từ đâu, từ host hay từ dockerfile hay từ `.env` file.

Cảm ơn các bạn đã đọc. Hẹn gặp lại ở bài viết tiếp theo.


# Tham khảo

https://docs.docker.com/compose/compose-file/#variable-substitution

https://docs.docker.com/compose/environment-variables/

https://docs.docker.com/compose/env-file/