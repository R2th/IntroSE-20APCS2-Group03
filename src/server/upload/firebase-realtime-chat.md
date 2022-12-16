Firebase provides a robust infrastructure for realtime communications (including, chat, online gaming, monitoring, data streaming and many more). The most popular example of realtime communication is probably chat applications, always. In this article, we are going to go through Realtime Database (RTDB), and Firebase authentication.

## Realtime Database

Realtime Database is core behind the realtime infrastructure (although recently, Cloud Firestore is released, which is meant to be the next generation for realtime database). It provides a database which has a JSON-like structure, and for every change to the database, every subscriber receives an update. This is the very fundamental behind realtime database.

A firebase realtime database may look as follows:

```json
{
  "users": {
    "alovelace": {
      "name": "Ada Lovelace",
      "contacts": { "ghopper": true },
    },
    "ghopper": { ... },
    "eclarke": { ... }
  }
}
```

Data in database is protected using a simple yet powerful set of rules. An example may look as follows.

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Firebase Authentication

Firebase authentication, on the other hand, provides the authentication infrastructure for Firebase services. It will be really difficult to skip firebase authentication, and utilize another firebase service, because, these are designed in a way so that they are deeply interlinked.

Firebase authentication allows user to be logged in or signed up using a number of methods which covers pretty much most of the usage scenarios.

For custom authentication, it also supports token based authentication, where app server works as the authentication server, and it feeds firebase authentication a JWT token to authenticate. This method is very flexible, thus supporting majority of the exisiting applications.

A email password based signup may looks like the following,

```js
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```

And, login,

```js
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
```

## Building a Chat App

Let's build a chat application, which enables it's authenticated users to send and receive messages in a global chatroom. Our application is React based.

We are going to use [CRA](https://github.com/facebook/create-react-app). After the scaffold is generated, let's setup the firebase primary module instances.

```js
  firebase.initializeApp(FCM_CONFIG);
  window.firebase = firebase;
  window.auth = firebase.auth();
  window.database = firebase.database();
  window.messages = window.database.ref('messages');
```

`FCM_CONFIG` here is the project configuration that can be extracted from firebase console.
Now, let's set up authentication.

```js
// ...
window.auth.signInWithEmailAndPassword(email, password).catch(e => console.log(e));
// ...
window.auth.createUserWithEmailAndPassword(email, password).catch(e => console.log(e));
// ...
  logout() {
    window.auth.signOut()
      .then(() => {})
      .catch(e => console.log(e))
  }
// ...
```

We can monitor login status using the following observer.

```js
    window.auth.onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user })
      console.log(user ? 'User is now logged in' : 'User is now logged out');

    });
```

Now we subscribe to the messages for update.

```js
  enableRTDB() {
    const msgs = this.state.messages;
    // register an event at a specific location
    window.messages.on('child_added', snap => {
      this.setState({messages: this.state.messages.concat(snap.val())});
      console.log(`New message added. Message data: ${JSON.stringify(snap.val())}`);
    })
    window.messages.on('child_removed', snap => {
      const
        index = _.findIndex(msgs, nth => nth.text ===snap.val().text),
        _messages = msgs.filter((msg, _index) => _index !== index);

      this.setState({messages: _messages});
      console.log(`A message removed. Message data: ${JSON.stringify(snap.val())}`);
    })
  }
```

And, to send a new message to the group, we use the `push` method.

```js
  sendNewMessage() {
    // Create new message
    const text = this.state.value;
    if(text === '') return;
    window.messages.push().set({ text })
      .catch(e => console.log(`Could not write to RTDB. Error: ${e}`));
    this.input.value = '';
    this.setState({value: ''});
  }
```

That's basically what it takes to prepare a chat application using Firebase. The power here is simplicity, and of course not to mention the completely managed infrastructure.

---

The entire project is hosted [here](https://github.com/atshakil/fcm-web). Please raise an issue, if you have any trouble with the project. :)

One of the primary advantages of using Firebase is that, it supports major platforms and provides SDK for several highly popular languages. The infrastructure is supported with good quality documentation, so getting started with a service is mostly hassle free. The learning curve is also not that steep. Finally, for a realtime application, Firebase can be considered as a one stop solution, if cost of the services doesn't matter that much. ;)

## References

- **Project Source**: https://github.com/atshakil/fcm-web
- **Documentation**
  - **Authentication**: https://firebase.google.com/docs/auth/
  - **Realtime Database**: https://firebase.google.com/docs/database/