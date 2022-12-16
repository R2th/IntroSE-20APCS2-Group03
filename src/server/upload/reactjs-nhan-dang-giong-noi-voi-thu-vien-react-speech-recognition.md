Nếu các bạn đã quen dùng React vào các bài tập, dự án của mình hoặc team, và thích khám phá những điều thú vị xung quanh React thì hôm nay mình xin giới thiệu đến các bạn 1 thư viện khá thú vị của React - React Speech Recognition
Đầu tiên, mình sẽ bắt đầu với việc đó là gì và dùng để làm gì.
Nếu bạn đã từng thử code gì đó có dính dáng tới các task liên quan đến speech-to-text hoặc text-to-speech, thì chắc bạn cũng đã từng hỏi Gu Gồ Sama và biết đến Speech Recognition API.
Chúng t hãy liếc nhẹ 1 chút về Speech Recognition API:

> The SpeechRecognition interface of the Web Speech API is the controller interface for the recognition service; this also handles the SpeechRecognitionEvent sent from the recognition service.


Cụ thể hơn thì nó giúp bạn thao tác với regconition services, để thực hiện những lệnh thao tác như bật mic, tắt mic, nhận dạng giọng nói và chuyển nó thành text, chuyển text thành giọng nói của chị gu gồ và React đã dựa vào đó để xây dựng thư viện phù hợp để áp dụng cho chính nó React Speech Recognition.

Hiện tại theo những gì được cập nhật trên trang của react-speech-recognition 2 tháng trước thì hiện tại nó chỉ làm việc trên Chrome nên bạn nào còn xài IE thì bỏ đi nhá.

Cài đặt:

```
npm install react-speech-recognition
```

Import vào code:

```
const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const options = {
  autoStart: false
}

export default SpeechRecognition(options)(yourComponent);
```

Trong đó:

`transcript` là đoạn text bạn sẽ nhận được khi nói vào micro,

`resetTranscript()` là function reset lại giá trị của transcript về null,

`autoStart` sẽ xác định việc bạn có mún bật mic ngay khi Component được render ra không

Ngoài ra, còn 1 số props từ SpeechRecognition mà bạn có thể sử dụng như

`startListening()`: kích hoạt Web Speech API bật mic của bạn, nó sẽ lắng nghe âm thanh thu được từ micro và chuyển thành giá trị string lưu vào transcript

`stopListening()`: kích hoạt Web Speech API bật mic của bạn, nhưng sẽ vẫn duy trì những tiến trình nhận diện speech cho tới khi nó kết thúc

`abortListening()`: giống như ulti của Silencer vậy, nó sẽ khiến bạn chỉ biết câm nín và ngắt mọi tiến trình nhận diện speech

`browserSupportsSpeechRecognition()`: check xem browser của bạn có đủ nhân phẩm để được nó hỗ trợ hay không

`listening()`: check xem Web Speech API có đang lắng nghe những gì bạn nói từ micro

Và cuối cùng sẽ là 1 ví dụ nhỏ:

```
import React, { useState, useEffect } from 'react';
import SpeechRecognition from 'react-speech-recognition';

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = 'en-US' ;
// nếu bạn nhập ở đây là vn-VN để chuyển qua thành tiếng việt 
// thì không chính xác đâu nhé,
// lúc viết bài này, mình có tra qua bảng những ngôn ngữ hỗ trợ thì 
// không thấy tiếng Việt nó có ghi trên đó
// nhưng apply vào dự án thì cũng không cần nhập dữ liệu vào 
// biến này thì nó vẫn nhận dạng được 
// tiếng việt và tiếng Anh (yaoming) (thatvidieu)

//------------------------COMPONENT-----------------------------

const SpeechRecognition = ({ transcript, startListening, stopListening }) => {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
      setContent(transcript);
  }, [transcript])

  return (
    <div className='container'>
      <button className='button' onClick={() => startListening()}>
          Start
      </button>
      <button className='button' onClick={() => stopListening()}>
          Stop
      </button>
      <div className='content'>
          {this.state.content}
      </div>
    </div>
  )
}

SearchVoice.propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  startListening: PropTypes.func,
  abortListening: PropTypes.func,
  recognition: PropTypes.object,
};

const options = {
  autoStart: false
}

export default SpeechRecognition(options)(SpeechRecognition)
```

Nhấn Start Button để bắt đầu thu âm giọng nói của bạn và chuyển qua text và text đó sẽ được hiển thị tại div content, nhấn Stop để dừng lại.

Vậy là xem như chúng ta đã bước đầu tiếp cận với React Speech Recognition, cảm ơn mọi người đã dành thời gian để đọc bài chia sẻ của mình :3

Link tham khảo:

https://medium.com/@amanda.k.hussey/a-basic-tutorial-on-how-to-incorporate-speech-recognition-with-react-6dff9763cea5
https://www.npmjs.com/package/react-speech-recognition, https://codeburst.io/html5-speech-recognition-api-670846a50e92