const jwt = require('jsonwebtoken')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCIkpXVCJ9.eyJpZCI6IjVlMzZhMjgwOTI1MWViNWMyNGQ4YmIzMCIsInVzZXJuYW1lIjoidXNlcjMiLCJjcmVhdGVkQXQiOiIyMDIwLTAyLTAzVDA1OjU5OjQzLjIwNFoiLCJpYXQiOjE1ODA3MDk1ODN9.Prk4l_N7GLQ46kmFIDdB-X9C0DCuFPleJqcN--8ire4'

console.log(jwt.verify(token, 'jwt@123'))