# 1. giới thiệu :
Queues: giúp xử lý các tác vụ tốn thời gian (gửi email, notification cho người dùng ). nó chạy ngầm nên sẽ cải thiện tốc độ người dùng và không gây ảnh hưởng nhiều đến luồng  chính mà chúng ta chạy

Schedules dùng để hẹn lịch, các lich trình cho các job chạy 
# 2. Cài đặt Queues:
tạo table chúng ta run queue:table artisan command: 
	`php artisan queue:table`  và
	`php artisan migrate`

Chỉnh sửa file .env:
`QUEUE_DRIVER=database`
	
### cấu hình email
```
MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=[username]
MAIL_PASSWORD=[password]
MAIL_ENCRYPTION=null
```
# 3. Tạo Job :
**Command**: `php artisan make:job SendEmailRegisterUser`
sau khi tạo class thì nó sẽ implement :
`Illuminate\Contracts\Queue\ShouldQueue`
	xử lý của job sẽ chạy trong method handle của job SendEmailRegisterUser 
Trong controller thì chúng ta chỉ việc use `job_path` vào và sử dụng method `dispatch`

```
SendEmailRegisterUser::dispatch($user)
       ->delay(now()->addMinutes(1));
```
     
nếu muốn thực hiện trì hoãn công việc thì thêm method delay,...
Sau đó chạy command `php artisan queue:work` nếu trên web có tạo một cái post nào đó thì job sẽ chạy

-----
# 4. Schedules :
command: php artisan make:command RegisteredUsers --command=registered:users
	command trên sẽ tạo class RegisterUsers trong folder app/console/commands
### 	đăng kí command: 
```
/**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
   protected $commands = [
        'App\Console\Commands\RegisteredUsers',
    ];
```

xem list command: `php artisan list`

	
xử lí của command RegisteredUser (// RegisteredUsers.php)
```
public function handle()
   {
       $users = User::all();
       foreach ($users as $user ) {
         Mail::to($user->email)->send(new RegisterSuccessMailable($user->name));
       }
   }
```

chạy thử command RegisteredUser: `php artisan registered:users`
đặt lịch cho command chạy: 

```
kernel.php
protected function schedule(Schedule $schedule)
{
        $schedule->command('registered:users')
              ->everyMinute();
}
```


**Run schedulse**: php artisan schedule:run
# 5. Cài đặt crontab: 
		
```
view path-to-your-project: pwd
view crontab: crontab -l
edit crontab: crontab -e
```
thêm vào cuối file theo cú pháp 
	* * * * * command  /path-to-your-file/  >> /dev/null 2>&1