Trong React, chúng ta có thể sử dụng Higher-Order Components và Render Props để viết một số logic và sử dụng lại cho nhiều component khác nhau.

Với React v16.8, chúng ta lại có thêm một lựa chọn tối ưu hơn là sử dụng Hooks. Khi Hooks ra đời, nó đã làm thay đổi toàn bộ cách viết component trong React, không còn Class Component và lifecycle trong React nữa.

Thật lý tưởng nếu bạn viết mới tất cả component của bạn với Hooks? Nhưng biết đâu đời là mơ! Bạn vẫn phải bảo trì Class Component.

Vì vậy, trong bài này chúng ta hãy cùng so sánh nếu để cài đặt cùng một logic thì 3 thằng sẽ trông như thế nào? Từ đó bạn sẽ hiểu hơn về Hooks, cũng như HOCs và Render Props. Hiểu được tại sao lại có Hooks? Tại sao phải dùng HOCs, Render Props.

# Higher-Order Component

Chúng ta sẽ cùng tham khảo lại ví dụ kinh điển trên ReactJS và Render Props.

Yêu cầu bài toán là lấy được toạ độ của con chuột trên màn hình và truyền chúng vào cho những component cần sử dụng.

Với HOCs, chúng ta có thể viết lại logic đó như sau:

![](https://images.viblo.asia/e1557029-4bbc-462a-ac05-06bf52da04da.png)

Ưu điểm của cách này là có thể sử dụng cho cả functional component và class component. Nhược điểm với HOCs là nó làm Component Tree có nhiều nút dư thừa hơn (hay còn gọi là nested component hell)

# Render Props

Với cũng yêu cầu bài toán như trên ta có thể viết với render props:

![](https://images.viblo.asia/a2be0508-2bf9-419b-af96-9a24ae1f73ec.png)

Ưu điểm: có thể sử dụng với mọi component type. Nhược điểm, có quá nhiều nested render props có thể rất khó đọc.

# Hooks

Với hooks, chúng ta đơn giản có thể cài đặt một handler như sau:

![](https://images.viblo.asia/ca9ba0cd-f7ed-48b5-ae97-bf7547151e16.png)

Chúng ta sẽ gọi hook này trong một component và khai báo một onMouseMove={handler} handler được trả về từ hooks.

**Ưu điểm:**
 - Với hooks khá ngắn gọn và dễ hiểu hơn HOCs và Render Props
 - Dễ dàng kéo business logic ra ngoài một component và sử dụng lại cho nhiều component khác

**Nhược điểm**
 - Phải tuân thủ “Rules of Hooks“
 - Chỉ sử dụng được cho functional component

# Tài liệu tham khảo:

https://medium.com/@mjackson/use-a-render-prop-50de598f11ce

https://blog.isquaredsoftware.com/presentations/2019-09-hooks-hocs-tradeoffs/#/

https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775