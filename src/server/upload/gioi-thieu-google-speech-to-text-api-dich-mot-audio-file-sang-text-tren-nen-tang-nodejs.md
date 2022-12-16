Nhận diện giọng nói là một task khá thú vị. Ngày nay, có rất nhiều API resources có sẵn trên thị trường, giúp người dùng dễ dàng lựa chọn cái này hay cái khác như Google, Amazon, IBM, Microsoft, Nuance, Rev.ai, Open source Wavenet, Open source CMU Sphinx. Trong bài viết này mình sẽ trình bày sơ lược về Google Speech to Text API nền tảng Nodejs.
## Before you begin
Trước khi bắt đầu bạn cần set up dự án Google Cloud Platform và Authorization cho dự án. phần này bạn có thể xem chi tiết tại document của Google Speech to Text  API phần [Before you begin](https://cloud.google.com/speech-to-text/docs/quickstart-protocol)

## Google Speech to Text API
Trong bài viết này mình sẽ hướng dẫn bạn gửi yêu cầu nhận dạng giọng nói tới Speech-to-Text bằng cách sử dụng Google Cloud Client Libraries và mình làm trên nền tảng Node.js sử dụng thư viện [@google-cloud/speech](https://www.npmjs.com/package/@google-cloud/speech) .

Google Speech to Text có 3 loại API requests dựa trên nội dung của audio.

![](https://images.viblo.asia/ce124f1d-e167-4f1f-9f30-a4d40b0b3bce.png)

Mình sẽ hướng dẫn thực hiện các requests trên để dịch các loaị audio khác nhau.

### Dịch các audio files có độ dài ngắn

Phần này trình bày cách phiên âm một tệp âm thanh ngắn(dưới 1 phút) thành văn bản bằng cách sử dụng Synchronous Speech Recognition. Đối với audio dài ta sẽ sử dụng Asynchronous Speech Recognition.

Đầu tiên ta cần init project:
1. Tạo folder speech-to-text, tạo file app.js
2. Dùng npm để quản lý các thư viên `npm init`
3. Cài thư viện google-cloud/speech `npm i @google-cloud/speech`

Cấu trúc thư mục sẽ có dạng như hình bên dưới:
![](https://images.viblo.asia/979710e0-4d99-4737-abef-d0556ed0bf43.png)

Ở đây ta chuẩn bị sẵn một file `audio.flac` để thực hiện dịch file này. Để mang lại độ hiệu quả, độ chính xác cao hơn cũng như thời gian phản hồi hợp lý từ dịch vụ thì tài liệu này có đề xuất về cách cung cấp dữ liệu giọng nói, mọi người tham khảo để việc dịch sang text hiệu quả hơn [recommended speech data](https://cloud.google.com/speech-to-text/docs/best-practices)

`speech-to-text-service.json` file này chính là private key để xác thực truy cập vào dịch vụ mà bạn đã download ở bước **Before you begin**. Lưu ý nếu bạn có đẩy dự án nào có key này lên repository của github hoăc bất kỳ công cụ quản lý source nào khác thì ignore file này ra không thì sẽ bị hacker chiếm quyền tài khoản google cloud của bạn.

`.env` file này chứa biến `GOOGLE_APPLICATION_CREDENTIALS`. Biến này có giá trị là đường dẫn trỏ tới file private key `speech-to-text-service.json` phía trên của bạn, trên bước  **Before you begin** có đề cập tới phần này

Vậy là xong quá trính setup bây giờ chung ta xem qua đoạn code này trong `app.js` để cùng trải nghiệm dịch vụ này nhé

```
async function main() {
  // Import dotenv để đọc được biến môi trường trong .env
  // Nếu chưa có chạy npm i dotenv để cài đặt nó
  require('dotenv').config()
  // Import module fs để đọc file
  const fs = require('fs');
  // Import thư viện Google Cloud client
  const speech = require('@google-cloud/speech');

  // Creates a client
  const client = new speech.SpeechClient();

  // Khai báo trỏ tới file local của bạn
  const filename = './audio.flac';
  // Số lượng kênh có trong âm thanh của bạn. Nếu không đúng sẽ raise error
  const audioChannelCount = 2;
  // Khai báo encoding
  const encoding = 'FLAC';
  // Tỉ lệ mẫu tính bằng Hertz của audio, nêú không đúng sẽ raise error
  const sampleRateHertz = 44100;
  // Khai báo code ngôn ngữ cần nhận dạng
  const languageCode = 'en-US';

  const config = {
    audioChannelCount: audioChannelCount,
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Phát hiện giọng nói trong audio
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log('Transcription: ', transcription);
}

main().catch(console.error);
```

Ngoài những gì mình giải thích trong code trên thì bạn cần lưu ý một vài điều sau:

* Service giới hạn 10Mb khi gởi request API với file audio nằm ở local, nghĩa là file `audio.flac` của bạn ở local chỉ được phép tối đã 10Mb và phải có thời lượng nhỏ hơn 1 phút không thì sẽ báo lỗi. Trong trường hợp file bạn lớn hơn thì bạn phải upload lên Google Cloud Storage(phải là storage của google vì hiện giờ uri chỉ support cho mỗi google) và dùng URI của file đó trong request bạn có thể tham khảo [tại đây](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionAudio).
* Các hạn chế API hiện tại và giới hạn sử dụng đối với tính năng Cloud Speech-to-Text bạn có thể tham khảo [tại đây](https://cloud.google.com/speech-to-text/quotas).
* Về Encoding thì service support nhiều tuy nhiên sử dụng hiệu quả hơn thì bạn nên dùng FLAC hoặc LINEAR16. [Đây](https://cloud.google.com/speech-to-text/docs/reference/rest/v1/RecognitionConfig#AudioEncoding) là các encoding mà service support.
* Về languageCode bạn phải đặt đúng mã code ngôn ngữ bạn muốn nhận dạng, không thì nó sẽ không ra, Cloud Speech-to-Text hỗ trợ rất nhiều ngôn ngữ khác nhau bạn có thể xem [tại đây](https://cloud.google.com/speech-to-text/docs/languages)

Cuối cùng thì run `node app.js` để trải nghiệm dịch vụ này. Khi mình chạy thì kết quả sẽ được như bên dưới và còn rất nhiều config để có được kết quả như mình mong muốn bạn chịu khó đọc document chính thức của dịch vụ này nhé [Speech-to-Text basics](https://cloud.google.com/speech-to-text/docs/basics).

```
Transcription:  questions 44 through 46 refer to the following conversation
```

### Dịch các audio files có độ dài dài

Phần này trình bày cách phiên âm các tệp âm thanh dài (hơn 1 phút) sang văn bản bằng tính năng nhận dạng giọng nói không đồng bộ. 

Bạn có thể truy xuất kết quả của thao tác bằng phương thức `google.longrunning.Operations`. Kết quả vẫn có sẵn để truy xuất trong 5 ngày (120 giờ).

```
async function main() {
  require('dotenv').config()
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  const client = new speech.SpeechClient();

  const filename = './audio.flac';
  const audioChannelCount = 2;
  const encoding = 'FLAC';
  const sampleRateHertz = 44100;
  const languageCode = 'en-US';

  const config = {
    audioChannelCount: audioChannelCount,
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  const [operation] = await client.longRunningRecognize(request);

  const [response] = await operation.promise();
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
main().catch(console.error);
```

Cũng tương tự như dịch các audio có độ dài gắn, chỉ khác API này dùng phương thức `google.longrunning.Operations` và chạy bất đồng bộ.

### Dịch các âm thanh đầu vào một cách trực tiếp

Phần này trình bày cách chuyển âm thanh phát trực tuyến, chẳng hạn như đầu vào từ micrô, thành văn bản. Xem thêm [giới hạn](https://cloud.google.com/speech-to-text/quotas) âm thanh cho các yêu cầu nhận dạng giọng nói phát trực tuyến.

Dưới đây là một ví dụ về thực hiện nhận dạng giọng nói phát trực tuyến trên luồng âm thanh nhận được từ micrô:

Ví dụ này yêu cầu bạn cài đặt SoX và nó phải có sẵn trong `$PATH` của bạn. Để cài đặt đối với linux `sudo apt-get install sox libsox-fmt-all`

```
require('dotenv').config()
// Import node-record-lpcm16 để ghi lại âm thanh
// Nếu chưa có chạy npm install node-record-lpcm16 để cài đặt
const recorder = require('node-record-lpcm16');

const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false,
};
// Tạo luồng nhận dạng
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data =>
    process.stdout.write(
      data.results[0] && data.results[0].alternatives[0]
        ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
        : '\n\nReached transcription time limit, press Ctrl+C\n'
    )
  );
// Bắt đầu ghi âm và gửi đầu vào micrô tới API giọng nói.
// Đảm bảo SoX được cài đặt
recorder
  .record({
    sampleRateHertz: sampleRateHertz,
    threshold: 0,
    // Các tùy chọn khác, xem https://www.npmjs.com/package/node-record-lpcm16#options
    verbose: false,
    recordProgram: 'rec',
    silence: '10.0',
  })
  .stream()
  .on('error', console.error)
  .pipe(recognizeStream);

console.log('Listening, press Ctrl+C to stop.');

```
Xong bạn chạy `node app.js` trên console sẽ xuất hiện dòng `Listening, press Ctrl+C to stop`, bắt đầu bạn ghi âm nó sẽ dịch trực tiếp cho bạn

```
Listening, press Ctrl+C to stop.
Transcription: hello
```
## Kết luận
Trên đây mình đã giới thiệu qua về Google Speech to Text API và một số điều cần lưu ý, cũng như tài liệu tham khảo, hi vọng bài viết này sẽ giúp ích cho các bạn, cảm ơn các bạn đã đọc bài viết của mình