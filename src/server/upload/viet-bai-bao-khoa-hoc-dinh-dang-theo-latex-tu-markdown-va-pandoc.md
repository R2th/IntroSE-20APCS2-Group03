Bài báo khoa học thường được sử dụng các công cụ soạn thảo như Word (của Microsoft), Google Doc (từ Google)... Nhưng đối với các bài báo cần nhiều biểu đồ và công thức toán học thì LaTex là một giải pháp tốt để viết chúng một cách đơn giản. Bên cạnh đó LaTex cũng được thiết kế để bạn có thể liên kết các phần tử trong bài báo của bạn với nhau nhằm tạo nên một mạng liên kết thông tin hoàn hảo. Bài này tôi xin giới thiệu cách tạo nên một bài báo đơn giản bằng LaTex nhưng không sử dụng LaTex mà sử dụng Markdown và Pandoc để chuyển đổi thành LaTex.
# Cài đặt môi trường

Tôi soạn bài này với vai trò là một Lập trình viên cần viết các bài báo khoa học về công nghệ thông tin nên công cụ chúng tôi sử dụng là những công cụ thân thuộc với Lập trình viên hơn là các ngành khác. 

Để cài được môi trường soạn thảo tôi cần có *Visual Studio Code (VS)*, *MiKTex*, *Pandoc* (tôi sẽ gửi kèm đường dẫn bên dưới để bạn có thể tải về để cài đặt). Ngoài ra để thận tiện cho việc soạn thảo, tôi sẽ cài thêm các *plugin* liên quan đến Markdown vào VS.

Những công cụ trên chúng độc lập nhau. Nên chúng ta chưa thể sử dụng được để tạo ra một tập tin PDF (kết quả của bài báo cáo khoa học) mà ta mong muốn. Do đó tôi xin đề cập đến việc kết nối chúng với nhau.

## Markdown Preview Enhanced

Markdown là một ngôn ngữ soạn thảo như là một văn bản bình thường. Nhưng có thêm các ký tự giúp ta có thể định dạng bài viết của mình dễ dàng hơn. Nếu bạn muốn in đậm chỉ cần bỏ dòng chữ muốn in đậm trong `**Tôi cần in đậm ở đây**` thì văn bản sẽ được in đậm. Để biết được thêm các ký tự sử dụng để định dạng trong Markdown bạn có thể tham khảo [https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/)

Nếu những gì tôi viết ra mà tôi thấy được nó như thế nào ngay lập tức thì tôi sẽ tự tin hơn và tránh sai sót nhiều hơn. **Markdown Preview Enhanced** là một *plugin* được viết dành cho VS làm điều đó.

![](https://images.viblo.asia/d5e7012b-f199-4f0b-ae43-e191ce900150.png)

*Vì tôi viết bài này trên vai trò là Lập trình viên máy tính nên tôi sẽ không đề cập các bước làm thế nào để cài đặc plugin trong VS. Bạn có thể tìm nó trên Google hay Youtube với từ khóa `Cài đặt extenstion cho Virtual Studio Code`.*

## PlantUML

Một *plugin* tiếp theo mà tôi thường hay sử dụng khi muốn mô tả tài liệu ứng dụng phần mềm của mình là **PlantUML**. Đây là ngôn ngữ giúp bạn vẽ nên các hình ảnh UML bằng mã. Bạn có thể tham khảo các mã để vẽ nên hình ảnh UML từ PlantUML tại đây [http://plantuml.com/](http://plantuml.com/).

# Tạo bài viết đơn giản

Tôi sẽ tạo một bài báo đơn giản từ tập tin `bai-bao-don-gian.md`. `.md` là phần mở rộng của Markdow. Trước tiên tôi cần khai báo các thông tin để khi xuất ra PDF phần mềm sẽ hiểu cần phải xuất ra như thế nào (định dạng như thế nào).

## Khai báo thông tin và định dạng bài báo

```
title: Bài báo đơn giản
output: bai-bao-don-gian
author: Nguyễn Văn Tiển
date: 2019-10-12
```

Đoạn mã trên sẽ cho ta biết tựa đề bài báo cùng thông tin kèm theo như ngày tạo, tác giả và tên tập tin sẽ được xuất ra. Nếu bài báo bạn xuất ra có độ lớn trên giấy A4 được tách thành 2 cột và ngôn ngữ Tiếng việt thì bạn cần thêm đoạn mã bên dưới. *Phần này được bắt đầu và kết thúc bằng `---`*.

```
...
papersize: a4
lang: vi-VN
geometry:
    - top=30mm
    - left=20mm
    - right=20mm
    - heightrounded
documentclass: article
classoption:
    - twocolumn
```

Trên chỉ là những khai báo cơ bản của một bài báo. Nhưng nếu bạn cần phức tạp hơn để tạo một bài báo tốt hơn hãy xem ở đây [https://pandoc.org/MANUAL.html#pandocs-markdown](https://pandoc.org/MANUAL.html#pandocs-markdown).

## Viết nội dung bài báo

Trong phần này tôi không đề cập đến yêu cầu nội dung của một bài báo khoa học mà chỉ để cập đến làm sao để viết và trình bày một bài báo đẹp.

## Tiêu đề con

Bài báo được bắt đầy bằng **Tóm tắt**, **Nghiên cứu liên quan**, ..., **Kết luận**. Các từ này được in đậm để thấy rõ nội dung của nó. Trong Markdown bạn sẽ sử dụng `#` để làm điều đó.

```markdown
# Tóm tắt
...
# Kết luận
...
```

Hãy xem thêm cách định dạng trong đường dẫn này [https://www.markdownguide.org/basic-syntax/](https://www.markdownguide.org/basic-syntax/).

## Biểu thức toán học

Nếu viết một báo cáo khoa học gần như bạn không thể tránh khỏi các biểu thức toán học nhằm chứng minh cơ sở khoa học. LaTex làm tốt điều này nhưng với Markdown nó cũng không kém. Nếu tôi muốn biểu diễn công thức.

$$E = m c^2$$

thì tôi chỉ phải viết `$$E = m c^2$$` để LaTex có thể hiển thị được. Công thức sẽ được nằm trong `$$`. Tương tự ta sẽ tìm hiểu thêm cách viết các công thức từ [https://www.overleaf.com/learn/latex/Mathematical_expressions](https://www.overleaf.com/learn/latex/Mathematical_expressions) để biết thêm các ký tự cần thiết trong toán học. Dưới đây là một biểu thức tương đối phức tạp mà Markdown có thể thể hiện thông qua các thư viện tích hợp trong nó như `KaTex` hay `MathJX`. Nhưng với LaTex thì Pandoc sẽ sử dụng `xelatex` để thể hiện.

$$ \sum_{i=1}^{\infty} \frac{1}{n^s} 
= \prod_p \frac{1}{1 - p^{-s}} $$

## Đồ thị

Hiện tại phần này tôi chưa thấy được sự hỗ trợ nhiều từ Markdown. Do đó chúng ta phải tạm thời liên kết với các hình ảnh thông qua

```
![Tên hình ảnh](đường dẫn đến nơi chứa hình ảnh)
```

*Tôi thường sử dụng R để vẽ các hình ảnh mang tính chất thống kê và các biểu đồ sau đó mới kết nối hình ảnh đến bài viết.*

## Ghi chú

Nếu một từ hay cụm từ nào đó bạn cần ghi chú thêm để rõ nghĩa thì bạn có thể sử dụng bạn có thể sử dụng ví dụ sau để áp dụng trong bài báo của mình. 

```
Here is a footnote reference,
[^1] and another.[^longnote]

[^1]: Here is the footnote.
[^longnote]: Here's one with multiple blocks.
```

Ghi chú sẽ được ghi ở cuối mỗi trang giúp người đọc có thể tra cứu thêm nếu vẫn chưa rõ nghĩa của từ, cùng từ đã đề cập.

## Tài liệu tham khảo

Đây cũng là một yêu cầu bắt buộc của các bài báo. Nó là nguồn tài liệu góp phần xác thực bài báo của bạn có đạt được độ tin cậy hay không? Hãy cố gắng dẫn chứng những tài liệu một cách cụ thể. 

Có nhiều cách ghi tài liệu tham khảo khác nhau phụ thuộc vào các tạp chí khoa học. Do đó tôi không thể liệt kê hết các định dạng ấy. Dưới đây là đoạn mã ví dụ về *tài liệu tham khảo* của một bài báo.

```
---
references:
- type: article-journal
  id: WatsonCrick1953
  author:
  - family: Watson
    given: J. D.
  - family: Crick
    given: F. H. C.
  issued:
    date-parts:
    - - 1953
      - 4
      - 25
  title: 'Molecular structure of nucleic acids: a structure for deoxyribose
    nucleic acid'
  title-short: Molecular structure of nucleic acids
  container-title: Nature
  volume: 171
  issue: 4356
  page: 737-738
  DOI: 10.1038/171737a0
  URL: http://www.nature.com/nature/journal/v171/n4356/abs/171737a0.html
  language: en-GB
...
```

![](https://images.viblo.asia/85afdad3-3d3a-4884-8ecb-764d15b2564f.PNG)

# Tóm lại

Bài viết này hỗ trợ bạn kết nối 3 ứng dụng *VS*, *MiKTex*, *Pandoc* cùng với các *plugin* cho *VS* để tạo nên một bài báo để đăng trên các tạp chí khoa học. Bài báo này không giúp bạn có thể tạo một bài báo khoa học phức tạp với nhiều định dạng đặc biệt. Nếu bài báo của bạn cần hơn thế bạn cần phải tham khảo thêm các tài liệu mà trong bài viết tôi có các đường liên kết đến.

# Tài liệu tham khảo

1. [https://miktex.org/download](https://miktex.org/download)
2. [https://code.visualstudio.com](https://code.visualstudio.com/?wt.mc_id=DX_841432)
3. [https://pandoc.org](https://pandoc.org/installing.html)
4. [Markdown Preview Enhance](https://shd101wyy.github.io/markdown-preview-enhanced/#/)
5. [PlantUML http://plantuml.com/](http://plantuml.com/)
6. [Plugin Plant UML in Vitual Studio Code https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)