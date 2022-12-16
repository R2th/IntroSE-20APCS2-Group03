# **1.Introduction**

![](https://images.viblo.asia/21ed0a91-a5d1-46e3-b29e-7ca40aad4e9f.jpg)

**Laravel Artisan** là một công cụ dòng lệnh được tích hợp sẵn trong các dự án sử dụng Laravel, nó cung cấp rất nhiều các chức năng trợ giúp việc xây dự án, giảm thời gian viết code cũng như tự động hóa một số công việc.

**Laravel Artisan** xứng đáng với cái tên của nó, nó thật sự xuất sắc khi xử lý các công việc mang tính thủ công bằng cách tự động hóa chúng.

Nếu bạn đang tìm kiếm một cách nhanh chóng để loại bỏ tất cả các **tables**, **types** và **Views** khi  **migrate** database thì tôi sẽ giới thiệu đến các bạn 1 cách, đó là sử dụng **php artisan db:wipe**
# **2.Getting Started**
### Cú pháp câu lệnh
```
$ php artisan db:wipe {--database=} {--drop-views} {--drop-types}

```

### Giải thích thêm về tham số
* **database** - Database config (database này sẽ được lấy từ .**env**).
* **drop-views** - Drop all **tables** and **Views** (mặc định nó sẽ drop all tables)
* **drop-types** - Drop all tables and types (chỉ dùng với database **Postgres**)

Bạn cũng có thể sử dụng câu lệnh:
```
php artisan migrate:reset
```

Nhưng nó rất chậm so với số lượng **migrations** vì nó phải lặp qua các bảng migrations và chạy  **executes down** cho mỗi lần migrations, và điều quan trọng là nếu trong phương thức **down** chúng ta không xóa đi khóa ngoại đã thiêt lập trươc đó thì không thể thực thi câu lệnh phía trên được, và bạn sẽ buộc phải loại bỏ tất cả các bảng, views & types trực tiếp trong cơ sở dữ liệu
# **3.Testing**
```
php artisan db:wipe
```

```
Dropped all tables successfully.

```

```
php artisan db:wipe --drop-views
```

```
Dropped all views successfully.
Dropped all tables successfully.
```

Laravel Artisan giúp cho các công việc phần backend dễ chịu hơn rất nhiều, chúng ta hoàn toàn có thể tạo ra những câu lệnh thực hiện các kịch bản giúp việc viết code hoặc quản trị website.

Có thể nói Laravel Artisan là một ý tưởng rất hay, một công cụ giúp cho framework Laravel đang tạo ra sự khác biệt so với các framework khác