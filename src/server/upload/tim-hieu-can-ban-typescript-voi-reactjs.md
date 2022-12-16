Hôm nay,mình lại một bài viết về reactjs, chủ đề hôm nay là với typescript. Những điều hay ho và những thuận lợi trong khi làm việc với nó.
![](https://images.viblo.asia/7be53157-271e-4a02-81ef-1bd05ce05832.png)

# I> Bắt đầu:
## 1> Đôi nét về typescript:
Nó do Microsoft phát triển , nó là 1 mã nguồn mở cho lập trình viên phát triển. Là hàng của ông lớn, nên chắc chắn nó phải xịn và được nhiều lập trình viên đón nhận.

Những điểm mạnh từ nó:
* Kế thừa các cú pháp từ javascript nên rất dễ sử dụng hơn các mã nguồn tương tự
* Ngoài kế thừa từ các phiên bản javascript, nó càng hỗ trợ các cú pháp đặc trưng của hướng đối tượng như interface, class,vv nên rất mạnh mẽ khi apply các design pattern.
* Được các lib/framework khuyến khích sử dụng(vì bản thân nó cũng được dần chuyển qua viết bằng typescirpt)
* Những dự án lớn thành công cũng đã áp dụng typescript
* Một điều nữa là nó hỗ trợ rất tốt khi dùng 1 công cụ là visual code (hàng của microsoft) được nhiều ae frontend sử dụng, hỗ trợ suggest code và báo lỗi cực mạnh khi dùng typescirpt trong công cụ này

Hình dưới đây là các tool hỗ trợ typescipt
![](https://images.viblo.asia/89a6467a-a484-445f-b862-7a5c2737d44c.png)

## 2> Bắt đầu cài đặt:
Để bắt đầu làm việc với Typescript Reactjs,một cách đơn giản ta dùng luôn bộ CRA(create-react-app) nổi tiếng:

Nếu bạn dùng npm:
```markdown
npm install create-react-app
create-react-app <name-project> template --typecript
```
hoặc nếu với yarn
```css
yarn add gloabl create-react-app
yarn create react-app my-app --template typescript
```
hoặc theo hướng dẫn từ bài này: https://create-react-app.dev/docs/adding-typescript/

**Kết quả:**
Các file .js đều được viết bằng typescript
![](https://images.viblo.asia/65f5b285-268e-4b4a-9ff3-71bb4d7cf6b7.png)

Nếu bạn dùng visual code (chắc bạn nào cũng dùng), là visual code đã nhận là đang dùng Typescript (mặc định hỗ trợ, và rất mạnh)
![](https://images.viblo.asia/7dce0e0b-9b25-4413-a291-9f9ec5255c7f.png)

Tiếp theo: start app:
```go
yarn start
```
hoặc
```markdown
npm start
```
![](https://images.viblo.asia/5265777b-11a0-436b-8e5e-6f62ef2a5534.png)
# II> Tìm hiểu về Reacjs áp dụng typescript sẽ như thế nào:
## 1> Cách tạo component :
- Với function:
Bộ CRA sẽ có 1 ví dụ:

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Qua ví dụ trên, ta thấy rằng để chỉ rõ là 1 component reactjs, ta cần thêm : `React.FC` sau tên component để khai báo.
Để dễ dàng tìm hiểu, tớ sẽ tạo 1 ví dụ về điều khiến tắt mở bóng đèn.Đầu tiên là component tên là `SwitchButton.tsx`:

```javascript
import React  from 'react';

const SwitchButton:React.FC = () => {
  return(
    <p>The light is ON</p>
  )
}

export default SwitchButton;
````

Lúc này tớ xóa thử đi chữ React.Fc, nó sẽ cảnh báo liền phải khai báo thêm loại cho nó
![](https://images.viblo.asia/7e385286-3c22-455b-9de6-b2e688413b27.png)
Hay việc xóa đi return → cảnh báo rất chi tiết:
![](https://images.viblo.asia/0f09503a-f5ae-4282-b886-66e59c7e38f4.png)

## 2> State:
 ### a) giới thiệu và phân tích
 Một vấn đề hay sử dụng trong khi làm việc với Reacjs, lần này tớ sẽ viết lại component SwitchButton bằng class component.

``` javascript
import React  from 'react';

interface StateButton {
  stateLight: boolean,
}

interface PropsButton {

}

export default class SwitchButton extends React.Component <PropsButton,StateButton> {
  constructor(props:PropsButton) {
    super(props);

    this.state = {
      stateLight: false,
    }
  }

  render() {
    return(
    <p>The light is {this.state.stateLight ? "ON" : "OFF"}</p>
    );
  }
}
```

* Lúc này, mình sẽ tạo cho nó 1 interface tên là StateButton, ở đây mình có thể khai báo cho nó các state có thể có trong component, ở đây mình tạo 1 state có tên là stateLight kiểu boolean chỉ trạng thái bật/mở công tắc.
* Sau đó bạn chú ý ở đoạn tạo component:
```scala
export default class SwitchButton extends React.Component <PropsButton,StateButton>
```
( bạn đừng quan tâm PropsButton, ở đây mình tạo trước thui ✌)

### b) các trường hợp lỗi:
Thế là mình có thể sử dụng như bình thường rồi đấy, giả dụ ở constructor mình set state nó kiểu khác boolen, thì điều gì xảy ra nhỉ:
![](https://images.viblo.asia/8bf3d54a-1101-4d30-9541-317af29dd8a4.png)

Ồ, nó báo lỗi chi tiết là stateLight chỉ được kiểu boolean, không được set kiểu number! Quá tuyệt vời

Giả dụ mình lại thêm 1 state mới là name mà chưa khai báo state kiểu gì ở interface:
![](https://images.viblo.asia/541e6714-0d82-4f1b-bae9-1707447cb7b1.png)

Báo lỗi liền, khá chặt chẽ! Tránh việc khai báo lung tung!

Qua ví dụ trên, ta có thể thấy rằng việc xây dựng reactjs với typescript rất chặt chẽ và chuyên nghiệp! Lại hỗ trợ rất tốt cho người lập trình viên trong việc cảnh báo họ, và cảnh báo rất nhanh! Tốc độ suggest code cũng nhanh hơn(có lẽ hàng của microsoft nên ăn khớp với nhanh, rất là tốt)!!

##  3> Props:
### a) giới thiệu và phân tích 
Thông thường ta hay dùng propstype hay flow-js, còn với typecript ta không cần phải import vào và việc hỗ trợ cũng rất tốt

(Chính facebook cũng khuyêndần chuyển sang typescript là nên dùng flowjs hay các package khác)

* Đầu tiên, tớ đổi state quản lý tắt mở bóng đèn → props:

```javascript
import React  from 'react';

interface PropsButton {
  stateLight: boolean,
}

export default class SwitchButton extends React.Component <PropsButton,{}> {

  render() {
    return(
    <p>The light is {this.props.stateLight ? "ON" : "OFF"}</p>
    );
  }
}
```

Tương tự state, ta cũng tạo ra interface để khai báo loại cho props
- Lần này mình sẽ tạo thêm 1 component cha tên là House → sẽ call component ButtonSwitch này:

```javascript
import React  from 'react';
import SwitchButton from './SwitchButton';

const House:React.FC = () => {
  return(
    <SwitchButton stateLight={false}/>
  )
}

export default House;
```

### b) các trường hợp báo lỗi: 
Ở Component House này khi mình gọi SwitchButton:
* props stateLight mình truyền kiểu khác boolean
![](https://images.viblo.asia/f024c07e-1e28-4ffb-aa91-128a4cfb62f5.png)

* Truyền thiếu props:
![](https://images.viblo.asia/7fec8912-8a1a-4c2e-be36-6817a5443434.png)

* Các trường hợp truyền dư cũng báo lỗi:

![](https://images.viblo.asia/312c1115-33e8-4640-92f6-ae9d31fa7ae0.png)

# III> Kết luận:
* Typescript kết hợp với reactjs rất tốt, giúp reactjs được chặt chẽ hơn! Nó còn hỗ trợ lập trình viên và tương thích rất tốt với các editor.
* Ngoài các ứng dụng trên, nó còn hỗ trợ với refs, event,… trong reacjts! hẹn sẽ viết ở bài sau!
# IV> Tham khảo:
* cài đặt với create-react-app: https://create-react-app.dev/docs/adding-typescript/
* trang chủ typescript: https://create-react-app.dev/docs/adding-typescript/