(function(factory) {

	'use strict';

	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery'], factory);

	} else {

		// Browser globals
		factory(jQuery);

	}

}(function($) {

	'use strict';

	var processRequest = function(request, dfd) {

		request().done(function() {

			// Resolve the deferred for this request so any requests
			// waiting on this to complete will initiate.

			dfd.resolve();

		});

	};

	var ajaxQueue = function() {

		var q = Object.create({

			add: function(request) {

				this.queue.push($.Deferred(function(dfd) {

					var queuedDfd;
					var qLen = this.queue.length;

					if (qLen) {

						// Get the previous queued request.
						queuedDfd = this.queue[qLen - 1];

						// When the previous queued request is done, fire this one off.
						$.when(queuedDfd).done(function() {

							processRequest(request, dfd);

						});

					} else {

						// This is the first request for this session.

						processRequest(request, dfd);

					}

				}.bind(this)));

				return this;

			}

		});

		q.queue = [];

		return q;

	};

	// Add this utility to the jQuery namespace.
	$.extend({
		ajaxQueue: ajaxQueue
	});

}));