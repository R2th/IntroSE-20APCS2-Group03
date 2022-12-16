### Getting Start
The Go standard library provides a set of packages to generate output. The `text/template` package implements templates for generating text output, while the `html/template` package implements templates for generating HTML output that is safe against certain attacks. Both packages use the same interface but the following examples of the core features are directed towards HTML applications.

### Parsing
To create and store a template in a variable so that we can execute it later on we use Go standard library function `template.New` allocate a new undefined template with associated name.
```Go
import "html/template"

template.New(name)
```

To create a template with template body use the `template.ParseFiles` version, which accepts multiple files a argument.
```Go
import "html/template"

template.ParseFiles(files...)
```

There is also a `(*template.Template) Clone()` method which allocate a new template based on exiting template.
```Go
tmpl, err := template.ParseFiles(files...)
if err != nil {
    panic(err)
}

newTmpl, err := template.Clone()
```
After a template is parsed then we are ready for the next section.

### Executing
There are two step processes needed in order to generate html content. The first step is to parse a template, which we've just covered. The last step is to execute that pre-define template with associated data to get the final output. To do that we call `Execute` or `ExecuteTemplate`
```Go
func homeHandler(w http.ResponseWriter, r *http.Request) {
    d := struct {
        Name string
    } {
        Name: "Jonh due",
    }
    tmpl, _ := template.ParseFiles("home.html")
    tmpl.Execute(w, d)
}
```
Let see how to show data inside of template. The `.` notation refer to current data object that passed into `Execute` method. So the following `.Name` is equivalent to `d.Name`.
```HTML
<h1>Hello, {{.Name}}</h1>
```
The different between `Execute` and `ExecuteTemplate` is that `ExecuteTemplate` parse named template that associated with `tmpl`.

Also note that `html/template` also does encoding to escape html tag so the following will be output as
```HTML
// string value
"<h1>A header!</h1>"

// output
&lt;h1&gt;A header!&lt;/h1&gt;
```

To tell template to output html tag without escaping we need to use `template.HTML` function which return `template.HTML` like the following
```Go
template.HTML(`<h1>A header!</h1>`)
```
### Action
#### If/Else
Like any other template engine go also support conditional check with the following syntax.
```HTML
{{if .IsLoggedIn}}
<h1>Hello, {{.Name}}</h1>
{{else}}
<span>Login here</span>
{{end}}
```

#### Remove Whitespace
Adding different values to a template can add various amounts of whitespace. We can either change our template to better handle it, by ignoring or minimizing effects, or we can use the minus sign `-` within out template.
```HTML
<h1>Hello, {{if .Name}} {{.Name}} {{- else}} Anonymous {{- end}}!</h1>
```
This will remove any whitespace after name.

#### Range
To loop through collection we can use range block with the following syntax.
```Go
type Cart struct {
    Items []Item
    Total float64
}

type Item struct {
    Name    string
    Quality uint32
}
```

```HTML
<ul class="cart-item">
{{range .Items}}
    <li>{{.Name}} ({{.Quality}}</li>
{{end}}
</ul>
```

### Function
Calling a method in a template is straightforward. Separate each argument with space.
```HTML
{{.DoSomeCalculation .Arg1 .Arg2}}
```

For Custom function we need to create a `template.FuncMap`. Here is how we create and attach custom function to a template
```Go
funcMap := template.FuncMap{
    "func1": customFunc1,
    "func2": customFunc2,
}
tmpl, _ := template.ParseFiles(files...)
tmpl.Funcs(funcMap)
```

Then in the template we can call it like this.
```HTML
<div>{{func1 arg1 arg2}}</div>
<div>{{func2 arg1 arg2}}</div>
```

### Layout
Sometime we want only a small part of our webpage to be change. In order to do that we need to create a layout. Layout composition can be achieved by using `template` block and combine them into other template using `ParseFiles` method.

```HTML
<!-- layout.html -->
<html>
    <head>
        <title>{{block "title"}}{{end}}</title>
    </head>
    <body>
        {{template "content" .}}
    </body>
</html>
```

```HTML
<!-- some_page.html -->
{{define "content"}}
<div class="container">
    <p>This is some page template content</p>
</div>
{{end}}
```

Then we combine the two like this
```Go
tmpl, _ := template.ParseFiles("layout.html", "some_page.html")
```