### Giới thiệu.
Trong postgres chúng ta thường bắt gặp **common table expressions** , đây là một loại bảng tạm dùng để lưu tập hợp kết quả để bạn có thể dùng trong câu select tiếp theo, nó là cách quản lí tiện lợi những câu query phức tạp bằng cách break nó ra thành nhiều mảnh nhỏ.
### Cách dùng.
- Đây là ví dụ một câu query CTE đơn giản:

```
WITH Employee_CTE (EmployeeNumber, Title)
AS
(SELECT NationalIDNumber,
        JobTitle
 FROM   HumanResources.Employee)
SELECT EmployeeNumber,
       Title
FROM   Employee_CTE
```

- Câu query break thành 2 phần như dưới:

![](https://images.viblo.asia/90386bae-8ffa-4cc4-a3ba-1e1dce697afa.png)

### Tại sao chúng ta lại cần CTE.
- Có một vài lí do chúng ta muốn dùng CTE.
1. Dễ đọc, thay vì nhìn loại xạ một câu query lớn, chúng ta có thể tạo nhiều CTE rồi combine chúng lại trong 1 statement sau. Nó giống như you có nhiều chunk data bạn cần rồi combine nó lại trong câu final select.
2. Sử dụng thay thế cho view, đôi khi bạn không có quyền tạo view hoặc đôi khi bạn chỉ muốn result set này có hiệu nghiệm chỉ trong câu query hiện tại thôi
3. Đệ quy, dùng CTE chúng ta có thể viết các câu đệ quy dùng để xây dựng cây phân tầng.

![](https://images.viblo.asia/23df9f99-a7dd-43e4-8434-58726072c5a4.jpg)

### Hướng dẫn dùng laravel với CTE.
- Dùng package: staudenmeir/laravel-cte, nó tương thích với cả query builder và Eloquent
- Cài đặt:
```
composer require staudenmeir/laravel-cte:"^1.0"

```
- SELECT Queries
```
$posts = DB::table('p')
    ->select('p.*', 'u.name')
    ->withExpression('p', DB::table('posts'))
    ->withExpression('u', function ($query) {
        $query->from('users');
    })
    ->join('u', 'u.id', '=', 'p.user_id')
    ->get();
```
-Viết CTE đệ quy:
```
$query = DB::table('users')
    ->whereNull('parent_id')
    ->unionAll(
        DB::table('users')
            ->select('users.*')
            ->join('tree', 'tree.id', '=', 'users.parent_id')
    );

$tree = DB::table('tree')
    ->withRecursiveExpression('tree', $query)
    ->get();
```
- INSERT/UPDATE/DELETE Queries
```
DB::table('profiles')
    ->withExpression('u', DB::table('users')->select('id', 'name'))
    ->insertUsing(['user_id', 'name'], DB::table('u'));
DB::table('profiles')
    ->withExpression('u', DB::table('users'))
    ->join('u', 'u.id', '=', 'profiles.user_id')
    ->update(['profiles.name' => DB::raw('u.name')]);
DB::table('profiles')
    ->withExpression('u', DB::table('users')->where('active', false))
    ->whereIn('user_id', DB::table('u')->select('id'))
    ->delete();
```
- Với Eloquent:
```
class User extends Model
{
    use \Staudenmeir\LaravelCte\Eloquent\QueriesExpressions;
}

$query = User::whereNull('parent_id')
    ->unionAll(
        User::select('users.*')
            ->join('tree', 'tree.id', '=', 'users.parent_id')
    );

$tree = User::from('tree')
    ->withRecursiveExpression('tree', $query)
    ->get();
```

Hy vọng bài giới thiệu này sẽ giúp ích được mọi người ạ :D