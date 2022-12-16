Trong bài toán về OCR có rất nhiều bài toán con đằng sau liên quan đến nội dung, chất lượng hình ảnh để đưa vào detec box và recognition cái box đó. Cụ thể như ta gặp phải là watermark, seal công ty nó sẽ làm nhiễu, ảnh hưởng đến nội dung, chất lượng OCR.Tuy nhiên cũng tùy vào mục đích sử dụng của mọi người, phù hợp với bài toán đặt ra nữa. Dưới đây thì mình sẽ sử dụng OpenCv để xử lý vấn đề watermark, seal này, cụ thể là remove seal công ty, watermark được đóng vào tài liệu, hóa đơn,.....

![](https://images.viblo.asia/61bfed42-e339-4b67-8310-82bfba96cb07.jpg)

## Case 1
Ta cùng phân tích đặc điểm của bài toán. 
![](https://images.viblo.asia/f5286273-2c34-41c0-b294-145cdb31792a.png)



Như ta thấy trong hình trên đây có đặc điểm là con dấu và nội dung chữ là hai màu hoàn toàn khác nhau, cụ thể chữ màu đen và con dấu có màu đỏ. Khi ta quan sát bình thường bằng mắt thì như thế nhưng thực thế không hoàn toàn đúng như thế. Như mọi người đã biết một hình ảnh bình thường được tạo nên từ 3 màu RGB( Red, Green, Blue). Mỗi một pixel sẽ bao gồm 3 màu đó. Ví dụ như pixel có giá trị (0, 0, 0) sẽ là màu đen tuyệt đối, (255, 255, 255) sẽ là màu trắng tinh khôi, phải chăng là ta sẽ tìm giá trị pixel màu đỏ rồi xóa đi ?????

![](https://images.viblo.asia/bdd1a4c7-8658-40d5-8e9d-8d9ad4ffcd84.PNG)

Ý tưởng ban đầu là ta sẽ dùng OpenCv để replace các giá trị pixel màu đỏ sang màu trắng (easy :rofl::rofl::rofl:) ta cùng thử xem kết quả như thế nào.
```python
def is_gray(a, b, c):
    r = 60
    if a + b + c < 250:
        return True
    if abs(a - b) > r:
        return False
    if abs(a - c) > r:
        return False
    if abs(b - c) > r:
        return False
    return True


def remove_watermark(image):
    image = image.convert("RGB")
    color_data = image.getdata()

    new_color = []
    for item in color_data:
        if is_gray(item[0], item[1], item[2]):
            new_color.append(item)
        else:
            new_color.append((255, 255, 255))

    image.putdata(new_color)
//    img = np.array(image)
// cv2.imwrite("data_test/result/result.png",img[:, :, ::-1])
    return image
```

![](https://images.viblo.asia/e71e6f61-06b7-4edb-ab03-ee7c6e5cbcd3.png)

Nếu ta dùng cách như trên mà replace không theo range, check từng giá trị trong một pixel thì mặc dù các đã xóa được dấu nhưng có một vấn đề là các chữ khác nó cũng bị mất nét chữ.:sweat:. Nguyên nhân là do mặc dù ta nhìn thấy chỉ có hai màu đỏ và đen nhưng thực tế khi ta zoom hình ảnh với opencv thì ta có thể thấy. Bởi vì các giá trị pixel là tổ hợp của ba màu rgb, nếu xét theo range giá trị như trên thì những giá trị pixel "hơi đen" nó cũng bị ảnh hưởng.

![](https://images.viblo.asia/8e556019-281c-4994-b569-263f92f2c49b.png)

## Case 2
Ta sẽ lấy một ví dụ như hình dưới đây :

![](https://images.viblo.asia/0d754b53-b5bf-4d71-8ca0-2216a60941b7.jpg)

Nhìn qua ta thấy rằng các hình ảnh trên mạng đều sử dụng kểu watermark như thế này. Cách đơn giản nhất là dùng clip trong numpy để xử lý vấn đề này.
```python
img = cv2.imread(path_image)

alpha = 2.596594846224838
beta = -161

new_img = alpha * img + beta
new_img = np.clip(new_img, 0, 255).astype(np.uint8)
cv2.imwrite("remove.png", new_img)
```

Và dưới đây là kết quả :

![](https://images.viblo.asia/fc74ebf6-b7eb-44c9-8745-5f12c0d567ec.png)

Nhìn qua có thể thấy là mặc dù đã remove được watermark, nhưng những chữ xung quanh cũng có sự thay đổi. Ta cũng thử một vài ảnh khác với cùng cách như trên 

![](https://images.viblo.asia/52a292ee-0e9d-44b6-8762-7fe17a98336f.png)

### Bonus 
Đặc biệt là các file định dạng pdf thì cũng thường có watermark như trên, cũng may là python cũng đã có lib convert pdf --> image :
```python 
from pdf2image import convert_from_path

image = convert_from_path(pdf_path)

def processing_image(image):
    // Remove 
```

## Case 3
Cách tiếp theo là ta sử dụng là : tăng độ sáng cảu ảnh --> Xét Range --> Sử dụng cv2.dilate --> Contours --> Remove . 
```python
image = Image.fromarray(image)
image_contrast = ImageEnhance.Contrast(image).enhance(1.5)

img_hsv = cv2.cvtColor(np.array(image_contrast)[:, :, ::-1],
                        cv2.COLOR_BGR2HSV)

red_lower = np.array([110, 50, 50], np.uint8)
red_upper = np.array([200, 255, 255], np.uint8)
red_mask = cv2.inRange(img_hsv, red_lower, red_upper)

kernal = np.ones((5, 5), "uint8")
red_mask = cv2.dilate(red_mask, kernal)

contours, _ = cv2.findContours(red_mask,
                                cv2.RETR_TREE,
                                cv2.CHAIN_APPROX_SIMPLE)
for contour in contours:
    area = cv2.contourArea(contour)
    if(area > 50):
        x, y, w, h = cv2.boundingRect(contour)
      //  cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2) # Draw Box
        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 255, 255), -1) # Repalce
```
Về ý tưởng trong cách này là dùng thêm dilate ( nó thuộc phương pháp biến đổi hình thái học ) ngoài ra còn có Erosion. Mọi người có thể xem thêm để hiểu cách nó hoạt động. Ban đầu thì ta vẫn sử dụng range để lấy được cái Mask của con dấu màu đỏ , sau đó dùng kernal, dilatiion để tăng thêm các vùng xung quanh. 
![](https://images.viblo.asia/52c4a961-9c47-4247-be4b-5917af62dfb0.png)

## Case 4 
Nếu dùng cách contour như bên trên, nếu trường hợp con dấu đè vào chữ thì kết quả là sẽ remove luôn chữ --> như thế không được. Tìm thử trong OpenCv thì có fun cv2.inpaint ( hàm này rất hữu ích ) 
```python 
image = Image.fromarray(image)
image_contrast = ImageEnhance.Contrast(image).enhance(1.5)

img_hsv = cv2.cvtColor(np.array(image_contrast)[:, :, ::-1],
                        cv2.COLOR_BGR2HSV)

red_lower = np.array([110, 50, 50], np.uint8)
red_upper = np.array([200, 255, 255], np.uint8)
red_mask = cv2.inRange(img_hsv, red_lower, red_upper)

kernal = np.ones((5, 5), "uint8")
red_mask = cv2.dilate(red_mask, kernal)

dst = cv2.inpaint(img, red_mask, 0 , cv2.INPAINT_TELEA)

return dst

```

Kết quả 

![](https://images.viblo.asia/821d3773-cf8f-4a3d-887b-eeaec30b4135.png)

Ngoài ra khi dùng inpaint ta cũng có thể xóa bỏ, khôi phục ảnh bị cũ, hỏng. Có hai method được khai báo trong inpaint là `cv2.INPAINT_TELEA` và `cv2.INPAINT_NS`. Thứ ta cần ở đây là image cần chỉnh sửa, quan trọng nhất là Mask image, vị trí mà ta cần chỉnh sửa. Như một số ví dụ dưới đây :
![](https://images.viblo.asia/ffb5baad-bd02-4b3e-b44a-c13cf65423fc.png)

Quan sát hình trên ta thấy là ảnh input bị nhàu nát, bị mất một đoạn nhỏ, ta có thể khôi phục lại một chút khi dùng inpaint.

![](https://images.viblo.asia/4ed81e74-d374-426e-a0cf-f40c7f89a02d.png)

Tùy thuộc vào bài toán mà ta chọn cách giải quyết phù hợp với yêu cầu, các bạn có cách nào khác hay thì hãy chia sẻ với mình và mọi người để sau gặp phải thì ta có cách xử lý, tiết kiệm thời gian hơn. 

## Tham khảo 
1. https://viblo.asia/p/xu-ly-anh-erosion-dilation-opening-closing-4dbZNpWq5YM
2. https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_photo/py_inpainting/py_inpainting.html