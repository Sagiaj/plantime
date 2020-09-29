export default class Tag {
    belongs_to_user_email: string = ""
    tag_name: string = "";

    constructor(fb_data?: Tag) {
        if (fb_data) {
            this.belongs_to_user_email = fb_data.belongs_to_user_email || "";
            this.tag_name = fb_data.tag_name || "";
        }
    }
}