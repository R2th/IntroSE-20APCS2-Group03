![](https://images.viblo.asia/b42ad373-088c-4580-830b-c80c9471f765.png)

Các bài viết trước trong chuỗi bài "Xây dựng Dapp" :

1. [**Xây dựng ứng dụng phi tập trung (Dapp)**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-gAm5y8LLldb)
2. [**Xây dựng ứng dụng phi tập trung (Dapp) với Reacjs**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-reacjs-L4x5x8p15BM)
3. [**Xây dựng ứng dụng phi tập trung (Dapp) với Vuejs**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-vuejs-vyDZOaP95wj)
4. [**Xây dựng ứng dụng phi tập trung (Dapp) với Cocos Creator**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-cocos-creator-63vKjk2bZ2R)
5. [**Xây dựng ứng dụng phi tập trung (Dapp) với Unity**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-unity-QpmlexwVZrd)
6.  [**Xây dựng ứng dụng phi tập trung (Dapp) với Angular**](https://viblo.asia/p/xay-dung-ung-dung-phi-tap-trung-dapp-voi-angular-bJzKmxRD59N)

Quay trở lại loạt bài xậy dựng dapp trên các nền tảng khác nhau, thì hôm nay là thành viên non kinh nghiệm nhất trong team, mình xin tiếp tục với một bài về xây dựng dapp blockchain bằng Python(Flask) sử dụng trong môi trường docker
# Mô Hình

![](https://images.viblo.asia/d0b8a773-5d68-4aed-b7a9-1c3e70b6c2ca.png)

Trên đây là mô hình chung cho một Dapp blockchain sẽ vẫn từ application rồi sử dụng **Web3** để tương tác với mạng blockchain của **Ethereum**. Nhưng vì đây không phải là môi trường **Javascript** mà là môi trường **Python** nên thay vì sử dụng `Web3.js` chúng ta sẽ sử dụng `Web3.py`

# Chuẩn Bị
Môi trường vẫn luôn là nỗi đau đầu cho mọi bất cứ lập trình viên nào. Và chính bản thân mình cũng là nạn nhân khi cài mãi không được `web3.py` do lỗi gì đó của thằng `python` trên máy, mà ông đối diện cài phát ăn ngay. Vậy là mình quyết định chốt phương án cho nó lên thớt bằng cách sử dụng `Docker` cho nó nhanh.

- Docker : hãy chắc chắn trong máy đã cài docker
     `$ docker --version`
    ![](https://images.viblo.asia/9ba23d38-9320-42e7-b9ca-e85cf91eb726.png)

- Tiếp theo là... à mà cần cài giữa đâu mà tiếp theo nhỉ :D :D 

# Triển khai

Sau đây sẽ là phần cấu hình Dockerfile và Dokcer-composer

- **Dockerfile**
    
    Yêu cầu của `Web3.py` là từ **Python 3.6** trở lên nha
    ```dockerfile
     # Dockerfile
        
        FROM python:3.7

        WORKDIR /app

        COPY . .

        RUN pip install -r requirements.txt

        CMD ["python", "app.py"]
    ```
    
- **requirements.txt**
    ```python
        Flask==1.1.1
        web3==4.9.1
    ```
    
- **docker-compose.yml**
    ```yaml
        version: '3.7'
        
        services:
          app:
            image: dapp-python
            build:
              context: .
              dockerfile: Dockerfile
            volumes:
              - .:/app
            ports:
              - '${PUBLIC_PORT}:${PORT}'
            restart: unless-stopped
            environment:
              PORT: ${PORT}
              PROJECT_ID: ${PROJECT_ID}
              ADDRESS: ${ADDRESS}
              PRIVATE_KEY: ${PRIVATE_KEY}
    ```
    
- **.env**
    ```xml
        PORT=888
        PUBLIC_PORT=9999
        PROJECT_ID=<YOUR_INFURA_PROJECT_ID>
        ADDRESS=<YOUR_ACCOUNT>
        PRIVATE_KEY=<PRIVATE_KEY>
    ```

- **app**.**py**

    Ta sẽ tạo một khung app flask với các thư viện như dưới và giả lập các biến như `address` hay `balance` để show thử sang bên file `index.html` xem có được không
    
    ```python
        from flask import Flask, render_template, request, url_for
        from web3 import Web3
        import os

        app = Flask(__name__, static_folder='static')
        address_server="address_server"
        balance="balance_server"

        @app.route("/")
        def hello():
            return render_template('index.html', title='Build Dapp By Python', address=address_server, balance=balance)

        if __name__ == "__main__":
            app.run(host="0.0.0.0", port=os.environ['PORT'],debug=True)

    ```
    
- **templates/index.html**

    Minh có đã add tý css và ảnh cho nó đỡ xấu vào nên hơi dài tý. Sau đó đổ các biến đã truyền bên server sang cho file `index` như sau
    
    ```html
        <!DOCTYPE html>
        <html>

        <head>
          <title>{{ title }}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
          <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
        </head>

        <body>
          <div id="form_wrapper">
            <div id="form_left">
              <img src="/static/img/icon.png" alt="computer icon">
              <p>Address Server:</p>
              <h3>
                {{ address }}
              </h3>
              <p>Balance server:</p>
              <h3> {{ balance }} ETH</h3>
            </div>
            <form action="/send" method="POST" id="form_right">
              <h1> Hello, this is a send coin website </h1>
              <div class="input_container">
                <i class="fas fa-address-book"></i>
                <input placeholder="Address" type=" text" name="address" id="field_email" class='input_field'>
              </div>
              <div class="input_container">
                <i class="fas fa-gift"></i>
                <input placeholder="Value" type="text" name="value" id="field_password" class='input_field'>
              </div>
              <input type="submit" value="send" id='input_submit' class='input_field'>
            </form>
          </div>
        </body>

        </html>
    ```
    
- **static/css/style.css**

    Do file này khá dài nên mình chỉ minh họa mấy dòng đầu tiên có gì mọi người vào repo trên github ở cuối bài nha
    
    ```css
        body {
          text-align: center;
        }
        :root {
          --body_gradient_left: #7200d0;
          --body_gradient_right: #c800c1;
          --form_bg: #ffffff;
          --input_bg: #e5e5e5;
          --input_hover: #eaeaea;
          --submit_bg: #1fcc44;
          --submit_hover: #40e263;
          --icon_color: #6b6b6b;
        }
        
        ...
        
    ```

Cấu trúc thư mục sẽ có dạng như sau:

![](https://images.viblo.asia/61d9b5dd-fbc5-47cf-8ea3-482b27a1217a.png)


Bây giờ chạy cmd `docker-compose up --build` để docker tải images và build container cho chúng ta

![](https://images.viblo.asia/10ba9cd6-2e16-45c2-b57b-d52a8236b3f2.png)

![](https://images.viblo.asia/265e9e93-2d70-4571-aaaa-aeb64e314162.png)

Như vậy là đã build xong giờ chúng ta sẽ kiểm tra các thư viện install xem đã có chưa bằng cách chiu vào trong docker để xem nha:
- Đầu tiên là kiểm tra xem tên hoặc id của container đang chạy là gì: `docker ps` và ở đây tên nó là `dapp_with_python_app_1`

![](https://images.viblo.asia/60431785-76f7-439e-bba5-6ce335d3850e.png)

- Rồi giờ chiu vào kiểm tra nào : `docker exec dapp_with_python_app_1 pip freeze` có thể hiểu là `docker exec <name_container> <cmd_run>` thì ở đây ta đang kiểm tra xem thư viện thằng pip đã tải về và 2 thứ ta cần đã có

![](https://images.viblo.asia/b4b5e697-e1c6-4f5a-8c00-09af593cfbea.png)

Test xem sao nào

![](https://images.viblo.asia/e247b533-920b-4562-88f0-a6869b4dc401.png)


Ngon nghẻ ngay đã có 2 biến là `string` được gửi sang và hiển thi ra. Tiếp theo giờ mới là phần quan trọng này đó là thêm phần tương tác với blockchian vào cho application. Một điều cần để ý đó là ở phần kết quả `docker-composer` là nó báo đang chạy trên cổng `8888` nhưng thực chất muốn vào web từ browser chúng ta phải vào cổng `9999` vì trong docker-composer mình đã cấu hình là mapping cổng `8888` của container với cổng `9999` của máy thật. Và nếu để ý kỹ mọi người nhìn lại ảnh kết quả của `docker ps` ta sẽ thấy

![](https://images.viblo.asia/4223c527-1c91-44d2-ba3e-9511852946bc.png)


# Triển Khai Tương Tác Với Blockchain
Sử dụng web3 để get balance từ blockchian
- **app**.**py**
    ```python

        from flask import Flask, render_template, request, url_for
        from web3 import Web3
        import os

        app = Flask(__name__, static_folder='static')

        # Ta sẽ cấu hình sử dụng mang ropsten với PROJECT_ID lấy từ trang infura 
        # và mình đã đưa nó vào biến môi trường
        infura_url = "https://ropsten.infura.io/v3/" + os.environ['PROJECT_ID']
        web3 = Web3(Web3.HTTPProvider(infura_url))

        # địa chỉ mình cũng đã đưa vào biến môi trường và get balance 
        address_server=os.environ['ADDRESS']
        balance = web3.fromWei(web3.eth.getBalance(address_server), 'ether')


        @app.route("/")
        def hello():
            return render_template('index.html', title='Build Dapp By Python',
                address=address_server, balance=balance)

        if __name__ == "__main__":
            app.run(host="0.0.0.0", port=os.environ['PORT'],debug=True)
    ```

Chúng ta sẽ đi từng bước vừa thực hiện vừa test kết quả vậy là địa chỉ và balance đã có

![](https://images.viblo.asia/e02fd8e6-375d-4a44-862c-631203093782.png)

Bây giờ sẽ viết hàm `sendCoin` để chuyển tiền. Trước tiên ta cần set `private_key` để ký các gia giao gửi và nhận, tham số tiếp theo là `nonce` để set vào transaction khi gửi. Tiếp đến  chúng ta cần get các params mà bên form gửi về bằng cách sử dụng `request`. Sau khi đã có địa chỉ đích `address_des` và giá trị cần send `value` ta sẽ tạo transaction với các tham số như biến `tx` bên dưới. `signed_tx` chính là sử dụng private key để ký vào giao dịch. Cuối cùng là thực hiện giao dich với `sendRawTransaction`, giá trị nó trả về là một mã hash ta có thể sử dụng mã này lên web blockchain để check transaction bằng mã hash này. Sau khi có được mã hash ta sẽ lên trang web để check transaction. Tất cả các thông số cần hiển thỉ mình sẽ gửi sang cho view `send.index`

- **app**.**py**
    ```python
        ...
        
        @app.route("/send", methods=['POST'])
        def sendCoin():
            private_key=os.environ['PRIVATE_KEY']
            nonce = web3.eth.getTransactionCount(address_server)

            address_des = request.form.get('address')
            value = request.form.get('value')
            tx = {
                'nonce': nonce,
                'to': address_des,
                'value': web3.toWei(value, 'ether'),
                'gas': 2000000,
                'gasPrice': web3.toWei('50', 'gwei'),
            }
            signed_tx = web3.eth.account.signTransaction(tx, private_key)
            tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))

            balance_server = web3.fromWei(web3.eth.getBalance(address_server), 'ether')
            return render_template('send.html', title='Build Dapp By Python', tx_hash=tx_hash,
                address_des=address_des,value=value)

        ...
    ```

- **templates/send.html**
    ```html
        <!DOCTYPE html>
        <html>

        <head>
            <title>{{ title }}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
            <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
        </head>

        <body>
            <div id="form_wrapper">
                <div id="form_left">
                    <img src="/static/img/icon.png" alt="computer icon">
                    <p>tx_hash:</p>
                    <h3> {{ tx_hash }}</h3>
                </div>
                <div id="form_right">
                    <h1> Page Send</h1>
                    <div class="input_container">
                        <p>{{address_des}}</p>
                    </div>
                    <div class="input_container">
                        <p>Value: {{value}} ETH</p>
                    </div>
                    <a id='input_submit' class='input_field' href="/">Back Home</a>
                </div>
            </div>
        </body>

        </html>

    ```

Xem kết quả nào
- Đầu tiên vào trang `index` nhập các thông tin

![](https://images.viblo.asia/20fe2cb9-d7a1-4b6e-abb8-6d5b9ba661a0.png)

- Và kiểm tra cả trên metamark ảnh đầu tiên là địa chỉ server và balance, ảnh tiếp theo sẽ là địa chỉ gửi và balance
 
![](https://images.viblo.asia/7d14ea6b-fb7e-45dd-9aa4-92f78f591935.png)

![](https://images.viblo.asia/d90f364d-21c6-4148-882d-fb9bc6b365aa.png)


- Rồi vây giờ send xem 1 ETH này có được chuyển đến địa chỉ đích hay không

![](https://images.viblo.asia/2480d85c-71aa-487e-978d-182f8206b232.png)

-  Mã hash đã được trả về ta có thể lấy mã hash này lên [**ropsten**](https://ropsten.etherscan.io/) để check. Nhưng do giao dịch cần phải được confirm nên cần phải sau một  khoảng thời gian mới check được thông tin giao dịch. Cách đơn giản nhất là ta kiểm tra thấy balance trong tài khoản metamark đã thay đổi là ta có thể lên check giao dịch

![](https://images.viblo.asia/566c257a-c4dc-4819-9096-e0855527e69c.png)

![](https://images.viblo.asia/c64ceeef-b25a-4f14-8969-c9cbc6a88db7.png)

# Kết Luận

Vậy là ta đã có một bộ khung để build dapp blockchain với python, mong rằng bài viết này có thể giúp được các bạn trong việc build dapp blockchain với python

Do Python là ngôn ngữ ở phía server nên không giống như các ngôn ngữ client có thể sẽ tương tác trực tiếp với browser để có thể kết nối được với metamark. Nên mình đành dùng cách này để kết nối và ký giao dịch bằng private key trên chính server

Đây là mã nguồn hoàn chỉnh của bài này và mình cũng đã đưa một số hàm khác nữa để phù hợp cho việc phát triển : **[Repo Github](https://github.com/ngovannghia1997kma/Dapp_Build_By_Python_Docker)**