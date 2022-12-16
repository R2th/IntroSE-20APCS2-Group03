### Giới thiệu
Trong bài viết trước mình có giới thiệu về page builder Gutenburg sắp tích hợp vào WordPress và cách để tạo 1 plugin code các block nhúng vào trong page builder này ([Link](https://viblo.asia/p/tao-block-gutenberg-cua-ban-voi-cgb-YWOZrpBy5Q0)).
Bài viết nãy mình sẽ hướng dẫn cụ thể cách tạo 1 block, mà ở đây là 1 block Card, sẽ có các tính năng là Nhập ảnh, tiêu đề và nội dung để hiển thị trên trình soạn thảo và ngoài trang Frontend phía người dùng.
### Bắt đầu
#### Cấu trúc thư mục
Chi tiết về cấu trúc thư mục thì mình đã nói rõ trong bài viết trước, mình sẽ tạo 1 thư mục card-block nằm trong thư mục src, cụ thể như sau
```
first-block/src
--card-block
 ----block.js
 ----style.scss
 ----editor.scss
```
hoặc xem ảnh sau, phần thêm là phần mình bôi viền đỏ:
![](https://images.viblo.asia/4738a6f0-dc0c-403b-a5ec-3a3c5334c83d.png)
#### Javascript
 Trong file src/blocks.js cần import file card-block/block.js vừa tạo, thêm dòng sau vào cuối file. Code để tạo block sẽ nằm trong file card-block/block.js này.
```
import './card-block/block.js';
```
Ở file card-block/block.js, gọi một số component cần thiết trong ví dụ
```
const { RichText, MediaUpload, PlainText } = wp.editor; // Gọi 1 số component từ Editor
const { registerBlockType } = wp.blocks; // Gọi component đăng ký block
const { Button } = wp.components; // Gọi component Button
```

Tiếp theo là import các file style đã được tạo
```
import './style.scss';
import './editor.scss';
```

Đăng ký block card, khai báo với Gutenberg rằng tôi muốn đăng ký 1 block có tiêu đề là `Card`, với icon `heart` (icon này dùng bộ Dashicon của WordPress), nằm trong category `common` của Gutenberg.
```
registerBlockType('first-block/card', {   
  title: 'Card',
  icon: 'heart',
  category: 'common'
});
```

Tiếp theo khai báo một số thuộc tính có thể chỉnh sửa nội dung của block, nó hoạt động tương tự với `state` của ReactJS với phương thức `setAttributes` để cập nhật các thuộc tính đó, đoạn code này viết tiếp vào đoạn ở trên, phía dưới phần `category: 'common'` và được thêm dấu `,` sau `common`
```
attributes: {
  title: {
    source: 'text',
    selector: '.card__title'
  },
  body: {
    type: 'array',
    source: 'children',
    selector: '.card__body'
  },
  imageAlt: {
    attribute: 'alt',
    selector: '.card__image'
  },
  imageUrl: {
    attribute: 'src',
    selector: '.card__image'
  }
}
```

Thên edit function ở phía sau phần `attributes` ở trên (nhớ kèm theo dấu `,` ở sau dấu đóng ngoặc nhọn `}`). Function này sẽ trả về phần sẽ hiển thị trên trình soạn thảo.
```
edit({ attributes, className, setAttributes }) {

    // Khai báo dữ liệu trả về cho ImageButton. Có link ảnh sẽ hiển thị ra ảnh, nếu không sẽ hiển thị ra button chọn ảnh
    const getImageButton = (openEvent) => {
      if(attributes.imageUrl) {
        return (
          <img 
            src={ attributes.imageUrl }
            onClick={ openEvent }
            className="image"
          />
        );
      }
      else {
        return (
          <div className="button-container">
            <Button 
              onClick={ openEvent }
              className="button button-large"
            >
              Chọn Ảnh
            </Button>
          </div>
        );
      }
    };

    // Trả về dữ liệu để hiển thị lên trình soạn thảo
    return (
      <div className="container">
        // Component này có nhiệm vụ hiển thị button Chọn Ảnh hoặc hiển thị ảnh đã được chọn 
        <MediaUpload
          onSelect={ media => { setAttributes({ imageAlt: media.alt, imageUrl: media.url }); } } // Khi chọn ảnh các attributes sẽ được cập nhật
          type="image"
          value={ attributes.imageID }
          render={ ({ open }) => getImageButton(open) }
        />
        // Component này hiển thị ra inputtext để nhập tiêu đề, và set dữ liệu khi nhập vào inputtext
        <PlainText
          onChange={ content => setAttributes({ title: content }) }
          value={ attributes.title }
          placeholder="Your card title"
          className="heading"
        />
        // Component này hiển thị ra textarea để nhập nội dung của box, tương tự với các component trên, nó cũng set dữ liệu khi người dùng nhập thông tin.
        <RichText
          onChange={ content => setAttributes({ body: content }) }
          value={ attributes.body }
          multiline="p"
          placeholder="Your card text"
          formattingControls={ ['bold', 'italic', 'underline'] }
          isSelected={ attributes.isSelected }
        />
      </div>
    );

  },
```

Tiếp theo là function save. Đây là function để xác định sẽ lưu gì vào database, mà cụ thể là trường post_content của post/page.
```
save({ attributes }) {

  // Function hiển thị Ảnh
  const cardImage = (src, alt) => {
    if(!src) return null;

    if(alt) {
      return (
        <img 
          className="card__image" 
          src={ src }
          alt={ alt }
        /> 
      );
    }
    
    // No alt set, so let's hide it from screen readers
    return (
      <img 
        className="card__image" 
        src={ src }
        alt=""
        aria-hidden="true"
      /> 
    );
  };
  
  // Function hiển thị HTML sẽ được lưu vào database
  return (
    <div className="card">
      { cardImage(attributes.imageUrl, attributes.imageAlt) }
      <div className="card__content">
        <h3 className="card__title">{ attributes.title }</h3>
        <div className="card__body">
          { attributes.body }
        </div>
      </div>
    </div>
  );
}
```
#### Style
Thêm 1 chút style để block hiển thị đẹp hơn trên trình soạn thảo, mở file card-block/editor.scss và sửa thảnh:
```

.gutenberg {
    
  .container {
    border: 1px solid #ccc;
    padding: 1rem;
  }

  .button-container {
    text-align: center;
    padding: 22% 0;
    background: #ccc;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    margin: 0 0 1.2rem 0;
  }

  .heading {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .image {
    height: 15.7rem;
    width: 100%;
    object-fit: cover;
  }
}
```
### Kết quả
Đây là kết quả của ví dụ trên, bài viết sau mình sẽ hướng dẫn các bạn sử dụng block và render dữ liệu động, hẹn gặp lại các bạn nhé
![](https://images.viblo.asia/01e9e47d-10c8-481b-b595-6065fc801207.png)

Tham khảo: [here](https://css-tricks.com/learning-gutenberg-7-building-our-block-custom-card-block/)