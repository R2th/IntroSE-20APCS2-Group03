### Hàm băm MD-Message Digest (md5)
MD5 được phát minh bởi Ron Rivest ,người đã tham gia xây dựng RSA.MD5 viết tắt của chữ Message Digest,được phát triển lên từ MD4 và trước đó là MD2,do MD2 và MD4 không còn an toàn.Kích thước của MD5 là 128 bit được tính giá trị của thông điệp có kích thước tối đa 2^4 bit <br>
**Thuật toán MD5**<br>
  -Input: xâu đầu vào x có độ dài tối đa 2^64
  -Output: chuỗi băm 128 bit
  -Sơ đồ thuật toán:
  ![](https://images.viblo.asia/63418bec-fc6d-4612-bc2d-047d36c5f212.png)
  <br>
  Trước tiên thông điệp được đệm vào dãy padding 100...00. Chiều dài của dãy padding được chọn sao cho thông điệp cuối cùng có thể chia làm N block 512 bit M1,M2,...,MN.Quá trình tính giá trị băm của thông điệp là quá trình lũy tiến. Trước tiên block M1 kết hợp với giá trị khởi tạo H0 thông qua hàm F để tính giá trị hash H1. Sau đó block M2 đượckết hợp với H1 để cho ra giá trị hash là H2. Block M3 kết hợp với H2 cho ra giá trị H3. Cứ như vậy cho đến block MN thì có giá trị băm của toàn bộ thông điệp là HN.<br>
  - H0 là một dãy 128 bit được chia thành 4 từ 32 bit, ký hiệu 4 từ 32 bit trên là abcd. Với a, b, c, d là các hằng số như sau (viết dưới dạng thập lục phân):<br>
                                a = 01234567<br>
                                b = 89abcdef<br>
                                c = fedbca98<br>
                                d = 76543210<br>
                                <br>
-**Cấu trúc của hàm F như sau:**

![](https://images.viblo.asia/9aff7da0-e1c2-4a60-a7f3-589727f2deea.png)
<br>
Tại mỗi bước lũy tiến, các giá trị abcd của giá trị hash Hi-1 được biến đổi qua 64 vòng từ 0 đến 63. Tại vòng thứ j sẽ có 2 tham số là Kj và Wj đều có kích thước 32 bit. Các tham số Kj được tính từ công thức: Kj là phần nguyên của số 2^32 abs(sin(i)) với i biểu diễn theo rad.
<br>
Giá trị block Mi 512 bit được biến đổi qua một hàm message schedule cho ra 64 giá trị W0, W1,…, W63 mỗi giá trị 32 bit. Block Mi 512 bit được chia thành 16 block 32 bit ứng với các giá trị W0, W1, …, W15 (16×32=512). Tiếp theo, 16 giá trị này được lặp lại 3 lần tạo thành dãy 64 giá trị.
<br>
Sau vòng cuối cùng, các giá trị abcde được cộng với các giá trị abcd của Hi-1 để cho ra các giá trị abcd của Hi. Phép cộng ở đây là phép cộng modulo 232.
<br>
Tiếp theo tìm hiểu cấu trúc của một vòng. Việc biến đổi các giá trị abcd trong vòng thứ i được thể hiện trong hình bên dưới.<br>
![](https://images.viblo.asia/48d7e916-6d46-4835-9016-5a58e26f658d.png)<br>
Note:Phép + trong sơ đồ trên là phép cộng modul 2^32
<br>
Ở đây c lấy giá trị của b, d lấy giá trị của c, a lấy giá trị của d.<br>
Giá trị b được tính qua hàm:<br>
t = a + f(b,c,d) + Wi + Ki<br>
b = b + ROTL(t,s)<br>
Trong đó : Hàm f(x,y,z):<br>
f (x,y,z) = (x ^ y) v (_x ^ z) nếu vòng từ 0 đến 15 <br>
f (x,y,z) = (z ^ x) v (_z ^ y) nếu vòng từ 16 đến 32 <br>
f (x,y,z) = x xor y xor z nếu vòng từ 32 đến 48 <br>
f (x,y,z) = y xor (x v _z) nếu vòng từ 49 đến 63 <br>
Hàm ROTL(t, s): t được dịch vòng trái s bit, với s là các hằng số cho vòng thứ i như sau:<br>

![](https://images.viblo.asia/3872275b-072c-429a-91ac-6f246cfb4d7c.png)<br>

Tham khảo thêm thuật toán MD5:<br>
https://en.wikipedia.org/wiki/MD5