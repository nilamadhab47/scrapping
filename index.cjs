// const cheerio = require('cheerio');
// const fs = require('fs');
// const XLSX = require('xlsx');

// function extractData(html) {
//   const $ = cheerio.load(html);
//   const columns = [];
//   $('#projectTaskList thead tr th').each((i, el) => {
//     columns.push($(el).text().trim());
//   });

//   const data = [];
//   $('#projectTaskList tbody tr').each((i, el) => {
//     const _dict = {};
//     $(el).find('td').each((j, td) => {
//       _dict[columns[j]] = $(td).text().trim();
//     });
//     data.push(_dict);
//   });

//   const workbook = XLSX.utils.book_new();
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//   XLSX.writeFile(workbook, 'data1agent.xlsx');
// }

// // If HTML is stored locally
// const localFilePath = './agentList.html';
// const htmlContent = fs.readFileSync(localFilePath, 'utf-8');
// extractData(htmlContent);
const cheerio = require('cheerio');
const fs = require('fs');
const XLSX = require('xlsx');

function extractData(html, tableName, fileName) {
  const $ = cheerio.load(html);
  const columns = [];
  $(`#${tableName} thead tr th`).each((i, el) => {
    columns.push($(el).text().trim());
  });

  const data = [];
  $(`#${tableName} tbody tr`).each((i, el) => {
    const _dict = {};
    $(el).find('td').each((j, td) => {
      _dict[columns[j]] = $(td).text().trim();
    });
    data.push(_dict);
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// If HTML is stored locally
const localFilePath = './projectList.html';
const htmlContent = fs.readFileSync(localFilePath, 'utf-8');
extractData(htmlContent, 'projectTaskList', 'data1projectList');
extractData(htmlContent, 'allWithdrawnTable', 'data2withdrawn');
extractData(htmlContent, 'allRejectedTable', 'data3rejected');
