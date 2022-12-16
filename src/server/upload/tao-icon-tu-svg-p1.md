Trong thế giới lập trình, việc sử dụng **icon** trong việc hiển thị luôn luôn xuất hiện. **Icon** được chèn vào các **button** để miêu tả chức năng của **button** đó, được chèn vào các thẻ **link**. Việc sử dụng là cực kỳ phổ biến, giúp cho người dùng có cái nhìn và trải nghiệm tốt hơn khi sử dụng phần mềm. Các **icon** giúp cho trang web của chúng ta trở nên **"awesome"**, chỉ thị chức năng và đi kèm với các hiệu ứng đẹp mắt làm kích thích người dùng ở lại với trang web của chúng ta.

![](https://images.viblo.asia/beafc789-9e2b-4f22-8484-472c702ab348.jpg)

Việc sử dụng icon trong lập trình rất đơn giản và có rất nhiều thư viện icon cho chúng ta lựa chọn, như [fontawesome](https://fontawesome.com/), [flaticon](https://www.flaticon.com/), [icomoon](https://icomoon.io/),... Tuy nhiên đời không như là mơ, đôi khi các designer thiết kế ra các icon rất lạ, mà tất cả thư viện trên không hỗ trợ , hay đơn giản là chúng ta không tìm thấy được. Vậy cách giải quyết như thế nào, mình sẽ giúp các bạn.
### SVG
SVG là thứ được sử dụng trong trường hợp này, hãy mở file thiết kế của trên phần mềm bạn ( Adobe Xd, Zeplin, Figma,...) và chọn chức năng **export svg**. Sau khi đã có file icon **svg**, giờ là tới lúc sử dụng nó.

![](https://images.viblo.asia/b9a923a5-6293-465e-bffa-b3f2202a4a19.png)

1. ### Sử dụng SVG như thẻ <img />
    ```html
    <img src="angle.svg" alt="Angle icon">
    ```
    Với cách này, bạn có thể style cho nó giống như một thẻ **<img/>** bình thường (cho nên thuộc tính **fill** cũng không được áp dụng ). Cách này hỗ trợ ở tất cả các trình duyệt nên bạn hãy yên tâm khi sử dụng
    {@embed: https://codepen.io/chriscoyier/pen/lCEux}
 2. ### Sử dụng SVG với background-image
    Gần giống như cách trên, bạn có thể sử dụng **svg** bên trong **css**.
    ```html
    <a href="/" class="logo">Kiwi Corp</a>
    ```
    ```css
    .logo {
      display: block;
      text-indent: -9999px;
      width: 100px;
      height: 82px;
      background: url(kiwi.svg);
      background-size: 100px 82px;
    }
    ```
    ***Chú ý:*** Mình phải sử dụng **background-size**, nếu không **icon** của mình chỉ hiển thị 1 góc nhỏ phía trên của **svg** như thế là không đạt yêu cầu. Cách này vẫn được **support** ở tất cả **browser**.
3. ### Sử dụng trực tiếp thẻ <svg>
    Cách này chúng ta dùng trực tiếp thẻ **<svg>** để hiển thị, việc của chúng ta là copy tất cả những gì hiển thị trong file **svg** và dán vào **html** là xong, tương tự như các thẻ **html** khác.
    
    ![](https://images.viblo.asia/2d29d468-324c-45ff-92b4-4ebecdbcdb77.png)
    
    {@embed: https://codepen.io/hunh-c-ph/pen/YzXGYPY}
4. ### Sử dụng SVG như là <object/>
    Thay vì sử dụng **<img/>**, **background-image** như ở trên, chúng ta có thể sử dụng thẻ **<object/>** để thay thế.
    ```html
    <object type="image/svg+xml" data="kiwi.svg" class="logo">
      Kiwi Logo <!-- fallback image in CSS -->
    </object>
    ```
    ```css
    .logo {
      width: 200px;
      height: 164px;
      background-image: url(kiwi.png);
    }
    ```
5. ### Sử dụng webfont icon
    Những cách trên rất nhanh gọn khi bạn sử dụng rất ít **icon**, trong trường hợp chúng ta có trên **20 icon** thì phải làm như thế nào. Sử dụng **webfont icon** là cách cuối cùng. Có nhiều công cụ để giúp ta hoàn thành việc này nhanh chóng, mình xin giới thiệu [icomoon](https://icomoon.io/app/#/select) và [fontello](http://fontello.com/).
    
    Hai công cụ này rất nhanh gọn và có nhiều tuỳ biến, có thể upload số lượng lớn file **svg** trong 1 lần duy nhất. Sau khi upload file và tải về **ưebfont icon** của mình, bạn có sẵn một folder đã được tạo sẵn. Việc tiếp theo là giải nén và sử dụng.
   
    ***Lưu ý:*** Để sử dụng các **Icon** được tạo ra từ 2 công cụ này ta cần sử dụng **unicode character**
    ```html
    <i class="demo-icon icon-hand">&#xe814;</i>
    ```
    ![](https://images.viblo.asia/e7e78d32-d9d5-4dcd-a2ee-7354f4783e8d.png)
    
    Tới đây là hết phần 1, ở phần tiếp theo mình sẽ hướng dẫn các bạn tạo và sử dụng **icon** của mình ngay trong **project** với **gulp** và một số công cụ khác.
    ### Tham khảo 
    * [Css-tricks](https://css-tricks.com/using-svg/)