# Express Seo Breadcrumbs

A handy middleware to produce seo-friendly breadcrumbs with **zero dependencies** and simple interface.
 Breadcrumbs are accumulated while each new breadcrumb's url includes the url of the previous crumb, thus reflecting users journey in depth of the app.
 Main page crumb is always stored.

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/en/) and npm(for Linux users) should be installed;

An [Express JS](https://expressjs.com/) should be used on the project.

### Installing

run
```
npm i -S express-seo-breadcrumbs
```
in your project main file (server.js, app.js or similar) include the following:
```javascript
const breadcrumbs = require('express-seo-breadcrumbs');
app.use(breadcrumbs.init());
```

set home location:
```javascript
breadcrumbs.setHome({ name: 'Home', url: '/' }); //sample values are defaults
```

whenever you need to set a breadcrumb use within the route:
```javascript
app.get('/dashboard', (req, res) => {
    req.breadcrumbs({ name:'Dashboard', url: '/dashboard' });
 //...
});
```

access breadcrumbs to pass to front by calling ``` req.breadcrumbs(); ```

sample with express-handlebars:
```javascript
app.get('/dashboard', (req, res) => {
    req.breadcrumbs({ name:'Dashboard', url: '/dashboard' });

    const breadcrumbs = req.breadcrumbs();

    res.render('dashboard', { breadcrumbs });
});
```




