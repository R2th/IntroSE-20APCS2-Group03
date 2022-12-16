Bài viết lần này sẽ giới thiệu tiếp tới thuộc tính Animation. Với thuộc tính `animation`, để tạo hiệu ứng không thể không nhắc tới `@keyframes` - cánh tay đắc lực.

![](https://images.viblo.asia/20b4c571-09d5-4c6e-a4d1-4d1a99d858d5.gif)

{@embed: https://codepen.io/bunnypi04/pen/povONZa}
# `@Keyframes`
Keyframes là yếu tố cấu thành nên CSS animations. Nó định nghĩa hiệu ứng sẽ trông ra sao tại mỗi thời điểm trong dải thời gian của hiệu ứng. Mỗi keyframes sẽ có:
*  Tên của hiệu ứng: Tên bạn đặt cho hiệu ứng đó, vd như: `pacman` chẳng hạn
*  Các mốc thời gian của hiệu ứng: mỗi dấu mốc được biểu thị bằng giá trị %: 0% là thời điểm bắt đầu hiệu ứng, và 100% là lúc kết thúc hiệu ứng. Bạn hoàn toàn có thể thêm nhiều mốc vào giữa 2 mốc 0% - 100% này.
*  Thuộc tính CSS: thuộc tính css với giá trị mà bạn muốn thay đổi tại các mốc thời gian ở trên
 
 Giờ xem thử 1 keyframes đơn giản, VD như cái `pacman` hồi nãy nhé: mình muốn con pacman của mình chạy lên trên 1 đoạn, sau đó rẽ trái đi thêm 1 đoạn, rồi lại rẽ trái đi thêm 1 đoạn nữa:
 ```css
@keyframes pacman {
	0% {
		bottom: 0;
		left: 340px;
	}
	33% {
		bottom: 340px;
		left: 340px;
	}
	66% {
		bottom: 340px;
		left: 40px;
	}
	100% {
		bottom: 0;
		left: 40px;
	}
}
 ```
Như trên là mình đã định nghĩa ra 2 điểm giữa thay đổi trạng thái (là khi con pacman rẽ), nên keyframe của mình có tổng cộng 4 điểm. Như vậy, tùy vào thời điểm, số lần muốn thay đổi trạng thái như nào mà các bạn sẽ tạo ra số keyframe tương ứng với thời điểm mong muốn, và pacman thay đổi dần dần từ trạng thái của keyframe trước tới trạng thái của keyframe tiếp theo, như là di chuyển từ vị trí ban đầu tới vị trí 33%. Bạn có thể xem ví dụ pacman của mình tại [đây](https://codepen.io/bunnypi04/pen/OJPoMqL) nhé:

{@embed: https://codepen.io/bunnypi04/pen/OJPoMqL}

> Keyframes xác định quá trình thay đổi tại các thời điểm mong muốn của hiệu ứng. Giữa các thời điểm, đối tượng sẽ thay đổi trạng thái dần dần từ thời điểm trước tới thời điểm sau.

Ngoài ra nếu hiệu ứng của bạn chỉ có 2 điểm dừng: 0% và 100%, thì có thể viết thành from ... to như sau:
```css
@keyframes pacman {
    from {
        //something here
    }
    to {
        // something else
    }
}
```
# Animation
## Giới thiệu
Sau khi đã tạo keyframes cho hành động, giờ cần thêm hành động đó vào cho đối tượng cần thực hiện thông qua thuộc tính `animation`.

Thuộc tính animation có 2 nhiệm vụ:
* Gán hành động được định nghĩa ở @keyframes cho đối tượng mà bạn muốn thực hiện hành động
* Định nghĩa cách diễn ra hành động

    Để chạy được hiệu ứng, sẽ cần ít nhất 2 thuộc tính animation: 
*   `animation-name`: tên hiệu ứng (được định nghĩa keyframes)
*   `animation-duration`: tổng thời gian diễn ra hiệu ứng, đơn vị giây (s) hoặc mili giây (ms)

Ví dụ như hình pacman ở trên:
```css
img {
    animation-name: pacman;
    animation-duration: 3s;
}
```
Bạn cũng có thể dùng short syntax:
```css
img {
    animation: pacman 3s;
}
```
## Các thuộc tính con
Các thuộc tính con của animation:
###  `animation-name: pacman;` 
Tên của hiệu ứng (định nghĩa keyframes)
###  `animation-duration: 3s;` 
Tổng thời gian diễn ra 1 lần hiệu ứng
###  `animation-timing-function: linear;` 
Cách chạy hiệu ứng (giống transition-timing-function): xác định đường cong tốc độ (đồ thị tốc độ chuyển động) hoặc tốc độ của hiệu ứng

![](https://images.viblo.asia/9f4dffe1-28ae-4cc5-ac38-a997cd5c9261.gif)

Các giá trị cho thuộc tính này bao gồm: `ease`, `linear`, `ease-in`, `ease-out`, `ease-in-out`, `initial`, `inherit`, và default value là `ease`: bắt đầu chuyển động chậm, rồi nhanh dần, rồi chậm lại

Nếu muốn có các timing function phức tạp hơn, bạn có thể tự tạo sử dụng đường cong tốc độ `cubic-bezier` ([đọc thêm](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function)) 
có thể xem thêm ví dụ tại [đây](https://codepen.io/bunnypi04/pen/xxxVGML?__cf_chl_jschl_tk__=ca9491780418a438124d0f5e046a658ee4e055e1-1579139748-0-AZV0eB_6MtGbzbgajTQSkOpeNvloBW7wwGFbFrX9p9PrmH2diAb60E9wl3JrBPrejFUlZjeu-qVBt9UAXAZSqD-HrSCu_MGObo56NMpwmWpmte6ncJlLDsAr0UYVbvEf6G3dFg3su1xzthDmJS7lzmuAKDyl0N0SGoppLr02fkziCEFnQMKCCubi5XtYGg9KQVkXOzu-R6BBwR2xY5LIRTFKQoDUoEdYCJCQ1-qbXE5rwAKIvkAkKnQfgwMbuHBM-DZiLap-UqCY55V1iyCIuhzr4Ek8ClJN1ep4rpJWMb1eHNOzQXTj4sY_OYWxR4QnFZIKLng-cz204Qo_o_TgwXtN-EdvI15ivteW2A0pDsLv) và bài viết mô tả tại [đây](https://viblo.asia/p/tap-tanh-tim-hieu-css-animation-bai-1-transition-4dbZNprL5YM)
###  `animation-iteration-count: 1;` 
Số lần chạy hiệu ứng (infinite nếu muốn chạy liên tục vô hạn)
Chọn số lần lặp lại cho hiệu ứng, default không set sẽ là 1.

Các giá trị có thể nhận: 
1. `number`: 1 con số nào đó biểu thị số lần, 
2. `infinite`: lặp lại vô hạn lần
3. `initial`: đặt về giá trị default
4. `inherit`: thừa kế thuộc tính này từ đối tượng cha chứa nó

###  `animation-direction: normal;` 
Hướng của hiệu ứng: chạy xuôi hay ngược hành động, hay cả hai

Các giá trị nhận được:
1. `normal`:  hành động chạy xuôi bình thường
2. `reverse`: hành động chạy ngược chiều (từ keyframes 100% về 0%)
3. `alternate`: chạy xuôi đến 100% xong chạy ngược lại về 0%
4. `alternate-reverse`: chạy ngược từ 100% về 0% rồi xuôi lại về 100%
5. `initial`: đặt lại về giá trị default
6. `inherit`: thừa kế thuộc tính này từ đối tượng cha chứa nó

Xem thêm ví dụ tại [đây](https://www.w3schools.com/cssref/css3_pr_animation-direction.asp)
###  `animation-delay: 2s;` 
Thời gian trễ trước khi xảy ra hiệu ứng: chờ 2s rồi mới bắt đầu chạy hiệu ứng

Thuộc tính này cho phép bạn chọn thời gian bắt đầu hiệu ứng, hiệu ứng sẽ không được bắt đầu cho tới thời điểm bạn chọn
###  `animation-play-state: running;`
Giống như nút play, pause vậy, chọn running để hiệu ứng chạy bình thường, pause để tạm dừng hiệu ứng lại. 

Các giá trị nhận được:
1. `running`: giá trị mặc định, chỉ định cho chạy hiệu ứng
2. `pause`: chỉ định tạm dừng hiệu ứng
3. `initial`: về giá trị mặc định
4. `inherit`: thừa kế thuộc tính này từ đối tượng cha chứa nó

Xem ví dụ tại [đây](https://www.w3schools.com/cssref/tryit.asp?filename=trycss3_animation-play-state_hover)

###  `animation-fill-mode: forwards;` 
Style cho đối tượng khi nó ko chạy hiệu ứng (trước khi bắt đầu hiệu ứng, sau khi hiệu ứng kết thúc, hoặc cả 2). Thường thì css của animation sẽ không ảnh hưởng được tới đối tượng khi mà nó chưa được kích hoạt hoăc sau khi đã chạy xong hiệu ứng, nhưng nhờ có `animation-fill-mode` thì ta có thể làm được điều này: áp css của animation lên đối tượng ngay cả khi hiệu ứng đang không diễn ra. 

Các giá trị nhận được: 

1. `backwards`: Áp style của hiệu ứng lên đối tượng trước khi xảy ra hiệu ứng (khi đó thì style tại 0% sẽ được sử dụng)
2. `forwards`: sau khi hiệu ứng chạy xong thì giữ nguyên style của 100% cho đối tượng
3. `both`: áp style của 0% lên đối tượng trước khi xảy ra hiệu ứng, sau khi hiệu ứng chạy xong thì giữ nguyên style của 100% trên nó
4. `normal` (default): style của hiệu ứng không ảnh hưởng tới đối tượng trước và sau khi chạy hiệu ứng

* Tham khảo ví dụ tại [đây](https://www.w3schools.com/cssref/css3_pr_animation-fill-mode.asp)
## Short syntax
Có thể viết ngắn gọn các thuộc tính con trên chỉ trong 1 dòng như sau:
```css
animation: [animation-name] [animation-duration] [animation-timing-function]
[animation-delay] [animation-iteration-count] [animation-direction]
[animation-fill-mode] [animation-play-state];
```

Để dùng được short syntax thì bạn nhớ điền đúng giá trị, và có ít nhất 2 thuộc tính con trong short syntax nhé
## Đa hiệu ứng
Để thêm cùng lúc nhiều hiệu ứng đã được định nghĩa keyframes, thì chỉ cần ngăn cách các define của mỗi hiệu ứng bởi dấu phẩy như sau:
```css
.div {
  animation: pacman 3s, disapear 4s;
}
```
# Kết
Bài này đã giới thiệu cho bạn về Animation, hy vọng có thể giúp cho "trình" css của bạn tăng lên :D. Bạn có thể tham khảo thêm 1 nguồn hữu ích này nhé: [Animate.css](https://daneden.github.io/animate.css/)