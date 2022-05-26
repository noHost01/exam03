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

// app.patch("/wise-sayings/:id", async (req, res) => {
//   const { id } = req.params;
//   const [[wiseSayingRow]] = await pool.query(
//     `
//     SELECT *
//     FROM wise_saying
//     WHERE id = ?
//     `,
//     [id]
//   );

//   if (wiseSayingRow === undefined) {
//     res.status(404).json({
//       resultCode: "F-1",
//       msg: "404 not found",
//     });
//     return;
//   }

//   const {
//     content = wiseSayingRow.content,
//     author = wiseSayingRow.author,
//     goodLikeCount = wiseSayingRow.goodLikeCount,
//     badLikeCount = wiseSayingRow.badLikeCount,
//   } = req.body;

//   await pool.query(
//     `
//     UPDATE wise_saying
//     SET content = ?,
//     author = ?,
//     goodLikeCount = ?,
//     badLikeCount = ?
//     WHERE id = ?
//     `,
//     [content, author, goodLikeCount, badLikeCount, id]
//   );

//   const [[justModifiedWiseSayingRow]] = await pool.query(
//     `
//     SELECT *
//     FROM wise_saying
//     WHERE id = ?
//     `,
//     [id]
//   );

//   res.json({
//     resultCode: "S-1",
//     msg: "성공",
//     data: justModifiedWiseSayingRow,
//   });
// });

app.listen(port, () => {
  console.log(`Wise saying app listening on port ${port}`);
});
