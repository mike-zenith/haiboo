const { Given, When, Then } = require("cucumber");
const { expect } = require("chai");

Given("I want to memorize a production {string}", function (memorize, table) {
    this.memorize(memorize, this.getTransformedTable(table.rowsHash()));
});

Given("I create a production from memorized {string}", function (memorized) {
    const data = this.retrieve(memorized);
    return this.requestCreate(data);
});

Given("I delete production {string}", function (id) {
    return this.requestDeleteById(id);
});

Given("I partially update {string}", function (id, table) {
    return this.requestPartialUpdate(id, this.getTransformedTable(table.rowsHash()));
});

Given("I remove field {string} from {string}", function (field, memorized) {
    const { [field]: omit, ... data } = this.retrieve(memorized);
    this.memorize(memorized, data);
});

Given("I update field {string} to {string} in {string}", function(field, value, memorized) {
    const data = this.retrieve(memorized);
    const newData = { ... data, [field]: value };
    this.memorize(memorized, newData);
});

When("I list productions", function () {
    return this.requestGetAll();
});

When("I get production by id of {string}", function (id) {
    return this.requestOneById(id);
});

Then("I should see {string} in the response", function (memorized) {
    const data = this.retrieve(memorized);
    return this.res.then(response => {
        expect(response.body).to.have.property('Items').that.is.an('array');
        expect(response.body.Items).to.deep.include(data);
    });
});

Then("I should see {string} as the only item in the response", function (memorized) {
    const data = this.retrieve(memorized);
    return this.res.then(response => {
        expect(response.body).to.be.an('object').that.deep.include(data);
    });
});

Then("There should be only one production in the list, {string}", function (memorized) {
    const data = this.retrieve(memorized);
    return this.res.then(response => {
        expect(response.body).to.have.property('Items').that.is.an('array');
        expect(response.body.Items).to.have.lengthOf(1).and.to.deep.include(data);
    });
});

Then("I should see the following as the only item in the response", function (table) {
    const expectedData = this.getTransformedTable(table.rowsHash());
    return this.res.then(response => {
        expect(response.body).to.be.an('object').that.deep.include(expectedData);
    });
});

Then("I should see a bad request error with message {string}", function (message) {
    return this.res.then(response => {
        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.deep.nested.include({ 'errors[0].message': message });
    });
});

Then("The response status should be 404", function () {
    return this.res.then(response => {
        expect(response.status).to.be.equal(404);
    });
})
