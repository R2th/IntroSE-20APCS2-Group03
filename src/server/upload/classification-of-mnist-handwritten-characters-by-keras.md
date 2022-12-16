# Overview
This time, we will use keras to classify 1 to 9 characters from the image dataset that contains a lot of handwritten characters called MNIST.

## Import needed Libraries:
```
import os.re
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
import keras
from keras.datasets import mnist
```

## Download MNIST
Divide the data for training and testing

Next, the training data is divided into training and verification data at a ratio of 8:2.

```
from keras.datasets import mnist
from sklearn.model_selection import train_test_split

(train_data, train_labels), (test_data, test_labels) = mnist.load_data()
x_train, x_valid, y_train, y_valid = train_test_split(train_data, train_labels, test_size=0.2)
```

## Resize the image data and label correctly
1.  Since x_train and x_valid are currently (4800,28,28), (1200,28,28), in order to make them usable for learning keras models (4800,28,28,1), (1200, Converted to the form 28,28,1)
2.  Convert the data type of image data to float type
3.  Since the pixel value of the image is 0 to 255 and the numerical value is large, it is converted between 0 and 1.
4. Set the correct label to one-hot-encoding 

```
from keras.utils import to_categorical

#①
x_train = x_train.reshape(x_train.shape[0], 28, 28, 1)
x_valid = x_valid.reshape(x_valid.shape[0], 28, 28, 1)
#②
x_train = x_train.astype('float32')
x_valid = x_valid.astype('float32')
#③
x_train /= 255
x_valid /= 255
#④
y_train = keras.utils.to_categorical(y_train, 10)
y_valid = keras.utils.to_categorical(y_valid, 10)
```

## Create Model
```
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D

model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(10, activation='softmax'))
model.summary()

Model: "sequential_1"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d_2 (Conv2D)            (None, 26, 26, 32)        320       
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 24, 24, 64)        18496     
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 12, 12, 64)        0         
_________________________________________________________________
dropout_2 (Dropout)          (None, 12, 12, 64)        0         
_________________________________________________________________
flatten_1 (Flatten)          (None, 9216)              0         
_________________________________________________________________
dense_2 (Dense)              (None, 128)               1179776   
_________________________________________________________________
dropout_3 (Dropout)          (None, 128)               0         
_________________________________________________________________
dense_3 (Dense)              (None, 10)                1290      
=================================================================
Total params: 1,199,882
Trainable params: 1,199,882
Non-trainable params: 0
_________________________________________________________________
```

## Compile model
```
from keras.optimizers import RMSprop

model.compile(loss='categorical_crossentropy',
              optimizer=RMSprop(),
              metrics=['accuracy'])
```

## Image padding and learning
```
datagen = ImageDataGenerator(
    featurewise_center=False,               # Adjust the average input to 0 across the dataset
    samplewise_center=False,                # Adjust the average of each sample to 0
    featurewise_std_normalization=False,    # Normalize the input with the standard deviation of the dataset
    samplewise_std_normalization=False,     # Normalize each input with its standard deviation
    zca_whitening=False,                    # ZCA Whitening Epsilon
    rotation_range=50,                      #Rotation angle (-50 to 50 degrees)
    width_shift_range=0.3,                  # Left and right slide width
    height_shift_range=0.2,                 #Up and down slide width
    zoom_range=[1.0,1.5],                   # Enlargement / reduction rate
    horizontal_flip=False,                  # Do not flip horizontally
    vertical_flip=False)    

hist = model.fit_generator(datagen.flow(x_train, y_train, batch_size=32),
                               steps_per_epoch=len(x_train)/32, epochs=10,
                               validation_data=(x_valid, y_valid)).history
```

## Display accuracy
```
# Precision plot
plt.plot(hist['accuracy'], marker='.', label='acc')
plt.plot(hist['val_accuracy'], marker='.', label='val_acc')
plt.title('model accuracy')
plt.grid()
plt.xlabel('epoch')
plt.ylabel('accuracy')
plt.legend(loc='best')
plt.show()

# Loss plot
plt.plot(hist['loss'], marker='.', label='loss')
plt.plot(hist['val_loss'], marker='.', label='val_loss')
plt.title('model loss')
plt.grid()
plt.xlabel('epoch')
plt.ylabel('loss')
plt.legend(loc='best')
plt.show()
```

## Evaluation of accuracy with test data
```
test_data = test_data.reshape(test_data.shape[0], 28, 28, 1)
test_data = test_data.astype('float32')
test_data /= 255
test_labels = keras.utils.to_categorical(test_labels, 10)

score = model.evaluate(test_data, test_labels, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1])
```