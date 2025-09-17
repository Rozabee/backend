
const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const mysql = require("mysql2");

const PORT = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());



const connection = mysql.createConnection({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

});



connection.connect();



//ENDPOINTS

//REPORT READ

app.get("/api/brewview_app", (req, res) => {

  connection.query("SELECT * FROM movies", (err, rows, fields) => {

    if (err) throw err;

    res.json(rows);

  });

});



//SEARCH

//READ REPORT

app.get("/api/brewview_app/:id", (req, res) => {

  const id = req.params.id;

  connection.query(

    `SELECT * FROM movies WHERE id="${id}"`,

    (err, rows, fields) => {

      if (err) throw err;

      if (rows.length > 0) {

        res.json(rows);

      } else {

        res.status(400).json({ msg: `${id} id is not found!` });

      }

    }

  );

});



//CREATE

//app.use(express.urlencoded({ extended: false }));

app.post("/api/brewview_app", (req, res) => {

  const titleMovie = req.body.titleMovie;
  const genre = req.body.genre;
  const year = req.body.year;
  const director = req.body.director;
  const studio = req.body.studio;
  const country = req.body.country;
  const language = req.body.language;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;

  //const ip = req.body.ip;
  //const program = req.body.program;

  connection.query(

    `INSERT INTO movies (titleMovie, genre, year, director, studio, country, language, description, imageUrl) VALUES ('${titleMovie}','${genre}','${year}','${director}','${studio}','${country}','${language}','${description}','${imageUrl}')`,

    (err, rows, fields) => {

      if (err) throw err;

      res.json({ msg: `Successfully inserted!` });

    }

  );

});



//PUT

app.put("/api/brewview_app", (req, res) => {

  const titleMovie = req.body.titleMovie;

  const genre = req.body.genre;

  const year = req.body.year;

  const director = req.body.director;
  const studio = req.body.studio;
  const country = req.body.country;
  const language = req.body.language;
  const description = req.body.description;

  const imageUrl = req.body.imageUrl;

  const id = req.body.id;

  connection.query(

    `UPDATE movies SET titleMovie='${titleMovie}', genre='${genre}', year='${year}', director='${director}', studio='${studio}', country='${country}', language='${language}', description='${description}', imageUrl='${imageUrl}' WHERE id='${id}'`,

    (err, rows, fields) => {

      if (err) throw err;

      res.json({ msg: `Successfully updated!` });

    }

  );

});



//DELETE

app.use(express.urlencoded({ extended: false }));

app.delete("/api/brewview_app", (req, res) => {

  const id = req.body.id;

  connection.query(

    `DELETE FROM movies WHERE id='${id}'`,

    (err, rows, fields) => {

      if (err) throw err;

      res.json({ msg: `Successfully deleted!` });

    }

  );

});

/////////////////////// REVIEWS ///////////////////////

app.get("/api/brewview_app/reviews/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  connection.query(
    `SELECT * FROM reviews WHERE movieId="${movieId}"`,
    (err, rows) => {
      if (err) throw err;
      res.json(rows);
    }
  );
});


app.post("/api/brewview_app/reviews/:movieId", (req, res) => {

  const id = req.body.id;
  const author = req.body.author;
  const content = req.body.content;
  const created_at = req.body.created_at;
  //const ip = req.body.ip;
  const movieId = req.params.movieId;

  connection.query(

    `INSERT INTO reviews (id, movieId, author, content, created_at) VALUES ('${id}','${movieId}','${author}','${content}', '${created_at}')`,

    (err, rows, fields) => {

      if (err) throw err;

      res.json({ msg: `Successfully inserted!` });

    }

  );

});

app.use(express.urlencoded({ extended: false }));

app.delete("/api/brewview_app/reviews/:movieId", (req, res) => {

  const id = req.body.id;

  connection.query(

    `DELETE FROM reviews WHERE id='${id}'`,

    (err, rows, fields) => {

      if (err) throw err;

      res.json({ msg: `Successfully deleted!` });

    }

  );

});

//PORT number

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);

});