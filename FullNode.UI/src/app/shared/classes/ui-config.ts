export class UiConfig {
    public apiUrl : URL;
    public startNode : boolean;

    constructor(jsonString? : string, apiUrl? : URL, startNode? : boolean){
        if(jsonString){
            const parsed = JSON.parse(jsonString);
            this.apiUrl = parsed.apiUrl;
            this.startNode = parsed.startNode;
            return;
        }
        this.apiUrl = apiUrl;
        this.startNode = startNode;
    }

    public static getDefaultConfig() : UiConfig {
        let defaultConfig = new UiConfig(
            null,
            new URL("http://localhost:37220/api"),
            true
        );
        return defaultConfig
    }

}