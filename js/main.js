(function() {

  var View = function() {
    this.key       = ko.observable( '' );
    this.category  = ko.observable( '' );
    this.value     = ko.observable( '' );
    this.table     = ko.observable( 'i18n' );
    this.translate = ko.observable( 'i18n_translate' );
    this.language  = ko.observable( 'ru' );

    this.keyInvalid = ko.computed(function() {
      return this.key() === '';
    }, this);

    this.categoryInvalid = ko.computed(function() {
      return this.category() === '';
    }, this);

    this.valueInvalid = ko.computed(function() {
      return this.value() === '';
    }, this);

    this.languageInvalid = ko.computed(function() {
      return this.language() === '';
    }, this);

    this.tableInvalid = ko.computed(function() {
      return this.table() === '';
    }, this);

    this.translateInvalid = ko.computed(function() {
      return this.translate() === '';
    }, this);
  };


  $(function() {

    var view = new View();

    ko.applyBindings( view );

    $( '#i18n-categories' ).typeahead({
      source  : categories,
      updater : function( item ) {
        view.category( item );
        return item;
      }
    });

  });

}());
