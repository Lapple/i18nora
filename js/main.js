(function() {
  var checkerAction = 'http://dev.flatora.ru/site/index/i18n_check_value',
      dispatcher    = $( document );

  var Translation = function() {
    var self = this;

    this.key         = ko.observable( '' );
    this.category    = ko.observable( '' );
    this.value       = ko.observable( '' );
    this.isDuplicate = ko.observable( false );

    this.duplicateCategory = ko.observable( '' );
    this.duplicateKey      = ko.observable( '' );

    this.keyInvalid = ko.computed(function() {
      return this.key() === '';
    }, this);

    this.categoryInvalid = ko.computed(function() {
      return this.category() === '';
    }, this);

    this.valueInvalid = ko.computed(function() {
      return this.value() === '';
    }, this);

    this.yiiTemplate = ko.computed(function() {
      if ( this.keyInvalid() || this.categoryInvalid() ) {
        return '';
      } else {
        return '<?= Yii::t(\'' + this.category() + '\', \'' + this.key() + '\'); ?>';
      }
    }, this);

    // Checking for the existing translations
    this.value.subscribe(function( value ) {
      dispatcher.trigger( 'value:updated', [ value, self ] );
    });
  };

  var View = function() {
    var self = this;

    this.translations = ko.observableArray([ new Translation() ]);

    this.table     = ko.observable( 'i18n' );
    this.translate = ko.observable( 'i18n_translate' );
    this.language  = ko.observable( 'ru' );

    this.languageInvalid = ko.computed(function() {
      return this.language() === '';
    }, this);

    this.tableInvalid = ko.computed(function() {
      return this.table() === '';
    }, this);

    this.translateInvalid = ko.computed(function() {
      return this.translate() === '';
    }, this);

    dispatcher.on( 'value:updated', function( e, value, translation ) {
      translation.isDuplicate( false );

      if ( value.length === 0 ) {
        return;
      }

      if ( self.request ) {
        self.request.abort();
        delete self.request;
      }

      self.request = $.get( checkerAction, { value: value, language: self.language() }, function( reply ) {
        var parsedReply = $.parseJSON( reply );

        if ( parsedReply.category && parsedReply.key ) {
          translation.isDuplicate( true );
          translation.duplicateCategory( parsedReply.category );
          translation.duplicateKey( parsedReply.key );
        }
      });

    });
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

  View.prototype.addTypeahead = function( el, translation ) {
    $( el ).find( '.i18n-categories' ).typeahead({
      source  : categories,
      updater : typeaheadUpdaterFactory( translation )
    });
  };

  var typeaheadUpdaterFactory = function( translation ) {
    return function( item ) {
      translation.category( item );
      return item;
    };
  };

  $( document ).on( 'click', '.i18n-yii-template', function() {
    $( this ).select();
  });

  $(function() {

    var view   = new View(),
        $code  = $( '#i18n-code' ),
        $alert = $( '#i18n-copied' );

    ko.applyBindings( view );

    $( '#copy-to-clipboard' ).zclip({
      path      : 'js/ZeroClipboard.swf',
      copy      : function() {
        return $code.text();
      },
      afterCopy : function() {
        $alert.fadeIn( 200 ).delay( 1500 ).fadeOut( 600 );
      }
    });

  });

}());
