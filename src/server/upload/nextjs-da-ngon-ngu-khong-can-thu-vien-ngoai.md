# 1. Mở đầu
Chào mọi người, chắc hẳn với thời kì thế giới phẳng như hiện tại thì việc tiếp cận sản phẩm đến các quốc gia khác nhau đấy là một điều tất yếu. Và mỗi trang web lớn đều hướng tới mục tiêu toàn cầu. Và một trong những điều kiện cơ bản và cách thực hiện dễ nhất đấy là việc tích hợp đa ngôn ngữ trên trang web để thân thiện với người dùng ở mỗi quốc gia khác nhau.
Với NextJS rất đơn giản để có thể tích hợp tính năng cần thiết này. Hiện tại có rất nhiều package bên ngoài có thể tích hợp vào để triển khai đa ngôn ngữ. Nhưng ngày hôm nay mình sẽ giới thiệu một cách thủ công mà không dùng tới package bên ngoài. Chúng ta cùng đọc bài viết ở dưới nhé! 
![](https://images.viblo.asia/a587cb51-7daf-4219-9cb9-875ca90ec031.png)

# 2. Cài đặt
Bắt đầu 
```markdown
Next.js has built-in support for internationalized (i18n) routing since v10.0.0. You can provide a list of locales, the default locale, and domain-specific locales and Next.js will automatically handle the routing.
The i18n routing support is currently meant to complement existing i18n library solutions like react-intl, react-i18next, lingui, rosetta, and others by streamlining the routes and locale parsing.
```

Next.js đã ghi rõ bắt đầu từ phiên bản v10.0.0. Next.js đã cung cấp tính năng đa ngôn ngữ cũng như tự động nhận ngôn ngữ qua url routing. Thật tiện lợi, chúng ta chỉ cần đọc lại doc của Next.js và triển khai cài đặt. Bắt đầu nào.
Đầu tiên và quan trọng nhất chúng ta cần thêm config cho next.js để tự động nhận ngôn ngữ cũng như ngôn ngữ mặc định thông qua url.
Mình đã tạo sẵn một app reactjs thông qua yarn. ```$ yarn create your_app```.

Ok, chúng ta mở project lên và tạo thêm một fìle config: i18n.config.js với nội dung như dưới đây :

```javascript:i18n.config.js
module.exports = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
  },
}
```
Ở trên là cách config sử dụng path để đổi ngôn ngữ : nó sẽ như thế này : ```yourdomain.com/[lang]``` với lang là config trong locales, nếu bạn không để ngôn ngữ trong danh sách locales thì trang sẽ báo lỗi 404. 

Import vào next.config.js
```javascript:next.config.js
const { i18n } = require('./i18n.config')

module.exports = {
    i18n,
}
```

Các bạn thử yarn dev và thêm vào path ngôn ngữ như dưới nếu chạy được thì thành công rồi đấy!

![](https://images.viblo.asia/f2821e3e-a6bb-4d75-b9b5-d7dfa95d02ab.gif)

Ok bây giờ trước tiên chúng ta cần 2 file ngôn ngữ bao gồm tiếng anh và tiếng việt. Mình sẽ để chúng trong folder: public/lang/[lang].js Với nội dung như dưới :
```javascript:public/lang/vi.js
export default {
    home: {
        title: 'Chào mừng tới Viblo!',
        content: 'Bắt đầu một bài viết nào',
    }
}
```
```javascript:public/lang/en.js
export default {
    home: {
        title: 'Chào mừng tới Viblo!',
        content: 'Bắt đầu một bài viết nào',
    }
}
```

Tiếp theo chúng ta cần tạo thêm 1 hook phục vụ cho việc chuyển đổi ngôn ngữ khi thay đổi path. mình để ngay trong folder page nhé : 
```page/hooks/useTrans.js
import { useRouter } from 'next/router'
import en from '../../public/lang/en.js'
import vi from '../../public/lang/vi.js'

const useTrans = () => {
    const { locale } = useRouter()

    const trans = locale === 'vi' ? vi : en

    return trans
}

export default useTrans
```
trong components chúng ta import hook ```useTrans()``` vừa tạo ở trên vào. Mục đích của hooks này để nhận file dịch bằng tiếng việt hoặc tiếng anh để lấy nội dung ra. Các bạn có thể sửa lại hook này để nó trả về dạng khác như một function và tách chuỗi cần dịch đầu vào để nhận file... Cái đấy do mọi người tùy biến nhé. Mình chỉ thực hiện cách đơn giản nhất là return ra cả file đã dịch.
```components/Hello.js
import styles from '../../styles/Home.module.css'
import useTrans from '../hooks/useTrans'
const Hello = () => {
    const trans = useTrans()

    return (
        <>   
            <main className={styles.main}>
                <h1 className={styles.title}>
                    { trans.home.title }
                </h1>

                <p className={styles.description}>
                    { trans.home.content }
                </p>
            </main>
        </>
    )
}

export default Hello
```
Sửa lại file index một chút :)))
```javascript:page/index.js
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Hello from './components/Hello'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hello />
    </div>
  )
}

```

Cuối cùng là thành quả :
![](https://images.viblo.asia/6765f655-36e9-41d0-9fc3-180875bc695e.gif)
Bây giờ thêm một nút chuyển đổi ngôn ngữ cho tiện lợi nhé :D

```components/Hello.js
...
const Hello = () => {
    const trans = useTrans()
    const router = useRouter()

    const changeLang = (lang) => {
        router.push('/', '/', { locale: lang })
    }
    return (
        <>   
            <main className={styles.main}>
                <h1 className={styles.title}>
                    { trans.home.title }
                </h1>

                <p className={styles.description}>
                    { trans.home.content }
                </p>
                <button onClick={() => changeLang('vi')} >vi</button>
                <button onClick={() => changeLang('en')}>en</button>
            </main>
        </>
    )
}

export default Hello
```

Như vậy chúng ta đã hoàn thành việc thay đổi ngôn ngữ với next.js
![](https://images.viblo.asia/226ad007-5627-4901-b1de-b0066442957a.gif)

   Còn một phần quan trọng nữa. Next.js được tận dụng để server-side-rendering (SSR) vậy để đa ngôn ngữ, nội dung trang web của chúng ta cũng cần được nhận đúng ngôn ngữ từ phía backend. Mỗi khi đó chúng ta đã biết, next.js có tính năng SSR với phương thức ```getStaticProps``` và với phương thức này đã cho chúng ta tham số context truyền vào. Trong context bao gồm những thứ cơ bản như params, preview, previewData, locale, locales, defaultLocale. Trong bài viết này mình sẽ chú trọng tới locale. Để SSR có thể nhận dữ liệu từ backend và có thể nhận đúng ngôn ngữ đã chọn thì chúng ta sẽ cần tới tham số locale. chúng ta sẽ viết trong hàm getStaticProps như sau: 

```javascript:pages/index.js
export const getStaticProps = async ({ locale }) => 
{
    const res = await fetch(`https//your-api.xyz`, { locale })

    ...

    return { props }
}
```

Như vậy chúng ta có thể lấy được nội dung với đúng ngôn ngữ mong muốn ngay lần đầu tiên load trang.

# 3. Tổng kết
Cuối cùng bài viết cũng đến hồi kết. Trong bài viết mình chỉ thực hiện những bước cơ bản để đa ngôn ngữ một website sử dụng framework Next.js, mọi người có thể custom theo ý mình mong muốn và tối ưu hơn nữa nhé. Trong việc đa ngôn ngữ, tùy vào mục đích sử dụng mà chúng ta có thể sử dụng thêm thư viện ngoài (react-intl, react-i18next, lingui) có thể tối ưu hơn nhưng bất lợi chúng ta cần phải đọc và hiểu rõ thư viện đó cũng mất một ít thời gian, hoặc tự mình đa ngôn ngữ với những công cụ sẵn có nếu dự án đang cần gấp. Hi vong bài viết sẽ giúp ích cho công việc của mọi người. Cảm ơn và hẹn gặp lại mọi người trong những bài viết sau.