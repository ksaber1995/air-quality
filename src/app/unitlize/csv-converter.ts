import { Parser } from '@json2csv/plainjs';

export function generateCSVDownloadLink(options: { filename: string, data: object[] }) {
    try {
        const parser = new Parser();
        const csv = parser.parse(options.data);
        console.log(csv);
        var body = document.getElementsByTagName('body')[0];
        const anchor = document.createElement('a')
        body.appendChild(anchor)
        // anchor.href = this.domSanitizer.bypassSecurityTrustUrl('data:text/csv,' + encodeURIComponent(csv));
        anchor.href = 'data:text/csv,' + encodeURIComponent(csv)
        anchor.download = options.filename;
        anchor.click()
        body.removeChild(anchor)
    } catch (err) {
        console.error(err);
    }

    // const fields = options.columns;
    // const opts = { fields, output: options.filename };
    // const csv = json2csv.parse(options.data, opts);
    // var body = document.getElementsByTagName('body')[0];
    // const anchor = document.createElement('a')
    // body.appendChild(anchor)
    // // anchor.href = this.domSanitizer.bypassSecurityTrustUrl('data:text/csv,' + encodeURIComponent(csv));
    // anchor.href = 'data:text/csv,' + encodeURIComponent(csv)
    // anchor.download = options.filename;
    // anchor.click()
    // body.removeChild(anchor)
}