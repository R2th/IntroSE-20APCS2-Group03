[Particles.js](https://vincentgarreau.com/particles.js/) là một thư viện Javascript dùng để tạo ra hiệu ứng các hạt chuyển động. Particles.js là một thư viện mã nguồn mở và bạn có thể tạo ra các trang web dạng LandingPage đẹp mắt hoặc tạo ra hiệu ứng cho các phần của trang web. Trong bài viết này, mình sẽ chia sẻ cách sử dụng thư viện Particles.js trong dự án web của bạn.

**Bước 1:**


Truy cập vào trang web chính thức của [Particles.js](http://vincentgarreau.com/particles.js/). Trang web có một bản demo đẹp với các số liệu thống kê và các tùy chọn để sử dụng thư viện.

![](https://images.viblo.asia/17968f55-1807-497b-ab7a-0bd34e0ddb90.jpg)

**Bước 2:**


Tải xuống thư viện Particles.js sử dụng GitHub hoặc nút Download trên trang web.

![](https://images.viblo.asia/50ca40bf-4e8b-4bdd-b4b9-91b6a3192ad7.png)



**Bước 3:**


Chúng ta tiến hành giải nén tập tin sau khi tải về. Bạn sẽ thấy thư viện với nhiều tệp và một thư mục demo. Bạn có thể sử dụng tệp **particles.js** hoặc **particles.min.js**. Copy tập tin với đuôi mở rộng **.js** vào dự án của bạn.

![](https://images.viblo.asia/7c4b8bd1-8a57-4a8b-ad5d-aa369121193c.png)

**Bước 4:**


Bây giờ, chúng ta tạo ra một tập tin HTML sẽ hiển thị các hạt. Thêm tập tin particles.js vào cuối tập tin HTML.

```
<!DOCTYPE html>
<html>

<head>
  <title>Particles.js Demo</title>
</head>

<body id="particles-js">
  <img src="framgia-logo.png" id="logo">
  <script src="particles.js"></script>
</body>

</html>
```

**Bước 5:**


Tạo một tập tin CSS để định dạng trang HTML. Ở đây, chúng ta chỉ thay đổi màu nền và căn giữa hình ảnh của bản demo.
```
body {
    background: cornflowerblue;
  }

  #logo {
    margin: 0 auto;
    text-align: center;
    left: 45%;
    top: 45%;
    position: absolute;
  }
```

**Bước 6:**


Bây giờ chúng ta sẽ cấu hình thư viện. Phần tốt nhất của thư viện Particles.js là nó hỗ trợ giao diện GUI trực quan, nơi bạn có thể thiết lập các tùy chọn của mình và tạo tệp JSON cấu hình. Chúng ta hãy xem xét các lựa chọn khác nhau. Tùy chọn đầu tiên là chọn loại hạt. Bạn có thể chọn từ Default, NASA, Bubble, Snow, Nyan Cat. Ở đây chúng ta dùng tùy chọn Default. Tùy chọn thuộc tính hạt cho phép bạn thiết lập một số tùy chọn như số, màu sắc, hình dạng, kích thước,…

![](https://images.viblo.asia/c4db506a-b0f3-45fb-89c3-68b4d2cba966.png)

**Bước 7:**

Sau khi hoàn tất, tải tệp tin JSON bằng cách nhấp vào **Download current config (json)**. Tệp JSON chứa các thuộc tính hạt.

```
{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
```

**Bước 8:**

Cuối cùng, thêm thuộc tính JSON vào tập tin HTML của bạn. Để làm điều này, hãy tạo một thẻ script và dán các thuộc tính JSON.

```
  <script>
    particlesJS("particles-js", dán nội tập tin JSON đã tải về ở trên vào đây);
  </script>
```

Thêm đoạn mã này vào cuối thẻ body và thêm và **id="particles-js"** vào phần tử bạn muốn hiển thị các hạt. Ở đây chúng ta đặt thuộc tính **id="particles-js"** vào thẻ body. Chúng ta nhận được kết quả như sau:


![](https://images.viblo.asia/61221ef8-3aa5-4b85-ae9b-6fd5ec5d2a34.jpg)

Các bạn có thể tham khảo code ở đây: [Download Code](https://drive.google.com/open?id=1sW_go9kUeSXz6kip5Z4O7SAlvjGRoUhO)

Nguồn tham khảo: [https://readmenow.in/add-particles-js-web-project](https://readmenow.in/add-particles-js-web-project)