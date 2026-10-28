import loginPage from '../pageobjects/login.page';
import inventoryPage from '../pageobjects/inventory.page';

describe('Inventory Sorting', () => {
    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');   
        await inventoryPage.verifyPageUrl(); 
    });

it ('should sort products by name from A to Z', async () => {
        await inventoryPage.sortByNameAtoZ();

        const names = await inventoryPage.getProductNames();
        const expectedNames = [...names].sort((a,b) => 
            a.localeCompare(b)
    );
        await expect(names).toEqual (expectedNames);
    });
    
    it ('should sort products by price from low to high', async () => {
        await inventoryPage.sortByPriceLowToHigh();

        const prices = await inventoryPage.getProductPrices();
        const expectedPrices = [...prices].sort((a,b) => a-b);

        await expect(prices).toEqual(expectedPrices);
    });
});
 