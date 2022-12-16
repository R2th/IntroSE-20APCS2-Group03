Nếu bạn đang dùng React hoặc đang học ReactJS, chắc hẳn bạn đã nghe qua thuật ngữ ``Virtual DOM`` . Vậy ``Virtual DOM`` là gì và tại sao React lại sử dụng nó. Chúng ta hãy cùng tìm hiểu nhé. Let's go!

#### Real DOM
``Real DOM`` hay là DOM thật. Đầu tiên DOM được hiểu là viết tắt của 'Document Object Model'. ``DOM`` sẽ đại diện cho giao diện người dùng trong ứng dụng của bạn. Mỗi khi có sự thay đổi về trạng thái của giao diện người dùng, DOM sẽ cập nhật để thể hiện sự thay đổi đó. Việc thường xuyên thao tác lên DOM sẽ gây giảm hiệu suất, làm ứng dụng của bạn chậm hơn.
#### Điều gì làm giảm hiệu suất của DOM
DOM được biểu diễn dưới dang cấu trúc dữ liệu cây (tree). Do đó các thay đổi và cập nhật đối với DOM diễn ra nhanh chóng. Nhưng sau mỗi lần thay đổi thì phần tử được cập nhật và các phần tử con của nó sẽ hiển thị lại để cập nhật giao diện người dùng. Việc render và hiển thị lại là nguyên nhân khiến cho ứng dụng của bạn chậm đi. Do đó, bạn càng có nhiều thành phần giao diện người dùng, thì các bản cập nhật DOM càng  nhiều, vì chúng sẽ cần được hiển thị lại cho mỗi bản cập nhật DOM
#### Virtual DOM
Đó là lúc khái niệm virtual DOM (DOM ảo) xuất hiện và hoạt động tốt hơn đáng kể so vơi DOM thực. DOM ảo chỉ là một đại diện ảo của DOM. Mỗi khi trạng thái ứng dụng i thay đổi, DOM ảo được cập nhật thay vì DOM thực
> Chà, có thể bạn thắc mắc :  "Có phải DOM ảo cũng đang hoạt động giống như DOM thực, điều này nghe có vẻ như làm việc gấp đôi? Làm thế nào điều này có thể nhanh hơn chỉ cập nhật DOM thực? ”

Câu trả lời là DOM ảo nhanh hơn và hiệu quả hơn nhiều, đây là lý do tại sao.
#### Tại sao Virtual Dom (DOM ảo) lại nhanh hơn?
Khi các phần tử mới được thêm vào giao diện người dùng, một DOM ảo, được biểu thị dưới dạng cây sẽ được tạo. Mỗi phần tử là một nút trên cây này. Nếu trạng thái của bất kỳ phần tử nào trong số này thay đổi. Cây này sau đó được so sánh hoặc "diffing" với cây DOM ảo trước đó.

Khi điều này được thực hiện xong, DOM ảo sẽ tính toán phương pháp tốt nhất có thể để thực hiện những thay đổi này đối với DOM thực. Điều này đảm bảo rằng có các hoạt động tối thiểu trên DOM thực. Do đó, giảm chi phí hiệu suất của việc cập nhật DOM thực.

Hình ảnh bên dưới cho thấy cây DOM ảo và quá trình khác nhau.

![](https://images.viblo.asia/81dbb9e5-3425-4843-9c70-1cc7ac0a5eeb.png)
Các nút màu đỏ đại diện cho các nút đã thay đổi. Các nút này đại diện cho các phần tử giao diện người dùng đã bị thay đổi trạng thái. Sau đó sẽ tính toán sự khác biệt giữa phiên bản trước của cây DOM ảo và cây DOM ảo hiện tại. Toàn bộ cây con chính sau đó được render lại để cung cấp giao diện người dùng. Cây cập nhật này sau đó được cập nhật hàng loạt vào DOM thực

#### Cách React sử dụng Virtual DOM
Bây giờ bạn đã hiểu rõ về Virtual DOM là gì và nó có thể giúp ích như thế nào đối với hiệu suất ứng dụng của bạn, hãy cùng tìm hiểu cách React tận dụng DOM ảo như nào nhé.

Trong React, mỗi phần giao diện người dùng là một thành phần (component) và mỗi thành phần có một trạng thái. React tuân theo mô hình có thể quan sát được và lắng nghe các thay đổi trạng thái. Khi trạng thái của một thành phần thay đổi, React sẽ cập nhật cây DOM ảo. Khi DOM ảo đã được cập nhật, React sau đó sẽ so sánh phiên bản hiện tại của DOM ảo với phiên bản trước của DOM ảo. Quá trình này được gọi là "diffing".

Khi React biết đối tượng DOM ảo nào đã thay đổi, thì React chỉ cập nhật các đối tượng đó trong DOM thực. Điều này làm cho hiệu suất tốt hơn nhiều so với thao tác trực tiếp với DOM thực. Do đó làm cho React nổi bật như một thư viện JavaScript hiệu suất cao.

Trên đây là một số chia sẻ về cách hoạt động của virtual DOM trong React. Cảm ơn mn đã theo dõi

Bài viết tham khảo tại nguồn: [React virtual DOM](https://programmingwithmosh.com/react/react-virtual-dom-explained/)