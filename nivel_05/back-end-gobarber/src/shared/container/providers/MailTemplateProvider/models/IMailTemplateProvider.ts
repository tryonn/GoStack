import IParseTemplateMialDTO from "../dtos/IParseTemplateMialDTO";

export default interface IMailTemplateProvider {

  parse(data: IParseTemplateMialDTO): Promise<string>;

}
