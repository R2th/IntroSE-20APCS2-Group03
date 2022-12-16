FullCalendar là một thư viện javascript quản lý hiển thị chuỗi sự kiện bằng dưới định dạng calendar.
# Install
Có thể cài đặt thông qua npm và bower
```
    // via NPM
    $ npm install fullcalendar
    // via Bower
    $ bower install fullcalendar
```
Hoặc dùng luôn CDNJS
```
    https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js
    https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css
    https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.print.css
```
Gọi đến thư viện
```
    <link rel='stylesheet' href='fullcalendar/fullcalendar.css' />
    <script src='lib/jquery.min.js'></script>
    <script src='lib/moment.min.js'></script>
    <script src='fullcalendar/fullcalendar.js'></script>
```
Import 
```
    import $ from 'jquery';
    import 'fullcalendar';
```
# Initializing

Một khi bạn có FullCalendar và nó đã được load trên page, bạn có thể viết js code để khởi tạo một calendar. Code này phải được thực thi sau khi page đã được khởi tạo. Cách tốt nhất để làm điều đó là sử dụng $(document).ready
```
$(function() {

  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
  })

});
```
Ở bên html bạn cần có một vị trí để hiển thị list calendar

```
<div id='calendar'></div>
```
# Overall Display
* **header**

    Định nghĩa button và title hiển ở top của calendar

    Kiểu giá trị: object/false, giá trị default là:

    ```
    {
      left:   'title',
      center: '',
      right:  'today prev,next'
    }
    ```
    Nếu bạn thấy định nghĩa `header:false` trong js tức là calendar này sẽ không hiển thị phần header. 

    `header` có các property sau:

     `title`:  text chứa tháng/tuần/ngày hiện tại được view

     `prev`: button để back về 1 tháng/tuần/ngày trước đó

     `next`: button để next đến 1 tháng/tuần/ngày kế đó

     `prevYear`: button để back về 1 năm trước đó

     `nextYear`: button để next đến 1 năm kế đó

     `today`: button để move calendar đến tháng/tuần/ngày hiện tại

      `<view name>`: button để chuyển đổi đến một số kiểu view avaiable

* **header**

    Xác định format text thời gian sẽ hiển thị ở header title

    Kiểu giá trị format: string, dưới đây là những giá trị default

    ```
        'MMMM YYYY''    // like 'September 2009', for month view
        'MMM D YYYY'  // like 'Sep 13 2009', for week views
        'MMMM D YYYY' // like 'September 8 2009', for day views
    ```
# Views
* **defaultView**

    Khởi tạo kiểu hiển thị calendar load
    
    Kiểu giá trị: string.\
    List giá trị view được chấp nhận:
    `month, agendaWeek, listWeek, basicWeek, timelineDay, agendaDay`
    
    Giá trị default là 'month'
```
    $('#calendar').fullCalendar({
          defaultView: 'month'
    })
```
# Date & Time
* **defaultDate**

    Giá trị khởi tạo được hiển thị khi  calendar đầu tiên load.
    
    Kiểu giá trị: Moment.
    
    Khi giá trị của trường này không được khởi tạo thì giá trị mặc định của nó là ngày hiện tại
Giá trị của nó phải được Moment chấp nhận. Có thể bao gồm định dạng ISO8601 date string ví dụ "2018-12-19".
    ```
        $('#calendar').fullCalendar({
              defaultDate: '2018-12-19'
        })
    ```
* **validRange** 

     Giới hạn ngày hiển thị trong calendar .
     
     Kiểu giá trị: object
     
     validRange có 2 thuộc tính là start và end
    ```
        $('#calendar1').fullCalendar({
              defaultView: 'month',
              validRange: {
                    start: '2018-12-01',
                    end: '2018-12-19'
              }
        });
    ```
    
* **navLinks** 
    Định nghĩa nếu link day hoặc link week được click. 

    Kiểu giá trị: boolean. Giá trị defalut: false

    Khi giá trị là true thì việc click sẽ dẫn tới event của ngày đó hoặc tuần đó. 

    Khi giá trị là true thì click link sẽ không thực hiện gì

**Methods**
* **prev**

    Chuyển calendar về step trước đó (tùy thuộc vào view)
    ```    
        .fullCalendar( ‘prev’ )
    ```
    Nếu view calendar là month, calendar sẽ chuyển về calendar của tháng trước đó.

    Nếu view calendar là basicWeek hay agendaWeek, calendar sẽ chuyển về tuần trước đó.

    Nếu view calendar là basicDay hay agendaDay, calendar sẽ chuyển trở về trước đó một ngày.
* **next**

    Chuyển calendar về step next (tùy thuộc vào view)
    ```    
        .fullCalendar( ‘next’ )
    ```

    Nếu view calendar là month, calendar sẽ chuyển đến calendar của tháng tiếp đó.

    Nếu view calendar là basicWeek hay agendaWeek, calendar sẽ chuyển đến tuần tiếp đó.

    Nếu view calendar là basicDay hay agendaDay, calendar sẽ chuyển đến một ngày tiếp đó.
* **today**

    Chuyển calendar đến calendar có ngày hiện tại 
    ```    
        .fullCalendar( ‘today’ )
    ```
* **gotoDate**

    Chuyển calendar đến calendar có ngày được chỉ định
    ```    
        .fullCalendar( ‘gotoDate’,  date)
    ```
    date (kiểu dữ liệu giống phần defaultDate đã đề cập)
# Events
- **events (as an array)**

    Một mảng các event sẽ được hiển thị trong calendar
    ```
    $('#calendar').fullCalendar({
      events: [
        {
          title  : 'event1',
          start  : '2010-01-01'
        },
        {
          title  : 'event2',
          start  : '2010-01-05',
          end    : '2010-01-07'
        },
        {
          title  : 'event3',
          start  : '2010-01-09T12:30:00',
          allDay : false // will make the time show
        }
      ]
    });
    ```

* **events (as a json feed)**

    Call url của nguồn cấp dữ liệu JSON là một cách fetch data cho event object. 
    ```
    $('#calendar').fullCalendar({
      events: '/get_data.php'
    });
    ```

    Action này sẽ được thực thi khi người dùng click vào prev/next hay change calendar view. Calendar sẽ xác định khoảng thời gian hiển thị và sẽ add các thông tin này vào các tham số trên url tương ứng với `start`, `end`.
    Ví dụ:
    ```
    /get_data.php?start=2013-12-01&end=2014-01-12&_=1386054751381
    ```
    `_` paramter được tự động thêm vào để chặn việc trình duyệt lưu cache
    
*   **events (as a function)**
    function để call dữ liệu cho event object.
    
    Giá trị đầu vào:
    
    `function( start, end, timezone, callback ) { }`
    
    Ví dụ:
    ```
    $('#calendar').fullCalendar({
      events: function(start, end, timezone, callback) {
        $.ajax({
          url: 'myxmlfeed.php',
          dataType: 'xml',
          data: {
            // our hypothetical feed requires UNIX timestamps
            start: start.unix(),
            end: end.unix()
          },
          success: function(doc) {
            var events = [];
            $(doc).find('event').each(function() {
              events.push({
                title: $(this).attr('title'),
                start: $(this).attr('start') // will be parsed
              });
            });
            callback(events);
          }
        });
      }
    });
    ```
    
#     Lời chào
Đợt này bận rộn quá nên mình chỉ tìm hiểu được từng này đế chia sẻ với các bạn. Mong bà con đừng gạch đá.

Tài liệu tham khảo: https://fullcalendar.io/docs