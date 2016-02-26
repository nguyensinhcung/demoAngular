var app = angular.module("myApp", ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        $stateProvider
                .state('home', {
                    url: "/home",
                    templateUrl: "home.html"
                })
                .state('product', {
                    url: "/product",
                    templateUrl: "product.html"
                })
                .state('pro1', {
                    url: "/pro1/:productContent/:productName/:productImg/:productPrice",
                    controller: "prdd",
                    templateUrl: "productDetail.html"  
                })
                .state('service', {
                    url: "/service",
                    templateUrl: "service.html"
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "about.html"
                })
                ;
    }]);
app.directive('ngReadmore', function() {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<p></p>',
    scope: {
      moreText: '@',
      lessText: '@',
      words: '@',
      ellipsis: '@',
      char: '@',
      limit: '@',
      content: '@'
    },
    link: function(scope, elem, attr, ctrl, transclude) {
      var moreText = angular.isUndefined(scope.moreText) ? ' <a class="read-more">Read More...</a>' : ' <a class="read-more">' + scope.moreText + '</a>',
        lessText = angular.isUndefined(scope.lessText) ? ' <a class="read-less">Less ^</a>' : ' <a class="read-less">' + scope.lessText + '</a>',
        ellipsis = angular.isUndefined(scope.ellipsis) ? '' : scope.ellipsis,
        limit = angular.isUndefined(scope.limit) ? 50 : scope.limit;

      attr.$observe('content', function(str) {
        readmore(str);
      });

      transclude(scope.$parent, function(clone, scope) {
        readmore(clone.text().trim());
      });

      function readmore(text) {

        var text = text,
          orig = text,
          regex = /\s+/gi,
          charCount = text.length,
          wordCount = text.trim().replace(regex, ' ').split(' ').length,
          countBy = 'char',
          count = charCount,
          foundWords = [],
          markup = text,
          more = '';

        if (!angular.isUndefined(attr.words)) {
          countBy = 'words';
          count = wordCount;
        }

        if (countBy === 'words') { // Count words

          foundWords = text.split(/\s+/);

          if (foundWords.length > limit) {
            text = foundWords.slice(0, limit).join(' ') + ellipsis;
            more = foundWords.slice(limit, count).join(' ');
            markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
          }

        } else { // Count characters

          if (count > limit) {
            text = orig.slice(0, limit) + ellipsis;
            more = orig.slice(limit, count);
            markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
          }

        }

        elem.append(markup);
        elem.find('.read-more').on('click', function() {
          $(this).hide();
          elem.find('.more-text').addClass('show').slideDown();
        });
        elem.find('.read-less').on('click', function() {
          elem.find('.read-more').show();
          elem.find('.more-text').hide().removeClass('show');
        });

      }
    }
  };
});
app.controller('prdd',function($scope, $stateParams){
    $scope.product_content = $stateParams.productContent;
    $scope.product_name = $stateParams.productName;
    $scope.product_img= $stateParams.productImg;
    $scope.product_price=$stateParams.productPrice;
});
app.controller('menuCtr', function ($scope) {
    $scope.menuItems = [
        {
            link: 'index.html',
            name: 'home'
        },
        {
            link: 'product.html',
            name: 'product'
        },
        {
            link: 'service.html',
            name: 'service'
        },
        {
            link: 'about.html',
            name: 'about'
        }

    ];
});
app.controller('apiCtr', function ($scope) {
    $scope.apis = [
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.abc',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        }
        ,
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        },
        {
            name: 'angular.bind',
            link: 'angular.bind.html'
        }

    ];
});
app.controller('home', function ($scope) {
    $scope.homes = [
        {
            title: 'Why AngularJS?',
            content: 'HTML is great for declaring static documents, but it falters when we try to use it for declaring dynamic views in web-applications. AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
        },
        {
            title: 'Alternatives',
            content: 'Other frameworks deal with HTML’s shortcomings by either abstracting away HTML, CSS, and/or JavaScript or by providing an imperative way for manipulating the DOM. Neither of these address the root problem that HTML was not designed for dynamic views.'
        },
        {
            title: 'Extensibility',
            content: 'AngularJS is a toolset for building the framework most suited to your application development. It is fully extensible and works well with other libraries. Every feature can be modified or replaced to suit your unique development workflow and feature needs. Read on to find out how.'
        }
    ];
    $scope.someControls = [
        {
            title: 'Data Binding',
            content: 'Data-binding is an automatic way of updating the view whenever the model changes, as well as updating the model whenever the view changes. This is awesome because it eliminates DOM manipulation from the list of things you have to worry about.'
        },
        {
            title: 'Controller',
            content: 'Controllers are the behavior behind the DOM elements. AngularJS lets you express the behavior in a clean readable form without the usual boilerplate of updating the DOM, registering callbacks or watching model changes.'
        }
    ];
    $scope.wireUps = [
        {
            title: 'Deep Linking',
            content: 'A deep link reflects where the user is in the app, this is useful so users can bookmark and email links to locations within apps. Round trip apps get this automatically, but AJAX apps by their nature do not. AngularJS combines the benefits of deep link with desktop app-like behavior.'
        },
        {
            title: 'Form Validation',
            content: 'Client-side form validation is an important part of great user experience. AngularJS lets you declare the validation rules of the form without having to write JavaScript code. Write less code, go have beer sooner.'
        }
    ];
});
app.controller('prd', function ($scope) {
    $scope.products = [
        {
            id: 'pro1',
            img: 'images/img1.jpg',
            title: 'The Life-Changing Magic of Tidying Up: The Japanese Art of Decluttering and Organizing',
            content: 'Despite constant efforts to declutter your home, do papers still accumulate like snowdrifts and clothes pile up like a tangled mess of noodles?',
            price: '30'
        },
        {
            id: 'pro2',
            img: 'images/img2.jpg',
            title: 'The Nightingale',
            content: 'In the quiet village of Carriveau, Vianne Mauriac says goodbye to her husband, Antoine, as he heads for the Front. She does not believe that the Nazis will invade France … but invade they do, in droves of marching soldiers, in caravans of trucks and tanks, in planes that fill the skies and drop bombs upon the innocent',
            price: '20'
        },
        {
            id: 'pro3',
            img: 'images/img3.jpg',
            title: 'Harry Potter Paperback Box Set (Books 1-7)',
            content: "Now for the first time ever, J.K. Rowling’s seven bestselling Harry Potter books are available in a stunning paperback boxed set! The Harry Potter series has been hailed as “one for the ages” by Stephen King and “a spellbinding saga’ by USA Today",
            price: '10'
        }
    ];
});