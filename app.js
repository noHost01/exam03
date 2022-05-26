import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "Fam",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get("/saying/random", async (req, res) => {
  const [[sayingRow]] = await pool.query(
    `
    SELECT *
    FROM saying
    ORDER BY RAND()
    LIMIT 1
    `
  );

  if (sayingRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  sayingRow.view_count++;

  await pool.query(
    `
    UPDATE saying
    SET view_count = ?
    WHERE id = ?
    `,
    [sayingRow.view_count, sayingRow.id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: sayingRow,
  });
});

app.patch("/saying/:id", async (req, res) => {
  const { id } = req.params;
  const [[sayingRow]] = await pool.query(
    `
    SELECT *
    FROM saying
    WHERE id = ?
    `,
    [id]
  );

  if (sayingRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not Found",
    });
    return;
  }

  const {
    content = sayingRow.content,
    auter = sayingRow.auter,
    good_count = sayingRow.good_count,
    bads_count = sayingRow.bads_count,
  } = req.body;

  await pool.query(
    `
    UPDATE saying
    SET content = ?,
    auter = ?,
    good_count = ?,
    bads_count = ?
    WHERE id = ?
    `,
    [content, auter, good_count, bads_count, id]
  );

  const [[justsayingRow]] = await pool.query(
    `
    SELECT *
    FROM saying
    WHERE id = ?
    `,
    [id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    date: justsayingRow,
  });
});

app.listen(port, () => {
  console.log(`saying app listening on port ${port}`);
});
