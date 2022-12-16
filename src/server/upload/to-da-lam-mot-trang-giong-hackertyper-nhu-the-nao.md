# Giới thiệu
Xin chào, lại là tớ đây, hồi còn đi học có biết được một trang sống ảo cho các bạn thích làm hacker, đó là [hackertyper.com](http://hackertyper.com/) và cộng thêm những bộ phim liên quan đến những hacker đỉnh vờ lờ, trong lòng tớ nhen nhóm ý định, sau này lớn lên, tớ sẽ trở thành một hacker, chuyên hack Facebook, sửa quạt, sửa TV, ... bla bla. Rồi tớ cũng đã theo con đường lập trình, làm việc cho Sun* tính cả từ lúc thực tập đến giờ cũng đã 1 năm rưỡi rồi, nhưng không biết hack FB :) đành phải sống ảo, tự code lấy một trang nhìn cho ngầu lấy ý tưởng dựa trên [hackertyper.com](http://hackertyper.com/), bắt tay vào code nào :))

# Nội dung
Trước hết, tớ chúng ta sẽ tạo một file Html, có bao gồm thư viện Jquery:
```html:index.html
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8" />

    <title>Bach Nguyen | Hackertyper</title>
    <script src="jquery.min.js"></script>
</head>

<body>

</body>
</html>
```

Tiếp theo, để bao bọc toàn bộ code được in ra, tớ sẽ cho nó vào một thẻ `div` và gán id là main:
```html
...
<body>
    <div id="main"></div>
</body>
...
```

Để cho ngầu thì không thể thiếu được style, ở đây mình sẽ làm đơn giản thôi, chỉ cần font chữ, màu chữ, background là xong:
```css:index.css
html {
    color: #00FF00;
    background-color: black;
    font-family: monospace;
    font-weight: 500;
    font-size: 14px;
}
```

Nhúng css vào file `index.html` vừa được tạo:
```html:index.html
...
<head>
    ...
    <link href="index.css" rel="stylesheet" type="text/css" />
    ...
</head>
...
```

Bắt tay vào việc chính, chúng ta sẽ xử lý logic, lắng nghe sự kiện mỗi khi người dùng nhấn phím. Tớ sẽ tạo một file JS, trước tiên là khởi tạo object chứa các thuộc tính và phương thức cần thiết nhé:
```js:index.js
$(function() {
  $(document).keydown(function(event) {
    Typer.addText(event);
  });
});

const Typer = {
  text: null,
  index: 0, // vị trí con trỏ hiện tại
  speed: 5, // tốc độ gõ, mặc định là 5 ký tự mỗi khi nhấn
  file: '', // tên file code sẽ được sử dụng
  init: () => {},
  content: () => {},
  write: str => {},
  addText: key => {},
  updateLastChar: () => {}, // phần này chúng ta sẽ sử dụng để tạo hiệu ứng cursor blink cho giống terminal
}
```

Tiếp tục, tớ sẽ định nghĩa một số biến để dùng chung:
```js:index.js
const main = '#main'; // id của thẻ div mà chúng ta sẽ hiển thị code

// regex sẽ dùng cho việc replace chuỗi
const newLineRegex = new RegExp('\n', 'g'); // dòng mới
const spaceRegex = new RegExp('\\s', 'g'); // khoảng trắng
const tabRegex = new RegExp('\\t', 'g'); // tab

// keycode list, bạn có thể tham khảo ở trang http://gcctech.org/csc/javascript/javascript_keycodes.htm
const keyCode = {
  backspace: 8,
  f11: 122
};
```

Trong hàm `init()` chúng ta sẽ khởi tạo object, set thời gian hiển thị cursor blink và đọc file code:
```js:index.js
const Typer = {
  ...
  init: () => {
    setInterval(function() {
      Typer.updateLastChar();
    }, 500); // đặt thời gian cho blink cursor

    $.get(Typer.file, function(data) {
      Typer.text = data; // lưu nội dung file code
    });
  },
  ...
}
```

Tiếp đến là đọc nội dung đã được hiển thị trên trang html:
```js:index.js
const Typer = {
  ...
  content: () => $(main).html(),
  ...
}
```

Xử lý text tạo hiệu ứng cursor blink:
```js:index.js
const Typer = {
  ...
  write: str => {
    $(main).append(str);

    return false;
  },
  ...
  updateLastChar: () => {
    // blinking cursor
    const cont = Typer.content();

    // nếu ký tự cuối cùng là blink cursor
    if (cont.substring(cont.length - 1, cont.length) == '|') {
      const tempText = $(main)
        .html()
        .substring(0, cont.length - 1);

      $(main).html(tempText); // xóa blink cursor
    } else {
      Typer.write('|'); // ngược lại, hiển thị blink cursor
    }
  }
}
```

Okay, tới phần thêm text mỗi khi người dùng nhấn phím nhé:
```js:index.js
const Typer = {
  ...
  addText: key => {
    if (Typer.text) {
      const cont = Typer.content(); // nội dung đã được in ra

      // nếu nội dung cuối cùng là blinking cursor
      if (cont.substring(cont.length - 1, cont.length) == '|') {
        $(main).html(
          $(main)
            .html()
            .substring(0, cont.length - 1)
        ); // xóa chuỗi có bao gồm blink cursor
      }

      // đặt lại index đến vị trí sau cùng
      if (key.keyCode != keyCode.backspace) Typer.index += Typer.speed;
      else {
        // nếu index lớn hơn 0 và keycode là backspace thì index - speed
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }

      let newText = $(main)
        .text(Typer.text.substring(0, Typer.index))
        .html(); // cập nhật text mới

      newText = newText
        .replace(newLineRegex, '<br/>') // nếu text có bao gồm xuống dòng thì chuyển thành
        .replace(tabRegex, '&nbsp;&nbsp;&nbsp;&nbsp;') // nếu là tab thì thêm 4 khoảng trắng
        .replace(spaceRegex, '&nbsp;'); // nếu là khoảng trắng thì thay bằng non-breaking space

      $(main).html(newText); // in nội dung mới ra màn hình

      window.scrollBy(0, 50); // scroll để  màn hình luôn hiển thị text mới
    }

    // cho phép phóng to màn hình
    if (key.preventDefault && key.keyCode != keyCode.f11) {
      key.preventDefault();
    }

    if (key.keyCode != keyCode.f11) {
      key.returnValue = false;
    }
  },
  ...
}
```

Bây giờ, file `index.js` của chúng ta sẽ trông như thế này:
```js:index.js
/*
 * Code được tham khảo trên trang của Hackertyper.com
 */

const main = '#main';
const newLineRegex = new RegExp('\n', 'g'); // dòng mới
const spaceRegex = new RegExp('\\s', 'g'); // khoảng trắng
const tabRegex = new RegExp('\\t', 'g'); // tab
const keyCode = {
  backspace: 8,
  f11: 122
};

$(function() {
  $(document).keydown(function(event) {
    Typer.addText(event);
  });
});

const Typer = {
  text: null,
  index: 0, // vị trí con trỏ hiện tại
  speed: 5, // tốc độ gõ, mặc định là 5 ký tự mỗi khi nhấn
  file: '',

  init: () => {
    setInterval(function() {
      Typer.updateLastChar();
    }, 500); // đặt thời gian cho blink cursor

    $.get(Typer.file, function(data) {
      Typer.text = data; // lưu nội dung file code
    });
  },

  content: () => $(main).html(),

  write: str => {
    $(main).append(str);

    return false;
  },

  addText: key => {
    if (Typer.text) {
      const cont = Typer.content(); // nội dung đã được in ra

      // nếu nội dung cuối cùng là blinking cursor
      if (cont.substring(cont.length - 1, cont.length) == '|') {
        $(main).html(
          $(main)
            .html()
            .substring(0, cont.length - 1)
        ); // xóa chuỗi có bao gồm blink cursor
      }

      // đặt lại index đến vị trí sau cùng
      if (key.keyCode != keyCode.backspace) Typer.index += Typer.speed;
      else {
        // nếu index lớn hơn 0 và keycode là backspace thì index - speed
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }

      let newText = $(main)
        .text(Typer.text.substring(0, Typer.index))
        .html(); // cập nhật text mới

      newText = newText
        .replace(newLineRegex, '<br/>') // nếu text có bao gồm xuống dòng thì chuyển thành
        .replace(tabRegex, '&nbsp;&nbsp;&nbsp;&nbsp;') // nếu là tab thì thêm 4 khoảng trắng
        .replace(spaceRegex, '&nbsp;'); // nếu là khoảng trắng thì thay bằng non-breaking space

      $(main).html(newText); // in nội dung mới ra màn hình

      window.scrollBy(0, 50); // scroll để  màn hình luôn hiển thị text mới
    }

    // cho phép phóng to màn hình
    if (key.preventDefault && key.keyCode != keyCode.f11) {
      key.preventDefault();
    }

    if (key.keyCode != keyCode.f11) {
      key.returnValue = false;
    }
  },

  updateLastChar: () => {
    // blinking cursor
    const cont = Typer.content();

    // nếu ký tự cuối cùng là blink cursor
    if (cont.substring(cont.length - 1, cont.length) == '|') {
      const tempText = $(main)
        .html()
        .substring(0, cont.length - 1);

      $(main).html(tempText); // xóa blink cursor
    } else {
      Typer.write('|'); // ngược lại, in blink cursor
    }
  }
};
```
Cuối cùng là khởi tạo object Typer và truyền code mẫu zô
```html:index.html
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8" />

    <title>Bach Nguyen | Hackertyper</title>

    <link href="index.css" rel="stylesheet" type="text/css" />
    <script src="jquery.min.js"></script>
</head>

<body>
    <div id="main"></div>

    <!-- bạn gọi file js vừa tạo phía trên vào đây -->
    <script src="index.js"></script>
    <script>
        // truyền code để hiển thị, ở đây mình lấy luôn code của Jquery
        Typer.file = 'code.txt';

        // khởi tạo Typer
        Typer.init();
    </script>
</body>
</html>
```

Cấu trúc thư mục hiện tại sẽ giống như thế này:
```
typerhacker
    - code.txt
    - index.css
    - index.html
    - index.js
    - jquery.min.js
```

Tiến hành chạy thử, để tránh lỗi `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at file:///home/bach/Desktop/project/hackertyper/code.txt. (Reason: CORS request not http)`, tớ sẽ tự tạo localhost cho nó bằng lệnh `php -S localhost:8000`. Mở trình duyệt => truyền url `http://localhost:8000/` => enjoy :v 

Bạn có thể nghịch nó trên link này: [https://bachfl2w.github.io](https://bachfl2w.github.io/hackertyper/).

Github: [https://github.com/BachFl2w/hackertyper](https://github.com/BachFl2w/hackertyper)

# Tổng kết
Hiện chưa có bản cho mobile, bạn vui lòng truy cập bằng máy  tính và trải nghiệm :))) . Trên đây là bài viết hướng dẫn tự tạo một trang giống như hackertyper, hy vọng giúp ích cho việc tán gái của bạn :) Happy coding <3