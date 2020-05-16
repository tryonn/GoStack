import handlebars from 'handlebars';

import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseTemplateMialDTO from "../dtos/IParseTemplateMialDTO";


class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template, variable }: IParseTemplateMialDTO): Promise<string> {

    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variable);
  }

}


export default HandlebarsMailTemplateProvider;
