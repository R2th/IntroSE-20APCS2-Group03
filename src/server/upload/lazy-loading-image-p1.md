Hello mn. Trong bài viết này mình sẽ chia sẽ 1 cách tối ưu peformance cho hình ảnh. Ở phần 1 này, mình sẽ xây dựng một component ``React component Image`` bằng ``custom hook``, hiển thị một hình ảnh có độ phân giải thấp thay thế cho hình ảnh có độ phân giải cao khi hình ảnh đang dowload về client. Trong phần 2 chúng ta sẽ trì hoãn download hình ảnh cho đến khi mà hình ảnh đó được hiển thị trên màn hình.

#### Độ phân giải thấp - cao
Mình tạo 1 project với CLI ``create-react-app`` và xoá một số thứ không cần thiết đi.

Khởi tạo một cấu trúc thư mục cho component ``Image``
```
mkdir src/components
touch src/components/Image.js
```
Sẽ có 2 thẻ ``img`` nằm chồng lên nhau để có thể hiển thị xen kẻ giữa hình ảnh độ phân giải thấp và cao. Để làm được điều đó chúng ta sẽ thêm một số CSS cho thẻ nhé. Hơn nữa, sẽ có trường hợp 2 hình ảnh có kích thước khác nhau, vì vậy nên có 1 thẻ ``div`` bao bọc chúng lại với một kích thước cố định. Để đơn giản mình sẽ sử dụng ``Inline CSS``.

``Image.js``
```
const Image = ({ width = '100%', height = '100%', lowResSrc, highResSrc }) => {
  const styles = {
    wrapper: {
      position: 'relative',
      width,
      height,
    },
    image: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  }

  return (
    <div style={styles.wrapper}>
      <img src={lowResSrc} style={styles.image} />
      <img src={highResSrc} style={styles.image} />
    </div>
  )
}

export default Image
```
Giờ cung cấp cho nó một số props để sử dụng component này nhé.

``App.js``

```
const srcTuple = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/600',
]

...

<Image
  width={300}
  height={300}
  lowResSrc={srcTuple[0]}
  highResSrc={srcTuple[1]}
/>
```
``srcTuple[0]`` sẽ đại diện cho hình ảnh độ phân giải thấp trong khi chờ download độ phân giải cao hoàn tất. Để làm được điều này, chúng ta có thể sử dụng thuộc tính  ``onLoad`` của thẻ ``img``.  

Với React mới nhất, mình sẽ sử dụng ``custom hook``. ``hook`` này sẽ theo dõi trạng thái tải xuống của hình ảnh độ phân giải cao, và một vài css để sự chuyển đổi giữa 2 chất lượng hình ảnh được mượt mà hơn.

Tạo đường dẫn chứa ``custom hook``
```
mkdir src/hooks
touch src/hooks/useImageOnLoad.js
```

``useImageOnload``
```
import { useState } from 'react'

const useImageOnLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleImageOnLoad = () => setIsLoaded(true)

  const transitionStyles = {
    lowRes: {
      opacity: isLoaded ? 0 : 1,
      filter: 'blur(2px)',
      transition: 'opacity 500ms ease-out 50ms',
    },
    highRes: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 500ms ease-in 50ms',
    },
  }

  return { handleImageOnLoad, transitionStyles }
}

export default useImageOnLoad
```
Bây giờ tích hợp ``hook`` trên vào component ``Image`` nhé~

``Image.js``

```
const Image = ({ ... }) => {
  const { handleImageOnLoad, transitionStyles } = useImageOnLoad()

  const styles = {...}

  const lowResStyle = { ...styles.image, ...transitionStyles.lowRes }
  const hightResStyle = { ...styles.image, ...transitionStyles.highRes }

  return (
    <div style={styles.wrapper}>
      <img src={lowResSrc} style={lowResStyle} />
      <img src={highResSrc} style={hightResStyle} onLoad={handleImageOnLoad} />
    </div>
  )
}

export default Image
```

Trên đây là một chia sẽ nhỏ về tối ưu UX với image. Trong phần tiếp theo mình sẽ chỉ cho phép nó download hình ảnh chất lượng cao khi mà image được hiển thị trên khung màn hình. Cảm ơn mọi người đã xem bài viết. (bow)