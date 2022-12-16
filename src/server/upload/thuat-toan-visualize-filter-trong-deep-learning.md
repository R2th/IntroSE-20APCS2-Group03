# Thuật toán Visualize Filter trong Deep learning.

<div align="center"> <img src="https://i.imgur.com/wc3Ol0W.png"> </div>
Khi làm việc với các nnet, ta biết rằng mỗi layer với các filter có khả năng nhận dạng từng loại đặc trưng trong input. Càng về các layer cuối, thông tin mà nnet thu được từ input sẽ được trìu tượng hóa cao hơn (hay nhận diện được các feature phức tạp hơn). Tuy nhiên làm thế nào để biết được từng filter nhận diện loại feature nào tương ứng với nó ?  Hôm nay, mình sẽ viết về thuật toán Visualize Filter để giải quyết vấn đề đó. Hơn nữa, đây cũng là thuật toán cơ sở, tiền đề cho các thuật toán cao cấp hơn như Style Transfer, Deep Dream ...(các thuật toán liên quan tới biến đổi ảnh đầu vào).

Link github: [https://github.com/trungthanhnguyen0502/Visualize-filter-deepnet](https://github.com/trungthanhnguyen0502/Visualize-filter-deepnet)


## 1.Thuật toán:

<div align="center"><img src="https://i.imgur.com/7kpjK05.png"></div>

Thuật toán khá đơn giản (như hình):
+ Tạo một input image bất kì (random noise).
+ Xác định feature_map tương ứng với  filter cần Visualize.
+ feed input vào Net.
+ Tính đạo hàm feature_map theo input
+ update input theo đạo hàm đó. (để maximum feature_map thì update với phép cộng)

Ok, tiến hành code thôi

## 2.Cài đặt

Mình sẽ dùng 1 phiên bản pretrain VGG16 để minh họa thuật toán. Sau khi hiểu thuật toán, mọi người hoàn toàn có thể dùng 1 pretrain CNN bất kì khác (tensorflow hoặc keras).

Để dùng được phiên bản VGG này, mọi người chỉ cần vào link github và download code của mình về,
Project gồm: 
+ vgg16.py:     chứa code và các hàm liên quan tới vgg16
+ download.py:  để auto download vgg16.
+ main.ipynb : Toàn bộ code của thuật toán (thứ cần đọc).

## 3. Code


<strong>Load và tạo model</strong>:
~~~
vgg16.maybe_download()
vgg = vgg16.VGG16()
~~~

<strong>Image Process Function.</strong>

~~~ python
def normalize_image(x):
    x_min = x.min()
    x_max = x.max()
    x_norm = (x - x_min) / (x_max - x_min)
    return x_norm

def plot_image(image):
    img_norm = normalize_image(image)
    plt.figure(figsize=(4,4))
    plt.axis('off')
    plt.imshow(img_norm, interpolation='nearest')
    plt.show()
    
def plot_images(images):
    (m, n) = (len(images)//3, 3)
    fig, axs = plt.subplots(m, n, figsize=(12,8))
    for i, img in enumerate(images):
        ax = axs[i//3, i% 3]
        img = normalize_image(img)
        ax.imshow(img, interpolation='nearest')
        ax.set_xticks([])
        ax.set_yticks([])
    plt.show() 
~~~

loss function hay tính cost theo 1 feature_map (input bao gồm layer_id và feature_id):
~~~python
def cost(model, layer_id, feature_id):
    with model.graph.as_default():
        layer = model.get_layer_tensors([layer_id])[0]
        feature_map = layer[:,:,:,feature_id]
        loss = tf.reduce_mean(feature_map)
        return loss
~~~

<strong>Visualize</strong>: tính đạo hàm và update input:
+ Tensorflow cung cấp tf.gradient(loss, tensor) để tính gradient 1 biến (tensor) theo 1 loss 
+ Mính sử dụng thuật toán optimize đơn giản, learning rate: 
$lrate = \frac{stepsize}{(gradient.max() + 1e-8)}$


Trong đó:
+ 1e-8: số cực đảm bảo mẫu số != 0
+ step_size là 1 giá trị cho trước
+ gradient.max() --> giá trị update của 1 pixel: update_value_pixel[x,y,z] <= step_size* gradient_value[x,y,z]  (gradient_value tương ứng pixel) . Ngoài gradient.max(), ta có thể dùng gradient.std()

~~~python
def visual(model, layer_id, feature_id, iters,step_size = 0.5):
    print(feature_id)
    random_image = np.random.uniform(size=(224,224,3)) + 128.0
    with model.graph.as_default():
        loss = cost(vgg,layer_id,feature_id)
        gradient = tf.gradients(loss, model.input)
        
        feed_dict = vgg.create_feed_dict(image=random_image)

        session = tf.Session(graph=vgg.graph)
        init = tf.global_variables_initializer()
        session.run(init)
        run_list = [gradient, loss]
        for i in range(iters):
            grad_val, loss_val = session.run(run_list, feed_dict=feed_dict)
            grad_val = np.array(grad_val).squeeze()
            learning_rate = step_size/(grad_val.max() + 1e-8)
            random_image += learning_rate * grad_val
        return random_image
~~~

Run code demo:
~~~python
images = []
feature_ids = [0,1,2,3,4,5]
layer_id = 5
for f_id in feature_ids:
    img = visual(vgg, layer_id, f_id, 150, 2)
    images.append(img)
plot_images(images)
~~~ 

Kết quả thu được:
<img src="https://i.imgur.com/UoDJG3o.png">