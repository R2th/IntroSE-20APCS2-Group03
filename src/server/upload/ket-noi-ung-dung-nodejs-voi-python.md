**Nodejs** là một nền tảng phát triển web phổ biến hiện nay vì những lợi ích và sự tiện lợi mà nó đem lại. Nhưng có một vài điều mà nó còn chưa hỗ trợ như machine learning, deep learning và các thư viện về trí tuệ nhân tạo.Thật may **Python** hỗ trợ tất cả những thứ này và đôi khi là còn nhiều thứ khác mà nodejs không có. Mọi người sẽ tự hỏi là tại sao không sử dụng **Django Framework** của python để dựng những ứng dụng web có thể tích hợp machine learning và trí tuệ nhân tạo. Điều này có vẻ ổn đấy nếu khi ta dựng ứng dụng đó từ đầu. Nhưng nếu ứng dụng của chúng ta là Nodejs và nó đang chạy nhưng giờ ta lại muốn thêm machine learning vào thì sao. Không sao ta vẫn có thể kết nối Nodejs và Python như thường, bằng cách sử dụng `child process module for Nodejs`.

Chúng ta sẽ có 3 cách để tương tác giữa python và nodejs nhưng trước tiên ta cần setup đã

# Setup
- Tạo một project Express đơn giản: 

    ```
    npm ini -y

    npm i express nodemon --save
    ```

   Tạo file `server.js` đơn giản

    ```js
    // Server.js

        var express = require(‘express’);
        var app = express();

        app.listen(3000, function () {
          console.log(‘server running on port 3000’);
        })
    ```

    Trong file `package.json`

    ```js
    // package.json

        {
          "name": "node_integrate_python",
          "version": "1.0.0",
          "description": "",
          "main": "index.js",
          "scripts": {
            "start": "nodemon server.js",
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          "keywords": [],
          "author": "",
          "license": "ISC",
          "dependencies": {
            "express": "^4.17.1",
            "nodemon": "^2.0.2"
          }
    }
    ```

    Hãy thử chạy project trước khi tiếp tục

    ```
        npm start
    ```

    Kết quả như sau là được
    ```
        [nodemon] 2.0.2
        [nodemon] to restart at any time, enter `rs`
        [nodemon] watching dir(s): *.*
        [nodemon] watching extensions: js,mjs,json
        [nodemon] starting `node server.js`
        server running on port 3000
    ```

    Tiếp đến ta cần một file chưa script xử lý python `process.py`:
    ```python
        import sys 

        print("Output from Python") 
        print("First name: " + sys.argv[1]) 
        print("Last name: " + sys.argv[2]) 
    ```

# Cách 1: gọi Python script từ Node child process
- Chúng ta cần sửa lại một chút file server của Express để nó gọi đến Python script child process

    ```js
    // server.js

        ...

        app.get('/name', callName);
        function callName(req, res) {
          var spawn = require('child_process').spawn;

          // E.g : http://localhost:3000/name?firstname=van&lastname=nghia
          var process = spawn('python', [
            './process.py',
            req.query.firstname,
            req.query.lastname
          ]);
          process.stdout.on('data', function(data) {
            console.log(data.toString());
        
            res.send(data.toString());
          });
        }
    ```
    Hàm được sử dụng để tương tác giữa nodejs và python ở đây là **child_process.spawn()**
    theo như định nghĩa thì :
    ```
        child_process.spawn(): This method helps us to spawn child process asynchronously.
    ```

    hàm `child_process.spawn()` sẽ có các tham số như sau 
    ```js
        var process = spawn('python', ['./process.py',arg1,arg2,.....]);

        - Tham số đầu tiên sẽ là file python script
        - theo sau sẽ là các arg tham số ta muốn truyền vào
    ```
     Các tham số truyền vào sẽ được lấy ra theo đúng thứ tự
     ```python
     # process.py
         ...
            
         print("First name: " + sys.argv[1]) 
         print("Last name: " + sys.argv[2])
     ```
     
     Chạy ựng dụng lên và sau đó nhập đường link ví dụ là `http://localhost:3000/name?firstname=van&lastname=nghia` kết quả :
     
     ![](https://images.viblo.asia/80706d93-65eb-4c87-8edf-3d0822d80435.png)
    
     trong console:
     
     ![](https://images.viblo.asia/dfc334da-604b-4bcf-b7ef-a620620c2eeb.png)

# Cách 2: gọi Python script từ Node child process bằng cách sử dụng python-shell package

- Cách này có thể hiểu là cách 1.1 vì thực ra ta vẫn sử dụng child process nhưng lúc này chúng ta sẽ sử dụng [python-shell](https://github.com/extrabacon/python-shell) để gộp các chi tiết triển khai (cũng như cung cấp xử lý lỗi và các tiện ích khác bao gồm triển khai một messaging đơn giản để giao tiếp trực tiếp với một script đơn) .

    Ta sẽ viết lại file server như sau:
    
    ```js
    // server.js
        app.get('/name', callName);
        function callName(req, res) {
        
          let { PythonShell } = require('python-shell');
          var options = {
            args: [req.query.firstname, req.query.lastname]
          };

          PythonShell.run('process.py', options, function(err, data) {
            if (err) res.send(err);
            console.log(data.toString());

            res.send(data.toString());
          });
        }
    ```
    
    Install package `python-shell` :
    ```
        npm i python-shell --save
    ```
    
   chạy để kiểm tra ta sẽ có kết quả :
   
   ![](https://images.viblo.asia/8dbe68cd-8372-49c4-b6b9-3f5447421443.png)
   
   ![](https://images.viblo.asia/5eed4109-6d5b-49c8-8529-aeda52986805.png)

# Cách 3 : sử dụng một message broker
- Bây giờ chúng ta sẽ chạy ứng dụng Python và Node như các quy trình riêng biệt và sử dụng một message broker để giao tiếp giữa chúng . Ở đây chúng tôi sử dụng **RabbitMQ**, cùng với **amqplib** để tích hợp trong node và **pika** cho Python.

    Thực hiện theo cài đặt RabbitMQ nếu bạn chưa cài, trên OSX bạn có thể chạy một cách đơn giản:
    ```
        sudo apt update
        
        sudo apt -y install rabbitmq-server

        pip install pika

        npm install amqplib  --save
    ```

    Sau đó start `RabbitMQ`:
    ```
        sudo systemctl start  rabbitmq-server.service
    ```
    
    Bây giờ chúng ra sẽ chỉnh sửa file `server.js`. Sử dụng **amqplib** trong node để kết nối đến RabbitMQ instance đang chạy:
    
    ```js
    //server.js
        app.get('/name', callName);
        function callName(req, res) {
        
          var amqp = require('amqplib/callback_api');
          var input = [req.query.firstname, req.query.lastname];
          
          amqp.connect('amqp://localhost', function(err, conn) {
            conn.createChannel(function(err, ch) {
              var simulations = 'simulations';
              ch.assertQueue(simulations, { durable: false });
              var results = 'results';
              ch.assertQueue(results, { durable: false });
              ch.sendToQueue(simulations, Buffer.from(JSON.stringify(input)));
              ch.consume(
                results,
                function(msg) {
                  console.log(msg.content.toString());

                  res.send(msg.content.toString());
                },
                { noAck: true }
              );
            });
            setTimeout(function() {
              conn.close();
            }, 500);
          });
        }
    ```

    Chúng ta viết một trình xử lý message đơn giản bằng Python để xử lý các request messages, gọi process.py và publish response messages - message.py:
    
    ```python
        import pika
        import process
        import json

        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='simulations')
        channel.queue_declare(queue='results')

        def callback(ch, method, properties, body):
          requestParams = json.loads(body.decode('utf-8'))
          firstname = str(requestParams[0])
          lastname = str(requestParams[1])
          results = process.simulate(firstname, lastname)
          channel.basic_publish(exchange='', routing_key='results', body=json.dumps(results, ensure_ascii=False))


        channel.basic_consume(queue='simulations', on_message_callback=callback, auto_ack=True)
        channel.start_consuming()
    ```
    
    Tiếp đến Chúng ta cần thực hiện một số thay đổi nhỏ đối với process.py - bây giờ chúng ta sẽ truyền các tham số vào, thay vì sử dụng sys.argvs và expose ra một method mà chúng ta có thể gọi từ message.py:
    ```python
    # process.py
    
        import sys 

        # print("Output from Python") 
        # print("First name: " + sys.argv[1]) 
        # print("Last name: " + sys.argv[2])

        def simulate(firstname, lastname):

            results = {
                'firstname': firstname,
                'lastname': lastname
            }
            return results
    ```
    
    Các bước để chạy thì đầu tiên ra sẽ run file `message.py`:
    ```
        python message.py
    ```
    
    rồi mới chạy đến server node:
    
    ```
        npm start
    ```
    
    Kiểm tra kết quả
    ![](https://images.viblo.asia/31e4d512-13e1-4b28-acff-cc221997725f.png)
    ![](https://images.viblo.asia/4c8a21fa-d35d-4fda-a408-4834d7827f41.png)


#  Kết Luận
Đây là một sự kết hợp đơn giản của Python và Node.js, điều này hữu ích cho các tình huống mà bạn muốn sử dụng các khả năng tính toàn của Python nhưng lại muốn tận dụng các lợi thế của ứng dụng Node.js. Mong rằng qua bài biết này các bạn có thể sử dụng và phát triển ứng dụng của mình tốt hơn từ những điều cơ bản này.

#### Source: https://github.com/ngovannghia1997kma/Node_integrate_Python

#### Nguồn :
https://medium.com/@HolmesLaurence/integrating-node-and-python-6b8454bfc272
https://www.geeksforgeeks.org/run-python-script-node-js-using-child-process-spawn-method/