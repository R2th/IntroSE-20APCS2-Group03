# Đặt vấn đề
Trong Nextjs ta biết rằng khi ta di chuyển các page bằng cách nhấp vào một liên kết, Nextjs sẽ hiển thị lại toàn bộ giao diện người dùng bằng các xóa bỏ toàn bộ page cũ và thay vào đó 1 page mới.
<br />
Điều này đặt ra một vấn đề, nếu ta có một component dùng chung giữa các page, và ta không muốn nó bị xóa đi và hiển thị lại khi di chuyển giữa các page đó thì ta phải xử lý thế nào ?
<br />
Đầu tiên ta hãy xem qua ví dụ dưới đây:

# Ví dụ đặt ra
Ta sẽ tạo một project có cấu trúc như sau:
![](https://images.viblo.asia/262b387d-f427-472b-808a-1855ff176447.png)

Trong đó:
```javascript:LabelLayout
const LabelLayout = (props) => {
    return (
        <div>
            <h1>Day la phan tu dung chung</h1>
            {props.children}
        </div>
    )
}

export default LabelLayout;
```
<br />

```javascript:InputLayout
import { useState } from 'react';

const InputLayout = () => {
    const [inputState, setInputState] = useState('');

    const handleInputChange = (e) => {
        setInputState(e.target.value);
    }

    return (
        <div>
            <input type='text' value={inputState} onChange={handleInputChange} />
        </div>
    )
}

export default InputLayout;
```

<br />

```javascript:_app
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```

<br />

```javascript:index
import LabelLayout from '../components/LabelLayout';
import InputLayout from '../components/InputLayout';
import Link from 'next/link';

export default function Home() {
  return (
    <LabelLayout>
      <InputLayout>
        <br />
        <br />
        <h2>Day la Page Home</h2>
        <Link href='/user' passHref>
            <button>Sang page User</button>
        </Link>
      </InputLayout>
    </LabelLayout>
  )
}
```

<br />

```javascript:user
import LabelLayout from '../components/LabelLayout';
import InputLayout from '../components/InputLayout';
import Link from 'next/link';

export default function User() {
  return (
    <LabelLayout>
      <InputLayout>
        <br />
        <br />
        <h2>Day la Page User</h2>
        <Link href='/' passHref>
            <button>Sang page Home</button>
        </Link>
      </InputLayout>
    </LabelLayout>
  )
}
```

Project sẽ có 2 page home và user, cả 2 đều có 2 component chung là LabelLayout và InputLayout. <br />
Ta thấy rằng, nếu ta chuyển từ trang home sang user ( hay ngược lại ) 2 component chung LabelLayout và InputLayout đều bị xóa đi và hiển thị lại, do 2 component nằm bên trong page, nếu page thay đổi nextjs sẽ loại bỏ toàn bộ phần tử của page và thay vào một page mới, kể cả các phần tử trong các page giống hệt nhau.
<br/>
Bây giờ ta sẽ đến cách giải quyết nó :triumph:

# Cách 1: Ném hết component chung vào file _app.js
Như tiêu đề trên, ta sẽ ném 2 component chung LabelLayout và InputLayout  vào _app.js, và xóa chúng trong file index và user đi.

```javascript:_app
import '../styles/globals.css'
import LabelLayout from '../components/LabelLayout';
import InputLayout from '../components/InputLayout';

function MyApp({ Component, pageProps }) {
  return(
    <LabelLayout>
      <InputLayout>
        <br />
        <br />
        <Component {...pageProps} />
      </InputLayout>
    </LabelLayout>
  ) 
}

export default MyApp
```

<br />

```javascript:index
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>Day la Page Home</h2>
      <Link href='/user' passHref>
        <button>Sang page User</button>
      </Link>
    </div>
  )
}
```

<br />

```javascript:user
import Link from 'next/link';

export default function User() {
  return (
    <div>
      <h2>Day la Page User</h2>
      <Link href='/' passHref>
        <button>Sang page Home</button>
      </Link>
    </div>
  )
}
```

Khi chạy ta sẽ thấy nó không còn bị hiển thị lại hai component LabelLayout và InputLayout, vì nó nằm ngoài các page và không bị hủy kéo theo khi page bị hủy và thay bằng page khác.<br/>
Bằng cách này nó đã giải quyết được vấn đề đưa ra, nhưng nó vẫn tồn tại điểm yếu:
### Điểm yếu

Vì các component này được đặt ở _app.js, do đó mọi page đều sẽ hiển thị các component này, nếu ta muốn một số page hiển thị các component chung khác nhau hay không hiển thị component chung, cách này hiện đang không giải quyết được, do đó cách này chỉ sử dụng khi có các component được chia sẻ cho mọi page.
<br />
Để xử lý điểm yếu này ta sẽ xem ở phần sau nhé.