Vào một ngày không đẹp giời lắm, mình quyết định viết một bài hướng dẫn những ai dùng calendar muốn hiển thị holiday event được get từ google calendar.

FullCalendar có thể hiển thị những event từ Google Calendar (những event được công khai). Google Calendar có thể hỗ trợ như là backend để quản lý và duy trì lưu trữ event data (đây là tính năng FullCalendar thiếu).
> Vào ngày 17 tháng 11 năm 2014, Google đã tắt V1 và V2 API  của Calendar APIs, phiên bản mà FullCalendar đã dựa vào. Vì vậy bạn cần nâng cấp version mới nhất của FullCalendar hoặc ít nhất là ghi đè file [gcal.js](https://github.com/fullcalendar/fullcalendar/blob/v3.7.0/dist/gcal.js). Thêm đó, Google Calendar API key của chính bạn cũng là yêu cầu bắt buộc để nhận được dữ liệu từ Google Calendar.
# Before you code…
**Đầu tiên bạn cần có Google Calendar API Key:**
* Truy cập [Google Developer Console](https://console.developers.google.com/) và tạo một project mới.
* Sau đó, click **Library** trong siderbar **APIs & Services**,  tìm kiếm từ khóa `Google Calendar API`. Click **ENABLE** để enable Google Calendar API.
* Click vào **Credentials** trên siderbar **APIs & Services** để mở credentials menu.
* Trong tab **Credentials**, click **Create Credentials.**
* Chọn **API key** trong dropdown menu để gen ra API key
* API key sẽ được hiển thị. Lưu vào để sử dụng nào

**Đặt lịch Google Calendar của bạn ở chế độ công khai**
* Trong giao diện  Google Calendar, xác định vị trí “My calendars” ở khu vực bên trái màn hình.
* Di chuột qua lịch bạn cần và nhấp vào button 3 chấm.
* Pop-up menu sẽ xuất hiện. Click **Settings and sharing**.
* Tìm kiếm từ khóa  “Make available to public”. Đảm bảo option “See all event details” được chọn.
**Get Google Calendar’s ID:**
* Trong giao diện Google Calendar, xác định vị trí “My calendars” bên trái màn hình.
* Di chuột qua lịch bạn cần và nhấp vào button 3 chấm.
* Một menu sẽ xuất hiện. Click “Calendar settings”.
* Trong phần “Integrate calendar”, bạn sẽ thấy Clalendar ID của bạn. Nó sẽ trông giống như “abcd1234@group.calendar.google.com”.
# Dependencies
Tiếp đến, bạn phải có tất cả các tệp js/css cần thiết. Nó bao gồm  file fullcalendar.js và fullcalendar.css, cộng thêm vào gcal.js:
```
<script type='text/javascript' src='fullcalendar/gcal.js'></script>
```
# Writing the code
Xong xuôi rồi, giờ chúng ta có thể khởi tạo caendar của bạn bằng JavaScript. Đây là ví dụ đơn giản nhất.
```
<script type='text/javascript'>

    $(function() {
      $('#calendar').fullCalendar({
        googleCalendarApiKey: '<YOUR API KEY>',
        events: {
          googleCalendarId: 'abcd1234@group.calendar.google.com'
        }
      });
    });

</script>
```
Nếu bạn muốn để chỉ định một số option `Event Source`, bạn có thể include chúng vào trong `events` object:
```
<script type='text/javascript'>

    $(function() {
      $('#calendar').fullCalendar({
        googleCalendarApiKey: '<YOUR API KEY>',
        events: {
          googleCalendarId: 'abcd1234@group.calendar.google.com',
          className: 'gcal-event' // an option!
        }
      });
    });

</script>
```
Bạn có thể tham khảo [demo](https://fullcalendar.io/docs/google-calendar-demo) (hiển thị các ngày lễ của US từ Google Calendar)
# Timezones
[timezone](https://fullcalendar.io/docs/timezone) của FullCalendar sẽ được ưu tiên sử dụng. Nếu giá trị này là `false` (giá trị default) thì timezone sẽ check theo Google Calendar, timezone của của Google Calendar được định nghĩa trong Google’s UI.
# Multiple Google Calendars
Bạn có thể chỉ định nhiều Google Calendars khi sử dụng `eventSources` option:
```
<script type='text/javascript'>

    $(function() {
      $('#calendar').fullCalendar({
        googleCalendarApiKey: '<YOUR API KEY>',
        eventSources: [
          {
            googleCalendarId: 'abcd1234@group.calendar.google.com'
          },
          {
            googleCalendarId: 'efgh5678@group.calendar.google.com',
            className: 'nice-event'
          }
        ]
      });
    });

</script>
```
# Advanced: Extended Properties
Google Calendar’s API  cho phép bạn chỉ định thuộc tính mở rộng [Extended Properties](https://developers.google.com/calendar/extended-properties) cho event cuar bạn. Những thuộc tính mở rộng này sẽ có sẵn dưới dạng extendedProperties hash được đính kèm vs mỗi [Event Object](https://fullcalendar.io/docs/event-object).
# Advanced: API Keys
Nếu bạn cần nhiều API key khác nhau trên mỗi calendar, bạn có thể đặt `googleCalendarApiKey` option trên mỗi [Event Source](https://fullcalendar.io/docs/event-source-object) khi viết ở dạng mở rộng.
# Advanced: Error Handling
Nếu bạn cần detect lỗi với Google API, thì không có cách nào để khắc phục điều này với trình xử lý lỗi jQuery’s AJAX . Bạn cần phải sử dụng FullCalendar googleCalendarError callback, có sẵn dưới dạng tùy chọn thông thường hoặc mỗi tùy chọn[ Event Source](https://fullcalendar.io/docs/event-source-object).
#  Tài liệu tham khảo
https://fullcalendar.io/docs/google-calendar