Xin chào mọi người, đợt dịch này cuối tuần rảnh rỗi không đi chơi đâu được nên mình học về cách triển khai mô hình deep learning bằng ba công cụ: **torchserve, streamlit và docker**. Và mình có áp dụng những kiến thức mình học được để làm một project nho nhỏ để chia sẻ cho mọi người. Đó là tool **Nhận diện chữ tiếng Việt qua ảnh**.  Các bạn có thể tải toàn bộ mã nguồn [ở đây nhé.](https://github.com/buiquangmanhhp1999/VietnameseRecognitionTool).  

<p align="center">. 
    <img src="https://images.viblo.asia/53a5d8bc-3edb-4f96-bde2-786705e0e0fb.png" >
Image Text Recognition Tool
</p>

Bài viết này mình sẽ giới thiệu qua về tool nho nhỏ này của mình :)
**Có chú ý nho nhỏ là tool này mình không tâp trung quá nhiều về phần mô hình OCR nên có thể không thể tốt cho tất cả các trường hợp.** Các bạn dùng mô hình được huấn luyện trên tập dữ liệu của mình để đạt kết quả như mong muốn nhé. :) 
    
## 1. Serving mô hình OCR bằng torchserve
<p align="center">
    <img src="https://images.viblo.asia/211f337d-6637-4c67-85cb-ad955b782fab.jpg" >
Ảnh minh họa TorchServe
</p>

TorchServe là một công cụ hỗ trợ triển khai các mô hình deep learning được viêt bằng framework torch. Quá trình sẽ gồm nhiều bước trung gian nhưng do không phải chủ đề của bài viết lần này, mình sẽ không giới thiệu chi tiết trong bài viết lần này. Các bạn có thể tham khảo bài viết [TorchServe, công cụ hỗ trợ triển khai mô hình PyTorch](https://viblo.asia/p/torchserve-cong-cu-ho-tro-trien-khai-mo-hinh-pytorch-vyDZOqwO5wj) để biết thêm chi tiết nhé. Mô hình OCR mình đánh giá khá phức tạp so với các mô hình detection, classifcation, mình có thực hiện serving mô hình với TorchServe qua các bước sau:

- Chuyển  mô hình được viết bằng Pytorch sang dạng TorchScipt. Các bạn có thể tìm hiểu trực tiếp tại trang  [INTRODUCTION TO TORCHSCRIPT](https://pytorch.org/tutorials/beginner/Intro_to_TorchScript_tutorial.html)
- Chuẩn bị file **handler.py** . File **handler.py** sẽ đảm nhận việc nhận dữ liệu được truyền vào thông qua các request được gửi đến, thực hiện các công việc: tiền xử lý, dự đoán và trả các kết dự đoán. Các bạn có thể tham khảo file **ocr_handler.py** mà mình đã viết sẵn [ở đây](https://github.com/buiquangmanhhp1999/VietnameseRecognitionTool/blob/develop/serve/handler/ocr_handler.py)
- Lưu mô hình về file có đuôi **.mar** đã được TorchServe quy định.

Mình có cung cấp sẵn hai file: **ocr_model.mar** và **ocr_handler** là hai file cuối cùng có thể giúp bạn hoàn toàn triển khai được công cụ này.

## 2. Streamlit
Streamlit là thư viện hỗ trợ tạo ra web app có giao diện đơn giản mà chất lượng cũng  rất tuyệt vời, hỗ trợ rất nhiều cho dân machine learning hay data science chúng mình. Các bạn có thể tham khảo [Streamlit Docs](https://docs.streamlit.io/en/stable/) để tìm hiểu thêm thông tin nhé. Còn đây là đoạn code của mình để tạp ra giao diện như trên ảnh demo của mình

```python
import streamlit as st
import numpy as np
from PIL import Image
import requests
import base64
import cv2

max_width_str = f"max-width: 1200px;"
st.markdown(
    f"""
    <style>
    .reportview-container .main .block-container{{
        {max_width_str}
    }}
    </style>
    """,
    unsafe_allow_html=True,
)

st.markdown(
    "<h1 style='text-align: center;'>Image Text Recognition Tool</h1>",
    unsafe_allow_html=True,
)
st.markdown(
    "<p style='text-align:center;'>Hanoi, 2021 by Sun Asterisk AI Team</p>",
    unsafe_allow_html=True,
)

st.markdown(
    """
            * Click the button to upload a image file.
            * Wait for running
"""
)

ip_addr = "192.168.1.187"
url = "http://" + ip_addr + ":8085/predictions/ocr_model"
uploaded_file = st.file_uploader("Upload Image", type=[".png", ".jpg", ".jpeg"])
if uploaded_file is not None:
    image = np.asarray(Image.open(uploaded_file))
    img_str = cv2.imencode('.jpg', image)[1].tostring()  # Encode the picture into stream data, put it in the memory cache, and then convert it into string format
    b64_code = base64.b64encode(img_str) # Encode into base64
    response = requests.post(url, files={'body': b64_code})

    st.image(image)
    if response.status_code == 200:
        st.markdown('***Predicted result***: {}'.format(response.text))
```

À có một chú ý nho nhỏ để hai service streamlit và torchserve có thể giao tiếp được với nhau, bạn cần thay giá trị biến **ip_addr** bằng địa chỉ ip máy bạn muốn chạy. Ví dụ địa chỉ ip máy mình là **192.168.1.187**. Bạn có thể kiểm tra bằng cách:

```
ip addr show
```
Tìm địa chỉ bắt đầu bằng **192.168.x.x** và thay thế vào biến **ip_addr**

## 3. Đóng gói bằng docker
Để thuận tiện mang sản phẩm tới bất cứ đâu triển khai mà không bị ảnh hưởng bởi các yếu tố môi trường như thiếu package, lỗi version, blabla thì mình đã quyết định đóng gói docker cho sản phẩm của mình. 

Ở đây mình chia thàng 2 service là **streamlit** và **torchserve**.
```
version: '3.5'
services:
  torchserve:
    image: torchserve
    build: .
    ports:
      - "8085:8085" #Inference address
      - "8086:8086" #Management address
      - "8087:8087" #Metrics address
    command: torchserve --start --ncs --model-store ./serve/model_store --models ./serve/model_store/ocr_model.mar --foreground --ts-config ./serve/config.properties
  streamlit:
    image: streamlit
    ports: 
      - "8501:8501"
    command: streamlit run app.py
```
Để bật ứng dụng trên máy các bạn, các bạn thực hiện hiện lần lượt các câu lệnh sau nhé:

**Build image streamlit cho service streamlit:**
```
docker build -t streamlit -f ./DockerfileStreamlit .
```
**Build image torchserve và start server, giao diện**
```
docker-compose up
```
Lúc này bạn có thể ra pha một tách cafe và nhâm nhi trong lúc chờ đợi thành quả thôi :) 

## 4. Lời kết
Cảm ơn các bạn đã theo dõi bài viết của mình. Hy vọng bài viết của mình sẽ đem lại cho các bạn nhiều cái nhìn về các công cụ engineering trong Machine learning bên cạnh các kiến thức về các mô hình, các thuật toán khô khan. Chúc các bác một ngày làm việc vui vẻ nhé :grinning:


**Tài liệu tham khảo**:

- [Streamlit Docs](https://docs.streamlit.io/en/stable/)
- [TorchServe Github](https://github.com/pytorch/serve)
- [Chuỗi bài về Docker](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)