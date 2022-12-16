# 0. Mở Đầu.
Xin chào bạn đến với Học React qua ví dụ phần 11. Bài trước mình đã thực hành React với Light Box rồi. Hôm nay chúng †a sẽ tiếp tục loạt bài học React thông qua ví dụ với phần 11 - Tab Gallery. Bạn chú ý: Trong series học React qua ví dụ này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.
Đây là phần demo: [DEMO: TAB GALLERY](https://codesandbox.io/s/amazing-blackburn-2eyh8)
# 1. Khởi tạo Project.
Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục /src):
```javascript
learn-react-by-example/
    --src/
    ----components/
    ------tab-gallery/
    --------tab-gallery.css
    --------tab-gallery.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```
***Trong đó***
* Thư mục components: chứa code của các Component. Bài này mình thực hành về Tab Gallery nên mình tạo thêm thư mục tab-gallery bên trong với 2 file tab-gallery.js và tab-gallery.css để định nghĩa cho component Tab Gallery (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong components như này).
* Thư mục images: để chứa tất cả những ảnh mình sử dụng cho Demo.
* Các file App.css và App.js dùng để demo chính. Bên trong App.js mình sẽ sử dụng component Tab Gallery ở trên.
* Các file index.css, index.js và serviceWorker.js thì KHÔNG THAY ĐỔI với mọi bài thực hành.
# 2.Xây dựng Tab Gallery Component.
## 2.1: Nội dung file tab-gallery.js
Và ý tưởng chung để xây dựng Tab Gallery Component là:
* Một tuyển tập các ảnh có kích thước nhỏ để hiển thị ban đầu, được sắp xếp theo hàng ngang. Mỗi ảnh nhỏ là một tab.
* Khi người dùng click vào ảnh nào, mình sẽ lấy thông tin ảnh đó (đường dẫn, caption) để hiển thị xuống bên dưới.
* Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './tab-gallery.css';

export default class TabGallery extends React.Component {
  constructor(props) {
    super(props);

    /**
     * State lưu thông tin ảnh sẽ được hiển thị trong tab content,
     * bao gồm đường dẫn ảnh và caption của ảnh
     */
    this.state = {
      imageSrc: "",
      imageText: "",
    }

    /*
    * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
    * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
    * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
    */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  /**
   * Điều khiển việc hiển thị ảnh, với đầu vào là object lưu thông tin
   * của ảnh cần hiển thị
   */
  showImage(image) {
    this.setState({
      imageSrc: image.src,
      imageText: image.caption,
    });
  }

  /**
   * Điều khiển việc ẩn ảnh đi,
   * bằng cách cho đường dẫn ảnh về string rỗng.
   */
  hideImage() {
    this.setState({
      imageSrc: "",
      imageText: "",
    });

    /**
     * Khi set display thành none thì phần container
     * phía dưới sẽ không chiếm diện tích,
     * nên phải cập nhật lại kích thước của component
     */
    this.containerBottomElm.style.display = "none";
    this.updateDimensions();
  }

  /**
   * Cập nhật kích thước component
   */
  updateDimensions() {
    const tabHeight = 
      this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${tabHeight}px`;

    const bottomHeight = this.containerBottomElm.offsetWidth / this.ratioWH;
    this.containerBottomElm.style.height = `${bottomHeight}px`;
  }

  /**
   * Hàm này được gọi khi component đã render lên HTML xong,
   * lúc này mình cần lưu lại DOM node ứng với các phần tử cần thiết.
   *
   * Đồng thời tính toán kích thước component và đăng ký
   * sự kiện khi resize màn hình thì sẽ tính toán lại kích thước của component.
   */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.containerBottomElm = this.rootElm.querySelector(".container-bottom");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component bị xoá khỏi HTML,
   * lúc này mình cần huỷ bỏ sự kiện đã đăng ký.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component update,
   * tức là khi click vào mỗi ảnh, mình sẽ hiển thị ảnh phía dưới,
   * sau đó tính toán lại kích thước phù hợp.
   */
  componentDidUpdate() {
    if (this.state.imageSrc !== "") {
      this.containerBottomElm.style.display = "block";
      this.updateDimensions();
    }
  }

  /**
   * Giao diện của tab gallery sẽ gồm 2 phần chính.
   * Phần div với tên class container sẽ hiển thị ảnh theo chiều ngang.
   *
   * Khi click vào mỗi ảnh thì phiên bản lớn hơn của ảnh sẽ hiển thị
   * phía dưới, ứng với thẻ div với class container-bottom
   */
  render() {
    return (
      <div className="lp-tab-gallery">
        <div className="container">
          {
            this.props.input.map((image, index) => {
              return (
                <div
                  key={index}
                  className="image-wrapper"
                  style={{
                    width: `${1 / this.props.input.length * 100}%`,
                    height: `100%`
                  }}
                >
                  <img
                    className="image"
                    src={image.src}
                    alt={image.caption}
                    onClick={() => this.showImage(image)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="container-bottom">
          <img 
            className="image" 
            src={this.state.imageSrc} 
            alt={this.state.imageText} 
          />
          <span className="close-btn" onClick={() => this.hideImage()}>×</span>
          <div className="image-text">{this.state.imageText}</div>
        </div>
      </div>
    )
  }
}
```
## 2.2. Nội dung file tab-gallery.css
File này dùng để xác định style cho Tab Gallery Component. Bạn chú ý là mọi thành phần mình đều để trong class .lp-tab-gallery để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).
Ngoài ra, mình sử dụng CSS selector là >. Với ý nghĩa, ví dụ khi mình dùng element1 > element2 thì sẽ hiểu style này được áp dụng cho element2 là con trực tiếp của element1 mà không phải cháu, chắt,…
```css
.lp-tab-gallery,
.lp-tab-gallery * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-tab-gallery {
  width: 100%;
}

.lp-tab-gallery>.container {
  width: 100%;
  display: flex;
  display: -webkit-flex;
}

.lp-tab-gallery>.container>.image-wrapper {
  flex: 1;
  padding: 0.35rem;
}

.lp-tab-gallery>.container>.image-wrapper>.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-tab-gallery>.container>.image-wrapper>.image:hover {
  opacity: 0.7;
  cursor: pointer;
}

.lp-tab-gallery>.container-bottom {
  width: 100%;
  display: none;
  position: relative;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}

.lp-tab-gallery>.container-bottom>.image {
  position: absolute;
  left: 0.35rem;
  top: 0;
  width: calc(100% - 0.7rem);
  height: 100%;
  object-fit: cover;
}

.lp-tab-gallery>.container-bottom>.image-text {
  position: absolute;
  bottom: 0;
  left: 15px;
  color: #fff;
  font-size: 20px;
}

.lp-tab-gallery>.container-bottom>.close-btn {
  position: absolute;
  top: 0px;
  right: 6px;
  color: #fff;
  width: auto;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1rem;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.6s ease;
  -webkit-transition: background-color 0.6s ease;
  -moz-transition: background-color 0.6s ease;
  -o-transition: background-color 0.6s ease;
}

.lp-tab-gallery>.container-bottom:hover>.close-btn {
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-tab-gallery>.container-bottom:hover>.close-btn:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
}
```
# 3. Sử dụng Tab Gallery component.
***./src/App.css***
```css
.App,
.App * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.App {
  text-align: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
  padding: 15px;
  color: #222;
  font: normal normal normal 1rem/1.6 Nunito Sans, Helvetica, Arial, sans-serif;
}
```
***/src/App.js***
```javascript
import React from 'react';
import './App.css';

import TabGallery from './components/tab-gallery/tab-gallery';

const collection = [
  { src: 'https://about.phamvanlam.com/learn-react-by-example/static/media/08.075ab7df.jpg', caption: "Caption eleven" },
  { src: 'https://about.phamvanlam.com/learn-react-by-example/static/media/09.6089d193.jpg', caption: "Caption twelve" },
  { src: 'https://about.phamvanlam.com/learn-react-by-example/static/media/09.6089d193.jpg', caption: "Caption thirteen" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tab Gallery</h2>
        <p>Click on each image below to show the corresponding image.</p>

        <TabGallery
          input={collection}
          ratio={`3:2`}
        />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
```
Trong đó, Tab Gallery Component có các thuộc tính là:
* input (Array): mảng chứa thông tin các ảnh, với mỗi phần tử là một object gồm src – đường dẫn ảnh và caption – tiêu đề ảnh.
* ratio (String): string biểu diễn tỉ lệ width : height, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.
# 4. Kết Luận.
Trong bài viết này mình và các bạn đã xây dựng tab gallery, 
Xin hẹn gặp lại các bạn trong những bài viết tiếp theo.