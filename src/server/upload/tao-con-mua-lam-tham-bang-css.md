## HTML
- Tạo html các thẻ <i/> , chính là các hạt mưa. bạn có thể viết html thuần lặp lại nhiều lần, hoặc tạo vòng lặp như này

```
- for i in (0 .. 500)
  i.rain
```

## CSS
- Viết css cho các hiệu ứng chuyển động hạt mưa rơi từ trên xuống (0%-100%)
- Css cho hạt mưa opacity nhạt dần theo đốc độ rơi.
```
html {
  height: 100%;
}

body {
  background: #222222;
  box-shadow: inset 0 0 800px #111111;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.rain {
  background: white;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 100%);
  height: 50px;
  position: absolute;
  width: 3px;
}

$rain: 300;

@for $i from 1 through $rain {
  $top: (random(50) + 50) * 1%;
  $left: random(100) * 1%;
  $opacity: (random(30) + 30) * 0.01;
  $delay: random(20) - 1s;

  .rain:nth-of-type(#{$i}) {
    animation-name: rain-#{$i};
    animation-delay: $delay;
    animation-duration: random(6) + 1s;
    animation-iteration-count: infinite;
    left: $left;
    opacity: $opacity;
    top: -$top;
  }

  @Keyframes rain-#{$i} {
    0% {
      left: $left;
      opacity: $opacity;
      top: -$top;
    }
    100% {
      opacity: 0;
      top: $top + 40%;
    }
  }
}

```

## DEMO

{@codepen: https://codepen.io/oBuiThiHuyen/pen/pGmRJX}

Nguồn tham khảo: codepen