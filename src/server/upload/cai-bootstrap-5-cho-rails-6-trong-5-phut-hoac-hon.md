Tiếp nối series trong 5 phút hoặc hơn của bài [Deploy ReactJs app lên Firebase trong 5 phút (hoặc hơn)](https://viblo.asia/p/eW65Gm1OZDO) và sẵn tiện đang mày mò học Rails nên mình lên luôn bài này.
## Môi trường
Đầu tiên, đây là môi trường mình đang sử dụng nhé.
```
$ node --version
v14.12.0

$ yarn --version
1.22.10

$ ruby --version
ruby 3.0.0p0 (2020-12-25 revision 95aff21468) [x86_64-darwin18]

$ rails --version
Rails 6.1.3
```

## Khởi tạo project
Mình sẽ init 1 project mới để làm demo cho bài viết này
```
rails new demo-rails-6-bootstrap-5
cd demo-rails-6-bootstrap-5
rails generate controller Home index
```

Mở `config/routes.rb` sửa `get ‘home/index’` thành `root 'home#index'` để thay đổi root route.

Tiếp theo start server nào.
```
rails server
```

![](https://images.viblo.asia/aff85e62-bc47-45a3-a96c-7971ee811105.png)

## Cài đặt và config Bootstrap
Cài đặt bootstrap bằng yarn

```
$ yarn add bootstrap@next @popperjs/core
```

Tạo thêm folder `app/javascript/stylesheets` và file `app/javascript/application.scss`

```
$ mkdir -p app/javascript/stylesheets
$ touch app/javascript/stylesheets/application.scss
```

Mở file `application.scss` và import style của bootstrap vào:

```
@import "bootstrap";
```

Sau đó import code js của bootstrap và file `application.scss` ở trên  vào trong `app/javascript/packs/application.js`. 

```
...
window.bootstrap = require("bootstrap");
import "../stylesheets/application.scss";
...
```

Mở file `app/views/home/index.html.erb`, thêm thử component navbar của bootstrap để kiểm tra:

```
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>

<h1>Home#index</h1>
<p>Find me in app/views/home/index.html.erb</p>
```

![](https://images.viblo.asia/63c175f6-800c-445c-aa47-c50ed004a29a.png)
Done, lúc này cả style và js của bootstrap đã được thêm vào project.
Happy coding!