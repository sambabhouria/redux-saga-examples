/* eslint-disable require-yield */
import { call, put, fork, take, takeEvery } from 'redux-saga/effects';
import firebase from "../../firebase"
import {
  SET_USERNAME, SYNC_ADDED_POST,
  REQUEST_UPSERT_USER, requestUpsertUser, successUpsertUser, failureUpsertUser,
  REQUEST_GET_USER, requestGetUser, successGetUser, failureGetUser
} from '../actions';

const db = firebase.ref("/users");

function* runUpsert({ payload: { id, username } }) {
  console.log('db app', db);

  /*
    In this chapter, we will show you how to save your data to Firebase.
      ***** Set ******
      The set method will write or replace data on a specified path. Let us create a reference to the users’s collection and set two users.
      const db = firebase.ref("/users");
        db.set ({
        John: {
          number: 1,
          age: 30
        },
        Amanda: {
          number: 2,
          age: 20
        }
      });
     ***** Update ******
     We can update the Firebase data in a similar fashion. Notice how we are using the user/john path.
      var johnRef = firebase.ref("users/John");
      johnRef.update ({
          "number": 10
      });
    ***** Sometimes you need to have a unique identifier for your data ******
    ***** When you want to create unique identifiers for your data, you need to use the push method instead of the set method. ******
    ****The Push Method ******
    The push() method will create a unique id when the data is pushed. If we want to create our players from the previous chapters with a unique id, we could use the code snippet given below.
    var usersRef = firebase.ref("/users");
    usersRef.push ({
          name: "Dupond",
          number: 1,
          age: 30
      });

      usersRef.push ({
          name: "Charles",
          number: 2,
          age: 20
     });

     ********Firebase - Write Transactional Data***
     Transactional data is used when you need to return some data from the database then make some calculation with it and store it back.
     We want to retrieve property, add one year of age and return it back to Firebase.
     The charlesAgeRef is retrieving the age from the collection and then we can use the transaction method. We will get the current age, add one year and update the collection.
      var charlesAgeRef = firebase.ref("/users").child("-MTpToCaSkjfEDei3bny").child('age');

        charlesAgeRef.transaction(function(currentAge) {
        return currentAge + 1;
        });

      ****The key Method ******
      We can get any key from Firebase by using the key() method. For example, if we want to get our collection name, we could use the following snippet.
        var usersRef = firebase.ref("/users");
        var usersKey = usersRef.key;
        console.log("colleciton of the data base" , usersKey);
        *******$Firebase - Read Data************
        We can use the on() method to retrieve data. This method is taking the event type as "value" and then retrieves the snapshot of the data.
        When we add val() method to the snapshot, we will get the JavaScript representation of the data.

         var ref = firebase.ref();
        ref.on("value", function(snapshot) {
            console.log(snapshot.val());
        }, function (error) {
            console.log("Error: " + error.code);
        });
     ****Firebase - Event Types ******
     Firebase offers several different event types for reading data.
     **** value ****
     The first event type is value
     This event type will be triggered every time the data changes and it will retrieve all the data including children.
       **** child_added ****
       This event type will be triggered once for every user and every time a new user is added to our data.
       It is useful for reading list data because we get access of the added user and previous user from the list.
       Let us consider the following example.
       ********child_added**********

       var usersRef = firebase.ref("/users");
      usersRef.on("child_added", function(data, prevChildKey) {
        var newUser = data.val();
        console.log("name: " + newUser.name);
        console.log("age: " + newUser.age);
        console.log("number: " + newUser.number);
        console.log("Previous Player: " + prevChildKey);
      });
      ****************child_changed*************
      This event type is triggered when the data has changed.

      var usersRef = firebase.ref("/users");

      usersRef.on("child_changed", function(data) {
      var user = data.val();
        console.log("The updated player name is " + user.name);
      });

    ****************child_removed*************
    If we want to get access of deleted data, we can use child_removed event type.

    var usersRef = firebase.ref("/users");

    usersRef.on("child_removed", function(data) {
      var deletedUser = data.val();
      console.log(deletedUser.name + " has been deleted");
    });

    ==========Detach Callback for Event Type=============
    Let us say we want to detach a callback for a function with value event type.

    var usersRef = firebase.ref("/users");
    usersRef.on("value", function(data) {
      console.log(data.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });
    ==========Firebase - Queries=============
    Firebase offers various ways of ordering data.
     ==========Order by Child============
     To order data by name, we can use the following code.
     Example
     Let us consider the following example.

      var usersRef = firebase.ref("/users");
      usersRef.orderByChild("name").on("child_added", function(data) {
        console.log(data.val().name);
      });

    =========Order by Key============
    We can order data by key in a similar fashion.
    Example
    Let us consider the following example.

    var usersRef = firebase.ref("/users");
    usersRef.orderByKey().on("child_added", function(data) {
    console.log(data.key);
    });
    =========Order by Value============
    We can also order data by value. Let us add the ratings collection in Firebase.
    Now we can order data by value for each player.
    Example
    Let us consider the following example.

    var usersRef = firebase.ref("/users");
    usersRef.orderByValue().on("value", function(data) {
      data.forEach(function(data) {
          console.log("The " + data.key + " rating is " + data.val().age);
      });
    });
    ==========Firebase - Filtering Data=============
    Firebase offers several ways to filter data.
    Limit to First and Last
    Let us understand what limit to first and last is.
      limitToFirst method returns the specified number of items beginning from the first one.
      limitToLast method returns a specified number of items beginning from the last one.
    Our example is showing how this works.

      var firstUsersRef = firebase.ref("/users").limitToFirst(1);
      var lastUsersRef = firebase.ref("/users").limitToLast(1);

      firstUsersRef.on("value", function(data) {
        console.log(data.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });

      lastUsersRef.on("value", function(data) {
        console.log(data.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });

      // LIMIT ON LAST OR ON FIRST
      var firstUsersRef = firebase.ref("/users").limitToFirst(1);

      var lastUsersRef = firebase.ref("/users").limitToLast(1);

      firstUsersRef.on("value", function(data) {
        console.log(data.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });

      lastUsersRef.on("value", function(data) {
        console.log(data.val());
      }, function (error) {
        console.log("Error: " + error.code);
      });

    **** AUTHER FILTER
      We can also use other Firebase filtering methods. The startAt(), endAt() and the equalTo() can be combined with ordering methods.
      In our example, we will combine it with the orderByChild() method.

    Example
    Let us consider the following example.

  */
  // const error = yield call(db.update, 'users', id, { username });


  var usersRef = firebase.ref("/users");

  // The first query will order elements by name and filter from the player with the name Amanda.
  // he console will log both users
  usersRef.orderByChild("name").startAt("Amanda").on("child_added", function(data) {
    console.log("Start at filter: " + data.val().name);
  });

  // The second query will log "Amanda" since we are ending query with this name.
  usersRef.orderByChild("name").endAt("Amanda").on("child_added", function(data) {
    console.log("End at filter: " + data.val().name);
  });

  // The third one will log "John" since we are searching for a user with that name.
  usersRef.orderByChild("name").equalTo("John").on("child_added", function(data) {
    console.log("Equal to filter: " + data.val().name);
  });

  // The fourth example is showing how we can combine filters with "age" value.
  // Instead of string, we are passing the number inside the startAt() method since age is represented by a number value.
  usersRef.orderByChild("age").startAt(20).on("child_added", function(data) {
    console.log("Age filter: " + data.val().name);
  });


  const error = yield call(db.update, 'users', id, { username });
  if (!error) {
    yield put(successUpsertUser());
  } else {
    yield put(failureUpsertUser());
  }
}

function* upsert() {
  // yield* takeEvery(REQUEST_UPSERT_USER, runUpsert);
  yield takeEvery(REQUEST_UPSERT_USER, runUpsert);
}

function* runGet({ payload: { id } }) {
  const user = yield call(db.get, 'users', id);
  if (user) {
    yield put(successGetUser({ id, data: user }));
  } else {
    yield put(failureGetUser());
  }
}

function* get() {
  // yield* takeEvery(REQUEST_GET_USER, runGet);
  yield takeEvery(REQUEST_GET_USER, runGet);
}

function* triggerUpsertUser() {
  while (true) {
    let { payload: { id, username } } = yield take(SET_USERNAME);
    if (!username || username.length === 0) {
      id = '@@anonymous';
      username = 'Anonymous';
    }
    yield put(requestUpsertUser({ id, username }));
  }
}

function* triggerGetUser() {
  while (true) {
    const { payload: { data } } = yield take(SYNC_ADDED_POST);
    const post = data.val();
    yield put(requestGetUser({ id: post.userId }));
  }
}

export default function* rootSaga() {
  yield fork(upsert);
  yield fork(get);

  yield fork(triggerUpsertUser);
  yield fork(triggerGetUser);
}
