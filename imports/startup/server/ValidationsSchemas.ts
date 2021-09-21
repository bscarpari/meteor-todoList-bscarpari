export default class ValidationsSchemas {   
    public schema:any;
    constructor( schema ) {
        this.schema = schema
    }
  
    validate ( object : object ) {
        let validationContext = this.schema.newContext();
        let cleanDoc = this.schema.clean(object);
        validationContext.validate(cleanDoc);
       
        if (!validationContext.isValid()) {
            let jsonError = validationContext.validationErrors();
            return {
                status : false ,
                data : 'Error schema ' + JSON.stringify( jsonError )
            }
        }else{
            return {
                status : true ,
                data : cleanDoc
            }
        }
    }
}


