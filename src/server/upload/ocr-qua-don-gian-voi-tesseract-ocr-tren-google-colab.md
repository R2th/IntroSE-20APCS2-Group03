## Lời dẫn đầu

Hello mọi người, tiếp nối chuỗi sharing nho nhỏ về chủ đề OCR. Hôm nay, mình xin được đóng góp một ít sự tìm hiểu của mình qua việc dịch một bài viết rất hay về vấn đề sử dụng Tessaract-OCR cho Text Recognition với ` trợ thủ`  Google Colab 👉️ [Link bài tại đây](https://pub.towardsai.net/using-tesseract-ocr-for-text-recognition-with-google-colab-1c4513b9d3e0). Và let's go, mình xin bắt đầu bài sharing hôm nay nhé.


## Một số từ khóa
* Text Recognition
* Google Colab
* Tesseract-OCR
* OCR

## Nội dung
### Installation


Trước tiên, anh em cài đặt `pytesseract` . Anh em có thể tìm hiểu thêm về package này trên trang https://pypi.org/project/pytesseract/ . 
>     Pytesseract or Python-tesseract is an OCR tool for python that also serves as
>     a wrapper for the Tesseract-OCR Engine


```python
!pip install pytesseract
```

Nếu anh em sau khi `run` gặp phải lỗi dưới đây:

> TesseractNotFoundError: /usr/bin/tesseract is not installed or it's not in your PATH
 
🤔Lạ nhỉ? Yên tâm, việc cài đặt gặp một chút vấn đề. Lý do là vì trong thực tế, anh em bước đầu cần cài đặt các package khác như [Tesseract-ocr](https://github.com/tesseract-ocr/tesseract) và tập cmd trực tiếp kết nối với file.exe. Anh em chạy câu lệnh dưới để có thể cài đặt package `tesseract-ocr`. 

```python
!sudo apt install tesseract-ocr
```


🆘Anh em nhớ `RESTART RUNTIME` để khởi động lại môi trường vừa thiết lập nhé. 

### Import Libraries
```python
try:
 from PIL import Image
except ImportError:
 import Image
import cv2
import pytesseract
```

### Checking folder cài đặt

Trước khi thực thi khối hàm OCR ảnh, anh em có thể check vị trí lưu cục bộ hiện tại của tesseract:
```python
!which tesseract
```


Kết quả của câu lệnh sẽ cho biết vị trí tesseract:

![apt](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/check_tesseract.png)

```
pytesseract.pytesseract.tesseract_cmd = (
    r'/usr/bin/tesseract'
)
```

### Importing Image


Anh em có thể sử dụng cv2 để import và chỉnh sửa ảnh. Anh em có thể đọc hình ảnh thông qua hàm `imread` của OpenCV. Hệ màu được trả về từ  `cv2` là BGR, do đó anh em lưu ý cần convert sang hệ màu RGB.

```python
img_cv = cv2.imread(r'/content/image.png')
# By default OpenCV stores images in BGR format and since pytesseract assumes RGB format,
# we need to convert from BGR to RGB format/mode:
#d = cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB)
```


Ngoài cách anh em truyền trực tiếp bởi đường dẫn ảnh, anh em hoàn toàn có thể sử dụng đoạn code dưới để có thể upload file ảnh lên `Google Colab`:


```python
from google.colab import files
uploaded = files.upload()
```

### Tham số trong Tesseract
Câu lệnh chính để thực thi OCR trên ảnh:
```python
# Example of adding any additional options
custom_oem_psm_config = r'--oem 3 --psm 6'
pytesseract.image_to_string(image, config=custom_oem_psm_config, lang = 'eng')
```

> You can give three important flags for tesseract to work and these are -l , --oem , and --psm. \
        The -l (lang) flag controls the language of the input text. \
        The --oem argument, or OCR Engine Mode, controls the type of algorithm used by Tesseract.\
        The --psm controls the automatic Page Segmentation Mode used by Tesseract.


👉️ Tham số lang chính là ngôn ngữ đích mà anh em cần lựa chọn, danh sách các ngôn ngữ mà Tesseract có hỗ trợ được thông tin tại [Danh sách ngôn ngữ](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html).  \
👉️Số lượng tham số chúng ta có thể điều chỉnh bao gồm hai tham số trong config, dưới dây là một số chế độ cho tham số `psm` trong Tesseract.
```
#Page segmentation modes:
#  0    Orientation and script detection (OSD) only.
#  1    Automatic page segmentation with OSD.
#  2    Automatic page segmentation, but no OSD, or OCR.
#  3    Fully automatic page segmentation, but no OSD. (Default)
#  4    Assume a single column of text of variable sizes.
#  5    Assume a single uniform block of vertically aligned text.
#  6    Assume a single uniform block of text.
#  7    Treat the image as a single text line.
#  8    Treat the image as a single word.
#  9    Treat the image as a single word in a circle.
# 10    Treat the image as a single character.
# 11    Sparse text. Find as much text as possible in no particular order.
# 12    Sparse text with OSD.
# 13    Raw line. Treat the image as a single text line,
#                        bypassing hacks that are Tesseract-specific.
```


Tham số -oem có thể tham khảo tại bảng dưới đây:


![apt](https://ai-facets.org/wp-content/uploads/2019/01/image-6.png)


Nguồn: https://ai-facets.org/tesseract-ocr-best-practices/

### Thực thi OCR và output
```python
#by using print we avoid a single string containing various /n
lang = 'eng' 
config = r'--oem 3 --psm 6'
extractedInformation = pytesseract.image_to_string(Image.open('Screenshot 2022-11-12 101632.jpg'), lang = lang, config = config)
```

👉️ Kết quả là `23/10/2000` 

Tesseract-OCR hoàn toàn được gắn và chạy thành công trên Google Colab. Quá đơn giản đúng không anh em 😄.

![apt](https://nhannt-fsoft-2022-v1.s3.ap-northeast-1.amazonaws.com/images_viblo/output_tesseract.png)

## Lời cảm ơn
Hy vọng một số thông tin được chia sẻ trong bài dịch sẽ mang lại cho mọi người nhiều điều thú vị và mới mẻ.

## Tài liệu tham khảo
1. https://pub.towardsai.net/using-tesseract-ocr-for-text-recognition-with-google-colab-1c4513b9d3e0
2. https://ai-facets.org/tesseract-ocr-best-practices/
3. https://colab.research.google.com/github/bhadreshpsavani/coursera/blob/master/OCRusingTesseract.ipynb
4. https://github.com/tesseract-ocr/tesseract