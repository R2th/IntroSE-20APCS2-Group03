This time, we will implement how to get emotional information using Microsoft Azure's Face API with `Vue.js`, an open source of JavaScript framework.

# What is Face API?
Microsoft Azure Face Recognition API.

You can extract some information such as age, emotions, and gender.

For emotions, anger, contempt, aversion, fear, joy, neutrality, hate, surprise

Eight types can be determined.

Details are described on the following page.

https://azure.microsoft.com/en-us/services/cognitive-services/face/

This time, emotion information will be displayed to the console like this.
![](https://images.viblo.asia/9c46e786-81ff-4f11-917f-520464813141.jpg)

# Things will be executed
1. Preparation (`Vue.js` environment construction)
2. Start the camera and display real-time video in the video tag
3. Analyze facial expression

# Preparation
Build the `Vue.js` project environment using `vue-cli`.
Please refer from the following article to create a new project:
[](https://qiita.com/567000/items/dde495d6a8ad1c25fa43)

# Start the camera and display real-time video in the video tag
Next, start the front camera of the PC and display real-time video on the video tag.

The video displayed on the video tag is periodically displayed on the canvas as a still image.

(For specific processing, please refer to the "Facial Expression Analyze" section)

* HelloWorld.vue
```
<template id="main">
  <div id="app">
    <canvas ref="canvas" id="emo_canvas" width="400" height="400"></canvas>
    <div>
      <video ref="video" id="video" width="400" height="400" playsinline muted autoplay></video>
    </div>
  </div>
</template>
```

* HelloWorld.vue
```
mounted() {
  //Start the PC front camera and display real-time video on the video tag
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: false, video: true})
      .then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    }

    console.log(this.$refs.canvas)
    // console.log(this.$refs.canvas)

    this.canvas = this.$refs.canvas 
```

# Analyze facial expression
I first had to registered as a member at the following site and obtain an API key.

https://azure.microsoft.com/en-us/services/cognitive-services/face/

After that, display the still image on canvas and set the image data to base 64

After conversion (see processing of makeblob method), i send image data to Face API with Axios.

* HelloWorld.vue
```
this.testTimer = setInterval(() => {
      // console.log(this.$refs.canvas)
      let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 240)
　　　 //Store the captured image in the "captures" array
      this.captures.push(this.canvas.toDataURL("image/png")) 
      let subscriptionKey = "Please input the key that has been sent to you";
      let uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
      let params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
          "emotion"
      };
      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const imgURL = this.makeblob(this.captures[this.captures.length - 1])
      //Send imgURL image to Face API
      Axios.post(
        uriBase + "?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,emotion",
        imgURL,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          }
        },
      )
      .then(response => {
        console.log(response.data[0].faceAttributes.emotion)

      })
      .catch(error => {
        // console.log(error.response)
      });
    }, 5000);
```
Convert image data to base64 to post the image in Axios.
* HelloWorld.vue
```
methods: {     
    makeblob: function (dataURL) {
      let BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = decodeURIComponent(parts[1]);
        return new Blob([raw], {type: contentType});
      }
      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {type: contentType})
    }
  }
```
Install npm with the following command to use axios.
```
npm install --save-dev vue-axios axios
```
# Source code Preview:
The fully view of my source code will be looking like this:
```
HelloWorld.vue

<template id="main">
  <div id="app">
    <canvas ref="canvas" id="emo_canvas" width="400" height="400"></canvas>
    <div>
      <video ref="video" id="video" width="400" height="400" playsinline muted autoplay></video>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios)

export default ({
  template: '#main',
  data() {
    return {
      video: {},
      canvas: {},
      captures: [],
      testTimer: '',
    };
  },
  mounted() {
  //Start the PC front camera and display real-time video on the video tag
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio: false, video: true})
      .then(stream => {
        this.video.srcObject = stream
        this.video.play()
      })
    }

    console.log(this.$refs.canvas)
    // console.log(this.$refs.canvas)

    this.canvas = this.$refs.canvas 
    this.testTimer = setInterval(() => {
      // console.log(this.$refs.canvas)
      let context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 240)
      this.captures.push(this.canvas.toDataURL("image/png")) //Store the captured image in the "captures" array
      let subscriptionKey = "Please input the key that has been sent to you";
      let uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
      let params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
          "emotion"
      };
      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const imgURL = this.makeblob(this.captures[this.captures.length - 1])
      //Send imgURL image to Face API
      Axios.post(
        uriBase + "?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,emotion",
        imgURL,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          }
        },
      )
      .then(response => {
        console.log(response.data[0].faceAttributes.emotion)

      })
      .catch(error => {
        // console.log(error.response)
      });
    }, 5000);
  },
  methods: {     
    makeblob: function (dataURL) {
      let BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = decodeURIComponent(parts[1]);
        return new Blob([raw], {type: contentType});
      }
      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {type: contentType})
    }
  }
});
```