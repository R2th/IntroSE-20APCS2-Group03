<div align="center">

# Lời mở đầu
</div>

- Thời gian luôn là một thành phần không thể thiếu trong cuộc sống nói chung cũng như lĩnh vực lập trình nói riêng. Và trong một website, chắc chắn sẽ có lúc bạn cần phải làm việc với thời gian, đơn giản nhất như là `created_at` và `updated_at`. Ngoài ra sẽ còn rất nhiều trường hợp nữa mà bạn thậm chí sẽ không nghĩ tới, nhưng yên tâm, Carbon đã nghĩ cho bạn rồi, việc của bạn là tìm kiếm trong document rồi 
    ```php
    use Carbon\Carbon
    ```
    để có thể sử dụng thôi.
- Các bạn **CHÚ Ý** về phiên bản Laravel mà mình đang sử dụng nhé: Carbon đã được tích hợp sẵn từ **Laravel 5.3** rồi, tuy nhiên các bạn  là từ **Laravel 6** sẽ không sử dụng **Carbon 1** nữa mà phải nâng cấp lên **Carbon 2** (2 phiên bản khác nhau như thế nào mình sẽ trình bày ở dưới nhé)

<div align="center">

# Nội dung
</div>


- Trước tiên hãy cùng tìm hiểu sự khác nhau giữa Carbon 1 và Carbon 2 trước để các bạn có thể lựa chọn phiên bản phù hợp, nhất là việc có nên nâng cấp phiên bản laravel lên không nhé.

<div align="center">

## Một số thay đổi với Carbon 2 
</div>

- Về phiên bản PHP yêu cầu:
    - Carbon 1.x yêu cầu phiên bản PHP 5.3+
    - Carbon 2.x yêu cầu phiên bản PHP PHP 7.1.8+ (còn nếu bạn sử dụng Laravel thì từ Laravel 5.8 đã hỗ trợ Carbon 2 rồi)

- Sự khác nhau về cú pháp, giá trị mặc định:

    |  | Carbon1 | Carbon2 |
    | -------- | -------- | -------- |
    | giá trị khởi đầu của`dayOfYear`     |  0     |  1     |
    | giá trị mặc định của **$month/$day** khi khởi tạo     | null     |  1     |
    | giá trị mặc định của **$year/$hour/$minute/$second**     |  null    |  0     |



    - **Ngày/tháng**:  trong **Carbon2**, giá trị mặc định của **$month/$day** khi khởi tạo bằng method `::create()` sẽ là 1; còn trong **Carbon1** sẽ nhận giá trị là ngày hiện tại.
    - **Giờ/phút/giây**: trong **Carbon2** thì giá trị mặc định của **$hour/$minute/$second** sẽ là 0.
    -
    - Trong **Carbon2**, giá trị thời gian sẽ được lấy chính xác đến từng micro giây. Nói 1 cách đơn giản thì 2 giá trị thời gian giống hệt nhau đến từng giây nhưng khi so sánh thì vẫn có thể không bằng nhau do sai khác về micro giây.
    - Trong **Carbon2**, các hàm `json_encode($date)` hay `$date->jsonSerialize()` sẽ trả về giá trị là **string** thay vì **array** như trước kia.
        ```php
        // dữ liệu cũ trả về dạng array
        array:3 [▼
          "date" => "2020-02-29 02:27:07.939106"
          "timezone_type" => 3
          "timezone" => "UTC"
        ]
        
        //còn đây là trả về dạng string
        2020-02-29 02:31:11.314533
        ```  
    - **Carbon2** đã loại bỏ đi  `setWeekStartsAt`/`setWeekEndsAt` với `::compareYearWithMonth()` nên nếu các bạn muốn sử dụng thì hãy cài đặt **Carbon1** nhé.
    - Trong Carbon2, hai hàm `isSameMonth` và `isCurrentMonth` sẽ so sánh thêm cả năm, vì vậy nếu cùng là tháng 2 nhưng năm khác nhau thì sẽ vẫn trả về false. Còn nếu như bạn muốn bỏ qua năm mà chỉ so sánh giá trị của tháng thì có thể truyền thêm false vào như thế này
        ```php
        $date->isSameMonth($date2, false)
        ```
    - **Carbon2** sử dụng phiên bản **PHP7.1+** nên đã hoàn toàn hỗ trợ cho việc xử lí micro giây. Vì vậy 2 hàm `useMicrosecondsFallback` và `isMicrosecondsFallbackEnabled` đã không còn cần thiết và bị loại bỏ.

<div align="center">

## Các thao tác với thời gian 1 cách dễ dàng
</div>

- Carbon sẽ cung cấp cho bạn RẤT RẤT NHIỀU hàm để thao tác với thời gian, và việc của các bạn chỉ đơn giản là tìm trong [document](https://carbon.nesbot.com/docs/) để xem cách sử dụng thôi. 
- Và trong phạm vi bài viết này, mình sẽ chỉ liệt kê ra một số thao tác mình thấy phổ biến và khá hay ho (theo quan điểm cá nhân nên nếu có gì thì các bạn góp ý thêm giúp mình nhé).


1. Phổ biến nhất là lấy thời gian hiện tại
    ```php
    $now = Carbon::now(); //date: 2020-02-29 03:26:49.845126 UTC (+00:00)
    $now = Carbon::now('Asia/Ho_Chi_Minh'); //date: 2020-02-29 10:31:43.475326 Asia/Ho_Chi_Minh (+07:00)
    $now = Carbon::now()->day; //15
    $now = Carbon::now()->month; //2
    $now = Carbon::now()->year; //2020
    $now = Carbon::now()->hour; //3
    $now = Carbon::now()->minute; //26
    $now = Carbon::now()->second; //49
    $now = Carbon::now()->dayOfWeek; //ngày thứ 6 trong tuần
    $now = Carbon::now()->dayOfYear; //ngày thứ 59 của năm
    $now = Carbon::now()->weekOfYear; //tuần thứ 9 trong năm
    $now = Carbon::now()->daysInMonth; //ngày thứ 29 của tháng
    ```

2. Format dữ liệu ngày tháng
     ```php
     $now = Carbon::now()->toFormattedDateString(); 
     $now = Carbon::now()->toDateString();               // 2018-10-18
     $now = Carbon::now()->toTimeString();               // 21:16:20
     $now = Carbon::now()->toDateTimeString();           
     ```
     
3. Thêm bớt ngày/tháng/năm/giờ/phút/giây
    ```php
    $time = Carbon::now()->addYears(x);
    $time = Carbon::now()->subYears(x);
    $time = Carbon::now()->addMonths(x);
    $time = Carbon::now()->subMonths(x);
    $time = Carbon::now()->addWeeks(x);
    $time = Carbon::now()->subWeeks(x);
    
    //với giờ/phút/giây thì cũng sử dụng add/sub tương tự như trên
    ```
    
4.  Kiểm tra điều kiện của một ngày
    ```php
    $boolean = Carbon::now()->isWeekday(); //false
    $boolean = Carbon::now()->isWeekend(); //true
    
    $date = Carbon::parse('2020-02-28 18:00');
    $boolean = $date->isYesterday(); //true
    $boolean = $date->isToday(); //false
    $boolean = $date->isTomorrow(); //false
    $boolean = $date->isFuture(); //false
    $boolean = $date->isPast(); //true
    ```
    
5. Dịch thứ ngày tháng theo ngôn ngữ

- Đây là chức năng mình mới được khai sáng và thấy nó khá là hay cho những trang web mà đối tượng người dùng đến từ nhiều quốc gia, vùng lãnh thổ khác nhau. Đó là format dữ liệu các thứ trong tuần, tên các tháng theo các ngôn ngữ khác nhau.

    ```php
    $date = Carbon::parse('2020-02-28 18:00');
    $date->locale(''); //chọn ngôn ngữ muốn format
    $dayName = $date->getTranslatedDayName('format-hien-thi'); //format hiển thị thứ là dddd/ddd (Mon/Tue/...)
    $monthName = $date->getTranslatedMonthName('format-ten-thang'); //format hiển thị tên tháng MMMM
    ```
    

6. Hiển thị thời gian "dễ hiểu" cho người dùng
- Xin lỗi vì cái title hơi khó hiểu, tại mình cũng ko biết phải gọi chứ năng này như thế nào nữa. Đại loại nó giống như chức năng hiển thị thời gian các bài đăng trên facebook ấy, nó sẽ hiển thị là hôm qua/hôm kia thay vì trả về format ngày bình thường (rõ ràng là "hôm qua" sẽ gợi nhớ tốt hơn là trả về ngày 27/02/2020 đúng không nào).
- Hãy nhớ là nó chỉ hiển thị trong phạm vi 1 tuần gần nhất thôi nhé, nếu như quá 7 ngày thì sẽ chỉ trả ra ngày bình thường thôi.

    ```php
    $date = Carbon::now();
    echo $date->calendar();                                      // Today at 6:00 PM
    echo $date->sub('1 day 3 hours')->calendar();                // Yesterday at 3:00 PM
    echo $date->sub('8 days')->calendar();                       // 20/02/2020
    ```


7. https://carbon.nesbot.com/docs/
- Phần 7 này sẽ bao gồm tất cả những gì mà Carbon có thể làm được, cần gì thì bạn hãy cứ tìm trong đây nhé. Trong phạm vi bài viết này mình chỉ có thể liệt kê một số chức năng mình thấy là thường xuyên sử dụng và thú vị thôi. 
- Cảm ơn các bạn đã đọc bài và hy vọng bài viết này sẽ giúp ích được cho các bạn!


<div align="center">

# Tài liệu tham khảo
</div>

- Trang chủ carbon: https://carbon.nesbot.com/docs/#api-introduction