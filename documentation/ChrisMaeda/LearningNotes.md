# Learning Notes

## React

### Commands
````
npx create-react-app app-name
````
- Create a new single-page application in React
- Name of the app cannot have captial letters

````
 npm start
````
- Starts the development server.
- Automatically open the application 
- Default: http://localhost:3000

````
npm run build
````
- Bundles the app into static files for production.

````
npm test
````
- Starts the test runner.

````
npm run eject
````
- Removes this tool and copies build dependencies, configuration files and scripts into the app directory
- If you do this, you can’t go back!

### Notes

#### React
- A JavaScript Library for builidng interfaces
- Component based coding

#### React.Component
- Base class for component development
- Ex. Subscribe button in YouTube
- Code Example
````
class SubscribeButton extends React.Component {}
````
- All class in their constructor must call their parent constructor
- To remember any information use the 'state' property
- Code Example
````
constructor(props) {
  super(props);
  this.state = {
    text: "Example"
  };
}
````

##### props
- Properties for the component
- Ex. SubscribeText string value
- Code Example
````
//Access the properties
{ this.props.SubscribeText }

//Setting or Passing the properties
<SubscribeButton SubscribeText={"Subscribe"} />
````
##### render
- Function that decide how the component view will look like
- Will return HTML tags with filled in JS code like the value of a text value
- You can also return other React component
- Code Example
````
render() {
    return (
      <div className="subscribe-button"></div>
    );
}
````

##### state
- To remember things about the component
- To update the value in a state use the function setState
- Code Example
````
setState({nameOfProperty: newValueProperty})
````

##### key
- A special and reserved property
- Used to determine what has changed
- The value of the key only need to be unique between components and their siblings

#### Function Component
- A simpler version of React Component, but with only the render method
- Code Example
````
function SubscribeButton(props) {
  return (
    <div className="subscribe-button"></div>
  );
}
````

## MongoDB

### Commands
````
mongo.exe --dbpath "C:\data" 
mongo.exe
````
- Start/Run MongoDB
- Do note that you have must have the path to the exe correctly

All the following commands is after you start the MongoDB

````
db.help()
````
- Open the help manual

````
use DATABASE_NAME
````
- Create a new database
- Select a database

````
show dbs
````
- List all databases
- Do note that when a database is created it must have at least one document in it to appear in the list of databases

````
db.dropDatabase()
````
- Delete a database
- Do note that you must select a database beforehand to delete the database

All the following commands is after you have selected a database

````
db.createCollection(name, options)
````
- Create a new collection
- Note if you have inserted a document MongoDB will create it automatically

````
db.COLLECTION_NAME.drop()
````
- Drop the collection

````
db.COLLECTION_NAME.insert(document)
````
- Insert a single document in a collection
- The same will work if you use the 'save' command
- You can also pass in mulitple documents by passing it as a array
- The insertOne(document) command is the same as insert, but only accept one document
- The insertMany([document]) command is the same as insert, but accept an array of document

````
db.COLLECTION_NAME.find()
````
- List documents in a collection
- Like the Select command for SQL
- You can pass in condition(s) for what to find like the WHERE command for SQL

````
db.COLLECTION_NAME.find({"name":"Christopher"})
````
- This will find all documents that have the name "Christopher"
- You can also pass in OR and AND options
- You can also find value using less ($lt), equal, or greater ($gt) than value
- Even NOT is also allowed (opposite of the defined search)

````
db.COLLECTION_NAME.update(SELECTION_CRITERIA, $set: UPDATED_DATA)
````
- Update the collection
- By default it will only update a single collection
- To update mulitple add the {multi:true} after the UPDATED_DATA
- The updateOne(<filter>, <update>, <options>) is the same as update, but only update a single document in a collection
- The updateMany(<filter>, <update>, <options>) is the same as update, but update mulitple documents in a collection

````
db.COLLECTION_NAME.remove(DELETION_CRITERIA)
````
- Delete a document(s) in a collection
- To delete all documents just pass in {} as the DELETION_CRITERIA
- If you want to only delete one document pass in 1 after the DELETION_CRITERIA
- The deleteMany(DELETION_CRITERIA) command is the same as remove, but allows you to delete all documents that match the criteria


### Notes

#### Document
- Name value pairs or fields
- Like a JS Object
- Ex.
````
{
  name: "Christopher",
  gender: "male"
}
````
##### _id 
- Unique value for the document
- Can be provided or MongoDB will automatically provide it with a 12 bytes value which the first 4 bytes for the current timestamp, next 3 bytes for machine id, next 2 bytes for process id of MongoDB server and remaining 3 bytes are simple incremental VALUE

#### Collection
- Group of documents
- Almost like a table in SQL
````
{
  name: "Adam",
  gender: "male"
}

{
  name: "Christopher",
  gender: "male"
}
````

