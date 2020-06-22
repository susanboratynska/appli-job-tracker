#Learning Notes
##React - Starting the project
* To start the project, you can use create-react-app without install babel nodes or web pack
* Command line: 
    * npm install -g create-react-app
        * -g: install it globally to use everywhere
    * cd <folder> -> create-react-app <projectName>
        * create the project: after the command line you should have all the src and public folder
    * npm start: will start the project at localhost:3000
##React - Hello world code snipet:
    ```javascript
      import React, {Component} from 'react'
      import {render} from 'react-dom'
        
        ReactDOM.render(
            <div>
                <h1>Hello World!</h1>
            </div>,
            //the root element usually by default in the index.html
            document.getElementById('root')
        )
     ```
##React component
    ````
        class Message extends Component {
            //Component should be capitalised
            render() {
                return (
                    <div>I am glad you are here</div>
                )
            }
        }       
        
        ReactDOM.render(
            <div>
                <!--All components are self-closing-->s
                <Message />
            </div>,
            document.getElementById('root')
        )
    ````
###Component with properties
    ````
    class Message extends React.Component {
        //Component should be capitalised
        render() {
            return (
                <div>
                    <div>{this.props.msg}</div>
                    <div>I am {this.props.age} years old</div>
                </div>
    
            )
        }
    }
    render(
        <div>
            <h1>Hello World!</h1>
            <Message msg="My name is Paul"
                     //number must have curly bracket around
                     age={28}
            />
        </div>,
        document.getElementById('root')
    )
    ````
## Props and state
### Code snipet
    ````javascript
        //later on this will be replaced by data from database
        let bookList = [
            {"title": "Harry Potter", "author": "J.K.Rowling"},
            {"title": "Percy Jackson", "author": "Rick Riordan"}
        ]
        //later on this will be taken out in a separate file
        const Book = ({title, author}) => {
            return(
                <div>
                    <h1>{title}</h1>
                    <div>by: {author}</div>
                </div>
            )
        }
        const Library = ({books}) => {
            //map the book to the data
            {books.map (
                book => <Book
                            title={book.title}
                            author={book.author}
            )}
        }
        render (
            //library will take in booklist to render
            <Library books={bookList} />,
            document.getElementById('root')
        )
    ````
## Code practicing: 
### A simple interface of the final web page built by React:
  https://github.com/vietphuongtran/ReactHelloWorld
## Mongodb basic syntax
### insert database through mongoshell
````
- use <dbName> (i.e.: use video)
- show collections
load database to cluster
- direct to Mongoshell
- using load("js file")

a) insertOne
- db.<dbName>.insertOne({{title: "", ...})
b) insertMany
- 
db. movieScratch.insertMany(
    [
        {
            "_id": "t005",
            "title": "Captain America: The First Avenger",
            "year": 20009,
            "imdb": "t005"
        },
        {
            "_id": "t006",
            "title": "Thor",
            "year": 2010,
            "imdb": "t006"
        },
        {
            "_id": "t007",
            "title": "Avengers",
            "year": 2010,
            "imdb": "t007"
        }
    ],
    {
        "ordered": false
    }
);
db.movieScratch.insertMany(
    [
        {
            "title": "Iron Man 3",
            "year": 2010,
            "imdb": "t008"
        },
        {
            "title": "Captain America: The Winter Soldier",
            "year": 2011,
            "imdb": "t009"
        }
    ]
);
````
##Filter documents
* In Compass: {title: "Thor", year: 2010}
* In MongoShell: db.movieDetails.find({countries: "Italy", genres: "Comedy"}).pretty()

Filter complicate data (data nested as an object
* In Compass: {"imdb.rating" : 6.1}
* In MongoShell: db.movieDetails.find({"imdb.rating": 6.1}).pretty()

## Count()
* In MongoShell: db.movieDetails.find({"awards.wins": 2, "awards.nominations": 2}).count()
db.movieDetails.find({"rated": "PG", "awards.nominations": 10}).count()

## Find()
* In MongoShell: db.movieDetails.find({actors: ["Claudia Cardinale", "Henry Fonda"]})

## it : short for iterate
* iterate through the next ... results (... based on the number of search results)

## Projection: select only the value we want in the search result
* Example: db.movieDetailes.find({"genres": "Western"} , {"title": 1, "_id": 0}) 
    * meaning include the title, exclude the id
    * 1 means include, 0 means exclude

## Update One: update the first one that matches the criteria
````
db.movieDetails.updateOne ({
    _id: ""
    }, {
    $set: {
        "awards": {
            "wins": 8,
            "nominations": 14 
        }
    }
})
$set: set the value for one field
$inc: increment of field (i.e.: add in new values for the existing one)

Update Many: update all that matches th criteria
db.movieDetails.updateMany ({
    rated: null
    }, {
    $unset: {
        rated: ""
    }
})
````
## Upsert: Update the document matching the filter, if there is no match, create One and insert it
````
db.movieScratch.updateOne({
    "title": "The Eternal"
    }, {
    $set: {
    }, 
    {
    upsert: true
    }
});
````
## replaceOne
````
let filter = {title: ""} //find the one with the title
let doc = db.movieDetails.findOne(filter); //assign a variable to be that one
doc.poster = ""
doc.genres.push("TV Series") //update the variable
db.movieDetails.replaceOne(filter, doc) //replace the variable with the value of doc
````
## delete
- deleteOne: db.MovieDetails.deleteOne({title: "Justice League"})
- deleteMany: db.MovieDetails.deleteOne({rating: 0})

## Operator
### Logical Operator
* $gt(e), $lt(e): greater than (equal)
* $ne: not equal to
* $in: matches any value in an array
* $nin: mataches no value in an array
* db.movieDetails.find({"runtime": {$gte: 90, $lte: 120}})
* db.movieDetails.find({"writers": {$in: ["Ethan Coen", "Joel Coen"]}}).count()

### Element Operator
* $exists	Matches documents that have the specified field.
* $type	Selects documents if a field is of the specified type.
* {"rating": {$exists: true(false)}}: return movies that rating exists (or not if use false)
* {"rating":{$type: int}}: return movies that rating have int data type

### Logical Operator: $and, $or, $nor, $not
* db.movieDetails.find({$and: [{"director": "George Lucas"},{"title": "Star Wars"}]}, {title: 1, _id:0, directors: 1}).count()

### Array Operator: 
* $all	Matches arrays that contain all elements specified in the query.
* $elemMatch	Selects documents if element in the array field matches all the specified $elemMatch conditions.
* $size	Selects documents if the array field is a specified size.
* Example: 
    * {"genres": {$all: ["Comedy", "Drama"]}} //finding all films with the genres contains Comedy and Drama in it
    * {"countries": {$size: 1}} //find all films film in only one location