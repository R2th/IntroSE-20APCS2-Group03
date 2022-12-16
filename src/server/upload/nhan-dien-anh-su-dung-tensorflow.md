# 1.  Sơ lược một chút về Tensorflow (TF):
Tensorflow (TF) là 1 library do Google phát triển và là một thư viện mã nguồn mở được dùng để tính toán số học sử dụng đồ thị luồng dữ liệu  trong đó các node là các phép tính toán học còn các cạnh biểu thị luồng dữ liệu.![](https://images.viblo.asia/a45b0a79-57c0-4272-8ee5-9b37ffba86b9.png)
 Các lợi ích mà thư viện này mang lại:
*  Tích hợp nhiều thư viện Machine Learning.
*  Có khả năng tương thích và mở rộng tốt. 
*  Nhận biết phát âm và dịch tự động.
*  Phân loại email của Gmail.
*  Nhận biết khuôn mặt trong ảnh.

Đặc trưng của TensorFlow là xử lý được tất cả các loại dữ liệu có thể biểu diễn dưới dạng data flow graph hay low level như xử lý chữ viết tay.

Các bạn có thể tham khảo link bên dưới để hiểu rõ hơn về TF nha:

> https://techblog.vn/ai-conversation-2
# 2. Đem TF vào trong app Flutter:

## 2.1 Thêm data vào model của TF:

Bạn có thể vào trang https://teachablemachine.withgoogle.com/train để thêm data của mình vào.

![](https://images.viblo.asia/fe55b157-aba6-47f6-be08-3f351c7211c2.png)

Chọn tạo Image Project.

![](https://images.viblo.asia/162133a9-c9a3-42dd-815d-bf4e46904ed7.png)



Để có thể lấy được data mình tải từ trang này về : [https://www.kaggle.com/tongpython/cat-and-dog/data](https://www.kaggle.com/tongpython/cat-and-dog/data#) , sau đó upload vào model ở trên với từng loại mà bạn thiết lập và nhấp vào `Train model` để máy tiến hành học.

![](https://images.viblo.asia/598b7b5a-5ed9-43ad-93ad-ba5340ef466f.png)

Sau đó tiến hành `Export model` và `Download` về máy.

![](https://images.viblo.asia/af16d891-d22a-423a-a2d1-8d09088a09a6.png)

Giải nén ta được 2 file trên và tiến hành add vào `assets` của Flutter project .

## 2.2 Code UI Detech Animal:
Vào trong `build.gradle` của android thêm vào 2 dòng bên dưới.


![](https://images.viblo.asia/f10c3ede-74ac-444b-8968-1d4e5a25ec76.png)

Nó sẽ vô hiệu việc nén các file có tên là `tflite` và `lite`.

![](https://images.viblo.asia/c47e41dd-cde5-402f-b5d6-429e64c16128.png)

Thêm vào 2 thư viện `image_picker` và `tflite` vào thư mục ` pupspec.yaml`

 Tiến hành coding nào :grinning::grinning::grinning::grinning:. Trong file `main.dart` viết function để đưa models mà ta đã train khi nãy vào `Tflite.loadModel()` để lưu model.

```
// Data được load vào model của TF.
  loadModel() async{
    await Tflite.loadModel(
      model: "assets/model_unquant.tflite",
      labels: "assets/labels.txt");
  }
```

Tiếp theo ta thêm một function để lấy ảnh từ điện thoại.

```
// Lấy image từ máy.
  chooseImage() async{
    var image = await ImagePicker.pickImage(source: ImageSource.gallery);
    if(image == null) {
      return null;
    }
    setState(() {
      _isLodaing = true;
      _image = image;
    });
    runModelonImage(image);
  }
  
  //Đưa ảnh vào trong TFlite phân tích với model đã train.
  runModelonImage(File image) async {
    var output = await Tflite.runModelOnImage(
    path: image.path,
    numResults: 2,
    imageMean: 127.5,
    imageStd: 127.5,
    threshold: 0.5
    );
    setState(() {
      _isLodaing = false;
      _outputs = output;
    });
  }
```

Thêm phần hiển thị ảnh và Button lấy ảnh từ máy.

```
class _HomePageState extends State<HomePage> {
  bool _isLodaing = false;
  File _image;
  List _outputs;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _isLodaing = true;
    loadModel().then((value){
      setState(() {
      _isLodaing = false;
      });
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Detech Animals"),
    ),
    body: _isLodaing ?
    Container(
      alignment: Alignment.center,
      child: CircularProgressIndicator(),
    ) : Container(
      width: MediaQuery.of(context).size.width,
      child:  Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          _image == null ? Container() : Image.file(_image),
          SizedBox(height: 20,),
          _outputs != null ? Text(
            "${_outputs[0]["label"]}", // Hiển thị kết quả test với 1 là Dog và 0 là Cat.
            style: TextStyle(
                color: Colors.black,
                fontSize: 20.0,
                background: Paint()..color = Colors.white,
              ),
          ) : Container()
        ],
      ),
    ),
    floatingActionButton: FloatingActionButton(
      onPressed: () {
        chooseImage();
    },
    child: Icon(Icons.image),
    ),
    );
  }
```

## 2.3 Demo thử nào:
Chọn ảnh con mèo thì sẽ thông báo là `0 Cat`.

![](https://images.viblo.asia/b28c2985-f1cc-429c-9cc8-1f3b4b36821e.jpg)

Chọn ảnh con chó thì sẽ thông báo là `1 Dog`.

![](https://images.viblo.asia/3a042a02-d8f3-4253-9cab-92200ac69e5e.jpg)


# Kết luận:
Mình đã hướng dẫn các bạn làm một app Detect animal đơn giản bằng Tensorflow nhưng vẫn còn một số nhược điểm như: 
Nếu lựa chọn 1 tấm ảnh không phải chó hoặc mèo thì có thể ra kết quả sai vì thiếu Data Training.

Hy vọng các bạn thích bài viết này.:grinning::kissing_heart:

Link source code.

>  https://github.com/nghiaptx-2124/detech_animal