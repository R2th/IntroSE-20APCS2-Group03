## Getting Start
In this article we will build a package that can download file using multiple connections with Go. This package will provide both CLI tool as well as public API that can be use in other application code.
In this part of article we will take a look at how we can use goroutine and channel for concurren download as well as support for downloading progress and lastly as a bonus we will build a command line tool that make used of our package that we implemeted. Source code can be found [here](https://github.com/gojunkie/goget)

## Define Public API
To start off our package need a well define public API that other client code can used. To do this I've define `Downloader` interface and some data type that will be needed as below
```Go
type FileInfo struct {
	Err       error
	ChunkSize int64
	TotalSize int64
}

type Downloader interface {
	Download(fileURL, filename string) (<-chan FileInfo, error)
}
```

`Downloader` interface has one public method, `Download`, that receive url to remote source file as well as a destination path to save that file in our local machine. The return values of this method are a read only `channel` that will stream instances of `FileInfo` struct after the download begin. If the initial download failed for some reason an error will be return so that client can check and handle the error early.

`FileInfo` has three fields `Err`, `ChunkSize` and `TotalSize` which contains information of each chunk that has downloaded. The name of the fields are pretty much self explainatory so I don't need to go over them here.

### How does it work?
The end goal is the allow client to use our package like this
```Go
svc := goget.New(MAX_CONNECTION)
ch, err := svc.Download(fileURL, filePath)
if err != nil {
    // handle error
}
for info := range ch {
    // logic after each chunk has downloaded
    // ex. print download progress
}
// download has finished and file save to `filePath`
```

### The Downloader Interface
`goget` package will expose 2 types `Downloader`, `FileInfo` and a `New` factory function to create a concrete implementation of downloader interface.

```Go
func New(maxConn int) Downloader {
	return &downloader{maxConn: maxConn}
}

type downloader struct {
	maxConn int
}
```

Now lets take a look at the actual download implementation. I've broken it into 3 parts. The first part is to get remote file's total size and check if it actually support chunk download, we do it in `getFileSize`. The next step is calculate each chunk request range in `calcRanges`.

`getFileSize` is simple, all we do is make a `HEAD` request to remote file and get `Content-Length` from header.

`calcRanges` is a bit complicated as we need to create an array of `start` and `end` offset of each range. We do that by first define a maximum size of each chunk to `512KB` and then find the total chunk that needed to download by divided total size by this number `totalSize / maxSize`. The rest is to create a array of this size by looping and make sure to increment each range offset accordingly.

```Go
func (s *downloader) Download(fileURL, filename string) (<-chan FileInfo, error) {
	totalSize, err := s.getFileSize(fileURL)
	if err != nil {
		return nil, err
	}
    ranges := s.calcRanges(totalSize)
    // rest of the code
}

func (s *downloader) getFileSize(fileURL string) (int64, error) {
	c := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest("HEAD", fileURL, nil)
	if err != nil {
		return 0, err
	}
	res, err := c.Do(req)
	if err != nil {
		return 0, err
	}
	ssize := res.Header.Get("Content-Length")
	size, err := strconv.ParseInt(ssize, 10, 64)
	if err != nil {
		return 0, ErrChunkDownloadNotSupport
	}
	return size, nil
}

func (s *downloader) calcRanges(totalSize int64) [][]int64 {
	var bounds [][]int64
	maxSize := int64(1024 * 512)

	n := int(math.Ceil(float64(totalSize) / float64(maxSize)))
	for i := 0; i < n; i++ {
		startOffset := int64(i) * maxSize
		endOffset := startOffset + maxSize - 1
		if endOffset > totalSize-1 {
			endOffset = totalSize - 1
		}
		bounds = append(bounds, []int64{startOffset, endOffset})
	}
	return bounds
}
```

The second part is to create a worker pool from our max connection parameter and add each chunk to the queue. This is done with the following code.

```Go
type chunkInfo struct {
	totalSize int64
	ranges    []int64
	index     int
	fileURL   string
	filename  string
}

func (s *downloader) Download(fileURL, filename string) (<-chan FileInfo, error) {
    // previous code

    ch := make(chan FileInfo)
	out := make(chan FileInfo)
	w := newWorkerPool(s.maxConn)

	var wg sync.WaitGroup
	wg.Add(len(ranges))

	for i := 0; i < len(ranges); i++ {
		info := chunkInfo{
			totalSize: totalSize,
			ranges:    ranges[i],
			index:     i + 1,
			fileURL:   fileURL,
			filename:  filename,
		}
		go func() {
			w.RunFunc(func() {
				s.download(info, ch)
			})
			wg.Done()
		}()
	}
    
    // rest of the code
}
```

We start this part of the code by creating two channels`ch`, `out`. `ch` is used internally while `out` will be return back to the caller. After that we create a worker pool with `newWorkerPool` function and then loop through each chunks and add it to download queue. Notice that we also created a `WaitGroup` with the total length of our chunk. We will be using this later to pause execution and wait for each chunk to completely downloaded.

The importation point to take here is that `w.RunFunc` will be block until there is an available worker in the pool to work on this job and that's why we put it into a goroutine.

The third part is to wait for each chunk to finished, combine them together and do the final create up.
```Go
func (s *downloader) Download(fileURL, filename string) (<-chan FileInfo, error) {
    // previous code

    go func() {
		for p := range ch {
			if p.Err != nil {
				close(ch)
				close(out)
				w.Stop()
				return
			}
			out <- p
		}
	}()

	go func() {
		wg.Wait()
		w.Stop()

		if err := s.combineFiles(filename, len(ranges)); err != nil {
			out <- FileInfo{Err: err}
		}

		close(ch)
		close(out)
	}()

	return out, nil
}

func (s *downloader) combineFiles(filename string, n int) error {
	os.Remove(filename)
	f, err := os.OpenFile(filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		return err
	}
	defer f.Close()

	for i := 0; i < n; i++ {
		chunkName := fmt.Sprintf("%s.part%.3d", filename, i+1)
		cf, err := os.Open(chunkName)
		if err != nil {
			return err
		}
		buf, err := ioutil.ReadAll(cf)
		if err != nil {
			return err
		}
		if _, err := f.Write(buf); err != nil {
			return err
		}
		cf.Close()
		os.Remove(chunkName)
	}

	return nil
}
```

The important piece of code in this part is the use of internal channel `ch` combine with `wg` WaitGroup. The first goroutine wait and get finished chunk's info from each download worker, check if there is an error and if it does terminate the download early. The second goroutine is to wait for the whole file to finished download, combine them, clean up and stop the worker pool.

Last but not least is `download` method that handle each chunk download. There is a lot of code but it is very straightforward, all we have to do is make a get request, set a proper range header and save the binary response to file.
```Go
func (s *downloader) download(info chunkInfo, ch chan FileInfo) {
	req, err := http.NewRequest("GET", info.fileURL, nil)
	if err != nil {
		ch <- FileInfo{Err: err}
		return
	}
	req.Header.Set("Range", fmt.Sprintf("bytes=%d-%d", info.ranges[0], info.ranges[1]))

	c := &http.Client{Timeout: 60 * time.Second}
	res, err := c.Do(req)
	if err != nil {
		ch <- FileInfo{Err: err}
		return
	}
	defer res.Body.Close()
	dir := filepath.Dir(info.filename)
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		ch <- FileInfo{Err: err}
		return
	}
	path := fmt.Sprintf("%s.part%.3d", info.filename, info.index)
	file, err := os.Create(path)
	if err != nil {
		ch <- FileInfo{Err: err}
		return
	}
	defer file.Close()

	buf := make([]byte, 1024*1024)
	if _, err := io.CopyBuffer(file, res.Body, buf); err != nil {
		os.Remove(path)
		ch <- FileInfo{Err: err}
		return
	}

	ssize := res.Header.Get("Content-Length")
	size, err := strconv.ParseInt(ssize, 10, 64)
	if err != nil {
		os.Remove(path)
		ch <- FileInfo{Err: err}
		return
	}

	ch <- FileInfo{
		ChunkSize: size,
		TotalSize: info.totalSize,
	}
}
```

## Conclusion
As you've noticed I didn't include the worker pool as well as CLI implementation in this part and that because we will touch on thoese part of code in Part II of this series. I hope you find something useful from this and as always you can check out the source code from [here](https://github.com/gojunkie/goget)