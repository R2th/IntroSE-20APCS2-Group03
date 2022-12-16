## Giới thiệu
Tình hình là lâu rồi ko vào kênh youtube [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA), hôm bữa lướt qua thấy có video mới cũng khá hay về github actions nên mình quyết định vọc vạch theo video xíu thử.

Nguồn: https://www.youtube.com/watch?v=X3F3El_yvFg

Nếu mọi người thích xem video hơn thì có thể click vào link phía trên nhé :v 

Còn không thì xem tiếp bài viết thôi nào :sunglasses::sunglasses:

## Khởi tạo project

Mình sẽ dùng CRA cho nhanh nhé.

```
$ npx create-react-app try-github-actions
$ yarn
$ yarn start
```
Kết quả như mọi khi :)

![](https://images.viblo.asia/e8876e48-1973-49b9-afcc-585fd2112dbd.png)

**Tiếp:** đẩy lên github thôi nào.

## Config...

**Tiếp:** vào tab actions

![](https://images.viblo.asia/14a50bee-ce1f-4dc9-b641-a1d7f42641a0.png)

**Tiếp:** click set up this workflow

![](https://images.viblo.asia/45ccf9fa-1d82-4539-867f-38694fa280b6.png)

**Tiếp:** chúng ta sẽ sửa lại file này như sau:
```yml
# This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: Node.js CI

on:
  push:
    branches: [main]
  # pull_request:
  #   branches: [ main ]

jobs:
  build:
    runs-on: self-hosted

    strategy:
      matrix:
        node-version: [12.x, 14.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - run: yarn
      - run: yarn build
      - run: yarn test
```
Nếu mọi người dùng `npm` thì có thể để `npm` thay cho `yarn` nhé.

**Tiếp:** Start commit. 

Lưu ý: nó sẽ tạo thêm 1 commit mới nên ở local chúng ta sẽ pull code mới về nhé. Và vì chúng ta đang `runs-on: self-hosted` nên workflow tạm thời sẽ fail. Để chạy được thì chúng ta cần add self-hosted runner ở bước tiếp theo.

**Tiếp:** Để add self-hosted runner chúng ta sẽ vào tab `Setting -> Actions -> Add runner`

![](https://images.viblo.asia/e429ecff-7b86-4b05-9bb1-2106abb06793.png)

**Tiếp:** ssh vào vps và làm theo các bước như trong hướng dẫn.

Lưu ý: chúng ta sẽ không dùng user `root` mà nên tạo một user mới. Như mình đang tạo user`thongtv`.

Tham khảo cách tạo sudo user ubuntu: https://www.vultr.com/docs/create-a-sudo-user-on-ubuntu-best-practices

Nếu mọi người dùng `yarn` thì nhớ cài vào vps nhé

Tham khảo cách cài yarn: https://classic.yarnpkg.com/en/docs/install/

**Download**

![](https://images.viblo.asia/93352b41-4a8e-4213-8fd1-f2807df02527.png)

**Config**

![](https://images.viblo.asia/d484b2b6-ec8a-439c-86d1-844e2a292227.png)

Ở đây mình đặt tên là `react-app` như trong video hướng dẫn. Mọi người có thể đặt tên khác cũng được nhé 

**Run**

![](https://images.viblo.asia/7af11fdf-e7b5-423d-a4b3-51842ca590bc.png)

Để chạy ngầm chúng ta sẽ chạy file `svc.sh` thay vì `run.sh`

![](https://images.viblo.asia/3463380d-5fa4-4a23-89fa-81c092ff96c2.png)

**Tiếp:** vào lại tab `Actions` và `Re-run all jobs` (ở đây mình chạy rồi, nếu chưa chạy thì các jobs vẫn đang fail)

![](https://images.viblo.asia/3e1b236a-700b-4b7f-96f5-c2374a8f71eb.png)

Khi chạy xong thì folder `react-app` lúc config sẽ được tạo ra

![](https://images.viblo.asia/1b9281c7-a526-473c-b52a-3e56b5b953b8.png)

Khi `cd` vào chúng ta sẽ thấy được thư mục `build`. Và nó sẽ thay đổi mỗi khi chúng ta push lên branch `main`. Việc tiếp theo chỉ là config vps để trỏ tới thư mục này. 

Ở đây mình sẽ dùng `nginx` như trong video hướng dẫn nhé ^^

![](https://images.viblo.asia/8df8bfce-56dc-4c27-8789-d0d41563dc9c.png)

**Tiếp:** chúng ta sẽ sửa lại file config ở chỗ root như sau:
```
 root /home/thongtv/actions-runner/react-app/try-github-actions/try-github-actions/build;
```
**Tiếp:** restart `nginx`
```
$ sudo service nginx restart
```
**Kết quả:**

![](https://images.viblo.asia/74702e40-b73e-4597-822a-9f1a16c2cd41.png)

Bây giờ mình sẽ thử edit một xíu (sửa đoạn text thành Hello World!) và push lên. Đợi 1 lúc sau đó f5 sẽ được như sau

![](https://images.viblo.asia/77616820-b202-4529-a7c1-63c45357a8ec.png)

## Lời kết
Bài viết đến đây thôi. Trong video còn hướng dẫn add tên miền,... các thứ. Mọi người có thể xem thêm nhé. Chúc mọi người thành công <3