# Routing with MUX
Let's create a simple CRUD api for a blog site.

We'll need 5 routes

```ruby
# All 
GET articles/ 

# Single article
GET articles/:id

# Create new 
POST articles/

# Update an article
PUT articles/:id

# Remove article
DELETE articles/:id
```

First, we create a `main.go` file in our project directory
```bash
touch main.go
```

Fill in the skeleton code inside

```go
package main

func main() {

}

```

For routing, we'll use a package called `mux`
We can download that by running
```go
go get -u github.com/gorilla/mux
```

If you check your `$GOPATH/pkg` directory, you'll find the newly downloaded package `mux` inside.

![](https://images.viblo.asia/a27ff808-f960-4ece-ae92-1ef865a0acc1.png)


Now, that we have downloaded `mux`, let's initialize it in our `main.go` file.
For that we need to import it first.

```go
package main

import (
	"github.com/gorilla/mux"
)

func main() {
  router := mux.NewRouter()
}
```

Adding routes to mux is very easy. You just need to write the route, the function it should run and what HTTP method it's responding to
```go
router.HandleFunc("/api/articles", getArticles).Methods("GET")
```

This means, whenever our app will receive a `GET` request in `"/api/articles"` path, we'll run the `getArticles` function.
We haven't defined the function yet, for now we just want seed data to be returned. Kind of

```go
func getArticles() {
  return listOfArticles
}
```

So, we should make our seed data first, before we move on to writing `getArticles` method.

For an article object and a user object, we need to create a struct like

```go
type User struct {
	ID       string
	Username string
	Email    string
}

type Article struct {
	ID          string
	Title       string
	Description string
	Content     string
	Author      *User
}

```

Note that, each article will have an `Author` filed, which an object of the struct `User`.
For listOfArticles, we'll use a slice
```go
[]Article{
	Article{
		ID:          "1",
		Title:       "Learning golang",
		Description: "an introduction to the go ecosystem",
		Content:     "...",
		Author: &User{
			ID:       "1",
			Username: "salekin",
			Email:    "ss@gmail.com",
		},
	},
	Article{
		ID:          "2",
		Title:       "Learning GIN",
		Description: "intro to GIN framework",
		Content:     "...",
		Author: &User{
			ID:       "1",
			Username: "salekin",
			Email:    "ss@gmail.com",
		},
	},
}
```

Also, if we want to return the filed names different in json from the struct we can modify the struct like

```go
type User struct {
	ID       string `json:"id"`
	Username string `json:"user"`
	Email    string `json:"email"`
}

type Article struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	Author      *User  `json:"author"`
}

```

At this point, our `main.go` should be like

```go
package main

import (
	"github.com/gorilla/mux"
)

var articles = []Article{
	Article{
		ID:          "1",
		Title:       "Learning golang",
		Description: "an introduction to the go ecosystem",
		Content:     "...",
		Author: &User{
			ID:       "1",
			Username: "salekin",
			Email:    "ss@gmail.com",
		},
	},
	Article{
		ID:          "2",
		Title:       "Learning GIN",
		Description: "intro to GIN framework",
		Content:     "...",
		Author: &User{
			ID:       "1",
			Username: "salekin",
			Email:    "ss@gmail.com",
		},
	},
}

type User struct {
	ID       string `json:"id"`
	Username string `json:"user"`
	Email    string `json:"email"`
}

type Article struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Content     string `json:"content"`
	Author      *User  `json:"author"`
}

func main() {
  router := mux.NewRouter()
  router.HandleFunc("/api/articles", getArticles).Methods("GET")
}
```

Finally, we have time to create our `getArticles` function.

```go
func getArticles(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(articles)
}
```

Easy as that. Now we fill in the rest of the routes.

#### Get article
We will loop through the list of articles, and return the one that matches with the id we sent in url

```go
func main() {
  router.HandleFunc("/api/articles/{id}", getArticle).Methods("GET")
}

func getArticle(w http.ResponseWriter, r *http.Request) {
  params := mux.Vars(r)

  for _, article := range articles {
    if article.ID == params["id"] {
      json.NewEncoder(w).Encode(article)
      return
    }
  }
}
```

#### Create new article
We'll create a new article object of struct `Article` and add it to the `articles` slice.

```go
func main() {
  router.HandleFunc("/api/articles/", create).Methods("POST")
}

func create(w http.ResponseWriter, r *http.Request) {
	article := Article{}
	_ = json.NewDecoder(r.Body).Decode(&article)
	article.ID = strconv.Itoa(len(articles) + 1)
	articles = append(articles, article)

	json.NewEncoder(w).Encode(article)
}
```


#### Update an article
```go
func main() {
  router.HandleFunc("/api/articles/{id}", update).Methods("PUT")
}

func update(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	article := Article{}
	_ = json.NewDecoder(r.Body).Decode(&article)
	article.ID = params["id"]

	for i, article := range articles {
		if article.ID == params["id"] {
			articles[i] = article
			break
		}
	}

	json.NewEncoder(w).Encode(article)
}
```

##### Delete an article
```go
func main() {
  router.HandleFunc("/api/articles/{id}", delete).Methods("DELETE")
}

func delete(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	for i, article := range articles {
		if article.ID == params["id"] {
			articles = append(articles[:i], articles[:i+1]...)
			break
		}
	}

	json.NewEncoder(w).Encode(articles)
}
```


# Source code
[git](https://github.com/Salekin-1169/learning_mux)