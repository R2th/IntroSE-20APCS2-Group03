Hello các bạn ! Hôm nay mình lại biên một bài tut nhỏ chia sẻ một mẹo, rất hữu dụng đối với cá nhân mình vì vừa giúp mình giải quyết một problem trong task như sau:
Task yêu cầu:
> - Chọn ngày -> Dựa theo giá trị ngày đó fetch API để lấy thông tin
Okay, nghe qua rất đơn giản, nghĩa là chúng ta sẽ chỉ việc bắt sự kiện chọn ngày, sau đó set lại state là ok
------
Nhưng bắt tay vào làm thì đời không như mơ, cũng giống như bạn gái trên mạng vậy, ngoài đời khác lắm :D

![](https://images.viblo.asia/c8eb1ebc-33a4-45c0-95c2-50c694d5b83c.PNG)

Vùng màu đỏ là mình dùng widget [HorizontalCalendar](https://pub.dev/packages/horizontal_calendar_widget) của một người anh em khác, khá hữu ích, đỡ mất thời gian viết lại toàn bộ, mình chỉ inject một số private code riêng vào để custom lại phần ngôn ngữ hiển thị thôi

Vùng màu xanh mình dùng [GroupedList](https://pub.dev/packages/grouped_list/example) của một người anh em khác, có sẵn ngại gì ko dùng, các bạn đừng chê mình toàn xài thư viện nhé, tại mình là thợ code, không phải kỹ sư code nên ngại viết lại những cái đã có lắm, vì bản thân mình ko tự tin là mình viết tốt hơn người ta, trừ khi xài của người ta mà ko vừa ý mới phải custom lại.

Rồi, bây giờ cái vấn đề nó nằm ở đây:
Ông bạn HorizontalCalendar có cung cấp cho mình 1 event là "onDateSelected" để fire cái sự kiện chọn date từ lịch của ổng, và khi chọn thì màu mè hiện lên như trong ảnh rất chi là này nọ, mình thích ! 
Vậy là mình viết ngay đoạn code thần kỳ vào

```
 onDateSelected: (date) {
                            setState((){
                             selectedDate = date;
                            print(selectedDate);
                            })
                          }
```
Đoạn code trên sẽ set lại giá trị cho biến "selectedDate", đồng thời GroupedList nằm trong FutureBuilder nên nó sẽ tự reload lại content, nhưng vấn đề đã xảy ra, vì setState đã set lại hết tất cả Widget nên đồng nghĩa là HorizontalCalendar cũng bị reload, tức là nếu bạn chọn cái ngày ở cuối cùng bên phải, sau khi chọn xong giá trị thì thay đổi nhưng selected date (cái màu đỏ hiển thị lên - ngày 15 ý) nó vẫn cứng ngắc ở đó, mặc dù content đã thay đổi.

Vậy, để giải quyết vấn đề này, tức là mình sẽ không cho phép HorizontalCalendar được phép reload khi setState được gọi ! Để làm điều đó, mình sẽ fixed cứng cái key của nó như sau
```
  return HorizontalCalendar(
                          key: Key('Calendar'),
```
Okay, việc này sẽ giải quyết vấn đề trên, setState được gọi sau khi bạn chọn ngày -> Content dữ liệu được load -> Trông ổn nhỉ

Nhưng sang test case 2, failed tốt ngay !
![](https://images.viblo.asia/271e86ff-0b44-4b66-b93b-f6363869907d.PNG)

Test case 2 sẽ là: Chọn lịch (vì mình ko muốn xem tháng này nữa, muốn xem tháng khác) -> Chọn ngày khác trong lịch (mục đích để HorizontalCalendar load lại các ngày dựa theo ngày mình đã chọn).
Tức là: Ví dụ mình chọn ngày 11/11/2020, thì HorizontalCalendar phải load cho mình từ ngày 11 tới ngày 30 (cuối tháng), cứ bất kể mình chọn ngày nào, nó phải load cho mình từ ngày đó tới cuối tháng, vì mình là sếp nó mà hehehe !
**Failed ở chỗ này, vì Key là fixed, tức là nó ko bị render lại, nên nó vẫn chứa những ngày cũ lúc init app thôi**

Vậy, trước tiên trả lại key cho anh HorizontalCalendar đã
```
  return HorizontalCalendar(
                          key: UniqueKey(),
```

Sau đó, lúc này mình suy nghĩ, cách fix bug của mình thường là rất bình dân, ko có gì gọi là phức tạp cả, mình diễn giải bug theo cách hiểu và tìm giải pháp
Bugs này được fixed khi : Chọn ngày -> hiển thị ok ko mất decoration -> Chọn ngày trong lịch -> Vẫn hiển thị list ngày ok ko mất decoration
Tức là:
-mình sẽ làm sao đó mà HorizontalCalendar phải được reload lại để cập nhật lại ngày mình chọn từ lịch
-Nhưng khi chọn ngày trong HorizontalCalendar, không được gọi setState mà phải đảm bảo GroupedList được reload theo giá trị đã chọn
-Đảm bảo không bị mất selection decoration -> Tức là ko gọi setState khi chọn lịch thôi
Okay ! Để giải quyết vấn đề trên, mình đã tìm tới giải pháp "StatefulBuilder", nhưng thằng này ko giúp được mình trong case này, vì nó xử lý là state nội bộ của nó, mình là mình ko cần set lại state :(

Vậy là mình làm quen với anh chàng ValueNotifier, tức là khi value thay đổi thì ta báo tới widget đang listen value đó, và widget tự động reload

Khai báo nó, vì value thay đổi của mình là "datetime" nên mình khai báo kiểu DateTime
`  ValueNotifier<DateTime> _selectDateChange = ValueNotifier(DateTime.now());`
Wrap cái **GroupedList** nằm trong  **ValueListenableBuilder**  với giá trị listen là ValueNotifier ta vừa khai báo

```
 ValueListenableBuilder(
                            valueListenable: _selectDateChange,
                            builder: (context, error, child) {
                              return GroupedList(
```

Rồi, bây giờ trong onDateChange ta chỉ việc truyền value đã thay đổi vào cho ValueNotifier
```
 onDateSelected: (date) {
                          
                            selectedDate = date;
                            _selectDateChange.value = selectedDate; // truyền giá trị cho value notifier
                          },
```

Okay ! Mọi thứ đã được giải quyết, êm đẹp ngay
![](https://i.ibb.co/D40r3qC/Capture.png)

## Tóm tắt

ValueNotifier sẽ giúp bạn giải quyết được vấn đề là bạn muốn 2 widgets nào đó liên quan tới nhau được reload lại dữ liệu mà không dùng đến setState, ví dụ như trường hợp của mình là Chọn ngày -> Hiển thị dữ liệu theo ngày)

Bạn nào có cách hay hơn có thể chia sẻ anh em cùng lên trình, lên lương nha ^^