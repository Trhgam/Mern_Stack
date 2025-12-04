import express from "express";
import { matchedData, query, validationResult } from "express-validator";

const app = express();
const PORT = 3000;

app.get(
  "/hello",
  query("person").notEmpty().withMessage("Person is required").escape(),

  (req, res) => {
    // Khui lỗi từ req để xử lý

    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = matchedData(req); //lay data tron request va sanitize / ky thuat don rac
      //   return res.send(`Hello ${req.query.person}`);//bien chua sach nen dung data
      return res.send(`Hello ${data.person}`);
    }
    return res.status(400).json({ errors: errors.array() });
  }
);

app.listen(PORT, () => {
  console.log("Server đang chạy ở PORT" + PORT);
});
