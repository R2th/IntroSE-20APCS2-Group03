# **1. Đặt vấn đề**
Khi nhắc đến việc trình chiếu, hẳn trong đầu mọi người đang mặc định nghĩ ngay đến Power Point, một trong những phần mềm cực mạnh nằm trong bộ Office của Windows. Tuy nhiên, khi nội dung cần trình bày thuộc lĩnh vực khoa học, chẳng hạn như Toán học, việc soạn thảo slide trình chiếu với một đống công thức, biểu thức, kí hiệu làm bạn phát nản. Lúc này, Latex xuất hiện như một thiên thần cánh trắng cứu dỗi bạn khỏi mớ hỗn độn rối rắm này.

Latex đã được biết đến như một công cụ soạn thảo để tạo ra các cuốn sách, báo cáo, luận văn, ... Tuy nhiên, sử dụng Latex để tạo slide trình chiếu không phải là điều ai cũng nắm bắt được. Chúng ta hãy cùng nhau tìm hiểu về điều này trong phần nội dung tiếp theo.

# **2. Bài trình chiếu đầu tiên**
Đầu tiên, hãy gọi package cần thiết cho việc tạo slide bằng cách đặt ở dòng đầu tiên của file <code>.tex</code> lệnh khai báo sau: 
<pre><code>\documentclass{beamer}</code></pre>
Môi trường cần thiết đã có. Để tạo các slides riêng biệt, sử dụng cặp lệnh 
<pre><code>\begin{frame}

   ...Nội dung slide....
   
/end{frame}</code></pre>
Bây giờ, hãy tiến hành việc tạo trang tiêu đề đầu tiên nào. Thông thường, một trang tiêu đề sẽ có các thông tin: tên tác giả, nội dung trình chiếu và ngày tháng. Giờ thì coppy đoạn code này vào editor của bạn để thử nghiệm : 
<pre><code>\documentclass{beamer}
\title {This is title}
\author {This is author'name}
\date {\today}

\begin {document}
    \begin {frame}
        \titlepage
    \end {frame}
\end {document}
</code></pre>
Liệu kết quả của bạn có giống thế này?
![](https://images.viblo.asia/d7daa230-2ebf-4b76-aae5-498b5121d844.PNG)

Tương tự, giờ làm slide tiếp theo: 
<pre><code>\begin {frame}{This is frame title}
    	Let's vote up this post :D
\end {frame}
</code></pre>
Và kết quả là: 

![](https://images.viblo.asia/7db4b4dd-3004-41ac-9792-4a16791c88d6.PNG)

Cơ bản là thế, giờ vẽ hươu vẽ vượn thế nào chả được:
<pre><code>\begin{frame}{Frame with list}
    \begin{itemize}
          \item First item
          \begin{itemize}
                  \item First of first
                  \item Second of first
          \end{itemize}
          \item Second item
          \item Third item
    \end{itemize}
\end{frame}
</code></pre>
![](https://images.viblo.asia/06ec0220-6000-4d55-a314-ed690c29510a.PNG)

Thêm mấy công thức nào: 
<pre><code>\usepackage{amsmath}    #Đặt dòng này sau câu lệnh beamer để tạo môi trường toán học.

\begin{frame}{Frame with formulas}
    \begin{itemize}
        \item First item\\
            \begin{center}
                $y(t) = \displaystyle \sum_{n = - \infty}^{\infty}\dfrac{1}{2n+1}sin\left[\dfrac{2\pi}{\lambda}(2n+1)t\right]$
            \end{center}
        \item Second item
            \begin{center}
                $D(i, j) = \cos\left[\dfrac{\pi(i-1)(j-1)}{k}\right]$
            \end{center}
    \end{itemize}
\end{frame}
</code></pre>
Kết quả là đây: 

![](https://images.viblo.asia/6e7ae0d1-7d7f-4573-8faf-2d101dd2632d.png)

Theme này nhàm chán quá, tìm cái khác đẹp hơn. Thêm câu lệnh này vào dòng thứ ba trong file mã nguồn <code>.tex</code>nhé
<pre><code>\usetheme{Madrid} </code></pre>
Thấy chuyên nghiệp hẳn lên =)))
![](https://images.viblo.asia/e7f0dcf2-6cae-4cfb-bdeb-b11c0da59aa3.PNG)

# **3. Kết luận**
Trên đây mình đã giới thiệu một số lệnh cơ bản để tạo ra bài trình chiếu sử dụng Latex. Để có các theme bắt mắt hơn, font chữ dễ đọc hơn, định dạng phong phú hơn, ....  thì các bạn có thể tham khảo tại nguồn sau:  https://www.sharelatex.com/learn/Beamer. 
Thanks