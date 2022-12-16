#![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/66uc370zyt_bdacfa80-6132-11e9-90b9-33e6eee04d1f.png)
 > ## Tản mạn 
**styled-components** là thư viện mình rất thích khi viết css cho react, sau vài ngày gần đây mình tìm hiểu về source của nó thì mình đã quyết định viết lại nó để hiểu sâu nhất có thể, mình cảm thấy học được rất repo này nên mình đã viết ra bài nên đã chia sẻ cho ae những thứ mình đã học được từ nó, để hiểu được những đoạn code trong repo của mình thì mình sẽ nói 2 khái niệm khá mới với mình và bắt buộc phải hiểu, nếu ae đã biết rồi thì có thể bỏ qua ^^ 
>## Stylesheet 
Nếu ae nào biết đến stylesheet trong javascript rồi thì có thể bỏ qua đoạn này
Trong styled-components thì nó đc dùng để lưu các style, mỗi thẻ tag style thì có 1 sheet, mỗi sheet có rất nhiều rule , 1 rule tương ứng với className và style kèm theo, vd ở dưới minh hoạ cho việc thêm 1 rule vào sheet
```
// get tất cả các các sheet trong app
const sheet  = document.styleSheets;
//chọn 1 rule trong sheet và add css vào rule
sheet[1].insertRule ('.classname {width : 100%;height : 100%;}', indexStyle)
```
Link chi tiết về nó : https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
> ##Tagged templates
Tagged templates mình nói đến ở đây chính là cú pháp hay dùng ở  styled-components
```javascript
// function này chỉ return  1 array chứ tất cả các đối số của function này
const templateFunc  =  (...args ) =>  args
templateFunc`
	width : 100%; 
    height : 50%;
	background : ${props => props};
`
```
Kết qủa chúng ta lấy ra đc các tham số như thế này
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gu6r8jmbj2_Screen%20Shot%202020-06-24%20at%2011.53.12%20PM.png) 
Link chi tiết về nó :  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
> ##Bắt tay vào viết thư viện 
Mình sẽ viết class ComponentStyle để handle việc khởi tạo stylesheet và insert css cho component
```javascript
class ComponentStyle {
  sheet = {};
  constructor() {
	// ngay khi class khởi tạo thì mình sẽ tạo thẻ style và lưu sheet của style đó vào biến sheet trong class
    const styleDom =  this.makeStyleTag();
  	// lấy sheet và save vào biến this.sheet 
    this.sheet =  styleDom.sheet;
  }
 makeStyleTag = () => {
 	//  function này sẽ tạo style và add thẻ style đó vào thẻ head
    const style = document.createElement("style");
    style.setAttribute("data-style-duc-version", "1.0.0");
    document.head.insertBefore(style, document.head.childNodes[document.head.childNodes.length]);
    return style;
  };
  insertBefore(css) {
	// function sẽ tạo ra tên các class một cách random cho các component và return về tên class đó
    const className = uuid();
    const newName = "style-duc-" + className.slice(0, 5);
    this.sheet.insertRule(
      `.${newName}{${css}}`,
      this.sheet.cssRules.length
    );
    return newName;
  }
}
```
Phần code trong file **core.js** chắc là cũng là phần lằng nhằng nhất, mình nghĩ đê ae hiểu nhất về đoạn code của mình thì nên clone [repo](https://github.com/ducga1998/rewrite-styled-components#readme) này của mình rồi chạy nó rồi vào đây đọc thì sẽ dễ hiểu hơn rất nhiều

```javascript
// function này sẽ trực tiếp tạo ra Element React 
export default function createStyledComponent(target, css) {
  let WrappedStyledComponent = {};
 // khởi taọ class ComponentStyle
  const componentStyle = new ComponentStyle();
 // lưu nó vào trong  biến WrappedStyledComponent, để tí nữa ở func useStyledComponentImpl sẽ lôi ra dùng
  WrappedStyledComponent.componentStyle = componentStyle;
  WrappedStyledComponent.target = target;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const forwardRef = (props, ref) => useStyledComponentImpl(WrappedStyledComponent, props, ref, css);
  const Element = React.forwardRef(forwardRef);
  Element.toString = () => {
    return `.${WrappedStyledComponent.newClassToString}`;
  };
  return Element;
}

const renderCss = (cssRaw, propsElement) => {
  // function này sẽ handle việc map mảng cssRaw thành chuỗi css, mỗi một element trong mảng cssRaw thì có thể function hoặc có thể là string
  let css = "";
  for (const elementCss of cssRaw) {
    if (typeof elementCss === 'function') {
         const result = elementCss(propsElement);
          css += result;    
    }
    if (typeof elementCss === "string") { css += elementCss; }
  }
  return css;
};
// CORE FUNCTION 
// function này mình sẽ handle việc tạo ra react component, merge props , truyền ref 
const useStyledComponentImpl = (WrappedStyledComponent, props, ref, css) => {
  //  support cho vấn đề ThemeProvider trong styled-componets
  const theme = React.useContext(ThemeContext);
  const newProps = { ...props, ...{ theme, ref } };
  const newCss = renderCss(css, newProps);
  // insert css và get đc  className mới
  const className = WrappedStyledComponent.componentStyle.insertBefore(newCss);
  WrappedStyledComponent.newClassToString = className;
  // nối tên các className
  newProps.className = [props.className, className].join(" ");
  // cuối cùng là tạo react element
  return React.createElement(WrappedStyledComponent.target, newProps);
};
```
Cuối cùng là code trong file index.js, chính là file mà ae sao này sẽ import nó mỗi khi dùng styled-components
```javascript
// domElements là một mảng chứa các thẻ trong html  , domElements = ['a,', 'div', 'section','svg', ....], 
//kỹ hơn thì các bạn vào repo của mình xem, vì nó dài nên mình ko trích vào đây
import domElements from './utils/domElements';
import createStyledComponent from './core'
import css from './utils/css';
import {createContext} from 'react'
export const ThemeContext  = createContext({}) 
export const ThemeProvider = ThemeContext.Provider 
const styled  = (tag) => {
    return  (...args) => createStyledComponent(tag, css(...args));
}
domElements.forEach(domElement => {
	// đoạn này mình gán thể này để tí nữa mọi người có thể dùng như thế này : styled.div` ...  `
    styled[domElement] = styled(domElement);
});
export default styled

```
Và okay rồi, ae có thể import styled-componets fake của mình vào để xài như một thư viện thật =)))) 
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/pl0inc8oii_Screen%20Shot%202020-06-24%20at%207.45.37%20PM.png)
Mọi có thể vào thẳng link sandbox để xem và code demo luôn 
https://codesandbox.io/embed/github/ducga1998/rewrite-styled-components/tree/master/?fontsize=14&hidenavigation=1&theme=dark
>## Kết
Hi vọng mọi người sẽ thấy thú vị qua bài viết của mình, xin cảm ơn ae đã đọc đến tận đây ạ : )) 
Repo : https://github.com/ducga1998/rewrite-styled-components
Mọi thắc mắc và đóng góp ý kiến các bạn có thể gửi vào gmail : **duc2820@gmai.com** cho mình để tiện trao đổi