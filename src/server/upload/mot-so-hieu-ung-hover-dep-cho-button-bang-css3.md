Bài viết này mình xin phép giới thiệu một số hiệu ứng hover cho button khá đẹp mà cũng khá đơn giản, rất dễ áp dụng. 

*Note: Do mình không biết cắt nghĩa và đặt tên cho effect thế nào nên mình chỉ để tên lần lượt là effect 1, effect 2,.. nhé. Mong các bạn thông cảm.*

## 1. Effect 1

Effect này có hơi đặc biệt so với các effect còn lại là sử dụng svg để tạo animation cho button. Khá đặc biệt tuy nhiên rất đẹp mắt.

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-2">
        <a href="#" class="btn btn-1 color-green">
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%"/>
          </svg>
          Hover
        </a>
      </div>

      <div class="block col-md-2">
        <a href="#" class="btn btn-1 color-blue">
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%"/>
          </svg>
          Hover
        </a>
      </div>
    </div>
  </div>
</div>
```

**Phần CSS chung**

```
body {
  background-color: #222;
}

#main {
  margin-top: 200px;
}

.btn {
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size:16px;
  font-weight: 400;
  line-height: 36px;
  margin: 0 0 2em;
  max-width: 160px; 
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%; 
}
```

**CSS**

```

.btn-1 {
  font-weight: 100;
  transition: all .25s;

  svg {
    height: 45px;
    left: 0;
    position: absolute;
    top: 0; 
    width: 100%; 
  }
  
  rect {
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-dasharray: 422, 0;
      transition-delay: none;
  }
}

.btn-1:hover {
  font-weight: 900;
  letter-spacing: 2px;
  rect {
    stroke-width: 5;
    stroke-dasharray: 15, 310;
    stroke-dashoffset: 48;
    transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

.btn-1.color-green:hover {
  color: green;
  rect {
    stroke: green;
  }
}

.btn-1.color-blue:hover {
  color: blue;
  rect {
    stroke: blue;
  }
}
```

**Result**

![](https://images.viblo.asia/9c5477a0-0114-406e-a4dc-904e4ceface7.gif)

## 2. Effect 2

Effect này khá đơn giản. Nếu hiểu và sử dụng thành thạo **:before** và **:after** thì sẽ dễ dàng làm được effect này.

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-2">
        <a href="#" class="btn btn-2 color-green">
          Hover
        </a>
      </div>

      <div class="block col-md-2">
        <a href="#" class="btn btn-2 color-blue">
          Hover
        </a>
      </div>
    </div>
  </div>
</div>
```

**CSS**

```
.btn-2 {
    letter-spacing: 0;
}

.btn-2.color-green:hover,
.btn-2.color-green:active {
  color: green;
}

.btn-2.color-blue:hover,
.btn-2.color-blue:active {
  color: blue;
}

.btn-2:hover,
.btn-2:active {
  letter-spacing: 5px;
}

.btn-2:after,
.btn-2:before {
  backface-visibility: hidden;
  border: 1px solid rgba(#fff, 0);
  bottom: 0px;
  content: " ";
  display: block;
  margin: 0 auto;
  position: relative;
  transition: all 280ms ease-in-out;
  width: 0;
  opacity: 0;
}

.btn-2.color-green:after,
.btn-2.color-green:before {
  border: 1px solid green;
}

.btn-2.color-blue:after,
.btn-2.color-blue:before {
  border: 1px solid blue;
}

.btn-2:hover:after,
.btn-2:hover:before {
  backface-visibility: hidden;
  transition: width 350ms ease-in-out;
  width: 70%;
  opacity: 1;
}
```

**Result:**

![](https://images.viblo.asia/fbf1b267-3665-4d75-8ffc-053f59452582.gif)


## 3. Effect 3

**HTML**

```
<div id="main">
  <div class="container">
    <div class="row">
      <div class="block col-md-2">
        <a href="#" class="btn btn-3">
          Hover
        </a>
      </div>
    </div>
  </div>
</div>
```

**CSS**

```
.btn-3 {
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  outline: 1px solid;
  outline-color: rgba(255, 255, 255, .5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
} 

.btn-3:hover {
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
  outline-color: rgba(255, 255, 255, 0);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388; 
}
```

**Result**

![](https://images.viblo.asia/43075570-92f8-499a-8d3a-132b271b7a6e.gif)

Hy vọng với những chia sẻ trên của mình, sẽ giúp các bạn có thể tạo thêm những hiệu ứng đẹp cho website của mình.