Xin chào các bạn, đều đặn hàng tháng, để tạm thời xả tress sau những ngày làm việc, học tập vất vả, mình vẫn luôn dành 1 khoảng thời gian nhỏ để để đến với một nỗi tress mới : **Vắt óc ra, kiếm 1 chủ đề để chia sẻ trên kênh blog này của mình**.  Và đến hẹn lại lên, cuối cùng mình cũng nghĩ ra chủ đề để chia sẻ vào tháng này :D.

> Đùa vậy thôi, chứ viết blog có ích nhiều lắm =)) Để chia sẻ kiến thức học hỏi được của bản thân, để rèn luyện văn phong viết lách, để giao lưu và làm quen với nhiều người. Đặc biệt là khi nhìn thấy những bài viết của bản thân nhận được sự quan tâm (lượng **VIEW** cũng như **UPVOTE** cao), là cảm thấy có động lực lắm :100:

Oke, lâu mới xàm xí một lần, chúng ta đến với chủ đề của bài blog hôm nay: **Các bạn đã xây dựng một web app cho project của bản thân như thế nào?**

![imgur](https://i.imgur.com/MCwbJqf.jpg)

# 1. How to build your web app?
> Như các hashtag mình đã gắn ở đầu bài viết, đối tượng của blog này hướng đến những người có hứng thú tìm hiểu Machine Learning nhưng lại quá lười để tìm hiểu cách tự xây dựng 1 web app nhằm show kết quả về project của mình. (ở đây code **Python** là chính nha)  
### 1.1 Đặt vấn đề
Chúng ta hãy bàn sâu hơn 1 chút về chủ đề hôm nay nào. Hãy thử liệt kê một vài trường hợp dưới đây để xem bạn thuộc trường hợp nào nhá 
* Bạn là một cô/cậu sinh viên đang tìm hiểu về AI, Machine Learning, ... Một ngày nọ, bạn có được 1 project nhỏ của riêng mình, bạn muốn đem khoe với mọi người về thành quả đó. Nhưng việc bê con laptop của bản thân chạy đi chạy lại là một việc quá vất vả => ***Build your web app.***
* Bạn là AI Engineer, được sếp giao cho một task nghiên cứu tìm hiểu về một công nghệ nào đó. Bạn đã hoàn thành xong công việc và muốn show ra output của bản thân, nhưng không chỉ đơn giản là các báo cáo hay biểu đồ mà là một demo xịn xò ==> ***Build your web app.*** 
* Bạn là một researcher, sau khi nghiên cứu về một topic mới, bạn muốn ứng dụng nó để làm ra 1 PoC nho nhỏ ==> ***Build your web app.*** 
* vân vân và vân mây ...

Mình sẽ không nêu lại khái niệm web app là gì, thay vào đó, chúng ta sẽ quan sát 1 chút về các công đoạn xây dựng một giao diện cho web app thông qua hình ảnh dưới đây (sau khi đã có những core chính):

![imgur](https://i.imgur.com/gdqeRGp.png)

Đương nhiên , trong các trường hợp trên, nếu bạn còn **kém và lười khoản code frontend** nữa thì đây chính là bài blog bạn nên đọc :D
### 1.2 Streamlit 
Có thể, với một số người đã có kinh nghiệm nhất định, sau khi đọc đoạn giới thiệu bên trên, đã nghĩ đến những cái tên như Flask hoặc Django, ... Nhưng không, nhân vật chính mình muốn giới thiệu trong blog lần này là **Streamlit**

![imgur](https://i.imgur.com/sAa02ka.png)

Tạm dời việc so sánh Streamlit với Flask hoặc Django sang phần sau, trong phần này, chúng ta sẽ điểm qua một vài điểm nổi bật của *[Streamlit](https://streamlit.io/) : Một framework còn trẻ măng nhưng lại nhận được sự quan tâm từ cộng đồng machine learning một cách nhanh chóng do tính tiện lợi của nó.*

Để khởi động, các bạn có thể thử cài đặt streamlit và bắt đầu một ví dụ đơn giản
```bash
pip install streamlit
```
```bash
streamlit hello
```

![imgur](https://i.imgur.com/HdySeg4.png)

Một số thứ đáng chú ý của streamlit có thể kể đến như sau: 
* **Add text and data**

    Streamlit cho phép hiển thị text cũng như data frame với nhiều kích thước khác nhau thông qua một số class chuyên dụng. Ví dụ như 
    * Add a title : 
        ```python
        streamlit.title("This is title")
        ```
    * Add a header: 
        ```python
        streamlit.header("This is header")
        ```
    * Write a data frame: 
        ```python
        st.write(pd.DataFrame({
            'first column': [1, 2, 3, 4],
            'second column': [10, 20, 30, 40]
        }))
        ```
* **Use magic** : 

    Ngoài ra, chúng ta còn hoàn toàn có thể hiển thị khi mà không cần sử dụng các method của streamlit 

    ```python
    df = pd.DataFrame({
      'first column': [1, 2, 3, 4],
      'second column': [10, 20, 30, 40]
    })

    df
    ```
* **Draw charts and maps**

    Việc vẽ các biểu đồ cũng như hiển thị các điểm biểu diễn trên bản đồ cũng có thể dễ dàng thực hiện hệt như thao tác trên pandas
    * Draw a line chart
        ```python
        chart_data = pd.DataFrame(
             np.random.randn(20, 3),
             columns=['a', 'b', 'c'])

        st.line_chart(chart_data)
        ```
    * Plot a map
        ```python
        map_data = pd.DataFrame(
            np.random.randn(1000, 2) / [50, 50] + [37.76, -122.4],
            columns=['lat', 'lon'])

        st.map(map_data)
        ```
* **Add interactivity with widgets**

    Ngoài việc nhận và hiển thị thông tin được truyền vào, streamlit cũng đồng thời cho phép chúng ta tương tác trực tiếp thông qua một số class đặc biệt 
    * Use checkboxes to show/hide data
        ```python
        if st.checkbox('Show dataframe'):
            chart_data = pd.DataFrame(
               np.random.randn(20, 3),
               columns=['a', 'b', 'c'])

            st.line_chart(chart_data)
        ```
    * Use a selectbox for options
        ```python
        option = st.selectbox(
            'Which number do you like best?',
             df['first column'])

        'You selected: ', option
        ```
* **More and more ...**

    Phía trên mình liệt kê ra một số tính năng, ngoài ra còn vô vàn các tính năng khác như việc sử dụng side bar, hiển thị progress, ...
    
    Các bạn có thể tham khảo thêm ở docs của chính Streamlit : https://docs.streamlit.io/en/stable/api.html hoặc tham gia cộng đồng : https://discuss.streamlit.io/. Bên cạnh đó, một kho thư viện về các project sử dụng streamlit cũng sẽ là một nguồn tham khảo lớn để chúng ta có thể tự xây dựng một web app cho project của chính mình: https://streamlit.io/gallery
# 2. Transfer Flask --> Streamlit 
### 2.1 Quy trình xây dựng web app với Flask

![](https://flask.palletsprojects.com/en/1.1.x/_images/flask-logo.png)

[Flask](https://flask.palletsprojects.com/en/1.1.x/) là một Web Framework rất nhẹ của Python, dễ dàng giúp người mới bắt đầu học Python có thể tạo ra website nhỏ, ứng dụng web cá nhân đồng thời cũng dễ mở rộng để xây dựng các ứng dụng web phức tạp. Flask là một micro-framework, sở hữu một môi trường độc lập, ít sử dụng các thư viện khác bên ngoài. Do vậy, Flask có ưu điểm là nhẹ, có rất ít lỗi do ít bị phụ thuộc cũng như dễ dàng phát hiện và xử lý các lỗi bảo mật.

Tuy nhiên, dù dễ học dễ nhớ, chúng ta hãy nhìn qua một chút về quá trình

![imgur](https://i.imgur.com/hJD7xIj.png)

Hãy nghĩ về những thứ bạn cần học thêm để có thể thông thạo Flask: **html, css, js, các giao thức GET, PUT, POST, ...**. Và, hãy quay sang nhìn vào Streamlit. 

![imgur](https://i.imgur.com/Eq3vokb.png)

Để lấy dẫn chứng cho điều này, chúng ta sẽ bắt tay coding một chút chứ nhỉ :D
### 2.2 Programming Language Detection

##### [Programming Language Detection: Phát hiện ngôn ngữ lập trình dễ hay khó ???](https://viblo.asia/p/programming-language-detection-phat-hien-ngon-ngu-lap-trinh-de-hay-kho-ByEZkJM2KQ0) 

Đây là một bài blog trước đây của mình, viết về việc xác định một đoạn code bất kì được viết bằng ngôn ngữ lập trình gì ? Bỏ qua vấn đề về thuật toán, thì mình đã dùng Flask để build một web app cho project này. Các bạn có thể ghé thăm và test tại : https://programming-language-detection-demo.glitch.me/

Mặc dù phần code giao diện cho web app này, mình phải đánh giá là **ngắn của ngắn** rồi. Mình vẫn mất hơn 60 dòng code cho [template](https://github.com/TungBui-wolf/programming-language-detection/blob/master/templates/index.html) và 20 dòng code cho [css](https://github.com/TungBui-wolf/programming-language-detection/blob/master/static/style.css) 

Và một "chiếc" web app được hình thành với giao diện như sau: 

![imgur](https://i.imgur.com/k5afGMM.png)

Bây giờ, chúng ta sẽ thử xây dựng lại web app này với streamlit để kiếm chứng lại lượng effort bỏ ra

Phân tích giao diện trên, chúng ta xác định được các thành phần chính sau: 
* Tiêu đề : ***Programming Language Detection Demo***
* Phần mô tả ngay bên dưới: ***Detect programming language from source code***
* Tiếp đến là một text area để nhận code làm input: ***Just paste your code here:***
* 2 button ***Submit*** và ***Reset***
* Text với kích thước lớn (có thể là h3 hoặc h2): ***Predict result**:*
* Một khoảng trống để show kết quả detect
* Phần mô tả về các ngôn ngữ được support: ***List of supported programming languages:***

Streamlit được xây dựng bằng việc sắp xếp tuần tự các class từ trên xuống dưới. Bằng cách này, ta có thể dễ dàng viết lại được giao diện trên chỉ với **vẻn vẹn 10 dòng code**
```python
import streamlit as st

st.title('Programming Language Detection Demo')
st.info("Detect programming language from source code")
code = st.text_area('Just paste your code here: ')
submit = st.button("Submit")
st.header("Predict result:")
html = "<h4 style=\"color: red;font-weight: bold;\">Result Here</h4><br>"
results = st.markdown(html, unsafe_allow_html=True)
reset = st.button("RESET")
st.text("List of supported programming languages:")
st.info("Total 53 programming language, example: Python, Java, C#, C++, C, HTML, Objective-C, Haskell, Rust, Matlab, Nix, Swift, Go, Protobuf, Lua, Pascal, Lisp, Wasm, Q, Actions Script, Haxe, Handlebars, Dart, Live Script, Json ...")
```
Và giao diện mới được hình thành dù bạn không hề biết một chút gì về html, css, js, ...

![imgur](https://i.imgur.com/5URIkfN.png)

### 2.3 Khi nào thì nên sử dụng streamlit
Streamlit thật sự đã tạo ra những thuận lợi rất lớn cho cộng đồng machine learning, giúp việc xây dựng một web app trở nên dễ dàng hơn bao giờ hết trong khi chỉ mất cực ngắn để làm quen. 

Mặc dù hầu hết các web app được xây dựng bởi Flask đều có thể transfer sang streamlit, framework này vẫn chưa thật sự hoàn thiện để thay thế được Flask. Tại sao lại vậy?

* Streamlit vẫn còn khá mới, và chưa thật sự đảm bảo được các vấn đề về bảo mật và an toàn cho hệ thống 
* Streamlit chưa hỗ trợ việc customize mạnh mẽ được như Flask (hoặc Django), hiện tại, nếu bạn muốn custom hoặc chỉnh sửa một method hiển thị theo ý bạn, bạn cần clone lại source của streamlit và chỉnh sửa trực tiếp trên source
* Streamlit chưa hỗ trợ việc chuyển giao dữ liệu qua lại giữa các trang. Hiểu đơn giản là ví dụ bạn muốn truy cập vào trang xyz thì bạn cần vào trang login của xyz trước. Nhưng streamlit lại không đảm bảo được liên kết này. 

Tóm lại, chỉ dùng streamlit : 
* Cho dự án nhỏ, demo, PoC, ...
* Không yêu cầu quá cao về bảo mật
* Chỉ cần 1 trang dashboard duy nhất, không có quá nhiều trang liên kết đến nhau
* Chấp nhận layout mặc định của streamlit mà ko có nhu cầu custom quá nhiều (dù sao nó cũng đẹp sẵn rồi)
* Các trường hợp còn lại, Flask hoặc Django vẫn luôn là ưu tiên hàng đầu và bạn hãy cố gắng để học html, css, js đi :joy:
# 4. Kết luận
Trong blog lần này, mình đã giới thiệu đến mọi người một framework mới, đơn giản nhưng vẫn đảm bảo tính mạnh mẽ và tiện dụng: **Streamlit** . Mặc dù vẫn còn một số hạn chế nhất định, nhưng Streamlit vẫn đang phát triển và hoàn thiện dần, chúng ta có thể mong đợi hơn vào tương lai. 

Còn ở hiện tại, với mong muốn và yêu cầu không quá cao ở một web app, hãy thử Streamlit, bạn sẽ mê ngay thôi !!!

Oke, bài viết đến đây là kết thúc, mình sẽ trở lại với một chủ đề mới vào tháng sau (để vắt óc ra nghĩ tiếp). Dù sao thì, đừng quên **Upvote** + **Clip** cho bài viết này để tiếp thêm cảm hứng cho mình :v: See ya