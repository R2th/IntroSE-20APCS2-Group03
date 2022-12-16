## Giới thiệu
Demo luôn cho mọi người hình dung, mình xin chia sẻ cách phân trang và get số lượng tin tức mỗi trang = react (mình lấy ví dụ dữ liệu ở đây là tin tức), theo logic đơn giản, ai cũng làm được, còn cao hơn các bạn nên dùng các plugin có sẵn sẽ đẹp hơn :joy:
{@embed: https://codepen.io/dfly25e/pen/ewYWXj?editors=0010}

## Ý tưởng, thực hiện
Có 2 cách phân trang cơ bản là lấy hết dữ liệu rồi chia thành nhiều trang, mỗi lần ấn vào trang khác là chỉ show dữ liệu trang đó ra thôi, cách thứ 2 là chỉ lấy dữ liệu cho từng trang mỗi khi ấn vào trang đó
Các bạn tự xem xem mình làm theo cách nào nhé (mình ko có ý thách đố gì đâu nhưng nếu cứ viết liền tù tì như văn đến cuối nhiều người có khi chỉ lướt theo mà ko ngẫm nghĩ thì cũng hơi buồn ngủ :sleeping:)
Đầu tiên là tạo 1 biến dữ liệu, tạm dùng thôi, chứ thực tế thì nó sẽ khác tý, mọi người hay lấy từ API, các bạn tạo nhiều tí cho dễ xem
```
var newsList = [
  {
    "id": "abc01",
    "title": "The Highs and Lows of Life as a Black Editor in Chief",
    "content": "ct1"
  },
  {
    "id": "abc02",
    "title": "The Real Reason Apple Wants You to Use Its Sign-in Service",
    "content": "ct2"
  }
  ...
```
Ta sẽ có 1 bảng hiển thị dữ liệu ra, đặt là TableList, trong TableList sẽ có các row TableItem, làm thật thì các bạn nên chia cái phần GetBy và phân trang thành 2 component nữa nhưng mình viết hết vào cho gọn trên codepen thôi

![](https://images.viblo.asia/61852f02-ae05-49bc-91e6-2a62738b0554.png)

Chúng ta dựa vào 3 biến để phân trang, `currentPage`, `newsPerPage`, `newsList` (trang hiện tại, tin tức mỗi trang, danh sách tin tức), ở đây newsList là data tạm coi là mặc định không đổi, còn `currentPage`, `newsPerPage` ta sẽ dùng làm state

Trong **1 trang**:
```
const currentPage = this.state.currentPage;  //trang hiện tại
    const newsPerPage = this.state.newsPerPage; //tin tức mỗi trang
    const indexOfLastNews = currentPage * newsPerPage; //index(vị trí) tin tức cuối cùng của trang hiện tại trong mảng dữ liệu newsList
    const indexOfFirstNews = indexOfLastNews - newsPerPage; //index(vị trí) tin tức đầu tiên của trang hiện tại trong mảng dữ liệu newsList
    const currentTodos = newsList.slice(indexOfFirstNews, indexOfLastNews); //*cắt* dữ liệu ban đầu, lấy ra 1 mảng dữ liệu mới cho trang hiện tại
```
Giả sử trang hiện tại là 1, tin tức mỗi trang là 3, có nghĩa là ta sẽ cắt từ mảng dữ liệu ban đầu newsList ra lấy 1 mảng mới gồm 3 phần tử đầu tiên, và ta sẽ lặp cái mảng mới này để show ra 3 tin tức cho trang đầu tiên

![](https://images.viblo.asia/ccfeffcc-5f91-4ecc-9c08-a431c6d78fd6.png)

Còn đây là cách đánh số thứ tự `stt={index + 1 + (currentPage - 1)*newsPerPage}`, các bạn tự nhìn code hình dung tại sao nhé cho đỡ buồn ngủ :sleeping:
Tính số trang, cũng đơn giản thôi, lấy tổng số tin chia cho tin mỗi trang, và làm tròn lên:
```
const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(newsList.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
```
Ngoài ra thì còn vài hàm lặp lấy dữ liệu, thay đổi state trang hiện tại và số tin mỗi trang, có lẽ ko cần nói thêm. Các bạn cứ nhìn code và nếu ko rõ chỗ nào thì console.log() từng biến từng state ra sẽ hiểu hơn và đỡ buồn ngủ hơn đọc chữ của mình :joy:
## Kết luận
Mình nghĩ chia sẻ code thì các bạn nên đọc code và ngẫm hơn là đọc chữ thành ra mình viết ngắn gọn vậy thôi, mục đích là hiểu logic phân trang và thực hiện chứ ko chăm chút css hay gì khác, các bạn nhất là các pro bỏ quá và chỉ giáo thêm, mình cũng mới học react thôi :clap:
Cám ơn các bạn đã xem!