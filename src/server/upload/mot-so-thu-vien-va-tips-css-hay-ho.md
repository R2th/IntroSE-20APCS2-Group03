1. **Clip-path maker**
- Khi bạn cắt giao diện một trang web hoặc một ứng dụng mà bạn thích cũng có khi bản rảnh quá ngồi nghịch tý css cho tăng level lên một tầm cao mới chắc chắn có khi bạn đã gặp trường hợp cắt một hình ảnh theo một hình dạng nào đó. Giải pháp như sau:

    A: -  ê bồ tèo, tao đang cắt giao diện mà gặp một cái ảnh nó có hình ngũ giác thì tao phải làm thế nào!

    B: - mày có giải pháp nào chưa? nói cho tao nghe xem nào?

    A: - trước tao vẫn hay dùng photoshop cắt ra cái hình đó theo cái dạng mà tao muốn rồi up lên thôi.

    B: - vãi mày, thế sau mày không thích cái đó nữa muốn thay cái khác lại ngồi chỉnh tay thủ công như thế à!

    A: - thế mày có cách nào không chỉ tao phát?

    B: - Trước tao có làm với thuộc tính **clip** của **css** nó giúp mày được đó. nó là thuộc tính cho phép bạn chỉ định một vùng cụ thể của một phần tử để hiển thị lên chính là cái vùng của hình mà mày muốn cắt đó.
Mày xem tao viết cái ví dụ dưới đây nhé:
    ```
    .clip-element {  
      position: absolute; /* ở phiên bảo trước dùng clip thì phải khai báo thêm position là absolute hoặc fixed */
      clip: rect(110px, 160px, 170px, 60px);  /* hoặc "auto" */
      /* giá trị của điểm phía trên bên trái và phía dưới bên phải */

      /* hiện tại thì đếch cần khai báo position nữa ahihi */
      clip-path: inset(10px 20px 30px 40px); /* hoặc "auto" */
      /* giá trị của vị trí trên, phải, dưới và trái */
    } 
    ```
    
    Dưới đây là demo này https://codepen.io/vuductuyen/pen/pVmqyZ
    Bạn thử thay đổi giá trị của thuộc tính clip-path nhé.
    
    dành cho những bạn nào lười chỉnh tay đã có 1 tool hỗ trợ việc trên nhé bạn có thể dùng ở đây http://bennettfeely.com/clippy/
    
2. **Flex box**
    
    A: ê ông có biết flexbox không chỉ tôi với. tôi đang chia cái layout đọc và paste vào thì xài được rồi. nhưng mấy chỗ thì hơi khó hiểu ông biết chỉ tôi nhé.
    
    B: cái này tôi cũng dùng khá nhiều nên cũng biết chút ít. để tôi chỉ cho ông nhé!
    - Hẳn là đã nhiều người không còn lạ lẫm gì cái thuộc tính này nữa, dùng nó nhiều khi lại nghiện :v:.
    - ông cứ hiểu đơn giản là nó bố cục lại các phần tử trong trang web của bạn cho nhanh.
    ![](https://images.viblo.asia/38a27079-a3d1-4bea-ad1e-dc5c94814145.jpeg)
    Nhiều người hỏi nó tiện lợi ở chỗ nào vì bạn vẫn có thể dùng bootstrap để chia lại giao diện theo row và col như làm từ xưa đến nay. Đặc điểm chính của thằng này là có khả năng điều chỉnh kích thước của các phần tử con để lấp đầy khoảng trống một cách hiệu quả nhất trên các kích thước màn hình khác nhau.
    một ví dụ đơn giản nhé:
    
        ![](https://images.viblo.asia/3ae496a4-b8a7-4b21-aa72-0819f708e0e5.gif)
        
đó là lý thuyết đó! thực hành thì ông chịu khó đọc kỹ bài viết này nhé! ông sẽ hiểu sâu về thuộc tính flexbox nhé https://hoclaptrinh.vn/posts/huong-dan-toan-tap-ve-flexbox
    
 à vài link dưới đấy nhé! tập luyện tay để thành pro hơn nhé!
    https://flexboxfroggy.com/#vi
    
3.