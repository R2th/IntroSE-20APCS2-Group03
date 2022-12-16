# **Mở đầu**
Hẳn là bạn đã dùng qua các loại hook useState, useEffect, useRef... nhưng bạn đã từng nghe nói tới custom hook chưa ? Hoặc cũng có thể như mình, nghe rồi, đọc rồi mà cũng không hiểu tại sao phải có nó, dùng như thế nào? nên sau một hồi tự tìm tòi mình chắt lọc được một số kiến thức sau, hi vọng giúp ích được gì đó :heart_eyes:
# **Thân bài**

Xin giới thiệu với mọi người Tèo - bạn mình là một fanboy chân cmn chính của class component và không bao giờ chịu viết theo kiểu functional component + hook. Một ngày nọ có một anh khách đẹp trai đến gặp Tèo và đưa ra 1 cái app với UI đơn giản như này
![](https://images.viblo.asia/a7d8eb41-1ec6-4f6b-97fd-c6e1988465eb.gif)

<p><b>Anh Khách đẹp trai</b>: Em thiết kế cái UI y hệt như này cho anh mà làm khoảng 1000 hình đủ hình dạng nha ở đây a show ví dụ 2 hình thôi, với mỗi hình mỗi giây trôi qua sẽ đổi random 1 màu từ #00000 tới #999999 cho background color nha em.</p>
<p><b>Tèo</b>: OK HKT anh, (thinking: copy code mỏi tay à, 1000 hình lận mà)</p>

-----
Vốn là một  fanboy chân cmn chính của class component nên Tèo đã code như sau:
**App.js**
```
function App() {
  return (
    <div>
      <BigCircle />
      <BigRectangle />
    </div>
  );
}

export default App
```

**components/BigCircle.js**
```
class BigCircle extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      color: 'green'
    }
  }

  componentDidMount() {
    this.intervalColor = setInterval(() => {
      const newColor = Math.floor(Math.random() * 999999)
      this.setState({ color: `#${newColor}` })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.intervalColor)
  }

  render() {
    const { color } = this.state
    return (
      <div className="big-circle" style={{backgroundColor: color}}>
        Big Circle
      </div>
    );
  }
}

export default BigCircle;
```


-----
Tui tình cờ đi ngang thấy Tèo đang copy say sưa ra xong rồi chỉnh css lại cho ra hình mới nên mới hỏi Tèo đang làm gì đó?
<p><b>Tèo</b>: ông khách ổng đòi tao làm 1000 hình khác nhau nhưng logic như nhau nên tao phải copy ra 1000 lần rồi chỉnh css lại nè. Có cách nào làm cho nhanh hơn ko mày? </p>
<p><b>Tui</b>: trước khi bàn tới chuyện nhanh hay không thì mình bàn tới chuyện tốt hay không đã, giờ theo mày cách code này có tốt không ? </p>
<p><b>Tèo</b>: Tao thấy bình thường có vấn đề gì đâu, chạy ok hết mà? </p>
<p><b>Tui</b>: cùng 1 logic mà phải copy paste tùm lum chỗ vậy mà tốt gì? Lỡ mai ông khách mày đòi đổi thành 3s mới đổi màu 1 lần rồi sao? Vô 1000 file đó sửa lại chắc gãy tay  </p>
<p><b>Tèo</b>: Ờ hé, dị là phải viết nó ở đâu đó để xài chung hả mày? Dị tao tách cái hàm setInterval ra function chung là được chứ gì.  </p>


-----
Tèo sửa lại

```
function setIntervalColor(interval, cb) {
  return setInterval(() => {
    const newColor = Math.floor(Math.random() * 999999)
    cb(`#${newColor}`)
  }, interval); 
}
```
**components/BigCircle.js**
```
class BigCircle extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      color: 'green'
    }
  }

  componentDidMount(){
    this.intervalColor = setIntervalColor(1000, (newColor) => {
      this.setState({color: newColor})
    })
  }

  componentWillUnmount(){
    clearInterval(this.intervalColor)
  }

  render() {
    const { color } = this.state
    return (
      <div className="big-circle" style={{backgroundColor: color}}>
        Big Circle
      </div>
    );
  }
}

export default BigCircle;
```

<p><b>Tui</b>: Vậy giờ ổng đòi mày trước khi xóa khỏi DOM set lại cho nó thành màu đỏ thì mày làm sao, đi sửa hết 1000 component hả?</p>
<p><b>Tèo</b>: Sax, khó vậy, vậy thì làm sao ta?</p>
<p><b>Tui</b>: Hiện tại logic bị trùng lặp thấy hem, ở component nào cũng có cái state color để lấy cái màu hiện tại, rồi trong componentDidMount khai báo 1 cái interval để setState đổi màu lại, rồi componentWillUnmount thì clear cái  interval đó đi</p>
<p><b>Tèo</b>: Chứ sao mày đâu có cách nào khác được. @@</p>
<p><b>Tui</b>: Viết lại bằng functional component với hook đi</p>


-----
**components/BigCircle.js**
```
function BigCircle(props) {

  const [color, setColor] = useState('green')

  useEffect(() => {
    const intervalColor = setInterval(() => {
      const newColor = Math.floor(Math.random() * 999999)
      setColor(`#${newColor}`)
    }, 1000); 
    return () => {
      clearInterval(intervalColor)
    }
  }, [])
  
  return (
    <div className="big-circle" style={{backgroundColor: color}}>
      Big Circle
    </div>
  );
}

export default BigCircle;
```
<p><b>Tui</b>: OK, mày đã bao giờ nghe nói về custom hook chưa ?</p>
<p><b>Tèo</b>: Chưa, nghe lạ vậy? </p>
<p><b>Tui</b>: Trong trường hợp này, cái mà component muốn nhận chỉ là mã màu, còn những dòng code còn lại thì chỉ phục vụ cho mục đích trả về mã màu đó đúng không? Mình copy 1 đống logic này cho từng component thì không tốt tí nào, sao mình không tách nó ra riêng để khỏi bị trùng lặp nhỉ và chỉ trả về cho component cái mà nó muốn nhận là mã màu thôi</p>
<p><b>Tèo</b>: Ủa sao tách được, nó là state gắn liền với component mà, rồi còn handle mount/ unmount của component đó nữa mà </p>
<p><b>Tui</b>: Đúng, hồi đó thì không được nhưng từ khi có khái niệm customHook ra đời thì chuyện này easy luôn. Về cơ bản thì custom hook là các function bắt đầu bằng 'use' (không phải bắt đầu từ 'use' là báo lỗi) có thể sử dụng các hook khác nhưng thay vì return ra JSX thì nó return ra value gì đó, để tao viết lại cho mày coi</p>

```
function useMagicColor(props) {
  const [color, setColor] = useState('green')
  useEffect(() => {
    const intervalColor = setInterval(() => {
      const newColor = Math.floor(Math.random() * 999999)
      setColor(`#${newColor}`)
    }, 1000);
    return () => {
      clearInterval(intervalColor)
    }
  }, [])
  return color
}

export {useMagicColor};
```
<p><b>Tui</b>: Thấy không, nó cũng có thể xài useState, useEffect hay mấy hook khác mà không cần return JSX nè, bây giờ ở component nào cần xài logic này thì mày import rồi gọi useMagicColor như gọi hàm bình thường vậy đó</p>

```
import React from 'react';
import './styles.scss'
import { useMagicColor } from '../customHooks'

function BigCircle(props) {
  const color = useMagicColor()
  return (
    <div className="big-circle" style={{backgroundColor: color}}>
      Big Circle
    </div>
  );
}

export default BigCircle;
```

# **Kết bài**
Custom hook này quả thật rất lợi hại, nó giúp seperate code logic ra khỏi component giúp code dễ maintain và đẹp hơn nữa.Cuối cùng thì Tèo cũng tìm ra được cách làm tốt nhất, bài đã dài nên hẹn mọi người bài tiếp theo cũng về chủ đề này nhưng sẽ có ví dụ sử dụng custom hook vô cùng thực tiễn mà chắc chắn mọi người ai cũng phải dùng đó là fetch data bằng custom hook. Cảm ơn vì đã đọc bài của mình <3

Tham khảo: Kênh Youtube của idol Hậu - Easy Frontend