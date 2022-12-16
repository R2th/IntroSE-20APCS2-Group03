Thi thoảng trong lúc rảnh dỗi, có khi nào bạn thử F12 lên để xem mấy `website` nổi tiếng họ đang thiết kế các thẻ `html` như thế nào, hay thử nghịch xem mấy `file js` trên các product xem họ code như thế nào không ? 

![](https://images.viblo.asia/357899d2-fc8b-42c6-859b-9420f46afde1.png)

Ví dụ như khi F12 lên xem các thẻ `element` của google. Có ai thắc mắc như mình là tại sao các thẻ **class name nó được định nghĩa không theo một quy tắc nào không =))** 

Hay là khi soi các file js của các trang web bạn thường thấy các function định nghĩa rất linh tinh 

```js
function P(e, t, o, i) {
  o.updateBound = i, window.addEventListener('resize', o.updateBound, {
    passive: !0
  });
  var r = n(e);
  return H(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
}

function A() {
  this.state.eventsEnabled || (this.state = P(this.reference, this.options, this.state, this.scheduleUpdate))
}
```
Tẩt nhiên là phải có lí do cả chứ nhìn vào **class name** kia mà debug code thì có mà toang ...
# Lý do
Đối với các ứng dụng hiện đại ngoài việc ứng dụng chạy được còn phải quan tâm đến nhiều yếu tố như **tốc độ, bảo mật, tránh sao chép ý tưởng ...**

Việc **minify** các file `js`, `css` hay `obfuscate` các **class name** sẽ có những ưu điểm sau. 

* Giảm kích thước của các file js đó đi, giúp client load những file đó nhanh hơn
* Giấu đi các `source code`,  tránh ăn cắp ý tưởng 
* Tránh việc sử dụng các `extension` can thiệp vào UI 
* ....

# Minify
## Cách hoạt động

**Minify** là một kĩ thuật sử dụng tool `npm` nào đó như `uglify-js`, `minifier`, `babel-minify` để tối giản code của bạn.


Cách tối giản thì có rất nhiều phương pháp như **rút ngắn tên biến**, **tên hàm còn a, b, C** ... **loại bỏ các dấu xuống dòng**, **khoảng trắng**, **index** ...

Hoặc đơn giản là convert logic sau 
```js
//Turn this
status: true
//Into this
status: !0
```
Như chúng ta có thể thấy chữ `true` tốn đến **4 kí tự**, trong khi `!0` chỉ tốn có **2 kí tự**. 


> Đôi khi mình cũng thắc mắc là có khi nào khi *minify* cách function bị trùng tên ???
> 

Thực ra là đôi khi bạn thấy có vẻ các function có tên giống nhau thế thôi nhưng được đặt ở các `scope` khác nhau nên không bị ảnh hưởng. 

Bạn có thể test việc **minify** thông qua một số trang online, ví dụ như [Uglify JS](https://skalman.github.io/UglifyJS-online/). Ta test một đoạn code đơn giản sau đây.
```js
function selectionSort(array){
  for(let i = 0; i < array.length - 1; i++){
    let idmin = i;
    for(let j = i + 1; j < array.length; j++){
      if(array[j] < array[idmin]) idmin = j;
    }

    // swap
    let t = array[i];
    array[i] = array[idmin];
    array[idmin] = t;
  }
}
```

Sau khi được minify thì đã tiết kiệm được 68% kích thước 
```js
function selectionSort(t){for(let e=0;e<t.length-1;e++){let l=e;for(let n=e+1;n<t.length;n++)t[n]<t[l]&&(l=n);let n=t[e];t[e]=t[l],t[l]=n}}
```

## Khi nào nên minify

Thực tế thì chúng ta chỉ minify trên **production**, mình từng thấy vài bạn chạy `npm run production` trên `local` (faceplam) ...

Vì đơn giản là cải thiện kích thước file ở local không giải quyết được vấn để của ứng dụng, đôi khi nó lại là con dao hai lưỡi, khi minify chúng ta sẽ khó debug code hơn. 


Để chứng minh việc `minify` giúp giảm kích thước file chúng ta có thể test như sau, ví dụ ở đây mình sử dụng `Laravel` + `webpack`.

Khi chạy `npm run dev`(Không **minify**)
```js
 DONE  Compiled successfully in 947ms                                                                                                                                                                                      4:33:13 PM

                     Asset      Size  Chunks             Chunk Names
              /css/app.css   208 KiB          [emitted]  
               /css/lp.css   237 KiB          [emitted]  
         /css/reporter.css   219 KiB          [emitted]  
/css/reporter_homepage.css  1.75 KiB     mix  [emitted]  mix
                /js/app.js   775 KiB          [emitted]  
                 /js/lp.js   257 KiB          [emitted]  
           /js/reporter.js   582 KiB          [emitted]  
```
Khi chạy `npm run production`(Áp dụng **minify**)
```js
 DONE  Compiled successfully in 1763ms                                                                                                                                                                                     4:33:25 PM

                     Asset      Size  Chunks             Chunk Names
              /css/app.css   207 KiB          [emitted]  
               /css/lp.css   229 KiB          [emitted]  
         /css/reporter.css   216 KiB          [emitted]  
/css/reporter_homepage.css  1.41 KiB       0  [emitted]  mix
                /js/app.js   761 KiB          [emitted]  
                 /js/lp.js   210 KiB          [emitted]  
           /js/reporter.js   577 KiB          [emitted] 
```
Các bạn có thấy sự khác biệt chưa, nhớ sử dụng **minify** nhé  :D
# Obfuscate CSS class names
![](https://images.viblo.asia/fe7cbe37-e5fd-43d1-a2d2-c07ee805d434.png)


Trước khi đi vào cách hoạt động chúng ta có công thức đơn giản sau 
> Obfuscated CSS class names == Giảm kích thước file == Giảm thời gian để truyền trải qua mạng.
>
Đã bao giờ bạn từng thiết kế một `button` với **class name** như sau

>    <button class=”button button-color-red button--active”>title</button>
>    

Việc **obfuscate** có thể giúp các **class name** của bạn được tối giản hơn. Giảm thiểu kí tự cũng như tránh sự can thiệp của các `extension`.

**[Modules CSS](https://github.com/css-modules/css-modules)** giải quyết vấn đề đóng gói trong css, giúp định nghĩa lại các **class name** bao gồm các *tên class-name*, *scopce*, *hàm băm ngẫu nhiên*. Các class name có thể được định nghĩa bằng thuộc tính `localIdentName`. Ví dụ như `[name]___[local]___[hash:base64:5]`


Đi vào ví dụ thực tế khi ta sử dụng `CSS modules` với `React` và `Webpack`.

### Button.css

```js
.button {
  font-size: 20px;
  color: black;
}
.button--color-red {
  color: red;
}
.button--active {
  color: green;
}
```
### Button.js
```js
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './css/Button.scss';
const cx = classNames.bind(styles);
const Button = ({ label, color, isActive }) => {
  const cssClasses = cx({
    'button': true,
    'button--color-red': (color === 'primary'),
    'button--active': isActive,
  });
return (
    <button className={cssClasses}>
      {label}
    </button>
  );
};
Button.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string,
  isActive: PropTypes.bool,
};
export default Button;
```
### webpack.config.js / loaders section

```js
{ 
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        modules: true,
        importLoaders: 1,
        localIdentName: '[sha1:hash:hex:4]'
      }
    }
  ]
}
```

* Thuộc tính **modules** báo cho `webpack` biết rằng cần phải `obfuscated` các **class name**. Bạn cũng nên đặt thuộc tính là `false` trong quá trình phát triển để dễ dàng `debug`.
* Thuộc tính **localIdentName** quy định định dạng của **class name** sau khi được **obfuscation**. Như ví dụ trên chúng ta sẽ quy định class name gồm **4 kí tự**, được **endcode** bằng **sha1**.




![](https://images.viblo.asia/de9c2b53-8241-489a-8646-343408e57909.png)


Tadaaaaaaaaaaaa, đây là thành quả.

Mỗi khi có một bản build mới lại có các **class name** mới sinh ra. Dẫn đến việc các extension muốn **can thiệp vào UI của ứng dụng bằng cách thay đổi style** thông qua các **class name** của **selector** tương đối khó khăn.

# Tổng kết
Như vậy là mình vừa giới thiệu 2 cách đơn giản để **minify** và **obfuscate** các `file` `css`, `js` và `html`. Đối với các ông lớn như `Google`, `Facebook` họ luôn áp dụng các phương pháp này để cải thiện sản phẩm của mình.
Hay đơn giản như `Chatwork` cũng mới áp dụng kĩ thuật `obfuscate` css làm cho việc cách `extension` như `Chat++` khó can thiệp vào UI hơn.

Cảm ơn các bạn đã theo dõi bài viết, nếu bài viết hữu ích nhớ cho mình một **upvote** và **theo dõi** để mình ra nhiều bài viết chất lượng hơn nhé :D.

**Donate cho tác giả** : **[Buy me a coffee](https://www.buymeacoffee.com/su.lowkey)**

 Tham khảo: *[How to obfuscate CSS class names with React and Webpack](https://develoger.com/how-to-obfuscate-css-class-names-with-react-and-webpack-20e2b5c49cda)*