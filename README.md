[![Build Status](https://travis-ci.org/Siriusa77II/SiriusTV.svg?branch=master)](https://travis-ci.org/Siriusa77II/SiriusTV)
### Sirius.TV

### Stuff Used:
# <a href='https://www.meteor.com'><img src='https://user-images.githubusercontent.com/841294/26841702-0902bbee-4af3-11e7-9805-0618da66a246.png' height='60' alt='Meteor'></a>

[![TravisCI Status](https://travis-ci.org/meteor/meteor.svg?branch=devel)](https://travis-ci.org/meteor/meteor)
[![CircleCI Status](https://circleci.com/gh/meteor/meteor/tree/devel.svg?style=shield&circle-token=c2d3c041506bd493ef3795ffa4448684cfce97b8)](https://circleci.com/gh/meteor/meteor/tree/devel)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=S2FjOVpYTlk1eHVxdkdrR24ra0JXaXBDaVA3WjJGejdkbThaWGRnWVJvWT0tLTlQMEdYM2NJbDJOYUd3RTc3RVVGQ2c9PQ==--9e2143718a0c216274cdacef7cd5a3d12950bcb8)](https://www.browserstack.com/automate/public-build/S2FjOVpYTlk1eHVxdkdrR24ra0JXaXBDaVA3WjJGejdkbThaWGRnWVJvWT0tLTlQMEdYM2NJbDJOYUd3RTc3RVVGQ2c9PQ==--9e2143718a0c216274cdacef7cd5a3d12950bcb8)

Meteor is an ultra-simple environment for building modern web
applications.

With Meteor you write apps:

* in modern JavaScript
* that send data over the wire, rather than HTML
* using your choice of popular open-source libraries

Try a getting started tutorial:
 * [React](https://www.meteor.com/tutorials/react/creating-an-app)
 * [Blaze](https://www.meteor.com/tutorials/blaze/creating-an-app)
 * [Angular](https://www.meteor.com/tutorials/angular/creating-an-app)

Next, read the [guide](https://guide.meteor.com) and the [documentation](https://docs.meteor.com/).

## Quick Start

On Windows, the installer can be found at https://www.meteor.com/install.

On Linux/macOS, use this line:

```bash
curl https://install.meteor.com/ | sh
```

Create a project:

```bash
meteor create try-meteor
```

Run it:

```bash
cd try-meteor
meteor
```

## Developer Resources

Building an application with Meteor?

* Announcement list: sign up at http://www.meteor.com/
* Having problems? Ask for help at: http://stackoverflow.com/questions/tagged/meteor
* Discussion forums: https://forums.meteor.com/

Interested in helping or contributing to Meteor?  These resources will help:

* [Core development guide](DEVELOPMENT.md)
* [Contribution guidelines](CONTRIBUTING.md)
* [Feature requests](https://github.com/meteor/meteor-feature-requests/)
* [Issue tracker](https://github.com/meteor/meteor/issues)

We are hiring!  Visit [meteor.io/jobs](https://www.meteor.io/jobs/) to
learn more about working full-time on the Meteor project.

## Uninstalling Meteor

Aside from a short launcher shell script, Meteor installs itself inside your
home directory. To uninstall Meteor, run:

```bash
rm -rf ~/.meteor/
sudo rm /usr/local/bin/meteor
```

On Windows, just run the uninstaller from your Control Panel.
  


  
Iron.Router
==============================================================================

[![Join the chat at https://gitter.im/iron-meteor/iron-router](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iron-meteor/iron-router?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A router that works on the server and the browser, designed specifically for <a href="https://github.com/meteor/meteor" target="_blank">Meteor</a>

## The Iron.Router Guide
Detailed explanations of router features can be found in the [Guide](http://iron-meteor.github.io/iron-router/).

## Installation

```shell
meteor add iron:router
```

## Examples
There are several examples in the [examples folder](examples).

## Quick Start
Create some routes in a client/server JavaScript file:

```javascript
Router.route('/', function () {
  this.render('MyTemplate');
});

Router.route('/items', function () {
  this.render('Items');
});

Router.route('/items/:_id', function () {
  var item = Items.findOne({_id: this.params._id});
  this.render('ShowItem', {data: item});
});

Router.route('/files/:filename', function () {
  this.response.end('hi from the server\n');
}, {where: 'server'});

Router.route('/restful', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
    this.response.end('post request\n');
  });

```

## Migrating from 0.9.4

Iron Router should be reasonably backwards compatible, but there are a few required changes that you need to know about:

### Hooks

`onRun` and `onBeforeAction` hooks now require you to call `this.next()`, and no longer take a `pause()` argument. So the default behaviour is reversed. For example, if you had:

```javascript
Router.onBeforeAction(function(pause) {
  if (! Meteor.userId()) {
    this.render('login');
    pause();
  }
});
```

You'll need to update it to

```javascript
Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('login');
  } else {
    this.next();
  }
});
```

This is to fit better with existing route middleware (e.g. connect) APIs.

### Controller Methods

`controller.setLayout()` is now `controller.layout()`. Usually called as `this.layout("fooTemplate")` inside a route action.

### Query Parameters
Query parameters now get their own object on `this.params`. To access the query object you can use `this.params.query`.

### Loading Hook

The `loading` hook now runs automatically on the client side if your route has a `waitOn`. As previously, you can set a global or per-route `loadingTemplate`.

If you want to setup subscriptions but not have an automatic loading hook, you can use the new `subscriptions` option, which still affects `.ready()`-ness, but doesn't force the `loading` hook.

### Hook and option inheritance

All hooks and options are now fully inherited from parent controllers and the router itself as you might expect. The order of precendence is now route; controller; parent controller; router.

### Route names

A route's name is now accessible at `route.getName()` (previously it was `route.name`). In particular, you'll need to write `Router.current().route.getName()`.

### Routes on client and server

It's not strictly required, but moving forward, Iron Router expects all routes to be declared on both client and server. This means that the client can route to the server and visa-versa.

### Catchall routes

Iron Router now uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp), which means the syntax for catchall routes has changed a little -- it's now `'/(.*)'`.

### Template Lookup

If you don't explicitly set a template option on your route, and you don't
explicity render a template name, the router will try to automatically render a
template based on the name of the route. By default the router will look for the
class case name of the template.

For example, if you have a route defined like this:

```javascript
Router.route('/items/:_id', {name: 'items.show'});
```

The router will by default look for a template named `ItemsShow` with capital
letters for each word and punctuation removed. If you would like to customize
this behavior you can set your own converter function. For example, let's say
you don't want any conversion. You can set the converter function like this:

```javascript
Router.setTemplateNameConverter(function (str) { return str; });
```

## Contributing
Contributors are very welcome. There are many things you can help with,
including finding and fixing bugs, creating examples for the examples folder,
contributing to improved design or adding features. Some guidelines below:

* **Questions**: Please post to Stack Overflow and tag with `iron-router` : http://stackoverflow.com/questions/tagged/iron-router.

* **New Features**: If you'd like to work on a feature,
  start by creating a 'Feature Design: Title' issue. This will let people bat it
  around a bit before you send a full blown pull request. Also, you can create
  an issue to discuss a design even if you won't be working on it.

* **Bugs**: If you think you found a bug, please create a "reproduction." This is a small project that demonstrates the problem as concisely as possible. The project should be cloneable from Github. Any bug reports without a reproduction that don't have an obvious solution will be marked as "awaiting-reproduction" and closed after one week. Want more information on creating reproductions? Watch this video: https://www.eventedmind.com/feed/github-issues-and-reproductions.

###  Working Locally
This is useful if you're contributing code to iron-router.

  1. Set up a local packages folder
  2. Add the PACKAGE_DIRS environment variable to your .bashrc file
    - Example: `export PACKAGE_DIRS="/Users/cmather/code/packages"`
    - Screencast: https://www.eventedmind.com/posts/meteor-versioning-and-packages
  3. Clone the repository into your local packages directory
  4. Add iron-router just like any other meteor core package like this: `meteor
     add iron:router`

```bash
> git clone https://github.com/EventedMind/iron-router.git /Users/cmather/code/packages/iron:router
> cd my-project
> meteor add iron:router
```

## License
MIT