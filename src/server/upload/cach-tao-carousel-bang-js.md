## 1. Ý tưởng để làm carousel
1. Tạo 1 div chứa các hình ảnh, các arrow left, arrow right và 1 danh sách các dấu chấm (mình gọi là các button).

![](https://images.viblo.asia/52b38eb1-d495-4bde-8c58-6a8c078f635d.png)
2. Mình sử dụng 1 biến đếm cout * giá trị dịch chuyển để dịch chuyển div chứa các image từ phải qua trái và ngược lại (div ý trong code của mình là .slick-track), khi user click vào arrow right thì cout tăng lên và giảm khi click vào arrow left, khi user click vào button nào đấy trên carousel thì cout bằng textContent của button đó (VD : <button>1</button> thì cout = 1 khi button đó đc click). 
```html
<div class="slick-list">
  <div class="slick-track">
    <div> image 1</div>
        ..........
    <div> image 6</div>
  </div>
</div>
```
3. Bố cục HTML là mình tham khảo của tiki.vn và ***các bạn có cách làm khác ngắn gọn hơn... thì cho mình tham khảo nha và cách làm hay bài trình bày của mình ko đc tốt hay như thế nào đấy thì các bạn comment cho mình biết để mình chỉnh sửa cho nó hoàn thiện hơn! Thanks!***
## 2. Các bước làm
1. Tạo html có bố cục như này:  
{@gist: https://gist.github.com/khoailang99/dec420080e2aada87bbec31a14e0641e}

2. Tạo file carousel.js để xử lý các sự kiện trong carousel.  
2.1 - Chọn các [selector](https://www.w3schools.com/css/css_syntax.asp) mà ta cần làm việc:  
```javascript
	var arrowLeft = document.querySelector('.slick-prev');
	var arrowRight = document.querySelector('.slick-next');

	var slickTrack = document.querySelector('.slick-track');
	var slickSlice = document.querySelectorAll('.slick-slide');
	var slickDots = document.querySelectorAll('.slick-dots li');

	var btn = document.querySelectorAll('.slick-dots button');
```
2.2 - Khai báo và khởi tạo các biến mà ta cần thao tác với chúng:   
```javascript
	var eleIsClicked = 0; // vị trí của button được click

	var size = slickSlice[0].clientWidth; // lấy giá trị dịch chuyển bằng width của .slick-slice đang chứa ảnh
	var count = 1, time = 4000;
	var stateTab = true; // Dùng để kiểm tra xem user đang ở trong tab chứa web page của mình hay user đang ở tab khác
	var stateTranslateOfSlickTrack = true; // Kiểm tra xem .slick-track (là thằng chứa tất cả các ảnh) đã dịch chuyển xong chưa
	var v_interval = ""; // Dùng để lưu giá trị setInterval

	var hidden, visibilityChange;
```
2.3 - Tạo hàm chạy setInterval, hàm này sẽ thực hiện việc translateX sau khoảng thời gian nào đó mà bạn chỉ định, các bạn biết là setInterval là nó chạy liên tục nhưng đôi khi ta muốn hủy bỏ setInterval đó để làm 1 số hành động khác như click vào arrow left, arrow right hay click vào các button (tức là các dấu chấm nhưng mình gọi nó là button) để translate( dịch chuyển) nên ta sẽ tạo hàm clearInterval.  
```javascript
function run_setInterval(){
   v_interval = setInterval(()=>{
			slickDots[count-1].classList.remove('slick-active');
			slickTrack.style.transition ="transform 0.5s ease-in-out";
			slickTrack.style.transform = `translate3d(${-size*(++count)}px,0px,0px)`;
			eleIsClicked=count-1;
			if(count === slickSlice.length - 1){
				slickDots[0].classList.add('slick-active');
			}else{
				slickDots[count-1].classList.add('slick-active');
			}
		}, time);
	}

	function run_clearInterval(){
		clearInterval(v_interval);
	}
```
2.4 - Khi user sang tab khác thì mình ko muốn carousel nó translateX nữa thì ta phải thêm sự kiện visibilityChange cho document để kiểm tra xem user đang ở trong hay ngoài tab chứa cái trang web của mình mà user đang xem. 
```javascript
	if (typeof document.hidden !== "undefined") {
		hidden = "hidden";
		visibilityChange = "visibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	}
    
    // Hàm xử lý sự kiện visibilityChange cho document
    function handleVisibilityChange() {
		stateTab = (document[hidden])?false:true;
		if(stateTab){ // Nếu user ở trong tab.
			run_setInterval();
		}else{
			run_clearInterval();
		}
	}
```
2.5 - Thêm sự kiện click cho arrow left và arrow right, hàm xử lý nó có chức năng là khi user click liên tục vào arrow left or right nó thì ko có tác dụng trong việc carousel nó thực hiện translateX liên tục mà cái thằng carousel nó sẽ translateX xong thì mới đến translateX tiếp theo của lần click chuột tiếp theo vào arrow left or right:       
```javascript
	arrowLeft.addEventListener("click", function(e){
		if(stateTranslateOfSlickTrack){
			run_clearInterval();
			commonFuncBothArrows(true,false,e); // Hàm xử lý chung cho cả arrow left và right và tham số đầu là arrow left đc click, tham số 2 là arrow right đc click
			run_setInterval();
		}
	});

	arrowRight.addEventListener("click", function(e){
		if(stateTranslateOfSlickTrack){
			run_clearInterval();
			commonFuncBothArrows(false,true,e);
			run_setInterval();
		}
	});
    
    function commonFuncBothArrows(arrowL,arrowR,e){
    e.preventDefault();
    stateTranslateOfSlickTrack = false;
    if(arrowL){
        if(count <= 0 ){ return; }
    }else{
        if(arrowR){
            if(count >= slickSlice.length - 1){ return;}
        }
    }
    slickDots[count-1].classList.remove('slick-active'); // Xóa .slick-active trên li trước đó khi click arrow left or right or cả left và right liên tục 
    slickTrack.style.transition = `transform 0.5s ease-in-out`;
    count = arrowL?--count:++count; // kiểm tra nếu arrowLeft đc click thì giảm biến đếm cout và ngược lại
    slickTrack.style.transform = `translate3d(${-size*count}px,0px,0px)`;
    eleIsClicked=count-1; // lưu biến đếm để xem dấu chấm ( button ) thứ mấy mà cũng đc active khi user click vào arrow left or right
    switch (count) {
        case 0: // nếu biến đếm = 0 tức là carousel đang ở ảnh đầu tiên thì active dấu chấm cuối cùng
        slickDots[slickDots.length-1].classList.add('slick-active');
        break;
        case slickSlice.length-1: // carousel đang ở ảnh cuối cùng thì active cho dấu chấm đầu tiên
        slickDots[0].classList.add('slick-active');
        break;
        default:
        slickDots[count-1].classList.add('slick-active');
        break;
    }
}
```
2.6 - Thêm sự kiện click cho các dấu chấm, dấu chấm này là các button, các button này có giá trị chính là số lần carousel nó thực hiện translateX.   
```javascript
	btn.forEach((elem) => {
		elem.addEventListener('click', ()=>{
			if(stateTranslateOfSlickTrack){ // Chỉ đuợc thực thi khi carousel đã thực hiện translate xong.
				run_clearInterval();
				slickTrack.style.transition = `transform 0.5s ease-in-out`;
				count = Number(elem.textContent);
				slickDots[eleIsClicked].classList.remove('slick-active');
				slickDots[count-1].classList.add('slick-active');
				slickTrack.style.transform = `translate3d(${-size*count}px,0px,0px)`;
				eleIsClicked = count-1;
				run_setInterval();
			}
		});
	});
```
2.7 - Thêm sự kiện transitionend cho thằng div mà nó thực hiện việc translateX.
```javascript
	slickTrack.addEventListener('transitionend', ()=>{
		stateTranslateOfSlickTrack = true; // cho biết thằng carousel nó đã thực hiện xong việc translateX 
		let nameClassSlickSlide = slickSlice[count].id;
		if(nameClassSlickSlide === 'lastClone' || nameClassSlickSlide === 'firstClone'){ 
			slickTrack.style.transition = `none`;
			count = (nameClassSlickSlide === 'lastClone')?slickSlice.length - 2:(nameClassSlickSlide === 'firstClone')?1:count; // slickSlice .length - 2 thì 2 này là 1 cái ảnh ở đầu có id='lastClone' và 1 ảnh ở cuối có id = 'firstClone'
			eleIsClicked = count - 1;
			slickTrack.style.transform = `translateX(-${size*count}px)`;
		}
	})
```
## 3. Xem Demo
{@codepen: https://codepen.io/nguyenCuong1910/pen/MWYvyXG?editors=1010}