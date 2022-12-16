![image.png](https://images.viblo.asia/769eb420-b7cd-4b54-b9b1-74db37e273ba.png)
## 1. CircleCI Orbs là gì?
https://circleci.com/orbs/
> Orbs are shareable packages of CircleCI configuration you can use to simplify your builds. Choose from the many partner, community, or CircleCI authored orbs in our public registry below, or create a private orb that’s exclusive to your organization.

Là chức năng cho phép đóng gói các cấu hình về cài đặt, cache, lệnh test... thậm chí là các executor. 
Theo cách hiểu đơn giản của mình là bạn có thể đóng gói những cấu hình phổ biến thành package để dùng cho nhiều project khác. Với người dùng phổ thông, thay vì phải viết những  command bash script để install cài đặt dài rối rắm của linux(gây choáng tạm thời cho dân mù bash script) thì giờ đây những cái đó đã được 1 tổ chức, cá nhân tổng hợp lại, viết thành những alias command. Người dùng chỉ cần khai báo và gọi lệnh trong steps. Người gà bash script như mình rất thích.

## 2. Cách sử dụng
Rất đơn giản. Trong file `.circleci/config.yml`  nâng cấp lên version 2.1 và list những packages cần dùng vào.  Những package cần dùng có thể thấy ở đây https://circleci.com/developer/orbs

Ví dụ nhưng đây dùng 1 thư viện để install chrome chỉ định đến 1 version nhất định. 
```
version: 2.1
orbs:
  browser-tools: circleci/browser-tools@1.1.3
jobs:
  build:
    docker:
      - image: cimg/ruby:2.6.6-browsers
    steps:
      - checkout
      - browser-tools/install-chrome:
          chrome-version: 89.0.4389.90
      - run: |
          ruby --version
          node --version
          java --version
          google-chrome --version
```
Kết quả:
![image.png](https://images.viblo.asia/ceb8600f-9a98-456a-80cd-fe5ecec9f9d2.png)

Nói thật, nếu để cài đặt Chrome chỉ định đến 1 version (không phải latest),  chuẩn bị cho môi trường test, thì các bạn  sẽ phải viết 1 đoạn bash script khá phức tạp, và khi thực hiện sẽ khá tốn thời gian.

Một ví dụ khác về sự ngắn gọn:

Trước đây để cài đặt gem cho Rails, cache lại thì có thể một số bác sẽ làm như thế này: 
```
# bundle
      - restore_cache:
          keys:
            - vendor-bundle-{{ checksum "Gemfile.lock" }}
      - run:
          name: bundle check
          command: bundle check --path=vendor/bundle || bundle install --path=vendor/bundle --without development development_ext --jobs=4 --retry=3
      - save_cache:
          key: vendor-bundle-{{ checksum "Gemfile.lock" }}
          paths:
            - vendor/bundle
```
Nhưng giờ đây với orbs thì sẽ chỉ còn như thế này. Chế độ caching mặc định
```
orbs:
  ruby: circleci/ruby@1.1.3
......
    steps:
      - checkout
      - ruby/install-deps
```


## 3. Chân tình
Bài note ngắn gọn này đứng ở vị trí 1 Rails Developer nên khá sơ sài, mong người đọc hiểu cho. 
Hy vọng rằng sau nội dung này, sẽ có những chuyên gia đào sâu thêm và chia sẻ lại chi tiết hơn.

Cảm ơn và thân ái! 
Sài Gòn - Covid năm thứ 2