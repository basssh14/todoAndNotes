const express = require("express");
const app = express();

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, name: "Margot", lastname: "Robbie" },
    { id: 2, name: "Will", lastname: "Smith" },
    { id: 3, name: "Lily", lastname: "Collins" },
    { id: 4, name: "Zac", lastname: "Efron" },
  ];

  res.json(customers);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server up and running on port 5000"));
