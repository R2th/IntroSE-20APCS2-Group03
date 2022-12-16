# Đặt vấn đề
Ở bài [trước](https://viblo.asia/p/cac-phuong-phap-tranh-hien-thi-lai-cac-component-dung-chung-trong-nextjs-part-1-OeVKBAD25kW), ta đã tìm ra cách giải quyết việc hiển thị lại các component dùng chung trong Nextjs, nhưng vẫn tồn tại điểm yếu rằng các component luôn được chia sẻ cho mọi page, do đó ta sẽ xem xét đến cách khác giải quyết vấn đề này.

> ***Ở bài viết này, vẫn sử dụng project ở bài trước.***

# Cách 2: Vẫn ném hết component chung vào file _app.js nhưng đặt thêm điều kiện

Ta xem lại cấu trúc project :
![](https://images.viblo.asia/262b387d-f427-472b-808a-1855ff176447.png)

<br/>
Mọi file vẫn giữ nguyên, ta chỉ sửa trong _app.js, lúc trước ta có:

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

Bây giờ sẽ là:

```javascript:_app
import '../styles/globals.css'
import LabelLayout from '../components/LabelLayout';
import InputLayout from '../components/InputLayout';

function MyApp({ Component, pageProps, router }) {
  if(router.pathname === '/') {
    return(
      <InputLayout>
          <br />
          <br />
          <Component {...pageProps} />
      </InputLayout>
    )
  }

  return(
    <InputLayout>
      <LabelLayout>
        <br />
        <br />
        <Component {...pageProps} />
      </LabelLayout>
    </InputLayout>
  )
}

export default MyApp
```

Với code như trên, thì khi mà ta ở page home thì nó sẽ chỉ có component chung là InputLayout, còn các page còn lại sẽ có 2 component chung là  InputLayout và LabelLayout. ( Đặc biệt: InputLayout từ page home sang các page khác sẽ không hiển thị lại dù nằm trong 2 câu lệnh return khác nhau do nằm cùng một vị trí trên dom ) <br/>
Điều này giải quyết vấn đề đưa ra: các page khác nhau sẽ có thể có các component chung khác nhau tùy ý, nhưng .... vẫn có điểm yếu.

### Điểm yếu
Điểm yếu của cách này là dù giải quyết được các vấn đề nhưng rõ ràng, nếu project to lên và các nhiều page hơn, đồng thời xảy ra vô vàn các trường hợp page này có component chung này, page kia có component chung kia, dẫn tới vô vàn các lệnh if => vượt quá tầm kiểm soát.<br/>
Do đó nếu project nhỏ cách này có thể thực hiện tốt, nhưng project lớn thì nên có cách khác.

# Cách 3: Thôi không ném hết component chung vào file _app.js nữa, các page sẽ tự quản lý nên dùng component nào
Như trên, việc để _app.js quản lý các component chung của các page là khó kiểm soát khi project lớn, nên tốt nhất là để các page tự quản lý.
<br/>
<br/>
Ta sẽ sửa file index và user như sau:

```javascript:index
import InputLayout from '../components/InputLayout';
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

Home.sharedComponent = InputLayout; //sharedComponent không phải biến đặc biệt, chỉ là mình để như vậy

export default Home;
```

<br />

```javascript:user
import InputLayout from '../components/InputLayout';
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

User.sharedComponent = InputLayout;

export default User;
```

<br />
Và _app.js sẽ là:

```javascript:_app
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const SharedComponent = Component.sharedComponent || ((props) => <>{props.children}</>)
  return (
    <SharedComponent>
      <Component {...pageProps} />
    </SharedComponent>
  )
}

export default MyApp
```

Ở đây, các page sẽ tự chọn component chung qua biến sharedComponent, khi ta di chuyển các page,  _app sẽ nhận sharedComponent này và return một cách hợp lý, ( nếu không có sharedComponent thì nó trả về trống thôi ).<br/>
Vậy vấn đề được giải quyết, các page đã tự quản lý component chung.
> ***Vậy cách này còn điểm yếu không ?***

Còn =))
### Điểm yếu
Do ta gán component qua biến sharedComponent, do đó nó chỉ nhận được 1 component mà thôi ( đấy là lý do trong cách này chưa dùng đến LabelComponent ), với nhiều component ta muốn gán, ta phải dùng cách khác.
<br />
Để xử lý điểm yếu này ta sẽ xem ở phần sau nhé.