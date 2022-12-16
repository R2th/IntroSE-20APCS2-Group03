Vài năm trước, tôi đã làm việc tại một công ty khởi nghiệp nhỏ, rất nặng vấn đề thử nghiệm, đó là một sự thay đổi lớn về mặt tinh thần đối với tôi, vì tôi đã dành hai năm qua tại một công ty lớn hơn nhiều, và không viết 1 dòng test nào. Yup, công ty trước đây của tôi đã dựa vào một nhóm QA để kiểm tra tất cả các kịch bản về hành vi người dùng mà chúng tôi có thể mơ thấy trước khi đưa mã của chúng tôi vào tự nhiên. Đáng ngạc nhiên, điều này làm việc cho hầu hết các phần.

Mặc dù không viết test chắc chắn làm cho quá trình phát triển nhanh hơn (ít nhất là ban đầu), unit test là tiêu chuẩn ở hầu hết các công ty công nghệ hiện đại và bây giờ tôi thấy mình không chỉ đấu tranh với cú pháp kiểm tra đơn vị và tích hợp, mà toàn bộ ý tưởng rất xa lạ thường không biết bắt đầu từ đâu. Khi kiểm tra một thành phần hoặc phương thức có thể có nhiều hoán vị, các thử nghiệm của tôi sẽ trông giống như thế này:

```
//coolMethod.js
const maybeTruncate = (word, length = 5) => {
  if(!word.length){
    return 'N/A';
  }
  return word.length > length ? `${word.slice(0, length)}...` : word;
}

//coolMethod.spec.js
it('supports long words', () => {
  expect(maybeTruncate('really big word')).to.equal('reall...')
})
it('supports short words', () => {
  expect(maybeTruncate('short')).to.equal('short')
})
it('supports custom length', () => {
  expect(maybeTruncate('kinda big', 10)).to.equal('kinda big')
})
it('supports no word', () => {
  expect(maybeTruncate('')).to.equal('N/A')
})
```

Một hôm, một nhà phát triển khôn ngoan trong nhóm của tôi đã xem xét mã của tôi và xem xét một bài kiểm tra tương tự như ở trên, đã cho tôi một lời khuyên tốt: Dừng viết các bài kiểm tra như thế bạn là một kẻ ngốc. Anh ta hơi lập dị, thậm chí theo tiêu chuẩn nhà phát triển phần mềm. Sau đó anh ta mở túi ma thuật của mình về các thủ thuật mã hóa và chỉ cho tôi cách anh ta viết các bài kiểm tra.

Bây giờ anh chàng khôn ngoan này đặc biệt thích hợp để đưa ra lời khuyên thử nghiệm vì anh ta đã viết một thư viện phổ biến cho các nhà phát triển EmberJS để mock dữ liệu và một chút kiến thức thử nghiệm mà anh ta chia sẻ với tôi kể từ đó.

## Using Truth Tables

Một bảng chân lý thường được sử dụng trong Đại số Boolean để biểu thị kết quả toán học được tạo ra từ sự kết hợp của các giá trị. Chúng ta có thể áp dụng logic tương tự này để tạo các bài kiểm tra bằng cách viết một tập hợp các điều kiện và kết quả mong đợi. Điều này không chỉ làm cho mã của chúng ta dễ dàng lý luận hơn, nó còn tạo ra các thử nghiệm ngắn gọn hơn có thể dễ dàng sửa đổi để thêm các điều kiện khác nhau để kiểm tra khi chức năng hoặc thành phần của chúng ta chắc chắn thay đổi.

Sửa lại đoạn unit test trên sử dụng quy tắc bảng chân lý sẽ trông giống như thế này:

```
const tests = [
  //test              word              length      expected
  ['no word',         '',               undefined,  'N/A'],
  ['short word',     'Short',           undefined,  'Short'],
  ['long word',      'Not so short',    undefined,  'Not s...'],
  ['custom length',  'Not short',       15,         'Not short'],
]
test.forEach((test) => {
  const [assertion, word, length, expected] = test;  
  it(`supports ${assertion}`, () => {
    expect(maybeTruncate(word, length)).to.equal(expected)
  })
})
```

Bây giờ, khi một kịch bản mới cần được thử nghiệm, chỉ đơn giản như chèn một số giá trị vào bảng chân lý của chúng tôi và để bộ thử nghiệm của chúng tôi thực hiện công việc của nó. Điều này cắt giảm mã soạn sẵn và kiểm tra quá dài và cũng xác định rõ ràng các khả năng đầu vào mà chúng ta nên biết thay vì tìm kiếm thông qua một tập các thử nghiệm để tìm các trường hợp lạ.

## Tổng kết

Bản thân viết unit test là một hình thức nghệ thuật và mặc dù ban đầu tôi không thấy giá trị của chúng, tôi đã đánh giá cao cách chúng nắm bắt các kịch bản mà tôi không chuẩn bị ban đầu và cũng có thể khiến bạn cảm thấy thoải mái hơn rất nhiều khi tái cấu trúc mã không phải của bạn.

Một bộ kiểm tra mạnh với độ bao phủ tốt có thể khiến bạn tự tin hơn rằng sự thay đổi của bạn trên dòng 183 trong một tệp năm năm tuổi đã không phá vỡ thứ gì đó tiếp theo. Các bảng chân lý hy vọng là một mẫu bạn có thể sử dụng để làm cho các bài kiểm tra của bạn ngắn gọn hơn, rõ ràng hơn và có lẽ quan trọng hơn, thú vị hơn để viết.

> Source: [Using Truth Tables to write better unit tests](https://levelup.gitconnected.com/using-truth-tables-to-write-better-unit-tests-dd187f4a08e6)