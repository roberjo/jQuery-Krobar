/*!
 * @name Krobar
 * @author John B. Roberts
 * @version 0.1
 *
 *  $('#frm_id').krobar({
 *      resourceURI: '/path/to/action',
 *      callback: function(){}
 *  });
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'krobar',
        defaults = {
            resourceURI: "/path/to/action"
        };

    // The actual plugin constructor
    function Krobar( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Krobar.prototype = {
        
        init: function() {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and 
            // call them like so: this.yourOtherFunction(this.element, this.options).

            // TODO: Get all elements, add .on() change function to fire ajax post using options passed in
            $(this.element).find('input').change(
                $.proxy(function (dat) {
                 //use original 'this'
                 this.saveData(dat.currentTarget, this.options);
             },this));

        }, 
        
        saveData: function(el, options) {
            // Fire Ajax POST
            var xname = el.name;
            var elem = el.value;

            var loading;

            var jqxhr = ($.ajax({
                type: 'POST',
                url: options.resourceURI,
                data: {
                    id: xname, 
                    myvalue: elem
                },
                beforeSend: function ( xhr ) {
                    // this is where we append a loading image
                    var command = "$('#"+xname+"').after('<img src=\"images/ajax-loader.gif\" alt=\"Loading...\" class=\"loading\" />');";
                    loading = setTimeout(command, 300);
                }
            })).done(function ( data ) {
                clearTimeout(loading);
                $('.loading').remove();
                var n = data.indexOf("SQL/DB Error");
                if(n >= 0){
                    $(data).find('font').each(function(index){
                        if($(this).attr('color') == 'ff0000'){
                            alert('SYSTEM ERROR: PLEASE ALERT TECH SUPPORT: '+$(this).text());
                            $('#'+xname).after('<img src="images/icon_alert.gif" alt="Loading..." class="loading"/>');
                        }
                    });
                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                clearTimeout(loading);
                $('.loading').remove();
                $('#'+xname).after('<img src="images/icon_alert.gif" alt="Loading..." class="loading"/>');
            });
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Krobar( this, options ));
            }
        });
    }

})( jQuery, window, document );
