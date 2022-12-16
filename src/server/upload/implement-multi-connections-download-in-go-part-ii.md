## Getting Start
In [Part I](https://viblo.asia/p/implement-multi-connections-download-in-go-part-i-4P856q01lY3) we've looked at how to implement core download functionality as well as define a public API for client to use our package. Most of the functionality was done, but there are some part that were left out in the previous article like download worker pool and our final goal, which is to build a CLI tool to download file with multiple connection.

In this part we will look at how to implement worker pool and finally pieced together on what we've built so far and write a command line tool that will display download progress and provide some options for customization.

## Worker Pool
As you saw in previous article, there is this piece of code like below

```Go
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
```

To quickly recap, we basically create a worker pool with `maxConn` number of workers. We then loop through each block of chunk that needed to download for a whole file and assign it to each worker with `w.RunFunc`. Because `RunFunc` will block until each chunk is completed so we make sure to put it into a goroutine. The `WaitGroup` is needed to ensure that the whole file is downloaded before we proceed to combine each chunk into one file like show below.

```Go
wg.Wait()
w.Stop()

if err := s.combineFiles(filename, len(ranges)); err != nil {
    // code here
}
```

### Pool Interface
The worker pool interface is simple, as it will need to assign task to a worker that is avaiable in the pool and the ability to stop, so something like below is enough
```Go
type pool struct {
    // private fields. more onto this soon
}

func (p *pool) Run(w worker) {
    // code here
}

func (p *pool) Stop() {
    // code here
}
```

### Worker Interface
As you can see pool accept `worker` as an argument to `Run` function. To make this generic and easy to test we will define it as an interface like below
```Go
type worker interface {
    Task()
}
```

### Implementation
To start of, lets look at the fields that are needed for `pool` struct. To be able to assign task to a worker we will need a `channel` that will stream and assign each task to a worker that is avaiable in the pool. We will also need a `sync.WaitGroup` to wait for all the worker to complete in the even of shuting down the pool. So `pool` struct will looks like below

```Go
type pool struct {
    workers chan worker
    wg      sync.WaitGroup
}
```

Now to create `n` number of workers in a pool, lets look at the pool factory function. The function is simple, it accepts a maximum number of worker to start in a pool. In the function we initialize a struct instance and each fields that needed then loop through it `n` times and create goroutines.

These goroutines that we've just created are the actual workers. It is waiting for tasks to come through `p.works` channel and perform them. The trick is with the fact that `range` will block until there is a task or until a task that was perform finished that's why we run it in goroutine. So by creating multiple goroutine we basically multiple worker as well. `range` will break when channel is close and when that happen we mark that worker as done and exit.

```Go
func newWorkerPool(n int) *pool {
    p := pool{
		works: make(chan worker),
	}

	p.wg.Add(n)
	for i := 0; i < n; i++ {
		go func() {
			for w := range p.works {
				w.Task()
			}
			p.wg.Done()
		}()
	}

	return &p
}
```

To assign task to a worker is simple all we need to do is plug it into `works` channel like below
```Go
func (p *pool) Run(w worker) {
    p.works <- w
}
```

And to shutdown the worker pool
```Go
func (p *pool) Stop() {
    close(p.works)
    p.wg.Wait()
}
```
`p.wg.Wait` is to ensure that all workers are shutdown properly

## CLI Application
Now that we've done with worker pool implementation lets take a look at how to use the package to build a CLI tool.
The first half is the prepare for command line options. Here there are two options: `-n` & `-o`, the former is to configure max connection while the latter is specify where the file should be saved. `-n` will default current number of CPU on your computer and `-o` will default to current directory.
The second half is where we use our download package. It start by creating a new download instance and begin download a file. The final part is to use the channel returned from our download and print out download progress by using [pb.ProgressBar](https://github.com/cheggaaa/pb) package.

And that's it for our command line application to download file.

```Go
// first half
var (
	fs       = flag.NewFlagSet("goget", flag.ExitOnError)
	maxConn  = fs.Int("n", runtime.NumCPU(), "Max connections")
	fileName = fs.String("o", "", "Output file path")
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println(usage)
		return
	}
	err := fs.Parse(os.Args[2:])
	handleError(err)

	fileURL := os.Args[1]
	if *fileName == "" {
		dir, err := os.Getwd()
		handleError(err)
		*fileName = filepath.Join(dir, filepath.Base(fileURL))
	}

    // second half
	svc := goget.New(*maxConn)
	ch, err := svc.Download(fileURL, *fileName)
	handleError(err)

    // last part
	var bar *pb.ProgressBar
	for p := range ch {
		if bar == nil {
			bar = pb.Start64(p.TotalSize)
			bar.Set(pb.Bytes, true)
		}
		bar.Add64(p.ChunkSize)
	}

	bar.Finish()
}
```