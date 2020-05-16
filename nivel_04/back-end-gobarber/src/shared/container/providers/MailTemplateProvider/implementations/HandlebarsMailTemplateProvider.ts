import handlebars from 'handlebars';

import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseTemplateMialDTO from "../dtos/IParseTemplateMialDTO";


class HandlebarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ template, variables }: IParseTemplateMialDTO): Promise<string> {

    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }

}


export default HandlebarsMailTemplateProvider;
