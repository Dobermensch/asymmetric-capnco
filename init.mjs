import puppeteer from 'puppeteer-core';

const init = async () => {
  const res = await fetch("http://localhost:9222/json/version");
  const data = await res.json();
  
  // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch({executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"});
  // const page = await browser.newPage();

  const browser = await puppeteer.connect({
    browserWSEndpoint: data.webSocketDebuggerUrl
  });
  
  const [page] = await browser.pages();
  
  await page.goto('https://capnco.gg');
}

// Make sure you have chrome running with --remote-debugging-port=9222 first
// example: sudo ./Google\ Chrome --remote-debugging-port=9222
init()