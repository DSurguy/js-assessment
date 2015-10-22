exports = (typeof window === 'undefined') ? global : window;

exports.arraysAnswers = {

  indexOf : function(arr, item) {
    /*
      We could make this faster with a binary search 
      or something if the test specified a sorted array, 
      but it doesn't, so we'll do the O(n) approach.
    */
    for( var i=0; i<arr.length; i++ ){
      if( arr[i] == item ){
        return i;
      }
    }
    return -1;
  },

  sum : function(arr) {
    /*
      Javascript is very lenient when it comes to int/float/string 
      substitution, so we should assume that the values in arr may 
      in fact be strings, so we'll parse them to make sure we get 
      the correct numbers.

      We handle NaN entries by using a logical OR to return 0 
      instead, because NaN is falsy. the || operator chain will 
      return the first value that is truthy OR the last item checked.
      In this case, that will be 0 if the value was NaN.
    */
    var total = 0;
    for( var i=0; i<arr.length; i++ ){
      total += parseInt(arr[i])||0;
    }
    return total;
    /*
      I'm a big fan of map and reduce, so the following would work 
      as well, but probably isn't the intended solution.

    return arr.reduce(function (total, item){
      return total + parseInt(arr[i])||0;
    },0);
    */
  },

  remove : function(arr, item) {
    /*
      The test for .removeWithoutCopy() specifies that it should modify 
      and return the original instance of the array, so we'll make the 
      assumption that .remove() should not alter the original array, 
      and should return a new instance.

      Unfortunately, the test doesn't clarify if we should be returning 
      values or references, so we'll make the assumption that we should 
      be returning new copies of everything, so we'll leverage JSON to 
      do the cloning.

      We'll also handle the screwy date logic that would return a string 
      instead of a date object.

      References:
      http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/5344074#5344074
      http://stackoverflow.com/questions/11491938/issues-with-date-when-using-json-stringify-and-json-parse/11491993#11491993
    */
    var newArray = [];
    for( var i=0; i<arr.length; i++ ){
      if( arr[i] !== item ){
        if( item.constructor.name == 'Date' ){
          newArray.push(new Date(JSON.parse(JSON.stringify(arr[i]))) );
        }
        else{
          newArray.push(JSON.parse(JSON.stringify(arr[i])) );
        }
      }
    }
    return newArray;
  },

  removeWithoutCopy : function(arr, item) {
    /*
      Nothing fancy, just splice out the matches and return the original array 
      by reference.
    */
    for( var i=0; i<arr.length; i++ ){
      if( arr[i] == item ){
        arr.splice(i,1);
        i--;
      }
    }
    return arr;
  },

  append : function(arr, item) {
    /*
      We'll use the assignment operation as the solution 
      to this test, but using array functions should be 
      perfectly acceptable.
      
      This doesn't actually introduce any overhead over 
      Array.push, because .length is a property on the 
      array, not something that is calculated every time 
      it is retrieved. Javascript introduces .length calc 
      overhead no matter what, so we might as well use it.

      We're also assuming that it doesn't want a clone of 
      the array and we'll return the original instance.
    */
    arr[arr.length] = item;
    return arr;
    /*
      The other acceptable solution:

    arr.push(item);
    return arr;
    */
  },

  truncate : function(arr) {
    /*
      Again, solving the test without using the built-in 
      array functions.

      Since we are not removing an item from the array by 
      deleting the reference, we need to update the .length 
      property as well. I feel like that's something that 
      the Array class/object should try to prevent, but 
      I'm not in charge here.
    */
    delete arr[arr.length-1];
    arr.length -= 1;
    return arr;
    /*
      Using array functions:

    arr.splice(-1,1);
    return arr;
    */
  },

  prepend : function(arr, item) {
    /*
      Yes, the array functions are definitely the correct 
      solution here (IMO), but we're practicing javascript, 
      not how many array functions we have memorized.
    */
    for( var i=arr.length; i > 0; i-- ){
      arr[i] = arr[i-1];
    }
    arr[0] = item;
    return arr;

    /*
      Array function solution

    arr.unshift(item);
    return arr;
    */
  },

  curtail : function(arr) {
    /*
      ditto

      Delete is safe to use here, because it doesn't delete 
      the object a reference points to, it will just remove 
      a refernce from the array. It will delete primitives, 
      but we're copying those down so it doesn't matter.

      We're also safe to reassign arr[0] without deleting the 
      reference first, because it doesn't actually set the object
      referred to in arr[0] to the value of the object referenced 
      in arr[1]. JAVASCRIPT
    */
    for( var i=0; i<arr.length-1; i++ ){
      arr[i] = arr[i+1];
    }
    delete arr[arr.length-1];
    arr.length -= 1;
    return arr;

    /*
      Array function solution
    
    arr.shift();
    return arr;
    */
  },

  concat : function(arr1, arr2) {
    /*
      The non-Array function solution here is 
      a little ugly, but it works just fine
    */
    var newArr = [];
    for( var i=0; i<arr1.length; i++ ){
      newArr[i] = arr1[i];
    }
    var arrIndex = arr1.length;
    for( var i=arrIndex, j=0; j<arr2.length; i++, j++ ){
      newArr[i] = arr2[j];
    }
    return newArr;

    /*
      Array function solution

    return arr1.concat(arr2);
    */
  },

  insert : function(arr, item, index) {
    /*
      This is almost exactly the same as the prepend 
      solution, it's just faster because we only have to 
      go back down the array to index instead of to zero
    */
    for( var i=arr.length; i>index; i-- ){
      arr[i] = arr[i-1];
    }
    arr[index] = item;
    return arr;

    /*
      Array function solutions
  
    return arr.slice(0,index).concat([item]).concat(arr.slice(index));
    */
  },

  count : function(arr, item) {
    var count = 0;
    for( var i=0; i<arr.length; i++ ){
      if( arr[i] == item ){
        count += 1;
      }
    }
    return count;

    /*
      Array function solution (Reduce all the things!)

    return arr.reduce(function (count, arrItem){
      return count + (arrItem==item?1:0);
    },0);
    */
  },

  duplicates : function(arr) {
    //naive solution
    /*var matches = [];
    for( var i=0; i<arr.length; i++ ){
      for( var j=i+1; j<arr.length; j++ ){
        if( arr[i] == arr[j] ){
          var alreadyFound = false;
          for( var k=0; k<matches.length; k++ ){
            if( matches[k] == arr[i] ){
              alreadyFound = true;
              break;
            }
          }
          if( !alreadyFound ){
            matches.push(arr[i]);
            break;
          }
        }
      }
    }
    return matches;*/

    //slightly less naive solution
    var matches = [],
      uniques = [];
    for( var i=0; i<arr.length; i++ ){
      var inUnique = false;
      //check to see if we've encountered a new unique item
      for( var j=0; j<uniques.length; j++ ){
        if( uniques[j] == arr[i] ){
          inUnique = true;
          break;
        }
      }
      if( !inUnique ){
        //we found a new item, store it
        uniques.push(arr[i]);
      }
      else{
        //duplicate, check if we can add to result
        var inMatches = false;
        for( var j=0; j<matches.length; j++ ){
          if( matches[j] == arr[i] ){
            inMatches = true;
            break;
          }
        }
        if( !inMatches ){
          //not already in results, so add it!
          matches.push(arr[i]);
        }
      }
      console.log(uniques);
    }
    return matches;

    /*
      This might be an acceptable solution if you know you have 
      simple objects or primitives, but isn't great for 
      large objects.

    var matches = {},
        matchArr = [];
    for( var i=0; i<arr.length; i++ ){
      if( matches[JSON.stringify(arr[i])] !== undefined ){
        matches[JSON.stringify(arr[i])] = true;
      }
      else {
        matches[JSON.stringify(arr[i])] = false;
      }
    }
    for( var match in matches ){
      if( matches[match] ){
        matchArr.push(JSON.parse(match));
      }
    }
    return matchArr;
    */
  },

  square : function(arr) {
    var newArr = [];
    for( var i=0; i<arr.length; i++ ){
      var itemVal = parseInt(arr[i])||0;
      newArr.push(itemVal*itemVal);
    }
    return newArr;

    /*
      MAP!
    
    return arr.map(function (item){
      var itemVal = parseInt(arr[i])||0;
      return itemVal*itemVal;
    });
    */
  },

  findAllOccurrences : function(arr, target) {
    var results = [];
    for( var i=0; i<arr.length; i++ ){
      if( arr[i] == target ){
        results.push(i);
      }
    }
    return results;

    /*
      REDUCE!

    return arr.reduce(function (results, item, index){
      if( item == target ){
        results.push(index);
      }
      return results;
    }, []);
    */
  }
};
