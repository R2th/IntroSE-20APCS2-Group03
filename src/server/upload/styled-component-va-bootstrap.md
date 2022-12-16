## Giới thiệu
Chào các bạn, tiếp tục với phần cuối của series  styles với styled-component của mình hôm nay mình sẽ tiếp với 2 phần trước [Sử dụng theme với styled-component trong Reactjs](https://viblo.asia/p/su-dung-theme-voi-styled-component-trong-reactjs-Eb85okx852G)
và [Sử dụng styled-components để tạo css utility class trong React](https://viblo.asia/p/su-dung-styled-components-de-tao-css-utility-class-trong-react-GrLZDynElk0)
để xây dựng, cấu trúc và quản lý styles trong project , cũng như cách sử dụng chúng với nhau như thế nào nhé.
Lưu ý phần này mình có thêm 1 dependence bootstrap nữa để sử dụng các common class  đa dạng của nó nữa.

Vì phần này lý thuyết không có gì nên ta đi luôn vào ví dụ nhỉ.
## Ví dụ
Để đơn giản và nhanh chóng, mình tiếp tục dùng create-react-app để tạo project **react-styles-structure**.
Tiếp đến mình install 2 dependencies: styled-components và bootstrap
`npm i styled-components và bootstrap`

Đầu tiên,trong folder src mình tạo folder theme trước để tạo theme cho project.
trong folder này là subfolder abstracts chứa file _mixins.js nơi tạo các scss mixins và _variables.js là nơi tạo các biến màu sắc, font và z-index… của project. 
Bạn có thể tham khảo 2 file này ở [Sử dụng theme với styled-component trong Reactjs](https://viblo.asia/p/su-dung-theme-voi-styled-component-trong-reactjs-Eb85okx852G).

Sau đó, trong folder src mình tiếp tục tạo folder global_styles là nơi chứa, import style cho project global style và sub folder bases với file _utilityClasses.js là nơi chứa các utility classes.  Bạn có thể tham khảo 2 file này ở [Sử dụng styled-components để tạo css utility class trong React](https://viblo.asia/p/su-dung-styled-components-de-tao-css-utility-class-trong-react-GrLZDynElk0)

Chú ý : file index.js trong 
folder global_styles lần này sẽ khác 1 chút, do mình dùng cả bootstrap, cũng như theme mình tạo ở trên:
```
import { createGlobalStyle } from 'styled-components'

import _utilityClasses from './bases/_utilityClasses'
import 'bootstrap/dist/css/bootstrap.min.css'
import theme from 'theme'

const GlobalStyle = createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i);
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: ${theme.fontFamilyBase};
  }

  body.fontLoaded {
    font-family: ${theme.fontFamilyBase};
  }

  #app {
    background-color: ${theme.white};
    min-height: 100%;
    min-width: 100%;
    font-family: ${theme.fontFamilyBase};
    font-size: ${theme.fontSizeMedium};
    box-sizing: border-box;
    font-weight: ${theme.fontWeightMedium};
    -webkit-font-smoothing: antialiased;
  }

  p,
  label {
    line-height: 1.5em;
  }
  /* Use utility class here */
  ${_utilityClasses}
`

export default GlobalStyle

```

Để có thể import absolute path, mình tạo file **.env** và set biến môi trường **NODE_PATH=src**

Với phương pháp này thay mình 
`import theme from ‘../../../theme’ `
thì mình sẽ import theo kiểu này: 
`import theme from 'theme'`

Đến phần sử dụng này:
* Trước hết phải import vào trong file index.js ở root import và sử dụng global_styles
```
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from 'global_styles'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

* Sau đó, trong folder src mình tạo folder containers chứa các components test của mình:
đầu tiên là component App - root component của project:
File index.js trong App folder
```
import React from 'react';

import MainWrapper, { NavWrapper, CardWrapper } from './styles'

function App() {
  return (
    <MainWrapper className="App">
      <NavWrapper className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/">Action</a>
                <a className="dropdown-item" href="/">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">Something else here</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/">Disabled</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </NavWrapper>

      <CardWrapper className="card u-mt-20">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="/" className="btn btn-primary">Go somewhere</a>
        </div>
      </CardWrapper>
    </MainWrapper>
  );
}

export default App;

```
Trong filie này, mình vô https://getbootstrap.com/docs/4.0/components để lấy phần navbar, card về làm ví dụ và check xem bootstrap class hoạt động không.


File: styles.js trong App folder
```
import styled from 'styled-components'

import theme from 'theme'

const MainWrapper = styled.div`
  /* config style for entire App container here */
`

export const NavWrapper = styled.nav`
  /* config style for navbar here */
`

export const CardWrapper = styled.nav`
  /* config style for CardWrapper here */
  background-color: ${theme.grey};
  /* Sử dụng transitionFade từ _mixin.js */
  ${theme.transitionFade()}
`

export default MainWrapper
```

Cấu trúc thư mục: 
![](https://images.viblo.asia/0345eec0-0d88-460a-ae0e-2c8405aa8925.png)

Và cuối cùng là kết quả: 
![](https://images.viblo.asia/c04a65af-37b6-48e3-ba85-c5a8dc3ba101.png)

## Kết luận
- Các bạn có thể thực hành bằng cách import thêm các thư viện khác như font-awesom...
-  Cấu trúc quản lý thư mục như thế nào thì phụ thuộc vào dự án và cách bố trí sao cho bạn cảm thấy dễ dùng nhất nhé.
Cảm ơn các bạn đã đọc bài của mình. (yaoming)