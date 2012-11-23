/*!
 * jQuery radioToggle - v1.0 - 2012/11/23
 * http://marc.codewisp.com/projects/jquery-radio-toggle/
 * 
 * Copyright (c) 2012 "codewisp" Marc Obaldo
 * You may use this project under the terms of the MIT license.
 * http://marc.codewisp.com/license/#MIT
 * 
 * I just had to pick a license because without one, no one can use this project.
 * Seriously, do whatever you want with it. Leaving credit is fine, but not required. :)
 * 
 */

// Script: jQuery radioToggle: Transform radio buttons to toggle buttons
//
// *Version: 1.0, Last updated: 2012/11/23*
// 
// Project Home - http://marc.codewisp.com/projects/jquery-radio-toggle/
// GitHub       - http://github.com/marcobaldo/jquery-radio-toggle/
// 
// About: License
// 
// Copyright (c) 2010 "codewisp" Marc Obaldo
// You may use this project under the terms of the MIT license.
// http://marc.codewisp.com/license/#MIT
// 
// I just had to pick a license because without one, no one can use this project.
// Seriously, do whatever you want with it. Leaving credit is fine, but not required. :)
// 
// About: Examples
// 
// To be added
// 
// About: Support and Testing
// 
// This project has only been tested on jQuery 1.8.2 and Chrome 23+. I have only open sourced this
// project because others might find it useful. I created this as part of a personal project and
// I may have already updated my version of it. However, I cannot guarantee that I can update this
// project to the latest version I have.
// 
// About: Release History
// 
// 1.0 - (2012/11/23) - Initial release
// 
(function($) {

	var radioToggle = {
		init : function( options ) {
			var settings = $.extend( {
				containerClass	 : 'radioToggle',
				activeClass      : 'active',
				inactiveClass    : 'inactive',
				disabledClass    : 'disabled',
				buttonClick      : '',
				theme            : ''
			}, options);

			return this.each(function(){
				var container = $(this);
				container.data('settings', settings);

				var radioButtons = container.find('input[type="radio"]').css('display', 'none').on('changed.radioToggle', radioToggle._radioChanged);

				radioButtons.each(function(index) {
					var radio = $(this);

					// Let's build the html for the button
					// This consists of:
					
					// Display and value
					var display = radio.attr('data-display');
					var value = radio.val();

					// Button's checked and disabled state
					var disabled = radio.prop('disabled') ? ' disabled="disabled"' : '';
					var checked = radio.prop('checked') ? ' checked="checked"' : '';

					// Button's classes based on the original radio button's state
					var isFirstClass = index == 0 ? ' first' : '';
					var isLastClass = index == radioButtons.length - 1 ? ' last' : '';
					var isDisabledClass = radio.prop('disabled') ? ' ' + settings.disabledClass : '';
					var isCheckedClass = radio.prop('checked') ? ' ' + settings.activeClass : ' ' + settings.inactiveClass;

					var oldClass = radio.attr('class') != null ? radio.attr('class') : '';
					var newClass = oldClass + isFirstClass + isLastClass + isDisabledClass + isCheckedClass;

					var newHtml = $('<button data-value=' + value + ' class="' + $.trim(newClass) + '"' + disabled + '>' + display + '</button>');
					newHtml.on('click.radioToggle', radioToggle._buttonClicked);

					container.append(newHtml);
				});

				container.addClass(settings.containerClass);
				container.addClass(settings.theme);

			});

		},

		destroy : function( ) {
			var container = this;
			var buttons = $(this).find('button');
			buttons.remove();

			var inputs = $(this).find('input');
			input.css('display', 'inline').removeClass(this.settings.inactiveClass).removeClass(this.settings.activeClass);
		},

		check : function ( value ) {
			var container = this;
			var button = container.find('button[data-value="' + value + '"]');
			var radio = container.find('input[value="' + button.attr('data-value') + '"]');
		},

		_buttonClicked : function ( event ) {
			var button = $(this);
			var container = button.parent();
			var radio = container.find('input[value="' + button.attr('data-value') + '"]');

			radioToggle._unselect(container.children());
			radioToggle._select(radio);
			radioToggle._select(button);

			var settings = container.data('settings');
			console.log(settings);

			if (typeof settings.buttonClick == 'function') {
				settings.buttonClick.call(container, button, radio);
			}
		},

		_radioChanged: function ( event ) {
			var radio = $(this);
			var container = radio.parent();
			var button = container.find('button[data-value="' + radio.val() + '"]');

			radioToggle._unselect(container.children());
			radioToggle._select(radio);
			radioToggle._select(button);
		},

		_unselect: function(el) {
			var settings = el.parent().data('settings');
			el.prop('checked', false).addClass(settings.inactiveClass).removeClass(settings.activeClass);
		},

		_select: function(el) {
			var settings = el.parent().data('settings');
			el.prop('checked', true).removeClass(settings.inactiveClass).addClass(settings.activeClass);
		}
	};

	$.fn.radioToggle = function( type ) {
		if ( radioToggle[type] ) {
			return radioToggle[type].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof type === 'object' || ! type ) {
			return radioToggle.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.radioToggle' );
		}    
	}

})(jQuery);