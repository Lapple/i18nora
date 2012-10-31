(function() {

  var view = {
    key       : ko.observable( '' ),
    category  : ko.observable( '' ),
    migration : ko.observable( '' ),
    value     : ko.observable( '' ),
    table     : ko.observable( 'i18n' ),
    translate : ko.observable( 'i18n_translate' ),
    language  : ko.observable( 'ru' )
  };

  $(function() {

    ko.applyBindings( view );

  });

}());
