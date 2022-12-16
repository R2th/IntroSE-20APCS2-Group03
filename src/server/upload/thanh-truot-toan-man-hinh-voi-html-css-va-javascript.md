Trong bài viết này, chúng ta sẽ xây dựng một thanh trượt Toàn màn hình bằng HTML, CSS và JavaScript.

## HTMl
```
    <main>
      <div class="slider">
        <div class="slider--content">
          <button class="slider__btn-left">
            <i class="fas fa-angle-left"></i>
          </button>
          <div class="slider--feature">
            <h1 class="slider--title">Tasty</h1>
            <p class="slider--text"></p>
            <button class="slider--btn">Get started</button>
          </div>
          <button class="slider__btn-right">
            <i class="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
    </main>
```
Sau đó, giữ các thành phần trượt trong `.slider` lớp. Chúng ta cũng sẽ cần hai nút để có thể chuyển đến slide tiếp theo hoặc trước đó. Các` .slider--feature` sẽ tổ chức tiêu đề và mô tả của các yếu tố trượt.

Nhân tiện, ta sử dụng Font awesome cho các biểu tượng, vì vậy bạn sẽ cần tạo một tài khoản ở đây sau đó thêm liên kết vào thẻ head.

## CSS
Như thường lệ, chúng ta bắt đầu CSS bằng cách thực hiện một số thiết lập lại.

```
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  background: #444;
}
```

Sau đó, thay đổi nền, họ phông chữ và nhập phông chữ

```
.slider {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
}

.slider--content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.slider--feature {
  text-align: center;
}

.slider--title {
  font-size: 2.5rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
}

.slider--text {
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  margin: 0.5rem 0;
}
```

Sau đó, chúng ta sử dụng `.slider` lớp để tạo thành phần trượt bằng cách sử dụng toàn bộ chiều rộng và chiều cao của khung nhìn và chuẩn bị nó để nhận hình ảnh sau này làm nền với sự trợ giúp của javaScript.

Sau đó, thiết lập `display:flex` và `justify-content:space-between` đến `.slider--content` lớp để phân phối các phần tử công bằng theo không gian có sẵn.

```
.slider__btn-right,
.slider__btn-left {
  background: transparent;
  border: none;
  outline: none;
  font-size: 4rem;
  color: #eee;
  padding: 0 1rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
}

.slider--btn {
  background: #fff;
  text-transform: uppercase;
  border: none;
  color: #444;
  border: 1px solid #444;
  outline: none;
  font-weight: 700;
  padding: 0.8rem 2rem;
  cursor: pointer;
}

.slider__btn-left:hover,
.slider__btn-right:hover {
  transform: scale(0.95);
}
```

Như bạn có thể thấy, khối mã này được sử dụng để tạo kiểu cho các nút. Các lớp `.slider__btn-right`và `.slider__btn-left`giúp chúng ta tạo kiểu cho nút trái và phải của `slide`. Chúng ta cũng sử dụng `transition: transform 0.1s ease-in-out`để tạo một hiệu ứng quy mô nhỏ khi di chuột qua` transform: scale(0.95)`. Và` .slider--btn`lớp được áp dụng cho nút gọi hành động để có một phong cách đẹp.

```
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fadeIn {
  animation: fadeIn 1s;
}
```

Ở đây, chúng ta sử dụng `@keyframes`để áp dụng độ mờ trong hình ảnh động cho phần tử` slide`. Và` .fadeIn`lớp sẽ được thêm vào slide một cách linh hoạt khi có sự thay đổi.
## 
## JavaScript
Như thường lệ, chúng ta bắt đầu phần JavaScript bằng cách chọn các yếu tố cần thiết.

```
const slideContainer = document.querySelector('.slider');
const sliderText = document.querySelector('.slider--text');
const btnLeft = document.querySelector('.slider__btn-left');
const btnRight = document.querySelector('.slider__btn-right');

const sliderImages = [
  {
    src: 'https://drive.google.com/uc?id=1BzhhKeOc9XyZMPXnZAi_JiOYdZrwLYu-',
    text: 'Taste the magic'
  },
  {
    src: 'https://drive.google.com/uc?id=1M1TR1HjJCj-TuOa54jzty8QK9QUdNfSC',
    text: 'Taste the incredible'
  },
  {
    src: 'https://drive.google.com/uc?id=1twyebwsDDBtPiyFHxTIf9P26sDGiq5Qi',
    text: 'Taste the dream'
  }
];

let slideCounter = 0;
```

Sau đó, chúng ta tạo ra một mảng các hình ảnh sẽ được sử dụng làm hình nền cho slide. Ngoài ra, khai báo biến `slideCounter`để có thể đếm số lượng slide.
```
const startSlider = () => {
  slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ), url(${sliderImages[0].src})`;
  sliderText.innerHTML = sliderImages[0].text;
};
```

Các` startSlider()`chức năng sẽ thiết lập các hình ảnh đầu tiên của `sliderImages`mảng như nền cho slide. Ta cũng tạo kiểu cho nền `linear-gradient()`để làm ta hình ảnh một chút và cuối cùng nối thêm văn bản đầy đủ vào thành phần slide.


```
btnRight.addEventListener('click', function() {
  if (slideCounter === sliderImages.length - 1) {
    slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ), url(${sliderImages[0].src})`;
    sliderText.innerHTML = sliderImages[0].text;
    slideCounter = -1;

    slideContainer.classList.add('fadeIn');
    setTimeout(() => {
      slideContainer.classList.remove('fadeIn');
    }, 1000);
  }
  slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
      ),url(${sliderImages[slideCounter + 1].src})`;
  sliderText.innerHTML = sliderImages[slideCounter + 1].text;
  slideCounter++;
  slideContainer.classList.add('fadeIn');
  setTimeout(() => {
    slideContainer.classList.remove('fadeIn');
  }, 1000);
});
```
Ở đây, chúng ta nghe một sự kiện nhấp chuột vào nút bên phải trên slide. Sau đó, chúng ta kiểm tra xem bộ đếm (slideCorer) có bằng với slide cuối cùng không. Nếu đúng như vậy, hãy khởi động lại slide với hình ảnh và văn bản đầu tiên của mảng. Sau đó, thêm `fadeIn`lớp để tạo hiệu ứng cho slide trên lối vào.

Sau đó, nếu bộ đếm (slideCorer) không bằng slide cuối cùng, chúng ta có thể đặt slide tiếp theo với dữ liệu phù hợp và tăng `slideCounter`biến và cuối cùng xóa hoạt hình sau 1 giây để có thể làm động lại nó.

```
btnLeft.addEventListener("click", function() {
  if (slideCounter === 0) {
    slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ),url(${sliderImages[sliderImages.length - 1].src})`;
    sliderText.innerHTML = sliderImages[sliderImages.length - 1].text;
    slideCounter = sliderImages.length;
    slideContainer.classList.add("fadeIn");
    setTimeout(() => {
      slideContainer.classList.remove("fadeIn");
    }, 1000);
  }

  slideContainer.style.backgroundImage = `linear-gradient(
      to right,
      rgba(34, 34, 34, 0.4),
      rgba(68, 68, 68, 0.4)
    ),url(${sliderImages[slideCounter - 1].src})`;
  sliderText.innerHTML = sliderImages[slideCounter - 1].text;
  slideCounter--;
  slideContainer.classList.add("fadeIn");
  setTimeout(() => {
    slideContainer.classList.remove("fadeIn");
  }, 1000);
});

startSlider();
```

Như bạn có thể thấy ở đây, chúng ta sử dụng quy trình tương tự để thay đổi slide bằng nút bên trái ngoại trừ thực tế là chúng ta kiểm tra xem bộ đếm có bằng không. Và nếu đó là trường hợp, đi đến slide cuối cùng. Sau đó, nếu không, đi đến slide trước và giảm biến đếm.

Và cuối cùng, bắt đầu thanh trượt với `startSlider()`chức năng.

[DEMO](https://codepen.io/hungbnx-1830/pen/oNNVVyB)


Nguồn tham khảo : https://dev.to/ibrahima92/fullscreen-slider-with-html-css-and-javascript-4odn