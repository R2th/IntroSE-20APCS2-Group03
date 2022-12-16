> Khi lướt web, đôi khi ta cần copy 1 đoạn text nào đó và việc bôi đen chữ trở nên khó chịu, khi mà ta bị bôi đen nhầm chữ, hay đơn giản là ngón tay quá to khi sử dụng điện thoại.
> 

### Clipboard API

Đây là một chức năng mới của Web API, giúp ta tương tác (tất nhiên là copy & paste) với cái clipboard của hệ thống. API này hiện mới ở bản draft nên sẽ chỉ xuất hiện ở các browser chính như Chrome, Firefox, etc. và các phiên bản webview của nó (tất nhiên nó sẽ chả xuất hiện ở IE và Edge đâu :))

Để kiểm tra liệu trình duyệt mình đang dùng có hỗ trợ Clipboard API hay không, ta chỉ cần thử tương tác với global object của nó
```
navigator.clipboard // Clipboard {}
```

Ngoài ra, một lưu ý nữa là việc sử dụng Clipboard API cũng sẽ yêu cầu `user's permission` giống như là việc các trang web hay hỏi liệu ta có muốn nhận thông báo hay không. Nghĩa là, ta không thể cứ bật console lên mà vọc được, nó yêu cầu tương tác trực tiếp của người dùng lên webview.

### Usage

Clipboard API khá đơn giản, nó chỉ gồm 4 function:
- read
- readText
- write
- writeText

Trong đó, `read` và `write` cho phép ta xử lí dữ liệu dạng arbitrary (kiểu ảnh ọt các thứ), khá tiện. Nhưng với nhu cầu hiện tại thì ta chỉ muốn xử lí string và sử dụng readText và writeText sẽ vô cùng tiện lợi.

Ví dụ đơn giản:
```
<p>Copy me!</p>

<script>
  document.querySelector('p').addEventListener('click',  e => {

  const text = event.target.innerText
  navigator.clipboard.writeText(text)  // nã text vô clipboard
  e.target.textContent = 'Copied!!' // thêm tí thông báo copy thành công
})
</script>
```

Thêm chút xử lí cho tiến trình được hoàn thiện hơn
```
document.querySelector('p').addEventListener('click', async e => {
  if (!navigator.clipboard) return // méo có clipboard, abort!

  const text = event.target.innerText
  try {
    await navigator.clipboard.writeText(text)
    e.target.textContent = 'Copied to clipboard'
  } catch (error) {
    console.error('Failed to copy!', error)
    // handle error ở đây nếu có gì sai sai, thường chỉ xảy ra khi copy cái gì đó lớn vô clipboard
  }
})
```

### Kết

Clipboard tuy không phải chức năng gì to lớn mới mẻ nhưng sẽ trở nên khá tiện ích về sau. Là native API, nó sẽ tăng kha khá hiệu năng và giảm độ phức tạp đi so với việc sử dụng javascript. Tuy nhiên vào thời điểm hiện tại thì chúng ta hẵng chỉ vọc nó thôi chứ không đưa lên production nhé :)
Bạn đọc có thể tìm hiểu thêm ở [mozilla MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) hay sử dụng javascript để làm chức năng clipboard như [clipboard.js](https://clipboardjs.com/)