[rn-fetch-blob](https://github.com/hoaibkdn/rn-fetch-blob) is a famous lib that supports upload, download files. You can be easy to install this lib with the Readme on github. But with current lib, it has an issue in download background on iOS so I forked them to my repos and custom for this function.

I will explain the process running of my works. Prepares an url that you want to download, this is an example url: `const url = https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4`
1. Creates a path output for download result, example:
 ```
 import RNFetchBlob from 'rn-fetch-blob'
 
 const { fs: { dirs } } = RNFetchBlob
 const PATH_TO_LIST = dirs.DocumentDir
 const dest = `${PATH_TO_LIST}/big_buck_bunny_720p_10mb.mp4`
 ```
 2. Creates a temp path if start downloading, you will save the data into temp path. After done, append data from temp path to your path
 ```
 const tmpPath = `${dest}.download`
 ```
 3. Check existing `tmpPath` in current your local saving, there is a difference in this case between iSO and android, so I separated into, look at an example
 ```
  RNFetchBlob.fs.ls(PATH_TO_LIST).then(files => {
      console.log(files)
    })
    fs.exists(tmpPath)
      .then(ext => {
        if (ext) {
          if (this.isAndroid) {
            this.startTime = new Date().valueOf()
            return fs.stat(dest)
          }
          return fs.appendFile(dest, tmpPath, 'uri').then(() => {
            this.startTime = new Date().valueOf()
            return fs.stat(tmpPath)
          })
        }
        this.startTime = new Date().valueOf()
        return Promise.resolve({ size: 0 })
      })
 ```
 In android, if existing the tmpPath in downloaded list, I will `stat(dest)`  because when we cancel the process, we will append data to dest file, so `stat(dest)` to know current size downloaded 
 In iOS, if when we cancel the process, data only save at `tmpPath`, so need to `stat(tmpPath)`.
 
 4. After checked existing of tmpPath, we config to start downloading.
 To config download background on iOS, you just need to add `IOSBackgroundTask` and `IOSDownloadTask` 
 ```
    .then(stat => {
        this.downtask = RNFetchBlob.config({
          IOSBackgroundTask: true, // required for both upload
          IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
          path: this.isAndroid ? tmpPath : dest,
          fileCache: true
        })
          .fetch('GET', url, {
            Range: this.isAndroid ? `bytes=${stat.size}-` : ''
          })
          .progress((receivedStr, totalStr) => {
             // calculate the process
          })
      )
 ```
 
 5. Cache error, there are some status of errors returned, when you cancel, it also throw an error, so check carefully 
    ```
    this.downtask.catch(async err => { console.log(err.message) })
    ```
Notice: when you call `this.downtask.cancel`, iOS will throw an error, you can cache on it, but android is different, it will continue running next step like the video downloaded. In next step, I saved data of the tmpPath into dest path, and unlink tmpPath, so this is the reason I `stat(dest)` in checking the existing before.
    
Finally, let take a look for the whole function

```
const startDownloading = () => {
    RNFetchBlob.fs.ls(PATH_TO_LIST).then(files => {
          console.log(files)
        })
        fs.exists(tmpPath)
          .then(ext => {
            if (ext) {
              if (this.isAndroid) {
                this.startTime = new Date().valueOf()
                return fs.stat(dest)
              }
              return fs.appendFile(dest, tmpPath, 'uri').then(() => {
                this.startTime = new Date().valueOf()
                return fs.stat(tmpPath)
              })
            }
            this.startTime = new Date().valueOf()
            return Promise.resolve({ size: 0 })
          })
          .then(stat => {
            this.downtask = RNFetchBlob.config({
              IOSBackgroundTask: true, // required for both upload
              IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
              path: this.isAndroid ? tmpPath : dest,
              fileCache: true
            })
              .fetch('GET', url, {
                Range: this.isAndroid ? `bytes=${stat.size}-` : ''
              })
              .progress((receivedStr, totalStr) => {
                // Do any things

              })
              this.downtask.catch(async err => {
                // Check error
              })
       })
       .then(file => {
            if (Platform.OS === 'android') {
              return fs.appendFile(dest, file.path(), 'uri')
            }
          })

          // remove tmp file ( file at ${dest}.download )
          .then(() => {
            if (Platform.OS === 'android') {
              return fs.unlink(tmpPath)
            }
            return null
          })
          // stat dest to get info downloaded of a video
          .then(() => {
            return fs.stat(dest)
          })
          .then(async stat => {
          // Downloaded successfully
          })
  }
 ```
 
 I introduced you to start downloading a video, so how to pause and resume?
 It's very easy, you just only cancel the process, `.downloading` file is still kept into local, the process will stop
 ```
  this.downtask.cancel(() => { // Do any thing })
 ```
 To resume this process, you just need to call `startDownloading` again, the function checked downloading or not. So you can use it for both start or resume download
 
 Thanks for everybody read my post, if you have any unclear things, you can leave messages, I will answer or help you resolve your problem.