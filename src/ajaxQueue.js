(function(factory) {

	'use strict';

	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery'], factory);

	} else if (typeof exports === 'object') {

		// Node/CommonJS style for Browserify
		module.exports = factory(require('jquery'));

	} else {

		// Browser globals
		factory(jQuery);

	}

}(function($) {

	'use strict';

	var defaults = {
		clearOnFail: false
	};

	// The prototype for ajaxQueue instances.
	var qPrototype = {

		add: function(request) {

			// Create a new Deferred for this request and add it into the
			// queue.
			this.queue.push(getDfd.call(this, request));

			return this;

		}

	};

	// Create a Deferred object for this request. We need to store a
	// Deferred for this request in the queue so if additional requests
	// come in, they will not be run until the Deferred we are creating
	// right now is finished. This is what enables the requests to run
	// in order.
	var getDfd = function(request) {

		return $.Deferred(function(dfd) {

			var queuedDfd;
			var qLen = this.queue.length;

			if (qLen) {

				// Get the Deferred for the previous queued request.
				queuedDfd = this.queue[qLen - 1];

				// When the previous queued request is finished, run this one.
				$.when(queuedDfd).always(function() {

					// Remove the previous queued Deferred.
					this.queue.shift();

					processRequest.call(this, request, dfd);

				}.bind(this));

			} else {

				// This is the first request for this queue, so
				// immediately run the request.

				processRequest.call(this, request, dfd);

			}

		}.bind(this));

	};

	// Run the request and resolve/reject its queued Deferred when done.
	var processRequest = function(request, dfd) {

		request()
			// Resolve so the next request in line will run.
			.done(dfd.resolve)
			.fail(function() {

				if (this.options.clearOnFail) {

					// Clear out the queue.
					this.queue.length = 0;

				}

				// Reject the requests queued Deferred.
				dfd.reject();

			}.bind(this));

	};

	var ajaxQueue = function(options) {

		// Create a new ajaxQueue instance. The prototype of each instance
		// points to the same object (qPrototype).
		var q = Object.create(qPrototype);

		// Create an array that will store Deferreds representing the status
		// of each request that is added via the .add() method.
		q.queue = [];

		q.options = $.extend(true, {}, defaults, options);

		// Return the new instance.
		return q;

	};

	// Add this utility to the jQuery namespace.
	$.extend({
		ajaxQueue: ajaxQueue
	});

}));
