# Đặt vấn đề
Nếu các bạn chưa xem các phần trước, hãy xem tại đây: [Part 1](https://viblo.asia/p/cac-phuong-phap-tranh-hien-thi-lai-cac-component-dung-chung-trong-nextjs-part-1-OeVKBAD25kW)[ Part 2](https://viblo.asia/p/cac-phuong-phap-tranh-hien-thi-lai-cac-component-dung-chung-trong-nextjs-part-2-RQqKLGEz57z)<br/>

Ở bài trước, ta đã tìm ra cách giải quyết việc hiển thị lại các component dùng chung trong Nextjs bằng cách để các page tự xử lý, nhưng vẫn tồn tại điểm yếu rằng các page chỉ chọn được 1 component sử dụng chung , do đó ta sẽ xem xét đến cách giải quyết vấn đề này.

> ***Ở bài viết này, vẫn sử dụng project ở các bài trước.***

# Cách cuối: Vẫn để các page sẽ tự quản lý nên dùng component nào nhưng dùng hàm thay vì biến

Ta xem lại cấu trúc project :
![](https://images.viblo.asia/262b387d-f427-472b-808a-1855ff176447.png)

<br />
Mọi file vẫn giữ nguyên, ta sẽ chỉnh sửa lại các file index, user và _app:


```javascript:index
import InputLayout from '../components/InputLayout';
import LabelLayout from '../components/LabelLayout';
import Link from 'next/link';

const Home = () => {
  return (
      <div>
        <h2>Day la Page Home</h2>
        <Link href='/user' passHref>
            <button>Sang page User</button>
        </Link>
      </div>
  )
}

Home.sharedComponentFunction = (page) => (
  <LabelLayout>
      <InputLayout>
          {page}
      </InputLayout>
  </LabelLayout>
)

export default Home;
```

<br />

```javascript:user
import InputLayout from '../components/InputLayout';
import LabelLayout from '../components/LabelLayout';
import Link from 'next/link';

const User = () => {
  return (
      <div>
        <h2>Day la Page User</h2>
        <Link href='/' passHref>
            <button>Sang page Home</button>
        </Link>
      </div>
  )
}

User.sharedComponentFunction = (page) => (
    <LabelLayout>
        <InputLayout>
            {page}
        </InputLayout>
    </LabelLayout>
)

export default User;
```

<br />

```javascript:_app
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const sharedComponentFunction = Component.sharedComponentFunction || (page => page);

  return sharedComponentFunction(<Component {...pageProps} />);
}

export default MyApp
```

Ở đây, các page sẽ tự chọn component chung qua hàm sharedComponentFunction thay cho biến sharedComponent ở cách 3 trước, điều này cho phép các page có thể chọn nhiều component chung thay vì chỉ 1 component. Khi ta di chuyển các page,  _app sẽ nhận hàm sharedComponentFunction này và gọi hàm khi return.<br />
Vậy vấn đề được giải quyết, các page đã tự quản lý component chung với số lượng bất kỳ.

>***Ờ.... vậy là kết thúc rồi nhỉ ?***

Yeah, đây là cách cuối cùng rồi, nhưng trước khi kết thúc, ta nên xem xét nốt 1 vấn đề nhỏ nữa.

###  Ngăn việc khai báo lặp lại trong hàm khai báo component chung
Như ta thấy trong các page, việc khai báo lặp đi lặp lại sharedComponentFunction là không tốt, thừa thãi và khó cập nhật khi thay đổi => ta nên tạo 1 file riêng khai báo hàm này và gọi lại nó trong các page:

```javascript:layout
import InputLayout from '../components/InputLayout';
import LabelLayout from '../components/LabelLayout';

export const sharedComponentFunction = (page) => (
    <LabelLayout>
        <InputLayout>
            {page}
        </InputLayout>
    </LabelLayout>
)
```

và trong page: ( ví dụ index )

```javascript:index
import Link from 'next/link';
import { sharedComponentFunction } from '../layout/layout'

const Home = () => {
  return (
      <div>
        <h2>Day la Page Home</h2>
        <Link href='/user' passHref>
            <button>Sang page User</button>
        </Link>
      </div>
  )
}

Home.sharedComponentFunction = sharedComponentFunction;

export default Home;
```

Vậy là kết thúc, :slightly_smiling_face: hẹn gặp lại các bạn vào bài viết khác.