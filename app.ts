const {google} = require('googleapis');
const keys = require('./Rating-keys.json');
import * as axios$ from 'axios';
const axios = axios$.default;

const tvShowsUrl: string = 'http://api.tvmaze.com/search/shows?q=girls'
const spreadSheetsId: string = '1QQq0kBNvmiVdcZfZt4K3aGtFtQUFQlDV7fOX4nuv1zk'
const spreedSheetsUrl: string = 'https://www.googleapis.com/auth/spreadsheets'

const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    [spreedSheetsUrl]
);

export interface InitShowResultModel {
    name: string;
    status: string;
    rating: number;
    officialSite: string;
    summary: string;

}

export interface InitShowResultModelParsed {
    name: string;
    status: string;
    rating.average: number;
    officialSite: string;
    summary: string;

}
export function initShowResult(name: string, status: string, rating: number,
                               officialSite: string, summary: string): InitShowResultModel {

     return {
        name,
        status,
        rating,
        officialSite,
        summary
    }
}

let createShowResults = (res: any) => {
    return res.data
        .map((el: { show: any; }) => el.show)
        .map(parseShowResult);
}

export function sortResultByRating(results: InitShowResultModel[]): InitShowResultModel[] {
    let compare = (a: InitShowResultModel, b: InitShowResultModel) => {
        return (b.rating || 0) - (a.rating || 0);
    };

    return results.sort(compare);
}

let parseShowResult = (resultItem: InitShowResultModelParsed) => {
    return initShowResult(resultItem.name,
        resultItem.status,
        resultItem.rating.average,
        resultItem.officialSite,
        resultItem.summary);
}

let createMatrix = (items: any) => {
    const itemRows = [];
    if (items.length > 0) {
        itemRows.push(Object.keys(items[0]));
    }

    for (let item of items) {
        let itemCols = [];
        for (let field of Object.keys(item)) {
            itemCols.push(item[field]);
        }

        itemRows.push(itemCols);
    }

    return itemRows;
}

const updateGoogleSheets = (items: any) => {
    const googleSheetMatrix = createMatrix(items);
    const googleSheetsApi = google.sheets({version:'v4', auth: client});

    let range1 = `A1:${googleSheetMatrix[0].length}${googleSheetMatrix.length}`;
    const updateData = {
        spreadsheetId: spreadSheetsId,
        range: range1,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: googleSheetMatrix
        }
    };

    return googleSheetsApi.spreadsheets.values.update(updateData);
};

axios.get(tvShowsUrl)
    .then(createShowResults)
    .then(sortResultByRating)
    .then(updateGoogleSheets)
    .then(() => console.log("success!"))
