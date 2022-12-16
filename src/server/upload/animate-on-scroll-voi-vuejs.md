Trong bài viết này mình xin giới thiệu đến mọi người 1 thư viện khá hữu ích đó là AOS (Animation on Scroll)
AOS là thư viện javascript giúp chúng ta tạo các animation cho các element khi scroll lên/xuống đến vị trí của element đó.
Bạn có thể xem DEMO tại: https://michalsnik.github.io/aos/
# Cài đặt và config AOS
**1. Cài đặt AOS**

Cài đặt aos khá đơn giản thông qua npm: 
```
npm install --save aos@next
```
**2.  Config AOS**
- Đầu tiên ta cần import AOS để sử dụng:
- Tại main.js ta thêm:
import AOS from 'aos'
import 'aos/dist/aos.css'
Để import aos và file css của nó cho ứng dụng của mình, tiếp theo ta cần thêm vào main.js lệnh init Aos vào created để AOS được khởi tạo
```
  created () {
    AOS.init()
  }
```
File main.js sẽ như sau
![](https://images.viblo.asia/56182e92-f526-4c93-b205-bee7610b121f.jpg)
- AOS cũng cung cấp cho ta các tùy chỉnh khác nhau ta có thể truyền vào thông qua AOS.init để set các giá trị mặc định cho aos, mình sẽ giới thiệu 1 số config hay sử dụng như:
```
AOS.init({
  // Global settings:
  disable: false, // disable data aos nhận các giá trị như: 'phone', 'tablet', 'mobile', boolean, expression or function
  initClassName: 'aos-init', // Tên class được thêm vào element sau khi aos init
  animatedClassName: 'aos-animate', // Tên class áp dụng animation
  
  // Một số giá trị mặc định có thể override lại.
  offset: 120, // Khoảng cách đến điểm kích hoạt animation của element (px)
  delay: 0, // thời gian delay mặc định
  duration: 400, // duration mặc định cho animatione
  easing: 'ease', // easing mặc định cho animations
  once: false, // chỉ trigger animation 1 lần duy nhất
});
```
**3. Set animation cho element với data-aos attribute**
- Để thêm animation khi scroll đến 1 element ta chỉ việc set attribute data-aos cho nó và tùy chỉnh các giá trị mà mình muốn
```
  <div
    data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-once="false"
    data-aos-anchor-placement="top-center"
  >
  </div
```
Chỉ vài dòng lệnh đơn giản bạn đã khiến cho trang web của mình linh hoạt, bớt đi nhàm chán. Bạn có thể tham khảo thêm các animation tại đây: https://github.com/michalsnik/aos
# Custom animation
Ngoài các animation mặc định của aos bạn có thể custom animation theo ý mình bằng cách thêm css như sau:
```
[data-aos="new-animation"] {
  opacity: 0;
  transition-property: transform, opacity;

  &.aos-animate {
    opacity: 1;
  }

  @media screen and (min-width: 768px) {
    transform: translateX(100px);

    &.aos-animate {
      transform: translateX(0);
    }
  }
}
```
Sau đó chỉ việc gán data-aos="new-animation" vào element mà bạn muốn
# Data-aos-id và js event
- Một điểm mình thấy khá hay mà aos hô trợ đó là data-aos-id và js event
- Mặc định AOS hỗ trợ cho chúng ta 2 event là aos:in và aos:out khi animation được kích hoạt/kết thúc. Hoặc ta có thể gán data-aos-id cho element đó và sẽ có event tưởng ứng là aos:in:AOS_id_của_element
- Dựa vào đó ta có thể thêm các animation hoặc trigger các sự kiện khác mà mình muốn.
```
document.addEventListener('aos:out', ({ detail }) => {
  console.log('animated out', detail);
});
```
# Kết
Trên đây là những chia sẽ của mình về thư viện aos, mong rằng những kiến thức mình chia sẽ có thể giúp ích cho các bạn, nếu có gì sai xót hoặc thắc mắc các bạn có thể góp ý cho mình comment phía dưới nhé.
Tài liệu tham khảo: https://github.com/michalsnik/aos