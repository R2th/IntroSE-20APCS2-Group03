Trong bài viết lần này tôi xin chia sẻ về validation trong Laravel framework.
Các message trong bài viết sử dụng tiếng Nhật. Go my way!

# Thêm Validation
## Validate khi thực hiện tạo mới 
Khi check validation trong laravel chỉ cần liệt kê những nội dung mà chúng ta muốn validate.
Dưới đây là một phần source check validation sample khi đăng ký account.


```AdminController.php
public function store(Request $request)
{
    if($request->action === 'back') {
        return redirect()->route('admin.index');
    }
    // Thêm validation 
    $rules = [
        'admin_code' => ['required', 'integer', 'unique:admin'],
        'role' => ['size:1'],
        'password' => ['required', 'string', 'min:8', 'confirmed']
    ];
    $this->validate($request, $rules);
    // Thêm tới đây
    $admin = new Admin;
    $admin->admin_code = $request->admin_code;
    $admin->name = $request->name;
    $admin->role = $request->role;
    $admin->password = Hash::make($request->password);
    $admin->save();
    return redirect()->route('admin.index');
}
```
Trong source phía trên, điều kiện check validate của các field như sau:

`admin_code` là required, integer, unique

`role` là size

`password` là required, string, min, confirmed.

Áp dụng vào thực tế và thử thao tác tạo lỗi như sau.


![](https://images.viblo.asia/14355924-4f1a-4f86-a790-6405c9c67a6e.png)

Nếu không input vào item Admin Code vào click button : Add/追加

![](https://images.viblo.asia/dc1deb81-1f01-4419-82bc-1624261c602a.png)

Hiển thị message rồi nhé, Bravo ! 

Nhân tiện, tôi đã sử dụng Register.blade.php của auth để tạo ra màn hình này, nên phương thức hiển thị cũng khá rõ ràng và dễ hiểu. 
```Error message
{{-- Error message --}}
@if ($errors->any())
    <div class="alert alert-danger">
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
    </div>
@endif
}
```

Theo Laravel Documentation, do `$error` được định nghĩa trong middleware `ShareErrorsFromSession` nên chúng ta có thể sử dụng thoải mái.

Chỉ cần áp dụng vào cơ chế hiển thị là chúng ta đã có thể cho hiển thị error message.
Ngoài ra, nếu xuất hiện lỗi Password validation, sẽ hiển thị error message tương tự như alert message ở phía dưới item tương ứng.

![](https://images.viblo.asia/341503a0-c2e0-46b0-b1e7-5530de310499.png)

Sau đây tôi xin phép chia sẻ về cơ chế  hiển thị error ở đoạn code dưới đây:

```
<div class="form-group row">
    <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
    <div class="col-md-6">
        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password">
            @error('password')
                <span class="invalid-feedback" role="alert">
                     <strong>{{ $message }}</strong>
                </span>
            @enderror
     </div>
</div>
```

Trong `class` thực hiện check  có error message validation tại thuộc tính đó(password)  hay không bằng `@error` (Chỉ thị message hiển thị ở đâu) , trong trường hợp có message thì cho hiển thị nội dung của `@error` phía dưới item tương ứng.
Khai báo error message tại `@message`.

Và tại đây tôi sẽ tận dụng để display none(hide) những message đã hiển thị.
```
<div class="form-group row">
    <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
    <div class="col-md-6">
        <input id="password" type="password" class="form-control" name="password">
    </div>
</div>
```

## Đối với action Update, chỉ thực hiện check validation với item đã được input 
Thông thường, nếu là required item thì nội dung validation cũng không thay đổi khi thực hiện Update
Example : 
Với item Admin Code, mặc dù tại thời điểm Create là : Unique, nhưng khi thực hiện Update, nếu muốn set giống với Admin Code ban đầu, hoặc chỉ Check/Update tại trạng thái đã input (Trường hợp Hash PW không hiển thị trên màn hình).

```AdminController.php
public function update(Request $request, $id)
{
    if($request->action === 'back') {
        return redirect()->route('admin.index');
    }
    // validation
    $rules = [
        'admin_code' => ['required', 'integer'],
        'role' => ['size:1'],
        'password' => ['sometimes', 'nullable', 'string', 'min:8', 'confirmed']
    ];
    $this->validate($request, $rules);
    $admin = \App\Admin::find($id);
    $admin->admin_code = $request->admin_code;
    $admin->name = $request->name;
    $admin->role = $request->role;
    if (!empty($request->password)) {
        $admin->password = Hash::make($request->password);
    }
    $admin->save();
    return redirect()->route('admin.index');
}
```

Example : 
Tôi đã bỏ check unique cho `admin_code`.
Thêm 'sometimes' và 'nullable' cho `password` với mục đích chỉ check khi đã thực hiện input.
Chỉ với những thay đổi nhỏ này, tôi có thể xử lý có thực hiện update item đó , và chỉ update khi item đó được set giá trị khi save data.

# Xử lý đa ngôn ngữ message sang tiếng Nhật
Phần tiếp theo tôi sẽ sử dụng message bằng tiếng Nhật

## Tạo file tiếng Nhật
Nếu tạo sẵn các file xử lý của từng ngôn ngữ trong thư mục resources / lang, nó sẽ được Localization theo cài đặt. Folder `lang` mặc định sẽ như sau:

![](https://images.viblo.asia/b0373a19-d544-40a8-9998-cdc745e2b766.png)


Trong folder en (tiếng Anh), có những file sau:
・auth.php: message hiển thị khi lỗi authen login
・pagination.php: text hiển thị khi pagination
・passwords.php: message hiển thị khi reset password
・validation.php: message hiển thị khi validation
v.v…
Khi localization, sẽ sử dụng file trên hoặc sẽ tự tạo.

Bây giờ tôi sẽ tạo folder ja lưu file messgae tiếng Nhật.

![](https://images.viblo.asia/922e2a4a-bade-4604-be3a-c6c72b6c4e9c.png)

Sau khi chuyển sang tiếng Nhật, tất cả message sẽ lấy ra từ folder ja nên file hiện tại có trong en sẽ copy vào cả folder ja.


![](https://images.viblo.asia/fcbd4e15-2b46-43a7-a914-4d7cc9f15e24.png)

Nhân tiện đưa các file đa ngôn ngữ cho tiếng Nhật vào chung folder.


```validation.php
<?php
return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages here.
    |
    */
    'accepted' => ':attribute は「許可」でなくてはなりません',
    'active_url' => ':attribute は有効なURLではありません',
    'after' => ':attribute は :date より後の日付にしてください',
    'after_or_equal' => ':attribute は :date 以降の日付にしてください',
    'alpha' => ':attribute にはアルファベットしか入力できません',
    'alpha_dash' => ':attribute には英数字、ハイフン、アンダースコアしか入力できません',
    'alpha_num' => ':attribute には英数字しか入力できません',
    'array' => ':attribute は配列で入力してください',
    'before' => ':attribute は :date より前の日付にしてください',
    'before_or_equal' => ':attribute は :date 以前の日付にしてください',
    'between' => [
        'numeric' => ':attribute は :min から :max の間の値にしてください',
        'file' => ':attribute は :min から :max kbの間のサイズにしてください',
        'string' => ':attribute は :min から :max の間の文字にしてください',
        'array' => ':attribute は :min から :max の間の項目にしてください',
    ],
    'boolean' => ':attribute は true か false を入力してください',
    //Giống bên dưới
   ```


:attribute, :date sẽ trở thành variable.

![](https://images.viblo.asia/8be86727-a7b6-407b-a4fd-26913c792c14.png)

## Đa ngôn ngữ Item name
validation.php có thể setting đa ngôn ngữ (tiếng Nhật) cho Item name được hiển thị trong message lỗi.

```
/*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],
 ```

Set trong mảng trong attributes thì sẽ như thế này.
```
'attributes' => [
    'admin_code' => '管理者コード',
    'name' => '氏名',
    'role' => '権限',
    'password' => 'パスワード', 
],
```

Message sau khi được sử lý đa ngôn ngữ cho tiếng Nhật

![](https://images.viblo.asia/81c7113b-c936-4fc7-ab19-52f78774bead.png)

Item name hiển thị trong message lỗi được chuyển thành tiếng Nhật.
Item trên màn hình là tiếng Anh, cái này thì thiết định bằng blade.php.

Hết !!!

Nguồn : 
https://qiita.com/apricotcomic/items/acb4fdb8969990034da8#validate%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B