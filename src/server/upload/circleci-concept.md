# Introduction

`CI/CD `chắc hẳn không còn xa lạ gì với ae dev chúng ta và được ứng dụng vào quy trình sản xuất phần mềm của nhiều công ty. Trong bài viết này mình sẽ giới thiệu qua về Circle CI và concept của nó.


# Circle CI

![](https://images.viblo.asia/875e7124-96c0-4f48-ad94-dbd9210c2d23.png)

Sau khi repos trên Github hoặc BitBucket được cấp quyền và thêm vào như 1 project trên circleci.com. Mọi thay đổi về code sẽ kích hoạt các test tự động trong container hay VM. Circle CI sẽ chạy từng job trong một container hoặc VM riêng. 

Hiện tại, Circle CI cho phép dùng thử với 2 options :
- Cloud
- Server
# Concept


### 2.1 Steps
- Đây là các hành động cần được thực hiện để thực hiện job. Thông thường, nó là các câu lệnh thực thi (executable commands).
~~~yaml
#...
    steps:
      - checkout # Special step to checkout your source code
      - run: # Run step to execute commands, see
      # circleci.com/docs/2.0/configuration-reference/#run
          name: Running tests
          command: make test # executable command run in
          # non-login shell with /bin/bash -eo pipefail option
          # by default.
#...    
~~~
### 2.2 Image
Image là một hệ thống đóng gói có các hướng dẫn để tạo ra một container.

Container chính được định nghĩa bởi image đầu tiên trong file `.circleci/config.yml`. Đây là nơi các câu lệnh commands được thực thi cho các jobs sử dụng Docker executor.
~~~yaml
 version: 2
 jobs:
   build1: # job name
     docker: # Specifies the primary container image,
     # see circleci.com/docs/2.0/circleci-images/ for
     # the list of pre-built CircleCI images on dockerhub.
       - image: buildpack-deps:trusty

       - image: postgres:9.4.1 # Specifies the database image
        # for the secondary or service container run in a common
        # network where ports exposed on the primary container are
        # available on localhost.
         environment: # Specifies the POSTGRES_USER authentication
          # environment variable, see circleci.com/docs/2.0/env-vars/
          # for instructions about using environment variables.
           POSTGRES_USER: root
...
   build2:
     machine: # Specifies a machine image that uses
     # an Ubuntu version 14.04 image with Docker 17.06.1-ce
     # and docker-compose 1.14.0, follow CircleCI Discuss Announcements
     # for new image releases.
       image: circleci/classic:201708-01
...       
   build3:
     macos: # Specifies a macOS virtual machine with Xcode version 9.0
       xcode: "9.0"       
 ...          
~~~
### 2.3 Jobs
Job là một tập các `step`và mỗi job phải khai báo một executor như `docker`, `machine` hay `macos`.
Machine bao gồm một image mặc định nếu không được chỉ định. Với docker hay macos, bạn phải khai báo một `image`

![](https://images.viblo.asia/18027790-5d4c-44f2-b013-411c38124eab.png)

### 2.4 Cache

Cache lưu trữ một tệp hoặc thư mục các tệp như các dependency hay source code trong  bộ lưu trữ đối tượng. 

Mỗi job có thể chứa các step đặc biệt cho việc caching dependency từ các jobs trước để tăng tốc độ build.
~~~yaml
version: 2
jobs:
  build1:
    docker: # Each job requires specifying an executor
    # (either docker, macos, or machine), see
    # circleci.com/docs/2.0/executor-types/ for a comparison
    # and more examples.
      - image: circleci/ruby:2.4-node
      - image: circleci/postgres:9.4.12-alpine
    steps:
      - checkout
      - save_cache: # Caches dependencies with a cache key
      # template for an environment variable,
      # see circleci.com/docs/2.0/caching/
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
          paths:
            - ~/circleci-demo-workflows

  build2:
    docker:
      - image: circleci/ruby:2.4-node
      - image: circleci/postgres:9.4.12-alpine
    steps:
      - restore_cache: # Restores the cached dependency.
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}     
  ~~~
  
###  2.5 Workflows

Workflows xác định một list các job và thứ tự chạy của chúng. Bạn có thể cho chúng chạy song song, tuần tự, theo một lịch cố định hoặc cổng thủ công sử dụng approval job.
~~~yaml
version: 2
jobs:
  build1:
    docker:
      - image: circleci/ruby:2.4-node
      - image: circleci/postgres:9.4.12-alpine
    steps:
      - checkout
      - save_cache: # Caches dependencies with a cache key
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
          paths:
            - ~/circleci-demo-workflows
      
  build2:
    docker:
      - image: circleci/ruby:2.4-node
      - image: circleci/postgres:9.4.12-alpine
    steps:
      - restore_cache: # Restores the cached dependency.
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
      - run:
          name: Running tests
          command: make test
  build3:
    docker:
      - image: circleci/ruby:2.4-node
      - image: circleci/postgres:9.4.12-alpine
    steps:
      - restore_cache: # Restores the cached dependency.
          key: v1-repo-{{ .Environment.CIRCLE_SHA1 }}
      - run:
          name: Precompile assets
          command: bundle exec rake assets:precompile
...                          
workflows:
  version: 2
  build_and_test: # name of your workflow
    jobs:
      - build1
      - build2:
        requires:
           - build1 # wait for build1 job to complete successfully before starting
           # see circleci.com/docs/2.0/workflows/ for more examples.
      - build3:
        requires:
           - build1 # wait for build1 job to complete successfully before starting
           # run build2 and build3 in parallel to save time.
~~~

### 2.6 Workspacces & Artifacts

- Workspace là một tính năng của Workflows và được sử dụng để move data từ một job trong workflow sang các công việc tiếp theo.
- Artifact lưu giữ dữ liệu sau khi workflow hoàn thành và có thể sử dụng để lưu trữ lâu dài output của quá trình build. 
- Ref link : https://circleci.com/blog/deep-diving-into-circleci-workspaces/

![](https://images.viblo.asia/314fc5a7-3ebf-4f77-9124-235dcc343ee7.png)

~~~yaml
version: 2
jobs:
  build1:
...   
    steps:    
      - persist_to_workspace: # Persist the specified paths (workspace/echo-output)
      # into the workspace  for use in downstream job. Must be an absolute path,
      # or relative path from working_directory. This is a directory on the container which is
      # taken to be the root directory of the workspace.
          root: workspace
            # Must be relative path from root
          paths:
            - echo-output

  build2:
...
    steps:
      - attach_workspace:
        # Must be absolute path or relative path from working_directory
          at: /tmp/workspace
  build3:
...
    steps:
      - store_artifacts: # See circleci.com/docs/2.0/artifacts/ for more details.
          path: /tmp/artifact-1
          destination: artifact-file
...
~~~

### 2.7 Orbs

Orbs là các gói cấu hình mà bạn có thể sử dụng để nhanh chóng bắt đầu với Circle CI. Orbs cho phép bạn chia sẻ, chuẩn hóa và đơn giản cấu hình trong các dự án. Bạn có thể sử dụng nó để làm tài liệu tham khảo config.

Tham khảo các Orbs có sẵn ở đây : https://circleci.com/orbs/registry/

Ví dụ :

~~~yaml
version: 2.1

orbs:
  aws-s3: circleci/aws-s3@1.0.0 #imports the s3 orb in the circleci namespace

workflows:
  build-test-deploy:
    jobs:
      - deploy2s3:
          steps:
            - aws-s3/sync: #invokes the sync command declared in the s3 orb
                from: .
                to: "s3://mybucket_uri"
                overwrite: true
~~~

# Reference
- https://circleci.com/docs/2.0/about-circleci/
- https://circleci.com/docs/2.0/concepts/