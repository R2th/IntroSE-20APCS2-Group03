Nếu bạn đang làm việc trên một ứng dụng, rất có thể bạn đang sử dụng một danh sách các mục: người dùng, bình luận, bài đăng, phim, v.v.

Cấu trúc dữ liệu phổ biến nhất để chọn cho danh sách trong Javascript là một array.

Mình muốn giải thích tại sao đó có thể không phải là lựa chọn tốt nhất khi lưu trữ những danh sách đó trong một công cụ quản lý state như Redux hoặc React Context.

### C[RUD] hoạt động trên một item

Nếu bạn muốn thực hiện một trong các thao tác RUD (đọc, cập nhật hoặc xoá) thành một mục duy nhất, bạn luôn cần phải lặp lại.

Ngoại trừ việc tạo, nơi bạn chỉ cần thêm mục vào danh sách.

**Đọc**

Nếu bạn sử dụng một y, bạn cần tìm mục đó bằng cách lọc (filter). Khi bạn có một object, bạn chỉ cần mã định danh bạn đã sử dụng làm khóa.

**Cập nhật**

Khi sử dụng một array, cách nhanh nhất là map và thay đổi array bạn muốn thay đổi. Với một object, chỉ cần đặt thuộc tính trỏ đến mục được cập nhật.

**Xoá**

Lọc (filter) array. Chỉ cần xóa khóa trong object.


### Fetching from an API
Đây là nơi sử dụng một object bằng cách sử dụng một array.

Khi các items của bạn đến từ , bạn cần tìm nạp chúng. Điều gì xảy ra khi bạn lấy cùng một item hai lần? Hoặc cùng một danh sách hai lần? Hoặc một danh sách với một số item trùng lặp và một số item mới?

Nếu bạn sử dụng một array, bạn cần đảm bảo không trùng lặp các mục. Bạn cần xử lý tình huống đó. Điều đó thêm phức tạp.

Làm thế nào về việc thêm vào một object cùng một item hai lần?

Không có gì làm. Các mục được lưu trữ bằng chìa khóa (key). Trong một object, bạn không thể có cùng một khóa hai lần. Bạn sẽ chỉ thay thế item được tìm nạp bằng item đã có trong state.

### Khi nào không cần sử dụng object
Nếu bạn không có một key duy nhất cho mỗi item. Hoặc bạn muốn giữ một danh sách mà không cần sử dụng để thêm, cập nhật, xoá tức là một danh sách cố định.


Hãy cùng xem một số ví dụ sau để hiểu rõ hơn về những vấn đề mà mình đã nói ở trên nhé.

```
// array
const comments = [
  { id: '1', text: 'add code examples' },
  { id: '2', text: 'examples would be great for this article' },
  { id: '3', text: 'hi there' },
];
// object
const comments = {
  '1': { id: '1', text: 'please add code examples' },
  '2': { id: '2', text: 'examples would be great for this article' },
  '3': { id: '3', text: 'hi there' },
};
```

**Đọc comment có id 2**

```
const commentId = '2';
// array
comments.find((comment) => comment.id === commentId)
// object
comments[commentId];
```

**Cập nhật comment có id 1**

```
const updatedComment = { id: '1', text: 'add code examples, please' };
// array
comments.map((comment) => {
  if (comment.id === updatedComment.id) {
    return updatedComment;
  }
  return comment;
});
// object
comments[updatedComment.id] = updatedComment;
```

**Xoá comment có id 3**

```
const commentId = '3';
// array
comments.filter((comment) => comment.id !== commentId);
// object
delete comments[commentId];
```

**Tạo mới một comment**
```
const newComment = { id: '4', text: 'thanks for the code examples!' };
// array
if (comments.find((comment) => comment.id === newComment.id) {
  comments = comments.map((comment) => {
    if (comment.id === newComment.id) {
      return newComment;
    }
    return comment;
  });
} else {
  comments = comments.concat([newComment]);
}
// object
comments[newComment.id] = newComment;
```

### Nếu bạn cần array trong code của bạn?
Đôi khi, bạn có thể thấy rằng nó dễ dàng hơn khi sử dụng một mảng cho danh sách các item của bạn. Ví dụ, khi bạn đang hiển thị một danh sách. Nó dễ dàng hơn đối với một mảng, sử dụng map và tạo phần tử trong mỗi lần lặp.

Để giải quyết được vấn đề trên thì mình đưa ra một giải pháp dễ dàng hơn. Hãy nhìn ví dụ dưới đây để hiểu hơn nhé.
```
// object
const comments = {
  '1': { id: '1', text: 'please add code examples' },
  '2': { id: '2', text: 'examples would be great for this article' },
  '3': { id: '3', text: 'hi there' },
};
// Hàm dùng để chuyển object thành array
const commentsSelector = (commentsObj) => {
  return Object.keys(commentsObj)
    .map((commentKey) => commentsObj[commentKey]);
};
// Vậy là xong, đơn giản phải không nào
const commentsArray = commentsSelector(comments);
```

### Kết luận
Đến đây thì chắc các bạn cũng biết lợi ích của việc object là gì rồi nhỉ. Chính xác là nó giúp các bạn tiết kiệm thời gian, rút ngắn các dòng code của mình. Điều đó giúp bạn hạn chế những lỗi không mong muốn.

Sau khi đọc bài viết này hi vọng các bạn có thể dễ dàng đưa ra lựa chọn dùng array hay object nhé.

Cảm ơn mọi người đã đọc bài viết của mình. Hẹn gặp lại mọi người trong các bài viết sau.

Tham khảo: https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-why-you-should-use-an-object-not-an-array-for-lists-bee4a1fbc8bd