var app = angular.module('ngResume', []);

/**************************************
*
**************************************/
app.factory('dataService', function($http){
  var service = {};

  service.getProjects  = function() {
    return $http({
      method : 'GET',
      url : 'data/projects.json',
    });
  };

  service.getResume  = function() {
    return $http({
      method : 'GET',
      url : 'data/resume.json',
    });
  };

  return service;
});

/**************************************
*
**************************************/
app.component('myResume', {
  template: `
    <h2 id="resume-name">{{resume.name}}</h2>
    <div id="resume-contact" class="">
      <resume-contact>contact...</resume-contact>
    </div>
    <div id="resume-skills" class="">
      <resume-skills>skills...</resume-skills>
    </div>
    <div id="resume-education" class="">
      <resume-education>education...</resume-education>
    </div>
    <div id="resume-experience" class="">
      <resume-experience>experience...<resume-experience>
    </div>
  `,

  controller: function(dataService) {
    var vm = this;
    vm.resume = {};

    vm.loadData = function() {
      dataService.getResume()
        .then(function(resp) {
          vm.resume = resp.data;
        })
        .catch(function(err){
          console.log(err);
        });
    };

    vm.loadData();
  }
});

/**************************************
*
**************************************/
app.component('myProjectTable', {
  template: `
    <div id="myProjectTable">
      <my-project-row ng-repeat="row in $ctrl.rows" cards="row">Loading...</my-project-row>
    </div>
  `,

  controller: function(dataService) {
    var vm = this;
    vm.rows = [[]];

    vm.loadData  = function() {
      dataService.getProjects()
        .then(function(resp) {
          vm.rows = vm.chunkify(resp.data.projects.reverse(), 3);
        })
        .catch(function(err){
          console.log(err);
        });
    };

    vm.chunkify = function(arr, n) {
      var r = [];
      for(var i = 0; i < arr.length; i += n) {
        r.push(arr.slice(i, i+n));
      }
      return r;
    };

    vm.loadData();
  }
});

app.component('myProjectRow', {
  template : `
    <div class="row"">
      <my-project-card ng-repeat="project in $ctrl.cards" project="project">Loading...</my-project-card>
    </div>
  `,

  controller : function() {
    var vm = this;
  },

  bindings : {
    cards : "="
  }

});

/**************************************
*
**************************************/
app.component('myProjectCard', {
  template : `
    <div class="col-sm-4 col-xs-12">
      <div id='$ctrl.project.name' class="panel panel-default">
        <div class="panel-heading">
          <h4>{{ $ctrl.project.name }}</h4>
        </div>
        <div class="panel-body">
          <img ng-attr-src={{$ctrl.project.imageURL}} class="img-rounded">
          <p>{{ $ctrl.project.description }}</p>
          <p>{{ $ctrl.project.lesson }}</p>
          <p>{{ $ctrl.techJoin($ctrl.project) }}</p>
        </div>
        <div class="panel-footer">
          <a ng-attr-href={{$ctrl.project.deployment}} onclick='javascript:event.target.port=8080'>try it</a>
          <a ng-attr-href={{$ctrl.project.github}}>github</a>
        </div>
      </div>
    </div>
  `,

  // template : ``,

  controller : function() {
    var vm = this;

    vm.techJoin = function(project) {
      return project.technologies.join(', ');
    };
  },

  bindings : {
    project : '<'
  }
});

/**************************************
*
**************************************/
app.component('someComponent', {
  template : ``,
  controller : function() { var vm = this; },
  bindings : {}
});
