const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '112211',
  database: 'ssds'
})

connection.connect(err => {
  if (err) {
    throw err
  }
  console.log('mySql connected')
})
app.use(cors())

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/id', (req, res) => {
  const sql1 = `SELECT FCID From foodcategory
    ORDER BY FCID desc limit 1;`
  connection.query(sql1, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results[0].FCID)
  })
})
app.get('/employeeID', (req, res) => {
  const sql1 = `SELECT EID From employee
                 ORDER BY EID desc limit 1;`
  connection.query(sql1, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results[0].EID)
  })
})
app.get('/FIID', (req, res) => {
  const sql1 = `SELECT FID From fooditem
                  ORDER BY FID desc limit 1;`
  connection.query(sql1, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results[0].FID)
  })
})

app.get('/employees', (req, res) => {
  const sql = 'SELECT * from Employee;'

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }

    return res.json(results)
  })
})

app.get('/foodCategory', (req, res) => {
  const sql = 'SELECT * from FoodCategory;'

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.get('/status', (req, res) => {
  const sql = 'SELECT * from status;'

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.get('/fooditems', (req, res) => {
  const sql = `SELECT * from FoodItem`

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.get('/cashiers', (req, res) => {
  const sql = `SELECT * From employee
    WHERE ETID = 1;`

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.patch('/updateFoodCategory', (req, res) => {
  const sql = `UPDATE Foodcategory f
    set name = "${req.body.name}",  description = "${req.body.description}", StsID = "${req.body.StsID}"
    where f.fcid =  "${req.body.id}";`

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.patch('/updateFoodItem', (req, res) => {
  const sql = `UPDATE FoodItem f
    set name = "${req.body.name}",  description = "${req.body.description}", StsID = "${req.body.StsID}", price = ${req.body.price}
    where f.FID =  "${req.body.id}";`

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.patch('/updateCashier', (req, res) => {
  const sql = `UPDATE Employee e
    set Fname = '${req.body.Fname}', Lname = '${req.body.Lname}',  StsID = ${req.body.StsID}
    where e.EID =  ${req.body.id};`

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})

app.put('/insertFC', (req, res) => {
  const sql = `INSERT INTO foodcategory (FCID, Name, Description, StsID)
                 VALUES (${req.body.id}, '${req.body.Name}', '${req.body.Description}', ${req.body.StsID} );`
  console.log(sql)
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})

app.put('/insertC', (req, res) => {
  const sql = `INSERT INTO employee (EID, ETID, Fname, Lname, StsID)
                VALUES (${req.body.id}, 1, '${req.body.Fname}', '${req.body.Lname}', ${req.body.StsID} );`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.put('/insertFI', (req, res) => {
  const sql = `INSERT INTO fooditem (FID, FCID, Name, Description, StsID, Price, StartDate)
                VALUES (${req.body.FID}, ${req.body.FCID}, '${req.body.Name}' , '${req.body.Description}', ${req.body.StsID}, ${req.body.Price}, '${req.body.StartDate}' );`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.post('/deleteFC', (req, res) => {
  console.log(req.body)
  const sql = `DELETE FROM foodcategory
                WHERE FCID = ${req.body.FCID};`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.post('/deleteFI', (req, res) => {
  const sql = `DELETE FROM fooditem
                WHERE FID = ${req.body.FID};`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})
app.post('/deleteC', (req, res) => {
  const sql = `DELETE FROM employee
                WHERE EID = ${req.body.EID};`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})

app.post('/auth', (req, res) => {
  const sql = `Select EID from auth
                where Em = '${req.body.Email}' and pass = '${req.body.Password}'`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})

app.post('/authType', (req, res) => {
  const sql = `Select ETID from employee
                where EID = ${req.body.EID};`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ msg: err })
    }
    return res.json(results)
  })
})

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`)
})
