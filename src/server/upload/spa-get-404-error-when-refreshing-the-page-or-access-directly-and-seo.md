When developing and deploying **SPA** app, eg: **Reactjs**, the navigation between pages works perfectly by clicking through several routes and everything seemed fine.

Somehow the URL looks like:
```
http://abc.com/job/431
```
...until we refreshed the page or tried to access a route directly. We got a 404 error.

![Nam Le](https://live.staticflickr.com/65535/52470688530_26202e9687_c.jpg)

One of working around solution:

> Use `HashRouter` instead of `BrowserRouter`.

Then, we can try to refresh or enter directly the page. Okay that would be an easy one.

```
http://abc.com/#/job/431
```

But since we want to have nice and clean URLs without the hash `#` (a.k.a `URI fragments`), that was no option. So let’s dig deeper and have a look at the reason for the error.

When we’re visiting a route of your app directly, web server tries to map the URL to a file/resource in the public folder. In this case it looks for **/job/431.html** which obviously doesn’t exist – therefore the 404 error.

To avoid that, we have to tell web server to redirect all requests to our **index.html**, so our app can perform some routing magic for that URL.

## Step 1 - Config the Web Server

We have various configs based on your web server platform.

### Apache httpd `.htaccess`

```
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```

### nginx

```
server {
  root /var/www/mysite/; # or location of your choice
  index index.html;

  location /{
    try_files $uri $uri/ =404;
  }
}
```

### Node.js/ Express

```js
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
```

### IIS `web.config`
We have to install [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite "URL Rewrite") for this to work.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
			<rules>
				<rule name="Handle HTML5 History Mode " stopProcessing="true">
					<match url="(.*)" />
					<conditions logicalGrouping="MatchAll">
						<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
						<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
					</conditions>
					<action type="Rewrite" url="/" />
				</rule>
			</rules>
		</rewrite>
    </system.webServer>
</configuration>
```

### Webpack 5 `devServer.proxy`

With Webpack 5, we have some configs. Please refer here: [https://nready.net/?p=1344](https://nready.net/?p=1344)


## Step 2 - Enabling HTML5 mode in different frameworks & routers

In `index.html`, be sure to include a base href, like so:
```html
<base href="/">
```

### Angular

Read more on [angular.io](https://angular.io/guide/router#milestone-1-getting-started-with-the-router "angular.io")

### React
With `react-router-dom`, Use `BrowserRouter` instead of `HashRouter`.

`BrowserRouter` is a router implementation that uses the HTML5 history API (pushstate, replacestate, and popstate events) to keep your UI in sync with the URL. It is the parent component used to store all other components.

### Vue

We need to set the router mode to `history`. [Reference](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations "Reference")

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

## One more thing about ... SEO

The issue with this is that now Google doesn't consider this an AJAX Single Page Application. SPAs with client-side routing should implement the History API to change pages.

We can do this relatively easily with SSR like Next.js?

There is a good part: Google itself suggests that to benefit from proper indexing with topic [Understand the JavaScript SEO basics](https://developers.google.com/webmasters/ajax-crawling/docs/html-snapshot "Understand the JavaScript SEO basics"), which will be discussed next topic.

--

My experiment at works in ACB - Asia Commercial Bank,
Original written from my blog: https://nready.net/?p=1343
*@Le Quoc Nam, Saigon, 01 Nov 2022*