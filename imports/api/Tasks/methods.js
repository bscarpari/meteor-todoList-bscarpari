import {Meteor} from 'meteor/meteor';
import {Tasks} from './Tasks.js';
import ValidationsSchemas from '../../startup/server/ValidationsSchemas';
import {schema} from './schema';

Meteor.methods({

    'create.task'(task) {
        if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
        let validate_schema = new ValidationsSchemas(schema);
        let test_validate = validate_schema.validate(task);
        if (test_validate.status !== true) {
            throw new Meteor.Error(test_validate.data);
        }

        return Tasks.insert(test_validate.data);
    },

    'update.task'(task) {
        if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
        return Tasks.update({
            _id: task._id
        }, {
            $set: {
                title: task.title,
                description: task.description
            }
        });
    },

    'delete.task'(_id) {
        if (!Meteor.userId()) throw new Meteor.Error("not-authorized");
        Tasks.remove({
            _id: _id
        });
    },

});