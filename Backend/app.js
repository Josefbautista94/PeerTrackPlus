const express = require('express');
const app = express();
const PORT = 3000;
const aiRoutes = require("./routes/ai.routes");

app.use(express.json())

app.get("/", (req,res)=>{
  res.send("PeerTrack+ backend is running!")
});

app.use("/api/ai", aiRoutes);

app.listen(PORT, () =>{

console.log((`Server is running on http://${PORT}`))

})