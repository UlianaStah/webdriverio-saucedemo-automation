export const config = {
 
    runner: 'local',
       
    specs: [
       './test/specs/**/*.js'
    ],
    
    exclude: [],
    
    maxInstances: 10,
    
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.CI ? ['--headless', '--disable-gpu', '--no-sandbox'] : []
        }
    }], 
     
    logLevel: 'error',   
    bail: 0,    
    baseUrl: 'http://www.saucedemo.com',    
    waitforTimeout: 10000,    
    connectionRetryTimeout: 120000,    
    connectionRetryCount: 3,
 
    framework: 'mocha',    
    reporters: ['spec'],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
};
