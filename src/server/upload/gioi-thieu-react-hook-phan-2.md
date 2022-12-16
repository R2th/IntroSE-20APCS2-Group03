## Luật của Hook

Hook là những function của javascript, nhưng bạn cần phải tuân thủ hai luật sau khi sử dụng chúng. Bạn có thể cài thêm [plugin có tên là linter](https://www.npmjs.com/package/eslint-plugin-react-hooks) để đảm bảo những luật này được áp dụng vào trong code của bạn.

### Chỉ được gọi Hook ở cấp cao nhất
**Không được gọi Hook trong các vòng lặp, điều kiện, hoặc các hàm nhúng**. Thay vào đó luôn luôn sử dụng Hook ở cấp của nhất của function React. Với việc tuân theo luật này, bạn đảm bảo rằng Hook được gọi theo cùng một thứ tự trong mỗi lần component render. Điều này cho phép React bảo toàn các `state của Hook` giữa những lần `useState` và `useEffect` được gọi.

### Chỉ được gọi Hook từ React function
**Không được gọi Hook từ các hàm thông thương của JavaScript**. Thay vào đó, bạn có thể:
1. Gọi Hook từ React function component.
2. Gọi Hook từ các custom Hook (chi tiết hãy xem ở bên dưới).

Bằng việc làm theo những luật này, bạn đảm bảo rằng tất cả stateful logic trong component sẽ dễ dàng trông thấy ở trong source code.

### Giải thích

Như chúng ta đã biết từ phần trước, chúng ta có thể sử dụng nhiều State và Effect Hook trong một component:
![](https://images.viblo.asia/578a2094-1546-422d-b6c5-8481f5c40331.png)

Vậy thì làm sao React biết được state nào sẽ ứng với `useState` nào khi được gọi ? Câu trả lời là **React dựa vào trình tự Hook được gọi lần đầu tiên**. Ví dụ của chúng ta hoạt động vì trình tự của Hook gọi là giống nhau giữa các lần Render.

![](https://images.viblo.asia/7caee5be-577f-4850-b1f2-fba9bac1a731.png)

Chừng nào thứ tự của Hook được gọi là giống nhau giữa những lần render, React có thể kết nối các local state với các hàm Hook. Nhưng điều gì sẽ xảy ra nếu như ta gọi Hook ở trong điều kiện.

![](https://images.viblo.asia/2f340c9d-1eb9-45aa-bafb-e92951f6b14c.png)

Đoạn điều kiện `name !== ''` là `true` ở trong lần render đầu tiên, vì vậy Hook này chạy bình thường. Tuy nhiên, trong lần render tiếp theo, bạn có thể làm cho điều kiện này thành `false`. Bây giờ, bạn đã bỏ qua hàm Hook này và làm cho trình tự giữa các lần render thay đổi.

![](https://images.viblo.asia/85c02610-ce88-445a-ac4e-95a551106d0f.png)

React sẽ không biết được rằng cái gì cần phải trả về trong lần gọi `useState` thứ hai. React cho rằng hàm Hook thứ hai được gọi trong component này sẽ là `persistForm` effect, nhưng thực tế là nó đã không còn nữa. Từ chỗ này, mỗi hàm Hook được gọi sau nó sẽ bị lệch đi thứ tự và tạo ra lỗi.

**Điều này là lí do tại sao phải goị Hook trong cấp cao nhất của component**, bạn có thể gọi như sau để tránh lỗi :

![](https://images.viblo.asia/23697bb8-a1ce-4e02-88b2-deabfca9439b.png)

**Bạn có thể tránh điều này bằng cách cài linter plugin như đã đề cập ở bên trên**. Nhưng trước tiên bạn nên hiểu về lý do tại sao phải làm như vậy để ngăn ngừa nó. 

## Xây dựng hàm Hook của bạn

Dưới đây là một đoạn code trong một ứng dụng chat dùng để hiện thị message khi một người bạn đang online hay offline:
![](https://images.viblo.asia/82925b9e-d6aa-46e8-8869-3d9eb9aca17d.png)

Bây giờ hãy tưởng tượng rằng trong ứng dụng này có một contact list, và chúng ta cần phải render tên của những người đang online với màu xanh. Chúng ta có thể copy lại đoạn logic này, tuy nhiên đó không phải là cách hay :

![](https://images.viblo.asia/a76ce321-da3c-4ac9-a2fe-d72fa8284800.png)

Thay vào đó, chúng ta có thể chia sẻ logic giữa `FriendStatus` và `FriendListItem` bằng cách tạo ra hàm custom Hook.

**Hàm custom Hook là một hàm javascript sửa dụng tiền tố "use" ở tên hàm và có thể gọi trong hàm Hook khác**. Ví dụ như hàm `useFriendStatus` sau đây chính là một custom Hook.

![](https://images.viblo.asia/846e8f8c-d7df-4fdf-a57b-8909736aab74.png)

Không có gì mới ở trong nó, tất cả là logic chung được trích suất ra từ component ở phía trên. Bạn có thể thêm tham số hoặc trả về một cái gì đó, hoàn toàn phụ thuộc vào bạn. Tuy nhiên bạn phải sử dụng chữ `use` để biết được rằng luật của hook có áp dụng vào đây.

Cách sử dụng hàm custom hook như sau:
![](https://images.viblo.asia/ec964fe0-3b0e-43a1-98aa-d5586c287f75.png)

Việc tạo ra các hàm custom Hook chỉ bị giới hạn bởi trí tưởng tượng của bạn nên hãy sáng tạo nhất có thể nhé.

Ngoài ra các bạn có thể tham khảo thêm nhiều hàm Hook có sẵn nữa ở đây :  https://reactjs.org/docs/hooks-reference.html

Đến đây là kết thúc phần giới thiệu về react hook rồi, cảm ơn các bạn đã đón xem, chúc các bạn thành công.

REF: https://reactjs.org/docs/hooks-intro.html