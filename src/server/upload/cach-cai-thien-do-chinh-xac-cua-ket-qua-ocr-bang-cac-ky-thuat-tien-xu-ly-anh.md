**Nguồn: Gekko Lab (Medium)**
***
## Một số từ khóa:
***Image preprocessing***: tiền xử lý ảnh \
***OCR***: Optical Character Recognize
***
## Lời dẫn đầu
Trong một số trường hợp real-life, việc cải thiện độ chính xác của kết quả OCR bằng cách đặt tiêu chuẩn high-quality cho ảnh đầu vào là khá khó khăn. Do đó, chúng ta có thể sử dụng bổ sung một số kỹ thuật tiền xử lý ảnh để có thể nâng cao chất lượng của ảnh đầu vào và từ đó, kết quả của OCR có thể được cải thiện. Và đây là bài dịch - bài viết đầu tiên của em, nếu có một vấn đề hoặc một chỗ nào đó bị sai, mọi người có thể gửi nhận xét và góp ý dưới phần bình luận của bài viết ạ. Em cảm ơn nhiều ạ.
***
## Các kỹ thuật tiền xử lý ảnh
### 1. Scaling image size
Như mọi người cũng biết, xác định độ phân giải của ảnh là một trong những nhân tố quan trọng để nâng cao độ chính xác của kết quả OCR. Do đó, trước tiên trong tiền xử lý ảnh thì cần để tỷ lệ ảnh đầu vào ở mức thấp nhất là 300 DPI (dots-per-in).

![Nguồn: https://insacmau.com/do-phan-giai-dpi-la-gi/](https://insacmau.com/wp-content/uploads/2021/05/do-phan-giai-dpi-la-gi-2.jpg) \
Nguồn: https://insacmau.com/do-phan-giai-dpi-la-gi/

### 2. Image geometric transformation
Khi ảnh gốc là ảnh được chụp hoặc được scanner từ camera, nó thường bị tilted - nghiêng và không phải các góc của đối tượng trên ảnh không phải hình chữ nhật (*ví dụ ảnh bên dưới*). 
![apt](https://baoxinviec.com/wp-content/uploads/2019/12/su-dung-bang-gia-di-lam-lieu-co-don-gian-1-600x370.jpg) \
Nguồn: https://baoxinviec.com/su-dung-bang-gia-di-lam-lieu-co-don-gian/ \

Ví dụ trong trường hợp này, việc segmentation giữa những dòng và ký tự thường bị lộn xộn và nó sẽ làm giảm kết quả trích xuất của OCR. Và một trong những kỹ thuật có thể giải quyết được vấn đề trên đó là chuyển đổi hình thái học - geometric transformation issues, nhắc đến thuật ngữ này, chúng ta có 3 loại thuật toán có liên quan: 
* Page rotation: \
Hầu hết tất cả các kỹ thuật OCR đều được built-in function (hàm xây dựng sẵn) để phân loại những dòng *text orientation* (từ này mình chưa biết dịch ra tiếng Việt sao cho dễ hiểu nhất, mọi người thông cảm nhé) trên ảnh. Một trang được xoay để được phân loại, phép toán xoay hướng sẽ tự động xoay một cách chính xác trước khi tiến hành nhận dạng text.
* De-skewing: \
Skewness là một vấn đề phổ biến đối với những ảnh được scanner. Một kỹ thuật chung có thể sử dụng để phân loại các góc trên ảnh đó là thực hiện tính toán trên ma trận. Hình ảnh dưới đây sẽ minh họa dễ hiểu cho kết quả của các dòng trên ảnh sau khi qua quá trình De-skewing.
![apt](https://miro.medium.com/max/828/0*zDRuc64O3vQv51qP)
Nguồn: https://medium.com/@Gekko_lab/make-your-ocr-results-more-accurate-part-ii-preprocessing-3d212ae16191
* Perspective transformation
Trong thực tế, nếu tài liệu được scanner không được để vị trí song song với camera thì ảnh đó sẽ được thực hiện kỹ thuật perspective distortion (biến đổi phối cảnh). Theo kinh nghiệm thực tế của tác giả bài viết, việc biến đổi để đối tượng trong ảnh được di chuyển về sao cho parallel là rất khó, do đó tại đây có thể xét tính tương đối để tiến hành các bước tiền xử lý và các quy trình khác.

![apt](https://www.researchgate.net/profile/Daniel-Keysers-2/publication/227943304/figure/fig4/AS:302174090350596@1449055325818/Captured-high-resolution-image-of-the-desktop-including-a-document.png) \
Nguồn: https://www.researchgate.net/figure/Captured-high-resolution-image-of-the-desktop-including-a-document_fig4_227943304

*  Line straightening
Nếu như một tài liệu được scanner là một trang của một sách thì những dòng text có xuất hiện trong ảnh tài liệu được scanner sẽ có curvy. Curvy text lines phải giảm độ chính xác của line segmentation và text alignment, nên kỹ thuật này là một cách để cần thết để nâng cao OCR repo.

* Image binarization
Nhị phân hóa ảnh có nghĩa là chuyển đổi ảnh màu ( thông thường là RGB) sang màu xám (gồm hai màu trắng - đen). Nó tăng độ tương phản giữa background và text. Cũng như việc tăng độ chính xác OCR, nhị phân hóa ảnh có thể giảm kích thước của ảnh để cải thiện tốc độ xử lý của kỹ thuật OCR.
![apt](https://miro.medium.com/max/828/0*U0KWSDre_sDm2RMp) \
Nguồn: https://medium.com/@Gekko_lab/make-your-ocr-results-more-accurate-part-ii-preprocessing-3d212ae16191
* Noise removal \
Hầu hết các ảnh được chụp thường có chất lượng ảnh ngẫu nhiên, nguyên nhân là do thiết bị hoặc nguồn chụp không cố định. Các kỹ thuật OCR có thể recognize texts từ ảnh đầu vào với độ chính xác cao thậm chí không cần qua giai đoạn tiền xử lý ảnh. Tuy nhiên, việc sử dụng một số kỹ thuật làm mượt ảnh cơ bản để loại bỏ các điểm ảnh bị nhiễu và từ đó ảnh có thể nâng cao hơn độ chính xác của OCR.
![apt](https://miro.medium.com/max/1100/0*BJwgmkmzK7xwdYQA) \
Nguồn: https://medium.com/@Gekko_lab/make-your-ocr-results-more-accurate-part-ii-preprocessing-3d212ae16191 \
Một số cách có thể làm giảm nhiễu:
  -  Speckle noises
  -  Blurred texts
  - Camera ISO noises 

#### Đây là bài dịch đầu tiên của mình, nếu có vấn đề gì sai sót, mình mong nhận được hồi âm từ mọi người.