Hello anh em.
Ở bài này mình xin chia sẻ một số kiến thức về viết test cho project laravel mà mình tình hiểu và đã áp dụng thực tế. Về unit test laravel thì có rất nhiều bài viết về vấn đề này rồi nhưng đa số đều viết test tổng quát, này mình sẽ hướng dẫn viết chi tiết cách viết test 1 chức năng là create user và test các trường hợp validate, nào bắt tay vào code thôi. Thực hành luôn cho nhớ nhé ae.
# Viết chức năng create user 
Để có thể viết unit test thì trước hết mình cần cái để test, ở đây mình cần chức năng create user.
### UserController
```PHP
public function store(UserCreateRequest $request)
{
    try {
        $user = $this->userRepository->store($request);
        return redirect()->route('users.edit', $user)
                         ->with('messageSuccess', 'This user successfully created');
    } catch (QueryException $exception) {
        return redirect()->back()->with('messageFail', 'Create failed. Something went wrong')->withInput();
    }
}
```
Ở UserController mình viết function store nhận request và sử dụng UserCreateRequest để validate dữ liệu, dùng userRepository để trèn dữ liệu vào database. function store thành công sẽ trả về  messageSuccess
### UserCreateRequest
UserCreateRequest có nhiệm vụ validate dữ liệu đầu vào
tham khảo thêm  [tại đây](https://laravel.com/docs/5.8/validation)
```PHP
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|min:5|max:50|',
            'email' => 'required|max:200|unique:users',
            'password' => 'required|min:8|max:50|',
            'avatar' => 'image',
        ];
    }
    
    public function messages()
    {
        return [
            'name.required' => 'Please enter name',
            'name.min' => 'Name is too short (minimum is 5 characters)',
            'name.max' => 'Name is too long (maximum is 50 characters)',
            'email.required' => 'Please enter email',
            'email.unique' => 'This user email has already been used by another user',
            'email.max' => 'Email is too long (maximum is 200 characters)',
            'password.required' => 'Please enter password',
            'password.min' => 'Password is too short (minimum is 8 characters)',
            'password.max' => 'password is too long (maximum is 50 characters)',
            'avatar.image' => 'The avatar is not in the correct format',
        ];
    }
```
Trong này ta sẽ thiết lập các rule mà messages tương ứng<br>
### UserRepository
```PHP
public function store($request)
{
    if ($request->hasFile('avatar')) {
        $path = $request->file('avatar')->store('public/images');
        $data['avatar'] = strstr($path, '/');
    }
    $data['name'] = $request->name;
    $data['email'] = $request->email;
    $data['password'] = bcrypt($request->password);
    $data['role'] = $request->role;
    $user = User::create($data);
    return $user;
}
```
UserRepository đảm nhiệm việc sử lý dữ liệu và lưu vào DB.<br>
**vậy là đã xong phần create user, giờ bắt tay vào viết test nhé.**
# Viết unit test create user
 cấu trúc thư mục test sẽ như thế này
 ![](https://images.viblo.asia/b22da17e-66d4-41e2-ad65-45abb5075fb1.png)
Chúng ta sẽ tạo thêm file UserControllerTest.php trong feature bằng lệnh
```
php artisan make:test UserControllerTest
```
Giờ thì viết test cho từng trường hợp thôi.
1. Test trường hợp update thành công 
```PHP
    public function testStoreUserSuccessFeature()
    {
        $admin = factory(User::class)->create(['role' => UserType::ADMIN]); // tạo 1 tài khoản admin
        $this->actingAs($admin); // cho admin đăng nhập vào
        $params = [
            'name' => "Name Create",
            'email' => 'email@gmail.com',
            'password' => '12345678',
            'role' => '1',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        ]; // những dữ liệu update gửi đi

        $response = $this->post(route('users.store'), $params); // gọi router gửi dữ liêu đến controller
        $response->assertRedirect(); // kiểm tra xem khi thnahf công có chuyển trang không
    }
```

2. Test trường hợp update false khi admin chứa đăng nhập
```PHP
    public function UnauthenticateUserCannotCreateUser()
    {
        $admin = factory(User::class)->create(['role' => UserType::ADMIN]);
        $params = [
            'name' => "Name Create",
            'email' => 'email@gmail.com',
            'password' => '12345678',
            'role' => '1',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        $response = $this->post(route('users.store'), $params);
        $response->assertStatus(302); // kiểm trả xem response có trả về lỗi 302 không 
        $response->assertRedirect('login'); // kiểm trả xem response có rederect về login không
    }
```
do admin chưa đăng nhập nên response trả về lỗi 302 và redirect về login.
ở trên phần 1 mình có dùng `$this->actingAs($admin);` để đăng nhập

3. Test trường hợp dữ liệu update false vì có trường name là rỗng
  ```PHP
  public function testCreateUserRequireName()
    {
        $admin = factory(User::class)->create(['role' => UserType::ADMIN]);
        $this->actingAs($admin);
        $params = [
            'name' => null,
            'email' => 'email@gmail.com',
            'password' => '12345678',
            'role' => '1',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        $response = $this->post(route('users.store'), $params);
        $response
            ->assertStatus(302)
            ->assertSessionHasErrors('name'); // kiểm tra xem response có báo lỗi name không
    }
```
4. Test trường hợp dữ liệu update false vì có trường name quá ngắn
 
```PHP
    public function testCreateUserNameMinLength()
    {
        $admin = factory(User::class)->create(['role' => UserType::ADMIN]);
        $this->actingAs($admin);
        $params = [
            'name' => 'abc',
            'email' => 'email@gmail.com',
            'password' => '12345678',
            'role' => '1',
            'avatar' => UploadedFile::fake()->image('avatar.jpg'),
        ];

        $response = $this->post(route('users.store'), $params);
        $response
            ->assertStatus(302)
            ->assertSessionHasErrors('name');
    }
```
5. Test avatar không đúng định dạng
```PHP
public function testCreateUserAvatarNotImage()
{
    $admin = factory(User::class)->create(['role' => UserType::ADMIN]);
    $this->actingAs($admin);
    $params = [
        'name' => "Name create",
        'email' => "email@gmail.com",
        'password' => Str::random(51),
        'role' => '1',
        'avatar' => "fsdsF",
    ];

    $response = $this->post(route('users.store'), $params);
    $response
        ->assertStatus(302)
        ->assertSessionHasErrors('avatar');
}
```
**Tương tự test email hay password cũng vậy**
# Kết bài
Trên đấy là nhưng thứ mình biết về unittest, rất mong nhận được sự góp ý từ mọi người.