const cheerio = require('cheerio');
const fs = require('fs');
const XLSX = require('xlsx');

const cookies = {
  "JSESSIONID" :	"0AB4D3F2A4C3FBC59E27EC17FFEE9D31"
};

const headers = {
  "Host": 'rera.karnataka.gov.in',
  "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0',
  "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  "Accept-Language": "en-US,en;q=0.5",
  "Accept-Encoding": "gzip, deflate, br",
  "Referer": "https://rera.karnataka.gov.in/publicDomain/projectList",
  "Connection": "keep-alive",
  "Cookie": cookies,
  "Upgrade-Insecure-Requests": 1,
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
};

fetch('https://rera.karnataka.gov.in/publicDomain/agentList', {
  headers: headers,
  credentials: 'include',
  redirect: 'follow',
  method: 'GET',
}).then(response => response.text())
  .then(body => {
    const $ = cheerio.load(body);
    const columns = [];
    $('#projectTaskList thead tr th').each((i, el) => {
      columns.push($(el).text().trim());
    });
    console.log(columns)
    const data = [];
    $('#projectTaskList tbody tr').each((i, el) => {
      const _dict = {};
      $(el).find('td').each((j, td) => {
        _dict[columns[j]] = $(td).text().trim();
      });
      data.push(_dict);
    });

    console.log(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook to a file
    XLSX.writeFile(workbook, 'dataagent.xlsx');
  })
  .catch(error => console.error('Error:', error));