/*
 * @Author: your name
 * @Date: 2020-12-08 15:41:53
 * @LastEditTime: 2020-12-08 15:56:50
 * @LastEditors: Please set LastEditors
 * @Description: 实现 Excel 生成和下载
 * @FilePath: \analysis-system\src\libs\Excel.js
 */

let data = [
  {
    name: "AML",
    phone: "123456",
    email: "123@123456.com"
  },
  {
    name: "AML",
    phone: "123456",
    email: "123@123456.com"
  },
  {
    name: "I3",
    phone: "123456",
    email: "123@123456.com"
  },
  {
    name: "THEL",
    phone: "123456",
    email: "123@123456.com"
  }
];

function downloadExcel(data) {
  let str = "<tr><td>name</td><td>phone</td><td>email</td></tr>";
  //循环遍历，每行加入tr标签，每个单元格加td标签
  for (let i = 0; i < data.length; i++) {
    str += "<tr>";
    for (let item in data[i]) {
      //增加\t为了不让表格显示科学计数法或者其他格式
      str += `<td>${data[i][item] + "\t"}</td>`;
    }
    str += "</tr>";
  }
  //Worksheet名
  let worksheet = "Sheet1";
  let uri = "data:application/vnd.ms-excel;base64,";

  //下载的表格模板数据
  let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:x="urn:schemas-microsoft-com:office:excel" 
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${worksheet}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body><table>${str}</table></body></html>`;
  //下载模板
  window.location.href = uri + window.btoa(template);
}

// downloadExcel(data)

export default downloadExcel;
