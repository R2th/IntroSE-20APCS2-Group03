*Bài viết này hướng dẫn cho bạn cách export một pre-trained Keras model và sử dụng model đó trực tiếp trên browser với thư viện JS tên là [Keras.js](https://github.com/transcranial/keras-js). Trước khi đọc tiếp bài, bạn nên chắc chắn model của bạn đã được train với Keras phiên bản 2.1.2.*

# [Backend] Khởi tạo model.

Chúng ta sẽ sử dụng một mạng CNN đơn giản, mạng CNN này giúp phân lớp chữ số viết tay. Nếu bạn sử dụng mạng riêng của mình, hãy chắc chắn rằng các layer đó được hỗ trợ bởi Keras.js (xem các layer được hỗ trợ ở đây: https://transcranial.github.io/keras-js-docs/#implemented-layers).

Tạo và active virtualenv để quản lý các package liên quan:

```C
mkdir -p keras-weight-transfer/neural-net
cd keras-weight-transfer/neural-net

virtualenv env
. env/bin/activate
```

Cài đặt các package cần thiết (hãy nhớ rằng phiên bản keras phải là 2.1.2):

```
pip install tensorflow==1.6.0 Keras==2.1.2 h5py==2.7.1
```

Hậu cài đặt kiểm tra :>

```
python -c "from keras import backend"
=> Using TensorFlow backend
```

Tải mnistCNN trong examples của keras repo: https://github.com/keras-team/keras/blob/master/examples/mnist_cnn.py

Save model sau khi train cho model vừa tải về:
```python
model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))
model.save("model.h5")
```

Tiến hành train và save model: 

```
python mnist_cnn.py
```

Để Keras.js có thể sử dụng được file `model.h5` , ta phải encode file model. Script encode được cung cấp bởi chính tác giả của thư viện, tải công cụ encoder tại:
* https://github.com/transcranial/keras-js/blob/a5e6d2cc330ec8d979310bd17a47f07882fac778/python/encoder.py
* https://github.com/transcranial/keras-js/blob/a5e6d2cc330ec8d979310bd17a47f07882fac778/python/model_pb2.py

Tiến hành encode model của chúng ta:

```
python encoder.py -q ./model.h5
```

Sau khi encode, ta sẽ có file `model.bin` có thể sử dụng được với Keras.js.

# [Frontend] Sử dụng pre-trained và encoded model.

Tạo thử input sample là mảng 1 chiều: 
```python
sample = list(x_train[135].reshape((28*28,)))
print(sample)
```

Lưu input sample vào js file:

```Javascript
// ./sample.js
export default [
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  // ...
  0.57254905, 0.9882353, 0.99215686, 0.9882353, 0.9882353, 0.9882353, 0.7254902,
  // ...
];
```

Cài đặt Kerasj.js package

```
npm i keras-js
```

Sử dụng Keras.js model (`model.bin`)

```Javascript
import { Model } from 'keras-js';
import sample from './sample';


document.addEventListener('DOMContentLoaded', () => {
  document.write('Loading...');
});

// Make sure to copy model.bin to the public directory.
const model = new Model({
  filepath: 'model.bin',
});

// Perform a prediction and write the results to the console.
model.ready()
  .then(() => model.predict({
    input: new Float32Array(sample),
  }))
  .then(({ output }) => {
    let predictionProbability = -1;
    let predictedDigit = null;
    Object.entries(output).forEach(([digit, probability]) => {
      if (probability > predictionProbability) {
        predictionProbability = probability;
        predictedDigit = digit;
      }
    });
    document.write(
      `Predicted ${predictedDigit} with probability ${predictionProbability.toFixed(3)}.`,
    );
  })
  .catch((error) => {
    console.log(error);
  });
```

Sau khi chạy, kết quả được in ra cho ta:
> Predicted 3 with probability 0.297.
> 

# Kết

Trên chỉ là demo về khả năng tích hợp Keras model vào Javascript, nó sẽ rất tiện cho các model nhỏ của bạn với các ưu điểm: 
* Tiết kiệm chi phí cho phía server (để deploy 1 Machine Learning model vốn tốn rất nhiều tài nguyên máy tính).
* Tiết kiệm bandwidth và thời gian cho người dùng (thay bằng việc upload input data đến Machine Learning API).

Tuy nhiên, với các model có chứa nhiều layer trong mạng thì không nên sử dụng cách này vì:

* Keras.js GPU option không chạy được trên mobile browser.
* Mất nhiều thời gian, công sức để có thể dùng JS convert input data cho Keras.js.