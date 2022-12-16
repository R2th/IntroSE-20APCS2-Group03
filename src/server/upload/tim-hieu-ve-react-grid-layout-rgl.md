## Giới thiệu
1. React-Grid-Layout ( RGL ) là 1 "grid layout system" dành cho React. Tính đến thời điểm hiện tại thì thư viện này đã đạt 13,3k sao trên Github, 1 con số khá ấn tượng. Với RGL nó có tính năng tự đóng gói, các widget có thể kéo thả thay đổi kích thước tùy ý, bố cục một cách linh hoạt đáp ứng cho nhiều responsive breakpoint...

![](https://images.viblo.asia/d8434ef7-cb18-45d3-be43-20c02d4a4d83.gif)

2. RGL là React-only và nó không yêu cầu Jquery
3. Hiện tại RGL đang được sử dụng ở 1 số trang web lớn như :
    * [BitMEX](https://www.bitmex.com/)
    * [Stoplight](https://app.stoplight.io/)
    * [Monday](https://support.monday.com/hc/en-us/articles/360002187819-What-are-the-Dashboards-)
    * [Hakkiri](https://www.hakkiri.io/)
## Cài đặt
1. Dùng NPM để cài đặt RGL
Dùng lệnh : ***npm install react-grid-layout***
2. Import đường dẫn sau vào dự án của bạn :
    *    /node_modules/react-grid-layout/css/styles.css
    *    /node_modules/react-resizable/css/styles.css
## Cách sử dụng
Component dưới đây sẽ tạo ra 1 lưới có 3 hình :
* Hình 1 : Là khối tĩnh không thể thay đổi kích thước cũng như di chuyển
* Hình 2 : Có thể linh hoạt di chuyển nhưng được thiết lập min-width và max-width
* Hình 3 :  Có thể linh hoạt di chuyển và thay đổi kích thước tùy ý.
1. Code :

    ```
    import React from "react";
    import GridLayout from "react-grid-layout";

    export default class MyFirstGrid extends React.Component {
      render() {
        const layout = [
          { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
          { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
          { i: "c", x: 4, y: 0, w: 1, h: 2 }
        ];
        return (
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
          >
            <div key="a">Hình 1</div>
            <div key="b">Hình 2</div>
            <div key="c">Hình 3</div>
          </GridLayout>
        );
      }
    }

    ```

2. Kết quả

![](https://images.viblo.asia/ff604c63-b290-4aac-be22-e0d779c20d96.gif)

## Tính năng nổi bật
RGL cung cấp nhiều hơn những tính năng nổi bật như :

* [Saving layout to localStorage](https://react-grid-layout.github.io/react-grid-layout/examples/7-localstorage.html)
* [Drag from outside](https://react-grid-layout.github.io/react-grid-layout/examples/15-drag-from-outside.html)
* [Toolbox](https://react-grid-layout.github.io/react-grid-layout/examples/14-toolbox.html)

Xem nhiều hơn [tại đây](https://github.com/react-grid-layout/react-grid-layout).

## Kết luận
Như vậy chúng ta đã tìm hiểu sơ qua về React-Grid-Layout cũng như cách sử dụng của nó. Khi mà xã hội phát triển. Mình hi vọng bài viết của mình có 1 chút gì đó hữu ích với người đọc. Cảm ơn bạn đọc đã dành thời gian cho bài viết của mình.

Nguồn : [https://github.com/react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)