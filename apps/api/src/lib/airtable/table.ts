import Airtable from "airtable";

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

if (!process.env.AIRTABLE_BASE) {
  throw new Error("Missing AIRTABLE_BASE");
}

if (!process.env.AIRTABLE_TABLE) {
  throw new Error("Missing AIRTABLE_TABLE");
}

const table = Airtable.base(process.env.AIRTABLE_BASE).table(
  process.env.AIRTABLE_TABLE,
);

export default table;
