import puppeteer from 'puppeteer-core';

function delay(time) {
  return new Promise(function(resolve) { 
    setTimeout(resolve, time)
  });
}

(async () => {
  const res = await fetch("http://localhost:9222/json/version");
  const data = await res.json();
  const browser = await puppeteer.connect({
    browserWSEndpoint: data.webSocketDebuggerUrl
  });
  const [page] = await browser.pages();
  const mBlastPageLeaderboard = 'https://capnco.gg/shipyard/leaderboards?tab=mBlast'

  const url = page.url();
  if (url !== mBlastPageLeaderboard) {
    await page.goto(mBlastPageLeaderboard);
    await page.setViewport({width: 1080, height: 1024});
    
    // let the page load allowing async requests to complete such as fetching leaderboard data
    await delay(5000) 
  }

  const tableSelectorCSS = 'body > div > div > div > div.flex.w-full.justify-center.flex-col.items-center.text-kap-gray > div.px-4 > div.grow > div.mt-6 > div.flex.flex-col.gap-4';
  const tableSelector = await page.waitForSelector(tableSelectorCSS);

  /* 
  // Scroll to bottom as much as you want here. 
  // This only scrolls down once.
  // const footerSelectorCSS = 'body > div > div > div > div.pt-20 > footer'
  // const footerSelector = await page.waitForSelector(footerSelectorCSS)

  // await page.evaluate(el => {
  //   if (el) {
  //     el.scrollIntoView();
  //   }
  // }, footerSelector)
  */

  const val = await page.evaluate(el => {
    const children = Array.from(el.children);

    // innerHTML / outerHTML
    return children.map(child => child.title);
  }, tableSelector)

  const parsedData = val.map(title => {
    const splitTitle = title.split(' ')

    const rankWordIndex = splitTitle.indexOf('Rank')
    const name = splitTitle.slice(0, rankWordIndex).join(' ')
    const rank = splitTitle[rankWordIndex + 1]
    const score = splitTitle[splitTitle.length - 1]

    return {
      name,
      rank,
      score,
    }
  })

  console.log(parsedData)

  browser.disconnect()
})();