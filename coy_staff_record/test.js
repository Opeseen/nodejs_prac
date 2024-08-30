const puppeteer = require('puppeteer');

const path = require("path");

const absolutePath = path.resolve("test.html");
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'output.pdf', format: 'A4' });

  await browser.close();
  console.log('PDF generated successfully!');
})();
