### Diabetic Retinopathy Detection - Kaggle Competition

- Các ứng dụng của Machine Learning, Deep Learning tới các ngành đặc thù như y sinh học trong thời gian vài năm gần đây nhận được sự chú ý rất lớn từ cộng đồng, cùng với đó là những thành tựu và kết quả đáng mong đợi đã đạt được như:
    - Breast cancer detection: https://paperswithcode.com/paper/deep-neural-networks-improve-radiologists
    - Diabetic Retinopathy Detection: https://paperswithcode.com/paper/diabetic-retinopathy-detection-via-deep
    - Lung cancer diagnosis: https://paperswithcode.com/paper/pathologist-level-classification-of
    - ...

trong bài blog lần này, mình sẽ giới thiệu tới các bạn 1 bài toán khá thú vị về medical image analysis: chẩn đoán tình trạng bệnh võng mạc đái tháo đường qua ảnh chụp võng mạc (fundus photography). Đây cũng là 1 competition trên kaggle mới được tổ chức, qua bài blog này mình hi vọng giúp các bạn có cái nhìn tổng quan nhất về bài toán và các bước mình tiến hành khi xử lí với tập dữ liệu khá đặc biệt này. 

- Reference: https://grand-challenge.org/challenges/

Những phần nội dung chính sẽ được đề cập trong bài blog lần này:
- Giới thiệu về Kaggle Competition
- 1 số lí thuyết về bệnh lí cơ bản
- EDA & Data Preprocessing
- Metric evaluation
- Classification or Regression
- Model training & evaluation
- Result
- Conclusion

### FYI: Diabetic retinopathy detection - Bệnh võng mạc đái tháo đường

- Diabetic Retinopathy (dianetic eye disease) a.k.a bệnh võng mạc đái tháo đường hoặc bệnh lý võng mạc do đường huyết cao là 1 trong những bệnh lý thường xuyên xảy ra ở người cao tuổi, gây tổn thương ở võng mạc bởi căn bệnh tiểu đường và là 1 trong những nguyên nhân hàng đầu dẫn tới mù lòa. Nếu 1 người mắc bệnh tiều đường càng lâu, nguy cơ phát sinh bệnh lý về võng mạc đái tháo đường ngày càng cao. Theo 1 thống kê, mỗi năm ở Hoa Kỳ, bệnh võng mạc đái tháo đường chiếm 12% trên tổng số các ca mù lòa mới và cũng là nguyên nhân dẫn đến mù lòa chính đối với những bệnh nhân từ 20 đến 64 tuổi, đặc biệt là những người cao tuổi.

- Cụ thể hơn về nguyên nhân dẫn tới bệnh võng mạc đái tháo đường: các bạn có thể đọc thêm tại link sau, khá chi tiết và dễ hiểu: https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/benh-vong-mac-dai-thao-duong/

![](https://vinmec-prod.s3.amazonaws.com/images/20190523_082220_729069_benh-vong-mac-dai-t.max-1800x1800.jpg)

- Các giai đoạn của bệnh võng mạc đái tháo đường gồm 4 giai đoạn chính:
    - Bệnh lý võng mạc nền: phình mao mạch võng mạc, xuất huyết nhẹ, ứ đọng các chất tiết trong võng mạc, phù võng mạc.
    - Bệnh lý hoàng điểm: hoàng điểm bị phù, tạo thành nang, hoặc kềm theo tổn thương thiếu máu nuôi dưỡng cục bộ.
    - Bệnh lý tiền tăng sinh: gây nên bởi sự bất thường trong cung cấp máu cho võng mạc, dẫn đến các tổn thương thiếu máu cục bộ, xuất huyết, xuất tiết và phù võng mạc.
    - Bệnh lý tăng sinh: gây ra bởi sự tăng sinh các tân mạch bất thường, gây xuất huyết tái diễn liên tục, gây tổ chức hóa và co kéo dịch kích võng mạc. Hậu quả là tổn thương nặng võng mạc, rách hoặc bong võng mạc dẫn đến mù lòa.

- 1 số dấu hiệu của bệnh võng mạc đái tháo đường (thực sự các triệu chứng của bệnh rất khó nhận biết trước hoặc không rõ ràng dẫn tới bệnh nhân có tâm lý chủ quan, không đi phòng bệnh kịp thời, dẫn tới khi bệnh đã chuyển hóa nặng hơn, gây rất nhiều khó khăn trong quá trình điều trị sau này): 
    - Điểm tối hoặc dây tối trong tầm nhìn
    - Bị đom đóm mắt
    - Tầm nhìn nhòe 
    - Tìn nhìn bị che và mờ
    - Tầm nhìn đêm kém
    - Tầm nhìn khiếm màu sắc
    - Mất tầm nhìn
    - ....

Reference:
- https://vi.wikipedia.org/wiki/B%E1%BB%87nh_v%C3%B5ng_m%E1%BA%A1c_ti%E1%BB%83u_%C4%91%C6%B0%E1%BB%9Dng

- https://www.healthinfotranslations.org/pdfDocs/DiabeticRetinopathy_VIET.pdf

### EDA

- Cuộc thi được chia thành 2 giai đoạn với public test và private test, được mô tả như hình dưới:

![](https://storage.googleapis.com/kaggle-media/competitions/general/public_vs_private.png)

- Tập dữ liệu mà cuộc thi cung cấp với tập train gồm 3662 ảnh, tập public test gồm 1928 ảnh. Có thể thấy rằng số lượng ảnh trên tập train khá ít, nếu so sánh với tập dữ liệu của 1 kaggle competition khác, cũng về diabetic retinopathy detection với khoảng 35.000 ảnh: https://www.kaggle.com/tanlikesmath/diabetic-retinopathy-resized. Bên cạnh đó, tỉ lệ giữa tập train / public-test cũng không quá chênh lệch.

- 1 điểm đáng chú ý khác là về distribution của dữ liệu. Tập public-test mà cuộc thi cung cấp chỉ chiếm khoảng 15%, còn tập private-test chiếm khoảng 85%, với hơn 13.000 ảnh (khoảng 20GB dữ liệu). Điều đó có nghĩa bạn phải làm việc trên 1 tập dữ liệu train chỉ vỏn vẹn ~3700 ảnh, để predict trên 1 tập test ~13.000 ảnh!! 1 tỉ lệ khá chênh lệch giữa train / private-test. Chưa kể, theo 1 số kernel mình đọc được thì dường như class-distribution giữa tập train / public-test cũng khá khác nhau, dẫn tới việc chia train/val trên tập train có thể thu được kết quả khá cao nhưng khi submit thì kết quả thấp hơn khá nhiều.

- Tập dữ liệu bao gồm các ảnh chụp võng mạc (**fundus protography**), được chụp dưới nhiều điều kiện khác nhau như: các ảnh chụp kích thước không cố định, phần ảnh chụp võng mạc bị cắt mất 1 phần, thiếu sáng, quá sáng, quá mờ hoặc quá tối, ... Được gán nhãn bởi bác sĩ và chia theo 5 cấp độ tăng dần với tình trạng bệnh (ứng với 5 classes):

    - 0 - No DR: Bình thường
    - 1 - Mild
    - 2 - Moderate
    - 3 - Severe
    - 4 - Proliferative DR: giai đoạn bệnh lý nặng nhất.

- **Chú ý**: tập dữ liệu do nhiều bác sĩ thực hiện gán nhãn chứ không phải duy nhất 1 người làm. Điều đó dẫn tới 1 tình trạng là sự thiếu thống nhất về cách đánh giá của từng người. Giả sử, người A đánh giá 1 bức ảnh đang ở trạng thái 3 (Severe), nhưng 1 người B lại chỉ nhìn nhận rằng ảnh đó thuộc trạng thái 1 (Mild). Rõ ràng là sự khác biệt trong cách đánh giá của từng người là không thể tránh khỏi, điều đó hoàn toàn có thể gây nhiễu trong quá trình huấn luyện mô hình sau này và gây ảnh hưởng tới kết quả. Về phần này sẽ được làm rõ hơn tại mục: **Metric Evaluation** bên dưới. Trước tiên, hãy cùng nhìn qua dữ liệu 1 chút đã :smiley:

- Dữ liệu trên tập train khá mất cân bằng, với 2 class 0 (normal) và 2 (moderate) có số lượng sample lớn hơn khá nhiều so với các class khác. Đây cũng là 1 vấn đề cần chú ý đặc biệt khi sử dụng các metric đánh giá, mô hình và hàm loss tối ưu sau này, ...

    ![Imgur](https://i.imgur.com/iBcylQ3.png)

- Vì số lượng sample trên 1 số class khá lớn (0 và 2) và chênh lệch so với các class khác nên nếu thực hiện training trên toàn bộ tập dữ liệu đó, mô hình có khả năng "học" được nhiều và tốt hơn với các class nhiều samples. Các metric đánh giá như độ chính xác (accuracy) không thể hiện được hiệu quả khi thực hiện đánh giá mô hình. Thay vào đó, các metric thường được sử dụng hơn khi làm dạng bài toán imbalance data như: precision (specificaity), recall (sentitivity), **f1-score**, **roc-auc**, .. hoặc 1 metric được sử dụng trong competition lần này là **cohen-kappa**. Mình sẽ đề cập kĩ hơn về metric này trong phần dưới của bài viết.

- 1 số ảnh trên tập train và label tương ứng:

![Imgur](https://i.imgur.com/VY1s9X3.png)

- Như đã đề cập bên trên, các ảnh võng mạc được chụp dưới nhiều điều kiện khác nhau. Có thể dễ dàng nhận biết nhất qua 1 số đặc điểm: kích thước ảnh không đều nhau (không phải tất cả các ảnh đều có dạng hình vuông và bo sát xung quanh viền võng mạc, như ảnh hàng 1 cột 2 (H1C2), H1C4, H2C3 ....; không phải ảnh nào cũng chụp đầy đủ võng mạc và bị cắt 1 phần trên / dưới; 1 số ảnh quá tối hoặc mờ hơn so với các ảnh khác (H2C1, H4C1, ..); ...

- Với 1 số ảnh ví dụ được show như hình bên trên, bằng mắt thường, ta khó có thể nhận biết được tình trạng hiện tại của võng mạc. Có thể để ý thấy rằng, với những trạng thái 2/3/4, trên võng mạc thường xuất hiện 1 số các vết đốm xanh (như bị "mốc" vậy :)) ) (H2C1, H2C2, H2C4, H5C2, ..), kèm theo đó là các đốm đen xuất hiện rải rác xung quanh viền võng mạc (H4C1, H5C3), tuy nhiên có nhiều trường hợp vẫn khá khó nhận biết nếu không phải 1 bác sĩ có chuyên môn, ví dụ như hình H5C4, trông không quá khác biệt so với các hình thuộc class 0/1 :(

### Classification hay Regression

- Ban đầu, khi đọc phần mô tả về bài toán, mình nghĩ đây sẽ là 1 bài toán về image-classification thông thường, với 5 class ứng với 5 giai đoạn. Nhưng sau khi đọc 1 số public kernel thì đa phần các kaggler đều coi đây như 1 bài toán Regression với việc set threshold để dự đoán các class tương ứng. Chi tiết hơn, các bạn có thể xem thêm tại phần discussion sau: https://www.kaggle.com/c/aptos2019-blindness-detection/discussion/98239#latest-573709

- Về ý tưởng chung, thay vì build 1 mạng CNN cơ bản với layer softmax ở cuối, ta coi đây như 1 bài toán multi-label classification nhưng được biểu diễn dưới dạng odinary regression. Cụ thể, thay vì label được biểu diễn dưới dạng one-hot vector, thì ở đây, ta kết hợp cách tạo multi-label và có set đến thứ tự cho từng trạng thái bệnh như sau:

    ```
    0: [1 0 0 0 0]
    1: [1 1 0 0 0]
    2: [1 1 1 0 0]
    3: [1 1 1 1 0]
    4: [1 1 1 1 1]
    ```

bằng cách này ta có thể chuyển từ bài toán classification sang bài toán regression.

- Mình thì không chắc là cách làm nào là tốt hơn, đơn giản nhất là thử mới biết được :smiley_cat: Mình cũng đã thử nghiệm và thấy rằng cách tiếp cận odinary regression đạt hiệu quả tốt hơn so với classification thông thường, vì model ít có xu hướng predict quá xa so với class thực.

- Reference:
  - https://stats.stackexchange.com/questions/140061/how-to-set-up-neural-network-to-output-ordinal-data
  - https://stackoverflow.com/questions/38375401/neural-network-ordinal-classification-for-age

### Data Preprocessing and Data Augmentation

- Như đã đề cập bên trên, nếu không có kiến thức chuyên môn sâu về các biểu hiện của bệnh lý thông qua ảnh võng mạc (fundus), ta khó lòng có thể xác định đúng tình trạng bệnh hiện tại của bệnh nhân. Trước khi tiến hành thực hiện training mô hình, ta cần thực hiện 1 số bước tiền xử lí chính mà mình nghĩ sẽ giúp mô hình có thể học tốt hơn:

1. Crop "chặt" ảnh: như 1 số ví dụ đã thấy bên trên, ta crop ảnh cho sát với viền của phần võng mạc, loại bỏ đi 1 phần background đen khá thừa thãi, và không giúp ích gì nhiều cho mô hình trong quá trình training sau này. Ví dụ:

    ![Imgur](https://i.imgur.com/FrAbeTV.png)
    
    ![Imgur](https://i.imgur.com/a3WEAz9.png)

```python
def crop_image_from_gray(img, tol=7):
    if img.ndim == 2:
        mask = img > tol
        return img[np.ix_(mask.any(1), mask.any(0))]
    elif img.ndim == 3:
        gray_img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        mask = gray_img > tol
        
        check_shape = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))].shape[0]
        if check_shape == 0: # image is too dark so that we crop out everything,
            return img # return original image
        else:
            img1 = img[:, :, 0][np.ix_(mask.any(1), mask.any(0))]
            img2 = img[:, :, 1][np.ix_(mask.any(1), mask.any(0))]
            img3 = img[:, :, 2][np.ix_(mask.any(1), mask.any(0))]
            img = np.stack([img1, img2, img3], axis=-1)
        return img
```

2. Tăng contract cho ảnh: hay tăng độ tương phản cho ảnh để làm nổi bật các chi tiết khó thấy bằng mắt thường như: các mạch máu, các vệt "mốc" màu xanh vàng hay các đốm đen xung quang viền võng mạc, ..Ví dụ:

    ![Imgur](https://i.imgur.com/a3WEAz9.png)
    
    ![Imgur](https://i.imgur.com/JHqAjJz.png)

```python
def make_cont(img_path, to_gray=False, IMG_SIZE=224):
    """
    Increase image contract
    """
    img = cv2.imread(img_path)
    if to_gray:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    else:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    cimg = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), IMG_SIZE / 10), -4, 128)
    return cimg
```

3. Data Augmentation: việc sử dụng data augmentation phải hết sức cẩn thận và phụ thuộc nhiều vào dạng dữ liệu. Đối với ảnh võng mạc, mình áp dụng 1 số các bước xử lí như:
    - Lật ngang
    - Lật dọc 
    - Xoay ảnh (mình không xoay quá nhiều, max chỉ tầm 15 độ)
    - Tăng tương phản
    - Tăng độ sáng

```python
from albumentations import (
    Compose, HorizontalFlip, CLAHE, HueSaturationValue,
    RandomBrightness, RandomContrast, RandomGamma,OneOf,
    ToFloat, ShiftScaleRotate,GridDistortion, ElasticTransform, JpegCompression, HueSaturationValue,
    RGBShift, RandomBrightness, RandomContrast, Blur, MotionBlur, MedianBlur, GaussNoise,CenterCrop,
    IAAAdditiveGaussianNoise,GaussNoise,Cutout, Rotate, VerticalFlip
)

AUGMENT_TRAIN = Compose([
    HorizontalFlip(p=0.5),
    Rotate(limit=15, border_mode=0, p=0.5),
    VerticalFlip(p=0.5),
    RandomContrast(limit=0.01, p=0.5),
    RandomBrightness(limit=0.01, p=0.5),
], p=0.5)
```

- Kết quả sau khi áp dụng 3 cách xử lí trên:

    ![Imgur](https://i.imgur.com/gSmwJGc.png)

- Reference: https://www.kaggle.com/ratthachat/aptos-updated-preprocessing-ben-s-cropping

- Có thể thấy rằng, sau khi thực hiện 1 số bước trên, các đường nét trên ảnh võng mạc được thể hiện rõ ràng hơn đáng kể, ta cũng dễ dàng hơn trong việc đoán nhận trạng thái của từng ảnh bằng mắt thường. Ví dụ:

    - Với class 4 (mức độ bệnh lý nặng nhất - H1C1, H1C4, H3C1): võng mạc xuất hiện nhiều các vệt "mốc" màu xanh nhạt hoặc vàng, kèm theo đó xuất hiện rải ráp các đốm đen xung quanh.
    - Class 2/3: mức độ thể hiện nhẹ hơn so với class 4 nhưng vẫn khá rõ ràng: H2C1, H2C4, H3C1, H3C3, ....)
    - Class 0/1: mức độ nhẹ nhất, võng mạc trông ít có các biểu hiện bất thường so với các class 2/3/4. Mức độ cũng không quá rõ ràng như hình H3C2.

### Metric Evaluation

- Cohen-Kappa metric: như đã đề cập bên dưới, vì dữ liệu ảnh võng mạc do nhiều bác sĩ đánh giá nên không thể không tránh khỏi sự không thống nhất giữa các ảnh được annotated. Việc sử dụng cohen-kappa trong competition này  ngoài việc phù hợp cho các bài toán imbalance data, mà còn là 1 tiêu chí để đánh giá khách quan hơn với tập dữ liệu được annotate 1 phần "không thống nhất", so với việc sử dụng các metric thông dụng khác như: f1-score hoặc roc-auc. Các bạn có thể đọc tham khảo qua 2 link sau, khá chi tiết và kèm ví dụ cụ thể rồi:

    - https://www.kaggle.com/aroraaman/quadratic-kappa-metric-explained-in-5-simple-steps
    - https://en.wikipedia.org/wiki/Cohen%27s_kappa

![](http://www.yoonsupchoi.com/wp-content/uploads/2017/08/google-ophthalmologists-.png)

- Về diabetic retinopathy detection cũng đã từng được đề cập tại Google IO, các bạn có thể tìm hiểu thêm tại link sau:

{@embed: https://www.youtube.com/watch?v=oOeZ7IgEN4o}

### Baseline model & Evaluation

- Mình sử dụng pre-trained resnet50 với top-layer đã được cắt bỏ. Còn tại sao lại lựa chọn resnet50 làm baseline model thì cũng không có lí do nào cụ thể :smiley: Mình thích thì mình dùng thôi =)) Các bạn có thể tham khảo thêm tại 1 discussion sau: https://www.kaggle.com/c/aptos2019-blindness-detection/discussion/99550#latest-574767

- Như đề cập bên trên, ta xử lí bài toán này dưới dạng odinary regression. Layer cuối của mạng CNN với activation function là sigmoid với 5 nodes, thay vì softmax như các bài toán image classification thông thường. Hàm loss sử dụng là binary cross-entropy, với optimizer là Adam. Kích thước ảnh mình sẽ resize về 224, kích thước mặc định của Resnet50, với imagenet pretrain model:

```python
resnet50 = ResNet50(
    weights='../input/resnet50/resnet50_weights_tf_dim_ordering_tf_kernels_notop.h5',
    include_top=False,
    input_shape=(224, 224, 3)
)

def build_model(head_model):
    model = Sequential()
    model.add(head_model)
    model.add(layers.GlobalAveragePooling2D())
    model.add(layers.Dropout(0.5))
    model.add(layers.Dense(5, activation='sigmoid'))
    
    return model
```

- Callbacks

```python
checkpoint = ModelCheckpoint("model_cps", monitor='val_loss', verbose=1, save_best_only=True, mode='min')
early = EarlyStopping(monitor="val_loss", mode="min", patience=5, verbose=1)
redonplat = ReduceLROnPlateau(monitor="val_loss", factor=0.5, mode="min", patience=3, verbose=2)
csv_logger = CSVLogger('log_training.csv', append=False, separator=',')
# kappa_metrics = KappaMetrics()

callbacks_list = [
    checkpoint,
    early,
    redonplat,
    csv_logger,
#     kappa_metrics
]
```

![Imgur](https://i.imgur.com/6Sn5HCC.png)

- Thực tế tập dữ liệu ~3700 ảnh không phải quá lớn nhưng ta cũng không nên load hết vào RAM, mặc dù đã resize về kích thước bé hơn nhiều so với ảnh gốc là 224px. Dưới đây, mình viết 1 class ImageDataGenerator để gen ảnh theo từng batch, train tới đâu load ảnh và thực hiện preprocess tới đó. Tuy thời gian training 1 epoch sẽ lâu hơn so với khi thực hiện load vào RAM nhưng sẽ tiện hơn nhiều khi xử lí với những tập dataset lớn hơn, hoặc bạn muốn thử nghiệm với 1 kích thước ảnh lớn hơn (512px chẳng hạn):

```python
class ImageDataGenerator(keras.utils.Sequence):
    def __init__(self,
                 train_fns,
                 labels,
                 augment=None,
                 batch_size=32,
                 img_size=224,
                 n_channels=3,
                 sigmaX=10,
                 normalize="normal",
                 add_mixup=False,
                 shuffle=False,
                 to_gray=False,
                 add_contrast=True,
                 add_crop=True,
                 return_label=True):
        self.batch_size = batch_size
        self.train_fns = train_fns
        self.labels = labels
        # fix-const
        self.img_indexes = range(len(self.train_fns))

        # metadata
        self.img_size = img_size
        self.n_channels = n_channels
        self.to_gray = to_gray
        if self.to_gray:
            self.n_channels = 1
        self.shuffle = shuffle
        self.normalize = normalize
        self.augment = augment
        self.return_label = return_label
        self.add_contrast = add_contrast
        self.add_crop = add_crop
        self.add_mixup = add_mixup
        
        # hyperparams
        self.sigmaX = sigmaX
        
        # last call
        self.on_epoch_end()

    def __len__(self):
        'Denotes the number of batches per epoch'
        return int(np.floor(len(self.train_fns) / self.batch_size))

    def __getitem__(self, index):
        'Generate one batch of data'
        # Generate indexes of the batch
        indexes = self.indexes[index * self.batch_size:(index + 1) * self.batch_size]

        # Find list of IDs
        temp_img_indexes = [self.img_indexes[index] for index in indexes]

        # Generate data
        if self.return_label:
            X, y = self.__data_generation(temp_img_indexes)
            return X, y
        else:
            X = self.__data_generation(temp_img_indexes)
            return X

    def on_epoch_end(self):
        'Updates indexes after each epoch'
        self.indexes = np.arange(len(self.train_fns))
        if self.shuffle:
            np.random.shuffle(self.indexes)

    def normalize_img(self, img):
        img = img.astype(np.float32)

        mean = np.mean(img)
        std = np.std(img)

        if std > 0:
            img = (img - mean) / std
        else:
            img = img * 0.
        return img
            
    def __data_generation(self, img_indexes):
        'Generates data containing batch_size samples' # X : (n_samples, *dim, n_channels)
        X = np.empty(
            (self.batch_size, self.img_size, self.img_size, self.n_channels),
            dtype=np.float32
        )
        y = np.empty((self.batch_size), dtype=int)

        # Generate data
        for index, img_index in enumerate(img_indexes):
            
            img = cv2.imread(self.train_fns[img_index])
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            if self.augment is not None:
                img = aug_img(self.augment, img)
            
            if self.add_crop:
                img = crop_image_from_gray(img)
            
            if self.to_gray:
                img = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
            img = cv2.resize(img, (self.img_size, self.img_size))

            if self.add_contrast:
                img = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), self.sigmaX), -4, 128)

            # normalize
            if self.normalize == "normal":
                img = img / 255
            elif self.normalize == "mean":
                img = self.normalize_img(img)

            img = img.astype(np.float32)

            if self.to_gray and len(img.shape) != 3:
                img = np.expand_dims(img, axis=-1)
            X[index, ] = img
            y[index] = self.labels[img_index]
        
        y = to_categorical(y, num_classes=5)
        
        for sub_y in y:
            index_1 = list(sub_y).index(1)
            for sub_index in range(index_1):
                sub_y[sub_index] = 1
        
        if self.return_label:
            return X, y
        else:
            return X
```

- Class label mình cũng chuyển từ one-hot sang multi-label (theo odinary regression), ví dụ: [0, 0, 1, 0, 0] --> [1, 1, 1, 0, 0]; [0, 0, 0, 0, 1] --> [1, 1, 1, 1, 1]

```python
for sub_y in y:
    index_1 = list(sub_y).index(1)
    for sub_index in range(index_1):
        sub_y[sub_index] = 1
```

Về cách viết data generator thì cũng có nhiều cách viết, mình thì recommend theo 1 tutorial của stanford: https://stanford.edu/~shervine/blog/keras-how-to-generate-data-on-the-fly

- Train-test-split:

```python
X_train_ids, X_val_ids, y_train_labels, y_val_labels = train_test_split(
    img_ids, labels, stratify=labels, test_size=0.2, random_state=42
)
```

- Thêm f1-score metric:

```python
from tensorflow.keras import backend as K

def f1(y_true, y_pred):
    def recall(y_true, y_pred):

        true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
        possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
        recall = true_positives / (possible_positives + K.epsilon())
        return recall

    def precision(y_true, y_pred):

        true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
        predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
        precision = true_positives / (predicted_positives + K.epsilon())
        return precision
    precision = precision(y_true, y_pred)
    recall = recall(y_true, y_pred)
    return 2*((precision*recall)/(precision+recall+K.epsilon()))
```

- Thêm class_weight cho model để đánh trọng số cao hơn cho các class ít samples:

```python
from sklearn.utils import class_weight

class_weight_ = class_weight.compute_class_weight('balanced',
                                                 np.unique(y_train_labels),
                                                 y_train_labels)
```

- Data generator:

```python
IMG_SIZE = 224
BATCH_SIZE = 16
N_CHANNELS = 3

train_gen = ImageDataGenerator(
    X_train_fns, y_train_labels, n_channels=N_CHANNELS, img_size=IMG_SIZE, batch_size=BATCH_SIZE, normalize="normal",
    add_contrast=True, to_gray=False, shuffle=False, add_crop=True, augment=AUGMENT_TRAIN
)
val_gen = ImageDataGenerator(
    X_val_fns, y_val_labels, n_channels=N_CHANNELS, img_size=IMG_SIZE, batch_size=BATCH_SIZE, normalize="normal",
    add_contrast=True, to_gray=False, shuffle=False, add_crop=True, augment=None
)
```

- Custom model cuối cùng với khoảng 23M parameters, mình sẽ thực hiện fine-tune lại toàn bộ mạng vì thực tế, tính chất của 2 tập dữ liệu là khá khác nhau (imagenet & fundus image). Nhưng trước đó mình sẽ thực hiện "warm-up", freeze gần như toàn bộ các layer, chỉ thực hiện training với 1 số layer mới vừa được thêm vào, khoảng tầm từ 1->2 epochs. Rồi sau đó un-freeze và thực hiện fine-tune trên toàn bộ mô hình, learning rate cũng đc set nhỏ lại

```python
# warm up model
for layer in model.layers:
    layer.trainable = False

for i in range(-3, 0):
    model.layers[i].trainable = True

model.compile(
    loss='binary_crossentropy',
    optimizer=Adam(lr=0.01),
    metrics=['accuracy', f1]
)

history = model.fit_generator(
    train_gen,
    steps_per_epoch=len(train_gen),
    epochs=1,
    validation_data=val_gen,
    validation_steps=len(val_gen),
    callbacks=callbacks_list,
    class_weight=class_weight_
)
```

- Fit model:

```python
for layer in model.layers:
    layer.trainable = True

model.compile(
    loss='binary_crossentropy',
    optimizer=Adam(lr=0.0001),
    metrics=['accuracy', f1]
)

history = model.fit_generator(
    train_gen,
    steps_per_epoch=len(train_gen),
    epochs=10,
    validation_data=val_gen,
    validation_steps=len(val_gen),
    callbacks=callbacks_list,
    class_weight=class_weight_
)
```

- Thực hiện predict trên tập validation:

```python
def process_img(fn_path, img_size=512):
    img = cv2.imread(fn_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = crop_image_from_gray(img)
    img = cv2.resize(img, (img_size, img_size))
    img = cv2.addWeighted(img, 4, cv2.GaussianBlur(img, (0, 0), 10), -4, 128)
    img = img / 255
    
    return img

y_pred_val = []
for val_path in tqdm_notebook(X_val_fns):
    p_img = process_img(val_path)
    sub_y_pred = model.predict(np.expand_dims(p_img, axis=0))
    sub_y_pred = sub_y_pred > 0.50
    sub_y_pred = sub_y_pred.astype(int).sum(axis=1) - 1
    y_pred_val.append(sub_y_pred[0])

gc.collect()
```

### Result

- Training model với 10 epochs, img_size = (224, 224, 3), batch_size = 16:

    - Acc, f1-score:

    ```python
    loss: 0.0698 - acc: 0.9733 - f1: 0.9706 - val_loss: 0.1470 - val_acc: 0.9533 - val_f1: 0.9462
    ```

    - Confusion matrix:

    ![Imgur](https://i.imgur.com/HF2XB8V.png)

    - Cohen-kappa:

    ![Imgur](https://i.imgur.com/r93PIq1.png)

    - Kết quả trên public leaderboard hiện tại là: 0.73.7 (cohen-kappa)

### Conclusion

- Trên đây là baseline solution mình áp dụng cho competition hiện tại. Các bạn hoàn toàn có thể cải thiện kết quả bằng 1 số cách sau:
    - __Tiền xử lí dữ liệu__: thực tế đây là công đoạn quan trọng nhất khi bạn làm bất kì 1 bài toán nào. Bên trên mình có tiền xử lí bằng cách crop "chặt" ảnh và tăng constract. Các bạn hoàn toàn có thể thử thay đổi các thông số hoặc tiền xử lí theo 1 cách khác hợp lí hơn, ví dụ như thêm padding vào ảnh thay vì resize trực tiếp về hình vuông như mình hiện tại, ...
    - Thử với 1 kích thước ảnh lớn hơn.
    - Re-sampling data: Under-sampling hoặc Over-sampling.
    - Data Augmentation: tiến hành synthesis hay tổng hợp thêm dữ liệu dưới nhiều điều kiện khác nhau như: tăng độ sáng tối của ảnh, thêm blur, tăng constact, lật ảnh trái phải, xoay ảnh, ... Tuy nhiên, cần phải đặc biệt chú ý khi thực hiện bước này, cần phải thử trước để xác định các thông số augmentation 1 cách vừa phải nhất, tránh mất mát quá nhiều thông tin. Thư viện mình khuyên dùng là: [albumentation](https://github.com/albu/albumentations) - gần đây được sử dụng thường xuyên hơn so với imgaug, dễ dùng hơn (human-api for data augmentation :) ), và được xây dựng bởi 1 trong các grand-master trên kaggle.
    - 1 kĩ thuật khác cũng liên quan tới data-augmentation, nhưng không phải dưới dạng Spatial-level transform như 1 số các cách augment phổ biến như: rotate, crop, horizontal-flip, vertical-flip, affine, ... mà dưới dạng Pixel-level transforms là mix-up data augmentation. Về cơ bản kĩ thuật mix-up giúp mô hình có khả năng tổng quát hóa hơn (generalization) trên tập dữ liệu và hoàn toàn có thể áp dụng lên những dạng dữ liệu non-image data như: tabular data hay có thể áp dụng vào các kiến trúc DL khác như GAN (Generative Adversarial Network). Chi tiết bạn đọc có thể tham khảo thêm tại các link sau:
        - https://www.dlology.com/blog/how-to-do-mixup-training-from-image-files-in-keras/
        - https://arxiv.org/pdf/1710.09412.pdf
        - https://github.com/yu4u/mixup-generator
        - https://www.inference.vc/mixup-data-dependent-data-augmentation/
        - https://forums.fast.ai/t/mixup-data-augmentation/22764 [Highly recommend]
     - Cross-validation
     - Loss function: Focal loss, ...
    - Model?! Các bạn có thể thử nghiệm với các pre-train model phổ biến hoặc có thể tham khảo Grad-Cam model tại 1 kernel sau: https://www.kaggle.com/ratthachat/aptos-updated-albumentation-meets-grad-cam . Hoặc thậm chí thử nghiệm với Efficient-Net: https://www.kaggle.com/chanhu/eye-efficientnet-pytorch-lb-0-777 , 1 mô hình mới được ra mắt gần đây: https://arxiv.org/abs/1905.11946
    - TTA: 1 kĩ thuật post-processing thường được sử dụng bởi các kaggler. Nhìn chung bạn thực hiện data augmentation trên 1 ảnh test rồi predict trên dữ liệu đó, sau đó thực hiện major voting để predict ra class cuối cùng của ảnh đó. Nhìn chung, kĩ thuật này có thể khiến cho điểm số của bạn tăng lên 1 chút nhưng cũng đủ để tăng kha khá rank trên leaderboard rồi :/
        - https://machinelearningmastery.com/how-to-use-test-time-augmentation-to-improve-model-performance-for-image-classification/
    - Ensemble model: cái này thì muôn hình vạn trạng, về kĩ thuật ensemble thì cũng khá nhiều, cái này chắc mình sẽ không đề cập quá sâu.
    - Sử dụng thêm dữ liệu hoặc pre-trained model từ 1 competition tương tự trên kaggle - 35000 ảnh (điều này hoàn toàn hợp lệ trong competition lần này): https://www.kaggle.com/c/diabetic-retinopathy-detection.

    - ...

 - 1 điều hạn chế là khi thực hiện submit file csv sẽ phải chờ khá lâu vì sẽ phải chạy lại kernel đó thêm 1 lần nữa, tuy nhiên bạn có thể tạo 1 kernel khác để inference, load lại pre-trained model để predict.

 - Trên đây là bài chia sẻ của mình về 1 competition vẫn đang diễn ra trên kaggle: Diabetic Retinopathy Detection. Tới thời điểm hiện tại mình viết bài là còn khoảng 3 tháng nữa cuộc thi mới kết thúc, hi vọng có thể giúp ích cho các bạn với các kiến thức mình có đề cập trong bài. Cá nhân mình thấy khi tham gia các competition trên kaggle học hỏi được khá nhiều thứ thú vị, biết được các kiến thức mới, làm các bài toán mình chưa có cơ hội tiếp cận nhiều, đọc và học cách viết code qua các bài tutorial về EDA hay xây dựng pipeline model, ... Nói chung là have fun, cũng không nên quá đặt nặng vấn đề lấy top leaderboard nhiều quá =)) :smiley:

- Cảm ơn các bạn đã đọc bài viết, nhiều có bất kì sai sót hoặc thắc mắc nào, các bạn vui lòng comment bên dưới hoặc gửi về địa chỉ: hoangphan0710@gmail.com. Hẹn gặp lại trong các bài blog sắp tới! :smile:

### Reference

- Imbalance data: https://www.jeremyjordan.me/imbalanced-data/

- https://ai.googleblog.com/2016/11/deep-learning-for-detection-of-diabetic.html

- https://ai.googleblog.com/2018/12/improving-effectiveness-of-diabetic.html

- https://ai.google/healthcare/

- https://www.healthcareitnews.com/news/google-verily-using-ai-screen-diabetic-retinopathy-india 

- :smiley_cat: :smiley_cat: :smiley_cat: **Topdev** hay **Techtalk** có lấy bài của mình hay bất cứ bài blog nào trên viblo thì cũng nên ghi nguồn cho tử tế và chuyên nghiệp hơn nhé :smiley_cat: :smiley_cat: :smiley_cat: