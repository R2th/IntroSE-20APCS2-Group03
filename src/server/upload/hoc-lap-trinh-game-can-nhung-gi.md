## Lập trình game là làm gì?
Như tên gọi của nó, lập trình game đơn giản là xây dựng, thiết kế và phát triển game phục vụ người chơi. Công việc cụ thể của lập trình game là lên ý tưởng, phát triển ý tưởng, quản lý dự án, xây dựng kịch bản trò chơi, màn chơi,.. Sau đó là lập trình rồi vẽ đồ họa của game, chơi thử tìm lỗi, sửa lỗi game và cuối cùng là tung ra cộng đồng. Nghề này phù hợp với những bạn yêu thích chơi game, đam mê công nghệ và sáng tạo.
Các ngôn ngữ các bạn có thể sử dụng để lập trình game : C, C++, C#, Java, Python,...
Hôm nay, bài viết của mình sẽ giới thiệu sơ lược về lập trình game để các bạn cùng thảo luận về chủ đề này.
## Các bước cơ bản để lập trình game.
Game về cơ bản là 1 vòng lặp vô hạn với các chức năng sau :
* **Hiển thị**: Đã là game thì hiển thị không thể thiếu, lúc đầu các bạn chỉ làm cho phần hiển thị thật đơn giản, các bạn đừng quá chú tâm vào việc làm sao cho thật đẹp, chỉ làm tượng trưng thôi, khi nào game hoàn thiện cơ bản thì các bạn hãy chú tâm đến phần đẹp, việc đầu tiên là game phải chạy được đã.
![](https://images.viblo.asia/1e75f726-8570-4e9a-82c1-37a38a6a3eb9.JPG)
* **Nhận lệnh từ người chơi, điều khiển**: Khi đã hiển thị được các phần của game ra màn hình thì tiếp theo việc các bạn cần làm là điều khiển, việc điều khiển được xem là phần khó nhất và quan trọng nhất của game, ở bước này các bạn muốn game của mình hay, hấp dẫn thì việc ứng dụng các kiến thức toán học, vật lí,... là không thể thiếu. Ví dụ: ứng dụng tốc độ rơi tự do trong game khủng long lúc rớt mạng mà các bạn vẫn quen thuộc, phương trình chuyển động của các nhân vật trong game,...
![](https://images.viblo.asia/63c35023-d4ca-4123-9d88-926fb770eafc.JPG)
* **Xử lí** : Đây là 1 bước để tăng thêm độ hấp dẫn các game mà các bạn lập trình, phần này các bạn sẽ thiết lập 1 số các chức năng, vật phẩm (item) , xử lí các trường hợp có thể xảy ra, ...
* **Win, lose**: lập trình game về cơ bản là 1 vòng lặp vô hạn, để xử lí việc thắng hay thua game thì các bạn chỉ việc thoát vòng lặp game và thực hiện các chức năng khác.
## Hướng dẫn Code một chương trình có thể di chuyển một đối tượng tự do trên màn hình console
Có thể các bạn sẽ hơi khó hình dung, sau đây mình sẽ hướng dẫn các bạn code 1 chương trình đơn giản có thể di chuyển 1 đối tượng tự do trên màn hình console, để đơn giản mình sẽ sử dụng ngôn ngữ lập trình C.
* Đầu tiên thì như mình đã nói vòng lặp game có dạng :
```
while(1){
//hiển thị
//nhận lệnh, điều khiển
//xử lí
//win,lose
}
```
### Phần1: Khởi tạo
* Trước tiên, màn hình console là một màn hình có mặc định nền đen chữ trắng, chiều ngang 80, chiều dọc 25 : để đơn giản thì các bạn có thể định nghĩa ngay từ đầu chương trình để dễ gọi và sử dụng :
**#define consoleWidth 80
#define consoleHeight 25**
* Về vấn đề di chuyển chúng ta sẽ tạo 1 kiểu dữ liệu riêng cho việc di chuyển để tiện sử dụng và gọi:
`enum DiChuyen{ UP, DOWN, LEFT, RIGHT};`
* Tiếp theo mình sẽ khởi tạo 1 đối tượng bằng struct :
```
struct DoiTuong{
char s[10];      //hình dáng đối tượng
int x,y;            //ở đây x là hoành độ, y là tung độ của đối tượng
DiChuyen dc;     // trạng thái di chuyển của đối tượng(đã khởi tạo kiểu dữ liệu DiChuyen ở trên)
};
```
### Phần 2: Chương trình chính
* Việc khởi tạo đã xong chúng ta sẽ đi vào chương trình chính:
```
int main(){
DoiTuong dt;     // Phần khai báo
// Khởi tạo giá trị đầu cho các phần của đối tượng
strcpy(dt.s, "Hello"); // khởi tạo hình dạng (ở đây hình dạng là chữ Hello)
dt.y=0;                         // khởi tạo tung độ đầu
dt.x=consoleWidth/2;     // khởi tạo hoành độ đầu
dt.dc=DOWN;                 //khởi tạo trạng thái di chuyển mặc định
```
**1. Vòng lặp game**
`while(1){`
Trước khi bắt đầu mình sẽ chia sẻ một số điều:
Do ngôn ngữ lập trình C có 1 số khó khăn cho việc di chuyển đối tượng nên mình sẽ thêm 1 thư viện không chính quy để dễ lập trình hơn đó là thư viện "console.h" mình sẽ để link tải thư viện này ở cuối bài các bạn có thể tham khảo (link do mình sưu tầm trên mạng). Sẽ có một số hàm cần sử dụng trong thư viện này như sau: 
clrscr();   // xóa màn hình
gotoXY(int column, int lỉne);   //hiển thị đối tượng tại vị trí có tọa độ (column,lỉne)
TextColor(int color)       //tô màu cho đối tượng với mã màu color
kbhit()                   // nhận biết có phím nhấn vào, hàm này sẽ trả về true khi có phím nhấn vào
Lệnh xóa màn hình: để di chuyển được đối tượng thì việc xóa màn hình là khá cần thiết, hơi khó hiểu nên các bạn thử hình dung như thế này: đầu tiên đối tượng ở vị trí có tọa độ A(x,y) hiển thị đối tượng tại vị trí này, sau đó xóa màn hình và hiển thị đối tượng ở vị trí A1(x+1,y+1) lặp đi lặp lại quá trình này thì đối tượng sẽ di chuyển.
**2. Hiển thị**
```
clrscr();             //xóa màn hình
gotoXY(dt.x, dt.y);         // tọa độ nhảy của đối tượng
prints("%s",dt.s);          // in đối tượng ra màn hình
TextColor(8);                //tô màu với mã màu là 8(tìm hiểu thêm mã màu trên internet)
```
**3. Điều khiển đối tượng**
```
if(kbhit())                 // phát hiện có phím nhấn vào
{
       char key = _getch();            // lưu phím nhấn vào
       if(key == 'A' || key == 'a')            // nhấn A di chuyển sang trái
              dt.dc =LEFT;
       if(key == 'D' || key == 'd')            //nhấn D sang phải
              dt.dc = RIGHT;
       if(key == 'W' || key == 'w')           //nhấn W lên trên
              dt.dc = UP;
       if(key == 'S' || key == 's')             // nhấn S xuống dưới
              dt.dc = DOWN;
}
```
**4. Xử lý**
* Mặc định đối tượng lúc khởi tạo sẽ đi xuống, khi tới y=25 (tức là biên của màn hình console), nó vẫn sẽ tiếp tục đi xuống, nên ở đây chúng ta sẽ xử lí chạm các biên cho đối tượng (khi chạm biên sẽ dội ngược lại). 
**4.1. Xử lí chạm biên**
```
if(dt.y >= consoleHeight-1)              //chạm biên dưới
       dt.dc = UP;                                  // đt di chuyển lên trên
else if(dt.y <= 0)                               // chạm biên trên
       dt.dc = DOWN;                          // đt di chuyển xuống dưới
if(dt.x <= 0)                                      // chạm biên trái
       dt.dc = RIGHT;                          // đối tượng di chuyển sang phải
if(dt.x>=consoleWidth-1)                  // chạm biên phải
       dt.dc = LEFT;                            // đối tượng di chuyển sang trái
```
**4.2. Thiết lập trạng thái di chuyển**
```
if (dt.dc == DOWN)                // DOWN = đi xuống, y tăng dần
       dt.y++;
else if (dt.dc == UP)                 // UP = đi lên y, giảm dần
       dt..y--;
if (dt.dc == LEFT)                   // LEFT = sang trái, x giảm dần
       dt.x--;
if (dt.dc == RIGHT)               //RIGHT = sang phải, x tăng dần
       dt.x++;
```
* Cuối cùng, như các bạn đã biết tốc độ chạy mặc định của chương trình khá là nhanh nên để phù hợp với game thì cần giảm tốc độ chạy với hàm sleep() để điều khiển nhịp game 

`Sleep(200);     //nhịp game`
```
}
return 0;
}
```
Về căn bản đoạn code trên đã đáp ứng hầu hết yêu cầu của một game bao gồm : **Hiển thị, Điều khiển, Xử lí**. Ban đầu sẽ khó cho các bạn hình dung được cách thực hiện vòng lặp game, nên các bạn đừng chỉ nhìn mà hãy mở máy ra và thực hành ngay để làm quen, hình dung rõ hơn (đoạn code này lam theo kiến thức mình tự nghiên cứu nên các bạn có thể góp ý trực tiếp cho mình nha).
Khi đã di chuyển được 1 đối tượng nào đó trên màn hình thì ắt hẳn 1 số ý tưởng đã nảy ra trong đầu các bạn rồi phải không? Đây sẽ là nền tảng đầu, là khởi đầu của một game, các bạn có thể thêm một số phần cho đoạn code trên ví dụ như: vẽ khung giới hạn bằng vòng lặp `for`, làm cho màu đổi liên tục trong lúc di chuyển, .... Nếu các bạn có hứng thú thì bài sau mình sẽ hướng dẫn thêm về việc code 1 game đơn giản nào đó. Cuối cùng mình hi vọng đoạn code này sẽ giúp các bạn hình dung phần nào về việc lập trình game.
Khi đã hoàn thiện các phần căn bản của vòng lặp game thì việc tiếp theo các bạn cần làm là chú ý đến phần đồ họa của game nếu muốn game của mình hay, hấp dẫn, lôi cuốn người chơi. Hiện nay có rất nhiều app hỗ trợ các chức năng cơ bản cho việc lập trình game các bạn có thể tham khảo trên internet, nhưng nếu các bạn muốn nâng cao khả năng lập trình thì nên tự mình làm.
## Cuối cùng
Theo quan điểm của mình thì lập trình game là một việc đòi hỏi niềm đam mê (đam mê là cần thiết nếu muốn làm lâu dài), sự sáng tạo (sẽ không ai muốn chơi game của bạn nếu là mấy thể loại cũ rích đầy rẫy trên mạng nên việc sáng tạo ra những ý tưởng mới mẻ là vô cùng cần thiết), và tư duy của người lập trình. Các bước cơ bản để cho ra một game hoàn thiện như sau: **Lên ý tưởng -> Code -> Đồ họa ->Hoàn thiện**.
Việc lập trình game nếu các bạn thích thì có thể làm cho vui, nó có thể giúp các bạn sinh viên rất nhiều trong việc nâng cao kiến thức lập trình (theo trải nghiệm riêng của mình), bởi vì để lập trình thì các bạn cần phải nắm vững các kiến thức tối thiểu về lập trình và ngôn ngữ lập trình.
Chúc các bạn thành công!