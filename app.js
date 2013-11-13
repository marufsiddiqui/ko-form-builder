var FormField = function () {
  var self = this;
  self.label = ko.observable('Enter Title');
  self.type = ko.observable();
  self.isRequired = ko.observable(false);
  self.options = ko.observable();
};

FormField.prototype.toJSON = function () {
  var field = {
    type: ko.utils.unwrapObservable(this.type),
    label: ko.utils.unwrapObservable(this.label),
    isRequired: ko.utils.unwrapObservable(this.isRequired)
  };
  if (this.type == 'select') {
    field.options = ko.utils.unwrapObservable(this.options)
  }
  return field;
};

var Form = function () {
  var self = this;
  self.fields = ko.observableArray([]); // Put one line in by default

  // Operations
  self.addField = function () {
    self.fields.push(new FormField())
  };
  self.removeField = function (field) {
    self.fields.remove(field)
  };
  self.save = function () {
    var dataToSave = $.map(self.fields(), function (field) {
      return field.product() ? {
        productName: field.product().name,
        quantity: field.quantity()
      } : undefined
    });
    alert("Could now send this to server: " + JSON.stringify(dataToSave));
  };
};
var app = new Form();
ko.applyBindings(app);