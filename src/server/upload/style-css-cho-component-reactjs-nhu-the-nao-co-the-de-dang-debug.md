JSX mang đến cho chúng ta sự tiện lợi khi kết hợp cú pháp HTML và JavaScript trong một file  trong React.  và Nó cũng cho phép chúng ta viết mã CSS ben trong tệp React JSX của bạn. Tuy nhiên, có 1 số nhược điểm khi bạn cố gắng Debug các component theo style của bạn. Trong bài viết này mình sẽ giới thiệu 1 số cách style component dể việc debug dễ dàng hơn. (go) 

#  Bắt đầu
Đầu tiên chúng ta hãy xây dựng 1 component như sau  :
```js
export default () => (
    <div className="content">
        <div className="content__img" />
            <div className="content__info">
            <div className="content__title">APeach Baby Doll</div>
            <div className="content__description">
                노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
                스피커와 동시에 무드등으로 사용하실 수 있어요.
            </div>
        </div>
  </div>
)

```
và 1 file CSS 
```CSS

.content{
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
}

.content__img{
  display: inline-block;
  width: 300px;
  height: 100%;
  background-image: url('https://picsum.photos/300/300?image=1062');
}

.content__info{
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 300px);
  height: 100%;
  text-align: left;
}

.content__title{
  padding: 20px 0 0 20px;
  font-size: 48px;
}

.content__description{
  padding: 20px;
  font-size: 30px;
  font-style: italic;
  color: #888888;
}

.content--skyblue{
  color: skyblue;
}
```
sau đó ta thu được kết quả như sau : 

![](https://images.viblo.asia/1c2e5d0f-93d0-409f-b56d-fedba9201853.png)

Okay . giờ mình muốn làm cho tile **APeach Baby Doll** có màu khác thì phải làm như thế nào ?

Chúng sẽ truyền cho Content.jsx 1 props và đặt tên là *skyblue*
```js
class App extends Component {
  render() {
    return (
      <div className="App">
        <Content skyblue/>
      </div>
    )
  }
}
```
Bây giờ , chúng ta có thể thay đổi các thuộc tính CSS của Content.jsx dựa trên *skyblue* .  Mình sẽ giới thiệu cho  các bạn 2 phương pháp thêm các thuộc tính CSS mới thông qua CSS chung 

# Inline Style
```js
export default ({ skyblue }) => {
    /* inline-style */
    let style = {}
    if (skyblue) {
      style = { color: 'skyblue' }
    }
  
    return (
        <div className="content">
            <div className="content__img" />
            <div className="content__info">
                <div style={style} className="content__title">APeach Baby Doll</div>
                <div className="content__description">
                    노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
                    스피커와 동시에 무드등으로 사용하실 수 있어요.
                </div>
            </div>
      </div>
    )
}
```
Như bạn có thể thấy , mình lấy  *skyblue*  như một điều kiện để thêm các thuộc tính CSS vào đối tượng .Sau đó chúng ta inject đối tượng kiểu như một kiểu  inline style. Bây giờ kết quả sẽ như thế này. 
![](https://images.viblo.asia/7938136e-21cd-48d6-a32c-63cc0d472c08.png)

Màu của tiêu đề bây giờ là màu xanh da trời như  yêu cầu .

Bây giờ chúng ta sẽ chuyển qua cách thứ 2.

# Thêm các Class CSS mới

```js
import React from 'react'
import './content.css'

export default ({ skyblue }) => {

  /* add new css classes */
    let titleStyles = ['content__title']
    if (skyblue) {
        titleStyles.push('content--skyblue')
    }

    return (
        <div className="content">
            <div className="content__img" />
            <div className="content__info">
                <div className={titleStyles.join(' ')}>APeach Baby Doll</div>
                <div className="content__description">
                노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
                스피커와 동시에 무드등으로 사용하실 수 있어요.
                </div>
            </div>
        </div>
    )
}
```
Mình  đã tạo một lớp CSS được gọi là *content--skyblue*. Điều này là đơn giản để làm cho màu xanh da trời. Mình muốn thêm lớp này vào tiêu đề* Chú chó con dễ thương*. Những gì chúng ta đang làm là tạo một mảng để lưu trữ các lớp CSS, sau đó sử dụng phương thức  **join** để phân chia các lớp với spave. Vì vậy, bây giờ, className sẽ như thế này
```html
 <div className="content__title content--skyblue">APeach Baby Doll</div> 
```

Nhìn vào 2 cách trên bạn có thể thấy rằng chúng không tiện sửa đổi  đặc biệt khi gặp trường hợp UI phức tạp. Không ai muốn viết nhiều câu điều kiện để style cho các component của mình phải không nào ?
Đó là lý do tại sao mình muốn giới thiệu đến các bạn *Styled-components*

# Styled-components
***Use the best bits of ES6 and CSS to style your apps without stress***
Các style Component là 1 thư viện giúp bạn dễ dàng thay đổi các thuộc tính CSS. Bạn chỉ cần install chúng  qua npm hoặc yarn bằng câu lệnh sau :

> npm install styled-components --save hoặc yarn add styled-components
> 
Sau đó sử dụng styled-components để styles cho components của bạn. chúng ta sẽ tiếp tục  thực hiện với  ví dụ trên.
```javascript 

import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
`

const Img = styled.div`
  display: inline-block;
  width: 300px;
  height: 100%;
  background-image: url('https://picsum.photos/300/300?image=1062');
`

const InfoWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 300px);
  height: 100%;
  text-align: left;
`

const Title = styled.div`
  padding: 20px 0 0 20px;
  font-size: 48px;
  color: ${props => (props.skyblue ? 'skyblue' : 'black')};
`

const Description = styled.div`
  padding: 20px;
  font-size: 30px;
  font-style: italic;
  color: #888888;
`

export default ({ skyblue }) => {
    return (
        <ContentWrapper>
            <Img />
            <InfoWrapper>
                <Title>APeach Baby Doll</Title>
                <Description>
                노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
                스피커와 동시에 무드등으로 사용하실 수 있어요.
                </Description>
            </InfoWrapper>
        </ContentWrapper>
    )
}

```

Để sử dụng được chúng ta cần import styled-components vào component của mình.  Chúng ta import nó như là một tên gọi styled. Sau đó chúng ta định nghĩa phần tử HTML nào sẽ được sử dụng cho từng thành phần được style . Ví dụ 
```js
const Button = styled.button` /* CSS Properties */ `
```
Nó có nghĩa là components Button này là viết tứ theo styled-component render 1** <button/>** . Sau  đó chúng ta chỉ cần di chuyển các thuộc tính CSS đến từng styled-component . Nó cực kì đơn giản như vậy thôi.

![](https://images.viblo.asia/1c2e5d0f-93d0-409f-b56d-fedba9201853.png)

Tiếp theo làm  như thế nào để thay đổi tiêu đề bằng cách sử dụng styled-component?  

Các styled-compoent tận dụng lợi thế của các ES6 template literals.
```js
import React from 'react'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
`

const Img = styled.div`
  display: inline-block;
  width: 300px;
  height: 100%;
  background-image: url('https://c7.uihere.com/files/303/112/990/kakaotalk-kakao-ix-corp-emoticon-blog-kakaotalk-emoticon-thumb.jpg');
`

const InfoWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 300px);
  height: 100%;
  text-align: left;
`

const Title = styled.div`
  padding: 20px 0 0 20px;
  font-size: 48px;
  color: ${props => (props.skyblue ? 'skyblue' : 'black')};
`

const Description = styled.div`
  padding: 20px;
  font-size: 30px;
  font-style: italic;
  color: #888888;
`

export default ({ skyblue }) => {
    return (
        <ContentWrapper>
        <Img />
        <InfoWrapper>
            <Title skyblue>APeach Baby Doll</Title>
            <Description>
                노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
                스피커와 동시에 무드등으로 사용하실 수 있어요.
            </Description>
        </InfoWrapper>
        </ContentWrapper>
    )
}
```

Chúng ta truyền props *skyblue* cho component Title chúng được xây dựng với các styled-components. Chúng ta có thể truyền 1 hàm cho các thuộc tính CSS mà chúng ta muốn sửa đổi thông qua các template literals. 

Như bạn thấy chúng ta sử dụng 1 arrow funtion ` ${props => (props.skyblue ? 'skyblue' : 'black')};` để xác định trong điều kiện nào thì Title là màu xanh da trời.

![](https://images.viblo.asia/7938136e-21cd-48d6-a32c-63cc0d472c08.png)
Bây giờ bạn hãy mở Chrome Devtools để xem điều gì sẽ xảy ra khi chúng ta xây dựng component với các styled-component .
![](https://images.viblo.asia/1da07e1d-19aa-472b-a911-4a3e4a8ce746.png)

Các Styled-components được xây dựng  1 hệ thống CSS module tích hợp, điều nay là vời để giải quyết các vấn đề xung đột tên lớp. Tuy nhiên,  chúng ta không chắc chắn những lớp nào là chúng ta đang sử dụng khi chúng là muốn debug. Ngoài ra khi kiểm tra chức năng render trong Context.jsx 
```js
export default ({ skyblue }) => {
  return (
    <ContentWrapper>
      <Img />
      <InfoWrapper>
        <Title skyblue>Cute Puppy</Title>
        <Description>
          Sed ut voluptatem neque cumque. Qui sed ut itaque est doloribus qui.
          Eos perferendis autem qui fugiat.
        </Description>
      </InfoWrapper>
    </ContentWrapper>
  )
}

```
Bạn có biết chúng ta đang sử dụng phần từ HTML nào không? hoàn toàn không, phải không? Bạn phải nhìn lại từng styled-components để kiểm tra xem phần tử HTML nào đang sử dụng. Điều đó thực sự gây phiền nhiễu. Ngoài ra, khi bạn xây dựng các components theo kiểu theo cách này, về cơ bản, bạn chỉ cần từ bỏ các tính năng mạnh mẽ của các bộ chọn CSS.

Từ các vấn đề ở trên, Mình muốn giới  thiệu 1 phương pháp đơn giải để xây dựng 1 styled-component theo kiểu debug, kết hợp CSS chúng với styled-components.

# Kết hợp CSS selectors với Styled-components

Chúng ta chỉ cần thêm các **ClassName** vào các component chung và dễ dàng style chúng với  styled-components. 
```js
import React from 'react'
import styled from 'styled-components'

const Content = ({ skyblue, className }) => {
    return (
        <div className={className}>
        <div className="content__img" />
        <div className="content__info">
            <div className="content__title" skyblue>
                APeach Baby Doll
            </div>
            <div className="content__description">
            노래를 들으며 은은한 램프를 느낄 수 있는 무드 사운드입니다.
            스피커와 동시에 무드등으로 사용하실 수 있어요.
            </div>
        </div>
        </div>
    )
}

const StyledContent = styled(Content)`
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
  .content__img {
    display: inline-block;
    width: 300px;
    height: 100%;
    background-image: url('https://c7.uihere.com/files/303/112/990/kakaotalk-kakao-ix-corp-emoticon-blog-kakaotalk-emoticon-thumb.jpg');
  }
  .content__info {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 300px);
    height: 100%;
    text-align: left;
    .content__title {
      padding: 20px 0 0 20px;
      font-size: 48px;
      color: ${props => (props.skyblue ? 'skyblue' : 'black')};
    }
    .content__description {
      padding: 20px;
      font-size: 30px;
      font-style: italic;
      color: #888888;
    }
  }
`

export default StyledContent


```
Chúng ta cần swap Content.jsx thông qua prop className và chúng ta có thể style cho nó với mẫu này:
```js 
const StyledContent = styled(Content)` /* CSS Properties */ `
```

Sau đó chúng ta có thể swap bất kì component nào vào styled-component, Ngoài ra chúng ta cũng có thể sử dụng sức mạnh của các CSS selector bên trong styled-component. Thậm chí, cú pháp CSS có sẵn trong styled-components. Để xem điều đó sảy ra như thế nào khi chúng ta mở console trong Chrome Devtools.
Bây giờ các class đã có ý nghĩa,  và chúng ta vẫn được hưởng lợi từ hệ thống CSS module  do các  className prop. Nói đơn giản chúng ta chỉ cần quan tâm các class name CSS bên trong component. Và kết quả
![](https://images.viblo.asia/7938136e-21cd-48d6-a32c-63cc0d472c08.png)
Cuộc sống chưa bao giờ tươi đẹp đến thế :D 

![](https://images.viblo.asia/c6f36c0f-bebb-476f-aeee-7f108906fd78.gif)

# Tóm lại 
Chúng ta đã đi tìm hiểu về 2 phương pháp style cho Component thông qua CSS theo kiểu truyền thống.  Sau đó, chúng ta đã học được cách style cho Component  dễ dàng với styled-components . Cuối cùng, chúng ta đã kết hợp các  CSS  selector với styled-components . Bây giờ các Component có thể dễ dàng style  và cũng có thể Debug.

Nguồn :
https://medium.freecodecamp.org/how-to-build-a-debuggable-styled-component-10f7e4fbea2