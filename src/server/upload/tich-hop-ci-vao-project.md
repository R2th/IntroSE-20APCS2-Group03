![](https://images.viblo.asia/2c4fc685-60c0-4caf-bb06-bd353def66a9.jpg)
## Init Project

Ở đây mình sử dụng một project rails. Không cần quá nhiều đâu ạ. tạo một project và 1 vài model để test thôi.

## Introduction CI
Chắc không còn xa lạ gì với mọi người nữa.   
CI ở đây mình sử dụng là CI có sẵn free trên github `Circle CI`   
Các bạn có thể vào mục `marketplace` trên navibar của github để add circle ci vào github của mình    
Hoặc khi tạo pull request nếu repo của bạn chưa tích hợp những công cụ tương tự thì sẽ được github suggest.   
Sau khi đã add circle ci vào project, chúng ta truy cập trang chủ của circle ci để setup trên GUI cho dễ :D   
link : https://circleci.com/add-projects/   
Chọn project mà bạn vừa tạo để thêm vào và tiến hành settings theo hướng dẫn của circle, khá đơn giản.  
1. Chúng ta tiến hành thêm thư mục `.circleci` vào root của project và bên trong tạo file `config.yml`   
Circle có cung cấp các mẫu sample cho tùy từng ngôn ngữ mà dự án đó sử dụng.   
Ở đây mình lấy ra sample config của project ruby on rails:
```
# Ruby CircleCI 2.0 configuration file
#
# Check https://circleci.com/docs/2.0/language-ruby/ for more details
#
version: 2
jobs:
  build:
    docker:
      # specify the version you desire here
       - image: circleci/ruby:2.4.1-node-browsers
      
      # Specify service dependencies here if necessary
      # CircleCI maintains a library of pre-built images
      # documented at https://circleci.com/docs/2.0/circleci-images/
      # - image: circleci/postgres:9.4

    working_directory: ~/repo

    steps:
      - checkout

      # Download and cache dependencies
      - restore_cache:
          keys:
          - v1-dependencies-{{ checksum "Gemfile.lock" }}
          # fallback to using the latest cache if no exact match is found
          - v1-dependencies-

      - run:
          name: install dependencies
          command: |
            bundle install --jobs=4 --retry=3 --path vendor/bundle

      - save_cache:
          paths:
            - ./vendor/bundle
          key: v1-dependencies-{{ checksum "Gemfile.lock" }}
        
      # Database setup
      - run: bundle exec rake db:create
      - run: bundle exec rake db:schema:load

      # run tests!
      - run:
          name: run tests
          command: |
            mkdir /tmp/test-results
            TEST_FILES="$(circleci tests glob "spec/**/*_spec.rb" | circleci tests split --split-by=timings)"
            
            bundle exec rspec --format progress \
                            --format RspecJunitFormatter \
                            --out /tmp/test-results/rspec.xml \
                            --format progress \
                            $TEST_FILES

      # collect reports
      - store_test_results:
          path: /tmp/test-results
      - store_artifacts:
          path: /tmp/test-results
          destination: test-results
  ```
  
  các bạn có thể chỉnh sửa config tùy theo nhu cầu của bản thân/dự án. Hiện tại mình cứ giữ nguyên như thế này đã. 
  
  2. Các bạn commit lại và push lên repo sẽ thấy có job chạy build ngày trong mục `jobs`.  
![](https://images.viblo.asia/6f19bb93-ac71-491b-a498-1eb100a969af.png)
## Init Rubocop

Mình xóa phần chạy rspec đi vì trong project này mình chưa cần đến :D  mục đích là để chạy setup thử rubocop cho ci.

thêm đoạn config sau vào file `config.yml`  

```
      - run:
          name: rubocop
          context: [
            GITHUB_ACCESS_TOKEN,
            CIRCLE_BUILD_URL,
            CI_PULL_REQUEST
          ]
          command: sh run_with_rubocop.sh
```
Trong đó:  
- name: đặt tên cho step này.
- context: các biến mà bạn muốn truyền vào khi chạy lệnh, trong 3 biến này thì:  
  - `GITHUB_ACCESS_TOKEN` là env mình setup trong settings của project trên circle CI nhằm mục đích bắn comment các lỗi rubocop về pull.
  - `CIRCLE_BUILD_URL` và `CI_PULL_REQUEST` là các biến có sẵn của circleci, các bạn có thể tham khảo thêm về các biến có sẵn của circle trong này: [env-vars](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables), 2 biến này cung cấp link của job và link pull request.   
- command: lệnh chạy trong build, nếu multiline thì các bạn sử dụng cú pháp `command: |` rồi enter xuống dòng indent vào 1 tab và viết lệnh bình thường.  


Cấu trúc file `run_with_rubocop.sh`. Thực ra các bạn có thể sử dụng lệnh chạy thẳng rubocop trong job nhưng nếu như vậy log các lỗi sẽ có các bất cập như:
- Log lỗi sẽ in ra trong log của jobs.
- Sẽ show tất cả các lỗi của rubocop trong project.

Giải pháp ở đây là sử dụng 1 file sh hoặc bất kì script dạng nào tùy khả năng của các bạn, từ đo viết đoạn xử lý kéo `diff` của pull hiện tại với master, cho chạy rubocop, rồi lấy ra các lỗi ứng với những dòng diff đó, không quan tâm những dòng khác :D    

Giới thiệu đến các bạn một số gem phục vụ nhu cầu của bài toán là `rubocop-select` và `checkstyle_filter-git`
- rubocop-select: sẽ giúp bạn check ra các lỗi rubocop chỉ ở file change.
- checkstyle_filter-git: sẽ giúp trình bày lại format lỗi thành xml và chỉ lấy theo diff nhằm mục đích xử lý ở step tiếp theo.

```
logs=$( git fetch origin master && git diff -z --name-only FETCH_HEAD.. \
 | xargs -0 bundle exec rubocop-select \
 | xargs bundle exec rubocop\
  --require rubocop/formatter/checkstyle_formatter \
  --format RuboCop::Formatter::CheckstyleFormatter \
 | bundle exec checkstyle_filter-git diff FETCH_HEAD)
 echo $logs
 ```
 
Output của lệnh này là trả về 1 nội dung xml, kế tiếp ta phải xử lý nó để đưa nó về dạng json để bắn lên github theo api của git là `{body: content}`

Mình xử dụng ruby để xử lý, còn các bạn có thể xử lý tùy ý theo ngôn ngữ các bạn nắm rõ.
chạy lệnh 
```
content=`bundle exec ruby parse_rubocop_xml.rb $logs`
echo $content
```  
Với ruby ta dùng `nokogiri` để parse đoạn xml và xử lý nội dung bên trong, lấy các lỗi ra và nối thành 1 chuỗi content để bắn lên github.
```
require 'nokogiri'
require "cgi"
require 'pry' // for debug, nếu muốn debug các bạn phải chạy riêng lệnh vs file này chứ không thể chạy qua file shell
// chạy đoạn xong lệnh echo $logs bên trên thì chạy riêng lệnh
// bundle exec ruby parse_rubocop_xml.rb $logs để có thể nhảy vào debug
xml_doc = Nokogiri::XML(ARGV.join(" "))
error_messages = ""
xml_doc.xpath("//file").each do |elm|
  begin
    elm.children.select{ |e| e.name == 'error' }.each do |error|
      error_messages << "- #{elm.attributes["name"].value}:#{error.attributes["line"].value}: #{error.attributes["message"].value}\\n"
    end
  rescue => e
    next
  end
end
puts CGI::escapeHTML(error_messages)
```


Sau khi chạy xong lệnh get ra content để bắn lên github thì ta viết đoạn `curl` để gửi nội dung lên thành comment trong pull chạy CI.
```
  BODY="{\"body\": \"RUBOCOP ERRORS!!! \n $content  \n\n $CIRCLE_BUILD_URL\"}"
  curl -XPOST \
    -H "Authorization: token $GITHUB_ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$BODY" \
    https://api.github.com/repos/:name_owner/:project_name/issues/${CI_PULL_REQUEST##*/}/comments
```
 - `${CI_PULL_REQUEST##*/}` là đoạn xử ly string operation trong shell script mình search đc trên google để lấy ra phần tử cuối cùng trong 1 array kết quả của việc split 1 string với `/` vì CI_PULL_REQUEST trong circle ci trả về là trọn vẹn link pull chứ không phải số pull. phần này chắc tùy ci phải có xử lý riêng.

Và kết quả ta có sau khi chạy build xong, sẽ có 1 comment bắn lên pull request nếu pull vẫn còn lỗi rubocop mà chưa đc fix:

![](https://images.viblo.asia/47e9558a-2419-4f79-88d9-a0f3bcb1ed25.png)











credit: @ducnv ![](https://images.viblo.asia/14c6a0b3-09f3-42b9-838c-43f55e497842.jpeg)