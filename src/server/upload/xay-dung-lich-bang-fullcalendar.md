# GIỚI THIỆU
Gần đây mình vừa có cơ hội tìm hiểu về [FullCalendar](https://fullcalendar.io/). Nên hôm nay mình sẽ giới thiệu nó lại với mọi người, sau đó sẽ hướng dẫn xây dựng một ứng dụng hoàn chỉnh tương tác với  [FullCalendar](https://fullcalendar.io/).
# Google Calendar
Có lẻ tất mọi người đều không xa lạ gì với  [Google Calendar](https://calendar.google.com/calendar/). Đây là một ứng dụng web để quản lý thông tin liên lạc và quản lý thời gian được cung cấp bởi Google. Nó cho phép người dùng đồng bộ các địa chỉ liên lạc trong Gmail với một bộ lịch dựa trên web. Nó bắt đầu được đưa vào sử dụng vào ngày 13 tháng 4 năm 2006 và hiện nay đang trong giai đoạn beta. Trong khi người dùng không bị yêu cầu phải có một tài khoản Gmail, nhưng người dùng được yêu cầu phải có một tài khoản Google miễn phí để có thể sử dụng các phần mềm này.
# FullCalendar là gì
FullCalendar là một thư viện hỗ trợ rất tốt cho việc quản lý cũng như thiết lập lịch cho các sự kiện. Chúng ta có thể sử dụng **FullCalendar**  để xây dựng ra một ứng dụng có giao diện giống như [Google Calendar](https://calendar.google.com/calendar/) và dữ liệu không những được đồng bộ  từ [Google Calendar](https://calendar.google.com/calendar/) mà còn được lấy từ hệ thống chúng ta đang xây dựng.
# Triển khai
## Setting
Đầu tiên các bạn [vào đây](https://fullcalendar.io/download) để tải thư viện về, sau đó require vào dự án.
## Khởi tạo
Để khởi tạo lịch, chỉ cần gọi hàm fullCalendar() tại nơi bạn muốn hiển thị lịch 
```
$('#calendar').fullCalendar({
    // put your options and callbacks here
})
```

Có rất nhiều option khi khởi tạo lịch  các bạn có thể đọc thêm [tại đây](https://fullcalendar.io/docs). 

*Ví dụ:* Mình muốn các button today, prev, next nằm bên trái lịch thì sẽ như sau:

```
$('#calendar').fullCalendar({
  header: {
    left: 'today, prev, next',
    center: 'title',
    right: null
  }
})
```
## Thêm các sự kiện ngày nghỉ, ngày lễ
Các ngày nghỉ, ngày lễ sẽ được lấy từ [Google Calendar](https://calendar.google.com/calendar/). Vậy đầu tiên các bạn cần  vào [Google Developer Console](https://console.developers.google.com/)  tạo 1 ứng dụng **Google Calendar API**  để lấy **googleCalendarApiKey**. Chi tiết hướng dẫn các bạn có thể làm theo [tại đây](https://fullcalendar.io/docs/google-calendar).

Mình update lại hàm khởi tạo như sau:

```
$('#calendar').fullCalendar({
  header: {
    left: 'today, prev, next',
    center: 'title',
    right: null
  },
  googleCalendarApiKey: GOOGLE_CALENDAR_API_KEY,
  eventSources: [
    {
       url: 'https://www.google.com/calendar/feeds/vi.vietnamese#holiday@group.v.calendar.google.com/public/basic'
    }
 ]
})
```

*Lưu ý:* url ở trên là lịch ngày nghỉ, ngày lễ của việt nam, mỗi quốc gia sẻ có 1 url riêng để lấy lịch ngày nghỉ, ngày lễ. Ngoài ra các bạn có thể đồng bộ được những sự kiên cá nhân của tài khoản google đó vào hệ thống luôn.

## Thêm các sự kiện từ hệ thống
*Ví dụ:* Để lấy sự kiện từ hệ thống chúng ta cần các tham số sau:

1.  EVENTS_PATH sẽ là url để lấy các sự kiện của hệ thống.
2.  start_date, end_date là khoảng thời gian muốn lấy sự kiện.


```
eventSources: [
  {
     url: 'https://www.google.com/calendar/feeds/vi.vietnamese#holiday@group.v.calendar.google.com/public/basic'
  },
  {
    events: function(start, end, timezone, callback) {
      $.ajax({
        url: EVENTS_PATH,
        data: {
          start_date: start,
          end_date: end
        },
        success: function(events) {
          callback(events);
        }
      });
    }
]
```

*Lưu ý:* Để **FullCalendar** hiểu được danh sách event mình truyền vào, mình cần cấu trúc dữ liệu trả theo [Event Object](https://fullcalendar.io/docs/event-object) của **FullCalendar**. 

```
{
  title: 'Cuộc hẹn giữa A và B',
  start: '20/02/2019',
  className: 'your_class',
  url: 'url khi click vào sự kiện'
}
```
## Hiện Popup xem chi tiết sự kiện
Để hiện popup xem chi tiết sự kiện mình cần thêm 2 callback là [renderEvent](https://fullcalendar.io/docs/renderEvent) và [eventClick](https://fullcalendar.io/docs/eventClick).

```
eventRender: function (event, element) {
  element.popover({
    content: function() {
      return 'Lấy chi tiết sự kiên từ hệ thống';
    },
    html: 'true',
    placement: 'left',
    animation: 'true',
    container: ''
  });
  }
},
eventClick: function(calEvent, jsEvent, view) {
  // close các popup khác đang mở
}
```
### Kết luận
Trên đây mình vừa giới thiệu với các bạn về **FullCalendar**. Mình thấy bộ thư viện này rất hửu ích và có hướng dẫn rất chi tiết đây đủ để chúng ta dể dàng sử dụng.
![](https://images.viblo.asia/c6f1303d-3299-48f0-9945-b3e8b4c42321.png)
### Tham khảm
 [FullCalendar](https://fullcalendar.io/).