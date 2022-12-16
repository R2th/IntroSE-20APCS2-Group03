Chào mọi người, từ hôm nay mình sẽ bắt đầu series tạo các hàm *common* (có nhiều người gọi bằng *utils* hay *helpers* đều được nhé). Các hàm common javascript thì theo mình dự án nào cũng có, từ nhỏ đến lớn, từ đơn giản đến phức tạp, từ dự án cá nhân đến công ty. 

Chúng ta hiểu đơn giản các hàm *common* là các hàm thực hiện một nhiệm vụ nào đó lặp đi lặp lại mà chúng ta không cần phải duplicate code để xử lý, việc đơn giản là *import* hàm *common* này và sử dụng ở những nơi mong muốn, chỉ đơn giản vậy thôi - that's it.

**Những đặc điểm của common functions:**
- Là một hàm *javascript* thông thường có thể nhận tham số đầu vào, thực hiện task vụ và có thể trả về một giá trị nào đó.
- *Common* functions nên là các `Pure functions` - không chứa các code side effects, call api, cùng một giá trị truyền vào thì giá trị trả về là không thay đổi.
- Mỗi hàm chỉ nên thực hiện một task vụ đơn giản, hạn chế nhồi nhét quá nhiều logic.
- Dễ dàng apply unit test.

Ở bài đẩu tiên của series mình sẽ giới thiệu 2 hàm nghe có vẻ lạ lùng nhưng rất thú vị :v: 

(*Note*: dưới đây là những cách viết đơn giản nhất đủ đáp ứng yêu cầu cho bài toán; mọi người có thể custom, thêm bớt cho phù hợp với mục đích sử dụng riêng nhé)

#### 1. sleep/delay
Mục đích hàm này dùng để tạm dừng flow *runtime* trong một khoảng thời gian nào đấy, ngoài ra chúng ta có thể sử dụng hàm này để giả lập các task bất đồng bộ như call api,... Thay vì sử dụng `setTimeout` bằng `callback function` thì ta có thể dùng `Promise` để convert sang cách viết `async await` thuận tiện hơn.

```js
// Define
function delay(milisecond) {
  return new Promise(resolve => setTimeout(resolve, milisecond));
}

// Usage
console.log('start');
await delay(3000);
console.log('continues after 3 seconds');
```

#### 2. debounce
Chắc hẳn các bạn cũng đã gặp những bài toán như thế này: 
- User nhập text vào `input` search, và mỗi lần nhập chúng ta bắt sự kiện `keyup` để call api search để show ra ngay kết quả cho user.
- Hay là khi user resize/scroll window browser, chúng ta sẽ thực hiện một action nào đấy `window.addEventListener('resize', complexFunc)`

Ví dụ:
![](https://images.viblo.asia/0356f0fd-f099-40cd-8f4a-b53ce51bdd46.gif)


Nếu như ở những trường hợp trên sử dụng cách gọi hàm thông thường thì chúng ta gặp phải một vấn đề nghiêm trọng đó là performance kém, tiêu tốn quá nhiều tài nguyên máy để xử lý những complex task trong một khoản thời gian ngắn; thử hình dung mỗi lần user nhập input thì code chúng ta ngay tức thì call api search thì quả là không ổn tí nào, một pha xử lý quá cồng kềnh :D :D :D

Và để tránh tình trạng trên thì chúng ta sẽ dùng một kỹ thuật có tên là `debounce`: mục đích đơn giản là chỉ thực thi task một lần duy nhất trong một khoảng thời gian xác định.

```js
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
function debounce(func, wait) {
  let timeout;

  // This is the function that is returned and will be executed many times
  // We spread (...args) to capture any number of parameters we want to pass
  return function executedFunction(...args) {

    // The callback function to be executed after the debounce time has elapsed
    const later = () => {
      // null timeout to indicate the debounce ended
      timeout = null;
      
      // Execute the callback
      func(...args);
    };
    // This will reset the waiting every function execution.
    clearTimeout(timeout);
    
    // Restart the debounce waiting period.
    timeout = setTimeout(later, wait);
  };
};

// Usage
const find = debounce(text => fetchData(text), 2000);
inputSearch.addEventListener("keyup", event => {
  find(event.target.value);
});
```

Ở ví dụ trên thì cho user nhập text thoải mái, cứ sau mỗi 2s thì sẽ lấy text hiện tại để call api search, như vậy sẽ giảm một cách đáng kể quá trình call api đúng không nào!

Nếu bạn hiểu rõ Kỹ thuật debounce này cũng có thể sử dụng trong rất nhiều tình huống khác.

### Kết luận
Đây là bài đầu tiên trong series common function của mình nên chỉ giới thiệu đến 2 hàm này thôi, hy vọng mọi sẽ vận dụng nó trong các dự án của mình một cách hiệu quả, đón chờ những part tiếp theo nhé, cám ơn mọi người.