### Init project
Ở bài viết này mình dùng:
- Rails: 6.0.3
- Ruby: 2.7.2 
- Mysql: 5.7
### Dockerize rails app
#### Make Dockerfile
Như phần 1 mình có giới thiệu thì aws batch run job bởi các containers trên các instance ec2 hoặc farage. Để làm được điều này chúng ta cần phải dockerize ứng dụng để nó có thể chạy dưới dạng container.

Trong nội dung bài viết này mình tập trung vào cách build aws batch nên  không muốn đi sâu vào docker như thế nào, thế nên các bạn nào chưa biết docker trước đó thì hãy dừng lại và tìm hiểu docker trước đã nhé.

Dưới đây là file `Dockerfile` mà mình đã viết cho app demo lần này

```Dockerfile
FROM ruby:2.7.2

RUN apt-get update -qq && apt-get install -y curl sudo \
  && curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
  && sudo apt-get update -qq && sudo apt-get install -y nodejs yarn \
  && rm -rf /var/lib/apt/lists/*

ENV APP_ROOT /aws_batch
RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY Gemfile* ./

RUN bundle install --jobs=3 --retry=3 --path=/vendor/bundle

COPY . .

RUN yarn install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]

CMD [ "bundle", "exec", "rails", "s", "-p", "80", "-b", "0.0.0.0" ]
```

Mình sử dụng thêm file `entrypoint.sh`, file này sẽ thực thi khi ta chạy lệnh `docker run` còn lúc `build` nó ko thực thi file này. Nó tương tự như `CMD` vậy. 

```bash
#!/bin/sh
set -e

if [ -f aws_batch/tmp/pids/server.pid ]; then
  rm -f aws_batch/tmp/pids/server.pid
fi

bundle exec rails db:prepare

exec "$@"
```

Trong file này mình đã làm 2 việc mà mỗi lần deploy ta hay làm đó là:
- Kill process đang chạy
- Chạy migrate db

#### Build and Run container
Một Rails app cơ bản gồm ít nhất 2 service là app và db. Nên ta cần 2 container tương ứng với 2 service nêu trên để có thể run được app. Thông thường thì sẽ dùng docker-compose để quản lí cũng như connect các service với nhau một cách thuận tiện. Tuy nhiên ở bài viết này chỉ có 2 service nên mình build lẻ tẻ luôn để mn nắm thêm.

- Tạo network để 2 container có thể nói chuyện vs nhau: Dưới đây mình tạo network có tên là `qtv`
    ```
    docker network create qtv
    ```
- Tạo container db: container này chạy từ image mysql
    ```
    docker run -d --name db --env MYSQL_ALLOW_EMPTY_PASSWORD=yes --network qtv mysql:5.7
    ```
- Tạo container app:
    - Trước khi build mình cần config lại file `database.yml` để có thể connect sang container `db` mà mình vừa tạo ở trên
    ```ruby
    default: &default
      adapter: mysql2
      encoding: utf8mb4
      pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
      username: <%= ENV.fetch("DB_USER") { root } %>
      password: <%= ENV.fetch("DB_PASSWORD") %>
      host: <%= ENV.fetch("DB_URL") { db } %>
      socket: /tmp/mysql.sock
    ```
    
    - Tiếp đến mình tiến hành build image và run container với name là `aws_batch_demo_app`
    ```
    docker build -t aws_batch_demo --no-cache .
    
    docker run -it --name aws_batch_demo_app --network qtv -p 127.0.0.0:80:80 aws_batch_demo
    ```

    - Kiểm tra container đang chạy
    ```
    ➜  ~ docker ps
    CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS              PORTS                  NAMES
    1b61dfd6ecaf   aws_batch_demo   "entrypoint.sh bundl…"   About a minute ago   Up About a minute   127.0.0.1:80->80/tcp   aws_batch_demo_app
    62cb5922f1ee   mysql:5.7        "docker-entrypoint.s…"   22 hours ago         Up 3 minutes        3306/tcp, 33060/tcp    db
    ```
    
    => Như vậy 2 container db, app đã run. Bây giờ mình truy cập http://localhost để kiểm tra xem rails app đã run là thành công bước dockerize rails app. Như mình là thành công r nha :100::100:
    
    ![](https://images.viblo.asia/e1b27135-1fab-4417-b038-92391d5d5cd9.png)

### Setup aws batch
- Như đã nới ở phần làm quen với aws batch ở phần 1 chúng ta cần tạo job defination và nó cần chỉ định image dùng để start container. Vậy làm sao để `job defination` có thể sử image `aws_batch_demo` mà mình vừa tạo ở trên(think). Chúng ta cần phải đưa image của mình lên kho chứa image kiểu dạng như github chứa code, đó là Dockerhub hoặc Elastic Container Registry(ECR aws) hoặc một service khác...Trong bài demo này vì để thực tế hơn mình sẽ đưa image lên ECR thay vì Dockerhub bởi vì trên này mình có thể setting private.

#### Tạo repository trên ECR:

   - Tạo repository: Mn truy cập https://console.aws.amazon.com/ecr/create-repository?region=us-east-1 và điền tên của repo sau đó nhấn btn save là hoàn thành việc tạo. Mọi người có thể chọn region theo mình mong muốn nhé.
    ![](https://images.viblo.asia/c0f94d54-5f5d-4e03-8868-d38f78141f74.png)

   - Sao khi tạo xong ta có repo như hình:
    ![](https://images.viblo.asia/5280e535-170b-486c-bf4e-5adf9c7fe541.png)
    
#### Push image ở local lên ECR
  - Cài AWS CLI: AWS CLI giúp chúng ta tương tác với aws thông qua terminal. Để cài AWS CLI tương ứng với hệ điều hành local thì mn hãy làm theo doc này nhé: https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html
  - Config xác thực cho CLI: 
      - Mọi người có thể làm theo hướng dẫn này để download file csv gồm thông tin xác thực như access_key, secret_access_key nhé https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys 
      - Sau khi có file .csv ta tiến hành config bằng cách chạy lệnh:
      ```
        ➜  aws_batch_demo git:(master) ✗ aws configure
        AWS Access Key ID [****************J7IF]: your_access_key
        AWS Secret Access Key [****************BMDk]: your_secret_access_key
        Default region name [ap-northeast-1]: us-east-1 
        Default output format [json]: json
      ```
      
      -  Test thử config bằng cách: Nếu ko có lỗi gì thì bạn đã config thành công
      ```
      ➜  aws_batch_demo git:(master) ✗ aws s3 ls
      ➜  aws_batch_demo git:(master) ✗
      ```

- Tiến hành push image lên ECR: 
    - Hãy thay thế các thông tin acc tương ứng của bạn ở nhưng biến trong {}
    ```
    aws ecr get-login-password --region {region} | docker login --username AWS --password-stdin {aws_account_id}.dkr.ecr.{region}.amazonaws.com
    ```
    - Nếu báo như sau thì đã login ecr thành công.
    ```
    ➜  aws_batch_demo git:(master) ✗ aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
    Login Succeeded
    ➜  aws_batch_demo git:(master) ✗
    ```

   - Gắn tag cho image:
       - image_name: Tên image ở local hiện tại
       - ecr_repo_url: URL của repo của ECR mà ta vừa tạo ở step trên
       ```
       docker tag {image_name} {ecr_repo_url}
       ```
       - Example:
       ```
       docker tag aws_batch_demo 12345679.dkr.ecr.us-east-1.amazonaws.com/aws_batch_demo_repo
       ```
     
  - Thực thi push:
  ```
  docker push 12345679.dkr.ecr.us-east-1.amazonaws.com/aws_batch_demo_repo
  ```

  - Sau khi push done thì ta sẽ thấy trong repo có bản latest
  ![](https://images.viblo.asia/8c560138-e548-4998-81d1-858d0c9b0f6a.png)

=> Vậy là ta đã xong push image lên ECR. :100::100:

Tiếp theo ta đi nhanh phần tạo compute environment, job definantion, job queue.
#### Tạo compute environment
Tương tụ các config ở phần 1. MN xem lại ở phần 1 nha :smile::smile:
![](https://images.viblo.asia/b83ba159-389e-4af8-87e5-8c33662d4a59.png)

#### Tạo job queue
Tương tự các config ở phần 1.
![](https://images.viblo.asia/8a5f7752-a02c-4a39-a9c7-f174527ae9f2.png)

#### Tạo job defination
Job defination lần này tương tự job defination ở phần 1. Mình chỉ thay image thành image ta vừa PUSH lên ECR là dk.
![](https://images.viblo.asia/78010e40-6ed7-41b2-96a1-8ffff19e53ca.png)



### Submit job
#### Config aws-sdk-batch
- Gem `aws-sdk-batch`: Gem này giúp chúng ta dễ dàng tương tác với aws batch.
- Thêm vào Gemfile:
    ```
    # Gemfile
    gem 'aws-sdk-batch', '~> 1.43'
    ```
    
    => Sau đó thì run `bundle install` nhé
- Config env:
    ```
    # .env
    AWS_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    ```

#### Tạo worker submit job từ local lên aws batch
- Đầu tiên mình tạo class `BaseWorker`
```ruby
class BaseWorker
  class << self
    def submit(*args)
      aws_batch_client.submit_job(job_config(*args))
    end

    private

      def aws_batch_client
        @_aws_batch_client ||= Aws::Batch::Client.new(
          region:            ENV["AWS_REGION"],
          access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
          secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
        )
      end

      def job_config(*args)
        job_config = {
          job_name: job_name,
          job_queue: job_queue,
          job_definition: job_definition,
          container_overrides: {
            command: generate_command(*args),
          }
        }
      end

      def job_definition
        "aws_batch_demo_job_defination"
      end

      def job_name
        self.name
      end

      def job_queue
        "aws_batch_demo_job_queue"
      end

      def generate_command(*args)
        string_params = format_params_to_string(*args)
        ["bundle", "exec", "rails", "r", "#{self.name}.new.perform(#{string_params})"]
      end

      def format_params_to_string(*args)
        string_params = ""
        args.each do |param|
          string_params += if param.is_a?(String)
                             "\"#{param}\","
                           else
                             "#{param},"
                           end
        end
        string_params.slice!(-1, 1)
        string_params
      end
  end
end
```

- Mình tạo class `TestWorker` để test
```ruby
class TestWorker < BaseWorker
  def perform(*args)
    p "Executed #{self.class.name} finished!"
  end
end
```
- Tiếp theo ta cần build và push lại code mới nhất lên ECR
- Bật `rails c` và chạy thử comand `TestWorker.submit`, như sau là đã submit job thành công r nhé.
```
irb(main):003:0> TestWorker.submit()
=> #<struct Aws::Batch::Types::SubmitJobResponse job_arn="arn:aws:batch:us-east-1:123456789:job/08d856df-da7b-4349-8038-a9d763e6d483", job_name="TestWorker", job_id="08d856df-da7b-4349-8038-a9d763e6d483">
irb(main):004:0>
```
- Kiểm tra job ở console
    - Job đã chạy thành công
![](https://images.viblo.asia/741660f5-29b9-4064-becf-3ac48afe12be.png)
   - Kiểm tra log xem thử: Log đã thành công.
![](https://images.viblo.asia/b3d31f0e-cfca-4e5b-b905-d09c5b2ed9ac.png)


=> Như vậy là mình đã hướng dẫn xong cho mọi người cách ứng dụng AWS BATCH vào rails rồi nha. Lúc thao tác có gì cứ trao đổi dưới phần comment nha.

### Tài liệu tham khảo:
- Đây là Repository của bài demo lần này: https://github.com/vovanquang12cntt/aws_batch_demo
- Gem aws-sdk-batch hỗ trợ rất nhiều config, mn hãy đọc thêm ở đây để tuỳ chỉnh theo nhu cầu nhé: https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/Batch/Client.html



**Cuối cùng cảm ơn mọi người đã đọc hết bài. :kissing::kissing:
Chúc mn dồi dào sức khoẻ và vượt qua đại dịch nhé!!!**