## Scraping mBlast data for Capnco

We have to scape the leaderboard at https://capnco.gg/shipyard/leaderboards?tab=mBlast

## Getting started
1. clone repo
2. cd into repo
3. `yarn` or `npm install` (have node installed first before this step)
4. Figure out your chrome install path and run command `sudo ./Google\ Chrome --remote-debugging-port=9222`. (path for chrome in MACOS is `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` so you would run `sudo /Applications/"Google Chrome.app"/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222`) 
5. run `yarn init` or `npm run init`. This will connect to the browser you ran in previous step and head to the capnco website. From there, you will have to manually log in based on your preferred login method (of course, you can automate this process if you like).
6. run `yarn scrape` or `npm run scrape` after logging in to begin scraping the leaderboard. The data will be logged to the console.
