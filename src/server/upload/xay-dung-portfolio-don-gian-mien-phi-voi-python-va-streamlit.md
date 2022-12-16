Xin chào các bạn. Sau nhiều tháng (hơn 1 năm) học hỏi từ các bài viết của Viblo, mình cũng mày mò "khai bút đầu xuân" với bài viết đầu tiên này, hướng dẫn mọi người tạo một trang Portfolio cá nhân đơn giản và miễn phí với **Python** và **Streamlit** 

Bài viết được minh sử dụng từ video của tác giả *Chanin Nantasenamat - [Data Professor Youtube Channel](https://youtu.be/evnNNGWETtg)* với một chút xíu chỉnh sửa (Vì profile của mình không khủng như vậy hehe). Bài viết này sẽ phù hợp với những bạn đã quen thuộc với cấu trúc Markdown, và sẽ yêu cầu một chút kiến thức Python để tùy biến. Tuy nhiên mình sẽ trình bày một cách đơn giản nhất (không cần kiến thức về HTML, CSS, JS hay deploy). 

Demo tại [đây](https://share.streamlit.io/lenguyengiabao/portfolio/app.py) và source code của bài viết tại [đây](https://github.com/LeNguyenGiaBao/portfolio). Hi vọng bài viết là nền tảng để sức sáng tạo của các bạn làm cho portfolio của mình nhìn đẹp mắt hơn.

Về **Streamlit** thì đã có một bài hướng dẫn của anh @tungbuitien và một bài hướng dẫn deploy bằng Heroku của anh @ToThang, nay mình sẽ deploy bằng chính Streamlit [https://share.streamlit.io](https://share.streamlit.io) một cách đơn giản và quan trọng là "free".  

Trang chủ Streamlit cho các bạn thỏa sức sáng tạo [https://streamlit.io](https://streamlit.io)

### Tạo github repo
Vì đường dẫn của portfolio bao gồm cả tên repo nên mình khuyên nên đặt tên repo ngắn (chèn vào CV sẽ hợp lý). Mình chọn tên repo là `portfolio` luôn! Và Streamlit chỉ cho phép 1 private app nên mình khuyên chọn Public.

![create repo for portfolio](https://images.viblo.asia/a6751525-d690-4aaa-87cb-2ad31714bfcb.png)


### Tạo Portfolio
##### Cài đặt thư viện Streamlit
Việc cài đặt đơn giản với dòng lệnh trên command line.
```Shell
pip install streamlit
```

##### Cấu trúc repo
- Portfolio sẽ được render dựa trên file python (mình đặt là `app.py`). 
- File `style.css` cho chỉnh font chữ.
- File `requirements.txt` cho cài đặt môi trường deploy.
- File `README.md` mình thêm lúc tạo repo, không cần thiết lắm.
- Folder `image` cho việc lưu trữ các hình ảnh hoặc certificate.
- Folder `.streamlit` và file `config.toml` để cấu hình theme (light mode/ dark mode) của portfolio (Mặc định sẽ theo cấu hình của máy truy cập nên đôi khi dính dark mode không đẹp lắm).


``` bash
portfolio
├───.streamlit
│       config.toml
├───image
│       your_image
│   app.py
│   requirements.txt
│   style.css
```


##### Các file phụ trợ
File `requirements.txt` các bạn để tên các thư viện cần sử dụng, trong trường hợp portfolio đơn giản, bạn chỉ cần mỗi thư viện Streamlit.

```
streamlit
```

File `style.css` đơn giản chỉnh font chữ và căn lề cho các thẻ tag. 

```CSS
ul {
    padding-left: 1.5rem;
}

h1 {
    text-align:center;
}

h5 {
    text-align:center;
}

#MainMenu {
    visibility: hidden;
}
footer {
    visibility: hidden;
}
header {
    visibility: hidden;
}
```

File `config.toml` bao gồm màu chữ (textColor), màu nền (backgroundColor), màu highlight text (primaryColor). Các bạn có thể tùy chỉnh theo ý thích.
```
[theme]
primaryColor="#F63366"
backgroundColor="#FFFFFF"
secondaryBackgroundColor="#F0F2F6"
textColor="#262730"
font="sans serif"
```

##### Tạo portfolio thôi nào
- Import các thư viện cần thiết: Streamlit và PIL (Cho việc chèn ảnh)
    ```Python
    import streamlit as st
    from PIL import Image
    ```
- Định dạng Portfolio theo dạng dọc và chia cột nên mình cần tạo một số hàm chia cột sẵn. Streamlit hỗ trợ chia cột với `columns()` nhưng không hỗ trợ chia cột bên trong cột nhé !
  ```Python
  def txt(a):  # 1 column - paragraph
      _, col, _ = st.columns((1,3,1))
      with col:
          st.markdown(a)

  def txt1(a, b):  # 2 columns with offset to the left (2:1)
    _, col1, col2, _ = st.columns([1,2,1,1])
    with col1:
      st.markdown(a)
    with col2:
      st.markdown(b)

  def txt2(a, b):  # 2 columns with offset to the right (1:2)
    _, col1, col2, _ = st.columns([1,1,2,1])
    with col1:
      st.markdown(f'`{a}`')  # highlight text
    with col2:
      st.markdown(b)

  def txt3(a, b):  # 2 columns with offset to the right (1:2)
    _, col1, col2, _ = st.columns([1,1,2,1])
    with col1:
      st.markdown(a)
    with col2:
      st.markdown(b)
    
  def txt4(a, b, c): # 3 columns
    _, col1, col2, _, col3, _ = st.columns([1,0.65,1.5, 0.1,0.75,1])
    with col1:
      st.markdown(f'`{a}`')  # highlight text
    with col2:
      st.markdown(b)
    with col3:
      st.markdown(c)
  ```

- Đặt tiêu đề và logo cho portfolio
    ```Python
    st.set_page_config(page_title='Le Nguyen Gia Bao - Portfolio',page_icon="☀", layout="wide")
    ```
- Đọc file `style.css`
    ```Python
    with open("style.css") as f:
        st.markdown('<style>{}</style>'.format(f.read()), unsafe_allow_html=True)
    ```
- Chèn ảnh cá nhân
    ```Python
    image = Image.open('./image/your_image.png')
    _, img_column, _ = st.columns((2,1,2))
    img_column.image(image, use_column_width  = True)
    ```

- Tên và chức danh của bạn. Mình đặt tên là header 1 và chức danh là header 5.
    ```Python
    st.write('''
    # YOUR NAME
    ##### A Developer from Vietnam 🇻🇳  
    ''')
    ```
- Summary/ Bio: có thể dùng `st.success`. `st.info` hoặc các loại khác tại doc [Status elements](https://docs.streamlit.io/library/api-reference/status)
- Information: mình chia thành 2 cột với bên trái là loại thông tin và bên phải gồm thông tin chi tiết.
- Education, Work Experiment: mình chia thành 2 cột lệch phải, với bên trái là chức danh và bên phải là thời gian.
Các phần tiếp theo các bạn có thể cá nhân theo ý như các kỷ năng, dự án, hoạt động, chứng chỉ, ... Streamlit khá đơn giản trong việc tạo các hiệu ứng và hình ảnh, bảng biểu.

### Deploy
Deploy vô cùng đơn giản với Streamlit. Đầu tiên bạn cần chạy file `app.py` ở localhost với command như sau:
```Shell
streamlit run app.py
```
Streamlit sẽ hiển thị đường dẫn localhost cho trang Portfolio của bạn và chạy trên trình duyệt của bạn. Tada, bạn đã có thể thấy kết quả của mình và chỉnh sửa theo ý muốn trang Portfolio của riêng bạn
```Shell
You can now view your Streamlit app in your browser.

Local URL: http://localhost:8501
Network URL: http://192.168.1.2:8501
```

Ở góc trên bên phải, các bạn sẽ thấy giao diện quản lý, chọn Deploy. Hoặc các bạn có thể truy cập [https://share.streamlit.io](https://share.streamlit.io), trang web quản lý các app của bạn đã deploy, sau đó chọn New App

![deploy streamlit](https://images.viblo.asia/a0f096fd-b4d0-46e9-90db-78c4341b15ea.png)

Mình chọn cách "Paste GitHub URL" và  paste đường dẫn của file `app.py`

![deploy streamlit](https://images.viblo.asia/07ae6ce0-d932-4c4c-bf97-c691ffeeb392.png)

Và xong, nhấn Deploy thôi! 

Quá trình này sẽ mất từ 5-15 phút, bạn có thể theo dõi quá trình deploy tại màn hình console bên phải 

![deploy streamlit](https://images.viblo.asia/62f2be7e-ae51-48b8-89a4-3c259eb8636f.png)

Như vậy bạn đã có một trang Portfolio xịn xò nhưng tạo đơn giản và deploy miễn phí!!! Cùng tận hưởng thành quả nào !!!

### Tổng Kết
Việc tạo Portfolio đơn giản, các bạn chỉ cần chuẩn bị nội dung và thay thế theo ý thích trong file `app.py`. Các cấu hình khác các bạn có thể sử dụng nguyên bản.

Việc tạo Portfolio cá nhân của mình mất khoảng 1 tiếng. Thời gian này còn tùy thuộc vào độ ngầu của profile của bạn nữa nha hehe.

Hi vọng qua bài viết các bạn có thể tạo thành công trang Portfolio đơn giản, miễn phí, dễ dàng show cho nhà tuyên dụng, cũng như học tập được kiến thức về Markdown, Streamlit. Chúc các bạn có một trang Portfolio xịn. Để lại Portfolio của bạn bên dưới để khoe chiến tích và mọi người có thể tham khảo nha. 

Chúc các bạn thành công và một năm mới dũng mảnh như 🐯 🐯 🐯.