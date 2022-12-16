### Preface
In the last post I've talked about how we can debug Golang application by using logging. This is great and all, but one frustrating problem I've found about debugging error message in Go was that I don't know what caused the error and where it came from.

### No Context
Because the way Go treat error as value, when error occurred it didn't have stack trace information and to make thing worse error usually bubbled up from deep within nested function called which makes it even more difficult to find out where it orginated from. Consider the following example the error could come from `validate`, `processPostBody` or `savePost` which in turn could call other functions which in turn could call another functions. If all we get back in the log was the message like `could not create a post` then have fun debugging.

```Go
func CreatePost(payload *PostRequest) (*Post, error) {
    if err := validate(payload); err != nil {
        return nil, err
    }
    
    content, err := processPostBody(payload.Body)
    if err != nil {
        return nil, err
    }
    
    post := Post{
        Title:  payload.Title,
        Body:   content,
        UserID: payload.UserID,
    }
    
    if err := savePost(&post); err != nil {
        return nil, err
    }
    
    notifySubscribers(&post)
    return &post, nil
}
```

### Decorate Error
The first attempt is to add context to error by decorate error message with a function name. For example
```Go
func CreatePost(payload *PostRequest) (*Post, error) {
    wrapError := func(err error) error {
        return fmt.Errorf("%s: %s", "CreatePost", err.Error())
    }
    
    // validate post
    return nil, wrapError(err)
    
    // process post's body
    return nil, wrapError(err)
    
    // save to database
    return nil, wrapError(err)
    
    // if no problem
    return &post, nil
}

func validate(payload *PostRequest) error {
    // if error
    return fmt.Errorf("%s: %s", "validate", err.Error())
}

func processPostBody(content string) error {
    // if error
    return fmt.Errorf("%s: %s", "processPostBody", err.Error())
}

func savePost(post *Post) error {
    // if error
    return fmt.Errorf("%s: %s", "savePost", err.Error())
}
```
This approach wrap each error with function name, so let say an error occurred in `processPostBody` then error message will become like this `CreatePost: processPostBody: some error message`. When we check error log we could identify which function cause the error easily.

But there is a down side to this approach. Usually in a real world application we want to identify the type of error and handle them accordingly. For example we want to show user error message when validation failed, show 404 page when there was a database record not found or log error to a file for unknown error. Because this approach return new error everytime on each function call, we lost the ability to do type checking & comparison. But the good news is there is a way.

### The errors package
This excellent [errors](https://github.com/pkg/errors) package give us what we need to solve our problem and as a bonus it even has a function to get stack trace and add it to our error context.

Here is how we wrap an error to provide more context
```Go
func validate(payload *PostRequest) error {
    // if error
    return errors.Wrap(err, "validate")
}
```

And here is how to do type checking & comparison
```Go
e := errors.Cause(err)
switch e.(type) {
case *ValidationError:
    // show validation message
case *DBError:
    if e == ErrRecordNotFound {
        // show 404 page
        return
    }
    fallthrough
}
default:
    // log to a file
```

And finally we can get detail stack trace with print format
```Go
fmt.Printf("%+v\n", err)
```

###  Reducing Verbosity
The idiomatic way to handle error in Go is to follow call, check and return pattern. There is nothing wrong with this, but doing `if` check for every single error point in a function could become very tedious and makes a function with long definition hard to read. This verbosity come from the fact that we have stop the execution and return when we encounter an error. In a language that has `exception` we can prevent this by throw an exception and stop a function execution. Go doesn't have exception but we can get around the problem by making clever use of go's panic/recover. Let's take a look at the example.

```Go
func CreatePost(payload *PostRequest) (*Post, error) {
    err := validate(payload)
    Fatal(err)
    
    err = processPostBody(payload.Body)
    Fatal(err)
    
    post := Post{
        // same as before
    }
    err = savePost(&post)
    Fatal(err)
    
    return &post, nil
}

func Fatal(err error) {
    if err != nil {
        panic(err)
    }
}
```
With this when there is an error happen `CreatePost` will panic and stop execution at the point of error, but the caller of `CreatePost` will need to handle `panic`. But we don't want panic to leak out so lets make it self `recover`.

```Go
func CreatePost(...) (...) {
    defer func() {
        if err := recover(); err != nil {
            // log to file?
        }
    }()
    
    // same as before
}
```

Now there is one problem left. How can we return an error from panic/recover back to the caller? Because recover run in a different function return an error from there will not work. The solution is `named` return value. Lets see how it work.

```Go
func CreatePost(...) (post *Post, err error) {
    defer func() {
        if er := recover(); er != nil {
            err = er
        }
    }()
    
    // same as before
    post := &Post{
        ...
    }
    
    return
}
```

Because `defer` called just before the function return and `post`, `err` are scoped to current function the inner function can access these variable. The inner function check if there is an error from panic and assign that error to `named` variable. After `defer` function finished `CreatePost` return if there is an error the execution will stop at the error point and `post` will be `nil` otherwise `post` will be referenced to a newly created post.