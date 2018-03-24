import { SupportedSipHeaders, SipParserLookup } from "./regex";

export default class SipHeader {
    private readonly _regex: RegExp = /^([\S]*?)\s*:\s*([\s\S]*)$/;
    private readonly _paramsRegex: RegExp = /\s*;\s*([\w\-.!%*_+`'~]+)(?:\s*=\s*([\w\-.!%*_+`'~]+|"[^"\\]*(\\.[^"\\]*)*"))?/g;

    public name: string;
    public values: any;

    private constructor() {
        this.values = {};
    }

    private parse(data: string) {
        let parsed = this._regex.exec(data);
        this.name = parsed[1];

        if (SupportedSipHeaders.indexOf(this.name) < 0)
            return null;

        let parseinfo = SipParserLookup.Item(this.name);

        if (null == parseinfo)
            this.values[this.name] = parsed[2];
        else {
            let parsedheader = parseinfo.regex.exec(parsed[2]);
            for (let i = 0; i < parseinfo.names.length; ++i) {
                this.values[parseinfo.names[i]] = parsedheader[i + 1];
            }
        }

        //parse for params
        let parsedParams;
        let params = {};
        while ((parsedParams = this._paramsRegex.exec(data)) != null) {
            params[parsedParams[1]] = parsedParams[2];
        }

        this.values['params'] = params;
        
    }


    public static parse(data: string) {
        let header = new SipHeader();
        header.parse(data);
        return header;
    }
}