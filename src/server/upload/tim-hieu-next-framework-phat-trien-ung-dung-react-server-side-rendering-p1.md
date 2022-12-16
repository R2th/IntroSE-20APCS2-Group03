### Phần Một: Giới thiệu
Nextjs là một framework cho phép xây dựng ứng dụng Reactjs theo hướng server-side rendering.  
Như đã biết, các ứng dụng web SPA (single-page-application) được xây dựng nên từ các framework phổ biến hiện nay như reactjs, angular hay vuejs... là các ứng dụng client-side rendering, giả sử khi ta mở một ứng dụng reactjs hay vuejs, ta sẽ nhận về từ server một file html "rỗng" với chỉ một phần tử DOM duy nhất, thường là một thẻ **div** và một file **bundle.js** chứa toàn bộ Ứng dụng, sau đó nội dung sẽ được **render** bằng trình compile javascript trên **Trình duyêt**, sau đó ta sẽ không cần gửi yêu cầu thêm tới **server** toàn bộ file **html** như trước, mà chỉ những dữ liệu cần thiết , thường ở dạng **.json** file, vì vậy mà tốc độ ứng dụng và trải nghiệm của người dùng được nâng lên đáng kể.  
Vì vậy việc xây dựng các ứng dụng Web **SPA client-rendering** (CSR) rất được ưa chuộng và càng ngày càng trở nên phổ biến, vậy câu hỏi đặt tại sao cần trở lại với phương pháp cũ **server-side rendering** (SSR) ?  
Theo tìm hiểu của mình thì phương pháp **CSR** mặc dù rất tốt nhưng vẫn còn tồn tại 2 vấn đề, một là bởi vì chúng ta nhận về từ server một file **html** rỗng nên ứng dụng web sẽ rất khó để có thể ```SEO```. Hai là ở lần load đầu tiên, ứng dụng đòi hỏi load toàn bộ file Javascript (bundle.js) của cả ứng dụng nên tốc độ ở lần load này sẽ mất thời gian hơn so với các load từng trang một của ứng dụng, tất nhiên là sau lần "đầu tiên" đó thì tốc độ của ứng dụng rất tuyệt vời.  
Và phương pháp xây dựng ứng dụng **Reactjs** theo hướng **SSR** với mục đích giữ lại nhiều ưu điểm của Reactjs mà vẫn có thể giải quyết hai vấn đề trên. Tất nhiên đây chỉ là một sự lựa chọn chứ không hẳn là hoàn hảo. **SSR** giúp ứng dụng web ```SEO``` tốt và **load** lần đầu tiên sẽ nhanh hơn, nhưng tổng thể thì tốc độ thực thi ứng dụng sẽ chậm hơn do cần **request server** nhiều lần và trải nghiệm người dùng sẽ không tốt bằng ứng dụng **CSR** do trình duyệt sẽ cần **reload** lại.

### Phần 2: Tìm hiểu về Nextjs - Các khái niệm cơ bản để xây dựng ứng dụng.
**Nextjs** là một **framework** dành cho việc xây dựng ứng dụng **React-SSR**. Điều mình ấn tượng là **Next** khá dễ tiếp cận và init App. Trước hết hãy cùng tìm hiểu những khái niệm cơ bản của Nextjs.  

#### 1.Init Application  
Tạo một thư mục my--app, mở nó trên **terminal** và chạy 2 lệnh sau:
```
npm init -y
```
&
```
npm install --save react react-dom next
```
Xong rồi đó, rất đơn giản phải không! , tiếp theo hãy cùng xây dựng **Component** đầu tiên và khởi chạy **App**.  
#### 2. Xây dựng Các Pages.  
Vì là **Serverside-Rendering** nên ta cần hiểu là ứng dụng sẽ chia ra thành các **Page**, với mỗi **URL** ta sẽ request một **Page** tương ứng, và phía **Server** sẽ **render** code Javascript, trả về trang **html** đã được **render** nội dung.  
Tiếp tục tạo 2 thư mục pages và components
```
mkdir pages && mkdir components
```
```
my-app
|-node_modules
|-components
|-pages
  |-index.js
|-package.json
```
Trong thư mục **pages**, tạo file index.js, và copy đoạn code sau
```js
const App = () => (
  <div>Hello From Next</div>
);

export default App;
```
Chỉnh sửa một chút trong file package.json 
```json
{
  "scripts": {
    "dev": "next"
  }
}
```
Rồi chạy lệnh sau trong terminal
```
npm run dev
```
Mở đường dẫn **localhost:3000** trên trình duyệt web ta sẽ thấy nội dung **Hello From Next**  
Tiếp tục tạo thêm file home.js bên trong thư mục **pages** và copy đoạn code sau
```js
import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>Next App, Welcome to HomePage!</div>
    );
  }
}

export default Home;
```
Ấn **Save** và mở đường dẫn ```localhost:3000/home``` trên trình duyệt, sẽ thấy nội dung ta cần **render** trong file home.js.  
Đó là cách tạo ra các Page trong Next, rất đơn giản phải không? đường dẫn **url** sẽ tương ứng với tên file .js ('/' tương ứng với index.js), và mỗi "Pages" sẽ render một React Component. Đối với đường dẫn cấp 2, cấp 3, việc đơn giản là đặt file .js bên trong một thư mục, ví dụ:
```
pages
  |-home
    |--index.js <--> localhost:3000/home
    |--detail.js <--> localhost:3000/home/detail
```
#### 3. Navigate giữa các page, sử dụng Shared Components.
Bình thường với React ta dùng 2 thư viện ```react-router``` và ```react-router-dom``` để quản lý và điều hướng cho App. Đối với ```Next```, **Route** không còn cần thiết bởi quy định đường dẫn dựa trên tên cây thư mục ```pages```, đồng thời ```Nextjs``` cũng cung cấp công cụ để điều hướng giữa các pages, gần giống với thẻ ```a``` trong HTML.  
***
Tạo thư mục ```components``` bên cạnh thư mục pages, là nơi chứa các UI ```components``` của App, và tạo file ```nav.js```.
```js
import Link from 'next/Link';

const NavBar = () => (
  <div>
    <ul>
      <li>
        <Link href="/"><a>Home Page</a></Link>
        <Link href="/about"><a>About Page</a></Link>
      </li>
    </ul>
  </div>
);

export default NavBar;
```
Sau đó ta có thể sử dụng component NavBar để điều hướng các giữa các page, bên trong ```pages/index.js```
```js
import React from 'react';
import NavBar from '../components/nav';

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <h3>Next App, Welcome to HomePage!</h3>
      </div>
    );
  }
}

export default Home;
```
#### 4. Style trong Next.js
Cuối cùng trong phần 1 này, ta tìm hiểu về cách **style** cho ứng dụng NextJS.  
Đầu tiên, với một người đã quen với **CSS** như mình thì cách **Style** trong **Next** không được quen thuộc cho lắm, nó gần với thư viện [styled-component](https://www.styled-components.com/). Phần code **Style** sẽ được thêm trực tiếp bên trong nội dung **render**.  
Ví dụ sau minh hoạ cách nhúng CSS bên trong component.
```js
const App = () => (
  <div>
    <h3 className="title">Hello World</h3>
    <style jsx>{`
      div {
        height: 10px;
      }
      h3.title {
        color: #fff
      }
    `}</style>
  </div>
);
```
Phần code **style** được đặt trong một JSX element như minh hoạ, bên dưới nội dung **render** của mỗi **component**. Ưu điểm là mọi thứ đều đặt bên trong file **.js**, xây dựng các **common component** sẽ khá trực quan và dễ dàng. Tuy nhiên điểm yếu là bạn sẽ không có lựa chọn nào khác cho việc **style**, sẽ hơi mất thời gian để làm quen, đồng thời các ngôn ngữ **css extension** như ```Sass``` hay ```Scss``` sẽ chưa được tích hợp.  
Lưu ý rằng phần **style** theo cú pháp trên sẽ chỉ có tác dụng bên trong **component** chứa nó. Đối với **Global CSS**, có thể được đặt ở bất cứ đâu, chỉ cần thêm **attribute** ```global``` bên trong thẻ **style**
```
<style jsx global>{`
  body {
    font-size: 13px;
    box-sizing: border-box;
  }
`}</style>
```
***
Trên đây là phần giới thiệu và các khái niệm cơ bản của NEXT.JS - Framework xây dựng ứng dụng **React** bằng phương pháp Server-side Rendering. Phần tiếp theo ta sẽ cùng tìm hiểu về việc quản lý **Props**, **State** và tích hợp **Redux** bên trong ứng dụng.