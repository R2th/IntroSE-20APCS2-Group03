# Ôn lại phần 1 
 - ở phần 1 chúng ta tìm hiểu về component nhỉ và thêm cái canvas ,chúng ta thiet lập một canvas và component ok phần này chúng ta sẽ tìm hiểu về các hiệu ưng rất đẹp như move,Crash,update,radom,, và cùng làm game của ta đẹp hơn nữa nhé!!


 ![alt](http://i1.wp.com/codecall.net/wp-content/uploads/2014/02/best-html5-games-2013.jpg?fit=1020%2C9999)

# Move By Controls
 - để move đối tượng myCompoment chúng ta cần biết đc posX , posY của nó để nó chúng ta dùng myCompoment.posX thôi đùng không nào và để move được đối tượng chúng ta sẽ có 2 cách để thực hiện nó ok ,
 
 #### Cách 1  : 
 - để thực hiện thì nó điệu khiển các button bằng cách lấy sự kiện onclick từ button ấy !  như vậy chúng ta sẽ có tận 4 button lận ok sau khi chúng ta đã code xong thì cho sự kiện onclick vào, mõi cái btn thì có một sự kiện onclick khác nhau nhé để cho code đc ngắn gọn , súc tích ,logic hơn chúng ta nên để trong onclick cac tên nhé ví dụ như buttonUp thì chúng ta set **onclick="goUp()"** đấy một  button chúng ta nên đặt tên như thế và nó làm cho code dễ đọc hơn ,nhớ đặt tên mang nghĩa đúng so với ý nghĩa của button này nhé !
- để update và quản lý ,kiểm tra user chúng ta cần thêm là bắt sự kiện click trong hàm ok,để có chúng ta cần phải khia báo biến SpeedX,SpeedY trong hàm component ok và cho nó = 0 ,tiếp theo chúng ta sẽ code 4 functon tương ứng cho Up,Left,Down,Right ở scope global nhé mình sẽ làm thử một hàm up nhé trong hàm này mục đích của chúng ta là set làm sao cho hàm này chạy lên !! . bình thường ta sẽ set **mycompoment.posY--**chứ nhề ! như thế thì sẽ sai chúng ta cần có một cái biến trung gian đó là biến speedX,SpeedY mà chúng ta đã khai báo lúc nãy , trong **TH** này chúng ta hần -- posY nên ta scho**myCompoment.SpeedY=-1** tương tự với các hàm kia muốn đi xuống thì SpeedY=1; lên muốn sang trái thì SpeedX=-1 muốn sang phải thì speedX=1; đến đây vẫn chưa xong chúng ta cần thêm hàm quan trọng nhất trong này đó là hàm tăng hoặc giảm giá trị của posX,posY . hàm newPos() trong compoment sẽ thực hiện nó ok . Trong hàm newpos() mình sẽ set nó như sau:

 ```javascript
 function newpos(){
    this.PosX+=this.speedX;
    this.PoY+=this.speedY;
 }
 ```
- sau khi hoàn hành chúng ta sẽ gọi hàm này trong hàm updateAll(); ok đến đây đã xong,ai có ý kiến gì không ?? chắc chắn là có vì nó còn có thêm 1 bước nữa là trong cái hàm updateAll  trong hàm này chúng ta sẽ set speedX,speedY = 0 hết giống như reset luôn ý ok , vậy là đã kết thúc cách 1 ok !! ;
 #### Cách 2
- ok tiếp tục với cách 2 chúng ta sẽ move compoment bằng cách dùng các phím mũi tên lên  xuống ,up,down ,ok chúng ta bắt tay vào làm thôi , first chúng ta cần thay đổi cái hàm Start một chút xúy ok . Trong hàm start chúng ta cần set keyup và keydown bằng tay tức là chúng ta dùng add event listiner ok cú pháp của nó là **window.addEventListener("keydown",function(){ })** trong function này chúng ta sẽ làm như sau :  **myGameArea.key = e.keyCode;** và keyup thì chúng ta sẽ làm như sau : 
 
```javascript
 window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })

```
- sau khi làm xong thì chúng ta bắt đầu làm thôi chúng ta vẫn làm bình thường nhưng khi đến doạn have event thì nó sẽ khác một xúy đấy nhé ok để xử lý đoạn này chúng ta phải biết đc keyevent của các phím lên xuống trái phải như nào ở đây phím lên của mình có number là 40,xuống là 38,trái là 37, phải là 39 ok các bạn có thể tham khảo nó ở đây 
![alt](https://i.stack.imgur.com/FgAVt.png)

```javascript
if (myGameCanvas.key && myGameCanvas.key == 37) {myGamePiece.speedX = -1; }
    if (myGameCanvas.key && myGameCanvas.key == 39) {myComponent.speedX = 1; }
    if (myGameCanvas.key && myGameCanvas.key == 38) {myComponent.speedY = -1; }
    if (myGameCanvas.key && myGameCanvas.key == 40) {myComponent.speedY = 1; }
```
-  ok đây là code mà nó dùng event của các phím lên xuống ok nhưng nó không thể ấn một lúc nhiều lần đc nó không thể đi chéo đc vậy để đi chéo chúng ta cân thay đoạn code ở trong keydown thành như này 

```javascript
myGameCanvas.keys = (myGameCanvas.keys || []);
            myGameCanvas.keys[e.keyCode] = true;
   ```
-  trong keyup chúng cung làm như zậy nhưng nó sẽ khác hơn **myGameCanvas.keys[e.keyCode]=false;** sau đó lại chỗ if trong hàm updateAll() chúng ta sẽ đôi ==37 => [37] nhé vì nó là muti nên sẽ khác hoàn toàn đấy  


# 2. muti Obstacles
 - nó khó hơn cái lấy event nhiều vì nó phải sử dụng cả thuật toán và căn thời gian nó có thuật toán khá logic và cũng không khó lắm nhưng theo thuật toán này thì mình nghĩ nó không tối ưu và hiệu quả cho lắm nên mong mọi người góp ý nhé ! 
 - đầu tiên chúng ta cần khai báo môt biến global nhưng nó là một mảng chưa có dữ liệu ok ,sau đó chúng ta vào cái hàm updateAll mà code thôi nhưng trước khi code chúng ta phải khai báo trong gamecanvas biến tên là FrameNo và rồi gắn nó = 0 ok ; tiếp theo chúng ta cần add thêm function **intervalEvery(n)** hàm này truyen vaò tham số n  và trong này chúng ta sẽ phải dùng if nếu mà FraneNo ấy / n %1 == 0 thì return true ; còn nếu không rời vào trường hợp này thi return false và hàm này  sẽ có tác dụng như thế  tý nữa sẽ biết nhé 
 - trong hàm  **updateAll()** chúng ta sẽ cộng FrameNo lên một gái trị mỗi lầm gọi hàm đó đấy sẽ là lúc câu chuyện bắt đầu nó sẽ nãy sinh rất nhiều thứ khác như sau : chúng ta cần phải xử lý radom tức là set vị trí ngẫu nhiên cho Obstacles ,phải dùng vong for để check xem component có crash Obstacles không , add Obstacles trên dưới như thế nào ,phải giũ khoảng cách cho 2 Obstacles là một khoảng đủ cho component lọt qua nó ,và chúng ta update nó như thế nào ,ok ! khá là nhiều việc đấy !! chúng ta bắt đầu làm thôi !! tất cả mọi thao tác của mình sau đây đều trong hàm **updateAll()** nhé !! 
 - chúng ta làm sao để add một Obstacles vào mảng Obstacles
 để add và chúng ta dùng ham push add vào mảng như thường lệ đc vì thời gian cập nhật rất nhanh nên Obstacles sẽ không có khoảng cách ở giữa nó sẽ sát nhau nên để có thời gian và khoản cách cho Obstacles dc add vào thì chúng ta sẽ dùng hàm intervalEvery ở trên để set một khoảng thời gian ok và chúng ta phải dùng if như sau : 
 
 ```javascript
  if (myGameCanvas.FrameNo == 1 || IntervalEvery(150)) {  }
 ```
 - vì FrameNo mỗi lần hàm updateAll() được gọi thì nó sẽ cộng 1 đấy nên no chia  hết no 150 khi nó lên 150,300,450... nên sẽ mất thời gian vậy trong if chúng ta sẽ add Obstacles vào bằng cách nào ,chúng ta sẽ dùng ham push nhưng làm sao để có thể add đc vị trí ,chiều cáo bất kì ok !! chúng ta sẽ cùng nhau xử lý tiếp nhé !!! Obstacles đc add từ ngoài màn hình nếu chúng ta dùng width của canvas để set x của nó không phải quá tuyệt vời sao ??? còn width thì nó khá đơn giản rồi vì nó có width như thế nào thì tùy người ở đây mình cho width=10, ok đến height  chúng ta thấy nếu nó cứ lặp lại một chiều cao thì cần gì phải né đúng không nó làm game quá nhàm chán đúng không ?? chúng ta sẽ cần một cái hàm radom như sau : 
 
 ```javascript
   function getRadom(have) {
            return Math.floor(Math.random() * have);
        }
 ```
 - hàm này cho phép trả về một số radom khoảng từ 0 => tham số truyền vào ok ở đây mình sẽ truyền vào tham số 27  vì canvas có chiều cao là 270 nên mình muốn chia nó là 10 phần ok sau đó chúng te sẽ set height của nó bằng x10 lên ,ok nó tương tự đối với cột trên ok nhưng chúng ta phải chú ý .posY của cái ở dưới là = height-radomdown*10 nhé còn posY ở dưới là 0   code như sau : 
 
 ```javascript
  x = myGameCanvas.Canvas.width;
y = myGameCanvas.Canvas.height - radomDown * 10;
myObstacle.push(new compoment(10, radomDown * 10, "green", x, y));
myObstacle.push(new compoment(10, radomUp * 10, "green", x, 0));
 ```
 - nhưng chúng ta còn vấn đề là phải lấy radom sao cho nó có khoản cách bằng nhau ,chúng ta sử dụng while thôi lấy tổng là 270-(radomup*10+radomdown*10) = 10  . ok  10 là khoảng cách giữa cột trên và cột dưới để component lọt vào ok vậy là xong phần add Obstacles à quên vẫn còn chứ chúng ta còn phải dùng vòng for duyệt tất cả rồi trừ posX của mội thằng xuống rồi cập nhật nó luôn như này : 
 
 ```javascript
 for (i = 0; i < myObstacle.length; i += 1) {
                myObstacle[i].PosX -= 2;
                myObstacle[i].update();
            }
 ```
 sau đó chúng ta làm crash vào thì sao nhé !!!
 # làm hiệu ứng khi component crash Obstacles như thế nào ?? 
 quả này căng à nha ?? để làm nó chúng ta cần làm hiệu ứng cho ốn trước trong này mình cũng chẳng rảnh làm hiệu ứng làm gì mình chỉ tập trung vào phần khi nào crash thôi nhé nên ử đây mình sẽ chỉ làm game over khi crash thôi nhé !! .chúng ta sẽ add hàm stop vào Canvas trong hàm stop chúng ta sẽ có **clearInterval(this.interval);** cnos sẽ ngừng hoạt động interval vậy hàm updateAll sẽ không đc gọi nữa nên tất cả hoạt động game đều dừng lại hết giống như gameover, đây chính là hàm crash nè các bạn nhớ xem kĩ nhé !
 
 ```javascript
  this.CrashWith = function(Obj) {
                var Mytop = this.PosY,
                    Mybottom = this.PosY + this.height,
                    Myright = this.PosX + this.width,
                    Myleft = this.PosX,
                    Objtop = Obj.PosY,
                    Objbottom = Obj.PosY + Obj.height,
                    Objright = Obj.PosX + Obj.width,
                    Objleft = Obj.PosX,
                    Crash = true;
                if ((Mybottom < Objtop) ||
                    (Mytop > Objbottom) ||
                    (Myright < Objleft) ||
                    (Myleft > Objright)) {
                    Crash = false;
                }
                return Crash;
            }
 ```
 
 - hàm này nó khoanh vùng lại nếu vi phạm các vùng trên thì nó sẽ trả về true tức là đã crash ok để set chỉ cần làm như này là xong crash thôi (trong updateAll() nhé)
 
 ```javascript
  for (i = 0; i < myObstacle.length; i += 1) {
                if (myCompoment.CrashWith(myObstacle[i])) {
                   /myGameCanvas.stop();
                }
            }
 ```
 ok vậy là kết thúc chương 2 còn  nhiều kiến thức hay ho khác nữa mình sẽ nói trong phần 3 nhé các bạn !!! cảm ơn đã dành thời gian đọc bài viết mong bài viết này có ich cho bạn đọc mình mong mọi người góp ý !!