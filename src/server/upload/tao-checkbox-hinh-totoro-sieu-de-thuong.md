Trong bài viết này tôi sẽ giới thiệu cách để làm một checkbox siêu dễ thương, hình dáng giống Totoro, con vật trong bộ anime kinh điển của Nhật Bản "Hàng xóm của tôi là Totoro", kết quả như hình dưới đây:

![](https://images.viblo.asia/aaa40c87-b95c-4bcf-804d-a39c3c6e6d7b.gif)

### Mã HTML
Cấu trúc HTML như sau:
```html
<!-- Div container -->
<div class='wrap'>
  <input type='checkbox'>
  <!-- HTML cho Totoro -->
  <div class='totoro'>
    <!-- Hai Tai -->    
    <div class='ears'>
      <div class='ear'></div>
      <div class='ear'></div>
    </div>
    <!-- Hai Tay -->  
    <div class='arm'></div>
    <div class='arm'></div>
    <!-- Hai Chân -->  
    <div class='foot'></div>
    <div class='foot two'></div>
    <div class='body'>
      <!-- Các đốm -->  
      <div class='spots'>
        <div class='spot'></div>
        <div class='spot'></div>
        <div class='spot'></div>
        <div class='spot'></div>
        <div class='spot'></div>
        <div class='spot'></div>
        <div class='spot'></div>
      </div>
      <!-- Phần mặt -->
      <div class='inner'>
        <!-- Mũi -->  
        <div class='nose'></div>
        <!-- Miệng -->  
        <div class='mouth'></div>
        <!-- Hai mắt -->  
        <div class='eye'></div>
        <div class='eye two'></div>
      </div>
    </div>
  </div>
</div>
```
### Mã CSS (SCSS)

**Style chung**
```css
$g: #bbb;
$b: #222;
$y: #ffffff;
$gr: #a6cd52;

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  perspective: 600px;
  background: radial-gradient(
    circle at center,
    lighten($gr, 20%),
    darken($gr, 10%)
  );
  overflow: hidden;
  * {
    transform-style: preserve-3d;
  }
}  

//Style cho box container
.wrap {
  width: 275px;
  height: 100px;
  position: relative;
  box-shadow: 0 0 0 2px #eee, 0 0 40px 0px rgba(0, 0, 0, 0.15);
  border-radius: 500px;
  background: #fff;
  * {
    transition: 0.25s linear;
  }
}
```
**Tiếp đến là style cho Totoro**
```css
.totoro {
  position: absolute;
  width: 100px;
  height: 150px;
  left: 0px;
  top: -30px;
  background: $g;
  border-radius: 170px 170px 100px 100px / 300px 300px 200px 200px;
  z-index: 2;
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 300vw;
    height: 300vh;
    left: -100vw;
    top: -100vh;
    background: rgba(6, 61, 109, 0.75);
    z-index: -1;
    transform: translateZ(-10px);
    opacity: 0;
    transition: 0.5s ease-in-out;
    pointer-events: none;
  }
  &:after {
    z-index: 2;
    transform: translateZ(10px);
  }
}  

//Style cho tai
.ears {
  position: absolute;
  width: 90%;
  height: 40px;
  left: 5%;
  .ear {
    position: absolute;
    width: 10px;
    height: 25px;
    background: $g;
    top: -10px;
    left: 7.5px;
    border-radius: 700px 700px 500px 500px / 2750px 2750px 500px 500px;
    &:after {
      content: "";
      position: absolute;
      width: 4px;
      height: 15px;
      background: $g;
      left: calc(50% - 2px);
      bottom: -15px;
    }
    &:nth-of-type(2) {
      left: auto;
      right: 7.5px;
    }
  }
}
//Style cho chân
.foot {
  width: 40px;
  height: 20px;
  background: $g;
  position: absolute;
  bottom: 0;
  left: 5px;
  border-radius: 300px 200px 200px 200px / 200px 100px 100px 100px;
  transform-origin: top right;
  transform: rotate(0deg) scaleY(1) scaleX(1);
  &.two {
    left: auto;
    right: 5px;
    transform-origin: top left;
    border-radius: 200px 300px 200px 200px / 100px 200px 100px 100px;
  }
}

//Style cho tay
.arm {
  width: 25px;
  height: 60px;
  background: $g;
  position: absolute;
  left: 0px;
  z-index: -1;
  top: 50px;
  border-radius: 550px 100px 400px 400px / 700px 200px 600px 800px;
  transform: rotate(10deg);
  transform-origin: top right;
  &:nth-of-type(2) {
    left: auto;
    right: 0px;
    border-radius: 100px 550px 400px 400px / 200px 700px 800px 600px;
    transform: rotate(-10deg);
    transform-origin: top left;
  }
}

//Style cho phần thân
.body {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 170px 170px 100px 100px / 300px 300px 200px 200px;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 2;
}

//Style cho các đốm
.spots {
  position: absolute;
  width: 90%;
  height: 57.5%;
  background: $y;
  bottom: 10px;
  left: 5%;
  border-radius: 300px 300px 300px 300px / 300px 300px 500px 500px;
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: $y;
    border-radius: 300px 300px 300px 300px / 300px 300px 500px 500px;
  }
  .spot {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50px;
    box-shadow: 0 -5px 0 darken($g, 20%);
    left: calc(50% - 6.5px);
    top: 10px;
    transform: translateZ(20px) scaleX(0.75) scale(0.75);
    &:nth-of-type(2),
    &:nth-of-type(3) {
      top: 15px;
      left: calc(50% - 25px);
    }
    &:nth-of-type(3) {
      left: calc(50% + 10px);
    }
    &:nth-of-type(n + 4) {
      top: 30px;
      left: 10px;
    }
    &:nth-of-type(5) {
      left: 30px;
    }
    &:nth-of-type(6) {
      left: 50px;
    }
    &:nth-of-type(7) {
      left: 70px;
    }
    &:before,
    &:after {
      content: "";
      position: absolute;
      width: 5px;
      height: 10px;
      background: darken($g, 20%);
      border-radius: 200%;
      left: -2.5px;
      transform: rotate(45deg);
      bottom: 10px;
    }
    &:after {
      transform: rotate(-45deg);
      left: 10px;
    }
  }
}

//Style cho phần mặt
.inner {
  position: absolute;
  width: 100%;
  height: 30px;
  top: 15px;
  .nose {
    position: absolute;
    width: 17.5px;
    height: 6px;
    background: #222;
    left: calc(50% - 8.75px);
    top: 10px;
    border-radius: 200px 200px 100px 100px / 100px 100px 50px 50px;
  }
  .mouth {
    position: absolute;
    width: 50px;
    height: 10px;
    background: repeating-linear-gradient(
      to right,
      #fff,
      #fff 10px,
      #222 10px,
      #222 11px,
      #fff 11px
    );
    bottom: 0px;
    left: calc(50% - 25px);
    border-radius: 25px 25px 300px 300px / 25px 25px 200px 200px;
    box-shadow: inset 0 0 0 1px darken($g, 10%);
  }
  .eye {
    position: absolute;
    top: 5px;
    width: 12.5px;
    height: 12.5px;
    background: $b;
    left: 20px;
    border-radius: 100%;
    box-shadow: inset 0 0 0 1px darken($g, 10%), inset 0 0 0 4.5px #fff;
    &.two {
      left: auto;
      right: 20px;
    }
  }
}
```
**Style input checkbox**
```css
//Style cho checkbox
input {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 999;
  opacity: 0;
}
```
**Thêm style khi checked**
```css
input:checked {
  & ~ .totoro {
    transform: translateX(180px) translateY(-5px);
    transition: 0.5s linear;
    &:before {
      opacity: 1;
    }
    &:after {
      opacity: 0.25;
    }
    * {
      transition: 0.5s linear;
    }
    .foot {
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transition-delay: 0.45s, 0.45s;
      transform: rotate(-75deg) scaleY(1.5) scaleX(1.5) translateY(-10px)
        translateX(10px);
      &.two {
        transform: rotate(75deg) scaleY(1.5) scaleX(1.5)
          translateY(-10px) translateX(-10px);
      }
    }
    .arm {
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transition-delay: 0.45s, 0.45s;
      transform: rotate(40deg) translateX(7.5px);
      &:nth-of-type(2) {
        transform: rotate(-40deg) translateX(-7.5px);
      }
    }
    .ears {
      .ear {
        left: 70px;
        animation: ear1 1s ease-in-out infinite alternate;
        transform-origin: -20% 120%;
        @keyframes ear1 {
          to {
            transform: rotate(5deg) translateY(-2.5px);
          }
        }
        &:nth-of-type(2) {
          left: auto;
          right: 70px;
          animation: ear2 1s ease-in-out infinite alternate;
          transform-origin: 120% 120%;
          @keyframes ear2 {
            to {
              transform: rotate(-5deg) translateY(-2.5px);
            }
          }
        }
      }
    }
    .body {
      .mouth {
        box-shadow: inset 0 0 0 2px darken($g, 35%);
        height: 2px;
        bottom: 2.5px;
        width: 20px;
        left: calc(50% - 10px);
      }
      .spots {
        &:before {
          animation: breathe2 1s ease-in-out infinite alternate;
          transform-origin: bottom;
          @keyframes breathe2 {
            to {
              transform: scale(1.025);
            }
          }
        }
      }
      .inner{
        .nose{
          animation:shake 3s ease-in-out infinite;
          @keyframes shake{
            90%{
              transform:translateX(0px);
            }
            91%{
              transform:translateX(1px);
            }
            92%{
              transform:translateX(0px);
            }
            93%{
              transform:translateX(-1px);
            }
            94%{
              transform:translateX(0px);
            }
          }
        }
      }
      .inner,
      .spots {
        .spot {
          animation: breathe 1s ease-in-out infinite alternate;
          @keyframes breathe {
            to {
              transform: translateZ(20px) scaleX(0.8) scale(0.75)
                translateY(-5px) rotateX(-20deg);
            }
          }
        }
        .eye {
          box-shadow: inset 0 0 0 1px darken($g, 35%),
            inset 0 0 0 4.5px #fff;
          height: 2px;
          width: 7.5px;
          transform: translateX(7.5px);
          &.two {
            transform: translateX(-7.5px);
          }
        }
        animation: roll1 0.5s linear 1 forwards;
        @keyframes roll1 {
          0% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(100%) rotateY(150deg);
          }
          50.001% {
            transform: translateX(-100%) rotateY(-150deg);
          }
          100% {
            transform: translateX(0%);
          }
        }
      }
    }
  }
}
```

### Kết quả
Bạn có thể xem source code và kết quả trên codepend tại link sau nhé:
{@codepen: https://codepen.io/minhkhmt1k3/pen/VBpvrg}

### Tham khảo
Tham khảo từ codepen của [Adam Kuhn](https://codepen.io/cobra_winfrey/)