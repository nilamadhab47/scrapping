
const playwright = require("playwright");

async function scrapeImages(req, res) {
  for (const browserType of ["chromium"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.instagram.com/accounts/login/");

    await page.waitForSelector('[type=submit]', {
      state: 'visible'
    });

    // Rest of the code remains unchanged

    //  You can also take screenshots of pages
      await page.screenshot({
        path: `ig-sign-in.png`,
      });
      await page.type("[name=username]", "theevildarknight47");
      await page.type('[type="password"]', "Nm010798@#");
      await page.click("[type=submit]");
      await page.waitForSelector('[placeholder=Search]', { state: 'visible' })
      await page.goto(`https://www.instagram.com/divine_hycenth`);
      await page.waitForSelector("img", {
        state: 'visible',
      });

    const data = await page.evaluate(() => {
      const images = document.querySelectorAll("img");
      const urls = Array.from(images).map((v) => v.src);
      return urls;
    });
    await browser.close();
    console.log(data);
    res.status(200).json(data);
  }
}

// Call the function to execute it
scrapeImages({}, {
  status: function(code) {
    console.log("Status: " + code);
    return {
      json: function(data) {
        console.log("Response: " + JSON.stringify(data));
      }
    };
  }
});