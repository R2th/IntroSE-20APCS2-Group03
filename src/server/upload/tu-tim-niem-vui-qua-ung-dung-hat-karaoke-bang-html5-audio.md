Trong cuộc sống, thỉnh thoảng bạn hãy tìm vài trò vui vui để làm với công việc của mình, có thể nó sẽ giúp bạn giảm stress và thấy công việc có chút ý nghĩa hơn :D.

Mấy hôm nay rảnh rỗi, mình cũng viết ra một cái (chả biết gọi nó là cái gì, tạm gọi là ứng dụng vậy :stuck_out_tongue:) có chức năng để highlight các đoạn text theo lời bài hát (hay còn gọi là ca ra ô cê :sunglasses:). Thì cũng chả có gì đặc biệt, nhưng mình cũng thấy vui khi code xong và thỉnh thoảng căng thẳng, mở cái ứng dụng đấy ra vừa nghe nhạc, vừa xem cái thành quả của mình cũng thấy có thêm tí động lực học :grimacing:. Thì mình cũng mạn phép chia sẻ cái mớ code dở hơi, lôi thôi và nhiều bug của mình, có thể có bạn nào đó cần tới thì lấy về mà fix bug :rofl:. Thì do toàn code và một chút thuật toán xử lý nên mình chỉ nói qua về cái ý tưởng vớ vẩn của mình thôi nhé, còn các bạn đọc code chắc cũng hiểu phần nào.

## Ý tưởng

Đơn giản là mình muốn viết một cái ứng dụng web, có thể highlight các đoạn text theo lời một bài hát.

* Đầu tiên, mình cần một thứ để có thể load được bài hát và control được nó (play, pause, seeked). Thì trên HTML 5 có một thành phần là **audio** hỗ trợ tất cả các yêu cầu mà mình mong muốn nên mình sẽ dùng thằng này.
* Tiếp theo mình cần một tập các đoạn lời trong bài hát, cái này mình phải tự tạo bằng tay, mình tạo một mảng gồm các mảng con, mỗi mảng con chứa thông tin của một đoạn lời bài hát gồm [**lời bài hát**, **thời gian bắt đầu**, **thời gian kết thúc**]. Tạo kiểu mảng ntn thì sẽ dễ control hơn :D.

```javascript
var lyrics = [
  ['Đêm nghe hạt mưa rơi', 23.516146, 25.81885],
  ['Lòng chợt nhớ em vô cùng', 26, 30.344052],
  // ...
];
```

* Khi các bạn **play** hoặc **tua** đoạn nhạc đến các khoảng thời gian khác nhau, thì mình sẽ cần tính toán xem sẽ hiển thị đoạn lời nào ra, thì mình viết một hàm tạm đặt tên là **findWordIndex** để làm nhiệm vụ này.

```javascript
var audio = document.getElementById('audio');

var lyrics = [
  ['Đêm nghe hạt mưa rơi', 23.516146, 25.81885],
  ['Lòng chợt nhớ em vô cùng', 26, 30.344052],
  // ...
];

// ...

var findLyricIndex = function () {
  if (audio.currentTime === 0) {
    return 0;
  }
  for (var i = 0; i < lyrics.length; i++) {
    if (audio.currentTime >= lyrics[i][1] && audio.currentTime <= lyrics[i][2]) {
      return i;
    } else if (lyrics[i][1] >= audio.currentTime) {
      return i;
    }
  }
  return lyrics.length;
}
```

* Và khi **play** đoạn nhạc, thì mình sẽ chạy một hàm **interval** liên tục cập nhật thời gian hiện tại của đoạn nhạc và tính toán giữa thời gian bắt đầu, kết thúc của lời bài hát để cập nhật hiệu ứng highlight cho đoạn text.

```javascript
var lineIndex = 0;
var curentLyric, karaText, karaTextHighlight, audInterval;

// ...

audio.addEventListener('play', function () {
  audInterval = setInterval(function () {
    if (!curentLyric) {
      return;
    }

    var startTime = curentLyric[1];
    var endTime = curentLyric[2];

    if ((audio.currentTime - startTime) >= 0) {
      var duration = endTime - startTime;
      if (endTime - audio.currentTime > 0) {
        var ratio = ((100 / duration) * (endTime - audio.currentTime)) - 100;
        karaTextHighlight.style.width = ratio * -1 + '%';
      } else {
        lineIndex++;
        nextLine(lineIndex);
      }
    }
  }, 1000 / 60);
});

var nextLine = function (index) {
  if (!lyrics[lineIndex]) {
    return;
  }

  var lyric = lyrics[index];

  karaText.textContent = lyric[0];
  karaTextHighlight.textContent = lyric[0];
  karaTextHighlight.style.width = '0%';

  curentLyric = lyric;
}
```

* Còn cái hiệu ứng highlight text thì chỉ cần tạo ra 2 đoạn text giống nhau, 1 cái nằm dưới, 1 cái nằm trên, cái nẳm trên sẽ có màu mè và thay đổi chiều dài để tạo cái hiệu ứng highlight từ trái qua phải.

```css
#karaoke .kara-text,
#karaoke .kara-text-highlight {
  display: inline-block;
  font-size: 50px;
  white-space: nowrap;
}

#karaoke .kara-text {
  position: relative;
}

#karaoke .kara-text-highlight {
  position: absolute;
  top: 0;
  left: 0;
  color: violet;
  text-shadow: 0px 0px 20px violet;
  overflow: hidden;
}
```

## Thành quả

{@embed: https://jsfiddle.net/candysp/k7z2086g/8/embed/result,html,js,css/dark}

### Lưu ý

Bài hát trong ví dụ là bài "**Gọi Tên Em Trong Đêm - The Men**", nếu link của bài hát trong ví dụ bị die thì phiền các bạn thay 1 link khác để xem được ví dụ nhé, thanks all!

Chúc các bạn làm được nhiều cái hay ho hơn thế này và thêm yêu công việc của mình hơn nhé !

Nguồn: [http://codemoingay.com/tu-tim-niem-vui-qua-ung-dung-hat-karaoke-bang-html5-audio](http://codemoingay.com/tu-tim-niem-vui-qua-ung-dung-hat-karaoke-bang-html5-audio)