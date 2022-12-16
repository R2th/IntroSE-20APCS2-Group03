![alt](https://i.stack.imgur.com/60XYC.png)
## Làm sao để sử dụng previousElementSibling để biết được position của phần tử đó của mảng,ngoài ra còn dùng bằng jquery để code(không chuyên sâu lắm);
**một số kinh nghiệm mình rút được qua một số dự án của mình liên quan đến slide và các hiệu ứng hover  =)**
-khi sử dụng hàm previousElementSibling ,khi mình code cái này lỗi rất nhiều nên ức chế vãi luôn, nên mình mới chia sẻ cho mọi người biết 

>khi code cái thằng previousElementSibling này mục đích chính của nó là phục vụ cho code slide và các sự kiên hover mà nhiều phần tử hoạt động,đấy theo mình nó vẫn là quan trọng với 1 số html devolop

-khi code cái này chúng ta cần biết được cái gì là phần tử đang hoạt động ,để tìm ra cái thằng đứng sau ngay nó
```html
<div class="one_team  run">
                    <div class="row" style="position: relative;">
                        <div class="one_people col-sm-4">
                            <img src="images/team-img1.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img2.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit</p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img3.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                    </div>
                </div>

                <div class="one_team">
                    <div class="row">
                        <div class="one_people col-sm-4">
                            <img src="images/team-img4.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img5.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit</p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img6.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                    </div>
                </div>

                <div class="one_team">
                    <div class="row">
                        <div class="one_people col-sm-4">
                            <img src="images/team-img7.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit</p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img8.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit</p>
                        </div>
                        <div class="one_people col-sm-4">
                            <img src="images/team-img4.jpg" alt="" srcset="" class="imgs_vt2">
                            <div class="bolds">
                                <b class="bold_vt2">MARY,CEO</b>
                            </div>
                            <p class="text_vt2">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                        </div>
                    </div>
```
-trong cái souce code này nó có 3 cục cha là "one_team" đây là 3 cục mà dùng để chuyển slide ,khi muốn có 1 slide chúng ta phải cho tất cả phần tử là
```css
position: absolute;
width:100%;
# height:100%;
```
và mình còn có những kinh nghiêm thú vị hơn là khi ta code mấy thằng phần tử này ,chúng ta nên để nó là 
```css
opacity : 0;
visibility: hidden;
```
cho tất cả biến mất đi khi đó để nó hoạt động ,bạn muốn cái phần tử mẹ nào  hoạt động thì cho một cái class gì gì đó và vào css set cho nó là 
```css
opacity : 1;
visibility: visible;
```
nó có thể giảm tối thiểu việc hiệu ứng slide,vậy là xong cái css việc còn lại là chỉ cần set Jquery( or JavaScript) sao cho theo ý định của mình  
- nếu ai muốn dùng kiểu button để điều chỉnh các slide thì mình sẽ đưa ra ngay đây @@
vẫn tiếp tục với cái souce code đau não lúc nãy thì nó sẽ có 3 cái btn tượng trưng cho 3 cái phần tử trong slide
nó như thế này 
```html
<button class="btn btn-primary btns-vt2"></button>
<button class="btn btn-primary btns-vt2"></button>
<button class="btn btn-primary btns-vt2"></button>
```
thường khi dùng btn của slide ta thường đặt tên class giống nhau cho dễ xử lý 
B1 : để sử lý cái này ta cần biết cái vị trí btn trong cái arr mà khách hàng click vào là bao nhiêu ; bằng cách như thế này : (JavaScript and Jquery)
```javascript
var btn = document.getElementsByClassName("btns-vt2");
    for(var i =0 ; i < btn.length ;i++){
        btn[i].onclick=function name(params) {
            var is=0;
            var this_slide=this;
            for( is = 0 ; this_slide=this_slide.previousElementSibling;is++){
          //cái này chính là cái thuật toán tính vị trí đấy
         }
        
            for( us = 0 ; us < $(".one_team").length;us++) { 
          // vòng này thì nó lại khác trước khi mà click vào thì phải xóa all các phần tử trong đó
                $(".one_team").eq(us).removeClass("run");
            }
            $(".one_team").eq(is).addClass("run");
          }
    }
```

đấy và nếu theo Jquery thì mình làm theo thuật toán của mình là như sau (cái này hơi dài  đây là một souce code khác nên các bạn cố hình dung nha !! @@)

```javascript
 $(".one_people").hover(function name (params) {
        var stt=0;  
        var te= $(this);
        for(var is=0; is<$(".one_people").length;is++){
            if($(".one_people").eq(is).html()==te.html()){
                stt=is;
            }
        }
       $(".imgs_vt2").eq(stt).addClass("gout");  
        $(".text_vt2").eq(stt).addClass("over");
        $(".imgs_vt2").eq(stt).removeClass("ungout");  
        $(".text_vt2").eq(stt).removeClass("unover"); 
```
cái này là một ví dụ cho cái hover mà nhiều phần tử chuyển động  như mình nói trên ấy sau đó bạn thích add gì thì add ,theo mình để các hiệu ứng đẹp hơn thì cần thuần thạo cái animation ;
```css
.ungout{
    position: relative;
#    transition: 0.4s;
    top: 0px;
    animation: ungo_top 0.5s;
    opacity: 1;
}
@-webkit-keyframes ungo_top{
    to{top: 0px;position: relative;opacity: 1;}
    from{top:-100px; position: relative;opacity: 1;}
 
```
ok, qua cái bài xàm do một con gà viết như mình chắc cũng thêm đc một chút ít kiến thức cho mấy người đọc @@(sợ không đc =))) )