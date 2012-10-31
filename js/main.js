(function() {

  var Translation = function() {
    this.key       = ko.observable( '' );
    this.category  = ko.observable( '' );
    this.value     = ko.observable( '' );

    this.keyInvalid = ko.computed(function() {
      return this.key() === '';
    }, this);

    this.categoryInvalid = ko.computed(function() {
      return this.category() === '';
    }, this);

    this.valueInvalid = ko.computed(function() {
      return this.value() === '';
    }, this);
  };

  var View = function( categoriesSource ) {
    this.translations = ko.observableArray([ new Translation() ]);

    this.table     = ko.observable( 'i18n' );
    this.translate = ko.observable( 'i18n_translate' );
    this.language  = ko.observable( 'ru' );
    this.source    = '["' + categoriesSource.join( '","' ) + '"]';

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

  View.prototype.add = function() {
    this.translations.push( new Translation() );
  };

  View.prototype.removeLast = function() {
    this.translations.pop();
  };

  View.prototype.select = function() {
    $( '#i18n-code' ).select();
  };

  var typeaheadUpdaterFactory = function( translation ) {
    return function( item ) {
      translation.category( item );
      return item;
    };
  };

  $(function() {

    var view  = new View( categories ),
        $code = $( '#i18n-code' );

    ko.applyBindings( view );

    $( '#copy-to-clipboard' ).zclip({
      path : 'js/ZeroClipboard.swf',
      copy : $code.text()
    });

  });

}());
