# Chuyển đổi hệ thống meshcode Nhật Bản với hệ thống kinh, vĩ độ quốc tế
Các công thức chuyển đổi phía dưới áp dụng đến meshcode tiêu chuẩn (meshcode cấp 3), bạn có thể tự tìm công thức cho các mesh nhỏ hơn hay các mesh tích hợp 

## Chuyển đổi độ, phút, giây ⇔ thập phân

Nếu vĩ độ và kinh độ thể hiện bằng độ, phút và giây, trước tiên bạn phải chuyển chúng sang giá trị thập phân.

Ví dụ:

Chuyển "139 độ 41 phút 30,3 giây"  (139˚41'30.3") thành số thập phân.

Giữ nguyên "độ", chia "phút" cho 60 và "giây" cho 3.600 rồi cộng chúng lại.
```
= 139 + (41 ÷ 60) + (30,3 ÷ 60 ÷ 60)
= 139,69174967
```

Nhân tiện, để chuyển đổi từ gía trị thập phân 139,69174967 sang thành độ, phút và giây
* Độ =  Lấy phần nguyên ⇒ 139
* Phút =  Lấy phần sau dấu thập phân, nhân với 60 và trích phần nguyên. 0,69174967 × 60 = 41,504976 ⇒ 41
* Giây = Lấy phần sau thập phân của phép toán tính phút và nhân với 60. 0,504976 x 60 = 30,29856

Kết hợp độ, phút và giây cho ra kết quả 139 độ 41 phút 30,29856 giây.

## Một số thông số của các cấp meshcode

### Meshcode cấp 1
* Khoảng cách vĩ độ giữa 2 meshcode cấp 1 liên tiếp theo hướng bắc-nam: 40' = 2/3˚= 0.6666666˚
* Khoảng cách kinh độ giữa 2 meshcode cấp 1 liên tiếp theo hướng đông-tây: 1˚
* Chiều dài xấp xỉ 1 cạnh của mesh cấp 1: 80km
* Số chữ số của meshcode: 4 chữ số 

### Meshcode cấp 2
* Khoảng cách vĩ độ giữa 2 meshcode cấp 2 liên tiếp theo hướng bắc-nam: 5' = 1/12˚= 0.0833333˚
* Khoảng cách kinh độ giữa 2 meshcode cấp 2 liên tiếp theo hướng đông-tây: 7'30" = 7.5'= 1/8˚ = 0.125˚
* Chiều dài xấp xỉ 1 cạnh của mesh cấp 1: 10km
* Số chữ số của meshcode: 6 chữ số 

### Meshcode cấp 3 (mesh tiêu chuẩn)
* Khoảng cách vĩ độ giữa 2 meshcode cấp 3 liên tiếp theo hướng bắc-nam: 30" = 1/120˚ = 0.0083333˚
* Khoảng cách kinh độ giữa 2 meshcode cấp 3 liên tiếp theo hướng đông-tây: 45" = 1/80˚ = 0.0125˚
* Chiều dài xấp xỉ 1 cạnh của mesh cấp 1: 1km
* Số chữ số của code: 8 chữ số 

## Tính toán meshcode từ kinh, vĩ độ 
Ví dụ bài toán thực tế là chuyển đổi toạ độ 35˚42'2.8"N　139˚42'53.1"E sang meshcode

* Đầu tiên chuyển đổi giá trị kinh, vĩ độ sang số thập phân
``` 
  Vĩ độ:  35˚42'2.8"N 
  = 35˚ + (42÷60)˚ + (2.8÷3600)˚ 
  = 35 + 0.7 + 0.0007777 = 35.7007777˚
  Kinh độ: 139˚42'53.1"E 
  = 139˚+ (42÷60)˚ + (53.1÷3600)˚ 
  = 139 + 0.7 + 0.01475 = 139.71475˚
```
* Bắt đầu tính toán các chữ số của mesh code
``` 
  2 chữ số đầu của meshcode cấp 1: 
    35.7007777˚×60'÷40'＝2142.04666'÷40＝53 dư 22.04666'
  2 chữ số sau của meshcode cấp 1: 
    139.71475˚-100˚＝39˚ dư 0.71475˚
  Chữ số đầu của phần meshcode cấp 2: 
    22.04666'÷5'＝4 còn dư 2.04666'
  Chữ số sau của phần meshcode cấp 2: 
    0.71475˚×60÷7˚30'＝42.885'÷7.5'＝5 dư 5.385'
  Chữ số đầu của phần meshcode cấp 3: 
    2.04666'×60"÷30"＝4 dư 2.7996"
  Chữ số sau của phần meshcode cấp 3: 
    5.385'×60"÷45"＝7 dư 8.1"
```
→ Mesh code tiêu chuẩn của tạo độ 35˚42'2.8"N　139˚42'53.1"E là  5339 45 47

## Tính toán kinh, vĩ độ điểm trung tâm của mesh từ meshcode

Ví dụ: tính toán kinh vĩ độ từ meshcode tiêu chuẩn 5339 45 47
* Từ thành phần meshcode cấp 1
```
Vĩ độ: 53÷60'×40' = 53×2/3˚= 106/3˚
Kinh độ: 39＋100˚ = 139˚
```
* Từ thành phần meshcode cấp 2
```
Vĩ độ: 106/3˚+(4×2/3)÷8 = 106/3˚+1/3˚= 107/3˚
Kinh độ: 139˚+5÷8˚= 139˚+5/8˚
```
* Từ thành phần meshcode cấp 3
```
Vĩ độ: 107/3˚＋(4×2/3)÷8÷10 = 107/3˚＋1/30˚ = 1071/30˚= 35.7˚
Kinh độ: 139˚＋5/8˚＋(7÷8÷10)˚= 139˚＋5/8˚＋7/80˚= (11120＋50＋7)/80 = 139.7125˚
```

→ Kết quả cuối cùng là 35.7˚N 139.7125˚E hay 35˚42'N 139˚42'45"E

※ Chú ý rằng đây chỉ là tọa độ của góc tây nam mesh tiêu chuẩn, nếu muốn lấy toạ độ điểm trung tâm của mesh tiêu chuẩn thì còn cần cộng thêm 1 nửa khoảng cách vĩ độ (1/120˚) cũng như 1 nửa khoảng cách kinh độ (0.0125˚) giữa 2 mesh tiêu chuẩn liên tiếp vào nữa. Như vậy kết quả tạo độ điểm trung tâm của mesh tiêu chuẩn có meshcode 5339 45 47 sẽ là
```
Vĩ độ: 35.7˚+ 1/120˚/2 = 35.7041666667˚
Kinh độ: 139.7125˚+ 0.0125˚/2 = 139.71875˚
```

## Kiểm tra kết quả online

Trên mạng hiện cũng có 1 số trang web giúp tính toán, chuyển đổi 2 chiều giữa toạ độ kinh, vĩ độ sang meshcode các level 1, 2 , 3 cũng như bài toán chuyển đổi ngược từ meshcode về toạ độ kinh, vĩ độ của điểm trung tâm mesh. Khu vực mesh biểu thị cũng được hiển thị trên bản đồ, từ đó có thể thấy được trực quan 1 khu vực nhất định nào đó của Nhật có meshcode bao nhiêu.

2 ví dụ chuyển đổi phía trên có thể kiểm chứng lại kết quả thông qua tool online: 
https://maps.multisoup.co.jp/exsample/mesh/mesh_search.html