Ở phiên bản Nextjs Version 10 mới đây, việc sử dụng i18n đã trở nên dễ dàng hơn qua tính nâng cao là Internationalized Routing.
Trong bài viết này sẽ sử dụng Sub-path Routing (ví dụ: http://abc.com/en/) thay vì Domain Routing (ví dụ: http://abc.en).

### Cài đặt cấu hình cơ bản

Tại file ***next.config.js***

```js
module.exports = {
    i18n: {
      locales: ['vi', 'en'],
      defaultLocale: 'vi',
    },
  }
```
Đây là thiết lập cẩn thiết để bật chế độ phát hiện ngôn ngữ. Chế độ này sẽ chuyển hướng user đến đường dẫn có tiền tố ***/vi*** nếu như trình duyệt hiện tại đang dùng đang cài đặt ngôn ngữ là tiếng Việt làm ngôn ngữ mặc định. NextJs sẽ dựa vào Accept-Language HTTP Header để cố gắng setup đúng ngôn ngữ. 

Tuy nhiên, nếu ngôn ngữ không chính xác thì nó sẽ sử dụng ngôn ngữ mặc định. Ví dụ, do đã config ngôn ngữ mặc định là *VI* (Vietnam), nên nếu trình duyệt hiện tại user sử dụng đang để ngôn ngữ là *DE* (German), tuy nhiên nó không xác định được theo ngôn ngữ trình duyệt đang cài đặt, nên nó sẽ mặc định cho về *VI*.

### Quản lý Locale Files

NextJS không có quy định nào với việc quản lý locale data hay việc bạn nên sử dụng thư viện i18n nào (hoặc bất kì một thư viện nào khác) phù hợp nhất. Với project nhỏ, thì chỉ cần 1 file .JSON là đủ. Nhưng với những project lớn, việc chia nhỏ lẻ và tránh gộp chung chỉ một file là điều vô cùng cần thiết.

Ở đây chúng ta sẽ tạo một folder với tên là locale và tạo riêng 1 file .JSON cho từng ngôn ngữ. Tức là locale/vi.json và locale/en.json.

```js
{
  "greeting": "Xin chào!"
}
```

Có thể sử dụng từ khoá để hiển thị giá trị của ngôn ngữ đã dịch mà không cần bất kì thư viện nào. Tuy nhiên, chúng ta nên sử dụng react-intl vì nó là thư viện i18n khá phổ biến hiện có.

Cấu hình thêm như này trong file *_app.js*

```js
import '../styles/index.css'
import { IntlProvider } from 'react-intl';
import { useRouter } from "next/router"

const languages = {
  vi: require('../locale/vi.json'),
  en: require('../locale/en.json')
};

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale, defaultLocale } = router;
  const messages = languages[locale];
  return <IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}>
      <Component {...pageProps} />
      </IntlProvider>
}

export default MyApp
```
Như trên, nghĩa là chúng ta đang đóng gói toàn bộ ứng dụng của mình bằng *IntProvider*, đồng thời pass qua các message và ngôn ngữ đã nhận được từ useRouter(). Giờ có thể sử dụng các component trong react-intl như *FormatedMessage* xuyên suốt app.

```js
import { FormattedMessage } from 'react-intl'

export default function Greeting() {
return (
  <h1><FormattedMessage id="greeting" /></h1>
)}
```

### Thay đổi ngôn ngữ

Khi chuyển đổi qua lại giữa các ngôn ngữ, cần phải duy trì được đúng ngôn ngữ mà user đã lựa chọn, khi user reload hay quay lại website vào lần sau. Nghĩa là sẽ setup giúp user ngôn ngữ ưa thích mà họ đã chọn, thay vì để NextJS tự phát hiện thay. 
Để làm được điều này, chúng ta có thể sử dụng Locale Cookie trong NextJS:

```js
import { useRouter } from "next/router"
import { useCookies } from 'react-cookie';

export default function LanguageSwitcher() {
  const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  const { locale } = router;

  const switchLanguage = (e) => {
    const locale = e.target.value;
    router.push('/','/', { locale });
    if(cookie.NEXT_LOCALE !== locale){
      setCookie("NEXT_LOCALE", locale, { path: "/" });
    }
  }

  return (
    <select
      onChange={switchLanguage}
      defaultValue={locale}
    >
      <option value="vi">VI</option>
      <option value="en">EN</option>
    </select>
  );
}
```

### getStaticProps với từng locale

Để hiển thị danh sách các bài đăng bằng ngôn ngữ đã chọn, locale params sẽ có sẵn trong getStaticProps, vì thế có thể pass chúng  ngay trong chức năng fetching data.

Ví dụ:

```js
export async function getStaticProps({ locale }) {
  const allPosts = await getAllPostsForHome(locale)
  return {
    props: { allPosts },
  }
}
```

### Tối ưu hoá phần tìm kiếm

NextJS sẽ thêm một thuộc tính ngôn ngữ toàn cục vào website cùng với locale hiện tại. Tuy nhiên, nếu có thêm file *_document.js*, thì cần đảm bảo rằng các giá trị ngôn ngữ được cố định sẵn trong đó phải được xoá hết đi.

Để cho các công cụ tìm kiếm tìm được bản bài đăng mới nhất bằng các ngôn ngữ khác nhau, chúng ta phải đặt thêm một thẻ meta là hreflang cho từng ngôn ngữ (bao gồm cả ngôn ngữ gốc), thẻ này sẽ đặt ở phần đầu của bài đăng trên website.

Ví dụ:

```js
import Head from 'next/head'

export default function Post({ post }) {
return (
...
  <article>
    <Head>
        <link rel="alternate" hreflang={locale} href={`${SITE_URL}${locale}/${post?.slug}`} />
        <link rel="alternate" hreflang={altLocale} href={`${SITE_URL}${altLocale}/${altPost?.slug}`} />
    </Head>
  </article>
...
)}
```

### Kết luận
Trước đây cứ nghĩ rằng việc sử dụng i18n là một thứ gì đó khá phức tạp. Tuy nhiên với sự hỗ trợ của NextJS và các công cụ như react-intl, việc cung cấp một bản dịch hợp lý với user lại chưa bao giờ dễ dàng đến thế. Bài viết chỉ nằm ở mức cơ bản, và hi vọng có thể giúp ích được gì đó cho các member mới tìm hiểu về NextJS.