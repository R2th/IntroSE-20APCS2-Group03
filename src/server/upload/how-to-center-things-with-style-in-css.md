- Hôm nay chúng ta sẽ cùng tìm hiểu các cách để căn giữa element trong css.
## 1.Using Flexbox
HTML
```html
<div class="container">
<img src="http://lorempixel.com/400/200" />
</div>
```
CSS
```css
html, body, .container {
  height: 100%;
}

.container {
  display: flex;
  justify-content: center; /* horizontal center */
  border: 1px solid gold;
  width: 50%;
  height: 50%;
  background-color: gray;
}

img {
  align-self: center; /* vertical center */
}
```
![](https://images.viblo.asia/2ea33ca9-15b8-4859-a06f-90e53e5a741d.png)
## 2.CSS transform
HTML:
```html
    <div class="container">
      <div class="element"></div>
    </div>
```
CSS:
```css
.container {
  position: relative;
  background-color: gainsboro;
  width: 30%;
  height: 30%;
}
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  background-color: gold;
}
```
![](https://images.viblo.asia/3de072a4-d618-4c5c-a8b4-b5fa68fef41c.png)
## 3.margin: 0 auto;
HTML:
```html
<div class="containerDiv">
    <div id="centeredDiv"></div>
</div>
```
CSS:
```css
.containerDiv {
  width: 50%;
  background-color: gold;
}

#centeredDiv {
  margin: 0 auto;
  width: 200px;
  height: 100px;
  background-color: green;
}
```
![](https://images.viblo.asia/c89f0896-8252-4bf5-bc3b-5af5c75baf04.png)
## 4.Using position: absolute
HTML:
```html
<div class="parent">
    <img class="center" src="http://lorempixel.com/400/200/" />
</div>
```
CSS:
```css
.parent {
  background-color: green;
  position: relative;
  width: 30%;
  height: 30%;
}
.center {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: yellow;
}
```
![](https://images.viblo.asia/f827cb93-d48e-42ce-9cdf-0f1d246b2722.png)
## 5.Horizontal and Vertical centering using table layout
HTML:
```html
<div class="wrapper">
      <div class="parent">
        <div class="child">

        </div>
      </div>
    </div>
```
CSS:
```css
.wrapper {
  display: table;
  vertical-align: center;
  width: 200px;
  height: 200px;
  background-color: #9e9e9e;
}

.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.child {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  width: 100px;
  height: 100px;
  background-color: teal;
}
```
![](https://images.viblo.asia/f71d3ba6-a543-44be-a64f-76366dcb341f.png)
Đó là các cách căn chỉnh center mà tôi biết hy vọng có thể giúp mọi người trong công việc font-end.
Happy coding!