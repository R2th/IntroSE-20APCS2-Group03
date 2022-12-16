# Giới thiệu
Hôm nay chúng ta cùng tìm hiểu và ```Event Loop```, một khái niệm cực kỳ quan trọng trong Javascript mà mình nghĩ tất cả những ai muốn tìm hiểu sâu về Javascript đều nên biết.  
Nhưng trước khi tìm hiểu sâu về ```Event Loop```, chúng ta cần phải hiểu những khái niệm liên quan.
# Single thread
Như chúng ta đã biết Javascript là một ngôn ngữ chạy đơn luồng **(Single Thread Programming Language)**, có thể hiểu đơn giản là Javascript chỉ có 1 thread, 1 callstack và thực hiện 1 công việc duy nhất tại 1 thời điểm.
# Call stack
Call stack là một cấu trúc dữ liệu hoạt động theo cơ chế **LIFO (Last In, First Out)**.  
Hãy xem cách thức hoạt động của Call stack qua một ví dụ đơn giản:
```javascript
function bar() {
    console.log('bar');
}

function foo() {
    return bar();
}

foo();
```
Thứ tự hoạt động của Call stack được thể hiện qua hình ảnh sau:  
![](https://images.viblo.asia/b0e59019-7ce4-4686-bbff-f77c15cd0705.png)  
Qua đoạn code trên, ta có thể thấy hàm ```foo()``` được đưa vào Call stack trước sau đó đên hàm ```bar()```, và cuối cùng là hàm ```console.log()```. Sau khi hàm ```console.log()``` được gọi, nó sẽ được lấy ra khỏi Call stack, tiếp theo tới hàm ```bar()```, cuối cùng là hàm ```foo()```.  
# Stack trade
Là đường đi tới hàm mà bạn vừa gọi nó đã thông qua những hàm nào. Giúp chúng ta có thể truy ra lỗi dễ hơn.  
Hình sau đây là một ví dụ cụ thể:  
![](https://images.viblo.asia/724bc98e-3b82-4511-9ae4-70c14ca28f11.png)  
# Stackoverflow
Xảy ra khi các hàm được gọi vượt quá dung lượng lưu trữ của Call stack.   
Như hình:  
![](https://images.viblo.asia/0ba7ca6b-15d1-42a3-8ba1-d8c7a82e9e25.png)  
Có thể dễ dàng nhận ra ```cb()``` là một hàm đệ quy, và nó liên tục được đưa vào Call stack cho đến khi tràn ra khỏi Call stack.
# Blocking
Hiện tượng này thường xảy ra khi một ```function``` hay ```method``` chạy lâu đẫn đến việc cả hệ thống phải tốn thời gian để đợi nó hoàn tất do cơ chế ```single thread``` .  Tới đây chúng ta lại đặt ra một câu hỏi, liệu có cách nào để vẫn thực thi ```function``` hay ```method``` đó nhưng không làm gián đoạn hệ thống không? Câu trả lời là có và cái mình muốn nhắc đến ở đây là ```Asynchronous```.
# Asynchronous
Được hiểu là cơ chế bất đồng bộ trong Javascript. Một trong những hàm hay được sử dụng để code Asynchronous là hàm ```setTimeout()```.  
Cùng xem đoạn code sau:  
```javascript
console.log('Doan code 1');
setTimeout(() => console.log('Asynchronous'), 1000);
console.log('Doan code 2');
```
Và kết quả hiển thị sẽ là:  
![](https://images.viblo.asia/5e332572-a20f-4082-aad4-9ece7bc494a9.png)  
Vậy cơ chế phía sau nó là gì? Chúng ta cùng tìm hiểu khái niệm quan trọng nhất của bài viết là ```Event Loop```.  
# Event Loop
Đầu tiên, hãy cùng thử biểu diễn lại cách hoạt động của đoạn code trên:  
![](https://images.viblo.asia/65fbb4fa-4e12-47a9-bcf8-be5501f23a30.png)  
Trước tiên, hàm ```console.log('Doan code 1')``` được đưa vào Call stack và được chạy. Sau đó đến hàm ```setTimeout``` được đưa vào Call stack và chạy.  
Tuy nhiên khi hàm ```setTimeout``` khởi chạy nó sẽ truyền qua WEB APIs 1 cái timer có thời gian là 1s, đồng thời truyền cho nó 1 cái Callback ```timer(1000) => cb```.  
![](https://images.viblo.asia/4f181906-93cb-4bc2-88f5-3010f0c41916.png)  
Timer sẽ đợi trong thời gian 1s, sau đó sẽ truyền ```cb``` vào ***QUEUE***. Đây là lúc ```Event Loop``` bắt đầu xuất hiện.  
```Event loop``` luôn luôn theo dõi trạng thái của CAll stack và Queue, khi và chỉ chi, trong Call stack trống đồng thời trong Queue đang tồn tại phần tử thì nó sẽ làm nhiệm vụ lấy phần tử trong Queue và đẩy vào Call stack.  
Vậy nếu như với ```setTimeout(cb,0)```, như trong đoạn code dưới đây thì sao?  
```javascript
setTimeout(() => console.log('Doan code 1'), 0);
console.log('Doan code 2');
```
Và đây là kết quả:  
![](https://images.viblo.asia/6310b6df-988b-46cd-9ee1-a257129d8a91.png)
Thật ra, thời gian chúng ta set cho hàm ```setTimeout()``` chỉ mang tính tương đối, hàm callback chỉ được ```Event Loop``` đẩy vào Call stack khi và chỉ khi Call stack đó rỗng. Nếu trong thời gian đó mà Call stack vẫn còn phần tử thì callback bắt buộc phải đợi tất cả tiến trình trong Call stack thực thi xong thì nó mới được thực thi.
# Tổng kết
Qua bài viết, hi vọng mọi người có thể hiểu sơ về ```Event Loop```, cách thức hoạt động của nó và các khái niệm liên quan. 
# Tham khảo
[Ông Dev](https://www.youtube.com/watch?v=64ASqMjj9_o&t=100s)  
[Event Loop trong Node.js](https://viblo.asia/p/event-loop-trong-nodejs-naQZRL1A5vx)