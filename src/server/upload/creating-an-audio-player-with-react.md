## Intro
I wanted to create a custom audio player which can be easily styled or modified to events. So here it is.

## with vanilla
Lets create a pure vanilla custom audio player. The html5 player is hard to customize in look an feel to match your site's style. 
For this, we'll design a custom one. 

```html
<div class="player">
  <audio id="player"</audio>
  <button id="play"></button>
  <button id="forward"></button>
  <button id="backword"></button>
  <button id="next"></button>
  <button id="prev"></button>
</div>
```

Note here we are using the html audio component, but it won't be shown in the browser ( we didn't add the `controls` property)

Adding `font-awesome` icons to our button we get

```html
<button id="play"><i id="playIcon" class="fas fa-play"></i></button>
<button id="forward"><i class="fas fa-forward"></i></button>
<button id="backword"><i class="fas fa-backward"></i></button>
<button id="next"><i class="fas fa-angle-double-right"></i></button>
<button id="prev"><i class="fas fa-angle-double-left"></i></button>
```

Now we delegate our button click events to the appropriate audio player event.

```javascript
  const player = document.getElementById("player");
  const playButton = document.getElementById("play");
  const forwardButton = document.getElementById("forward");
  const backwordButton = document.getElementById("backword");
  const playIcon = document.getElementById("playIcon");

  const togglePlaybackIcon = () => {
    playButton.classList.toggle("focused");
    playIcon.classList.toggle("fa-pause");
    playIcon.classList.toggle("fa-play");
  }

  player.onended = togglePlaybackIcon;

  playButton.onclick = () => {
    player.paused ? player.play() : player.pause();
    togglePlaybackIcon();
  };

  forwardButton.onclick = () => {
    if(!player.paused) {
      player.currentTime += 1
    }
  };

  backwordButton.onclick = () => {
    if(!player.paused) {
      player.currentTime -= 1
    }
  };
```

let's add some style to the page 

```css
div.player {
  background: #e20000ab;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
}

button {
  border-radius: 30%;
  padding: 10px;
  border: none;
}

button:hover, button.focused {
  background-color: mediumvioletred;
}
```

Now refresh the browser and voila!
![](https://images.viblo.asia/3c386598-50d4-498a-acb3-02aa72817ac7.png)

the full html will be

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Audio player</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="player">
    <audio id="player" src="break_it.mp3"></audio>
    <button id="play"><i id="playIcon" class="fas fa-play"></i></button>
    <button id="forward"><i class="fas fa-forward"></i></button>
    <button id="backword"><i class="fas fa-backward"></i></button>
    <button id="next"><i class="fas fa-angle-double-right"></i></button>
    <button id="prev"><i class="fas fa-angle-double-left"></i></button>
  </div>

  <script>
    const player = document.getElementById("player");
    const playButton = document.getElementById("play");
    const forwardButton = document.getElementById("forward");
    const backwordButton = document.getElementById("backword");
    const playIcon = document.getElementById("playIcon");

    const togglePlaybackIcon = () => {
      playButton.classList.toggle("focused");
      playIcon.classList.toggle("fa-pause");
      playIcon.classList.toggle("fa-play");
    }

    player.onended = togglePlaybackIcon;

    playButton.onclick = () => {
      player.paused ? player.play() : player.pause();
      togglePlaybackIcon();
    };

    forwardButton.onclick = () => {
      if(!player.paused) {
        player.currentTime += 1
      }
    };

    backwordButton.onclick = () => {
      if(!player.paused) {
        player.currentTime -= 1
      }
    };

  </script>
</body>
</html>
```

## with react

Now we convert it to a React component.

our goal is to create a component which we can just call like

```javascript
<Player source="./track1.mp3" />
```

or send a list of tracks like
```javascript
<Player source={[
  "./track1.mp3",
  "./track2.mp3",
  "./track3.mp3"
]} />
```

or if we want to show the information of current track as notification popups (not implemented here, but can be done just modifying few things)
```javascript
<Player source={[
  {
    title: "la isla bonita",
    artist: "Alizee",
    image: "./image.jpg",
    track: "./track.mp3"
  },
  {
    ....
  },
  {
    ....
  }
]} />
```

So, lets create a react project now.
For that we'll use the `create-react-app` npm package to generate our boilerplate

```javascript
npx create-react-app react-audio-player
```
next, cd inside the app, let's create two different files `touch src/Player.js src/Player.css`

Also have a look at the `package.json`

```javascript
{
  "name": "react-audio-player",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "^2.1.8"
  },
  "devDependencies": {},
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```

it's almost all we need. We'll be adding one more package to make coding a little easier.
`npm i -s underscore`

Now let's create our `Player.js`

```javascript
import React, { Component } from 'react';
import _ from 'underscore';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    let track = "";
    if(Array.isArray(this.props.source)) {
      track = this.props.source[0];
    } else {
      track = this.props.source;
    }

    this.state = {
      source: this.props.source,
      track: track
    }

    this.playClick = this.playClick.bind(this);
    this.togglePlaybackIcon = this.togglePlaybackIcon.bind(this);
    this.forwardClick = this.forwardClick.bind(this);
    this.backwordClick = this.backwordClick.bind(this);
    this.previousTrackClick = this.previousTrackClick.bind(this);
    this.nextTrackClick = this.nextTrackClick.bind(this);
  }

  componentDidMount = () => {
    const player = document.getElementById("player");
    if(!player.paused) {
      this.togglePlaybackIcon();
    }
  }

  togglePlaybackIcon = () => {
    const playButton = document.getElementById("play");
    const playIcon = document.getElementById("playIcon");
    playButton.classList.toggle("focused");
    playIcon.classList.toggle("fa-pause");
    playIcon.classList.toggle("fa-play");
  }

  playClick = (doNotToggleIcon = false) => {
    const player = document.getElementById("player");
    player.paused ? player.play() : player.pause();
    this.togglePlaybackIcon();
  };

  forwardClick = () => {
    const player = document.getElementById("player");
    if(!player.paused) {
      player.currentTime += 1
    }
  };

  backwordClick = () => {
    const player = document.getElementById("player");
    if(!player.paused) {
      player.currentTime -= 1
    }
  };

  nextTrackClick = () => {
    if(Array.isArray(this.state.source)) {
      let currentTrackIndex = _.indexOf(this.state.source, this.state.track);

      let nextTrack = this.state.source[currentTrackIndex+1]
      if(nextTrack === undefined) {nextTrack = this.state.track}
      
      this.setState({
        track: nextTrack
      })
      this.playClick();
    }
  };

  previousTrackClick = () => {
    if(Array.isArray(this.state.source)) {
      let currentTrackIndex = _.indexOf(this.state.source, this.state.track);
      let previousTrack = this.state.source[currentTrackIndex-1]

      if(previousTrack === undefined) {previousTrack = this.state.track}

      this.setState({
        track: previousTrack
      })

      this.playClick();
    }
  };

  render() {
    return (
      <div className="player">
        <audio id="player" onEnded={this.togglePlaybackIcon} src={this.state.track}></audio>
        <button id="play" onClick={this.playClick}><i id="playIcon" className="fas fa-play"></i></button>
        <button id="forward" onClick={this.forwardClick}><i className="fas fa-forward"></i></button>
        <button id="backword" onClick={this.backwordClick}><i className="fas fa-backward"></i></button>
        <button id="next" onClick={this.nextTrackClick}><i className="fas fa-angle-double-right"></i></button>
        <button id="prev" onClick={this.previousTrackClick}><i className="fas fa-angle-double-left"></i></button>
      </div>
    );
  }
}

export default Player;
```

It's almost exactly the same as our html component, just in react syntax.
Also our player will have a state of it's own

```javascript
this.state = {
  source: this.props.source,
  track: track
}
```

we get the source from props, and we set the playing track by checking the type of source.

Also, let's implement the nextTrack and previousTrack functions
```javascript
nextTrackClick = () => {
  if(Array.isArray(this.state.source)) {
    let currentTrackIndex = _.indexOf(this.state.source, this.state.track);

    let nextTrack = this.state.source[currentTrackIndex+1]
    if(nextTrack === undefined) {nextTrack = this.state.track}
    
    this.setState({
      track: nextTrack
    })
    this.playClick();
  }
};

previousTrackClick = () => {
  if(Array.isArray(this.state.source)) {
    let currentTrackIndex = _.indexOf(this.state.source, this.state.track);
    let previousTrack = this.state.source[currentTrackIndex-1]

    if(previousTrack === undefined) {previousTrack = this.state.track}

    this.setState({
      track: previousTrack
    })

    this.playClick();
  }
};
```

Now we just import it in our `App.js`
```javascript
import React, { Component } from 'react';
import Player from './Player.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Player source={["./track01.mp3", ".mp3"]} />
      </div>
    );
  }
}

export default App;
```
![](https://images.viblo.asia/fec12287-ee92-43e2-870e-2ace0c011059.gif)

## source code

git: https://github.com/SSalekin/react-audio-player

### running the app
```bash
git clone https://github.com/SSalekin/react-audio-player
cd react-audio-player
npm i
npm start
```