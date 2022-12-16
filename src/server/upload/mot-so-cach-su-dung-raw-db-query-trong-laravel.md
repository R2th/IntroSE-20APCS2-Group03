Laravel có một cơ chế tuyệt vời để làm việc với cơ sở dữ liệu gọi là Eloquent, cũng như một Query Builder mạnh mẽ. Nhưng trong nhiều trường hợp chúng ta cần sử dụng những câu Query thuần dưới dạng Raw Query. Trong bài viết này, mình sẽ tổng hợp một vài ví dụ thường gặp của Raw Query trong Laravel.

## 1. Trường hợp phổ biến nhất: selectRaw và tính toán Avg/Sum/Count
Nếu bạn cần thực hiện groupBy cùng với một số hàm tổng hợp của MySQL như AVG() hoặc COUNT(), thì Raw Query sẽ rất hữu ích trong trường hợp này.

Ví dụ từ document của Laravel:
```php
$users = DB::table('users')
    ->select(DB::raw('count(*) as user_count, status'))
    ->where('status', '<>', 1)
    ->groupBy('status')
    ->get();
```

Ví dụ khác với **avg()** và **count()**:
```php
$salaries = DB::table('salaries')
    ->selectRaw('companies.name as company_name, avg(salary) as avg_salary, count(*) as people_count')
    ->join('companies', 'salaries.company_id', '=', 'companies.id')
    ->groupBy('companies.id')
    ->orderByDesc('avg_salary')
    ->get();
```

## 2. Lọc kết quả: groupByRaw, orderByRaw và havingRaw
Bạn sẽ làm gì nếu muốn thêm một số điều kiện trong câu truy vấn sử dụng "group by " hay "order by".
Chúng ta có các phương thức **groupByRaw** và **orderByRaw** để làm điều này. Ngoài ra, bạn có thể thêm điều kiện cho kết quả sau khi **group by** với câu lệnh **having**  bằng cách sử dụng **havingRaw**.

Ví dụ: nhóm theo năm của một trường date/time:

```php
$results = User::selectRaw('YEAR(birth_date) as year, COUNT(id) as amount')
    ->groupByRaw('YEAR(birth_date)')
    ->havingRaw('YEAR(birth_date) > 2000')
    ->orderByRaw('YEAR(birth_date)')
    ->get();
```

## 3. Tính toán một trường với selectRaw()
Nếu bạn muốn lấy về một field bằng cách tính toán từ một field khác, trực tiếp trong truy vấn SQL, thì đây là cách bạn có thể làm:
```php
$products = Product::select('id', 'name')
    ->selectRaw('price - discount_price AS discount')
    ->get();
```

Một ví dụ khác với câu lệnh **CASE**:
```php
$users = DB::table('users')
    ->select('name', 'surname')  
    ->selectRaw("(CASE WHEN (gender = 1) THEN 'M' ELSE 'F' END) as gender_text")
    ->get();
```

## 4. Câu lệnh SQL cũ? Chỉ cần sử dụng DB::select()
Một ví dụ thường gặp là khi bạn có một câu lệnh SQL từ dự án cũ, và bạn muốn chuyển nó sang Eloquent hoặc Query Builder.

Bạn không cần phải làm gì cả. DB::select() là một lựa chọn hoàn hảo.
```php
$results = DB::select('select * from users where id = ?', [1]);
```

## 5. DB::statement() – Thường gặp trong Migrations
Nếu bạn cần thực thi một vài truy vấn SQL mà không cần xử lý kết quả trả về, ví dụ như **INSERT** hay **UPDATE** không cần truyền vào tham số, bạn có thể sử dụng **DB::statement()**.

Với kinh nghiệm của mình, câu lệnh này thường được sử dụng trong migrations, khi muốn thay đổi cấu trúc của bảng và dữ liệu cũ cần update theo cấu trúc mới của bảng.
```php
DB::statement('UPDATE users SET role_id = 1 WHERE role_id IS NULL AND YEAR(created_at) > 2020');
```

Ngoài ra, DB::statement() có thể thực hiện bất kỳ truy vấn SQL nào không liên quan đến các cột và giá trị.
```php
DB::statement('DROP TABLE users');
DB::statement('ALTER TABLE projects AUTO_INCREMENT=123');
```

## Cảnh báo: cẩn thận với các tham số truyền vào, và luôn phải validate chúng
Nguy hiểm lớn nhất đối với Raw Query là không tự động xử lý các tham số truyền vào. Do đó nếu bạn truyền bất kỳ tham số nào vào câu truy vấn, hãy kiểm tra và validate giá trị và format của chúng một cách cẩn thận.