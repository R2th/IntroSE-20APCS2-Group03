Mình vừa mới làm một **side project** để cập nhật công nghệ mới nhất về Shopify. [**Bootstrap Shopify Theme**](https://github.com/maxvien/bootstrap-shopify-theme) của mình được xây dựng bằng **Bootstrap**, **BEM**, **Theme Tools**, **Swiper**, **Gulp**, **Parcel**, **Liquid**, **SASS**, **PostCSS**, **ESNext**, ... và **Passion**.

Mong được lắng nghe ý kiến từ bạn!

## Kinh Nghiệm

Dưới đây là một vài kinh nghiệm mình có được, khi thực hiện dự án này.

- Thiết Kế & Xây Dựng **Shopify Themes** Từ Đầu.
- Dùng **Bootstrap@5** Để Tạo Một Giao Diện Đẹp.
- Dùng **BEM** Để Tạo Một Mã Nguồn Nhỏ Gọn & Có Tính Tái Sử Dụng Cao.
- Dùng **Liquid**, **SASS**, **ESNext** Để Code Theme Một Cách Thời Thượng.
- Dùng **CSS Media Queries** Để Tạo Giao Diện Mobile-First & Responsive.
- Dùng **PostCSS** Làm Cho Code CSS Tương Thích Với Các Trình Duyệt Cũ.
- Dùng **CoreJS** Làm Cho Code JavaScript Tương Thích Với Các Trình Duyệt Cũ.
- Dùng **Swiper** Để Tạo Slider Responsive Tương Thích Với Các Thiết Bị Di Động
- Dùng **Shopify Theme Scripts** Để Code Các Chức Năng Của Theme Nhanh Hơn.
- Dùng **Shopify Theme Kit** Để Phát Triển & Triển Khai Theme.
- Dùng **Shopify Theme Check** Để Tạo Ra Một Mã Nguồn Chất Lượng Cao.
- Dùng **Gulp** Để Tự Động Hoá Quá Trình Phát Triển Theme.
- Dùng **Parcel** Để Đóng Gói Tài Nguyên SCSS, JavaScript, Font, Image, ...
- Dùng **BrowserSync** Để Tự Động Tải Lại Trang Khi Lưu Files.
- Dùng **Liquid** & **Prettier** Để Định Dạng Mã Nguồn.

Nếu bạn thích sự án thì thả một **STAR** để ủng hộ mình nhé! ⭐️

## Mã Nguồn

Truy cập link này để lấy mã nguồn: https://github.com/maxvien/bootstrap-shopify-theme

![Bootstrap Shopify Theme](https://images.viblo.asia/18fd20b4-2267-433d-8dc2-677120600c85.jpg)

## Demo

- Store Link: https://maxvien-bootstrap.myshopify.com
- Store Password: `maxvien`

## Cài Đặt

Bạn dùng git để clone mã nguồn tại link sau.

```bash
git clone https://github.com/Maxvien/bootstrap-shopify-theme.git
```

Chạy lệnh này để cài đặt các thành phần phụ thuộc.

```bash
yarn install
```

## Cấu Hình

Để cấu hình dự án, bạn cần phải sao chép và đổi tên file `config.yml.example` thành `config.yml`. Sau đó, cập nhật các thuộc tính `store`, `password`, `theme_id` trong file `config.yml`.

- Phần `development` là dành cho môi trường phát triển.
- Phần `production` là dành cho môi trường triển khai thực tế.

```yaml
development:
  store: store-name.myshopify.com
  password: store-admin-api-password
  theme_id: store-theme-id

production:
  store: store-name.myshopify.com
  password: store-admin-api-password
  theme_id: store-theme-id
```

### Thuộc Tính `Store`

Để điền thuộc tính `store`, bạn sao chép `hostname` của store và dán vào file `config.yml`.

### Thuộc Tính `Password`

Để điền thuộc tính `password`, bạn làm theo các bước sau.

1. Trong trang Shopify Admin, bạn click vào **Apps**.
2. Gần dưới cùng của trang, bạn click vào **Manage private apps**.
3. Nếu **private app development** bị vô hiệu hoá, bạn click vào **Enable private app development** để mở nó lên. Chỉ có chủ của store mới làm được việc này.
4. Bạn click vào **Create new private app**.
5. Trong phần **App details**, bạn điền đầy đủ **Name** và **Email**.
6. Trong phần **Admin API**, bạn click vào **Show inactive Admin API permissions**.
7. Cuộn xuống phần **Themes**, bạn chọn **Read and write** từ danh sách xổ xuống.
8. Bạn click **Save**.
9. Bạn đọc thông tin từ hộp thoại và click **Create app**.
10. Cuối cùng, trong phần **Admin API** của **App** mới tạo, bạn sao chép **password** và dán nó vào file `config.yml`.

### Thuộc Tính `Theme ID`

Để điền thuộc tính `theme_id`, bạn làm theo các bước sau.

1. Trong trang Shopify Admin, bạn click vào **Online Store**.
2. Trong menu **Online Store**, bạn click vào **Themes** ở trên cùng.
3. Trong phần **Current theme**, bạn click vào **Actions** và chọn **Duplicate** để backup theme hiện tại.
4. Tiếp theo, bạn click vào nút **Customize**.
5. Trên phần địa chỉ của trình duyệt, có một link tương tự như sau `https://store-name.myshopify.com/admin/themes/[theme_id]/editor`. Bạn sao chép **theme_id** và dán nó vào file `config.yml`.

## Môi Trường Phát Triển `Development`

Để phát triển theme, bạn cần theo các bước trong mục **Cấu Hình** để điền các thuộc tích trong phần `development` trong file `config.yml`.

Tiếp theo, để khởi động dự án, bạn chạy lệnh sau.

```bash
yarn dev
```

Ok, bạn mở trang https://localhost:8080/ trên trình duyệt để xem kết quả.

### Shopify Theme Check

Để tạo ra một mã nguồn chất lượng cao, bạn cần cài [Shopify Theme Check](https://github.com/Shopify/theme-check#installation).

### Visual Studio Code Extensions

Để tăng năng suất khi làm việc với dự án, bạn cần cài các extensions sau.

- [Liquid](https://marketplace.visualstudio.com/items?itemName=sissel.shopify-liquid)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Theme Check](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode)
- [IntelliSense for CSS](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

## Môi Trường Thực Tế `Production`

Để phát triển theme, bạn cần theo các bước trong mục **Cấu Hình** để điền các thuộc tích trong phần `development` trong file `config.yml`.

Tiếp theo, bạn chạy lệnh sau để upload theme lên store của bạn.

```bash
yarn deploy
```

## Dự Án Liên Quan

* **[Next Shopify Storefront](https://github.com/Maxvien/next-shopify-storefront)** • A real-world Shopping Cart built with TypeScript, NextJS, React, Redux, Apollo Client, Shopify Storefront GraphQL API, ... and Material UI.
* **[Shopify Theme Customizer](https://github.com/Maxvien/shopify-theme-customizer)** • An effective development tool for customizing existing Shopify themes. It's built with Gulp, Theme Kit, Theme Check, BrowserSync, ... and Passion.
* **[Shopify Data Faker](https://github.com/Maxvien/shopify-data-faker)** • A Shopify development tool for generating dummy store data.
* **[Bootstrap Shopify Theme](https://github.com/Maxvien/bootstrap-shopify-theme)** • A free Shopify Theme built with Bootstrap, BEM, Theme Tools, Swiper, Gulp, Parcel, Liquid, SASS, PostCSS, ESNext, ... and Passion.