var People = {
  init: function (name, age) {
    this.name = name;
    this.age = age;
  },
  indentify: function () {
    console.log(this.name, this.age);
  }
};

var PeopleWithFriends = Object.create(People);

PeopleWithFriends.friends = [];
PeopleWithFriends.showMyFriends = function () {
  this.friends.forEach(function (t) {
    console.log(t.name);
  })
};
PeopleWithFriends.addFriends = function (People) {
  this.friends.push(People);
};

var kimi = Object.create(PeopleWithFriends);
var lili = Object.create(PeopleWithFriends);
kimi.init('Kimi','18');
lili.init('lili','16');

kimi.addFriends(lili);

kimi.indentify();
kimi.showMyFriends();

