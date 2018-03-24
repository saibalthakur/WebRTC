import SipHeader from "./sip-header";

export default class SipRequest {
    private static readonly _regex: RegExp = /^([\w\-.!%*_+`'~]+)\s([^\s]+)\sSIP\s*\/\s*(\d+\.\d+)/;

    public method: string;
    public uri: string;
    public version: string;

    public headers: any;

    private constructor() {
        this.headers = {};
    }

    public toString() {
        return "";
    } 

    private parse(data: string) {
        let lines = <Array<string>>data.split('\r\n');
        lines = lines.slice(0, lines.indexOf(''));

        let parsed = SipRequest._regex.exec(lines[0]);
        this.method = parsed[1];
        this.uri = parsed[2];
        this.version = parsed[3];

        for (let i = 1; i < lines.length; ++i) {
            let header = SipHeader.parse(lines[i]);
            if (null == header)
                continue;
            this.headers[header.name] = header;
        }
    }


    static isSipRequest(data: string) {
        return this._regex.test(data);
    }

    static parse(data: string) {
        let request = new SipRequest();
        request.parse(data);

        return request;
    }

}