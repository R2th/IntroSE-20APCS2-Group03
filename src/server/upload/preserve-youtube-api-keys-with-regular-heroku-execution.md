# Introduction
The YouTube API key expires if it is not used for 90 days, and an application (English) is required to reclaim it.

Even if the application is revived,  the time required to take into account for the application and the time wasted for the application to pass, there is no doubt that it will not expire.

So, I tried to write a procedure to prevent API key expiration by accessing Youtube Data API at least once a day using Heroku's free server.

* While writing this article, we use `heloku-cli` and `python 3.7.4` installed on Windows 10.

* Credit card registration is required to install the Heroku Schedule add-on described below.

# Installing `heroku-cli`
Download the installer below and install heroku-cli.

[https://devcenter.heroku.com/articles/heroku-cli#download-and-install](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

Since git is used for Heroku deployment, if git is not in the environment, be sure that it is installed.

# Create a local development directory
Create a development directory in an appropriate location.

* test.cmd

```
$ mkdir heroku_test
$ cd heroku_test
```

Save the following three files in the development directory you created earlier.

* `runtime.txt`: Mandatory for making heroku to create a python environment.

* `requirements.txt`: Dependent external module (only requests in this example)

* `preserve.py`: python app for interacting with api

The contents of each file (example) are as follows.

preserve.py
```
import os
import requests

'''Specify any youtube video ID.
If you specify an id that does not exist and hit api, an error json is returned,
Since execution of api itself is effective, there is no problem as an api key preservation purpose'''
video_id="video_id"
keys = [
    """!!Note!!
The following “API_KEY1” is the name of the environment variable.
It is not api_key itself.
    """
    os.environ['API_KEY1'], 
    os.environ['API_KEY2']
]
for key in keys:
    #part=playerが一番quotaの消費が少ない(1.6667）
    url = f"https://www.googleapis.com/youtube/v3/videos?part=player&id={video_id}&key={key}"
    resp = requests.get(url)
    print(resp.text)
```

# Git repo setup and deploy
Enter the development directory where you saved the above three files and enter the following three git commands.

```
$ git init
$ git add .
$ git commit -m "first commit."
```

Log in to Heroku with heroku login and create an app with heroku create. App name may be omitted (automatically assigned)

```
$heroku login
 user:
 pass:

$ heroku create myAppName
```

Deploy the created app to Heroku.

```
git push heroku master
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
...
..
.
To https://git.heroku.com/myAppName
 * [new branch]      master -> master
```

# Environment variables setup

Save API key in Heroku environment variable.

> heroku config:set ="youtube api-key" --app "Heroku app name"
> 
```
$ heroku config:set API_KEY1="Alzos_......" --app "myAppName"
```

To delete environment variables that have been set
`Heroku config: unset (environment variable name)`

Once the environment is set up, let's run a test once.

If the program is correct and the environment variables are set correctly, you should see the json returned from youtube.

```
$ heroku run python preserve.py

Running python preserve.py on ⬢ myAppName, run.1002 (Free)
{
 "items": [
  {
   "snippet": {
    "publishedAt": "2019-01-01T00:00:00.000Z"
   }
  }
 ]
}
```
# Set up Heroku Scheduler and run it regularly.

Set the Heroku Scheduler add-on and run preserve.py periodically.

(Credit card registration is required to use Heroku Scheduler)

Execute.
```
heroku addons: add scheduler: standard
```

Access https://dashboard.heroku.com/apps in the browser.

Click the created app name to open the dashboard.

![](https://images.viblo.asia/941daf75-8ba6-40ce-a754-3c56377888e6.jpeg)

Click configure Add-on

![](https://images.viblo.asia/a3296f7c-8f7b-46cc-89fa-314d94fb2c7d.jpeg)

Click Heroku Scheduler

![](https://images.viblo.asia/e2d4867b-d03d-48aa-8a09-ba24b887da37.jpeg)

Click Create job 
![](https://images.viblo.asia/65f7f2c7-382d-4317-96a6-e9e9440e9c41.jpeg)

Select "Every day at ..." as the execution interval in Schedule and specify "python (executable file.py)" in Run command.

(The upper limit of the interval is one day, and one week unit cannot be specified)

Setting completed with Save Job.

![](https://images.viblo.asia/a5b7dc46-4141-4810-999b-a6f00b2232a1.jpeg)