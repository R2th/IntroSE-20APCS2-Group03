As you know, most websites are integrated this module, so do you think mobile application need this?

![](https://images.viblo.asia/be6d5093-0549-4642-8011-1d8dd34c0613.png)

![](https://images.viblo.asia/8d596084-4a8a-4c6f-98ae-9cacd43d2602.jpeg)

This module is really great!
It will help us avoid bot from black hackers, competitors. This also make our look more professional and get our customer belief.



Why don't we use it, and how?

Please gooogling, we can see something like this
https://developers.google.com/recaptcha/docs/display
or 
https://developers.google.com/recaptcha/docs/invisible
https://developers.google.com/recaptcha/docs/v3
and we have only 
https://developer.android.com/training/safetynet/recaptcha.html
for android.
So how to apply this to ios applications?
Because goolge support recaptcha module for android only, so really difficult to implemented it to react-native projects too. This such...

Today I will help you to integrate this awesome module to your react-native project.

## 1. Custom module

To do this, we need to know how to custom a module in react-native.
We have many many tutorials about this topic so I will not help you to create a new one.
You can have a look on:

https://www.reactnative.guide/16-custom-native-modules/16.0-intro.html

if you want to custom https://developer.android.com/training/safetynet/recaptcha.html to react-native android.

However it's not enough for us.
We need ios too.

And to support RN we need add some protypes with component. That's it.
https://hackernoon.com/are-you-using-proptypes-in-react-native-6067e2e5b526

and go to this address: https://www.google.com/recaptcha/admin#list
to create your google recaptcha key for your module.

## 2. Write some lines of code

The mystery here is we will using a webview component to call google recaptcha api (Webview is available on both ios and android system).

Please create your component named: ReCaptchaView like this

```
import React from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
  var originalPostMessage = window.postMessage
  var patchedPostMessage = function(message, targetOrigin, transfer) {
      originalPostMessage(message, targetOrigin, transfer)
  }
  patchedPostMessage.toString = function() {
      return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
  }
  window.postMessage = patchedPostMessage
})})();`

const getWebviewContent = (siteKey) => {
  const originalForm = '<!DOCTYPE html><html><head>' +
    '<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; } </style>' +
    '<script src="https://www.google.com/recaptcha/api.js"></script>' +
    '<script type="text/javascript"> var onloadCallback = function() { }; ' +
    'var onDataCallback = function(response) { window.postMessage(response);  }; ' +
    'var onDataExpiredCallback = function(error) {  window.postMessage("expired"); }; ' +
    'var onDataErrorCallback = function(error) {  window.postMessage("error"); } </script>' +
    '</head><body>' +
    '<div class="text-xs-center"><div class="g-recaptcha" ' +
    'data-sitekey="' + siteKey + '" data-callback="onDataCallback" ' +
    'data-expired-callback="onDataExpiredCallback" ' +
    'data-error-callback="onDataErrorCallback"></div></div></body></html>';
  return originalForm;
}

const ReCaptchaView = ({
  onMessage,
  siteKey,
  containStyle,
  title,
  description,
  url
}) => (
    <WebView
      ref={(ref) => { this.webview = ref; }}
      mixedContentMode={'always'}
      onMessage={onMessage}
      javaScriptEnabled
      injectedJavaScript={patchPostMessageJsCode}
      automaticallyAdjustContentInsets
      style={[{ backgroundColor: 'transparent', height: 500 }]}
      source={{
        html: getWebviewContent(siteKey),
        baseUrl: url
      }}
    />
  );

ReCaptchaView.propTypes = {
  onMessage: PropTypes.func,
  siteKey: PropTypes.string.isRequired,
  containStyle: PropTypes.any,
  url: PropTypes.string
};

ReCaptchaView.defaultProps = {
  autoHeight: true,
  onMessage: (event) => null,
  title: '',
  description: '',
  url: ''
};

export default ReCaptchaView;
```

notice:
- onMessage: to get your key when user do recaptcha
- sitekey: your key when you register with google service
- containstyle: your recaptcha component style
- url: callback url when recaptcha successfully

And using it easy as the followings:

```
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <ReCaptchaView
          onMessage={this.onMessage}
          siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
          url='http://your-domain.com'
        />
      </View>
    );
  }

  onMessage = (event) => {
    if (!event) return;
    const data = event.nativeEvent.data;
    console.log(data);
    if (!data) return;
    if (data === 'expired') {
      // onExpired();
    } else if (data === 'error') {
      // onError();
    } else {
      // onSuccess(data);
    }
  }
}
```

## 3. Advance

So, if you read to this line, it means you can code this module by self. And our module uses webview to display recaptcha view, you will get some webview height issues.

To fix this you can modify your code as:

```
/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * @author Elton Jain
 * @author ManhNV
 * @version v1.0.2
 */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  WebView,
} from 'react-native';
import PropTypes from 'prop-types';

const injectedScript = function () {
  function waitForBridge() {
    if (window.postMessage.length !== 1) {
      setTimeout(waitForBridge, 200);
    }
    else {
      let height = 0;
      if (document.documentElement.clientHeight > document.body.clientHeight) {
        height = document.documentElement.clientHeight
      }
      else {
        height = document.body.clientHeight
      }
      postMessage(height)
    }
  }
  waitForBridge();
};

const getWebviewContent = (siteKey) => {
  const originalForm = '<!DOCTYPE html><html><head>' +
    '<style>  .text-xs-center { text-align: center; } .g-recaptcha { display: inline-block; } </style>' +
    '<script src="https://www.google.com/recaptcha/api.js"></script>' +
    '<script type="text/javascript"> var onloadCallback = function() { }; ' +
    'var onDataCallback = function(response) { window.postMessage(response);  }; ' +
    'var onDataExpiredCallback = function(error) {  window.postMessage("expired"); }; ' +
    'var onDataErrorCallback = function(error) {  window.postMessage("error"); } </script>' +
    '</head><body>' +
    '<div class="text-xs-center"><div class="g-recaptcha" ' +
    'data-sitekey="' + siteKey + '" data-callback="onDataCallback" ' +
    'data-expired-callback="onDataExpiredCallback" ' +
    'data-error-callback="onDataErrorCallback"></div></div></body></html>';
  return originalForm;
}



export default class AutoHeightWebView extends Component {
  state = {
    webViewHeight: Number
  };

  static propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onExpired: PropTypes.func.isRequired,
    defaultHeight: PropTypes.number,
    autoHeight: PropTypes.bool,
    url: PropTypes.string.isRequired,
    siteKey: PropTypes.string.isRequired
  }

  static defaultProps = {
    autoHeight: true,
    onError: () => null,
    onExpired: () => null,
    onSuccess: () => null
  }

  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: this.props.defaultHeight
    }
    this._onMessage = this._onMessage.bind(this);
  }

  _onMessage(e) {
    if (e && e.nativeEvent && e.nativeEvent.data) {
      const val = e.nativeEvent.data;
      if (!isNaN(val)) {
        this.setState({
          webViewHeight: parseInt(val)
        });
      } else if (val === 'expired') {
        this.props.onExpired();
      } else if (val === 'error') {
        this.props.onError();
      } else {
        this.props.onSuccess(val);
      }
    }
  }

  stopLoading() {
    this.webview.stopLoading();
  }

  render() {
    const _w = this.props.width || Dimensions.get('window').width;
    const _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
    return (
      <WebView
        ref={(ref) => { this.webview = ref; }}
        injectedJavaScript={'(' + String(injectedScript) + ')();' +
          'window.postMessage = String(Object.hasOwnProperty).replace(\'hasOwnProperty\', \'postMessage\');'}
        scrollEnabled={this.props.scrollEnabled || false}
        onMessage={this._onMessage}
        javaScriptEnabled
        automaticallyAdjustContentInsets
        /* {...this.props} */
        style={[{ width: _w }, this.props.style, { height: _h }]}
        source={{
          html: getWebviewContent(this.props.siteKey),
          baseUrl: this.props.url
        }}
      />
    )
  }
}
```

and using like this:

```
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1, paddingTop: 30}}>
        <AutoHeightWebView
          onSuccess={(val)=>{
              alert(val);
          }}
          onError={()=> {
              alert('Error');
          }}
          onExpired={()=>{
              alert('Expired');
          }}
          siteKey="6LcxWV4UAAAAAMYZC7ge5gEgP_QWle44hyvCIARl"
          url="http://your-domain.com"
        />
      </View>
    );
  }
}
```

You can check my repository for full source code
https://github.com/nvmanh/react-native-recaptcha

Now, enjoys your hacking life!