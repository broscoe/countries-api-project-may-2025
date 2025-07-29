/*--------------------------------
BOILERPLATE CODE TO SET UP SERVER
---------------------------------*/

// Importing our Node modules
import express from "express"; // The framework that lets us easily build a web server
import pg from "pg"; // pg stands for PostgreSQL, for talking to the database
import config from "./config.js"; // we need access to our database connection credentials

// connect to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: config.databaseUrl, // credentials to access the database — keep this private!
  ssl: true, // we will use SSL encryption when connecting to the database
});

const app = express(); // Creating an instance of the express module

app.use(express.json()); // This server will receive and respond in JSON format

const port = 3000; // Declaring which port to listen to to receive requests

// Turning on our server to listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/*--------------------------------
HELPER FUNCTIONS
---------------------------------*/

// Helper function for /get-all-users

async function getAllUsers() {
    const result = await db.query("SELECT * FROM users ORDER BY user_id ASC");
    console.log(result);
    return result.rows;
  }

  // Helper function for /get-newest-user

  async function getNewestUser() {
    const result = await db.query("SELECT * FROM users ORDER BY user_id DESC limit 1");
    console.log(result);
    return result.rows;
  }

  // Helper function for /add-one-user

async function addOneUser(newUser) {
    await db.query(
      "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
      [newUser.name, newUser.country_name, newUser.email, newUser.bio]
    );
  }
  /*
  // helper to check what countries are in country count
  async function getCountryCountCountries() {
    const country_count = await db.query("SELECT * FROM country_count"
    );
    console.log(result);
    return result.rows;
  }
  // Helper function for /update-one-country-count


async function updateOneCountryCount(updatedCountry) {
    getCountryCountCountries()
    if (updatedCountry === country_count.country_name) {
        await db.query(
      "UPDATE country_counts SET count = count + 1 where country_name = '$1'"
      [updatedCountry.country_name]
    );
    } else {
        await db.query(
            "INSERT INTO country_counts (country_name, count) VALUES ($1, $2)",
            [country_count.country_name, country_count.count]
          )
  }
}
  INSERT INTO director (id, name)
VALUES
    (2, 'robert'),
    (5, 'sheila'),
    (6, 'flora')
ON CONFLICT (id) DO UPDATE
SET name = EXCLUDED.name;
  */

async function updateOneCountryCount(countryToUpdate) {
  const result = await db.query(
   `INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING count AS "newCount";`, [countryToUpdate.country_name]
  );
  console.log(result);
  return result.rows[0];
}
async function getAllSavedCountries() {
    const result = await db.query("SELECT * FROM saved_countries");
    console.log(result);
    return result.rows;
  }

  async function addOneSavedCountry(newSavedCountry) {
    await db.query(
        "INSERT INTO saved_countries (country_name) VALUES ($1)",
        [newSavedCountry.country_name]
      );
  }
/*------------------update--------------
API ENDPOINTS
---------------------------------*/

// GET /get-all-users

app.get("/get-all-users", async (req, res) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  });

  // GET /get-newest-user

  app.get("/get-newest-user", async (req, res) => {
    const newestUser = await getNewestUser();
    res.json(newestUser);
  });

  // POST /add-one-user
  app.post("/add-one-user", async (req, res) => {
    const newUser = req.body;
    addOneUser(newUser);
    res.send("Success! User has been added.");
  });

  // POST /update-one-country-count

  app.post("/update-one-country-count", async (req, res) => {
    const countryToUpdate = req.body;
    const updatedCountry = await updateOneCountryCount(countryToUpdate);
    res.json(updatedCountry);
  });

  // GET /get-all-saved-countries

  app.get("/get-all-saved-countries", async (req, res) => {
    const allSavedCountries = await getAllSavedCountries();
    res.json(allSavedCountries);
  });

  // POST /save-one-country

  app.post("/save-one-country", async (req, res) => {
    const newSavedCountry = req.body;
    addOneSavedCountry(newSavedCountry);
    res.send("Success! The country is saved.");
  });