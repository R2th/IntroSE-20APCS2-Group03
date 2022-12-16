Khi build một Docker image, chắc hẳn không ít lần chúng ta phải ngao ngán vì thời gian cài đặt các thư viện. Một trong số đó có thể kể đến là cài đặt các package PHP thông qua Composer.
Bài viết này sẽ giới thiệu một vài cách để tăng tốc quá trình cài đặt Composer package nói chung và trong quá trình build Doker image nói riêng.

### 1. Sử dụng thư viện [Prestissimo](https://github.com/hirak/prestissimo)

Nếu như `yarn` sinh ra để giải quyết vấn đề download package của `npm`  thì `Prestissimo` cũng giải quyết vấn đề tương tự với `Composer` bằng việc hỗ trợ download song song (parallel) các package. `Prestissimo` cài đặt đơn giản như một plugin của `Composer` và không cần bất cứ thiết lập gì thêm:
```
composer global require hirak/prestissimo
```

Do đó, trước khi thực hiện lệnh `composer install` , hãy đảm bảo đã cài đặt `Prestissimo` . Việc cài đặt này ở mức `global` nên không ảnh hưởng tới package hiện tại của ứng dụng.

> Bản thân Composer 2 đã có nhiều cải tiến và rất nhanh rồi nên cách này chỉ nên áp dụng đối với Composer 1.

### 2. Tắt bỏ Xdebug

Composer sẽ chạy nhanh hơn rất nhiều khi đã vô hiệu Xdebug. Trên các hệ điều hành Linux, có thể thực hiện điều này bằng câu lệnh CLI sau:

```
RUN phpdismod xdebug
```

Nếu build một Docker image cho môi trường deploy thì có thể không cần thực hiện điều trên. Một Docker image cho môi trường deploy sẽ thường không cần cài đặt Xdebug làm gì cả.

### 3. Tận dụng các tùy chọn tối ưu của Composer
Đừng sử dụng đơn thuần lệnh `composer install`. Sử dụng những tùy chọn dưới đây để tiết kiệm thời gian cài đặt:

| Tùy chọn | Mô tả
| -------- | -------- |
| –no-scripts     | Vô hiệu việc chạy các scripts được định nghĩa sẵn trong root package. |
| –no-interaction | Không hiển thị các câu hỏi tương tác khi cài đặt. |
| –no-autoloader | Bỏ qua việc tạo autoloader. |
| –no-dev | Không cài đặt các thư viện đề xuất từ mục require-dev trong composer.json |
| –prefer-dist | Ưu tiên cài đặt từ dist (download archives thay vì cả VCS repository của dependency). |

```
composer install --no-scripts --no-interaction --no-autoloader --no-dev --prefer-dist
```

### 4. Cài đặt Composer trước khi thêm codebase để tận dụng Docker cache
```
# Install dependencies
RUN composer global require hirak/prestissimo
ADD composer.json composer.lock ./
RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /root/.composer

# Copy codebase
COPY . ./

# Finish composer
RUN composer dump-autoload --no-scripts --no-dev --optimize
```

### 5. Update lên Composer 2
Composer 2 đã có rất nhiều cải tiến so với Composer 1 về hiệu năng. Do đó, hãy cân nhắc tính tương thích của các dependency hiện tại và thực hiện nâng cấp version của Composer.

Hướng dẫn chi tiết cho việc nâng cấp có thể tham khảo tại đây:
https://getcomposer.org/upgrade/UPGRADE-2.0.md

### *Tham khảo*

**Maksudur Rahman Maateen**, [PHP Composer: Speed Up Your Docker Build](https://blog.maateen.me/php-composer-speed-up-your-docker-build/)

**Chris Harrison**, [Speedy Composer installs in Docker builds](https://medium.com/@c.harrison/speedy-composer-installs-in-docker-builds-41eea6d0172b)

**Hiraku NAKANO**, [prestissimo](https://github.com/hirak/prestissimo)