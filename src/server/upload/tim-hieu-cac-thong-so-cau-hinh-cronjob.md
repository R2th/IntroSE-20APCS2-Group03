Vừa rồi, tớ có task phải làm 1 con scheduler xoá dữ liệu rác, 1 tháng chạy 1 lần. Trước giờ tớ chạy cronjob bằng công cụ hỗ trợ của server, có UI nên cũng không cần quan tâm cơ chế nó cấu hình như nào, cứ táng đúng ngày-tháng-năm giờ-phút-giây vào đúng ô, click OK là nó tự generate ra cấu hình.

Tuy nhiên lần này tớ phải động tới cấu hình cho cronjob. Tiện tìm hiểu nó nên note lại 1 bài :))

# Cấu trúc cấu hình cronjob
Cronjob thường có dạng

```
cron = "X X X X X" (5 kí tự)
```

hay

```
cron = "X X X X X X" (6 kí tự)
```

Đối với 5 kí tự thì đó là:

```
<phút> <giờ> <ngày trong tháng> <tháng> <ngày trong tuần>
```

Còn với 6 kí tự thì thêm giây nữa:

```
<giây> <phút> <giờ> <ngày> <tháng> <ngày trong tuần>
```

Các kí tự X được thay thế bởi một trong các kí tự sau:

```
* : bất kì giá trị nào
, : danh sách các giá trị
- : khoảng giá trị
/ : theo bước nhảy
0-59: đối với các giá trị giây, phút
0-23: đối với giá trị giờ
1-31: đối với giá trị ngày
1-12: đối với giá trị tháng
JAN-DEC: đối với giá trị tháng
0-6: đối với ngày trong tuần
SUN-SAT: đối với ngày trong tuần

```

Đầu tiên đọc lướt qua đống này, tớ chợt nghĩ: dễ vkl. Giờ muốn test cho nó chạy 2s 1 lần để test cái scheduler thì táng config

```
cron = "2 * * * * *"
```

có mẹ gì khó đâu :v. Tuy nhiên thì khi chạy test thì sai cmnr. Nó chạy 1 phút 1 lần. Đó là **giây thứ 2 của mỗi phút**, không phải mỗi 2s 1 lần. Như vậy, config của cron chính xác phải là:

```
<giây trong phút> <phút trong giờ> <giờ trong ngày> <ngày trong tháng> <tháng trong năm> <ngày trong tuần>
```

# Config 2s 1 lần kiểu gì?
Cùng nhìn vào đống kí tự có thể thay thế của X, ta có thể cấu hình chạy 2s 1 lần bằng các cách sau:

## Sử dụng “,”
Dấu “,” đại diện cho danh sách các giá trị. Nghĩa là bạn muốn chạy 2s 1 lần thì bạn liệt kê các giá trị giây cách nhau 2s xuất hiện trong một phút.

```
cron= "0,2,4,6,8,10,12,14,16,18,20....58 * * * * *"
```

Cách này khá là thủ công, chỉ nên dùng khi bạn sử dụng để cấu hình cho 1 vài giá trị đặc biệt, không có quy luật.

## Sử dụng “-“
Dấu “-” đại diện cho khoảng giá trị. Ví dụ bạn muốn chạy vào các giây 1,2,3,4,5,6 thì bạn có thể dùng “-” cho ngắn gọn hơn, thay vì “,”. Đó là:

```
cron="1-6 * * * * *"
```
Tất nhiên là config này không sử dụng được cho 2s 1 lần. Tiện thì tớ giới thiệu luôn :))

## Sử dụng “/”
Dấu “/” đại diện cho bước nhảy của giá trị, tính từ 0. Giả sử với kí tự ở vị trí của giây, tớ config:

```
*/1 => bước nhảy 1, tính từ 0: 0,1,2,3,4,...,59

*/2 => bước nhảy 2, tính từ 0: 0,2,4,6,8,...,58

*/5 => bước nhảy 5, tính từ 0: 0,5,10,15,...,55
```

Ngoài ra có thể thay dấu `*` là các vị trí bắt đầu của bước nhảy. Ví dụ

```
5/1 => bước nhảy 1, tính từ 5: 5,6,7,8,...59

5/8 => bước nhảy 8, tính từ 5: 5,13,21,29

13/4 => bước nhảy 4, tính từ giây thứ 13

blah,blah....
```

Tuy nhiên đây là “non-standard config”, tức là không phải config tiêu chuẩn nên có thể sẽ không hoạt động trên một số hệ thống cronjob.

Như vậy để config 2s/lần thì config “dư lày”:

```
cron="*/2 * * * * *"
```

# Tạo cronjob online
Có một số trang web cho phép bạn tạo cronjob online, có cả giải thích luôn. Rất dễ hiểu.
Tớ hay dùng hai trang sau:
1. https://crontab.guru/
2. http://www.cronmaker.com/


Nếu trong bài có gì sai sót hoặc chưa tối ưu, bạn hãy comment cho tớ biết nhé ^^
Thanks for reading ^^

Nguồn bài viết từ blog của tớ: https://minhphong306.wordpress.com/2018/09/03/tutorial-tim-hieu-cac-thong-so-cau-hinh-cronjob/