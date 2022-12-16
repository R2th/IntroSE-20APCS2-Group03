Chào mọi người, đã bao giờ mọi người gặp khó khăn khi phải thiết kế UI và tạo ra các hình như thế này chưa <br>
![](https://images.viblo.asia/5e5e0861-1073-4033-a398-3a987bd1de27.png)<br>
hoặc thế này<br>
![](https://images.viblo.asia/0ef4ba9f-f11d-481a-9297-082c9d72d077.png) <br>
hoặc như thế này <br>
![](https://images.viblo.asia/8e63a9af-4723-4f6e-a8ee-0271ac865764.png) <br>
Nếu rồi thì hãy tiếp tục đọc để tìm ra giải pháp cho vấn đề trên nhé.
Đầu tiên chúng t sẽ tìm cách vẽ hình số 1 trước, bạn có để ý là bố cục của hình chủ yếu chia làm 2 phần: hình vuông ở trên và cái móc tam giác ở dưới (yaoming) <br>
Mình sẽ viết html như nhau: <br>
```
<div class="bubble-talk">
    <div class="bubble-talk__above">
    </div>
    <div class="bubble-talk__below">
    </div>
</div> 
```
CSS: <br>
```
.bubble-talk__above {
    width: 150px;
    height: 100px;
    border: 5px solid;
    border-radius: 20%;
} 
.bubble-talk__below {
	margin-left: 50px;
    width: 0;
    height: 0;
    border-right: 20px solid transparent; 
    border-top: 20px solid; 
}
```  
Đối với hình số 2, bạn chỉ việc thay đổi CSS như sau 
```
.bubble-talk__above {
    width: 120px;
    height: 120px;
    border: 5px solid;
    border-radius: 50%;
}
.bubble-talk__below {
	position: relative;
	top: -15px;
	margin-left: 10px;
    width: 0;
    height: 0;
    border-right: 30px solid transparent; 
    border-top: 30px solid;
    transform: rotate(35deg)
}
``` 
Đối với hình số 3, các bạn hãy thử tự mình xử lý nhé (yaoming) cũng đơn giản thôi (yaoming). Ngoài hình đơn giản trên, bạn có thể vẽ những hình dễ thương khác như trái tim, hay ngôi sao, ...  <br>
Giờ sẽ là 1 hình nâng cao 1 chút nhé <br>

![](https://images.viblo.asia/0111954a-d730-4fdc-9ba7-dea1a2cd1d3e.png) <br>

html thì chỉ cẩn
``` 
 <div id="pacman">
     <div id="eye"> </div>
 </div>
CSS: 
#pacman {
	width: 0px;
	height: 0px;
    border-right: 60px solid transparent; 
    border-top: 60px solid yellow; 
    border-left: 60px solid yellow;
    border-bottom: 60px solid yellow; 
    border-top-left-radius: 60px; 
    border-top-right-radius: 60px;
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
}
#eye {
	width: 15px;
    height: 15px;
    background-color: black;
    border-radius: 50%;
    position: relative;
    bottom: 45px;
    right: 10px;
}
```
tiếp theo là sẽ làm mấy con ma :v<br>
![](https://images.viblo.asia/d9662ed1-4cd3-42b9-9e7c-d14e4b4be903.png)
```
<div class="bubble-talk">
    <div class="ghost-foot-1"></div>
    <div class="ghost-foot-2"></div>
</div>
#ghost {
position: relative;
  display:block; 
  width: 100px; height: 140px; 
  background-color: green; 
  border-radius: 50% 50% 0% 0% 
}
.ghost-foot-1{
    position: absolute;
    border-right: 25px solid transparent;
    border-bottom: 35px solid white;
    border-left: 25px solid transparent;
    width: 0; height: 0;
    top: 105px;
}
.ghost-foot-2{
    position: absolute;
    border-right: 25px solid transparent;
    border-bottom: 35px solid white;
    border-left: 25px solid transparent;
    width: 0;
    height: 0;
    top: 105px;
    left: 50px;
}
```
Trong bài tiếp theo, chúng t sẽ thêm vào animation đễ pacman và ghost có thẻ chuyển động được. Chào các bạn và hẹn gặp lại