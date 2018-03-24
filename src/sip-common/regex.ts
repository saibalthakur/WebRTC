import KeyedCollection from "../utils/dictionary";

export interface ISipParserLookup {
    regex: RegExp;
    push?: string;
    names: Array<string>;
}

export const SupportedSipHeaders: Array<string> = ['To', 'From', 'CSeq', 'Call-ID', 'Max-Forwards', 'Via'];

export const SipParserLookup: KeyedCollection<ISipParserLookup> = new KeyedCollection<ISipParserLookup>(
    [
        {
            key: 'Via',
            value: {
                regex: /SIP\s*\/\s*(\d+\.\d+)\s*\/\s*([\S]+)\s+([^\s;:]+)(?:\s*:\s*(\d+))?/g,
                push: 'hops',
                names: ['sip_version', 'protocol', 'host', 'port']
            }
        },
        {
            key: 'To',
            value: {
                regex: /([\w-.$%*_+~']+)\s+<(sips?):([\w-_.!~*'()]+)@((?:(?:(?:\w|(?:\w[\w-]+\w))\.)+(?:(?:[a-zA-Z][\w-]+\w)))|(\d+.\d+.\d+.\d+))(?::(\d+))?>/g,
                names: ['displayname', 'protocol', 'username', 'host', 'port']
            }
        },
        {
            key: 'From',
            value: {
                regex: /([\w-.$%*_+~']+)\s+<(sips?):([\w-_.!~*'()]+)@((?:(?:(?:\w|(?:\w[\w-]+\w))\.)+(?:(?:[a-zA-Z][\w-]+\w)))|(\d+.\d+.\d+.\d+))(?::(\d+))?>/g,
                names: ['displayname', 'protocol', 'username', 'host', 'port']
            }
        },
        {
            key: 'CSeq',
            value: {
                regex: /(\d+)\s+(INVITE|ACK|OPTIONS|BYE|CANCEL|REGISTER)/g,
                names: ['sequence', 'method']
            }
        }
    ]
);
