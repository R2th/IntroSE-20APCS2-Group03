### Introduction
Being fast and simple gives Golang a very appealing attraction to developers. But being simple means that every decision must be made by developer; from organizing directory structure to database configuration to choosing application architecture ...etc. There are many debates as well as libraries to help you get the job done, but choosing one among that many can be tough so I though I could share with you which approach I used to build my application and hope that it will be useful. This is going to be one of the many soon to come series of building API in Golang and what we are going to build is a Manga Reader app. As usual you can find a complete source code in [github](https://github.com/PrinceNorin/monga) repository.

### Getting required tool
We are going to build this app from scratch so getting the right tool to leverage development process is important. What we need is monitoring tool to watch for files change, recompile and restart the app, dependency management as well as configuration library for different environment. Here are the ones that I'll use in this project.
- [entr](http://www.entrproject.org/): a files monitoring tool
- [Shell Script](https://www.shellscript.sh/): filter files to watch, recompile & restart app
- [dep](https://golang.github.io/dep/): Go package management & versioning
- [configor](https://github.com/jinzhu/configor): YAML based configuration for Go

With these tool we are ready to setup our code base

### Setting up web server
Golang has awesome standard library to build an application server, but to make it easy to work with query string, parameter segment and request body we will be using [gin](https://github.com/gin-gonic/gin) for our http server. This library is just a wrapper around Go build-in http server so any code that work with http handler will work with it as well. Lets start with initializing project. **dep init** with create **Gopkg.lock**, **Gopkg.toml** files along with an empty **vendor** folder. I don't like to commit vendor file into repository so I've put it into **.gitignore** file.

```Bash
$ cd $GOPATH/src/{your-repo}
$ mkdir monga && cd $_
$ dep init
$ echo "monga" >> .gitignore
$ echo "vendor" >> .gitignore
```
To add gin as our development dependency run the following command

```Bash
$ dep ensure -add https://github.com/gin-gonic/gin
```

Now take a look at the following code snippet.
```Go
// controllers/router/router.go
func Get() *gin.Engine {
    once.Do(func() {
        engine = gin.Default()
    })
    return engine
}

// controllers/router.go
func init() {
	Router = router.Get()
}

// main.go
func main() {
	server := &http.Server{
		Addr:         ":8080",
		Handler:      controllers.Router,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	if err := server.ListenAndServe(); err != nil {
		log.Fatal(err)
		os.Exit(-1)
	}
}
```
First we initialize a gin handler in **Get** function. Using **sync.Once** to ensure that the initialization will only run once. Next we create an **init** function for **controllers** package and assign it to **Router** variable. In **main** function we create an **http server** and because **gin.Engine** implement **Handler** interface we can pass it into **Handler** field when initialize a server.

### Re-Compile on change
I've written two shell scripts to watch for file change & re-compile. The first one is to filter and watch certain type of file and the second one is to compile and restart the app.

```Bash
# watch
#!/bin/sh

find . -type f \( -name "*.go" -o -name "*.yml" -o -name "*.yaml" \) | grep -v vendor/ | entr -r ./compile
```

```Bash
# compile
#!/bin/sh

pkill server && echo "Killing server process..."
rm -f ./server && echo "Removing old server binary..."

echo "Building & Restarting a new server instance..."
go build . && ./server
```
Make sure you have permission to execute it by running **chmod +x** on these scripts

### What's next
In the next part we'll look into how to configure our app as well as setup database. Also getting start with our main business logic.