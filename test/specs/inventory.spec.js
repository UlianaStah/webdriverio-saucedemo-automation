import loginPage from "../pageobjects/login.page";
import inventoryPage from "../pageobjects/inventory.page";
import {users} from "../data/users";

describe('Inventory Sorting', () => {
    beforeEach(async()=> {
        await loginPage.open();
        await loginPage.login(users.standard.username, users.standard.password);   
        await expect(browser).toHaveUrl(expect.stringContaining('/inventory.html'));
    });

it ('should sort products by name from Z to A', async () => {
        await inventoryPage.sortByNameZtoA();

        const names = await inventoryPage.getItemNames();
        const expectedNames = [...names].sort((a,b) => 
            b.localeCompare(a)
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
 