Chào các bạn!

Như các bạn cũng đã biết, hầu hết các website hiện nay đều có sử dụng **datetimepicker**. Đây là 1 phần không thể thiếu. Từ việc setup lịch phỏng vấn, setup cuộc hẹn hay setup delivery,.. đều cần tới **calendar** hay nói chính xác theo từ chuyên ngành của chúng ta là sử dụng **datetimepicker**. Tuy nhiên, việc lựa chọn datetimepicker như thế nào cho phù hợp với yêu cầu của khách hàng sapo cho end-user sử dụng một cách tiện lợi nhất thì lại là một bài toán không dễ dàng. Vậy nên bài viết này của mình sẽ gợi ý cho các bạn một số thư viện **datetimepicker** đơn giản và dễ dàng sử dụng.

## 1. Mobiscroll

Thư viện này đã quá nổi tiếng với giao diện đẹp theo style iOS, đa dạng, có nhiều lựa chọn cho user. Thêm vào đó, thư viện còn hỗ trợ cả trên nền tảng AngularJS và ReactJs.

![](https://images.viblo.asia/b66556c1-1028-4e85-b92f-6f4c892e4dda.png)

Khai báo như sau:

```
mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light',
    display: 'bubble'
};

$(function () {

    var now = new Date();

    $('#demo-datetime').mobiscroll().datetime({
        dateWheels: '|D M d|',
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-datetime-expanded').mobiscroll().datetime({
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-datetime-date').mobiscroll().date({
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-datetime-time').mobiscroll().time({
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    $('#demo-datetime-non-form').mobiscroll().datetime({
        onInit: function (event, inst) {
            inst.setVal(now, true);
        }
    });

    var instance = $('#demo-datetime-external').mobiscroll().datetime({
        showOnTap: false,
        showOnFocus: false,
        onInit: function (event, inst) {
            inst.setVal(new Date(), true);
        }
    }).mobiscroll('getInst');

    $('#show-demo-datetime-external').click(function () {
        instance.show();
        return false;
    });

});
```

Link tham khảo https://demo.mobiscroll.com/jquery/datetime/date-time-picker#

## 2. Flatpickr

**flatpickr** là 1 thư viện datetimepicker khá nhẹ nhưng cũng rất mạnh.

![](https://images.viblo.asia/84523537-6e5d-4c7e-874c-8792ea692706.jpg)

Link tham khảo: https://flatpickr.js.org/

## 3. DateTime Picker

Đây là thư viện cho phép người dùng dễ dàng tùy biến nó. Với thiết kế đơn giản, gọn nhẹ vô cùng thích hợp cho các ứng dụng trên mobile.

![](https://images.viblo.asia/e2da781d-29ea-4915-988e-bfb981b31d43.jpg)

Link tham khảo: https://nehakadam.github.io/DateTimePicker/

## 4.  Tiny Date Picker

Đây cũng là 1 thư viện datetimepiker khá nhẹ và độc lập.

![](https://images.viblo.asia/1a3d037a-1815-4cf5-9a3b-af85c3efc139.jpg)

Link tham khảo: https://github.com/chrisdavies/tiny-date-picker

## 5. Continuous Calendar

Đây là 1 thư viện khá đặc biệt, cho phép user có thể lựa chọn ngày tháng bằng cách scoll để show các tháng khác trong năm thay vì phân trang như các thư viện khác.

![](https://images.viblo.asia/1c4e4324-62e1-470d-83bf-9beda6f4af06.jpg)

Link tham khảo: https://github.com/continuouscalendar/jquery-continuous-calendar

## 6. Date Range

Thư viện này cũng khá quen thuộc, cho phép người dùng lựa chọn 1 khoảng thời gian nhất định.

![](https://images.viblo.asia/6871b5e0-96f2-4096-ac74-1036a03241ab.jpg)

Link tham khảo: https://github.com/longbill/jquery-date-range-picker

## 7. DateTimePicker

Thư viện này dễ dàng cho phép người dùng lựa chọn ngày tháng, thời gian để thêm vào form của mình. Việc customize options cũng rất đơn giản.

![](https://images.viblo.asia/238e4748-19a2-4952-a235-4f1925876338.jpg)

Link tham khảo: https://xdsoft.net/jqplugins/datetimepicker/

## 8. Material-datetime-picker

Cái thư viện này cũng khá quen với các developer rồi. Giao diện đẹp, bắt mắt, dễ dàng sử dụng. Và có thể cài đặt plugin như một module trong ES6.

Ví dụ khai báo như sau:

```
import MaterialDateTimePicker from 'material-datetime-picker';

const picker = new MaterialDateTimePicker()
    .on('submit', (val) => console.log(`data: ${val}`))
    .on('open', () => console.log('opened'))
    .on('close', () => console.log('closed'));

document.querySelector('.c-datepicker-btn')
    .on('click', () => picker.open());   
```

![](https://images.viblo.asia/239472e3-f1d6-4195-92c4-a83c80696ee9.jpg)

Link tham khảo: https://ripjar.github.io/material-datetime-picker/

## 9. UI Calendar

Thư viện này đặc biệt sử dụng cho nền tảng AngularJS. Cho phép add các event vào calendar, vô cùng tiện lợi.

![](https://images.viblo.asia/6b608100-01a2-4459-b9f2-70d6cdff2048.jpg)

Link tham khảo: https://github.com/angular-ui/ui-calendar

## 10. React Infinite Calendar

Nếu như thư viện **UI Calendar** bên trên sử dụng cho riêng AngularJS thì thư viện này lại chuyên dùng cho ReactJS. Với cách thiết kế hiển thị các tháng trong năm nối liền nhau thay vì phân trang khá lạ mắt sẽ mang tới cho người dùng một trải ngiệm mới mẻ.

![](https://images.viblo.asia/623ebf34-bab9-4188-9bfe-b3d5e28b70ce.jpg)

Link tham khảo: https://github.com/clauderic/react-infinite-calendar

## 11. Monthly.js

Thư viện này có UI khá đơn giản nhưng nó vô cùng tiện lợi. Thư viện này cho phép người dùng add event vào calendar. Đây là chức năng vô cùng hay ho mà có thể khiến cho nhiều developer khá đau đầu đấy.

![](https://images.viblo.asia/ac03f3fb-2612-426f-a975-130c1e57d339.jpg)

Link tham khảo: https://github.com/kthornbloom/Monthly


Bài viết này của mình có lẽ giúp chút ít cho các bạn trong việc tìm kiếm cho mình datetimepiker library thích hợp nhất. Chúc các bạn may mắn!