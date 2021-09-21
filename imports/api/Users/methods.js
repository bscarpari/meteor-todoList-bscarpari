import { Meteor } from 'meteor/meteor';
import ValidationsSchemas  from '../../startup/server/ValidationsSchemas';
import { schema }from './schema';

Meteor.methods({

    'create.user' (user) {
        let data_user = {
            password : user.password,
            email : user.email 
        }

        let validate_schema =  new ValidationsSchemas(schema);
        let test_validate =  validate_schema.validate(data_user);
        if( test_validate.status !== true ){
            throw new Meteor.Error(test_validate.data); 
        }

        return Accounts.createUser(data_user);
    }
    
});