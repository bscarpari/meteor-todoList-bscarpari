import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    name: {
        type: String,
        optional : true
    },
    email: {
        type: String,
        optional : true
    }
});