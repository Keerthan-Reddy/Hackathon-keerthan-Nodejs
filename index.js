const express = require("express");
const bodyparser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

const db = require("./db");

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/public/user-page.html");
});

app.get("/user-page", (req, res) => {
  db.query("select * from exercise")
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/user-page", (req, res) => {
  const data = req.body;
  db.query(
    "Insert into exercise(exercise_name, target_body_part, discription, youtube) values (?,?,?,?)",
    [data.exercise_name, data.target_body_part, data.discription, data.youtube]
  )
    .then(() => {
      res.redirect("/user-home");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/search", (req, res) => {
  const id = req.query.id;
  db.query("SELECT * FROM customers WHERE id = ?", [id])
    .then(([rows]) => {
      if (rows.length > 0) {
        res.send(rows[0]);
      } else {
        res.status(404).send({ message: "Customer not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: "An error occurred" });
    });
});

app.get("/login", (req, res) => {
  const data = req.body;
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/verify", (req, res) => {
  res.sendFile(__dirname + "/public/userhome.html");
});

app.get("/user-home", (req, res) => {
  res.sendFile(__dirname + "/public/userhome.html");
});

app.get("/allcustomers", (req, res) => {
  res.sendFile(__dirname + "/public/user.html");
});

app.get("/edit/:id", (req, res) => {
  res.sendFile(__dirname + "/public/edit.html");
});

app.get("/", (req, res) => {
  db.query("select * from customers")
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query("select * from customers where id = ?", [id])
    .then(([rows]) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/api/add", (req, res) => {
  const data = req.body;
  console.log(data);

  db.query(
    "Insert into customers(customer_name,email,phone,address,date_of_birth,gender,occupation,membership_status,last_purchase_date) values (?,?,?,?,?,?,?,?,?)",
    [
      data.customer_name,
      data.email,
      data.phone,
      data.address,
      data.date_of_birth,
      data.gender,
      data.occupation,
      data.membership_status,
      data.last_purchase_date,
    ]
  )
    .then(([row]) => {
      res.redirect("/user-home");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  db.query(
    "UPDATE customers SET customer_name = ?, email=?, phone=?, address=?, date_of_birth=?, gender=?, occupation=?, membership_status=?, last_purchase_date=? WHERE id=?",
    [
      data.customer_name,
      data.email,
      data.phone,
      data.address,
      data.date_of_birth,
      data.gender,
      data.occupation,
      data.membership_status,
      data.last_purchase_date,
      id,
    ]
  )
    .then(([rows]) => {
      res.redirect("/user.html");
    })
    .then((err) => {
      console.log(err);
    });
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.query("delete from customers where id=?", [id])
    .then(([rows]) => {
      res.sendFile(__dirname + "/public/user.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8080, () => {
  console.log("the port is live at http://localhost:8080");
});
