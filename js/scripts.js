function Contact(first, last, phone, address) {
  this.firstName = first;
  this.lastName = last;
  this.phoneNumber = phone;
  this.homeAddress = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName ;
}

// user interface logic
$(document).ready(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber =
    $("input#new-phone-number").val();
    var inputtedHomeAddress =
    $("input#new-home-address").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedHomeAddress);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() +  "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $(".phone-number").text(newContact.phoneNumber);
      $(".home-address").text(newContact.homeAddress);
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-home-address").val("");

  });
});
