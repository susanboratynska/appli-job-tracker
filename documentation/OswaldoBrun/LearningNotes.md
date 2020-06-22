TO do:
*Build A Cluster
*create server.js
*instal dependencies npm install express cors mongoose dotenv
*make connections
*create a .env with the Atlas cluster
*create models/schemas
*export schemas
*create routers
*link routers

Mongo
Table ->Collection
Row->Document
index->index
join->$lookup
Fkey->Reference

{
name: "Oswaldo Meza",
Title: "developer",
address: {           //Subdocuments
	address: "1240 lane lane"
	City: "Mississauga"
	},
likes: ["cats", "dogs", "games", "food"],
faveNumber: 11
}