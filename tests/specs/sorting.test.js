import loginPage from '../../po/pages/login.page';
import inventoryPage from '../../po/pages/inventory.page';

describe('Sorting Validation', () => {
    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.expectFieldsToBeEmpty();
        await loginPage.login('standard_user');   
        await inventoryPage.verifyPageUrl(); 
    });

it ('should sort products and verify order', async () => {
        await inventoryPage.sortByLowerToHigh();

        const prices = await inventoryPage.getPrices();
        const sortedPrices = [...prices].sort((a,b) => a - b);
        await expect(prices).toEqual (sortedPrices);
    });   
 });