Với Nextjs phiên bản 10, một image component đã được giới thiệu để cung cấp những tối ưu hiệu năng về image khi làm việc với Nextjs.

Với việc đọc tài liệu thì có thể bạn sẽ rất mong lung với những khái niệm khá mới và mơi hồ. Nên mình khuyên các bạn nên chiến thực tế để hiểu được cách nó hoạt động thay vì chỉ đọc [Document](https://nextjs.org/docs/api-reference/next/image#optional-props).

 Một ví dụ sử dụng `Image` component đơn giản:
 
 ```javascript
 // pages/index.js
 
import Image from "next/image";
import styles from "../styles/Home.module.css";

// 1000x800
import Picture from "../public/picture.jpeg";

export default function Home() {
  return (
    <div className={styles.container}>
      <Image src={Picture} alt="picture"/>
    </div>
  );
}
export default Home
 ```
 
 Những `props` được yêu cầu khi sử dụng `Image`.
 
### `src` 
 
* Là một file ảnh được import tĩnh, như ví dụ trên.
* Là một `path string`. Có thể là `external URL` hoặc `internal path` tuỳ vào [loader](https://nextjs.org/docs/api-reference/next/image#loader).
 
 ### `height` và `width`
 Phải là `number` tương ứng với đơn vị `px`. Không sử dụng cho `statically imported images` hoặc `layout="fill"`
 
Những `props`  tuỳ sự lựa chọn của bạn trong từng trường hợp:

### `layout`
Gồm 4 giá trị:
1. `fixed`:  Kích thước ảnh sẽ không thay đổi khi bạn thay đổi kích thước `viewport`. nó giống như một `img` bình thường

2. `intrinsic` (default): Ảnh sẽ được thu nhỏ kích thước đối với `viewport` nhỏ hơn và phóng to đối với `viewport` lớn hơn. Nhưng nó vẫn giữ kích thước gốc khi `viewport` lớn hơn. (Giải thích 1)
3. `responsive`: Ảnh sẽ được thu nhỏ kích thước đối với `viewport` nhỏ hơn và phóng to đối với `viewport` lớn hơn. Chú ý thằng này có thể hoạt động không chính xác nếu thằng cha là một giá trị khác`display: block` như là  `flex` hoặc `grid`
4. `fill`: Ảnh sẽ được kéo dài `width` và `height` theo kich thước của `parent element`,   muốn vậy thằng cha phải có thuộc tính `position: relative`. Với layout này bạn có thể đi kèm với prop `objectFit`(nó tương tự như trong css)

Hãy thử từng layout để thấy được sự thay đổi
```javascript
 // pages/index.js
 
import Image from "next/image";
import styles from "../styles/Home.module.css";

// 1000x800
import Picture from "../public/picture.jpeg";

export default function Home() {
  return (
    <div>
      <Image src={Picture} alt="picture" layout="fixed" />
      <Image src={Picture} alt="picture" layout="intrinsic" />
      <Image src={Picture} alt="picture" layout="responsive" />
      <div className={styles.parentEl}>
        <Image src={Picture} alt="picture" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
 ```
 
  ```css
/* styles/Home.module.css */

.parentEl {
      position: relative;
      max-width: 700px;
      height: 300px;
}
 ```
 
Giải thích 1: 
* `fixed` và `intrinsic`:  Không thay đổi kích tưởng anh cho từng `viewport` tương ứng.
* Đối với `responsive` và `fill` thì nextjs thêm srcSet vào image để tới những `viewport` sẽ tương ứng download từng ảnh phù hợp kích thước.

Bạn có thể kiểm chứng bằng việc thu nhỏ màn hình từ 500px -> full viewport. Bạn nhận thấy qua từng `breakpoints` trình duyệt sẽ tự động tải về một image với độ phân giải phù hợp với màn hình hiện tại. Bạn có thể xem cấu hình `breakpoints` mặc định [ở đây](https://nextjs.org/docs/basic-features/image-optimization#device-sizes).

Chú ý `Disable cache` mới thấy được nhé:

![](https://images.viblo.asia/7b3a2b24-4b08-424c-981c-d015b3b50024.png)

### `quality`: 
Chất lượng của một ảnh được tối ưu, giá trị `interger` từ `1`-`100`. `100` là chất lượng tốt nhất. `75` là mặc định.

### `placeholder`: 
được sử dụng khi ảnh đang loading, giá trị có thể là `blur` hoặc `empty`. Mặc định `empty`.

Khi giá trị là `blur`, [blurDataURL](https://nextjs.org/docs/api-reference/next/image#blurdataurl) sẽ được sử dụng khi làm placeholder. 

Nếu như `src` là một object từ một file tĩnh và ảnh được import là jpg, png hoặc webp thì sau đó `blurData` sẽ tự động được thêm vào.