export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    exclude: [],
    maxInstances: process.env.CI ? 1 : 10,
    
    capabilities: [{
    browserName: 'chrome',
    'wdio:chromedriverOptions': {
        binary: './node_modules/chromedriver/lib/chromedriver/chromedriver.exe'
    },
    'goog:chromeOptions': {
        args: process.env.CI
            ? ['--headless', '--disable-gpu', '--no-sandbox', '--window-size=1920,1080']
            : []
    }
}],
     
    logLevel: 'error',   
    bail: 0,    
    baseUrl: 'https://www.saucedemo.com',    
    waitforTimeout: 10000,    
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,
 
    framework: 'mocha',    
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    afterTest: async function (test, context, { passed }) {
        if (!passed) {
            await browser.saveScreenshot(`./screenshots/${test.title.replace(/\s+/g, '_')}.png`);
        }
    },
};
