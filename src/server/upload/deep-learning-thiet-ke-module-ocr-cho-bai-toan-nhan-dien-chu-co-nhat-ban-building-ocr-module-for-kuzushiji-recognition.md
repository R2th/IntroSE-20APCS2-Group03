Các phần nội dung chính được đề cập trong bài blog lần này

- Giới thiệu về Kuzushiji Recognize 
- Hướng tiệp cận  
- Text detection - Image Segmentation
- Quá trình hậu xử lý mô hình - Post processing
- Text recognition - Image Classification
- Demo với streamlit 
- Triển khai model với tensorflow serving
- Đóng gói model với Docker / docker-compose

- Kết quả thu được sau bài blog này :D 

![Imgur](https://i.imgur.com/B3vIbbY.jpg)

và

![Imgur](https://i.imgur.com/lK9Spqj.jpg)

- Link github: https://github.com/huyhoang17/kuzushiji_recognition (UPDATED: 25/03/2020)

- 1 vài link github khác mình có đề cập trong bài
    - Flower Image Retrieval with Streamlit: https://github.com/huyhoang17/flowers102_retrieval_streamlit
    - Tensorflow Serving with Docker / docker-compose (MNIST dataset): https://github.com/huyhoang17/tensorflow-serving-docker

# Kuzushiji Recognition - Kaggle Competition 

- Các bạn có thể đọc thêm thông tin về cuộc thi tại link sau: https://www.kaggle.com/c/kuzushiji-recognition

- Bài toán đặt ra bao gồm 2 bước xử lý chính:
    - Character Detection: xác định vị trí các chữ cái trên tài liệu được chụp lại 
    - Character Recognition: với những chữ cái được crop từ phần xác định vị trí bên trên, xác định xem chữ cái đó là gì 

# Giới thiệu chung về bài toán OCR - Optical Character Recognition

- OCR hay Optical Character Recognition là 1 bài toán điển hình và khá phổ biến trong Computer Vision. Về cách tiếp cận và mô hình thuật toán cũng rất đa dạng tùy bài toán đặt ra. 1 số bài toán về OCR điển hình như:
    - Nhận diện biển số xe (License Plate Recogntion)
    - Nhận diện chứng minh thư / passport hay các giấy tờ liên quan - Id-Card Recognition
    - Bài toán nhận diện biển báo giao thông - Trafic Sign Recogntion
    - Nhận diện chữ viết tay - Handwriting Recognition
    - ...

- Hẳn các bạn tiếp xúc với Computer Vision cũng đều đã từng thử nghiệm qua tập dữ liệu MNIST, bao gồm 10 chữ cái và được crop khá chặt rồi. Nhiệm vụ là xây dựng 1 mô hình image classification để phân loại 10 class đó. Tất nhiên tập dữ liệu khá đơn giản, chỉ là ảnh đen trắng nên cũng ko cần phải xử lý quá nhiều và dễ dàng đạt được độ chính xác khá cao. Trong bài toán Kuzushiji Recognition lần này, cũng sẽ có 1 phần công việc khá tương tự như khi thực hiện trên tập MNIST. Tuy nhiên, số lượng class là nhiều hơn rất nhiều (3422 classes) và data rất mất cân bằng (imbalance data).

# Text Detection task 

- Thật ra, luồng xử lý ban đầu của bài toán Text Detection, các bạn có thể nghĩ ngay tới việc sử dụng 1 model object detection để xác định vị trí các chữ cái. Tuy nhiên, có 1 vài điểm cần lưu ý với tập dữ liệu cung cấp như:
    - Ảnh tài liệu được cung cấp được mặc dù có độ phân giải khá cao, tuy nhiên các chữ cái trên đó có kích thước rất bé (mình có tiến hành 1 phân tích nhỏ thì chiều rộng và chiều cao trung bình lần lượt là 77 và 95 px, khá nhỏ, đa phần đều dưới 100px), rất nhiều các mô hình object detection hiện tại hoạt động không tốt với các object nhỏ

    ![Imgur](https://i.imgur.com/NhHrCuK.png)

    - Mật độ chữ cái trong 1 tài liệu là rất khác nhau. Ngoài những tài liệu chỉ có hình, rất ít chữ tới những tài liệu số lượng chữ cái lên tới hơn 600
    - Vì là chữ viết tay nên việc "overlap" giữa các chữ cái là rất dễ nhận biết. Kèm theo đó là tỉ lệ chiều dài / chiều rộng cũng khác nhau rất nhiều với từng chữ. Có những chữ cái được viết rất dài nên phần chiều cao rất lớn, còn những chữ cái thì chỉ đơn giản là 1 nét gạch ngang dài, ... 1 số ảnh ví dụ: 

![Imgur](https://i.imgur.com/PFHUrTd.png)

- Vậy nên, trong phần Text Detection này, mình sẽ không sử dụng 1 model object detection phổ biến mà sẽ tiếp cận theo hướng segmentation để xác định cụ thể vị trí của từng chữ cái

### Detect by segmentation

- 1 điều cần làm rõ nữa là nếu chỉ xử lý theo 2 class (background và non-background) thì kết quả thu được từ mô hình segmentation, chúng ra không thể phân định rõ ràng vị trí của từng chữ cái. Vậy nên, cần 1 cơ chế khác để giúp phân định "ranh giới" của từng chữ cái?! 

- Ở đây, thay vì sử dụng luôn phần label mà kaggle cung cấp, ta sẽ tiến hành generate data dựa trên các vùng bounding box, mà cụ thể là các điểm tâm (center point) của từng chữ cái. Vậy nên, ngoài phần segment chữ, thì output của mô hình sẽ bao gồm cả phần segment center-point của từng chữ nữa. Do đó, output đầu ra của model hoàn toàn có thể dựa vào các điểm center đó để phân định cụ thể từng chữ. Chi tiết phần post-processing sẽ được mình đề cập kĩ hơn bên dưới. Còn trước hết, bắt tay vào phần chuẩn bị dữ liệu cái đã

- Các thông tin về dữ liệu training được cung cấp dưới dạng 1 file csv với 2 thông tin chính là: image_id và labels với tổng cộng 3605 ảnh train và 1730 ảnh test.

- Dữ liệu tại cột `labels` được định nghĩa lần lượt các thông tin bao gồm: codepoint, x, y, w, h

![Imgur](https://i.imgur.com/wfFbtd2.png)

- Visualize dữ liệu, ở đây mình sử dụng Pillow để visualize

```python
def visualize_training_data(image_fn,
                            labels,
                            width=3,
                            y_first=False):

    # Convert annotation string to array
    labels = np.array(labels.split(' ')).reshape(-1, 5)

    # Read image
    imsource = Image.open(image_fn).convert('RGBA')
    bbox_canvas = Image.new('RGBA', imsource.size)
    char_canvas = Image.new('RGBA', imsource.size)
    # Separate canvases for boxes and chars
    bbox_draw = ImageDraw.Draw(bbox_canvas)
    char_draw = ImageDraw.Draw(char_canvas)

    for codepoint, *args in labels:  # noqa
        if y_first:
            y, x, h, w = args
        else:
            x, y, w, h = args

        x, y, w, h = int(x), int(y), int(w), int(h)
        try:
            # Convert codepoint to actual unicode character
            char = unicode_map[codepoint]
        except KeyError:
            # some codepoint not exists in unicode_map :/
            print(codepoint)
            continue
        # Draw bounding box around character, and unicode character next to it
        bbox_draw.rectangle(
            (x, y, x + w, y + h), fill=(255, 255, 255, 0),
            outline=(255, 0, 0, 255), width=width
        )
        char_draw.text(
            (x + w + FONT_SIZE / 4, y + h / 2 - FONT_SIZE),
            char, fill=(0, 0, 255, 255),
            font=font
        )

    imsource = Image.alpha_composite(
        Image.alpha_composite(imsource, bbox_canvas), char_canvas)
    # Remove alpha for saving in jpg format.
    imsource = imsource.convert("RGB")
    return np.asarray(imsource)
```

![Imgur](https://i.imgur.com/5ofAnkh.jpg)

- Tạo thêm dữ liệu là các ảnh mask, bao gồm 2 thành phần. Ảnh mask xác định các vùng là chữ và ảnh mask xác định các center point của từng chữ

```python
def get_mask(img, labels):
    """Reference
    """
    mask = np.zeros((img.shape[0], img.shape[1], 2), dtype='float32')
    if isinstance(labels, str):
        labels = np.array(labels.split(' ')).reshape(-1, 5)
        for char, x, y, w, h in labels:
            x, y, w, h = int(x), int(y), int(w), int(h)
            if x + w >= img.shape[1] or y + h >= img.shape[0]:
                continue
            mask[y: y + h, x: x + w, 0] = 1
            radius = 6
            mask[y + h // 2 - radius: y + h // 2 + radius + 1, x +
                 w // 2 - radius: x + w // 2 + radius + 1, 1] = 1
    return mask
```

- Code tạo center-point cũng khá đơn giản, ở đây mình xác định center-point dựa vào các tọa độ (x, y, w, h) đã được cung cấp, rồi sử dụng radius để tính các vùng gần tâm và gán giá trị = 1.

### Softmax or Sigmoid

- Ở đây, có 1 lưu ý rằng, việc mình tạo các center-point đều dựa trên 4 tọa độ offset (x, y, w, h). Điều đó có nghĩa là 2 lớp mask là chồng lên nhau và vùng center-point có độ bao phủ nhỏ hơn nhiều so với bounding box. Do đó, trong việc thiết kế model cho bài toán segmentation, thay vì sử dụng `Softmax` tại layer cuối cùng thì mình sử dụng hàm kích hoạt `Sigmoid`

- Việc chuyển từ `Softmax` sang `Sigmoid` có ý nghĩa tương tự như khi chuyển 1 bài toán Image Classification từ Multi-class sang Multi-labels! Nếu với việc tạo 2 lớp mask bên trên mà sử dụng `Softmax` sẽ gây ảnh hưởng tới đầu ra của mô hình segment, khi đó 2 lớp mask ko overlap (tương tự như lúc generate data) và hoàn toàn có thể gây ảnh hưởng tới phần post-processing mình áp dụng sau này!

### Unet

- Về phần segmentation, các mô hình cũng khá phổ biến, 1 số mô hình tiêu biểu như: Unet, Deeplab v1/2/3, FPN, PSPNet, Mask-RCNN, .... Các bạn cũng có thể lựa chọn sử dụng các pretrained model với các backbone khác nhau để finetune lại tập dữ liệu này. Trong bài toán này, phần model mình có tự custom lại, dựa theo kiến trúc của Unet. Phần backbone của mô hình mình sử dụng các residual layer, với thiết kế dựa trên mạng resnet. Phần lý thuyết về mạng Unet và residual network (resnet-based) trên mạng cũng đã đề cập khá nhiều, mình sẽ không đề cập sâu trong bài blog lần này

- Mô hình Unet-Resnet-based mình có custom lại, model với input là (512, 512, 3), output layer có kích thước (512, 512, 2), với channel đầu tiên là vùng mask thể hiện bounding box, channel thứ hai là vùng mask thể hiện các center-point của từng kí tự, hàm kích hoạt `sigmoid` tại layer cuối cùng. Phần code tạo model

```python
def resnet_unet(img_size=(512, 512),
                no_channels=3,
                start_neurons=32,
                dropout_rate=0.25):

    # inner
    input_layer = layers.Input(name='the_input',
                               shape=(*img_size, no_channels),  # noqa
                               dtype='float32')

    ....

    # output mask
    output_layer = layers.Conv2D(
        2, (1, 1), padding="same", activation=None)(uconv1)

    # 2 classes: character mask & center point mask
    output_layer = layers.Activation('sigmoid')(output_layer)

    model = models.Model(inputs=[input_layer], outputs=output_layer)
    return model
```

cụ thể về phần model, các bạn tham khảo thêm tại link [sau](https://github.com/huyhoang17/kuzushiji_recognition/blob/master/src/model_segment.py)

- 1 số thông tin của model, model khá nhỏ gọn với hơn 1.2m params. Input là ảnh RGB, output là ảnh mask 2 channel, channel thứ nhất thể hiện các vùng chứa ký tự, channel thứ hai thể hiện các center point của từng ký tự!

```python
net.count_params(), net.inputs, net.outputs

(1276578,
 [<tf.Tensor 'the_input:0' shape=(?, 512, 512, 3) dtype=float32>],
 [<tf.Tensor 'activation_60/Sigmoid:0' shape=(?, 512, 512, 2) dtype=float32>])
```

- Tiếp đến, với phần data generator, mình tự viết lại 1 class để gen data, kế thừa từ keras.Sequence. Chi tiết, các bạn tham khảo tại [data_generators.py](https://github.com/huyhoang17/kuzushiji_recognition/blob/master/src/data_generators.py)

hoặc tham khảo thêm tại link hướng dẫn của stanford: https://stanford.edu/~shervine/blog/keras-how-to-generate-data-on-the-fly

- Phần data augmentation

```python
import albumentations as A

AUGMENT_TRAIN = A.Compose([
    A.ShiftScaleRotate(
        p=0.50, rotate_limit=1.5,
        scale_limit=0.05, border_mode=0
    ),
    A.RandomCrop(512, 512, p=0.75),
    A.RandomContrast(limit=0.05, p=0.75),
    A.RandomBrightness(limit=0.05, p=0.75),
#     A.RandomBrightnessContrast(contrast_limit=0.05, brightness_limit=0.05, p=0.75),
], p=0.75)
```

- Phần chia train / test dữ liệu. Ở đây, để việc chia dữ liệu train / test cho hợp lý, mình xác định số lượng ký tự trong 1 ảnh và vẽ histogram, kết quả thu được như sau

```python
count_char_labels = [len(np.array(label.split()).reshape(-1, 5)) for label in labels]

plt.hist(count_char_labels, bins=200);
```

![Imgur](https://i.imgur.com/wHxx2zX.jpg)

- Có thể thấy rằng, số lượng ký tự trong 1 ảnh phân bố rất không đồng đều, ít thì vài ba chữ, nhiều thì vài trăm chữ @@ nên về phần chia dữ liệu mình có tiến hành phân loại vào từng nhóm, ví dụ từ 0 -> 50 ký tự, 51-> 100 ký tự, ... để đảm bảo rằng phân phối trên tập train / test là gần tương đương nhau. Các bạn để ý mình có sử dụng thêm param `stratify` trong `train_test_split`

```python
range_counts = np.array([0, 50, 100, 150, 250, 300, 400, 500, 700])
range_labels = []

for count_char_label in count_char_labels:
    for index, range_count in enumerate(range_counts[:-1]):
        if count_char_label >= range_count and count_char_label <= range_counts[index + 1]:
            range_labels.append(index)
            break

train_img_fps, val_img_fps, train_labels, val_labels = \
        train_test_split(img_fps, labels, test_size=0.1, stratify=range_labels, random_state=42)
```

- Training model

```python
net = ...

def dice_coef(y_true, y_pred):
    y_true_f = K.flatten(y_true)
    y_pred = K.cast(y_pred, 'float32')
    y_pred_f = K.cast(K.greater(K.flatten(y_pred), 0.5), 'float32')
    intersection = y_true_f * y_pred_f
    score = 2. * K.sum(intersection) / (K.sum(y_true_f) + K.sum(y_pred_f))
    return score

def bce_dice_loss(y_true, y_pred):
    return losses.binary_crossentropy(y_true, y_pred) + dice_loss(y_true, y_pred)

optim = optimizers.Adam(lr=0.01)
net.compile(loss=bce_dice_loss, optimizer=optim, metrics=[my_iou_metric, dice_coef])

# create train / test generator
train_generator = KuzuDataGenerator(
    train_img_fps, train_labels,
    batch_size=BATCH_SIZE,
    img_size=(IMG_SIZE, IMG_SIZE),
    shuffle=True,
    augment=AUGMENT_TRAIN,
)

val_generator = KuzuDataGenerator(
    val_img_fps, val_labels,
    batch_size=BATCH_SIZE,
    img_size=(IMG_SIZE, IMG_SIZE),
    shuffle=False,
    augment=None
)

# create callbacks
checkpoint = ...
early = ...
redonplat = ...
csv_logger = ...

callbacks_list = [
    checkpoint,
    early,
    redonplat,
    csv_logger,
]

# fit model
history = net.fit_generator(
    train_generator, 
    steps_per_epoch=len(train_generator), 
    epochs=5, 
    callbacks=callbacks_list, 
    validation_data=val_generator, 
    validation_steps=len(val_generator),
)

# save weights & config
net.save_weights(os.path.join(MODEL_FD, "kuzu_resnet_unet_5epochs.h5"))

model_json = net.to_json()
with open(os.path.join(MODEL_FD, "kuzu_resnet_unet.json"), "w") as f:
    f.write(model_json)
```

- Kết quả đầu ra của model

![Imgur](https://i.imgur.com/kfMptZV.jpg)

### Post processing

- Đây là 1 trong những phần việc quan trọng khi mình thực hiện project này, liên kết 2 phần text detection và text recognition với nhau. Vì phần kết quả nhận dạng của phần recognize phụ thuộc khá nhiều vào phần detect bên trên. Vậy nên, bất kì phần nhiễu đầu ra nào của model detect nếu không được xử lý kĩ sẽ gây ảnh hưởng rất lớn những phần sau 

- Cụ thể, về luồng của phần post-processing có thể tóm gọn như sau:
    - Đầu ra của model là ảnh mask 2 channel, mình tạm gọi lần lượt từng channel là char-mask (vùng chứa ký tự) và center-mask (center-point của ký tự)
    - Dựa vào các vùng center-mask, sử dụng contour-method để xác định cụ thể tọa độ các điểm tâm của từng ký tự
    - Với mỗi điểm tâm (center-point) đó, sử dụng thuật toán phân cụm k-mean (với số cluster = số center-point xác định bên trên) cho các điểm pixel được xác định là vùng chứa ký tự (char-mask)
    - Sau khi tiến hành phân cụm, ta thu được các điểm pixel ứng với từng điểm tâm (center-point)
    - Loại bỏ các vùng char-mask không chứa điểm các điểm tâm (center-point) !!
    - Tiến hành xác định các bounding box dựa trên các điểm tâm (center-point) và các vùng char-mask tương ứng (đã được phân loại nhờ k-mean bên trên)

- Như đã nói bên trên, output của model segmentation gồm 2 channel, mình tạm gọi lần lượt là `pred_bbox` và `pred_center`

```python
pred_mask = net.predict(img)[0]
pred_bbox = pred_mask[:, :, 0]
pred_center = pred_mask[:, :, 1]

bbox_thres, center_thres = 0.01, 0.02
pred_bbox = (pred_bbox > bbox_thres).astype(np.float32)
pred_center = (pred_center > center_thres).astype(np.float32)
```

- Tiến hành xác định cụ thể các tọa độ tâm của `pred_center` với contour method

```python
def get_centers(mask):
    """find center points by using contour method

    :return: [(y1, x1), (y2, x2), ...]
    """
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    centers = []
    for cnt in contours:
        M = cv2.moments(cnt)
        if M['m00'] > 0:
            cx = M['m10'] / M['m00']
            cy = M['m01'] / M['m00']
        else:
            cx, cy = cnt[0][0]
        cy = int(np.round(cy))
        cx = int(np.round(cx))
        centers.append([cy, cx])
    centers = np.array(centers)
    return centers
    
# việc convert về np.uint8 là bắt buộc!
center_coords = get_centers(pred_center.astype(np.uint8))
```

- Function `get_centers` trả về 1 list các tọa độ theo thứ tự: `[(y1, x1), (y2, x2), ...]`, ứng với từng tâm của các ký tự 

- Dựa vào vùng segment `pred_bbox` và các tọa độ tâm `center_coords`, mình sử dụng thuật toán phân cụm `K-means` để tiến hành phân loại các điểm pixel (có giá trị = 1) của `pred_bbox` vào từng tọa độ tâm tương ứng

```python
def get_labels(center_coords,
               pred_bbox):
    kmeans = KMeans(len(center_coords), init=center_coords)
    kmeans.fit(center_coords)  # noqa

    x, y = np.where(pred_bbox > 0)
    pred_cluster = kmeans.predict(list(zip(x, y)))

    pred_bbox_ = copy.deepcopy(pred_bbox)
    pred_bbox_[x, y] = pred_cluster

    return pred_bbox_

bbox_cluster = get_labels(center_coords, pred_bbox)
```

- Biến `bbox_cluster` thu được thực chất tương tự như `pred_bbox` bên trên nhưng các điểm pixel đã được phân về các cluster index tương ứng. Visualize `bbox_cluster` sẽ thấy rõ hơn

![Imgur](https://i.imgur.com/d69u6yJ.jpg)

- Từ đó, xác định các bounding box dựa trên các cluster index đó. Cách đơn giản nhất là xác định các điểm `x_min, x_max, y_min, y_max` ứng với các điểm pixel (có giá trị = 1) của `pred_bbox` thuộc cùng 1 cluster index. Code thực hiện tạo và visualize các bounding box 

```python
def vis_pred_bbox(pred_bbox, center_coords, width=6):
    """
    pred_bbox: 1st mask
    center_coords: list of center point coordinates [[x1, y1], [x2, y2], ...]
    """

    bbox_cluster = get_labels(center_coords, pred_bbox)

    img = np.zeros((512, 512))
    pil_img = Image.fromarray(img).convert('RGBA')
    bbox_canvas = Image.new('RGBA', pil_img.size)
    bbox_draw = ImageDraw.Draw(bbox_canvas)
#     center_canvas = Image.new('RGBA', pil_img.size)
#     center_draw = ImageDraw.Draw(center_canvas)

    # exclude background index
    for cluster_index in range(len(center_coords))[1:]:
        char_pixel = (bbox_cluster == cluster_index).astype(np.float32)

        horizontal_indicies = np.where(np.any(char_pixel, axis=0))[0]
        vertical_indicies = np.where(np.any(char_pixel, axis=1))[0]
        x_min, x_max = horizontal_indicies[[0, -1]]
        y_min, y_max = vertical_indicies[[0, -1]]

        # draw polygon
        bbox_draw.rectangle(
            (x_min, y_min, x_max, y_max), fill=(255, 255, 255, 0),
            outline=(255, 0, 0, 255), width=width
        )
        # draw center

    res_img = Image.alpha_composite(pil_img, bbox_canvas)
    res_img = res_img.convert("RGB")
    res_img = np.asarray(res_img)

    # normalize image
    res_img = res_img / 255
    res_img = res_img.astype(np.float32)

    return res_img

final_bbox = vis_pred_bbox(pred_bbox, center_coords, width=2)
plt.imshow(final_bbox)
```

![Imgur](https://i.imgur.com/L5wTGyI.jpg)

- Trông cũng khá ok đấy chứ =)) Tuy nhiên, thử với 1 số ảnh khác thì nảy sinh vấn đề như hình dưới 

![Imgur](https://i.imgur.com/RuMF6b5.jpg)

- Các bạn có để ý thấy các vùng thuộc `pred_bbox` nhưng không hề chứa các vùng `center points` nào không. Chính các vùng này khiến cho việc khi thực hiện phân cụm pixel với K-means và tạo bounding box, sẽ tạo ra các bounding box với kích thước "quá khổ" hay thậm chí chứa nhiều hơn 1 ký tự. Việc loại bỏ đi các phần thừa đó là công việc cần làm tiếp theo :/

![Imgur](https://i.imgur.com/zbxSbRR.jpg)

- Sau 1 hồi lâu nghĩ phương án để giải quyết, mình tiếp tục sử dụng contour method nhưng lần này là đối `pred_bbox`

```python
def make_contours(masks, flatten=True):
    """
    flatten: follow by coco's api
    """
    if masks.ndim == 2:
        masks = np.expand_dims(masks, axis=-1)

    masks = masks.transpose((2, 0, 1))

    segment_objs = []
    for mask in masks:
        contours = measure.find_contours(mask, 0.5)
        for contour in contours:
            contour = np.flip(contour, axis=1)
            if flatten:
                segmentation = contour.ravel().tolist()
            else:
                segmentation = contour.tolist()
            segment_objs.append(segmentation)

    return segment_objs

# get all polygon area in image
polygon_contours = make_contours(pred_bbox)
```

- Biến `polygon_contours` hiện tại chứa tọa độ các các polygon có trong `pred_bbox`, có dạng `[[x1, y1, x2, y2, ..], [x1, y1, x2, y2, ..], [x1, y1, x2, y2, ..], ...]`. 

- Thực hiện kiểm tra các polygon có chứa ít nhất 1 điểm tâm nào hay không, nếu không thì loại bỏ 

```python
def filter_polygons_points_intersection(polygon_contours, center_coords):
    """https://github.com/huyhoang17/machine-learning-snippets/blob/master/filter_polygons_points_intersection.py
    """
    # checking if polygon contains center point
    final_cons = []
    for con in polygon_contours:
        polygon = Polygon(zip(con[::2], con[1::2]))
        for center in center_coords:
            point = Point(center[1], center[0])
            if polygon.contains(point):
                final_cons.append(con)
                break

    return final_cons
    
def vis_pred_bbox_polygon(pred_bbox, cons):
    """
    pred_bbox: 1st mask
    cons: list contours return from `make_contours` method
    """
    mask_ = Image.new('1', (512, 512))
    mask_draw = ImageDraw.ImageDraw(mask_, '1')

    for contour in cons:
        mask_draw.polygon(contour, fill=1)

    mask_ = np.array(mask_).astype(np.uint8)
    return mask_ * 255
    
filtered_contours = filter_polygons_points_intersection(polygon_contours, center_coords)  # noqa
pred_bbox = vis_pred_bbox_polygon(pred_bbox, filtered_contours)
```

- Tiến hành cập nhật lại `pred_bbox` với function `vis_pred_bbox_polygon`. Giờ cùng kiểm tra kết quả trước và sau khi thực hiện filter polygon:

![Imgur](https://i.imgur.com/wDVeuIw.jpg)

- Kết quả tốt hơn rất nhiều rồi :D  

- Trên trang chủ của cuộc thi có cung cấp 1 đoạn script dùng để evaluate kết quả của model. Các bạn có thể tham khảo tại link [sau](https://gist.github.com/SohierDane/a90ef46d79808fe3afc70c80bae45972). Mình có thực hiện thay đổi script 1 chút để chỉ evaluate với phần detection thôi

```python
def score_page(preds, truth, recognize=False):
        ...
        matching = (xmin < preds_x) & (xmax > preds_x) & (ymin < preds_y) & (ymax > preds_y)
        if recognize:
            matching = matching & (preds_label == label) & preds_unused
        ...
```

- Và kết quả trên 361 ảnh tập test cho phần character detection. Ổn áp đó :))  

![Imgur](https://i.imgur.com/yh9MrfC.png)

# Text Recognition task

### Mnist / Kuzushiji (Image Classification) 

- Mình có viết 1 hàm để cắt từng ký tự ra và lưu vào folder tương ứng. Tuy nhiên, có 1 số lưu ý:
    - 1 số ký tự không có trong file .csv
    - Nhiều ký tự có trong file csv nhưng không có dữ liệu 
    - Nhiều ký tự với số lượng sample rất ít, chỉ 1 hoặc 1 vài ảnh 
    - Những ký tự phổ biến có số sample rất lớn 

- Code cắt và lưu ảnh ký tự, mình có padding rộng hơn 1 khoảng là 5% so với 2 chiều, vì ảnh ban đầu được crop khá chặt 

```python 
char_codepoints = []
error_imgs = []
error_save = []

for index, row in tqdm_notebook(df_train.iterrows()):
    img_id = row["image_id"]
    img_fn = "{}.jpg".format(img_id)
    img_fp = os.path.join(TRAIN_FD, img_fn)
    try:
        img = cv2.imread(img_fp)[:, :, ::-1]
    except Exception:
        error_imgs.append(img_fp)
        continue
    
    img_h, img_w, img_c = img.shape
    label_chars = np.array(row["labels"].split()).reshape(-1, 5)
    for index_char, (codepoint, x, y, w, h) in enumerate(label_chars):
        x, y, w, h = int(x), int(y), int(w), int(h)

        # set offset to crop character
        offset = 5  # percentage
        y_diff = math.ceil(h * offset / 100)
        x_diff = math.ceil(w * offset / 100)
        
        # expand area
        y_from = y - y_diff
        y_to = y + h + y_diff
        x_from = x - x_diff
        x_to = x + w + x_diff
        
        # tune
        y_from, y_to, x_from, x_to = \
            list(map(functools.partial(np.maximum, 0), [y_from, y_to, x_from, x_to]))
        
        # crop char
        char_img = img[y_from:y_to, x_from:x_to]

        save_fn = "{}_{}.jpg".format(img_id, index_char)
        save_fp = os.path.join(train_2_fd, codepoint, save_fn)
        try:
            imageio.imwrite(save_fp, char_img)
            char_codepoints.append(codepoint)
        except Exception as e:
            print(e)
            error_save.append(img_fp)
            continue        
```

- Số lượng ký tự chỉ chứa 1 sample khá nhiều với 7xx ký tự. Tuy nhiên, so với tổng số lượng sample (>600k sample) thì rất nhỏ nên trong quá trình chia train-test và training model, mình quyết định bỏ qua toàn bộ các class không có dữ liệu hoặc chỉ có duy nhất 1 ảnh. Sau khi filter như vậy, tổng số ký tự còn lại là 3422

- Thực chất, bài toán khá giống với tập dữ liệu MNIST. Tuy nhiên, số lượng class là lớn hơn nhiều (10 vs 3422) và số lượng sample giữa từng class cũng là rất chênh lệch (imbalance data). Và thậm chí nhiều ký tự cùng 1 codepoint nhưng có nhiều kiểu viết khác nhau, ví dụ như ký tự có codepoint `U+5FA1` (御) như bên dưới

![Imgur](https://i.imgur.com/hZhyyW1.png)

ban đầu mình nhìn mà cứ ngỡ đoạn code crop ký tự của mình sai luôn mà =)) 

- Trong phần này, mình cũng sử dụng 1 kiến trúc dựa trên resnet, với các residual network. Phần code định nghĩa model các bạn có thể tham khảo tại file [sau]()

- 1 số thông tin của model

```python
cnet.count_params(), cnet.inputs, cnet.outputs

(17739230,
 [<tf.Tensor 'input_image_1:0' shape=(?, 64, 64, 3) dtype=float32>],
 [<tf.Tensor 'dense/Softmax:0' shape=(?, 3422) dtype=float32>])
```

- Phần classification, mình cũng viết 1 class để generate data riêng, các bạn tham khảo thêm tại file [sau]()

- Ở đây, mình áp dụng khá nhiều các kiểu augment khác nhau để làm phong phú thêm tập dữ liệu. Tuy nhiên, về phần data augmentation có 1 số lưu ý như sau
    - Cần phải hết sức cận thận khi áp dụng các kiểu augment khác nhau lên ảnh hoặc khi kết hợp nhiều method lại với nhau. Việc đơn giản nhất là visualize tập dữ liệu augment để có cái nhìn tổng quan nhất
    - Việc áp dụng data augmentation không phải lúc nào cũng hiệu quả, quá lạm dụng augmentation khi sinh thêm dữ liệu trong khi tính chất ảnh và phân bố lại không giống với dữ liệu kiểm thử sẽ không đem lại nhiều cải thiện cho mô hình

- Code phần data augmentation

```python
import albumentations as A

def color_get_params():
    a = random.uniform(-40, 0)
    b = random.uniform(-80, -30)
    return {
        "r_shift": a,
        "g_shift": a,
        "b_shift": b
    }

colorize = A.RGBShift(
    r_shift_limit=0, g_shift_limit=0, b_shift_limit=[-80, 0]
)
colorize.get_params = color_get_params

aug = A.Compose([
    A.RandomBrightnessContrast(
        contrast_limit=0.2, brightness_limit=0.2),
    A.ToGray(),
    A.Blur(),
    A.Rotate(limit=5),
    colorize
])
```

- Phần huấn luyện model cũng không quá đặc biệt, các bạn có thể xem thêm tại file [sau]()

- Model vẫn hội tụ khá tốt, sau 5 epochs, acc và f1 đều khá ngang nhau ~95%

![Imgur](https://i.imgur.com/6f1tQxe.png)

- OK, vậy là cũng hòm hòm 2 phần model rồi. Công việc tiếp theo là ghép 2 phần việc lại để thành 1 flow chung. Ở đây, sau khi đã xác định được các bounding box của từng ký tự, mình tiến hành convert các tọa độ offset (x, y, w, h) về đúng vị trí trên ảnh gốc, rồi từ đó mới thực hiện crop, resize lại về (64, 64) và đưa qua model classify. Code minh họa luồng xử lý với 2 model

```python
def deunicode(char):
    return chr(int(char[2:], 16))
```

```python
test_fp = ...
origin_image = cv2.imread(test_fp)[:, :, ::-1]
test_id = test_fp.split("/")[-1][:-4]

# image preprocess
img, origin_h, origin_w = load_image(
    test_fp, expand=True, return_hw=True
)

pred_mask = net.predict(img)
pred_bbox, pred_center = pred_mask[0][:, :, 0], pred_mask[0][:, :, 1]
pred_bbox = (pred_bbox > 0.01).astype(np.float32)
pred_center = (pred_center > 0.02).astype(np.float32)

center_coords = get_centers(pred_center.astype(np.uint8))
y_ratio = origin_h / 512
x_ratio = origin_w / 512

if len(center_coords) > 0:
    bbox_cluster = get_labels(center_coords, pred_bbox)

    # ignore background hex color (=0)
    for cluster_index in tqdm_notebook(range(len(center_coords))[1:]):
        char_pixel = (bbox_cluster == cluster_index).astype(np.float32)

        try:
            horizontal_indicies = np.where(np.any(char_pixel, axis=0))[0]
            vertical_indicies = np.where(np.any(char_pixel, axis=1))[0]
            x_min, x_max = horizontal_indicies[[0, -1]]
            y_min, y_max = vertical_indicies[[0, -1]]
        except IndexError:
            continue

        x = x_min
        y = y_min
        w = x_max - x_min
        h = y_max - y_min

        # convert to original coordinates
        x = int(x * x_ratio)
        w = int(w * x_ratio)
        y = int(y * y_ratio)
        h = int(h * y_ratio)

        # set offset to crop character
        offset = 5  # percentage
        y_diff = math.ceil(h * offset / 100)
        x_diff = math.ceil(w * offset / 100)

        # expand area
        y_from = y - y_diff
        y_to = y + h + y_diff
        x_from = x - x_diff
        x_to = x + w + x_diff

        # to visualize expanded-box
        if vis_expand:
            y = y_from
            x = x_from
            h = y_to - y_from
            w = x_to - x_from

        # tuning
        y_from, y_to, x_from, x_to = \
            list(map(functools.partial(np.maximum, 0),
                     [y_from, y_to, x_from, x_to]))

        try:
            char_img = origin_image[y_from:y_to, x_from:x_to]
            char_img = norm_mean_std(char_img)
            char_img = cv2.resize(char_img, (64, 64))
            char_img = np.expand_dims(char_img, axis=0)
            y_pred = cnet.predict(char_img)[0]
            y_argmax = np.argmax(y_pred)
            pred_label_unicode = le.classes_[y_argmax]
            pred_label = deunicode(pred_label_unicode)
        except Exception:
            continue
```

- Và đây là kết quả thu được cuối cùng, bao gồm 2 phần bounding box prediction và character prediction

![Imgur](https://i.imgur.com/B3vIbbY.jpg)

:smile: 

# Demo sản phẩm với streamlit 

- OK, xong phần model rồi. Việc tiếp theo các bạn có thể làm là dựng 1 trang web demo cho sản phẩm của mình. Mình thì cũng không có quá nhiều kinh nghiệm làm frontend, trước làm chỉ động đến chút Ajax thôi là bắt đầu loạn hết cả lên rồi :(( Gần đây, mình có tham khảo được 1 tool khá hay và cũng mới nổi trong thời gian gần đây là Streamlit, hỗ trợ việc xây dựng 1 web demo cho ứng dụng ML của bạn. Nhìn chung cũng khá dễ dùng, code python luôn mà, chỉ hơi khó custom theo ý mình 1 chút =))

- Mình cũng có làm 1 mini-project khác về Flower Image Retrieval sử dụng Streamlit, các bạn có thể tham khảo tại repo sau: https://github.com/huyhoang17/flowers102_retrieval_streamlit 
 
- 1 vài ứng dụng các sử dụng streamlit
    - https://github.com/IliaLarchenko/albumentations-demo : 1 app sử dụng streamlit với thư viện Albumentation, 1 lib cho data augmentation. Các bạn có thể thử nghiệm các kiểu augment khác nhau lên tập dữ liệu của bạn
    - http://try.market-place.ai.ovh.net/ : 1 app khác demo khá nhiều các ứng dụng hay ho của ML như: color-tranfer, background-removal, face-detection, selfie-2-anime, .... =))

# Triển khai model với Tensorflow Serving

- Các bạn có thể tham khảo 1 bài blog gần đây của mình về Tensorflow Serving, hơi dài 1 chút ^^ https://viblo.asia/p/model-serving-trien-khai-machine-learning-model-len-production-voi-tensorflow-serving-deploy-machine-learning-model-in-production-with-tensorflow-serving-XL6lAvvN5ek

- Mình cũng đã viết sẵn 2 class dùng để call tới gRPC service của tensorflow serving, kèm theo các file script để test và các file .pb để inference. Các bạn có thể tham khảo tại repo của mình để thực hiện test thử model :D 

# Đóng gói module với Docker / Docker Compose

- Phần đóng gói module với Docker / docker-compose, các bạn cũng có thể tham khảo tại bài blog về Tensorflow Serving của mình luôn hoặc tại repo sau https://github.com/huyhoang17/tensorflow-serving-docker , mình có thực hiên serving với tập MNIST :D 

# Other

- 1 trang web về Kuzushiji Recognition khá hay ho, các bạn có thể trải nghiệm thử =)) http://codh.rois.ac.jp/kuronet/iiif-curation-viewer/?manifest=https://www.dl.ndl.go.jp/api/iiif/2533346/manifest.json&pos=3&lang=ja

![Imgur](https://i.imgur.com/HeNvueD.png)

# Reference

- Kuzushiji Recognition - Kaggle Competition https://www.kaggle/c/kuzushiji-recognition

- https://mobile.twitter.com/Google/status/1230945330155401218

- https://about.google/stories/tensorflow-ai-japanese-culture/

- https://digitalorientalist.com/2020/02/18/cursive-japanese-and-ocr-using-kuronet/

- http://codh.rois.ac.jp/kuronet/iiif-curation-viewer/?manifest=https://www.dl.ndl.go.jp/api/iiif/2533346/manifest.json&pos=3&lang=ja

- https://www.kaggle.com/basu369victor/kuzushiji-recognition-just-like-digit-recognition

- https://mv-lab.github.io/talks/kuzushiji

- Unet character detector https://www.kaggle.com/hocop1/unet-character-detector

- CenterNet text detector https://www.kaggle.com/c/kuzushiji-recognition/discussion/112771 & https://www.kaggle.com/kmat2019/centernet-keypoint-detector

- Tensorflow Serving with Docker / docker-compose https://viblo.asia/p/XL6lAvvN5ek & https://github.com/huyhoang17/tensorflow-serving-docker

- https://stackoverflow.com/questions/36399381/whats-the-fastest-way-of-checking-if-a-point-is-inside-a-polygon-in-python

- Kuzushiji wiki http://naruhodo.weebly.com/blog/introduction-to-kuzushiji

- Streamlit https://www.streamlit.io/gallery

- Demo streamlit with flower image retrieval https://github.com/huyhoang17/flowers102_retrieval_streamlit

- Demo streamlit with albumentation https://github.com/IliaLarchenko/albumentations-demo

- Demo streamlit http://try.market-place.ai.ovh.net/

- https://www.kaggle.com/c/kuzushiji-recognition/discussion/112807