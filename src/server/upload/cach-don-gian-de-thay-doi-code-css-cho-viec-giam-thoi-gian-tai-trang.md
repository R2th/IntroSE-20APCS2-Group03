![image.png](https://images.viblo.asia/941a4686-fe15-43c7-9109-7bee624df9a8.png)

Technofunnel đã trình bày thêm một bài viết để giúp hướng dẫn bạn cách giảm thời gian tải trang bằng cách áp dụng một thủ thuật đơn giản trong HTML.
Mọi người đều muốn trang của họ tải nhanh hơn. Điều này cũng giúp cung cấp hiệu suất SEO tốt hơn. Hãy xem thử cách để có thể giảm thời gian tải trang bằng cách thực hiện một vài thay đổi trong CSS.

**Tác động của CSS đến thời gian tải trang**

**CSS là một trong những yếu tố chính** ảnh hưởng đến thời gian tải trang. Bất cứ khi nào một ứng dụng gặp một tệp CSS, nó sẽ tải CSS theo thứ tự ưu tiên. Trên cơ sở CSS, **CSS Object Models (CSSOM)** được tạo ra. Sau khi CSSOM được tạo, nó sẽ kết hợp với DOM tree để tạo ra một “Render Tree”. Render Tree được tạo khi DOM tree được hợp nhất với CSSOM và cung cấp kiểu định dạng chính xác cho tất cả các thành phần trên trang.

Số lượng CSS trong ứng dụng càng lớn thì thời gian tạo CSSOM và hợp nhất nó với DOM để tạo Render Tree càng lớn.

Khi HTML truy xuất một tệp CSS, nó sẽ đợi tệp được tải xuống và CSSOM được tạo. Rồi parser sẽ đợi thao tác này hoàn thành. Do đó, có thể nói là CSS  bị chặn hiển thị lại sau.

**Sử dụng CSS không bị chặn**

Để giải quyết vấn đề này, chỉ cần sử dụng vài mẹo để cải thiện hiệu suất của ứng dụng. Ta mong muốn rằng trình duyệt **không nên đợi CSS được tải xuống và CSSOM được tạo**  trong quá trình tải trang đầu tiên.
Ta có thể trì hoãn việc tạo CSSOM cho các tài nguyên CSS không quan trọng hơn. Hãy tưởng tượng chúng ta có một số CSS sẽ được áp dụng cho một mục nhất định sẽ chỉ hiển thị sau khi tải trang đầu tiên. Vì vậy, chúng ta không cần bắt trang tải phải đợi CSS được tải xuống hết và parse xong.

```
<link rel="stylesheet" href="/path/to/my.css" media="print" onload="this.media='all'">
```

Đoạn mã trên chỉ định rằng **giá trị “media” cho CSS là “print”**, có nghĩa là CSS sẽ không được áp dụng ban đầu và sẽ được áp dụng khi người dùng cố gắng load trang. Cùng với liên kết, ta đã thêm chức năng “onload” cho biết rằng khi trang được tải, hãy **thay đổi loại “media” thành “all”**.

Điều này xảy ra khi trang được tải và do đó, trang không đợi tải CSS này và tạo CSSOM. Điều này làm cho trang tải nhanh hơn.
* Thuộc tính “media =’ print ’” chỉ nên được áp dụng cho những phần tử CSS không có bất kỳ tác động nào trong quá trình tải trang đầu tiên. Các kiểu bắt buộc khi tải trang trên màn hình không thể có “media =’ print ’”.

Hãy thử áp dụng cách này cho trang web của bạn thử và để lại ý kiến nhé.

Nguồn: https://javascript.plainenglish.io/simple-css-hack-to-reduce-page-load-time-366f7aaaa3be