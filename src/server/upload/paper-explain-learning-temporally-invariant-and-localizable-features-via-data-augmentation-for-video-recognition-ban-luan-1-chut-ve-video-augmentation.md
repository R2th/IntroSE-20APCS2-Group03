Tiếp tục series Paper Explain đang dang dở về topic Action Recognition, trong bài viết này, mình muốn bàn một chút về data: **Data Augmentation**. 

Chắc mọi người cũng đã biết rồi, bên cạnh một model tốt, thứ ảnh hưởng trực tiếp đến kết quả đầu ra, đó là chất lượng của dữ liệu. Việc xây dựng được một bộ dữ liệu sạch, số lượng lớn, tính tổng quát cao đôi khi improve còn tốt hơn việc sử dụng những model hầm hố trên những bộ dữ liệu kém. Với những bộ dữ liệu nhỏ, data augmentation chính là keyword cần phải quan tâm.

Nếu như các bài toán image classification hay object detection vốn đã được sử dụng rất nhiều phương pháp augment khác nhau, action recognition lại rất ít nghiên cứu bàn về vấn đề này. Paper mình muốn phân tích hôm nay là một số ít hiếm hoi đề cập đến việc augment cho video, đặc biệt là về temporal augmentation (mặc dù hơi outdate - từ 2020). 

***Note: Bài này sẽ nhiều code và hình minh họa thay vì nhiều lí thuyết + công thức như bài phân tích trước.***

![imgur](https://i.imgur.com/qfXANBg.png)
# 1. Tổng quan
Đầu tiên, để lại thông tin liên quan trước:
- paper: Learning Temporally Invariant and Localizable Features via Data Augmentation for Video Recognition
- link: https://arxiv.org/pdf/2008.05721.pdf (ECCV Workshop 2020)
- github: https://github.com/taeoh-kim/temporal_data_augmentation

Để mọi người dễ theo dõi, mình sẽ tóm tắt lại một lượt về các kĩ thuật augmentation thường được sử dụng trong các bài toán Computer Vison thông thường. 
- **In-network Augmentation**: Đây là các kĩ thuật tập trung vào thiết kế các kiến trúc mạng, để áp dụng augmentation ở mức feature trong quá trình training. Việc này làm giảm predictive variance, đồng thời giúp mô hình học được những high-level augmented thay vì những low-level augmentation. Những kĩ thuật này còn được biết đến là kĩ thuật regularization.
    - Dropout
    - DropBlock
    - DropBlock
    - Shake-Shake
    - ShakeDrop
    - Random Mean Scaling
- **Data-level Augmentation**: Đây là các kĩ thuật tập trung vào việc biến đối data đầu vào (ở đây là image), làm tăng độ đa dạng và tổng quát của dữ liệu, từ đó giúp mô hình tập trung vào các feature bất biến trong dữ liệu (invariant features). Ta có thể tiếp tục chia nhỏ các phương pháp này tiếp thành 3 nhóm nhỏ hơn: 
    - Geometric Transformation: cropping, flipping, rotating, shearing, translating, ...
    - Photometric Transformation: brightness, contrast, color, ...
    -  Localizable features Augmentation: (thường áp dụng các task liên quan đến localization của đối tượng, ví dụ như object detection): CutOut, Hide-and-Seek, ...

    Ngoài ra, những phương pháp kết hợp nhiều kĩ thuật augment khác nhau, với một hệ số ngẫu nhiên cũng đem lại những cải thiện đáng kể: RandAugment, AugMix, ...
- **Data-level Mixing**: Cùng với augmentation trên 1 sample, các chiến lược augment sử dụng nhiều sample hơn cũng được nghiên cứu và áp dụng, phổ biến nhất là trên các tác vụ object detection. 
    - MixUp: tiến hành blend 2 hình ảnh bất kì để tạo ra 1 ảnh mới, với label mới được nội suy từ label của 2 ảnh
    - CutMix: Kết hợp ý tưởng của CutOut và MixUp, tiến hành thay thế vùng bị xóa trong hình ảnh của CutOut bằng 1 bản vá từ hình ảnh khác.
    - CutBlur: Lấy cảm hứng từ CutMix, tiến hành cut-and-paste giữa ảnh có độ phân giải thấp và ảnh có độ phân giải cao.
    - CutMixUp: Kết hợp từ CutMix và MixUp
    - Attribute Mix
    - Attentive CutMix
    - Smoothmix

Mặc dù nhiều phương pháp augment dữ liệu, bao gồm deleting, blending, cut-and-pasting, ... đã tăng cường thành công nhiều tập dữ liệu hình ảnh, việc áp dụng những phương pháp này cho action recognition chưa thật sự hiệu quả. Nhóm tác giả paper nhận định, để áp dụng tốt trên video, các phương pháp augment cần có khả năng mô hình hóa được **temporally invariant** và **temporal localizable features**. 

Từ đây, paper đề xuất các phiên bản cải tiến của những phương pháp augment hiện tại, tập trung hơn vào yếu tố thời gian, cái mà chúng ta sẽ bàn sâu hơn trong phần sau của bài viết.
# 2. Temporal Data Augmentations
Đề xuất đầu tiên của paper là RandAugment-T (một phiên bản cải tiến của RandAugment)

Khi áp dụng vào video, RandAugment thường áp dụng các augment giống nhau cho mọi khung hình của video, tuy nhiên, điều này hạn chế khả năng mô hình hóa temporal perturbation. RandAugment-T, cải tiến hơn, tiến hành nội suy tuyến tính giữa mức độ augment từ khung hình đầu tiên đến khung hình cuối cùng, từ đó tạo sự biến đổi trong suốt video. 

Dưới đây là mã giả của RandAugment-T
```python
def randaugment_T(X, N, M1, M2):
    """Generate a set of distortions.
    Args:
    X: Input video (T x H x W)
    N: Number of augmentation transformations
    to apply sequentially.
    M1, M2: Magnitudes for both temporal ends.
    """
    ops = np.random.choice(transforms, N)
    M = np.linspace(M1, M2, T)
    return [[op(X, M[t]) for t in range(T)]
    for op in ops]
```
Trong đó, **transform** ở đây bao gồm 1 list các data-level augmentation bao gồm cả Geometric Transformation và Photometric Transformation. Để dễ hình dung nhất, mình sẽ implement lại code + có visualization cụ thể cho từng phương pháp.
```python
# Đầu tiên, import những thư viện cần thiết
import cv2
import copy
import random
import numpy as np
from PIL import Image, ImageOps, ImageEnhance
```
Chúng ta sẽ bắt đầu với 1 video sample trong tập dataset của BKAI-NAVER Challenge làm ví dụ. 

![](https://images.viblo.asia/5982127e-787d-4777-8df1-bb6999fc0fb8.gif)

```python
def temporal_interpolate(v_list, t, n):
    if len(v_list) == 1:
        return v_list[0]
    elif len(v_list) == 2:
        return v_list[0] + (v_list[1] - v_list[0]) * t / n
    else:
        NotImplementedError('Invalid degree')
```
- Geometric Transformation
    - **Shear X**

        ```python
        def shear_x(imgs, v_list=[-0.3, 0.3]):
            for v in v_list:
                assert -0.3 <= v <= 0.3
            if random.random() > 0.5:
                v_list = [-v for v in v_list]

            out = [img.transform(img.size, Image.AFFINE, (1, temporal_interpolate(v_list, t, len(imgs) - 1), 0, 0, 1, 0)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/b7b77a37-6b90-4d5a-b4dd-8780bc17acb1.gif)

    - **Shear Y**

        ```python
        def shear_y(imgs, v_list=[-0.3, 0.3]):
            for v in v_list:
                assert -0.3 <= v <= 0.3
            if random.random() > 0.5:
                v_list = [-v for v in v_list]

            out = [img.transform(img.size, Image.AFFINE, (1, 0, 0, temporal_interpolate(v_list, t, len(imgs) - 1), 1, 0)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/8a3c55c3-2b30-4054-bba2-3f716f045329.gif)

    - **Translate X**

        ```python
        def translate_x(imgs, v_list=[-80, 80]):  # [-150, 150] => percentage: [-0.45, 0.45]
            for v in v_list:
                assert -150 <= v <=150
            if random.random() > 0.5:
                v_list = [-v for v in v_list]

            out = [img.transform(img.size, Image.AFFINE, (1, 0, temporal_interpolate(v_list, t, len(imgs) - 1), 0, 1, 0)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/72f29358-80b4-44d8-ab90-ad70ddbfe674.gif)

    - **Translate Y**

        ```python
        def translate_y(imgs, v_list=[-50, 50]):  # [-150, 150] => percentage: [-0.45, 0.45]
                for v in v_list:
                    assert -150 <= v <=150
                if random.random() > 0.5:
                    v_list = [-v for v in v_list]

                out = [img.transform(img.size, Image.AFFINE, (1, 0, 0, 0, 1, temporal_interpolate(v_list, t, len(imgs) - 1))) for t, img in enumerate(imgs)]
                return out
        ```

        ![](https://images.viblo.asia/79517a17-c900-4a1f-8c91-8c565731374b.gif)

    - **Rotate**

```python
def rotate(imgs, v_list=[-30, 30]):  # [-30, 30]
    for v in v_list:
        assert -30 <= v <= 30
    if random.random() > 0.5:
        v_list = [-v for v in v_list]

    out = [img.rotate(temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
    return out
```

![](https://images.viblo.asia/2bd1d754-8d73-4126-bc55-33063e5c8d1f.gif)

- Photometric Transformation
    - **Solarize**

        ```python
        def solarize(imgs, v_list=[128, 256]):  # [0, 256]
            for v in v_list:
                assert 0 <= v <= 256

            out = [ImageOps.solarize(img, temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/777f3353-85f8-4c3d-9a24-d7c6af375fe8.gif)

    - **Color**

        ```python
        def color(imgs, v_list=[0.1,1.9]):  # [0.1,1.9]
            for v in v_list:
                assert 0.1 <= v <= 1.9

            out = [ImageEnhance.Color(img).enhance(temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/19207309-764d-46ee-835d-a1e3795295fb.gif)

    - **Posterize**

        ```python
        def posterize(imgs, v_list=[4, 8]):  # [4, 8]
            v_list = [max(1, int(v)) for v in v_list]

            out = [ImageOps.posterize(img, int(temporal_interpolate(v_list, t, len(imgs) - 1))) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/b027d5d9-09e2-4109-a721-fb0390575e23.gif)

    - **Contrast** 

        ```python
        def contrast(imgs, v_list=[0.1,1.9]):  # [0.1,1.9]
            for v in v_list:
                assert 0.1 <= v <= 1.9

            out = [ImageEnhance.Contrast(img).enhance(temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/99cd1999-6210-4f69-9bdd-548959f7b34d.gif)

    - **Brightness** 

        ```python
        def brightness(imgs, v_list=[0.1,1.9]):  # [0.1,1.9]
            for v in v_list:
                assert 0.1 <= v <= 1.9

            out = [ImageEnhance.Brightness(img).enhance(temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/cc50ad3a-c783-4c45-9706-4fa5195b8ef2.gif)

    - **Sharpness**

        ```python
        def sharpness(imgs, v_list=[0.1,1.9]):  # [0.1,1.9]
            for v in v_list:
                assert 0.1 <= v <= 1.9

            out = [ImageEnhance.Sharpness(img).enhance(temporal_interpolate(v_list, t, len(imgs) - 1)) for t, img in enumerate(imgs)]
            return out
        ```

        ![](https://images.viblo.asia/7917384f-8ebd-42ac-be55-129963de369f.gif)

# 3. Temporal Deleting, Blending, Cut-and-Pasting
Paper cũng đồng thời đề xuất các biến thể của data-level Mixing, tập trung vào temporal localizable features, chủ yếu liên quan đến việc transform giữa các frame. 

Do data-level Mixing tiến hành augment dựa trên nhiều sample, ở đây, mình sẽ dùng thêm 1 video nữa để lấy ví dụ minh họa: 

![](https://images.viblo.asia/ce06781b-72a4-4971-9457-0a9f4bdc0982.gif)

```python
def rand_bbox(imgs, lam, type):
    T = len(imgs)
    H, W = imgs[0].size

    if type in ['cutmix', 'cutmixup']:
        cut_rat = np.sqrt(1. - lam)
        cut_w = np.int32(W * cut_rat)
        cut_h = np.int32(H * cut_rat)

        cx = np.random.randint(W)
        cy = np.random.randint(H)

        bbt1 = 0
        bbx1 = np.clip(cx - cut_w // 2, 0, W)
        bby1 = np.clip(cy - cut_h // 2, 0, H)
        bbt2 = T
        bbx2 = np.clip(cx + cut_w // 2, 0, W)
        bby2 = np.clip(cy + cut_h // 2, 0, H)
    elif type in ['framemix', 'framemixup']:
        cut_rat = 1. - lam
        cut_t = np.int32(T * cut_rat)

        ct = np.random.randint(T)

        bbt1 = np.clip(ct - cut_t // 2, 0, T)
        bbx1 = 0
        bby1 = 0
        bbt2 = np.clip(ct + cut_t // 2, 0, T)
        bbx2 = W
        bby2 = H
    else: # spatio-temporal, cubemix
        cut_rat = np.power(1. - lam, 1./3.)
        cut_t = np.int32(T * cut_rat)
        cut_w = np.int32(W * cut_rat)
        cut_h = np.int32(H * cut_rat)

        ct = np.random.randint(T)
        cx = np.random.randint(W)
        cy = np.random.randint(H)

        bbt1 = np.clip(ct - cut_t // 2, 0, T)
        bbx1 = np.clip(cx - cut_w // 2, 0, W)
        bby1 = np.clip(cy - cut_h // 2, 0, H)
        bbt2 = np.clip(ct + cut_t // 2, 0, T)
        bbx2 = np.clip(cx + cut_w // 2, 0, W)
        bby2 = np.clip(cy + cut_h // 2, 0, H)

    return bbt1, bbx1, bby1, bbt2, bbx2, bby2
```

(Ở đây do code CutOut và CutMix là tương tự nhau, nên chúng ta sẽ bỏ qua các phần liên quan đến CutOut)
- **CutMix**

    ```python
    def cut_mix(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='cutmix')
        for t in range(bbt1, bbt2):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
            new_imgs[t] = Image.fromarray(img)
        return new_imgs
    ```

    ![](https://images.viblo.asia/83d6ea3e-7725-4eb3-bc2d-945bcfb7f915.gif)

- **FrameMix**

    ```python
    def frame_mix(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='framemix')
        for t in range(bbt1, bbt2):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
            new_imgs[t] = Image.fromarray(img)
        return new_imgs
    ```

    ![](https://images.viblo.asia/0f5f4470-df6f-498a-8dca-3c2fc55cd357.gif)

- **CubeMix**

    ```python
    def cube_mix(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='cubemix')
        for t in range(bbt1, bbt2):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
            new_imgs[t] = Image.fromarray(img)
        return new_imgs
    ```

    ![](https://images.viblo.asia/9dc19a93-beac-41d4-be34-91ec5acc24b9.gif)

- **MixUp**

    ```python
    def mixup(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        lam = np.random.beta(beta, beta)
        for t in range(len(imgs)):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            new_img = img * lam + replace_img * (1. - lam)
            new_imgs[t] = Image.fromarray(new_img.astype(np.uint8))
        return new_imgs
    ```

    ![](https://images.viblo.asia/af08cc96-8abe-4a7b-af0b-4303b65e0f3c.gif)

- **FrameMixUp**

    ```python
    def frame_mixup(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        # Sample Mixing Coordinates
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='framemixup')
        # adjust lambda to exactly match pixel ratio
        T = len(imgs)
        H, W = imgs[0].size
        lam = 1 - ((bbt2 - bbt1) * (bbx2 - bbx1) * (bby2 - bby1) / (T * H * W))
        lamt = np.random.beta(2.0, 2.0)
        for t in range(len(imgs)):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            new_img = img * lamt + replace_img * (1. - lamt)
            fr = np.random.rand(1)
            if fr < 0.5:  # Basic MixUp, 0.5 Prob FrameMixUp
                if lamt >= 0.5:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam
                else:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam + (1 - lam)
            new_imgs[t] = Image.fromarray(new_img.astype(np.uint8))
        return new_imgs
    ```

    ![](https://images.viblo.asia/021e4476-3a69-42a2-902c-63a345d93213.gif)

- **CubeMixUp**

    ```python
    def cube_mixup(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        # Sample Mixing Coordinates
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='cubemixup')
        # adjust lambda to exactly match pixel ratio
        T = len(imgs)
        H, W = imgs[0].size
        lam = 1 - ((bbt2 - bbt1) * (bbx2 - bbx1) * (bby2 - bby1) / (T * H * W))
        lamt = np.random.beta(2.0, 2.0)
        for t in range(len(imgs)):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            new_img = img * lamt + replace_img * (1. - lamt)
            fr = np.random.rand(1)
            if fr < 0.5:  # Basic MixUp, 0.5 Prob FrameMixUp
                if lamt >= 0.5:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam
                else:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam + (1 - lam)
            new_imgs[t] = Image.fromarray(new_img.astype(np.uint8))
        return new_imgs
    ```

    ![](https://images.viblo.asia/1a81b960-be56-43ef-9d08-11868942e65a.gif)

- **CutMixUp**

    ```python
    def cut_mixup(imgs, replace_imgs, beta=1.0):
        new_imgs = copy.deepcopy(imgs)
        # Sample Mixing Coordinates
        lam = np.random.beta(beta, beta)
        bbt1, bbx1, bby1, bbt2, bbx2, bby2 = rand_bbox(imgs, lam, type='cutmixup')
        # adjust lambda to exactly match pixel ratio
        T = len(imgs)
        H, W = imgs[0].size
        lam = 1 - ((bbt2 - bbt1) * (bbx2 - bbx1) * (bby2 - bby1) / (T * H * W))
        lamt = np.random.beta(2.0, 2.0)
        for t in range(len(imgs)):
            img = np.array(imgs[t])
            replace_img = np.array(replace_imgs[t])
            new_img = img * lamt + replace_img * (1. - lamt)
            fr = np.random.rand(1)
            if fr < 0.5:  # Basic MixUp, 0.5 Prob FrameMixUp
                if lamt >= 0.5:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = replace_img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam
                else:
                    if bbt1 <= t < bbt2:
                        new_img[bby1:bby2, bbx1:bbx2, :] = img[bby1:bby2, bbx1:bbx2, :]
                    lam = lamt * lam + (1 - lam)
            new_imgs[t] = Image.fromarray(new_img.astype(np.uint8))
        return new_imgs
    ```

    ![](https://images.viblo.asia/55780c86-be5e-4e73-954f-ee5a0b40752a.gif)

- **FadeMixUp**

```python
def fade_mixup(imgs, replace_imgs, beta=1.0):
    new_imgs = copy.deepcopy(imgs)
    lam = np.random.beta(beta, beta)
    adj = np.random.choice([-1, 1]) * np.random.uniform(0, min(lam, 1.0 - lam))
    fade = np.linspace(lam - adj, lam + adj, num=len(imgs))
    for t in range(len(imgs)):
        img = np.array(imgs[t])
        replace_img = np.array(replace_imgs[t])
        new_img = img * fade[t] + replace_img * (1. - fade[t])
        new_imgs[t] = Image.fromarray(new_img.astype(np.uint8))
    return new_imgs
```

![](https://images.viblo.asia/271de9a6-156e-4c5d-9e7d-3cf364a37032.gif)

# 4. Kết luận
Cá nhân mình thì mình thấy bài viết này không mang đúng tính chất của "Explain Paper" lắm :D Cơ mà không sao, với dữ liệu, cách mô tả dễ hiểu nhất là visualize, đặc biệt trong trường hợp của paper này - giới thiệu các phương pháp augment data. Hi vọng cách tiếp cận này sẽ giúp các bạn có hứng thú hơn với nội dung paper (vì thật sự ý tưởng của paper cũng khá đơn giản). 

Nếu thấy hay, đừng quên upvote + share bài viết để tiếp thêm động lực cho mình. Chúc mọi người một ngày làm việc và học tập hiệu quả. Seeya 👋