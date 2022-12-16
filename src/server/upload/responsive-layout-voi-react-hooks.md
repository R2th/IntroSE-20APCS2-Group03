### Giới thiệu
Responsive là một yêu cầu gần như là bắt buộc với các website ở thời điểm hiện tại khi lượng truy cập bằng điện thoại chiếm tới khoảng 55%, theo thống kê tại [đây](https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/). 

Vì vậy hôm nay mình  sẽ chia sẻ về cách để xử lý giao diện responsive với React Hooks, có thể bạn sẽ cần dùng trong các website sử dụng ReactJS. Bài viết này thích hợp cho những bạn đã biết ReactJS và Responsive nhé.

### Xác định thiết bị
Một trong những cách đang được sử dụng phổ biến khi tiến hành làm responsive layout là sử dụng `@media` của CSS, cú pháp dạng như sau:
```CSS
/** Desktop layout **/
.isMobile {
    display: none;
}
.isDesktop {
    display: block;
}

/** Mobile layout **/
@media screen and max-width(1024px) {
    .isMobile {
        display: block;
    }
    .isDesktop {
        display: none;
    }
}
```
Đoạn code ở trên có nghĩa là:
- Với giao diện desktop sẽ ẩn các block có class là `isMobile`.
- Khi kích thước màn hình nhỏ hơn hoặc bằng `1024px`, sẽ được xử lý để hiển thị giao diện cho mobile, tức là hiển thị lên những block có class là `isMobile` và ẩn đi những block có class là `isDesktop`.

Như vậy ở HTML chúng ta phải viết cả 2 khối có class là `isMobile` và `isDesktop`, như vậy có vẻ hơi dư thừa phải không các bạn.

### Navigation userAgent
Một cách khác có thể hay được sử dụng có là kiểm tra userAgent của trình duyệt, từ đó phát hiện ra đang được sử dụng trên thiết bị gì, các bạn có thể tham khảo code để xác định isMobile ở trên trang web sau nhé [detect isMobile](https://www.statista.com/statistics/277125/share-of-website-traffic-coming-from-mobile-devices/)

Cụ thể với javascript, có thể dùng function isMobile để kiểm tra như sau
```javascript
function isMobile() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};
```

Khi đó bạn có thể sử dụng để kiểm tra nhằm render ra đúng HTML mà bạn mong muốn, dạng như sau:

```javascript
const App = () => {
  if (isMobile) {
    return <h1>Mobile layout</h1>
  }
  return (
    <h1>Desktop layout</h1>
  );
}


ReactDOM.render(<App />,
  document.getElementById("root")
);
```

### Kiểm tra kích thước màn hình với custom hook
Đây là giải pháp mình giới thiệu trong bài viết này, mình vẫn muốn sử dụng theo kích thước màn hình, mà không muốn HTML bị dư thừa.

Vậy thì chúng ta cần dùng JS để kiểm tra kích thước của trình duyệt, sau đó render dựa theo kết quả kiểm tra để hiển thị.

```javascript
const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return { width };
};
```

Ở đây mình đã tạo một custom hook có tên là useViewport, sẽ trả về giá trị `width` của trình duyệt, giá trị này sẽ được cập nhật khi trình duỵệt thay đổi về kích thước.

Cách sử dụng hook này khá đơn giản, bạn sẽ so sánh giá trị `width` trả về với giá trị mà bạn mong muốn, ở ví dụ này mình sẽ so sánh với `1024px` như ở phần sử dụng responsive bằng CSS nhé.

```javascript
const App = () => {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 1024;
  if (isMobile) {
    return <h1>Mobile layout</h1>
  }
  return (
    <h1>Desktop layout</h1>
  );
}


ReactDOM.render(<App />,
  document.getElementById("root")
);
```

Ở trên mình đã kiểm tra nếu khi trình duyệt có kích thước `<=1024px` thì sẽ render ra HTML cho giao diện mobile, nếu không thì render ra giao diện cho desktop.

### Kết luận
Mình có tạo demo trên codepen, các bạn có thể kiểm tra kết quả tại đây nhé.
Cảm ơn các bạn đã đọc bài viết của mình.
{@embed:https://codepen.io/minhkhmt1k3/pen/NWpmRVo}

Nguồn tham khảo [tại đây](https://blog.logrocket.com/developing-responsive-layouts-with-react-hooks/)