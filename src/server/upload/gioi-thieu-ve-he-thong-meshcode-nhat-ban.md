# Hệ thống lưới khu vực tiêu chuẩn

Có một cơ chế để chia toàn bộ Nhật Bản thành các phần giống như lưới (mesh) và gán một mã duy nhất (meshcode) cho mỗi phần để phân biệt chúng.
Ban đầu nó được tạo ra để sử dụng như một đơn vị dữ liệu thống kê mục đích sử dụng đất đai.
Lưới vùng tham chiếu được tính theo 3 bước.

## Mesh cấp 1

Mesh cấp 1 được  biểu thị bằng mã 4 chữ số. Hai chữ số đầu tiên được tính từ vĩ độ và hai chữ số còn lại được tính từ kinh độ.

* 2 chữ số đầu tiên tính từ vĩ độ: vĩ độ bắc x 1,5 (làm tròn xuống số nguyên gần nhất)
* 2 chữ số còn lại tính từ kinh độ: kinh độ đông - 100 (làm tròn đến số nguyên gần nhất)

 Có thể hình dung qua bức ảnh dưới đây
 
 ![Mesh cấp 1](https://tech.atware.co.jp/content/images/2016/10/mesh.png)

* Cực nam: đảo Okinotori → 3036
* Cực bắc:  đảo Iturup → 6848
* Cực tây: đảo Yanoguni → 3622
* Cực đông:  đảo Minamitori  → 3653

Phạm của nước Nhật nằm trong khoảng  3022~6853 

Lý do nhân vĩ độ bắc với 1.5 là do độ dài vỹ tuyến ở vĩ độ trung bình nơi Nhật Bản tọa lạc (khoảng 40 độ) , nhỏ hơn so với dài kinh tuyến, thông qua phương pháp đơn giản này tiếp cận trong một cách tương đối đơn giản. (và vẫn đảm bảo con số sau khi nhân luôn nằm trong phạm vi 2 chữ số)
Với cách tính này, chiều rộng vào chiều cao của 1 mắt lưới (mesh) sẽ xấp xỉ nhau
Từ phương pháp tính meshcode như trên, có thể thấy phương pháp này có tính chuyên biệt hoá để biểu thị vùng đất đai của Nhật Bản, không thể sử dụng ở nước khác.

※ Nhật Bản nằm trong khoảng 20~46 độ Bắc, 122~154 độ đông

## Mesh cấp 2

Mesh cấp 2 được phân chia từ mesh cấp 1 theo mỗi chiều đông-tây, bắc-nam 8 phần bằng nhau thành 64 phần nhỏ. Như thể hiện trong hình bên dưới, bắt đầu từ góc tây nam, hai chữ số có giá trị từ 00 đến 77 (mỗi chữ số được bắt đầu từ 0 theo hướng vĩ độ / kinh độ),  được gắn tiếp tục sau mesh cấp 1 tạo thành chuỗi tổng cộng có 6 chữ số.

![Mesh cấp 2](https://tech.atware.co.jp/content/images/2016/10/mesh-2.png)

Mesh cấp 1 là có dạng xấp xỉ hình vuông cạnh 80km, mesh cấp 2 dạng xấp xỉ hình vuông cạnh  10km.

Ví dụ:  meshcode cấp 2 của  Tòa nhà Trung tâm Minato Mirai  "5339-15". 
Ngoài toàn bộ quận Minatomirai, hầu hết phường Naka thành phố Yokohama, nửa phía đông của Phường Kanagawa, khu vực ven biển của phường Tsurumi và phường Kawasaki đều nằm trong cùng một mạng lưới (mesh). Dấu gạch nối trong mã được đưa vào để nhìn cho rõ ràng, nhưng giống như ISBN, thường thì nó không được ghi khi sử dụng dưới dạng dữ liệu.

## Mesh cấp 3 (mesh tiêu chuẩn)
Mesh cấp 3 được tính bằng cách tiếp tục chia nhỏ từ mesh cấp 2 theo mỗi chiều đông-tây, nam-bắc 10 lần. 2 chữ số có gía trị từ 00~99 tiếp tục được gắn thêm vào meshcode cấp 2.

![Mesh cấp 3](https://tech.atware.co.jp/content/images/2016/10/mesh-3.png)

Như vậy tổng cộng meshcode cấp 3 có 8 ký tự. Mỗi mess đại diện cho 1 khu vực xấp xỉ hình vuông cạnh 1 km. Mesh cấp 3 cũng thường được gọi với cái tên mesh tiêu chuẩn.

Ví dụ: mesh tiêu chuẩn tòa nhà trung tâm Minato Mirai  là "5339-15-40". Chữ số 0 chỉ ra rằng nó thuộc về phần cực tây của mesh cấp 2 "5339-15".  Khu vực từ khách sạn Intercontinental ở phía đông bắc đến khu vực xung quanh đền Iseyama Kotai cũng thuộc mesh này.

Có thể dễ dàng quan sát thông qua bản đồ tại trang web dưới 
http://minorua.github.io/gmaps/mesh/#5339-15-40

## Mesh khu vực: mesh 1/2, mesh 1/4, mesh 1/8 

Từ mesh tiêu chuẩn tiếp tục chia mỗi chiều đông-tây, nam-bắc làm 2 phần bằng nhau ra tổng cộng 4 phần nhỏ, biểu hiện bằng 1 chữ số như hình dưới rồi thêm vào meshcode tiêu chuẩn ta sẽ được meshcode 1/2. Code này có 9 chữ số

![Mesh 1/2](https://tech.atware.co.jp/content/images/2016/10/mesh-4.png)

Nếu như thay vào đó thể hiện bằng dải 0~3 (tương đương với 00~11 tính theo hệ cơ số 2) thì sẽ tốt hơn (thuận tiện cho việc tính toán hơn) nhưng hơi tiếc hiện tại chữ số cuối này lại vẫn đang được thể hiện bởi giá trị trong dải 1~4.

Tương tự với cách chia như trên, nếu tiếp tục chia nhỏ mesh 1/2 làm 4 phần ta có meshcode 1/4 (10 chữ số),  tiếp tục chia nhỏ làm 4 phần nữa được meshcode 1/8 (11 chữ số). Khu vực đại diên cho các mesh 1/2, 1/4, 1/8 lần lượt là khu vực xấp xỉ hình vuông cạnh 500m, 250m, 125m.

Ví dụ: meshcode 1/8  tòa nhà trung tâm Minato Mirai là khoảng "5339-15-40-4-3-4". Có thể lấn sang 1 chút  "5339-15-40-4-3-3", đặc biệt là có văn phòng  công ty Atware nằm ở góc phía tây (4 là đông bắc, 3 là tây bắc).

## Mesh tích hợp : mesh 2x, mesh 5x, mesh 10x

Nhìn từ mesh tiêu chuẩn, lần này chúng ra xem xét các mesh lớn hơn 1 chút. Mặc dù nói là vậy nhưng thực tế thì các mesh này không phải được tính toán từ mesh tiêu chuẩn mà là phân chia nhỏ từ mesh cấp 2 nhưng với 1 size khác. Nếu chia nhỏ mesh cấp 2 mỗi chiều đông-tây, nam-bắc 10 lần thì được mesh cấp 3 (mesh tiêu chuẩn), vậy thì thay vào đó chia mỗi chiều 2 lần sẽ ra mesh 5x, chia 5 lần sẽ ra mesh 2x, còn mesh 10x thực chất chính là mesh cấp 2.

Mesh 2x rất rắc rối. Sau khi chia mesh mỗi chiều thành 10 phần, nếu ra số lẻ thì phải trừ đi 1 để ra số chẵn (xem hình dưới)

![Mesh2x](https://tech.atware.co.jp/content/images/2016/10/mesh-5.png)

Hơn nữa với phương pháp tính này thì meshcode sẽ bị trùng lặp với meshcode tiêu chuẩn (meshcode tiêu chuẩn cũng sẽ có những case mà 2 chữ số cuối chẵn, khi đó sẽ không phân biệt được meshcode đó là meshcode tiêu chuẩn hay meshcode 2x). Vì thế nên người ta thêm cố định chữ số 5 vào cuối nữa. Như thế meshcode 2x tổng cộng có 6+2+1=9 chữ số. Số chữ số giống với meshcode 1/2 nhưng chữ số thứ 9 của meshcode 1/2 chỉ có thể trong dải 1~4 nên có thể phân biệt được.  Như vậy mesh 2x tuy diện tích to hơn mesh tiêu chuẩn nhưng meshcode lại tốn nhiều chữ số hơn.

Mesh 5x được chia từ mesh cấp 2 mỗi chiều thành 2 phần,  lấy chữ số từ tương ứng từ 1~4 (tương tự cách tính meshcode 1/2) thêm vào meshcode cấp 2 để ra meshcode 7 chữ số. Khu vực đại diện xấp xỉ hình vuông cạnh 5km.

Mesh 10x coi như không cần bàn, chính là mesh cấp 2.

## Mesh siêu nhỏ
Đây là các mesh phái sinh, không trực tiếp thuộc hệ thống mesh tiêu chuẩn.  Ví dụ như mesh được đưa ra bởi bộ Đất đai, Hạ tầng, Giao thông và Du lịch hay còn có cái tên là mesh 1/10. Đó là mesh cho khu vực xấp xỉ hình vuông cạnh 100m.

Bỏ qua các cách phần chia mà họ coi là hiệu suất không tốt trong mesh 1/2, mesh 1/4, mesh 1/8, họ chia mesh tiêu chuẩn mỗi chiều 10 lần, tương tự như cách chia nhỏ mesh cấp 2 thành mesh cấp 3.
Với cách làm như vậy sẽ cho ra thêm 2 chữ số từ 00~99 thêm vào meshcode tiêu chuẩn và cuối cùng tổng cộng có được 10 chữ số.

Meshcode này có 10 chữ số giống mesh 1/4, phạm vi biểu thị của meshcode cũng có phần trùng lặp, nếu như thêm dấu gạch ngang thì còn có thể phân biệt được còn nếu không thì không thể phân biệt  (orz) (tất nhiên là nếu 2 chữ số cuối đều >= 5 thì vẫn có thể đoán ra đó là mesh 1/10)
Ngoài ra việc chuyển đổi giữa mesh 1/4, mesh 1/8 với mesh 1/10 là rất khó nhìn.

# Reference
https://tech.atware.co.jp/mesh-system/
http://white-bear.info/archives/1400