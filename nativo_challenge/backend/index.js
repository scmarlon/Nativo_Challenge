const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")


const { f1, f2 } = require('./models/links')



const {findlink , insertLink, increaseVisit, searchForLink, frequentlyLinks} = require('./models/links')

// DataBase
const mongoose = require('mongoose');

const user ='MarlonSac';
const password = 'marlon1221'
const dbname = 'nativoDB'
const uri = `mongodb+srv://${user}:${password}@cluster0.yiuar.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(uri,
	{useNewUrlParser: true}
)
	.then(()=> console.log('DB Working'))
	.catch(e=> console.log(e))
;

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async (req, res) => {
	res.send("This is working")
})

app.get("/events", () => {console.log("HOLA")})

app.get("/home", async (req, res) => {
	const url= await frequentlyLinks();
	return res.status(200).json({ok:true, url});
	
})

app.post('/increase',async (req, res)=>{
	const {id} = req.body;
	increaseVisit(id);
})

app.get('/:shortLink', async (req,res)=>{
	const {shortLink} =req.params;
	const response =  await searchForLink(shortLink);
	if(response) return res.status(200).json({ok:true, redirectTo:response?.links});
	return res.status(200).json({ok:false});
	
})

app.post("/post_link", async (req, res) => {
	let { link } = req.body
	insertLink(link)
})
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})