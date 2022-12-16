Bài viết lần trước có hướng dẫn qua cách build projects với CircleCI. Tuy nhiên CircleCI còn một ưu điểm nữa là tự động hóa việc deploy ứng dụng sau khi build và chạy tests xong. Phần này chúng ta cùng xem cấu hình để nó tự động deploying nhé. Cũng đơn giản thôi :D

Let's practice!!!!!
# 1. Deploy ứng dụng lên Heroku
Tất nhiên, để deploy được 1 cách tự động thì bạn phải deploy thủ công đã phải không nào.
Về cơ bản, bạn chỉ cần remote vào heroku remote và push lên nhánh master
```
$ heroku git:remote -a first-cd
$ git push heroku master
```
Chi tiết tham khảo tại [bài viết](https://viblo.asia/p/trien-khai-web-tren-heroku-djeZ1RWglWz)

# 2. Cấu hình CI cho ứng dụng
[Bài trước](https://viblo.asia/p/circleci-running-your-first-build-maGK7qOOlj2) mình đã hướng dẫn cách cấu hình trên CircleCI 2.0. Phần này mình không nhắc lại nữa mà tập trung cấu hình phần auto deploy trên Heroku

## 2.1. Thêm biến môi trường

Đầu tiên bạn cần thêm các biến từ ứng dụng Heroku như những biến môi trường. Chúng ta cần thêm 2 biến `HEROKU_APP_NAME` và `HEROKU_API_KEY` để có thể tự động deploy
Refs: https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project

* Bước 1: Vào ứng dụng Circle, chọn project (Nhấn **JOBS**) bạn muốn auto deploy. Nhấn vào icon **Setting** bên phải của project
![](https://images.viblo.asia/17d887f3-b075-4f5e-82c4-71fd79d91516.png)

* Bước 2: Trong phần **Build Setting**, click **Environment Variables**
![](https://images.viblo.asia/f8f271fe-5e89-49dd-8f2c-dc69177cf8e6.png)

* Bước 3: Import biến từ project khác bằng cách nhấn vào button **Import Variable(s)** hoặc thêm các biến mới bằng cách nhấn vào button** Add Variable** (Lưu ý rằng **Import Variables(s)** không khả dụng trên CircleCI được cài đặt private)
* Bước 4: Sử dụng các biến này trong file `.circleci/config.yml` thôi.

## 2.2. Chỉnh sửa config
File `.circleci/config.yml`:
```yml:.circleci/config.yml
version: 2
jobs:
  build:
    ...
  deploy:
    docker:
      - image: buildpack-deps:trusty
    steps:
      - checkout
      - run:
          name: Deploy Master to Heroku
          command: |
            git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git master

workflows:
  version: 2
  build-deploy:
    jobs:
      - build
      - deploy:
          requires:
            - build
          filters:
            branches:
              only: master
```
Mình chỉ thử nghiệm tự động deploy, không tiến hành build và tests nên nó sẽ đơn giản như sau:
```:.circleci/config.yml
version: 2
jobs:
  build:
    docker:
      - image: circleci/php:7.1-apache
    steps:
      - checkout
      - run:
          name: Deploy Master to Heroku
          command: |
            git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git master
```
Ngon rồi, vậy là từ giờ mỗi lần bạn `commit` code lên nhánh `master`, project sẽ tự động được build, check các thứ bạn đã cấu hình (trong build jobs) và tự động deploy lên Heroku qua lệnh
```bash
git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git master
```
![](https://images.viblo.asia/74dd7ab6-5594-47a7-8d55-a0181f837904.png)

Đây là kết quả chi tiết Deploy

![](https://images.viblo.asia/7bccb614-e2c8-41bf-b2d7-441d9f455f0a.png)

Đơn giản vậy thôi. Tuy nhiên đây mới chỉ là mức đơn giản nhất (hello world) cho việc tự động deploy ứng dụng, các phần khác bạn có thể tìm hiểu thêm trên trang chủ CircleCI để cấu hình

# Tài liệu tham khảo
* [Setting an Environment Variable in a Project - CircleCI](https://circleci.com/docs/2.0/env-vars/#setting-an-environment-variable-in-a-project)
* [Configuring Deploys - CircleCI](https://circleci.com/docs/2.0/deployment-integrations/#heroku)
* [Deploying project to Heroku - Viblo](https://viblo.asia/p/trien-khai-web-tren-heroku-djeZ1RWglWz)
* [Github repository](https://github.com/minhnv2306/laravel6-ci)