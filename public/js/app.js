//DEPENDENCIES
const app = angular.module('BestivalsApp', []);

//SERVER CONNECTIVITY
app.controller('MainController',['$http', function($http) {

//VARIABLES
this.createFestForm = {};
this.oneFest={};
this.oneFest=[];
this.festival = '';
this.comments = '';

//GET ROUTES------------------------------------------
//GET FESTIVALS
this.getFestivals = () => {
  $http({method : 'GET', url : '/festivals'
  }).then (response => {
    this.festivals = response.data;
    console.table(this.festivals);
      }, error => {
      console.log(error.message);
  }).catch (err => console.log('Catch:', err))
}
this.getFestivals();

//GET COMMENTS
this.getComments = () => {
  $http({method : 'GET', url : '/comments'
  }).then (response => {
    this.comments = response.data;
    console.table(this.comments);
    }, error => {
      console.log(error.message);
  }).catch (err => console.log('Catch:', err))
}

//CREATE ROUTES------------------------------------------
//ADD NEW FESTIVAL
this.createFestival = () => {
  $http({method: 'POST', url: '/festivals', data: this.createFestForm
  }).then (response => {
    this.festivals.push(response.data);
    this.createFestForm = {};
    }, error => {
      console.log(error.message);
  }).catch (err => console.log('Catch: ', err));
}

//SHOW ROUTE------------------------------------------
this.oneFest = ( festival ) => {
  this.festival = festival;
  console.log( this.festival);
  // $http({method: 'GET', url:'/festivals/' + this.festival._id
  // }).then (response => {
  //   console.log("Response made!");
  //   this.festival = response.data;
  //   console.table(this.festival);
  // }, error => {
  //   console.log(error.message);
  // }).catch (err => console.log('Catch:', err))
};

//UPDATE ROUTES-----------------------------------------
//UPDATE FESTIVAL
this.formUpdate = {};
this.updateFestival = () => {
  console.log("++++++++++++++++");
  console.log(this.formUpdate);
  $http({method: 'PUT', url: '/festivals/' + this.festival._id, data: this.formUpdate
  }).then (response => {
    console.table(this.formUpdate);
    }, error => {
      console.log(error.message);
    }).catch (err => console.log('Catch:', err))
}

// //UPDATE COMMENTS
// this.updateComms = (comments) => {
//   $http({method: 'PUT', url: '/comments', data: this.comments
//   }).then (response => {
//     this.updateComms = response.data;
//     console.table(this.updateComms);
//     }, error => {
//       console.log(error.message);
//     }).catch (err => console.log('Catch:', err))
// }

//DELETE ROUTES-----------------------------------------
//DELETE FESTIVAL
this.deleteFestival = (id) => {
  $http({method: 'DELETE', url: '/festivals/' + id
  }).then (response => {
    const removeByIndex = this.festivals.findIndex(festival => festival._id ===id);
    this.festivals.splice(removeByIndex, 1);
    console.log('this is the array index number of the festival i want to delete', removeByIndex);
    }, error =>{
      console.error (error.message)
  }).catch(err => console.error ('Catch: ', err));
}

// //DELETE COMMENT
// this.deleteComment = (id) => {
//   $http({method: 'DELETE', url: '/comments/' + id
//   }).then (response => {
//     const removeByIndex = this.comments.findById(comments => comment._id ===id);
//     this.comments.splice(removeByIndex, 1);
//     console.log('this is the array index number of the festival i want to delete', removeByIndex);
//     }, error =>{
//       console.error (error.message)
//   }).catch(err => console.error ('Catch: ', err));
// }

//LOGIN AND REGISTRATION-----------------------------------------
//REGISTRATION
this.registerUser = () => {
  $http({
    url: '/users', method: 'POST', data: this.registerForm })
   .then(response => {
     console.log('Registered!');
     this.user = response.data;
   }, ex => {
     console.log(ex.data.err);
     this.error = ex.statusText;
   })
   .catch(err => this.error = "Something's wrong" );
};

//LOGIN
this.loginUser = () => {
  $http({
  url: '/sessions/login',
  method: 'POST',
  data: this.loginForm })
      .then(response =>  {
        console.log('Logged in!');
        this.user = response.data;
        console.log(this.user);
      }, ex => {
        console.log(ex.data.err);
        this.error = ex.statusText;
      })
      .catch(err => this.error = "Something's wrong" );
};

//LOGOUT
this.logout = () => {
  $http({
    url: '/sessions/logout',
    method: "delete"
  }).then(response => {
    console.log("Logout successful");
    this.user = {};
  }, ex => {
    console.error(ex.data.err);
    this.error = ex.statusText;
  }).catch(err => this.error = "Something's wrong");
};

//----------------------------------------------------------
}]);
