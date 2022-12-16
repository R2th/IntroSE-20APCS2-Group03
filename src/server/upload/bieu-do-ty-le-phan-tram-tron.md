khi tạo một chương trình chúng ta có thể sẽ cần biết chương trình chạy hết bao lâu và khi nào thì 
chương trình đó kết thúc. Có 1 cách để giải quyết việc này đó là sử dụng progressBar. 
ProgressBar là một thanh tiến trình thể hiện trạng thái của một hoạt động, tác vụ đang diễn ra đến đâu, bao lâu thì kết thúc.
ProgressBar thường có dạng thanh bar nằm ngang, nhưng dưới đây mình sẽ giới thiệu cho các bạn cách tạo 1 progressBar tròn mà mình đã sưu tầm.

HTML:

```
<h1>Biểu đồ tỷ lệ phần trăm tròn<h1/>
<div class="content">
  <figure class="chart-one animate">
    <svg>
      <circle class="circle-background"/>
      <circle class="circle-foreground"/>
    </svg>
  </figure>

  <figure class="chart-two animate">
    <svg>
      <circle class="circle-background"/>
      <circle class="circle-foreground"/>
    </svg>
  </figure>

  <figure class="chart-three animate">
    <svg>
      <circle class="circle-background"/>
      <circle class="circle-foreground"/>
    </svg>
  </figure>
</div>
```

SCSS:

```
h1 {
  display: block;
  color: antiquewhite;
  text-align: center;
}
$configs: (
  chart-one:
    (
      svgSize: 200px,
      percentage: 32,
      strokeWidth: 1px,
      backgroundColor: coral,
      foregroundColor: darkmagenta,
      labelColor: #c6e8d7,
      labelFontSize: 2.5rem,
      duration: 3s,
      animationDelay: 1s
    ),
  chart-two:
    (
      svgSize: 200px,
      percentage: 50,
      strokeWidth: 15px,
      backgroundColor: blueviolet,
      foregroundColor: #d0f09e,
      labelColor: #c6e8d7,
      labelFontSize: 2.5rem,
      duration: 3s,
      animationDelay: 1s
    ),
  chart-three:
    (
      svgSize: 200px,
      percentage: 75,
      strokeWidth: 25px,
      backgroundColor: violet,
      foregroundColor: #389967,
      labelColor: #c6e8d7,
      labelFontSize: 2.5rem,
      duration: 3s,
      animationDelay: 1s
    )
);

$pi: 3.14;
$labelData: "";
@for $i from 0 to 101 {
  $labelData: $labelData + $i + "%" + "\a";
}

@each $chart, $param in $configs {
  $c: (map-get($param, svgSize) - map-get($param, strokeWidth)) * $pi;
  $cOffSet: (map-get($param, percentage)/100)*$c;

  .#{$chart} {
    width: map-get($param, svgSize);
    height: map-get($param, svgSize);
    margin: 0;
    position: relative;

    &.animate {
      svg .circle-foreground {
        animation: offset map-get($param, duration) ease-in-out forwards;
        animation-delay: map-get($param, animationDelay);
      }
      figcaption:after {
        animation: #{$chart}-label map-get($param, duration) steps(
            map-get($param, percentage)
          ) forwards;
        animation-delay: map-get($param, animationDelay);
      }
    }

    svg {
      width: 100%;
      height: 100%;
      .circle-background {
        r: (map-get($param, svgSize) - map-get($param, strokeWidth))/2;
        cx: 50%;
        cy: 50%;
        fill: none;
        stroke: map-get($param, backgroundColor);
        stroke-width: map-get($param, strokeWidth);
      }
      .circle-foreground {
        @extend .circle-background;
        stroke: map-get($param, foregroundColor);
        stroke-dasharray: $cOffSet $c;
        stroke-dashoffset: $cOffSet;
        stroke-linecap: round;
        transform-origin: 50% 50%;
        transform: rotate(-90deg);
      }
    }
    figcaption {
      display: inline-block;
      width: 100%;
      height: map-get($param, labelFontSize);
      overflow: hidden;
      text-align: center;
      color: map-get($param, labelColor);
      position: absolute;
      top: calc(50% - #{map-get($param, labelFontSize)/2});
      left: 0;
      font-size: 0;
      &:after {
        display: inline-block;
        content: $labelData;
        white-space: pre;
        font-size: map-get($param, labelFontSize);
        line-height: map-get($param, labelFontSize);
      }
    }
  }
  @keyframes #{$chart}-label {
    100% {
      transform: translateY(
        map-get($param, labelFontSize) * (-(map-get($param, percentage)))
      );
    }
  }
}
@keyframes offset {
  100% {
    stroke-dashoffset: 0;
  }
}

body {
  background: #272b31;
  height: 100vh;
  display: block;
}
figure {
  margin: 1rem !important;
}
.content {
  display: flex;
  justify-content: center;
}
```

Kết quả:
{@codepen:  https://codepen.io/hoatnv/full/QrYGdp/}

Trên đây mình giới thiệu đến các bạn cách làm 1 progressBar phần trăm tròn mà mình đã sưu tầm,
Hy vọng nó sẽ hữu ích với các bạn, cảm ơn các bạn !