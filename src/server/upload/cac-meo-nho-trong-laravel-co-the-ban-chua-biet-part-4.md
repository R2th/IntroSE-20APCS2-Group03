## 1. WhereX
Thay vì viết
```php
User::where('company_id', 1)->get();
```
Bạn có thể viết
```php
User::whereCompanyId(1)->get();
```

## 2. WhereXAndY
Thay vì viết
```php
User::where('company_id', 1)->where('active', true)->get();
```
Bạn có thể viết
```php
User::whereCompanyIdAndActive(1, true)->get();
```

## 3. WhereXOrY
Thay vì viết
```php
User::where('company_id', 1)->orWhere('active', true)->get();
```
Bạn có thể viết
```php
User::whereCompanyIdOrActive(1, true)->get();
```

## 4. And so on: whereXAndYAndZ, whereXAndYOrZ
Thay vì viết
```php
User::where('company_id', 1)->where('active', true)->where('deleted_at', null)->get();
User::where('company_id', 1)->where('active', true)->orWhere('deleted_at', null)->get();
```
Bạn có thể viết
```php
User::whereCompanyIdAndActiveAndDeletedAt(1, true, null)->get();
User::whereCompanyIdAndActiveOrDeletedAt(1, true, null)->get();
```
Bạn có thể kết hợp vô hạn các điều kiện như trên, nhưng cần chú ý khi kết hợp các điều kiện để lấy đúng kết quả mong muốn.

## 5. Kết hợp nhiều điều kiện truy vấn
Điều kiện mong muốn:
```sql
WHERE (`company_id` = 1 OR `company_id` = 2) AND (`active` = 1 OR `deleted_at` IS NULL)
```
Câu lệnh sai:
```php
$user = User::where('company_id', 1)->orWhere('company_id', 2)
    ->where('active', 1)->orWhere('deleted_at', null);
```
Câu lệnh đúng
```php
$user = User::where(function ($query) {
    $query->where('company_id', 1)->orWhere('company_id', 2);
})->where(function ($query) {
    $query->where('active', 1)->orWhere('deleted_at', null);
});
// hoặc viết gọn hơn
$user = User::where(function ($query) {
    $query->whereCompanyIdOrCompanyId(1, 2);
})->where(function ($query) {
    $query->whereActiveOrDeletedAt(1, null);
});
```
## 6. dd() kết quả truy vấn
Thay vì viết
```php
$user = User::where('company_id', 1)->first();
dd($user)
```
Bạn có thể viết:

```php
$user = User::where('company_id', 1)->first()->dd();
```

## 7. $exists và $wasRecentlyCreated
```php
$user = new User;
$user->name = 'Viblo';

// kiểm tra $user có tồn tại trong DB không
$user->exists; // false
// kiểm tra $user có phải vừa được tạo trong request hiện tại không?
$user->wasRecentlyCreated; //false

$user->save();

$user->exists; // true
$user->wasRecentlyCreated; // true
```

```php
$user = User::find(1);

$user->exists; // true
$user->wasRecentlyCreated; //false
```

## 8. isDirty(), isClean() và wasChanged()

```php
$user = User::create([
    'name' => 'Viblo',
    'age' => 3
]);

$user->name = 'Mr. Ken';

// kiểm tra xem $user có bị thay đổi kể từ khi lấy ra không?
$user->isDirty(); // true
$user->isDirty('name'); // true
$user->isDirty('age'); // false

// kiểm tra xem $user còn nguyên vẹn kể từ khi lấy ra không (ngược lại với isDirty)?
$user->isClean(); // false
$user->isClean('name'); // false
$user->isClean('age'); // true

$user->save();

$user->isDirty(); // false
$user->isClean(); // true
```

```php
$user = User::create([
    'name' => 'Viblo',
    'age' => 3
]);

$user->name = 'Mr. Ken';

// kiểm tra xem $user có bị thay đổi trong lần save gần nhất không?
$user->wasChanged(); // false

$user->save();

$user->wasChanged(); // true
$user->wasChanged('name'); // true
$user->wasChanged('age'); // false
```