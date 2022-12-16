### 1. Giới thiệu về parallax scrolling

- Kỹ thuật Parallax Scrolling được Ian Coyle tạo ra và áp dụng lần đầu tiên vào năm 2011 và cho đến hôm nay vẫn còn đang được sử dụng rộng rãi cho nhiều website trên thế giới.

- “[Parallax](https://en.wikipedia.org/wiki/Parallax)” là từ thường được dùng trong video games 2D, sử dụng nhiều hình ảnh nền rồi cho chúng cùng lúc di chuyển song song với những tốc độ khác nhau, tạo ra ảo giác về chiều sâu khi nhìn vào.
- Đối với Web Design thì [parallax scrolling](https://en.wikipedia.org/wiki/Parallax_scrolling) được dùng để tạo hiệu ứng 3 chiều với các element liên tục thay đổi vị trí khi người dùng có thao tác cuộn chuột.

### 2. Ưu điểm của parallax scrolling trong xây dựng website

- Đem đến cho người truy cập những trải nghiệm tuyệt vời về độ sâu của trang web và hình ảnh động
- Tiếp cận người dùng bằng một phương thức mới mẻ và thú vị: kể chuyện thông qua website
- Người truy cập có thể thăm quan toàn bộ trang web chỉ bằng 1 thao tác là cuộn trang
- Kích thích trí tò mò
- Tăng uy tín của website với sự tương tác mới, đầy sáng tạo

### 3. Xây dựng webpage đơn giản sử dụng Parallax scrolling chỉ với css

- Markup HTML:

```HTML
    <div id="title" class="section header">
        <h1>Framgia Vietnam</h1>
        <p>Hình tượng mà Framgia muốn hướng đến</p>
        <h2>"Tập đoàn IT chuyên nghiệp có trình độ kĩ thuật số một châu Á"</h2>
    </div>
    <div id="section1" class="section">
        <div class="text">
            <h3>Đưa Việt Nam đi lên bằng IT</h3>
            <p>Việt Nam là quốc gia chú trọng giáo dục và .....</p>
        </div>
    </div>
```

+ "section" là class cơ bản của trang web, chúng ta có thể tạo nhiều section và các section sẽ được "move" khi người dùng cuột trang
- CSS

```CSS
    html {
        height: 100%;
        overflow: hidden;
    }
    body {
        margin: 0;
        padding: 0;
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        perspective: 1px; /* set viewport perspective */
    }
    .section {
        position: relative;
        padding: 20% 10%;
        min-height: 100%; /* Đảm bảo background luôn hiển thị full page */
        width: 100%;
        box-sizing: border-box;
        box-shadow: 0 5px 1px rgba(0, 0, 0, .7), 0 -5px 1px rgba(0, 0, 0, .7);
        background: 50% 50% / cover;
    }
    /* Tạo style cho text */
    .text {
        width: 50%;
        padding: 10px 50px;
        border-radius: 5px;
        background: rgba(200,200,200, .7);
        box-shadow: 0 0 10px rgba(0, 0, 0, .8);
    }

    #section1 .text {
        margin-left: auto;
        margin-right: auto;
    }
```

- Phần quan trọng nhất là sử lý việc di chuyển các section

```CSS
    #title {
        background-image: url('image1.png');
        background-attachment: fixed; /* Cố định background, move section sau section đè lên nó */
    }

    #section1 {
        background-image: url("image2.png");
        transform: translateZ(-1px) scale(2);
        /* scale = 1 + (translateZ * -1) / perspective với perspective được đặt ở trên*/
        z-index: -1; /* section này sẽ nằm đè lên các section trước và sau nó (khi  cuộn trang)*/
    }
```

{@codepen: https://codepen.io/nhatanhchan/pen/RJbbBj}

### 4. Tổng kết

- Với kỹ thuật parallax scrolling, trang web của chúng ta sẽ sinh động, đơn giản hơn, đồng thời chúng ta dễ truyền tải những thông điệp cần thiết tới người dùng mọt cách nhanh và đơn giản nhất
- Giới thiệu một số trang web sử dụng kỹ thuật parallax scrolling
    - [Sony](http://www.sony.com/be-moved/): kỹ thuật parallax scrolling được sử dụng một cách triệt để cùng với animations thể hiện quá trình lắp ráp tạo nên các sản phẩm của họ ![sonypara1.jpg](https://images.viblo.asia/b4d354f1-e722-41c7-b57b-bd3f1c62cf4b.jpg)

    - [The Lab](http://www.dementialab.org/discovery-lab/): Một cách rất hay khi chúng ta giới thiệu cơ cấu cũng như mô hình của một công ty hay doanh nghiệp![ar3(1).jpg](https://images.viblo.asia/484f887f-d9be-4baf-b8b2-86a54a3c0642.jpg)

    - [Peugeot Hybrid4](http://graphicnovel-hybrid4.peugeot.com/start.html): Giới thiệu về game theo phong cách kể truyện, kết hợp giữa parallax theo chiều dọc và ngang của màn hình ![06parallax.jpg](https://images.viblo.asia/fa6363dc-f6ab-46b1-8ce5-3afa8397d7f9.jpg)