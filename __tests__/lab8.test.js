describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('https://cse110-f2021.github.io/Lab8_Website');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);
    // Grab the .data property of <product-items> to grab all of the json data stored inside
    data = await prodItems[0].getProperty('data');
    // Convert that property to JSON
    plainValue = await data.jsonValue();
    // Make sure the title, price, and image are populated in the JSON
    if (plainValue.title.length == 0) { allArePopulated = false; }
    if (plainValue.price.length == 0) { allArePopulated = false; }
    if (plainValue.image.length == 0) { allArePopulated = false; }
    // Expect allArePopulated to still be true
    expect(allArePopulated).toBe(true);

    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found
    for(let i = 1; i < 20; ++i){
      console.log(`Checking product item ${i + 1}/${prodItems.length}`);
      data = await prodItems[i].getProperty('data');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.price.length == 0) { allArePopulated = false; }
      if (plainValue.image.length == 0) { allArePopulated = false; }
      expect(allArePopulated).toBe(true);
    }

  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    let product_item_elements = await page.$$('product-item');
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    let shadow_root = await product_item_elements[0].getProperty('shadowRoot');
    let a_button = await shadow_root.$('button');
    // Once you have the button, you can click it and check the innerText property of the button.
    await a_button.click();
    let inner_text = await a_button.getProperty('innerText');
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    let text = await inner_text.jsonValue();
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    let product_item_elements2 = await page.$$('product-item');
    let list_size = product_item_elements2.length;
    for(let i = 1; i < list_size; ++i){
      // get the shadowRoot and query select the button inside, and click on it.
      let shadow_root2 = await product_item_elements2[i].getProperty('shadowRoot');
      let a_button2 = await shadow_root2.$('button');
      await a_button2.click();
    }
    // Check to see if the innerText of #cart-count is 20
    let cart_count = await page.$("#cart-count");
    let inner_text2 = await cart_count.getProperty('innerText');
    let cart_count2 = await inner_text2.jsonValue();
    expect(cart_count2).toBe("20");
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    await page.goto('http://127.0.0.1:5500/index.html');
    let product_item_elements3 = await page.$$('product-item');
    // element to make sure that all of their buttons say "Remove from Cart".
    let list_size2 = product_item_elements3.length;
    for(let i = 0; i < list_size2; ++i){
      let shadow_root3 = await product_item_elements3[i].getProperty('shadowRoot');
      let a_button3 = await shadow_root3.$('button');
      let inner_text3 = await a_button3.getProperty('innerText');
      let text2 = await inner_text3.jsonValue();
      expect(text2).toBe("Remove from Cart");
    }
    // Also check to make sure that #cart-count is still 20
    let cart_count3 = await page.$("#cart-count");
    let inner_text4 = await cart_count3.getProperty('innerText');
    let cart_count4 = await inner_text4.jsonValue();
    expect(cart_count4).toBe("20");
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    let the_cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(the_cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    let product_item_elements4 = await page.$$('product-item');
    let list_size3 = product_item_elements4.length;
    for(let i = 0; i < list_size3; ++i){
      let shadow_root4 = await product_item_elements4[i].getProperty('shadowRoot');
      let a_button4 = await shadow_root4.$('button');
      await a_button4.click();
    }
    // Once you have, check to make sure that #cart-count is now 0
    let cart_count5 = await page.$("#cart-count");
    let inner_text5 = await cart_count5.getProperty('innerText');
    let cart_count6 = await inner_text5.jsonValue();
    expect(cart_count6).toBe("0");
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    await page.goto('http://127.0.0.1:5500/index.html');
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    let product_item_elements5 = await page.$$('product-item');
    let list_size4 = product_item_elements5.length;
    for(let i = 0; i < list_size4; ++i){
      let shadow_root5 = await product_item_elements5[i].getProperty('shadowRoot');
      let a_button5 = await shadow_root5.$('button');
      let inner_text6 = await a_button5.getProperty('innerText');
      let text3 = await inner_text6.jsonValue();
      expect(text3).toBe("Add to Cart");
    }
    // Also check to make sure that #cart-count is still 0
    let cart_count7 = await page.$("#cart-count");
    let inner_text6 = await cart_count7.getProperty('innerText');
    let cart_count8 = await inner_text6.jsonValue();
    expect(cart_count8).toBe("0");
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    let the_cart2 = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    expect(the_cart2).toBe('[]');
  });
});
