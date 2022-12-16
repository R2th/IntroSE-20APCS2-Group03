Xìn chào các dev-er, đại đa số chúng ta trong quá trình làm dự án đều đã gặp các task liên quan đến export data sang các kiểu excel, csv, pdf rồi đúng không?Hôm này mình sẽ chia sẽ kinh nghiệm của mình về vấn đề render PDF file nhé.

Như mọi người đã biết, từ khi facebook public ReactJS và React Native, nó đã làm thành cuộc cách mạng công nghệ, phá vỡ mọi qui tắc giới hạn trước đó. Giờ là một framwork, 1 thư viện không thể thiếu cho các dev-er. Mình đã có 3 năm làm việc với ReactJS và 1 năm với 
React Native. Quả thật 2 thứ này đã làm thay đổi cuộc đời tôi. Từ 1 dev backend PHP chuyển hẳn sang Front-end ReactJS. 

 Tản mạn thế thôi, giờ chúng ta đi vào vấn đề chính là render ra PDF file. Hiện tại có khá nhiều package support ta có thể render ra PDF file, các bạn có thể hỏi anh bạn thân thiết của chúng ta là anh Google với một vài từ khoá react-pdf, react render pdf file, html to pdf, ...
 anh bạn ta có thể trả về cho chúng ta một đống các kết quả. Trong dự án mình đã chọn anh bạn react-pdf, vì có khá nhiều sao và example cũng rất dễ hiểu. Em nó ở [đây](https://react-pdf.org/fonts) 
 
 Nhận xét qua về cụ này, bản thân mình thấy khá ổn, vì mình đã làm demo vài cụ trước khi add cụ ấy vào dự án.
 
 1. Ưu điểm
       - Component khá là clear, dễ dùng
       - Hỗ trợ styling (cái này quan trọng nha), vì mỗi dự án có 1 styling riêng nên việc custom được styling được xem xét kỹ lưỡng.
       - Hỗ trợ custom font (cái này cũng rất quan trọng), vì mỗi dự án ta lại dùng các font chữ, kiểu chữ khác nhau. Đặc biệt là các dự án của Nhật thì font chữ là 1 vấn đề nhá.
       - Hỗ trợ Preview khá đẹp, render nhanh.
       - Hỗ trợ responsive các bạn ợ, đẹp mê ly.
       - Hỗ trợ debugging (cái này mình chưa thử)
2. Nhược điểm
      - Đại đa số các thư viện đều hỗ trợ render PDF kiểu truyền vào string HTML, styling đính kèm rồi thư viện tự động render ra PDF. Rất tiếc cụ này thì không, muốn làm việc với cụ này thì bắt buộc phải làm việc với các component mặc định.
      - Rất khó style nếu layout phức tạp như table hoặc nhiều div lồng nhau. Đơn vị hỗ trợ pt, un, mm, cm, %, các bạn lưu ý không có px đâu nhé. Mình đã style border để 1px, và kết quả là không có chuyện gì xảy ra, hoá ra nó không support px. Mình đã mất không ít time để tìm hiểu (đắng)

Đó là những kinh nghiệm của mình khi làm với cụ react-pdf. Nhưng trên thự tế thì mình đã nhận trái đắng với cụ này, khi add vào dự án thì dependence version react của thư viện cao hơn trong project của mình nên nhiều tính năng không support các cụ ợ

Kinh nghiệm rút ra là kiểm tra so sánh các depedence của các thư viện mình dùng với Project xem có conflict không, mình làm demo thì rất ngon nhưng khi add vào project làm gần xong mới tá nó không work ( đắng lòng ). Cuối cùng mình phải chuyển thư viện khác 
các cụ ạ, em nó là [jsPDF](https://github.com/MrRio/jsPDF)

Bài sau em sẽ tiếp tục review tiếp cụ này nhé các cụ