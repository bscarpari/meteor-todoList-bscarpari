import SimpleSchema from 'simpl-schema';

export const schema = new SimpleSchema({
    user: {
        type: String,
        optional : false
    },
    title: {
        type: String,
        optional : false
    },
    description: {
        type: String,
        optional : false
    },
    createdAt: {
        type: Date,
        optional : true,
        defaultValue : new Date()
    }
});