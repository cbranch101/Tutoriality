require(TEST_HELPER) // <--- This must be at the top of every test file.

var MyComponent = require(__client + '/components/MyComponent');
var mq = require('mithril-query');

describe("The MyComponent component", function() {
  it("does stuff'", function() {
  	var output = MyComponent.view(null, {title : "Test"});
    var $output = mq(output);
    $output.find('h2')[0].children[0].should.equal("Test");
    //yied Tutorial.insert() * 2

    // Notice how we're in a generator function (indicated by the the *)
    // See test/test-helper.js for details of why this works.
    //
  })
})
