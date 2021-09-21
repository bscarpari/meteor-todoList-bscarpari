import { Meteor } from 'meteor/meteor';
import { Tasks } from '../Tasks';

Meteor.publish("all.tasks", function ( user ) {
    return Tasks.find({ user : user });
})
