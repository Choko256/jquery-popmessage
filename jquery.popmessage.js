/***********************************************************************************
** jQuery Message Popper
** 		Version: 		1.0.0
** 		License: 		GPL v3. See LICENSE file.
**		Author: 		Choko <choko@chaksoft.fr>
***********************************************************************************/

(function($) {
	$.fn.pop = function(action, params) {
		if(!$(this).hasClass("pop")) {
			throw "Pop plugin can only be set on 'pop' elements !";
		}
		var options = {
			fadeIn: 500,
			delay: 10000,
			fadeOut: 500,
			closable: true
		};
		if(params !== undefined) {
			options = $.extend(options, params);
		}
		return this.each(function() {
			var $self = $(this);
			// If a side is specified, must override.
			if(options.side) {
				$self.removeClass("pop-top-left").removeClass("pop-top-right")
					.removeClass("pop-bottom-left").removeClass("pop-bottom-right");
				$self.addClass("pop-" + options.side);
			}
			if(options.css) {
				$self.css(options.css);
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
						if(options.delay == 0) {
							$self.trigger('pop.shown');
						}
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
					var $self = $("div.pop.pop-" + options.side);
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
		var dclass = $(this).attr("data-class");
		var did = $(this).attr("data-id");
		var $pop = undefined;
		if(dclass !== undefined && did !== undefined) {
			throw "Data-Class and Data-Id are exclusive parameters !";
		}
		if(dclass) {
			$pop = $("div.pop." + dclass);
		} else if(did) {
			$pop = $("#" + did);
		}
		if($pop !== undefined) {
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
