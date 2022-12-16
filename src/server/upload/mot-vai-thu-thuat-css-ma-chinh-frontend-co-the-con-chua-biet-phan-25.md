![](https://images.viblo.asia/604fce4c-7de4-4b42-ae25-c4a4817c1679.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 25 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1. `animation-play-state` làm animation đẳng cấp hơn.

Ở các tips trước, mình cũng hay viết về `animation` như:

- [Giảm hiệu ứng animation để trang web nhẹ hơn](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-19-WAyK80JoKxX#_1-may-em-yeu-lam-em-muon-tat-animation-tren-web-di-thi-phai-lam-sao-0)
- Hay là [viết keyframe ngắn hơn](https://viblo.asia/p/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-phan-19-WAyK80JoKxX#_2-viet-keyframes-ngan-hon-1)

Hôm nay mình khám phá ra 1 cách sử dụng hay của `animation` nữa, muốn giới thiệu đến các bạn.

Mình đã gặp một kiểu UI play nhạc như thế này

> Giống như trình player nhạc của các trang `mp3.zing` hay `nhaccuatui`. Ở đây mình demo nhanh, nên UI trông không đẹp lắm :smile: 

{@codepen: https://codepen.io/tinhh/pen/ExPrKro}

Với kiểu làm trên, khi add/remove class `playing`, hiệu ứng `spinner` (quay vòng tròn) trở về điểm xuất phát khi đang quay giữa chừng trông khá thô và xấu.

Thay vì đó, mình đã sử dụng `animation-play-state` và cho init animation từ ban đầu, khi add/remove class `playing` thì chỉ switch giữa 2 value của thuộc tính trên là `paused`/`running` thôi.

Hãy xem demo bên dưới sau khi đã áp dụng thuộc tính trên.

{@codepen: https://codepen.io/tinhh/pen/OJMdXmN}

#### Đọc hiểu thêm

- https://twitter.com/sulco/status/1276127207409188865
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state

### 2. Thiết bị tablet/mobile thì không ăn CSS :hover được?

Từ những ngày đầu tiếp xúc với web, mình nhớ nhất cái thư viện có tên [Modernizr](https://modernizr.com/), chuyên dùng để **detect** các kiểu như:

- Trang web có bật JS không?
- Thuộc tính CSS3 này có được hỗ trợ trên trình duyệt này không?
-  Hoặc thiết bị này có hỗ trợ touch không?

Nhưng vài năm trở lại đây, khi sự phổ biến của CSS3, rồi thêm sự phát triển của CSS level 4 đang dần tiến vào các browsers hiện đại, thì thư viện này ít được biết tới và đôi khi những tính năng của nó với thời điểm hiện tại không còn nhiều nổi bật nữa.

Giờ đây, CSS đã hỗ trợ kiểu media query `@media(hover: none)` giúp detect được đâu là thiết bị có touch rồi.

*(Đọc đoạn media query trên theo kiểu dễ hiểu là "Những thiết bị không có trạng thái hover (hover = none), thì đó là thiết bị có touch"  :smile:)*

Hãy xem qua ví dụ bên dưới, để hiểu thêm trường hợp nào cần phải dùng đến tính năng này nhé!

> Button hover vào có icon, nhưng responsive về các thiết bị có touch như tablet/mobile thì không có hành vi hover, nên mình muốn show icon đó ra luôn.

Đoạn code của chúng ta sẽ trông như sau:

```scss
button {
    ...

    i {
        opacity: 0;
    
        @media(hover: none) {
            opacity: 1;
        }
    }
  
    &:hover {
        i {
            opacity: 1;
        }
    }
}
```

> Hãy thử xem đoạn code này trên máy tính và thiết bị mobile của bạn -> sẽ thấy sự khác biệt. Hoặc bạn có thể dùng simulator của Chrome để xem được.

{@codepen: https://codepen.io/tinhh/pen/wvMNzwr}

Đây là kết quả khi xem trên Simulator (giả lập mobile)

![](https://images.viblo.asia/7605f826-0193-4608-a993-887213a8c608.png)

#### Đọc hiểu thêm

- https://stackoverflow.com/questions/40532204/media-query-for-devices-supporting-hover
- https://caniuse.com/#feat=css-media-interaction
- https://twitter.com/frontendmentor/status/1277951814508392450
- https://twitter.com/aaroniker_me/status/1278018931987492864

### 3. `background-repeat: round` repeat ảnh không bị đứt.

`background-repeat` là 1 thuộc tính không quá xa lạ với dân Web Developer, từ trước giờ mình cũng chỉ biết nó đang có những  value như `repeat`, `repeat-x`, `repeat-y` và `no-repeat`.

[Một hôm lướt Twitter thì mới biết thêm 1 value mới đó là `background-repeat: round`](https://twitter.com/addyosmani/status/1275322697933881344)

Hãy cùng xem sự khác nhau nó là như nào nhé!

`background-repeat: repeat` sẽ làm cho ảnh nền của bạn bị cắt đứt như thế này

{@codepen: https://codepen.io/tinhh/pen/wvMNzPj}

`background-repeat: round` sẽ tự động tính toán và resize ảnh nền tương ứng với kích thước có được mà không để ảnh bị cắt đứt

{@codepen: https://codepen.io/tinhh/pen/abdXmqv}

Dưới đây là 1 vài demo thú vị làm được với `background-repeat: round`

{@codepen: https://codepen.io/team/shoptalkshow/pen/mdyEGPm}

{@codepen: https://codepen.io/team/css-tricks/pen/mNBrNG}

#### Đọc hiểu thêm

- https://www.impressivewebs.com/space-round-css-background/
- https://css-tricks.com/almanac/properties/b/background-repeat/
- https://caniuse.com/#feat=background-repeat-round-space

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!