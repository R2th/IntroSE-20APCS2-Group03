Lời nói đầu, hôm nay mình ngồi viết một Project Laravel sử dụng kèm với Vuejs2. Nhưng lâu ngày không code nên loay hoay mất cả buổi, đơn giản xoay quanh vụ ngày tháng. Vô tình tìm thấy một bài viết trên mạng, nên content vào đây để bạn nào gặp thì xem để tiết kiện thời gian.

One of the most often things to change in web-projects is adapting it to a certain geographical area – language and timezones are two examples. But also there’s a date format, which can be pretty different in certain parts of the world. How to handle it properly in Laravel?

## 1. Blade and jQuery: Form to Add Expenses
Ki bạn dùng Laravel để lưu dữ liệu vào CSDL thì kiểu dữ liệu DATE sẽ có format "yyyy-mm-dd", ví dụ như "1983-01-29". 

Nhưng trên phần frontend thường thì sẽ hiển thị như format: "mm/dd/yyyy", như "01/29/1983".

Đôi khi chúng ta có sử dụng một số thư viện ngoài để cho phép chọn ngày tháng như jQuery UI Datepicker:

```
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
    $( function() {
        $('.date').datepicker();        
    });
</script>
```
Những gì bạn thấy.

Để format lại dữ liệu hiển thị trên các input này bạn phải viết như bên dưới:

```
$('.date').datepicker({
    format: 'mm/dd/yy'
});
```
Để dễ dàng hơn ta có thể lưu dưới dạng một config tại config/app.php:

```
[
    // ...
    'date_format_js' => 'mm/dd/yy',
    // ...
]
```
Sử dụng trên blade template:
```
$('.date').datepicker({
    format: '{{ config('app.date_format_js') }}'
});
```
## 2. Saving the data
Khi bạn tiến hành submit form thì sẽ nhận được lỗi bên dưới.

> SQLSTATE[22007]: Invalid datetime format: 1292 Incorrect date value: '07/25/2018' 
> for column 'entry_date' at row 1

Hiển nhiên nó sẽ lỗi gì , MYSQL muốn lưu dữ liệu dưới dạng (native format) Y-m-d. Chúng ta phải tiến hành chuyển đổi trước khi lưu lại. Trên model app/Expense.php model:

```
public function setEntryDateAttribute($input)
{
    $this->attributes['entry_date'] = 
      Carbon::createFromFormat(config('app.date_format'), $input)->format('Y-m-d');
}
```
Tạo thêm một config cho config/app.php:

```
[
    // ...
    **'date_format' => 'm/d/Y',**
    'date_format_js' => 'mm/dd/yy',
    // ...
]
```
Chú ý: Chúng ta có 2 config dành cho PHP và JavaScript vì chúng có format khác biệt

Với cách này bạn có thể lưu trữ dữ liệu đúng chuẩn, như 2018-07-25.

## 3. Viewing/Editing the Date
Vậy để hiển thị ra trên giao diện chúng ta phải tiến hành làm ngược lại. Tiến hành tạo một hàng getEntryDateAttribute trên model để xuất ra dữ liệu đúng format để hiển thị trên giao diện.

```
public function getEntryDateAttribute($input)
{
    return Carbon::createFromFormat('Y-m-d', $input)
      ->format(config('app.date_format'));
}
```
Với những các trên bạn có thể dễ dàng thao tác với ngày tháng, hiểu các lưu trữ dữ liệu, xử lý trên frontend.

But you can go even a step further and save date formats for every user separately, if you need your users to see different formats from different parts of the world. The database will still store it in Y-m-d, you’re just playing around with visual presentation of that date.

Bài viết gốc:
> https://laraveldaily.com/how-to-change-date-format-in-laravel-and-jquery-ui-datepicker/