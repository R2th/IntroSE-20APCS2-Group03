![alt](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW8cqurUJbYOxBOyX6Av7KHs53qYIq9Pt85B64ACFR1kpgI7KUpx75F3k)
# Creat Canvas and width,height,(color)
- để khởi tạo một Canvas tức là chúng ta cần một variable tên là Canvas,value của nó dc biểu thị như sau : 

```javascript
var myCanvas {
    Canvas : document.createElement("canvas"),
    start : function () {
        this.canvas. width =  480;
        this.canvas.height = 270;
        this.context =this.Canvas . getContext("2d");
        document.body.insertBefore(this.Canvas,document.body.firstChild);
    }
}
```
 ta có **createElement** ra thì chúng ta sẽ có Canvas sau đó chúng ta sẽ set height và width và chúng ta cần nội dung của nó bằng cách dùng function **getContext("2d")** , sau khi hoàn thành còn công việc cuối cùng là add nó vào body thôi bằng cách là dùng **insertBefore()**
 
 - sau đó để chạy **myCanvas.start()** thì chúng ta cần một cái hàm và chúng ta cần phải sử dụng onload trong body ex : 
 
 ```javascript
 <body onload= "MyStart()">
 function MyStart(){
 myCanvas.start();
 }
 </body>
 ```
vậy là hàm start trong myCanvas được chạy thôi 
> nếu bạn muốn **Css** cho Canvas thí hãy code như này nhé :
```javascript
canvas {
    background : gray;
}
```
 - sau khi chúng ta code xong nó và kết hợp lại thì sẽ ra một hình chữ nhật màu xám :grimacing::grimacing::grimacing: có kích thước như trên :smile:

# Create Component And **Update Function** 
  - để Create component thì nó có dạng như function ý , chúng ta cần thuộc tính truyền vào và để update game thì phải xử lý nó bằng một số hàm như fillrect(),setInterval(),.....
  
> - function fillrect() cho phép chúng ta đưa các yếu tố như tọa độ x, tọa độ y , width,height của cái gọi nó , sẽ add tọa độ và height chiều cao.Ngoài ra còn có hàm clearRect() nó có tác dụng ngược lại **fillRect()**
- setinterval() để cập nhật game liên tục nó giúp game có chuyển động và animation các thứ , hàm này như một vong lặp vô hạn nó chỉ kết thúc khi **game over** hoặc close game thì nó sẽ dừng nếu chúng ta dùng nó để **update** các action của game thì nó sẽ rất hiệu quả ,khi chúng ta dùng nó chúng ta cần gom tất cả cái cần update vào một hàm rồi mới dùng hàm này gọi hàm khác nhé !

-  để hiểu rõ hơn về ***component** thì hãy xem code nhé 

```javascript
function compoment(width, height, color, PosX, PosY) {
            this.width = width;
            this.height = height;
            this.PosX = PosX;
            this.PosY = PosY;
      
            this.update = function() {
                s = myGameCanvas.context;
                s.fillStyle = color;
                s.fillRect(this.PosX, this.PosY, this.width, this.height);
            }
        }

        function UpdateAll() {
            myCompoment.update();
        }
```
> - sau khi chúng ta hoàn thành **component** thì chúng ta phải khai báo biến global tên là gì gì đó ở đây mình đặt là **myComponent** sau đó vào hàm **onload** của body tên là MyStart() , chúng ta set
> 
```javascript
myComponent= compoment(30, 30, "red", 10, 120);
```
- khi chúng ta code xong sẽ nhận được thành quả một hình chữ nhật xám và một hình chữ nhật nhỏ ở bên trong có width=height=30 và ở tạo độ x=10, y=120 ok 

- sau khi làm xong chúng ta sẽ làm phần **update**
```javascript
function compoment(width, height, color, PosX, PosY) {
            this.width = width;
            this.height = height;
            this.PosX = PosX;
            this.PosY = PosY;
            this.update = function() {
                s = myGameCanvas.context;
                s.fillStyle = color;
                s.fillRect(this.PosX, this.PosY, this.width, this.height);
            }
        }

        function UpdateAll() {
            myCanvas.clear();
            myCompoment.update();
        }
```
 để update chúng ta gọp phần code 
 ```javascript
s = myGameCanvas.context;
s.fillStyle = color;
 s.fillRect(this.PosX, this.PosY, this.width, this.height);
 ```
 thành một function và rồi cho tất rả hàm vao rồi cho một đoạn code sau vào start function trong myCanvas là 
 ```javascript
 this.interval = setInterval(UpdateAll, 20);
 ```
 - ok sau khi chạy thì cũng chả có gì thay đổi vì chúng ta không di chuyển component ok :smile:, để test coi có update không thì chúng ta sẽ thử thêm một đoạn code như này vào function **updateAll()** :
 
 ```javascript
 myComponent.PosX+=1;
 ```
 - sau khi xong thì result sẽ có một hình chữ nhật và một hình chữ nhật đỏ khác là component di chuyển từ trái qua phải trong hình chữ nhật xám ok : smile:
 
 
# Hàm myCanvas.Clear() dùng để làm gì ??? 
 - có nhiều người sẽ thấy lạ  vì trong myCanvas đâu có cái hàm nào tên là clear đáng lẽ mình nên nói trước mà mình quên thôi nói luôn đầu tiên chúng ta sẽ set ham clear trong mycanvas  như sau :
 ( code này sẽ đc code trong myCanvas nhé )
 
 ```javascript
 clear : function(){
     this .context = clearRect(0, 0, this.Canvas.width, this.Canvas.height); 
 }
 ```
 - context là biến đã có rồi nhé !! (tự tìm lại ) ,đến với clearRect chúng ta thấy nó xóa tất cả những vết đi của thằng component nếu không có hàm clear thì chúng ta sẽ thấy cái hình chữ nhật màu đỏ sẽ tăng chiều dài lên chứ không phải di chuyển , thực ra nó di chuyển nhưng càng đi thì chiều dài càng tăng nên phải đưa nó về trạng thái ban đầu và vị trí mới ok !! 


vậy là chúng ta đã hoàn thành phần giao diện game và Canvas,Component , Update phần tiếp theo chúng ta sẽ làm vầ control và một số cái khác nhé !:smile::smile::smile::smile: