<br>- Carbon là một gói phần mềm được phát triển bởi Brian Nesbit mở rộng từ class DateTime của PHP. Từ phiên bản 5.3, Laravel đã tích hợp sẵn thư viện này vào Project. Việc sử dụng tốt thư viện này sẽ giúp bạn rất nhiều vấn đề về xử lý thời gian.
<br>
  - Thư viện này giúp chúng ta rất nhiều trong việc xử lý datetime trong PHP. Điển hình như:
  - Xử lý timezone.
  - Lấy ngày tháng hiện tại dễ dàng.
  - Convert datetime sang định dạng khác để đọc
  - Dễ dàng thao tác với datetime.
  - Chuyển đổi cú pháp là cụm từ tiếng anh sang datetime.
<br>

<br>
- Bạn cần import thư viện để sử dụng:
<br>

```php
use Carbon\Carbon;
```
Ví dụ:
<br>
- Lấy thời gian:

```php
Carbon::now(); // thời gian hiện tại 2018-10-18 14:15:43
Carbon::yesterday(); //thời gian hôm qua 2018-10-17 00:00:00
Carbon::tomorrow(); // thời gian ngày mai 2018-10-19 00:00:00
$newYear = new Carbon('first day of January 2018'); // 2018-01-01 00:00:00
```

+ Để lấy tgian hiện tại tại Việt Nam ta sẽ thêm locale của Việt nam như sau:

```php
echo Carbon::now('Asia/Ho_Chi_Minh'); // 2018-10-18 21:15:43
```

+ Để biết thêm về các nước khác bạn có thể tại trang chủ của PHP:
[Timezone](http://php.net/manual/en/timezones.php)
<br>
- Bạn cũng có thể chuyển đổi kiểu datetime khác: 

```php
$dt = Carbon::now('Asia/Ho_Chi_Minh');

echo $dt->toDayDateTimeString();  Thu, Oct 18, 2018 9:16 PM

echo $dt->toFormattedDateString(); // Oct 18, 2018

echo $dt->format('l jS \\of F Y h:i:s A'); // Thursday 18th of October 2018 09:18:57 PM

echo $dt->toDateString();               // 2018-10-18
echo $dt->toTimeString();               // 21:16:20
echo $dt->toDateTimeString();           // 2018-10-18 21:16:16

```

<br>
- Các bạn cũng có thể chỉ lấy ngày, tháng, năm, giờ, phút, giây, ngày của tuần, ngày của tháng, ngày của năm, tuần của tháng, tuần của năm, số ngày trong tháng. Thật dễ dàng :))

```php
    Carbon::now()->day; //ngày
    Carbon::now()->month; //tháng
    Carbon::now()->year; //năm
    Carbon::now()->hour; //giờ
    Carbon::now()->minute; //phút
    Carbon::now()->second; //giây
    Carbon::now()->dayOfWeek; //ngày của tuần
    Carbon::now()->dayOfYear; //ngày của năm
    Carbon::now()->weekOfMonth; //ngày của tháng
    Carbon::now()->weekOfYear; //tuần của năm
    Carbon::now()->daysInMonth; //số ngày trong tháng
```
<br>
- Có thể tăng giảm ngày, tháng, năm, giờ, phút, giây bằng hàm 2 hàm add() và sub()
<br>

```php
$dt = Carbon::now();

echo $dt->addYears(5);                 
echo $dt->addYear();                    
echo $dt->subYear();                  
echo $dt->subYears(5);            

echo $dt->addMonths(60);                
echo $dt->addMonth();       
echo $dt->subMonth();                   
echo $dt->subMonths(60);  

echo $dt->addWeeks(3);                 
echo $dt->addWeek();                  
echo $dt->subWeek();                
echo $dt->subWeeks(3);       

echo $dt->addDays(29);                  
echo $dt->addDay();                   
echo $dt->subDay();                     
echo $dt->subDays(29); 

echo $dt->addHours(24);                  
echo $dt->addHour();                 
echo $dt->subHour();                   
echo $dt->subHours(24);   
...
```
<br>
- Ta cũng có thể so sánh với thời gian hiện tại một cách dễ dàng: Nó sẽ trả về là true hay false.

```php
    $now = Carbon::now();
    $now->isWeekday();
    $now->isWeekend();
    $now->isYesterday();
    $now->isToday();
    $now->isTomorrow();
    $now->isFuture()
    $now->isPast();
    $now->isBirthday(); // là ngày sinh nhật hay không
```

<br>
- Tính toán sự khác nhau giữa 2 datetime:

```php
    $dt = Carbon::create(2018, 10, 18, 21, 40, 16); //Tạo 1 datetime
    $now = Carbon::now();
    echo $now->diffInSeconds($dt);
    echo $now->diffInMinutes($dt);
    echo $now->diffInHours($dt);
    echo $now->diffInDays($dt);
    echo $now->diffInMonths($dt);
    echo $now->diffInYears($dt);
```

<br>
- Như trên facebook các bạn thấy các bài viết sẽ có trạng thái là 1 phút trước, 1 giờ trước chẳng hạn Carbon cũng hỗ trợ các bạn phần này luôn:

```php
    Carbon::setLocale('vi'); // hiển thị ngôn ngữ tiếng việt.
    $dt = Carbon::create(2018, 10, 18, 14, 40, 16);
    $dt2 = Carbon::create(2018, 10, 18, 13, 40, 16);
    $now = Carbon::now();
    echo $dt->diffForHumans($now); //12 phút trước
    echo $dt2->diffForHumans($now); //1 giờ trước
```
<br>

Trong quá trình làm việc mình gặp phải một trường hợp như sau:
> Hãy lấy ra chủ nhật tuần trước <br>
> Hãy lấy ra chủ nhật cuối cùng của tháng trước  <br>
> Hãy lấy ra chủ nhật cuối cùng của năm trước <br>
> ...

<br>Bạn sẽ xử lý thế nào? :D <br>
Với Carbon thì vô cùng đơn giản:<br>
Để làm được điều đó ta làm như sau:<br>

```php
    $sundayLastMonth = Carbon::parse('last sunday of last month');
 ```
         
 <br> Carbon hỗ trợ chúng ta hàm parse() để biên dịch và tìm ra ngày tháng phù hợp với mục đích của chúng ta một cách dễ dàng hơn.<br>
Trên đây mình chỉ liệt kê những kiểu thường dùng, ngoài ra còn rất nhiều các kiểu khác nữa, bạn có thể tham khảo tại trang chủ của Carbon tại [Carbon](https://carbon.nesbot.com/docs)