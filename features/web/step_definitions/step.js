const { Given, When, Then } = require('@cucumber/cucumber');
const {faker} = require('@faker-js/faker');

var current_tag_slug="";
var existing_tag_name="";
var existing_email_staff="";
When('I enter login email {kraken-string}', async function (email) {
    let element = await this.driver.$('#ember8');
    return await element.setValue(email);
});

When('I enter login password {kraken-string}', async function (password) {
    let element = await this.driver.$('#ember10');
    return await element.setValue(password);
});

When('I enter login incorrect password {string}', async function (password) {
    let element = await this.driver.$('#ember10');
    return await element.setValue(password);
});

When('I submit login', async function() {
    let element = await this.driver.$('#ember12');
    return await element.click();
});

Then('I should have a nav-bar with functions',async function(){
    let element=await this.driver.$("section .gh-nav-top");
    return await element;
});

When('I click on the tag function',async function(){
    let element=await this.driver.$('a[href="#/tags/"]');
    return await element.click();
});
Then('I should have a new tag button',async function(){
    let element=await this.driver.$("a[href='#/tags/new/']");
    return await element;
});
When('I click on the tag button',async function(){
    let element=await this.driver.$("a[href='#/tags/new/");
    return await element.click();
});

Then('I should have a form to enter tag information and save button',async function(){
    let element=await this.driver.$("#tag-name,#tag-slug,#tag-description,section .view-actions > button");
    return await element;
})

When('I enter tag name',async function(){
    let randomName = faker.name.fullName();    
    let element=await this.driver.$("#tag-name");
    return await element.setValue(randomName);
})
When('I enter tag-slug',async function(){
    let randomSlug = faker.random.alphaNumeric(10);    
    current_tag_slug=randomSlug;
    let element=await this.driver.$("#tag-slug");
    await element.setValue("");
    return await element.setValue(randomSlug);
})
When('I enter tag-descripton',async function(){
    const randomDesc = faker.lorem.lines(1);
    let element=await this.driver.$("#tag-description");    
    return await element.setValue(randomDesc);
})
When('I click Save',async function(){    
    let element=await this.driver.$("section .view-actions button");
    return await element.click();
})
Then('I should have a new tag with corrent slug link',async function(){
    let element=await this.driver.$(`a[href='#/tags/${current_tag_slug}/']`);
    return await element;
})
When('I enter tag without name',async function(){
    let element=await this.driver.$("#tag-name");
    return await element.setValue("");
})
Then('I should have Error specify Tag Name',async function(){    
    let element=await this.driver.$('span .error,span .retry_svg__retry-animated');
    return await element;
})
Then('I save and existing tag name',async function(){
    let element=await this.driver.$('.gh-tag-list-name').getText();   
    existing_tag_name=await  element;
    return await element;
})
When('I enter existing tag name',async function(){    
    let element=await this.driver.$("#tag-name");
    return await element.setValue(existing_tag_name);
})

When('I click on the {string} function',async function(function_val){
    let element=await this.driver.$(`a[href="#/${function_val}/"]`);
    return await element.click();
});
When('I should have this {string} button',async function(button_val){
    let element=await this.driver.$(`.${button_val}`);
    return await element;
})
When('I click invite people',async function(){
    let element=await this.driver.$(`.gh-btn.gh-btn-green`);
    return await element.click();
})
When('I enter email Adress',async function(){
    let randomEmail = faker.internet.email();
    let element=await this.driver.$(`input[name="email"]`);
    return await element.setValue(randomEmail);
})
When('I send invitation',async function(){    
    let element=await this.driver.$(`.gh-btn.gh-btn-green.gh-btn-icon.ember-view`);
    return await element.click();
})
Then('I should not have email send error message',async function(){
    let element=await this.driver.$(`.gh-alert.gh-alert-red.ember-view .gh-alert-content`);
    return await element.getText();
})
When('I enter invalid email Adress',async function(){
    let randomEmail = faker.name.fullName();
    let element=await this.driver.$(`input[name="email"]`);
    return await element.setValue(randomEmail);
})
Then('I should have email send error message',async function(){
    let element=await this.driver.$(`.retry_svg__retry-animated`);
    return await element;
})
Then('I save existing email',async function(){
    let element=await this.driver.$(`h3.apps-card-app-title`).getText();
    existing_email_staff=await element;
    return element;
})
When('I enter existing email Adress',async function(){    
    let element=await this.driver.$(`input[name="email"]`);
    return await element.setValue(existing_email_staff);
})
Then('I should have email error message {string}',async function(error_message){
    let element=await this.driver.$(`p.response`).getText();
    let user_already_invited= (await element==error_message)
    return user_already_invited;
})
When('I change the role',async function(){
    const element=await this.driver.$(`option[value='6457302b5ab6ff0001fba499']`).setValue("No tiene sentido");    
    return element;
})