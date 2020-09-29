export default class TextValuePair {
    text: string = "";
    value: any = null;

    constructor(text: string, value: any) {
        this.text = text;
        this.value = value;
    }
}
