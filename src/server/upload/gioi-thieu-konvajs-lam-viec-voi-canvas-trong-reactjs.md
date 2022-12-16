Chào mọi người !

Ở bài viết này mình muốn giới thiệu một thư viện giúp chúng ta làm việc hiệu quả hơn với canvas trong reactjs.

Canvas là một phần tử của HTML5, cho phép thực hiện lập trình kết xuất đồ họa các đối tượng hai chiều trên trang web. Nếu bạn đang tìm một thư viện làm việc với canvas có hỗ trợ reactjs thì ứng cử viên thích hợp nhất chính là konvajs cùng với package react-konva, tất cả các tính năng trong canvas sẽ được sử dụng như các react component bình thường.

Các component trong konvajs có đầy đủ các option như khi làm việc với canvas bình thường, có thể thay đổi các option này dễ dàng với JSX attribute.

##  Cài đặt
- npm install react-konva konva --save
##  Các thành phần chính
###  Stage
component chứa nhiều layer, tương ứng với nhiều canvas, hight, width của stage sẽ bằng với layer.
###  Layer
được đặt trong stage, chứa các element con bên trong nó, chúng ta không thể set hight, width của layer, nó chỉ có thể thay đổi theo Stage. 

**Có 1 lưu ý nhỏ ở đây là: Canvas là 1 thành phần, 1 node trong DOM và bên trong nó không có chứa 1 node nào cả, mọi thứ ta nhìn thấy trên canvas đều là thay đổi của pixel. Vì vậy bất kỳ một component con nào trong 1 layer (canvas) được render lại thì cả layer sẽ được render lại, nếu bạn gặp vấn đề về hiệu năng hãy tách các thành phần không chồng lên nhau thành các canvas riêng.**

Điểm đặc biệt của Konvajs so với các library khác chính là ở khả năng quản lý layer, các layer tương ứng với các canvas, với kích thước như nhau và bằng với stage chứa chúng, giúp ta có thể render từng phần trong content mà ta muốn vẽ.

### Group
Component có thể nhóm các component con trong nó đồng thời ta có thêm các sự kiện vào nó
### Các component chính để vẽ
Shape, Image, Text, Path, Rect, RegularPolygon...
## Ví dụ
*Các ví dụ đơn giản để làm quen với canvas các bạn có thể xem ở đây: https://konvajs.org/docs/react/

Ở đây mình xin giới thiệu https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Compositing, API giúp các bạn làm những tính năng phức tạp, bằng cách kết hợp cách kiểu vẽ khác nhau ngoài kiểu source-over: ontop and overlay mặc định.
Bên dưới đây là 1 ví dụ mình muốn add 1 pattern vào image, mà vẫn giữ lại độ sáng, độ tương phản của nó.
```
import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Stage, Group, Layer, Rect, Text, Image } from 'react-konva';
import Konva from 'konva';

class ImageExample extends Component {
  constructor(...args) {
    super(...args);
    const pattern = new window.Image();
    const image = new window.Image();
    pattern.src = 'https://image.freepik.com/free-vector/seamless-random-heart-pattern-background_1164-1658.jpg';
    image.src = 'https://d3.violet.vn/uploads/previews/document/1/51/316/BH_khongnen.gif';
    pattern.onload = () => {
      this.setState({
        fillPatternImage: pattern
      });
    }
    image.onload = () => {
      this.setState({
        image: image,
        width: image.naturalWidth,
        height: image.naturalHeight
      });
    }
    this.state = {
      color: 'green',
      fillPatternImage: null,
      image: null,
      width: 444,
      height: 444
    };
  }
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Stage 
        width={window.innerWidth}
        height={window.innerHeight}
      >
  	    <Layer>
  		    <Group 
            x={0}
            y={0}
            width={this.state.width}
            height={this.state.height}
            draggable={true}
          >
  		      <Rect
              x={0}
              y={0}
              width={this.state.width}
              height={this.state.height}
              fillPatternImage={this.state.fillPatternImage}
              fillPatternRepeat={'repeat'}
            />
            <Image
              x={0}
              y={0}
              width={this.state.width}
              height={this.state.height}
              globalCompositeOperation = {'multiply'}
              image={this.state.image}
              
            />
            <Image
              x={0}
              y={0}
              width={this.state.width}
              height={this.state.height}
              globalCompositeOperation = {'destination-in'}
              image={this.state.image}
              
            />
  		    </Group>
  	    </Layer>
      </Stage>
    );
  }
}
export default ImageExample;
```
1. Đầu tiên vẽ pattern với height, weight bằng ảnh và mode là repeat để có thể cover toàn bộ bức ảnh.
2. Tiếp theo vẽ ảnh ở chế độ multiply, các pixel của lớp trên (image) cùng được nhân với pixel tương ứng của lớp dưới (pattern). Đầu ra sẽ cho kết quả tối hơn.
3. Cuối cùng vẽ ảnh ở chế độ destination-in, chỉ giữ lại phần nội dung pattern trùng với ảnh, phần còn lại làm trong suốt.

Vậy là chúng ta đã hoàn thành công việc thêm pattern cho ảnh, mình xin kết thúc bài viết ở đây.