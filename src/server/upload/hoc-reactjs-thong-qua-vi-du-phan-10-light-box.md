# 0. Mở Đầu.
Xin chào bạn đến với Học React qua ví dụ phần 10. Bài trước mình đã thực hành React với Image Modal rồi. Hôm nay chúng †a sẽ tiếp tục loạt bài học React thông qua ví dụ với phần 10 - Light Box. Bạn chú ý: Trong series học React qua ví dụ này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.
# 1. Xây Dựng Cấu Trúc Thư Mục.
- Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục /src):
```javascript
learn-react-by-example/
    --src/
    ----components/
    ------lightbox/
    --------lightbox.css
    --------lightbox.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```
***Trong đó:***
Thư mục components: để chứa code của các Component. Bài này mình thực hành về Lightbox nên mình tạo thêm thư mục lightbox bên trong với 2 file lightbox.js và lightbox.css để định nghĩa cho component Lightbox (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong components như này).
* Thư mục images: để chứa tất cả những ảnh mình sử dụng cho Demo.
* Các file App.css và App.js dùng để demo chính. Bên trong App.js mình sẽ sử dụng component Lightbox ở trên.
* Các file index.css, index.js và serviceWorker.js thì KHÔNG THAY ĐỔI với mọi bài thực hành.
# 2. Xây Dựng Component LightBox.
Và ý tưởng chung để xây dựng Lightbox Component là:
* Một tuyển tập các ảnh có kích thước nhỏ để hiển thị ban đầu.
* Một Slideshow Gallery gồm các ảnh phiên bản lớn, ứng với các ảnh nhỏ. Ban đầu, mình để Slideshow Gallery này ẩn đi. Khi người dùng click vào ảnh nhỏ thì sẽ hiển thị Slideshow Gallery lên, với ảnh đang active tương ứng.
Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './lightbox.css';
import SlideshowGallery from '../slideshow-gallery/slideshow-gallery';

export default class LightBox extends React.Component {
  constructor(props) {
    super(props);

    // Tạo reference ứng với Slideshow Gallery
    this.slideshowGallery = React.createRef();

    /*
    * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
    * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
    * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
    */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * Hiển thị Slideshow Gallery như Modal
   * bằng cách set giá trị cho thuộc tính visibility của style,
   * của phần tử đóng vai trò là Modal là "visible" để hiển thị nó
   *
   * Ngoài ra, khi hiển thị Slidshow Gallery lên,
   * mình phải gọi phương thức setSlideIndex()
   * để xác định ảnh nào đang được active
  */
  showModal(index) {
    this.slideshowGallery.current.setSlideIndex(index);
    this.modalElm.style.visibility = "visible";
  }

  /**
   * Ẩn phần tử Slideshow Gallery đi bằng cách set giá trị
   * cho thuộc tính visibility của style,
   * của phần tử đóng vai trò là Modal Image là "hidden",
   * để ẩn nó đi
  */
  hideModal() {
    this.modalElm.style.visibility = "hidden";
  }

  /*
  * Cập nhật chiều cao cho mỗi ảnh khi thay đổi kích thước màn hình
  * Trong phần CSS, mình để mỗi ảnh có width = 100%,
  * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
  * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại,
  * dựa vào width và tỉ lệ this.ratioWH = width / height
  *
  * Ngoài ra, số lượng ảnh ban đầu là this.props.input.length
  * chứ không phải 1 ảnh nên mình phải chia cho this.props.input.length
  */
  updateDimensions() {
    const height = 
      this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${height}px`;
  }

  /**
   * Hàm này được gọi khi Lightbox đã render lên HTML.
   * Trong này mình sẽ lưu lại DOM node ứng với các phần tử
   *   + this.rootElm -> toàn bộ component
   *   + this.containerElm -> container chứa các ảnh phiên bản nhỏ,
   *   + this.modalElm -> chứa thành phần là modal - slideshow gallery
   *
   * Tiếp theo, gọi hàm this.updateDimensions() để cập nhật chiều cao
   * cho ảnh nhỏ ban đầu.
   *
   * Và cuối cùng là đăng ký sự kiên resize màn hình, với hàm xử lý
   * là updateDimensions(). Tức là mỗi khi thay đổi kích thước màn hình
   * thì sẽ tính lại chiều cao.
  */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.modalElm = this.rootElm.querySelector(".modal");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi Component bị xóa khỏi HTML.
   * Lúc này mình phải hủy bỏ sự kiện đã đăng ký lúc trước.
  */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * Chú ý: thành phần bên trong phần Modal bây giờ không chỉ
   * là một ảnh như Modal Image.
   *
   * Mà trong đó, mình truyền vào Slideshow Gallery Component
  */
  render() {
    return (
      <div className="lp-lightbox">
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
                    onClick={() => this.showModal(index)}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="modal">
          <span className="close" onClick={this.hideModal}>×</span>
          <div className="modal-content">
            <SlideshowGallery
              ref={this.slideshowGallery}
              input={this.props.input}
              ratio={this.props.ratio}
              mode={`manual`}
            />
          </div>
        </div>
      </div>
    )
  }
}
```
## Nội dung file lightbox.css.
File này dùng để xác định style cho Lightbox Component. Bạn chú ý là mọi thành phần mình đều để trong class .lp-lightbox để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).
Ngoài ra, mình sử dụng CSS selector là >. Với ý nghĩa, ví dụ khi mình dùng element1 > element2 thì sẽ hiểu style này được áp dụng cho element2 là con trực tiếp của element1 mà không phải cháu, chắt,…
```css
.lp-lightbox,
.lp-lightbox * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-lightbox {
  width: 100%;
}

.lp-lightbox>.container {
  width: 100%;
  display: flex;
  display: -webkit-flex;
}

.lp-lightbox>.container>.image-wrapper {
  flex: 1;
  padding: 0.35rem;
}

.lp-lightbox>.container>.image-wrapper>.image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-lightbox>.container>.image-wrapper>.image:hover {
  opacity: 0.7;
  cursor: pointer;
}

.lp-lightbox>.modal {
  visibility: hidden;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}

.lp-lightbox>.modal>.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: color 0.3s;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  -o-transition: color 0.3s;
}

.lp-lightbox>.modal>.close:hover,
.lp-lightbox>.modal>.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.lp-lightbox>.modal>.modal-content {
  margin: auto;
  width: 80%;
  max-width: 600px;
}

@media only screen and (max-width: 600px) {
  .lp-lightbox>.modal>.modal-content {
    width: 100%;
  }
}
```
# 3. Sử dụng Lightbox component.
***./src/App.css***.
```css
/* Không thay đổi */
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
***./src/App.js***
```javascript
import React from 'react';
import './App.css';

import LightBox from './components/lightbox/lightbox';
import img8 from './images/08.jpg';
import img9 from './images/09.jpg';
import img10 from './images/10.jpg';

const collection = [
  { src: img8, caption: "Caption eight" },
  { src: img9, caption: "Caption nine" },
  { src: img10, caption: "Caption ten" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>LightBox</h2>
        <p>Click on each image below to show the Slideshow Gallery.</p>

        <LightBox
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
Trong đó, Lightbox Component có các thuộc tính là:

* input (Array): mảng chứa thông tin các ảnh, với mỗi phần tử là một object gồm src – đường dẫn ảnh và caption – tiêu đề ảnh.
* ratio (String): string biểu diễn tỉ lệ width : height, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.
# 4. Kết Luận.
Trong bài viết này mình và các bạn đã xây dựng Light Box,  Xin hẹn gặp lại các bạn trong những bài viết tiếp theo.