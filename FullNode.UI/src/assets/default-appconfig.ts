export class DefaultConfig {
    public asString:string = "\{" +
    "\"apiUrl\" : \"http://localhostZZZZZ:37220/api\"," +
    "\"startNode\" : \"true\"" +
    "\}"

    public asStringWithoutURL:string = "\{" +
    "\"startNode\" : \"true\"" +
    "\}"

    public apiUrl = new URL("http://localhost:37220/api")
    public startNode = true;
}