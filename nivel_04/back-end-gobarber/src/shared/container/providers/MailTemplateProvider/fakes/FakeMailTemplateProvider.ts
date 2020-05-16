import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseTemplateMialDTO from "../dtos/IParseTemplateMialDTO";


class FakeMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template }: IParseTemplateMialDTO): Promise<string> {

    return template;
  }

}


export default FakeMailTemplateProvider;
