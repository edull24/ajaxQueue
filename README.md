ajaxQueue
=========

This jQuery plugin creates an easy way to queue ajax requests, enabling them to execute in order, yet still run asynchronously.

## Usage

Create and save a reference to a new queue:


    var myQueue = $.ajaxQueue();
    
Add an ajax request to the queue:

    myQueue.add(function() {
    
      return $.ajax({
        type: 'post',
        cache: false,
        url: '/user',
        data: {
          username: 'Roy',
          password: 'wonderbat'
        }
      });
      
    });
    
The `.add()` method accepts a single function parameter that must return the [jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR) object returned from the `$.ajax()` request (or an object that implements the Promise interface).

For simple use cases, you are probably better off just chaining some `.done()` callbacks together. However, more complex user interfaces may be firing off numerous ajax requests in event handlers that need to maintain some synchronous flow. This is where this plugin shines because it abstracts all of the logic to handle this and is < 1K!

## Support

* jQuery 1.5+
* Global Scope jQuery
* AMD
