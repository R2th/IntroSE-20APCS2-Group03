![](https://images.viblo.asia/0a120e93-9cb5-4528-8f9d-3d710b9acee5.png)

Chúng ta đã tìm hiểu nguyên do và ý tưởng đằng sau **React Sketchapp**. Một package sẽ khiến người làm design cũng như một Frontend bắt đầu suy nghĩ từ gốc rễ Design System thay vì hàng tá những màn hình không có một sự liên kết với nhau ngoại trừ việc copy-paste.

Kì này chúng ta sẽ bắt đầu setup và tìm hiểu thử những API mà **React Sketchapp** cung cấp

## Quick Start and Fast Forward
1. Mở một file Sketch (ver. 43+), không cần quan tâm đến việc đặt tên.
2. Clone **React Sketchapp**, trong các ví dụ có sẵn bạn có thể cd vào bất cứ thư mục nào để và install Node dependencies qua Terminal. Ở đây mình chọn thư mục **styleguide** cho nó tổng quan.

```bash
git clone https://github.com/airbnb/react-sketchapp.git
cd react-sketchapp/examples/styleguide
npm install
```

3. Sau khi install thì chúng ta sẽ được kết quả như dưới đây:

![](https://images.viblo.asia/dda27814-3d1c-4f5f-b91b-a81e058e0364.png)

4. Tiếp đó ta render bằng lệnh:
```bash
npm run render
```
Bạn có thể thấy Sketch file đã được update với những elemement được liệt kê trong của ví dụ Styleguide, tất cả được thực thi bằng React.
Từ đây (đảm bảo `npm run render` được chạy trên Terminal để code luôn được up-to-date) ta có thể render trực tiếp trong Sketch file bằng việc chạy lệnh plugins: Plugins > react-sketchapp: Styleguide hoặc Plugins > Run 'react-sketchapp: Styleguide' Again (re-render bất cứ lúc nào)

![](https://images.viblo.asia/fbdebe0c-9ad0-4fc7-b61f-dee5391acb18.png)

Kết quả như screenshot dưới đây, hãy cùng phân tích output này:
![](https://images.viblo.asia/bb17d4de-7b45-4f35-89c0-320e486bdda2.png)
- React giờ là Single Source of Truth, nghĩa là bạn đang không design bằng Sketch, bạn có thể chỉnh sửa file Sketch này thoải mái, nhưng một khi chạy lại plugin ở trên (bước 4) thì lập tức màn hình lại được tái hiện về trạng thái này luôn. Vậy là từ đây ta design bằng code. Hãy nghĩ xa hơn một Workflow có thể được hình thành

## The Demo Workflow
- Bộ khung được xây dựng bởi **React Sketchapp** chính là branch master (main)
- Nhận được specs mới tạo ra các components, hãy bắt đầu trước với Sketch, copy file này và thiết kế trên đó (việc này giống với tạo ra branch mới từ master). Sau một vài nỗ lực và thương thảo thành công với khách hàng, thiết kế của bạn được thông qua. Đây là lúc bạn phải update chúng bằng code và merge với branch master.
- Một khi master đã được merge, Source of Truth lúc này đã được update. Và quy trình trên lại có thể được lặp lại. Design System lúc nào cũng rất chặt chẽ và việc thực thi từ design sang code hiển nhiên đã được hoàn thành.

## Costs

Tất nhiên một workflow mới mẻ hấp dẫn đi kèm với một cái giá và điểm yếu bạn có thể nhìn thấy được:
- Độ phức tạp cao: Yep! Đã design xong lại code, khái niệm 'Fullsnack designer developer' được hình thành. Nghĩa là bạn làm luôn được 2 việc, rút ngắn một lượng thời gian cực lớn cho dự án. Hãy sẵn sàng cho thử thách này.

- Implement prototype?: Yes, nếu làm design bạn biết rằng việc thực thi prototype rất quan trọng (InVision, Zeplin hay Framer đang làm rất tốt công việc này). Tất nhiên điều này chưa thể thực thi ngay được với **React Sketchapp**, nếu **React Sketchapp** cung cấp API cho việc này thì coi như ta đã có 50% app hoàn chỉnh ngay ở công đoạn lên frame và design... Nhưng ai mà biết những điều có thể sẽ được cộng đồng mang đến với package này.

- Đó không phải cách nhanh nhất: Điều đó đúng với những dự án nhỏ và trung bình. Nhưng đó luôn là cách chặt chẽ nhất! Và hãy nhớ nó không phải cách nhanh nhất trong thời gian ngắn, nhưng sẽ là cách nhanh nhất trên một đoạn đường dài.

## To be continued
Cấu trúc cũng như đặc trưng ngôn ngữ còn nhiều điểm cần nghiên cứu.
Kì sau chúng ta sẽ đi tìm hiểu kĩ hơn một số file core và làm một project thực tế sử dụng chính package này nhé. See ya!

## Reference
[Sketching a Design System with React-SketchApp](https://design-nation.icons8.com/sketching-a-design-system-with-react-sketchapp-43e24993c8f2)