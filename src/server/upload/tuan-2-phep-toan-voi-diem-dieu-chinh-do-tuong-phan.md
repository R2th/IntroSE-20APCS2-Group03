# Ôn lại bài tuần 1
Ta sẽ nhắc lại các kiến thức đã học ở bài tuần 1:
* Ảnh số là một hàm với mảng 2 chiều $f(x,y)$
* Có nhiều loại ảnh số: chụp dùng cảm ứng ánh sáng, hoặc các loại sóng, hoặc hàm tùy chỉnh
* Và chúng ta cũng biết cài đặt thư viện: OpenCV, Python, Jupyter Notebook
# Số hoá ảnh
- Định nghĩa: số hóa ảnh là biến đổi một ảnh (hay một hàm) liên tục trong không gian cũng như theo giá trị thành dạng số rời rạc.
- Có 2 bước:
  * Lấy mẫu (sampling): đo giá trị trong các khoảng không gian
  * Lượng tử hóa (quantization): ánh xạ cường độ (hoặc giá trị) đo được thành một số hữu hạn các mức rời rạc  
 Để cho trực quan hơn, ta có thể xem ví dụ dưới đây: 
 ![](https://images.viblo.asia/de03eae3-379e-4951-981a-fe3b75171e26.png)

Hình 2.16 a là hình ảnh một đối tượng ảnh liên tục mà ta muốn chuyển đổi sang dạng ảnh số gọi là ảnh gốc.

Hình 2.16 b thể hiện các giá trị độ lớn của ảnh gốc dọc theo đoạn thẳng AB. 

Để lấy mẫu hàm này, ta sẽ chiếu đoạn AB lên một máy ảnh, với mỗi vạch là chỗ nhận điểm ảnh, (các bạn cứ coi như 1 tâm pin mặt trời nhận năng lượng mặt trời (nếu cường độ cao sẽ là 1 nếu không có sẽ là 0)  như hình 2.16 c. Tập hợp các vị trí rời rạc đó cho ta một hàm đã được lấy mẫu. 

Hình bên phải của 2.16 c là cho biết miền giá trị của cường độ chia thành 8 khoảng rời rạc hay còn gọi là số trạng thái điểm ảnh (trong máy tính được biểu diễn được tính ra là bit biểu diễn nên số trạng thái sẽ là bội của 2, ở trong trường hợp này là 8 - tương ứng là 3 bit).  Lượng tử hóa bằng các thực hiện làm tròn giá trị cường độ vào 1 trong 8 khoảng rời rạc đó. 

Sau khi thực hiện lấy mẫu và lượng tử hóa, ta có kết quả như sau: 
![](https://images.viblo.asia/e0630c6b-b36a-4a87-95db-8d6417d74cd6.png)

Mức độ lượng tử hóa: Số lượng mức xám được yêu cầu trên một bức ảnh số tương ứng với số lượng bits trên mỗi pixel
![](https://images.viblo.asia/7ef8b538-5a44-41b8-977a-54707b9692e9.png)
Ảnh số thường được lượng tử hoá thành 256 mức xám
# Các biến đổi trên ảnh
## Nhận biết bước xám (Tonal level perception)
Nếu mức xám dùng 8 bit nó sẽ là dải liên tục.
![](https://images.viblo.asia/56b87230-8060-4861-91f4-1f27170624fa.PNG)
## Biến đổi gamma
$v_{out} = v_{in}^\gamma$

$v_{in}$ : độ sáng thực tế (actual luminance value)

$v_{out}$: độ sáng cảm nhận (output luminance value)
![](https://images.viblo.asia/083158ec-566d-4949-a4cb-a2cde4149194.PNG)

Ta sẽ có các ví dụ sau: 

Cho dải màu xám 16 mức, với gamma = 1 thì nó sẽ giữ nguyên như sau: 

Link code : [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=WeEsHyyPc2rt&line=5&uniqifier=1)
```python
# Không điều chỉnh gamma (no adjustment) 
draw_quantization_img(
    adjust_gamma(gray_16, gamma=1),
    height=2
)
```
![](https://images.viblo.asia/6b7c3132-3895-4627-8ac5-a8a26914a21b.PNG)

Với gamma  > 1, ta thấy nếu giá trị đầu vào là tối (thấp) thì đẩu ra là tối hơn, ví dụ đầu vào là giá trị 17 thì đầu ra là giá trị 0: 

Link code: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=FlkZ_B2HdGZq&line=4&uniqifier=1)

```python
#with gamma >1, the levels are shifted toward the the darker end of the spectrum
draw_quantization_img(
        adjust_gamma(gray_16, gamma=2.2),
        height=2
)
```

![](https://images.viblo.asia/59e5b844-9bc5-4789-b51a-98ba90002e85.PNG)
Với gamma < 1, các giá trị đầu vào là thấp thì đẩu ra sáng hơn, ví dụ đầu vào là 17 đầu ra là giá trị 74: 

Link code: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=ddtj3mdJdbfV&line=2&uniqifier=1)

```python
#with gamma < 1, lighter
draw_quantization_img(
        adjust_gamma(gray_16, gamma=1/2.2, debug=True),
        height=2
)
```
![](https://images.viblo.asia/311318cb-bcd6-4ec8-94a6-8912531ef1c3.PNG)

## Sử dụng gamma để điều chỉnh độ tương phản

### 1. Độ tương phản thấp (Low exposure)
Ví dụ ảnh vào là một ảnh tối như sau: 
![](https://images.viblo.asia/80c24a5b-efb1-436a-a4ec-f0487c37a09c.jpg)
Thì ta cần chỉnh độ sáng lên thì cần gamma < 1: 
```python
def adjust_image_gamma(image, gamma = 1.0):
  image = np.power(image, gamma)
  max_val = np.max(image.ravel())
  image = image/max_val * 255
  image = image.astype(np.uint8)
  return image
```
Link: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=J7_yZeYes9dq)

Ta thử với 1 số giá trị. Với gamma = 0.45
```python
low_adjusted = adjust_image_gamma(low, 0.45)
plt.imshow(low_adjusted[:,:,::-1])
```
Kết quả sẽ như sau, nhìn trông tốt hơn trước  :grinning:: 
![](https://images.viblo.asia/3157828b-d18b-49fc-b8e1-8bc6539f147e.PNG)

Nếu như gamma quá nhỏ thì sao?

Link code: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=VwkRgDKptrze&line=2&uniqifier=1)

```python
# what if gamma is too low?
low_adjusted = adjust_image_gamma(low, 0.1)
plt.imshow(low_adjusted[:,:,::-1])
```
Kết quả thì nó quá sáng: 
![](https://images.viblo.asia/628760b7-d012-4ebb-a1a3-12b5208abd15.PNG)

Ta thử đo thời gian với hàm **adjust_image_gamma**: 
```python 
%timeit low_adjusted = adjust_image_gamma(low, 0.1)
# kq: 1 loop, best of 3: 2.51 s per loop
```
Nó rất tốn thời gian, có cách nào nhanh hơn không ?. Thật ra là có :). Nó sẽ như sau: 

Link code: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=qFLhyJqww316)
```python
#faster way to compute
#reference: https://www.pyimagesearch.com/2015/10/05/opencv-gamma-correction/
def adjust_image_gamma_lookuptable(image, gamma=1.0):
    # build a lookup table mapping the pixel values [0, 255] to
    # their adjusted gamma values
    table = np.array([((i / 255.0) ** gamma) * 255
        for i in np.arange(0, 256)]).astype("uint8")

    # apply gamma correction using the lookup table
    return cv2.LUT(image, table)
```

Ý tưởng ở đây là dùng bảng chuyển **look-up table (LUT)** sử dụng hàm cv2.LUT().

Thời gian chạy với hàm này sẽ là : 
```python
%timeit adjust_image_gamma_lookuptable(low, 0.45)
#kq: 10 loops, best of 3: 27.6 ms per loop
```
Tốc độ rất nhanh ( 27.6 ms >> 2.51s)
### 2. Độ tương phản cao (Overexposure)
Với trường hợp này thì ta cần giảm độ sáng xuống, hay tăng độ tối. Vì vậy, sử dụng gamma > 1:

Cho ảnh đầu vào :
![](https://images.viblo.asia/11179d4d-df39-4ffd-8c39-82ae16905935.jpg)

Ở đây sử dụng gamma = 4.

```python
adjusted_high = adjust_image_gamma_lookuptable(high, 4)
plt.imshow(adjusted_high[:,:,::-1])
```

Kết quả đẩu ra:

![](https://images.viblo.asia/2444b785-b67d-4cd4-b5ae-44f91688cbd6.PNG)
## Correct using pixel transform

Reference: https://docs.opencv.org/3.4/d3/dc1/tutorial_basic_linear_transform.html

Dùng phép toán nhân và cộng $g(x) = \alpha f(x) + \beta$

$\alpha$ và $\beta$ còn được gọi là tham số gain và bias, hoặc tham số để điều chỉnh contrast (độ tương phản) và brightness (độ sáng)

Với ảnh số: $g(i, j) = \alpha \cdot f(i, j) + \beta$

Đầu vào vẫn là ảnh Overexposure. 
Link code: [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=NElFVVZRzIPe&line=7&uniqifier=1)
 ```python
 def pixel_transform(image, alpha = 1.0, beta = 0):
  '''
  out[pixel] = alpha * image[pixel] + beta
  '''
  output = np.zeros(image.shape, image.dtype)
  h, w, ch = image.shape
  for y in range(h):
    for x in range(w):
      for c in range(ch):
        output[y,x,c] = np.clip(alpha*image[y,x,c] + beta, 0, 255)

  return output
  ```
  
  ```python
  transformed_high = pixel_transform(high, 0.5, 20)
plt.imshow(transformed_high[:,:,::-1])
  ```
  Kết quả đầu ra sẽ là : 
  
  ![](https://images.viblo.asia/23216409-fee5-4f67-8cfd-6fe0e7ff01c3.PNG)

Có một cách dùng thư viện của opencv để nhanh hơn: 
```python
#anyway, a faster 
transformed_high = cv2.convertScaleAbs(high, 20, 0.5)
plt.imshow(transformed_high[:,:,::-1])
```

## Image negatives
Ta có thể chuyển từ ảnh bên trái sang bên phải ( đổi đen thành trắng và trắng thành đen :))

![](https://images.viblo.asia/3e1d0f20-fff8-441e-b8af-983f19cacf62.PNG)

Nghĩ có về khó khăn nhưng thật ra rất đơn giản: 

```python
negation = 255 - xray
plt.imshow(negation, cmap='gray')
```

## Combining images
### 1. Combination of different exposures for high-dynamic range imaging
Ta có 4 ảnh với 4 độ sáng khác nhau: 
![](https://images.viblo.asia/6a04ff8b-a62e-4bad-9c22-3cd2dc5f179e.PNG)

Ta sẽ kết hợp tính giá trị trung bình để tạo ra 1 ảnh mới đẹp hơn.

Link code:  [here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0#scrollTo=YktDztZg91c_)

 ```python
 #Averaging to enhance contrast
hdr = np.mean(stack, axis=0)
hdr = hdr.astype(np.uint8)
plt.rcParams['figure.figsize'] = [8, 8]
plt.imshow(hdr[:,:,::-1])
 ```

Kết quả sẽ ra như sau: 
    ![](https://images.viblo.asia/3ba50693-a8e5-4a01-a83e-e7e2da93441d.PNG)
### 2. Phép trừ ảnh: 
Để tìm ra sự khác biệt giữa 2 ảnh với nhau. Đâu tiên ta sẽ trừ 2 ảnh sau đó tăng độ tương phản để nhìn rõ sự khac nhau hơn:
![](https://images.viblo.asia/e07d9ee0-cbc5-4b3c-ba83-cfb3754a49b5.PNG)

### 3. Video background subtraction
Từ phép trừ ảnh, ta ứng dụng váo video để tìm sự khác biệt khung hình trước và sau:
![](https://images.viblo.asia/5f6b31ab-24cd-45e0-9d47-72a306f30513.PNG)

# Tài liệu
Github: [here](https://github.com/kingkong135/Viblo/tree/master/X%E1%BB%AD%20l%C3%BD%20%E1%BA%A3nh/Tu%E1%BA%A7n%202)

Colab: [Here](https://colab.research.google.com/drive/1Ys0wTiwquJPtDi4c7-bJe4XrSEGmktN0)

Slide: [Here](https://github.com/chupibk/INT3404_1/blob/master/week2/Week%202%20-%20Point%20operations.pdf)

[Intensity Transformation Operations on Images](https://www.geeksforgeeks.org/PYTHON-INTENSITY-TRANSFORMATION-OPERATIONS-ON-IMAGES/?fbclid=IwAR0p-Hs4tsMTtyEamdkj5wLpTlBO-oT9dpzH4V7R7KdKabL-_2hdDwTxbyk)
 
 # Kết luận
 Bài viết đến đây đã dài, nếu có thắc mắc hoặc sai sót gì các bạn có thể comment xuống dưới. Bài Tiếp theo chúng ta tìm hiểu Histogram. Xin chào và hẹn gặp lại các ban.