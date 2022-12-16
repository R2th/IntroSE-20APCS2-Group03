## Giới thiệu

Hi!! 

Sau một thời gian không viết bài vì nhiều lý do thì nhân tiện đợt này đang có task về Human Pose Classifer (Phân loại hành động), mình cũng mày mò, tìm kiếm thì cũng có chút kết quả nên mình viết bài này để share cũng như note lại kiến thức về phần này. Đọc qua task này thì chắc mọi người cũng hình dung được phần nào công việc rồi đó là từ một video chứa hành động của con người (chạy, nhảy, make up, cầu lông,...) qua một model để phân loại xem video đó đang thực hiện hành động gì. Về cơ bản cũng giống như phân loại ảnh bình thường nhưng ở đây là một video hay một chuỗi các frame, hình ảnh của con người trong toàn bộ quá trình của video. Và từ một chuỗi đó sẽ phân loại xem hành động đó là gì.

Ngoài ra đối với bài toán này đầu vào còn có thể là tọa độ x, y, z của sensor được gắn trên người. Mỗi hành động sẽ tạo ra các động tác mà các vị trí tọa độ mà sensor thu được sẽ thay đổi.Như video dưới đây. Các bạn có thể đọc thêm về paper [Activity Recognition using Cell Phone Accelerometers](https://www.cis.fordham.edu/wisdm/includes/files/sensorKDD-2010.pdf) để biết cách làm. Ở đây mình cũng có một [dataset](https://www.cis.fordham.edu/wisdm/dataset.php) mẫu về phần này, và phần [bài viết](https://machinelearningmastery.com/how-to-load-and-explore-a-standard-human-activity-recognition-problem/) các bạn có thể download và xem nội dung về để làm thử.

{@embed:https://youtu.be/XOEN9W05_4A}

## Code
Trong thực nghiệm lần này mình có sử dụng bộ dữ liệu [UCF101](https://www.crcv.ucf.edu/research/data-sets/ucf101/) bao gồm 101 actions khác nhau như chạy, nhảy, make up, bơi, đánh đàn...
Với tổng 13320 video với 101 hành động, tập data UCF101 có sự đa dạng lớn nhất về hành động và với nhiều chuyển động của khung hình, hình dạng và tư thế đối tượng, tỷ lệ đối tượng, điểm nhìn, background, điều kiện ánh sáng, v.v. Một phần vì trong thực tế để tạo nên bộ dữ liệu nhận dạng hành động thường không có sẵn, không thực tế thậm chí phải được dàn dựng bởi các diễn viên cho nên có bộ data này cũng sẽ giúp mọi người thử nghiệm với các phương pháp cho bài toán của mình.

![521_2018_3951_Fig6_HTML.png](https://images.viblo.asia/391e6f44-e9d1-4352-acf1-4ec6bf4711bd.png)

Cấu trúc thư mục của tập dataset như dưới đây:
![](https://images.viblo.asia/ab843ba1-ff5a-4dee-825d-177d1f78120d.PNG)


Như mình đã nói ở trên ban đầu mình sẽ sử dụng một model CNN để extract feature của ảnh. Model này bạn có thể chọn bất kỳ như (InceptionV3, VGG, Restnet,....) và dựa vào thực ngiệm, độ acc để quyết định xem model nào phù hợp. Ở đây mình đã chọn InceptionV3 và pretrained weights tập ImageNet. Nhưng trước hết ta sẽ cần phải cắt từng frame của video đã, việc này thì Lib FFmpeg hỗ trợ đắc lực cho phần này, mình sẽ lưu lại nội dung *[train|test], class, filename, nb frames*

```python
def extract_files(extenssion='mp4'):
    """
    [train|test], class, filename, nb frames

    Extracting can be done with ffmpeg:
    `ffmpeg -i video.mpg image-%04d.jpg`
    """
    data_file = []
    folders = ['train', 'test']

    for folder in folders:
        class_folders = glob.glob(os.path.join(folder, '*'))
        for vid_class in class_folders:
            class_files = glob.glob(os.path.join(vid_class, '*.' + extenssion))
            for video_path in class_files:
                # Get the parts of the file.
                video_parts = get_video_parts(video_path)

                train_or_test, classname, filename_no_ext, filename = video_parts

                # Only extract if we haven't done it yet. Otherwise, just get
                # the info.
                if not check_already_extracted(video_parts):
                    # Now extract it.
                    src = os.path.join(train_or_test, classname, filename)
                    dest = os.path.join(train_or_test, classname,
                        filename_no_ext + '-%04d.jpg')
                    call(["ffmpeg", "-i", src, dest])

                # Now get how many frames it is.
                nb_frames = get_nb_frames_for_video(video_parts)

                data_file.append([train_or_test, classname, filename_no_ext, nb_frames])

                print("Generated %d frames for %s" % (nb_frames, filename_no_ext))

    with open('data_file.csv', 'w') as fout:
        writer = csv.writer(fout)
        writer.writerows(data_file)

    print("Extracted and wrote %d video files." % (len(data_file)))
    
def check_already_extracted(video_parts):
    """Check to see if we created the -0001 frame of this file."""
    train_or_test, classname, filename_no_ext, _ = video_parts
    return bool(os.path.exists(os.path.join(train_or_test, classname,
                               filename_no_ext + '-0001.jpg')))
```
Sau khi đã lấy frame của video thì ta sẽ create một model CNN.

```python
class Extractor():
    def __init__(self, image_shape=(299, 299, 3), weights=None):
        self.weights = weights

        input_tensor = Input(image_shape)
        # Get model with pretrained weights.
        base_model = InceptionV3(
            input_tensor=input_tensor,
            weights='imagenet',
            include_top=True
        )
        ...
```

Tiếp đến là đến phần LSTM. Như mọi người cũng đã biết mạng LSTM bản chất là bản cải tiến của RNN (Recurrent neural network), được sinh ra để khắc phục, hạn chế nhược điểm của RNN là Vanishing gradient. Do trong mạng RNN sử dụng thuật toán BPTT(Backpropagation Through Time) do sự thay đổi đạo hàm là rất nhỏ, khó hội tụ. Và cũng để giải quyết vấn đề này thì người ta sẽ thường chọn các giải pháp khác nhau như là thay đổi hàm Activations từ Softmax sang Relu,.. hay sử dụng thuật toán update weights khác như [TruncatedBPTT ](https://machinelearningmastery.com/gentle-introduction-backpropagation-time/)- một biến thể cải tiến của BPTT. Ngoài ra còn sử dụng LSTM để khắc phục các vấn đề đó, mình xin chia sẻ một vài link dưới đây, mọi người có thể đọc, tìm hiểu thêm:
* [Recurrent neural network](https://nttuan8.com/bai-13-recurrent-neural-network/) - NTTuan
* [Recurrent Neural Network: Từ RNN đến LSTM](https://viblo.asia/p/recurrent-neural-network-tu-rnn-den-lstm-gGJ597z1ZX2) - Nguyen Thanh Huyen 
* [The Exploding and Vanishing Gradients Problem in Time Series](https://towardsdatascience.com/the-exploding-and-vanishing-gradients-problem-in-time-series-6b87d558d22) - Barak Or
* [Truncated BPTT](https://machinelearningmastery.com/truncated-backpropagation-through-time-in-keras/) - ML Mastery

Về cơ bản việc xây dựng một model LSTM thì cũng đã được hỗ trợ bởi Keras rồi, mình chỉ define số lượng node thôi.
```python
class ResearchModels():
    def __init__(self, nb_classes, model, seq_length,
                 saved_model=None, features_length=2048):
                 self.seq_length = seq_length
                self.load_model = load_model
                self.saved_model = saved_model
                self.nb_classes = nb_classes
                
    def lstm(self):
            """Build a simple LSTM network. We pass the extracted features from
            our CNN to this model predomenently."""
            # Model.
            model = Sequential()
            model.add(LSTM(2048, return_sequences=False,
                           input_shape=self.input_shape,
                           dropout=0.5))
            model.add(Dense(512, activation='relu'))
            model.add(Dropout(0.5))
            model.add(Dense(self.nb_classes, activation='softmax'))

            return model
```

Việc tiếp theo là train model.
```python
def train(data_type, seq_length, model, saved_model=None,
          class_limit=None, image_shape=None,
          load_to_memory=False, batch_size=32, nb_epoch=100):
    # Helper: Save the model.
     checkpointer = ModelCheckpoint(
        filepath=os.path.join('data', 'checkpoints', model + '-' + data_type + \
            '.{epoch:03d}-{val_loss:.3f}.hdf5'),
        verbose=1,
        save_best_only=True)
     early_stopper = EarlyStopping(patience=20)
     generator = data.frame_generator(batch_size, 'train', data_type)
     val_generator = data.frame_generator(batch_size, 'test', data_type)
     
     rm = ResearchModels(len(data.classes), model, seq_length, saved_model)
    rm.model.fit_generator(
            generator=generator,
            steps_per_epoch=steps_per_epoch,
            epochs=nb_epoch,
            verbose=1,
            callbacks=[tb, early_stopper, csv_logger, checkpointer],
            validation_data=val_generator,
            validation_steps=40,
            workers=4)
```
Sau khi train xong thì Acc đạt 74% trên tập test, một con số cũng không cao lắm.
Khi đã có model ta sẽ thử predict thử video.
```python
capture = cv2.VideoCapture(os.path.join(video_file))
width = capture.get(cv2.CAP_PROP_FRAME_WIDTH)   # float
height = capture.get(cv2.CAP_PROP_FRAME_HEIGHT) # float
  
  
fourcc = cv2.VideoWriter_fourcc(*'XVID')
video_writer = cv2.VideoWriter("result.avi", fourcc, 15, (int(width), int(height))) 
   # get the model.
extract_model = Extractor(image_shape=(height, width, 3)) # extrac model CNN
saved_LSTM_model = load_model(saved_model)
  
frames = []
frame_count = 0
while True:
  ret, frame = capture.read()
  # Bail out when the video file ends
  if not ret:
      break
  
  # Save each frame of the video to a list
  frame_count += 1
  frames.append(frame)
  
  if frame_count < seq_length:
      continue # capture frames until you get the required number for sequence
  else:
      frame_count = 0
  # For each frame, extract feature and prepare it for classification
  sequence = []
  for image in frames:
      features = extract_model.extract_image(image)
      sequence.append(features)
  prediction = saved_LSTM_model.predict(np.expand_dims(sequence, axis=0))
  print(prediction)
  values = data.print_class_from_prediction(np.squeeze(prediction, axis=0))
  ...
```

Để classifi video thì ta cũng sẽ làm lần lượt các bước extract từng frame cho qua CNN, LSTM rồi cho model dự đoán kết quả.
{@embed:https://youtu.be/qjLk0hX4LzI}

Tuy nhiên cách làm này cũng có nhược điểm đó là độ chính xác không cao, dự đoán sai những video có hành động gần giống nhau, dễ gây nhầm lẫn. Cách khắc phục vấn đề này là sử dụng trực tiếp Pose Human, tức dựa vào các điểm (keypoint) của cơ thể người để xử lý, dưới đây là một vài link:
* [Guide to Human Pose Estimation with Deep Learning](https://nanonets.com/blog/human-pose-estimation-2d-guide/)
* [Paper with Code](https://paperswithcode.com/task/pose-estimation)

Ngoài các phương pháp trên thì các bạn có thể đọc thêm [bài viết này](https://viblo.asia/p/gioi-thieu-so-qua-bai-toan-nhan-dien-hanh-dong-cua-nguoi-trong-video-Eb85orrOl2G#_loi-ket-11) , trong bài viết có nêu thêm các cách tiếp cận khác nhau, các thuật toán và ưu, nhược điểm của từng phương pháp.
## Tài liệu tham khảo
1. https://nttuan8.com/bai-13-recurrent-neural-network/
2. https://blog.coast.ai/five-video-classification-methods-implemented-in-keras-and-tensorflow-99cad29cc0b5
3. https://www.crcv.ucf.edu/research/data-sets/ucf101/
4. https://ieeexplore.ieee.org/abstract/document/8121994