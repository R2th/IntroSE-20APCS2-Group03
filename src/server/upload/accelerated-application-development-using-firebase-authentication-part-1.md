How many times have you thought about finding a faster way to integrate user authentication, when you started a new project? Well, it's been quite a headache for me. Every time we encounter the authentication flow, we do more or less the same thing over and over again, and even after that, it feels like a lots of work. What if we could move the authentication flow entirely to a managed third party service? That way we could focus more on the crucial parts of our application. Guess what, Firebase authentication provides just that! Additionally, you are getting a managed service that is heavily scrutinized, complies with industry standards and on top of that it's entirely free. :) Sounds juicy? Hop in. Let's have a tour on the feature offerings and usage of Firebase authentication.

## Authentication

Application authentication is used more or less on majority of the applications. It would be tough to find applications without authentication. In fact, some application provides visitor access to the application without the necessity of login, but behind the scene, they use **anonymous authentication** to keep track of their visitors, and leaves the window to gracefully log them in later.

The authentication flow has almost always included email and password based authentication, where in addition, some service provider allows third party login providers. Some offers SMS based or email link based (much like [OTP](https://en.wikipedia.org/wiki/One-time_password)) authentication too. To make things more convenient for user, applications often provide the possibility to link authentication schemes to point to a single user. While it's more convenient for user, it can be a real hurdle sometimes for developer and / or maintainer to properly manage these authentication schemes.

And, considering fast project development deadlines, it often makes sense to use a drop in solution, rather than developing one from scratch. Unless of course, you are developing some super secret application that doesn't trust any third party solution (NSA maybe :D ).

## Firebase Authentication

Firebase authentication has been out there for quite a while. Over the time, it matured, and pretty stable now. It offers a wide range of authentication scheme and flexible customization possibilities.

Some notable authentication scheme include,

- Email and password based authentication
- OAuth provider authentication
- Phone number authentication
- Anonymous authentication

Considering platform support, it readily supports Web, Android and iOS. And, it's entirely possible to connect to any unsupported platform through the REST interface (with some exception).

All the examples are provided in JavaScript, but, equivalent solutions are available in several other supported languages, through the respective SDK.

## Authentication Flows

### Firebase as the Sole Backend

Firebase Authentication can be used as a standalone solution for authentication. But, using it as a standalone solution limits its usage to the Firebase services only. The following flow demonstrates this mode of Firebase authentication usage.

- Client makes initial authentication request to Firebase Auth
- Firebase auth. confirms authentication and sends back ID token and other user entity related information, or, the request is rejected
- Client makes subsequent resource requests using that ID token

A point to note here is that, usually **SDK abstracts away authentication mechanism** in resource requests. For an example, we don't have to worry about explicitly passing the ID token with each request.

#### Example

##### Initial authentication request

```js
// Sign up
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // ...
});

// Sign in
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // ...
});
```

If you investigate the email and password based authentication snippet above closely, you'll notice something interesting.
You're right! The SDK doesn't return any token explicitly. That's because, the SDK manages the authentication token (ID token)
behind the scene, so that we don't have to worry about attaching it with every resource request. But, if you feel adventurous enough,
you may find the current user related data in `firebase.auth().currentUser`.

The ID token can be extracted through the following promise invocation, with the consideration that a user is currently logged in to the system.

```js
firebase.auth().currentUser.getIdToken(true)
  .then(t => console.log(t))
  .catch(e => console.log(e))
```

##### Resource request to Firebase services

```js
// Realtime Database
firebase.database().ref('users/' + userId).set({
  username: name,
  email: email,
  profile_picture : imageUrl
});

// Cloud Functions
exports.addMessage = functions.https.onRequest((req, res) => {
  return admin.database().ref('/messages').push({data: 'data'}).then((snapshot) => {
    return res.redirect(303, 'Wow!');
  });
});
```

Remember that the SDK abstracts away the authentication management while interacting with most of the Firebase services.
If you investigate the code above, you'll notice that we haven't passed any token or authentication related data.

The latter example is a special one. *Cloud Functions* is a trusted platform. So, when invoking certain Firebase services (including, Realtime Database and Firestore)
from *Cloud Functions*, they are authenticated automatically.


### *App server* as the Primary Authentication Server

Usage of Firebase Authentication as a standalone solution is certainly very convenient, but simply that doesn't satisfy all the application requirements. Consider an application that has it's own backend and API infrastructure, and now client wants to add some feature that requires Firebase. Let's consider that developers only intend to utilize the Realtime Database and Firebase Cloud Messaging service.

Considering the fact that the application already has its own authentication scheme setup, we need to find a certain way to integrate it with Firebase authentication, since **authorization in Realtime Database can only be achieved using Firebase authentication**.

In order to satisfy the above mentioned application requirements, we need to utilize the following flow.

- Client makes authentication request with credentials to the app server
- App server verified the credentials and,
  - if credentials are valid, server generates a JWT token and signs it using the key provided by Firebase
  - else, rejects authentication
- Client stores the JWT token
- Client makes an authentication request to Firebase Authentication using the received JWT
- Client makes subsequent resource requests to the app server or Firebase services using the JWT
- App server / Firebase verifies the JWT, and responds accordingly

#### Example

##### Initial authentication request to app server

When a typical login request (e.g. with email and password) is made to the app server,
app server verifies the request and if the request is valid it generates a JWT that
conforms with the [structure defined by Firebase](https://firebase.google.com/docs/auth/admin/create-custom-tokens#create_custom_tokens_using_a_third-party_jwt_library).
And, signs it using the key provided by Firebase. The following snippet demonstrates JWT generation and signing process in Ruby.

```ruby
require "jwt"

def create_custom_token(uid, is_premium_account=false)
  iat = Time.now.to_i
  exp = iat+(60*60) # Maximum expiration time is set to one hour
  payload = {:iss => $service_account_email,
             :sub => $service_account_email,
             :aud => "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
             :iat => iat,
             :exp => exp,
             :uid => uid,
             :claims => {:premium_account => is_premium_account}}

  token = JWT.encode payload, $private_key, "RS256"
  {
    iat: iat,
    exp: exp,
    uid: uid,
    token: token
  }
end
```

##### Initial authentication request to Firebase Authentication

As explained before, the generated token is used to login to Firebase Authentication.

```js
firebase.auth().signInWithCustomToken(token).catch(function(error) {
  //...
});
```

##### Resource request to app server

Post-authentication resource requests to the app server includes server generated JWT token (often in `Authentication` header).
Upon receiving a resource request, app server verifies the token, and if valid, proceeds with the resource access.

The following snippet demonstrates the JWT decoding and verification phase in Ruby, using the [jwt](https://github.com/jwt/ruby-jwt) gem.

```ruby
require "jwt"

JWT.decode(
  token, OpenSSL::PKey::RSA.new(FIREBASE_ADMIN_CRED["private_key"]).public_key,
  true, algorithm: "RS256"
)
```

##### Resource request to Firebase services

Once the Firebase authentication request above is made successfully, SDK authenticates the client, and subsequent
requests may be made as usual, without worrying about token management. See *Resource request to Firebase services* section for examples.

### *Firebase Auth.* as the Primary Authentication Server

This is another usage scenario of Firebase Authentication. Consider a scenario, where we are developing an application from scratch. We can utilize Firebase Authentication as the authentication server, and **remove the burden of authentication management from the app server entirely**. In order to satisfy this type of application needs, *Firebase Authentication* can be used in the following way.

- Client makes an authentication request to *Firebase Authentication*
- Firebase verifies the credentials, as usual
  - If credentials are valid, Firebase Authentication generates a JWT, signs it using it's own key, and responds with an **ID token**
  - If credentials are invalid, the request is rejected
- Client stores the JWT and ID token
- When client makes a resource **request to the app server**, it sends the ID token with them. App server verifies the token using Firebase key, and responds accordingly. This phase is a bit tricky, and is discussed in more detail in the following section.
- When client makes a resource **request to a Firebase service**, SDK (or REST client) attaches the ID token with them. Firebase verifies and responds accordingly.

#### Example

##### Initial authentication request to Firebase

This phase is exactly identical to the [Firebase as the sole backend](#_firebase-as-the-sole-backend-3) section.

##### Resource request to App server

When client makes a resource request to the app server, it sends the ID token along with the request.
App server verifies the ID token, and if valid, proceeds with the response. Unlike the custom token
verification, ID token verification requires the extraction of the [X509 certificate](https://en.wikipedia.org/wiki/X.509) associated with the token signing key.
And, then a token signature verification is performed against the certificate. The following snippet demonstrates both of the phases.

**Certificate extraction:**

```ruby
require "rest_client"
require "json"

response = RestClient.get("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com")
certificates = JSON.parse response.body
```

**ID token verification**

```ruby
require "jwt"

decoded_token = JWT.decode(id_token, nil, false)
kid = decoded_token[1]["kid"]
cert = certificates[kid]
formatted_cert = OpenSSL::X509::Certificate.new(cert)

payload = JWT.decode(id_token, formatted_cert.public_key, true, {algorithm: 'RS256'})
```

Note the interesting `kid` payload. This little kid is the *Key Identifier* for the associated certificate. You have to extract the right certificate. :)

##### Resource request to Firebase

These are typical service resource requests as demonstrated in *Resource Request to Firebase Services* section.

## Token Verification

Let's have a refresher about what we learnt so far, on token verification (Since, it's the most important piece in the puzzle
that enables app server to interact with Firebase authentication.).

### Custom Authentication Token Verification

Custom authentication token verification is simple. It takes the following steps.

- App server collects the Firebase project's private key
- App server verifies the token using the collected key and a [JWT library](https://jwt.io/#libraries-io).

Details: See *Resource Request to App Server* topic in *App server as the Primary Authentication Server* section

### ID Token Verification

ID token verification is a little bit tricky considering the custom auth. token verification.
This is because, the verification phase includes an additional server certificate extraction phase.
The entire process can be summarized as follows.

- Server fetches Firebase issuer certificates from https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com .
- Server retrieves the certificate validity from `maxAge` key in `Cache-Control` response header
- Certificates are stored in DB (preferably NOSQL, e.g. Redis) with associated **keyID**
- Server verifies the ID token against the retrieved certificate

Details: See *Resource Request to App Server* topic in *Firebase Auth. as the Primary Authentication Server* section

## Important Notes

- JWT validity can be verified using the `iat` and `exp` claims
- ID token verifier certificate validity can be determined from the `maxAge` key in `Cache-Control` response header

## Checking Authentication Status (via SDK)

In a particular event, if the authentication state changes, we may invoke our desired functions by utilizing the
following callback.

```js
firebase.auth().onAuthStateChanged(user => {
  console.log(user ? 'User is now logged in' : 'User is now logged out');
  if(user) {
    //...
  } else {
    //...
  }
});
```

---

Firebase provides pretty much everything required to be a standalone authentication solution. If limitations are considered, then certainly SDK support comes to the front, which is available for a limited number of languages. Although, REST API can cover for this limitation, but still, convenience of using REST API might become a factor. Other than that, Firebase Authentication can be considered as a quick and dirty solution to implement authentication. From the perspective of performance, it reduces burden over the application DB, when implemented [as the primary authentication server](#_firebase-auth-as-the-primary-authentication-server-5).

That's pretty much all for now :D . In the upcoming article in this series we are going to cover federated authentication providers, working with any OAuth 2.0 provider, aggregating providers, anonymous authentication and including a custom provider of your own! Happy authenticating till then! :)

## References

- Demo: https://github.com/atshakil/fcm-web
- Firebase Authentication Docs: https://firebase.google.com/docs/auth/
- JWT Format: https://firebase.google.com/docs/auth/admin/create-custom-tokens
- Custom Authentication: https://firebase.google.com/docs/auth/web/custom-auth
- ID Token Verification: https://firebase.google.com/docs/auth/admin/verify-id-tokens