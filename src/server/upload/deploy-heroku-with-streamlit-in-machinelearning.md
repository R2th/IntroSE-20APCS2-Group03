## Giới thiệu 
Streamlit là một open-source Python lib, nó giúp ta dễ dàng tạo một web app cho MachineLearning và Data Science. Cảm nhận ban đầu của mình khi dùng thằng này là Build & Deploy nhanh :grinning:. 
Hôm nay mình sẽ build một web app đơn giản cho việc Classification Cat- Dog và sau đó sẽ deploy bằng Heroku. Ưu điểm khi dùng heroku là ta sẽ không cần quan tâm quá nhiều về việc ai có thể truy cập do hạn chế về mạng. Ta có thể deploy và mang cho mọi người ở bất kỳ đâu test, như bình thường ta sẽ chỉ test được trong mạng nội bộ mà thôi. Đây cũng là ưu điểm , cũng là cách để tiết kiệm mà hiệu quả .

Trong bài viết này mình sẽ không đi vào chi tiết việc train model. **Để tiết kiệm thời gian mình sử dụng luôn một model classifier có sẵn mà mình search trên github để demo** :slightly_smiling_face::slightly_smiling_face:.

<div align="center">
    
    
![](https://images.viblo.asia/1cca5897-47a1-4f7c-891c-6db34170aa52.png)
![](https://images.viblo.asia/e1977c30-0731-4ab6-b913-6f532a4f3eed.png)
</div>

<div align="center">

</div>

## Setup 
### 1. Streamlit
Chúng ta sẽ install Streamlit bằng pip như sau, yêu cầu dùng Python >= 3.6:
```python
$ pip install streamlit
$ streamlit hello
```
Sau khi cài xong thì ta có thể run app :
```python
streamlit run app.py # streamlit run [name_app].py
```
Ngay lập tức trên Tab browser sẽ show ra tab với đường link http://localhost:8501, đấy chính là cái ta cần. 

### 2. Heroku
Heroku là một platform giúp ta deploy ứng dụng mà tiết kiệm công sức, thời gian cho việc config. Tất nhiên là trong bài viết này mình sẽ sử dụng gói Free để làm (mỗi account chỉ deploy được max 5 app). Khi deploy trang web lên Heroku mọi người có thể truy cập vào và sử dụng, tuy nhiên là do dùng gói free thì nó chỉ sống 550h trong 1 tháng, sau đó nó sẽ bị disconnect và chờ tháng tiếp theo để sống lại.Mọi người xem thêm tại [đây](https://devcenter.heroku.com/articles/getting-started-with-python#set-up) để biết cách sử dụng thêm. 

Bạn tạo một account trươc sau đó bật terminal và chạy lần lượt câu lệnh sau( Ubuntu) :
```python
$ sudo snap install heroku --classic # install heroku
$ heroku login # sẽ đăng nhập với gmail mà mình đã đk 

```
## Code 

Như các bạn đã biết như trước đây để làm một trang web thì phần giao diện sẽ được thực hiện thông qua các thẻ HTML + CSS, nhưng với Streamlit này thì cách tiếp cận thì lại khác, sẽ không cần các thẻ như `<div> <img> <hreg>` mà thay vào đó ta sẽ sử dụng các funtion như `title, text, markdown, latext` đã được hỗ trợ trong Streamlit với cú pháp khai báo như sau :

```python
import streamlit as st
import pandas as pd

st.title('Đây là title')
st.text('Đây là text.')
st.markdown('Mark down thì như thế này ')
st.text('Dưới đây là Latex')
st.latex(r'''
            a + ar + a r^2 + a r^3 + \cdots + a r^{n-1} =
            \sum_{k=0}^{n-1} ar^k =
            a \left(\frac{1-r^{n}}{1-r}\right)
            ''')
st.write(1234)
st.write(pd.DataFrame({
                        'first column': [1, 2, 3, 4],
                        'second column': [10, 20, 30, 40],
                        }))
```
 
Và sau đó chạy lệnh : `streamlit run app.py` thì ta sẽ được kết quả sau :

![](https://images.viblo.asia/280e84d5-919f-49cf-9a83-f7aabf01b3ca.png)

Phê chưa !!!!!

Còn rất nhiều thứ các bạn có thể xem thêm tại [đây ](https://docs.streamlit.io/en/stable/api.html) mình không đưa hết, quan trọng tuỳ thuộc vào mục đích sử dụng của mỗi người.

Và sau đây sẽ là phần chính mà mình đã nói từ đầu là Classification. Về cơ bản sau khi ta đã có file weight đã train, ta sẽ thực hiện việc predict bình thường và show kết quả ra màn hình.
```python
from keras.models import load_model, Model

classifier = load_model('model.h5')
_, pred = classifier.predict(image)
pred = np.argmax(pred)
```

Về giao diện như hình dưới đây :
![](https://images.viblo.asia/dd167758-50e1-4199-a473-6c5fa3e356be.png)

Nó sẽ có phần `title` là `--Cat Dog Image Classification App--`, bên trái là `sidebar` bao gồm `file_uploader` để upload hình ảnh 

```python
st.title("--Cat Dog Image Classification App--")
st.write('\n')

image = Image.open('images/link_image_default')
show = st.image(image, use_column_width=False,width=300)

st.sidebar.title("Upload Image")

#Disabling warning
st.set_option('deprecation.showfileUploaderEncoding', False)
#Choose your own image
uploaded_file = st.sidebar.file_uploader(" ",type=['png', 'jpg', 'jpeg'] )
```

Sau khi upload thì sẽ click vào nút Classify để predict :
```python
if st.sidebar.button("Click Here to Classify"):
    if uploaded_file is None:
        st.sidebar.write("Please upload an Image to Classify")
    else:
      # Predict 
```
Run app và test thử ta được :

![](https://images.viblo.asia/f1b28b71-60ad-4cc7-90db-bcd0ca5cbfd0.png)

![](https://images.viblo.asia/af789941-d067-4e9e-a298-f47ecd37cf24.png)

## Deploy 
Để deploy được lên Heroku các bạn phải tạo tài khoản trước nhé. Sau khi đã làm theo các bước setup bên trên thì trong folder chứa code ta phải thạo file `requirements.txt` ghi các lib mà mình sẽ dùng, để khi deploy thì thằng Heroku sẽ install theo nó. Tiếp theo ta tạo một file `setup.sh` có nội dung như dưới đây :
```bash
mkdir -p ~/.streamlit/
echo "\
[general]\n\
email = \"your-email@gmail.com\"\n\
" > ~/.streamlit/credentials.toml
echo "\
[server]\n\
headless = true\n\
enableCORS=false\n\
port = $PORT\n\
" > ~/.streamlit/config.toml
```
Chú ý là chỗ `your-email@gmail.com` thì chính là gmail bạn đã dùng để đăng ký tài khoản, hoặc sau khi run câu lệnh `heroku login` nó sẽ show ra cho ta.

Tiếp theo là ta sẽ tạo file `Procfile` có nội dung là `web: sh setup.sh && streamlit run [name_app].py`. Công việc tiếp theo là sử dụng các câu lệnh git như ta thường sử dụng để push code. Về cơ bản ta có thể hiểu nôm na là ta sẽ tạo một repo để chứa code ngay trên Heroku.Và câu lệnh sử dụng thì cũng như git thôi.

```bash
$ git init
$ heroku create # tạo app 
$ git add .
$ git commit -m "commit message"
$ git push heroku master
```
Đây là kết quả cuối cùng:
![](https://images.viblo.asia/1e19ec55-120d-4295-bcdc-43814936da3a.png)

Mở thử link `https://shielded-tor-XXXXX.herokuapp.com/` khi run câu lệnh bên trên, ta sẽ được: 

Nếu trong quá trình code mà ta muốn chỉnh sửa code và push code lại thì ta dùng các câu lệnh git như thường làm, nó sẽ được cập nhật code mà ta đã thay đổi :

```bash
git add .
git commit --amend
git push -f heroku master
```

> Hiện tại thằng Heroku đang để default python=3.6.12 nếu bạn muốn thay đổi version thì cần tạo 1 file tên là runtime.txt trong thư mục root ví dụ :`python-3.7.8`. Sau đó run bình thường 


### Note 

Để có thể dùng opencv trên Heroku thì ta phải thêm `heroku-buildpack-multi` theo command sau :

```python 
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git --app MYAPP
```
Và tạo file Aptfile chứa :

```
libsm6
libxrender1
libfontconfig1
libice6
```

Nếu không thì sẽ bị lỗi `ImportError: libGL.so.1: cannot open shared object file: No such file or directory` mình đã mất nhiều thời gian cho cái lỗi này 

Trong quá trình deploy ta sẽ gặp phải một số lỗi và ta muốn xem lại log thì thằng streamlit này có phần ghi lại log để ta dễ dàng check lại. Vào link https://dashboard.heroku.com/apps/ nó sẽ show ra các app mà ta quản lý, ứng với mỗi app sẽ có phần setting như 
* Creating, renaming, and deleting apps
* Viewing app metrics
* Configuring add-on
* Managing Heroku Teams
* Configuring deployment integrations
Khi vào từng app sẽ có phần View build log :

![](https://images.viblo.asia/3c4325c0-e199-43fe-9bd4-ec889ef0bae5.png)

Và cả log của các phần mình Released.

### Tóm tắt 
Trước tiên ta hãy buil thử app bằng Streamlit đã, design font-end, logic và dùng comand để test
```bash 
streamlit run app.py
```

Để deploy lên Heroku thì ban đầu hãy tạo tài khoản, sau đó viết các file config như Aptfile, setup.sh, requirements.txt, runtime.txt ( version python),...đây là những file bắt buộc, rất quan trọng trong quá trình deploy.

Và kết quả trong link sau https://obscure-brook-82771.herokuapp.com/ ( nếu vào một này đẹp trời mà các bạn không vào được thì là do mình đang dùng gói free, hết thời gian sống và phải đợi nó reset lại).
Nếu trong quá trình deploy có vấn đề gì thắc mắc, bug thì các bạn hãy comment phía dưới để mình giải đáp nhé. Hẹn mọi người vào bài viết tiếp theo.

## Tham khảo 
1. https://www.streamlit.io/
2. https://heroku.com/