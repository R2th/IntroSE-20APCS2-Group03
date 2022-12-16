<div align="justify">
    
Chào các bạn, như các bạn đã biết việc chuẩn bị dữ liệu là một bước rất quan trọng, nó quyết định rất nhiều đến chất lượng của các mô hình ML và DL trong các bài toán supervised learning, chất lượng của dữ liệu huấn luyện sẽ ảnh hưởng tới chất lượng của mô hình. Việc data labelling hay còn gọi là gán nhãn cho dữ liệu là một việc quan trọng trong quá trình chuẩn bị data. 

Trong bài viết này tôi sẽ cùng các bạn đi tìm hiểu về nhãn của dữ liệu cũng như các định dạng annotations của dữ liệu. 
    
</div>



# 1. Các loại nhãn của dữ liệu
Dưới đây tôi sẽ liệt kê ra một số loại nhãn dữ liệu thường gặp nhất.

### Bounding boxes
Đây có lẽ là kiểu nhãn dữ liệu mà các bạn thường gặp nhất. Bounding boxes thực chất là một hình chữ nhật bao quanh một đối tượng trong ảnh. Bounding boxes được sử dụng cho các bài toán object detection.

Một bounding box được định nghĩa bởi 4 thông tin về tọa độ: tọa độ điểm trên cùng bên trái (top-left), chiều cao (height) và chiều rộng (width). Các bạn có thể nhìn hình dưới đây để có thể hình dung dễ hơn: 
![](https://images.viblo.asia/dc3b73ae-c106-448a-8af1-2fdfa061c589.jpg)


-----



### Polygonal Segmentation
Không phải lúc nào ta cũng khoanh vùng đối tượng bằng một hình chữ nhật bao quanh đối tượng đó, lý do là có nhiều thông tin trong vùng hình chữ nhật đó không phải là đối tượng mà chúng ta quan tâm. Do đó với trường hợp chúng ta muốn khoanh vùng sát với đối tượng nhất thì ta sẽ dùng các đa giác (polygon) để biểu diễn vùng chứa đối tượng. Ví dụ như ở hình dưới đây:

![](https://i.imgur.com/PG0yn9c.gif)
> Ảnh được lấy từ [đây](https://humansintheloop.org/types-of-image-annotation/)


-----


### Semantic Segmentation
Một định dạng gán nhãn cho bài toán Segmentation. Với cách gán nhãn kiểu này, mỗi pixel trong ảnh sẽ được gán về lớp tương ứng của nó. Ví dụ như hình dưới đây:

![](https://i.imgur.com/41qbIY7.gif)
> Ảnh được lấy từ [đây](https://humansintheloop.org/types-of-image-annotation/)


-----


### 3D cuboids
Gần giống với bounding box, 3D cuboids sẽ đóng khung đối tượng vào một "hình hộp". Với thông tin 3D cuboids ta có thể hình dung được vị trí trong không gian 3 chiều của vật thể trong ảnh.

Ứng dụng của loại nhãn này sẽ cho các bài toán liên quan đến xe tự lái, khi mà xe sẽ phải tính toán ra vị trí của các vật thể xung quanh xe nhằm tránh va trạm
![](https://images.viblo.asia/f807159d-3f45-4227-8d55-58b13d52473e.png)
> Ảnh được lấy từ [đây](https://www.google.com/url?sa=i&url=https%3A%2F%2Fplayment.io%2F3d-cuboids&psig=AOvVaw2xbmO_ZBMbJkAePMSkfe9K&ust=1620460736352000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKjFxuuMt_ACFQAAAAAdAAAAABAE)


-----


 ### Key-Point and Landmark
 Với các nhãn loại này, với mỗi object trong ảnh sẽ được đánh dấu các điểm quan trọng nhất của object hay còn được gọi là key point của object đó. Ví dụ như ở hình dưới, đối tượng quan tâm đến ở đây là người và các key point được đánh dấu trên người gồm 15 điểm ở các vị trí:  Head, Neck, Right Shoulder , Right Elbow , Right Wrist , Left Shoulder, Left Elbow, Left Wrist, Right Hip, Right Knee, Right Ankle, Left Hip, Left Knee,
Left Ankle, Chest. 

Ứng dụng của loại nhãn này sẽ dành cho các bài toán dạng pose estimation hoặc là face landmark detection...
![](https://www.sama.com/hubfs/dancer_efficiency.png)
> Ảnh được lấy từ [đây](https://www.sama.com/key-points)

-----

Ngoài các loại nhãn như tôi đề cập ở trên thì còn có rất nhiều các loại khác như: Circle, Polyline, Ellipse.. Các bạn có thể tìm hiểu thêm.
# 2. Các định dạng Annotation thường gặp
## 2.1. Coco Annotations
  COCO (Common Objects in Context) là một tập datasets phục vụ cho các bài toán Object Detection, Segmentation, Image Captioning. Tập dữ liệu tổng cộng có khoảng 1.5 triệu objects thuộc về 80 class khác nhau.
  
  COCO có 5 loại Annotation được sử dụng cho các bài toán:
*   Object detection.
*   Keypoint detection.
*   Stuff segmentation.
*   Panoptic segmentation.
*   Image captioning.
  
  COCO lưu trữ các dữ liệu annotatión trong 1 file có định dạng JSON. Với 1 file dữ liệu JSON của COCO sẽ gồm những block chính như sau:
*   **info**: Trường dữ liệu này chứa thông tin về tập dataset.
*   **licenses**: Trường dữ liệu này chứa thông tin về giấy phép của tập dataset
*   **categories**: Trường dữ liệu này chứa một danh sách tên các đối tượng
*   **images**: Trường dữ liệu này lưu trữ thông tin của các hình ảnh như đường dẫn đến ảnh, tên hình ảnh, id của ảnh ( mỗi ảnh có 1 id duy nhất).
*   **annotations**: Trường dữ liệu này chứa thông tin về các bouding boxes của các đối tượng trong 1 ảnh đối với bài toán object detection, thông tin về segmentation cho bài toán segment hoặc thông tin về caption cho bài toán image captioning.


<div align="center">
    
 ```json
{
"info": info,
"licenses":[lisenses],
"categories":[category],
"images":[image],
"annotations":[annotation]
}
```
   
</div>

Sau đây tôi sẽ đi vào chi tiết từng trường dữ liệu trong file Json của COCO.

#### info
Mô tả thông tin của tập datasets, Dưới đây là một ví dụ:
``` json
"info": {
    "description": "COCO 2017 Dataset",
    "url": "http://cocodataset.org",
    "version": "1.0",
    "year": 2017,
    "contributor": "COCO Consortium",
    "date_created": "2017/09/01"
}
```
#### licenses
Phần này bao gồm các thông tin liên quan đến giấy phép sử dụng của tập datasets. Thông thường thì mọi người download và sử dụng thường thì sẽ không quan tâm nhiều lắm đến mục này. Tuy nhiên nếu sử dụng cho các sản phẩm thương mại thì nên chú ý mục này khi sử dụng tập datasets.

```json
"licenses": [
    {
        "url": "http://creativecommons.org/licenses/by-nc-sa/2.0/",
        "id": 1,
        "name": "Attribution-NonCommercial-ShareAlike License"
    },
    {
        "url": "http://creativecommons.org/licenses/by-nc/2.0/",
        "id": 2,
        "name": "Attribution-NonCommercial License"
    },
    ...
]
```
#### categories
 Trường dữ liệu chứa danh sách tên và id  của các đối tượng xuất hiện trong tập dữ  liệu. Mỗi đối tượng gồm các thông tin là id, tên và có thể có thêm tên của đối tượng cha của nó:
 
 
```json
"categories":
[
{"id": 1, "name": "cat" , "supercategory": "animal"},
{"id": 2, "name": "dog" , "supercategory": "animal"},
{"id": 3, "name": "apple" , "supercategory": "fruit"}
]
```

 
#### images
Trường dữ liệu này chứa các thông tin của ảnh như: id (mỗi ảnh chỉ có 1 id duy nhất), tên ảnh, chiều cao, chiều rộng...

```json
"images":
[
{
"id": 297,
"width": 1366,
"height": 768,
"filename": "chien.png",
"license": 1,
"date_captured": "2021-05-07 16:24:30"
},
{
"id": 305,
"width": 1920,
"height": 1080,
"filename": "yoona.png",
"license": 2,
"date_captured": "2021-05-07 16:25:30"
}
]
```

#### annotations
Trường dữ liệu này chứa thông tin nhãn của từng đối tượng trong ảnh, gồm các thông tin như sau:
```json
annotation{
"id": int,
"image_id": int,
"category_id": int,
"segmentation": [polygon],
"area": float,
"bbox": [x, y, width, height],
"iscrowd": 0 or 1,
}
```
Trong đó:
* **id**: id của annotation.
* **image_id**: id của ảnh chứa object .
* **category_id**: id của đối tượng (danh sách các id đã được liệt kê ở trường dữ liệu **categories**.
* **segmentation**: chứa thông tin về tọa độ x, y cho các đa giác bao quanh đối tượng như đề cập ở phần trên.
* **area**: diện tích bounding box của đối tượng
* **bbox**:  tọa độ của bounding box tương ứng với đối tượng ( x_top left, y-top left, width, height).
* **iscrowd**: là giá trị thể hiện thông tin ở trường segmentation là của một đối tượng riêng lẻ hay là của cả 1 nhóm đối tượng.

## 2.2. Pascal VOC Annotations
Pascal VOC ( Visual Object Classes) là tập datasets phục vụ cho các bài toán Object detection, senamic segmentation và classification. Trong tập dataset này bao gồm 20 lớp khác nhau

Không giống như COCO, Pascal VOC lưu trữ các annotations dưới dạng file xml, mỗi ảnh trong tập datasets này sẽ có 1 file xml tương ứng với nó (đối với COCO thì cả tập dữ liệu chỉ có 1 file json duy nhất). Thông tin về bouding box trong Pascal VOC cũng được lưu trữ theo 1 cách khác. Nếu như trong COCO, bounding box lưu trữ các thông tin lần lượt là **[x_top left, y _top left, width, height]** thì với Pascal VOC sẽ lưu trữ thông tin của bounding box là **[x_min, y_min, x_max, y_max]**.

Dưới đây là 1 ví dụ về 1 file annotation của Pascal VOC
```xml
<annotation> 
  <folder>Train</folder> 
  <filename>01.png</filename>      
  <path>/path/Train/01.png</path> 
  <source>  
    <database>Unknown</database> 
  </source>
  <size>  
    <width>224</width>  
    <height>224</height>  
    <depth>3</depth>   
  </size> 
  <segmented>0</segmented> 
  <object>  
    <name>person</name>  
    <pose>Frontal</pose>  
    <truncated>0</truncated>  
    <difficult>0</difficult>  
    <occluded>0</occluded>  
    <bndbox>   
      <xmin>90</xmin>   
      <xmax>190</xmax>   
      <ymin>54</ymin>   
      <ymax>70</ymax>  
    </bndbox> 
  </object>
</annotation>
```

Các trường thông tin quan trọng của Pascal VOC là:
* **folder**: lưu trữ thông tin về thư mục chứa ảnh của tập dataset.
* **path**: Đường dẫn đến ảnh tương ứng với file annotation hiện tại.
* **size**: Chứa 3 thông tin của ảnh là width, height và depth.

**object** là trường thông tin quan trọng nhất đối với 1 file annotation của Pascal VOC nó chứ các thông tin:
* **name**: tên lớp của đối tượng 
* **pose**: có các giá trị "frontal", "left", "right", "rear" chỉ hướng của đối tượng nằm trong bouding box. Ví dụ như ở hình dưới cái xe đạp ở phía bên phải người mặc áo trắng đang hướng về phía trái thì giá trị ở trường pose sẽ là left.
* **truncated**: mang giá trị 0 khi đối tượng nằm hoàn toàn trong bounding box, giá trị 1 khi đối tượng không nằm hoàn toàn trong bouding box (ví dụ trường hợp cái xe đạp bên trái người mặc áo trắng)
* **difficult**: thể hiện độ khó của đối tượng trong các task về nhận diện ( ví dụ trong ảnh dưới, phía bên trên cùng của ảnh có 1 bounding box cho đối tượng người, tuy nhiên nó chỉ là 1 phần rất nhỏ rất khó có thể nhận diện đây là 1 người. Với những annotation mà có **dificult = 1** thì sẽ được bỏ qua trong quá trình validation. 
* **occluded**: mang giá trị 0 khi bouding box của đối tượng không bị bounding box của đối tượng khác che lấp lên, mang giá trị 1 trong trường hợp còn lại. Ví dụ trong ảnh dưới thì **occluded** của đối tượng người áo trắng sẽ mang giá trị 1 do bị bounding box của chiếc xe đạp bên trái che lấp lên.
* **bndbox**: gồm các thông tin bounding box của đối tượng: x_min, x_max, y_min, y_max.
![](https://images.viblo.asia/afeee0e5-1c4e-4174-9704-b0d0570427e2.PNG)

## 2.3. Yolo Annotations
YOLO là kiến trúc rất nổi tiếng cho bài toán Object detection. Các phiên bản của YOLO từ v1 đến v4 và cả v5 khi training đều yêu cầu định dạng annotation riêng cho tập dataset. Khác với COCO và Pascal, Định dạng annotation của YOLO có dạng như sau:
```xml
<object-class> <x> <y> <width> <height>
```
 Trong đó:
*  **object-class**: Là số nguyên từ 0 đến số lượng class - 1. Mỗi số nguyên tương ứng với 1 lớp. Tên các lớp được định nghĩa trong file *classes.txt* đi kèm với tập dataset.
*  **x**: x center của bounding box.
*  **y**: y center của bounding box.
*  **width**: Chiều rộng của bounding box.
*  **height**: Chiều cao của bounding box.

**Lưu ý**: Các giá trị x, y, width, height đều được chuẩn hoá về khoảng giá trị [0, 1]. Tôi sẽ lấy 1 ví dụ cho các bạn dễ hiểu hơn.
![](https://i.imgur.com/5lNxv9Q.jpg)

Trong hình ảnh ví dụ trên: ảnh có kích thước **(2432, 3648)**, bounding box trong ảnh có toạ độ góc trên cùng bên trái (top-left) là **(457, 289)** , góc dưới cùng bên phải **(2185, 3425)**. Ta dễ dàng tính được điểm trung tâm của bounding box sẽ là **(1321, 1857)**, width = 1728, height = 3136. 

Để đưa về đúng định dạng annotation của yolo ta sẽ thực hiện chia các giá trị trên cho chiều rộng và chiều cao của ảnh. khi đó điểm trung tâm sẽ là $(\frac{1321}{2432}, \frac{1857}{3648})= (0.543174, 0.509046)$, $width = \frac{1728}{2432} = 0.710526$, $height = \frac{3136}{3648}= 0.859649$. Các số được làm tròn đến 6 chữ số sau dấu phẩy. Khi đó ta sẽ lưu lại được thông tin annotation của ảnh trên là :
```xml
0, 0.543174, 0.509046, 0.710526, 0.859649
```

# 3. Công cụ gán nhãn
<div align="justify">
 
 Với tôi, tôi hay làm việc với các bài toán object detection và object segmentation, các công cụ mà tôi đã sử dụng để gán nhãn cho dữ liệu của mình là [LabelImg](https://github.com/tzutalin/labelImg) công cụ này dùng để gán nhãn cho bài toán object detection, với công cụ này các bạn có thể xuất ra 2 định dạng annotations là YOLO và Pascal VOC, công cụ khác là [CVAT](https://cvat.org) với công cụ này các bạn có rất nhiều lựa chọn về loại nhãn hay định dạng annotations. Ngoài ra còn có rất nhiều các công cụ khác nữa, tuỳ vào mục đích bài toán cần dữ liệu dạng gì thì các bạn có thể lựa chọn các công cụ để tạo tập dữ liệu cho riêng mình.

Ngoài ra cũng có trường hợp các bạn cần chuyển đổi các loại định dạng annotations thì có thể tham khảo ở trang [Roboflow](https://roboflow.com/formats). Hoặc ở link github cá nhân của tôi ở [đây](https://github.com/chienlm-1082/Convert_tools), hiện tại tôi mới có 2 tools convert từ COCO to YOLO và COCO to Pascal VOC tuy nhiên tôi sẽ update thêm trong tương lai gần :joy:    
  
 Cảm ơn bạn nào đã dành thời gian đọc đến tận đây!, nếu thấy bài viết này chưa đúng ở phần nào thì các bạn có thể cho tôi 1 comment ở phía dưới nhé và nếu nó mang lại một chút gì đó cho bạn thì đừng quên cho tôi xin 1 upvote nhé :heart_eyes:. Cảm ơn các bạn :hugs::hugs:
</div>




# Tham khảo
* [Image Data Labelling and Annotation — Everything you need to know](https://towardsdatascience.com/image-data-labelling-and-annotation-everything-you-need-to-know-86ede6c684b1#:~:text=YOLO%3A%20In%20YOLO%20labeling%20format,object%20coordinates%2C%20height%20and%20width.)
* [The PASCAL Visual Object Classes Challenge
2012 (VOC2012) Development Kit](https://pjreddie.com/media/files/VOC2012_doc.pdf)
* [Types of image annotation – the ultimate guide](https://humansintheloop.org/types-of-image-annotation/)
* [How to work with object detection datasets in COCO format](https://towardsdatascience.com/how-to-work-with-object-detection-datasets-in-coco-format-9bf4fb5848a4)