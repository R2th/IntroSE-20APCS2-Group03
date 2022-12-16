# Mở đầu
Hẳn là các bạn không còn lạ lẫm gì với mã QR code - một ứng dụng khá hữu ích cho các ứng dụng điện thoại cũng như ứng dụng web bởi sự tiện dụng khi mã hóa dữ liệu. Bên cạnh đó nó cũng làm cho ứng dụng có thêm đôi phần xịn xò. Ngày hôm nay mình sẽ hướng dẫn các bạn có thể tự động generate các mã QR code cho ứng dụng của mình trong framework Reactjs.
![](https://images.viblo.asia/11687a8f-70a6-40fa-8419-b29403cc6a6a.png)

# Cài đặt môi trường
Môi trường để cài đặt thì hoàn toàn đơn giản, mình sẽ sử dụng create-react-app để tạo ra một project Reactjs:
```bash
npx create-react-app demo-qrcode && cd demo-qrcode
```

Nếu chưa biết đến package create-react-app thì các bạn có thể đọc qua tại [đây](https://create-react-app.dev/docs/getting-started).

Chờ một chút để câu lệnh setup và mình sẽ có một project để cài đặt qr-code :
![](https://images.viblo.asia/f47b8cec-ce7b-44eb-b086-0c6db8be72dd.png)

# Cài đặt 

Module chúng ta sử dụng tại đây sẽ là **qrcode.react**, cài đặt vào project thông qua câu lệnh (Nhớ rằng đã cài yarn) :
```js
yarn add qrcode.react -s
```

Sau khi cài đặt xong thì chúng ta đã có gói cần thiết để xây dựng QR code cho ứng dụng. Để dễ dàng demo cho các bạn, mình sẽ code  trực tiếp trong file **App.js** :

```js
import React from 'react';
import './App.css';
import QRCode from 'qrcode.react';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <div>
          <QRCode
            id='qrcode'
            value='https://viblo.asia/u/tranchien'
            size={290}
            level={'H'}
            includeMargin={true}
          />
        </div>
      </header>
    </div>
  );
}

export default App;

```

Và kết quả là đây: 
![](https://images.viblo.asia/27b5bb69-845f-4654-b50e-e2b0108fbb85.png)


Phần các bạn quan tâm chí là phần này 
```js
 <QRCode
    id='qrcode'
    value='https://viblo.asia/u/tranchien'
    size={290}
    level={'H'}
    includeMargin={true}
  />
```

Chi tiết các đối số truyền vào các bạn có thể tham khảo tại đây:


| Props | type | default value|
| -------- | -------- | -------- |
| value     | string     |      |
| renderAs | string ('canvas' 'svg') | 'canvas' |
| size     | number     | 128     |
| bgColor | string (CSS color) | "#FFFFFF" |
| fgColor     | string (CSS color)     | "#000000"     |
| level     | string ('L' 'M' 'Q' 'H')     | 'L'     |
| includeMargin     | boolean     | false    |

Trong đây dữ liệu muốn được mã hóa thành đoạn QR code sẽ để trong params **value**, cũng có thể custom dạng render theo **canvas** hoặc **svg**  thông qua params **renderAs**

Thêm một chút "xịn xò" nữa bằng cách thêm một nút **download** cho mã qrcode này

thông qua  function **downloadQR** :
```js
import React from 'react';
import './App.css';
import QRCode from 'qrcode.react';

const downloadQR = () => {
  const canvas = document.getElementById('qrcode');
  const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  console.log('pngUrl', pngUrl);
  let downloadLink = document.createElement('a');
  downloadLink.href = pngUrl;
  downloadLink.download = 'viblo-tranchien.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <QRCode
            id='qrcode'
            value='https://viblo.asia/u/tranchien'
            size={290}
            level={'H'}
            includeMargin={true}
          />
          <br />
          <a onClick={downloadQR}> Download QR </a>
        </div>
      </header>
    </div>
  );
}

export default App;
};
```

Nôm na thì function này sẽ chuyển đổi đoạn canvas QR code đó thành một đường link và gắn vào cây DOM rồi **click** sau đó lại xóa đi (khá cồng kềnh) :

![](https://images.viblo.asia/0d61cb10-afcc-4d69-9c84-ce7e5b0d80bc.png)

# Kết luận
Bài viết khá ngắn gọn (đúng với tiêu đề - 1 phút Reactjs) tuy nhiên cũng đã giới thiệu được khá rõ một hướng tiếp cận để bê ngay QR code vào dự án của các bạn. Mong rằng sẽ có ích đối với các bạn

# Nguồn
- [Npm](https://www.npmjs.com/package/qrcode.react)

- [Medium](https://medium.com/@zaran.56/how-to-generate-and-download-a-qr-code-image-in-react-a3e924a672f5)