# AppWorks Example - Finder / AWFileTransfer

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWFileTransfer plugin is to download and upload files.
The purpose of the Finder plugin is to list files in a directory and open files.

__Please note, these plugins have been deprecated by [MobileFileSystem](https://github.com/opentext/appworks-js-example-mobilefilesystem)__

## Usage

#### AWFileTransfer.download

```javascript
download(url: string, target: string, options?: any, shared?: boolean)
```

With this method, you can download a file from a URL and store it within AppWorks on the device.

+ __url__: The URL of the remote file
+ __target__: The the filename to store the file as
+ __options__: (optional) Pass in any specific headers needed to access the remote file
+ __shared__: (boolean)
 + __true__: Will store the file in the __file provider storage location__ and available to third party apps on the device, but not other apps within appworks.
 + __false__: Will store the file in the __documents__ directory, and will be accessible by other apps within appworks, but not third party apps.
  + Note that the documents directory is publicly accessible on android, making this slightly ambiguous, so if you need to share files with other apps in appworks, set to false, otherwise set to true.

Examples
```javascript
var fileTransfer = new Appworks.AWFileTransfer(
  function(file) {
    // Success callback
    console.log(file);
  }, function(error){
    // error callback
    console.log(error);
  }
);

// Add a progress handler
fileTransfer.progressHandler(
  function (progress) {
    console.log(progress);
  });

// Call the AWFileTransfer.download function
// Pass in the base URL, the filename, options

var shared = true;
fileTransfer.download('http://thecatapi.com/api/images/get', 'file.jpg', null, shared);
```

#### AWFileTransfer.upload

```javascript
upload(source: string, url: string, options?: any, shared: boolean)
```
With this method, you can download a file from a URL and store it within AppWorks on the device.

+ __source__: The filename to upload
+ __url__: The remote url to upload the file too
+ __options__: (optional) Pass in any specific headers needed to upload to the remote url
+ __shared__: (boolean) Same theory as with AWFileTransfer.download

Examples
```javascript
var self = this;
function uploadFile () {
    var fileTransfer = new Appworks.AWFileTransfer(
      function(file) {
        // Success callback
        console.log(file);
      }, function(error){
        // error callback
        console.log(error);
      }
    );

    fileTransfer.upload('file.jpg', 'http://thecatapi.com/api/images/get');
};
```
#### AWFileTransfer.progressHandler
```javascript
progressHandler(callback: (data: any) => void)
```

If set on a file transfer instance, the callback will be called indicating its progress.

#### Finder.open

```javascript
open(path: string, filename: string)
```

Pass in a filename and a path relative to the file provider storage location, and AppWorks will offer to open this in an applicable third party app.

If the file is in the root, then set path to "/"

Example

```javascript
var finder = new Appworks.Finder(
  function(result){
    console.log(result);
  }, function(error){
    console.log(error);
});

var filename = "myFile.pdf";
finder.open('/', filename);
```

#### Finder.openDirect

```javascript
openDirect(filename: string)
```

Pass in a full path and AppWorks will offer to open this in an applicable third party app.

Example

```javascript
// Obtain the File Provider Storage URL from Appworks.Auth.authenticate
var auth = new Appworks.Auth(
  function(response) {
    var authData = response.authData;
    var sharedDocumentUrl = authData.sharedDocumentUrl;

    // Once obtained, append filename and path to the end of the File Provider Storage URL
    var filename = "myFile.pdf";
    var fullpath = sharedDocumentUrl + "/" + filename;
    var finder = new Appworks.Finder(
      function(result){
        console.log(result);
      }, function(error){
        console.log(error);
    });

    finder.openDirect(fullpath);
  },
  function(error) {
    console.log(error);
  }
});

auth.authenticate(false);
```

#### Finder.share

```javascript
share(filename: string)
```

Pass in a full path and AppWorks will show a list of third party apps (currently on your device) which you can share the file will.

Works the same way as openDirect.

Example

```javascript
// Obtain the File Provider Storage URL from Appworks.Auth.authenticate
var auth = new Appworks.Auth(
  function(response) {
    var authData = response.authData;
    var sharedDocumentUrl = authData.sharedDocumentUrl;

    // Once obtained, append filename and path to the end of the File Provider Storage URL
    var filename = "myFile.pdf";
    var fullpath = sharedDocumentUrl + "/" + filename;
    var finder = new Appworks.Finder(
      function(result){
        console.log(result);
      }, function(error){
        console.log(error);
    });

    finder.share(fullpath);
  },
  function(error) {
    console.log(error);
  }
});

auth.authenticate(false);
```
#### Finder.list

```javascript
list(path: string)
```

This the files in the file provider storage location. Pass in a path relative to it, if it is the root, pass in "/".

Example

```javascript
var finder = new Appworks.Finder(
  function(files) {
    // success
    console.log(files);
  }, function(error){
    // error
    console.log(error);
  }
);

finder.list("/");
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
