Nguồn: https://qiita.com/74th/items/95dd3effdb1729386321



Tóm tắt
- Có thể dùng Github package như là Docker Registry, và có cùng quyền quản lý với repository nên rất tiện lợi.
- Tag sẽ là docker.pkg.github.com/USER/REPOSITORY/IMAGE:TAG, và có thể đăng nhiều image lên repository.
- Cho dù là repository công khai đi nữa, thì cũng cần đăng kí access token:
 docker login https://docker.pkg.github.com -u <User Name> --password <Access Token>

Thực tế sẽ thế nào?
Khi dùng Github Packages , thì việc quản lý resource của sản phẩm sẽ vô cùng tiện lợi bởi vì nó khớp với việc quản lý  Github Repository.

Github Packages cũng có những chức năng mà bạn có thể dùng với tư cách là  Docker Registry.
Ngoài ra, bạn cũng có thể dùng với tư cách là Docker Registry của quyền hạn quản lý của Github Repository.

Tác giả bài viết có thể dùng image có tên bên dưới như là docker registry.
Có thể lưu nhiều image vào repository 

docker.pkg.github.com/USER/REPOSITORY/IMAGE:TAG
![](https://images.viblo.asia/cfa900c9-9281-47b6-adcf-1b4e4ab43867.png)

![](https://images.viblo.asia/667549ad-400d-4fd5-a3f2-14f69f31f443.png)


Dùng lệnh docker của local :
Khi access đến github package bằng docker command, dù là package công khai của một repository công khai đi chăng nữa, thì nhất định phải dùng Personal Access Token và login.

Thêm vào đó, ở Personal Access Token thì cũng cần quyền hạn sau 

Khi tiến hành docker pull thì "read:packages"
Khi tiến hành docker push thì "write:packages"

Dùng lệnh sau để login 
```php
docker login https://docker.pkg.github.com -u 74th --password <Access Token>
```

    
Ví dụ như nginx của repository mà tác giả bài viết đang dùng:
```php
docker run --rm -it -p 80:80 docker.pkg.github.com/74th/try-github-container-registry/nginx:latest
```

Build bằng Github Action 
Dùng ${{ secrets.GITHUB_TOKEN }} để lấy access token, cho nên sẽ tạo một tổ hợp của Github Action trong mục Build and push Docker images để có thể sử dụng cái đó.。

```php
name: docker-build

on:
  push:
    branches:
      - master

jobs:
  build:
    name: build
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Build and push Docker images
        uses: docker/build-push-action@v1.1.0
        with:
          registry: docker.pkg.github.com
          username: 74th
          password: ${{ secrets.GITHUB_TOKEN }}
          dockerfile: ./Dockerfile
          repository: 74th/try-github-container-registry/nginx
          tags: latest
```