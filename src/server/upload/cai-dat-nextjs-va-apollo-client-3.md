Hello các bạn, hôm nay mình sẽ hướng dẫn dùng NextJS và Apollo client 3. Với một số bạn chưa biết thì Apollo client và thư viện giúp chúng gọi endpoint GraphQL từ Backend. Với ReactJS thông thường việc setup Apollo thì có lẽ không xa lạ gì nữa với chúng ta. Nhưng với NextJs - framework có thể dùng cơ chế SSR (Server side rendering) cho phép SEO. Không dài dòng nữa cùng bắt đầu thôi.
###  Khởi tạo project NextJS

Để khởi tạo project NextJs, chúng ta sử dụng câu lệnh sau:
```
npx create-next-app MyApp
```
Dùng CLI giúp chúng khỏi tạo nhanh một project NextJS đơn giản. Tiếp đến cài thư viện apollo client 
```
npm install @apollo/client graphql
```
``@apollo/client``: Gói thư viện này chứa hầu hết những thứ cần thiết để setup apollo client. Nó bao gồm quản lí ``cache`` (Một trong những tính năng quan trọng của apollo), quản lí state cục bộ, xử lí lỗi.

``graphql``: Gói này cung cấp các logic để phân tích query graphql.

### Setup Apollo client
Tạo một tệp mới trong thư mục gốc của project có tên là ``apollo-client.js`` và thêm các nội dung sau vào đó:
```
// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
});

export default client;

```
### Sử dụng apollo client cho dữ liệu của page ở phía server (SSR)
Fetch dữ liệu cho các trang được tạo từ phía máy chủ được thực hiện với function ``getServerSideProps`` do ``Next.js`` cung cấp. Chức năng này sẽ được sử dụng trong mỗi lần yêu cầu trang để nhận bất kỳ dữ liệu nào được chuyển vào thành phần trang dưới dạng đạo cụ.
![](https://images.viblo.asia/ed76d6d4-ae75-44f3-ae2c-2a810f690d36.png)


Sao chép ``./pages/index.js`` và đổi tên thành ``server-side.js``. Sau đó, thay đổi tên của hàm ``getStaticProps`` thành ``getServerSideProps``.
```
// pages/server-side.js

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  };
}
```

Từ props chúng ta có thể pass dữ liệu ``countries`` để có thể show một cách dễ dàng.
### Sử dụng apollo client cho dữ liệu của page ở phía client (CSR)
Client side rendering là cơ chế mà chúng ta thường sử dụng trong ``React``. Khi tải trang nó sẽ load tất cả các script và render hiển thị các thẻ html, css, js cho page ở trên browser.
![](https://images.viblo.asia/cc1f0e6c-dfc3-412e-8bc8-8af0b594a94d.png)

Việc thiết lập Apollo Client để sử dụng ở phía client cần một vài bước bổ sung. Vì chúng ta đang sử dụng React và muốn sử dụng hook, chúng ta sẽ cần sử dụng``ApolloProvider``. Mở ``./pages/_app.js`` và import  ``ApolloProvider`` từ ``@apollo/client``.

```
// pages/_app.js

import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
```
Sửa nội dung trong ``app.js`` thành như sau:
```
// pages/_app.js

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
```
Với việc bọc component ``AppoloProvider``giúp chúng ta thể sử dụng hook ở bất kỳ đâu trong ứng dụng của mình.

Tạo một thư mục mới có tên là ``components`` trong thư mục gốc của dự án và sau đó tạo một tệp bên trong thư mục đó có tên là ``ClientOnly.js``.
```
// components/ClientOnly.js

import { useEffect, useState } from "react";

export default function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
```
Để đảm bảo rằng chúng ta chỉ yêu cầu dữ liệu từ browser, phải đảm bảo rằng các thành phần sử dụng hook chỉ được hiển thị trên client. Chúng ta có thể thực hiện điều này bằng cách tạo một component chỉ hiển thị các children của nó trong browser chứ không phải trên server.
```
// components/Countries.js

import { useQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";

const QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function Countries() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const countries = data.countries.slice(0, 4);

  return (
    <div className={styles.grid}>
      {countries.map((country) => (
        <div key={country.code} className={styles.card}>
          <h3>{country.name}</h3>
          <p>
            {country.code} - {country.emoji}
          </p>
        </div>
      ))}
    </div>
  );
}
```
Cuối cùng, tạo một tệp mới trong thư mục ``page`` có tên là ``client-side.js`` :
```
// pages/client-side.js

import Head from "next/head";
import styles from "../styles/Home.module.css";
import ClientOnly from "../components/ClientOnly";
import Countries from "../components/Countries";

export default function ClientSide() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <ClientOnly>
          <Countries />
        </ClientOnly>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
```

Trang này rất giống với hai trang còn lại, ngoại trừ việc nó không có phương thức ``getStaticProps`` hoặc ``getServerSideProps`` vì chúng ta sẽ request dữ liệu khi trang được hiển thị trong browser(CRS).

Trên đây là một số chia sẽ của mình tìm hiểu được về Apollo client, cảm ơn mn đã theo dõi (bow).