Trong [bài viết trước](https://viblo.asia/p/xay-dung-chat-bot-don-gian-theo-kich-ban-co-san-phan-1-jvElaGdYKkw), mình đã chia sẻ với mọi người về ý tưởng xây dựng một Chatbot theo kịch bản có sẵn. Trong phần này, mình sẽ cùng mọi người từng bước để xây dựng 1 con Chatbot demo.

##  Kịch bản demo
Kịch bản gồm :
 - Câu kích hoạt: câu hỏi chủ đề.
- Bot hỏi (nói).
- Người dùng trả lời (yêu cầu).
- Bot Xử lý lấy kết quả.

``` python:resources/script_demo
0::start::.*?hợp đồng.*?điện::1
1::speak::Để phục vụ bạn chi tiết hơn, bạn vui lòng cung cấp thêm thông tin cá nhân.::36
2::choose::không::không|không.*?được|.{1,6}không.{1,6}::6::có::.*?(có|được|đồng ý|nhất trí).*?::3
3::speak::Mời bạn đọc số điện thoại::4
4::input::<NUMBER>::16
5::speak::Cảm ơn bạn::6
6::speak::Bạn cần chúng tôi tư vấn gì về hợp đồng mua bán điện? Thay đổi thông tin, Gia hạn, Chấm dứt, Tạm ngừng sử dụng điện, hay Cấp lại?::7
7::choose_req::thay đổi thông tin::.*?(thay|đổi|thay đổi).*?::24::gia hạn::.*?gia hạn.*?::24::chấm dứt::.*?chấm dứt.*?::24::tạm ngưng sử dụng điện::.*?tạm (ngừng|ngưng|dừng).*?::24::cấp lại::.*?cấp lại.*?::24
8::solve::<SHOW_MEET_TIME>::::35::::35
9::solve::<SAVE_DATE>::::33::::33
10::solve::<SAVE_TIME>::::8::::8
11::speak::Về việc Tạm ngừng sử dụng điện .. blah .. blah::13
12::speak::Về việc cấp lại hợp đồng điện .. blah .. blah::13
13::speak::Bạn cần mình tư vấn điều gì nữa không?::14
14::choose::không::không|không.*?được|.{1,6}không.{1,6}::15::có::.*?(có|được|đồng ý|nhất trí).*?::6
15::speak::Cảm ơn bạn, chúc bạn một ngày tốt lành!::-1
16::solve::<SAVE_NUMBER_PHONE>::<EXIST>::18::<NEW>::19
17::speak::ha ha::15
18::speak::Thông tin của bạn: <ATT>::5
19::speak::Bạn có sẵn sàng cung cấp địa chỉ/ khu vực bạn sinh sống không?::20
20::choose::không::không|không.*?được|.{1,6}không.{1,6}::6::có::.*?(có|được|đồng ý|nhất trí).*?::21
21::speak::Mời bạn đọc địa chỉ::22
22::input::<ADDRESS>::23
23::solve::<SAVE_ADDRESS>::<OK>::5
24::speak::Bạn muốn chúng tôi tư vấn thủ tục nào của vấn đề <ATT>?::25
25::speak::Kênh tiếp nhận, Hồ sơ, Chi phí hay Thời gian giải quyết?::26
26::choose_req::kênh tiếp nhận::.*?kênh tiếp nhận.*?::38::hồ sơ::.*?hồ sơ.*?::38::chi phí::.*?chi phí.*?::38::thời gian::.*?thời gian.*?::38
27::solve::<SHOW_REQUEST>::<EXIST>::28::<NEW>::28
28::speak::<ATT>::29
29::speak::Bạn có muốn đặt lịch hẹn không?::30
30::choose::không::không|không.*?được|.{1,6}không.{1,6}::13::có::.*?(có|được|đồng ý|nhất trí).*?::31
31::speak::Mời bạn chọn ngày::32
32::input::<DATE>::9
33::speak::Mời bạn chọn giờ::34
34::input::<TIME>::10
35::speak::Bạn đặt lịch hẹn vào <ATT>::13
36::speak::Trong trường hợp không cần thiết, bạn có thể lựa chọn Không để nhận được thông tin tổng quan.::37
37::speak::Bạn có sẵn sàng cung cấp số điện thoại không?::2
38::solve::<CHECK_INFO>::<EXITS>::27::<NEW>::27

```

## Bot

    
Một **Bot** sẽ quản lý `user`, `script`, trả ra `response` cho người dùng khi `script` xử lý thông tin xong.

``` python:bot.py

import sys
from script import Script
from flask import jsonify
from static import *
import time
from user import User

class Bot:
    def __init__(self):
        self.stop = False
        self.user = User()
        self.script = Script(self)
        self.list_speaks = []
        self.born_time = time.time()

    def reset_time(self):
        self.born_time = time.time()

    def check_over_time(self):
        if time.time() - self.born_time > SESSION_LIVE_TIME:
            return True
        return False

    def solved(self, prob, ok):
        pass

    def speak(self, sentence):
        return sentence
        # return jsonify({"answer": sentence})

    def listen(self):
        sentence = sys.stdin.readline()
        sentence = sentence[0:len(sentence) - 1]
        return sentence
        # return jsonify({"answer": sentence})

    def next_sentence(self, input=None):
        script = self.script
        if self.stop:
            return jsonify({"answer": "STOP"})
        node = script.get_node()
        if node is None:
            self.script.reset()
            return self.next_sentence()
        if not node.type == "speak":
            self.list_speaks = []
        if node.type == "speak":
            ans = self.speak(node.get_speak_sentence())
            script.next_node()
            self.list_speaks.append(ans)
            if script.get_node() is None or not script.get_node().type == "speak":
                return self.list_speaks
            return self.next_sentence()
        elif node.type == "start":
            if input is None:
                input = ""
            sentence = input
            if not node.check_question(sentence):
                ans = self.speak(START_CONVERSATION_SENTENCE)
                return ans
            else:
                script.next_node()
        elif node.type == "input":
            if input is None:
                return None
            input = input
            if node.check_input(input):
                script.next_node(input)
            else:
                return self.speak(ERROR_INPUT)
        elif node.type == "solve":
            answer = node.solve()
            self.solved(node.func, answer)
            script.next_node(answer)
        else:
            if input is None:
                return None
            input = node.select_a_choose(input.lower())
            # print(node.type, bot.user_request)
            if input is None:
                return self.speak(ERROR_CHOOSE)
            else:
                input = input
                if node.type == "choose_req":
                    self.user.set_request(self.user.request + (input + "::"))
                script.next_node(input)
        return self.next_sentence()
```

## Script
Quản lý `list_node` -> kịch bản người dùng, chuyển trạng thái từ `node` này sang `node` khác.

``` python:script.py
from static import *
from node import MainQuestion, SpeakSentence, InputSentence, SolveCase, ChooseSentence

def get_type(raw):
    tmp = raw.split("::")
    return tmp[1]

class Script:
    def __init__(self, chat_bot):
        file_script = open(SCRIPT_FILE, "r")
        self.list_node = []
        self.chat_bot = chat_bot
        for line in file_script:
            raw_node = line[0:len(line) - 1]
            # print(raw_node)
            type = get_type(raw_node)
            if type == "start":
                node = MainQuestion(raw_node, chat_bot=chat_bot)
            elif type == "speak":
                node = SpeakSentence(raw_node, chat_bot=chat_bot)
            elif type == "input":
                node = InputSentence(raw_node, chat_bot=chat_bot)
            elif type == "solve":
                node = SolveCase(raw_node, chat_bot=chat_bot)
            else:
                node = ChooseSentence(raw_node, chat_bot=chat_bot, type=type)
            self.list_node.append(node)
        self.id_now = 0

    def get_start_node(self):
        if len(self.list_node) == 0:
            return None
        return self.list_node[0]

    def get_node(self):
        if self.id_now == -1:
            return None
        return self.list_node[self.id_now]

    def next_node(self, attribute=None):
        self.id_now = self.list_node[self.id_now].get_next()
        if self.get_node() is not None:
            self.get_node().set_attribute(attribute)

    def reset(self):
        self.__init__(self)
```

## Node

Abstract Node : là một `node` trong `script`, `set_next`, `get_next` -> chuyển trạng thái trong `script`.

``` python:node.py
import checker
import services

class Node:
    def __init__(self, raw, chat_bot, type=None, id=-1):
        self.type = type
        self.id = id
        self.next = None
        self.raw = raw
        self.chat_bot = chat_bot
        if type == "input":
            self.raw = self.raw.lower()
        self.id_next = -1
        self.attribute = None

    def set_next(self, id_next):
        self.id_next = id_next

    def set_attribute(self, att=None):
        self.attribute = att

    def get_next(self):
        return self.id_next
```
- `Node` dạng `Speak`
```python
class SpeakSentence(Node):
    def __init__(self, raw, chat_bot):
        super().__init__(raw=raw,  chat_bot=chat_bot, type="speak")
        tmp = raw.split("::")
        self.set_next(int(tmp[len(tmp) - 1]))

    def get_speak_sentence(self):
        ans = self.raw.split("::")[2]
        if self.attribute is not None:
            ans = ans.replace("<ATT>", self.attribute)
        return ans

```
- `Node` dạng `Chọn yêu cầu`
```python
class ChooseSentence(Node):
    def __init__(self, raw, chat_bot, type="choose"):
        super().__init__(raw=raw, chat_bot=chat_bot,type=type)
        self.list_chooses = []
        tmp = raw.split("::")[2:len(raw)]
        # print(raw)
        for i in range(0, len(tmp), 3):
            self.list_chooses.append((tmp[i], tmp[i+1], int(tmp[i + 2])))

    def select_a_choose(self, input):
        for choose in self.list_chooses:
            if checker.check_choose(input, choose[1]):
                self.set_next(choose[2])
                return choose[0]
        return None

```
- `Node` dạng `nhập input`
```python
class InputSentence(Node):
    def __init__(self, raw, chat_bot):
        super().__init__(raw=raw, chat_bot=chat_bot, type="input")
        self.input_type = "<NONE>"
        tmp = raw.split("::")
        self.set_next(int(tmp[len(tmp) - 1]))
        self.input_value(tmp[2])

    def input_value(self, value=""):
        self.input_type = value

    def check_input(self, input):
        return checker.check_input_type(input, self.input_type)

```
- `Node` dạng `câu hỏi từ Bot`
```python
class MainQuestion(Node):
    
    def __init__(self, raw, chat_bot):
        super().__init__(raw=raw, chat_bot=chat_bot, type="start")
        tmp = raw.split("::")
        self.question = tmp[2]
        self.set_next(int(tmp[len(tmp) - 1]))

    def check_question(self, input):
        if self.question is None:
            return False
        return checker.check_start_question(input, self.question)

```
- `Node solve`: Bot xử lý thông tin, và tính toán
```python
class SolveCase(Node):
    def __init__(self, raw, chat_bot):
        super().__init__(raw, chat_bot=chat_bot, type="solve")
        tmp = raw.split("::")
        self.func = tmp[2]
        tmp = raw.split("::")[3:len(raw)]
        self.list_answers = []
        for i in range(0, len(tmp), 2):
            self.list_answers.append((tmp[i], int(tmp[i + 1])))

    def save_number_phone(self):
        number_phone = self.attribute
        ans, value = services.save_number_phone(number_phone)
        for x in self.list_answers:
            if x[0] == ans:
                self.set_next(x[1])
                self.chat_bot.user.set_phone(number_phone)
                return value

    def save_address(self):
        ans, value = services.save_address(self.chat_bot.user_phone, self.attribute)
        self.set_next(self.list_answers[0][1])
        self.chat_bot.user.set_address()
        return value

    def save_date(self):
        self.chat_bot.user.date_meet = self.attribute
        self.set_next(self.list_answers[0][1])
        return "OK"

    def save_time(self):
        self.chat_bot.user.time_meet = self.attribute
        self.set_next(self.list_answers[0][1])
        return "OK"

    def check_info(self):
        value = services.get_address(self.chat_bot.user.phone)
        self.set_next(self.list_answers[0][1])
        return value

    def show_meet_time(self):
        ans = self.chat_bot.user.time_meet + " ngày " + self.chat_bot.user.date_meet
        self.set_next(self.list_answers[0][1])
        return ans

    def show_request(self):
        ans = ">> Thông tin về " + self.chat_bot.user.request + ""
        if self.attribute is None:
            ans = ans + " tổng quát"
        else:
            ans = ans + " tại " + self.attribute
        self.set_next(self.list_answers[0][1])
        return ans

    def solve(self):
        if self.func == "<SAVE_NUMBER_PHONE>":
            return self.save_number_phone()
        elif self.func == "<SAVE_ADDRESS>":
            return self.save_address()
        elif self.func == "<CHECK_INFO>":
            return self.check_info()
        elif self.func == "<SHOW_REQUEST>":
            return self.show_request()
        elif self.func == "<SAVE_DATE>":
            return self.save_date()
        elif self.func == "<SAVE_TIME>":
            return self.save_time()
        elif self.func == "<SHOW_MEET_TIME>":
            return self.show_meet_time()
        else:
            pass
```

##  Main 
``` python:main_demo.py
from static import *
from bot import Bot

def start_conversation():
    chat_bot = Bot()
    print(chat_bot.speak(START_CONVERSATION_SENTENCE))
    while True:
        ans = chat_bot.next_sentence()
        print(ans)
        if ans is None:
            break

def main():
    while True:
        print("=========================================================")
        start_conversation()
        
if __name__ == "__main__":
    main()
```

<hr>

Trên đây là những bước implement 1 con Bot theo kịch bản được cung cấp trước. Con Bot này của mình thực sự khá đơn sơ, vì vậy trong bài viết chủ yếu chỉ có code =)) 

Các bạn có thêm tham khảo source code hoàn chỉnh [tại đây](https://github.com/daothaison/chatbot-demo).