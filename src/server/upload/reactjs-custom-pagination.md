Bản thân tôi là một lập trình viên PHP. Trong lúc rảnh rỗi, tôi có nghiên cứu thêm về ReactJS. Nếu chỉ đọc tài liệu của ReactJS rồi viết lại thì tôi nghĩ đến 90% là tới tuần sau tôi sẽ lại quên hết sạch những gì mà hôm nay tôi đã đọc. Với tư duy của một lập trình viên đã có gần 4 năm làm việc với PHP, tôi tự nhủ, bây giờ mình thử áp dụng những bài toán mình hay gặp phải trong khi mình code với PHP, ốp sang làm bằng ReacJS xem sao. Rồi tớ nhớ tới bài toán phân trang dữ liệu, tức là, khi lập trình bạn luôn gặp phải tường hợp là khi bạn lấy dữ liệu từ một database, hay lấy dữ liệu từ API đổ về, thường là những dữ liệu đó sẽ có rất nhiều, số lượng lớn. Và đương nhiên, để hiển thị một lượng lớn dữ liệu như vậy, việc đầu tiên chúng ta nghĩ tới là sử phân trang (pagination) cho bộ dữ liệu chung ta thu được. Trong PHP, đặc biệt là với các framework như Laravel, Symfony, .. đều hỗ trợ sẵn cho chúng ta việc phân trang dữ liệu. Nhưng trong nhiều bài toán, hay với tùy yêu cầu của khách hàng, chúng ta không thể sử dụng phận trang mặc định của framework được. Lúc đó chúng ta cần phải custom lại pagination mặc định. Theo như kinh nghiệm làm việc của tôi, thì có tới 96.69% là chúng ta phải custom lại việc phân trang dữ liệu. Nếu bài toán nào mà cũng ăn sẵn được phân trang của framework thì công việc lập trình của chúng ta trở nên dễ dàng như ăn cháo. ^^. 

Đã có đủ lý do và chọn ra được đề bài cho mình, đến đây chúng ta sẽ đi vào thực hành chi tiết. Sau một hồi lang thang trên mạng tìm data. Vô tình bắt gặp một bài viết mà tôi vô cùng tâm đắc [Custom paginate](https://scotch.io/tutorials/build-custom-pagination-with-react). Sau vài ngày đào sâu tìm hiểu. Nay tôi viết lại theo ý hiểu của mình trong bài viết này. Bạn có thể hình dung công việc của chúng ta cần làm như sau:

![](https://images.viblo.asia/dac1ddb3-61b6-4676-9228-d539d0dd473a.png)

**Server Required**

Đầu tiên, chúng ta cần chuẩn bị những thứ sau để có thể code được ReactJs

- **Node**: Để code được React thì bạn cần cài node trên máy của mình. Cũng khuyên các bạn là hãy cài _yarn_ để quản lý các package thay vì sử dụng _npm_. Bạn có thể tham khảo cách cài _yarn_ ở bài viết này [Yarn Install](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
-  **create-react-app**: Chúng ta sẽ tạo mới một project react bằng package này, vì vậy bạn cần cái thêm nó vào máy của mình. Tuy nhiên nếu bạn dùng npm >= 5.2 thì điều này là không cần thiết. lúc đó bạn có thể sử dụng **npx** để chạy command. 

**Create Project**

Đầu tiền, hay sử dụng **create-react-app** để tạo mới một projects bằng câu lệnh sau:

```markdown
create-react-app react-pagination
```

Nếu bạn đang có npm >= 5.2 thì tạo mới project bằng câu lệnh:

```markdown
npx create-react-app react-pagination
```

**Cài đặt Dependencies**

Tiếp theo, chúng ta sẽ cài đặt thêm một vài package cần thiết cho việc create app. Chạy câu lệnh sau:

```css
yarn add bootstrap prop-types react-flags countries-api
yarn add -D npm-run-all node-sass-chokidar
```

Ở đây chúng ta cài **node-sass-chokidar** như một development dependency để cho phép chúng ta làm việc với SASS. Tiếp đến, hãy mở file _package.json_ và sửa session _scripts_ theo như sau:

```css
"scripts": {
  "start:js": "react-scripts start",
  "build:js": "react-scripts build",
  "start": "npm-run-all -p watch:css start:js",
  "build": "npm-run-all build:css build:js",
  "test": "react-scripts test --env=jsdom",
  "eject": "react-scripts eject",
  "build:css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
  "watch:css": "npm run build:css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive"
}
```

Ở bước trên, chúng ta đã cài đặt bootstrap vào project của mình rồi, để sử dụng được bootstrap, mở file _src/index.js_ và thêm dòng sau vào đầu file

```css
import "bootstrap/dist/css/bootstrap.min.css";
```

Tiếp theo, để hiện thị được cờ của các quốc gia như hình trên phần đầu bài mình đã đề cập tới, chúng ta cần phải dùng tới **react-flags**, module này đã được tự động tích hợp khi bạn tạo một project mới. Chúng ta chỉ cần gọi nó ra và dùng thôi:

```shell
mkdir -p public/img
cp -R node_modules/react-flags/vendor/flags public/img
```

Nếu bạn là người đang sử dụng máy win, thì câu lệnh sẽ là:

```shell
mkdir \public\img
xcopy \node_modules\react-flags\vendor\flags \public\img /s /e
```

Tiếp theo, hãy tạo một thư mục **components** trong src của bạn, vì chúng ta là những lập trình viên chuyên nghiệp, do đó những file chúng ta viết thêm sẽ được viết tất cả vào thư mục này. Trong thư mục này chúng ta sẽ viết 

- CountryCard: trong đây chúng ta sẽ gender ra tên nước, quốc kỳ của nước đó
- Pagination: trong đây là toàn bộ logic mà chúng ta sẽ làm, chứa toàn bộ code custom paginate của chúng ta. 

Đến đây thử test xem môi trường mà bạn vừa cài đặt có gặp bất kỳ lỗi nào hay không:

```go
yarn start
```

Nếu không có bất kỳ lỗi gì thì hãy truy cập vào [http://localhost:3000/](http://localhost:3000/), kết quả thu được như sau:

![](https://images.viblo.asia/ad214616-9288-4bea-aaa5-93a6def52c31.png)

Như phân tích ở trên, công việc chính của chúng ta là thao tác với 2 compents. Sau đây, tôi sẽ nói về chi tiết từng component 

**CountryCard Component**

Bước trước các bạn đã tạo thư mục _src/components_ đúng không nào? tiếp theo hãy tạo file **CountryCard.js** và thêm vào đoạn code sau:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Flag from 'react-flags';

const CountryCard = props => {
  const { cca2: code2 = '', region = null, name = {}  } = props.country || {};

  return (
    <div className="col-sm-6 col-md-4 country-card">
      <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">

        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">

          <Flag country={code2} format="png" pngSize={64} basePath="./img/flags" className="d-block h-100" />

        </div>

        <div className="px-3">

          <span className="country-name text-dark d-block font-weight-bold">{ name.common }</span>

          <span className="country-region text-secondary text-uppercase">{ region }</span>

        </div>

      </div>
    </div>
  )
}

CountryCard.propTypes = {
  country: PropTypes.shape({
    cca2: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default CountryCard;
```

**CountryCard** component required country lưu giữ thông tin của một nước mà chúng ta sẽ render. Các bạn có thể thấy cấu trúc bên trong thuộc tính _propTypes_ của **CountryCard** bao gồm:

- cca2 : 2-digit country code
- region - the country region 
- name.common - tên thường gọi của nước đó.

Ví dụ về một objects của country như sau:
 ```
 {
  cca2: "NG",
  region: "Africa",
  name: {
    common: "Nigeria"
  }
}
 ```

 Lưu ý là ở đây chúng ta render country flags dựa vào  [react-flag](https://github.com/wiredmax/react-flags)

 **Pagination Component**

 Tiếp theo, hãy tạo file **Pagination.js** cùng thư mục với file **CountryCard.js** ở bên trên, và thêm đoạn code sau: 

 ```
 import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Countries Pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={e => this.handleClick(page, e)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func
};

export default Pagination;
 ```

Component Pagination.js, có 4 đặc tính trong propTypes.

- totalRecords: là giá trị chưa tổng số bản ghi của data dùng để paginate. Yêu cầu requred.
- pageLimit: Giá trị thể hiện số bản ghi limit trên mỗi trang.
- pageNeighbours: Giá trị thể hiện số trang sẽ được hiện thị trên mỗi slide tính từ trang hiện tại.
- onPageChanged: là một function sẽ được gọi khi bạn chuyển trang của paginate.

Ngoài ra chúng ta còn định nghĩa hai giá trị là **LEFT_PAGE** và **RIGHT_PAGE**, hai giá trị này giúp chúng ta xác định được khi nào current page đang ở trang đầu tiên và khi nào thì nó đang là trang cuối cùng.

**The App Component**

Tiếp theo, hãy sửa lại filr **App.js** với dòng code:

```javascript
import React, { Component } from "react";
import Countries from "countries-api/lib/data/Countries.json";
import "./App.css";

import Pagination from "./components/Pagination";
import CountryCard from "./components/CountryCard";

class App extends Component {
  state = {
    allCountries: [],
    currentCountries: [],
    currentPage: null,
    totalPages: null
  };

  componentDidMount() {
    const allCountries = Countries;
    this.setState({ allCountries });
  }

  onPageChanged = data => {
    const { allCountries } = this.state;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentCountries = allCountries.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentCountries, totalPages });
  };

  render() {
    const {
      allCountries,
      currentCountries,
      currentPage,
      totalPages
    } = this.state;
    const totalCountries = allCountries.length;

    if (totalCountries === 0) return null;

    const headerClass = [
      "text-dark py-2 pr-4 m-0",
      currentPage ? "border-gray border-right" : ""
    ]
      .join(" ")
      .trim();

    return (
      <div className="container mb-5">
        <div className="row d-flex flex-row py-5">
          <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <h2 className={headerClass}>
                <strong className="text-secondary">{totalCountries}</strong>{" "}
                Countries
              </h2>
              {currentPage && (
                <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                  <span className="font-weight-bold">{totalPages}</span>
                </span>
              )}
            </div>
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalCountries}
                pageLimit={18}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
          </div>
          {currentCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
```

Thêm css cho giao diện bằng việc sửa file App.css với nội dung 

```css
/* Declare some variables */
$base-color: #ced4da;
$light-background: lighten(desaturate($base-color, 50%), 12.5%);

.current-page {
  font-size: 1.5rem;
  vertical-align: middle;
}

.country-card-container {
  height: 60px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.country-name {
  font-size: 0.9rem;
}

.country-region {
  font-size: 0.7rem;
}

.current-page,
.country-name,
.country-region {
  line-height: 1;
}

// Override some Bootstrap pagination styles
ul.pagination {
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  li.page-item.active {
    a.page-link {
      color: saturate(darken($base-color, 50%), 5%) !important;
      background-color: saturate(lighten($base-color, 7.5%), 2.5%) !important;
      border-color: $base-color !important;
    }
  }

  a.page-link {
    padding: 0.75rem 1rem;
    min-width: 3.5rem;
    text-align: center;
    box-shadow: none !important;
    border-color: $base-color !important;
    color: saturate(darken($base-color, 30%), 10%);
    font-weight: 900;
    font-size: 1rem;

    &:hover {
      background-color: $light-background;
    }
  }
}
```

Đến đây, công việc của chúng ta đã hoàn tất. Các bạn có thể theo dõi code trên [React-pagination](https://github.com/nguyenvancanh/react-pagination). Chúc các bạn thành công. ^^