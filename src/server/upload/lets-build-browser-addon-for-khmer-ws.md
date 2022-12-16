This is a continue serial from our previous article about [Khmer WS](https://viblo.asia/p/khmer-spelling-checker-part-i-aWj53vLGl6m). In this post, we are going to implement a browser extension where it allows our user to input raw Khmer sentences then it will return seperated words in those sentences.

### What is Extensions?
Extensions are small software programs that customize the browsing experience. They enable users to tailor browser functionality and behavior to individual needs or preferences. They are built on web technologies such as HTML, JavaScript, and CSS. So if you are a web developer, you’ll will be able to create an extension very fast. 

### Extensions core components

An extension consists of a collection of files, packaged for distribution and installation to local browser. Here, we will  go through the files that must/might be present in an extension package such as:
- **manifest.json:** is the only file that must be present in every extension. It contains basic metadata such as its name, version and the permissions it requires. It also provides pointers to other files in the extension.
- **Background scripts:** for implementing long-running logic.
- Icons for the extension and any buttons it might define.
- **Sidebars, popups, and options pages:** HTML documents that provide content for various user interface components.
- **Content scripts:** JavaScript included with your extension, that you will inject into web pages.
- **Web-accessible resources:** Make packaged content accessible to web pages and content scripts.

![](https://images.viblo.asia/0cac9823-6ef2-4dc4-a3a8-8a710692a84e.png)

### Setting things up
We can build an extension completely from scratch. However, I am going to use [React Extension Boilerplate for Chrome and Firefox](https://github.com/kryptokinght/react-extension-boilerplate) as my starting point. Since it's already configured and structured the files/folder for us to develop an extension with ReactJS. It also keep watch the changes of the source code and changes it live in the browser.  So we not need to reload file into browser again during our development.

To get start, we just neeed to clone the git repo
```sh
# clone the git repo
$ git clone https://github.com/kryptokinght/react-extension-boilerplate.git

# Install dependencies
yarn
```

And we run the script to build and lunch our ext in a new browser instance.
```sh
# launches in chrome
yarn start:chrome
# launches in firefox
yarn start:firefox
```
Then we should able to see it default popup.
![](https://images.viblo.asia/a415753a-84e8-4ebc-85f7-461e5a5a7e45.png)

### Build Khmer WS Extension
After we are able to run the code above in our local machine, let's modify it. First we delete unnecessary files from the boilerplate such as CODETOUR.md, CONTRIBTUING.md, and modify README.md.

In our previous article, we already build the API end point for our WS  `/api/segment_words`. 
![](https://images.viblo.asia/bfe28115-4316-420d-902a-b621df9aff69.png)

For this post, we just need modify the popup view. Here, we are going diplay textarea for user inputing text when you finish typing the text it send data to our server via `/api/segment_words`. To ease our coding, we are adding two libraries:
- `react-textarea-autosize`  an replacment of textarea with automatically adjusts its height to match the content.
- `axios` a promise based HTTP client for the browser.

We can add those libraries via:
```sh
# add libraries
yarn add react-textarea-autosize axios
```

And then we can add our ReactJS code as below.

```javascript
// ./src/popup/Popup.js
import React from 'react';
import Textarea from 'react-textarea-autosize';
import axios from 'axios';
import './Popup.css';

class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      sentences: '',
      wordsList: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.segmentWords =  0;
  }

  handleInputChange(event) {
    event.preventDefault();
    if(this.segmentWords) {
      clearTimeout(this.segmentWords);
    }
    const currentValue = event.currentTarget.value;
    this.setState({sentences: currentValue});
    this.segmentWords = setTimeout(() => {
      axios.post('http://localhost:8080/api/segment_words', {sentences: currentValue})
        .then((response) => {
          this.setState({wordsList: response.data.ws.commas_sentence});
        })
        .catch(() => {
          console.log('Something wrong');
          this.setState({wordsList: ''});
        });
    }, 100);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup-body">
          <h5 className="popup-title">
            Khmer Lang
          </h5>
          <p className="popup-text">
            This Khmer lang error words correction extention.
          </p>

          <div>
            <Textarea
              minRows={3}
              maxRows={8}
              className="form-control"
              placeholder="Let's try me out..."
              value={this.state.sentences}
              onChange={this.handleInputChange}/>
          </div>
          <div>
            <Textarea
              minRows={3}
              maxRows={8}
              className="form-control"
              readOnly={true}
              value={this.state.wordsList}/>
          </div>
        </div>
        <div className="popup-footer">
          <a href="https://www.facebook.com/sreang.rathanak" target="blank" className="visit-us">
            Visit US
          </a>
        </div>
      </div>
    );
  }
}

export default Popup;
```

Now let's re-run our script again.
```
yarn start:chrome
```
![](https://images.viblo.asia/2e362594-91aa-4596-9b97-af30bf9b9315.gif)

Awesome.

### Resources:
- [Source code](https://github.com/khmerlang/khmer-lang-addon)
- https://github.com/kryptokinght/react-extension-boilerplate
- https://developer.chrome.com/extensions
- https://medium.freecodecamp.org/how-to-make-a-cross-browser-extension-using-javascript-and-browser-apis-355c001cebba
- https://medium.freecodecamp.org/how-to-create-and-publish-a-chrome-extension-in-20-minutes-6dc8395d7153
- https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension

### Fanall Word
In this article, we have talked about what is extension and its core components. Then we start build our own extension for Khmer WS. However, there are many features of browser extension which we didn't mention/use in this post. So it's your turn to explore and use those awesome features for your needed.

Happy coding. :)