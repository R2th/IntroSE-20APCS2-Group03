Xin chào mọi người! Sau một tháng chúng ta lại gặp lại nhau trong bài chia sẻ này của mình. Trong bài chia sẻ trước mình có giới thiệu về 1 plugin của [webpack](https://webpack.js.org/) là [offline-plugin](https://github.com/NekR/offline-plugin) dùng để tạo những trải nghiệm cho người dùng khi sử dụng app offline và cache những bundled assets (khi build app bằng webpack) giúp tăng performance khi sử dụng app của chúng ta. Thì hôm nay theo plan của mình là sẽ cùng mọi người chia sẻ và demo thử về 1 thư viện khác cũng phục vụ về việc cải thiện performance khi run app và chế độ offline là [workbox](https://developers.google.com/web/tools/workbox). Nhưng mà vì mình chưa có chuẩn bị được nên hôm nay mình sẽ chia sẻ 1 bài viết khá thú vị về image loading. Cùng bắt đầu thôi! :relaxed:

# I. Một vài lời về image loading.
Thì trong quá trình phát triển web thì chúng ta với vị trí là những người developer thì khi mình phát triển một app hoặc chức năng thì chúng ta chỉ thường để ý đến việc là "nó chỉ cần chạy được còn việc người dùng sử dụng app và cảm nhận thế nào thì kệ! Tính sau!". Haha vì thế mà chúng ta thường đưa những kỹ thuật để cải thiện về UX về phần sau (sau khi app đã chạy và đang ở phase maintain chẳng hạn hoặc là khoảng thời gian sau khi hoàn thành tất cả các feature). Thì suy nghĩ này thì khá OK với nhiều người nhưng có một số người trong quá trình phát triển (hoặc cơ bản bản thân họ đã có kinh nghiệm làm) thì ngoài việc hoàn thành chức năng của app thì họ sẽ để ý 1 phần vào UX nữa và sẽ app dụng một số kỹ thuật đơn giản vào app của mình để tăng trải nghiệm người dùng. Image loading là một trong những kỹ thuật đó (theo mình nghĩ là vậy haha :sweat_smile:)

Image loading là một kỹ thuật liên quan đến việc tăng trải nghiệm người dùng khi app có chức năng loading các hình ảnh. Thì trước giờ mình cũng không để ý về vấn đề này lắm. Nhưng trong một lần tình cờ mình đã đọc được một bài chia sẻ khá hay (ý tưởng hay) về kỹ thuật image loading này.

Thì bài chia sẻ [này](https://jmperezperez.com/medium-image-progressive-loading-placeholder/) có nói về cách mà [Medium](https://medium.com) load những hình ảnh của họ.

Ý tưởng sẽ là thay vì tải 1 hình thì chúng ta sẽ tải 2 hình liên tiếp. Thực chất 2 hình này là một hình và chỉ thay đổi về chất lượng hình ảnh hiện thị để tạo cho người dùng cảm giác là hình ảnh trên trình duyệt đang được load và cần 1 thời gian ngắn nữa để có thể load xong. Đồng thời người dùng có thể thấy 1 cách  sơ bộ về bức ảnh (thực chất là không nhiều :v).

Thì hình đầu tiên sẽ là hình có chất lượng kém hơn (đi đôi với việc đó là tốc độ tải sẽ nhanh hơn) và có 1 đoạn css dùng để làm mờ đi (tạo cảm giác mờ `filter: blur(?px)`). Cho đến khi hình thứ hai được load xong thì sẽ đè lên hình đầu tiên và show ra cho người dùng (ở đây phải dùng css để tạo sự mượt mà khi hình load xong bằng cách sử dụng `transition` cho thuộc tính `opacity`).

Ban đầu của ý tưởng là họ sẽ dùng 1 thẻ `canvas` để vẽ ra và khi hình load xong thì sẽ ẩn thẻ `canvas` đi! Thay vì vậy thì trong bài viết có đề cập đến việc là làm giống như trên nhưng thay vì dùng thẻ `canvas` thì sẽ được thay thế bằng 1 thẻ `img` và append vào thẻ `div` (thẻ dùng để làm giả image).

Chúng ta có thể test bẳng cách inspect source => vào tab `Network` và bật chạy với chế độ `Slow 3G`.

Cũng có một số cách khác để thực hiện việc image loading. Nhưng mình nghĩ cách trên là 1 cách tiếp cận ban đầu rất tốt.

Sau đây mình có làm 1 demo nho nhỏ để test thử. Chúng ta sang phần 2 nào!

# II. Tạo 1 component image loading với ReactJS.
Thì mình có tạo thử 1 demo nhỏ, trong đó mình sẽ tạo 1 component để mô tả kỹ thuật image loading này bằng ReactJS.

Đầu tiên thì 1 điều khá không được thuận lợi của cách xử lý này là chúng ta phải chuẩn bị đầy đủ hình ảnh dùng để loading (phải có 1 image chất lượng thấp và 1 image chất lượng thực giống nhau).

Thì ở đây mình có sử dụng hình trong bài viết luôn.

Dưới đây là component của mình (sử dụng [create-react-app](https://create-react-app.dev/) để tạo project cho nhanh :sweat_smile:)
```javascript
// ImageLoading.js
import React, { memo, useState } from "react";
import clsx from "clsx";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #F6F6F6;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    width: 100%;
    transition: opacity 1s linear;

    &.image__loaded {
      opacity: 1;
    }
  }

  .image__loading {
    filter: blur(50px);
    transform: scale(1);
  }
`;

function ImageLoading({ smallSrc, largeSrc }) {
  // State for showing image
  const [isSmallImageLoaded, loadSmallImage] = useState(false);
  const [isLargeImageLoaded, loadLargeImage] = useState(false);

  // Combine classname for showing
  const smallImageClass = clsx(
    "image__loading",
    isSmallImageLoaded && "image__loaded"
  );
  const largeImageClass = clsx(isLargeImageLoaded && "image__loaded");

  // Define handle
  const handleSmallImageLoad = () => loadSmallImage(true);
  const handleLargeImageLoad = () => loadLargeImage(true);

  return (
    <Wrapper>
      <img src={smallSrc} className={smallImageClass} alt="" onLoad={handleSmallImageLoad} />
      <div style={{ paddingBottom: '66.6%' }} />
      <img src={largeSrc} className={largeImageClass} alt="" onLoad={handleLargeImageLoad} />
    </Wrapper>
  );
}

export default memo(ImageLoading);
```

Component này thì mình đang để nhận đầu vào là 2 đầu source của 2 hình lần lượt có chất lượng là thấp và cao (công đoạn chuẩn bị hình ảnh khá vất vả đây).

Component này sẽ sử dụng 2 biến boolen để quản lý hiển thị lần lượt hình ảnh có chất lượng thấp và cao. Dùng thư viện [clsx](https://github.com/lukeed/clsx) để combine classnames (class để show hình ảnh ra). Và cung cấp cho 2 thẻ `img` các function handle onload (handle khi load image xong) tương ứng.

Kết quả chúng ta thu được như dưới:

Đây là trường hợp khi bật `throttling = Slow 3G` ở tab `Network` khi inspect.

![](https://images.viblo.asia/d9aca970-fd67-46ca-8c4f-513daa7b271a.gif)

Và đây là trường hợp với internet bình thường.
![](https://images.viblo.asia/e44542f9-fc0e-481b-8b26-b899e7036473.gif)

Cũng khá là OK :v. Nhưng sẽ còn phải test đi test lại rất nhiều. Đoạn code ở trên chỉ demo hoạt động thôi. Và kỹ thuật này cũng yêu cầu chúng ta phải chuẩn bị đầy đủ các hình ảnh tương ứng nữa. Nhưng nó mang lại trải nghiệm người dùng rất tốt (theo đánh giá của mình, gì chứ chuẩn bị thì chúng ta sẽ làm được) vì vậy nếu được thì hãy áp dụng ngay.

Sẽ còn nhiều trick và kỹ thuật nữa, nhưng hôm nay mình xin phép dừng ở đây. Cảm ơn mọi người đã theo dõi đến cuối bài chia sẻ, mong rằng bài viết sẽ hữu ích đối với mọi người. Xin chào và hẹn gặp lại ở các bài tiếp theo! :triumph: