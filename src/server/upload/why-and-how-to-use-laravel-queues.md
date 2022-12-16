# Lời nói đầu
Hello các bác, lại là em đây :)). Trong cộng đồng viblo này chắc hẳn có rất nhiều bác đang sử dụng framework Laravel vào công việc của mình. Trong đó có nhiểu bác đã làm việc với Laravel trong vài năm, trải qua nhiều phiên bản nâng cấp của Framework này, và cũng có nhiều bác mới tập làm quen với Laravel. Tuy nhiên không cần quan tâm các bác đã làm việc với laravel trong bao lâu thì em cũng tin rằng các bác đã nghe tới hoặc đã từng sử dụng Queue, một tính năng rất hay của laravel. Trong bài viết lần này em sẽ chia sẻ một chút tại sao chúng ta sử dụng Queue và sử dụng nó như thế nào.
# Queues là gì?
Queues nó hiểu như một luồng xử lý, chúng ta thường tạo Queues của các event các tasks. Queues thực sự rất có ích khi chúng ta tạo chức năng như email system, vì gửi Mail có thế mất rất nhiều thời gian. Vậy trong bài này em sẽ làm một ví dụ đơn giản và cụ thể để giúp các bác hiểu hơn tại sao chúng ta dùng queues và chúng ta sẽ dùng nó như thế nào.
<br>
# cài đặt project mới
Vậy việc đầu tiên các bác hãy install mootjh project mới để chúng ta cùng thực hành. Các bác chạy lệnh sau để install project.
```
composer create-project --prefer-dist laravel/laravel test_laravel_queues
```
# config mail sytems
Sau khi cài đặt xong thì cùng bắt tay vào setup email systems. Ở đây thì em hay test bằng mailtrap. các bác có thể truy cập bất kỳ hệ thống nào mà các hay dùng để test.
![](https://images.viblo.asia/17f411c5-5922-42ed-9743-b8aee65a7a48.jpg)

Khi dùng mailtrap thì các bác có giao diện như này. hay để ý những thông tin cần thiết như `username`, `password`, `host`. Sau khi đã có thông tin này rồi thì các bác hay điền nó vào file env như sau:
```
MAIL_DRIVER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your username key
MAIL_PASSWORD=your password key
MAIL_ENCRYPTION=tls
```
# Tạo chức năng gửi mail
 Vậy là xong vụ config mail rồi :D. Để đơn giản hóa trogn ví dụ này thì em xin phép không cầu kỳ nhé. Không tạo controller mà gọi thẳng function trong route luôn =))
 <br>
 Route của chúng ta sẽ như thế này:
 ```
 
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmailMailable;

Route::get('/', function () {
    return view('welcome');
});

Route::get('sendMail', fucntion (){
	Mail::to('tienduong@gmail.com')->send(new SendEmailMailable());
});
 ```
 nhìn vào đó các bác chắc cũng phát hiện ra chúng ta sẽ phải làm gì tiếp theo rồi. Hãy tạo mội mail có tên là `SendEmailMailable`.
 ```
 php artisan make:mail SendEmailMailable
 ```
 trong thư mục App\Mail chúng ta đã có một file là SendEmailMailable.php. Bây giờ các bấc hãy thử mở browser lên rồi truy cập vào url `http://localhost:8000/sendEmail` xem có gì xảy ra hay không. 
 <br> 
 Vậy là sau khi truy cập vào và mất 1->3 giây thì đã chạy xong và ở trong mail trap có mail gửi đến 
 ![](https://images.viblo.asia/144ec6f4-3920-414d-9c04-70214b1478c0.PNG)
 # Sử dụng queues job
 Vậy là chúng ta vừa thực hiện xong chức năng gửi mail, tuy nhiên vấn đề là chúng ta phải đợi vài giây để load xong chức năng gửi mail đó. Và đấy chính là vấn đề. Ví dụ khi hệ thống có vài nghìn người truy cập vào đó một lúc thì hệ thống sẽ phải xử lý hàng nghìn yêu câu gửi mail điều đó dẫn tới server sẽ phải sử lý quá nhiều thứ một lúc dẫn tới hiệu năng không cao, thậm chí có thể hẹo luôn cả server. Vậy queues sinh ra để khác phục vấn đề này. Vậy việc của chúng ta bây giờ là tạo queues để xử lý vấn đề này.
 Các bác có thể thấy trên trang tài liệu thì Queues có hỗ trọ rất nhiều driver như `database,  Beanstalkd, Amazon SQS, Redis`. Tuy nhiên trong ví dụ lần này em sử dụng `database`. Trước hết hãy vào `.env` để config `QUEUE_CONNECTION`:
 ```
 QUEUE_CONNECTION=database
 ```
 Giờ hayx nào cùng khởi tạo queues thôi. Các bác chạy câu lệnh sau:
 ```
 php artisan queue:table
 php artisan migrate
 ```
 Các bác nhớ config database nhé :))). Sau khi chạy xong câu lệnh trên thì chúng ta thấy trong database có thêm bảng `Jobs`.
 Bây giờ chúng ta sẽ tạo `Job` để thực thi tác vụ gửi mail
 ```
 php artisan make:job SendEmailJob
 ```
 Sau khi có file về job rồi chúng ta sẽ làm gì với nó. Các bác chỉ cần quan tâm đến function handle() trong  file đó thôi. Đó là nơi chúng ta sẽ viết vào các logic xử job. với tác vụ gửi mail thì khá đơn giản như sau:
 ```
 use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmailMailable;
...
 public function handle()
    {
        Mail::to('tienduong@gmail.com')->send(new SendEmailMailable());
    }
 ```
 
 Có job rồi chúng ta chỉ cần dispatch để thực thi cái job này. Bây giờ file `Route/web.php` của chúng ta sẽ nhìn như thế này:
 ```
 use App\jobs\SendEmailJob;

Route::get('/', function () {
    return view('welcome');
});

Route::get('sendEmail', function( ){
	SendEmailJob::dispatch()->delay(now()->addSeconds(10));;

	return 'email is sended';
});
 ```
ở đây em đang để delay là 10 giây, thì sau khi các bác chạy url `http://localhost:8000/sendEmail` các bác sẽ không thấy trên mailtrap có bắn mail về. mà phải đợi khoảng 10 giây sau mới có.
khi vào trong database kiểm tra thì các bác sẽ thấy bảng jobs của chúng ta sẽ có dữ liệu. Tuy nhiên chúng ta chưa proccessing quá trình gửi mail, để làm điều này thì chúng ta phải chạy câu lệnh:
```
php artisan queue:work
```
 Ngay sau đó thì các bác sẽ thấy quá trình đang chạy
![](https://images.viblo.asia/99bc3390-8101-4a42-9fe1-941f3d6f145b.PNG)
   Kết quả trên mailtrap
   ![](https://images.viblo.asia/f20cf04c-f394-49e2-8119-51f1f8b4f406.PNG)
  Vậy sau mỗi lần refesh lại url `http://localhost:8000/sendEmail` thì các bác sẽ đợi khoảng 10s để nhận được mail
  # Kết Luận
  Vừa rồi mình vừa hoàn thành một ví dụ rất đơn giản và dễ hiểu về queues, hi vọng các bác đọc bài này thì có thể hiểu được khi nào chúng ta nên dùng queues, và ưu điểm khi sử dụng queues là gì và sử dụng queues như thế nào. Cảm ơn các bác đã đón đọc, nếu có gì thắc mắc hay góp ý gì thì các bác comment xuống phía dưới để em cải thiện ở những bài viết sau nhé. Thanks