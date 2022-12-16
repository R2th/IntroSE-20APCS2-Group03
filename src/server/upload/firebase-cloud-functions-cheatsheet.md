![serverless-1](https://images.viblo.asia/f57bca29-4f44-4ce6-a2a3-e9810f494304.jpeg)

**Cloud functions** is identical to [AWS Lambda](https://aws.amazon.com/lambda/), which lets run backend code automatically in response to a number of events. This is a serverless architecture which allocates and scales runtime on demand. Currently, JavaScript and TypeScript are supported for function coding.

This article attempts to be a quick reference for Cloud Functions practitioners, rather than a detailed guide to understand Cloud Functions from the scratch.

## Usage

Cloud functions run backend code in response to events triggered by any of the followings,

- **Firebase features**
- **HTTPS endpoints** (e.g. webhooks)
- **Service triggers**

Some usage scenario includes,

### User Notification

Notifying users when something interesting happens

Examples:

- Send FCM notification when RT DB entry created (follower added)
- Send confirmation email on subscribing/unsubscribing to newsletters
- Send an SMS confirmation when a user creates a new account

### Realtime Database Maintenance

Performing realtime database sanitization and maintenance

Example:

- On a chat message write event, sanitize message and update the DB entry
- Purge deleted user's content
- Limit number of child nodes
- Track the number of elements in a Realtime database list
- Copy RT DB data to Google cloud BigQuery
- Convert text to emoji
- Manage computed metadata for database records

### Resource Intensive Task Execution

Executing intensive tasks in the cloud instead of the app

Example:

- Image thumbnail generation and automatic distribution
- Periodically delete unused accounts
- Automatically **moderate uploaded images**
- Send bulk email to users
- Aggregate and summarize data periodically
- Process a queue of pending work

### Third-party Services Integration

Integration with third-party services and APIs

Example:

- Slack message on Github push (using GH webhook API)
- Google Cloud vision API to analyze and tag uploaded images
- Translate messages using Google translate
- Use **auth providers like Linkedin or Instagram to sign in users**
- Send request to a webhook on RT DB writes
- Enable full-text search on RT DB elements
- Process payment from users
- Create auto responses to calls and SMS messages
- Create a chatbot using Google assistant

## Event Sources (Providers)

- **Cloud Firestone**
- **Realtime Database**
- **Firebase Authentication**
- **Google Analytics for Firebase**
- **Crashlytics**
- **Cloud Storage**
- **Cloud Pub/Sub**
- **HTTP**

## Understanding Functions

Every Cloud Function is fundamentally a trigger for specific types of events. We already saw the available function triggers. Now, let's have a closer look at some of the commonly used function triggers.

### Triggers: Realtime Database

Cloud Functions support the following triggers for Realtime database

- `onWrite`: Triggered during any of `onCreate`, `onUpdate` or `onDelete`
- `onCreate`
- `onUpdate`
- `onDelete`

Example:

**onCreate**

```
exports.makeUppercase = functions.database.ref('/messages/{messageId}/original')
  .onCreate((snapshot, context) => {
    const original = snapshot.val();
    const uppercase = original.toUpperCase();
    return snapshot.ref.parent.child('uppercase').set(uppercase);
  });
```

**onWrite**

```
exports.makeUppercase = functions.database.ref('/messages/{messageId}/original')
    .onWrite((change, context) => {
      if (change.before.exists()) {
        return null;
      }
      if (!change.after.exists()) {
        return null;
      }
      const original = change.after.val();
      const uppercase = original.toUpperCase();
      return change.after.ref.parent.child('uppercase').set(uppercase);
    });
```

#### Notes

- User specific app instance can be initialized using the provided SDK to impersonate an user, and perform action on the user's behalf
- In case of `onWrite`,
  - **Value before change** can be accessed using `change.before`
  - **Value after change** can be accessed using `change.after`

### Triggers: Firebase Authentication

A function can be triggered in response to a **user creation** or **user deletion** event

#### Event: User Creation

This event is fired for any of the following scenarios,

- User creates an email account and password
- First sign in using federated ID provider
- Creates account using Firebase Admin SDK
- First sign in to a new anonymous auth session

Example:

```js
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  // ...
});
```

**Exception**: Function is not triggered during *first sign in using a custom token*

#### Event: User Deletion

Example:

```js
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
  // ...
});
```

## Directly Calling a Function

A function can be called directly from the app, when a function is written as HTTP callable function (using trigger `functions.https.onCall`, and using Firebase client SDK)

**NOTE**: To improve performance (e.g. reduce network latency), callable function and calling client (server app) should reside in the same or close location (or, region)

### Directly Callable Function

Example:

```js
exports.addMessage = functions.https.onCall((data, context) => {
  // data: contains parameters passed from the caller
  // context: Auth / user info, automatically added to the request
  // returns: data (for synchronus), or promise (for asynchronus) that resolves to data
  // Error: On error, function should throw an instance of `functions.https.HttpsError`
});
```

### Caller

Example:

```js
var addMessage = firebase.functions().httpsCallable('addMessage');
addMessage({text: messageText}).then(function(result) {
  // Read result of the Cloud Function.
  var sanitizedMessage = result.data.text;
}).catch(function(error) {
  // Getting the Error details.
  var code = error.code;
  var message = error.message;
  var details = error.details;
  // ...
});
```

### Calling Functions Using HTTP (includes Webhook)

A function can be invoked using HTTPS request (GET, POST, PUT, DELETE or OPTIONS), when the trigger is set as `functions.https.onRequest`. It's important to note that this type of trigger only works on a `HTTPS` endpoint (where the only exception is debugging environment in `localhost`).

- [Documentation](https://firebase.google.com/docs/functions/http-events)

## Deployment and Runtime Options Management

- Once the function is prepared, deployment can be performed using
  - `firebase deploy --only functions`
- To deploy only specific functions,
  - `firebase deploy --only functions:functionName,functions:funcName2`
- A function can be deleted using,
  - `firebase functions:delete myFunction myOtherFunction --region us-east-1 --force`
  - Additionally, if a function is removed from the source file, during deployment it will automatically be deleted
- **Node.js runtime** can be selected by adding (e.g. `"engines": {"node": "8"}`) to the `package.json`
- **Timeout and Memory Allocation**: [Reference](https://firebase.google.com/docs/functions/manage-functions)

### Updating a Function Trigger

Steps:

1. Modify source and rename
2. Deploy (now two function with different triggers are running )
3. Explicitly delete the old function

### References

- **Function management**: https://firebase.google.com/docs/functions/manage-functions
- **CLI**: https://firebase.google.com/docs/cli/

## Function States

An asynchronus function can be resolved by returning a promise. Functions returning promise keeps running until the promise is resolved or rejected (or the function is timed out). HTTP functions can be terminated using `res.redirect()`, `res.send()`, or `res.end()`. Synchronous functions can be terminated using a `return` statement.

**Warning**: Situations where a function triggers itself, must be avoided (to avoid infinite loop)

## Environment Configuration

Environment configuration is used to set environment variables for functions (e.g. third party API keys)

### Setting Environment Data

- **Setting a variable**: `firebase functions:config:set servicex.key="API_KEY" servicex.id="API_ID"`
- **Removing a variable**: `firebase functions:config:unset key1 key2`
- **Cloning variable from another project**: `firebase functions:config:clone --from <fromProject>`

### Retrieving Configuration

#### From CLI

Running `firebase functions:config:get` prints configuration in JSON structure like as follows.

```json
{
  "someservice": {
    "key":"THE API KEY",
    "id":"THE CLIENT ID"
  }
}
```

#### From Function

```js
const functions = require('firebase-functions');
// ...
function.config().servicex.key
// ...
```

### Prepopulated Variables

The following variables are already populated by Cloud Functions.

- `process.env.GCLOUD_PROJECT`: Provides project ID
- `process.env.FIREBASE_CONFIG`: Provides project config info.
  - Example

    ```js
    {
      databaseURL: 'https://databaseName.firebaseio.com',
      storageBucket: 'projectId.appspot.com',
      projectId: 'projectId'
    }
    ```

**Note**: Function **must be redeployed** for the configuration to take effect

## Optimization

Among others, the following strategies can be used to further optimize and consolidate a function deployment.

- **Network Optimization**: Keep alive connection can be used to save DNS quota, and reduce inter-request latency
- **Load-testing**: Among many available tools, [Artillary](https://artillery.io/) can be used to test for performance under heavy load.
  - Example
    ```sh
    artillary quick -d 300 -r 30 <URL>
    ```

**Reference**: https://firebase.google.com/docs/functions/networking

## Debugging

### Prerequisites

- For function invocations other than *Firestore and Realtime Database* requires admin credentials to be set for function emulation. The following steps can be followed for credentials setup for emulation.
  - From *GC Console > IAM & admin > Service accounts*, select the service account with *App Engine default service account* tag.
  - Create JSON key
  - Set credentials location via shell environment variable, as follows
    - `export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"`
    - For Unix-like OSes, set the `export` in `~/.bashrc` (or equivalent for other shells), and `source`
- For functions with custom configuration variables, debugging using `firebase functions:shell` requires the configurations be set locally. The configurations can be extracted from firebase cloud and set locally by running the following in the `functions/` directory.
  - `firebase functions:config:get > .runtimeconfig.json`

- Once the **admin credential** and optionally **configuration variables** are set, emulation can take place as instructed below.

### Debugging Realtime Database Functions

In order to debug Realtime Database Functions, we need to run the functions shell.

```sh
firebase functions:shell
```

Once the shell prompt is initiated, we may emulate function invocation be calling any of the followings.

- **onCreate**: `functionName('new_data')`
- **onDelete**: `functionName('old_data')`
- **onUpdate or onWrite**: `functionName(before: 'old_data', after: 'new_data')`
- **Wildcard Params Extraction**:
  - Scenario: path - `/input/{group}/{id}`
  - Example:
    - Path: `/input/a/123`
    - Function: `functionName('data', {params: {group: 'a', id: '123'}})`
- **Mocking an Unauthorized User**: `functionName('data', {authMode: 'USER'})`
- **Mocking an EndUser**: `functionName('data', {auth: {uid: 'abcd'}})`

## Points to Note

- **Cold Starts**
  - Cold start is an event when a new function instance is started that involves loading the runtime and code
  - Requests with cold starts are slower than the requests hitting existing function instances
  - Cold start (a new function) occurs in two cases.
    - When function is deployed
    - When a new function instance is automatically created to scale up to the load, or occasionally to replace an existing instance
- **Function instance lifespan**
  - When one function execution ends, another invocation may be handled by the same function instance.
    - Therefore, **it is recommended to cache state across invocations in global scope**
    - But, the function should be prepared to work without this cache, cause there is no guarantee that the next invocation will reach the same instance
- **Function Scope vs. Global Scope**
  - Global scope in the function file is executed on every cold boot, but not if the instance has already been initialized
- **Function Execution Timeline**
  - Function that runs outside the execution periods (timeout) is not guaranteed to execute
  - A *end of function* signal should always be used.
- **Errors**
  - HTTP function should return appropriate HTTP status codes
  - Background functions should log and return an error message
  - Uncaught exceptions or current process crash may lead to instance restart, which in turn leads to *cold starts* and *higher latency*.
- **Timeout**
  - Can be specified during deployment time
  - Default: **1 minute**
  - Extendable to: **9 minutes**
  - On timeout, an error status is immediately returned (remaining code execution may be terminated)
- **Cloud Functions File System**
  - Filesystem: `tmpfs` (in-memory)
  - Access Mode: Read only, except `/tmp`, which is read write
  - Function's directory may be different than the CWD
  - Code can be loaded from other files deployed with the function
- **Network**
  - Public internet is accessible via the standard libraries or third-party ones
  - Network connections should be reused across function invocation
  - Any connection that remains idle for 2 minutes may be closed by the system
  - Every deployed function is isolated from all other functions
    - Memory, global variables, file systems, or state is not shared across different functions
- **HTTPS functions**
  - For HTTPS functions, requests on endpoint results in ExpressJS-style [Request](http://expressjs.com/en/4x/api.html#req) and [Response](http://expressjs.com/en/4x/api.html#res) objects passed to the `onRequest()` callback

## A Few More Cheats

- Each function runs in isolation, in its own environment, with its own configuration
- A cloud function can be initialized in local, using `firebase init functions` shell command. Project template files will be generated in the selected directory. The generated template has the following structure

  ```
  myproject
   +- .firebaserc    # Hidden file that helps you quickly switch between
   |                 # projects with `firebase use`
   |
   +- firebase.json  # Describes properties for your project
   |
   +- functions/     # Directory containing all your functions code
        |
        +- .eslintrc.json  # Optional file containing rules for JavaScript linting.
        |
        +- package.json  # npm package file describing your Cloud Functions code
        |
        +- index.js      # main source file for your Cloud Functions code
        |
        +- node_modules/ # directory where your dependencies (declared in
                         # package.json) are installed
  ```
- **CLI Reference**: https://firebase.google.com/docs/cli/
- **Functions can be tested locally** using `firebase serve --only functions`
  - RT DB doesn't require additional auth configuration. But, other services require a [configuration](https://firebase.google.com/docs/functions/local-emulator).
- **Retriggering Functions**: Situations should be avoided that re-triggers a function, creating an infinite loop.
- **Wildcard reference** can catch a path name reference and pass to the context in the associated callback
- A function with asynchronus operation (e.g. write to RT DB) must return a promise
- **Functions should behave in an idempotent way** (They should produce the same result in response to an identical event)
- **Realtime Database Creation is Automated**: Even if there is no database already created, **functions will automatically create RT DB, if necessary**
- **API Requests**: An arbitrary API request can be made using any of the available libraries, like as follows.
  ```js
  const request = require('request-promise');

  request({
    url: 'https://example.com/path',
    headers: {
      'Authorization': `Bearer ${functions.config().servicex.key}`
    },
    body: {email: email}
  })
  ```

---

Serverless solutions like Cloud Functions often provide a major lift in application development. Although, Cloud functions is a new product and it has a limited number of triggers with JavaScript being the only supported language. This is certainly a major drawback. But, even after that, for a platform like Firebase, Cloud Functions blend in the environment just fine, while providing a lots of feature and support for other Firebase products. So, certainly, utilizing Cloud Functions can often be a major plus in the application development lifecycle. ;) That's all about it for now. Happy hacking! :)

## References

- Documentation: https://firebase.google.com/docs/functions/
- Monitoring: https://firebase.google.com/docs/functions/writing-and-viewing-logs
- Function Emulation: https://firebase.google.com/docs/functions/local-emulator
- Optimization: https://firebase.google.com/docs/functions/networking
- Comic: https://read.acloud.guru/acg-faas-and-furious-b9574b6675c5