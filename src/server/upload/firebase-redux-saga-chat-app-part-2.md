Phần này mình sẽ nói tiếp về phần async trong việc lắng nghe message được tạo mới, edit, delete. Đây có lẽ là phần không thể thiếu khi bạn muốn làm một ứng dụng chat.

Đầu tiên thì để nghe được các event như message mới được tạo ra, hay edit hay delete thì chúng ta phải lắng nghe các thay đổi dử liệu trong phòng chat đấy
```
export function* syncMessagesWorker(action) {
  const { roomId } = action.payload;
  yield fork(sync, `/messages/${roomId}`, {
    [CHILD_ADDED]: messageAdded,
    [CHILD_REMOVED]: messageRemoved,
    [CHILD_CHANGED]: messageChanged,
  }, MORE_MESSAGES_SIZE);
}
```
Đây làm hàm để bạn lắng nghe các sự kiện added, removed, changed message. 
Bạn cần chú ý ở đây là mình sẽ gọi hàm sync define như sau
```
export function* sync(path, mapEventToAction = {}, limit) {
  const ref = typeof limit === 'number' ?
    firebase.database().ref(path).limitToLast(limit)
    : firebase.database().ref(path);

  for (const type of EVENT_TYPES) {
    const action = mapEventToAction[type];

    if (typeof action === 'function') {
      yield fork(runSync, ref, type, action);
    }
  }
}
```
Ở đây firebase realtime nó sẽ cung cấp cho chúng ta bắt được các sự kiện khi dữ liệu trong 1 ref đang trỏ tới, vì thế việc đơn giản mà mình chỉ cần lắng nghe các sự kiện này bắn ra và lấy thông tin về xử lí thôi.
Và ở đây để hạn chế việc lắng nghe quá nhiều thay đổi dữ liêu không cần thiết thì chúng ta chỉ cần gửi đường path tới chính xác phòng chat nào mình muốn lắng nghe ( phòng nào bạn đang mở ra chat thì lắng nghe thôi hoặc phòng nào bạn join thì mới lắng nghe.v.v).
Tiếp theo là tham số "limit" đây là cái mà bạn cần cân nhắc nhiều nhất. vì nếu bạn ko define cái này thì mỗi lần chúng ta get thông tin records theo ref thì toàn bộ records đều bắn ra sự kiện là "Added" cả, vì sao nó lại như thế thì nghĩ đơn giản tí cho khoẻ là "thằng nào chả được added" từ quá khứ => khi bạn limit thì nó sẽ lắng nghe số lượng records được "thay đổi" mới nhất. 
Nó sẽ tuyệt vời nữa chính là khi bạn nghĩ đến 1 issues như sau: sau khi load list "n" message mới nhất của 1 phòng chat và đồng thời khi đấy lại có vài tin nhắn được gửi mới lên luôn thì khi đấy chính việc lắng nghe luôn cả "limit" message event mới nhất này sẽ hỗ trợ các bạn xử lí để nếu không bị miss các message này.
Còn các function xử lí mỗi khi nghe được các event như "CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED" thì tuỳ các bạn mỗi người xử lí như thế nào cũng được.
Mình chỉ show tạm thế này thôi

```
function messageAdded(message) {
  return syncMessagesAdded(message);
}

function messageRemoved(message) {
  return syncMessagesRemoved(message);
}

function messageChanged(message) {
  return syncMessagesChanged(message);
}
```
Như thế này thì mình tin đã đủ để các bạn apply phần chat rồi nhỉ. Chúc các bạn đọc vui vẻ