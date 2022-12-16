Sử dụng chi tiết 				
	- Tạo Browsers : Browsers là một bộ hướng dẫn kiểm tra một số chức năng như người dùng mở trình duyệt và tương tác với trình duyệt.			
	Ví dụ với 1 bài test xác nhận rằng người dung có thể đăng nhập vào ứng dụng thì sẽ có các bước sau :			

```
public function testLogin ()			
{			
    $user = factory(User::class)->create([
        'email' => 'taylor@laravel.com',
    ]);			

    $this->browse(function ($browser) use ($user) {		
    $browser->visit('/login') // action #1: đi tới trang đăng nhập		
        ->type('email', $user->email)// action #2: nhập email vào trường email		
        ->type('password', 'secret')// action #3: nhập mật khẩu		
        ->press('Login')//action #4: nhấn nút Login		
        ->assertPathIs('/home');//action #5 xác nhận đường dẫn địa chỉ sau login là /home		
});
}
```
	Bạn cũng có thể tạo nhiều browser 1 lúc bằng cách gọi tới phương thức browse() như sau :

	$this->browse(function ($first, $second) {
	});

Mọi người có thể tham khảo thêm tại đây : https://drive.google.com/file/d/1VJ7r-QvCNUXAp2p3dYkI77gbbl5Bsh0z/view?usp=sharing