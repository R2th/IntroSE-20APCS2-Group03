# 1 ) Các vấn đề hiện tại đồi với Client Side rendering (CSR)
  React, Angular và Vue được sử dụng để tạo các ` Single Page Application` (SPA).Tất cả đều cung cấp CSR có nghĩa là toàn bộ nội dung sẽ được render từ phía client. Do đó việc hiển thị trang đầu tiên  sẽ mất nhiều thời gian , do nó phải tải về toàn bộ javascript của bạn xuống và sau đó mới tiếp tục công việc hiện thị nội dung 

 Vì vậy, để hiển thị các trang  nhanh hơn , chúng ta có thể sử dụng Next.js. Trang web của ban sẽ được render ra ở phía server và nhận được `pre-rendered HTML` , điều này thì khá tốt cho vấn đề SEO.

# 2 ) Server Side Rendering (SSR)
Khi người dùng yêu cầu một trang web, server sẽ chuẩn bị trang bằng cách tìm  dữ liệu dành riêng cho người dùng và gửi đến máy của người dùng. Sau đó, trình duyệt sẽ hiểu nội dung và hiển thị trang. Toàn bộ quá trình tìm  dữ liệu từ cơ sở dữ liệu, tạo trang HTML và cung cấp cho người dùng đều thực hiện ở phía server nên nó được gọi là `SSR`.

# 3 ) Next.js
Next.js xây dựng trang HTML tại thời điểm `build` và  pre-rendered trang và gới nó cho browser với JavaScript tối thiểu mỗi khi trang được tải lại bởi trình duyệt, mã JavaScript của nó sẽ chạy và làm cho trang có tương tác . (Quá trình này được gọi là `Hydration`)

![](https://images.viblo.asia/cf88f4fe-5478-4fca-97ba-1c74603e93eb.png)


### Trong Next.js có 2 cách chính để pre-rendering :
- Static Generation (SSG) : HTML sẽ được tạo ra tại thời điểm build
- Server Side Rendering: HTML sẽ được tạo ra trong mỗi lần request.

# 4 ) Ví dụ
## Cài đặt

```
npx create-next-app
// hoặc
yarn create next-app
```

## Các thư viện khác
- Material-UI .
- jsonplaceholder-api  để lấy một số dữ liệu có sẵn.
- Axios.

#### Cấu hình file _app.js

```js
import React, {Fragment} from 'react'
import Head from 'next/head'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title> List User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}
export default MyApp
 ```

 Ở đây chúng ta có sử dụng thẻ `Head` của next.js để thay đổi title cho trang web

 Sau đó chúng ta tạo thư mục `services/user.js`

 ```js
 import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getAllUsers = async () => {
  const users = await axios.get(`${BASE_URL}/user`})
                .then(({data}) => {
                    return data
                })
  return users    
}
  ```

Bây giờ, hãy tạo một thư mục `users` bên trong thư mục `page` và  file index.js bên trong nó. Bất kỳ thư mục hoặc tệp nào bên trong thư mục `page` sẽ tự động trở thành trang web, vì vậy bây giờ bạn có thể truy cập trang này tại đường dẫn `/users`

Hãy tạo một hàm bất đồng bộ `getStaticProps` cung cấp các `props` cho `component`. Hàm này sẽ gọi `getAllUsers`  và trả về danh sách người dùng
```js
export const getStaticProps = async () => {
  const allUsers = await getAllUsers()
  return {
    props: {
      allUsers
    }
  }
}
```

Bây giờ chung ta sẽ tạo một `component` sẽ render ra một cái card chưa thông tin của user . Và nhận các props tư  `allUsers`

```js 
//components/card/index.js
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import styles from '../../styles/Card.module.css'

const UserCard = ({name, email, id, image}) => {
  const classes = useStyles()
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="user image"
          height="200"
          image={image}
        />
        <CardContent>
          <Typography className={classes.text} gutterBottom
            variant="h5" component="h2">
            {name}
          </Typography>
          <Typography className={classes.text} variant="body2"
            color="textSecondary">
            {email}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    padding: 5
  },
  text: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }
})
export default UserCard

```
Update `pages/users/index.js` lại như sau

```js
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { getAllUsers } from '../../lib/users'
import UserCard from '../../components/card'
const Users = ({allUsers}) => {
  return (
    <Grid container spacing={5} justify="space-evenly">
      {allUsers.data.map(({id, firstName, email, picture}) => (
        <Grid item xs={6} lg={2} md={4} key={id}>
          <UserCard {...{name: firstName, id, email, image: 
             picture}}/>
        </Grid>
       ))}
     </Grid>
  )
}
export const getStaticProps = async () => {
  const allUsers = await getAllUsers()
  return {
    props: {
      allUsers
    }
  }
}
```

Tại đây `getStaticProps` lấy  Api ở phía server và chuyển nó  đến `page/users` . Sau đó, toàn bộ thành phần được xây dựng trên chính máy chủ và dữ liệu người dùng sẽ được chuyển dưới dạng tệp json.

Next.js có thực sự đang xây dựng ứng dụng trên `server` không ? 

sữa lại file `package.json` như sau 

```json
"scripts": {
  "build": "next build && next export"
}
 ```

Bạn  có thể thấy các trang HTML được hiển thị trước trên máy chủ  `.next/server/pages`

# 5 ) Kết luận
  Trên đây mình đã giới thiệu qua về Next.js với ví dụ đơn gian về nó . Hi vọng nó sẻ có ích cho các bạn.

  ## Link tham khảo
  - https://nextjs.org/docs/getting-started