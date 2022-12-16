## Giới thiệu
Chẳng ai lạ gì với tab, modal, slider... trong web, và chắc mọi người cũng đều biết rằng chúng được viết bằng js. Vậy liệu có thể làm chỉ = css hay không, câu trả lời là có, tuy nhiên khá phức tạp, nhất là slider. Bài này mình hướng dẫn làm cái đơn giản là tab trước, lần tới sẽ làm slider nếu có ai cần :D

## Lý thuyết
{@embed: https://codepen.io/dfly24s/pen/bGVzdYM}

Tạm thời chưa nhìn code, hãy nhìn qua cái tab đã.
Khi ấn vào tab 1 thì content của tab1 hiện ra, content tab2 thì ẩn, và ngược lại. Vậy là mình cần ấn vào tab mà làm sao để css đến được content của tab. Css thì không có event như js nhưng may là nó có bộ đôi input-label
```
<input id="01" type="checkbox" />
<label for="01>Hihi</label>
```
Khi set label có att for trùng với id của input checkbox hoặc radio, bạn có thể click label để set checked hoặc uncheck cho input tương ứng. Vậy là ta đã có ý tưởng về việc click vào label, làm input nào đó checked hoặc uncheck, và dựa vào đó để css cho ẩn hiện được tabcontent.
Tuy nhiên css thì chỉ css từ element này tới element kế cận chứ ko selector tuỳ ý như js được, nên phải đặt vị trí của input khéo léo chút.
Vì là tab nên ta có thể dùng input radio, ấn vào label này thì input tương ứng checked, input còn lại tự động uncheck, ngon quá rồi.
Giờ thì mn có thể xem code, chắc ko có gì cần giải thích thêm vì cái này là ví dụ đơn giản, làm slider mới phức tạp. Chỉ có lưu ý đây là scss, viết cho gọn :D

## Kết luận
Từ ví dụ này các bạn hãy thử làm modal, slider, hay bất cứ thứ gì các bạn vẫn hay dùng js để làm thì thử nghĩ xem có làm = css được không, tuy nó chắc chắn sẽ dài dòng phức tạp nhưng thi thoảng nó cũng có ích trong dự án thực tế chứ không phải chỉ biết cho vui. Chúc mn thành công! :+1: