//business logic
function Contact(first, last, phone) {
  this.firstName = first;
  this.lastName = last;
  this.phoneNumber = phone;
  this.addresses = [];
}

function Address(street, city, state, addressType) {
  this.addressType = addressType;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName ;
}

Address.prototype.fullAddress = function() {
  return this.addressType + ", " + this.street + ", " + this.city + ", " + this.state;
}
// user interface logic

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("select.address-select-box").val("Work")
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
};

function appendNewAddressFields() {
  $("#new-addresses").append('<div class="new-address">' +
                               '<div class="form-group">' +
                                '<label for=".address-select-box">Address Type</label>' +
                                 '<select class="form-control address-select-box">' +
                                  '<option>Home</option>' +
                                  '<option>Work</option>' +                                  '<option>Other</option>' +
                                 '</select>' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-street">Street Address</label>' +
                                 '<input type="text" class="form-control new-street">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-city">City</label>' +
                                 '<input type="text" class="form-control new-city">' +
                               '</div>' +
                               '<div class="form-group">' +
                                 '<label for="new-state">State</label>' +
                                 '<input type="text" class="form-control new-state">' +
                               '</div>' +
                             '</div>');

};

$(document).ready(function() {
// Append new address fields
  $("#add-address").click(function() {
    appendNewAddressFields();
  });

  //Submit listener
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);

    $(".new-address, .old-address").each(function(){
      var addressType = $(this).find("select.address-select-box").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, addressType);
      newContact.addresses.push(newAddress);
    });

    //Append contact name (which will become clickable)
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    //Show Contact Info for whichever listed contact you click
    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone-number").text(newContact.phoneNumber);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    //Remove new address fields
    $(".new-address").remove();

    //Clears input fields//
    resetFields();
  });
});
