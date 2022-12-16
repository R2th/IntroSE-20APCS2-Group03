Bài viết được dịch từ nguồn: https://hackernoon.com/a-better-way-to-develop-node-js-with-docker-cd29d3a0093

## The Conventional Wisdom

Trong nhiều hướng dẫn, điều đầu tiên được giới thiệu là `Dockerfile`.

Làm thế nào bạn có thể có một môi trường `Docker` mà không cần tạo `Dockerfile`?

`Dockerfile` là một cách để `packed` app của bạn. Trên môi trường `development` thì không nhất thiết phải như vậy, và thành thật mà nói, bạn thực sự không nên.

`Development` và `Production` là hai môi trường khác nhau.

Khi bạn code trên MacBook, bạn thường `install` nhiều `tool` mà bạn sử dụng trong môi trường `production`. Chỉ bởi vì chúng chạy như nhau ở mọi nơi.

`App` của bạn chạy khác trên môi trường `development`.

`Parkging` có nghĩa là tính linh hoạt và mềm dẻo bị giảm đi, đó là lý do tại sao nhiều kỹ sư đã đi đến kết luận rằng `Docker` không phù hợp với môi trường `development`. Bạn sẽ mất tính linh hoạt khi `build` các `container`.

Bạn có thể chạy các `container` và một số lệnh, cài thêm các `lib`, nhưng thực sự có cần thiết trên môi trường `development`?

Nếu bạn sử dụng `Dockerfile` trên `development`, trong một vài trường hợp, bạn cần sự đơn giản, nhưng có thể nó sẽ không hoạt động theo cách bạn nghĩ.

## The docker-compose builder pattern

Hãy nói một chút về `Docker`.

`Docker` là một cách để bạn `package code`.

`Docker` cũng là một cách để tạo ra một môi trường biệt lập có khả năng thực thi một số loại ứng dụng nhất định.

`Docker` cho phép bạn `package` các môi trường.

Khi bạn dùng `docker` trên môi trường `production`, bạn đang sử dụng các `container` tối ưu nhất mà bạn có  thể thực hiện được. Chúng được tùy chỉnh và xây dựng riêng cho `App` của bạn, được `package` theo cách bạn `build` nó. Với điều này, `Docker` thực sự có ý nghĩa.

Khi bạn tạo môi trường `development` trên máy tính của bạn, thay vì bạn phải `install` các `tool`, bạn chỉ việc tạo một môi trường để `code` của bạn có thể chạy được.

Điều này có nghĩa là bạn có thể sử dụng `generalized Dockerfile`. Thông thường, các `generalized Dockerfiles` đã tồn tại.

Ví dụ khi bạn viết `App` sử dụng `Node.js`, bạn cần cái đặt các `package` của nó.

Bạn không cần `alpine linux`, bạn không cần `package` những `node_modules` của bạn thành những bản `build` cố định, bạn không cần những `container` nhỏ cho những thay đổi, bạn chỉ cần `node` và `npm`.

Do đó, trong `container`, tất cả những gì bạn cần là `image` của `Docker Hub`.

Đây là cách tôi tiếp cận `Docker`

## Step one

Đầu tiên, chúng ta cần một tập tin `docker-compose`. Trong đó, chúng ta cần môi trường `development`.

Thêm vào file `docker-composer.yml`

```
version: '3'

services:

  dev:
    image: node:11
```

Tiếp theo, trong một số trường hợp, có những phần `code` cần có trên môi trường nhưng có thể thay đổi nên không thể để trong `image`, chúng ta sẽ `mount` vào thư mục `current`,  `/usr/src/service ` của `container`. Ta cần cho `Docker` biết đâu là `working directory`, có nghĩa là thư mục chứa `code` của chúng ta.

```
version: '3'

services:

  dev:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
```

Bây giờ, mỗi khi chúng ta thay đổi trên local, chúng sẽ được phản ánh trong thư mục trên.

Tiếp theo, chúng ta chạy lệnh `npm run dev`.`Access` lại cổng `1234`.

Sửa đổi tập lệnh dev trong `package.json` để bao gồm `option --hmr-port = 1235`.

```
"dev": "npm run generate-imported-components && parcel app/index.html --hmr-port 1235",
```

Update Docker file để `map ports` tại local giống với `porst` của `container`

```
version: '3'

services:

  dev:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
    command: npm run dev
    ports:
      - 1234:1234
      - 1235:1235
```

Ngoài ra, bạn có thể chỉ cần cài đặt các `modules node` trên Mac hoặc Windows và để chúng hoạt động trên `linux container`.

Khi bạn `run build` trong một số trường hợp, các thư viện sẽ biên dịch bản gốc và trên `production` chỉ hoạt động trên hệ điều hành được xây dựng trên đó!

Đối với lần đầu tiên, bạn chạy lệnh `npm install` và `npm run dev` trong một lệnh duy nhất và đảm bảo nó hoạt động, nhưng nó không hoàn toàn như những gì chúng ta muốn. Điều này sẽ yêu cầu `install` mỗi khi chúng ta `start` `container` trên `development mode`.

## Step Two

Hãy tạo ra một tập tin `docker-compose` khác, lần này có tên là `docker-compose.builder.yml`.

Chúng ta cần dùng `version: 2`, lần này để sử dụng một tính năng trong `docker-composer` không tồn tại trong `version: 3`

`Version: 3` phù hợp với môi trường `production` hơn `version: 2` (với nhiều tính năng phù hợp với môi trường `development` hơn), 

Điều đầu tiên chúng tôi muốn `define` trong `docker-compose.builder.yml` một `base image`.

```
version: '2'

services:

  base:
    image: node:11
    volumes:
      - .:/usr/src/service
    working_dir: /usr/src/service
```

Trông khá quen thuộc và giống với những gì chúng ta làm phía trên.

Bây giờ, chúng ta co thể `extend` `base` để thực thi các lệnh khác nhau, ví dụ:

```
version: '2'

services:

  base:
    image: node:11
    volumes:
      - .:/usr/src/service/
    working_dir: /usr/src/service/

  install:
    extends:
      service: base
    command: npm i

  build:
    extends:
      service: base
    command: npm run build

  create-bundles:
    extends:
      service: base
    command: npm run create-bundles
```

Ta chạy lệnh:

```
docker-compose -f docker-compose.builder.yml run --rm install
```

Sau khi chạy cài đặt, `docker-compose up` sẽ hiển thị môi trường `development` của chúng tôi, hoạt động giống hệt như trên máy `local` của bạn.

```
➜  docker-compose up
Creating stream-all-the-things_dev_1 ... done
Attaching to stream-all-the-things_dev_1
dev_1  |
dev_1  | > stream-all-the-things@1.0.0 dev /usr/src/service
dev_1  | > npm run generate-imported-components && parcel app/index.html
dev_1  |
dev_1  |
dev_1  | > stream-all-the-things@1.0.0 generate-imported-components /usr/src/service
dev_1  | > imported-components app app/imported.js
dev_1  |
dev_1  | scanning app for imports...
dev_1  | 1 imports found, saving to app/imported.js
dev_1  | Server running at http://localhost:1234
```

Khi chúng ta thực hiện thay đổi, `code` sẽ `reloading`.

![](https://images.viblo.asia/53648392-ac57-4981-b004-92071bcac4c0.gif)

## Bonus

Tôi chỉ muốn nhanh chóng thêm một ví dụ Makefile sẽ giúp các lệnh dễ nhớ và dễ sử dụng hơn.

Tạo file với tên `Makefile`

```
install:
 docker-compose -f docker-compose.builder.yml run --rm install

dev:
 docker-compose up
```

Bây giờ bạn có thể chạy `make install` và `make dev`.

## Conclusion

Bạn không cần phải luôn luôn tạo `Dockerfile` để sử dụng `Docker`! Thông thường, trên môi trường `development`, bạn có thể sử dụng cách khác.

Tôi hy vọng tôi đã có thể chỉ cho bạn một cách dễ dàng để khởi động và chạy nhanh với `Docker` và `docker-compose` trên môi trường `development`.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.