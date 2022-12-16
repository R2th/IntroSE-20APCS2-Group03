-  Trong lúc các bạn làm việc có rất nhiều yêu cầu là cắt chuỗi văn bản và thêm dấu ... vào sau, mà ko biết nên làm thế nào. Ở bài này mình sẽ hướng dẫn các bạn tips đơn giản để căt chuỗi văn bản. Dưới mỗi cách hướng dẫn mình đều có demo cho nó. Vui lòng hãy xem nó

-  Thuộc tính **text-overflow** sẽ cắt bớt văn bản khi có text tràn


    ```CSS
    .ellipsis {
      text-overflow: ellipsis; Cắt một đoạn text và thay thế bằng dấu ...
      white-space: nowrap; Ngăn k cho đoạn văn bản xuống dòng
      overflow: hidden; Ẩn đoạn text bị thừa
    }
    ```

    - Link demo : https://codepen.io/ngc-yn/pen/Rwbeapr

- Chú ý trong qúa trình làm với những đoạn văn bản không có space các đoạn text cứ viết liền với nhau chúng ta nên làm sao.  Hãy sử dụng  **word-break: break-all** hoặc **word-wrap: break-word**  cho những đoạn văn bản không space


    ```
    word-break: break-all // Một từ sẽ tự động ngắt ở bất kỳ chữ nào để xuống dòng.
    word-wrap: break-word // Những từ quá dài sẽ xuống dòng.

    ```
 

#### Sử dụng Flexbox

- Khi sử dụng flexbox để cắt văn bản thì cần cố định dc width của nó
    ```
    sử dụng: min-width: 0 + text-overflow: ellipsis + white-space: nowrap + overflow: hidden
    ```

- Link demo: https://codepen.io/ngc-yn/pen/aboRZOv


#### Cắt văn bản với nhiều dòng

- David DeSandro đã cho chúng ta thấy điều nhỏ bé này vài năm trước với css. https://dropshado.ws/post/1015351370/webkit-line-clamp

    ```
    .line-clamp {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    ```

- Link demo: https://codepen.io/ngc-yn/pen/NWKOrOV#_=_

- Nhưng vs cách hiện tại ta chỉ dùng dc với những trình duyệt sử dụng webkit còn những trình duyệt không sử dụng thì sao 
- Mình sẽ hướng dẫn các bạn tạo js đơn giản cho đoạn cắt văn bản nhiều dòng


#### Sử dụng js

- Đầu tiên các bạn xác định nó hiện mấy dòng. Xác định height của nó thông qua line-height ( height = số dòng * line-height của 1 dòng)

    ```HTML
     <div class="js-parent-eclipse parent-eclipse">

      <div class="js-child-eclipse child-eclipse">
    This is a long string that is OK to truncate please and thank you.This is a long string that is OK to truncate please and thank youThis is a long string that is OK to truncate please and thank you.This is a long string that is OK to truncate please and thank
      </div>
    </div>
    ```

    ```CSS
    .parent-eclipse {
          font-size: 16px;
          width: 300px;
          line-height: 24px; // Xd line-height
          height: 48px; // Xd muốn hiện 2 dòng: height = 24px(line-height) * 2(số dòng)
          overflow: hidden;
          position: relative; // để xd vị trí cho dấu 3 chấm sau này
    }

    .child-eclipse {
          width: calc(100% - 6px);
    }

    .dot { // Style dấu 3 chấm
          position: absolute;
          bottom: 0;
          right: -3px;
          font-size: 16px;
          color: #000;
          width: 14px;
          background: #fff;
          z-index: 9;
    }

    ```

    ```JS
      $('.js-child-eclipse').each(function () {
          var textHeight = $(this).outerHeight(), // xd height của child-eclipse
               heading = $(this).parents('.js-parent-eclipse'),
               textContainerHeight = heading.height(); // height của parent-eclipse
          if (textHeight > textContainerHeight) { // Nếu height của con lớn hơn height của cha. Height cha mình cố định rùi
            if (heading.find('span.dot').length === 0) {
              heading.append('<span class="dot">...</span>'); // Nếu nó lớn hơn thì mình append thêm class= dot( dot sẽ style dấu ...)
            }
          } else {
              heading.find('span.dot').remove(); // Nhỏ hơn thì nó xoá đi class dot
          }
      });
    ```

- Link demo : https://codepen.io/ngc-yn/pen/zYOyrzo

- Ngoài cách trên các bạn có thể sử dụng đếm kí tự ví dụ các bạn muốn nó hiển thị 30-40 kí tự cũng làm như cách trên thay vào đó như sau:

    ```
       if ($(this).text().length > 40) {
            if ($(this).find('span.dot').length === 0) {
             $(this).text().substring(0, 40);
              $(this).append('<span class="dot">...</span>');
          }
       }
    ```

### Kết luận

- Bài viết này mình đã hướng dẫn các bạn cách cắt ngắn đoạn văn bản và thêm dấu 3 chấm đằng sau. Nếu các bạn biết cách hay để cắt ngắn đoạn văn bản và thêm dấu ... đằng sau đừng ngại hãy để lại comment bên dưới bài viết. 
- Ngoài các cách mình hướng dẫn các bạn trên, các bạn có thể sử dụng thêm thư viện [dotdotdot](https://dotdotdot.frebsite.nl/), hoặc sử dụng [Clamp.js ](https://github.com/josephschmitt/Clamp.js)