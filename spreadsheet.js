const LINKAGE_CONFIG_SHEET_NAME = "linkage_config"

function createConfigSpreadsheet() {
  const spreadsheet = SpreadsheetApp.create('datastudio-2-slack config', 50, 5);
  const url = spreadsheet.getUrl();
  PropertiesService.getScriptProperties().setProperty("CONFIG_SPREADSHEET_URL", url);
  const sheet = spreadsheet.getActiveSheet();
  sheet.setName(LINKAGE_CONFIG_SHEET_NAME);
  sheet.getRange(1,1,1,5).setValues([[
    "channels",
    "ownerEmailAddress",
    "dataStudioReportTitle",
    "dataStudioReportURL",
    "initialComment",
  ]])
  console.log(url)
}

function getLinkageConfig() {
  const spreadsheetURL = PropertiesService.getScriptProperties().getProperty("CONFIG_SPREADSHEET_URL");
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetURL);
  const sheet = spreadsheet.getSheetByName(LINKAGE_CONFIG_SHEET_NAME);
  const columnsName = sheet.getRange(1,1,1,5).getValues()[0];
  const values = sheet.getRange(2,1, sheet.getLastRow()-1,5).getValues();
  return values.map((rowData) => {
    const configObject = {}
    columnsName.forEach((name, index) => {
      configObject[name] = rowData[index];
    })
    return configObject;
  })
}