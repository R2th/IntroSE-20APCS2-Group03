Khi tôi nghĩ về hiệu năng của web, điều đầu tiên tôi nghĩ trong đầu đó chính là hình ảnh vì nó ảnh hưởng khá lớn đến trải nghiệm người dùng. Bài viết này tôi sẽ cùng bạn tạo một ví dụ lazy loading Image bằng VueJS

## Tạo một component ImageItem

Hãy bắt đầu bằng việc tạo một component hiển thị một hình ảnh (đương nhiên là chưa có lazy load gì cả). Chúng ta sẽ gọi file này là `ImageItem.vue`. Trong component này chúng ta sẽ tạo một thẻ `<figure>` để bọc hình ảnh.

```vue
<template>
  <figure class="image__wrapper">
    <img class="image__item" :src="source" alt="random image" />
  </figure>
</template>
```

Trong đoạn code này, chúng ta nhận **props** source - là `src` của hình ảnh mà ta muốn hiển thị.

```javascript
export default {
  name: 'ImageItem',
  props: {
    source: {
      type: String,
      required: true,
    },
  },
};
```

Nếu để như thế này thì hình ảnh sẽ load ngay lập tức, không sao chúng ta sẽ đến bước tiếp theo.

## Ngăn chặn tải hình ảnh khi component được tạo

Điều này nghe có vẻ vô lý vì chúng ta lại đi ngăn chặn một thứ gì đó trong khi chúng ta muốn hiển thị chúng, nhưng thực tế là chúng ta muốn nó tải đúng lúc là không phải chặn vô thời hạn. Để ngăn chặn hình ảnh được load thì chúng ta cần loại bỏ thuộc tính `src` từ thẻ `<img>`. Nhưng chúng ta vẫn cần lưu trữ chúng ở đâu đó, để khi cần sẽ sử dụng. Ở đây, ta dùng `data-url`

```vue
<template>
  <figure class="image__wrapper">
    <img class="image__item" :data-url="source" // yay for data attributes!
    alt="random image" >
  </figure>
</template>
```

Làm như thế này thì ảnh sẽ _không_ được load vì nó không có source URL để lấy về. Nhưng đây vẫn chưa phải điều mà chúng ta muốn, chúng ta muốn load hình ảnh dưới một điều kiện nào đó. Nhưng khó khăn ở đây là khi nào thì cần thay thế `src` của thẻ `<img>`, ví dụ chúng ta gắn hình ảnh vào một vị trí nào đó, và khi người dùng scroll thì ảnh mới được load. Làm sao để xác định được điều đó? Hãy tới bước tiếp theo

## Phát hiện khi người dùng muốn xem hình ảnh

Chúng ta muốn sử dụng sự kiện scroll để tính toán khi nào người dùng muốn hiển thị nhưng điều này lại làm giảm hiệu suất. **Intersection Observer** là giải pháp cho vấn đề này, nó cung cấp một cách hiệu quả xem phần tử có có đang được hiển thị hay không, đặc biệt là nó còn cho callback khi được hiển thị. Vì vậy chúng ta cần phải

- Tạo một Intersection observer
- Theo dõi element muốn sử dụng lazy load
- Thay thế `src` cho `data-url` khi đối tượng trong tầm nhìn
- Dừng thay đổi khi đã được load

Trong VueJS có directives để wrap tất cả những hàm với nhau và sử dụng chúng khi cần. Để hiểu hơn hãy đến bước tiếp theo

## Tạo một Vue custom directive

Chúng ta muốn thay thế `src` cho `data-url` và sử dụng custome directive là lựa chọn sáng giá:

```javascript
export default {
  inserted: (el) => {
    function loadImage() {
      const imageElement = Array.from(el.children).find(
        (el) => el.nodeName === 'IMG'
      );
      if (imageElement) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100);
        });
        imageElement.addEventListener('error', () => console.log('error'));
        imageElement.src = imageElement.dataset.url;
      }
    }

    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: '0',
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }
    if (window['IntersectionObserver']) {
      createObserver();
    } else {
      loadImage();
    }
  },
};
```

Bay giờ chúng ta sẽ cùng phân tích đoạn code trên nhé. Đầu tiên chúng ta sử dụng `inserted` hook bởi vì nó sẽ được gọi khi bound vào phần và đã được inserted vào phần tử cha, điều này đã chắc chắn đc là chúng có phần tử cha rồi sau đó mới quan sát chúng. Ta có đoạn code sau:

```javascript
export default {
  inserted: el => {
    ...
  }
}
```

Tiếp theo chúng ta sẽ viết hàm `loadImage` để thay thế giá trị của `data-url` cho `src`. Đầu tiên là việc tìm xem phần tử `<img>` ở đâu, sau đó kiểm tra xem nó có tồn tại hay không. Nếu như tìm thấy rồi thì ta sẽ thêm một sự kiện `load` để theo dõi việc load của hình ảnh, nếu như load xong thì chúng ta sẽ ẩn spinner hoặc hình ảnh đi bằng cách thêm class **loaded**. Ngoài ra chúng ta cũng có một event lắng nghe sự kiện khi xảy ra lỗi. Và cuối cùng chúng ta thay để `src` của hình ảnh

```javascript
function loadImage() {
  const imageElement = Array.from(el.children).find(
    (el) => el.nodeName === 'IMG'
  );
  if (imageElement) {
    imageElement.addEventListener('load', () => {
      setTimeout(() => el.classList.add('loaded'), 100);
    });
    imageElement.addEventListener('error', () => console.log('error'));
    imageElement.src = imageElement.dataset.url;
  }
}
```

Chúng ta sử dụng Intersection Observer để xác định điều kiện gọi hàm `loadImage` bên trên. Nó có quyền truy cập vào **entries** - là một mảng tất cả các phần tử được theo dõi bởi observer. Sau đó lặp và và kiểm tra nếu phần tử được hiển thị thì sẽ gọi hàm `loadImage`, và khi phần tử này được được đánh dấu là hình ảnh yêu cầu thì chúng ta không theo dõi nó nữa để ngăn chặn việc load lại nhiều lần

```javascript
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage();
      observer.unobserve(el);
    }
  });
}
```

Cuối cùng ta sẽ tạo hàm `createObserver`, hàm này chịu trách nhiệm tạo một Intersection Observer và gắn nó vào element cần theo dõi. Đối với đối tượng IntersectionObserver thì có 2 option đó là **root** và **threshold**. Root sẽ reference tới object căn cứ để theo dõi. Threshold giá trị từ 0 đến 1 sẽ là phần trăm hiển thị đối tượng để gọi call back, tức là giá trị 0 khi kéo tới đối tượng sẽ callback luôn, còn giá trị 1 thì khi hiển thị hết đối tượng mới callback.

```javascript
function createObserver() {
  const options = {
    root: null,
    threshold: '0',
  };
  const observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(el);
}
```

## Đăng ký directive

Để sử dụng directive ở nhiều nơi thì ta cần phải đăng ký chúng, ta có 2 cách là globally và locally. Sau đây là hai cách globally và locally:

```javascript
import Vue from 'vue';
import App from './App';
import LazyLoadDirective from './directives/LazyLoadDirective';

Vue.config.productionTip = false;

Vue.directive('lazyload', LazyLoadDirective);

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
```

Còn đây là cách sử dụng cho locally

```javascript
import LazyLoadDirective from './directives/LazyLoadDirective';

export default {
  directives: {
    lazyload: LazyLoadDirective,
  },
};
```

## Sử dụng directive cho ImageItem component

Bây giờ directive đã được đăng ký, chúng ta có thể sử dụng chúng bằng cách thêm `v-lazyload` vào phần tử cha của nó.

```vue
<template>
  <figure v-lazyload class="image__wrapper">
    <ImageSpinner class="image__spinner" />
    <img class="image__item" :data-url="source" alt="random image" />
  </figure>
</template>
```

## Browser Support

Intersection Observe API không support tất cả các browser, nó cover được khoảng 73%. Vì thế chúng ta cần kiểm tra xem browser có support hay không, nếu như browser không support thì hãy thay thế bằng hàm `loadImage`

```javascript
if (window['IntersectionObserver']) {
  createObserver();
} else {
  loadImage();
}
```

## Tổng kết

Trên đây là toàn bộ cách để tạo lazy loading image sử dụng Vuejs, chúng sẽ làm cải thiện đáng kể hiệu suất trang. Chúc các bạn thành công

Tin công đành cho dev: [https://stech.edu.vn/news](https://stech.edu.vn/news)