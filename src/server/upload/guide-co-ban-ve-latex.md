> Bài viết này sẽ cung cấp cho người đọc một vài kiến thức cơ bản, các tính năng cực kì  mạnh mẽ của LaTeX.
> 

1. Cài đặt:

Có rất nhiều các editors dành cho LateX, bài hướng dẫn này sẽ dùng MikTeX dành cho hệ điều hành Windows, lí do mình chọn MikTex đơn giản là vì nó hỗ trợ rất tốt.

**Linux**

Nếu bạn dùng Linux, bạn có thể tìm textlive package trong repositories. Sau đó bạn có thể sử dụng bất kì editor nào để soạn thảo và compile file với đuôi .tex bằng câu lệnh *pdflatex*

**Windowns**

Với windown, các bạn có thể cài đặt MikTex theo các bước sau:

Bước 1: vào trang miktek.org

Bước 2: mở mục download 

Bước 3: Download MikTex

![](https://images.viblo.asia/65bf5c90-7386-464a-a906-358894b632af.PNG)

Bước 4: Run MiKTeX Installer

![](https://images.viblo.asia/6aaa80a3-c740-4c84-83d7-94f2d6bba7bc.PNG)


Bước 5: Chọn install missing packages automatically

![](https://images.viblo.asia/7e5efa4f-7b99-431e-8814-a0855ccdd52f.PNG)

Bước 6: Mở TeXworks

Khi hoàn thành cài đặt và mở TexWorks các bạn sẽ được giao diện như bên dưới, Chắc nhiều bạn sẽ thắc mắc mình tải MikTeX mà sao lại mở TexWorks ở đây thì mình sẽ giải thích luôn TexWorks là một editor giúp bạn gõ LaTeX, còn cái MikTex sẽ là một cái gói package giúp cho mình làm việc với LaTex nó bao gồm công cụ soạn thảo và trình compile, ...

![](https://images.viblo.asia/19e3ea84-3853-4596-93b2-c6837ea77ccf.PNG)

Bước 7: Viết đoạn code LaTeX và compile thôi

![](https://images.viblo.asia/adeafe94-7606-46aa-bc1d-d5379a6f9a04.PNG)


Sau khi cài đặt xong thì mình hãy cùng bắt đầu first lesson với LaTeX thôi, trong bài học này mình sẽ nhấn mạnh vào 2 phần chính:

1. Basic Layout
2. Title Pages

**Basic Layout của một file LaTeX**

Tạo một document với LaTeX rất đơn giản, LaTeX sử dụng các câu lệnh điểu khiển (control statements) để định dạng nội dung của bạn. Nếu như bạn để ý thì file của chúng ta có đuôi là .tex nhưng khi xuất kết quả thì lại là file .pdf, lí do là LaTeX đã biên dịch những đoạn code trong file .tex sang file .pdf. Dưới đây là một ví dụ đơn giản tạo document bằng LaTeX:

```LaTex
\documentclass{article}
\begin{document}
  Hello World!
\end{document}
```

Khi bạn biên dịch và chạy đoạn code trên bạn sẽ thấy được đoạn text: *Hello World!* với số trang ở phía cuối của document, số trang này được add từ động khi bạn sử dụng article class.

**Thêm Title page**

```LaTeX
\documentclass{article}

\title{My first document}
\date{2020-02-23}
\author{Phuc Nguyen}

\begin{document}
  	\pagenumbering{gobble}
  	\maketitle
  	\newpage
 	 \pagenumbering{arabic}

 	 Hello World!
\end{document}
```

bạn có thể quan sát thấy rằng *\title, \date and \author* lúc này sẽ không cùng cấp với *document* environment, vì thế những thành phần này sẽ không được show trực tiếp vào trong document. Chúng sẽ nằm trong 1 phần mà chúng ta gọi là phần mở đầu.

* *\maketitle* sẽ tự động tạo titlepage cho chúng ta
* *\newpage* sẽ là sang 1 page mới
* *\pagenumbering{gobble} sẽ xóa số trang ở phía dưới trong phần mở đầu

Hy vọng bài viết này sẽ giúp các bạn tạo được một LaTeX document, trong những bài viết sau mình sẽ cung cấp cho các bạn thêm nhiều tính năng tuyệt với của LaTeX.