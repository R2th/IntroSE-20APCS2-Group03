Xin chào các bạn vậy là loạt bài về Slick sử dụng Jquery với html thông thường mình đã giới thiệu hết với các bạn. Bài viết này mình viết về cách thức sử dụng Slick trong ReactJs.
## 1.Cài đặt
Các bạn có thể sử dụng npm hoặc yarn <br>
`npm install react-slick --save`<br>
<br>
`yarn add react-slick`<br><br>
Sau đó các bạn nhớ import css vào nhé !!<br>
```npm install slick-carousel --save```<br>
```js
import "~slick-carousel/slick/slick.css"; 
import "~slick-carousel/slick/slick-theme.css";
```
## 2.Api
Vì sức mạnh của React nên react-slick cũng lược không còn một số API như trước đây mình giới thiệu.<br>
Các bạn có thể tham khảo các thuộc tính của nó tại đây nó khá giống với tính năng của api của [bài viết ](https://viblo.asia/p/cach-su-dung-slick-ORNZqGJb50n) slick đầu tiên của mình nên mình sẽ không nói lại phần này.
## 3.Một vài ví dụ với các trường hợp đặc biệt :
Đây là cách sử dụng slick trong class component. Các Api được setting trong một biến sau đó component Slider sẽ sử dụng nó đối với các thẻ bên trong nó.
```js
import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2> Single Item</h2>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
```
### 3.1 Sử dụng next và prev bằng button của mình
#### a) React
Sử dụng react thông thường
```js
import React, { Component } from "react";
import Slider from "react-slick";

export default class PreviousNextMethods extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <h2>Previous and Next methods</h2>
        <Slider ref={c => (this.slider = c)} {...settings}>
          <div key={1}>
            <h3>1</h3>
          </div>
          <div key={2}>
            <h3>2</h3>
          </div>
          <div key={3}>
            <h3>3</h3>
          </div>
          <div key={4}>
            <h3>4</h3>
          </div>
          <div key={5}>
            <h3>5</h3>
          </div>
          <div key={6}>
            <h3>6</h3>
          </div>
        </Slider>
        <div style={{ textAlign: "center" }}>
          <button className="button" onClick={this.previous}>
            Previous
          </button>
          <button className="button" onClick={this.next}>
            Next
          </button>
        </div>
      </div>
    );
  }
}
```

#### b) React Hook
Vì Hook React sử dụng component class nên nên ta confìg api cho Slick trên một biến bình thường. Nhưng một vấn đề mà mình gặp phải đó là không control được button của slick nên ta cần sử Ref của Hook để trỏ component Slider để lấy ra phương thức `slickNext();` và `slickPrev();` config button next và pre theo button của chính mình
```js
import React, { useState, useRef} from 'react';
import Slider from 'react-slick';

const SimpleSlider = props => {
  const ref = useRef({});

  const next = () => {
    ref.current.slickNext();
  };

  const previous = () => {
    ref.current.slickPrev();
  };

  const settings = {
    className: 'section-outstanding__slider',
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    infinite: false,
    rows: 2,
    responsive: [
      {
        breakpoint: 1198,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1
        }
      }
    ]
  };
  return (
           <Slider ref={ref} {...settings}>
             <div>
                <h3>1</h3>
              </div>
             <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
            </Slider>
  );
};

export default SimpleSlider;
```
### 3.2 Dùng hai slide control lẫn nhau
#### a) React
Ở đây ta sử dung state để tương tác qua lại dữa hai slider. Trong component Slider, ref sẽ trỏ tới asNavFor state lẫn nhau của mỗi Slider để khi Slider này có sự thay đổi thì slider cũng có sự thay đổi. Lưu ý là hai slider phải có vị trí tương đương nhau. 

```js
import React, { Component } from "react";
import Slider from "react-slick";

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    return (
      <div>
        <h2>Slider Syncing (AsNavFor)</h2>
        <h4>First Slider</h4>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
        <h4>Second Slider</h4>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
        >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}
```
#### b) Hook
```js
import React, { useState } from 'react';
import Slider from 'react-slick';

const AsNavFor = props => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
   
          <Slider asNavFor={nav2} ref={c => setNav1(c)}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
          </Slider>
      
          <Slider
            asNavFor={nav1}
            ref={c => setNav2(c)}
            slidesToShow={5}
            swipeToSlide={true}
            focusOnSelect={true}
            arrows={false}
          >
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
              <div>
                <h3>5</h3>
              </div>
              <div>
                <h3>6</h3>
              </div>
          </Slider>
  );
};

export default AsNavFor;

```

Hy vọng những điều giúp được các bạn sử dụng Sliclk trong react cũng như React Hook. Nếu có vấn đề hay gì hay những trường hợp hay hơn các bạn cùng mình trao đổi để tiến bộ hơn nhé. Cảm ơn !!