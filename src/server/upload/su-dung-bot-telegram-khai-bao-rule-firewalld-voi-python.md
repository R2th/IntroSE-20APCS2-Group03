Với các bạn sử dung hệ điều hành Centos 7 thì không còn xa lạ khái niệm **FirewallD**, nó là một giải pháp tường lửa mạnh mẽ được cài đặt mặc định trên **RHEL 7 và Centos 7** nhằm thay thế Iptables.
FirewallD sử dụng "zone" và "services" thay vì "chain" và "rule" trong Iptables.

Ở bài viết này mình sẽ không đi sâu về FirewallD mà sẽ hướng dẫn các bạn viết một con Bot Telegram đơn giản để thực hiện việc khai báo rule kết nối trên FirewallD.

Để khai báo rule kết nối  trên server ta cần chạy các lệnh:
```
firewall-cmd --permanent --add-rich-rule 'rule family="ipv4" source address="115.146.126.xxx/32" port protocol="tcp" port="xxx" accept'
firewall-cmd --reload
```

Bài toán đặt ra là Bot Telegram sẽ nhận 2 giá trị **address** và **port** mà chúng ta nhập vào và thực hiện 2 lệnh trên.

**Bước 1: Chuẩn bị môi trường**
* Tạo Bot Telegram, mình đã có một bài viết hướng dẫn ở bài trước[ link](https://viblo.asia/p/gui-thong-bao-qua-telegram-su-dung-python-ket-hop-markdown-2oKLn0nG4QO)
* Install môi trường python-telegram-bot (ở đây mình đã cài sẵn môi trường python3.7 trên server)
```
pip3.7 install python-telegram-bot
```

**Bước 2: Code bot xử lý khai báo rule kết nối trên Firewalld**

Tạo một file bot_anhln.py với nội dung như dưới
```
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# pip3.7 install python-telegram-bot

import os
import logging
from telegram import Update, ForceReply
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext

# Enable Loging INFO/DEBUG
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.DEBUG)

logger = logging.getLogger(__name__)

def error(update, context):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, context.error)


def firewalld_add_source_ip_port(update, context):
    firewalld1 = '''firewall-cmd --permanent --add-rich-rule 'rule family="ipv4" source address="'''+str(context.args[0])+'''/32" port protocol="tcp" port="'''+str(context.args[1])+'''" accept'''+"'"
    print(firewalld1)
    firewalld2= "firewall-cmd --reload"
    os.system(firewalld1)
    os.system(firewalld2)
    update.message.reply_text('Server Dev: 115.146.126.xx add firewalld Ok')

def main():
    """Start the bot."""
    # Create the Updater and pass it your bot's token.
    # Make sure to set use_context=True to use the new context based callbacks
    # Post version 12 this will no longer be necessary
    updater = Updater("{Token Telegram}", use_context=True)
    
    # Get the dispatcher to register handlers
    dp = updater.dispatcher
    
    # on different commands - answer in Telegram
    dp.add_handler(CommandHandler("firewalld_add_source_ip_port", firewalld_add_source_ip_port))
   
    # log all errors
    dp.add_error_handler(error)
    
    # Start the Bot
    updater.start_polling()
    
    # Run the bot until you press Ctrl-C or the process receives SIGINT,
    # SIGTERM or SIGABRT. This should be used most of the time, since
    # start_polling() is non-blocking and will stop the bot gracefully.
    updater.idle()

if __name__ == '__main__':
    main()
```

Trên đoạn code trên:

* Mình đã tạo 1 hàm firewalld_add_source_ip_port xử lý việc người dùng nhập vào 2 giá trị source ip và port cần khai báo, trong bot telegram bạn sử dụng context.args[i] để get từng giá trị người dùng nhập vào.
* Sau đó mình dùng os.system trong python để thực thi các lệnh trên linux.
* Và dùng message.reply_text để thông báo lại khi đã thực hiện khai báo xong rule kết nối.

Vậy là ta đã hoàn thành việc tạo một bot đơn giản để khai báo FirewallD, mỗi khi người dùng yêu cầu khai báo kết nối mà bạn đang không ngồi làm việc trên máy tính vẫn có thể thực hiện việc khai báo bình thường :D

**Bước 3: Tận hưởng thành quả thôi**

Mình sẽ để nohup để chạy bot
```
nohup python3.7 bot_anhln.py &
```

![image.png](https://images.viblo.asia/0f86e3e3-e923-4b6e-b782-f3216dffc03d.png)