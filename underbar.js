/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (isNaN(n)) {
    	return array[0];
    } else {
    	return array.slice(0, n);
    };
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var end = array.length;
    if (isNaN(n)) {
    	return array[end-1];
    } else if (n === 0) {
    	return [];
	} else {
    	return array.slice(-n);
    };
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
  	if (Object.prototype.toString.call(collection) === "[object Array]") {
  		for (var i = 0 ; i < collection.length ; i++) {
  			iterator(collection[i], i, collection)
  		};
  	} else {
  		for (var prop in collection) {
  			iterator(collection[prop], prop, collection)
  		};
  	};
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
  	var ind = -1;
  	_.each(array, function(value, index) {
  		if (value === target && ind === -1) {
  			ind = index;
  		}
  	});
  	return ind;
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
  	var arr = [];
  	_.each(collection, function(value) {
  		if (iterator(value)) {
  			arr.push(value);
  		};
  	});
  	return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
  	return _.filter(collection, function(value) {
  		return iterator(value) === false;
  	});
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var locations = {};
  	var arr = [];
  	for (var i = 0 ; i < array.length ; i++ ) {
  		locations[array[i]] = true;
  	}
  	for (var i in locations ) {
  		arr.push(i);
  	}
  	return arr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
  	var arr = [];
  	for (var i = 0 ; i < array.length ; i++) {
  		arr.push(iterator(array[i]));
  	}
  	return arr;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
  	var arr = [];
  	if (typeof methodName === "string") {
  	  	_.each(list, function(value) {
  	  		arr.push(value[methodName](args));
  	  	});
  	} else {
  	  	_.each(list, function(value) {
  	  		arr.push(methodName.call(value, args));
  	  	});
  	}
  	return arr;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to the first element in the input array.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
  	_.each(collection, function(value) {
  		if (initialValue === undefined) {
  			initialValue = value;
  		} else {
  			initialValue = iterator(initialValue, value);
  		}
  	});
  	return initialValue
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      return wasFound || item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (collection.length === 0 || iterator === undefined) {
    	return true
    };
    return _.reduce(collection, function(isTrue, item) {
    	return isTrue && !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
    	iterator = function(value) {
    		return !!value;
    	}
    }
    return _.contains(_.map(collection, function(value) {return !!iterator(value)}), true);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	var args = Array.prototype.slice.call(arguments);
  	_.each(args, function(arg) {
  		for (var prop in arg) {
  			obj[prop] = arg[prop];
  		}
  	});
  	return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  	var args = Array.prototype.slice.call(arguments);
  	_.each(args, function(arg) {
  		for (var prop in arg) {
  			if (obj[prop] === undefined) {
  				obj[prop] = arg[prop];
  			}
  		}
  	});
  	return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  	var knownargs = {};
  	return function(arg) {
  		if (_.contains(knownargs, arg)) {
  			return knownargs[arg];
  		} else {
  			return knownargs[arg] = func(arg);
  		}
  	}
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){func.apply(null, args)}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
  	var arr = [];
  	var recurse = function(count) {
  		var candidate = Math.floor(Math.random()*array.length);
  		if (_.contains(arr, candidate)) {
  			recurse()
  		} else if (count = array.length) {
  			return arr;
  		} else {
  			arr.push(candidate)
  			count += 1
  		}
  	}
  	return recurse(0);
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
