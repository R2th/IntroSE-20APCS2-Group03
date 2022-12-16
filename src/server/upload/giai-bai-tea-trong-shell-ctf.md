# **S.H.E.L.L CTF**
## **tea** - 268 points 
### *It's tea time. The flag format is shellctf{...}*
Các bạn có thể tải tập tin tại đây:
https://github.com/LaoDaiDia/CTF/raw/b0af1f25aa9c077e91be7e50f4b003f20156c58d/2022/shellctf/tea

*Công cụ sử dụng: Kali.Linux_x64.v2021.1, IDA Freeware 7.7*

Đầu tiên ta chạy thử tập tin tea trên môi trường Kali linux để có cái nhìn đầu tiên về challenge.

![Chạy thử tập tin tea trên Kali linux](https://images.viblo.asia/9b54b78f-4c32-4af1-b05c-8d6891bfade5.PNG)

Nhận thấy ở challenge này yêu cầu người chơi cần truyền vào 1 flag.\
Sử dụng trình xem mã giả *(Pseudocode)* trong IDA để xem và phân tích chi tiết.

![Mở tập tin trên IDA](https://images.viblo.asia/8be982fc-898d-4120-aa03-f8b3c84cd328.PNG)

Dễ thấy chương trình sử dụng 5 hàm:
- boilWater(): gán chuỗi nhập vào từ người dùng vào biến **pwd**

![](https://images.viblo.asia/d6053399-55b2-490b-a253-6ad0e1f4b13f.PNG)

Sau đó chương trình sẽ kiểm tra chuỗi nhập vào có đúng 32 ký tự hay không.
- addSugar(), addTea(), addMilk(): dùng để "xáo trộn xào nấu" chuỗi **pwd**
- strainAndServe(): so sánh chuỗi **pwd** sau khi xáo trộn với chuỗi có sẵn, nếu đúng thì in ra **"yep, that's right"**

![strainAndServe](https://images.viblo.asia/6ad6a213-5f2e-43b1-a9d3-04098fcb0948.PNG)

Từ đó suy ra, bài này cần tìm một chuỗi **pwd** nhập vào (cũng chính là *flag*) thoả điều kiện: 
+ Có chiều dài 32 ký tự
+ Có dạng shellctf{...}
+ Sau khi biến đổi qua các hàm thì có kết quả như chuỗi có sẵn

**_Hướng giải quyết bài này là đi từ chuỗi kết quả có sẵn trở ngược lên_** 

1. Phân tích hàm addMilk()

![hàm addMilk()](https://images.viblo.asia/ba3cfb86-cdaa-49d6-9bb6-3f2efa622958.PNG)

Hàm này sử dụng 3 biến kiểu *char* là **dest, s** và **v14** để lưu chuỗi tạm và biến đếm **v3**. Hàm *strncat()* dùng để nối chuỗi. 
- Hàm while ở dòng 40: kiểm tra và thực hiện gán từng ký tự từ đầu chuỗi **pwd** đến khi gặp ký tự **5** (có mã ascii là 53) thì dừng, gán chuỗi kết quả vào **dest** 
- Hàm while ở dòng 42: tiếp tục kiểm tra và gán các ký tự tiếp theo của chuỗi **pwd** đến khi gặp ký tự **R** (có mã ascii là 82) thì dừng lại, gán chuỗi kết quả vào **s**
- Hàm while ở dòng 44: gán các ký tự còn lại của chuỗi **pwd** vào **v14**
- Code từ dòng 46 -> 50: nối **v14**, **dest**, **s** theo thứ tự và gán cho **pwd**.

![Phân tích chuỗi pwd ở hàm addMilk()](https://images.viblo.asia/30778a51-2c1a-4308-9973-067da18a0ae0.PNG)

Từ đó, ta có hàm decode hàm *addMilk()* như sau:

![re-addMilk()](https://images.viblo.asia/171e27c5-9354-4e37-a283-4da09e267208.PNG)

*Biến i trong hàm đóng vai trò là biến "chạy" do lúc này ta không biết điểm đầu và cuối của chuỗi **pwd** ban đầu truyền vào hàm addMilk()*

2. Phân tích hàm addTea()

![hàm addTea()](https://images.viblo.asia/9b1fbc04-4660-4672-83a4-0a0d81fd3afa.PNG)

Hàm này chia chuỗi **pwd** làm 2 nửa để xử lý:
- Nửa đầu sẽ biến đổi theo công thức ở dòng 26
- Nửa sau sẽ biến đổi theo công thức ở dòng 34
Ta có chương trình hàm decode hàm *addTea()* như sau:

![re-addTea()](https://images.viblo.asia/47e591e1-9eb8-450f-82e4-7aebe0568511.PNG)

3. Phân tích hàm addSugar()

![hàm addSugar()](https://images.viblo.asia/40af2437-506c-41c5-9fae-e6a92976ef82.PNG)

Hàm addSugar() này đơn giản là chuyển các ký tự ở vị trí lẻ ra đầu, các ký tự ở vị trí chẳn ra sau, duyệt theo thứ tự từ trái sang phải của chuỗi truyền vào.

Ta có chương trình hàm decode hàm *addSugar()* như sau:

![re-addSugar()](https://images.viblo.asia/91c63310-d035-4ca9-9271-64d59c3e3a96.PNG)

Kết quả của chương trình reverse sẽ thu được nhiều key, những key này đều bypass được các hàm *addSugar(), addTea(), addMilk()* để in ra chuỗi ký tự *"yep, that's right"*. Tuy nhiên, key có dạng **_shellctf{}_** mới chính là *flag* cần tìm.


![Kết quả trả về của chương trình re_tea.py](https://images.viblo.asia/2096135b-4c32-4837-a152-8ec2ea1cc87c.PNG)

Các bạn có thể xem và tải chương trình decode tại: https://github.com/LaoDaiDia/CTF/blob/main/2022/shellctf/re_tea.py

Cảm ơn mọi người đã đọc !