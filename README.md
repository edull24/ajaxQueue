[ ![Codeship Status for edull24/ajaxQueue](https://codeship.io/projects/8523c9d0-37dd-0132-1daa-26b918746a8c/status)](https://codeship.io/projects/41831)

ajaxQueue
=========

This jQuery plugin creates an easy way to queue ajax requests, enabling them to execute in sequential order, yet still run asynchronously.

This can be very useful when trying to deal with race conditions in your application due to unsafe/destructive POST/PUT/DELETE requests.

For example, take the following sequence of events:

    1. User updates data on a page
    2. Application submits a POST to save the new data to the database
    3. User updates the same data again
    4. Application submits a POST to save the new data to the database

If the POST in step 4 is processed on the server before the POST in step 2, the data will be incorrect.

Now, keep in mind this is a very simple and contrived example and you can/should take additional steps to mitigate situations such as these by rate limiting your requests via debounce or throttle techniques, depending on your specific use case. Nevertheless, having the capability to easily queue your ajax requests is a nice tool to have in the bag when the need arises.

## Usage

Create and save a reference to a new queue:

    var myQueue = $.ajaxQueue();
    
Add an ajax request to the queue:

    myQueue.add(function() {
    
      return $.ajax({
        type: 'post',
        cache: false,
        url: '/user/32',
        data: {
          status: 'awesome'
        }
      });
      
    });
    
Add another request:

    myQueue.add(function() {
    
      return $.ajax({
        type: 'post',
        cache: false,
        url: '/user/32',
        data: {
          status: 'amazeballs'
        }
      });
      
    });
    
The `$.ajaxQueue()` method accepts a single options object. The following options are supported:

    - clearOnFail: false; If true, clears queue when a request fails

The `.add()` method accepts a single function parameter that must return the [jqXHR](http://api.jquery.com/jQuery.ajax/#jqXHR) object returned from the `$.ajax()` request (or an object that implements the Promise interface).

For simple use cases, you are probably better off just chaining some `.done()` callbacks together. However, more complex user interfaces may be firing off numerous ajax requests in event handlers that need to maintain some synchronous flow. This is where the plugin shines because it abstracts all of the logic to handle this and has a tiny footprint.

## Support

* jQuery 1.5+
* Global Scope jQuery
* AMD
