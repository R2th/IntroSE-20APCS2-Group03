# 1 Đặt vấn đề
Chẳng hạn bây giờ bạn có 1 chuỗi các action diễn ra lần lượt  và phụ thuộc vào nhau **tạo account->gửi mail cho user**, bạn sẽ viết code như thế nào? và ở đâu? Có thể bạn sẽ viết toàn bộ logic tạo account đó trong Controller. Nhưng không, hãy nghĩ lại xem việc gửi mail là việc chắc chắn sẽ xảy ra mỗi khi account được tạo thành công. Sau này  các khách hàng đáng yêu sẽ nghĩ ra nhiều chức năng hơn nữa liên quan đến việc tạo Account mà nằm trong 1 Controller khác thì chúc mừng bạn, bạn trúng đc 1 phiếu coppy code logic nếu bạn viết code liên quan đến tương tác giữ liệu trong Cotroller. Theo kinh nghiệm cá nhân của mình thì phía controller chỉ nên xử lí dữ liệu đầu vào đầu ra, model mới là nơi xử lí các action lấy,thêm, sửa, xóa... dữ liệu. 
# 2 Xử lí Events với Observers

Eloquent cho phép bạn hook các sự kiện trong một vòng đời của nó: `retrieved`, `creating`, `created`, `updating`, `updated`,` saving`, `saved`, ` deleting`, `deleted`, `restoring`, `restored` . Nhìn qua tên chắc bạn cũng đoán đc các sự kiện sẽ xảy ra khi nào. 
## 2.1 Tạo Observe
Theo như bài toán nêu ra ở trên **tạo account->gửi mail cho user**  giờ mình cần tạo 1 AccountObserver để theo dõi sự kiện model  Account tạo mới 1 bản ghi thành công với lệnh sau:

`php artisan make:observer AccountObserver --model=Account`

File này sẽ đc sinh ra ở thư mục `app/Observers` với nội dung sau:

``` php
<?php

namespace App\Observers;

use App\Account;

class AccountObserver
{
    /**
     * Handle the account "created" event.
     *
     * @param  \App\Account  $account
     * @return void
     */
    public function created(Account $account)
    {
        //
    }

    /**
     * Handle the account "updated" event.
     *
     * @param  \App\Account  $account
     * @return void
     */
    public function updated(Account $account)
    {
        //
    }

    /**
     * Handle the account "deleted" event.
     *
     * @param  \App\Account  $account
     * @return void
     */
    public function deleted(Account $account)
    {
        //
    }

    /**
     * Handle the account "restored" event.
     *
     * @param  \App\Account  $account
     * @return void
     */
    public function restored(Account $account)
    {
        //
    }

    /**
     * Handle the account "force deleted" event.
     *
     * @param  \App\Account  $account
     * @return void
     */
    public function forceDeleted(Account $account)
    {
        //
    }
}
```
 Trên đây các bạn có thể nhận thấy các **hook functions** nhận tham số đầu vào chính là Model mà nó đang theo dõi(observe), vì vậy bạn có thể sử dụng dữ liệu của Model để lưu vào DB or làm gì đó ^^ . Chẳng hạn mình có hook đến sự kiện `created`  để gửi Mail cho **Account** vừa đc tạo mới như sau:
 
 ``` php 
 /**
 * Handle the account "created" event.
 *
 * @param  \App\Account  $account
 * @return void
 */
 public function created(Account $account)
 {
 	Mail::to($account->email)->send(new SendMailAccount($account->email));
 }

```
## 2.2 Khai báo Observe
Sau khi tạo xong Observer thì bạn nhớ đăng kí nó ở `boot` method của **service providers** . Ở đây mình khai báo ở `AppServiceProvider:`
```php
/**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
  		// Model Account is observed by AccountObserver 
        Account::observe(AccountObserver::class);
    }
```

Mọi thứ đã xong, giờ mỗi khi bạn tạo mới 1 account thành công thông qua `save()` method của model thì  send Mail sẽ tự động fired. Bạn k còn lo việc code logic giống nhau xuất hiện ở nhiều nơi nữa.

**Chú í**  :   Khi 1 model được tạo mới nó sẽ fire 2 hook fucntion là  **creating** và **created**, khi model được update nó sẽ fire đến **updating** và **updated**. Cả 2 trường hợp trên **saving** và **saved** đều đc fire đến. Khi bạn sử dụng [**Mass Updates**](https://laravel.com/docs/5.7/eloquent#updates ) thì **saved** and **updated** sẽ **k  đc fire**.

# 3 Kết Luận

 Trên đây mình chỉ nêu lên cái tư tưởng của Observes và việc áp dụng nó chứ k đi sâu vào code. Mọi người có thể tham khảo kĩ hơn ở doc của [laravel](https://laravel.com/docs/5.7/eloquent#events) . Mọi thắc mắc hay góp í để lại comment giúp mình nhé ^^ . Cảm ơn mng .