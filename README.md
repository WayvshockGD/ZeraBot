# Running the bot
**Please run this on a real host, hosting like replit or heroku are not good services for hosting. BUY A SERVER, VPN OR LOOK FOR FREE HOSTING WITHOUT A LIMIT.**

Running:

`tsc -b` or `npx tsc -b` if you do not have typescript installed.

then
`node .` or `node ./build/start.js`

# Client Plugins
Client plugins are a part of the bot that make it up or come with utilities.
to add your plugin:
```ts
// Add the class to ClientPlugins.ts
class WhateverPlugin {}

// Add the class to the interface in start.ts
interface Plugins {
    whatever: WhateverPlugin;
}
```
It will show when doing `client.plugins.whatever` or `ctx.zera.plugins.whatever` if its a command.

# Color codes
Green: `Success`
Blue: `Info`
Yellow: `Warn`
Red: `Error`

# NPM Terminal Commands:
`npm run lint`

`npm start`