/***********************************************************************************
** jQuery Message Popper
** 		Version: 		1.0.0
** 		License: 		GPL v3. See LICENSE file.
**		Author: 		Choko <choko@chaksoft.fr>
***********************************************************************************/

String.prototype.startswith = function(needle) {
	return this.substring(0, needle.length) === needle;
};

(function($) {
	$.fn.classes = function() {
		var $self = $(this);
		if($self.length > 1) {
			throw 'Classes cannot be run on more than 1 element.';
		}
		return $self.attr("class").split(/\s+/);
	};
})(jQuery);

(function($) {
	$.fn.pop = function(action, params) {
		if(!$(this).hasClass("pop")) {
			throw "Pop plugin can only be set on 'pop' elements !";
		}
		var options = {
			fadeIn: 500,
			delay: 4000,
			fadeOut: 500,
			closable: true,
			container: undefined
		};
		if(params !== undefined) {
			options = $.extend(options, params);
		}
		return this.each(function() {
			var $self = $(this);
			var popClass = "";
			// If a side is specified, must override.
			if(options.side) {
				$self.removeClass("pop-top-left").removeClass("pop-top-right")
					.removeClass("pop-bottom-left").removeClass("pop-bottom-right");
				$self.addClass("pop-" + options.side);
			}
			if(options.css) {
				$self.css(options.css);
			}
			
			var classes = $self.classes();
			var i = 0;
			while(popClass == "" && i < classes.length) {
				if(classes[i].substring(0, 7) === 'pop-top' || classes[i].substring(0, 10) === 'pop-bottom') {
					popClass = classes[i];
				}
				i++;
			}
			
			console.log('Pop class: ' + popClass);
			
			if(options.container) {
				$self.css({ 'position': 'relative' });
				if($self.parents("#" + options.container).length == 0) {
					$self.prependTo($("#" + options.container));
				}
			}
			if(options.closable && $self.find('div.pop-close-button').length == 0) {
				var $closeButton = $('<div class="pop-close-button"><a href="#">&times;</a></div>');
				$closeButton.off('click').on('click', function(ev) {
					ev.preventDefault();
					$self.trigger('pop.hide');
					$self.clearQueue().fadeOut(options.fadeOut, function() {
						$self.trigger('pop.hidden');
					});
				});
				$self.prepend($closeButton);
			}
			
			switch(action) {
				case 'show':
					$self.trigger('pop.show');
					$self.fadeIn(options.fadeIn, function() {
						$self.trigger('pop.shown');
					});
					// If delay is zero, don't automatically hide the pop message and let the user do it manually
					if(options.delay > 0) {
						$self.delay(options.delay).trigger('pop.hide');
						$self.fadeOut(options.fadeOut, function() {
							$self.trigger('pop.hidden');
						});
					}
					break;
				case 'hide':
					$self.trigger('pop.hide');
					$self.fadeOut(options.fadeOut, function() {
						$self.trigger('pop.hidden');
					});
					break;
				default:
					break;
			}
		});
	};
})(jQuery);

$(function() {
	$("*[data-trigger=pop]").on('click', function() {
		var popOptions = {};
		if($(this).attr("data-pop-fade-in")) {
			popOptions.fadeIn = parseInt($(this).attr("data-pop-fade-in"));
		}
		if($(this).attr("data-pop-fade-out")) {
			popOptions.fadeOut = parseInt($(this).attr("data-pop-fade-out"));
		}
		if($(this).attr("data-pop-delay")) {
			popOptions.delay = parseInt($(this).attr("data-pop-delay"));
		}
		if($(this).attr("data-pop-container")) {
			popOptions.container = $(this).attr("data-pop-container");
		}
		var dclass = $(this).attr("data-pop-class");
		var did = $(this).attr("data-pop-id");
		var $pop = undefined;
		if(dclass !== undefined && did !== undefined) {
			throw "Data-Class and Data-Id are exclusive parameters !";
		}
		if(dclass) {
			$pop = $("div.pop." + dclass);
		} else if(did) {
			$pop = $("#" + did);
		}
		if($pop !== undefined && $pop.length > 0) {
			// Trigger options have highest priority
			if($pop.attr("data-pop-fade-in") && !popOptions.fadeIn) {
				popOptions.fadeIn = parseInt($pop.attr("data-pop-fade-in"));
			}
			if($pop.attr("data-pop-fade-out") && !popOptions.fadeOut) {
				popOptions.fadeOut = parseInt($pop.attr("data-pop-fade-out"));
			}
			if($pop.attr("data-pop-delay") && !popOptions.delay) {
				popOptions.delay = parseInt($pop.attr("data-pop-delay"));
			}
			$pop.pop('show', popOptions);
		}
	});
});
