## Giới thiệu

Xin chào mọi người, vậy là sắp đến tết âm lịch rồi mọi người ạ. Mấy bữa nay đi đâu cũng được nghe nhạc tết, nhạc xuân các kiểu, và quán cà phê Lee Bong Soo mà team mình hay uống cũng không ngoại lệ. 

Trong bài viết hôm nay, cũng với chủ đề âm nhạc, mình sẽ giới thiệu cho mọi người cách tạo một audio player sử dụng `react` để phát nhạc tết kiểu như zing mp3, nhưng mà cùi bắp hơn xíu nhé. Btw, let do it!

## Ảnh Demo

![](https://images.viblo.asia/c8a73fbe-d4bf-4e96-a1b2-5b159032ac48.PNG)

Repo: https://github.com/JeDTr/react-audio-player

## Code

### Khởi tạo project

Ở project này, mình sẽ dùng `create-react-app` nhé

```
$ npx create-react-app react-audio-player
```

`time slider` (cái thanh kéo thả bên dưới) thì mình sẽ dùng `react-input-slider`
```
$ npm i react-input-slider
```

### Icons, Audios, ...

Icons thì mình dùng `svgr` để chuyển từ `svg` sang `react component`. Mọi người cũng có thể tự vẽ bằng `css` nhé. Ở đây mình sẽ dùng svg cho nhanh :v

```js
// icons/index.js
export { default as NextIcon } from './NextIcon'
export { default as PauseIcon } from './PauseIcon'
export { default as PlayIcon } from './PlayIcon'
export { default as PrevIcon } from './PrevIcon'
```

Về phần audio, mình sẽ dùng 3 file mp3 sau:

```js
// audio/index.js
import XuanOiOLaiChoi from "./XuanOiOLaiChoi.mp3";
import NgayXuanLongPhungSumVay from "./NgayXuanLongPhungSumVay.mp3";
import DoanXuanCa from "./DoanXuanCa.mp3";

const audios = [
  {
    src: XuanOiOLaiChoi,
    title: "Xuân Ơi Ở Lại Chơi",
    artist: "Tăng Nhật Tuệ - Hoàng Yến Chibi - Tino",
  },
  {
    src: NgayXuanLongPhungSumVay,
    title: "Ngày Xuân Long Phụng Sum Vầy",
    artist: "Bích Phương",
  },
  {
    src: DoanXuanCa,
    title: "Đoản Xuân Ca",
    artist: "Bích Phương",
  },
];

export default audios;
```

Phần `style`
```scss
// App.scss

* {
  box-sizing: border-box;
}

.App {
  min-height: 100vh;
  padding: 120px 0;
  background-color: #f6f6f6;
  color: #101010; 
  text-align: center;
}

.Song-Thumbnail {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  object-fit: cover;
}

.Song-Title {
  text-transform: capitalize;
  margin-bottom: 0;
}

.Singer {
  margin-top: 0;
  margin-bottom: 32px;
  font-size: 12px;
  color: #333;
}

.Control-Button-Group {
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    cursor: pointer;
  }
}

.Prev-Button,
.Next-Button {
  width: 20px;
}

.Pause-Play-Button {
  display: flex;
  justify-content: center;
  width: 14px;
  height: 22px;
  margin: 0 32px;

  svg {
    height: 22px;
  }
}

```

### Component

Nhân vật chính đây rồi ^^

```js
import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";

import "./App.scss";
import TetImg from "./images/tet.jpg";
import PrevIcon from "./icons/PrevIcon";
import NextIcon from "./icons/NextIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import audios from "./audios";

const App = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  return (
    <div className="App">
      <img className="Song-Thumbnail" src={TetImg} alt="tet" />
      <h2 className="Song-Title">{audios[audioIndex].title}</h2>
      <p className="Singer">{audios[audioIndex].artist}</p>
      <div className="Control-Button-Group">
        <div
          className="Prev-Button"
          onClick={() => setAudioIndex((audioIndex - 1) % audios.length)}
        >
          <PrevIcon />
        </div>
        <div className="Pause-Play-Button" onClick={handlePausePlayClick}>
          {isPlay ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div
          className="Next-Button"
          onClick={() => setAudioIndex((audioIndex + 1) % audios.length)}
        >
          <NextIcon />
        </div>
      </div>
      <TimeSlider
        axis="x"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        styles={{
          track: {
            backgroundColor: "#e3e3e3",
            height: "2px",
          },
          active: {
            backgroundColor: "#333",
            height: "2px",
          },
          thumb: {
            marginTop: "-3px",
            width: "8px",
            height: "8px",
            backgroundColor: "#333",
            borderRadius: 0,
          },
        }}
      />
      <audio
        ref={audioRef}
        src={audios[audioIndex].src}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => setPlay(false)}
      />
    </div>
  );
};

export default App;
```

Cũng không có gì đặc biệt cả, chỉ có một vài sự kiện `prev`, `next`, `pause`,.. . Mọi người nhìn sơ qua là hiểu ấy mà :v

## Tổng kết

Bài viết mang tính chất lưu lại để lúc cần dùng đến thì tham khảo. Mọi người thấy hay thì `upvote` và `clip` nhé. Chúc mọi người thành công :v

## Tham khảo
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio